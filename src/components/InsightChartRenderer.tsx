import React from 'react';
import { Visualization } from '../types/insight';
import InsightBarChart from './charts/InsightBarChart';
import InsightLineChart from './charts/InsightLineChart';
import InsightDonutChart from './charts/InsightDonutChart';
import GoalVelocityGauge from './charts/GoalVelocityGauge';
import GoalProgressTimelineChart from './charts/GoalProgressTimelineChart';
import ReallocationFlowChart from './charts/ReallocationFlowChart';
import AssetLifespanChart from './charts/AssetLifespanChart';

interface InsightChartRendererProps {
  visualization: Visualization;
  gradient?: string;
  compact?: boolean;
}

/**
 * Central chart renderer that routes to the appropriate chart component
 * based on the visualization.chart_type
 */
const InsightChartRenderer: React.FC<InsightChartRendererProps> = ({ 
  visualization, 
  gradient,
  compact = false 
}) => {
  const { chart_type, data, trend_line } = visualization;

  // Validate data
  if (!data || data.length === 0) {
    return (
      <div style={{
        padding: compact ? '20px' : '40px',
        textAlign: 'center',
        color: '#9ca3af',
        background: '#f9fafb',
        borderRadius: '12px',
        border: '1px dashed #d1d5db'
      }}>
        <p style={{ margin: 0, fontSize: compact ? '13px' : '14px' }}>
          No visualization data available
        </p>
      </div>
    );
  }

  // Render chart based on type
  const renderChart = () => {
    switch (chart_type) {
      case 'bar':
        return <InsightBarChart data={data} gradient={gradient} compact={compact} />;
      
      case 'comparison_bars':
        return <InsightBarChart data={data} gradient={gradient} compact={compact} />;
      
      case 'bar_with_trend':
        return <InsightBarChart data={data} trendLine={trend_line} gradient={gradient} compact={compact} />;
      
      case 'line':
        return <InsightLineChart data={data} gradient={gradient} compact={compact} />;
      
      case 'donut':
        return (
          <>
            <InsightDonutChart data={data} gradient={gradient} compact={compact} />
            {visualization.annotation && (
              <div style={{
                textAlign: 'center',
                fontSize: compact ? '11px' : '12px',
                color: '#6b7280',
                marginTop: '8px',
                fontStyle: 'italic'
              }}>
                {visualization.annotation}
              </div>
            )}
          </>
        );
      
      case 'goal_velocity':
        return <GoalVelocityGauge data={data} gradient={gradient} compact={compact} />;
      
      case 'goal_progress_timeline':
        return <GoalProgressTimelineChart data={data} gradient={gradient} compact={compact} />;
      
      case 'reallocation_flow':
        return <ReallocationFlowChart data={data} gradient={gradient} compact={compact} />;
      
      case 'asset_lifespan':
        return <AssetLifespanChart data={data} gradient={gradient} compact={compact} />;
      
      default:
        return (
          <div style={{
            padding: compact ? '20px' : '40px',
            textAlign: 'center',
            color: '#9ca3af',
            background: '#f9fafb',
            borderRadius: '12px',
            border: '1px dashed #d1d5db'
          }}>
            <p style={{ margin: 0, fontSize: compact ? '13px' : '14px' }}>
              Unsupported chart type: {chart_type}
            </p>
          </div>
        );
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {renderChart()}
    </div>
  );
};

export default InsightChartRenderer;
