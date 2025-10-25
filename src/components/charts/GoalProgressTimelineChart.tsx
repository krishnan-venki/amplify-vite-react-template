import React from 'react';
import { VisualizationData } from '../../types/insight';

interface GoalProgressTimelineChartProps {
  data: VisualizationData[];
  gradient?: string;
  compact?: boolean;
}

/**
 * Timeline chart showing goal progress milestones over time
 * Data format: [
 *   { label: "Started", value: 1000, timestamp: 1704067200 },
 *   { label: "Month 3", value: 3500, timestamp: 1712016000 },
 *   { label: "Target", value: 10000, timestamp: 1735689600 }
 * ]
 */
const GoalProgressTimelineChart: React.FC<GoalProgressTimelineChartProps> = ({ 
  data, 
  gradient,
  compact = false 
}) => {
  const formatCurrency = (value: number, unit?: string) => {
    if (unit === '$') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    }
    return `${value}${unit || ''}`;
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  // Sort by timestamp
  const sortedData = [...data].sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
  
  const maxValue = Math.max(...sortedData.map(d => d.value));
  const unit = sortedData[0]?.unit;

  // Calculate if we're on track (compare progress to time elapsed)
  const now = Date.now() / 1000;
  const startTime = sortedData[0]?.timestamp || now;
  const endTime = sortedData[sortedData.length - 1]?.timestamp || now;
  const currentData = sortedData.filter(d => (d.timestamp || 0) <= now);
  const currentValue = currentData[currentData.length - 1]?.value || 0;
  const timeProgress = (now - startTime) / (endTime - startTime);
  const valueProgress = currentValue / maxValue;
  const isAhead = valueProgress > timeProgress;
  const isBehind = valueProgress < timeProgress * 0.8;

  return (
    <div style={{
      padding: compact ? '16px' : '20px',
      background: gradient || '#ffffff',
    }}>
      {/* Timeline bars */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: compact ? '8px' : '12px',
        height: compact ? '150px' : '200px',
        marginBottom: compact ? '8px' : '12px',
      }}>
        {sortedData.map((item, index) => {
          const heightPercentage = (item.value / maxValue) * 100;
          const isPast = (item.timestamp || 0) <= now;
          const isCurrent = index === currentData.length - 1 && isPast;
          const isFuture = (item.timestamp || 0) > now;

          let barColor = '#e5e7eb'; // default gray
          if (isPast) {
            if (isAhead) barColor = '#10b981'; // green
            else if (isBehind) barColor = '#f59e0b'; // yellow
            else barColor = '#3b82f6'; // blue
          }
          if (isCurrent) {
            barColor = isAhead ? '#059669' : isBehind ? '#d97706' : '#2563eb';
          }

          return (
            <div
              key={index}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              {/* Value label */}
              <div style={{
                fontSize: compact ? '11px' : '12px',
                fontWeight: 600,
                color: isPast ? '#1f2937' : '#9ca3af',
                textAlign: 'center',
              }}>
                {formatCurrency(item.value, unit)}
              </div>

              {/* Bar */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: `${heightPercentage}%`,
                minHeight: '20px',
                background: barColor,
                borderRadius: compact ? '6px' : '8px',
                transition: 'all 0.3s ease',
                boxShadow: isCurrent ? `0 4px 12px ${barColor}40` : 'none',
                border: isCurrent ? `2px solid ${barColor}` : 'none',
              }}>
                {/* Current indicator */}
                {isCurrent && (
                  <div style={{
                    position: 'absolute',
                    top: '-8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: compact ? '6px' : '8px',
                    height: compact ? '6px' : '8px',
                    borderRadius: '50%',
                    background: barColor,
                    boxShadow: `0 0 0 ${compact ? '3px' : '4px'} ${barColor}40`,
                  }} />
                )}
              </div>

              {/* Label */}
              <div style={{
                fontSize: compact ? '10px' : '11px',
                fontWeight: 500,
                color: isPast ? '#1f2937' : '#9ca3af',
                textAlign: 'center',
                whiteSpace: 'nowrap',
              }}>
                {item.label}
              </div>

              {/* Date */}
              {item.timestamp && (
                <div style={{
                  fontSize: compact ? '9px' : '10px',
                  color: '#9ca3af',
                  textAlign: 'center',
                }}>
                  {formatDate(item.timestamp)}
                </div>
              )}

              {/* Future indicator */}
              {isFuture && (
                <div style={{
                  fontSize: '10px',
                  color: '#9ca3af',
                  fontStyle: 'italic',
                }}>
                  Target
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress indicator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: compact ? '8px' : '12px',
        background: isAhead 
          ? '#d1fae5' 
          : isBehind 
          ? '#fef3c7' 
          : '#dbeafe',
        borderRadius: '8px',
        marginTop: compact ? '8px' : '12px',
      }}>
        <span style={{
          fontSize: compact ? '18px' : '20px',
        }}>
          {isAhead ? '🚀' : isBehind ? '⚠️' : '✓'}
        </span>
        <span style={{
          fontSize: compact ? '12px' : '13px',
          fontWeight: 600,
          color: isAhead 
            ? '#059669' 
            : isBehind 
            ? '#d97706' 
            : '#2563eb',
        }}>
          {isAhead 
            ? 'Ahead of Schedule' 
            : isBehind 
            ? 'Behind Schedule' 
            : 'On Track'}
        </span>
        <span style={{
          fontSize: compact ? '11px' : '12px',
          color: '#6b7280',
        }}>
          • {Math.round(valueProgress * 100)}% complete
        </span>
      </div>
    </div>
  );
};

export default GoalProgressTimelineChart;
