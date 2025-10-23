import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Line,
  ComposedChart
} from 'recharts';
import { VisualizationData } from '../../types/insight';

interface InsightBarChartProps {
  data: VisualizationData[];
  trendLine?: number[];
  gradient?: string;
  compact?: boolean;
}

const InsightBarChart: React.FC<InsightBarChartProps> = ({ 
  data, 
  trendLine, 
  compact = false 
}) => {
  // Extract primary color from gradient or use default - USE DARK COLORS FOR VISIBILITY
  const getPrimaryColor = () => {
    // Always use dark, visible colors instead of extracting from gradient
    return '#10b981'; // Dark emerald green
  };

  const primaryColor = getPrimaryColor();
  const highlightColor = '#f59e0b'; // Dark amber for highlighted bars

  // Transform data for Recharts
  const chartData = data.map((item, index) => ({
    name: item.label,
    value: item.value,
    highlight: item.highlight,
    trendValue: trendLine?.[index]
  }));

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

  // Use ComposedChart if trend line exists, otherwise BarChart
  const ChartComponent = trendLine ? ComposedChart : BarChart;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ChartComponent
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
        <Tooltip content={<CustomTooltip />} cursor={{ fill: `${primaryColor}10` }} />
        <Bar
          dataKey="value"
          radius={[6, 6, 0, 0]}
          maxBarSize={compact ? 40 : 60}
        >
          {chartData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.highlight ? highlightColor : primaryColor}
              opacity={entry.highlight ? 1 : 0.85}
            />
          ))}
        </Bar>
        {trendLine && (
          <Line
            type="monotone"
            dataKey="trendValue"
            stroke="#6366f1"
            strokeWidth={2}
            dot={{ fill: '#6366f1', r: 4 }}
            activeDot={{ r: 6 }}
          />
        )}
      </ChartComponent>
    </ResponsiveContainer>
  );
};

export default InsightBarChart;
