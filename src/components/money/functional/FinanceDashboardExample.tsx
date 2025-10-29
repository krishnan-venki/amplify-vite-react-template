import React, { useState } from 'react';
import { useFinanceDashboard, getFinancialHealthColor } from '../../../hooks/useFinanceDashboard';
import { getCurrentMonth, formatMonth, formatCurrency } from '../../../types/finance';

/**
 * Example component demonstrating the Finance Dashboard hook usage
 * Shows financial health score, income, expenses, and top spending categories
 */
export const FinanceDashboardExample: React.FC = () => {
  const [selectedMonth] = useState(getCurrentMonth());
  const { data, isLoading, isError, error } = useFinanceDashboard(selectedMonth);

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '24px',
    }}>
      {/* Header */}
      <div style={{
        marginBottom: '24px',
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          color: '#1f2937',
          margin: 0,
          marginBottom: '8px',
        }}>
          Sagaa Money
        </h2>
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          margin: 0,
        }}>
          {formatMonth(selectedMonth)}
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div style={{
          padding: '60px 20px',
          textAlign: 'center',
          color: '#9ca3af',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔄</div>
          <div>Loading dashboard data...</div>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div style={{
          padding: '60px 20px',
          textAlign: 'center',
          color: '#ef4444',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
            Error Loading Dashboard
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>
            {error?.message || 'Failed to load dashboard data'}
          </div>
        </div>
      )}

      {/* Dashboard Content */}
      {!isLoading && !isError && data && (
        <div style={{
          display: 'grid',
          gap: '24px',
        }}>
          {/* Metrics Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px',
          }}>
            {/* Financial Health Score Card */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}>
              <div style={{
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '8px',
                fontWeight: '500',
              }}>
                Financial Health
              </div>
              <div style={{
                fontSize: '48px',
                fontWeight: '700',
                color: getFinancialHealthColor(data.financial_health_score),
                marginBottom: '4px',
              }}>
                {data.financial_health_score}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#9ca3af',
              }}>
                out of 100
              </div>
            </div>

            {/* Net Cash Flow Card */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}>
              <div style={{
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '8px',
                fontWeight: '500',
              }}>
                Net Cash Flow
              </div>
              <div style={{
                fontSize: '32px',
                fontWeight: '700',
                color: data.net_cash_flow >= 0 ? '#10B981' : '#EF4444',
                marginBottom: '4px',
              }}>
                {formatCurrency(data.net_cash_flow)}
              </div>
              <div style={{
                fontSize: '12px',
                color: data.net_cash_flow_change >= 0 ? '#10B981' : '#EF4444',
              }}>
                {data.net_cash_flow_change >= 0 ? '↑' : '↓'} {formatCurrency(Math.abs(data.net_cash_flow_change))} from last month
              </div>
            </div>

            {/* Income Card */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}>
              <div style={{
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '8px',
                fontWeight: '500',
              }}>
                Total Income
              </div>
              <div style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#10B981',
                marginBottom: '4px',
              }}>
                {formatCurrency(data.total_income)}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#9ca3af',
              }}>
                {data.transaction_count} transactions
              </div>
            </div>

            {/* Expenses Card */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}>
              <div style={{
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '8px',
                fontWeight: '500',
              }}>
                Total Expenses
              </div>
              <div style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#EF4444',
                marginBottom: '4px',
              }}>
                {formatCurrency(data.total_expenses)}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#9ca3af',
              }}>
                Savings rate: {data.savings_rate.toFixed(1)}%
              </div>
            </div>
          </div>

          {/* Top Spending Categories */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1f2937',
              margin: '0 0 16px 0',
            }}>
              Top Spending Categories
            </h3>
            <div style={{
              display: 'grid',
              gap: '12px',
            }}>
              {data.top_spending_categories.map((category) => (
                <div
                  key={category.category_id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '24px' }}>{category.category_icon}</span>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>
                        {category.category_name}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>
                        {category.count} transactions
                      </div>
                    </div>
                  </div>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#1f2937',
                  }}>
                    {formatCurrency(category.amount)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Health */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1f2937',
              margin: '0 0 16px 0',
            }}>
              Budget Status
            </h3>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  height: '8px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%',
                    width: `${Math.min(100, data.budget_health.percentage_used)}%`,
                    backgroundColor: data.budget_health.status === 'good' ? '#10B981' : 
                                   data.budget_health.status === 'warning' ? '#F59E0B' : '#EF4444',
                    transition: 'width 0.3s ease',
                  }} />
                </div>
              </div>
              <div style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#1f2937',
                minWidth: '60px',
                textAlign: 'right',
              }}>
                {data.budget_health.percentage_used.toFixed(1)}%
              </div>
            </div>
            <div style={{
              marginTop: '8px',
              fontSize: '14px',
              color: '#6b7280',
            }}>
              Status: <span style={{
                fontWeight: '600',
                color: data.budget_health.status === 'good' ? '#10B981' : 
                       data.budget_health.status === 'warning' ? '#F59E0B' : '#EF4444',
              }}>
                {data.budget_health.status.charAt(0).toUpperCase() + data.budget_health.status.slice(1)}
              </span>
            </div>
          </div>

          {/* Debug Info */}
          <div style={{
            padding: '16px',
            backgroundColor: '#f3f4f6',
            borderRadius: '8px',
            fontSize: '12px',
            fontFamily: 'monospace',
          }}>
            <div style={{ fontWeight: '600', marginBottom: '8px' }}>Debug Info:</div>
            <div>User ID: {data.user_id}</div>
            <div>Month: {data.month}</div>
            <div>Transaction Count: {data.transaction_count}</div>
            <div>Top Categories: {data.top_spending_categories.length}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinanceDashboardExample;
