import React from 'react';
import { Home, Car, Package, Zap, AlertTriangle } from 'lucide-react';

export const PropertyAssetIntelligence: React.FC = () => {
  return (
    <section style={{
      padding: '80px 24px',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #f8fafc 100%)',
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
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-150px',
        left: '-150px',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Section Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '80px'
        }}>
          <h2 style={{
            fontWeight: '100',
            marginBottom: '24px',
            lineHeight: '1.2',
            fontSize: 'clamp(36px, 4vw, 56px)',
          }}>
            <span style={{ color: '#1d1d1f' }}>Property and Assets.</span>{' '}
            <span style={{
              background: 'linear-gradient(135deg, #0369a1 0%, #0284c7 50%, #0ea5e9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}>Intelligently Managed</span>
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#64748b',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.7'
          }}>
            From multiple properties to vehicles and major assets—Sagaa tracks it all with predictive maintenance, lifespan monitoring, and smart replacement planning.
          </p>
        </div>

        {/* Main Content Grid - Enhanced Design */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '28px',
          marginBottom: '80px'
        }}>
          {/* Multi-Property Management */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '36px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
            border: 'none',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(59, 130, 246, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.08)';
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px',
              boxShadow: '0 6px 20px rgba(59, 130, 246, 0.3)'
            }}>
              <Home size={32} color="white" />
            </div>
            <h3 style={{
              fontSize: '22px',
              fontWeight: '600',
              color: '#1d1d1f',
              marginBottom: '14px'
            }}>
              Multi-Property Tracking
            </h3>
            <p style={{
              fontSize: '15px',
              color: '#64748b',
              lineHeight: '1.7',
              marginBottom: '20px'
            }}>
              Manage primary residence, vacation homes, rental properties, and investment real estate all in one place
            </p>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              backgroundColor: 'transparent',
              border: 'none',
              gap: 0,
              borderRadius: 0,
              overflow: 'visible',
              display: 'block'
            }}>
              {[
                'Property value tracking and appreciation',
                'Rental income and expense management',
                'Property tax and insurance tracking',
                'Maintenance history by property'
              ].map((item, idx) => (
                <li key={idx} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  marginBottom: '10px',
                  fontSize: '14px',
                  color: '#475569',
                  backgroundColor: 'transparent',
                  padding: 0
                }}>
                  <span style={{ 
                    color: '#10b981', 
                    flexShrink: 0, 
                    fontSize: '18px',
                    fontWeight: 'bold' 
                  }}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Vehicle Fleet Management */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '36px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
            border: 'none',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(16, 185, 129, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.08)';
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px',
              boxShadow: '0 6px 20px rgba(16, 185, 129, 0.3)'
            }}>
              <Car size={32} color="white" />
            </div>
            <h3 style={{
              fontSize: '22px',
              fontWeight: '600',
              color: '#1d1d1f',
              marginBottom: '14px'
            }}>
              Vehicle Intelligence
            </h3>
            <p style={{
              fontSize: '15px',
              color: '#64748b',
              lineHeight: '1.7',
              marginBottom: '20px'
            }}>
              Complete management for cars, boats, RVs, motorcycles—all your vehicles in one intelligent system
            </p>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              backgroundColor: 'transparent',
              border: 'none',
              gap: 0,
              borderRadius: 0,
              overflow: 'visible',
              display: 'block'
            }}>
              {[
                'Maintenance schedules and service history',
                'Registration and inspection tracking',
                'Insurance policy management',
                'Fuel efficiency and cost tracking'
              ].map((item, idx) => (
                <li key={idx} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  marginBottom: '10px',
                  fontSize: '14px',
                  color: '#475569',
                  backgroundColor: 'transparent',
                  padding: 0
                }}>
                  <span style={{ 
                    color: '#10b981', 
                    flexShrink: 0, 
                    fontSize: '18px',
                    fontWeight: 'bold' 
                  }}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Major Asset Registry */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '36px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
            border: 'none',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(245, 158, 11, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.08)';
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px',
              boxShadow: '0 6px 20px rgba(245, 158, 11, 0.3)'
            }}>
              <Package size={32} color="white" />
            </div>
            <h3 style={{
              fontSize: '22px',
              fontWeight: '600',
              color: '#1d1d1f',
              marginBottom: '14px'
            }}>
              Asset Registry & Warranties
            </h3>
            <p style={{
              fontSize: '15px',
              color: '#64748b',
              lineHeight: '1.7',
              marginBottom: '20px'
            }}>
              Track every major purchase with warranties, manuals, and expected lifespan
            </p>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              backgroundColor: 'transparent',
              border: 'none',
              gap: 0,
              borderRadius: 0,
              overflow: 'visible',
              display: 'block'
            }}>
              {[
                'Appliances (HVAC, water heater, washer/dryer)',
                'Electronics (TVs, computers, phones)',
                'Furniture and major purchases',
                'Warranty expiration alerts'
              ].map((item, idx) => (
                <li key={idx} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  marginBottom: '10px',
                  fontSize: '14px',
                  color: '#475569',
                  backgroundColor: 'transparent',
                  padding: 0
                }}>
                  <span style={{ 
                    color: '#10b981', 
                    flexShrink: 0, 
                    fontSize: '18px',
                    fontWeight: 'bold' 
                  }}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Predictive Intelligence Feature - Enhanced with Real Example */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '460px 1fr',
          gap: '48px',
          alignItems: 'start',
          marginBottom: '64px'
        }}>
          {/* Left Side - Title and Description */}
          <div>
            <div style={{
              display: 'inline-block',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '1.5px',
              color: '#0369a1',
              marginBottom: '16px',
              textTransform: 'uppercase'
            }}>
              Predictive Intelligence
            </div>
            <h3 style={{
              fontSize: '32px',
              fontWeight: '600',
              color: '#1d1d1f',
              marginBottom: '16px',
              lineHeight: '1.3'
            }}>
              Knows When Things Will Fail Before They Do
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#64748b',
              lineHeight: '1.7',
              marginBottom: '32px'
            }}>
              Sagaa doesn't just track—it predicts. Know when things will fail before they do, and plan replacements based on your financial situation and community wisdom.
            </p>

            {/* Real-World Example Card */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 6px 24px rgba(0, 0, 0, 0.1)',
              borderLeft: '4px solid #f59e0b'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <AlertTriangle size={24} color="#f59e0b" />
                <div style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#92400e',
                  letterSpacing: '0.5px'
                }}>
                  PREDICTIVE ALERT
                </div>
              </div>
              <p style={{
                fontSize: '15px',
                color: '#1d1d1f',
                lineHeight: '1.7',
                margin: 0,
                fontStyle: 'italic'
              }}>
                "Your water heater is 11 years old (average lifespan 10-12). It's winter, and failures spike 40% in cold months. Based on your emergency fund ($8,200), I recommend getting 3 quotes now before it fails. Community data shows emergency replacements cost 30% more."
              </p>
            </div>
          </div>

          {/* Right Side - Feature Grid */}
          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '20px'
            }}>
              {[
                { 
                  icon: '🔮', 
                  title: 'Lifespan Tracking', 
                  desc: 'AI monitors expected lifespan of all major assets based on age, usage, and condition',
                  color: '#3b82f6'
                },
                { 
                  icon: '⚠️', 
                  title: 'Failure Prediction', 
                  desc: 'Seasonal and usage-based failure risk analysis with probabilistic forecasting',
                  color: '#ef4444'
                },
                { 
                  icon: '💰', 
                  title: 'Financial Planning', 
                  desc: 'Replacement recommendations timed with your budget, savings, and cash flow',
                  color: '#10b981'
                },
                { 
                  icon: '👥', 
                  title: 'Community Data', 
                  desc: 'Learn from similar homes and equipment experiences in your region',
                  color: '#8b5cf6'
                }
              ].map((feature, idx) => (
                <div key={idx} style={{
                  padding: '24px',
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
                  border: `2px solid ${feature.color}20`,
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 6px 24px ${feature.color}30`;
                  e.currentTarget.style.borderColor = feature.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.borderColor = `${feature.color}20`;
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '12px'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      backgroundColor: `${feature.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px'
                    }}>
                      {feature.icon}
                    </div>
                  </div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1d1d1f',
                    marginBottom: '8px'
                  }}>
                    {feature.title}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#64748b',
                    lineHeight: '1.6'
                  }}>
                    {feature.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Repair vs Replace Intelligence - Enhanced with Visual Cards */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '24px',
          padding: '48px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          border: '2px solid #fef3c7',
          marginTop: '48px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 20px rgba(245, 158, 11, 0.3)'
            }}>
              <Zap size={32} color="white" />
            </div>
            <div>
              <h3 style={{
                fontSize: '28px',
                fontWeight: '600',
                color: '#1d1d1f',
                marginBottom: '4px'
              }}>
                Smart Repair vs. Replace Analysis
              </h3>
              <p style={{
                fontSize: '15px',
                color: '#64748b',
                margin: 0
              }}>
                AI-powered decision support backed by community data
              </p>
            </div>
          </div>
          
          <p style={{
            fontSize: '16px',
            color: '#475569',
            lineHeight: '1.7',
            marginBottom: '32px'
          }}>
            Sagaa analyzes repair costs, remaining lifespan, energy efficiency improvements, and your financial situation to recommend whether to repair or replace—backed by community data on similar decisions.
          </p>

          {/* Analysis Factors Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '32px'
          }}>
            {[
              { 
                icon: '📊', 
                title: 'Cost-Benefit Analysis',
                desc: 'Repair cost vs. replacement with depreciation factors and expected lifespan',
                gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
              },
              { 
                icon: '⚡', 
                title: 'Energy Efficiency',
                desc: 'Calculate savings from modern, efficient replacements over time',
                gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
              },
              { 
                icon: '👥', 
                title: 'Community Success Rates',
                desc: 'Real outcomes from similar equipment, age, and repair scenarios',
                gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
              },
              { 
                icon: '💰', 
                title: 'Financial Impact',
                desc: 'Effect on emergency fund, monthly budget, and long-term costs',
                gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
              }
            ].map((item, idx) => (
              <div key={idx} style={{
                backgroundColor: '#f8fafc',
                padding: '24px',
                borderRadius: '16px',
                border: '2px solid #e2e8f0',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = '#cbd5e1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: item.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  marginBottom: '16px'
                }}>
                  {item.icon}
                </div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#1d1d1f',
                  marginBottom: '8px'
                }}>
                  {item.title}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#64748b',
                  lineHeight: '1.6'
                }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Example Scenario */}
          <div style={{
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            borderRadius: '16px',
            padding: '28px',
            border: '2px solid #fbbf24'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'start',
              gap: '16px'
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: '24px'
              }}>
                💡
              </div>
              <div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#92400e',
                  marginBottom: '8px',
                  letterSpacing: '0.5px'
                }}>
                  EXAMPLE ANALYSIS
                </div>
                <p style={{
                  fontSize: '15px',
                  color: '#78350f',
                  lineHeight: '1.7',
                  margin: 0,
                  fontStyle: 'italic'
                }}>
                  "Your 9-year-old HVAC repair quote is $1,800. New system: $5,500. Your current system uses 30% more energy than modern units ($420/year). A new system saves $420/year = pays for itself in 9 years. Your emergency fund can cover it. Community data: 78% who replaced similar-age systems were satisfied vs. 42% who repaired. <strong>Recommendation: Replace.</strong>"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyAssetIntelligence;