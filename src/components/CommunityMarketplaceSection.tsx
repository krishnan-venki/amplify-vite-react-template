interface CommunityMarketplaceSectionProps {
    isDesktop: boolean;
  }

export const CommunityMarketplaceSection: React.FC<CommunityMarketplaceSectionProps> = ({ isDesktop }) => {
    const matchingSteps = [
      {
        step: "Need Identified",
        content: "Daughter struggling with AP Calculus",
        detail: "Detected from recent test scores and homework grades"
      },
      {
        step: "Smart Matching",
        content: "Sagaa analyzes your ecosystem",
        detail: "Budget: $60/hour • Schedule: Tuesday evenings • Subject: AP Calculus"
      },
      {
        step: "Trusted Providers",
        content: "5 qualified tutors found",
        detail: "All with AP Calculus specialization"
      },
      {
        step: "Perfect Match",
        content: "Maria - Best fit for your needs",
        detail: "Helped 34 AP students • $60/hour • Tuesday evenings • 89% improved by one letter grade"
      }
    ];

    // Responsive grid: stack columns on mobile
    return (
      <section style={{
        padding: '80px 0',
        backgroundColor: 'white',
        position: 'relative',
        overflow: 'visible'
      }}>
        {/* Header accent background */}
        
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Section header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '64px',
            position: 'relative'
          }}>
            <h2 style={{
              fontSize: 'clamp(42px, 5vw, 56px)',
              fontWeight: '100',
              color: '#1d1d1f',
              marginBottom: '24px',
              lineHeight: '1.1',
              position: 'relative',
              zIndex: 2
            }}>
              Trusted Services from{' '}
              <span style={{
                background: 'linear-gradient(135deg, #007AFF 0%, #00D2FF 50%, #34C759 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Your Community</span>
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#6b7280',
              maxWidth: '900px',
              margin: '0 auto',
              lineHeight: '1.6',
              position: 'relative',
              zIndex: 2
            }}>
              Connect with service providers from the Sagaa community. Sagaa matches you intelligently based on your specific needs, budget, schedule, and context—not just zip code. See providers' experience with your exact situation before you book.
            </p>
          </div>

          {/* Main content card */}
          <div style={{
            backgroundColor: '#f8fafc',
            borderRadius: '24px',
            padding: '48px',
            marginBottom: '64px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.06)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr',
              gap: isDesktop ? '64px' : '32px',
              alignItems: 'center'
            }}>
              {/* Left side - Benefits */}
              <div>
                <div style={{
                  padding: '8px',
                  borderRadius: '12px',
                  marginBottom: '16px'
                }}>
                  <h3 style={{
                    fontSize: '32px',
                    fontWeight: '600',
                    color: '#1d1d1f',
                    marginBottom: '24px'
                  }}>
                    Intelligent Matching, Not Just Zip Code
                  </h3>
                  {/* Benefits list */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px'
                  }}>
                    {/* Community member providers */}
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ fontSize: '16px' }}>👥</span>
                      </div>
                      <div>
                        <div style={{ fontSize: '16px', fontWeight: '600', color: '#1d1d1f', marginBottom: '4px' }}>Community member providers</div>
                        <div style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>Service providers who are also Sagaa ecosystem members</div>
                      </div>
                    </div>
                    {/* Context-aware matching */}
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ fontSize: '16px' }}>🎯</span>
                      </div>
                      <div>
                        <div style={{ fontSize: '16px', fontWeight: '600', color: '#1d1d1f', marginBottom: '4px' }}>Context-aware matching</div>
                        <div style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>Matches based on your exact needs, budget, schedule, and situation—not just zip code</div>
                      </div>
                    </div>
                    {/* Transparent service history */}
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ fontSize: '16px' }}>✓</span>
                      </div>
                      <div>
                        <div style={{ fontSize: '16px', fontWeight: '600', color: '#1d1d1f', marginBottom: '4px' }}>Transparent service history</div>
                        <div style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>See providers' experience with your specific situation—equipment, tutoring subjects, financial planning, and more</div>
                      </div>
                    </div>
                    {/* Seamless ecosystem integration */}
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#fae8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ fontSize: '16px' }}>🔄</span>
                      </div>
                      <div>
                        <div style={{ fontSize: '16px', fontWeight: '600', color: '#1d1d1f', marginBottom: '4px' }}>Seamless ecosystem integration</div>
                        <div style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>Booking, payment, and follow-up all tracked in your Sagaa ecosystem</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ width: '100%', height: '1px', background: '#e5e7eb', margin: '16px 0' }}></div>
                </div>
              </div>

              {/* Right side - Matching visualization */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: '32px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                transition: 'box-shadow 0.3s',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{
                  marginBottom: '24px',
                  textAlign: 'center'
                }}>
                  <h4 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1d1d1f',
                    marginBottom: '8px'
                  }}>Intelligent Matching Process</h4>
                  <p style={{
                    fontSize: '14px',
                    color: '#6b7280'
                  }}>Example: Finding a calculus tutor</p>
                </div>
                {/* Matching steps with divider */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}>
                  {matchingSteps.map((item, index) => {
                    const colors = [
                        { bg: '#eff6ff', border: '#bfdbfe', number: '#3b82f6' },
                        { bg: '#f0fdf4', border: '#bbf7d0', number: '#22c55e' },
                        { bg: '#fef3c7', border: '#fde68a', number: '#f59e0b' },
                        { bg: '#faf5ff', border: '#e9d5ff', number: '#a855f7' }
                     ];
                    return (
                    <div
                      style={{
                        padding: '20px',
                        backgroundColor: colors[index].bg,
                        borderRadius: '12px',
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                        transition: 'transform 0.2s, box-shadow 0.2s'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '8px'
                      }}>
                        <div style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          backgroundColor: colors[index].number,
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '14px',
                          fontWeight: '600',
                          flexShrink: 0
                        }}>
                          {index + 1}
                        </div>
                        <div style={{
                          fontSize: '12px',
                          fontWeight: '600',
                          color: '#6b7280',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          {item.step}
                        </div>
                      </div>
                      <div style={{
                        fontSize: '15px',
                        fontWeight: '600',
                        color: '#1d1d1f',
                        marginBottom: '4px',
                        marginLeft: '40px'
                      }}>
                        {item.content}
                      </div>
                      <div style={{
                        fontSize: '13px',
                        color: '#6b7280',
                        marginLeft: '40px',
                        lineHeight: '1.4'
                      }}>
                        {item.detail}
                      </div>
                    </div>
                  );
                })}
                </div>
              </div>
            </div>
          </div>

          {/* Service categories - horizontal scroll on mobile */}
          <div>
            <h3 style={{
              fontSize: '28px',
              fontWeight: '600',
              color: '#1d1d1f',
              marginBottom: '32px',
              textAlign: 'center'
            }}>
              Available Service Categories
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
              overflowX: 'auto',
              paddingBottom: '8px',
              scrollSnapType: 'x mandatory'
            }}>
              {[
                { icon: '🔧', title: 'Home Services', desc: 'Repair, maintenance, improvement', accent: '#fbbf24' },
                { icon: '📈', title: 'Financial Planning', desc: 'Strategy, investment, optimization', accent: '#60a5fa' },
                { icon: '🩺', title: 'Health & Wellness', desc: 'Fitness, nutrition, mental health', accent: '#34d399' },
                { icon: '🎓', title: 'Learning & Growth', desc: 'Tutoring, coaching, mentoring', accent: '#a78bfa' },
                { icon: '🚗', title: 'Asset Care', desc: 'Vehicle, equipment maintenance', accent: '#f472b6' },
                { icon: '👨‍👩‍👧‍👦', title: 'Family Support', desc: 'Childcare, eldercare, assistance', accent: '#f59e42' }
              ].map((category, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: 'white',
                    padding: '24px',
                    borderRadius: '16px',
                    textAlign: 'center',
                    border: '1px solid #e5e7eb',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                    scrollSnapAlign: 'start',
                    position: 'relative'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = `0 8px 32px rgba(59,130,246,0.10)`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.03)';
                  }}
                >
                  {/* Icon with accent background */}
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: category.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px auto',
                    fontSize: '32px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                  }}>{category.icon}</div>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1d1d1f',
                    marginBottom: '4px'
                  }}>{category.title}</h4>
                  <p style={{
                    fontSize: '13px',
                    color: '#6b7280',
                    margin: 0
                  }}>{category.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };