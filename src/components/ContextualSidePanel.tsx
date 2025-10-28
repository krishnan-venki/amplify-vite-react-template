import { useState } from 'react';
import { ExternalLink, Wallet, CreditCard, TrendingUp, Target, Bell, Calendar, Activity, Droplet, Footprints, Moon, Home, AlertTriangle, Clock } from 'lucide-react';
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

export type AssetContext = {
  type: 'asset';
  asset_id: string;
  assetName: string;
  assetType: string;
  location?: string;
  risk_score: number;
  condition: string;
  age_years: number;
  lifespan_years: number;
  replacement_cost: number;
  maintenance_status: string;
  gradient: string;
  // Detailed data for tabs
  maintenanceHistory?: Array<{
    date: string;
    type: string;
    cost: number;
    provider: string;
    notes: string;
  }>;
  evaluation?: {
    lastEvaluatedAt: string;
    risk_score: number;
    replacement_urgency: string;
    lifespan_remaining: string;
    condition_assessment: {
      current_condition: string;
      key_factors: string[];
      failure_indicators: string[];
    };
    insights: string[];
    recommendations: Array<{
      action: string;
      reasoning: string;
      priority: number;
      estimated_cost: number;
      timeframe: string;
    }>;
  };
};

interface ContextualSidePanelProps {
  context: VerticalContext | InsightContext | AssetContext;
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
  const [assetActiveTab, setAssetActiveTab] = useState<'maintenance' | 'evaluation'>('maintenance');
  const navigate = useNavigate();
  
  // Check context type
  const isInsightContext = context.type === 'insight' || context.type === 'forecast';
  const isAssetContext = context.type === 'asset';
  const data = !isInsightContext && !isAssetContext ? VERTICAL_DATA[(context as VerticalContext).id] : null;
  
  if (!isInsightContext && !isAssetContext && !data) return null;

  // Helper function to format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Generate asset mini metrics
  const getAssetMiniMetrics = (assetCtx: AssetContext): MiniMetricData[] => {
    const lifespanPercentage = Math.round((assetCtx.age_years / assetCtx.lifespan_years) * 100);
    const yearsRemaining = assetCtx.lifespan_years - assetCtx.age_years;
    
    return [
      { 
        icon: Home, 
        label: 'Asset Type', 
        value: assetCtx.assetType, 
        trend: assetCtx.location || 'Property', 
        color: '#0369a1' 
      },
      { 
        icon: AlertTriangle, 
        label: 'Risk Score', 
        value: `${assetCtx.risk_score}/100`, 
        trend: assetCtx.risk_score >= 75 ? 'High Risk' : assetCtx.risk_score >= 50 ? 'Medium' : 'Low Risk',
        trendUp: assetCtx.risk_score < 50,
        color: assetCtx.risk_score >= 75 ? '#ef4444' : assetCtx.risk_score >= 50 ? '#f59e0b' : '#10b981',
        progress: assetCtx.risk_score
      },
      { 
        icon: Activity, 
        label: 'Condition', 
        value: assetCtx.condition, 
        trend: assetCtx.maintenance_status,
        trendUp: assetCtx.condition === 'Excellent' || assetCtx.condition === 'Good',
        color: assetCtx.condition === 'Excellent' || assetCtx.condition === 'Good' ? '#10b981' : assetCtx.condition === 'Fair' ? '#f59e0b' : '#ef4444'
      },
      { 
        icon: Clock, 
        label: 'Age / Lifespan', 
        value: `${assetCtx.age_years}y / ${assetCtx.lifespan_years}y`, 
        trend: `${lifespanPercentage}% used`,
        trendUp: lifespanPercentage < 75,
        color: '#8b5cf6',
        progress: lifespanPercentage
      },
      { 
        icon: TrendingUp, 
        label: 'Replacement Cost', 
        value: formatCurrency(assetCtx.replacement_cost), 
        trend: yearsRemaining > 0 ? `~${yearsRemaining}y remaining` : 'Overdue',
        trendUp: yearsRemaining > 2,
        color: yearsRemaining > 2 ? '#10b981' : '#ef4444'
      },
      { 
        icon: Target, 
        label: 'Lifespan Progress', 
        value: `${lifespanPercentage}%`, 
        trend: yearsRemaining > 0 ? `${yearsRemaining} years left` : 'Replacement due',
        trendUp: lifespanPercentage < 90,
        color: '#0369a1',
        progress: lifespanPercentage
      }
    ];
  };

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
            paddingBottom: '100px',
            overflowY: 'auto',
            overflowX: 'hidden',
            flex: 1,
            minHeight: 0
          }}
        >
          {/* VERTICAL CONTEXT (Ecosystem) */}
          {!isInsightContext && !isAssetContext && data && (
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

          {/* ASSET CONTEXT */}
          {isAssetContext && (
            <>
              {/* Asset Header Card */}
              <div
                style={{
                  background: (context as AssetContext).gradient,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '16px',
                  color: 'white'
                }}
              >
                <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                  {(context as AssetContext).assetName}
                </div>
                <div style={{ fontSize: '11px', opacity: 0.9, marginBottom: '12px' }}>
                  {(context as AssetContext).assetType} {(context as AssetContext).location && `• ${(context as AssetContext).location}`}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '10px', opacity: 0.85, marginBottom: '2px' }}>Risk Score</div>
                    <div style={{ fontSize: '24px', fontWeight: '700' }}>
                      {(context as AssetContext).risk_score}/100
                    </div>
                  </div>
                  <div style={{ height: '40px', width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.3)' }} />
                  <div>
                    <div style={{ fontSize: '10px', opacity: 0.85, marginBottom: '2px' }}>Condition</div>
                    <div style={{ fontSize: '14px', fontWeight: '600' }}>
                      {(context as AssetContext).condition}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mini Metrics */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', marginBottom: '12px' }}>
                  Asset Details
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '10px'
                  }}
                >
                  {getAssetMiniMetrics(context as AssetContext).map((metric, idx) => {
                    const Icon = metric.icon;
                    return (
                      <div
                        key={idx}
                        style={{
                          padding: '10px',
                          background: `linear-gradient(135deg, ${metric.color}08 0%, #fff 100%)`,
                          borderRadius: '8px',
                          border: `1px solid ${metric.color}15`
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                          <div
                            style={{
                              width: '22px',
                              height: '22px',
                              borderRadius: '6px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: `${metric.color}20`,
                              flexShrink: 0
                            }}
                          >
                            <Icon size={13} color={metric.color} strokeWidth={2.5} />
                          </div>
                          <div style={{ fontSize: '10px', fontWeight: '600', color: '#6b7280' }}>
                            {metric.label}
                          </div>
                        </div>
                        <div style={{ fontSize: '15px', fontWeight: '700', color: '#111', marginBottom: '2px' }}>
                          {metric.value}
                        </div>
                        {metric.trend && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ fontSize: '10px', color: '#9ca3af' }}>
                              {metric.trend}
                            </span>
                            {metric.trendUp !== undefined && (
                              <span style={{ fontSize: '10px' }}>
                                {metric.trendUp ? '📈' : '📉'}
                              </span>
                            )}
                          </div>
                        )}
                        {metric.progress !== undefined && (
                          <div style={{ marginTop: '6px' }}>
                            <div
                              style={{
                                height: '4px',
                                borderRadius: '2px',
                                background: '#e5e7eb',
                                overflow: 'hidden'
                              }}
                            >
                              <div
                                style={{
                                  height: '100%',
                                  width: `${Math.min(metric.progress, 100)}%`,
                                  background: metric.color,
                                  transition: 'width 0.3s ease',
                                  borderRadius: '2px'
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Detailed Tabs */}
              {((context as AssetContext).maintenanceHistory || (context as AssetContext).evaluation) && (
                <div style={{ marginBottom: '16px' }}>
                  {/* Tab Headers */}
                  <div style={{ 
                    display: 'flex', 
                    gap: '8px', 
                    marginBottom: '12px',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    <button
                      onClick={() => setAssetActiveTab('maintenance')}
                      style={{
                        flex: 1,
                        padding: '10px 12px',
                        background: 'none',
                        border: 'none',
                        borderBottom: assetActiveTab === 'maintenance' ? '2px solid #0369a1' : '2px solid transparent',
                        fontSize: '13px',
                        fontWeight: assetActiveTab === 'maintenance' ? '600' : '500',
                        color: assetActiveTab === 'maintenance' ? '#0369a1' : '#6b7280',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      🔧 Maintenance
                    </button>
                    <button
                      onClick={() => setAssetActiveTab('evaluation')}
                      style={{
                        flex: 1,
                        padding: '10px 12px',
                        background: 'none',
                        border: 'none',
                        borderBottom: assetActiveTab === 'evaluation' ? '2px solid #0369a1' : '2px solid transparent',
                        fontSize: '13px',
                        fontWeight: assetActiveTab === 'evaluation' ? '600' : '500',
                        color: assetActiveTab === 'evaluation' ? '#0369a1' : '#6b7280',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      📊 Evaluation
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div style={{ 
                    maxHeight: '300px', 
                    overflowY: 'auto',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    padding: '12px'
                  }}>
                    {assetActiveTab === 'maintenance' && (context as AssetContext).maintenanceHistory && (
                      <div>
                        {(context as AssetContext).maintenanceHistory!.length > 0 ? (
                          <>
                            <div style={{ fontSize: '11px', fontWeight: '600', color: '#6b7280', marginBottom: '8px' }}>
                              Recent Maintenance ({(context as AssetContext).maintenanceHistory!.length} records)
                            </div>
                            {(context as AssetContext).maintenanceHistory!.map((record, idx) => (
                              <div
                                key={idx}
                                style={{
                                  padding: '10px',
                                  backgroundColor: 'white',
                                  borderRadius: '6px',
                                  marginBottom: '8px',
                                  border: '1px solid #e5e7eb'
                                }}
                              >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#1f2937' }}>
                                    {record.type}
                                  </span>
                                  <span style={{ fontSize: '11px', fontWeight: '600', color: '#0369a1' }}>
                                    ${record.cost.toLocaleString()}
                                  </span>
                                </div>
                                <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px' }}>
                                  📅 {new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </div>
                                <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px' }}>
                                  👤 {record.provider}
                                </div>
                                {record.notes && (
                                  <div style={{ fontSize: '10px', color: '#9ca3af', fontStyle: 'italic', marginTop: '6px' }}>
                                    {record.notes}
                                  </div>
                                )}
                              </div>
                            ))}
                          </>
                        ) : (
                          <div style={{ textAlign: 'center', padding: '20px', color: '#9ca3af', fontSize: '12px' }}>
                            No maintenance records available
                          </div>
                        )}
                      </div>
                    )}

                    {assetActiveTab === 'evaluation' && (context as AssetContext).evaluation && (
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: '600', color: '#6b7280', marginBottom: '8px' }}>
                          Latest AI Evaluation
                        </div>
                        
                        {/* Key Factors */}
                        {(context as AssetContext).evaluation!.condition_assessment.key_factors.length > 0 && (
                          <div style={{ marginBottom: '12px' }}>
                            <div style={{ fontSize: '11px', fontWeight: '600', color: '#1f2937', marginBottom: '6px' }}>
                              🔍 Key Factors:
                            </div>
                            {(context as AssetContext).evaluation!.condition_assessment.key_factors.map((factor, idx) => (
                              <div
                                key={idx}
                                style={{
                                  fontSize: '11px',
                                  color: '#6b7280',
                                  marginBottom: '4px',
                                  paddingLeft: '16px',
                                  position: 'relative'
                                }}
                              >
                                <span style={{ position: 'absolute', left: '0' }}>•</span>
                                {factor}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Failure Indicators */}
                        {(context as AssetContext).evaluation!.condition_assessment.failure_indicators.length > 0 && (
                          <div style={{ marginBottom: '12px' }}>
                            <div style={{ fontSize: '11px', fontWeight: '600', color: '#ef4444', marginBottom: '6px' }}>
                              ⚠️ Failure Indicators:
                            </div>
                            {(context as AssetContext).evaluation!.condition_assessment.failure_indicators.map((indicator, idx) => (
                              <div
                                key={idx}
                                style={{
                                  fontSize: '11px',
                                  color: '#ef4444',
                                  marginBottom: '4px',
                                  paddingLeft: '16px',
                                  position: 'relative'
                                }}
                              >
                                <span style={{ position: 'absolute', left: '0' }}>•</span>
                                {indicator}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Top Recommendations */}
                        {(context as AssetContext).evaluation!.recommendations.length > 0 && (
                          <div style={{ marginBottom: '12px' }}>
                            <div style={{ fontSize: '11px', fontWeight: '600', color: '#1f2937', marginBottom: '6px' }}>
                              💡 Top Recommendations:
                            </div>
                            {(context as AssetContext).evaluation!.recommendations.slice(0, 3).map((rec, idx) => (
                              <div
                                key={idx}
                                style={{
                                  padding: '8px',
                                  backgroundColor: 'white',
                                  borderRadius: '6px',
                                  marginBottom: '6px',
                                  border: '1px solid #e5e7eb'
                                }}
                              >
                                <div style={{ fontSize: '11px', fontWeight: '600', color: '#1f2937', marginBottom: '3px' }}>
                                  {rec.action}
                                </div>
                                <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '3px' }}>
                                  {rec.reasoning}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                                  <span style={{ 
                                    fontSize: '10px', 
                                    color: rec.timeframe === 'immediate' ? '#ef4444' : '#f59e0b',
                                    fontWeight: '600'
                                  }}>
                                    {rec.timeframe.replace('_', ' ')}
                                  </span>
                                  <span style={{ fontSize: '10px', fontWeight: '600', color: '#0369a1' }}>
                                    ~${rec.estimated_cost.toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Insights */}
                        {(context as AssetContext).evaluation!.insights.length > 0 && (
                          <div>
                            <div style={{ fontSize: '11px', fontWeight: '600', color: '#1f2937', marginBottom: '6px' }}>
                              💬 AI Insights:
                            </div>
                            {(context as AssetContext).evaluation!.insights.map((insight, idx) => (
                              <div
                                key={idx}
                                style={{
                                  fontSize: '11px',
                                  color: '#6b7280',
                                  marginBottom: '6px',
                                  padding: '8px',
                                  backgroundColor: 'white',
                                  borderRadius: '6px',
                                  border: '1px solid #e5e7eb'
                                }}
                              >
                                {insight}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* View Asset Details Button */}
              <button
                onClick={() => navigate('/life/dashboard', { state: { assetId: (context as AssetContext).asset_id }})}
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
                <span>View Asset Details</span>
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
                  {/* Goal Badge if linked to a goal */}
                  {(context as InsightContext & { goal_context?: any }).goal_context && (
                    <span 
                      style={{
                        background: 'rgba(255, 255, 255, 0.25)',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '10px',
                        fontWeight: '600',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onClick={() => {
                        const goalId = (context as InsightContext & { goal_context?: any }).goal_context?.goal_id;
                        if (goalId) navigate(`/goals/${goalId}`);
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.35)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                      }}
                      title={`View goal: ${(context as InsightContext & { goal_context?: any }).goal_context?.goal_name}`}
                    >
                      <span>🎯</span>
                      <span>GOAL</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Chart Preview - Show reallocation chart for goal insights, regular chart otherwise */}
              {(context as any).reallocation_plan ? (
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
                    Reallocation Plan
                  </div>
                  <div style={{
                    background: 'white',
                    borderRadius: '8px',
                    padding: '12px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <InsightChartRenderer
                      visualization={{
                        chart_type: 'reallocation_flow',
                        data: [
                          ...((context as any).reallocation_plan.from_categories || []).map((cat: any) => ({
                            label: cat.category,
                            value: -cat.reduction,
                            type: 'source'
                          })),
                          {
                            label: (context as any).reallocation_plan.to_goal || 'Goal',
                            value: (context as any).reallocation_plan.total_monthly_impact || 0,
                            type: 'target'
                          }
                        ]
                      }}
                      gradient="#ffffff"
                      compact={true}
                    />
                  </div>
                </div>
              ) : (
                (context as InsightContext).visualization?.data && (context as InsightContext).visualization!.data.length > 0 && (
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
                )
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
