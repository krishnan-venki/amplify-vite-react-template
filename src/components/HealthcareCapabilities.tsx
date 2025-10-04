import { useRef, useEffect, useState } from 'react';

export const HealthcareCapabilities = () => {
  const [selectedCapability, setSelectedCapability] = useState<string | null>(null);
  const fadeInElementsRef = useRef<HTMLDivElement[]>([]);
  
 const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !fadeInElementsRef.current.includes(el)) {
      fadeInElementsRef.current.push(el);
    }
  };

  useEffect(() => {
    fadeInElementsRef.current.forEach((el) => {
      if (el) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  }, []);

  const handleCapabilityClick = (capabilityId: string) => {
    if (selectedCapability === capabilityId) {
      setSelectedCapability(null);
    } else {
      setSelectedCapability(capabilityId);
    }
  };

  const capabilities = {
    ehrIntegration: {
      id: 'ehrIntegration',
      icon: '📋',
      iconBg: '#dbeafe',
      title: 'Medical Records Integration',
      shortDesc: 'Complete health history from all your providers automatically synced in one place',
      detailHeadline: 'Your Complete Health Story',
      detailText: 'Sagaa integrates with electronic health records to pull your complete medical history, lab results, medications, and visit summaries. No more scattered records or forgotten details—everything your doctors need to know is always accessible.',
      example: '"Your last A1C was 5.9 eight months ago. Dr. Chen recommended a follow-up at 6 months. You\'re 2 months overdue. I see increased exercise in your Apple Watch data—let\'s schedule that recheck to see if your efforts are working."',
      showExample: true
    },
    deviceIntegration: {
      id: 'deviceIntegration',
      icon: '⌚',
      iconBg: '#f3e8ff',
      title: 'Smart Device Integration',
      shortDesc: 'Continuous health monitoring from wearables, CGMs, blood pressure monitors, and more',
      detailHeadline: 'Real-Time Health Intelligence',
      detailText: 'Connect your Apple Watch, Fitbit, Dexcom CGM, Omron blood pressure monitor, Oura Ring, and other devices. Sagaa continuously monitors your health data, identifies patterns, and provides actionable insights—not just numbers.',
      example: '"Your home BP readings show great progress: Week 1 average was 142/88, now you\'re at 122/76. Your Lisinopril is working well. For your follow-up with Dr. Chen, I\'ve prepared a summary showing 95% of readings in target range."',
      showExample: true
    },
    medications: {
      id: 'medications',
      icon: '💊',
      iconBg: '#fce7f3',
      title: 'Intelligent Medications',
      shortDesc: 'Context-aware reminders, effectiveness tracking, and cost optimization',
      detailHeadline: 'Beyond Reminders—True Partnership',
      detailText: 'Sagaa doesn\'t just remind you to take pills. It learns your routine, tracks medication effectiveness using device data, prevents interactions, optimizes costs, and predicts refill needs before you run out.',
      example: '"Take your levothyroxine now—you have a 7:30 AM meeting, so this ensures the 30-minute food gap. Your coffee is ready. Also, your Lexapro prescription expires next week and Dr. Martinez requires an annual visit for renewal. She has an opening Thursday at 4 PM."',
      showExample: true
    },
    appointments: {
      id: 'appointments',
      icon: '📅',
      iconBg: '#dcfce7',
      title: 'Appointments & Care Team',
      shortDesc: 'Seamless coordination across all your healthcare providers',
      detailHeadline: 'Your Providers, Finally Connected',
      detailText: 'Schedule appointments, track referrals, coordinate care between providers, and prepare for visits with personalized reports. Sagaa ensures nothing falls through the cracks and all your providers have the information they need.',
      example: '"Dr. Martinez\'s visit notes mention she\'s concerned about your vitamin D levels (18 ng/mL). She recommended 2000 IU daily and recheck in 3 months. I see you haven\'t picked up the prescription yet. Should I order OTC supplements or remind the pharmacy?"',
      showExample: true
    },
    chronicConditions: {
      id: 'chronicConditions',
      icon: '📊',
      iconBg: '#fed7aa',
      title: 'Chronic Condition Management',
      shortDesc: 'Specialized intelligence for diabetes, hypertension, and other conditions',
      detailHeadline: 'Turn Chronic into Controlled',
      detailText: 'Advanced pattern recognition for diabetes (glucose trends, meal impacts, exercise effects), hypertension (BP patterns, medication effectiveness), and other conditions. Real-time insights help you achieve better control.',
      example: '"Your CGM shows breakfast is your highest glucose spike time (avg 145 mg/dL). Post-lunch and dinner stay under 130. Your body handles carbs better after 10 AM. Consider shifting breakfast carbs to lunch—this could drop your A1C by 0.3-0.4 points."',
      showExample: true
    },
    mentalHealth: {
      id: 'mentalHealth',
      icon: '🧠',
      iconBg: '#e0e7ff',
      title: 'Mental Health & Wellness',
      shortDesc: 'Integrated mental health support with mood tracking and therapy coordination',
      detailHeadline: 'Mind and Body, Together',
      detailText: 'Track mood patterns, coordinate therapy appointments, monitor psychiatric medications, and understand how mental and physical health interact. Your HRV, sleep quality, and activity levels inform mental health insights.',
      example: '"Your mood logs show a pattern of low mood on Sundays. Your calendar shows fewer social plans on weekends. Community insight: 73% of users found proactively scheduling weekend activities reduced Sunday anxiety. Want me to suggest some activities?"',
      showExample: true
    },
    familyHealth: {
      id: 'familyHealth',
      icon: '👨‍👩‍👧‍👦',
      iconBg: '#d1fae5',
      title: 'Family Health Management',
      shortDesc: 'Manage health for your entire household—children, parents, partners',
      detailHeadline: 'One Platform for the Whole Family',
      detailText: 'Multi-person profiles for children, aging parents, and partners. Coordinated scheduling, medication management for the family, pediatric milestones, elder care coordination—all in one place. No more juggling multiple apps.',
      example: '"Family health alert: Tommy\'s inhaler expires next week, Dad\'s BP meds need refill, Emma is due for 3-year vaccines, and your A1C recheck is in 2 weeks. I can book Tommy\'s allergy follow-up and Emma\'s vaccines together at the same clinic, Saturday 10 AM."',
      showExample: true
    },
    preventiveCare: {
      id: 'preventiveCare',
      icon: '🛡️',
      iconBg: '#bfdbfe',
      title: 'Preventive Care Intelligence',
      shortDesc: 'Personalized screening reminders based on age, risk factors, and family history',
      detailHeadline: 'Catch Problems Before They Start',
      detailText: 'Age-appropriate screenings, risk assessment from family history and device data, early warning detection from health patterns. Sagaa helps you stay ahead of health issues with proactive, personalized preventive care reminders and guidance.',
      example: '"You\'re turning 40 next month. With your family history of breast cancer (maternal aunt at 44), guidelnes recommend starting mammograms now rather than waiting. Your insurance covers screening at 100%. Should I help you schedule?"',
      showExample: true
    }
  };

  const leftCapabilities = [
    capabilities.ehrIntegration,
    capabilities.deviceIntegration,
    capabilities.medications,
    capabilities.appointments
  ];

  const rightCapabilities = [
    capabilities.chronicConditions,
    capabilities.mentalHealth,
    capabilities.familyHealth,
    capabilities.preventiveCare
  ];

  type Capability = {
    id: string;
    icon: string;
    iconBg: string;
    title: string;
    shortDesc: string;
    detailHeadline: string;
    detailText: string;
    example?: string;
    showExample?: boolean;
  };

  interface CapabilityCardProps {
    capability: Capability;
    isSelected: boolean;
  }

  const CapabilityCard = ({ capability, isSelected }: CapabilityCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <div 
        onClick={() => handleCapabilityClick(capability.id)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ 
          display: 'flex', 
          alignItems: 'flex-start', 
          gap: '16px',
          cursor: 'pointer',
          padding: '12px',
          borderRadius: '12px',
          transition: 'all 0.3s ease',
          backgroundColor: isSelected || isHovered ? '#fef2f2' : 'transparent',
          border: isSelected ? '2px solid #ef4444' : isHovered ? '2px solid #fca5a5' : '2px solid transparent',
          opacity: selectedCapability && !isSelected ? 0.4 : 1
        }}
      >
        <div style={{
          width: '48px',
          height: '48px',
          backgroundColor: capability.iconBg,
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transform: isSelected || isHovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'transform 0.3s ease'
        }}>
          <span style={{ fontSize: '32px' }}>{capability.icon}</span>
        </div>
        <div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '500',
            color: '#1d1d1f',
            marginBottom: '8px'
          }}>{capability.title}</h3>
          <p style={{ 
            color: '#6e6e73',
            fontSize: '15px',
            lineHeight: '1.5',
            margin: 0
          }}>{capability.shortDesc}</p>
        </div>
      </div>
    );
  };

  const HealthcareVisual = () => (
    <div style={{
      position: 'relative',
      width: '320px',
      height: '320px',
      opacity: selectedCapability ? 0 : 1,
      transform: selectedCapability ? 'scale(0.8)' : 'scale(1)',
      transition: 'all 0.6s ease',
      pointerEvents: selectedCapability ? 'none' : 'auto'
    }}>
      <svg width="320" height="320" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 0 }}>
        <line x1="160" y1="160" x2="240" y2="80" stroke="#ef4444" strokeWidth="2" opacity="0.25">
          <animate attributeName="opacity" values="0.15;0.4;0.15" dur="2.5s" repeatCount="indefinite" />
        </line>
        <line x1="160" y1="160" x2="264" y2="200" stroke="#8b5cf6" strokeWidth="2" opacity="0.25">
          <animate attributeName="opacity" values="0.15;0.4;0.15" dur="2.2s" repeatCount="indefinite" />
        </line>
        <line x1="160" y1="160" x2="80" y2="264" stroke="#ec4899" strokeWidth="2" opacity="0.25">
          <animate attributeName="opacity" values="0.15;0.4;0.15" dur="2.7s" repeatCount="indefinite" />
        </line>
        <line x1="160" y1="160" x2="40" y2="120" stroke="#10b981" strokeWidth="2" opacity="0.25">
          <animate attributeName="opacity" values="0.15;0.4;0.15" dur="2.3s" repeatCount="indefinite" />
        </line>
        <line x1="160" y1="160" x2="120" y2="32" stroke="#f59e0b" strokeWidth="2" opacity="0.25">
          <animate attributeName="opacity" values="0.15;0.4;0.15" dur="2.6s" repeatCount="indefinite" />
        </line>
        <line x1="160" y1="160" x2="200" y2="280" stroke="#06b6d4" strokeWidth="2" opacity="0.25">
          <animate attributeName="opacity" values="0.15;0.4;0.15" dur="2.4s" repeatCount="indefinite" />
        </line>
      </svg>
      
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80px',
        height: '80px',
        background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 32px rgba(239, 68, 68, 0.3)',
        zIndex: 2
      }}>
        <span style={{ color: 'white', fontSize: '40px' }}>❤️</span>
      </div>
      
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '200px',
        height: '200px',
        border: '1px solid #fecaca',
        borderRadius: '50%',
        opacity: 0.3
      }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '240px',
        height: '240px',
        border: '1px solid #fecaca',
        borderRadius: '50%',
        opacity: 0.2
      }} />
      
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '0',
        height: '0'
      }}>
        <div style={{
          position: 'absolute',
          width: '48px',
          height: '48px',
          backgroundColor: '#dbeafe',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          left: '-24px',
          top: '-24px',
          animation: 'orbit1 20s linear infinite'
        }}>
          <span style={{ fontSize: '20px' }}>📋</span>
        </div>
        
        <div style={{
          position: 'absolute',
          width: '48px',
          height: '48px',
          backgroundColor: '#f3e8ff',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          left: '-24px',
          top: '-24px',
          animation: 'orbit2 20s linear infinite'
        }}>
          <span style={{ fontSize: '20px' }}>⌚</span>
        </div>
        
        <div style={{
          position: 'absolute',
          width: '48px',
          height: '48px',
          backgroundColor: '#fce7f3',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          left: '-24px',
          top: '-24px',
          animation: 'orbit3 20s linear infinite'
        }}>
          <span style={{ fontSize: '20px' }}>💊</span>
        </div>
        
        <div style={{
          position: 'absolute',
          width: '48px',
          height: '48px',
          backgroundColor: '#dcfce7',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          left: '-24px',
          top: '-24px',
          animation: 'orbit4 20s linear infinite'
        }}>
          <span style={{ fontSize: '20px' }}>📅</span>
        </div>
        
        <div style={{
          position: 'absolute',
          width: '48px',
          height: '48px',
          backgroundColor: '#d1fae5',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          left: '-24px',
          top: '-24px',
          animation: 'orbit5 20s linear infinite'
        }}>
          <span style={{ fontSize: '20px' }}>👨‍👩‍👧‍👦</span>
        </div>
      </div>

      <style>{`
        @keyframes orbit1 {
          from { transform: rotate(0deg) translateX(100px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
        }
        @keyframes orbit2 {
          from { transform: rotate(72deg) translateX(100px) rotate(-72deg); }
          to { transform: rotate(432deg) translateX(100px) rotate(-432deg); }
        }
        @keyframes orbit3 {
          from { transform: rotate(144deg) translateX(100px) rotate(-144deg); }
          to { transform: rotate(504deg) translateX(100px) rotate(-504deg); }
        }
        @keyframes orbit4 {
          from { transform: rotate(216deg) translateX(100px) rotate(-216deg); }
          to { transform: rotate(576deg) translateX(100px) rotate(-576deg); }
        }
        @keyframes orbit5 {
          from { transform: rotate(288deg) translateX(100px) rotate(-288deg); }
          to { transform: rotate(648deg) translateX(100px) rotate(-648deg); }
        }
      `}</style>
    </div>
  );

  const CapabilityDetail = () => {
    if (!selectedCapability) return null;
    const capability = capabilities[selectedCapability as keyof typeof capabilities];
    
    if (!capability) return null;

    return (
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        maxWidth: '480px',
        opacity: selectedCapability ? 1 : 0,
        transition: 'all 0.6s ease',
        pointerEvents: selectedCapability ? 'auto' : 'none'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #f87171 100%)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 20px 60px rgba(220, 38, 38, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'relative'
        }}>
          <button
            onClick={() => setSelectedCapability(null)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'rgba(255, 255, 255, 0.95)',
              fontSize: '18px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              padding: 0
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            ✕
          </button>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
            }}>
              <span style={{ fontSize: '36px' }}>{capability.icon}</span>
            </div>
            <div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#ffffff',
                margin: 0
              }}>{capability.detailHeadline}</h3>
            </div>
          </div>

          <p style={{
            fontSize: '16px',
            lineHeight: '1.6',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '20px'
          }}>
            {capability.detailText}
          </p>

          {capability.showExample && capability.example && (
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '16px',
              borderLeft: '3px solid rgba(255, 255, 255, 0.4)'
            }}>
              <p style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.85)',
                fontStyle: 'italic',
                margin: 0
              }}>
                {capability.example}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section style={{
      padding: '60px 0',
      backgroundColor: 'white'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 24px'
      }}>
        <div ref={addToRefs} style={{ 
          textAlign: 'center', 
          marginBottom: '80px',
          opacity: 0,
          transform: 'translateY(20px)',
          transition: 'all 0.8s ease-out'
        }}>
          <h2 style={{
            fontSize: 'clamp(48px, 5vw, 60px)',
            fontWeight: '100',
            color: '#1d1d1f',
            marginBottom: '32px',
            lineHeight: '1.1',
            textAlign: 'center',
            maxWidth: '900px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            <span style={{ 
              color: '#1d1d1f',
              backgroundColor: 'transparent'
            }}>Your Health.</span>{' '}
            <span style={{
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #f87171 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}>One Platform.</span>
          </h2>
          <p style={{
            fontSize: '22px',
            color: '#6b7280',
            maxWidth: '1024px',
            margin: '0 auto',
            lineHeight: '1.7',
            fontWeight: '300'
          }}>
            From medical records to wearables, medications to family care—everything you need to manage health intelligently, all in one place.
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'stretch',
          gap: '40px',
          flexWrap: 'wrap'
        }}>
          <div ref={addToRefs} style={{ 
            flex: '1 1 320px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '16px', 
            justifyContent: 'center',
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'all 0.8s ease-out 0.2s'
          }}>
            {leftCapabilities.map(capability => (
              <CapabilityCard 
                key={capability.id} 
                capability={capability} 
                isSelected={selectedCapability === capability.id}
              />
            ))}
          </div>

          <div ref={addToRefs} style={{ 
            flex: '0 1 400px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            minWidth: '340px',
            minHeight: '480px',
            position: 'relative',
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'all 0.8s ease-out 0.4s'
          }}>
            <HealthcareVisual />
            <CapabilityDetail />
            
            {!selectedCapability && (
              <div style={{ 
                textAlign: 'center', 
                marginTop: '32px',
                opacity: 1,
                transition: 'opacity 0.3s ease'
              }}>
                <p style={{ 
                  color: '#6e6e73', 
                  fontSize: '14px',
                  marginBottom: '8px'
                }}>Your health, intelligently connected</p>
                <p style={{ 
                  color: '#9ca3af', 
                  fontSize: '13px',
                  fontStyle: 'italic'
                }}>Click any capability to explore</p>
              </div>
            )}
          </div>

          <div ref={addToRefs} style={{ 
            flex: '1 1 320px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '16px', 
            justifyContent: 'center',
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'all 0.8s ease-out 0.6s'
          }}>
            {rightCapabilities.map(capability => (
              <CapabilityCard 
                key={capability.id} 
                capability={capability} 
                isSelected={selectedCapability === capability.id}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthcareCapabilities;