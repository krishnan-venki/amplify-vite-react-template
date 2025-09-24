import React, { useEffect, useRef, useState } from 'react';
import styles from './SagaaHomepage.module.css';
import { useNavigate } from 'react-router-dom';
import sagaaLogo from '../assets/sagaa_48x48.png';
import morningInteraction from '../assets/Morning_Interaction.jpg';
import driveInteraction from '../assets/Drive_Interaction.jpg';
import diinerInteraction from '../assets/Diiner_Interaction.jpg';
import eveningInteraction from '../assets/Evening_Interactions.jpg';

const SagaaHomepage: React.FC = () => {
  const fadeInElementsRef = useRef<HTMLDivElement[]>([]);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Fade in animation on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
        }
      });
    }, observerOptions);

    // Observe all fade-in elements
    fadeInElementsRef.current.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !fadeInElementsRef.current.includes(el)) {
      fadeInElementsRef.current.push(el);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className={styles.sagaaHomepage} style={{
      width: '100vw',
      minHeight: '100vh',
      backgroundColor: 'white',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 9999
    }}>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 50,
        paddingTop: isScrolled ? '16px' : '24px',
        paddingBottom: isScrolled ? '16px' : '24px',
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(8px)',
        borderBottom: isScrolled ? '1px solid rgba(0, 0, 0, 0.1)' : 'none',
        boxShadow: isScrolled ? '0 2px 20px rgba(0, 0, 0, 0.1)' : 'none',
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          maxWidth: '1152px',
          margin: '0 auto',
          paddingLeft: '24px',
          paddingRight: '24px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img 
                src={sagaaLogo} 
                alt="Sagaa Stylist Logo" 
                style={{
                  width: '32px',
                  height: '32px'
                }}
              />
              <div style={{
                fontSize: '28px',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #000000 0%, #333333 50%, #007AFF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.5px',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>Sagaa</div>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px'
            }}>
              <button onClick={() => scrollToSection('ambient')} style={{
                color: 'black',
                fontSize: '14px',
                fontWeight: '500',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.3s ease'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.color = '#6b7280';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.color = 'black';
              }}>Ambient</button>
              <button onClick={() => scrollToSection('ecosystem')} style={{
                color: 'black',
                fontSize: '14px',
                fontWeight: '500',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.3s ease'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.color = '#6b7280';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.color = 'black';
              }}>Ecosystem</button>
              <button onClick={() => scrollToSection('growth')} style={{
                color: 'black',
                fontSize: '14px',
                fontWeight: '500',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.3s ease'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.color = '#6b7280';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.color = 'black';
              }}>Growth</button>
              <button onClick={() => scrollToSection('community')} style={{
                color: 'black',
                fontSize: '14px',
                fontWeight: '500',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.3s ease'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.color = '#6b7280';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.color = 'black';
              }}>Community</button>
              <button onClick={() => scrollToSection('connected')} style={{
                color: 'black',
                fontSize: '14px',
                fontWeight: '500',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.3s ease'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.color = '#6b7280';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.color = 'black';
              }}>Connected</button>
              <button onClick={() => navigate('/login')} style={{
                backgroundColor: 'black',
                color: 'white',
                padding: '8px 24px',
                borderRadius: '50px',
                fontSize: '14px',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#374151';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'black';
              }}>Join Ecosystem</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)',
        color: 'white',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '120px',
        paddingBottom: '80px'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          textAlign: 'center',
          zIndex: 10
        }}>
          <div style={{ 
            marginBottom: '32px',
            position: 'relative',
            overflow: 'visible'
          }}>
            <h1 style={{
              fontSize: 'clamp(48px, 5vw, 72px)',
              fontWeight: '100',
              lineHeight: '1.4',
              margin: 0,
              paddingTop: '0.5em'
            }}>
              Your Personal{' '}
              <span style={{ 
                position: 'relative', 
                display: 'inline-block',
                verticalAlign: 'baseline'
              }}>
                AI{' '}
                <span style={{
                  position: 'relative',
                  display: 'inline-block'
                }}>
                  {/* "Ecosystem" text above */}
                  <span style={{
                    position: 'absolute',
                    top: '-0.8em',
                    left: '0',
                    background: 'linear-gradient(135deg, #007AFF 0%, #00D2FF 50%, #34C759 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontWeight: '500',
                    fontSize: '1em',
                    whiteSpace: 'nowrap',
                    zIndex: 2
                  }}>Ecosystem</span>
                  
                  {/* "Assistant" with strikethrough below */}
                  <span style={{
                    position: 'relative',
                    color: 'white',
                    fontWeight: '400',
                    fontSize: '0.7em',
                    opacity: 0.6
                  }}>
                    Assistant
                    {/* Red strikethrough line */}
                    <span style={{
                      position: 'absolute',
                      top: '50%',
                      left: '-5%',
                      right: '-5%',
                      height: '3px',
                      backgroundColor: '#ff3b30',
                      transform: 'translateY(-50%) rotate(-2deg)',
                      zIndex: 3
                    }}></span>
                  </span>
                </span>
              </span>
            </h1>
          </div>
          <p style={{
            fontSize: 'clamp(18px, 3vw, 32px)',
            fontWeight: '300',
            marginBottom: '48px',
            color: '#d1d5db',
            maxWidth: '1024px',
            margin: '0 auto 48px auto',
            lineHeight: '1.6'
          }}>
            AI that grows with you, learns from collective human wisdom, and evolves from reactive assistant to proactive life partner - accessible everywhere you are.
          </p>
          <div style={{
            marginBottom: '64px'
          }}>
            <button onClick={() => navigate('/login')} style={{
              backgroundColor: 'white',
              color: 'black',
              padding: '16px 40px',
              borderRadius: '50px',
              fontSize: '18px',
              fontWeight: '500',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
            }}>
              Start Growing Your Ecosystem
            </button>
            <div style={{
              fontSize: '14px',
              color: '#9ca3af',
              marginTop: '16px'
            }}>
              Join 10,000+ people building smarter lives
            </div>
          </div>
          
          {/* Key differentiators */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '32px',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '48px', marginBottom: '8px' }}>🌱</div>
              <div style={{ fontSize: '14px', color: '#d1d5db' }}>Grows with You</div>
            </div>
            <div>
              <div style={{ fontSize: '48px', marginBottom: '8px' }}>🔗</div>
              <div style={{ fontSize: '14px', color: '#d1d5db' }}>Connects Everything</div>
            </div>
            <div>
              <div style={{ fontSize: '48px', marginBottom: '8px' }}>👥</div>
              <div style={{ fontSize: '14px', color: '#d1d5db' }}>Community Wisdom</div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.sectionDivider}></div>

      {/* Ecosystem Visualization Section */}
      <section id="ecosystem" style={{
        padding: '60px 0',
        backgroundColor: 'white'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: '80px',
            alignItems: 'center'
          }}>
            <div ref={addToRefs} className={styles.fadeInUp}>
              <h2 style={{
                fontSize: 'clamp(48px, 5vw, 60px)',
                fontWeight: '100',
                color: '#1d1d1f',
                marginBottom: '32px',
                lineHeight: '1.1'
              }}>
                <span style={{ 
                  color: '#1d1d1f',
                  backgroundColor: 'transparent'
                }}>One ecosystem.</span>{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #007AFF 0%, #00D2FF 50%, #34C759 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent'
                }}>Infinite connections.</span>
              </h2>
              <p style={{
                fontSize: '20px',
                color: '#6e6e73',
                marginBottom: '48px',
                lineHeight: '1.6'
              }}>
                The first AI powered intelligent ecosystem where your health, home, assets, family, and financial goals work in harmony, while our community provides proven wisdom for every challenge.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
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
                      fontSize: '20px'
                    }}>🌱</span>
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '500',
                      color: '#1d1d1f',
                      marginBottom: '8px'
                    }}>Learns Your Patterns</h3>
                    <p style={{ color: '#6e6e73' }}>Every interaction teaches Sagaa more about your goals, preferences, and success patterns.</p>
                  </div>
                </div>
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
                      fontSize: '20px'
                    }}>🔗</span>
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '500',
                      color: '#1d1d1f',
                      marginBottom: '8px'
                    }}>Connects the Dots</h3>
                    <p style={{ color: '#6e6e73' }}>Sees relationships between your health, wealth, goals, and daily decisions that you might miss.</p>
                  </div>
                </div>
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
                      fontSize: '20px'
                    }}>🧠</span>
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '500',
                      color: '#1d1d1f',
                      marginBottom: '8px'
                    }}>Evolves With You</h3>
                    <p style={{ color: '#6e6e73' }}>Evolves into a trusted partner in managing your interconnected life goals.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div ref={addToRefs} className={styles.fadeInUp}>
              <div className={styles.ecosystemVisual}>
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
          </div>
        </div>
      </section>

      <div className={styles.sectionDivider}></div>

      {/* Growth Journey Section */}
      <section id="growth" style={{
        padding: '60px 0',
        backgroundColor: '#f9fafb'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <div ref={addToRefs} className={styles.fadeInUp} style={{
            textAlign: 'center',
            marginBottom: '80px'
          }}>
            <h2 style={{
              fontSize: 'clamp(48px, 5vw, 60px)',
              fontWeight: '100',
              color: '#1d1d1f',
              marginBottom: '32px',
              lineHeight: '1.1'
            }}>
              From assistant to{' '}
              <span style={{
                background: 'linear-gradient(135deg, #007AFF 0%, #00D2FF 50%, #34C759 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>autonomous partner</span>
            </h2>
            <p style={{
              fontSize: '20px',
              color: '#6e6e73',
              maxWidth: '768px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Watch Sagaa evolve through three distinct phases, becoming more intelligent and autonomous as it learns your patterns and preferences.
            </p>
          </div>
          
          <div ref={addToRefs} className={styles.fadeInUp} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '80px'
          }}>
            {/* Week 1 */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '48px',
              alignItems: 'center'
            }}>
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '24px'
                }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: '#3b82f6',
                    borderRadius: '50%',
                    marginRight: '16px'
                  }}></div>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#6e6e73'
                  }}>WEEK 1: LEARNING</span>
                </div>
                <h3 style={{
                  fontSize: '48px',
                  fontWeight: '100',
                  color: '#1d1d1f',
                  marginBottom: '16px'
                }}>Smart Assistant</h3>
                <p style={{
                  color: '#6e6e73',
                  marginBottom: '32px'
                }}>Sagaa observes your patterns, understands your goals, and provides contextual responses based on your life data.</p>
                
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  padding: '32px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}>
                  <div style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    marginBottom: '12px'
                  }}>You ask:</div>
                  <div style={{
                    color: '#1d1d1f',
                    marginBottom: '16px'
                  }}>"Should I buy this $200 gaming headset?"</div>
                  <div style={{
                    fontSize: '14px',
                    color: '#3b82f6',
                    marginBottom: '8px'
                  }}>Sagaa responds:</div>
                  <div style={{ color: '#1d1d1f' }}>"Based on your electronics budget ($100/month, currently $150 spent) and emergency fund progress (60% complete), this would exceed your budget. Let me learn more about your priorities."</div>
                </div>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '256px',
                  height: '256px',
                  background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{
                    fontSize: '96px',
                    color: '#3b82f6',
                    opacity: 0.6
                  }}>🔍</span>
                </div>
              </div>
            </div>

            {/* Month 3 */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '48px',
              alignItems: 'center'
            }}>
              <div className="order-2 lg:order-1" style={{
                display: 'flex',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '256px',
                  height: '256px',
                  background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{
                    fontSize: '96px',
                    color: '#22c55e',
                    opacity: 0.6
                  }}>💡</span>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '24px'
                }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: '#22c55e',
                    borderRadius: '50%',
                    marginRight: '16px'
                  }}></div>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#6e6e73'
                  }}>MONTH 3: PREDICTING</span>
                </div>
                <h3 style={{
                  fontSize: '48px',
                  fontWeight: '100',
                  color: '#1d1d1f',
                  marginBottom: '16px'
                }}>Predictive Partner</h3>
                <p style={{
                  color: '#6e6e73',
                  marginBottom: '32px'
                }}>Now understanding your life context, Sagaa provides proactive insights connecting decisions across health, finance, career, and family domains.</p>
                
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  padding: '32px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}>
                  <div style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    marginBottom: '12px'
                  }}>You ask:</div>
                  <div style={{
                    color: '#1d1d1f',
                    marginBottom: '16px'
                  }}>"Should I buy this $200 gaming headset?"</div>
                  <div style={{
                    fontSize: '14px',
                    color: '#22c55e',
                    marginBottom: '8px'
                  }}>Sagaa responds:</div>
                  <div style={{ color: '#1d1d1f' }}>"I notice you have a presentation next week and mentioned wanting better audio for work calls. Your professional development budget has $250 available. Community data shows 73% of remote workers saw productivity gains with quality headsets. This aligns with your career advancement goals."</div>
                </div>
              </div>
            </div>

            {/* Month 8+ */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '48px',
              alignItems: 'center'
            }}>
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '24px'
                }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: '#a855f7',
                    borderRadius: '50%',
                    marginRight: '16px'
                  }}></div>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#6e6e73'
                  }}>MONTH 8+: MANAGING</span>
                </div>
                <h3 style={{
                  fontSize: '48px',
                  fontWeight: '100',
                  color: '#1d1d1f',
                  marginBottom: '16px'
                }}>Autonomous Partner</h3>
                <p style={{
                  color: '#6e6e73',
                  marginBottom: '32px'
                }}>Sagaa proactively manages routine decisions, anticipates needs, and optimizes your entire life strategy with minimal input required.</p>
                
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  padding: '32px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}>
                  <div style={{
                    fontSize: '14px',
                    color: '#a855f7',
                    marginBottom: '8px'
                  }}>Sagaa proactively suggests:</div>
                  <div style={{ color: '#1d1d1f' }}>"I've noticed your current headset is 3 years old and you have important client calls this month. I found three options within your tech budget, scheduled delivery for tomorrow (before your big presentation), and can optimize the purchase by using your credit card with 5% cashback on electronics. Approve this plan?"</div>
                </div>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '256px',
                  height: '256px',
                  background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{
                    fontSize: '96px',
                    color: '#a855f7',
                    opacity: 0.6
                  }}>✨</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.sectionDivider}></div>

      {/* Ambient Access Section */}
      <section id="ambient" style={{
        padding: '60px 0',
        background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Ambient background effects */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          background: 'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.03) 0%, transparent 50%)',
          pointerEvents: 'none'
        }}></div>
        
        {/* Floating connection dots */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          background: '#3b82f6',
          animation: 'float 6s ease-in-out infinite',
          opacity: 0.4
        }}></div>
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          width: '3px',
          height: '3px',
          borderRadius: '50%',
          background: '#10b981',
          animation: 'float 8s ease-in-out infinite reverse',
          opacity: 0.3
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '30%',
          left: '20%',
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          background: '#06b6d4',
          animation: 'float 7s ease-in-out infinite',
          opacity: 0.2
        }}></div>
        
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 1
        }}>
          <div ref={addToRefs} className={styles.fadeInUp} style={{
            textAlign: 'center',
            marginBottom: '80px'
          }}>
            <h2 style={{
              fontSize: 'clamp(48px, 5vw, 64px)',
              fontWeight: '100',
              color: '#1d1d1f',
              marginBottom: '32px',
              lineHeight: '1.1',
              textShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}>
              Always there,{' '}
              <span style={{
                background: 'linear-gradient(135deg, #007AFF 0%, #00D2FF 30%, #34C759 60%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                position: 'relative'
              }}>everywhere you are</span>
            </h2>
            <p style={{
              fontSize: '22px',
              color: '#6b7280',
              maxWidth: '1024px',
              margin: '0 auto',
              lineHeight: '1.7',
              fontWeight: '300'
            }}>
              Sagaa follows your life seamlessly across voice assistants, mobile, car, and desktop - providing contextual intelligence whenever and wherever you need it.
            </p>
            
            {/* Live connection indicator */}
            {/* Live connection indicator removed as requested */}
          </div>

          <div ref={addToRefs} className={styles.fadeInUp} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '80px'
          }}>
            {/* Morning at Home - Enhanced with device frame */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isDesktop ? '1fr 2fr' : '1fr',
              gap: '48px',
              alignItems: 'stretch',
              position: 'relative'
            }}>
              {/* Connection line */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: isDesktop ? '45%' : '50%',
                width: isDesktop ? '10%' : '0',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)',
                opacity: 0.3,
                zIndex: 0,
                animation: 'flow 3s ease-in-out infinite'
              }}></div>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative',
                zIndex: 1
              }}>
                {/* Smart speaker device frame */}
                <div style={{
                  position: 'relative',
                  backgroundColor: '#1a1a1a',
                  borderRadius: '24px',
                  padding: '20px',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '40px',
                    height: '4px',
                    backgroundColor: '#333',
                    borderRadius: '2px'
                  }}></div>
                  
                  <img 
                    src={morningInteraction} 
                    alt="Morning interaction scene" 
                    style={{
                      width: '100%',
                      height: '300px',
                      borderRadius: '16px',
                      objectFit: 'cover',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      filter: 'brightness(1.1) contrast(1.1) saturate(1.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05) rotateY(5deg)';
                      e.currentTarget.style.boxShadow = '0 16px 64px rgba(0, 0, 0, 0.25)';
                      e.currentTarget.style.filter = 'brightness(1.2) contrast(1.15) saturate(1.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1) rotateY(0deg)';
                      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
                      e.currentTarget.style.filter = 'brightness(1.1) contrast(1.1) saturate(1.1)';
                    }}
                  />
                  
                  {/* LED indicator */}
                  <div style={{
                    position: 'absolute',
                    bottom: '15px',
                    right: '15px',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: '#00d4aa',
                    boxShadow: '0 0 20px rgba(0, 212, 170, 0.5)',
                    animation: 'breathe 2s ease-in-out infinite'
                  }}></div>
                </div>
                
                {/* Voice command indicator */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  borderRadius: '25px',
                  border: '1px solid rgba(59, 130, 246, 0.2)'
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#3b82f6',
                    animation: 'pulse 1s ease-in-out infinite'
                  }}></div>
                  <p style={{
                    fontSize: '14px',
                    color: '#3b82f6',
                    margin: '0',
                    fontWeight: '500'
                  }}>"Hey Alexa, ask Sagaa about my day"</p>
                </div>
              </div>
              
              <div style={{
                position: 'relative',
                zIndex: 1
              }}>
                {/* Enhanced response card */}
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '20px',
                  padding: '32px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(0, 0, 0, 0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04)';
                }}
                >
                  {/* Accent line */}
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    height: '4px',
                    background: 'linear-gradient(90deg, #3b82f6, #06b6d4, #10b981)'
                  }}></div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }}>S</div>
                    <div style={{
                      fontSize: '14px',
                      color: '#2563eb',
                      fontWeight: '600'
                    }}>Sagaa responds:</div>
                  </div>
                  
                  <div style={{
                    color: '#1d1d1f',
                    lineHeight: '1.7',
                    fontSize: '16px',
                    fontWeight: '400'
                  }}>"Good morning! Your presentation fund goal hit 80% yesterday. You have a fitness consultation at 6 PM, and your grocery budget has $40 slack - perfect for tonight's dinner party ingredients. Your car insurance renewal notice arrived; I found 3 better options saving $200/year."</div>
                  
                  {/* Status indicators */}
                  <div style={{
                    display: 'flex',
                    gap: '16px',
                    marginTop: '20px',
                    flexWrap: 'wrap'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      backgroundColor: '#f0f9ff',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: '#0369a1'
                    }}>
                      <span>💰</span>
                      <span>Finance</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      backgroundColor: '#f0fdf4',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: '#166534'
                    }}>
                      <span>🏃</span>
                      <span>Health</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      backgroundColor: '#fef7f0',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: '#9a3412'
                    }}>
                      <span>🛡️</span>
                      <span>Insurance</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Commute in Car - Enhanced with automotive interface */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isDesktop ? '2fr 1fr' : '1fr',
              gap: '48px',
              alignItems: 'center',
              padding: '40px 0',
              position: 'relative'
            }}>
              {/* Connection line */}
              <div style={{
                position: 'absolute',
                top: '50%',
                right: isDesktop ? '45%' : '50%',
                width: isDesktop ? '10%' : '0',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #10b981, transparent)',
                opacity: 0.3,
                zIndex: 0,
                animation: 'flow 3s ease-in-out infinite 1s'
              }}></div>
              
              <div style={{
                position: 'relative',
                zIndex: 1
              }}>
                {/* Enhanced proactive insight card */}
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '20px',
                  padding: '32px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(0, 0, 0, 0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04)';
                }}
                >
                  {/* Accent line */}
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    height: '4px',
                    background: 'linear-gradient(90deg, #10b981, #06b6d4, #8b5cf6)'
                  }}></div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '16px'
                    }}>🚗</div>
                    <div>
                      <div style={{
                        fontSize: '14px',
                        color: '#16a34a',
                        fontWeight: '600'
                      }}>Proactive insight during commute:</div>
                      <div style={{
                        fontSize: '12px',
                        color: '#6b7280',
                        marginTop: '2px'
                      }}>Context-aware assistance</div>
                    </div>
                  </div>
                  
                  <div style={{
                    color: '#1d1d1f',
                    lineHeight: '1.7',
                    fontSize: '16px',
                    fontWeight: '400',
                    marginBottom: '20px'
                  }}>"I see traffic is heavy on your usual route. While we wait, I analyzed your insurance options from this morning. Progressive offers the best rate with identical coverage. Should I start the application process for review later?"</div>
                  
                  {/* Quick action buttons */}
                  <div style={{
                    display: 'flex',
                    gap: '12px',
                    flexWrap: 'wrap'
                  }}>
                    <button style={{
                      padding: '8px 16px',
                      backgroundColor: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#059669';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#10b981';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    >Yes, proceed</button>
                    <button style={{
                      padding: '8px 16px',
                      backgroundColor: '#f3f4f6',
                      color: '#374151',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e5e7eb';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                    }}
                    >Remind me later</button>
                  </div>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                position: 'relative',
                zIndex: 1
              }}>
                {/* Car dashboard mockup */}
                <div style={{
                  position: 'relative',
                  backgroundColor: '#1f2937',
                  borderRadius: '24px',
                  padding: '20px',
                  marginBottom: '20px'
                }}>
                  {/* Dashboard header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px',
                    padding: '0 8px'
                  }}>
                    <div style={{
                      fontSize: '12px',
                      color: '#9ca3af'
                    }}>CarPlay</div>
                    <div style={{
                      display: 'flex',
                      gap: '4px'
                    }}>
                      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#10b981' }}></div>
                      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#f59e0b' }}></div>
                      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#ef4444' }}></div>
                    </div>
                  </div>
                  
                  <div style={{
                    position: 'relative',
                    width: '400px',
                    height: '250px',
                    overflow: 'hidden',
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05) rotateX(10deg)';
                    e.currentTarget.style.boxShadow = '0 16px 64px rgba(0, 0, 0, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1) rotateX(0deg)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
                  }}
                  >
                    <img 
                      src={driveInteraction} 
                      alt="Drive Interaction" 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        filter: 'brightness(1.1) contrast(1.1)'
                      }}
                    />
                    
                    {/* Voice activity indicator */}
                    <div style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      borderRadius: '20px',
                      backdropFilter: 'blur(8px)'
                    }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#10b981',
                        animation: 'pulse 1.5s ease-in-out infinite'
                      }}></div>
                      <span style={{
                        fontSize: '12px',
                        color: 'white',
                        fontWeight: '500'
                      }}>Listening</span>
                    </div>
                  </div>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  borderRadius: '25px',
                  border: '1px solid rgba(16, 185, 129, 0.2)'
                }}>
                  <span style={{ fontSize: '16px' }}>🎙️</span>
                  <p style={{
                    fontSize: '14px',
                    color: '#059669',
                    margin: '0',
                    fontWeight: '500'
                  }}>Hands-free proactive insights</p>
                </div>
              </div>
            </div>

            {/* Work at Desktop - Enhanced with desktop interface */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isDesktop ? '1fr 2fr' : '1fr',
              gap: '48px',
              alignItems: 'center',
              padding: '40px 0',
              position: 'relative'
            }}>
              {/* Connection line */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: isDesktop ? '45%' : '50%',
                width: isDesktop ? '10%' : '0',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #8b5cf6, transparent)',
                opacity: 0.3,
                zIndex: 0,
                animation: 'flow 3s ease-in-out infinite 2s'
              }}></div>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                position: 'relative',
                zIndex: 1
              }}>
                {/* Desktop mockup */}
                <div style={{
                  position: 'relative',
                  backgroundColor: '#f8fafc',
                  borderRadius: '24px',
                  padding: '20px',
                  marginBottom: '20px',
                  border: '2px solid #e2e8f0'
                }}>
                  {/* Monitor bezel */}
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60px',
                    height: '6px',
                    backgroundColor: '#cbd5e1',
                    borderRadius: '3px'
                  }}></div>
                  
                  <div style={{
                    position: 'relative',
                    width: '400px',
                    height: '250px',
                    overflow: 'hidden',
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05) perspective(1000px) rotateY(-10deg)';
                    e.currentTarget.style.boxShadow = '0 16px 64px rgba(0, 0, 0, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1) perspective(1000px) rotateY(0deg)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15)';
                  }}
                  >
                    <img 
                      src={eveningInteraction} 
                      alt="Desktop Evening Interaction" 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        filter: 'brightness(1.1) contrast(1.1)'
                      }}
                    />
                    
                    {/* Notification badge */}
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      padding: '4px 8px',
                      backgroundColor: '#8b5cf6',
                      color: 'white',
                      borderRadius: '12px',
                      fontSize: '10px',
                      fontWeight: '600',
                      animation: 'bounce 2s ease-in-out infinite'
                    }}>New Insight</div>
                  </div>
                  
                  {/* Desktop stand */}
                  <div style={{
                    position: 'absolute',
                    bottom: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80px',
                    height: '20px',
                    backgroundColor: '#cbd5e1',
                    borderRadius: '0 0 12px 12px'
                  }}></div>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  backgroundColor: 'rgba(139, 92, 246, 0.1)',
                  borderRadius: '25px',
                  border: '1px solid rgba(139, 92, 246, 0.2)'
                }}>
                  <span style={{ fontSize: '16px' }}>💻</span>
                  <p style={{
                    fontSize: '14px',
                    color: '#7c3aed',
                    margin: '0',
                    fontWeight: '500'
                  }}>Deep planning during evening</p>
                </div>
              </div>
              
              <div style={{
                position: 'relative',
                zIndex: 1
              }}>
                {/* Enhanced homework help card */}
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '20px',
                  padding: '32px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(0, 0, 0, 0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04)';
                }}
                >
                  {/* Accent line */}
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    height: '4px',
                    background: 'linear-gradient(90deg, #8b5cf6, #ec4899, #f59e0b)'
                  }}></div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '16px'
                    }}>🎓</div>
                    <div>
                      <div style={{
                        fontSize: '14px',
                        color: '#9333ea',
                        fontWeight: '600'
                      }}>During homework help:</div>
                      <div style={{
                        fontSize: '12px',
                        color: '#6b7280',
                        marginTop: '2px'
                      }}>Educational pathway planning</div>
                    </div>
                  </div>
                  
                  <div style={{
                    color: '#1d1d1f',
                    lineHeight: '1.7',
                    fontSize: '16px',
                    fontWeight: '400',
                    marginBottom: '20px'
                  }}>"I see Emma is researching University of Michigan pre-med programs. Based on community insights from 847 successful pre-med students, I can create a comprehensive plan covering course selection, MCAT prep timeline, volunteer opportunities, and estimated costs. The average preparation starts sophomore year of high school. Should I generate Emma's personalized roadmap?"</div>
                  
                  {/* Statistics */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                    gap: '16px',
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      textAlign: 'center',
                      padding: '12px',
                      backgroundColor: '#faf5ff',
                      borderRadius: '12px'
                    }}>
                      <div style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        color: '#8b5cf6'
                      }}>847</div>
                      <div style={{
                        fontSize: '11px',
                        color: '#6b7280'
                      }}>Success stories</div>
                    </div>
                    <div style={{
                      textAlign: 'center',
                      padding: '12px',
                      backgroundColor: '#fdf2f8',
                      borderRadius: '12px'
                    }}>
                      <div style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        color: '#ec4899'
                      }}>94%</div>
                      <div style={{
                        fontSize: '11px',
                        color: '#6b7280'
                      }}>Acceptance rate</div>
                    </div>
                    <div style={{
                      textAlign: 'center',
                      padding: '12px',
                      backgroundColor: '#fffbeb',
                      borderRadius: '12px'
                    }}>
                      <div style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        color: '#f59e0b'
                      }}>$180k</div>
                      <div style={{
                        fontSize: '11px',
                        color: '#6b7280'
                      }}>Avg. cost saved</div>
                    </div>
                  </div>
                  
                  {/* Action button */}
                  <button style={{
                    width: '100%',
                    padding: '12px 24px',
                    backgroundColor: '#8b5cf6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#7c3aed';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#8b5cf6';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  >Generate Emma's Roadmap</button>
                </div>
              </div>
            </div>

            {/* Evening Mobile - Enhanced with mobile interface */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isDesktop ? '2fr 1fr' : '1fr',
              gap: '48px',
              alignItems: 'center',
              padding: '40px 0',
              position: 'relative'
            }}>
              {/* Connection line */}
              <div style={{
                position: 'absolute',
                top: '50%',
                right: isDesktop ? '45%' : '50%',
                width: isDesktop ? '10%' : '0',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #f59e0b, transparent)',
                opacity: 0.3,
                zIndex: 0,
                animation: 'flow 3s ease-in-out infinite 2.5s'
              }}></div>
              
              <div style={{
                position: 'relative',
                zIndex: 1
              }}>
                {/* Enhanced cooking assistance card */}
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '20px',
                  padding: '32px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(0, 0, 0, 0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04)';
                }}
                >
                  {/* Accent line */}
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    height: '4px',
                    background: 'linear-gradient(90deg, #f59e0b, #ef4444, #ec4899)'
                  }}></div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '16px'
                    }}>👨‍🍳</div>
                    <div>
                      <div style={{
                        fontSize: '14px',
                        color: '#ea580c',
                        fontWeight: '600'
                      }}>Voice message while cooking:</div>
                      <div style={{
                        fontSize: '12px',
                        color: '#6b7280',
                        marginTop: '2px'
                      }}>Hands-free meal optimization</div>
                    </div>
                  </div>
                  
                  <div style={{
                    color: '#1d1d1f',
                    lineHeight: '1.7',
                    fontSize: '16px',
                    fontWeight: '400',
                    marginBottom: '20px'
                  }}>"That pasta recipe fits perfectly with your meal prep goals. Based on your grocery spending patterns, this dinner will save $25 compared to ordering out. Should I add similar recipes to your weekly meal plan?"</div>
                  
                  {/* Savings breakdown */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                    gap: '12px',
                    marginBottom: '20px',
                    padding: '16px',
                    backgroundColor: '#fef7f0',
                    borderRadius: '12px'
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#ea580c'
                      }}>$25</div>
                      <div style={{
                        fontSize: '11px',
                        color: '#6b7280'
                      }}>Saved today</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#16a34a'
                      }}>$340</div>
                      <div style={{
                        fontSize: '11px',
                        color: '#6b7280'
                      }}>Monthly goal</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#3b82f6'
                      }}>4.2★</div>
                      <div style={{
                        fontSize: '11px',
                        color: '#6b7280'
                      }}>Recipe rating</div>
                    </div>
                  </div>
                  
                  {/* Quick actions */}
                  <div style={{
                    display: 'flex',
                    gap: '12px',
                    flexWrap: 'wrap'
                  }}>
                    <button style={{
                      flex: 1,
                      padding: '10px 16px',
                      backgroundColor: '#f59e0b',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#d97706';
                      e.currentTarget.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f59e0b';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    >Add to meal plan</button>
                    <button style={{
                      flex: 1,
                      padding: '10px 16px',
                      backgroundColor: '#f3f4f6',
                      color: '#374151',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e5e7eb';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                    }}
                    >Show similar recipes</button>
                  </div>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                position: 'relative',
                zIndex: 1
              }}>
                {/* Mobile phone mockup */}
                <div style={{
                  position: 'relative',
                  backgroundColor: '#1f2937',
                  borderRadius: '28px',
                  padding: '8px',
                  marginBottom: '20px',
                  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)'
                }}>
                  {/* Phone notch */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '120px',
                    height: '20px',
                    backgroundColor: '#1f2937',
                    borderRadius: '10px',
                    zIndex: 2
                  }}></div>
                  
                  <div style={{
                    position: 'relative',
                    width: '280px',
                    height: '500px',
                    overflow: 'hidden',
                    borderRadius: '24px',
                    background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05) rotateZ(-2deg)';
                    if (e.currentTarget.parentElement) {
                      e.currentTarget.parentElement.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1) rotateZ(0deg)';
                    if (e.currentTarget.parentElement) {
                      e.currentTarget.parentElement.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.2)';
                    }
                  }}
                  >
                    <img 
                      src={diinerInteraction} 
                      alt="Dinner Interaction" 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        filter: 'brightness(1.1) contrast(1.1)'
                      }}
                    />
                    
                    {/* Voice recording indicator */}
                      {/* Recording indicator removed as requested */}
                  </div>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  backgroundColor: 'rgba(245, 158, 11, 0.1)',
                  borderRadius: '25px',
                  border: '1px solid rgba(245, 158, 11, 0.2)'
                }}>
                  <span style={{ fontSize: '16px' }}>🎙️</span>
                  <p style={{
                    fontSize: '14px',
                    color: '#d97706',
                    margin: '0',
                    fontWeight: '500'
                  }}>Hands-free while multitasking</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.sectionDivider}></div>

      {/* Community Wisdom Section */}
      <section id="community" style={{
        padding: '80px 0',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated background dots */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '15%',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#3b82f6',
          animation: 'float 7s ease-in-out infinite',
          opacity: 0.15,
          zIndex: 0
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: '#34c759',
          animation: 'float 9s ease-in-out infinite reverse',
          opacity: 0.12,
          zIndex: 0
        }}></div>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 1
        }}>
          <div ref={addToRefs} className={styles.fadeInUp} style={{
            textAlign: 'center',
            marginBottom: '80px'
          }}>
            <h2 style={{
              fontSize: 'clamp(48px, 5vw, 64px)',
              fontWeight: '100',
              color: '#1d1d1f',
              marginBottom: '32px',
              lineHeight: '1.1',
              textShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}>
              One Community,{' '}
              <span style={{
                background: 'linear-gradient(135deg, #007AFF 0%, #00D2FF 30%, #34C759 60%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                position: 'relative'
              }}>Infinite Wisdom</span>
            </h2>
            <p style={{
              fontSize: '22px',
              color: '#374151',
              maxWidth: '900px',
              margin: '0 auto',
              lineHeight: '1.7',
              fontWeight: '300'
            }}>
              Sagaa connects you to the collective intelligence of millions. Every challenge you face, someone in the community has overcome. Get real, anonymized insights and proven strategies—no generic advice, just what works.
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '40px',
              marginTop: '48px',
              flexWrap: 'wrap'
            }}>
              <div style={{
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 4px 24px rgba(59,130,246,0.07)',
                padding: '32px 40px',
                minWidth: '220px',
                textAlign: 'center',
                transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)'
              }}>
                <div style={{ fontSize: '32px', color: '#3b82f6', marginBottom: '8px' }}>👥</div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#1d1d1f' }}>10M+</div>
                <div style={{ fontSize: '13px', color: '#6b7280' }}>Anonymous insights</div>
              </div>
              <div style={{
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 4px 24px rgba(34,197,94,0.07)',
                padding: '32px 40px',
                minWidth: '220px',
                textAlign: 'center',
                transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)'
              }}>
                <div style={{ fontSize: '32px', color: '#22c55e', marginBottom: '8px' }}>✅</div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#1d1d1f' }}>87%</div>
                <div style={{ fontSize: '13px', color: '#6b7280' }}>Success rate</div>
              </div>
              <div style={{
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 4px 24px rgba(245,158,11,0.07)',
                padding: '32px 40px',
                minWidth: '220px',
                textAlign: 'center',
                transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)'
              }}>
                <div style={{ fontSize: '32px', color: '#f59e0b', marginBottom: '8px' }}>💡</div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#1d1d1f' }}>$1,200</div>
                <div style={{ fontSize: '13px', color: '#6b7280' }}>Avg. annual optimization</div>
              </div>
            </div>
          </div>
          {/* Real user insight cards */}
        </div>
      </section>

      <div className={styles.sectionDivider}></div>

      {/* Connected Life Section */}
      <section id="connected" style={{
        padding: '60px 0',
        backgroundColor: '#f9fafb'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <div ref={addToRefs} className={styles.fadeInUp} style={{
            textAlign: 'center',
            marginBottom: '80px'
          }}>
            <h2 style={{
              fontSize: 'clamp(48px, 5vw, 60px)',
              fontWeight: '100',
              color: '#1d1d1f',
              marginBottom: '32px',
              lineHeight: '1.1'
            }}>
              Your life is{' '}
              <span style={{
                background: 'linear-gradient(135deg, #007AFF 0%, #00D2FF 50%, #34C759 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>interconnected</span>
            </h2>
            <p style={{
              fontSize: '20px',
              color: '#8e8e93',
              maxWidth: '1024px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Sagaa sees what other apps miss: how your health goals affect your budget, how your career growth shapes your education, how your family needs influence everything.
            </p>
          </div>

          <div ref={addToRefs} className={styles.fadeInUp} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '64px'
          }}>
            {/* Connection Example 1 */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '48px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '32px',
                alignItems: 'center',
                marginBottom: '32px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#fef2f2',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto'
                  }}>
                    <span style={{
                      color: '#ef4444',
                      fontSize: '32px'
                    }}>❤️</span>
                  </div>
                  <h3 style={{
                    fontWeight: '500',
                    color: '#1d1d1f',
                    marginBottom: '4px'
                  }}>Health Goal</h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#8e8e93'
                  }}>Fitness consultation scheduled</p>
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    width: '64px',
                    height: '2px',
                    backgroundColor: '#e5e7eb'
                  }}></div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto'
                  }}>
                    <span style={{
                      color: '#22c55e',
                      fontSize: '32px'
                    }}>💰</span>
                  </div>
                  <h3 style={{
                    fontWeight: '500',
                    color: '#1d1d1f',
                    marginBottom: '4px'
                  }}>Financial Strategy</h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#8e8e93'
                  }}>Gym budget optimization</p>
                </div>
              </div>
              
              <div style={{
                backgroundColor: '#eff6ff',
                borderRadius: '16px',
                padding: '24px'
              }}>
                <div style={{
                  fontSize: '14px',
                  color: '#2563eb',
                  marginBottom: '8px'
                }}>Sagaa connects:</div>
                <div style={{
                  color: '#1d1d1f',
                  lineHeight: '1.6'
                }}>"I see you have a fitness consultation Tuesday and you've been researching gyms. Your fitness budget allows $65/month. Community data shows 73% prefer 24/7 access for work schedule flexibility. Should I schedule tours for after your consultation when you'll have a clearer fitness plan?"</div>
              </div>
            </div>

            {/* Connection Example 2 */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '48px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '24px',
                alignItems: 'center',
                marginBottom: '32px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px auto'
                  }}>
                    <span style={{ 
                      color: '#8b5cf6',
                      fontSize: '24px'
                    }}>💼</span>
                  </div>
                  <p style={{
                    fontSize: '12px',
                    color: '#8e8e93'
                  }}>Career</p>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: '#fff7ed',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px auto'
                  }}>
                    <span style={{ 
                      color: '#f97316',
                      fontSize: '24px'
                    }}>🎓</span>
                  </div>
                  <p style={{
                    fontSize: '12px',
                    color: '#8e8e93'
                  }}>Education</p>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px auto'
                  }}>
                    <span style={{ 
                      color: '#22c55e',
                      fontSize: '24px'
                    }}>💰</span>
                  </div>
                  <p style={{
                    fontSize: '12px',
                    color: '#8e8e93'
                  }}>Finance</p>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: '#eff6ff',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px auto'
                  }}>
                    <span style={{ 
                      color: '#3b82f6',
                      fontSize: '24px'
                    }}>🏠</span>
                  </div>
                  <p style={{
                    fontSize: '12px',
                    color: '#8e8e93'
                  }}>Home</p>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: '#fef2f2',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px auto'
                  }}>
                    <span style={{ 
                      color: '#ef4444',
                      fontSize: '24px'
                    }}>👥</span>
                  </div>
                  <p style={{
                    fontSize: '12px',
                    color: '#8e8e93'
                  }}>Family</p>
                </div>
              </div>
              
              <div style={{
                backgroundColor: '#f0fdf4',
                borderRadius: '16px',
                padding: '24px'
              }}>
                <div style={{
                  fontSize: '14px',
                  color: '#16a34a',
                  marginBottom: '8px'
                }}>Ecosystem insight:</div>
                <div style={{
                  color: '#1d1d1f',
                  lineHeight: '1.6'
                }}>"Your promotion to Senior Engineer increases your education budget to $3,000/year. The AWS certification course costs $1,200 but community data shows 94% salary increase within 6 months. This course also creates a home office tax deduction opportunity of $800/year, and the evening schedule works with your family dinner commitment."</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.sectionDivider}></div>

      {/* Trusted Community Services Section */}
      <section id="services" style={{
        padding: '60px 0',
        backgroundColor: 'white'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <div ref={addToRefs} className={styles.fadeInUp} style={{
            textAlign: 'center',
            marginBottom: '80px'
          }}>
            <h2 style={{
              fontSize: 'clamp(48px, 5vw, 60px)',
              fontWeight: '100',
              color: '#1d1d1f',
              marginBottom: '32px',
              lineHeight: '1.1'
            }}>
              Trusted community{' '}
              <span style={{
                background: 'linear-gradient(135deg, #007AFF 0%, #00D2FF 50%, #34C759 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>marketplace</span>
            </h2>
            <p style={{
              fontSize: '20px',
              color: '#8e8e93',
              maxWidth: '1024px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Connect with pre-vetted service providers who are also Sagaa ecosystem members. Sagaa connects you with the right experts as Sagaa knows your needs, budget, and priorities.
            </p>
          </div>

          <div ref={addToRefs} className={styles.fadeInUp} style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <h3 style={{
                  fontSize: '28px',
                  fontWeight: '100',
                  color: '#1d1d1f',
                  marginBottom: '24px'
                }}>Beyond transactions. Mutual accountability.</h3>
                <p style={{
                  color: '#8e8e93',
                  lineHeight: '1.6',
                  marginBottom: '32px'
                }}>
                  With Sagaa, you’re not just relying on reviews—you’re connecting with service providers trusted by the community. Every recommendation is based on real experiences, repeat requests, and proven value, so you find people who truly fit your needs.
                </p>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{
                      color: '#16a34a',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>✓</span>
                  </div>
                  <span style={{ color: '#8e8e93' }}>All providers are verified Sagaa ecosystem members</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{
                      color: '#16a34a',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>✓</span>
                  </div>
                  <span style={{ color: '#8e8e93' }}>Context-aware matching based on your ecosystem data</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{
                      color: '#16a34a',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>✓</span>
                  </div>
                  <span style={{ color: '#8e8e93' }}>Mutual accountability through shared platform investment</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{
                      color: '#16a34a',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>✓</span>
                  </div>
                  <span style={{ color: '#8e8e93' }}>Seamless booking, payment, and follow-up tracking</span>
                </div>
              </div>
              
              <div style={{
                backgroundColor: '#eff6ff',
                borderRadius: '16px',
                padding: '24px'
              }}>
                <div style={{
                  fontSize: '14px',
                  color: '#2563eb',
                  marginBottom: '8px'
                }}>Example connection:</div>
                <div style={{
                  color: '#1d1d1f',
                  lineHeight: '1.6'
                }}>"Your treadmill needs repair and you have a $200 maintenance budget this month. Sarah, a Sagaa community member and certified repair technician, has fixed this exact model 23 times with a 100% success rate. Her rate fits your budget, and she's available Tuesday morning when you work from home."</div>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '24px'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{
                  backgroundColor: '#f9fafb',
                  borderRadius: '16px',
                  padding: '24px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#eff6ff',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto'
                  }}>
                    <span style={{ 
                      color: '#3b82f6',
                      fontSize: '20px'
                    }}>🔧</span>
                  </div>
                  <h3 style={{
                    fontWeight: '500',
                    color: '#1d1d1f',
                    marginBottom: '8px'
                  }}>Home Services</h3>
                  <p style={{
                    fontSize: '12px',
                    color: '#8e8e93'
                  }}>Repair, maintenance, improvement</p>
                </div>
                
                <div style={{
                  backgroundColor: '#f9fafb',
                  borderRadius: '16px',
                  padding: '24px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto'
                  }}>
                    <span style={{ 
                      color: '#16a34a',
                      fontSize: '20px'
                    }}>📈</span>
                  </div>
                  <h3 style={{
                    fontWeight: '500',
                    color: '#1d1d1f',
                    marginBottom: '8px'
                  }}>Financial Planning</h3>
                  <p style={{
                    fontSize: '12px',
                    color: '#8e8e93'
                  }}>Strategy, investment, optimization</p>
                </div>
                
                <div style={{
                  backgroundColor: '#f9fafb',
                  borderRadius: '16px',
                  padding: '24px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#fef2f2',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto'
                  }}>
                    <span style={{ 
                      color: '#dc2626',
                      fontSize: '20px'
                    }}>🩺</span>
                  </div>
                  <h3 style={{
                    fontWeight: '500',
                    color: '#1d1d1f',
                    marginBottom: '8px'
                  }}>Health & Wellness</h3>
                  <p style={{
                    fontSize: '12px',
                    color: '#8e8e93'
                  }}>Fitness, nutrition, mental health</p>
                </div>
              </div>
              
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '24px',
                marginTop: '32px'
              }}>
                <div style={{
                  backgroundColor: '#f9fafb',
                  borderRadius: '16px',
                  padding: '24px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#faf5ff',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto'
                  }}>
                    <span style={{ 
                      color: '#9333ea',
                      fontSize: '20px'
                    }}>🎓</span>
                  </div>
                  <h3 style={{
                    fontWeight: '500',
                    color: '#1d1d1f',
                    marginBottom: '8px'
                  }}>Learning & Growth</h3>
                  <p style={{
                    fontSize: '12px',
                    color: '#8e8e93'
                  }}>Tutoring, coaching, mentoring</p>
                </div>
                
                <div style={{
                  backgroundColor: '#f9fafb',
                  borderRadius: '16px',
                  padding: '24px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#fff7ed',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto'
                  }}>
                    <span style={{ 
                      color: '#ea580c',
                      fontSize: '20px'
                    }}>🚗</span>
                  </div>
                  <h3 style={{
                    fontWeight: '500',
                    color: '#1d1d1f',
                    marginBottom: '8px'
                  }}>Asset Care</h3>
                  <p style={{
                    fontSize: '12px',
                    color: '#8e8e93'
                  }}>Vehicle, equipment maintenance</p>
                </div>
                
                <div style={{
                  backgroundColor: '#f9fafb',
                  borderRadius: '16px',
                  padding: '24px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#ecfeff',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto'
                  }}>
                    <span style={{ 
                      color: '#0891b2',
                      fontSize: '20px'
                    }}>👨‍👩‍👧‍👦</span>
                  </div>
                  <h3 style={{
                    fontWeight: '500',
                    color: '#1d1d1f',
                    marginBottom: '8px'
                  }}>Family Support</h3>
                  <p style={{
                    fontSize: '12px',
                    color: '#8e8e93'
                  }}>Childcare, eldercare, assistance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join the Ecosystem Pricing Section */}
      <section id="pricing" style={{
        padding: '60px 0',
        backgroundColor: '#f9fafb'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <div ref={addToRefs} className={styles.fadeInUp} style={{
            textAlign: 'center',
            marginBottom: '80px'
          }}>
            <h2 style={{
              fontSize: 'clamp(48px, 5vw, 60px)',
              fontWeight: '100',
              color: '#1d1d1f',
              marginBottom: '32px',
              lineHeight: '1.1'
            }}>
              Join the{' '}
              <span style={{
                background: 'linear-gradient(135deg, #007AFF 0%, #00D2FF 50%, #34C759 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>ecosystem</span>
            </h2>
            <p style={{
              fontSize: '20px',
              color: '#8e8e93',
              maxWidth: '768px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Start building your personal life ecosystem today. Grow from simple assistance to comprehensive life intelligence.
            </p>
          </div>
          
          <div ref={addToRefs} className={styles.fadeInUp} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px'
          }}>
            {/* Essential Plan */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '32px',
              transition: 'transform 0.3s ease',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '500',
                color: '#1d1d1f',
                marginBottom: '8px'
              }}>Essential</h3>
              <div style={{
                fontSize: '32px',
                fontWeight: '100',
                color: '#1d1d1f',
                marginBottom: '32px'
              }}>Free</div>
              <ul style={{
                listStyle: 'none',
                padding: '0',
                margin: '0 0 32px 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                boxShadow: 'none'
              }}>
                <li style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  color: '#8e8e93',
                  backgroundColor: 'transparent',
                  padding: '0',
                  margin: '0',
                  border: 'none',
                  outline: 'none'
                }}>
                  <span style={{
                    color: '#22c55e',
                    fontSize: '16px',
                    marginTop: '2px',
                    minWidth: '16px',
                    fontWeight: 'bold',
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none',
                    boxShadow: 'none'
                  }}>✓</span>
                  <span style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none'
                  }}>Basic ecosystem connections</span>
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  color: '#8e8e93',
                  backgroundColor: 'transparent',
                  padding: '0',
                  margin: '0',
                  border: 'none',
                  outline: 'none'
                }}>
                  <span style={{
                    color: '#22c55e',
                    fontSize: '16px',
                    marginTop: '2px',
                    minWidth: '16px',
                    fontWeight: 'bold',
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none',
                    boxShadow: 'none'
                  }}>✓</span>
                  <span style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none'
                  }}>Financial life tracking</span>
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  color: '#8e8e93',
                  backgroundColor: 'transparent',
                  padding: '0',
                  margin: '0',
                  border: 'none',
                  outline: 'none'
                }}>
                  <span style={{
                    color: '#22c55e',
                    fontSize: '16px',
                    marginTop: '2px',
                    minWidth: '16px',
                    fontWeight: 'bold',
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none',
                    boxShadow: 'none'
                  }}>✓</span>
                  <span style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none'
                  }}>Community insights (view only)</span>
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  color: '#8e8e93',
                  backgroundColor: 'transparent',
                  padding: '0',
                  margin: '0'
                }}>
                  <span style={{
                    color: '#22c55e',
                    fontSize: '16px',
                    marginTop: '2px',
                    minWidth: '16px',
                    fontWeight: 'bold',
                    backgroundColor: 'transparent'
                  }}>✓</span>
                  <span style={{
                    backgroundColor: 'transparent'
                  }}>Limited AI learning</span>
                </li>
              </ul>
              <button style={{
                width: '100%',
                backgroundColor: '#f3f4f6',
                color: '#1d1d1f',
                padding: '16px 0',
                borderRadius: '50px',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e5e7eb';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
              }}>
                Start Building
              </button>
            </div>
            
            {/* Growth Plan */}
            <div style={{
              backgroundColor: 'black',
              color: 'white',
              borderRadius: '24px',
              padding: '32px',
              position: 'relative',
              transition: 'transform 0.3s ease',
              boxShadow: '0 8px 12px rgba(0, 0, 0, 0.3)',
              border: '1px solid #333'
            }}>
              <div style={{
                position: 'absolute',
                top: '-16px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '4px 16px',
                borderRadius: '50px',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                Most Popular
              </div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '500',
                color: 'white',
                marginBottom: '8px',
                backgroundColor: 'transparent'
              }}>Growth</h3>
              <div style={{
                fontSize: '32px',
                fontWeight: '100',
                color: 'white',
                marginBottom: '8px',
                backgroundColor: 'transparent'
              }}>$16.99</div>
              <div style={{
                color: '#9ca3af',
                marginBottom: '32px',
                backgroundColor: 'transparent'
              }}>per month</div>
              <ul style={{
                listStyle: 'none',
                padding: '0',
                margin: '0 0 32px 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                backgroundColor: 'transparent'
              }}>
                <li style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  color: 'white',
                  backgroundColor: 'transparent',
                  padding: '0',
                  margin: '0'
                }}>
                  <span style={{
                    color: '#22c55e',
                    fontSize: '16px',
                    marginTop: '2px',
                    minWidth: '16px',
                    fontWeight: 'bold',
                    backgroundColor: 'transparent'
                  }}>✓</span>
                  <span style={{
                    color: 'white',
                    backgroundColor: 'transparent'
                  }}>Full ecosystem intelligence</span>
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  color: 'white',
                  backgroundColor: 'transparent',
                  padding: '0',
                  margin: '0'
                }}>
                  <span style={{
                    color: '#22c55e',
                    fontSize: '16px',
                    marginTop: '2px',
                    minWidth: '16px',
                    fontWeight: 'bold',
                    backgroundColor: 'transparent'
                  }}>✓</span>
                  <span style={{
                    color: 'white',
                    backgroundColor: 'transparent'
                  }}>Cross-vertical insights</span>
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  color: 'white',
                  backgroundColor: 'transparent',
                  padding: '0',
                  margin: '0'
                }}>
                  <span style={{
                    color: '#22c55e',
                    fontSize: '16px',
                    marginTop: '2px',
                    minWidth: '16px',
                    fontWeight: 'bold',
                    backgroundColor: 'transparent'
                  }}>✓</span>
                  <span style={{
                    color: 'white',
                    backgroundColor: 'transparent'
                  }}>Community contributions</span>
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  color: 'white',
                  backgroundColor: 'transparent',
                  padding: '0',
                  margin: '0'
                }}>
                  <span style={{
                    color: '#22c55e',
                    fontSize: '16px',
                    marginTop: '2px',
                    minWidth: '16px',
                    fontWeight: 'bold',
                    backgroundColor: 'transparent'
                  }}>✓</span>
                  <span style={{
                    color: 'white',
                    backgroundColor: 'transparent'
                  }}>Progressive AI learning</span>
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  color: 'white',
                  backgroundColor: 'transparent',
                  padding: '0',
                  margin: '0'
                }}>
                  <span style={{
                    color: '#22c55e',
                    fontSize: '16px',
                    marginTop: '2px',
                    minWidth: '16px',
                    fontWeight: 'bold',
                    backgroundColor: 'transparent'
                  }}>✓</span>
                  <span style={{
                    color: 'white',
                    backgroundColor: 'transparent'
                  }}>Trusted services access</span>
                </li>
              </ul>
              <button style={{
                width: '100%',
                backgroundColor: 'white',
                color: 'black',
                padding: '16px 0',
                borderRadius: '50px',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
              }}>
                Grow Your Ecosystem
              </button>
            </div>
            
            {/* Family Plan */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '32px',
              transition: 'transform 0.3s ease',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '500',
                color: '#1d1d1f',
                marginBottom: '8px'
              }}>Family</h3>
              <div style={{
                fontSize: '32px',
                fontWeight: '100',
                color: '#1d1d1f',
                marginBottom: '8px'
              }}>$24.99</div>
              <div style={{
                color: '#9ca3af',
                marginBottom: '32px'
              }}>per month</div>
              <ul style={{
                listStyle: 'none',
                padding: '0',
                margin: '0 0 32px 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                boxShadow: 'none'
              }}>
                <li style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  color: '#8e8e93',
                  backgroundColor: 'transparent',
                  padding: '0',
                  margin: '0',
                  border: 'none',
                  outline: 'none'
                }}>
                  <span style={{
                    color: '#22c55e',
                    fontSize: '16px',
                    marginTop: '2px',
                    minWidth: '16px',
                    fontWeight: 'bold',
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none',
                    boxShadow: 'none'
                  }}>✓</span>
                  <span style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none'
                  }}>Everything in Growth</span>
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  color: '#8e8e93',
                  backgroundColor: 'transparent',
                  padding: '0',
                  margin: '0',
                  border: 'none',
                  outline: 'none'
                }}>
                  <span style={{
                    color: '#22c55e',
                    fontSize: '16px',
                    marginTop: '2px',
                    minWidth: '16px',
                    fontWeight: 'bold',
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none',
                    boxShadow: 'none'
                  }}>✓</span>
                  <span style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none'
                  }}>Family ecosystem management</span>
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  color: '#8e8e93',
                  backgroundColor: 'transparent',
                  padding: '0',
                  margin: '0',
                  border: 'none',
                  outline: 'none'
                }}>
                  <span style={{
                    color: '#22c55e',
                    fontSize: '16px',
                    marginTop: '2px',
                    minWidth: '16px',
                    fontWeight: 'bold',
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none',
                    boxShadow: 'none'
                  }}>✓</span>
                  <span style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none'
                  }}>Advanced automation</span>
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  color: '#8e8e93',
                  backgroundColor: 'transparent',
                  padding: '0',
                  margin: '0'
                }}>
                  <span style={{
                    color: '#22c55e',
                    fontSize: '16px',
                    marginTop: '2px',
                    minWidth: '16px',
                    fontWeight: 'bold',
                    backgroundColor: 'transparent'
                  }}>✓</span>
                  <span style={{
                    backgroundColor: 'transparent'
                  }}>Priority community services</span>
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  color: '#8e8e93',
                  backgroundColor: 'transparent',
                  padding: '0',
                  margin: '0'
                }}>
                  <span style={{
                    color: '#22c55e',
                    fontSize: '16px',
                    marginTop: '2px',
                    minWidth: '16px',
                    fontWeight: 'bold',
                    backgroundColor: 'transparent'
                  }}>✓</span>
                  <span style={{
                    backgroundColor: 'transparent'
                  }}>Dedicated ecosystem support</span>
                </li>
              </ul>
              <button style={{
                width: '100%',
                backgroundColor: 'black',
                color: 'white',
                padding: '16px 0',
                borderRadius: '50px',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#374151';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'black';
              }}>
                Manage Family Ecosystem
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.sectionDivider}></div>

      {/* Final CTA Section */}
      <section id="demo" style={{
        padding: '60px 0',
        backgroundColor: 'black',
        color: 'white'
      }}>
        <div style={{
          maxWidth: '1024px',
          margin: '0 auto',
          padding: '0 24px',
          textAlign: 'center'
        }}>
          <div ref={addToRefs} className={styles.fadeInUp}>
            <h2 style={{
              fontSize: 'clamp(48px, 5vw, 60px)',
              fontWeight: '100',
              marginBottom: '32px',
              lineHeight: '1.1',
              color: 'white'
            }}>
              Ready to build your{' '}
              <span style={{
                background: 'linear-gradient(135deg, #007AFF 0%, #00D2FF 50%, #34C759 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>life ecosystem</span>?
            </h2>
            <p style={{
              fontSize: '20px',
              color: '#d1d5db',
              marginBottom: '48px',
              lineHeight: '1.6'
            }}>
              Join thousands who've discovered what happens when AI truly understands their life and learns from their community.
            </p>
            
            {/* Ecosystem benefits */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '32px',
              marginBottom: '64px'
            }}>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                padding: '32px'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌱</div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '500',
                  marginBottom: '8px'
                }}>Grows With You</h3>
                <p style={{
                  color: '#9ca3af',
                  fontSize: '14px'
                }}>From first interaction to autonomous life management</p>
              </div>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                padding: '32px'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔗</div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '500',
                  marginBottom: '8px'
                }}>Connects Everything</h3>
                <p style={{
                  color: '#9ca3af',
                  fontSize: '14px'
                }}>See relationships others miss across your entire life</p>
              </div>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                padding: '32px'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>👥</div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '500',
                  marginBottom: '8px'
                }}>Community Wisdom</h3>
                <p style={{
                  color: '#9ca3af',
                  fontSize: '14px'
                }}>Learn from millions who've walked your path</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <button onClick={() => navigate('/login')} style={{
                backgroundColor: 'white',
                color: 'black',
                padding: '16px 48px',
                borderRadius: '50px',
                fontSize: '18px',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
              }}>
                Start Building Your Ecosystem
              </button>
              <div style={{ color: '#9ca3af' }}>
                Free to start • No credit card required • Join 10,000+ ecosystem builders
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#f9fafb',
        padding: '80px 0',
        border: 'none',
        outline: 'none',
        boxShadow: 'none'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          border: 'none',
          outline: 'none',
          boxShadow: 'none',
          background: 'transparent'
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '32px',
            alignItems: 'flex-start',
            border: 'none',
            outline: 'none',
            boxShadow: 'none',
            background: 'transparent'
          }}>
            <div style={{ 
              flex: '2 1 400px',
              minWidth: '300px',
              border: 'none',
              outline: 'none',
              boxShadow: 'none',
              background: 'transparent'
            }}>
              <div style={{
                fontSize: '30px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '24px',
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
                background: 'transparent'
              }}>Sagaa</div>
              <p style={{
                color: '#6b7280',
                marginBottom: '32px',
                lineHeight: '1.6',
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
                background: 'transparent'
              }}>
                Your Personal Life Intelligence Ecosystem. AI that grows with you, connects every aspect of your life, and learns from millions of community experiences.
              </p>
            </div>
            
            <div style={{
              flex: '1 1 150px',
              minWidth: '150px',
              border: 'none',
              outline: 'none',
              boxShadow: 'none',
              background: 'transparent'
            }}>
              <h3 style={{
                fontWeight: '500',
                color: '#374151',
                marginBottom: '16px',
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
                background: 'transparent'
              }}>Ecosystem</h3>
              <div style={{
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
                background: 'transparent'
              }}>
                <div style={{ marginBottom: '12px' }}>
                  <a href="#" style={{
                    color: '#6b7280',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                    border: 'none',
                    outline: 'none',
                    boxShadow: 'none',
                    background: 'transparent',
                    display: 'block',
                    fontWeight: 'normal'
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#374151';
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#6b7280';
                  }}>Growth Journey</a>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <a href="#" style={{
                    color: '#6b7280',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                    border: 'none',
                    outline: 'none',
                    boxShadow: 'none',
                    background: 'transparent',
                    display: 'block',
                    fontWeight: 'normal'
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#374151';
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#6b7280';
                  }}>Life Connections</a>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <a href="#" style={{
                    color: '#6b7280',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                    border: 'none',
                    outline: 'none',
                    boxShadow: 'none',
                    background: 'transparent',
                    display: 'block',
                    fontWeight: 'normal'
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#374151';
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#6b7280';
                  }}>Community Wisdom</a>
                </div>
                <div>
                  <a href="#" style={{
                    color: '#6b7280',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                    border: 'none',
                    outline: 'none',
                    boxShadow: 'none',
                    background: 'transparent',
                    display: 'block',
                    fontWeight: 'normal'
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#374151';
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#6b7280';
                  }}>Trusted Services</a>
                </div>
              </div>
            </div>
            
            <div style={{
              flex: '1 1 150px',
              minWidth: '150px',
              border: 'none',
              outline: 'none',
              boxShadow: 'none',
              background: 'transparent'
            }}>
              <h3 style={{
                fontWeight: '500',
                color: '#374151',
                marginBottom: '16px',
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
                background: 'transparent'
              }}>Community</h3>
              <div style={{
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
                background: 'transparent'
              }}>
                <div style={{ marginBottom: '12px' }}>
                  <a href="#" style={{
                    color: '#6b7280',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                    border: 'none',
                    outline: 'none',
                    boxShadow: 'none',
                    background: 'transparent',
                    display: 'block',
                    fontWeight: 'normal'
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#374151';
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#6b7280';
                  }}>Success Stories</a>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <a href="#" style={{
                    color: '#6b7280',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                    border: 'none',
                    outline: 'none',
                    boxShadow: 'none',
                    background: 'transparent',
                    display: 'block',
                    fontWeight: 'normal'
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#374151';
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#6b7280';
                  }}>Wisdom Library</a>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <a href="#" style={{
                    color: '#6b7280',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                    border: 'none',
                    outline: 'none',
                    boxShadow: 'none',
                    background: 'transparent',
                    display: 'block',
                    fontWeight: 'normal'
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#374151';
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#6b7280';
                  }}>Connect</a>
                </div>
                <div>
                  <a href="#" style={{
                    color: '#6b7280',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                    border: 'none',
                    outline: 'none',
                    boxShadow: 'none',
                    background: 'transparent',
                    display: 'block',
                    fontWeight: 'normal'
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#374151';
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#6b7280';
                  }}>Contribute</a>
                </div>
              </div>
            </div>
            
            <div style={{
              flex: '1 1 150px',
              minWidth: '150px',
              border: 'none',
              outline: 'none',
              boxShadow: 'none',
              background: 'transparent'
            }}>
              <h3 style={{
                fontWeight: '500',
                color: '#374151',
                marginBottom: '16px',
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
                background: 'transparent'
              }}>Company</h3>
              <div style={{
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
                background: 'transparent'
              }}>
                <div style={{ marginBottom: '12px' }}>
                  <a href="#" style={{
                    color: '#6b7280',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                    border: 'none',
                    outline: 'none',
                    boxShadow: 'none',
                    background: 'transparent',
                    display: 'block',
                    fontWeight: 'normal'
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#374151';
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#6b7280';
                  }}>About</a>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <a href="#" style={{
                    color: '#6b7280',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                    border: 'none',
                    outline: 'none',
                    boxShadow: 'none',
                    background: 'transparent',
                    display: 'block',
                    fontWeight: 'normal'
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#374151';
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#6b7280';
                  }}>Blog</a>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <a href="#" style={{
                    color: '#6b7280',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                    border: 'none',
                    outline: 'none',
                    boxShadow: 'none',
                    background: 'transparent',
                    display: 'block',
                    fontWeight: 'normal'
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#374151';
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#6b7280';
                  }}>Careers</a>
                </div>
                <div>
                  <a href="#" style={{
                    color: '#6b7280',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                    border: 'none',
                    outline: 'none',
                    boxShadow: 'none',
                    background: 'transparent',
                    display: 'block',
                    fontWeight: 'normal'
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#374151';
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#6b7280';
                  }}>Contact</a>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{
            borderTop: '1px solid #e5e7eb',
            marginTop: '64px',
            paddingTop: '32px',
            display: 'flex',
            flexDirection: isDesktop ? 'row' : 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: isDesktop ? '0' : '16px',
            outline: 'none',
            boxShadow: 'none',
            background: 'transparent'
          }}>
            <div style={{
              color: '#6b7280',
              fontSize: '14px',
              marginBottom: isDesktop ? '0' : '16px',
              border: 'none',
              outline: 'none',
              boxShadow: 'none',
              background: 'transparent'
            }}>
              © 2025 Sagaa. All rights reserved.
            </div>
            <div style={{
              display: 'flex',
              gap: '32px',
              fontSize: '14px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              border: 'none',
              outline: 'none',
              boxShadow: 'none',
              background: 'transparent'
            }}>
              <a href="#" style={{
                color: '#6b7280',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
                background: 'transparent'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.color = '#374151';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.color = '#6b7280';
              }}>Privacy</a>
              <a href="#" style={{
                color: '#6b7280',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
                background: 'transparent'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.color = '#374151';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.color = '#6b7280';
              }}>Terms</a>
              <a href="#" style={{
                color: '#6b7280',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
                background: 'transparent'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.color = '#374151';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.color = '#6b7280';
              }}>Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SagaaHomepage;