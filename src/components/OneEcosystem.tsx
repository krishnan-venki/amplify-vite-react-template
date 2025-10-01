import styles from './SagaaHomepage.module.css';
import { useRef, useEffect } from 'react';

export const OneEcosystem = () => {
    const fadeInElementsRef = useRef<HTMLDivElement[]>([]);
    const addToRefs = (el: HTMLDivElement | null) => {
      if (el && !fadeInElementsRef.current.includes(el)) {
        fadeInElementsRef.current.push(el);
      }
    };

    useEffect(() => {
      fadeInElementsRef.current.forEach((el) => {
        if (el) {
          el.classList.add(styles.visible);
        }
      });
    }, []);
  return (
  <section id="ecosystem" style={{
        padding: '60px 0',
        backgroundColor: 'white'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <div ref={addToRefs} className={styles.fadeInUp} style={{ textAlign: 'center', marginBottom: '80px' }}>
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
            {/* Left side points */}
            <div ref={addToRefs} className={styles.fadeInUp} style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: '48px', justifyContent: 'center' }}>
              {/* One Platform */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#dbeafe',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }} className={styles.growthAnimation}>
                  <span style={{ 
                    color: '#2563eb',
                    fontSize: '32px'
                  }}>🎯</span>
                </div>
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '500',
                    color: '#1d1d1f',
                    marginBottom: '8px'
                  }}>One Platform</h3>
                  <p style={{ color: '#6e6e73' }}>Management of Health, finance, education, and Life essentials all in one intelligent ecosystem</p>
                </div>
              </div>
              {/* Connected Intelligence */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#dcfce7',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  animationDelay: '1s'
                }} className={styles.growthAnimation}>
                  <span style={{ 
                    color: '#16a34a',
                    fontSize: '32px'
                  }}>🔗</span>
                </div>
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '500',
                    color: '#1d1d1f',
                    marginBottom: '8px'
                  }}>Connected Intelligence</h3>
                  <p style={{ color: '#6e6e73' }}>Surfaces meaningful connections between your health, finances, education, life essentials, daily decisions and goals — helping you make smarter decisions with a fuller picture.</p>
                </div>
              </div>
              {/* Proactive Partner */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#dbeafe',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }} className={styles.growthAnimation}>
                  <span style={{ 
                    color: '#2563eb',
                    fontSize: '32px'
                  }}>🚀</span>
                </div>
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '500',
                    color: '#1d1d1f',
                    marginBottom: '8px'
                  }}>Proactive Partner</h3>
                  <p style={{ color: '#6e6e73' }}>Stays ahead of your needs, offering smart suggestions before you ask</p>
                </div>
              </div>
              {/* Community Marketplace */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#dbeafe',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }} className={styles.growthAnimation}>
                  <span style={{ 
                    color: '#2563eb',
                    fontSize: '32px'
                  }}>🤝</span>
                </div>
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '500',
                    color: '#1d1d1f',
                    marginBottom: '8px'
                  }}>Community Marketplace</h3>
                  <p style={{ color: '#6e6e73' }}>Connects you with trusted service providers tailored to your needs and preferences.</p>
                </div>
              </div>
            </div>

            {/* Center: Orbiting elements */}
            <div ref={addToRefs} className={styles.fadeInUp} style={{ flex: '0 1 400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '340px' }}>
              <div className={styles.ecosystemVisual}>
                {/* SVG lines connecting center to nodes */}
                <svg width="320" height="320" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 0 }}>
                  {/* Center at (160,160) */}
                  {/* 💰 node: approx (224,64) */}
                  <line x1="160" y1="160" x2="224" y2="64" stroke="#60a5fa" strokeWidth="2" opacity="0.25">
                    <animate attributeName="opacity" values="0.15;0.4;0.15" dur="2.5s" repeatCount="indefinite" />
                  </line>
                  {/* ❤️ node: approx (256,224) */}
                  <line x1="160" y1="160" x2="256" y2="224" stroke="#f472b6" strokeWidth="2" opacity="0.25">
                    <animate attributeName="opacity" values="0.15;0.4;0.15" dur="2.2s" repeatCount="indefinite" />
                  </line>
                  {/* 🏠 node: approx (64,256) */}
                  <line x1="160" y1="160" x2="64" y2="256" stroke="#fbbf24" strokeWidth="2" opacity="0.25">
                    <animate attributeName="opacity" values="0.15;0.4;0.15" dur="2.7s" repeatCount="indefinite" />
                  </line>
                  {/* 🎓 node: approx (32,96) */}
                  <line x1="160" y1="160" x2="32" y2="96" stroke="#a78bfa" strokeWidth="2" opacity="0.25">
                    <animate attributeName="opacity" values="0.15;0.4;0.15" dur="2.3s" repeatCount="indefinite" />
                  </line>
                  {/* 👥 node: approx (128,16) */}
                  <line x1="160" y1="160" x2="128" y2="16" stroke="#34d399" strokeWidth="2" opacity="0.25">
                    <animate attributeName="opacity" values="0.15;0.4;0.15" dur="2.6s" repeatCount="indefinite" />
                  </line>
                </svg>
                {/* Center - You */}
                <div className={styles.ecosystemCenter}>
                  <span style={{
                    color: 'white',
                    fontSize: '24px',
                    fontWeight: 'bold'
                  }}>👤</span>
                </div>
                {/* Orbiting elements */}
                <div className={`${styles.ecosystemRing}`} style={{width: '200px', height: '200px'}}></div>
                <div className={`${styles.ecosystemRing}`} style={{width: '240px', height: '240px'}}></div>
                {/* Life domains */}
                <div className={`${styles.ecosystemNode} ${styles.node1}`} style={{top: '20%', left: '70%'}}>
                  <span style={{ fontSize: '16px' }}>💰</span>
                </div>
                <div className={`${styles.ecosystemNode} ${styles.node2}`} style={{top: '70%', left: '80%'}}>
                  <span style={{ fontSize: '16px' }}>❤️</span>
                </div>
                <div className={`${styles.ecosystemNode} ${styles.node3}`} style={{top: '80%', left: '20%'}}>
                  <span style={{ fontSize: '16px' }}>🏠</span>
                </div>
                <div className={`${styles.ecosystemNode} ${styles.node4}`} style={{top: '30%', left: '10%'}}>
                  <span style={{ fontSize: '16px' }}>🎓</span>
                </div>
                <div className={`${styles.ecosystemNode} ${styles.node5}`} style={{top: '5%', left: '40%'}}>
                  <span style={{ fontSize: '16px' }}>👥</span>
                </div>
              </div>
              <div style={{ textAlign: 'center', marginTop: '32px' }}>
                <p style={{ color: '#6e6e73', fontSize: '14px' }}>Your life goals, intelligently connected</p>
              </div>
            </div>

            {/* Right side points */}
            <div ref={addToRefs} className={styles.fadeInUp} style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: '48px', justifyContent: 'center' }}>
              {/* Always learning */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#faf5ff',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  animationDelay: '2s'
                }} className={styles.growthAnimation}>
                  <span style={{ 
                    color: '#9333ea',
                    fontSize: '32px'
                  }}>🌱</span>
                </div>
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '500',
                    color: '#1d1d1f',
                    marginBottom: '8px'
                  }}>Always learning</h3>
                  <p style={{ color: '#6e6e73' }}>Learns from every interaction and grows into a trusted partner guiding your interconnected life goals.</p>
                </div>
              </div>
              {/* Personalized Intelligence */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#faf5ff',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  animationDelay: '2s'
                }} className={styles.growthAnimation}>
                  <span style={{ 
                    color: '#9333ea',
                    fontSize: '32px'
                  }}>🧠</span>
                </div>
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '500',
                    color: '#1d1d1f',
                    marginBottom: '8px'
                  }}>Personalized Intelligence</h3>
                  <p style={{ color: '#6e6e73' }}>Adapts to your life—offering guidance that's relevant, contextual, and uniquely yours.</p>
                </div>
              </div>
              
              {/* Community Wisdom */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#dbeafe',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }} className={styles.growthAnimation}>
                  <span style={{ 
                    color: '#2563eb',
                    fontSize: '32px'
                  }}>🧑‍🤝‍🧑</span>
                </div>
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '500',
                    color: '#1d1d1f',
                    marginBottom: '8px'
                  }}>Community Wisdom</h3>
                  <p style={{ color: '#6e6e73' }}>Shares real insights from the community to help you make informed decisions.</p>
                </div>
              </div>

              {/* Omnichannel presence */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#dbeafe',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }} className={styles.growthAnimation}>
                  <span style={{ 
                    color: '#2563eb',
                    fontSize: '32px'
                  }}>💫</span>
                </div>
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '500',
                    color: '#1d1d1f',
                    marginBottom: '8px'
                  }}>Omnichannel presence</h3>
                  <p style={{ color: '#6e6e73' }}>Connects with you through mobile, web, and home assistant devices.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    )
};

export default OneEcosystem;