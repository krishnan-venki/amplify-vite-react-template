import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { ChevronDown, RefreshCw } from 'lucide-react';
import { useInsights } from '../hooks/useInsights';
import { getInsightConfig } from '../config/insightConfig';
import { formatRelativeTime, sortInsightsByPriority, getPriorityColor, isForecast } from '../utils/insightUtils';
import type { Insight } from '../types/insight';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import VerticalFilterSidebar from '../components/VerticalFilterSidebar';

type FilterType = 'all' | 'insights' | 'forecasts';

export default function Insights() {
  const { user } = useAuthenticator(context => [context.user]);
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [selectedVertical, setSelectedVertical] = useState<string>('sagaa_money');

  // Fetch insights using React Query
  const { data: insights = [], isLoading, isError, refetch } = useInsights();

  // Calculate which verticals have data
  const verticals = useMemo(() => {
    const verticalData = [
      { id: 'sagaa_money', name: 'Money', gradient: 'linear-gradient(135deg, #10b981 0%, #0d9488 100%)' },
      { id: 'sagaa_healthcare', name: 'Healthcare', gradient: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)' },
      { id: 'sagaa_education', name: 'Education', gradient: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' },
      { id: 'sagaa_lifeessentials', name: 'Life Essentials', gradient: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)' },
    ];

    return verticalData.map(v => ({
      ...v,
      // Check if any insight has this vertical, or defaults to it (for sagaa_money)
      hasData: insights.some(insight => (insight.vertical || 'sagaa_money') === v.id)
    }));
  }, [insights]);

  // Filter insights based on selected vertical and type
  const filteredInsights = useMemo(() => {
    // Default to 'sagaa_money' if vertical is not specified (matches aggregateInsights logic)
    let filtered = insights.filter(insight => (insight.vertical || 'sagaa_money') === selectedVertical);
    
    if (filterType === 'forecasts') {
      filtered = filtered.filter(insight => isForecast(insight));
    } else if (filterType === 'insights') {
      filtered = filtered.filter(insight => !isForecast(insight));
    }
    
    return filtered;
  }, [insights, selectedVertical, filterType]);

  // Sort insights by priority
  const sortedInsights = sortInsightsByPriority(filteredInsights);
  
  // Count insights and forecasts for current vertical
  const insightsCount = insights.filter(i => !isForecast(i) && (i.vertical || 'sagaa_money') === selectedVertical).length;
  const forecastsCount = insights.filter(i => isForecast(i) && (i.vertical || 'sagaa_money') === selectedVertical).length;

  // Check if we navigated here with a specific insight to expand
  useEffect(() => {
    const state = location.state as { insightId?: string } | null;
    if (state?.insightId) {
      setExpandedCard(state.insightId);
      // Scroll to the card after a brief delay
      setTimeout(() => {
        const element = document.getElementById(`insight-${state.insightId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [location.state]);

  // Redirect if unauthenticated
  useEffect(() => {
    if (!user) {
      const from = encodeURIComponent(location.pathname + location.search);
      navigate(`/signin?from=${from}`, { replace: true });
    }
  }, [user, navigate, location]);

  const toggleCard = (insightId: string) => {
    setExpandedCard(prev => prev === insightId ? null : insightId);
  };

  return (
    <>
      {/* Hero Section - Full Width */}
      <div style={{
        background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)',
        padding: 'clamp(6px, 1.25vw, 12px) clamp(20px, 4vw, 40px)',
        marginBottom: 0,
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: 'clamp(48px, 5vw, 72px)',
            fontWeight: '100',
            marginBottom: '22px',
            lineHeight: '1.4',
            background: 'linear-gradient(135deg, #007AFF 0%, #00D2FF 50%, #34C759 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Your <span style={{ fontWeight: '600' }}>Insights</span>
          </h1>
          <p style={{
            fontSize: 'clamp(14px, 2vw, 18px)',
            color: '#d1d5db',
            marginBottom: 'clamp(16px, 3vw, 24px)'
          }}>
            Stay informed with personalized insights and upcoming reminders to help you make better decisions across your life verticals.
          </p>
        </div>
        {/* Decorative background pattern - hide on mobile */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          display: window.innerWidth < 768 ? 'none' : 'block'
        }} />
      </div>

      {/* Main content area with sidebar */}
      <div style={{ 
        display: 'flex',
        gap: '20px',
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: 'clamp(16px, 3vw, 32px)',
        paddingTop: 'clamp(20px, 3vw, 32px)'
      }}>
        
        {/* Vertical Filter Sidebar */}
        <VerticalFilterSidebar
          verticals={verticals}
          selectedVertical={selectedVertical}
          onSelectVertical={setSelectedVertical}
        />

        {/* Content Area */}
        <div style={{ flex: 1 }}>

      {/* Filter Tabs */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '24px',
        borderBottom: '2px solid #e5e7eb',
        paddingBottom: '0'
      }}>
        <button
          onClick={() => setFilterType('all')}
          style={{
            padding: '12px 24px',
            background: filterType === 'all' ? 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' : 'transparent',
            color: filterType === 'all' ? 'white' : '#6b7280',
            border: 'none',
            borderBottom: filterType === 'all' ? '3px solid #3b82f6' : '3px solid transparent',
            borderRadius: '8px 8px 0 0',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative',
            bottom: '-2px'
          }}
          onMouseEnter={(e) => {
            if (filterType !== 'all') {
              e.currentTarget.style.background = '#f3f4f6';
            }
          }}
          onMouseLeave={(e) => {
            if (filterType !== 'all') {
              e.currentTarget.style.background = 'transparent';
            }
          }}
        >
          All ({insightsCount + forecastsCount})
        </button>

        <button
          onClick={() => setFilterType('insights')}
          style={{
            padding: '12px 24px',
            background: filterType === 'insights' ? 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' : 'transparent',
            color: filterType === 'insights' ? 'white' : '#6b7280',
            border: 'none',
            borderBottom: filterType === 'insights' ? '3px solid #3b82f6' : '3px solid transparent',
            borderRadius: '8px 8px 0 0',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            position: 'relative',
            bottom: '-2px'
          }}
          onMouseEnter={(e) => {
            if (filterType !== 'insights') {
              e.currentTarget.style.background = '#f3f4f6';
            }
          }}
          onMouseLeave={(e) => {
            if (filterType !== 'insights') {
              e.currentTarget.style.background = 'transparent';
            }
          }}
        >
          💡 Insights ({insightsCount})
        </button>

        <button
          onClick={() => setFilterType('forecasts')}
          style={{
            padding: '12px 24px',
            background: filterType === 'forecasts' ? 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)' : 'transparent',
            color: filterType === 'forecasts' ? 'white' : '#6b7280',
            border: 'none',
            borderBottom: filterType === 'forecasts' ? '3px solid #8b5cf6' : '3px solid transparent',
            borderRadius: '8px 8px 0 0',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            position: 'relative',
            bottom: '-2px'
          }}
          onMouseEnter={(e) => {
            if (filterType !== 'forecasts') {
              e.currentTarget.style.background = '#f3f4f6';
            }
          }}
          onMouseLeave={(e) => {
            if (filterType !== 'forecasts') {
              e.currentTarget.style.background = 'transparent';
            }
          }}
        >
          🔮 Forecasts ({forecastsCount})
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '64px 32px',
          textAlign: 'center',
          color: '#6b7280'
        }}>
          <div style={{
            display: 'inline-block',
            width: '48px',
            height: '48px',
            border: '5px solid #e5e7eb',
            borderTopColor: '#0369a1',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{ marginTop: '20px', fontSize: '16px', fontWeight: '500' }}>Loading insights...</p>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div style={{
          background: '#fef2f2',
          borderRadius: '16px',
          padding: '40px 32px',
          border: '2px solid #fecaca',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>⚠️</div>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#991b1b',
            marginBottom: '12px'
          }}>
            Unable to Load Insights
          </h3>
          <p style={{ color: '#b91c1c', marginBottom: '20px' }}>
            There was an error loading your insights. Please try again.
          </p>
          <button
            onClick={() => refetch()}
            style={{
              background: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              padding: '12px 24px',
              cursor: 'pointer',
              fontSize: '15px',
              fontWeight: '600',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <RefreshCw size={18} /> Retry
          </button>
        </div>
      )}

      {/* Insights Grid - 2 Column Layout */}
      {!isLoading && !isError && sortedInsights.length > 0 && (
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(450px, 100%), 1fr))',
          gap: '20px'
        }}>
          {sortedInsights.map((insight: Insight) => {
            const config = getInsightConfig(insight.vertical);
            const Icon = config.icon;
            const priorityColor = getPriorityColor(insight.priority);
            const isInsightForecast = isForecast(insight);
            
            return (
          <div
            key={insight.insight_id}
            id={`insight-${insight.insight_id}`}
            style={{
              background: config.bgGradient,
              borderRadius: '16px',
              boxShadow: expandedCard === insight.insight_id 
                ? '0 8px 32px rgba(124, 58, 237, 0.20)' 
                : '0 4px 24px rgba(80, 80, 160, 0.10)',
              padding: '28px',
              transition: 'all 0.3s ease',
              border: expandedCard === insight.insight_id ? '2px solid #7c3aed' : '1px solid #e5e7eb',
              position: 'relative',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(80, 80, 160, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = expandedCard === insight.insight_id 
                ? '0 8px 32px rgba(124, 58, 237, 0.20)' 
                : '0 4px 24px rgba(80, 80, 160, 0.10)';
            }}
          >
            {/* Type Badge - Top Right (next to priority badge) */}
            <div style={{
              position: 'absolute',
              top: '16px',
              right: isInsightForecast && insight.confidence_level 
                ? '160px'  // Space for confidence + priority badges (increased for MEDIUM)
                : '90px',  // Space for just priority badge (increased for MEDIUM)
              background: isInsightForecast 
                ? 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)'
                : 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
              color: 'white',
              fontSize: '14px',
              fontWeight: '700',
              padding: '6px 8px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: isInsightForecast 
                ? '0 2px 8px rgba(139, 92, 246, 0.3)'
                : '0 2px 8px rgba(59, 130, 246, 0.3)',
              height: '28px',  // Match priority badge height
              lineHeight: '1'
            }}>
              {isInsightForecast ? '🔮' : '💡'}
            </div>
            
            {/* Confidence Badge - Top Right (between type and priority, for forecasts only) */}
            {isInsightForecast && insight.confidence_level && (
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '90px', // Position before priority badge (increased spacing)
                background: insight.confidence_level === 'high' ? '#10b981' 
                  : insight.confidence_level === 'medium' ? '#f59e0b' 
                  : '#6b7280',
                color: 'white',
                fontSize: '11px',
                fontWeight: '700',
                padding: '6px 10px',
                borderRadius: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                height: '28px',  // Explicit height for consistency
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
            
            {/* Priority Badge - Top Right (far right) */}
            <div style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: priorityColor,
              color: 'white',
              fontSize: '11px',
              fontWeight: '700',
              padding: '6px 10px',
              borderRadius: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              height: '28px',  // Explicit height
              display: 'flex',
              alignItems: 'center',
              lineHeight: '1'
            }}>
              {insight.priority}
            </div>

            {/* Card Header - Visible when collapsed */}
            {expandedCard !== insight.insight_id && (
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start',
                gap: '20px'
              }}>
                {/* Icon */}
                <div style={{
                  fontSize: '2.6rem',
                  background: config.gradient,
                  borderRadius: '12px',
                  width: '56px',
                  height: '56px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  boxShadow: '0 2px 12px rgba(124, 58, 237, 0.10)',
                  flexShrink: 0
                }}>
                  <Icon size={28} />
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0, paddingRight: '60px' }}>
                  {/* Context Label */}
                  <div style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#6b7280',
                    marginBottom: '8px',
                    textTransform: 'capitalize'
                  }}>
                    {config.vertical}
                  </div>

                  {/* Main Text */}
                  <div style={{
                    fontSize: '1.15rem',
                    fontWeight: '600',
                    color: '#111827',
                    marginBottom: '8px',
                    lineHeight: '1.6'
                  }}>
                    {insight.title}
                  </div>

                  {/* Description */}
                  <div style={{
                    fontSize: '0.95rem',
                    color: '#6b7280',
                    marginBottom: '12px',
                    lineHeight: '1.5',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {insight.summary}
                  </div>

                  {/* Time and Expand/Collapse */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div style={{
                      fontSize: '0.85rem',
                      color: '#9ca3af'
                    }}>
                      {formatRelativeTime(insight.generated_at)}
                    </div>

                    {/* Expand/Collapse Icon Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCard(insight.insight_id);
                      }}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        padding: '4px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <ChevronDown
                        size={20}
                        color="#6b7280"
                        strokeWidth={2.5}
                        style={{
                          transition: 'transform 0.3s ease',
                          transform: 'rotate(0deg)'
                        }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Expanded Content */}
            {expandedCard === insight.insight_id && (
              <div 
                style={{
                  animation: 'fadeIn 0.3s ease-in-out',
                  marginTop: '50px'  // Push down to avoid overlap with badges
                }}
              >
                {/* Full Content - Render as Markdown */}
                {insight.full_content && (
                  <div style={{ marginBottom: '20px' }}>
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
                  </div>
                )}

                {/* Expected Impact */}
                {insight.raw_insight?.expected_impact && (
                  <div style={{
                    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                    padding: '16px',
                    borderRadius: '12px',
                    border: '1px solid #bae6fd',
                    marginBottom: '20px'
                  }}>
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      color: '#0c4a6e',
                      marginBottom: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span>💡</span>
                      Expected Impact
                    </h3>
                    <p style={{
                      fontSize: '1rem',
                      color: '#0c4a6e',
                      lineHeight: '1.6',
                      margin: 0
                    }}>
                      {insight.raw_insight.expected_impact}
                    </p>
                  </div>
                )}

                {/* Collapse Button - Bottom Right */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: '16px'
                }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCard(insight.insight_id);
                    }}
                    style={{
                      border: '1px solid #d1d5db',
                      background: 'white',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      padding: '8px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f3f4f6';
                      e.currentTarget.style.borderColor = '#9ca3af';
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.borderColor = '#d1d5db';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <ChevronDown
                      size={20}
                      color="#6b7280"
                      strokeWidth={2.5}
                      style={{
                        transition: 'transform 0.3s ease',
                        transform: 'rotate(180deg)'
                      }}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        );
          })}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && sortedInsights.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '64px 32px',
          background: '#f9fafb',
          borderRadius: '16px',
          border: '2px dashed #d1d5db',
          gridColumn: '1 / -1'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>💡</div>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#0f1f17',
            marginBottom: '8px'
          }}>
            No Insights Yet
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#6b7280'
          }}>
            Check back soon for personalized insights and recommendations.
          </p>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-border {
          0%, 100% {
            border-color: rgba(139, 92, 246, 0.5);
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
          }
          50% {
            border-color: rgba(167, 139, 250, 0.8);
            box-shadow: 0 0 30px rgba(167, 139, 250, 0.5);
          }
        }
        .insight-markdown-content h2 {
          font-size: 1.2rem;
          font-weight: 700;
          color: #111827;
          margin-top: 0;
          margin-bottom: 12px;
        }
        .insight-markdown-content h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #374151;
          margin-top: 16px;
          margin-bottom: 8px;
        }
        .insight-markdown-content p {
          margin: 0 0 12px 0;
        }
        .insight-markdown-content strong {
          font-weight: 700;
          color: #111827;
        }
        .insight-markdown-content ul, .insight-markdown-content ol {
          margin: 0 0 12px 0;
          padding-left: 24px;
        }
        .insight-markdown-content li {
          margin-bottom: 6px;
          lineHeight: 1.6;
        }
      `}</style>
      </div> {/* Close content area div */}
      </div> {/* Close main wrapper with sidebar */}
    </>
  );
}
