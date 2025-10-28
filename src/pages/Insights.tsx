import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { RefreshCw } from 'lucide-react';
import { useInsights } from '../hooks/useInsights';
import { sortInsightsByPriority, isForecast, insightBelongsToVertical } from '../utils/insightUtils';
import type { Insight } from '../types/insight';
import VerticalFilterSidebar from '../components/VerticalFilterSidebar';
import InsightCardVisual from '../components/InsightCardVisual';

type FilterType = 'all' | 'insights' | 'forecasts' | 'goals';

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
      // Check if any insight belongs to this vertical (includes cross-vertical insights)
      hasData: insights.some(insight => insightBelongsToVertical(insight, v.id))
    }));
  }, [insights]);

  // Filter insights based on selected vertical and type
  const filteredInsights = useMemo(() => {
    // Filter by vertical (handles both single-vertical and cross-vertical insights)
    let filtered = insights.filter(insight => insightBelongsToVertical(insight, selectedVertical));
    
    // Helper to check if insight is goal-related
    const isGoalInsight = (insight: Insight) => {
      return !!(insight.goal_context || (insight as any).goal_id || (insight as any).reallocation_plan);
    };
    
    if (filterType === 'forecasts') {
      filtered = filtered.filter(insight => isForecast(insight) && !isGoalInsight(insight));
    } else if (filterType === 'insights') {
      filtered = filtered.filter(insight => !isForecast(insight) && !isGoalInsight(insight));
    } else if (filterType === 'goals') {
      filtered = filtered.filter(insight => isGoalInsight(insight));
    }
    // 'all' shows everything - no additional filtering needed
    
    return filtered;
  }, [insights, selectedVertical, filterType]);

  // Sort insights by priority
  const sortedInsights = sortInsightsByPriority(filteredInsights);
  
  // Count insights, forecasts, and goals for current vertical
  const isGoalInsight = (insight: Insight) => {
    return !!(insight.goal_context || (insight as any).goal_id || (insight as any).reallocation_plan);
  };
  
  const insightsCount = insights.filter(i => 
    !isForecast(i) && !isGoalInsight(i) && insightBelongsToVertical(i, selectedVertical)
  ).length;
  const forecastsCount = insights.filter(i => 
    isForecast(i) && !isGoalInsight(i) && insightBelongsToVertical(i, selectedVertical)
  ).length;
  const goalsCount = insights.filter(i => 
    isGoalInsight(i) && insightBelongsToVertical(i, selectedVertical)
  ).length;

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
          <span style={{ fontWeight: '600' }}>Insights for you</span>
          </h1>
          <p style={{
            fontSize: 'clamp(14px, 2vw, 18px)',
            color: '#d1d5db',
            marginBottom: 'clamp(16px, 3vw, 24px)'
          }}>
            Stay informed with personalized insights and Foresights to help you make better decisions across your life verticals.
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
          disabled={insightsCount + forecastsCount + goalsCount === 0}
          style={{
            padding: '12px 24px',
            background: filterType === 'all' ? 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' : 'transparent',
            color: filterType === 'all' ? 'white' : (insightsCount + forecastsCount + goalsCount === 0 ? '#d1d5db' : '#6b7280'),
            border: 'none',
            borderBottom: filterType === 'all' ? '3px solid #3b82f6' : '3px solid transparent',
            borderRadius: '8px 8px 0 0',
            fontSize: '15px',
            fontWeight: '600',
            cursor: insightsCount + forecastsCount + goalsCount === 0 ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative',
            bottom: '-2px',
            opacity: insightsCount + forecastsCount + goalsCount === 0 ? 0.5 : 1
          }}
          onMouseEnter={(e) => {
            if (filterType !== 'all' && insightsCount + forecastsCount + goalsCount > 0) {
              e.currentTarget.style.background = '#f3f4f6';
            }
          }}
          onMouseLeave={(e) => {
            if (filterType !== 'all') {
              e.currentTarget.style.background = 'transparent';
            }
          }}
        >
          All ({insightsCount + forecastsCount + goalsCount})
        </button>

        <button
          onClick={() => setFilterType('insights')}
          disabled={insightsCount === 0}
          style={{
            padding: '12px 24px',
            background: filterType === 'insights' ? 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' : 'transparent',
            color: filterType === 'insights' ? 'white' : (insightsCount === 0 ? '#d1d5db' : '#6b7280'),
            border: 'none',
            borderBottom: filterType === 'insights' ? '3px solid #3b82f6' : '3px solid transparent',
            borderRadius: '8px 8px 0 0',
            fontSize: '15px',
            fontWeight: '600',
            cursor: insightsCount === 0 ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            position: 'relative',
            bottom: '-2px',
            opacity: insightsCount === 0 ? 0.5 : 1
          }}
          onMouseEnter={(e) => {
            if (filterType !== 'insights' && insightsCount > 0) {
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
          disabled={forecastsCount === 0}
          style={{
            padding: '12px 24px',
            background: filterType === 'forecasts' ? 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)' : 'transparent',
            color: filterType === 'forecasts' ? 'white' : (forecastsCount === 0 ? '#d1d5db' : '#6b7280'),
            border: 'none',
            borderBottom: filterType === 'forecasts' ? '3px solid #8b5cf6' : '3px solid transparent',
            borderRadius: '8px 8px 0 0',
            fontSize: '15px',
            fontWeight: '600',
            cursor: forecastsCount === 0 ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            position: 'relative',
            bottom: '-2px',
            opacity: forecastsCount === 0 ? 0.5 : 1
          }}
          onMouseEnter={(e) => {
            if (filterType !== 'forecasts' && forecastsCount > 0) {
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

        <button
          onClick={() => setFilterType('goals')}
          disabled={goalsCount === 0}
          style={{
            padding: '12px 24px',
            background: filterType === 'goals' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'transparent',
            color: filterType === 'goals' ? 'white' : (goalsCount === 0 ? '#d1d5db' : '#6b7280'),
            border: 'none',
            borderBottom: filterType === 'goals' ? '3px solid #10b981' : '3px solid transparent',
            borderRadius: '8px 8px 0 0',
            fontSize: '15px',
            fontWeight: '600',
            cursor: goalsCount === 0 ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            position: 'relative',
            bottom: '-2px',
            opacity: goalsCount === 0 ? 0.5 : 1
          }}
          onMouseEnter={(e) => {
            if (filterType !== 'goals' && goalsCount > 0) {
              e.currentTarget.style.background = '#f3f4f6';
            }
          }}
          onMouseLeave={(e) => {
            if (filterType !== 'goals') {
              e.currentTarget.style.background = 'transparent';
            }
          }}
        >
          🎯 Goal Evaluations ({goalsCount})
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
          {sortedInsights.map((insight: Insight) => (
            <InsightCardVisual
              key={insight.insight_id}
              insight={insight}
              isExpanded={expandedCard === insight.insight_id}
              onToggle={() => toggleCard(insight.insight_id)}
            />
          ))}
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
            Check back soon for personalized insights and Foresights.
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