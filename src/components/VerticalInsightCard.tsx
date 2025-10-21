import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { VerticalAggregation, getPriorityPercentages } from '../utils/aggregateInsights';
import { getInsightConfig } from '../config/insightConfig';

interface VerticalInsightCardProps {
  aggregation: VerticalAggregation;
}

// Color schemes
const TYPE_COLORS = {
  insight: '#3b82f6',    // blue-500
  forecast: '#8b5cf6',   // purple-500
};

const PRIORITY_COLORS = {
  high: '#ef4444',       // red-500
  medium: '#f59e0b',     // amber-500
  low: '#10b981',        // green-500
};

export const VerticalInsightCard: React.FC<VerticalInsightCardProps> = ({ aggregation }) => {
  const navigate = useNavigate();
  const config = getInsightConfig(aggregation.vertical);
  const Icon = config.icon;
  const percentages = getPriorityPercentages(aggregation.priorityBreakdown);

  // Check if there are any insights
  const hasInsights = aggregation.totalCount > 0;
  
  const { typeBreakdown } = aggregation;

  // Prepare data for OUTER ring (Type: Insights vs Forecasts)
  const typeData = [
    { name: 'Insights', value: typeBreakdown.insights, color: TYPE_COLORS.insight },
    { name: 'Forecasts', value: typeBreakdown.forecasts, color: TYPE_COLORS.forecast },
  ].filter(item => item.value > 0);

  // Prepare data for INNER ring (Priority breakdown)
  const priorityData = [
    { name: 'High', value: aggregation.priorityBreakdown.high, color: PRIORITY_COLORS.high },
    { name: 'Medium', value: aggregation.priorityBreakdown.medium, color: PRIORITY_COLORS.medium },
    { name: 'Low', value: aggregation.priorityBreakdown.low, color: PRIORITY_COLORS.low },
  ].filter(item => item.value > 0);

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
        {/* Left side - Dual-Ring Donut Chart */}
        <div style={{ flexShrink: 0 }}>
          <div style={{ position: 'relative', width: '128px', height: '128px' }}>
            {hasInsights ? (
              <>
                <ResponsiveContainer width={128} height={128}>
                  <PieChart>
                    {/* OUTER RING - Type (Insights vs Forecasts) */}
                    {typeData.length > 0 && (
                      <Pie
                        data={typeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={64}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {typeData.map((entry, index) => (
                          <Cell key={`type-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    )}
                    
                    {/* INNER RING - Priority */}
                    {priorityData.length > 0 && (
                      <Pie
                        data={priorityData}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={45}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {priorityData.map((entry, index) => (
                          <Cell key={`priority-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    )}
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
                    <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '-2px' }}>Total</div>
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
              <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
                {typeBreakdown.insights} insight{typeBreakdown.insights !== 1 ? 's' : ''} • {typeBreakdown.forecasts} forecast{typeBreakdown.forecasts !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {/* Type Breakdown */}
          {hasInsights && (
            <>
              <div style={{ marginBottom: '12px' }}>
                <h4 style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '8px'
                }}>
                  Type Distribution
                </h4>
                
                {typeBreakdown.insights > 0 && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '6px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: TYPE_COLORS.insight
                      }}></div>
                      <span style={{ fontSize: '13px', color: '#374151' }}>💡 Insights</span>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#111827' }}>
                      {typeBreakdown.insights}
                    </span>
                  </div>
                )}

                {typeBreakdown.forecasts > 0 && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '6px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: TYPE_COLORS.forecast
                      }}></div>
                      <span style={{ fontSize: '13px', color: '#374151' }}>🔮 Forecasts</span>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#111827' }}>
                      {typeBreakdown.forecasts}
                    </span>
                  </div>
                )}
              </div>

              {/* Priority Breakdown */}
              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                <h4 style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '8px'
                }}>
                  Priority Distribution
                </h4>
                
                {aggregation.priorityBreakdown.high > 0 && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '6px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: PRIORITY_COLORS.high
                      }}></div>
                      <span style={{ fontSize: '13px', color: '#374151' }}>High</span>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#111827' }}>
                      {aggregation.priorityBreakdown.high} ({percentages.high}%)
                    </span>
                  </div>
                )}

                {aggregation.priorityBreakdown.medium > 0 && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '6px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: PRIORITY_COLORS.medium
                      }}></div>
                      <span style={{ fontSize: '13px', color: '#374151' }}>Medium</span>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#111827' }}>
                      {aggregation.priorityBreakdown.medium} ({percentages.medium}%)
                    </span>
                  </div>
                )}

                {aggregation.priorityBreakdown.low > 0 && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '6px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: PRIORITY_COLORS.low
                      }}></div>
                      <span style={{ fontSize: '13px', color: '#374151' }}>Low</span>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#111827' }}>
                      {aggregation.priorityBreakdown.low} ({percentages.low}%)
                    </span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
