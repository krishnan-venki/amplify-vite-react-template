import { TrendingUp, PieChart, Activity, Eye, DollarSign } from 'lucide-react';
import { useState } from 'react';

export const UnifiedDashboardDetail = () => {
  const [selectedView, setSelectedView] = useState('personal');

  const accountSummary = [
    { label: 'Cash', amount: selectedView === 'household' ? '$28.4K' : '$15.0K', accounts: selectedView === 'household' ? '5 accts' : '3 accts', color: '#3b82f6', icon: '💵' },
    { label: 'Investments', amount: selectedView === 'household' ? '$165.2K' : '$85.0K', accounts: selectedView === 'household' ? '8 accts' : '3 accts', color: '#8b5cf6', icon: '📈' },
    { label: 'Real Estate', amount: selectedView === 'household' ? '$385K' : '$65K', accounts: selectedView === 'household' ? '2 props' : '1 prop', color: '#f59e0b', icon: '🏠' },
    { label: 'Debts', amount: selectedView === 'household' ? '-$330.8K' : '-$55.8K', accounts: selectedView === 'household' ? '4 loans' : '2 loans', color: '#ef4444', icon: '💳' }
  ];

  const assetAllocation = [
    { label: 'Stocks & ETFs', percentage: selectedView === 'household' ? 52 : 68, color: '#3b82f6' },
    { label: 'Bonds & Fixed Income', percentage: selectedView === 'household' ? 18 : 22, color: '#8b5cf6' },
    { label: 'Real Estate', percentage: selectedView === 'household' ? 22 : 0, color: '#f59e0b' },
    { label: 'Cash & Equivalents', percentage: selectedView === 'household' ? 8 : 10, color: '#10b981' }
  ].filter(asset => asset.percentage > 0);

  return (
    <section style={{ 
      background: 'linear-gradient(135deg, #dbeafe 0%, #e0f2fe 100%)',
      padding: '80px 24px',
      margin: '0',
      minHeight: '100vh'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{
            fontWeight: '100',
            marginBottom: '24px',
            lineHeight: '1.2',
            fontSize: 'clamp(36px, 4vw, 56px)',
          }}>
            <span style={{ color: '#1d1d1f' }}>Financial Picture.</span>{' '}
            <span style={{
              background: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}>One Dashboard.</span>
          </h2>

          {/* Feature Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginTop: '32px' }}>
            {[
              '13,000+ Institutions',
              'Real-Time Sync',
              'Multi-Currency Support',
              'Household Sharing',
              'Asset Allocation',
              'Trend Analysis'
            ].map((feature, idx) => (
              <div key={idx} style={{
                background: 'white',
                padding: '10px 20px',
                borderRadius: '24px',
                fontSize: '0.9rem',
                fontWeight: 500,
                color: '#059669',
                border: '2px solid #d1fae5',
                boxShadow: '0 2px 8px rgba(5, 150, 105, 0.1)'
              }}>
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Main Dashboard Section - 4 Column Grid */}
        <div style={{ marginBottom: '80px' }}>
            {/* Title and Description - Full Width */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ marginBottom: '40px' }}>
                    <div style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        letterSpacing: '1.5px',
                        color: '#059669',
                        marginBottom: '12px',
                        textTransform: 'uppercase'
                    }}>
                        UNIFIED INTELLIGENCE
                    </div>
                    <p style={{
                        fontSize: '1.05rem',
                        color: '#6b7280',
                        lineHeight: '1.7',
                        margin: 0,
                        maxWidth: '1200px'
                    }}>
                        Every account, investment, asset, and liability in one intelligent view. Real-time net worth tracking with predictive insights and household collaboration.
                    </p>
                </div>
            </div>

          {/* 4 Column Card Grid */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
            maxWidth: '1280px',
            margin: '0 auto'
          }}>
            
            {/* Card 1: Net Worth Overview */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              border: '2px solid #10b98120',
              transition: 'all 0.2s ease'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <TrendingUp size={20} color="#10b981" />
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, margin: 0, color: '#374151' }}>
                  Net Worth
                </h4>
              </div>
              {/* ADD VIEW SELECTOR HERE */}
                <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
                    <button
                    onClick={() => setSelectedView('personal')}
                    style={{
                        flex: 1,
                        background: selectedView === 'personal' ? 'linear-gradient(135deg, #059669 0%, #10b981 100%)' : '#f3f4f6',
                        color: selectedView === 'personal' ? 'white' : '#6b7280',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                    >
                    Personal
                    </button>
                    <button
                    onClick={() => setSelectedView('household')}
                    style={{
                        flex: 1,
                        background: selectedView === 'household' ? 'linear-gradient(135deg, #059669 0%, #10b981 100%)' : '#f3f4f6',
                        color: selectedView === 'household' ? 'white' : '#6b7280',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                    >
                    Household
                    </button>
                </div>
              
              <div style={{ 
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                borderRadius: '10px',
                padding: '16px',
                marginBottom: '16px',
                border: '1px solid #10b981'
              }}>
                <div style={{ fontSize: '0.7rem', color: '#047857', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '6px' }}>
                  {selectedView === 'household' ? 'HOUSEHOLD' : 'PERSONAL'}
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#065f46', marginBottom: '6px', lineHeight: '1' }}>
                  ${selectedView === 'household' ? '247,850' : '127,300'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <TrendingUp size={14} color="#10b981" />
                  <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600 }}>
                    +${selectedView === 'household' ? '12,400' : '8,400'}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    ({selectedView === 'household' ? '+5.3' : '+7.1'}%)
                  </span>
                </div>
              </div>

              <div style={{
                background: '#fef3c7',
                borderRadius: '8px',
                padding: '12px',
                border: '1px solid #fbbf24'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <Eye size={14} color="#f59e0b" />
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#92400e' }}>
                    Target Dec 2025
                  </span>
                </div>
                <div style={{ fontSize: '1.3rem', color: '#78350f', fontWeight: 700 }}>
                  ${selectedView === 'household' ? '300K' : '150K'}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600, marginTop: '2px' }}>
                  ✓ On track
                </div>
              </div>
            </div>

            {/* Card 2: Account Summary */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              border: '2px solid #8b5cf620',
              transition: 'all 0.2s ease'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <PieChart size={20} color="#8b5cf6" />
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, margin: 0, color: '#374151' }}>
                  Accounts
                </h4>
              </div>

              {accountSummary.map((item, idx) => (
                <div key={idx} style={{
                  marginBottom: idx < accountSummary.length - 1 ? '14px' : '0',
                  paddingBottom: idx < accountSummary.length - 1 ? '14px' : '0',
                  borderBottom: idx < accountSummary.length - 1 ? '1px solid #e2e8f0' : 'none'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '18px' }}>{item.icon}</span>
                      <div style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.85rem' }}>
                        {item.label}
                      </div>
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      color: item.label === 'Debts' ? '#ef4444' : '#1f2937'
                    }}>
                      {item.amount}
                    </div>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '4px',
                    background: '#e2e8f0',
                    borderRadius: '2px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: '75%',
                      height: '100%',
                      background: item.color,
                      borderRadius: '2px',
                      transition: 'width 0.5s ease'
                    }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Card 3: Liabilities */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              border: '2px solid #ef444420',
              transition: 'all 0.2s ease'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <DollarSign size={20} color="#ef4444" />
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, margin: 0, color: '#374151' }}>
                  Liabilities
                </h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '12px' }}>
                {[
                  { label: 'Mortgage', amount: '$285K', color: '#f59e0b' },
                  { label: 'Student Loan', amount: '$28K', color: '#ef4444' },
                  { label: 'Car Loan', amount: '$14.2K', color: '#ef4444' },
                  { label: 'Credit Cards', amount: '$3.6K', color: '#10b981' }
                ].map((liability, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 500, color: '#64748b' }}>
                      {liability.label}
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      color: liability.color
                    }}>
                      {liability.amount}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: '12px',
                paddingTop: '12px',
                borderTop: '2px solid #e5e7eb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151' }}>Total</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ef4444' }}>
                  ${selectedView === 'household' ? '330.8K' : '55.8K'}
                </span>
              </div>
            </div>

            {/* Card 4: Asset Allocation */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              border: '2px solid #f59e0b20',
              transition: 'all 0.2s ease'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Activity size={20} color="#f59e0b" />
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, margin: 0, color: '#374151' }}>
                  Allocation
                </h4>
              </div>

              {assetAllocation.map((asset, idx) => (
                <div key={idx} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>{asset.label}</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: asset.color }}>{asset.percentage}%</span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '6px',
                    background: '#e2e8f0',
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${asset.percentage}%`,
                      height: '100%',
                      background: asset.color,
                      borderRadius: '3px',
                      transition: 'width 0.5s ease'
                    }} />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* AI Insights Section - Standalone */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '400px 1fr',
            gap: '32px',
            alignItems: 'start'
          }}>
            
            {/* Left Side - Title and Description */}
            <div>
              <div style={{
                display: 'inline-block',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '1.5px',
                color: '#059669',
                marginBottom: '16px',
                textTransform: 'uppercase'
              }}>
                AI-Powered Recommendations
              </div>
              
              <p style={{
                fontSize: '1.05rem',
                color: '#6b7280',
                lineHeight: '1.7',
                margin: 0
              }}>
                Sagaa analyzes your complete financial picture to identify optimization opportunities, predict future scenarios, and recommend specific actions that could save or earn you thousands annually.
              </p>
            </div>

            {/* Right Side - Insights Cards */}
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px'
            }}>
              {[
                {
                  icon: '💰',
                  title: 'Employer Match Opportunity',
                  insight: 'Increase 401(k) contribution to 10% to capture full employer match',
                  value: '$3,600/year',
                  color: '#10b981',
                  action: 'Increase contribution'
                },
                {
                  icon: '📉',
                  title: 'Refinance Opportunity',
                  insight: 'Current student loan rate is 0.7% higher than available rates',
                  value: '$1,890 savings',
                  color: '#3b82f6',
                  action: 'View lenders'
                },
                {
                  icon: '📊',
                  title: 'Asset Allocation',
                  insight: 'Portfolio is well-balanced for your age and risk tolerance',
                  value: 'Optimized',
                  color: '#8b5cf6',
                  action: 'View details'
                }
              ].map((item, idx) => (
                <div key={idx} style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                  border: `2px solid ${item.color}20`,
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = `0 8px 24px ${item.color}30`;
                  e.currentTarget.style.borderColor = item.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
                  e.currentTarget.style.borderColor = `${item.color}20`;
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: `${item.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px'
                    }}>
                      {item.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1e293b' }}>
                        {item.title}
                      </div>
                    </div>
                  </div>
                  
                  <p style={{ 
                    margin: '0 0 12px 0', 
                    fontSize: '0.9rem', 
                    color: '#64748b', 
                    lineHeight: '1.6' 
                  }}>
                    {item.insight}
                  </p>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '12px',
                    borderTop: `1px solid ${item.color}15`
                  }}>
                    <span style={{
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: item.color
                    }}>
                      {item.value}
                    </span>
                    <span style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: item.color,
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px'
                    }}>
                      {item.action} →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default UnifiedDashboardDetail;