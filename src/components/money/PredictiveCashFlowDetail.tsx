import { AlertCircle } from 'lucide-react';
import { useEffect } from 'react';

export const PredictiveCashFlowDetail = () => {
  useEffect(() => {
    const cards = document.querySelectorAll('.fade-in-card');
    cards.forEach((card, idx) => {
      (card as HTMLElement).classList.add('fade-in');
      (card as HTMLElement).style.animationDelay = `${idx * 0.15}s`;
    });
  }, []);

  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #dcfce7 0%, #f0fdf4 100%)',
        padding: '80px 24px',
        margin: '0',
        minHeight: '100vh'
      }}
    >
      <style>{`
        .fade-in {
          opacity: 0;
          animation: fadeInUp 0.8s forwards;
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{ maxWidth: '1152px', margin: '0 auto' }}>

        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{
            fontWeight: '100',
            marginBottom: '24px',
            lineHeight: '1.2',
            fontSize: 'clamp(36px, 4vw, 56px)',
          }}>
            <span style={{ color: '#1d1d1f' }}>Predictive Cash Flow.</span>{' '}
            <span style={{
              background: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}>See Tomorrow Today.</span>
          </h2>
          
          {/* Feature Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginTop: '32px' }}>
            {[
              'Income Forecasting',
              'Early Warning Alerts',
              'Bill Predictions',
              'Automated Solutions',
              'Pattern Recognition',
              'Stress-Free Planning'
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

        {/* Main Dashboard Section */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '400px 1fr',
            gap: '32px',
            alignItems: 'start'
          }}>
            
            {/* Left Side - Title and Description */}
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
                FINANCIAL FORESIGHT
              </div>
              
              <p style={{
                fontSize: '1.05rem',
                color: '#6b7280',
                lineHeight: '1.7',
                margin: 0
              }}>
                Stop living paycheck to paycheck wondering if you'll have enough. Sagaa's predictive cash flow engine forecasts your financial future with remarkable accuracy, identifying potential shortfalls weeks in advance and automatically suggesting solutions before problems arise.
              </p>
            </div>

            {/* Right Side - Dashboard Card */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              border: '2px solid #10b98120'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginBottom: '20px',
                paddingBottom: '16px',
                borderBottom: '2px solid #f3f4f6'
              }}>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#065f46', margin: 0 }}>
                  60-Day Cash Flow Forecast
                </h4>
              </div>

              {/* Simple Bar Chart Visualization */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {[
                    { label: 'This Week', amount: 2840, color: '#10b981', width: '85%' },
                    { label: 'Next Week', amount: 3150, color: '#059669', width: '95%' },
                    { label: 'Week 3', amount: 1890, color: '#f59e0b', width: '60%', alert: true },
                    { label: 'Week 4', amount: 2650, color: '#10b981', width: '80%' }
                  ].map((week, idx) => (
                    <div key={idx}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 500 }}>{week.label}</span>
                        <span style={{ fontSize: '0.95rem', fontWeight: 700, color: week.alert ? '#f59e0b' : '#1f2937' }}>
                          ${week.amount.toLocaleString()}
                        </span>
                      </div>
                      <div style={{ 
                        background: '#f3f4f6', 
                        borderRadius: '8px', 
                        height: '24px',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <div style={{ 
                          background: week.color,
                          width: week.width,
                          height: '100%',
                          borderRadius: '8px',
                          transition: 'width 1s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          paddingRight: '8px'
                        }}>
                          {week.alert && <AlertCircle size={14} color="white" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alert Box */}
              <div style={{
                background: '#fef3c7',
                border: '2px solid #f59e0b',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                gap: '12px'
              }}>
                <AlertCircle size={20} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#92400e', marginBottom: '4px' }}>
                    Cash Flow Alert: Week 3
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#78350f', lineHeight: '1.5' }}>
                    3 large bills converge June 15-20. Balance drops to $1,890. Recommend moving $500 from savings.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Proactive Insights Section */}
        <div style={{ marginBottom: '80px' }}>
          {/* Title and Description - Full Width Above */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{
              display: 'inline-block',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '1.5px',
              color: '#059669',
              marginBottom: '16px',
              textTransform: 'uppercase'
            }}>
              AI-POWERED RECOMMENDATIONS
            </div>
            
            <p style={{
              fontSize: '1.05rem',
              color: '#6b7280',
              lineHeight: '1.7',
              margin: 0,
              maxWidth: '800px'
            }}>
              Sagaa analyzes your complete financial picture to identify optimization opportunities, predict future scenarios, and recommend specific actions that could save or earn you thousands annually. Proactive insights prevent problems before they happen.
            </p>
          </div>

          {/* Two Cards Side by Side */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px'
          }}>
            
              {/* Card 1: Bill Convergence Alert */}
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                border: '2px solid #f59e0b20',
                transition: 'all 0.2s ease'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px'
                  }}>
                    ⚠️
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '1rem', fontWeight: 600, color: '#1e293b' }}>Bill Convergence Alert</div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>June 15-20</div>
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#f59e0b',
                    background: '#fef3c7',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    border: '1px solid #f59e0b'
                  }}>
                    ACTION NEEDED
                  </div>
                </div>

                <p style={{ fontSize: '0.95rem', color: '#1e293b', lineHeight: '1.6', marginBottom: '16px' }}>
                  Your <strong>car insurance ($180)</strong>, annual <strong>Amazon Prime ($139)</strong>, and quarterly <strong>water bill ($87)</strong> all hit the same week. After regular expenses, checking drops to <strong>$340</strong>—below your $500 safety threshold.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                  <div style={{ 
                    background: '#f0fdf4', 
                    padding: '12px 16px', 
                    borderRadius: '10px', 
                    border: '2px solid #10b981',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <span style={{ fontSize: '18px' }}>✅</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#065f46', marginBottom: '2px' }}>Recommended</div>
                      <div style={{ fontSize: '0.85rem', color: '#047857' }}>Move $250 from savings June 14th</div>
                    </div>
                  </div>
                  
                  <div style={{ 
                    background: '#fef3c7', 
                    padding: '12px 16px', 
                    borderRadius: '10px', 
                    border: '1px solid #f59e0b',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <span style={{ fontSize: '18px' }}>⚠️</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#92400e', marginBottom: '2px' }}>Alternative</div>
                      <div style={{ fontSize: '0.85rem', color: '#78350f' }}>Delay gym charge ($65) by one week</div>
                    </div>
                  </div>
                </div>

                <div style={{
                  paddingTop: '16px',
                  borderTop: '1px solid #e5e7eb',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Should I schedule this transfer?</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: '2px solid #e5e7eb',
                      background: 'white',
                      color: '#64748b',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}>
                      Not Now
                    </button>
                    <button style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                      color: 'white',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}>
                      Approve
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 2: Income Smoothing */}
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                border: '2px solid #3b82f620',
                transition: 'all 0.2s ease'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px'
                  }}>
                    💡
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '1rem', fontWeight: 600, color: '#1e293b' }}>Income Smoothing Strategy</div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Freelance optimization</div>
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#3b82f6',
                    background: '#dbeafe',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    border: '1px solid #3b82f6'
                  }}>
                    PROACTIVE
                  </div>
                </div>

                <p style={{ fontSize: '0.95rem', color: '#1e293b', lineHeight: '1.6', marginBottom: '16px' }}>
                  I've analyzed your 18 months of freelance income. You average <strong>$6,200/month</strong>, but it ranges from $3,800 (lean) to $9,500 (busy). This volatility creates stress.
                </p>

                <div style={{ 
                  background: '#dcfce7', 
                  padding: '16px', 
                  borderRadius: '10px', 
                  border: '2px solid #10b981',
                  marginBottom: '16px'
                }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#065f46', marginBottom: '8px' }}>
                    💰 Smart Budget Recommendation
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#047857', lineHeight: '1.6', marginBottom: '10px' }}>
                    Budget based on your <strong>minimum expected income ($4,500)</strong>. During high-earning months, I'll auto-transfer surplus to a "smoothing buffer." During lean months, I'll pull from this buffer.
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#065f46', fontWeight: 500 }}>
                    ✨ Result: Steady $4,500/month lifestyle + $20,400 annual surplus
                  </div>
                </div>

                <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.6', marginBottom: '12px' }}>
                  Your buffer currently has <strong>$6,800</strong>—enough to cover 1.5 lean months. Jan-Mar are typically your lean months.
                </p>

                <div style={{
                  paddingTop: '16px',
                  borderTop: '1px solid #e5e7eb',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Set up automatic transfers?</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: '2px solid #e5e7eb',
                      background: 'white',
                      color: '#64748b',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}>
                      Learn More
                    </button>
                    <button style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                      color: 'white',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}>
                      Enable
                    </button>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PredictiveCashFlowDetail;