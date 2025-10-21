import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { ChevronDown, RefreshCw } from 'lucide-react';
import { useInsights } from '../hooks/useInsights';
import { getInsightConfig } from '../config/insightConfig';
import { formatRelativeTime, sortInsightsByPriority, getPriorityColor } from '../utils/insightUtils';
import type { Insight } from '../types/insight';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

export default function Insights() {
  const { user } = useAuthenticator(context => [context.user]);
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // Fetch insights using React Query
  const { data: insights = [], isLoading, isError, refetch } = useInsights();

  // Sort insights by priority
  const sortedInsights = sortInsightsByPriority(insights);

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

      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: 'clamp(16px, 3vw, 32px)',
        paddingTop: 'clamp(20px, 3vw, 32px)'
      }}>

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
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(80, 80, 160, 0.15)';
              e.currentTarget.style.borderColor = expandedCard === insight.insight_id ? '#7c3aed' : '#d1d5db';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = expandedCard === insight.insight_id 
                ? '0 8px 32px rgba(124, 58, 237, 0.20)' 
                : '0 4px 24px rgba(80, 80, 160, 0.10)';
              e.currentTarget.style.borderColor = expandedCard === insight.insight_id ? '#7c3aed' : '#e5e7eb';
            }}
          >
            {/* Priority Badge */}
            <div style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: priorityColor,
              color: 'white',
              fontSize: '11px',
              fontWeight: '700',
              padding: '4px 10px',
              borderRadius: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {insight.priority}
            </div>

            {/* Card Header - Always Visible */}
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
                  lineHeight: '1.5'
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
                        transform: expandedCard === insight.insight_id ? 'rotate(180deg)' : 'rotate(0deg)'
                      }}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedCard === insight.insight_id && (
              <div 
                style={{
                  marginTop: '24px',
                  paddingTop: '24px',
                  borderTop: '2px solid #e5e7eb',
                  animation: 'fadeIn 0.3s ease-in-out'
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
                    border: '1px solid #bae6fd'
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
          line-height: 1.6;
        }
      `}</style>
    </div>
    </>
  );
}
