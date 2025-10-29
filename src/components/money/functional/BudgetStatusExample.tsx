import React, { useState } from 'react';
import { useBudgetStatus, sortCategoriesByUsage } from '../../../hooks/useBudgetStatus';
import { getCurrentMonth, formatMonth, formatCurrency, getBudgetStatusColor } from '../../../types/finance';

/**
 * Example component demonstrating the Budget Status hook usage
 * Shows overall budget health and per-category breakdown with progress bars
 */
export const BudgetStatusExample: React.FC = () => {
  const [selectedMonth] = useState(getCurrentMonth());
  const { data, isLoading, isError, error } = useBudgetStatus(selectedMonth);

  // Sort categories by usage percentage (highest first)
  const sortedCategories = data ? sortCategoriesByUsage(data) : [];

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
          Budget Status
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
          <div>Loading budget status...</div>
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
            Error Loading Budget Status
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>
            {error?.message || 'Failed to load budget data'}
          </div>
        </div>
      )}

      {/* Budget Status Content */}
      {!isLoading && !isError && data && (
        <div style={{
          display: 'grid',
          gap: '24px',
        }}>
          {/* Overall Budget Summary */}
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
              Overall Budget
            </h3>
            
            {/* Budget Progress */}
            <div style={{
              marginBottom: '16px',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px',
                fontSize: '14px',
                color: '#6b7280',
              }}>
                <span>Budget Usage</span>
                <span style={{ fontWeight: '600', color: '#1f2937' }}>
                  {data.overall.percentage_used.toFixed(1)}%
                </span>
              </div>
              <div style={{
                height: '12px',
                backgroundColor: '#e5e7eb',
                borderRadius: '6px',
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  width: `${Math.min(100, data.overall.percentage_used)}%`,
                  backgroundColor: getBudgetStatusColor(data.overall.status),
                  transition: 'width 0.3s ease',
                }} />
              </div>
            </div>

            {/* Budget Amounts */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '16px',
              marginTop: '16px',
            }}>
              <div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                  Total Budget
                </div>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937' }}>
                  {formatCurrency(data.overall.total_budget)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                  Total Spent
                </div>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#EF4444' }}>
                  {formatCurrency(data.overall.total_spent)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                  Remaining
                </div>
                <div style={{ 
                  fontSize: '20px', 
                  fontWeight: '700', 
                  color: data.overall.total_remaining >= 0 ? '#10B981' : '#EF4444' 
                }}>
                  {formatCurrency(data.overall.total_remaining)}
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div style={{
              marginTop: '16px',
              padding: '12px',
              backgroundColor: data.overall.status === 'good' ? '#D1FAE5' :
                             data.overall.status === 'warning' ? '#FEF3C7' : '#FEE2E2',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{ fontSize: '20px' }}>
                {data.overall.status === 'good' ? '✅' :
                 data.overall.status === 'warning' ? '⚠️' : '🔴'}
              </span>
              <div>
                <div style={{ 
                  fontSize: '14px', 
                  fontWeight: '600',
                  color: data.overall.status === 'good' ? '#065F46' :
                         data.overall.status === 'warning' ? '#92400E' : '#991B1B'
                }}>
                  {data.overall.status === 'good' ? 'On Track' :
                   data.overall.status === 'warning' ? 'Approaching Limit' : 'Over Budget'}
                </div>
                <div style={{ 
                  fontSize: '12px',
                  color: data.overall.status === 'good' ? '#047857' :
                         data.overall.status === 'warning' ? '#B45309' : '#B91C1C'
                }}>
                  {data.overall.categories_over_budget > 0
                    ? `${data.overall.categories_over_budget} ${data.overall.categories_over_budget === 1 ? 'category' : 'categories'} over budget`
                    : 'All categories within budget'}
                </div>
              </div>
            </div>

            {data.note && (
              <div style={{
                marginTop: '12px',
                fontSize: '12px',
                color: '#6b7280',
                fontStyle: 'italic',
              }}>
                ℹ️ {data.note}
              </div>
            )}
          </div>

          {/* Category Breakdown */}
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
              margin: '0 0 20px 0',
            }}>
              Category Breakdown
            </h3>

            <div style={{
              display: 'grid',
              gap: '16px',
            }}>
              {sortedCategories.map((category) => (
                <div
                  key={category.category_id}
                  style={{
                    padding: '16px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    borderLeft: `4px solid ${getBudgetStatusColor(category.status)}`,
                  }}
                >
                  {/* Category Header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '20px' }}>{category.category_icon}</span>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>
                        {category.category_name}
                      </span>
                    </div>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: getBudgetStatusColor(category.status),
                    }}>
                      {category.percentage_used.toFixed(1)}%
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div style={{
                    height: '8px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    marginBottom: '8px',
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${Math.min(100, category.percentage_used)}%`,
                      backgroundColor: getBudgetStatusColor(category.status),
                      transition: 'width 0.3s ease',
                    }} />
                  </div>

                  {/* Amounts */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    color: '#6b7280',
                  }}>
                    <span>
                      Spent: <strong style={{ color: '#1f2937' }}>
                        {formatCurrency(category.spent_amount)}
                      </strong> of {formatCurrency(category.budget_amount)}
                    </span>
                    <span style={{
                      fontWeight: '600',
                      color: category.remaining_amount >= 0 ? '#10B981' : '#EF4444',
                    }}>
                      {category.remaining_amount >= 0 ? 'Remaining' : 'Over'}: {formatCurrency(Math.abs(category.remaining_amount))}
                    </span>
                  </div>

                  {/* Custom Budget Indicator */}
                  {category.is_custom_budget && (
                    <div style={{
                      marginTop: '8px',
                      fontSize: '11px',
                      color: '#6b7280',
                    }}>
                      ⚙️ Custom budget
                    </div>
                  )}
                </div>
              ))}
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
            <div>Total Categories: {data.categories.length}</div>
            <div>Over Budget: {data.overall.categories_over_budget}</div>
            <div>Overall Status: {data.overall.status}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetStatusExample;
