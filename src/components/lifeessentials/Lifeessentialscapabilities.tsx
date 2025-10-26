import { useRef, useEffect, useState } from 'react';

export const LifeEssentialsCapabilities = () => {
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
    propertyAsset: {
      id: 'propertyAsset',
      icon: '🏡',
      iconBg: '#dbeafe',
      title: 'Property & Asset Intelligence',
      shortDesc: 'Everything you own—homes, vehicles, appliances—with predictive maintenance and smart replacement planning',
      detailHeadline: 'Intelligent Asset Management',
      detailText: 'Comprehensive tracking of all properties (primary, vacation, rental, investment), vehicles, and major assets. AI-powered preventive maintenance tracking, equipment lifespan monitoring, depreciation intelligence, warranty hub, and repair vs. replace analysis. Never miss maintenance or face unexpected failures.',
      example: '"Your water heater is 11 years old (average lifespan 10-12). It\'s winter, and failures spike 40% in cold months. Based on your emergency fund ($8,200), I recommend getting 3 quotes now before it fails. I found 3 vetted plumbers in your community who can provide estimates this week—all have experience with your home\'s 1995 plumbing system."',
      showExample: true
    },
    householdOps: {
      id: 'householdOps',
      icon: '🛒',
      iconBg: '#dcfce7',
      title: 'Household Operations & Automation',
      shortDesc: 'Daily life management—shopping, meals, inventory, subscriptions—intelligently automated',
      detailHeadline: 'Smart Daily Living',
      detailText: 'Intelligent shopping with recurring purchase predictions, price tracking, and optimal buying moments. AI-powered meal planning based on dietary preferences, budget, and health goals. Inventory tracking to reduce waste. Subscription audit and optimization. Utility usage intelligence with bill anomaly detection and provider comparison.',
      example: '"You\'re running low on laundry detergent (about 2 weeks left based on usage). Costco has your brand on sale this week ($8 savings vs. regular price). Your calendar shows Saturday morning availability—want me to add it to your shopping list? Also, your grocery spending is up 30% this month, but I noticed you\'ve been meal prepping (detected from Sunday grocery trips). Should I reallocate $100/month from dining budget to groceries to reflect your new healthy habit?"',
      showExample: true
    },
    familyCoord: {
      id: 'familyCoord',
      icon: '👨‍👩‍👧‍👦',
      iconBg: '#fef3c7',
      title: 'Family & Life Coordination',
      shortDesc: 'Calendar, chores, pet care, activities—everything that keeps your household running smoothly',
      detailHeadline: 'Unified Family Management',
      detailText: 'Shared family calendar with intelligent conflict detection and optimization. Fair chore distribution with accountability tracking. Complete pet care coordination (vet appointments, medication schedules, grooming, food ordering). Child activity management (sports, school events, permission slips, carpools). Elder care coordination with medication and appointment tracking.',
      example: '"Tommy\'s soccer tournament is Saturday 8 AM in Bellevue. Sarah mentioned taking him, but she also has her dentist appointment at 9 AM across town—this is a scheduling conflict. Options: (1) Reschedule Sarah\'s dentist to next week (Thursday 2 PM available), (2) Arrange carpool with Jake\'s family (they\'re going to the same tournament). Also, your dog Bella\'s rabies vaccine expires next week. Your vet has Thursday 3 PM available—I can book it and add the $85 to your pet care budget."',
      showExample: true
    },
    docsPreparedness: {
      id: 'docsPreparedness',
      icon: '🔒',
      iconBg: '#fce7f3',
      title: 'Documents & Emergency Preparedness',
      shortDesc: 'Secure vault for critical documents, insurance tracking, emergency readiness, and risk management',
      detailHeadline: 'Security & Peace of Mind',
      detailText: 'Digital vault for important documents (deeds, titles, insurance policies, wills). Password and credential management for household services. Emergency contact database with quick access. Insurance coverage analysis across all assets with gap identification and renewal tracking. Disaster preparedness with emergency kit monitoring and weather-based proactive alerts.',
      example: '"Severe weather forecast: 2 feet of snow expected Friday-Sunday. Your emergency kit has 3-day food supply, but I don\'t see batteries for flashlights in your inventory. Your furnace is 8 years old—if power fails, you\'ll need the backup generator. I can order batteries for delivery tomorrow, and I\'ll remind you to test the generator Thursday. Also, your homeowner\'s insurance renews in 30 days. Since your kitchen renovation last year (+$45K value), your coverage may be inadequate—68% of renovations aren\'t reported to insurance. Should I help you update your policy?"',
      showExample: true
    }
  };

  const leftCapabilities = [
    capabilities.propertyAsset,
    capabilities.householdOps
  ];

  const rightCapabilities = [
    capabilities.familyCoord,
    capabilities.docsPreparedness
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
          backgroundColor: isSelected || isHovered ? '#fef3e7' : 'transparent',
          border: isSelected ? '2px solid #f59e0b' : isHovered ? '2px solid #fbbf24' : '2px solid transparent',
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

  const LifeEssentialsVisual = () => (
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
        <line x1="160" y1="160" x2="240" y2="80" stroke="#f59e0b" strokeWidth="2" opacity="0.25">
          <animate attributeName="opacity" values="0.15;0.4;0.15" dur="2.5s" repeatCount="indefinite" />
        </line>
        <line x1="160" y1="160" x2="264" y2="200" stroke="#f97316" strokeWidth="2" opacity="0.25">
          <animate attributeName="opacity" values="0.15;0.4;0.15" dur="2.2s" repeatCount="indefinite" />
        </line>
        <line x1="160" y1="160" x2="80" y2="264" stroke="#fb923c" strokeWidth="2" opacity="0.25">
          <animate attributeName="opacity" values="0.15;0.4;0.15" dur="2.7s" repeatCount="indefinite" />
        </line>
        <line x1="160" y1="160" x2="40" y2="120" stroke="#f59e0b" strokeWidth="2" opacity="0.25">
          <animate attributeName="opacity" values="0.15;0.4;0.15" dur="2.3s" repeatCount="indefinite" />
        </line>
      </svg>
      
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80px',
        height: '80px',
        background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #fbbf24 100%)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 32px rgba(245, 158, 11, 0.3)',
        zIndex: 2
      }}>
        <span style={{ color: 'white', fontSize: '40px' }}>🏠</span>
      </div>
      
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '200px',
        height: '200px',
        border: '1px solid #fde68a',
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
        border: '1px solid #fde68a',
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
          <span style={{ fontSize: '20px' }}>🏡</span>
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
          animation: 'orbit2 20s linear infinite'
        }}>
          <span style={{ fontSize: '20px' }}>🛒</span>
        </div>
        
        <div style={{
          position: 'absolute',
          width: '48px',
          height: '48px',
          backgroundColor: '#fef3c7',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          left: '-24px',
          top: '-24px',
          animation: 'orbit3 20s linear infinite'
        }}>
          <span style={{ fontSize: '20px' }}>👨‍👩‍👧‍👦</span>
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
          animation: 'orbit4 20s linear infinite'
        }}>
          <span style={{ fontSize: '20px' }}>🔒</span>
        </div>
      </div>

      <style>{`
        @keyframes orbit1 {
          from { transform: rotate(0deg) translateX(100px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
        }
        @keyframes orbit2 {
          from { transform: rotate(90deg) translateX(100px) rotate(-90deg); }
          to { transform: rotate(450deg) translateX(100px) rotate(-450deg); }
        }
        @keyframes orbit3 {
          from { transform: rotate(180deg) translateX(100px) rotate(-180deg); }
          to { transform: rotate(540deg) translateX(100px) rotate(-540deg); }
        }
        @keyframes orbit4 {
          from { transform: rotate(270deg) translateX(100px) rotate(-270deg); }
          to { transform: rotate(630deg) translateX(100px) rotate(-630deg); }
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
          background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #fbbf24 100%)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 20px 60px rgba(217, 119, 6, 0.4)',
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
            color: 'white',
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
                color: 'white',
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
            }}>Your Essentials.</span>{' '}
            <span style={{
              background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #fbbf24 100%)',
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
            From property and asset management to daily household operations—everything you need to manage your life intelligently, all in one place.
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
            <LifeEssentialsVisual />
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
                }}>Your Essentials, intelligently managed</p>
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

export default LifeEssentialsCapabilities;