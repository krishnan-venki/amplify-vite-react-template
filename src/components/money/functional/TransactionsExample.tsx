import React, { useState } from 'react';
import { useTransactions, getUniqueCategories } from '../../../hooks/useTransactions';
import { getCurrentMonth, formatMonth, formatCurrency, formatTransactionDate, CATEGORY_CONFIG } from '../../../types/finance';
import type { TransactionQueryParams } from '../../../types/finance';

/**
 * Example component demonstrating the Transactions hook usage
 * Shows transaction list with filters for month, category, and pagination
 */
export const TransactionsExample: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [params, setParams] = useState<TransactionQueryParams>({
    month: getCurrentMonth(),
    limit: 20,
  });

  const { data, isLoading, isError, error, hasMore, refetch } = useTransactions(params);

  // Get unique categories for filter dropdown
  const availableCategories = data ? getUniqueCategories(data) : [];

  // Filter transactions by search term (client-side)
  const filteredTransactions = data?.transactions.filter(transaction => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      transaction.merchant_name.toLowerCase().includes(term) ||
      transaction.merchant_normalized.toLowerCase().includes(term) ||
      transaction.description.toLowerCase().includes(term)
    );
  }) || [];

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    setParams({ ...params, month, last_key: undefined });
  };

  const handleCategoryChange = (categoryId: string) => {
    const newCategory = categoryId === 'all' ? undefined : categoryId;
    setSelectedCategory(newCategory);
    setParams({ ...params, category_id: newCategory, last_key: undefined });
  };

  const handleLoadMore = () => {
    if (data?.pagination.last_key) {
      setParams({ ...params, last_key: data.pagination.last_key });
    }
  };

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
          Transactions
        </h2>
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          margin: 0,
        }}>
          {formatMonth(selectedMonth)}
        </p>
      </div>

      {/* Filters */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '16px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
        }}>
          {/* Month Filter */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '600',
              color: '#6b7280',
              marginBottom: '6px',
            }}>
              Month
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => handleMonthChange(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                backgroundColor: 'white',
                cursor: 'pointer',
              }}
            >
              <option value={getCurrentMonth()}>{formatMonth(getCurrentMonth())}</option>
              {/* Add more month options as needed */}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '600',
              color: '#6b7280',
              marginBottom: '6px',
            }}>
              Category
            </label>
            <select
              value={selectedCategory || 'all'}
              onChange={(e) => handleCategoryChange(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                backgroundColor: 'white',
                cursor: 'pointer',
              }}
            >
              <option value="all">All Categories</option>
              {availableCategories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '600',
              color: '#6b7280',
              marginBottom: '6px',
            }}>
              Search
            </label>
            <input
              type="text"
              placeholder="Search merchant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
              }}
            />
          </div>
        </div>

        {/* Active Filters */}
        {(selectedCategory || searchTerm) && (
          <div style={{
            display: 'flex',
            gap: '8px',
            marginTop: '12px',
            flexWrap: 'wrap',
          }}>
            {selectedCategory && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                backgroundColor: '#eff6ff',
                borderRadius: '16px',
                fontSize: '12px',
                color: '#1e40af',
              }}>
                {CATEGORY_CONFIG[selectedCategory]?.icon} {CATEGORY_CONFIG[selectedCategory]?.name}
                <button
                  onClick={() => handleCategoryChange('all')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0 4px',
                    fontSize: '14px',
                    color: '#1e40af',
                  }}
                >
                  ×
                </button>
              </span>
            )}
            {searchTerm && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                backgroundColor: '#f3f4f6',
                borderRadius: '16px',
                fontSize: '12px',
                color: '#4b5563',
              }}>
                Search: "{searchTerm}"
                <button
                  onClick={() => setSearchTerm('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0 4px',
                    fontSize: '14px',
                    color: '#4b5563',
                  }}
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}
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
          <div>Loading transactions...</div>
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
            Error Loading Transactions
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
            {error?.message || 'Failed to load transactions'}
          </div>
          <button
            onClick={() => refetch()}
            style={{
              padding: '8px 16px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Try Again
          </button>
        </div>
      )}

      {/* Transactions Table */}
      {!isLoading && !isError && data && (
        <div>
          {/* Summary */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '16px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>
              Showing <strong style={{ color: '#1f2937' }}>{filteredTransactions.length}</strong> of <strong style={{ color: '#1f2937' }}>{data.summary.count}</strong> transactions
            </div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#1f2937' }}>
              Total: {formatCurrency(data.summary.total_amount)}
            </div>
          </div>

          {/* Transactions List */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          }}>
            {filteredTransactions.length === 0 ? (
              <div style={{
                padding: '60px 20px',
                textAlign: 'center',
                color: '#9ca3af',
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
                <div>No transactions found</div>
              </div>
            ) : (
              <div style={{
                overflowX: 'auto',
              }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                }}>
                  <thead>
                    <tr style={{
                      backgroundColor: '#f9fafb',
                      borderBottom: '2px solid #e5e7eb',
                    }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Date</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Merchant</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Category</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((transaction) => (
                      <tr
                        key={transaction.transaction_id}
                        style={{
                          borderBottom: '1px solid #e5e7eb',
                          transition: 'background-color 0.2s',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <td style={{ padding: '12px 16px', fontSize: '14px', color: '#6b7280' }}>
                          {formatTransactionDate(transaction.transaction_date)}
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>
                            {transaction.merchant_normalized || transaction.merchant_name}
                          </div>
                          <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>
                            {transaction.account_type}
                            {transaction.is_recurring && <span style={{ marginLeft: '8px' }}>🔄</span>}
                          </div>
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '13px',
                            color: '#6b7280',
                          }}>
                            <span style={{ fontSize: '16px' }}>{transaction.category_icon}</span>
                            {transaction.category_name}
                          </span>
                        </td>
                        <td style={{
                          padding: '12px 16px',
                          textAlign: 'right',
                          fontSize: '14px',
                          fontWeight: '700',
                          color: transaction.amount >= 0 ? '#10B981' : '#EF4444',
                        }}>
                          {formatCurrency(transaction.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Load More */}
          {hasMore && (
            <div style={{
              marginTop: '16px',
              textAlign: 'center',
            }}>
              <button
                onClick={handleLoadMore}
                style={{
                  padding: '10px 24px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)',
                }}
              >
                Load More
              </button>
            </div>
          )}

          {/* Debug Info */}
          <div style={{
            marginTop: '24px',
            padding: '16px',
            backgroundColor: '#f3f4f6',
            borderRadius: '8px',
            fontSize: '12px',
            fontFamily: 'monospace',
          }}>
            <div style={{ fontWeight: '600', marginBottom: '8px' }}>Debug Info:</div>
            <div>User ID: {data.user_id}</div>
            <div>Filters: {JSON.stringify(data.filters)}</div>
            <div>Total Count: {data.summary.count}</div>
            <div>Has More: {data.summary.has_more ? 'Yes' : 'No'}</div>
            <div>Limit: {data.pagination.limit}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionsExample;
