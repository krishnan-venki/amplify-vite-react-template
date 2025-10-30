import React, { useState } from 'react';
import { Search, X, ChevronDown, Repeat } from 'lucide-react';
import type { Transaction } from '../../../types/finance';
import { formatCurrency, formatTransactionDate, CATEGORY_CONFIG } from '../../../types/finance';

interface TransactionSectionProps {
  transactions: Transaction[];
  hasMore: boolean;
  onLoadMore: () => void;
  isLoading?: boolean;
  // Filters
  selectedMonth?: string | null;
  selectedCategoryId?: string | null;
  searchTerm?: string;
  onMonthChange: (month: string | null) => void;
  onCategoryChange: (categoryId: string | null) => void;
  onSearchChange: (term: string) => void;
  isMobile?: boolean;
}

interface TransactionFiltersProps {
  selectedMonth: string | null;
  selectedCategoryId: string | null;
  searchTerm: string;
  onMonthChange: (month: string | null) => void;
  onCategoryChange: (categoryId: string | null) => void;
  onSearchChange: (term: string) => void;
  isMobile?: boolean;
}

interface TransactionTableProps {
  transactions: Transaction[];
  isMobile?: boolean;
}

/**
 * Transaction Filters Component
 * Month dropdown, category dropdown, and search input
 */
export const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  selectedMonth,
  selectedCategoryId,
  searchTerm,
  onMonthChange,
  onCategoryChange,
  onSearchChange,
  isMobile = false
}) => {
  // Get unique category options from CATEGORY_CONFIG
  const categoryOptions = Object.entries(CATEGORY_CONFIG).map(([id, config]) => ({
    id,
    name: config.name,
    icon: config.icon
  }));

  // Generate last 12 months for dropdown
  const monthOptions = React.useMemo(() => {
    const months: string[] = [];
    const now = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push(date.toISOString().slice(0, 7)); // "YYYY-MM"
    }
    return months;
  }, []);

  const formatMonthLabel = (month: string) => {
    const [year, monthNum] = month.split('-');
    const date = new Date(parseInt(year), parseInt(monthNum) - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: '12px',
        marginBottom: '24px'
      }}
    >
      {/* Month Filter */}
      <div style={{ flex: 1, minWidth: isMobile ? '100%' : '200px' }}>
        <label
          style={{
            display: 'block',
            fontSize: '12px',
            fontWeight: '500',
            color: '#6b7280',
            marginBottom: '6px'
          }}
        >
          Month
        </label>
        <div style={{ position: 'relative' }}>
          <select
            value={selectedMonth || ''}
            onChange={(e) => onMonthChange(e.target.value || null)}
            style={{
              width: '100%',
              padding: '10px 36px 10px 12px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#1f2937',
              backgroundColor: '#ffffff',
              cursor: 'pointer',
              appearance: 'none',
              outline: 'none'
            }}
          >
            <option value="">All Months</option>
            {monthOptions.map((month) => (
              <option key={month} value={month}>
                {formatMonthLabel(month)}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af',
              pointerEvents: 'none'
            }}
          />
        </div>
      </div>

      {/* Category Filter */}
      <div style={{ flex: 1, minWidth: isMobile ? '100%' : '200px' }}>
        <label
          style={{
            display: 'block',
            fontSize: '12px',
            fontWeight: '500',
            color: '#6b7280',
            marginBottom: '6px'
          }}
        >
          Category
        </label>
        <div style={{ position: 'relative' }}>
          <select
            value={selectedCategoryId || ''}
            onChange={(e) => onCategoryChange(e.target.value || null)}
            style={{
              width: '100%',
              padding: '10px 36px 10px 12px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#1f2937',
              backgroundColor: '#ffffff',
              cursor: 'pointer',
              appearance: 'none',
              outline: 'none'
            }}
          >
            <option value="">All Categories</option>
            {categoryOptions.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af',
              pointerEvents: 'none'
            }}
          />
        </div>
      </div>

      {/* Search Input */}
      <div style={{ flex: 2, minWidth: isMobile ? '100%' : '300px' }}>
        <label
          style={{
            display: 'block',
            fontSize: '12px',
            fontWeight: '500',
            color: '#6b7280',
            marginBottom: '6px'
          }}
        >
          Search Merchant
        </label>
        <div style={{ position: 'relative' }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af'
            }}
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by merchant name..."
            style={{
              width: '100%',
              padding: '10px 36px 10px 36px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#1f2937',
              backgroundColor: '#ffffff',
              outline: 'none'
            }}
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                padding: '4px',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                color: '#9ca3af',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Active Filter Badges
 * Shows currently active filters with ability to clear them
 */
