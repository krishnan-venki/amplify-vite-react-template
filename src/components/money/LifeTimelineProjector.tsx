
import { TrendingUp, AlertCircle } from 'lucide-react';
import  { useRef, useEffect, useState } from 'react';

export const LifeTimelineProjector = () => {
  const graphAreaRef = useRef<HTMLDivElement>(null);
  const [graphWidth, setGraphWidth] = useState(600); // default fallback

  useEffect(() => {
    function updateWidth() {
      if (graphAreaRef.current) {
        setGraphWidth(graphAreaRef.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Helper to scale X coordinates
  const scaleX = (x: number) => (x / 600) * graphWidth;

  // Paths recalc based on graphWidth
  const basePath = `M 0 180 Q ${scaleX(150)} 140, ${scaleX(300)} 80 T ${scaleX(600)} 20`;
  const baseFillPath = `M 0 180 Q ${scaleX(150)} 140, ${scaleX(300)} 80 T ${scaleX(600)} 20 L ${scaleX(600)} 240 L 0 240 Z`;
  const housePath = `M 0 180 Q ${scaleX(120)} 152, ${scaleX(240)} 130 Q ${scaleX(250)} 135, ${scaleX(260)} 138 Q ${scaleX(380)} 110, ${scaleX(600)} 45`;
  const houseFillPath = `M 0 180 Q ${scaleX(120)} 152, ${scaleX(240)} 130 Q ${scaleX(250)} 135, ${scaleX(260)} 138 Q ${scaleX(380)} 110, ${scaleX(600)} 45 L ${scaleX(600)} 240 L 0 240 Z`;

  return (
    <section style={{
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #d1fae5 100%)',
      padding: '80px 24px',
      margin: '0',
      minHeight: '100vh'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{
            fontWeight: '100',
            marginBottom: '24px',
            lineHeight: '1.2',
            fontSize: 'clamp(36px, 4vw, 56px)',
          }}>
            <span style={{ color: '#1d1d1f' }}>Your Financial Future.</span>{' '}
            <span style={{
              background: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}>See It. Shape It. Own It.</span>
          </h2>

          <p style={{
            fontSize: '1.15rem',
            color: '#6b7280',
            lineHeight: '1.7',
            maxWidth: '900px',
            margin: '0 auto 32px'
          }}>
            Model your entire financial life from today through retirement. See how every decision buying a home, having children, career changes shapes your 40-year trajectory.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {[
              'Life Milestone Modeling',
              'Industry Standard Simulation',
              'Retirement Confidence Score',
              'What-If Scenarios',
              'Community-Validated',
              '40-Year Projections'
            ].map((feature, idx) => (
              <div key={idx} style={{
                background: 'white',
                padding: '10px 20px',
                borderRadius: '24px',
                fontSize: '0.9rem',
                fontWeight: 500,
                color: '#059669',
                border: '2px solid #d1fae5',
                boxShadow: '0 2px 8px rgba(5, 150, 105, 0.1)'
              }}>
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '80px' }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '400px 1fr',
            gap: '32px',
            alignItems: 'start'
          }}>
            
            <div>
              <div style={{
                display: 'inline-block',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '1.5px',
                color: '#059669',
                marginBottom: '16px',
                textTransform: 'uppercase'
              }}>
                Interactive Life Modeling
              </div>
              
              <p style={{
                fontSize: '1.05rem',
                color: '#6b7280',
                lineHeight: '1.7',
                margin: 0
              }}>
                Drag life events along your timeline and watch your entire financial future recalculate in real-time. Every milestone from buying a house to having children to retiring instantly shows its 40-year impact on your net worth trajectory.
              </p>

              
            </div>

            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '28px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              border: '2px solid #10b98120'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginBottom: '24px',
                paddingBottom: '16px',
                borderBottom: '2px solid #f3f4f6'
              }}>
                <div>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#065f46', margin: 0 }}>
                    Your Financial Future
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: '4px 0 0 0' }}>
                    Net worth projection through retirement
                  </p>
                </div>
              </div>

              {/* Current vs Future Net Worth */}
              <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px', fontWeight: 600 }}>
                    CURRENT NET WORTH
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1e293b' }}>
                    $325,472
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#10b981', marginTop: '2px' }}>
                    Age 32 • Today
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px', fontWeight: 600 }}>
                    PROJECTED AT 65
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#10b981' }}>
                    $2.1M
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#10b981', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <TrendingUp size={14} />
                    +$1,774,528 (545%)
                  </div>
                </div>
              </div>

              {/* Graph Visualization */}
              <div ref={graphAreaRef} style={{ position: 'relative', height: '280px', marginBottom: '24px' }}>
                {/* Y-axis labels */}
                <div style={{ position: 'absolute', left: '0', top: '0', bottom: '40px', width: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  {['$2.5M', '$2M', '$1.5M', '$1M', '$500K', '$0'].map((label, idx) => (
                    <div key={idx} style={{ fontSize: '0.7rem', color: '#9ca3af', textAlign: 'right' }}>
                      {label}
                    </div>
                  ))}
                </div>

                {/* Graph area */}
                <div style={{ position: 'absolute', left: '60px', right: '0', top: '0', bottom: '40px' }}>
                  {/* Grid lines */}
                  <svg style={{ position: 'absolute', width: '100%', height: '100%' }}>
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <line
                        key={i}
                        x1="0"
                        y1={`${i * 20}%`}
                        x2="100%"
                        y2={`${i * 20}%`}
                        stroke="#f3f4f6"
                        strokeWidth="1"
                      />
                    ))}
                  </svg>

                  {/* Base trajectory (no milestones) */}
                  <svg style={{ position: 'absolute', width: '100%', height: '100%' }}>
                    <defs>
                      <linearGradient id="baseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 0.1 }} />
                        <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 0 }} />
                      </linearGradient>
                    </defs>
                    <path
                      d={basePath}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                      strokeDasharray="6,4"
                      opacity="0.5"
                    />
                    <path
                      d={baseFillPath}
                      fill="url(#baseGradient)"
                    />
                  </svg>

                  {/* With house purchase trajectory */}
                  <svg style={{ position: 'absolute', width: '100%', height: '100%' }}>
                    <defs>
                      <linearGradient id="milestoneGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.15 }} />
                        <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0 }} />
                      </linearGradient>
                    </defs>
                    {/* Path shows: smooth growth, then dip at house (40%), then recovery */}
                    <path
                      d={housePath}
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                    />
                    <path
                      d={houseFillPath}
                      fill="url(#milestoneGradient)"
                    />
                  </svg>

                  {/* Milestone marker - House Purchase at Age 40 */}
                  <div style={{
                    position: 'absolute',
                    left: '40%',
                    top: '52%',
                    transform: 'translate(-50%, -50%)'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'white',
                      border: '3px solid #f59e0b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                      cursor: 'pointer'
                    }}>
                      🏠
                    </div>
                    <div style={{
                      position: 'absolute',
                      top: '-65px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      whiteSpace: 'nowrap'
                    }}>
                      <div style={{
                        background: '#f59e0b',
                        color: 'white',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        marginBottom: '4px',
                        textAlign: 'center'
                      }}>
                        2033 (Age 40)
                      </div>
                      <div style={{
                        background: 'white',
                        padding: '6px 10px',
                        borderRadius: '6px',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        color: '#1e293b',
                        border: '1px solid #f59e0b',
                        textAlign: 'center',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}>
                        House Purchase
                        <div style={{ fontSize: '0.65rem', color: '#64748b', marginTop: '2px' }}>
                          $100K down
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Current position marker */}
                  <div style={{
                    position: 'absolute',
                    left: '2%',
                    top: '73%',
                    transform: 'translate(-50%, -50%)'
                  }}>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: '#10b981',
                      border: '3px solid white',
                      boxShadow: '0 2px 8px rgba(16, 185, 129, 0.4)'
                    }} />
                  </div>

                  // ...existing code...
                </div>

                {/* X-axis labels */}
                <div style={{ position: 'absolute', left: '60px', right: '0', bottom: '0', height: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {['TODAY\nAge 32', 'AGE 40', 'AGE 50', 'AGE 60', 'AGE 65'].map((label, idx) => (
                    <div key={idx} style={{ fontSize: '0.7rem', color: '#9ca3af', textAlign: 'center', whiteSpace: 'pre-line', lineHeight: '1.3' }}>
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', paddingTop: '16px', borderTop: '1px solid #f3f4f6' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '24px', height: '3px', background: '#10b981', opacity: 0.5, borderRadius: '2px' }} />
                  <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>Base Projection</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '24px', height: '3px', background: '#3b82f6', borderRadius: '2px' }} />
                  <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>With House Purchase</span>
                </div>
              </div>

              {/* Impact Summary */}
              <div style={{
                background: '#eff6ff',
                borderRadius: '10px',
                padding: '14px',
                border: '2px solid #3b82f6'
              }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1e40af', marginBottom: '8px' }}>
                  💡 House Purchase Impact
                </div>
                <div style={{ fontSize: '0.8rem', color: '#1e3a8a', lineHeight: 1.5 }}>
                  Buying a home at age 40 ($100K down payment) creates a temporary dip in net worth but builds $380K in home equity by retirement. Final net worth at 65: $1.96M vs $2.1M baseline. Retirement confidence: 76%.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scenario Comparison Section */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ marginBottom: '32px', textAlign: 'center' }}>
            <div style={{
              display: 'inline-block',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '1.5px',
              color: '#059669',
              marginBottom: '16px',
              textTransform: 'uppercase'
            }}>
              Decision Scenario Comparison
            </div>
            
            <p style={{
              fontSize: '1.05rem',
              color: '#6b7280',
              lineHeight: '1.7',
              margin: '0 auto',
              maxWidth: '800px'
            }}>
              Compare major life decisions side-by-side. Should you buy a house or keep renting? See the 20-year financial impact using your actual data and community outcomes.
            </p>
          </div>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px'
          }}>
            {/* Scenario A: Buy Home */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '28px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              border: '2px solid #f59e0b20'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px'
                }}>
                  🏠
                </div>
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', margin: 0 }}>
                    Buy Home in 2028
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '2px 0 0 0' }}>
                    Traditional homeownership path
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                {[
                  { label: 'Down Payment', value: '$100K', icon: '💰' },
                  { label: 'Monthly Cost', value: '$3,400', icon: '📅' },
                  { label: 'Appreciation', value: '6.2%/year', icon: '📈' },
                  { label: 'Tax Benefits', value: '$8K/year', icon: '💵' }
                ].map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px',
                    background: '#fef3c7',
                    borderRadius: '8px'
                  }}>
                    <span style={{ fontSize: '0.9rem', color: '#92400e', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>{item.icon}</span>
                      {item.label}
                    </span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#78350f' }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{
                padding: '16px',
                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                borderRadius: '12px',
                border: '2px solid #f59e0b'
              }}>
                <div style={{ fontSize: '0.75rem', color: '#92400e', fontWeight: 700, marginBottom: '8px', letterSpacing: '0.5px' }}>
                  20-YEAR OUTCOME
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.9rem', color: '#78350f', fontWeight: 600 }}>Net Worth 2048:</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#78350f' }}>$1.4M</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.9rem', color: '#78350f', fontWeight: 600 }}>Home Equity:</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#78350f' }}>$380K</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.9rem', color: '#78350f', fontWeight: 600 }}>Retirement:</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f59e0b' }}>76%</span>
                </div>
              </div>
            </div>

            {/* Scenario B: Rent & Invest */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '28px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              border: '2px solid #10b98120'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px'
                }}>
                  📈
                </div>
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', margin: 0 }}>
                    Rent & Invest
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '2px 0 0 0' }}>
                    Investment-focused approach
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                {[
                  { label: 'Invest Down Payment', value: '$100K', icon: '💰' },
                  { label: 'Monthly Rent', value: '$2,400', icon: '🏢' },
                  { label: 'Investment Return', value: '7.8%/year', icon: '📊' },
                  { label: 'Flexibility', value: 'High', icon: '✨' }
                ].map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px',
                    background: '#dcfce7',
                    borderRadius: '8px'
                  }}>
                    <span style={{ fontSize: '0.9rem', color: '#065f46', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>{item.icon}</span>
                      {item.label}
                    </span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#047857' }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{
                padding: '16px',
                background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
                borderRadius: '12px',
                border: '2px solid #10b981'
              }}>
                <div style={{ fontSize: '0.75rem', color: '#065f46', fontWeight: 700, marginBottom: '8px', letterSpacing: '0.5px' }}>
                  20-YEAR OUTCOME
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.9rem', color: '#047857', fontWeight: 600 }}>Net Worth 2048:</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#047857' }}>$1.6M</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.9rem', color: '#047857', fontWeight: 600 }}>Portfolio:</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#047857' }}>$520K</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.9rem', color: '#047857', fontWeight: 600 }}>Retirement:</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#10b981' }}>81%</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{
            marginTop: '24px',
            background: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            border: '2px solid #3b82f620',
            display: 'flex',
            gap: '16px',
            alignItems: 'start'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              flexShrink: 0
            }}>
              👥
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                Community Validation
              </div>
              <div style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6 }}>
                In Seattle, 63 percent of users in your income bracket who chose to rent and invest (2020-2024) reported higher financial satisfaction and retirement confidence than home buyers. Based on 2,847 community members with similar profiles.
              </div>
            </div>
          </div>
        </div>

        {/* Retirement Deep Dive Section */}
        <div>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '400px 1fr',
            gap: '32px',
            alignItems: 'start'
          }}>
            
            <div>
              <div style={{
                display: 'inline-block',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '1.5px',
                color: '#059669',
                marginBottom: '16px',
                textTransform: 'uppercase'
              }}>
                Retirement Readiness
              </div>
              
              <p style={{
                fontSize: '1.05rem',
                color: '#6b7280',
                lineHeight: '1.7',
                margin: 0
              }}>
                Most people have no idea if they are on track to retire comfortably. Sagaa runs simulations testing your plan against market downturns, inflation spikes, and unexpected expenses to give you a clear confidence score.
              </p>

              <div style={{
                marginTop: '24px',
                padding: '16px',
                background: 'white',
                borderRadius: '12px',
                border: '2px solid #8b5cf6'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <AlertCircle size={16} color="#8b5cf6" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#6b21a8' }}>
                    Unlike Generic Calculators
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#7c3aed', lineHeight: 1.6, margin: 0 }}>
                  We also leverage community-validated assumptions from users who actually lived through these scenarios and not just generic industry averages.
                </p>
              </div>
            </div>

            {/* Right Side - Overlapping Cards */}
            <div style={{ 
              position: 'relative',
              minHeight: '550px',
              paddingLeft: '40px'
            }}>
              
              {/* Confidence Gauge Card - Behind */}
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '380px',
                background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
                borderRadius: '16px',
                padding: '28px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                border: '2px solid #8b5cf6',
                zIndex: 1
              }}>
                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6b21a8', marginBottom: '8px' }}>
                    Your Retirement Confidence
                  </div>
                  <div style={{ 
                    fontSize: '4rem', 
                    fontWeight: 700, 
                    color: '#8b5cf6',
                    lineHeight: '1',
                    marginBottom: '6px'
                  }}>
                    78%
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#7c3aed', lineHeight: 1.4 }}>
                    In 780 of 1,000 simulations, you maintain your lifestyle through age 95
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 10px',
                    background: '#dcfce7',
                    borderRadius: '6px',
                    border: '1px solid #10b981'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '14px' }}>✅</span>
                      <span style={{ fontSize: '0.8rem', color: '#065f46', fontWeight: 600 }}>
                        Maintain lifestyle
                      </span>
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#047857' }}>
                      780
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 10px',
                    background: '#fef3c7',
                    borderRadius: '6px',
                    border: '1px solid #f59e0b'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '14px' }}>⚠️</span>
                      <span style={{ fontSize: '0.8rem', color: '#92400e', fontWeight: 600 }}>
                        Moderate adjustments
                      </span>
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#78350f' }}>
                      150
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 10px',
                    background: '#fee2e2',
                    borderRadius: '6px',
                    border: '1px solid #ef4444'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '14px' }}>❌</span>
                      <span style={{ fontSize: '0.8rem', color: '#991b1b', fontWeight: 600 }}>
                        Significant changes
                      </span>
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#dc2626' }}>
                      70
                    </span>
                  </div>
                </div>

                <div style={{
                  fontSize: '0.75rem',
                  color: '#7c3aed',
                  textAlign: 'center',
                  fontStyle: 'italic'
                }}>
                  Based on 1,000 Monte Carlo simulations
                </div>
              </div>

              {/* Variables & Actions Card - In Front, overlapping */}
              <div style={{
                position: 'absolute',
                top: '60px',
                left: '360px',
                width: '420px',
                background: 'white',
                borderRadius: '16px',
                padding: '28px',
                boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                border: '1px solid #e5e7eb',
                zIndex: 2
              }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b', marginBottom: '16px' }}>
                  Scenario Variables Tested
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                  {[
                    { label: 'Market Returns', value: '4-9% annually', avg: '(historical avg: 7%)' },
                    { label: 'Inflation', value: '2-4% annually', avg: '(target: 2.5%)' },
                    { label: 'Unexpected Expenses', value: '$8K every 3-5 years', avg: '(medical, repairs)' },
                    { label: 'Healthcare Costs', value: '$12K annually post-65', avg: '(increasing with age)' }
                  ].map((item, idx) => (
                    <div key={idx} style={{
                      padding: '10px 12px',
                      background: '#f8fafc',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1e293b' }}>
                          {item.label}
                        </span>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#3b82f6' }}>
                          {item.value}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                        {item.avg}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                  borderRadius: '12px',
                  padding: '16px',
                  border: '2px solid #3b82f6'
                }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e40af', marginBottom: '10px' }}>
                    💡 Actions to Improve Your Score
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.8rem', color: '#1e3a8a' }}>
                        Increase 401k by $150/month
                      </span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#3b82f6' }}>
                        → 84%
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.8rem', color: '#1e3a8a' }}>
                        Delay retirement by 2 years
                      </span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#3b82f6' }}>
                        → 89%
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.8rem', color: '#1e3a8a' }}>
                        Reduce expenses by $200/month
                      </span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#3b82f6' }}>
                        → 82%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default LifeTimelineProjector;