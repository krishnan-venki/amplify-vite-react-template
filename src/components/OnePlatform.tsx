import { ArrowRight, DollarSign, Heart, GraduationCap, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export  const OnePlatform = () => {
  const verticals = [
    {
      icon: DollarSign,
      name: "Sagaa Money",
      description: "AI-powered financial intelligence that transforms you from financial stress to confident wealth management.",
      gradient: "linear-gradient(135deg, #10b981 0%, #0d9488 100%)",
      link: "/money"
    },
    {
      icon: Heart,
      name: "Sagaa Healthcare",
      description: "Your proactive health companion that anticipates needs, schedules care, and learns what keeps you thriving.",
      gradient: "linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)",
      link: "/healthcare" // update to route
    },
    {
      icon: GraduationCap,
      name: "Sagaa Education",
      description: "Personalized learning intelligence that adapts to your goals and connects knowledge to real-world success.",
      gradient: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
      link: "/education"
    },
    {
      icon: Home,
      name: "Sagaa Life Essentials",
      description: "Seamless home and asset management with trusted community services - everything maintained, nothing forgotten.",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
      link: "/life-essentials"
    }
  ];

  return (
    <section style={{
      padding: '80px 24px',
      background: 'linear-gradient(to bottom, #f9fafb 0%, #ffffff 100%)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '64px'
        }}>
          <h2 style={{
            fontSize: 'clamp(48px, 5vw, 60px)',
            fontWeight: '300',
            color: '#111827',
            marginBottom: '24px',
            lineHeight: '1.1'
          }}>
            One Platform.{' '}
            <span style={{
              background: 'linear-gradient(to right, #2563eb 0%, #06b6d4 50%, #10b981 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: '400'
            }}>
              Infinite Possibilities.
            </span>
          </h2>
          <p style={{
            fontSize: '20px',
            color: '#4b5563',
            maxWidth: '1024px',
            margin: '0 auto',
            lineHeight: '1.75'
          }}>
            Stop juggling apps. Sagaa unifies your entire life into one intelligent ecosystem—where specialized AI verticals work together to free you from routine tasks, so you can focus on what you love most.
          </p>
        </div>

        
        {/* Verticals Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '48px'
        }}>
          {verticals.map((vertical, index) => {
            const Icon = vertical.icon;
            return (
              <VerticalCard key={index} vertical={vertical} Icon={Icon} />
            );
          })}
        </div>

        {/* Subscription Model Highlight */}
        <div style={{
          background: 'linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)',
          borderRadius: '20px',
          padding: '32px',
          marginBottom: '48px',
          border: '2px solid #e0e7ff',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
            opacity: '0.05',
            borderRadius: '50%'
          }} />
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px'
          }}>
            <div style={{ flex: '1', minWidth: '300px' }}>
              <div style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
                padding: '6px 16px',
                borderRadius: '20px',
                marginBottom: '12px'
              }}>
                <span style={{
                  color: 'white',
                  fontSize: '13px',
                  fontWeight: '600',
                  letterSpacing: '0.5px'
                }}>
                  FLEXIBLE SUBSCRIPTION MODEL
                </span>
              </div>
              <h3 style={{
                fontSize: '28px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '12px',
                lineHeight: '1.2'
              }}>
                Choose Your Verticals, Build Your Ecosystem
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#4b5563',
                lineHeight: '1.6',
                marginBottom: '16px'
              }}>
                Subscribe to one or all—it's your choice. Each vertical you enable automatically integrates with the others, creating seamless cross-vertical intelligence that grows smarter together.
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                color: '#059669',
                fontWeight: '500'
              }}>
                <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                New verticals launching incrementally
              </div>
            </div>
            <div style={{
              display: 'flex',
              gap: '24px',
              alignItems: 'center'
            }}>
              <div style={{
                textAlign: 'center',
                padding: '20px 28px',
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{
                  fontSize: '36px',
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: '1'
                }}>
                  $.$$
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#6b7280',
                  marginTop: '8px',
                  fontWeight: '500'
                }}>
                  per vertical/month
                </div>
              </div>
            </div>
          </div>
        </div>


       
      </div>
    </section>
  );
}

type Vertical = {
  icon: React.ElementType;
  name: string;
  description: string;
  gradient: string;
  link: string;
};

interface VerticalCardProps {
  vertical: Vertical;
  Icon: React.ElementType;
}

function VerticalCard({ vertical, Icon }: VerticalCardProps) {
  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
        overflow: 'hidden',
        transition: 'all 0.3s ease'
        
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
        e.currentTarget.style.borderColor = 'transparent';
        const overlay = e.currentTarget.querySelector('.gradient-overlay') as HTMLElement | null;
        if (overlay) overlay.style.opacity = '0.05';
        const icon = e.currentTarget.querySelector('.icon-container') as HTMLElement | null;
        if (icon) icon.style.transform = 'scale(1.1)';
        const arrow = e.currentTarget.querySelector('.arrow-icon') as HTMLElement | null;
        if (arrow) arrow.style.transform = 'translateX(4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.borderColor = '#e5e7eb';
        const overlay = e.currentTarget.querySelector('.gradient-overlay') as HTMLElement | null;
        if (overlay) overlay.style.opacity = '0';
        const icon = e.currentTarget.querySelector('.icon-container') as HTMLElement | null;
        if (icon) icon.style.transform = 'scale(1)';
        const arrow = e.currentTarget.querySelector('.arrow-icon') as HTMLElement | null;
        if (arrow) arrow.style.transform = 'translateX(0)';
      }}
    >
      {/* Gradient overlay */}
      <div 
        className="gradient-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          background: vertical.gradient,
          opacity: 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none'
        }}
      />
      <div style={{ position: 'relative' }}>
        {/* Icon */}
        <div
          className="icon-container"
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '12px',
            background: vertical.gradient,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            transition: 'transform 0.3s ease'
          }}
        >
          <Icon style={{ width: '28px', height: '28px', color: 'white' }} />
        </div>
        {/* Content */}
        <h3 style={{
          fontSize: '24px',
          fontWeight: '600',
          color: '#111827',
          marginBottom: '12px'
        }}>
          {vertical.name}
        </h3>
        <p style={{
          color: '#4b5563',
          lineHeight: '1.75',
          marginBottom: '16px'
        }}>
          {vertical.description}
        </p>
        {/* Learn More Link */}
        {vertical.name === 'Sagaa Healthcare' ? (
          <Link
            to="/sagaa-healthcare"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontSize: '14px',
              fontWeight: '500',
              background: vertical.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textDecoration: 'none',
              transition: 'gap 0.3s ease'
            }}
          >
            Learn More
            <ArrowRight 
              className="arrow-icon"
              style={{ 
                width: '16px', 
                height: '16px', 
                marginLeft: '4px',
                transition: 'transform 0.3s ease',
                opacity: 0.7
              }} 
            />
          </Link>
        ) : (
          <a
            href={vertical.link}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontSize: '14px',
              fontWeight: '500',
              background: vertical.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textDecoration: 'none',
              transition: 'gap 0.3s ease'
            }}
          >
            Learn More
            <ArrowRight 
              className="arrow-icon"
              style={{ 
                width: '16px', 
                height: '16px', 
                marginLeft: '4px',
                transition: 'transform 0.3s ease',
                opacity: 0.7
              }} 
            />
          </a>
        )}
      </div>
    </div>
  );
}