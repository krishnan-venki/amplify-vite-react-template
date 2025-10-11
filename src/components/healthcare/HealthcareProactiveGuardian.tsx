import { Smartphone, Speaker, Watch, Monitor, Mail, CheckCircle, Sparkles } from 'lucide-react';

export const HealthcareProactiveGuardian = () => {
  const notifications = [
    {
      id: 1,
      urgency: 'critical' as const,
      label: 'Medication Expiration Alert',
      sublabel: 'Critical: Prescription Renewal Needed',
      icon: '💊',
      message: "Your Lisinopril prescription expires in 3 days. Dr. Martinez requires an annual visit for renewal. Her only opening this week is Thursday 4 PM—after your project deadline.",
      actions: ['Book Appointment', 'Remind Me Later'],
      stat: '94% of users prevented medication lapses with proactive reminders',
      devices: ['mobile', 'voice', 'watch', 'email'],
      borderColor: '#ef4444',
      bgColor: '#fef2f2'
    },
    {
      id: 2,
      urgency: 'critical' as const,
      label: 'Health Pattern Detected',
      sublabel: 'Abnormal Trend Identified',
      icon: '📊',
      message: "I noticed your resting heart rate increased 12% over 3 weeks, and your sleep quality dropped to 68%. Your last cardiology appointment was 8 months ago. I recommend scheduling a check-up.",
      actions: ['Schedule Checkup', 'Learn More'],
      stat: 'Early detection helped 83% of users catch issues before they became serious',
      devices: ['mobile', 'voice', 'watch', 'email'],
      borderColor: '#ef4444',
      bgColor: '#fef2f2'
    },
    {
      id: 3,
      urgency: 'informational' as const,
      label: 'Community Health Insight',
      sublabel: 'Diabetes Management Tip',
      icon: '🍽️',
      message: "Your CGM shows breakfast is your highest glucose spike time (avg 145 mg/dL). Post-lunch and dinner stay under 130. Community insight: 847 users with prediabetes who shifted breakfast carbs to lunch dropped A1C by avg 0.3-0.4 points.",
      actions: ['Try 2-Week Experiment', 'Dismiss'],
      stat: 'Data-driven adjustments helped 78% reverse prediabetes',
      devices: ['mobile'],
      borderColor: '#3b82f6',
      bgColor: '#eff6ff'
    }
  ];

  

  return (
    <section style={{
      backgroundColor: '#f8fafc',
      padding: '80px 24px 60px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decorations */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(239, 68, 68, 0.06) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-150px',
        left: '-150px',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: '60px',
          position: 'relative'
        }}>
          
          {/* Left: Title & Description */}
          <div style={{ minWidth: '400px', maxWidth: '400px' }}>
            {/* Trust Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)',
              padding: '8px 20px',
              borderRadius: '20px',
              marginBottom: '24px',
              boxShadow: '0 4px 16px rgba(252, 165, 165, 0.3)'
            }}>
              <Sparkles size={18} color="white" />
              <span style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '1px',
                color: 'white'
              }}>
                Beyond Conversations
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(28px, 3vw, 36px)',
              fontWeight: 600,
              color: '#1d1d1f',
              marginBottom: '16px',
              lineHeight: 1.2
            }}>
              Sagaa Monitors your Health.
              <span style={{
                background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #f87171 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
                display: 'block'
              }}>
                You Live your Life
              </span>
            </h2>

            <p style={{
              fontSize: '1rem',
              color: '#475569',
              lineHeight: 1.7,
              marginBottom: '32px'
            }}>
              While other health apps demand your attention, Sagaa quietly monitors, alerts, and acts—so you can focus on your family, your work, your creativity, and the life you want to build.
            </p>

            {/* Omnichannel Device Visual */}
            <div style={{
              background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)',
              borderRadius: '16px',
              padding: '20px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
            }}>
              <h4 style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'white',
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                Notifications Delivered Everywhere You Are
              </h4>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px'
              }}>
                {/* Mobile */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    backgroundColor: '#fef2f2',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #fecaca'
                  }}>
                    <Smartphone size={20} color="#ef4444" />
                  </div>
                  <span style={{ fontSize: '11px', color: 'white', fontWeight: 500 }}>
                    Mobile
                  </span>
                </div>

                {/* Voice */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    backgroundColor: '#eff6ff',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #bfdbfe'
                  }}>
                    <Speaker size={20} color="#3b82f6" />
                  </div>
                  <span style={{ fontSize: '11px', color: 'white', fontWeight: 500 }}>
                    Voice
                  </span>
                </div>

                {/* Watch */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #bbf7d0'
                  }}>
                    <Watch size={20} color="#10b981" />
                  </div>
                  <span style={{ fontSize: '11px', color: 'white', fontWeight: 500 }}>
                    Watch
                  </span>
                </div>

                {/* Desktop */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    backgroundColor: '#d1fae5',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #e9d5ff'
                  }}>
                    <Monitor size={20} color="#8b5cf6" />
                  </div>
                  <span style={{ fontSize: '11px', color: 'white', fontWeight: 500 }}>
                    Desktop
                  </span>
                </div>

                {/* Email */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    backgroundColor: '#d1fae5',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #fde68a'
                  }}>
                    <Mail size={20} color="#f59e0b" />
                  </div>
                  <span style={{ fontSize: '11px', color: 'white', fontWeight: 500 }}>
                    Email
                  </span>
                </div>


                
              </div>

              <p style={{
                fontSize: '12px',
                color: 'white',
                textAlign: 'center',
                marginTop: '16px',
                lineHeight: 1.5
              }}>
                Critical alerts reach you everywhere. Customize preferences for routine notifications.
              </p>
            </div>
          </div>

          {/* Right: Notification Cards */}
          <div style={{ 
            flex: 1, 
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {notifications.map((notification) => (
              <div key={notification.id} style={{
                backgroundColor: notification.bgColor,
                borderLeft: `4px solid ${notification.borderColor}`,
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
              }}>
                {/* Category Label */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '4px 12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '12px',
                  marginBottom: '12px',
                  alignSelf: 'flex-start'
                }}>
                  <span style={{ fontSize: '10px', fontWeight: 600, color: notification.borderColor, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                    {notification.label}
                  </span>
                </div>

                {/* Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '16px'
                }}>
                  <span style={{ fontSize: '28px' }}>{notification.icon}</span>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#1d1d1f',
                    margin: 0,
                    lineHeight: '1.3'
                  }}>
                    {notification.sublabel}
                  </h3>
                </div>

                {/* Message */}
                <p style={{
                  fontSize: '14px',
                  color: '#374151',
                  lineHeight: '1.7',
                  marginBottom: '20px',
                  flex: 1
                }}>
                  {notification.message}
                </p>

                {/* Action Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap',
                  marginBottom: '12px'
                }}>
                  {notification.actions.map((action, index) => (
                    <button
                      key={index}
                      style={{
                        padding: '10px 18px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: 500,
                        border: index === 0 ? 'none' : `1px solid ${notification.borderColor}`,
                        backgroundColor: index === 0 ? notification.borderColor : 'white',
                        color: index === 0 ? 'white' : notification.borderColor,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (index === 0) {
                          e.currentTarget.style.opacity = '0.9';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                        } else {
                          e.currentTarget.style.backgroundColor = notification.bgColor;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (index === 0) {
                          e.currentTarget.style.opacity = '1';
                          e.currentTarget.style.transform = 'translateY(0)';
                        } else {
                          e.currentTarget.style.backgroundColor = 'white';
                        }
                      }}
                    >
                      {action}
                    </button>
                  ))}
                  {/* Ask Sagaa Button */}
                  <button style={{
                    padding: '10px 18px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 500,
                    border: `1px solid ${notification.borderColor}30`,
                    backgroundColor: 'white',
                    color: notification.borderColor,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${notification.borderColor}10`;
                    e.currentTarget.style.borderColor = notification.borderColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.borderColor = `${notification.borderColor}30`;
                  }}>
                    💬 Ask Sagaa
                  </button>
                </div>

                {/* Device Badges and Community Stat */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                 

                  {/* Community Stat */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '8px'
                  }}>
                    <CheckCircle size={14} color="#10b981" style={{ flexShrink: 0 }} />
                    <span style={{
                      fontSize: '12px',
                      color: '#047857',
                      fontStyle: 'italic',
                      lineHeight: '1.4'
                    }}>
                      {notification.stat}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default HealthcareProactiveGuardian;