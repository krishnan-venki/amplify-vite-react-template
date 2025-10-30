import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { DollarSign, Heart, GraduationCap, Home as HomeIcon, TrendingUp, Bell, Calendar, Activity, CreditCard, Target, Wallet, TrendingDown, Footprints, Moon, Droplet, ChevronDown, MessageCircle, MessageSquare, AlertCircle, Clock } from 'lucide-react';
import { useInsights } from '../hooks/useInsights';
import { useGoals } from '../hooks/useGoals';
import { useAssets } from '../hooks/useAssets';
import { aggregateInsightsByVertical } from '../utils/aggregateInsights';
import { VerticalInsightCard } from '../components/VerticalInsightCard';
import heroImage from '../assets/Hero_Image.png';
import type { Goal } from '../types/goal';

// Utility function for responsive sizing
const clamp = (min: number, max: number) => {
  return Math.min(Math.max(min, window.innerWidth / 20), max);
};

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
  const [expandedSections, setExpandedSections] = useState({
    ecosystem: true,
    insights: true,
    goals: true,
    activity: true
  });

  // Fetch insights using React Query
  const { data: insights = [], isLoading: insightsLoading, isError: insightsError, refetch: refetchInsights } = useInsights();
  
  // Fetch goals
  const { activeGoals, loading: goalsLoading, error: goalsError, refetch: refetchGoals } = useGoals();

  // Fetch assets for Life Essentials
  const { summary: assetsSummary, loading: assetsLoading } = useAssets();

  const toggleSection = (section: 'ecosystem' | 'insights' | 'goals' | 'activity') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleAskSagaa = (verticalId: string, verticalName: string, gradient: string) => {
    // Navigate to chat page with vertical context
    navigate('/chat', { 
      state: { 
        context: {
          type: 'vertical',
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
        label: 'Property & Assets',
        value: ''
      },
      alerts: 0,
      capabilityBadges: assetsLoading ? undefined : [
        { icon: '🏡', label: 'Property & Assets', subtitle: '', active: true },
        { icon: '🛒', label: 'Household Ops', subtitle: 'Coming Soon', active: false },
        { icon: '👨‍👩‍👧‍👦', label: 'Family & Life', subtitle: 'Coming Soon', active: false },
        { icon: '🔒', label: 'Docs & Prep', subtitle: 'Coming Soon', active: false }
      ],
      detailedMetrics: assetsLoading ? undefined : [
        { 
          icon: Target, 
          label: 'Total Assets', 
          value: `${assetsSummary.total_assets}`, 
          trend: 'Tracked', 
          trendUp: true, 
          color: '#f59e0b',
          progress: undefined
        },
        { 
          icon: Bell, 
          label: 'Asset Health - High Risk', 
          value: `${assetsSummary.high_risk_count}`, 
          trend: 'Assets', 
          trendUp: false, 
          color: assetsSummary.high_risk_count > 0 ? '#ef4444' : '#10b981',
          progress: undefined
        },
        { 
          icon: Activity, 
          label: 'Maintenance - Due Soon', 
          value: `${assetsSummary.due_for_maintenance}`, 
          trend: 'Soon', 
          trendUp: false, 
          color: assetsSummary.due_for_maintenance > 0 ? '#f59e0b' : '#10b981',
          progress: undefined
        },
        { 
          icon: DollarSign, 
          label: 'Maintenance Cost Estimate', 
          value: new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(assetsSummary.total_replacement_cost_estimate), 
          trend: '18 months', 
          color: '#f59e0b',
          progress: undefined
        },
      ]
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
        padding: '32px 48px',
        marginBottom: 0,
        color: 'white',
        position: 'relative',
        overflow: 'visible'
      }}>
        <div style={{ 
          position: 'relative', 
          zIndex: 1, 
          maxWidth: '1400px', 
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '32px'
        }}>
          {/* Hero Image - Left side */}
          <div style={{ flexShrink: 0 }}>
            <img 
              src={heroImage} 
              alt="Sagaa Dashboard" 
              style={{ 
                width: '240px',
                height: 'auto',
                objectFit: 'contain',
                display: 'block'
              }} 
            />
          </div>

          {/* Title Section */}
          <div style={{ flex: 1 }}>
            <h1 style={{
              fontSize: '36px',
              fontWeight: '100',
              marginBottom: '8px',
              lineHeight: '1.4',
              color: 'white'
            }}>
              Welcome back, <span style={{
                background: 'linear-gradient(135deg, #007AFF 0%, #00D2FF 50%, #34C759 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
                display: 'inline-block',
                paddingBottom: '0.18em',
                fontWeight: '100'
              }}>{fullName}</span>
            </h1>
            <p style={{
              fontSize: '16px',
              color: '#d1d5db',
              marginBottom: '0'
            }}>
              Your personal dashboard is ready with insights and updates across your connected ecosystems.
            </p>
          </div>
        </div>
        
        {/* Decorative Background Elements */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '-30px',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0
        }} />
      </div>

      <main className="response-panel" style={{ padding: 'clamp(16px, 3vw, 32px)', paddingTop: 'clamp(20px, 3vw, 32px)' }}>

      {/* Ecosystem Overview Cards */}
      <div style={{ marginBottom: 'clamp(24px, 4vw, 40px)' }}>
        <div 
          onClick={() => toggleSection('ecosystem')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            marginBottom: 'clamp(16px, 2vw, 20px)',
            userSelect: 'none'
          }}
        >
          <h2 style={{
            fontSize: 'clamp(20px, 3vw, 24px)',
            fontWeight: '600',
            margin: 0,
            color: '#111827'
          }}>
            Your Ecosystem
          </h2>
          <ChevronDown 
            size={20} 
            style={{
              color: '#6b7280',
              transition: 'transform 0.3s ease',
              transform: expandedSections.ecosystem ? 'rotate(0deg)' : 'rotate(-90deg)'
            }}
          />
        </div>
        <div style={{
          overflow: 'hidden',
          maxHeight: expandedSections.ecosystem ? '10000px' : '0',
          transition: 'max-height 0.5s ease-in-out, opacity 0.3s ease-in-out',
          opacity: expandedSections.ecosystem ? 1 : 0
        }}>
          {/* First 3 cards: Money, Healthcare, Education */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            gap: 'clamp(12px, 2vw, 20px)',
            marginBottom: 'clamp(12px, 2vw, 20px)'
          }}>
            {verticals.filter(v => v.id !== 'life').map((vertical) => {
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
                  minHeight: vertical.capabilityBadges ? '540px' : vertical.detailedMetrics ? '440px' : 'auto'
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
                        top: '-2px',
                        right: vertical.alerts > 0 ? '48px' : '0px',
                        height: '36px',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)',
                        border: '1px solid rgba(59, 130, 246, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        paddingLeft: '12px',
                        paddingRight: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        zIndex: 10,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(99, 102, 241, 0.25) 100%)';
                        e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)';
                        e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.25)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {/* Message/Chat Icon */}
                      <MessageCircle 
                        size={18} 
                        color="#2563eb" 
                        strokeWidth={2}
                        style={{ pointerEvents: 'none' }}
                      />
                      <span style={{
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#2563eb',
                        pointerEvents: 'none',
                        whiteSpace: 'nowrap'
                      }}>
                        Ask Sagaa
                      </span>
                    </button>
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

                {/* Capability Badges - Only for Life Essentials */}
                {vertical.capabilityBadges && (
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginBottom: '16px'
                  }}>
                    {vertical.capabilityBadges.map((capability, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          gap: '4px',
                          padding: '12px 16px',
                          borderRadius: '12px',
                          background: capability.active 
                            ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(249, 115, 22, 0.15) 100%)'
                            : 'rgba(156, 163, 175, 0.1)',
                          border: `1px solid ${capability.active ? 'rgba(245, 158, 11, 0.3)' : 'rgba(156, 163, 175, 0.2)'}`,
                          transition: 'all 0.2s',
                          minWidth: '140px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '16px' }}>{capability.icon}</span>
                          <span style={{
                            fontSize: '13px',
                            fontWeight: '600',
                            color: capability.active ? '#92400e' : '#6b7280'
                          }}>
                            {capability.label}
                          </span>
                        </div>
                        {capability.subtitle && (
                          <span style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            color: '#9ca3af',
                            paddingLeft: '24px'
                          }}>
                            {capability.subtitle}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

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

        {/* Life Essentials - Double Width */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(12px, 2vw, 20px)'
        }}>
          {verticals.filter(v => v.id === 'life').map((vertical) => {
            const Icon = vertical.icon;
            return (
              <div
                key={vertical.id}
                onClick={() => navigate(vertical.route)}
                style={{
                  background: vertical.bgGradient,
                  borderRadius: 'clamp(16px, 2vw, 20px)',
                  padding: 'clamp(20px, 3vw, 28px)',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  border: '1px solid rgba(0,0,0,0.05)',
                  position: 'relative',
                  minHeight: vertical.capabilityBadges ? '480px' : vertical.detailedMetrics ? '440px' : 'auto',
                  gridColumn: 'span 2'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Ask Sagaa Icon - Top Right */}
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAskSagaa(vertical.id, vertical.name, vertical.gradient);
                    }}
                    style={{
                      position: 'absolute',
                      top: '-2px',
                      right: vertical.alerts > 0 ? '48px' : '0px',
                      height: '36px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)',
                      border: '1px solid rgba(59, 130, 246, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      paddingLeft: '12px',
                      paddingRight: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      zIndex: 10,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(99, 102, 241, 0.25) 100%)';
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)';
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <MessageSquare 
                      size={16} 
                      style={{ 
                        color: '#3b82f6'
                      }} 
                    />
                    <span style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#3b82f6'
                    }}>
                      Ask Sagaa
                    </span>
                  </button>

                  {/* Alert Badge - Top Right Corner */}
                  {vertical.alerts > 0 && (
                    <div style={{
                      position: 'absolute',
                      top: '2px',
                      right: '0px',
                      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
                      zIndex: 10
                    }}>
                      <AlertCircle size={14} />
                      {vertical.alerts}
                    </div>
                  )}
                </div>

                {/* Icon and Title */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(12px, 1.5vw, 16px)',
                  marginBottom: 'clamp(16px, 2vw, 20px)',
                  marginTop: '12px'
                }}>
                  <div
                    style={{
                      background: vertical.gradient,
                      borderRadius: 'clamp(14px, 1.8vw, 18px)',
                      width: 'clamp(56px, 7vw, 72px)',
                      height: 'clamp(56px, 7vw, 72px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
                    }}
                  >
                    <Icon size={clamp(28, 36)} style={{ color: 'white' }} />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: 'clamp(20px, 2.5vw, 26px)',
                        fontWeight: '700',
                        margin: 0,
                        background: vertical.gradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      {vertical.name}
                    </h3>
                  </div>
                </div>

                {vertical.metrics.value === 'Q1 2026' ? (
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                    borderRadius: 'clamp(12px, 1.5vw, 14px)',
                    padding: 'clamp(20px, 2.5vw, 24px)',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    marginTop: 'clamp(16px, 2vw, 20px)'
                  }}>
                    <div style={{
                      fontSize: 'clamp(15px, 1.8vw, 17px)',
                      fontWeight: '600',
                      color: '#6366f1',
                      marginBottom: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <Clock size={18} />
                      Coming Soon
                    </div>
                    <p style={{
                      fontSize: 'clamp(13px, 1.6vw, 15px)',
                      color: '#6b7280',
                      margin: 0,
                      lineHeight: '1.6'
                    }}>
                      This feature will be available in {vertical.metrics.value}
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Capability Badges - Only for cards with capabilityBadges */}
                    {vertical.capabilityBadges && (
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                        marginBottom: '16px'
                      }}>
                        {vertical.capabilityBadges.map((capability, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'flex-start',
                              gap: '4px',
                              padding: '12px 16px',
                              borderRadius: '12px',
                              background: capability.active 
                                ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(249, 115, 22, 0.15) 100%)'
                                : 'rgba(156, 163, 175, 0.1)',
                              border: `1px solid ${capability.active ? 'rgba(245, 158, 11, 0.3)' : 'rgba(156, 163, 175, 0.2)'}`,
                              transition: 'all 0.2s',
                              minWidth: '140px'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontSize: '16px' }}>{capability.icon}</span>
                              <span style={{
                                fontSize: '13px',
                                fontWeight: '600',
                                color: capability.active ? '#92400e' : '#6b7280'
                              }}>
                                {capability.label}
                              </span>
                            </div>
                            {capability.subtitle && (
                              <span style={{
                                fontSize: '11px',
                                fontWeight: '500',
                                color: '#9ca3af',
                                paddingLeft: '24px'
                              }}>
                                {capability.subtitle}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

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
                          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 200px))',
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
                  </>
                )}
              </div>
            );
          })}
        </div>
        </div>
      </div>

      {/* Proactive Insights */}
      <div style={{ marginBottom: 'clamp(24px, 4vw, 40px)' }}>
        <div 
          onClick={() => toggleSection('insights')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            marginBottom: 'clamp(16px, 2vw, 20px)',
            userSelect: 'none'
          }}
        >
          <h2 style={{
            fontSize: 'clamp(20px, 3vw, 24px)',
            fontWeight: '600',
            margin: 0,
            color: '#111827'
          }}>
            Your Insights 
          </h2>
          <ChevronDown 
            size={20} 
            style={{
              color: '#6b7280',
              transition: 'transform 0.3s ease',
              transform: expandedSections.insights ? 'rotate(0deg)' : 'rotate(-90deg)'
            }}
          />
        </div>
        <div style={{
          overflow: 'hidden',
          maxHeight: expandedSections.insights ? '10000px' : '0',
          transition: 'max-height 0.5s ease-in-out, opacity 0.3s ease-in-out',
          opacity: expandedSections.insights ? 1 : 0
        }}>
          {/* Loading State */}
          {insightsLoading && (
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '32px',
              textAlign: 'center',
              color: '#6b7280'
            }}>
              <div style={{
                display: 'inline-block',
                width: '40px',
                height: '40px',
                border: '4px solid #e5e7eb',
                borderTopColor: '#0369a1',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              <p style={{ marginTop: '16px', fontSize: '14px' }}>Loading insights...</p>
            </div>
          )}

          {/* Error State */}
          {insightsError && (
            <div style={{
              background: '#fef2f2',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid #fecaca',
              textAlign: 'center'
            }}>
              <p style={{ color: '#991b1b', marginBottom: '12px' }}>
                Unable to load insights. Please try again.
              </p>
              <button
                onClick={() => refetchInsights()}
                style={{
                  background: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                Retry
              </button>
            </div>
          )}

          {/* Vertical Insight Aggregation Cards */}
          {!insightsLoading && !insightsError && insights.length > 0 && (() => {
            const aggregated = aggregateInsightsByVertical(insights);
            
            // Get or create aggregations for all verticals
            const moneyAgg = aggregated['sagaa_money'] || {
              vertical: 'sagaa_money',
              totalCount: 0,
              typeBreakdown: { insights: 0, forecasts: 0 },
              priorityBreakdown: { high: 0, medium: 0, low: 0 },
              insightPriorityBreakdown: { high: 0, medium: 0, low: 0 },
              forecastPriorityBreakdown: { high: 0, medium: 0, low: 0 },
              newCount: 0,
              viewedCount: 0,
              insights: []
            };
            
            const healthcareAgg = aggregated['sagaa_healthcare'] || {
              vertical: 'sagaa_healthcare',
              totalCount: 0,
              typeBreakdown: { insights: 0, forecasts: 0 },
              priorityBreakdown: { high: 0, medium: 0, low: 0 },
              insightPriorityBreakdown: { high: 0, medium: 0, low: 0 },
              forecastPriorityBreakdown: { high: 0, medium: 0, low: 0 },
              newCount: 0,
              viewedCount: 0,
              insights: []
            };

            const lifeEssentialsAgg = aggregated['sagaa_lifeessentials'] || {
              vertical: 'sagaa_lifeessentials',
              totalCount: 0,
              typeBreakdown: { insights: 0, forecasts: 0 },
              priorityBreakdown: { high: 0, medium: 0, low: 0 },
              insightPriorityBreakdown: { high: 0, medium: 0, low: 0 },
              forecastPriorityBreakdown: { high: 0, medium: 0, low: 0 },
              newCount: 0,
              viewedCount: 0,
              insights: []
            };

            const educationAgg = aggregated['sagaa_education'] || {
              vertical: 'sagaa_education',
              totalCount: 0,
              typeBreakdown: { insights: 0, forecasts: 0 },
              priorityBreakdown: { high: 0, medium: 0, low: 0 },
              insightPriorityBreakdown: { high: 0, medium: 0, low: 0 },
              forecastPriorityBreakdown: { high: 0, medium: 0, low: 0 },
              newCount: 0,
              viewedCount: 0,
              insights: []
            };

            console.log('Aggregated insights:', aggregated);
            console.log('Money aggregation:', moneyAgg);
            console.log('Healthcare aggregation:', healthcareAgg);
            console.log('Life Essentials aggregation:', lifeEssentialsAgg);
            console.log('Education aggregation:', educationAgg);

            return (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 'clamp(16px, 2vw, 24px)',
              }}>
                <VerticalInsightCard aggregation={moneyAgg} />
                <VerticalInsightCard aggregation={healthcareAgg} />
                <VerticalInsightCard aggregation={lifeEssentialsAgg} />
                <VerticalInsightCard aggregation={educationAgg} />
              </div>
            );
          })()}

          {/* Empty State */}
          {!insightsLoading && !insightsError && insights.length === 0 && (
            <div style={{
              background: '#f9fafb',
              borderRadius: '16px',
              padding: '40px 24px',
              textAlign: 'center',
              border: '2px dashed #d1d5db'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>💡</div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '8px'
              }}>
                No Insights Yet
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#6b7280'
              }}>
                Your personalized insights will appear here once available.
              </p>
            </div>
          )}
        </div>
        
        {/* Add CSS for spinner animation */}
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>

      {/* Goals Progress */}
      <div style={{ marginBottom: 'clamp(24px, 4vw, 40px)' }}>
        <div 
          onClick={() => toggleSection('goals')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            marginBottom: 'clamp(16px, 2vw, 20px)',
            userSelect: 'none'
          }}
        >
          <h2 style={{
            fontSize: 'clamp(20px, 3vw, 24px)',
            fontWeight: '600',
            margin: 0,
            color: '#111827'
          }}>
            Your Goals
          </h2>
          <ChevronDown 
            size={20} 
            style={{
              color: '#6b7280',
              transition: 'transform 0.3s ease',
              transform: expandedSections.goals ? 'rotate(0deg)' : 'rotate(-90deg)'
            }}
          />
        </div>
        <div style={{
          overflow: 'hidden',
          maxHeight: expandedSections.goals ? '10000px' : '0',
          transition: 'max-height 0.5s ease-in-out, opacity 0.3s ease-in-out',
          opacity: expandedSections.goals ? 1 : 0
        }}>
          {/* Loading State */}
          {goalsLoading && (
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '32px',
              textAlign: 'center',
              color: '#6b7280'
            }}>
              <div style={{
                display: 'inline-block',
                width: '40px',
                height: '40px',
                border: '4px solid #e5e7eb',
                borderTopColor: '#0369a1',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              <p style={{ marginTop: '16px', fontSize: '14px' }}>Loading goals...</p>
            </div>
          )}

          {/* Error State */}
          {goalsError && (
            <div style={{
              background: '#fef2f2',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid #fecaca',
              textAlign: 'center'
            }}>
              <p style={{ color: '#991b1b', marginBottom: '12px' }}>
                Unable to load goals. Please try again.
              </p>
              <button
                onClick={() => refetchGoals()}
                style={{
                  background: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                Retry
              </button>
            </div>
          )}

          {/* Goals Grid */}
          {!goalsLoading && !goalsError && activeGoals.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(350px, 100%), 1fr))',
              gap: 'clamp(16px, 2.5vw, 24px)'
            }}>
              {activeGoals.slice(0, 4).map((goal: Goal) => {
                const progress = goal.progress.percentage_complete || 0;
                
                // Get vertical-specific icon and gradient
                const verticalMap: Record<string, { icon: any; gradient: string }> = {
                  'sagaa_money': { icon: DollarSign, gradient: 'linear-gradient(135deg, #10b981 0%, #0d9488 100%)' },
                  'sagaa_healthcare': { icon: Heart, gradient: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)' },
                  'sagaa_education': { icon: GraduationCap, gradient: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' },
                  'sagaa_lifeessentials': { icon: HomeIcon, gradient: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)' },
                };
                const vertical = goal.vertical || 'sagaa_money'; // Default to money if not specified
                const { icon: VerticalIcon, gradient: verticalGradient } = verticalMap[vertical] || verticalMap['sagaa_money'];
                
                const formatCurrency = (value: number) => {
                  return new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(value);
                };

                const daysUntilTarget = Math.ceil((new Date(goal.target.target_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

                // Get goal health status from latest_evaluation if available, otherwise calculate
                let healthStatus = '';
                let healthColor = '';
                let healthBgColor = '';
                
                if (goal.latest_evaluation?.status) {
                  // Use backend evaluation status
                  const status = goal.latest_evaluation.status;
                  switch (status) {
                    case 'ahead':
                      healthStatus = '↑ Ahead';
                      healthColor = '#1e40af';
                      healthBgColor = '#dbeafe';
                      break;
                    case 'on_track':
                      healthStatus = '✓ On Track';
                      healthColor = '#065f46';
                      healthBgColor = '#d1fae5';
                      break;
                    case 'behind':
                      healthStatus = '↓ Behind';
                      healthColor = '#9a3412';
                      healthBgColor = '#fed7aa';
                      break;
                    case 'at_risk':
                      healthStatus = '⚠ At Risk';
                      healthColor = '#991b1b';
                      healthBgColor = '#fee2e2';
                      break;
                    default:
                      healthStatus = 'Off Track';
                      healthColor = '#374151';
                      healthBgColor = '#f3f4f6';
                  }
                } else {
                  // Fallback: Calculate health status
                  const startDate = new Date(goal.created_at);
                  const targetDate = new Date(goal.target.target_date);
                  const now = new Date();
                  const totalDays = Math.ceil((targetDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
                  const elapsedDays = Math.ceil((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
                  const expectedProgress = Math.min(100, (elapsedDays / totalDays) * 100);
                  const actualProgress = progress;
                  const progressDiff = actualProgress - expectedProgress;
                  
                  if (progressDiff >= 10) {
                    healthStatus = '↑ Ahead';
                    healthColor = '#1e40af';
                    healthBgColor = '#dbeafe';
                  } else if (progressDiff >= -5) {
                    healthStatus = '✓ On Track';
                    healthColor = '#065f46';
                    healthBgColor = '#d1fae5';
                  } else if (progressDiff >= -15) {
                    healthStatus = '↓ Behind';
                    healthColor = '#9a3412';
                    healthBgColor = '#fed7aa';
                  } else {
                    healthStatus = '⚠ At Risk';
                    healthColor = '#991b1b';
                    healthBgColor = '#fee2e2';
                  }
                }

                return (
                  <div
                    key={goal.goal_id}
                    style={{
                      background: 'white',
                      borderRadius: '12px',
                      padding: '24px',
                      border: '1px solid #e5e7eb',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      position: 'relative',
                      minHeight: '280px',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                    onClick={() => navigate(`/goals/${goal.goal_id}`)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#d1d5db';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e5e7eb';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {/* Content Section - Takes available space */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      {/* Goal Header */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: verticalGradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <VerticalIcon size={24} color="white" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                          <div style={{ fontSize: '18px', fontWeight: '700', color: '#111827' }}>
                            {goal.goal_name || 'Unnamed Goal'}
                          </div>
                          <span style={{
                            fontSize: '11px',
                            fontWeight: '600',
                            padding: '4px 10px',
                            borderRadius: '12px',
                            textTransform: 'capitalize',
                            backgroundColor: 
                              goal.status === 'active' ? '#dcfce7' :
                              goal.status === 'completed' ? '#dbeafe' :
                              goal.status === 'paused' ? '#fef3c7' :
                              '#fee2e2',
                            color:
                              goal.status === 'active' ? '#166534' :
                              goal.status === 'completed' ? '#1e40af' :
                              goal.status === 'paused' ? '#92400e' :
                              '#991b1b'
                          }}>
                            {goal.status}
                          </span>
                          <span style={{
                            fontSize: '11px',
                            fontWeight: '600',
                            padding: '4px 10px',
                            borderRadius: '12px',
                            backgroundColor: healthBgColor,
                            color: healthColor
                          }}>
                            {healthStatus}
                          </span>
                        </div>
                        <div style={{ fontSize: '14px', color: '#6b7280' }}>
                          Target: {formatCurrency(goal.target.target_value)}
                        </div>
                      </div>
                    </div>

                    {/* Blue Box - Intent and Target Date */}
                    <div style={{ 
                      backgroundColor: '#eff6ff', 
                      borderLeft: '4px solid #3b82f6', 
                      padding: '14px', 
                      borderRadius: '0 8px 8px 0',
                      marginBottom: '16px'
                    }}>
                      <div style={{ fontSize: '12px', fontWeight: '600', color: '#1e3a8a', marginBottom: '6px' }}>
                        Your Goal
                      </div>
                      <div style={{ fontSize: '13px', color: '#1e40af', lineHeight: 1.6, marginBottom: '10px' }}>
                        {goal.intent || goal.context?.intent || `Save ${formatCurrency(goal.target.target_value)} for ${goal.goal_name}`}
                      </div>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '6px',
                        fontSize: '13px',
                        color: '#1e40af',
                        flexWrap: 'wrap'
                      }}>
                        <span style={{ fontWeight: '600' }}>Target Date:</span>
                        <span style={{ fontWeight: '700' }}>
                          {new Date(goal.target.target_date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <span style={{ 
                          marginLeft: '4px',
                          color: daysUntilTarget < 30 ? '#ea580c' : '#1e40af',
                          fontWeight: '500'
                        }}>
                          ({daysUntilTarget > 0 
                            ? `${daysUntilTarget} days remaining` 
                            : 'Overdue'})
                        </span>
                      </div>
                    </div>
                    </div>

                    {/* Progress Bar - Fixed at bottom */}
                    <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        fontSize: '13px', 
                        color: '#4b5563', 
                        marginBottom: '8px',
                        fontWeight: '600'
                      }}>
                        <span>{progress}% Complete</span>
                        <span>{formatCurrency(goal.progress.current_amount || 0)}</span>
                      </div>
                      <div style={{ 
                        height: '12px', 
                        backgroundColor: '#e5e7eb', 
                        borderRadius: '9999px', 
                        overflow: 'hidden' 
                      }}>
                        <div
                          style={{
                            height: '100%',
                            transition: 'width 0.3s',
                            width: `${Math.min(progress, 100)}%`,
                            backgroundColor: 
                              progress >= 75 ? '#10b981' :
                              progress >= 50 ? '#3b82f6' :
                              progress >= 25 ? '#eab308' :
                              '#f97316'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {!goalsLoading && !goalsError && activeGoals.length === 0 && (
            <div style={{
              background: '#f9fafb',
              borderRadius: '16px',
              padding: '40px 24px',
              textAlign: 'center',
              border: '2px dashed #d1d5db'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🎯</div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '8px'
              }}>
                No Goals Yet
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '20px'
              }}>
                Set your first financial goal to start tracking your progress.
              </p>
              <button
                onClick={() => navigate('/goals')}
                style={{
                  padding: '10px 20px',
                  background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(12, 74, 110, 0.3)'
                }}
              >
                Create Your First Goal
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div 
          onClick={() => toggleSection('activity')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            marginBottom: '20px',
            userSelect: 'none'
          }}
        >
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            margin: 0,
            color: '#111827'
          }}>
            Recent Activity
          </h2>
          <ChevronDown 
            size={20} 
            style={{
              color: '#6b7280',
              transition: 'transform 0.3s ease',
              transform: expandedSections.activity ? 'rotate(0deg)' : 'rotate(-90deg)'
            }}
          />
        </div>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          border: '1px solid #e5e7eb',
          overflow: 'hidden',
          maxHeight: expandedSections.activity ? '10000px' : '0',
          transition: 'max-height 0.5s ease-in-out, opacity 0.3s ease-in-out',
          opacity: expandedSections.activity ? 1 : 0
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
