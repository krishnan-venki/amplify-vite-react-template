import React from 'react';
import { VisualizationData } from '../../types/insight';

interface AssetLifespanChartProps {
  data: VisualizationData[];
  gradient?: string;
  compact?: boolean;
}

/**
 * Asset lifespan chart showing current age vs. expected lifespan vs. with maintenance
 * Data format: [
 *   { label: "Current Age", value: 9.5, type: "current" },
 *   { label: "Expected Lifespan", value: 15, type: "baseline" },
 *   { label: "With Maintenance", value: 18, type: "target" }
 * ]
 */
const AssetLifespanChart: React.FC<AssetLifespanChartProps> = ({ 
  data, 
  compact = false 
}) => {
  // Find the different data points
  const currentAge = data.find(d => d.type === 'current' || d.label.toLowerCase().includes('current'));
  const expectedLifespan = data.find(d => d.type === 'baseline' || d.label.toLowerCase().includes('expected'));
  const withMaintenance = data.find(d => d.type === 'target' || d.label.toLowerCase().includes('maintenance'));

  // Get max value for scaling
  const maxValue = Math.max(...data.map(d => d.value));
  const unit = data[0]?.unit || 'years';

  // Calculate percentages
  const currentPercentage = currentAge ? (currentAge.value / maxValue) * 100 : 0;
  const expectedPercentage = expectedLifespan ? (expectedLifespan.value / maxValue) * 100 : 0;
  const maintenancePercentage = withMaintenance ? (withMaintenance.value / maxValue) * 100 : 0;

  // Determine status
  const ageRatio = currentAge && expectedLifespan ? currentAge.value / expectedLifespan.value : 0;
  const isNearEnd = ageRatio > 0.8;
  const isPastHalfLife = ageRatio > 0.5;

  return (
    <div style={{
      padding: compact ? '16px' : '20px',
      background: '#ffffff',
    }}>
      {/* Timeline visualization */}
      <div style={{
        marginBottom: compact ? '16px' : '20px',
      }}>
        {/* Current Age Bar */}
        {currentAge && (
          <div style={{ marginBottom: compact ? '12px' : '16px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '6px',
            }}>
              <span style={{
                fontSize: compact ? '12px' : '13px',
                fontWeight: 600,
                color: '#1f2937',
              }}>
                {currentAge.label}
              </span>
              <span style={{
                fontSize: compact ? '13px' : '14px',
                fontWeight: 700,
                color: isNearEnd ? '#dc2626' : isPastHalfLife ? '#f59e0b' : '#3b82f6',
              }}>
                {currentAge.value} {unit}
              </span>
            </div>
            <div style={{
              position: 'relative',
              width: '100%',
              height: compact ? '24px' : '28px',
              background: '#e5e7eb',
              borderRadius: '8px',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: `${currentPercentage}%`,
                background: isNearEnd 
                  ? 'linear-gradient(90deg, #dc2626 0%, #ef4444 100%)'
                  : isPastHalfLife 
                  ? 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)'
                  : 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)',
                borderRadius: '8px',
                transition: 'width 0.5s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: '8px',
              }}>
                <span style={{
                  fontSize: compact ? '14px' : '16px',
                }}>
                  {isNearEnd ? '⚠️' : isPastHalfLife ? '⏰' : '✓'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Expected Lifespan Bar */}
        {expectedLifespan && (
          <div style={{ marginBottom: compact ? '12px' : '16px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '6px',
            }}>
              <span style={{
                fontSize: compact ? '12px' : '13px',
                fontWeight: 600,
                color: '#1f2937',
              }}>
                {expectedLifespan.label}
              </span>
              <span style={{
                fontSize: compact ? '13px' : '14px',
                fontWeight: 700,
                color: '#6b7280',
              }}>
                {expectedLifespan.value} {unit}
              </span>
            </div>
            <div style={{
              position: 'relative',
              width: '100%',
              height: compact ? '24px' : '28px',
              background: '#e5e7eb',
              borderRadius: '8px',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: `${expectedPercentage}%`,
                background: 'linear-gradient(90deg, #6b7280 0%, #9ca3af 100%)',
                borderRadius: '8px',
                transition: 'width 0.5s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: '8px',
              }}>
                <span style={{
                  fontSize: compact ? '14px' : '16px',
                }}>
                  🎯
                </span>
              </div>
            </div>
          </div>
        )}

        {/* With Maintenance Bar */}
        {withMaintenance && (
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '6px',
            }}>
              <span style={{
                fontSize: compact ? '12px' : '13px',
                fontWeight: 600,
                color: '#1f2937',
              }}>
                {withMaintenance.label}
              </span>
              <span style={{
                fontSize: compact ? '13px' : '14px',
                fontWeight: 700,
                color: '#10b981',
              }}>
                {withMaintenance.value} {unit}
              </span>
            </div>
            <div style={{
              position: 'relative',
              width: '100%',
              height: compact ? '24px' : '28px',
              background: '#e5e7eb',
              borderRadius: '8px',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: `${maintenancePercentage}%`,
                background: 'linear-gradient(90deg, #10b981 0%, #34d399 100%)',
                borderRadius: '8px',
                transition: 'width 0.5s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: '8px',
              }}>
                <span style={{
                  fontSize: compact ? '14px' : '16px',
                }}>
                  ✨
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetLifespanChart;
