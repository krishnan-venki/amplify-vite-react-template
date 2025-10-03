import styles from './SagaaHomepage.module.css';
import { useRef, useEffect, useState } from 'react';

export const OneEcosystem = () => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const fadeInElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  
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

  const handleFeatureClick = (featureId: string) => {
    if (selectedFeature === featureId) {
      setSelectedFeature(null); // Return to ecosystem view
    } else {
      setSelectedFeature(featureId);
    }
  };

  const domainIcons: Record<string, { emoji: string; label: string; color: string }> = {
    finance: { emoji: '💰', label: 'Finance', color: '#dbeafe' },
    health: { emoji: '❤️', label: 'Health', color: '#fce7f3' },
    home: { emoji: '🏠', label: 'Home', color: '#fef3c7' },
    education: { emoji: '🎓', label: 'Education', color: '#f3e8ff' },
    community: { emoji: '👥', label: 'Community', color: '#d1fae5' }
  };

  const features: Record<string, {
    id: string;
    icon: string;
    iconBg: string;
    title: string;
    shortDesc: string;
    detailHeadline: string;
    detailText: string;
    example: string;
    relatedDomains: string[];
    showExample?: boolean;
    showDomains?: boolean;
  }> = {
    onePlatform: {
      id: 'onePlatform',
      icon: '🎯',
      iconBg: '#dbeafe',
      title: 'One Platform',
      shortDesc: 'Health, finance, education, and life essentials all in one intelligent ecosystem',
      detailHeadline: 'Everything in One Place',
      detailText: 'Stop app-switching. Sagaa offers specialized verticals — Sagaa Financials, Sagaa Healthcare, Sagaa Education, and Sagaa Life Essentials — unified in one intelligent platform that connects every aspect of your life.',
      example: '"Morning briefing: Doctor appointment at 2pm, budget has room for that book you wanted, and the plumber confirmed for Thursday."',
      relatedDomains: ['finance', 'health', 'home', 'education'],
      showExample: false,
      showDomains: false
    },
    connectedIntelligence: {
      id: 'connectedIntelligence',
      icon: '🔗',
      iconBg: '#dcfce7',
      title: 'Connected Intelligence',
      shortDesc: 'Surfaces meaningful connections between your health, finances, education, life essentials, daily decisions and goals — helping you make smarter decisions with a fuller picture.',
      detailHeadline: 'Decisions That See the Full Picture',
      detailText: 'Your fitness goals inform your budget. Your health appointments sync with your calendar. Your home maintenance alerts your finances. Everything connects because your life isn\'t separate compartments.',
      example: '"Doctor recommends physical therapy → Budget adjusted automatically → In-network providers matched → Calendar slots suggested"',
      relatedDomains: ['finance', 'health', 'education'],
      showExample: true,
      showDomains: true
    },
    proactivePartner: {
      id: 'proactivePartner',
      icon: '🚀',
      iconBg: '#dbeafe',
      title: 'Proactive Partner',
      shortDesc: 'Stays ahead of your needs, offering smart suggestions before you ask',
      detailHeadline: 'Always One Step Ahead',
      detailText: 'Anticipates your needs before they become urgent. Insurance renewals, health checkups, bill optimizations—handled before you even think about them. Sagaa learns your patterns and acts proactively.',
      example: '"Your car insurance renews in 30 days. Based on your improved driving record, I found 3 better options that could save you $200/year. Want to review?"',
      relatedDomains: ['finance', 'home'],
      showExample: true,
      showDomains: true
    },
    communityMarketplace: {
      id: 'communityMarketplace',
      icon: '🤝',
      iconBg: '#dbeafe',
      title: 'Community Marketplace',
      shortDesc: 'Connects you with trusted service providers tailored to your needs and preferences.',
      detailHeadline: 'Verified Help When You Need It',
      detailText: 'Connect with verified community members for services you need—from home repairs to financial advice—all pre-vetted and context-aware to your specific situation. Mutual accountability creates unprecedented trust.',
      example: '"Your water heater is 12 years old. Based on your home profile, here are 3 community plumbers with 5-star ratings who specialize in your model."',
      relatedDomains: ['home', 'community', 'finance'],
      showExample: true,
      showDomains: true
    },
    alwaysLearning: {
      id: 'alwaysLearning',
      icon: '🌱',
      iconBg: '#faf5ff',
      title: 'Always Learning',
      shortDesc: 'Learns from every interaction and grows into a trusted partner guiding your interconnected life goals.',
      detailHeadline: 'Grows With You Over Time',
      detailText: 'Evolves from basic assistant to trusted autonomous partner. Week 1: Learns your patterns. Month 6: Predicts your needs. Year 1: Manages routine decisions independently with your approval.',
      example: '"I\'ve learned you prefer cashback rewards and tend to overspend after stressful weeks. Your presentation is Friday—should I set a gentle spending reminder for the weekend?"',
      relatedDomains: ['finance', 'health', 'education'],
      showExample: false,
      showDomains: false
    },
    personalizedIntelligence: {
      id: 'personalizedIntelligence',
      icon: '🧠',
      iconBg: '#faf5ff',
      title: 'Personalized Intelligence',
      shortDesc: 'Adapts to your life—offering guidance that\'s relevant, contextual, and uniquely for you.',
      detailHeadline: 'Deeply Personal, Never Generic',
      detailText: 'Not generic advice—deeply personal guidance based on your unique life context, spending psychology, health history, and family dynamics. Every recommendation is tailored specifically to you.',
      example: '"Based on your health goals, family schedule, and budget constraints, here\'s a personalized meal plan that saves $80/month and supports your fitness targets."',
      relatedDomains: ['finance', 'health', 'home'],
      showExample: true,
      showDomains: true
    },
    communityWisdom: {
      id: 'communityWisdom',
      icon: '🧑‍🤝‍🧑',
      iconBg: '#dbeafe',
      title: 'Community Wisdom',
      shortDesc: 'Shares real insights from the community to help you make informed decisions.',
      detailHeadline: 'Learn From Real Experiences',
      detailText: 'Learn from millions who\'ve faced similar challenges. 87% success rate when users follow community-validated strategies. Real experiences, real outcomes—not theoretical advice.',
      example: '"Users in Seattle with your income who paid off similar debt succeeded with these 3 strategies. The meal-planning approach has an 87% success rate."',
      relatedDomains: ['community', 'finance', 'health'],
      showExample: true,
      showDomains: true
    },
    omnichannelPresence: {
      id: 'omnichannelPresence',
      icon: '💫',
      iconBg: '#dbeafe',
      title: 'Omnichannel Presence',
      shortDesc: 'Connects with you through mobile, web, and home assistant devices.',
      detailHeadline: 'Always There, Everywhere',
      detailText: 'Morning briefing through Alexa. Commute notifications in your car. Deep planning on desktop. Evening updates on mobile. Sagaa follows your life, not the other way around.',
      example: '"Hey Alexa, ask Sagaa about my day" → Car dashboard alerts you to bill payment → Lunch break deep-dive on web → Evening grocery reminder on phone"',
      relatedDomains: ['finance', 'health', 'home', 'education'],
      showExample: true,
      showDomains: true
    }
  };

  const leftFeatures = [
    features.onePlatform,
    features.connectedIntelligence,
    features.proactivePartner,
    features.communityMarketplace
  ];

  const rightFeatures = [
    features.alwaysLearning,
    features.personalizedIntelligence,
    features.communityWisdom,
    features.omnichannelPresence
  ];

  const FeatureCard = ({ feature, isSelected }: { feature: any; isSelected: boolean }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <div 
        onClick={() => handleFeatureClick(feature.id)}
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
          backgroundColor: isSelected || isHovered ? '#f0f9ff' : 'transparent',
          border: isSelected ? '2px solid #3b82f6' : isHovered ? '2px solid #bfdbfe' : '2px solid transparent',
          opacity: selectedFeature && !isSelected ? 0.4 : 1
        }}
      >
        <div style={{
          width: '48px',
          height: '48px',
          backgroundColor: feature.iconBg,
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transform: isSelected || isHovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'transform 0.3s ease'
        }}>
          <span style={{ fontSize: '32px' }}>{feature.icon}</span>
        </div>
        <div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '500',
            color: '#1d1d1f',
            marginBottom: '8px'
          }}>{feature.title}</h3>
          <p style={{ 
            color: '#6e6e73',
            fontSize: '15px',
            lineHeight: '1.5',
            margin: 0
          }}>{feature.shortDesc}</p>
        </div>
      </div>
    );
  };

  const EcosystemVisual = () => (
    <div style={{
      position: 'relative',
      width: '320px',
      height: '320px',
      opacity: selectedFeature ? 0 : 1,
      transform: selectedFeature ? 'scale(0.8)' : 'scale(1)',
      transition: 'all 0.6s ease',
      pointerEvents: selectedFeature ? 'none' : 'auto'
    }}>
      <svg width="320" height="320" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 0 }}>
        <line x1="160" y1="160" x2="224" y2="64" stroke="#60a5fa" strokeWidth="2" opacity="0.25">
          <animate attributeName="opacity" values="0.15;0.4;0.15" dur="2.5s" repeatCount="indefinite" />
        </line>
        <line x1="160" y1="160" x2="256" y2="224" stroke="#f472b6" strokeWidth="2" opacity="0.25">
          <animate attributeName="opacity" values="0.15;0.4;0.15" dur="2.2s" repeatCount="indefinite" />
        </line>
        <line x1="160" y1="160" x2="64" y2="256" stroke="#fbbf24" strokeWidth="2" opacity="0.25">
          <animate attributeName="opacity" values="0.15;0.4;0.15" dur="2.7s" repeatCount="indefinite" />
        </line>
        <line x1="160" y1="160" x2="32" y2="96" stroke="#a78bfa" strokeWidth="2" opacity="0.25">
          <animate attributeName="opacity" values="0.15;0.4;0.15" dur="2.3s" repeatCount="indefinite" />
        </line>
        <line x1="160" y1="160" x2="128" y2="16" stroke="#34d399" strokeWidth="2" opacity="0.25">
          <animate attributeName="opacity" values="0.15;0.4;0.15" dur="2.6s" repeatCount="indefinite" />
        </line>
      </svg>
      
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80px',
        height: '80px',
        background: 'linear-gradient(135deg, #007AFF 0%, #00D2FF 100%)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 32px rgba(0, 122, 255, 0.3)',
        zIndex: 2
      }}>
        <span style={{ color: 'white', fontSize: '32px' }}>👤</span>
      </div>
      
      <div className="ecosystemRing" style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '200px',
        height: '200px',
        border: '1px solid #e5e7eb',
        borderRadius: '50%',
        opacity: 0.3
      }} />
      <div className="ecosystemRing" style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '240px',
        height: '240px',
        border: '1px solid #e5e7eb',
        borderRadius: '50%',
        opacity: 0.2
      }} />
      
      {/* Orbiting nodes container */}
      <div style={{
        position: 'absolute',
        top: '160px',
        left: '160px',
        width: '0',
        height: '0'
      }}>
        {/* Node 1 - Finance */}
        <div className={`${styles.ecosystemNode} ${styles.node1}`} style={{
          position: 'absolute',
          width: '48px',
          height: '48px',
          backgroundColor: '#dbeafe',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          marginLeft: '-24px',
          marginTop: '-24px'
        }}>
          <span style={{ fontSize: '20px' }}>💰</span>
        </div>
        
        {/* Node 2 - Health */}
        <div className={`${styles.ecosystemNode} ${styles.node2}`} style={{
          position: 'absolute',
          width: '48px',
          height: '48px',
          backgroundColor: '#fce7f3',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          marginLeft: '-24px',
          marginTop: '-24px'
        }}>
          <span style={{ fontSize: '20px' }}>❤️</span>
        </div>
        
        {/* Node 3 - Home */}
        <div className={`${styles.ecosystemNode} ${styles.node3}`} style={{
          position: 'absolute',
          width: '48px',
          height: '48px',
          backgroundColor: '#fef3c7',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          marginLeft: '-24px',
          marginTop: '-24px'
        }}>
          <span style={{ fontSize: '20px' }}>🏠</span>
        </div>
        
        {/* Node 4 - Education */}
        <div className={`${styles.ecosystemNode} ${styles.node4}`} style={{
          position: 'absolute',
          width: '48px',
          height: '48px',
          backgroundColor: '#f3e8ff',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          marginLeft: '-24px',
          marginTop: '-24px'
        }}>
          <span style={{ fontSize: '20px' }}>🎓</span>
        </div>
        
        {/* Node 5 - Community */}
        <div className={`${styles.ecosystemNode} ${styles.node5}`} style={{
          position: 'absolute',
          width: '48px',
          height: '48px',
          backgroundColor: '#d1fae5',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          marginLeft: '-24px',
          marginTop: '-24px'
        }}>
          <span style={{ fontSize: '20px' }}>👥</span>
        </div>
      </div>
    </div>
  );

  const FeatureDetail = () => {
    if (!selectedFeature) return null;
    const feature = features[selectedFeature];
    
    if (!feature) return null;

    return (
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        maxWidth: '480px',
        opacity: selectedFeature ? 1 : 0,
        transition: 'all 0.6s ease',
        pointerEvents: selectedFeature ? 'auto' : 'none'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 20px 60px rgba(12, 74, 110, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'relative'
        }}>
          {/* Close button */}
          <button
            onClick={() => setSelectedFeature(null)}
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

          {/* Header with icon */}
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
              <span style={{ fontSize: '36px' }}>{feature.icon}</span>
            </div>
            <div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#ffffff',
                margin: 0
              }}>{feature.detailHeadline}</h3>
            </div>
          </div>

          {/* Detail text */}
          <p style={{
            fontSize: '16px',
            lineHeight: '1.6',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '20px'
          }}>
            {feature.detailText}
          </p>

          {/* Example - only show if showExample is true */}
          {feature.showExample && feature.example && (
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '16px',
              borderLeft: '3px solid rgba(255, 255, 255, 0.4)',
              marginBottom: feature.showDomains ? '24px' : '0'
            }}>
              <p style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.85)',
                fontStyle: 'italic',
                margin: 0
              }}>
                {feature.example}
              </p>
            </div>
          )}

          {/* Related domains - only show if showDomains is true */}
          {feature.showDomains && (
            <div>
              <p style={{
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.6)',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: '600'
              }}>Connected Domains</p>
              <div style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap'
              }}>
                {feature.relatedDomains.map(domainKey => {
                  const domain = domainIcons[domainKey];
                  return (
                    <div
                      key={domainKey}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      <span style={{ fontSize: '16px' }}>{domain.emoji}</span>
                      <span style={{ color: '#ffffff', fontWeight: '500' }}>{domain.label}</span>
                    </div>
                  );
                })}
              </div>
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
            }}>One Life.</span>{' '}
            <span style={{
              background: 'linear-gradient(135deg, #007AFF 0%, #00D2FF 50%, #34C759 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}>One Ecosystem.</span>
          </h2>
          <p style={{
            fontSize: '22px',
            color: '#6b7280',
            maxWidth: '1024px',
            margin: '0 auto',
            lineHeight: '1.7',
            fontWeight: '300'
          }}>
            Life is finite. Your time should go to what matters—family, creativity, passions, dreams. Let Sagaa handle the complexity of managing everything else.
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
          {/* Left side features */}
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
            {leftFeatures.map(feature => (
              <FeatureCard 
                key={feature.id} 
                feature={feature} 
                isSelected={selectedFeature === feature.id}
              />
            ))}
          </div>

          {/* Center: Ecosystem or Detail */}
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
            <EcosystemVisual />
            <FeatureDetail />
            
            {!selectedFeature && (
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
                }}>Your life goals, intelligently connected</p>
                <p style={{ 
                  color: '#9ca3af', 
                  fontSize: '13px',
                  fontStyle: 'italic'
                }}>Click any feature to explore</p>
              </div>
            )}
          </div>

          {/* Right side features */}
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
            {rightFeatures.map(feature => (
              <FeatureCard 
                key={feature.id} 
                feature={feature} 
                isSelected={selectedFeature === feature.id}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OneEcosystem;