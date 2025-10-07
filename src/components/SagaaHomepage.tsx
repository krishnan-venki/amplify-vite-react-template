import { CommunityMarketplaceSection } from './CommunityMarketplaceSection';
import {ProactivePartner_ServiceWarranty_Example} from './ProactivePartner_ServiceWarranty_Example';
import { PersonalizedIntelligence_Section } from './PersonalizedIntelligence_Section';
import { OneEcosystem } from './OneEcosystem';
import {MobileChatDemo} from './MobileChatDemo';
import {CommunityWisdomSection} from './CommunityWisdomSection';
import heroImage from '../assets/Hero_Image.png';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import React, { useEffect, useRef, useState } from 'react';
import styles from './SagaaHomepage.module.css';
import { useNavigate } from 'react-router-dom';
import sagaaLogo from '../assets/sagaa_48x48.png';
import morningInteraction from '../assets/Morning_Interaction.jpg';
import driveInteraction from '../assets/Drive_Interaction.jpg';
import eveningInteraction from '../assets/Evening_Interactions.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { ConnectedLife } from './ConnectedLife';
import { OnePlatform } from './OnePlatform';

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

  const newHeroSection = () => {
    return (
      <section id="ecosystem" style={{
        padding: '60px 0',
        background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)',
        color: 'white'
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
                fontWeight: '100',
                color: 'white',
                marginBottom: '32px',
                lineHeight: '1.4',
                wordBreak: 'break-word',
                fontSize: 'clamp(48px, 5vw, 72px)',
                paddingTop: '0.5em'
              }}>
                <span>
                  Meet{' '}
                  <span style={{
                    background: 'linear-gradient(135deg, #007AFF 0%, #00D2FF 50%, #34C759 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    color: 'transparent',
                    display: 'inline-block',
                    verticalAlign: 'baseline',
                    lineHeight: 'inherit',
                    paddingBottom: '0.18em'
                  }}>Sagaa.</span>
                </span>
                <br />
                <span>
                  The world's first{' '}
                  <span style={{
                    background: 'linear-gradient(135deg, #007AFF 0%, #00D2FF 50%, #34C759 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    color: 'transparent',
                    display: 'inline-block',
                    verticalAlign: 'baseline',
                    lineHeight: 'inherit',
                    whiteSpace: 'nowrap'
                  }}>
                    AI Personal Ecosystem
                  </span>
                </span>
              </h2>
              <p style={{
                fontSize: 'clamp(18px, 3vw, 28px)',
                fontWeight: '100',
                marginBottom: '48px',
                color: '#d1d5db',
                maxWidth: '1024px',
                margin: '0 auto 48px auto',
                lineHeight: '1.6'
              }}>
                 Sagaa helps navigate your goals and life decisions with confidence by connecting your finances, health, education and life essentials into one ecosystem of personalized intelligence, strengthened by trusted community insights.
              </p>
            </div>
            
            <div ref={addToRefs} className={styles.fadeInUp} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img 
                src={heroImage} 
                alt="Sagaa Hero" 
                style={{
                  maxWidth: '100%',
                  width: '760px',
                  height: 'auto',
                  borderRadius: '0',
                  boxShadow: 'none',
                  background: 'none',
                  margin: 0,
                  padding: 0,
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>
          </div>
        </div>
      </section>
    );
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
     
      {newHeroSection()}
      <div className={styles.sectionDivider}></div>
      {/* Community Wisdom Section */}
      <OneEcosystem />
      <div className={styles.sectionDivider}></div>
      {/* One Platform Section */}
      <OnePlatform />
      <div className={styles.sectionDivider}></div>
      <PersonalizedIntelligence_Section />
      <div className={styles.sectionDivider}></div>
      <ConnectedLife />
      <div className={styles.sectionDivider}></div>
      {/* Proactive partner Section */}
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
            marginBottom: '32px'
          }}>
            <h2 style={{
              fontSize: 'clamp(48px, 5vw, 80px)',
              fontWeight: '100',
              color: '#1d1d1f',
              marginBottom: '32px',
              lineHeight: '1.1'
            }}>              
               <span style={{ 
                  color: '#1d1d1f',
                  backgroundColor: 'transparent'
                }}>Proactive</span>{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #007AFF 0%, #00D2FF 50%, #34C759 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent'
                }}>Partner</span>
            </h2>
            <p style={{
              fontSize: '20px',
              color: '#6e6e73',
              maxWidth: '1280px',
              margin: '0 0 0 0',
              lineHeight: '1.6',
              textAlign: 'center'
            }}>
              Anticipates your needs with timely reminders and smart suggestions before you even ask. As Sagaa learns from your interactions, preferences, and life context, it evolves as a proactive partner, staying ahead of what you need to achieve your goals
            </p>
          </div>
        </div>
        
            
        {/* Swiper */}
        <div ref={addToRefs} className={styles.fadeInUp}>
              <Swiper
                spaceBetween={20}
                slidesPerView={1.15}
                centeredSlides={true}
                pagination={{ clickable: true }}
                cssMode={true}
                mousewheel={true}
                modules={[Pagination]}
                style={{ paddingBottom: '0px', marginBottom: '0px' }}
              >
                <SwiperSlide>
                  <div style={{
                    background: 'white',
                    borderRadius: '20px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)',
                    border: '1px solid rgba(255,255,255,0.8)',
                    padding: '12px',
                    width: '100%'
                   }}>
                    <MobileChatDemo />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div style={{
                    background: 'white',
                    borderRadius: '20px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)',
                    border: '1px solid rgba(255,255,255,0.8)',
                    padding: '12px',
                    width: '100%'
                  }}>
                    <ProactivePartner_ServiceWarranty_Example />
                  </div>
                </SwiperSlide>
              </Swiper>
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
          </div>

          <div ref={addToRefs} className={styles.fadeInUp} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '80px'
          }}>
            {/* Swiper */}
            <div ref={addToRefs} className={styles.fadeInUp}>
              <Swiper
                spaceBetween={40}
                slidesPerView={1}
                pagination={{ clickable: true }}
                cssMode={true}
                mousewheel={true}
                modules={[Pagination]}
                style={{ paddingBottom: '0px', marginBottom: '0px' }}
              >
                <SwiperSlide>
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
                </SwiperSlide>
                <SwiperSlide>
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

                </SwiperSlide>
                <SwiperSlide>
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
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.sectionDivider}></div>

      {/* Community Wisdom Section */}
      <CommunityWisdomSection />

      <div className={styles.sectionDivider}></div>

      {/* Trusted Community Services Section */}
      <CommunityMarketplaceSection isDesktop={isDesktop} />

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