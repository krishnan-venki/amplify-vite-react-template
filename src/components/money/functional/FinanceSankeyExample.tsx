import React, { useState } from 'react';
import { useSankeyData } from '../../../hooks/useSankeyData';
import { FinanceSankeyDiagram } from './FinanceSankeyDiagram';
import { getCurrentMonth, formatMonth } from '../../../types/finance';

/**
 * Example component demonstrating the Sankey hook and diagram usage
 * This can be integrated into the main Finance Dashboard page
 */
export const FinanceSankeyExample: React.FC = () => {
  const [selectedMonth] = useState(getCurrentMonth());
  const { data, isLoading, isError, error } = useSankeyData(selectedMonth);

  const handleCategoryClick = (categoryId: string, categoryName: string) => {
    console.log('Category clicked:', { categoryId, categoryName });
    // TODO: Navigate to transactions filtered by this category
    // Example: navigate(`/finance/transactions?month=${selectedMonth}&category=${categoryId}`)
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '24px',
    }}>
      {/* Header with Month Selector */}
      <div style={{
        marginBottom: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          color: '#1f2937',
          margin: 0,
        }}>
          Money Flow Visualization
        </h2>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span style={{ fontSize: '14px', color: '#6b7280' }}>
            {formatMonth(selectedMonth)}
          </span>
          {/* TODO: Add month navigation controls */}
        </div>
      </div>

      {/* Sankey Diagram Section */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
      }}>
        {isLoading && (
          <div style={{
            padding: '60px 20px',
            textAlign: 'center',
            color: '#9ca3af',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔄</div>
            <div>Loading money flow data...</div>
          </div>
        )}

        {isError && (
          <div style={{
            padding: '60px 20px',
            textAlign: 'center',
            color: '#ef4444',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
            <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
              Error Loading Data
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>
              {error?.message || 'Failed to load Sankey data'}
            </div>
          </div>
        )}

        {!isLoading && !isError && data && (
          <FinanceSankeyDiagram
            data={data}
            onCategoryClick={handleCategoryClick}
            compact={false}
          />
        )}

        {!isLoading && !isError && !data && (
          <div style={{
            padding: '60px 20px',
            textAlign: 'center',
            color: '#9ca3af',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
            <div>No financial data available for this month</div>
          </div>
        )}
      </div>

      {/* Debug Info (remove in production) */}
      {data && (
        <div style={{
          marginTop: '24px',
          padding: '16px',
          backgroundColor: '#f3f4f6',
          borderRadius: '8px',
          fontSize: '12px',
          fontFamily: 'monospace',
        }}>
          <div style={{ fontWeight: '600', marginBottom: '8px' }}>Debug Info:</div>
          <div>Nodes: {data.nodes.length}</div>
          <div>Links: {data.links.length}</div>
          <div>Total Income: ${data.summary.total_income.toFixed(2)}</div>
          <div>Total Expenses: ${data.summary.total_expenses.toFixed(2)}</div>
          <div>Net Cash Flow: ${data.summary.net_cash_flow.toFixed(2)}</div>
          <div>Savings Rate: {data.summary.savings_rate.toFixed(1)}%</div>
        </div>
      )}
    </div>
  );
};

export default FinanceSankeyExample;
