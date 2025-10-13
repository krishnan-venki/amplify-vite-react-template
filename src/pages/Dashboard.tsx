import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { DollarSign, Heart, GraduationCap, Home as HomeIcon, ArrowRight, TrendingUp, Bell, Calendar, Activity, CreditCard, Target, Wallet, TrendingDown, Footprints, Moon, Droplet } from 'lucide-react';

// Mini Metric Card Component for vertical cards
interface MiniMetricProps {
  icon: any;
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  color: string;
  progress?: number;
  delay: number;
}

const MiniMetric: React.FC<MiniMetricProps> = ({ icon: Icon, label, value, trend, trendUp, color, progress, delay }) => {
  const [show, setShow] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), delay);
  }, [delay]);

  return (
    <div 
      style={{
        padding: '10px',
        background: `linear-gradient(135deg, ${color}08 0%, #fff 100%)`,
        borderRadius: '8px',
        border: `1px solid ${color}20`,
        transform: show ? 'translateY(0)' : 'translateY(10px)',
        opacity: show ? 1 : 0,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: '8px',
          background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
          boxShadow: isHovered ? `0 4px 12px ${color}30` : 'none'
        }}>
          <Icon size={14} style={{ color }} />
        </div>
        <span style={{ fontSize: '11px', fontWeight: '500', color: '#6b7280' }}>{label}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: progress !== undefined ? '6px' : '0' }}>
        <div style={{ fontSize: '16px', fontWeight: '700', color: '#111827' }}>
          {value}
        </div>
        {trend && (
          <div style={{
            fontSize: '10px',
            color: trendUp ? '#10b981' : '#ef4444',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '2px'
          }}>
            {trendUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {trend}
          </div>
        )}
      </div>
      {progress !== undefined && (
        <div style={{
          width: '100%',
          height: '3px',
          background: '#e5e7eb',
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: color,
            borderRadius: '2px',
            transition: 'width 1s ease-out',
          }} />
        </div>
      )}
    </div>
  );
};

export default function Dashboard() {
  const { user } = useAuthenticator((context) => [context.user]);
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleAskSagaa = (verticalId: string, verticalName: string, gradient: string) => {
    // Navigate to chat page with context
    navigate('/chat', { 
      state: { 
        context: {
          id: verticalId,
          name: verticalName,
          gradient: gradient
        }
      } 
    });
  };

  useEffect(() => {
    async function getName() {
      if (user) {
        try {
          const attrs = await fetchUserAttributes();
          const first = attrs.given_name || '';
          const last = attrs.family_name || '';
          const name = [first, last].filter(Boolean).join(' ');
          setFullName(name || user.username || '');
        } catch {
          setFullName(user.username || '');
        }
      }
    }
    getName();
  }, [user]);

  const verticals = [
    {
      id: 'money',
      icon: DollarSign,
      name: 'Money',
      gradient: 'linear-gradient(135deg, #10b981 0%, #0d9488 100%)',
      bgGradient: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdfa 100%)',
      route: '/money/dashboard',
      metrics: {
        label: 'Net Worth',
        value: '$127.3K',
        change: '+12.5%'
      },
      alerts: 0,
      detailedMetrics: [
        { icon: Wallet, label: 'Liquid Cash', value: '$24.6K', trend: 'Available', trendUp: true, color: '#10b981' },
        { icon: CreditCard, label: 'Monthly Expense', value: '$4.2K', trend: 'Till date', trendUp: false, color: '#ef4444', progress: 58 },
        { icon: TrendingUp, label: 'Investments', value: '+8.4%', trend: 'YTD', trendUp: true, color: '#8b5cf6' },
        { icon: Target, label: 'Budget', value: '65%', trend: 'Used', color: '#f59e0b', progress: 65 },
        { icon: Bell, label: 'Pending Bills', value: '$1.8K', trend: 'Due soon', trendUp: false, color: '#ef4444' },
        { icon: Target, label: 'Vacation Fund', value: '$7.2K/$10K', trend: '72%', trendUp: true, color: '#10b981', progress: 72 }
      ]
    },
    {
      id: 'healthcare',
      icon: Heart,
      name: 'Healthcare',
      gradient: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)',
      bgGradient: 'linear-gradient(135deg, #fef2f2 0%, #fdf2f8 100%)',
      route: '/healthcare/dashboard',
      metrics: {
        label: 'Next Checkup',
        value: 'Dec 15',
        change: '3 days'
      },
      alerts: 0,
      detailedMetrics: [
        { icon: Calendar, label: 'Checkups Due', value: '2', trend: 'Schedule now', trendUp: false, color: '#f59e0b' },
        { icon: Droplet, label: 'Blood Pressure', value: '120/78', trend: '2 hrs ago', trendUp: true, color: '#06b6d4' },
        { icon: Activity, label: 'Blood Sugar', value: '98 mg/dL', trend: '4 hrs ago', trendUp: true, color: '#8b5cf6' },
        { icon: Footprints, label: 'Steps Today', value: '8,420', trend: '+12%', trendUp: true, color: '#10b981' },
        { icon: Moon, label: 'Sleep Score', value: '85%', trend: 'Good', color: '#3b82f6', progress: 85 },
        { icon: Target, label: 'Weight Loss', value: '8.5/10 lbs', trend: '85%', trendUp: true, color: '#10b981', progress: 85 }
      ]
    },
    {
      id: 'education',
      icon: GraduationCap,
      name: 'Education',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
      bgGradient: 'linear-gradient(135deg, #eff6ff 0%, #eef2ff 100%)',
      route: '/education/dashboard',
      metrics: {
        label: 'Coming Soon',
        value: 'Q1 2026',
        change: ''
      },
      alerts: 0
    },
    {
      id: 'life',
      icon: HomeIcon,
      name: 'Life Essentials',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
      bgGradient: 'linear-gradient(135deg, #fffbeb 0%, #fff7ed 100%)',
      route: '/life/dashboard',
      metrics: {
        label: 'Coming Soon',
        value: 'Q1 2026',
        change: ''
      },
      alerts: 0
    }
  ];

  const proactiveInsights = [
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

  const recentActivity = [
    { icon: Calendar, text: 'Dentist appointment scheduled for Dec 15', time: '10 min ago', color: '#f43f5e' },
    { icon: DollarSign, text: 'Grocery budget: 75% used this month', time: '2 hours ago', color: '#10b981' },
    { icon: Bell, text: 'Medication refill due in 3 days', time: '1 day ago', color: '#f43f5e' },
    { icon: Activity, text: 'Weekly health report available', time: '2 days ago', color: '#f43f5e' }
  ];

  return (
    <>
      {/* Hero Section - Full Width */}
      <div style={{
        background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)',
        padding: 'clamp(24px, 5vw, 48px) clamp(20px, 4vw, 40px)',
        marginBottom: 0,
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: 'clamp(24px, 5vw, 48px)',
            fontWeight: '300',
            marginBottom: '12px',
            lineHeight: '1.2'
          }}>
            Welcome back, <span style={{ fontWeight: '600' }}>{fullName}</span>
          </h1>
          <p style={{
            fontSize: 'clamp(14px, 2vw, 18px)',
            color: '#d1d5db',
            marginBottom: 'clamp(16px, 3vw, 24px)'
          }}>
            Your personal dashboard is ready with insights and updates across your connected ecosystems.
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

      <main className="response-panel" style={{ padding: 'clamp(16px, 3vw, 32px)', paddingTop: 'clamp(20px, 3vw, 32px)' }}>

      {/* Ecosystem Overview Cards */}
      <div style={{ marginBottom: 'clamp(24px, 4vw, 40px)' }}>
        <h2 style={{
          fontSize: 'clamp(20px, 3vw, 24px)',
          fontWeight: '600',
          marginBottom: 'clamp(16px, 2vw, 20px)',
          color: '#111827'
        }}>
          Your Ecosystem
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
          gap: 'clamp(12px, 2vw, 20px)'
        }}>
          {verticals.map((vertical) => {
            const Icon = vertical.icon;
            return (
              <div
                key={vertical.id}
                onClick={() => vertical.metrics.value !== 'Q1 2026' && navigate(vertical.route)}
                style={{
                  background: vertical.bgGradient,
                  borderRadius: 'clamp(16px, 2vw, 20px)',
                  padding: 'clamp(20px, 3vw, 28px)',
                  cursor: vertical.metrics.value !== 'Q1 2026' ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s',
                  border: '1px solid rgba(0,0,0,0.05)',
                  position: 'relative',
                  opacity: vertical.metrics.value === 'Q1 2026' ? 0.6 : 1,
                  minHeight: vertical.detailedMetrics ? '440px' : 'auto'
                }}
                onMouseEnter={(e) => {
                  if (vertical.metrics.value !== 'Q1 2026') {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Ask Sagaa Icon - Top Right */}
                {vertical.metrics.value !== 'Q1 2026' && (
                  <div style={{ position: 'relative' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAskSagaa(vertical.id, vertical.name, vertical.gradient);
                      }}
                      style={{
                        position: 'absolute',
                        top: '16px',
                        right: vertical.alerts > 0 ? '52px' : '16px',
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)',
                        border: '1px solid rgba(59, 130, 246, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        zIndex: 10,
                        padding: '0'
                      }}
                      onMouseEnter={(e) => {
                        setHoveredCard(vertical.id);
                        e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(99, 102, 241, 0.25) 100%)';
                        e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        setHoveredCard(null);
                        e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)';
                        e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.25)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {/* Sparkles Icon */}
                      <svg 
                        width="18" 
                        height="18" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="#2563eb" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        style={{ pointerEvents: 'none' }}
                      >
                        <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z"/>
                        <path d="M5 3v4"/>
                        <path d="M19 17v4"/>
                        <path d="M3 5h4"/>
                        <path d="M17 19h4"/>
                      </svg>
                    </button>
                    
                    {/* Custom Tooltip */}
                    {hoveredCard === vertical.id && (
                      <div style={{
                        position: 'absolute',
                        top: '58px',
                        right: vertical.alerts > 0 ? '52px' : '16px',
                        background: '#1f2937',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '500',
                        whiteSpace: 'nowrap',
                        zIndex: 20,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                        pointerEvents: 'none'
                      }}>
                        Ask Sagaa about {vertical.name}
                        {/* Tooltip arrow */}
                        <div style={{
                          position: 'absolute',
                          top: '-4px',
                          right: '10px',
                          width: '8px',
                          height: '8px',
                          background: '#1f2937',
                          transform: 'rotate(45deg)'
                        }} />
                      </div>
                    )}
                  </div>
                )}
                
                {vertical.alerts > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: '#ef4444',
                    color: 'white',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {vertical.alerts}
                  </div>
                )}
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: vertical.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}>
                  <Icon size={28} color="white" />
                </div>
                <h3 style={{
                  fontSize: 'clamp(18px, 2.5vw, 20px)',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#111827'
                }}>
                  {vertical.name}
                </h3>
                <div style={{
                  fontSize: 'clamp(13px, 1.5vw, 14px)',
                  color: '#6b7280',
                  marginBottom: '4px'
                }}>
                  {vertical.metrics.label}
                </div>
                <div style={{
                  fontSize: 'clamp(20px, 3vw, 24px)',
                  fontWeight: '700',
                  color: '#111827',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: vertical.detailedMetrics ? '16px' : '0'
                }}>
                  {vertical.metrics.value}
                  {vertical.metrics.change && (
                    <span style={{
                      fontSize: '14px',
                      color: '#10b981',
                      fontWeight: '500'
                    }}>
                      {vertical.metrics.change}
                    </span>
                  )}
                </div>

                {/* Detailed Metrics Grid - Only for cards with detailedMetrics */}
                {vertical.detailedMetrics && (
                  <>
                    <div style={{
                      height: '1px',
                      background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)',
                      marginBottom: '16px'
                    }} />
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '10px'
                    }}>
                      {vertical.detailedMetrics.map((metric, idx) => (
                        <MiniMetric
                          key={idx}
                          icon={metric.icon}
                          label={metric.label}
                          value={metric.value}
                          trend={metric.trend}
                          trendUp={metric.trendUp}
                          color={metric.color}
                          progress={metric.progress}
                          delay={idx * 100}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Proactive Insights */}
      <div style={{ marginBottom: 'clamp(24px, 4vw, 40px)' }}>
        <h2 style={{
          fontSize: 'clamp(20px, 3vw, 24px)',
          fontWeight: '600',
          marginBottom: 'clamp(16px, 2vw, 20px)',
          color: '#111827'
        }}>
          Proactive Insights
        </h2>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(12px, 2vw, 16px)'
        }}>
          {proactiveInsights.map((insight) => {
            const Icon = insight.icon;
            return (
              <div
                key={insight.id}
                style={{
                  background: 'white',
                  borderRadius: 'clamp(12px, 2vw, 16px)',
                  padding: 'clamp(16px, 3vw, 24px)',
                  border: '1px solid #e5e7eb',
                  display: 'flex',
                  flexDirection: window.innerWidth < 640 ? 'column' : 'row',
                  gap: 'clamp(12px, 2vw, 20px)',
                  alignItems: 'start',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: insight.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Icon size={24} color="white" />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: 'clamp(16px, 2vw, 18px)',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#111827'
                  }}>
                    {insight.title}
                  </h3>
                  <p style={{
                    fontSize: 'clamp(13px, 1.5vw, 14px)',
                    color: '#6b7280',
                    marginBottom: '12px',
                    lineHeight: '1.5'
                  }}>
                    {insight.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{
                      fontSize: '13px',
                      color: '#9ca3af'
                    }}>
                      {insight.time}
                    </span>
                    <button style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#0369a1',
                      fontWeight: '600',
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      {insight.action} <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          marginBottom: '20px',
          color: '#111827'
        }}>
          Recent Activity
        </h2>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          border: '1px solid #e5e7eb',
          overflow: 'hidden'
        }}>
          {recentActivity.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div
                key={index}
                style={{
                  padding: '20px 24px',
                  borderBottom: index < recentActivity.length - 1 ? '1px solid #f3f4f6' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f9fafb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: `${activity.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon size={20} color={activity.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '14px',
                    color: '#111827',
                    marginBottom: '4px'
                  }}>
                    {activity.text}
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: '#9ca3af'
                  }}>
                    {activity.time}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
    </>
  );
}
