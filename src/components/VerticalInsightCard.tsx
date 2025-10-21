import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { VerticalAggregation, getPriorityPercentages } from '../utils/aggregateInsights';
import { getInsightConfig } from '../config/insightConfig';

interface VerticalInsightCardProps {
  aggregation: VerticalAggregation;
}

const PRIORITY_COLORS = {
  high: '#ef4444', // red-500
  medium: '#eab308', // yellow-500
  low: '#a855f7', // purple-500
};

export const VerticalInsightCard: React.FC<VerticalInsightCardProps> = ({ aggregation }) => {
  const navigate = useNavigate();
  const config = getInsightConfig(aggregation.vertical);
  const Icon = config.icon;
  const percentages = getPriorityPercentages(aggregation.priorityBreakdown);

  // Check if there are any insights
  const hasInsights = aggregation.totalCount > 0;

  // Prepare data for donut chart
  const chartData = [
    { name: 'High', value: aggregation.priorityBreakdown.high, color: PRIORITY_COLORS.high },
    { name: 'Medium', value: aggregation.priorityBreakdown.medium, color: PRIORITY_COLORS.medium },
    { name: 'Low', value: aggregation.priorityBreakdown.low, color: PRIORITY_COLORS.low },
  ].filter(item => item.value > 0); // Only show segments with data

  const handleCardClick = () => {
    if (hasInsights) {
      navigate('/insights', { state: { filterVertical: aggregation.vertical } });
    }
  };

  // Get vertical display name
  const verticalName = aggregation.vertical
    .replace('sagaa_', '')
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div
      onClick={handleCardClick}
      style={{
        background: config.bgGradient,
        borderRadius: '16px',
        padding: '24px',
        cursor: hasInsights ? 'pointer' : 'default',
        border: '1px solid rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease',
        boxShadow: 'none',
        opacity: hasInsights ? 1 : 0.6
      }}
      onMouseEnter={(e) => {
        if (hasInsights) {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
        }
      }}
      onMouseLeave={(e) => {
        if (hasInsights) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
        {/* Left side - Donut Chart */}
        <div style={{ flexShrink: 0 }}>
          <div style={{ position: 'relative', width: '128px', height: '128px' }}>
            {chartData.length > 0 ? (
              <>
                <ResponsiveContainer width={128} height={128}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                {/* Center count */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>
                      {aggregation.totalCount}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Total</div>
                  </div>
                </div>
              </>
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ textAlign: 'center', color: '#9ca3af' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold' }}>0</div>
                  <div style={{ fontSize: '12px' }}>No insights</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right side - Statistics */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Header with icon and title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              padding: '8px',
              borderRadius: '8px',
              background: config.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Icon size={20} color="white" />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: 0 }}>
                {verticalName}
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                {aggregation.newCount} new insight{aggregation.newCount !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {/* Priority Breakdown */}
          <div style={{ marginTop: '16px' }}>
            <h4 style={{
              fontSize: '12px',
              fontWeight: '600',
              color: '#6b7280',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px'
            }}>
              Priority Distribution
            </h4>
            
            {aggregation.priorityBreakdown.high > 0 && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: PRIORITY_COLORS.high
                  }}></div>
                  <span style={{ fontSize: '14px', color: '#374151' }}>High Priority</span>
                </div>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>
                  {aggregation.priorityBreakdown.high} ({percentages.high}%)
                </span>
              </div>
            )}

            {aggregation.priorityBreakdown.medium > 0 && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: PRIORITY_COLORS.medium
                  }}></div>
                  <span style={{ fontSize: '14px', color: '#374151' }}>Medium Priority</span>
                </div>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>
                  {aggregation.priorityBreakdown.medium} ({percentages.medium}%)
                </span>
              </div>
            )}

            {aggregation.priorityBreakdown.low > 0 && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: PRIORITY_COLORS.low
                  }}></div>
                  <span style={{ fontSize: '14px', color: '#374151' }}>Low Priority</span>
                </div>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>
                  {aggregation.priorityBreakdown.low} ({percentages.low}%)
                </span>
              </div>
            )}

            {chartData.length === 0 && (
              <p style={{ fontSize: '14px', color: '#6b7280', fontStyle: 'italic' }}>
                No insights available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
