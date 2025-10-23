import { useState } from 'react';
import { ExternalLink, Wallet, CreditCard, TrendingUp, Target, Bell, Calendar, Activity, Droplet, Footprints, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Visualization, KeyMetric } from '../types/insight';
import InsightChartRenderer from './InsightChartRenderer';
import { getPriorityColor } from '../utils/insightUtils';
import { getInsightConfig } from '../config/insightConfig';

interface MiniMetricData {
  icon: any;
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  color: string;
  progress?: number;
}

type VerticalContext = {
  type: 'vertical';
  id: string;
  name: string;
  gradient: string;
};

type InsightContext = {
  type: 'insight' | 'forecast';
  vertical: string;
  insight_id: string;
  title: string;
  summary: string;
  priority: string;
  gradient: string;
  visualization?: Visualization;
  key_metric?: KeyMetric;
  actions?: string[];
  what_happening?: string;
  why_matters?: string;
};

interface ContextualSidePanelProps {
  context: VerticalContext | InsightContext;
  onNavigateToDashboard?: () => void;
}

const VERTICAL_DATA: Record<string, {
  mainMetric: { label: string; value: string; change?: string };
  miniMetrics: MiniMetricData[];
}> = {
  money: {
    mainMetric: { label: 'Net Worth', value: '$127.3K', change: '+12.5%' },
    miniMetrics: [
      { icon: Wallet, label: 'Liquid Cash', value: '$24.6K', trend: 'Available', trendUp: true, color: '#10b981' },
      { icon: CreditCard, label: 'Monthly Expense', value: '$4.2K', trend: 'Till date', trendUp: false, color: '#ef4444', progress: 58 },
      { icon: TrendingUp, label: 'Investments', value: '+8.4%', trend: 'YTD', trendUp: true, color: '#8b5cf6' },
      { icon: Target, label: 'Budget', value: '65%', trend: 'Used', color: '#f59e0b', progress: 65 },
      { icon: Bell, label: 'Pending Bills', value: '$1.8K', trend: 'Due soon', trendUp: false, color: '#ef4444' },
      { icon: Target, label: 'Vacation Fund', value: '$7.2K/$10K', trend: '72%', trendUp: true, color: '#10b981', progress: 72 }
    ]
  },
  healthcare: {
    mainMetric: { label: 'Next Checkup', value: 'Dec 15', change: '3 days' },
    miniMetrics: [
      { icon: Calendar, label: 'Checkups Due', value: '2', trend: 'Schedule now', trendUp: false, color: '#f59e0b' },
      { icon: Droplet, label: 'Blood Pressure', value: '120/78', trend: '2 hrs ago', trendUp: true, color: '#06b6d4' },
      { icon: Activity, label: 'Blood Sugar', value: '98 mg/dL', trend: '4 hrs ago', trendUp: true, color: '#8b5cf6' },
      { icon: Footprints, label: 'Steps Today', value: '8,420', trend: '+12%', trendUp: true, color: '#10b981' },
      { icon: Moon, label: 'Sleep Score', value: '85%', trend: 'Good', color: '#3b82f6', progress: 85 },
      { icon: Target, label: 'Weight Loss', value: '8.5/10 lbs', trend: '85%', trendUp: true, color: '#10b981', progress: 85 }
    ]
  }
};