export const ActiveFilterBadges: React.FC<{
  selectedMonth: string | null;
  selectedCategoryId: string | null;
  searchTerm: string;
  onMonthChange: (month: string | null) => void;
  onCategoryChange: (categoryId: string | null) => void;
  onSearchChange: (term: string) => void;
}> = ({
  selectedMonth,
  selectedCategoryId,
  searchTerm,
  onMonthChange,
  onCategoryChange,
  onSearchChange
}) => {
  const hasFilters = selectedMonth || selectedCategoryId || searchTerm;

  if (!hasFilters) return null;

  const formatMonthLabel = (month: string) => {
    const [year, monthNum] = month.split('-');
    const date = new Date(parseInt(year), parseInt(monthNum) - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        marginBottom: '16px'
      }}
    >
      <span style={{ fontSize: '13px', color: '#6b7280', alignSelf: 'center' }}>
        Active filters:
      </span>

      {selectedMonth && (
        <button
          onClick={() => onMonthChange(null)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 10px',
            backgroundColor: '#eff6ff',
            border: '1px solid #93c5fd',
            borderRadius: '6px',
            fontSize: '13px',
            color: '#1e40af',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          <span>{formatMonthLabel(selectedMonth)}</span>
          <X size={14} />
        </button>
      )}

      {selectedCategoryId && (
        <button
          onClick={() => onCategoryChange(null)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 10px',
            backgroundColor: '#eff6ff',
            border: '1px solid #93c5fd',
            borderRadius: '6px',
            fontSize: '13px',
            color: '#1e40af',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          <span>
            {CATEGORY_CONFIG[selectedCategoryId]?.icon}{' '}
            {CATEGORY_CONFIG[selectedCategoryId]?.name || selectedCategoryId}
          </span>
          <X size={14} />
        </button>
      )}

      {searchTerm && (
        <button
          onClick={() => onSearchChange('')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 10px',
            backgroundColor: '#eff6ff',
            border: '1px solid #93c5fd',
            borderRadius: '6px',
            fontSize: '13px',
            color: '#1e40af',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          <span>Search: "{searchTerm}"</span>
          <X size={14} />
        </button>
      )}
    </div>
  );
};

/**
 * Transaction Row (Desktop)
 * Single transaction row in table format
 */
const TransactionRow: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <tr
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: isHovered ? '#f9fafb' : '#ffffff',
        transition: 'background-color 0.2s ease'
      }}
    >
      <td
        style={{
          padding: '16px',
          borderBottom: '1px solid #e5e7eb',
          fontSize: '14px',
          color: '#1f2937'
        }}
      >
        {formatTransactionDate(transaction.transaction_date)}
      </td>
      <td
        style={{
          padding: '16px',
          borderBottom: '1px solid #e5e7eb'
        }}
      >
        <div>
          <div
            style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '2px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {transaction.merchant_name}
            {transaction.is_recurring && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontSize: '11px',
                  padding: '2px 6px',
                  backgroundColor: '#eff6ff',
                  color: '#2563eb',
                  borderRadius: '4px',
                  fontWeight: '500'
                }}
                title="Recurring Transaction"
              >
                <Repeat size={12} style={{ marginRight: '2px' }} />
                Recurring
              </span>
            )}
          </div>
          {transaction.description && transaction.description !== transaction.merchant_name && (
            <div
              style={{
                fontSize: '12px',
                color: '#6b7280'
              }}
            >
              {transaction.description}
            </div>
          )}
        </div>
      </td>
      <td
        style={{
          padding: '16px',
          borderBottom: '1px solid #e5e7eb'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span style={{ fontSize: '18px' }}>
            {transaction.category_icon}
          </span>
          <span
            style={{
              fontSize: '14px',
              color: '#1f2937'
            }}
          >
            {transaction.category_name}
          </span>
        </div>
      </td>
      <td
        style={{
          padding: '16px',
          borderBottom: '1px solid #e5e7eb',
          textAlign: 'right'
        }}
      >
        <div
          style={{
            fontSize: '15px',
            fontWeight: '600',
            color: '#1f2937'
          }}
        >
          {formatCurrency(transaction.amount)}
        </div>
      </td>
    </tr>
  );
};

/**
 * Transaction Mobile Card
 * Card layout for mobile devices
 */
