import Title_Image from '../../assets/Preventative_care_Image.jpg';

export const PreventativeCare = () => {
  // Preventative Care Section
  return (
    <>
      {/* Preventive Care Section - Enhanced */}
      <section style={{ padding: '80px 0', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          {/* Hero Layout: Image Left, Content Right */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '60px', 
            alignItems: 'center',
            marginBottom: '80px'
          }}>
            {/* Left: Hero Image */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img 
                src={Title_Image}
                alt="Preventive Care Intelligence - DNA and health screening visualization"
                style={{ 
                  width: '100%', 
                  maxWidth: '600px',
                  height: 'auto',
                  borderRadius: '16px'
                }}
              />
            </div>

            {/* Right: Title and Description */}
            <div>
              
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
               }}>Hidden Risks.</span>{' '}
              <span style={{
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #f87171 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent'
              }}>Preventative Care</span>
              </h2>
              <p style={{ fontSize: '1.25rem', color: '#64748b', marginBottom: '32px', lineHeight: 1.6 }}>
                Preventative and proactive health management powered by your medical history, device data, and community insights. Sagaa helps you stay ahead of health issues with intelligent preventive care reminders and personalized guidance.
              </p>
              
              {/* Key Benefits List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    flexShrink: 0
                  }}>
                    📅
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>
                      Age-Appropriate Screenings
                    </h4>
                    <p style={{ fontSize: '0.938rem', color: '#64748b', margin: 0 }}>
                      Personalized screening schedules based on your age, gender, and family history
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    flexShrink: 0
                  }}>
                    ⚠️
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>
                      Intelligent Risk Assessment
                    </h4>
                    <p style={{ fontSize: '0.938rem', color: '#64748b', margin: 0 }}>
                      Continuous analysis combining family history, lifestyle, and health metrics
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    flexShrink: 0
                  }}>
                    🔍
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>
                      Early Warning Detection
                    </h4>
                    <p style={{ fontSize: '0.938rem', color: '#64748b', margin: 0 }}>
                      AI-powered pattern recognition to identify concerning trends early
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Preventive Care Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px', marginBottom: '48px' }}>
            {/* Age-Appropriate Screenings */}
            <div style={{ 
              background: 'white', 
              borderRadius: '16px', 
              padding: '32px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              border: '2px solid transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = '#3b82f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'transparent';
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>📅</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '12px', color: '#0f172a' }}>
                Age-Appropriate Screenings
              </h3>
              <p style={{ color: '#64748b', marginBottom: '20px', lineHeight: 1.6 }}>
                Personalized screening schedules based on your age, gender, family history, and current health status.
              </p>
              
              {/* Screening Timeline */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '12px',
                  background: '#f8fafc',
                  borderRadius: '8px',
                  marginBottom: '8px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.25rem' }}>✅</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Annual Physical</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>Up to date</span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '12px',
                  background: '#fef3c7',
                  borderRadius: '8px',
                  marginBottom: '8px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.25rem' }}>⚠️</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Mammogram</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: 600 }}>Due next month</span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '12px',
                  background: '#f8fafc',
                  borderRadius: '8px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.25rem' }}>📋</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Colonoscopy</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Due in 2 years</span>
                </div>
              </div>

              <div style={{ 
                background: '#f0f9ff', 
                borderRadius: '8px', 
                padding: '16px',
                borderLeft: '4px solid #3b82f6'
              }}>
                <p style={{ fontSize: '0.875rem', color: '#1e40af', fontWeight: 500, marginBottom: '8px' }}>
                  💬 Sagaa Insight:
                </p>
                <p style={{ fontSize: '0.875rem', color: '#1e40af', fontStyle: 'italic', margin: 0 }}>
                  "You're turning 40 next month. With your family history of breast cancer (maternal aunt at 44), guidelines recommend starting mammograms now. Your insurance covers screening at 100%. Should I help you schedule?"
                </p>
              </div>
            </div>

            {/* Risk Assessment */}
            <div style={{ 
              background: 'white', 
              borderRadius: '16px', 
              padding: '32px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              border: '2px solid transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = '#f59e0b';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'transparent';
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>⚠️</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '12px', color: '#0f172a' }}>
                Intelligent Risk Assessment
              </h3>
              <p style={{ color: '#64748b', marginBottom: '20px', lineHeight: 1.6 }}>
                Continuous analysis combining family history, lifestyle data, and health metrics to identify emerging risks.
              </p>

              {/* Risk Factors */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a', marginBottom: '12px' }}>
                  Current Risk Factors:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    padding: '8px 12px',
                    background: '#fef3c7',
                    borderRadius: '6px'
                  }}>
                    <span style={{ fontSize: '1rem' }}>⬆️</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.813rem', fontWeight: 500, color: '#0f172a' }}>Resting Heart Rate</div>
                      <div style={{ fontSize: '0.75rem', color: '#78716c' }}>+15% over 3 months</div>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: 600 }}>Monitor</span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    padding: '8px 12px',
                    background: '#fef2f2',
                    borderRadius: '6px'
                  }}>
                    <span style={{ fontSize: '1rem' }}>🔴</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.813rem', fontWeight: 500, color: '#0f172a' }}>Family History</div>
                      <div style={{ fontSize: '0.75rem', color: '#78716c' }}>Diabetes, Heart Disease</div>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 600 }}>High</span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    padding: '8px 12px',
                    background: '#f0fdf4',
                    borderRadius: '6px'
                  }}>
                    <span style={{ fontSize: '1rem' }}>✅</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.813rem', fontWeight: 500, color: '#0f172a' }}>Activity Level</div>
                      <div style={{ fontSize: '0.75rem', color: '#78716c' }}>Meeting weekly goals</div>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>Good</span>
                  </div>
                </div>
              </div>

              <div style={{ 
                background: '#fef3c7', 
                borderRadius: '8px', 
                padding: '16px',
                borderLeft: '4px solid #f59e0b'
              }}>
                <p style={{ fontSize: '0.875rem', color: '#92400e', fontWeight: 500, marginBottom: '8px' }}>
                  💬 Sagaa Recommendation:
                </p>
                <p style={{ fontSize: '0.875rem', color: '#92400e', fontStyle: 'italic', margin: 0 }}>
                  "Your resting heart rate increase + family history suggests cardiac screening. Your insurance covers preventive cardiology at 100%. I can schedule with Dr. Kumar who specializes in preventive care."
                </p>
              </div>
            </div>

            {/* Early Warning Detection */}
            <div style={{ 
              background: 'white', 
              borderRadius: '16px', 
              padding: '32px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              border: '2px solid transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = '#10b981';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'transparent';
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🔍</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '12px', color: '#0f172a' }}>
                Pattern-Based Early Detection
              </h3>
              <p style={{ color: '#64748b', marginBottom: '20px', lineHeight: 1.6 }}>
                AI-powered pattern recognition across health metrics to identify concerning trends before symptoms appear.
              </p>

              {/* Trend Analysis */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a', marginBottom: '12px' }}>
                  6-Month Glucose Trend:
                </h4>
                <div style={{ 
                  background: '#f8fafc', 
                  borderRadius: '8px', 
                  padding: '16px',
                  marginBottom: '12px'
                }}>
                  {/* Simple trend visualization */}
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '80px', marginBottom: '12px' }}>
                    <div style={{ flex: 1, background: '#10b981', height: '45%', borderRadius: '4px 4px 0 0' }}></div>
                    <div style={{ flex: 1, background: '#10b981', height: '50%', borderRadius: '4px 4px 0 0' }}></div>
                    <div style={{ flex: 1, background: '#fbbf24', height: '60%', borderRadius: '4px 4px 0 0' }}></div>
                    <div style={{ flex: 1, background: '#fbbf24', height: '70%', borderRadius: '4px 4px 0 0' }}></div>
                    <div style={{ flex: 1, background: '#f59e0b', height: '80%', borderRadius: '4px 4px 0 0' }}></div>
                    <div style={{ flex: 1, background: '#f59e0b', height: '90%', borderRadius: '4px 4px 0 0' }}></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b' }}>
                    <span>Jan</span>
                    <span>Jun</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', fontSize: '0.875rem' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#64748b', marginBottom: '4px' }}>Starting</div>
                    <div style={{ fontWeight: 600, color: '#10b981' }}>95 mg/dL</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#64748b', marginBottom: '4px' }}>Current</div>
                    <div style={{ fontWeight: 600, color: '#f59e0b' }}>108 mg/dL</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#64748b', marginBottom: '4px' }}>Trend</div>
                    <div style={{ fontWeight: 600, color: '#f59e0b' }}>↗️ Rising</div>
                  </div>
                </div>
              </div>

              <div style={{ 
                background: '#fef3c7', 
                borderRadius: '8px', 
                padding: '16px',
                borderLeft: '4px solid #f59e0b',
                marginBottom: '12px'
              }}>
                <p style={{ fontSize: '0.875rem', color: '#92400e', fontWeight: 500, marginBottom: '8px' }}>
                  🚨 Early Warning:
                </p>
                <p style={{ fontSize: '0.875rem', color: '#92400e', fontStyle: 'italic', margin: 0 }}>
                  {"Your fasting glucose is trending into prediabetic range (>100 mg/dL). You're at 108 mg/dL, up from 95 six months ago. Let's take action now to prevent Type 2 diabetes."}
                </p>
              </div>

              <div style={{ 
                background: '#f0f9ff', 
                borderRadius: '8px', 
                padding: '12px',
                fontSize: '0.813rem',
                color: '#1e40af'
              }}>
                <strong>Community Success:</strong> 73% of users who addressed prediabetes in early stages avoided progression to Type 2 diabetes through lifestyle changes.
              </div>
            </div>
          </div>

          {/* Preventive Care Benefits */}
          {/* Preventive Care Benefits - Compact */}
          <div style={{ 
            background: 'white', 
            borderRadius: '16px', 
            padding: '32px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '24px', textAlign: 'center', color: '#0f172a' }}>
              Why Preventive Care Matters
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  flexShrink: 0
                }}>
                  ❤️
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '4px', color: '#0f172a' }}>
                    Better Outcomes
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                    Early detection leads to more treatment options and better success rates
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  flexShrink: 0
                }}>
                  😌
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '4px', color: '#0f172a' }}>
                    Peace of Mind
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                    Stay informed about your health status before problems develop
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  flexShrink: 0
                }}>
                  💰
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '4px', color: '#0f172a' }}>
                    Lower Healthcare Costs
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                    Preventive care reduces long-term healthcare spending by catching trends early
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  flexShrink: 0
                }}>
                  ⏱️
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '4px', color: '#0f172a' }}>
                    Time Savings
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                    Automated scheduling and smart reminders save hours of coordination
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};