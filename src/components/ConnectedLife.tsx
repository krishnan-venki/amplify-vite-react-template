import { useRef, useEffect } from 'react';
import Title_Image  from '../assets/Connected_Life.jpg';
import education_Finance_image  from '../assets/Education_to_Finance_Link.jpg';
import homeCare_community_image  from '../assets/HomeCare_Community.jpg';
import travel_insurance_image  from '../assets/Travel_Inurance.jpg';
import health_finance_image  from '../assets/Health_Finance.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import styles from './SagaaHomepage.module.css';

export const ConnectedLife = () => {
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

  const fadeInUpStyle = {
    opacity: 0,
    transform: 'translateY(20px)',
    transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
  };

  return (
        <section id="connected" style={{
    padding: '60px 0',
    backgroundColor: '#f9fafb'
    }}>
    <div style={{
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '0 24px'
}}>
  {/* Title, Description and Image Row */}
  <div ref={addToRefs} style={{
    ...fadeInUpStyle,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '48px',
    alignItems: 'center',
    marginBottom: '60px'
  }}>
    {/* Left Side - Title and Description */}
    <div>
      <h2 style={{
        fontSize: 'clamp(48px, 5vw, 60px)',
        fontWeight: '100',
        color: '#1d1d1f',
        marginBottom: '32px',
        lineHeight: '1.1'
      }}>
        Connected{' '}
        <span style={{
          background: 'linear-gradient(135deg, #007AFF 0%, #00D2FF 50%, #34C759 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>Intelligence</span>
      </h2>
      
      <p style={{
        fontSize: '18px',
        color: '#475569',
        lineHeight: '1.8'
      }}>
        Life doesn't happen in silos. A new health goal / crisis impacts your finances. Family needs impacts your individual goals. A home repair affects your vacation plans. Sagaa connects the dots.
      </p>
    </div>

    {/* Right Side - Image */}
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <img 
        src={Title_Image}
        alt="Connected Intelligence visualization showing interconnected life domains"
        style={{
          width: '100%',
          maxWidth: '500px',
          height: 'auto',
          borderRadius: '16px'
        }}
      />
    </div>
  </div>

        {/* Highlights Section - Full Width Below */}
        <div ref={addToRefs} style={{
        ...fadeInUpStyle,
        marginBottom: '80px'
        }}>
        <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)'
        }}>
            <p style={{
            fontSize: '18px',
            color: '#1d1d1f',
            lineHeight: '1.8',
            marginBottom: '28px',
            fontWeight: '500',
            textAlign: 'center'
            }}>
            Sagaa automatically sees the whole picture. When something changes in one area of your life, Sagaa instantly understands the ripple effects across all domains—and takes coordinated action.
            </p>

            {/* Key Capabilities Grid */}
            <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
            }}>
            {[
                { 
                icon: '🔗', 
                title: 'Cross-Domain Awareness',
                desc: 'Monitors health, finance, home, education simultaneously',
                gradient: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
                border: '#7dd3fc'
                },
                { 
                icon: '🧠', 
                title: 'Impact Analysis',
                desc: 'Instantly calculates how changes affect all areas',
                gradient: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
                border: '#c084fc'
                },
                { 
                icon: '⚡', 
                title: 'Coordinated Action',
                desc: 'Adjusts plans across multiple domains at once',
                gradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                border: '#fbbf24'
                },
                { 
                icon: '👥', 
                title: 'Community Wisdom',
                desc: 'Learns from others who faced similar situations',
                gradient: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
                border: '#4ade80'
                }
            ].map((item, idx) => (
                <div key={idx} style={{
                padding: '20px',
                background: item.gradient,
                borderRadius: '12px',
                border: `1px solid ${item.border}`,
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'default'
                }}
                onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                }}>
                <div style={{
                    fontSize: '28px',
                    marginBottom: '12px'
                }}>{item.icon}</div>
                <h4 style={{
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#1d1d1f',
                    marginBottom: '8px'
                }}>{item.title}</h4>
                <p style={{
                    fontSize: '14px',
                    color: '#64748b',
                    lineHeight: '1.5'
                }}>{item.desc}</p>
                </div>
            ))}
            </div>
        </div>
        </div>


        {/* Now the examples section starts */}
        <div ref={addToRefs} style={{
        ...fadeInUpStyle,
        display: 'flex',
        flexDirection: 'column',
        gap: '64px'
        }}>

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
                style={{ paddingBottom: '30px', marginBottom: '0px' }}
              >
            <SwiperSlide>
                {/* Connection Example 1: Health Crisis + Financial Recovery */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '24px',
                    padding: '48px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '800px',
                    overflow: 'hidden'
                }}>
                {/* Enhanced Header Section */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr',
                    gap: '32px',
                    alignItems: 'center',
                    marginBottom: '32px',
                    paddingBottom: '24px',
                    borderBottom: '2px solid #f3f4f6'
                }}>
                    {/* Left: Title + Connected Domains */}
                    <div>
                    <h3 style={{
                        fontSize: '24px',
                        fontWeight: '600',
                        color: '#1d1d1f',
                        marginBottom: '20px'
                    }}>Health Crisis meets Financial Reality</h3>
                    
                    {/* Connected Domain Icons - Horizontal */}
                    <div style={{
                        display: 'flex',
                        gap: '16px',
                        alignItems: 'center'
                    }}>
                        <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        backgroundColor: '#fef2f2',
                        borderRadius: '12px',
                        border: '1px solid #fecaca'
                        }}>
                        <span style={{ fontSize: '20px' }}>🏥</span>
                        <div>
                            <div style={{ fontSize: '13px', fontWeight: '600', color: '#1d1d1f' }}>ACL Surgery Recovery</div>
                            <div style={{ fontSize: '11px', color: '#8e8e93' }}>6 months PT + extended leave</div>
                        </div>
                        </div>
                        
                        <div style={{
                        width: '40px',
                        height: '2px',
                        background: 'linear-gradient(90deg, #ef4444 0%, #22c55e 100%)',
                        position: 'relative'
                        }}>
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: '#3b82f6',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '10px',
                            color: 'white',
                            fontWeight: '600',
                            border: '2px solid white',
                            boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
                        }}>⚡</div>
                        </div>
                        
                        <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        backgroundColor: '#f0fdf4',
                        borderRadius: '12px',
                        border: '1px solid #bbf7d0'
                        }}>
                        <span style={{ fontSize: '20px' }}>💰</span>
                        <div>
                            <div style={{ fontSize: '13px', fontWeight: '600', color: '#1d1d1f' }}>Budget Restructure</div>
                            <div style={{ fontSize: '11px', color: '#8e8e93' }}>Adaptive financial planning</div>
                        </div>
                        </div>
                    </div>
                    </div>

                    {/* Right: Image - Full Fill */}
                    <div style={{
                    backgroundColor: '#f8fafc',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #e2e8f0',
                    height: '140px',
                    overflow: 'hidden'  // Add this to clip image to rounded corners
                    }}>
                    <img 
                        src={health_finance_image}
                        alt="Education investment connecting to financial planning"
                        style={{
                        width: '100%',
                        height: '100%',
                        minHeight: '140px',
                        objectFit: 'cover',  // Changed from 'contain' to 'cover'
                        borderRadius: '16px'
                        }}
                    />
                    </div>
                </div>
                
                <div style={{
                    backgroundColor: '#eff6ff',
                    borderRadius: '16px',
                    padding: '24px',
                    borderLeft: '4px solid #8b5cf6',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    height:'450px'
                }}>
                    <div style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#2563eb',
                    marginBottom: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                    }}>Sagaa's Adaptive Intelligence</div>
                    
                    {/* Two Column Layout - Description Left, Table Right */}
                    <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '20px',
                    marginBottom: '20px'
                    }}>
                    {/* Left Column - Description */}
                    <div>
                        <div style={{
                        color: '#1d1d1f',
                        lineHeight: '1.7',
                        fontSize: '15px',
                        marginBottom: '20px'
                        }}>"I see your ACL surgery is scheduled for next week with 6 months of physical therapy ahead. Your extended leave will reduce income by $2,800/month. I've analyzed your budget and created a recovery-focused financial plan that maintains your emergency fund while covering medical expenses."</div>
                        
                        <div style={{
                        backgroundColor: '#f0fdf4',
                        borderRadius: '8px',
                        padding: '16px',
                        borderLeft: '3px solid #22c55e'
                        }}>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#16a34a', marginBottom: '8px' }}>
                            Community Recovery Insights (156 ACL users)
                        </div>
                        <div style={{ fontSize: '14px', color: '#1d1d1f', lineHeight: '1.6' }}>
                            • Average recovery cost: $2,400 over 6 months<br/>
                            • 83% returned to full activity by month 7<br/>
                            • Home PT equipment ($180) reduced clinic visits 40%
                        </div>
                        </div>
                    </div>

                    {/* Right Column - Budget Table */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        padding: '20px'
                    }}>
                        <h5 style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#1d1d1f',
                        marginBottom: '16px'
                        }}>Recommended Budget Adjustments</h5>
                        <div style={{ display: 'grid', gap: '12px' }}>
                        {[
                            { label: 'Recreation & Entertainment', value: '-$350/mo', color: '#ef4444' },
                            { label: 'Dining Out', value: '-$280/mo', color: '#ef4444' },
                            { label: 'Gym Membership (paused)', value: '-$65/mo', color: '#ef4444' },
                            { label: 'PT Copays (allocated)', value: '+$320/mo', color: '#22c55e' }
                        ].map((item, idx) => (
                            <div key={idx} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingBottom: '8px',
                            borderBottom: idx < 3 ? '1px solid #f3f4f6' : 'none'
                            }}>
                            <span style={{ fontSize: '13px', color: '#64748b' }}>{item.label}</span>
                            <span style={{ fontSize: '13px', fontWeight: '500', color: item.color }}>{item.value}</span>
                            </div>
                        ))}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingTop: '8px',
                            marginTop: '8px',
                            borderTop: '2px solid #e5e7eb'
                        }}>
                            <span style={{ fontSize: '14px', fontWeight: '600', color: '#1d1d1f' }}>Net Monthly Impact</span>
                            <span style={{ fontSize: '14px', fontWeight: '600', color: '#22c55e' }}>-$375/mo</span>
                        </div>
                        </div>
                    </div>
                    </div>

                    <div style={{
                    fontSize: '13px',
                    color: '#64748b',
                    fontStyle: 'italic',
                    marginTop: 'auto',
                    paddingTop: '16px',
                    borderTop: '1px solid #dbeafe'
                    }}>Why other apps miss this: Health apps track recovery. Financial apps show spending. Only Sagaa connects your medical journey to real-time budget adaptation.</div>
                </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                {/* Connection Example 2: Education Investment + Financial Planning */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '24px',
                    padding: '48px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '800px',
                    overflow: 'hidden'
                }}>
                {/* Enhanced Header Section */}
                <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                gap: '32px',
                alignItems: 'center',
                marginBottom: '32px',
                paddingBottom: '24px',
                borderBottom: '2px solid #f3f4f6'
                }}>
                {/* Left: Title + Connected Domains */}
                <div>
                    <h3 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    color: '#1d1d1f',
                    marginBottom: '20px'
                    }}>College Dreams meet Financial Reality</h3>
                    
                    {/* Connected Domain Icons - Horizontal */}
                    <div style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'center'
                    }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        backgroundColor: '#fff7ed',
                        borderRadius: '12px',
                        border: '1px solid #fed7aa'
                    }}>
                        <span style={{ fontSize: '20px' }}>🎓</span>
                        <div>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#1d1d1f' }}>College Preparation</div>
                        <div style={{ fontSize: '11px', color: '#8e8e93' }}>Tutor + College counselor</div>
                        </div>
                    </div>
                    
                    <div style={{
                        width: '40px',
                        height: '2px',
                        background: 'linear-gradient(90deg, #f97316 0%, #22c55e 100%)',
                        position: 'relative'
                    }}>
                        <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: '#8b5cf6',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        color: 'white',
                        fontWeight: '600',
                        border: '2px solid white',
                        boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)'
                        }}>⚡</div>
                    </div>
                    
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        backgroundColor: '#f0fdf4',
                        borderRadius: '12px',
                        border: '1px solid #bbf7d0'
                    }}>
                        <span style={{ fontSize: '20px' }}>💰</span>
                        <div>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#1d1d1f' }}>Budget Reallocation</div>
                        <div style={{ fontSize: '11px', color: '#8e8e93' }}>$2,500/month for 6 months</div>
                        </div>
                    </div>
                    </div>
                </div>
                {/* Right: Image - Full Fill */}
                <div style={{
                backgroundColor: '#f8fafc',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #e2e8f0',
                height: '140px',
                overflow: 'hidden'  // Add this to clip image to rounded corners
                }}>
                <img 
                    src={education_Finance_image}
                    alt="Education investment connecting to financial planning"
                    style={{
                    width: '100%',
                    height: '100%',
                    minHeight: '140px',
                    objectFit: 'cover',  // Changed from 'contain' to 'cover'
                    borderRadius: '16px'
                    }}
                />
                </div>
                </div>

                
                
                <div style={{
                    backgroundColor: '#f5f3ff',
                    borderRadius: '16px',
                    padding: '24px',
                    borderLeft: '4px solid #8b5cf6',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    height:'450px'
                    
                }}>
                    <div style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#7c3aed',
                    marginBottom: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                    }}>Integrated Education + Finance Planning</div>
                    
                    {/* Two Column Layout */}
                    <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '20px',
                    marginBottom: '20px'
                    }}>
                    {/* Left Column - Description */}
                    <div>
                        <div style={{
                        color: '#1d1d1f',
                        lineHeight: '1.7',
                        fontSize: '15px',
                        marginBottom: '20px'
                        }}>"I see you've engaged Sarah's AP Calculus tutor (Jake) and college counselor (Maria) through Sagaa's marketplace. This investment could unlock $40K+ in merit scholarships. Here's how we'll fund this 6-month commitment without derailing your other goals."</div>
                        
                        <div style={{
                        backgroundColor: '#eff6ff',
                        borderRadius: '8px',
                        padding: '16px',
                        borderLeft: '3px solid #3b82f6'
                        }}>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e40af', marginBottom: '8px' }}>
                            Community Data: The ROI Story
                        </div>
                        <div style={{ fontSize: '14px', color: '#1d1d1f', lineHeight: '1.6' }}>
                            • 78% got into top choice schools<br/>
                            • Average merit scholarship: $42K<br/>
                            • AP grades improved 1.2 points
                        </div>
                        </div>
                    </div>

                    {/* Right Column - Budget Table */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        padding: '20px'
                    }}>
                        <h5 style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#1d1d1f',
                        marginBottom: '16px'
                        }}>Budget Reallocation Strategy</h5>
                        <div style={{ display: 'grid', gap: '12px' }}>
                        {[
                            { label: 'Pause vacation savings', value: '+$800/mo', color: '#22c55e' },
                            { label: 'Reduce dining out', value: '+$400/mo', color: '#22c55e' },
                            { label: 'Redirect home improvement', value: '+$600/mo', color: '#22c55e' },
                            { label: 'Use education fund', value: '+$700/mo', color: '#22c55e' }
                        ].map((item, idx) => (
                            <div key={idx} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingBottom: '8px',
                            borderBottom: idx < 3 ? '1px solid #f3f4f6' : 'none'
                            }}>
                            <span style={{ fontSize: '13px', color: '#64748b' }}>{item.label}</span>
                            <span style={{ fontSize: '13px', fontWeight: '500', color: item.color }}>{item.value}</span>
                            </div>
                        ))}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingTop: '8px',
                            marginTop: '8px',
                            backgroundColor: '#f0fdf4',
                            padding: '12px',
                            borderRadius: '8px'
                        }}>
                            <span style={{ fontSize: '14px', fontWeight: '600', color: '#1d1d1f' }}>Total Available</span>
                            <span style={{ fontSize: '14px', fontWeight: '600', color: '#22c55e' }}>$2,500/mo</span>
                        </div>
                        </div>
                    </div>
                    </div>

                    <div style={{
                    fontSize: '13px',
                    color: '#64748b',
                    fontStyle: 'italic',
                    marginTop: 'auto',
                    paddingTop: '16px',
                    borderTop: '1px solid #ede9fe'
                    }}>Why other apps miss this: Education platforms don't know your budget. Financial apps don't understand education ROI. Sagaa connects both—and found you verified providers.</div>
                </div>
                </div>
            </SwiperSlide>

            <SwiperSlide>   
                {/* Connection Example 3: Preventive Home Care */}
                <div style={{
                backgroundColor: 'white',
                borderRadius: '24px',
                padding: '48px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                height: '800px',
                overflow: 'hidden'
                }}>
                {/* Enhanced Header Section */}
                <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                gap: '32px',
                alignItems: 'center',
                marginBottom: '32px',
                paddingBottom: '24px',
                borderBottom: '2px solid #f3f4f6'
                }}>
                {/* Left: Title + Connected Domains */}
                <div>
                    <h3 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    color: '#1d1d1f',
                    marginBottom: '20px'
                    }}>Preventive Home Care meets Community Services</h3>
                    
                    {/* Connected Domain Icons - Horizontal */}
                    <div style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'center'
                    }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        backgroundColor: '#eff6ff',
                        borderRadius: '12px',
                        border: '1px solid #bfdbfe'
                    }}>
                        <span style={{ fontSize: '20px' }}>🏃</span>
                        <div>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#1d1d1f' }}>Asset Health Alert</div>
                        <div style={{ fontSize: '11px', color: '#8e8e93' }}>Treadmill warranty expiring</div>
                        </div>
                    </div>
                    
                    <div style={{
                        width: '40px',
                        height: '2px',
                        background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
                        position: 'relative'
                    }}>
                        <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: '#8b5cf6',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        color: 'white',
                        fontWeight: '600',
                        border: '2px solid white',
                        boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)'
                        }}>⚡</div>
                    </div>
                    
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        backgroundColor: '#f5f3ff',
                        borderRadius: '12px',
                        border: '1px solid #e9d5ff'
                    }}>
                        <span style={{ fontSize: '20px' }}>🔧</span>
                        <div>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#1d1d1f' }}>Community Service</div>
                        <div style={{ fontSize: '11px', color: '#8e8e93' }}>Verified local technicians</div>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Right: Image - Full Fill */}
                <div style={{
                backgroundColor: '#f8fafc',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #e2e8f0',
                height: '140px',
                overflow: 'hidden'  // Add this to clip image to rounded corners
                }}>
                <img 
                    src={homeCare_community_image}
                    alt="Education investment connecting to financial planning"
                    style={{
                    width: '100%',
                    height: '100%',
                    minHeight: '140px',
                    objectFit: 'cover',  // Changed from 'contain' to 'cover'
                    borderRadius: '16px'
                    }}
                />
                </div>
                </div>
                
                <div style={{
                    backgroundColor: '#faf5ff',
                    borderRadius: '16px',
                    padding: '24px',
                    borderLeft: '4px solid #8b5cf6',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    height:'450px'
                }}>
                    <div style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#7c3aed',
                    marginBottom: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                    }}>Proactive Asset Management + Community Network</div>
                    
                    {/* Two Column Layout */}
                    <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '20px',
                    marginBottom: '20px'
                    }}>
                    {/* Left Column - Description */}
                    <div>
                        <div style={{
                        color: '#1d1d1f',
                        lineHeight: '1.7',
                        fontSize: '15px',
                        marginBottom: '20px'
                        }}>"Your NordicTrack treadmill warranty expires November 15th—perfect timing for recommended service. I found 3 community members with 5-star ratings on your exact model, all available during your work-from-home week so you won't need time off."</div>
                        
                        <div style={{
                        backgroundColor: '#f0fdf4',
                        borderRadius: '8px',
                        padding: '16px',
                        borderLeft: '3px solid #22c55e'
                        }}>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#16a34a', marginBottom: '8px' }}>
                            Community Preventive Care Insights
                        </div>
                        <div style={{ fontSize: '14px', color: '#1d1d1f', lineHeight: '1.6' }}>
                            • 94% avoided major repairs<br/>
                            • Average repair cost saved: $400+<br/>
                            • Belt issues common at 2-year mark
                        </div>
                        </div>
                    </div>

                    {/* Right Column - Service Providers */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        padding: '20px'
                    }}>
                        <h5 style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#1d1d1f',
                        marginBottom: '16px'
                        }}>Community Service Providers</h5>
                        <div style={{ display: 'grid', gap: '12px' }}>
                        {[
                            { name: 'Mike', distance: '0.8 mi', rating: '5.0', services: '23', price: '$140', time: 'Tue 9 AM' },
                            { name: 'Sarah', distance: '2.1 mi', rating: '4.9', services: '31', price: '$160', time: 'Wed 10 AM' },
                            { name: 'Tom', distance: '1.5 mi', rating: '5.0', services: '18', price: '$135', time: 'Thu 11 AM' }
                        ].map((tech, idx) => (
                            <div key={idx} style={{
                            padding: '10px',
                            backgroundColor: '#faf5ff',
                            borderRadius: '8px',
                            border: '1px solid #e9d5ff'
                            }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '4px'
                            }}>
                                <span style={{ fontWeight: '600', color: '#1d1d1f', fontSize: '13px' }}>
                                {tech.name} ({tech.distance})
                                </span>
                                <span style={{ fontSize: '12px', color: '#22c55e' }}>
                                ⭐ {tech.rating}
                                </span>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: '12px',
                                color: '#64748b'
                            }}>
                                <span>{tech.price}</span>
                                <span>{tech.time}</span>
                            </div>
                            </div>
                        ))}
                        </div>
                    </div>
                    </div>

                    <div style={{
                    fontSize: '13px',
                    color: '#64748b',
                    fontStyle: 'italic',
                    marginTop: 'auto',
                    paddingTop: '16px',
                    borderTop: '1px solid #ede9fe'
                    }}>Why other apps miss this: Asset trackers send reminders. Service apps show providers. Only Sagaa connects your equipment health to your schedule and trusted community technicians.</div>
                </div>
                </div>
            </SwiperSlide>

            <SwiperSlide>
                {/* Connection Example 4: International Family Visit Planning */}
                <div style={{
                backgroundColor: 'white',
                borderRadius: '24px',
                padding: '48px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                height: '800px',
                overflow: 'hidden'
                }}>
                {/* Enhanced Header Section */}
                <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                gap: '32px',
                alignItems: 'center',
                marginBottom: '32px',
                paddingBottom: '24px',
                borderBottom: '2px solid #f3f4f6'
                }}>
                {/* Left: Title + Connected Domains */}
                <div>
                    <h3 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    color: '#1d1d1f',
                    marginBottom: '20px'
                    }}>Family Visit meets Health Insurance Planning</h3>
                    
                    {/* Connected Domain Icons - Horizontal */}
                    <div style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'center'
                    }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        backgroundColor: '#fef2f2',
                        borderRadius: '12px',
                        border: '1px solid #fecaca'
                    }}>
                        <span style={{ fontSize: '20px' }}>👨‍👩‍👦</span>
                        <div>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#1d1d1f' }}>Parents Visiting</div>
                        <div style={{ fontSize: '11px', color: '#8e8e93' }}>From India, 2-month stay</div>
                        </div>
                    </div>
                    
                    <div style={{
                        width: '40px',
                        height: '2px',
                        background: 'linear-gradient(90deg, #ef4444 0%, #f59e0b 100%)',
                        position: 'relative'
                    }}>
                        <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: '#f59e0b',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        color: 'white',
                        fontWeight: '600',
                        border: '2px solid white',
                        boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)'
                        }}>⚡</div>
                    </div>
                    
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        backgroundColor: '#fffbeb',
                        borderRadius: '12px',
                        border: '1px solid #fde68a'
                    }}>
                        <span style={{ fontSize: '20px' }}>🏥</span>
                        <div>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#1d1d1f' }}>Health Insurance</div>
                        <div style={{ fontSize: '11px', color: '#8e8e93' }}>Visitor coverage planning</div>
                        </div>
                    </div>
                    </div>
                </div>

                 {/* Right: Image - Full Fill */}
                <div style={{
                backgroundColor: '#f8fafc',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #e2e8f0',
                height: '140px',
                overflow: 'hidden'  // Add this to clip image to rounded corners
                }}>
                <img 
                    src={travel_insurance_image}
                    alt="Education investment connecting to financial planning"
                    style={{
                    width: '100%',
                    height: '100%',
                    minHeight: '140px',
                    objectFit: 'cover',  // Changed from 'contain' to 'cover'
                    borderRadius: '16px'
                    }}
                />
                </div>
                </div>
                
                <div style={{
                    backgroundColor: '#fffbeb',
                    borderRadius: '16px',
                    padding: '24px',
                    borderLeft: '4px solid #f59e0b',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    height:'450px'
                }}>
                    <div style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#d97706',
                    marginBottom: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                    }}>Calendar + Health + Finance Integration</div>
                    
                    {/* Two Column Layout */}
                    <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '20px',
                    marginBottom: '20px'
                    }}>
                    {/* Left Column - Description */}
                    <div>
                        <div style={{
                        color: '#1d1d1f',
                        lineHeight: '1.7',
                        fontSize: '15px',
                        marginBottom: '20px'
                        }}>"I see your parents are visiting from India next month—how exciting! Based on what 127 Sagaa community members learned when hosting international family, here's your personalized preparation plan that protects both their health and your budget."</div>
                        
                        <div style={{
                        backgroundColor: '#eff6ff',
                        borderRadius: '8px',
                        padding: '16px',
                        borderLeft: '3px solid #3b82f6'
                        }}>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e40af', marginBottom: '8px' }}>
                            Proactive Planning Checklist
                        </div>
                        <div style={{ fontSize: '14px', color: '#1d1d1f', lineHeight: '1.6' }}>
                            ✓ Walk-in clinics with visitor insurance<br/>
                            ✓ Prescription medication prep<br/>
                            ✓ $500 for unexpected expenses
                        </div>
                        </div>
                    </div>

                    {/* Right Column - Insurance Table */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        padding: '20px'
                    }}>
                        <h5 style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#1d1d1f',
                        marginBottom: '12px'
                        }}>Medical Insurance Reality Check</h5>
                        <div style={{
                        padding: '12px',
                        backgroundColor: '#fef2f2',
                        borderRadius: '8px',
                        borderLeft: '3px solid #ef4444',
                        marginBottom: '12px',
                        fontSize: '13px'
                        }}>
                        <strong>Community Warning:</strong> 89% wished they bought insurance BEFORE the visit. Avg ER: $3,200
                        </div>
                        <div style={{ display: 'grid', gap: '10px' }}>
                        {[
                            { label: 'Atlas America (2 months)', value: '$180-210' },
                            { label: 'Patriot America (2 months)', value: '$200-240' }
                        ].map((item, idx) => (
                            <div key={idx} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '8px 0',
                            borderBottom: '1px solid #f3f4f6'
                            }}>
                            <span style={{ fontSize: '13px', color: '#64748b' }}>{item.label}</span>
                            <span style={{ fontSize: '13px', fontWeight: '500', color: '#1d1d1f' }}>{item.value}</span>
                            </div>
                        ))}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingTop: '10px',
                            backgroundColor: '#f0fdf4',
                            padding: '12px',
                            borderRadius: '8px',
                            marginTop: '8px'
                        }}>
                            <span style={{ fontSize: '13px', fontWeight: '600', color: '#1d1d1f' }}>Budget Impact</span>
                            <span style={{ fontSize: '13px', fontWeight: '600', color: '#22c55e' }}>Covered</span>
                        </div>
                        </div>
                    </div>
                    </div>

                    <div style={{
                    fontSize: '13px',
                    color: '#64748b',
                    fontStyle: 'italic',
                    marginTop: 'auto',
                    paddingTop: '16px',
                    borderTop: '1px solid #fef3c7'
                    }}>Why other apps miss this: Calendar apps show visits. Insurance sites sell policies. Only Sagaa connects your family event to health risk planning and budget-aware recommendations from the community.</div>
                </div>
                </div>
            </SwiperSlide>
        </Swiper>
    </div>
    </div>
      </div>
    </section>
  );
};