import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { DollarSign, Heart, TrendingUp, ChevronDown } from 'lucide-react';

interface ProactiveInsight {
  id: number;
  vertical: string;
  icon: any;
  gradient: string;
  title: string;
  description: string;
  action: string;
  time: string;
}

// Hardcoded insights matching Dashboard.tsx
const proactiveInsights: ProactiveInsight[] = [
  {
    id: 1,
    vertical: 'money',
    icon: DollarSign,
    gradient: 'linear-gradient(135deg, #10b981 0%, #0d9488 100%)',
    title: 'Optimize your tax deductions',
    description: 'Based on your spending patterns, you could save $1,200 by maximizing healthcare deductions.',
    action: 'Review Now',
    time: '2 hours ago'
  },
  {
    id: 2,
    vertical: 'healthcare',
    icon: Heart,
    gradient: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)',
    title: 'Annual checkup reminder',
    description: 'Your last physical was 11 months ago. Schedule your annual checkup to stay on track.',
    action: 'Schedule',
    time: '1 day ago'
  },
  {
    id: 3,
    vertical: 'money',
    icon: TrendingUp,
    gradient: 'linear-gradient(135deg, #10b981 0%, #0d9488 100%)',
    title: 'Investment opportunity',
    description: 'Your emergency fund is healthy. Consider diversifying $5,000 into index funds.',
    action: 'Learn More',
    time: '2 days ago'
  }
];

export default function Insights() {
  const { user } = useAuthenticator(context => [context.user]);
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

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

  // Use the hardcoded insights from proactiveInsights
  const insights = proactiveInsights.map(item => ({
    id: item.id.toString(),
    icon: item.icon,
    gradient: item.gradient,
    vertical: item.vertical,
    title: item.title,
    description: item.description,
    action: item.action,
    time: item.time,
    // Add expanded content for full page view
    details: item.description,
    recommendations: [
      item.action,
      "Track your progress regularly",
      "Connect with community members for support"
    ],
    impact: `This insight can help you take proactive action based on your ${item.vertical} data.`,
    // Add light background based on vertical
    lightBackground: item.vertical === 'money' 
      ? 'linear-gradient(135deg, #ecfdf5 0%, #f0fdfa 100%)'  // Light green for money
      : item.vertical === 'healthcare' 
      ? 'linear-gradient(135deg, #fef2f2 0%, #fdf2f8 100%)'  // Light red/pink for healthcare
      : item.vertical === 'education'
      ? 'linear-gradient(135deg, #eff6ff 0%, #eef2ff 100%)'  // Light blue for education
      : item.vertical === 'life'
      ? 'linear-gradient(135deg, #fffbeb 0%, #fff7ed 100%)'  // Light orange for life
      : '#f9fafb'  // Default light gray
  }));

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

      {/* Insights Grid - 2 Column Layout */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(450px, 100%), 1fr))',
        gap: '20px'
      }}>
        {insights.map((insight) => (
          <div
            key={insight.id}
            id={`insight-${insight.id}`}
            style={{
              background: insight.lightBackground,
              borderRadius: '16px',
              boxShadow: expandedCard === insight.id 
                ? '0 8px 32px rgba(124, 58, 237, 0.20)' 
                : '0 4px 24px rgba(80, 80, 160, 0.10)',
              padding: '28px',
              transition: 'all 0.3s ease',
              border: expandedCard === insight.id ? '2px solid #7c3aed' : '1px solid #e5e7eb'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(80, 80, 160, 0.15)';
              e.currentTarget.style.borderColor = expandedCard === insight.id ? '#7c3aed' : '#d1d5db';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = expandedCard === insight.id 
                ? '0 8px 32px rgba(124, 58, 237, 0.20)' 
                : '0 4px 24px rgba(80, 80, 160, 0.10)';
              e.currentTarget.style.borderColor = expandedCard === insight.id ? '#7c3aed' : '#e5e7eb';
            }}
          >
            {/* Card Header - Always Visible */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'flex-start',
              gap: '20px'
            }}>
              {/* Icon */}
              <div style={{
                fontSize: '2.6rem',
                background: insight.gradient,
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
                <insight.icon size={28} />
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Context Label */}
                <div style={{
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#6b7280',
                  marginBottom: '8px',
                  textTransform: 'capitalize'
                }}>
                  {insight.vertical}
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
                  {insight.description}
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
                    {insight.time}
                  </div>

                  {/* Expand/Collapse Icon Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCard(insight.id);
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
                        transform: expandedCard === insight.id ? 'rotate(180deg)' : 'rotate(0deg)'
                      }}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedCard === insight.id && (
              <div 
                style={{
                  marginTop: '24px',
                  paddingTop: '24px',
                  borderTop: '2px solid #e5e7eb',
                  animation: 'fadeIn 0.3s ease-in-out'
                }}
              >
                {/* Details */}
                {insight.details && (
                  <div style={{ marginBottom: '20px' }}>
                    <h3 style={{
                      fontSize: '1.2rem',
                      fontWeight: '700',
                      color: '#0f1f17',
                      marginBottom: '12px'
                    }}>
                      Details
                    </h3>
                    <p style={{
                      fontSize: '1rem',
                      color: '#4b5563',
                      lineHeight: '1.7'
                    }}>
                      {insight.details}
                    </p>
                  </div>
                )}

                {/* Recommendations */}
                {insight.recommendations && insight.recommendations.length > 0 && (
                  <div style={{ marginBottom: '20px' }}>
                    <h3 style={{
                      fontSize: '1.2rem',
                      fontWeight: '700',
                      color: '#0f1f17',
                      marginBottom: '12px'
                    }}>
                      Recommendations
                    </h3>
                    <ul style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}>
                      {insight.recommendations.map((rec, idx) => (
                        <li key={idx} style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px'
                        }}>
                          <span style={{
                            color: '#7c3aed',
                            fontSize: '1.2rem',
                            fontWeight: '700',
                            flexShrink: 0
                          }}>
                            •
                          </span>
                          <span style={{
                            fontSize: '1rem',
                            color: '#4b5563',
                            lineHeight: '1.6'
                          }}>
                            {rec}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Impact */}
                {insight.impact && (
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
                      Potential Impact
                    </h3>
                    <p style={{
                      fontSize: '1rem',
                      color: '#0c4a6e',
                      lineHeight: '1.6',
                      margin: 0
                    }}>
                      {insight.impact}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {insights.length === 0 && (
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
      `}</style>
    </div>
    </>
  );
}