export default function ContextualSidePanel({ context, onNavigateToDashboard }: ContextualSidePanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();
  
  // Check context type
  const isInsightContext = context.type === 'insight' || context.type === 'forecast';
  const data = !isInsightContext ? VERTICAL_DATA[(context as VerticalContext).id] : null;
  
  if (!isInsightContext && !data) return null;

  return (
    <div
      style={{
        width: isExpanded ? '340px' : '56px',
        minWidth: isExpanded ? '340px' : '56px',
        height: '100%',
        background: 'white',
        borderLeft: '1px solid #e5e7eb',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Toggle Button - Only show when expanded */}
      {isExpanded && (
        <button
          onClick={() => setIsExpanded(false)}
          style={{
            position: 'absolute',
            top: '16px',
            left: '12px',
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: '#ff9900',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'all 0.2s',
            boxShadow: '0 2px 8px rgba(255, 153, 0, 0.3)',
            padding: '0'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#e68a00';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 153, 0, 0.4)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#ff9900';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(255, 153, 0, 0.3)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          title="Collapse panel"
        >
          {/* Right arrow for collapse */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      )}

      {/* Panel Content */}
      {isExpanded && (
        <div
          style={{
            padding: '20px',
            paddingTop: '60px',
            overflowY: 'auto',
            height: '100%'
          }}
        >
          {/* VERTICAL CONTEXT (Ecosystem) */}
          {!isInsightContext && data && (
            <>
              {/* Header - Simplified on gradient background */}
              <div
                style={{
                  background: context.gradient,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '16px',
                  color: 'white'
                }}
              >
                <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                  {(context as VerticalContext).name}
                </div>
                <div style={{ fontSize: '11px', opacity: 0.9, marginBottom: '12px' }}>
                  {data.mainMetric.label}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <div style={{ fontSize: '24px', fontWeight: '700' }}>
                    {data.mainMetric.value}
                  </div>
                  {data.mainMetric.change && (
                    <div style={{ fontSize: '13px', fontWeight: '600', opacity: 0.9 }}>
                      {data.mainMetric.change}
                    </div>
                  )}
                </div>
              </div>

              {/* Mini Metrics */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', marginBottom: '12px' }}>
                  Key Metrics
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '10px'
                  }}
                >
                  {data.miniMetrics.map((metric, idx) => {
                    const Icon = metric.icon;
                    return (
                      <div
                        key={idx}
                        style={{
                          padding: '10px',
                          background: `linear-gradient(135deg, ${metric.color}08 0%, #fff 100%)`,
                          borderRadius: '8px',
                          border: `1px solid ${metric.color}20`,
                          transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <div
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '8px',
                              background: `${metric.color}20`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Icon size={14} style={{ color: metric.color }} />
                          </div>
                          <span style={{ fontSize: '11px', fontWeight: '500', color: '#6b7280' }}>
                            {metric.label}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: metric.progress !== undefined ? '6px' : '0' }}>
                          <div style={{ fontSize: '16px', fontWeight: '700', color: '#111827' }}>
                            {metric.value}
                          </div>
                          {metric.trend && (
                            <div
                              style={{
                                fontSize: '10px',
                                color: metric.trendUp ? '#10b981' : '#6b7280',
                                fontWeight: '600'
                              }}
                            >
                              {metric.trend}
                            </div>
                          )}
                        </div>
                        {metric.progress !== undefined && (
                          <div
                            style={{
                              width: '100%',
                              height: '3px',
                              background: '#e5e7eb',
                              borderRadius: '2px',
                              overflow: 'hidden'
                            }}
                          >
                            <div
                              style={{
                                width: `${metric.progress}%`,
                                height: '100%',
                                background: metric.color,
                                borderRadius: '2px',
                                transition: 'width 1s ease-out'
                              }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* View Dashboard Link */}
              <button
                onClick={onNavigateToDashboard}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#ff9900',
                  border: 'none',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#111',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 8px rgba(255, 153, 0, 0.25)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#e68a00';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 153, 0, 0.35)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#ff9900';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(255, 153, 0, 0.25)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>View Full Dashboard</span>
                <ExternalLink size={14} />
              </button>
            </>
          )}

          {/* INSIGHT/FORECAST CONTEXT */}
          {isInsightContext && (
            <>
              {/* Insight Header Card */}
              <div
                style={{
                  background: getInsightConfig((context as InsightContext).vertical).gradient,
                  backdropFilter: 'blur(10px)',
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '16px',
                  position: 'relative',
                  overflow: 'hidden',
                  color: 'white'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '16px' }}>
                    {context.type === 'forecast' ? '🔮' : '💡'}
                  </span>
                  <span style={{ 
                    fontSize: '10px', 
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    color: '#374151',
                    background: '#f3f4f6',
                    padding: '4px 8px',
                    borderRadius: '4px'
                  }}>
                    {context.type}
                  </span>
                </div>
                <div style={{ 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  lineHeight: '1.4', 
                  marginBottom: '8px',
                  color: 'white'
                }}>
                  {(context as InsightContext).title}
                </div>
                {/* Summary/Description */}
                <div style={{ 
                  fontSize: '12px', 
                  lineHeight: '1.5', 
                  marginBottom: '12px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: '400'
                }}>
                  {(context as InsightContext).summary}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    background: getPriorityColor((context as InsightContext).priority),
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '10px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    color: 'white'
                  }}>
                    {(context as InsightContext).priority}
                  </span>
                </div>
              </div>

              {/* Chart Preview */}
              {(context as InsightContext).visualization?.data && (context as InsightContext).visualization!.data.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
                    Visual Data
                  </div>
                  <div style={{
                    background: 'white',
                    borderRadius: '8px',
                    padding: '12px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <InsightChartRenderer
                      visualization={(context as InsightContext).visualization!}
                      gradient={context.gradient}
                      compact={true}
                    />
                  </div>
                </div>
              )}

              {/* What's Happening */}
              {(context as InsightContext).what_happening && (
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
                    What's Happening
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#1f2937',
                    lineHeight: '1.6',
                    padding: '12px',
                    background: '#f9fafb',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    fontWeight: '500'
                  }}>
                    {(context as InsightContext).what_happening}
                  </div>
                </div>
              )}

              {/* Why It Matters */}
              {(context as InsightContext).why_matters && (
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
                    Why It Matters
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#1f2937',
                    lineHeight: '1.6',
                    padding: '12px',
                    background: '#fff7ed',
                    borderRadius: '8px',
                    border: '1px solid #fed7aa',
                    fontWeight: '500'
                  }}>
                    {(context as InsightContext).why_matters}
                  </div>
                </div>
              )}

              {/* Recommended Actions */}
              {(context as InsightContext).actions && (context as InsightContext).actions!.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
                    Recommended Actions
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {(context as InsightContext).actions!.slice(0, 3).map((action, idx) => (
                      <div
                        key={idx}
                        style={{
                          fontSize: '12px',
                          color: '#1f2937',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '6px',
                          padding: '8px',
                          background: '#f9fafb',
                          borderRadius: '6px',
                          lineHeight: '1.4',
                          fontWeight: '500'
                        }}
                      >
                        <span style={{ color: '#6b7280', fontSize: '11px', marginTop: '2px' }}>•</span>
                        <span style={{ flex: 1 }}>{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* View All Insights Button */}
              <button
                onClick={() => navigate('/insights', { state: { insightId: (context as InsightContext).insight_id }})}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#ff9900',
                  border: 'none',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#111',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 8px rgba(255, 153, 0, 0.25)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#e68a00';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 153, 0, 0.35)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#ff9900';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(255, 153, 0, 0.25)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>View All Insights</span>
                <ExternalLink size={14} />
              </button>
            </>
          )}
        </div>
      )}

      {/* Collapsed State - Clickable Dashboard Icon */}
      {!isExpanded && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            height: '100%',
            paddingTop: '16px'
          }}
        >
          {/* Clickable Dashboard Icon */}
          <button
            onClick={() => setIsExpanded(true)}
            title={isInsightContext 
              ? `Expand ${context.type} panel` 
              : `Expand ${(context as VerticalContext).name} panel`
            }
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: '#7c3aed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              border: 'none',
              transition: 'all 0.2s',
              boxShadow: '0 2px 8px rgba(124, 58, 237, 0.3)',
              padding: '0'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.4)';
              e.currentTarget.style.background = '#6d28d9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(124, 58, 237, 0.3)';
              e.currentTarget.style.background = '#7c3aed';
            }}
          >
            {/* Dashboard Grid Icon - 4 squares */}
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="white"
              style={{ pointerEvents: 'none' }}
            >
              <rect x="3" y="3" width="8" height="8" />
              <rect x="13" y="3" width="8" height="8" />
              <rect x="3" y="13" width="8" height="8" />
              <rect x="13" y="13" width="8" height="8" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
