import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { ChartData } from '../types/chat';

interface ChartVisualizationProps {
  chartData: ChartData;
  contextGradient?: string; // Optional gradient from chat context
}

const ChartVisualization: React.FC<ChartVisualizationProps> = ({ chartData, contextGradient }) => {
  // Transform the data into Recharts format
  const data = chartData.xAxis.data.map((label, index) => ({
    name: label,
    value: chartData.yAxis.data[index] || 0
  }));

  // Extract primary color from gradient or use default
  const getPrimaryColor = () => {
    if (contextGradient) {
      const match = contextGradient.match(/#[0-9a-fA-F]{6}/);
      return match ? match[0] : '#10b981';
    }
    return '#10b981';
  };

  const primaryColor = getPrimaryColor();

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'white',
          padding: '12px 16px',
          border: `2px solid ${primaryColor}`,
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <p style={{ margin: 0, fontWeight: '600', color: '#111827', marginBottom: '4px' }}>
            {payload[0].payload.name}
          </p>
          <p style={{ margin: 0, color: primaryColor, fontWeight: '700', fontSize: '18px' }}>
            {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{
      width: '100%',
      padding: '24px',
      background: '#f9fafb',
      borderRadius: '12px',
      border: '1px solid #e5e7eb'
    }}>
      {chartData.title && (
        <h3 style={{
          margin: '0 0 20px 0',
          fontSize: '18px',
          fontWeight: '600',
          color: '#111827'
        }}>
          {chartData.title}
        </h3>
      )}
      
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={100}
            tick={{ fill: '#6b7280', fontSize: 12 }}
            label={chartData.xAxis.label ? {
              value: chartData.xAxis.label,
              position: 'insideBottom',
              offset: -50,
              style: { fill: '#374151', fontWeight: 600 }
            } : undefined}
          />
          <YAxis
            tick={{ fill: '#6b7280', fontSize: 12 }}
            label={chartData.yAxis.label ? {
              value: chartData.yAxis.label,
              angle: -90,
              position: 'insideLeft',
              style: { fill: '#374151', fontWeight: 600 }
            } : undefined}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: `${primaryColor}10` }} />
          <Bar
            dataKey="value"
            fill={primaryColor}
            radius={[8, 8, 0, 0]}
            maxBarSize={80}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Legend with data summary */}
      <div style={{
        marginTop: '16px',
        padding: '12px',
        background: 'white',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px' }}>Total</div>
          <div style={{ fontSize: '16px', fontWeight: '700', color: '#111827' }}>
            {chartData.yAxis.data.reduce((a, b) => a + b, 0).toLocaleString()}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px' }}>Average</div>
          <div style={{ fontSize: '16px', fontWeight: '700', color: '#111827' }}>
            {(chartData.yAxis.data.reduce((a, b) => a + b, 0) / chartData.yAxis.data.length).toFixed(0)}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px' }}>Highest</div>
          <div style={{ fontSize: '16px', fontWeight: '700', color: primaryColor }}>
            {Math.max(...chartData.yAxis.data).toLocaleString()}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px' }}>Categories</div>
          <div style={{ fontSize: '16px', fontWeight: '700', color: '#111827' }}>
            {chartData.xAxis.data.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartVisualization;
