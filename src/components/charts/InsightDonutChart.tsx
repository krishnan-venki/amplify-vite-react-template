import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { VisualizationData } from '../../types/insight';

interface InsightDonutChartProps {
  data: VisualizationData[];
  gradient?: string;
  compact?: boolean;
}

const InsightDonutChart: React.FC<InsightDonutChartProps> = ({ 
  data, 
  compact = false 
}) => {
  // Color palette for donut slices
  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
  const HIGHLIGHT_COLOR = '#f59e0b';

  // Transform data for Recharts - ensure values are numbers
  const chartData = data.map((item) => ({
    name: item.label,
    value: typeof item.value === 'string' ? parseFloat(item.value) : item.value,
    highlight: item.highlight
  }));

  // Calculate total for percentages
  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const percentage = ((payload[0].value / total) * 100).toFixed(1);
      return (
        <div style={{
          background: 'white',
          padding: '8px 12px',
          border: `2px solid ${payload[0].payload.highlight ? HIGHLIGHT_COLOR : payload[0].payload.fill}`,
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
          <p style={{ 
            margin: 0, 
            fontWeight: '600', 
            color: '#111827', 
            fontSize: compact ? '11px' : '13px',
            marginBottom: '2px'
          }}>
            {payload[0].payload.name}
          </p>
          <p style={{ 
            margin: 0, 
            color: payload[0].payload.highlight ? HIGHLIGHT_COLOR : payload[0].payload.fill, 
            fontWeight: '700', 
            fontSize: compact ? '14px' : '16px'
          }}>
            ${payload[0].value.toLocaleString()}
          </p>
          <p style={{ 
            margin: 0, 
            color: '#6b7280', 
            fontSize: compact ? '10px' : '11px',
            marginTop: '2px'
          }}>
            {percentage}%
          </p>
        </div>
      );
    }
    return null;
  };

  const size = compact ? 180 : 280;
  const innerRadius = compact ? 50 : 80;
  const outerRadius = compact ? 75 : 115;

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      gap: compact ? '16px' : '24px',
      flexWrap: 'wrap'
    }}>
      {/* Donut Chart */}
      <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
        <ResponsiveContainer width="100%" height={size}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.highlight ? HIGHLIGHT_COLOR : COLORS[index % COLORS.length]}
                  opacity={entry.highlight ? 1 : 0.85}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center label */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none'
        }}>
          <div style={{ 
            fontSize: compact ? '20px' : '28px', 
            fontWeight: 'bold', 
            color: '#111827' 
          }}>
            ${total.toLocaleString()}
          </div>
          <div style={{ 
            fontSize: compact ? '10px' : '12px', 
            color: '#6b7280',
            marginTop: '2px'
          }}>
            Total
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: compact ? '6px' : '8px',
        minWidth: compact ? '120px' : '160px'
      }}>
        {chartData.map((entry, index) => {
          const percentage = ((entry.value / total) * 100).toFixed(1);
          const color = entry.highlight ? HIGHLIGHT_COLOR : COLORS[index % COLORS.length];
          
          return (
            <div 
              key={`legend-${index}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: compact ? '11px' : '13px'
              }}
            >
              {/* Color box */}
              <div style={{
                width: compact ? '12px' : '16px',
                height: compact ? '12px' : '16px',
                borderRadius: '3px',
                background: color,
                opacity: entry.highlight ? 1 : 0.85,
                flexShrink: 0
              }} />
              
              {/* Label and value */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ 
                  fontWeight: '600', 
                  color: '#111827',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {entry.name}
                </div>
                <div style={{ 
                  fontSize: compact ? '10px' : '11px',
                  color: '#374151',
                  marginTop: '2px'
                }}>
                  ${entry.value.toLocaleString()} ({percentage}%)
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InsightDonutChart;
