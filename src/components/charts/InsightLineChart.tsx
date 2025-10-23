import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { VisualizationData } from '../../types/insight';

interface InsightLineChartProps {
  data: VisualizationData[];
  gradient?: string;
  compact?: boolean;
}

const InsightLineChart: React.FC<InsightLineChartProps> = ({ 
  data, 
  compact = false 
}) => {
  // Extract primary color from gradient or use default - USE DARK COLORS FOR VISIBILITY
  const getPrimaryColor = () => {
    // Always use dark, visible colors instead of extracting from gradient
    return '#10b981'; // Dark emerald green
  };

  const primaryColor = getPrimaryColor();
  const highlightColor = '#f59e0b'; // Dark amber

  // Transform data for Recharts
  const chartData = data.map((item) => ({
    name: item.label,
    value: item.value,
    highlight: item.highlight
  }));

  // Custom dot renderer for highlighting
  const renderDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (payload.highlight) {
      return (
        <circle
          cx={cx}
          cy={cy}
          r={compact ? 5 : 6}
          fill={highlightColor}
          stroke="white"
          strokeWidth={2}
        />
      );
    }
    return (
      <circle
        cx={cx}
        cy={cy}
        r={compact ? 3 : 4}
        fill={primaryColor}
        stroke="white"
        strokeWidth={1.5}
      />
    );
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'white',
          padding: '8px 12px',
          border: `2px solid ${payload[0].payload.highlight ? highlightColor : primaryColor}`,
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
            color: payload[0].payload.highlight ? highlightColor : primaryColor, 
            fontWeight: '700', 
            fontSize: compact ? '14px' : '16px'
          }}>
            ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  const height = compact ? 180 : 300;
  const fontSize = compact ? 10 : 12;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        data={chartData}
        margin={{ 
          top: compact ? 10 : 20, 
          right: compact ? 10 : 20, 
          left: compact ? 0 : 10, 
          bottom: compact ? 20 : 40 
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#9ca3af" opacity={0.6} />
        <XAxis
          dataKey="name"
          angle={compact ? -45 : -30}
          textAnchor="end"
          height={compact ? 60 : 80}
          tick={{ fill: '#374151', fontSize }}
          interval={0}
        />
        <YAxis
          tick={{ fill: '#374151', fontSize }}
          tickFormatter={(value) => `$${value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="value"
          stroke={primaryColor}
          strokeWidth={compact ? 2 : 3}
          dot={renderDot}
          activeDot={{ r: compact ? 6 : 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default InsightLineChart;
