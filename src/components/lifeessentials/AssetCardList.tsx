import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Asset, AssetDisplayData, RiskLevel, Condition } from '../../types/asset';

interface AssetCardListProps {
  assets: Asset[];
  getDisplayData: (asset: Asset) => AssetDisplayData;
  onAssetClick: (asset: Asset) => void;
}

export const AssetCardList: React.FC<AssetCardListProps> = ({ assets, getDisplayData, onAssetClick }) => {
  const navigate = useNavigate();

  const handleAskSagaa = (e: React.MouseEvent, asset: Asset) => {
    e.stopPropagation(); // Prevent card click from triggering
    const displayData = getDisplayData(asset);
    
    const assetContext = {
      type: 'asset' as const,
      asset_id: asset.assetId,
      assetName: asset.assetName,
      assetType: asset.assetType,
      location: asset.category,
      risk_score: asset.llmEvaluation?.risk_score || 0,
      condition: asset.llmEvaluation?.condition_assessment.current_condition || 'Unknown',
      age_years: displayData.ageYears,
      lifespan_years: asset.expectedLifespan,
      replacement_cost: asset.llmEvaluation?.estimated_replacement_cost || 0,
      maintenance_status: asset.llmEvaluation?.replacement_planning.recommend_replacement ? 'Replacement Recommended' : 'Maintained',
      gradient: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)',
      // Detailed data for tabs
      maintenanceHistory: asset.maintenanceHistory,
      evaluation: asset.llmEvaluation
    };

    navigate('/chat', { state: { context: assetContext } });
  };

  const getRiskColor = (riskLevel: RiskLevel) => {
    const colors = {
      critical: { bg: '#fef2f2', text: '#ef4444', icon: '🔴' },
      high: { bg: '#fef2f2', text: '#ef4444', icon: '🔴' },
      medium: { bg: '#fefce8', text: '#f59e0b', icon: '🟡' },
      low: { bg: '#f0fdf4', text: '#10b981', icon: '🟢' },
    };
    return colors[riskLevel];
  };

  const getConditionIcon = (condition: Condition) => {
    const icons = {
      excellent: '✨',
      good: '✅',
      fair: '⚠️',
      poor: '❌',
      critical: '🚨',
    };
    return icons[condition] || '✅';
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '16px',
      marginTop: '24px'
    }}>
      {assets.map((asset) => {
        const displayData = getDisplayData(asset);
        const condition = asset.llmEvaluation?.condition_assessment.current_condition || 'good';
        const riskColors = getRiskColor(displayData.riskLevel);
        
        return (
          <div
            key={asset.assetId}
            onClick={() => onAssetClick(asset)}
            style={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '20px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#0284c7';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(2, 132, 199, 0.2)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {/* Header */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '8px'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#1f2937',
                  margin: 0,
                  lineHeight: '1.3'
                }}>
                  {asset.assetName}
                </h3>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  backgroundColor: riskColors.bg,
                  fontSize: '12px',
                  fontWeight: '600',
                  color: riskColors.text,
                  flexShrink: 0
                }}>
                  <span>{riskColors.icon}</span>
                  {asset.llmEvaluation?.risk_score || 0}
                </div>
              </div>
              <p style={{
                fontSize: '13px',
                color: '#6b7280',
                margin: 0,
                textTransform: 'capitalize'
              }}>
                {asset.assetType.replace('_', ' ')} • {asset.manufacturer} {asset.model}
              </p>
            </div>

            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              marginBottom: '16px'
            }}>
              {/* Age/Lifespan */}
              <div>
                <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '4px', fontWeight: '500' }}>
                  AGE / LIFESPAN
                </div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>
                  {displayData.ageYears}y / {asset.expectedLifespan}y
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  {displayData.lifespanPercentage}% used
                </div>
              </div>

              {/* Condition */}
              <div>
                <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '4px', fontWeight: '500' }}>
                  CONDITION
                </div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>
                  {getConditionIcon(condition)} {condition.charAt(0).toUpperCase() + condition.slice(1)}
                </div>
              </div>
            </div>

            {/* Next Action */}
            <div style={{
              padding: '12px',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              marginBottom: '12px'
            }}>
              <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '4px', fontWeight: '500' }}>
                NEXT ACTION
              </div>
              <div style={{ fontSize: '13px', color: '#1f2937', fontWeight: '500' }}>
                {asset.llmEvaluation?.replacement_planning.recommend_replacement 
                  ? `Replace in ${asset.llmEvaluation.lifespan_remaining}`
                  : asset.nextMaintenanceDue 
                    ? `Maintenance ${displayData.maintenanceStatus === 'overdue' ? 'overdue' : `due ${new Date(asset.nextMaintenanceDue).toLocaleDateString()}`}`
                    : 'Monitor regularly'}
              </div>
            </div>

            {/* Cost */}
            {asset.llmEvaluation?.estimated_replacement_cost && (
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '12px',
                borderTop: '1px solid #f3f4f6',
                marginBottom: '12px'
              }}>
                <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>
                  Est. Replacement
                </span>
                <span style={{ fontSize: '16px', fontWeight: '700', color: '#1f2937' }}>
                  {formatCurrency(asset.llmEvaluation.estimated_replacement_cost)}
                </span>
              </div>
            )}

            {/* Ask Sagaa Button */}
            <button
              onClick={(e) => handleAskSagaa(e, asset)}
              style={{
                width: '100%',
                padding: '10px 12px',
                background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)',
                border: 'none',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                color: 'white',
                transition: 'all 0.2s',
                boxShadow: '0 2px 6px rgba(12, 74, 110, 0.25)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #075985 0%, #0284c7 50%, #0ea5e9 100%)';
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(12, 74, 110, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)';
                e.currentTarget.style.boxShadow = '0 2px 6px rgba(12, 74, 110, 0.25)';
              }}
            >
              <span style={{ fontSize: '14px' }}>💬</span>
              <span>Ask Sagaa</span>
            </button>
          </div>
        );
      })}
    </div>
  );
};
