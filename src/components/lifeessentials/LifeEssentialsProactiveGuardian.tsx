import { Smartphone, Speaker, Watch, Monitor, Mail, CheckCircle, Sparkles } from 'lucide-react';

export const LifeEssentialsProactiveGuardian = () => {
  const notifications = [
    {
      id: 1,
      urgency: 'critical' as const,
      label: 'Predictive Maintenance Alert',
      sublabel: 'Critical: Equipment Failure Prevention',
      icon: '🔧',
      message: "Your water heater is 14 years old—82% fail by year 15. Winter arrives in 6 weeks, and emergency replacements cost 30% more. I found three community-verified plumbers: $6,500-8,500 installed. Your emergency fund has $8,200. Community data: 82% who planned replacements saved $1,200+ versus emergency calls.",
      actions: ['Get Quotes', 'Review Options'],
      stat: '87% of users prevented emergency repairs with predictive maintenance alerts',
      devices: ['mobile', 'voice', 'watch', 'email'],
      borderColor: '#f59e0b',
      bgColor: '#fffbeb'
    },
    {
      id: 2,
      urgency: 'critical' as const,
      label: 'Emergency Preparedness',
      sublabel: 'Weather Alert: Storm System Approaching',
      icon: '⛈️',
      message: "Severe storm forecast in 48 hours (70% chance, winds 45+ mph). Your emergency kit audit shows: batteries expired (last replaced 2021), flashlight missing, first aid supplies low. I can order replacement kit ($47, arrives tomorrow) or individual items ($32, arrives Thursday). Your basement has water seepage history—sump pump last serviced 18 months ago.",
      actions: ['Order Emergency Kit', 'Schedule Pump Service'],
      stat: '91% of prepared households avoided storm-related damage',
      devices: ['mobile', 'voice', 'email'],
      borderColor: '#ef4444',
      bgColor: '#fef2f2'
    },
    {
      id: 3,
      urgency: 'informational' as const,
      label: 'Family Coordination Opportunity',
      sublabel: 'Schedule Optimization Detected',
      icon: '📅',
      message: "Next Tuesday: Tommy's orthodontist (3:15 PM, downtown), your car oil change (due within 500 miles), and Sarah's pediatric checkup (2:45 PM, same medical complex as orthodontist). I found an auto service 0.3 miles from the medical building—drop off at 2:30 PM, walk to appointments, pickup at 4:30 PM. Saves 47 minutes and $8 in gas versus separate trips.",
      actions: ['Optimize Schedule', 'Review Calendar'],
      stat: 'Smart coordination saves families 6+ hours monthly',
      devices: ['mobile', 'email'],
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
        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-150px',
        left: '-150px',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
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
              boxShadow: '0 4px 16px rgba(245, 158, 11, 0.3)'
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
              Sagaa manages your essentials.
              <span style={{
                background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #fbbf24 100%)',
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
              While other home management apps wait for you to remember tasks, Sagaa predicts needs, prevents problems, and coordinates your household—so you can focus on family, work, and the moments that matter.
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
                Life Alerts Delivered Everywhere
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
                    backgroundColor: '#fef3c7',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #fde68a'
                  }}>
                    <Smartphone size={20} color="#f59e0b" />
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
                    backgroundColor: '#dbeafe',
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
                    backgroundColor: '#d1fae5',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #a7f3d0'
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
                    backgroundColor: '#fae8ff',
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
                    backgroundColor: '#fffbeb',
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
                Critical household alerts reach you instantly. Customize notification preferences for routine insights.
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

export default LifeEssentialsProactiveGuardian;
