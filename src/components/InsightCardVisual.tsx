import React from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Insight, FullContent } from '../types/insight';
import { getInsightConfig, VERTICAL_CONFIG } from '../config/insightConfig';
import { getPriorityColor, formatRelativeTime, isForecast, mapBackendVerticalToFrontend } from '../utils/insightUtils';
import InsightChartRenderer from './InsightChartRenderer';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

interface InsightCardVisualProps {
  insight: Insight;
  isExpanded: boolean;
  onToggle: () => void;
}

/**
 * Visual-first insight card with charts, key metrics, and action pills
 */
const InsightCardVisual: React.FC<InsightCardVisualProps> = ({ 
  insight, 
  isExpanded, 
  onToggle 
}) => {
  const navigate = useNavigate();
  const config = getInsightConfig(insight.vertical);
  const priorityColor = getPriorityColor(insight.priority);
  const isInsightForecast = isForecast(insight);

  // Check if this is a cross-vertical insight
  const isCrossVertical = insight.vertical_scope === 'cross_vertical' && 
                          insight.verticals_involved && 
                          insight.verticals_involved.length > 1;
  
  // Get all vertical configs for cross-vertical insights
  const verticalConfigs = isCrossVertical && insight.verticals_involved
    ? insight.verticals_involved.map(backendVertical => {
        const frontendVertical = mapBackendVerticalToFrontend(backendVertical);
        return VERTICAL_CONFIG[frontendVertical] || VERTICAL_CONFIG['sagaa_money'];
      })
    : [config];

  // Check if we have visualization data
  const hasVisualization = insight.visualization && 
                          insight.visualization.data && 
                          insight.visualization.data.length > 0;

  return (
    <div
      id={`insight-${insight.insight_id}`}
      style={{
        background: config.bgGradient,
        borderRadius: '16px',
        boxShadow: isExpanded 
          ? '0 8px 32px rgba(124, 58, 237, 0.20)' 
          : '0 4px 24px rgba(80, 80, 160, 0.10)',
        padding: '28px',
        transition: 'all 0.3s ease',
        border: isExpanded ? '2px solid #7c3aed' : '1px solid #e5e7eb',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(80, 80, 160, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = isExpanded 
          ? '0 8px 32px rgba(124, 58, 237, 0.20)' 
          : '0 4px 24px rgba(80, 80, 160, 0.10)';
      }}
    >
      {/* Confidence Badge - Top Right (only for forecasts) */}
      {isInsightForecast && insight.confidence_level && (
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: insight.confidence_level === 'high' ? '#10b981' 
            : insight.confidence_level === 'medium' ? '#f59e0b' 
            : '#6b7280',
          color: 'white',
          fontSize: '11px',
          fontWeight: '700',
          padding: '6px 10px',
          borderRadius: '10px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          height: '32px',
          lineHeight: '1'
        }}>
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'white'
          }}></span>
          {insight.confidence_level.charAt(0).toUpperCase() + insight.confidence_level.slice(1)}
        </div>
      )}

      {/* Icon(s) and Vertical Label Row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '16px'
      }}>
        {/* Icons - Multiple for cross-vertical, single otherwise */}
        <div style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center'
        }}>
          {verticalConfigs.map((vertConfig, index) => {
            const VerticalIcon = vertConfig.icon;
            return (
              <div
                key={index}
                style={{
                  fontSize: '2.2rem',
                  background: vertConfig.gradient,
                  borderRadius: '12px',
                  width: '56px',
                  height: '56px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  boxShadow: '0 2px 12px rgba(124, 58, 237, 0.10)',
                  flexShrink: 0
                }}
              >
                <VerticalIcon size={28} />
              </div>
            );
          })}
        </div>

        {/* Vertical Label(s) */}
        <div style={{
          fontSize: '0.95rem',
          fontWeight: '600',
          color: '#6b7280'
        }}>
          {isCrossVertical && insight.verticals_involved
            ? `Cross-Vertical: ${verticalConfigs.map(vc => 
                vc.vertical.charAt(0).toUpperCase() + vc.vertical.slice(1)
              ).join(' · ')}`
            : <span style={{ textTransform: 'capitalize' }}>{config.vertical}</span>}
        </div>

        {/* Goal Badge - if insight is linked to a goal */}
        {insight.goal_context && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white',
            fontSize: '12px',
            fontWeight: '600',
            padding: '6px 12px',
            borderRadius: '20px',
            boxShadow: '0 2px 8px rgba(16, 185, 129, 0.25)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/goals/${insight.goal_context?.goal_id}`);
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(16, 185, 129, 0.25)';
          }}
          title={`View goal: ${insight.goal_context.goal_name}`}
          >
            <span>🎯</span>
            <span>{insight.goal_context.goal_name}</span>
          </div>
        )}
      </div>

      {/* Title - Full Width with badges */}
      <div style={{
        fontSize: '1.2rem',
        fontWeight: '600',
        color: '#111827',
        marginBottom: '10px',
        lineHeight: '1.4'
      }}>
        {insight.title}
        {/* Priority Badge as superscript */}
        <sup style={{
          background: priorityColor,
          color: 'white',
          fontSize: '0.55rem',
          fontWeight: '700',
          padding: '3px 6px',
          borderRadius: '4px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          marginLeft: '8px',
          verticalAlign: 'super',
          display: 'inline-block',
          lineHeight: '1'
        }}>
          {insight.priority}
        </sup>
        {/* NEW Badge */}
        {!insight.viewed && (
          <sup style={{
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white',
            fontSize: '0.55rem',
            fontWeight: '700',
            padding: '3px 6px',
            borderRadius: '4px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
            marginLeft: '8px',
            verticalAlign: 'super',
            display: 'inline-block',
            lineHeight: '1'
          }}>
            NEW
          </sup>
        )}
      </div>

      {/* Summary - Full Width */}
      <div style={{
        fontSize: '0.95rem',
        color: '#6b7280',
        lineHeight: '1.6',
        marginBottom: '20px'
      }}>
        {insight.summary}
      </div>

      {/* Chart (Only show if no reallocation plan exists) */}
      {hasVisualization && insight.visualization && !(insight as any).reallocation_plan && (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '20px',
          border: '1px solid #e5e7eb',
          marginBottom: '20px'
        }}>
          <InsightChartRenderer 
            visualization={insight.visualization}
            gradient={config.gradient}
            compact={true}
          />
        </div>
      )}

      {/* Reallocation Flow Chart (if reallocation_plan exists) */}
      {(insight as any).reallocation_plan && (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '20px',
          border: '1px solid #e5e7eb',
          marginBottom: '20px'
        }}>
          <InsightChartRenderer 
            visualization={{
              chart_type: 'reallocation_flow',
              data: [
                // Map from_categories as sources (negative values)
                ...((insight as any).reallocation_plan.from_categories || []).map((cat: any) => ({
                  label: cat.category,
                  value: -cat.reduction,
                  type: 'source'
                })),
                // Map to_goal as target (positive value)
                {
                  label: (insight as any).reallocation_plan.to_goal || 'Goal',
                  value: (insight as any).reallocation_plan.total_monthly_impact || 0,
                  type: 'target'
                }
              ]
            }}
            gradient="#ffffff"
            compact={true}
          />
          {/* Timeline acceleration info */}
          {(insight as any).reallocation_plan.timeline_acceleration && (
            <div style={{
              marginTop: '12px',
              padding: '12px',
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#1e40af'
            }}>
              <span>⚡</span>
              <span>{(insight as any).reallocation_plan.timeline_acceleration}</span>
            </div>
          )}
        </div>
      )}

      {/* Action Pills (Always visible when exists) */}
      {insight.actions && insight.actions.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: '700',
            color: '#6b7280',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '10px'
          }}>
            RECOMMENDED ACTIONS
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}>
            {insight.actions.slice(0, 3).map((action, index) => (
              <div
                key={index}
                style={{
                  fontSize: '0.9rem',
                  color: '#374151',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  lineHeight: '1.5',
                  paddingLeft: '0'
                }}
              >
                <span style={{ 
                  fontSize: '0.9rem',
                  flexShrink: 0,
                  marginTop: '1px',
                  color: '#9ca3af'
                }}>
                  •
                </span>
                <span style={{ 
                  fontSize: '1.1rem',
                  flexShrink: 0,
                  marginTop: '0px',
                  marginLeft: '-2px'
                }}>
                  {index === 0 ? '📊' : index === 1 ? '💰' : '🎯'}
                </span>
                <span style={{ flex: 1 }}>{action}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Impact Statement (Always visible when exists) */}
      {insight.impact && (
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '14px 16px',
          borderRadius: '10px',
          border: '1px solid rgba(102, 126, 234, 0.3)',
          marginBottom: '16px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{ fontSize: '1.5rem' }}>💰</span>
            <span style={{
              fontSize: '0.9rem',
              fontWeight: '600',
              color: 'white',
              lineHeight: '1.4'
            }}>
              {insight.impact}
            </span>
          </div>
        </div>
      )}

      {/* EXPANDED STATE: Additional Details */}
      {isExpanded && (
        <div style={{
          animation: 'fadeIn 0.3s ease-in-out',
          marginTop: '20px'
        }}>
          {/* Full Content - Check if it's the new structure or legacy string */}
          {insight.full_content && (
            <div style={{ marginBottom: '20px' }}>
              {typeof insight.full_content === 'string' ? (
                // Legacy: Markdown string
                <div style={{
                  fontSize: '1rem',
                  color: '#4b5563',
                  lineHeight: '1.7'
                }} className="insight-markdown-content">
                  <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    remarkPlugins={[remarkGfm]}
                  >
                    {insight.full_content}
                  </ReactMarkdown>
                </div>
              ) : (
                // New: Structured FullContent object - Only show what_happening and why_matters
                <>
                  {/* What's Happening */}
                  {(insight.full_content as FullContent).what_happening && (
                    <div style={{ marginBottom: '20px' }}>
                      <h3 style={{
                        fontSize: '1.2rem',
                        fontWeight: '700',
                        color: '#111827',
                        marginBottom: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <span>📊</span> What's Happening
                      </h3>
                      <p style={{
                        fontSize: '1rem',
                        color: '#4b5563',
                        lineHeight: '1.7',
                        margin: 0
                      }}>
                        {(insight.full_content as FullContent).what_happening}
                      </p>
                    </div>
                  )}

                  {/* Why It Matters */}
                  {(insight.full_content as FullContent).why_matters && (
                    <div style={{ marginBottom: '20px' }}>
                      <h3 style={{
                        fontSize: '1.2rem',
                        fontWeight: '700',
                        color: '#111827',
                        marginBottom: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <span>💡</span> Why It Matters
                      </h3>
                      <p style={{
                        fontSize: '1rem',
                        color: '#4b5563',
                        lineHeight: '1.7',
                        margin: 0
                      }}>
                        {(insight.full_content as FullContent).why_matters}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Footer: Time + Ask Sagaa + Expand/Collapse */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '16px',
        paddingTop: '16px',
        borderTop: '1px solid #e5e7eb'
      }}>
        <div style={{
          fontSize: '0.85rem',
          color: '#9ca3af'
        }}>
          {formatRelativeTime(insight.generated_at)}
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {/* Ask Sagaa Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate('/chat', {
                state: {
                  context: {
                    type: isInsightForecast ? 'forecast' : 'insight',
                    vertical: insight.vertical,
                    insight_id: insight.insight_id,
                    title: insight.title,
                    summary: insight.summary,
                    priority: insight.priority,
                    gradient: config.bgGradient,
                    insight_type: insight.insight_type,
                    visualization: insight.visualization,
                    key_metric: insight.key_metric,
                    actions: typeof insight.full_content === 'object' 
                      ? insight.full_content?.detailed_actions?.map(a => a.action) 
                      : insight.actions,
                    what_happening: typeof insight.full_content === 'object'
                      ? insight.full_content?.what_happening
                      : undefined,
                    why_matters: typeof insight.full_content === 'object'
                      ? insight.full_content?.why_matters
                      : undefined,
                    // Include goal context if present
                    goal_context: insight.goal_context,
                    // Include reallocation plan if present
                    reallocation_plan: (insight as any).reallocation_plan
                  }
                }
              });
            }}
            style={{
              border: '1px solid #d1d5db',
              background: 'white',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              padding: '8px 16px',
              transition: 'all 0.2s ease',
              fontSize: '0.85rem',
              fontWeight: '600',
              color: '#7c3aed'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f5f3ff';
              e.currentTarget.style.borderColor = '#7c3aed';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.borderColor = '#d1d5db';
            }}
          >
            <MessageCircle size={16} strokeWidth={2.5} />
            Ask Sagaa
          </button>

          {/* View Goal Button - only show if linked to a goal */}
          {insight.goal_context && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/goals/${insight.goal_context?.goal_id}`);
              }}
              style={{
                border: '1px solid #10b981',
                background: 'white',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                padding: '8px 16px',
                transition: 'all 0.2s ease',
                fontSize: '0.85rem',
                fontWeight: '600',
                color: '#10b981'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#d1fae5';
                e.currentTarget.style.borderColor = '#059669';
                e.currentTarget.style.color = '#059669';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.borderColor = '#10b981';
                e.currentTarget.style.color = '#10b981';
              }}
              title={`View goal: ${insight.goal_context.goal_name}`}
            >
              <span style={{ fontSize: '14px' }}>🎯</span>
              View Goal
            </button>
          )}

          {/* Show Details Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            style={{
              border: '1px solid #d1d5db',
              background: 'white',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              padding: '8px 16px',
              transition: 'all 0.2s ease',
              fontSize: '0.85rem',
              fontWeight: '600',
              color: '#374151'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f3f4f6';
              e.currentTarget.style.borderColor = '#9ca3af';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.borderColor = '#d1d5db';
            }}
          >
            {isExpanded ? 'Show Less' : 'Show Details'}
            <ChevronDown
              size={16}
              strokeWidth={2.5}
              style={{
                transition: 'transform 0.3s ease',
                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsightCardVisual;