const TransactionMobileCard: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        padding: '16px',
        border: '1px solid #e5e7eb',
        marginBottom: '12px'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'start',
          marginBottom: '12px'
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: '15px',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              flexWrap: 'wrap'
            }}
          >
            {transaction.merchant_name}
            {transaction.is_recurring && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontSize: '10px',
                  padding: '2px 6px',
                  backgroundColor: '#eff6ff',
                  color: '#2563eb',
                  borderRadius: '4px',
                  fontWeight: '500'
                }}
              >
                <Repeat size={10} style={{ marginRight: '2px' }} />
                Recurring
              </span>
            )}
          </div>
          <div
            style={{
              fontSize: '12px',
              color: '#6b7280'
            }}
          >
            {formatTransactionDate(transaction.transaction_date)}
          </div>
        </div>
        <div
          style={{
            fontSize: '17px',
            fontWeight: '700',
            color: '#1f2937'
          }}
        >
          {formatCurrency(transaction.amount)}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px',
          backgroundColor: '#f9fafb',
          borderRadius: '6px'
        }}
      >
        <span style={{ fontSize: '16px' }}>
          {transaction.category_icon}
        </span>
        <span
          style={{
            fontSize: '13px',
            color: '#1f2937',
            fontWeight: '500'
          }}
        >
          {transaction.category_name}
        </span>
      </div>
    </div>
  );
};

/**
 * Transaction Table Component
 * Displays transactions in table (desktop) or cards (mobile)
 */
export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  isMobile = false
}) => {
  if (transactions.length === 0) {
    return (
      <div
        style={{
          padding: '60px 20px',
          textAlign: 'center',
          color: '#9ca3af'
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
        <div style={{ fontSize: '16px', fontWeight: '500' }}>
          No transactions found
        </div>
        <div style={{ fontSize: '14px', marginTop: '8px' }}>
          Try adjusting your filters
        </div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div>
        {transactions.map((transaction) => (
          <TransactionMobileCard
            key={transaction.transaction_id}
            transaction={transaction}
          />
        ))}
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: '#ffffff'
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#f9fafb' }}>
            <th
              style={{
                padding: '12px 16px',
                textAlign: 'left',
                fontSize: '12px',
                fontWeight: '600',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                borderBottom: '2px solid #e5e7eb'
              }}
            >
              Date
            </th>
            <th
              style={{
                padding: '12px 16px',
                textAlign: 'left',
                fontSize: '12px',
                fontWeight: '600',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                borderBottom: '2px solid #e5e7eb'
              }}
            >
              Merchant
            </th>
            <th
              style={{
                padding: '12px 16px',
                textAlign: 'left',
                fontSize: '12px',
                fontWeight: '600',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                borderBottom: '2px solid #e5e7eb'
              }}
            >
              Category
            </th>
            <th
              style={{
                padding: '12px 16px',
                textAlign: 'right',
                fontSize: '12px',
                fontWeight: '600',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                borderBottom: '2px solid #e5e7eb'
              }}
            >
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <TransactionRow
              key={transaction.transaction_id}
              transaction={transaction}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

/**
 * Main Transaction Section Component
 * Combines filters, active badges, table, and load more button
 */
export const TransactionSection: React.FC<TransactionSectionProps> = ({
  transactions,
  hasMore,
  onLoadMore,
  isLoading = false,
  selectedMonth,
  selectedCategoryId,
  searchTerm = '',
  onMonthChange,
  onCategoryChange,
  onSearchChange,
  isMobile = false
}) => {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h2
        style={{
          fontSize: '24px',
          fontWeight: '600',
          color: '#1f2937',
          marginBottom: '24px'
        }}
      >
        Transactions
      </h2>

      <TransactionFilters
        selectedMonth={selectedMonth || null}
        selectedCategoryId={selectedCategoryId || null}
        searchTerm={searchTerm}
        onMonthChange={onMonthChange}
        onCategoryChange={onCategoryChange}
        onSearchChange={onSearchChange}
        isMobile={isMobile}
      />

      <ActiveFilterBadges
        selectedMonth={selectedMonth || null}
        selectedCategoryId={selectedCategoryId || null}
        searchTerm={searchTerm}
        onMonthChange={onMonthChange}
        onCategoryChange={onCategoryChange}
        onSearchChange={onSearchChange}
      />

      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          overflow: 'hidden'
        }}
      >
        <TransactionTable transactions={transactions} isMobile={isMobile} />

        {hasMore && (
          <div
            style={{
              padding: '20px',
              textAlign: 'center',
              borderTop: '1px solid #e5e7eb'
            }}
          >
            <button
              onClick={onLoadMore}
              disabled={isLoading}
              style={{
                padding: '10px 24px',
                background: isLoading
                  ? '#e5e7eb'
                  : 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)',
                color: isLoading ? '#9ca3af' : '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                boxShadow: isLoading ? 'none' : '0 2px 8px rgba(12, 74, 110, 0.3)',
                transition: 'all 0.2s ease'
              }}
            >
              {isLoading ? 'Loading...' : 'Load More Transactions'}
            </button>
          </div>
        )}
      </div>

      <div
        style={{
          marginTop: '16px',
          fontSize: '13px',
          color: '#6b7280',
          textAlign: 'center'
        }}
      >
        Showing {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
        {hasMore && ' • More available'}
      </div>
    </div>
  );
};
