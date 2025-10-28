import React from 'react';
import type { AssetsSummary } from '../../types/asset';

interface AssetOverviewCardsProps {
  summary: AssetsSummary;
  onAddAsset: () => void;
}

export const AssetOverviewCards: React.FC<AssetOverviewCardsProps> = ({ summary, onAddAsset }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div style={{ marginBottom: '32px' }}>
      {/* Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        {/* Total Assets */}
        <div style={{
          backgroundColor: '#f9fafb',
          borderRadius: '12px',
          padding: '20px',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '24px' }}>📊</span>
            <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Total Assets</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '600', color: '#1f2937' }}>
            {summary.total_assets}
          </div>
        </div>

        {/* High Risk Count */}
        <div style={{
          backgroundColor: summary.high_risk_count > 0 ? '#fef2f2' : '#f9fafb',
          borderRadius: '12px',
          padding: '20px',
          border: summary.high_risk_count > 0 ? '1px solid #fecaca' : '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '24px' }}>⚠️</span>
            <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>High Risk</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '600', color: summary.high_risk_count > 0 ? '#ef4444' : '#1f2937' }}>
            {summary.high_risk_count}
          </div>
        </div>

        {/* Due for Maintenance */}
        <div style={{
          backgroundColor: summary.due_for_maintenance > 0 ? '#fefce8' : '#f9fafb',
          borderRadius: '12px',
          padding: '20px',
          border: summary.due_for_maintenance > 0 ? '1px solid #fef08a' : '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '24px' }}>🔧</span>
            <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Due Soon</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '600', color: summary.due_for_maintenance > 0 ? '#f59e0b' : '#1f2937' }}>
            {summary.due_for_maintenance}
          </div>
        </div>

        {/* Replacement Costs */}
        <div style={{
          backgroundColor: '#f9fafb',
          borderRadius: '12px',
          padding: '20px',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '24px' }}>💰</span>
            <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Est. Replacement</span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: '600', color: '#1f2937' }}>
            {formatCurrency(summary.total_replacement_cost_estimate)}
          </div>
          <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>Next 18 months</div>
        </div>
      </div>

      {/* Add Asset Button */}
      <button
        onClick={onAddAsset}
        style={{
          background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '12px 24px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.2s ease',
          boxShadow: '0 2px 8px rgba(12, 74, 110, 0.3)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #075985 0%, #0284c7 50%, #0ea5e9 100%)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(12, 74, 110, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(12, 74, 110, 0.3)';
        }}
      >
        <span style={{ fontSize: '18px' }}>+</span>
        Add New Asset
      </button>
    </div>
  );
};
