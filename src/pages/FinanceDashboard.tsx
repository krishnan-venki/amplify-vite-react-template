import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FinanceHeader, FilterBar } from '../components/money/FinanceHeader';
import { FinanceDashboardCards, TopSpendingCategories } from '../components/money/FinanceDashboardCards';
import { TransactionSection } from '../components/money/TransactionSection';
import { FinanceSankeyDiagram } from '../components/money/functional/FinanceSankeyDiagram';
import { ComingSoonTab } from '../components/money/ComingSoonTab';
import { useFinanceDashboard } from '../hooks/useFinanceDashboard';
import { useSankeyData } from '../hooks/useSankeyData';
import { useTransactions } from '../hooks/useTransactions';
import { getCurrentMonth } from '../types/finance';

type FinanceTab = 'dashboard' | 'tax' | 'bills' | 'budget' | 'savings';

/**
 * Main Finance Dashboard Page
 * Combines all finance sections with shared state management
 */
export const FinanceDashboard: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [activeTab, setActiveTab] = useState<FinanceTab>('dashboard');

  // State from URL params
  const urlMonth = searchParams.get('month');
  const urlCategory = searchParams.get('category');
  const [selectedMonth, setSelectedMonth] = useState<string>(
    urlMonth || getCurrentMonth()
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    urlCategory
  );
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [transactionLastKey, setTransactionLastKey] = useState<string | undefined>(undefined);

  // Fetch all data using hooks
  const dashboardQuery = useFinanceDashboard(selectedMonth);
  const sankeyQuery = useSankeyData(selectedMonth);
  const transactionsQuery = useTransactions({
    month: selectedMonth,
    category_id: selectedCategoryId || undefined,
    limit: 50,
    last_key: transactionLastKey
  });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update URL when month changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (selectedMonth !== getCurrentMonth()) {
      params.set('month', selectedMonth);
    } else {
      params.delete('month');
    }
    if (selectedCategoryId) {
      params.set('category', selectedCategoryId);
    } else {
      params.delete('category');
    }
    setSearchParams(params, { replace: true });
  }, [selectedMonth, selectedCategoryId, setSearchParams]);

  // Handlers
  const handleMonthChange = (month: string | null) => {
    if (month) {
      setSelectedMonth(month);
      setTransactionLastKey(undefined); // Reset pagination
      setSearchTerm(''); // Clear search
      
      // Scroll to top when month changes
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setTransactionLastKey(undefined); // Reset pagination
    setSearchTerm(''); // Clear search
    
    // Scroll to transactions section
    setTimeout(() => {
      const transactionsSection = document.getElementById('transactions-section');
      if (transactionsSection) {
        transactionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleSankeyFlowClick = (categoryId: string, categoryName: string) => {
    console.log('🔵 Sankey category clicked:', { categoryId, categoryName });
    handleCategoryClick(categoryId);
  };

  const handleLoadMoreTransactions = () => {
    if (transactionsQuery.data?.pagination?.last_key) {
      setTransactionLastKey(transactionsQuery.data.pagination.last_key);
    }
  };

  // Filter transactions client-side by search term
  const filteredTransactions = React.useMemo(() => {
    if (!transactionsQuery.data?.transactions) return [];
    if (!searchTerm) return transactionsQuery.data.transactions;

    const lowerSearch = searchTerm.toLowerCase();
    return transactionsQuery.data.transactions.filter(
      (t) =>
        t.merchant_name.toLowerCase().includes(lowerSearch) ||
        t.merchant_normalized?.toLowerCase().includes(lowerSearch) ||
        t.description?.toLowerCase().includes(lowerSearch)
    );
  }, [transactionsQuery.data?.transactions, searchTerm]);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f9fafb'
      }}
    >
      {/* Clean Header without filters */}
      <FinanceHeader isMobile={isMobile} />

      {/* Main Content Container */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: isMobile ? '16px' : '32px'
        }}
      >
        {/* Capability Tabs */}
        <div
          style={{
            display: 'flex',
            gap: isMobile ? '8px' : '12px',
            marginBottom: '32px',
            overflowX: 'auto',
            paddingBottom: '4px'
          }}
        >
          {[
            { id: 'dashboard' as FinanceTab, icon: '📊', label: 'Dashboard' },
            { id: 'tax' as FinanceTab, icon: '📋', label: 'Tax Optimization' },
            { id: 'bills' as FinanceTab, icon: '💰', label: 'Bill & Subscription' },
            { id: 'budget' as FinanceTab, icon: '🎯', label: 'Budget Management' },
            { id: 'savings' as FinanceTab, icon: '📈', label: 'Savings & Investment' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: isMobile ? '10px 16px' : '12px 20px',
                border: 'none',
                borderRadius: '10px',
                fontSize: isMobile ? '13px' : '14px',
                fontWeight: '600',
                cursor: 'pointer',
                background: activeTab === tab.id 
                  ? 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)' 
                  : 'white',
                color: activeTab === tab.id ? 'white' : '#1f2937',
                boxShadow: activeTab === tab.id 
                  ? '0 4px 12px rgba(12, 74, 110, 0.3)' 
                  : '0 1px 3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = '#eff6ff';
                  e.currentTarget.style.color = '#0369a1';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#1f2937';
                }
              }}
            >
              <span style={{ fontSize: '18px' }}>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

      {/* Dashboard Tab Content */}
      {activeTab === 'dashboard' && (
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: isMobile ? '20px' : '32px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* Sticky Filter Bar - Only for Dashboard */}
          <FilterBar
            selectedMonth={selectedMonth}
            onMonthChange={handleMonthChange}
            isMobile={isMobile}
          />

          {/* Main Content Container */}
          <div
            style={{
              maxWidth: '1400px',
              margin: '0 auto',
              padding: isMobile ? '16px' : '32px',
              position: 'relative',
            }}
          >
            {/* Loading Overlay - shows while keeping content visible */}
            {dashboardQuery.isLoading && dashboardQuery.data && (
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  zIndex: 50,
                  backgroundColor: '#ffffff',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '14px',
                  color: '#6b7280',
                  fontWeight: '500',
                }}
              >
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid #e5e7eb',
                    borderTopColor: '#0369a1',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                  }}
                />
                Loading...
                <style>
                  {`
                    @keyframes spin {
                      to { transform: rotate(360deg); }
                    }
                  `}
                </style>
              </div>
            )}

            {/* Initial Loading State - only on first load */}
            {dashboardQuery.isLoading && !dashboardQuery.data ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '400px',
                  color: '#9ca3af'
                }}
              >
                <div>
                  <div style={{ fontSize: '48px', marginBottom: '16px', textAlign: 'center' }}>
                    🔄
                  </div>
                  <div>Loading dashboard...</div>
                </div>
              </div>
            ) : dashboardQuery.isError ? (
              /* Error State */
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '400px',
                  color: '#ef4444'
                }}
              >
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
                <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                  Error Loading Dashboard
                </div>
                <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
                  {dashboardQuery.error instanceof Error
                    ? dashboardQuery.error.message
                    : 'An unknown error occurred'}
                </div>
                <button
                  onClick={() => dashboardQuery.refetch()}
                  style={{
                    padding: '10px 20px',
                    background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(12, 74, 110, 0.3)'
                  }}
                >
                  Try Again
                </button>
              </div>
            ) : null}

            {/* Main Content - Always render if we have data (even during refetch) */}
            {dashboardQuery.data && (
              <>
            {/* Dashboard Metrics */}
            <FinanceDashboardCards data={dashboardQuery.data} isMobile={isMobile} />

            {/* Top Spending Categories */}
            {dashboardQuery.data?.top_spending_categories && (
              <TopSpendingCategories
                categories={dashboardQuery.data.top_spending_categories}
                onCategoryClick={handleCategoryClick}
              />
            )}

            {/* Sankey Diagram */}
            {sankeyQuery.data && (
              <div style={{ marginBottom: '32px' }}>
                <div
                  style={{
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 50%, #000000 100%)',
                    borderRadius: '12px',
                    padding: '24px',
                    border: '1px solid #2d2d2d'
                  }}
                >
                  <FinanceSankeyDiagram
                    data={sankeyQuery.data}
                    onCategoryClick={handleSankeyFlowClick}
                  />
                </div>
              </div>
            )}

            {/* Sankey initial loading - only show if no data yet */}
            {sankeyQuery.isLoading && !sankeyQuery.data && (
              <div
                style={{
                  marginBottom: '32px',
                  padding: '40px',
                  textAlign: 'center',
                  color: '#9ca3af',
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb'
                }}
              >
                Loading money flow...
              </div>
            )}

            {/* Transactions Section */}
            <div id="transactions-section">
              {transactionsQuery.data && (
                <TransactionSection
                  transactions={filteredTransactions}
                  hasMore={transactionsQuery.data.summary.has_more}
                  onLoadMore={handleLoadMoreTransactions}
                  isLoading={transactionsQuery.isLoading}
                  selectedMonth={selectedMonth}
                  selectedCategoryId={selectedCategoryId}
                  searchTerm={searchTerm}
                  onMonthChange={handleMonthChange}
                  onCategoryChange={(categoryId) => {
                    // Convert empty string to null for "All Categories"
                    setSelectedCategoryId(categoryId || null);
                    setTransactionLastKey(undefined);
                  }}
                  onSearchChange={setSearchTerm}
                  isMobile={isMobile}
                />
              )}

              {transactionsQuery.isLoading && !transactionsQuery.data && (
                <div
                  style={{
                    padding: '40px',
                    textAlign: 'center',
                    color: '#9ca3af'
                  }}
                >
                  Loading transactions...
                </div>
              )}
            </div>
          </>
        )}
          </div>
        </div>
      )}

      {/* Tax Optimization Tab */}
      {activeTab === 'tax' && (
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: isMobile ? '20px' : '32px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}
        >
          <ComingSoonTab
            icon="📋"
            title="Tax Optimization & Planning"
            description="Year-round tax intelligence that puts more money in your pocket. Automated tax-deductible expense tracking, estimated quarterly tax calculations, tax-loss harvesting alerts, retirement contribution optimization, and end-of-year tax planning with proactive strategies."
          />
        </div>
      )}

      {/* Bill & Subscription Tab */}
      {activeTab === 'bills' && (
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: isMobile ? '20px' : '32px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}
        >
          <ComingSoonTab
            icon="💰"
            title="Bill & Subscription Optimization"
            description="Automatic monitoring ensures you never overpay for anything. Track all recurring payments, identify unused subscriptions, find better rates for insurance/internet/phone, monitor promotional pricing expirations, and optimize payment timing for maximum savings."
          />
        </div>
      )}

      {/* Budget Management Tab */}
      {activeTab === 'budget' && (
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: isMobile ? '20px' : '32px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}
        >
          <ComingSoonTab
            icon="🎯"
            title="Budget Management"
            description="Budgets that breathe with your life. AI-powered budgeting using your expense patterns, adaptive to life changes, real-time monitoring with predictive adjustments, smart reallocation suggestions, and shared household budgets with partner visibility."
          />
        </div>
      )}

      {/* Savings & Investment Tab */}
      {activeTab === 'savings' && (
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: isMobile ? '20px' : '32px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}
        >
          <ComingSoonTab
            icon="📈"
            title="Savings & Investment Goals"
            description="Every dollar working toward what matters most to you. Goal-specific savings strategies with automated transfers, investment recommendations based on risk tolerance, portfolio rebalancing alerts, tax-advantaged account optimization, and retirement planning with projections."
          />
        </div>
      )}
      </div>
    </div>
  );
};

export default FinanceDashboard;
