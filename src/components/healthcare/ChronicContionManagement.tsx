export const ChronicConditionManagement = () => {
  return (
    <section style={{ padding: '80px 0', background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Hero Layout: Content Left, Benefits Right */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '60px', 
          alignItems: 'center',
          marginBottom: '80px'
        }}>
          {/* Left: Title and Description */}
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
               }}>Chronic illness.</span>{' '}
              <span style={{
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #f87171 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent'
              }}>Manage Confidently</span>
              </h2>
            <p style={{ fontSize: '1.25rem', color: '#64748b', marginBottom: '0', lineHeight: 1.6 }}>
              Transform chronic condition management from overwhelming to effortless. Sagaa connects your medications, device data, lifestyle, and community wisdom to optimize disease control and prevent complications.
            </p>
          </div>

          {/* Right: Key Benefits Cards - Same size as original left-side version */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                📊
              </div>
              <div>
                <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>
                  Real-Time Disease Control
                </h4>
                <p style={{ fontSize: '0.938rem', color: '#64748b', margin: 0 }}>
                  Continuous monitoring with CGMs, BP monitors, and wearables for instant insights
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                flexShrink: 0
              }}>
                💊
              </div>
              <div>
                <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>
                  Medication Optimization
                </h4>
                <p style={{ fontSize: '0.938rem', color: '#64748b', margin: 0 }}>
                  Track medication effectiveness and correlate with lifestyle factors
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
                👥
              </div>
              <div>
                <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>
                  Community Success Stories
                </h4>
                <p style={{ fontSize: '0.938rem', color: '#64748b', margin: 0 }}>
                  Learn what actually worked from people with similar conditions
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Condition-Specific Deep Dives */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          {/* Diabetes Management */}
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
            <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🩸</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '12px', color: '#0f172a' }}>
              Diabetes Management
            </h3>
            <p style={{ color: '#64748b', marginBottom: '20px', lineHeight: 1.6 }}>
              Comprehensive glucose control with CGM integration, meal pattern analysis, and exercise correlation.
            </p>

            {/* Glucose Trend Visualization */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a', marginBottom: '12px' }}>
                Your Glucose Patterns:
              </h4>
              <div style={{ 
                background: '#f8fafc', 
                borderRadius: '8px', 
                padding: '16px',
                marginBottom: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '100px', marginBottom: '12px' }}>
                  <div style={{ flex: 1, background: '#10b981', height: '55%', borderRadius: '4px 4px 0 0', position: 'relative' }}>
                    <span style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.75rem', color: '#64748b' }}>Mon</span>
                  </div>
                  <div style={{ flex: 1, background: '#10b981', height: '60%', borderRadius: '4px 4px 0 0', position: 'relative' }}>
                    <span style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.75rem', color: '#64748b' }}>Tue</span>
                  </div>
                  <div style={{ flex: 1, background: '#fbbf24', height: '72%', borderRadius: '4px 4px 0 0', position: 'relative' }}>
                    <span style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.75rem', color: '#64748b' }}>Wed</span>
                  </div>
                  <div style={{ flex: 1, background: '#10b981', height: '58%', borderRadius: '4px 4px 0 0', position: 'relative' }}>
                    <span style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.75rem', color: '#64748b' }}>Thu</span>
                  </div>
                  <div style={{ flex: 1, background: '#f59e0b', height: '85%', borderRadius: '4px 4px 0 0', position: 'relative' }}>
                    <span style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.75rem', color: '#64748b' }}>Fri</span>
                  </div>
                  <div style={{ flex: 1, background: '#10b981', height: '62%', borderRadius: '4px 4px 0 0', position: 'relative' }}>
                    <span style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.75rem', color: '#64748b' }}>Sat</span>
                  </div>
                  <div style={{ flex: 1, background: '#10b981', height: '52%', borderRadius: '4px 4px 0 0', position: 'relative' }}>
                    <span style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.75rem', color: '#64748b' }}>Sun</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', fontSize: '0.875rem', marginTop: '24px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#64748b', marginBottom: '4px' }}>Avg This Week</div>
                    <div style={{ fontWeight: 600, color: '#10b981' }}>118 mg/dL</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#64748b', marginBottom: '4px' }}>Time in Range</div>
                    <div style={{ fontWeight: 600, color: '#10b981' }}>87%</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#64748b', marginBottom: '4px' }}>Est. A1C</div>
                    <div style={{ fontWeight: 600, color: '#10b981' }}>5.8%</div>
                  </div>
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
                💬 Pattern Detected:
              </p>
              <p style={{ fontSize: '0.875rem', color: '#92400e', fontStyle: 'italic', margin: 0 }}>
                "Your Friday spike correlates with work stress (presentation day) and skipped lunch. Similar users found that packing lunch prevents this pattern."
              </p>
            </div>

            <div style={{ 
              background: '#f0f9ff', 
              borderRadius: '8px', 
              padding: '12px',
              fontSize: '0.813rem',
              color: '#1e40af'
            }}>
              <strong>Community Insight:</strong> 73% of users with prediabetes who addressed stress-eating patterns avoided progression to Type 2 diabetes.
            </div>
          </div>

          {/* Hypertension Management */}
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
            e.currentTarget.style.borderColor = '#ef4444';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'transparent';
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>❤️</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '12px', color: '#0f172a' }}>
              Hypertension Control
            </h3>
            <p style={{ color: '#64748b', marginBottom: '20px', lineHeight: 1.6 }}>
              Blood pressure optimization through home monitoring, medication tracking, and lifestyle correlation.
            </p>

            {/* BP Tracking */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a', marginBottom: '12px' }}>
                30-Day BP Trend:
              </h4>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: '8px',
                marginBottom: '16px'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '12px',
                  background: '#f0fdf4',
                  borderRadius: '8px'
                }}>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#0f172a' }}>Current Average</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#10b981' }}>122/78</div>
                  </div>
                  <div style={{ 
                    padding: '4px 12px',
                    background: '#10b981',
                    color: 'white',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}>
                    ✓ At Target
                  </div>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '12px',
                  background: '#f8fafc',
                  borderRadius: '8px'
                }}>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Before Medication</div>
                    <div style={{ fontSize: '1rem', fontWeight: 600, color: '#64748b' }}>142/88</div>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#10b981', fontWeight: 600 }}>
                    ↓ 20/10 mmHg
                  </div>
                </div>
              </div>

              <div style={{ 
                background: '#f8fafc',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '12px'
              }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a', marginBottom: '8px' }}>
                  Medication Effectiveness:
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <div style={{ flex: 1, background: '#e5e7eb', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '85%', background: '#10b981', height: '100%' }}></div>
                  </div>
                  <span style={{ fontSize: '0.813rem', fontWeight: 600, color: '#10b981' }}>85%</span>
                </div>
                <p style={{ fontSize: '0.813rem', color: '#64748b', margin: 0 }}>
                  Lisinopril 10mg working excellently. Readings in target range 92% of time.
                </p>
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
                "Your evening walks consistently lower your BP by 8-10 mmHg for 3-4 hours. This pattern means you could potentially discuss dose reduction with Dr. Chen at your next visit."
              </p>
            </div>
          </div>

          {/* Asthma/Respiratory */}
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
            e.currentTarget.style.borderColor = '#06b6d4';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'transparent';
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🫁</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '12px', color: '#0f172a' }}>
              Respiratory Health
            </h3>
            <p style={{ color: '#64748b', marginBottom: '20px', lineHeight: 1.6 }}>
              Asthma and COPD management with trigger identification, medication adherence, and environmental monitoring.
            </p>

            {/* Trigger Tracking */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a', marginBottom: '12px' }}>
                Identified Triggers:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  padding: '10px 12px',
                  background: '#fef2f2',
                  borderRadius: '6px'
                }}>
                  <span style={{ fontSize: '1rem' }}>🔴</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#0f172a' }}>High Pollen Days</div>
                    <div style={{ fontSize: '0.75rem', color: '#78716c' }}>85% correlation with symptoms</div>
                  </div>
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  padding: '10px 12px',
                  background: '#fef3c7',
                  borderRadius: '6px'
                }}>
                  <span style={{ fontSize: '1rem' }}>🟡</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#0f172a' }}>Cold Weather</div>
                    <div style={{ fontSize: '0.75rem', color: '#78716c' }}>62% correlation with symptoms</div>
                  </div>
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  padding: '10px 12px',
                  background: '#fef3c7',
                  borderRadius: '6px'
                }}>
                  <span style={{ fontSize: '1rem' }}>🟡</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#0f172a' }}>Exercise Intensity</div>
                    <div style={{ fontSize: '0.75rem', color: '#78716c' }}>48% correlation at high intensity</div>
                  </div>
                </div>
              </div>

              <div style={{ 
                background: '#f8fafc',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '12px'
              }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a', marginBottom: '8px' }}>
                  Inhaler Usage Pattern:
                </div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#10b981' }}>4</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Uses this week</div>
                  </div>
                  <div style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#3b82f6' }}>12</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Avg last month</div>
                  </div>
                  <div style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#10b981' }}>67%</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Improvement</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ 
              background: '#ecfccb', 
              borderRadius: '8px', 
              padding: '16px',
              borderLeft: '4px solid #84cc16'
            }}>
              <p style={{ fontSize: '0.875rem', color: '#365314', fontWeight: 500, marginBottom: '8px' }}>
                💬 Prevention Alert:
              </p>
              <p style={{ fontSize: '0.875rem', color: '#365314', fontStyle: 'italic', margin: 0 }}>
                "High pollen count expected tomorrow (8/10). Consider taking your preventive inhaler this evening and limiting outdoor activity during peak hours (10 AM - 4 PM)."
              </p>
            </div>
          </div>
        </div>

        {/* Cross-Vertical Intelligence Example */}
        <div style={{ 
          background: 'white', 
          borderRadius: '16px', 
          padding: '40px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '12px', color: '#0f172a' }}>
              Beyond Illness Management
            </h3>
            <p style={{ fontSize: '1.125rem', color: '#64748b', maxWidth: '800px', margin: '0 auto' }}>
              Sagaa connects your chronic conditions to everything else in your life for truly holistic management
            </p>
          </div>

          <div style={{ 
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
            borderRadius: '12px',
            padding: '32px',
            marginBottom: '24px'
          }}>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: '20px' }}>
              Real Scenario: Diabetes + Work + Fitness
            </h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '24px' }}>
              <div>
                <div style={{ 
                  width: '56px',
                  height: '56px',
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.75rem',
                  marginBottom: '12px'
                }}>
                  🩸
                </div>
                <h5 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '8px', color: '#0f172a' }}>Health Data</h5>
                <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                  Glucose spikes Friday afternoons (averaging 165 mg/dL vs. 120 other days)
                </p>
              </div>
              <div>
                <div style={{ 
                  width: '56px',
                  height: '56px',
                  background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.75rem',
                  marginBottom: '12px'
                }}>
                  📅
                </div>
                <h5 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '8px', color: '#0f172a' }}>Calendar Context</h5>
                <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                  Weekly team presentation scheduled every Friday at 2 PM (stress trigger)
                </p>
              </div>
              <div>
                <div style={{ 
                  width: '56px',
                  height: '56px',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.75rem',
                  marginBottom: '12px'
                }}>
                  🏃
                </div>
                <h5 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '8px', color: '#0f172a' }}>Activity Data</h5>
                <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                  Stress eating, no movement from desk between 11 AM - 3 PM on Fridays
                </p>
              </div>
            </div>

            <div style={{ 
              background: 'white',
              borderRadius: '8px',
              padding: '20px',
              borderLeft: '4px solid #3b82f6'
            }}>
              <p style={{ fontSize: '0.875rem', color: '#1e40af', fontWeight: 600, marginBottom: '12px' }}>
                💡 Sagaa's Integrated Recommendation:
              </p>
              <p style={{ fontSize: '0.938rem', color: '#1e3a8a', lineHeight: 1.6, marginBottom: '16px' }}>
                "Your Friday glucose spikes are caused by work stress (presentation) + stress-eating high-carb snacks + sedentary behavior. Here's a multi-vertical solution:"
              </p>
              
              {/* Stacked Recommendation Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ 
                  background: '#eff6ff', 
                  padding: '14px', 
                  borderRadius: '8px',
                  borderLeft: '3px solid #3b82f6'
                }}>
                  <div style={{ fontWeight: 600, color: '#1e40af', marginBottom: '4px', fontSize: '0.875rem' }}>
                    📅 Thursday prep:
                  </div>
                  <div style={{ color: '#1e3a8a', fontSize: '0.875rem', lineHeight: 1.5 }}>
                    I'll remind you to prepare presentation materials Thursday evening to reduce Friday stress
                  </div>
                </div>
                
                <div style={{ 
                  background: '#f0fdf4', 
                  padding: '14px', 
                  borderRadius: '8px',
                  borderLeft: '3px solid #10b981'
                }}>
                  <div style={{ fontWeight: 600, color: '#065f46', marginBottom: '4px', fontSize: '0.875rem' }}>
                    🍱 Meal planning:
                  </div>
                  <div style={{ color: '#064e3b', fontSize: '0.875rem', lineHeight: 1.5 }}>
                    I've added "pack lunch" to your Thursday night routine and can order from your favorite healthy meal prep service
                  </div>
                </div>
                
                <div style={{ 
                  background: '#fef3c7', 
                  padding: '14px', 
                  borderRadius: '8px',
                  borderLeft: '3px solid #f59e0b'
                }}>
                  <div style={{ fontWeight: 600, color: '#92400e', marginBottom: '4px', fontSize: '0.875rem' }}>
                    🚶 Movement breaks:
                  </div>
                  <div style={{ color: '#78350f', fontSize: '0.875rem', lineHeight: 1.5 }}>
                    I'll send calendar reminders for 10-minute walks at 12 PM and 2:30 PM (post-presentation)
                  </div>
                </div>
                
                <div style={{ 
                  background: '#faf5ff', 
                  padding: '14px', 
                  borderRadius: '8px',
                  borderLeft: '3px solid #8b5cf6'
                }}>
                  <div style={{ fontWeight: 600, color: '#6b21a8', marginBottom: '4px', fontSize: '0.875rem' }}>
                    👥 Community insight:
                  </div>
                  <div style={{ color: '#6b21a8', fontSize: '0.875rem', lineHeight: 1.5 }}>
                    78% of users with similar patterns found that a 15-minute pre-presentation walk reduced stress-related glucose spikes by 30%
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        {/* Sagaa Advantage Section */}
        <div style={{ 
          background: 'white', 
          borderRadius: '16px', 
          padding: '32px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          marginTop: '48px'
        }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '24px', textAlign: 'center', color: '#0f172a' }}>
            What Makes Sagaa Different
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
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
                🔗
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '4px', color: '#0f172a' }}>
                  Holistic Context
                </h4>
                <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                  Connects disease management to work, family, budget, and lifestyle
                </p>
              </div>
            </div>

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
                📈
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '4px', color: '#0f172a' }}>
                  Real-Time Intelligence
                </h4>
                <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                  Continuous device data provides instant insights and alerts
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
                👥
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '4px', color: '#0f172a' }}>
                  Community Wisdom
                </h4>
                <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                  Learn from thousands who've successfully managed similar conditions
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
                🎯
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '4px', color: '#0f172a' }}>
                  Personalized Actions
                </h4>
                <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                  Recommendations tailored to YOUR patterns, not generic advice
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};