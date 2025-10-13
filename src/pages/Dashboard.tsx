import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { DollarSign, Heart, GraduationCap, Home as HomeIcon, ArrowRight, TrendingUp, Bell, Calendar, Activity } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuthenticator((context) => [context.user]);
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');

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
        label: 'Total Balance',
        value: '$24,580',
        change: '+12.5%'
      },
      alerts: 2
    },
    {
      id: 'healthcare',
      icon: Heart,
      name: 'Healthcare',
      gradient: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)',
      bgGradient: 'linear-gradient(135deg, #fef2f2 0%, #fdf2f8 100%)',
      route: '/healthcare/dashboard',
      metrics: {
        label: 'Next Appointment',
        value: 'Dec 15',
        change: '3 days'
      },
      alerts: 1
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
                onClick={() => vertical.metrics.value !== 'Q1 2025' && navigate(vertical.route)}
                style={{
                  background: vertical.bgGradient,
                  borderRadius: 'clamp(16px, 2vw, 20px)',
                  padding: 'clamp(20px, 3vw, 28px)',
                  cursor: vertical.metrics.value !== 'Q1 2025' ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s',
                  border: '1px solid rgba(0,0,0,0.05)',
                  position: 'relative',
                  opacity: vertical.metrics.value === 'Q1 2025' ? 0.6 : 1
                }}
                onMouseEnter={(e) => {
                  if (vertical.metrics.value !== 'Q1 2025') {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
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
                  gap: '8px'
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
