import HealthDeviceImg from '../../assets/Health_Wearables.jpg';
import SagaaIcon from '../../assets/sagaa_48x48.png';
import React, { useState, useEffect } from 'react';
import { Heart, Activity, Droplet, Moon, CheckCircle, TrendingDown, TrendingUp, Users, Award } from 'lucide-react';

interface HealthMetricCardProps {
  icon: any;
  title: string;
  value: number | string;
  unit: string;
  trend: string;
  color: string;
  improvement?: string;
  delay: number;
}

export const SmartDeviceIntegration = () => {
  const [heartRate, setHeartRate] = useState(0);
  const [bpSystolic, setBpSystolic] = useState(0);
  const [bpDiastolic, setBpDiastolic] = useState(0);

  useEffect(() => {
    const heartRateTimer = setTimeout(() => {
      let current = 0;
      const interval = setInterval(() => {
        current += 2;
        setHeartRate(current);
        if (current >= 68) clearInterval(interval);
      }, 30);
    }, 300);

    const bpTimer = setTimeout(() => {
      let sys = 0;
      let dia = 0;
      const interval = setInterval(() => {
        sys += 3;
        dia += 2;
        setBpSystolic(Math.min(sys, 122));
        setBpDiastolic(Math.min(dia, 76));
        if (sys >= 122) clearInterval(interval);
      }, 30);
    }, 500);

    return () => {
      clearTimeout(heartRateTimer);
      clearTimeout(bpTimer);
    };
  }, []);

  const HealthMetricCard: React.FC<HealthMetricCardProps> = ({ icon: Icon, title, value, unit, trend, color, improvement, delay }) => {
    const [show, setShow] = useState(false);
    
    useEffect(() => {
      setTimeout(() => setShow(true), delay);
    }, [delay]);

    return (
      <div 
        style={{
          padding: '14px',
          background: `linear-gradient(135deg, ${color}10 0%, #fff 100%)`,
          borderRadius: '12px',
          border: `1px solid ${color}30`,
          transform: show ? 'translateY(0)' : 'translateY(20px)',
          opacity: show ? 1 : 0,
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = `0 8px 16px ${color}20`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {improvement && (
          <div style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: '#34C759',
            color: 'white',
            fontSize: '9px',
            fontWeight: '600',
            padding: '2px 6px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
          }}>
            <TrendingUp size={10} />
            {improvement}
          </div>
        )}
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <Icon size={16} style={{ color }} />
          <span style={{ fontWeight: '500', color: '#1f2937', fontSize: '12px' }}>{title}</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '6px' }}>
          <div style={{ fontSize: '24px', fontWeight: '600', color }}>
            {value}
          </div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>{unit}</div>
        </div>
        
        {trend && (
          <div style={{ 
            fontSize: '11px', 
            color: '#6b7280',
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
          }}>
            <CheckCircle size={11} style={{ color: '#34C759' }} />
            {trend}
          </div>
        )}
      </div>
    );
  };

  return (
    <section style={{
      background: '#f9fafb',
      color: '#1d1d1f',
      padding: '80px 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '5%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(109, 40, 217, 0.05) 0%, transparent 70%)',
        borderRadius: '50%',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '10%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(52, 199, 89, 0.05) 0%, transparent 70%)',
        borderRadius: '50%',
      }} />

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          @keyframes slideIn {
            from { transform: translateX(-20px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>

      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 24px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '60px',
          alignItems: 'start',
        }}>
          {/* LEFT COLUMN */}
          <div style={{ animation: 'slideIn 0.8s ease-out' }}>
            <h2 style={{
              fontWeight: '100',
              color: '#6d28d9',
              marginBottom: '24px',
              lineHeight: '1.3',
              fontSize: 'clamp(36px, 4vw, 56px)',
              paddingBottom: '0.1em',
            }}>
              <span style={{ 
                 color: '#1d1d1f',
                 backgroundColor: 'transparent'
             }}>Your Devices.</span>{' '}
            <span style={{
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #f87171 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent'
            }}>One Intelligence.</span>
            </h2>
            
            <p style={{
              fontSize: 'clamp(18px, 2vw, 22px)',
              fontWeight: '300',
              marginBottom: '32px',
              color: '#374151',
              lineHeight: '1.6',
            }}>
              Your devices generate thousands of data points daily. Sagaa transforms them into insights that actually change your health outcomes—detecting patterns weeks before your doctor would, preventing issues before they become expensive.
            </p>

            {/* Sagaa Insight Card */}
            <div style={{
              background: 'white',
              borderRadius: '18px',
              boxShadow: '0 4px 24px rgba(160, 160, 255, 0.08)',
              padding: '32px',
              marginBottom: '24px',
              border: '1px solid transparent',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#a78bfa30';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(160, 160, 255, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(160, 160, 255, 0.08)';
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom: '1px solid #f3f4f6',
              }}>
                <img 
                  src={SagaaIcon}
                  alt="Sagaa"
                  style={{ width: '28px', height: '28px' }}
                />
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280' }}>Sagaa Insight</div>
                <div style={{
                  marginLeft: 'auto',
                  fontSize: '11px',
                  color: '#34C759',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: '#34C75910',
                  padding: '4px 10px',
                  borderRadius: '12px',
                }}>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px',
              }}>
                <Heart size={24} style={{ color: '#ef4444' }} />
                <h3 style={{ fontWeight: '500', fontSize: '22px', color: '#6d28d9', margin: 0 }}>
                  Real-Time Health Intelligence
                </h3>
              </div>

              <div style={{
                background: '#f9fafb',
                padding: '24px',
                paddingTop: '48px',
                borderRadius: '12px',
                borderLeft: '4px solid #34C759',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: '#34C759',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: '600',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}>
                  <Award size={14} />
                  14% Better
                </div>

                <p style={{ fontSize: '16px', color: '#374151', margin: 0, lineHeight: '1.6' }}>
                  Your home BP readings tell a success story: Week 1 averaged <strong>142/88</strong> (Stage 1 hypertension). Now at <strong style={{ color: '#34C759' }}>122/76</strong> (normal range)—a <strong style={{ color: '#34C759' }}>14% improvement</strong> in 8 weeks.
                  <br/><br/>
                  Your Lisinopril is working perfectly. I've prepared a comprehensive report for Dr. Chen showing <strong>95% of readings in target range</strong>, medication adherence at 98%, and correlations with your sleep patterns that explain the occasional spikes.
                </p>

                <div style={{ marginTop: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6b7280', marginBottom: '6px' }}>
                    <span>Progress to Goal</span>
                    <span style={{ fontWeight: '600', color: '#34C759' }}>95%</span>
                  </div>
                  <div style={{ height: '6px', background: '#f3f4f6', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{
                      width: '95%',
                      height: '100%',
                      background: 'linear-gradient(90deg, #34C759 0%, #22c55e 100%)',
                      transition: 'width 1s ease-out',
                    }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Community Wisdom Card */}
            <div style={{
              background: 'white',
              borderRadius: '18px',
              boxShadow: '0 4px 24px rgba(160, 160, 255, 0.08)',
              padding: '32px',
              border: '1px solid transparent',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#a78bfa30';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(160, 160, 255, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(160, 160, 255, 0.08)';
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom: '1px solid #f3f4f6',
              }}>
                  <img 
                    src={SagaaIcon}
                    alt="Sagaa"
                    style={{ width: '28px', height: '28px', borderRadius: '50%' }}
                  />
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280' }}>Community Insights</div>
                  <div style={{
                    marginLeft: 'auto',
                    fontSize: '11px',
                    color: '#6d28d9',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: '#6d28d910',
                    padding: '4px 10px',
                    borderRadius: '12px',
                  }}>
                    <Users size={12} />
                    2.3M users
                  </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px',
              }}>
                <TrendingDown size={24} style={{ color: '#6d28d9' }} />
                <h3 style={{ fontWeight: '500', fontSize: '20px', color: '#6d28d9', margin: 0 }}>
                  Community Insight
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{
                  padding: '16px',
                  background: '#f9fafb',
                  borderRadius: '12px',
                  borderLeft: '3px solid #6d28d9',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <div style={{
                      background: '#34C759',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: '600',
                      padding: '4px 8px',
                      borderRadius: '6px',
                    }}>
                      34% Faster
                    </div>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>Success Rate</span>
                  </div>
                  <p style={{ fontSize: '15px', color: '#374151', margin: 0, lineHeight: '1.5' }}>
                    Users with similar BP profiles found that monitoring <strong>twice daily</strong> (morning/evening) improved outcomes 34% faster than once-daily readings.
                  </p>
                </div>

                <div style={{
                  padding: '16px',
                  background: '#f9fafb',
                  borderRadius: '12px',
                  borderLeft: '3px solid #34C759',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <div style={{
                      background: '#6d28d9',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: '600',
                      padding: '4px 8px',
                      borderRadius: '6px',
                    }}>
                      89% Success
                    </div>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>Long-term Results</span>
                  </div>
                  <p style={{ fontSize: '15px', color: '#374151', margin: 0, lineHeight: '1.5' }}>
                    <strong>89% successfully reduced medication dosage</strong> within 6 months using this monitoring approach.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div>
            {/* Device Image */}
            <div style={{
              marginBottom: '24px',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(160, 160, 255, 0.12)',
            }}>
              <img
                src={HealthDeviceImg}
                alt="Connected health devices ecosystem"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </div>

            {/* Sagaa Health Dashboard */}
            <div style={{
              background: 'white',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 8px 32px rgba(160, 160, 255, 0.12)',
              border: '1px solid #f3f4f6',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '24px',
                paddingBottom: '16px',
                borderBottom: '1px solid #f3f4f6',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img 
                    src={SagaaIcon}
                    alt="Sagaa"
                    style={{ width: '40px', height: '40px' }}
                  />
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>Sagaa Health</div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Live Dashboard</div>
                  </div>
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#34C759',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#34C75915',
                  padding: '6px 12px',
                  borderRadius: '16px',
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    background: '#34C759',
                    borderRadius: '50%',
                    animation: 'pulse 2s infinite',
                  }}></div>
                  Syncing
                </div>
              </div>

              <h4 style={{ 
                fontSize: '16px', 
                fontWeight: '500', 
                color: '#6d28d9', 
                marginBottom: '20px',
              }}>
                Your Health Metrics
              </h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
                <HealthMetricCard
                  icon={Heart}
                  title="Heart Rate"
                  value={heartRate}
                  unit="BPM"
                  trend="Excellent"
                  color="#ef4444"
                  improvement="+5%"
                  delay={200}
                />

                <HealthMetricCard
                  icon={Activity}
                  title="Blood Pressure"
                  value={`${bpSystolic}/${bpDiastolic}`}
                  unit=""
                  trend="Normal ✓"
                  color="#34C759"
                  improvement="14%"
                  delay={400}
                />

                <HealthMetricCard
                  icon={Droplet}
                  title="Glucose"
                  value="94"
                  unit="mg/dL"
                  trend="Normal"
                  color="#f59e0b"
                  delay={600}
                />

                <HealthMetricCard
                  icon={Moon}
                  title="Sleep"
                  value="7.5"
                  unit="hrs"
                  trend="87/100"
                  color="#6d28d9"
                  improvement="+12%"
                  delay={800}
                />
              </div>

              <div style={{
                padding: '14px',
                background: 'linear-gradient(135deg, #f9fafb 0%, #ffffff 100%)',
                borderRadius: '12px',
                border: '1px solid #f3f4f6',
              }}>
                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '10px', fontWeight: '500' }}>
                  Connected Devices
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {[
                    { name: 'Apple Watch', time: '2m', status: 'active' },
                    { name: 'BP Monitor', time: '5m', status: 'active' },
                    { name: 'Oura Ring', time: '1h', status: 'synced' }
                  ].map((device, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '12px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{
                          width: '6px',
                          height: '6px',
                          background: device.status === 'active' ? '#34C759' : '#6b7280',
                          borderRadius: '50%',
                        }} />
                        <span style={{ color: '#1f2937', fontWeight: '500' }}>{device.name}</span>
                      </div>
                      <span style={{ color: '#6b7280' }}>{device.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartDeviceIntegration;