import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import type { FinanceDashboardResponse } from '../../../types/finance';
import { formatCurrency } from '../../../types/finance';

interface FinanceDashboardCardsProps {
  data: FinanceDashboardResponse;
  isMobile?: boolean;
}

interface MetricCardProps {
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  title: string;
  value: string;
  change?: string;
  changeLabel?: string;
  isPositive?: boolean;
  subtitle?: string;
  delay?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon: Icon,
  iconColor,
  iconBg,
  title,
  value,
  change,
  changeLabel,
  isPositive,
  subtitle,
  delay = 0
}) => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '16px',
        border: '1px solid #e5e7eb',
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.5s ease',
        transitionDelay: `${delay}ms`
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          background: iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '10px'
        }}
      >
        <Icon size={20} style={{ color: iconColor }} />
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: '12px',
          color: '#6b7280',
          fontWeight: '500',
          marginBottom: '6px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}
      >
        {title}
      </div>

      {/* Value */}
      <div
        style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#1f2937',
          marginBottom: change ? '6px' : '0'
        }}
      >
        {value}
      </div>

      {/* Change Indicator */}
      {change && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '12px',
            color: isPositive ? '#10b981' : '#ef4444'
          }}
        >
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span style={{ fontWeight: '600' }}>{change}</span>
          {changeLabel && (
            <span style={{ color: '#9ca3af', fontWeight: '400' }}>
              {changeLabel}
            </span>
          )}
        </div>
      )}

      {/* Subtitle */}
      {subtitle && (
        <div
          style={{
            fontSize: '11px',
            color: '#9ca3af',
            marginTop: '3px'
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};

/**
 * Net Income Card (formerly Net Cash Flow)
 * Shows net income (income - expenses) with change vs previous
 */
export const NetIncomeCard: React.FC<{
  netCashFlow: number;
  netCashFlowChange: number;
  delay?: number;
}> = ({ netCashFlow, netCashFlowChange, delay = 0 }) => {
  const isPositive = netCashFlow >= 0;
  const changePositive = netCashFlowChange > 0;

  return (
    <MetricCard
      icon={TrendingUp}
      iconColor={isPositive ? '#10b981' : '#ef4444'}
      iconBg={isPositive ? '#10b98115' : '#ef444415'}
      title="Net Income"
      value={formatCurrency(netCashFlow)}
      change={formatCurrency(Math.abs(netCashFlowChange))}
      changeLabel="vs last month"
      isPositive={changePositive}
      delay={delay}
    />
  );
};

/**
 * Total Income Card
 * Shows total income for the month
 */
export const IncomeCard: React.FC<{
  totalIncome: number;
  delay?: number;
}> = ({ totalIncome, delay = 0 }) => {
  return (
    <MetricCard
      icon={DollarSign}
      iconColor="#10b981"
      iconBg="#10b98115"
      title="Total Income"
      value={formatCurrency(totalIncome)}
      delay={delay}
    />
  );
};

/**
 * Total Expenses Card
 * Shows total expenses for the month
 */
export const ExpensesCard: React.FC<{
  totalExpenses: number;
  delay?: number;
}> = ({ totalExpenses, delay = 0 }) => {
  return (
    <MetricCard
      icon={DollarSign}
      iconColor="#ef4444"
      iconBg="#ef444415"
      title="Total Expenses"
      value={formatCurrency(totalExpenses)}
      delay={delay}
    />
  );
};

/**
 * Savings Rate Card
 * Shows savings rate as percentage of income
 */
export const SavingsRateCard: React.FC<{
  savingsRate: number;
  delay?: number;
}> = ({ savingsRate, delay = 0 }) => {
  // Color coding based on savings rate
  const getColor = (rate: number) => {
    if (rate >= 20) return '#10b981'; // Green - Excellent (20%+)
    if (rate >= 10) return '#3b82f6'; // Blue - Good (10-20%)
    if (rate >= 5) return '#f59e0b';  // Orange - Fair (5-10%)
    return '#ef4444';                  // Red - Low (<5%)
  };

  const color = getColor(savingsRate);

  return (
    <MetricCard
      icon={TrendingUp}
      iconColor={color}
      iconBg={`${color}15`}
      title="Savings Rate"
      value={`${savingsRate.toFixed(1)}%`}
      subtitle={savingsRate >= 20 ? 'Excellent' : savingsRate >= 10 ? 'Good' : savingsRate >= 5 ? 'Fair' : 'Low'}
      delay={delay}
    />
  );
};

/**
 * Main Dashboard Cards Component
 * Renders 4 metric cards in order: Income, Expenses, Net Income, Savings Rate
 */
export const FinanceDashboardCards: React.FC<FinanceDashboardCardsProps> = ({
  data,
  isMobile = false
}) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile
          ? '1fr'
          : 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px',
        marginBottom: '32px'
      }}
    >
      <IncomeCard
        totalIncome={data.total_income}
        delay={0}
      />
      <ExpensesCard
        totalExpenses={data.total_expenses}
        delay={100}
      />
      <NetIncomeCard
        netCashFlow={data.net_cash_flow}
        netCashFlowChange={data.net_cash_flow_change}
        delay={200}
      />
      <SavingsRateCard
        savingsRate={data.savings_rate}
        delay={300}
      />
    </div>
  );
};

/**
 * Top Spending Categories Section
 * Shows list of top spending categories with icons and amounts
 */
export const TopSpendingCategories: React.FC<{
  categories: FinanceDashboardResponse['top_spending_categories'];
  onCategoryClick?: (categoryId: string) => void;
}> = ({ categories, onCategoryClick }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid #e5e7eb',
        marginBottom: '32px'
      }}
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          marginBottom: isExpanded ? '20px' : '0'
        }}
      >
        <h3
          style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1f2937',
            margin: 0
          }}
        >
          Top Spending Categories
        </h3>
        <div
          style={{
            fontSize: '20px',
            color: '#6b7280',
            transition: 'transform 0.3s ease',
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
        >
          ▼
        </div>
      </div>

      {isExpanded && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {categories.map((category, index) => (
          <div
            key={category.category_id}
            onClick={() => onCategoryClick?.(category.category_id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px',
              borderRadius: '8px',
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              cursor: onCategoryClick ? 'pointer' : 'default',
              transition: 'all 0.2s ease',
              opacity: 0,
              animation: `fadeInUp 0.5s ease forwards ${index * 100}ms`
            }}
            onMouseEnter={(e) => {
              if (onCategoryClick) {
                e.currentTarget.style.backgroundColor = '#eff6ff';
                e.currentTarget.style.borderColor = '#93c5fd';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f9fafb';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px'
                }}
              >
                {category.category_icon}
              </div>
              <div>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#1f2937'
                  }}
                >
                  {category.category_name}
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#6b7280'
                  }}
                >
                  {category.count} {category.count === 1 ? 'transaction' : 'transactions'}
                </div>
              </div>
            </div>

            <div
              style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#1f2937'
              }}
            >
              {formatCurrency(category.amount)}
            </div>
          </div>
        ))}
        </div>
      )}

      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};
