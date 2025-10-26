import React, { useState } from 'react';

export const HouseholdOperations: React.FC = () => {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  return (
    <section style={{
      background: '#ffffff',
      padding: '80px 24px',
      margin: '0',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto'
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
            <span style={{ color: '#1d1d1f' }}>Household Operations.</span>{' '}
            <span style={{
              background: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}>Intelligently Automated.</span>
          </h2>
          <p style={{
            fontSize: '20px',
            color: '#6b7280',
            maxWidth: '900px',
            margin: '0 auto',
            lineHeight: '1.7',
            fontWeight: '300'
          }}>
            From smart shopping to meal planning, subscriptions to utilities—Sagaa automates the routine so you can focus on what matters.
          </p>
        </div>

        {/* Smart Shopping Intelligence - Main Feature Section */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 400px) 1fr',
            gap: '32px',
            alignItems: 'start',
            marginBottom: '32px'
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
                SMART SHOPPING INTELLIGENCE
              </div>
              
              <h3 style={{
                fontSize: '2rem',
                fontWeight: '600',
                color: '#1d1d1f',
                marginBottom: '20px',
                lineHeight: '1.2'
              }}>
                Never Run Out. <br />Never Overpay.
              </h3>
              
              <p style={{
                fontSize: '1.05rem',
                color: '#6b7280',
                lineHeight: '1.7',
                margin: 0
              }}>
                Sagaa learns your consumption patterns and predicts when you'll run out of everyday items—before you do. AI-powered price tracking ensures you buy at the right time, from the right place, at the best price.
              </p>
            </div>

            {/* Right Side - 3 Column Grid of Capabilities */}
            <div style={{ 
              paddingLeft: '40px',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px'
            }}>
              {[
                { icon: '📊', title: 'Usage Pattern Learning', desc: 'AI tracks consumption rates' },
                { icon: '⏰', title: 'Predictive Restocking', desc: 'Alerts before you run out' },
                { icon: '💰', title: 'Price Tracking', desc: 'Optimal buying moments' },
                { icon: '📦', title: 'Bulk Analysis', desc: 'Smart bulk vs. frequent buying' },
                { icon: '🎯', title: 'Brand Learning', desc: 'Preferences & substitutions' }
              ].map((feature, idx) => (
                <div 
                  key={idx}
                  onMouseEnter={() => setHoveredFeature(`shopping-${idx}`)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '16px',
                    border: hoveredFeature === `shopping-${idx}` ? '2px solid #10b981' : '2px solid #e5e7eb',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: hoveredFeature === `shopping-${idx}` ? 'translateY(-4px)' : 'translateY(0)',
                    boxShadow: hoveredFeature === `shopping-${idx}` ? '0 12px 24px rgba(16, 185, 129, 0.15)' : '0 2px 8px rgba(0,0,0,0.04)'
                  }}
                >
                  <div style={{
                    fontSize: '32px',
                    flexShrink: 0
                  }}>
                    {feature.icon}
                  </div>
                  <div>
                    <div style={{
                      fontSize: '15px',
                      fontWeight: '600',
                      color: '#1d1d1f',
                      marginBottom: '6px'
                    }}>
                      {feature.title}
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: '#6b7280',
                      lineHeight: '1.5'
                    }}>
                      {feature.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shopping Alert Example - Below the grid */}
          <div style={{
            background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)',
            borderRadius: '24px',
            padding: '32px',
            border: '2px solid #10b981',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.1)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                flexShrink: 0
              }}>
                🛒
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#059669',
                  letterSpacing: '0.5px',
                  marginBottom: '12px'
                }}>
                  SHOPPING ALERT EXAMPLE
                </div>
                <p style={{
                  fontSize: '15px',
                  color: '#065f46',
                  lineHeight: '1.7',
                  fontStyle: 'italic',
                  margin: 0,
                  backgroundColor: 'white',
                  padding: '16px',
                  borderRadius: '12px',
                  borderLeft: '4px solid #10b981'
                }}>
                  "You're running low on laundry detergent (about 2 weeks left based on usage). Costco has your brand on sale this week ($8 savings). Your calendar shows Saturday morning availability—want me to add it to your shopping list?"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Meal Planning & Inventory - Two Column Layout */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '32px'
          }}>
            {/* Meal Planning Card */}
            <div 
              onMouseEnter={() => setHoveredFeature('meal-planning')}
              onMouseLeave={() => setHoveredFeature(null)}
              style={{
                background: 'linear-gradient(135deg, #fef3c7 0%, #fef9c3 100%)',
                borderRadius: '24px',
                padding: '40px',
                border: hoveredFeature === 'meal-planning' ? '2px solid #f59e0b' : '2px solid #fbbf24',
                transition: 'all 0.4s ease',
                transform: hoveredFeature === 'meal-planning' ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: hoveredFeature === 'meal-planning' 
                  ? '0 20px 40px rgba(245, 158, 11, 0.2)' 
                  : '0 4px 12px rgba(0,0,0,0.05)',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                boxShadow: '0 4px 16px rgba(245, 158, 11, 0.3)'
              }}>
                <span style={{ fontSize: '32px' }}>🍽️</span>
              </div>
              
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#1d1d1f',
                marginBottom: '16px'
              }}>
                AI-Powered Meal Planning
              </h3>
              
              <p style={{
                fontSize: '15px',
                color: '#78350f',
                lineHeight: '1.7',
                marginBottom: '24px'
              }}>
                Meal plans that adapt to your dietary preferences, health goals, budget, and schedule—with automatic grocery list generation.
              </p>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                {[
                  'Dietary preference learning (vegan, keto, allergies)',
                  'Health goal integration (weight loss, diabetes management)',
                  'Budget-conscious meal suggestions',
                  'Recipe recommendations using what you have',
                  'Automatic grocery list creation'
                ].map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    fontSize: '14px',
                    color: '#92400e'
                  }}>
                    <span style={{ 
                      color: '#f59e0b', 
                      flexShrink: 0,
                      fontWeight: '700',
                      fontSize: '16px'
                    }}>✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Inventory & Waste Reduction Card */}
            <div 
              onMouseEnter={() => setHoveredFeature('inventory')}
              onMouseLeave={() => setHoveredFeature(null)}
              style={{
                background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                borderRadius: '24px',
                padding: '40px',
                border: hoveredFeature === 'inventory' ? '2px solid #3b82f6' : '2px solid #93c5fd',
                transition: 'all 0.4s ease',
                transform: hoveredFeature === 'inventory' ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: hoveredFeature === 'inventory' 
                  ? '0 20px 40px rgba(59, 130, 246, 0.2)' 
                  : '0 4px 12px rgba(0,0,0,0.05)',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                boxShadow: '0 4px 16px rgba(59, 130, 246, 0.3)'
              }}>
                <span style={{ fontSize: '32px' }}>♻️</span>
              </div>
              
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#1d1d1f',
                marginBottom: '16px'
              }}>
                Inventory & Waste Reduction
              </h3>
              
              <p style={{
                fontSize: '15px',
                color: '#1e3a8a',
                lineHeight: '1.7',
                marginBottom: '24px'
              }}>
                Track what you have, know when it expires, and reduce food waste through intelligent inventory management.
              </p>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                {[
                  'Pantry and fridge inventory tracking',
                  'Expiration date monitoring',
                  'Recipe suggestions to use expiring items',
                  'Food waste reduction insights',
                  'Shopping list prevents duplicate purchases'
                ].map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    fontSize: '14px',
                    color: '#1e40af'
                  }}>
                    <span style={{ 
                      color: '#3b82f6', 
                      flexShrink: 0,
                      fontWeight: '700',
                      fontSize: '16px'
                    }}>✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Management - Full Width Feature */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 400px) 1fr',
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
                color: '#dc2626',
                marginBottom: '16px',
                textTransform: 'uppercase'
              }}>
                SUBSCRIPTION INTELLIGENCE
              </div>
              
              <h3 style={{
                fontSize: '2rem',
                fontWeight: '600',
                color: '#1d1d1f',
                marginBottom: '20px',
                lineHeight: '1.2'
              }}>
                Stop the <br />Money Leaks
              </h3>
              
              <p style={{
                fontSize: '1.05rem',
                color: '#6b7280',
                lineHeight: '1.7',
                margin: 0
              }}>
                Sagaa tracks all your recurring payments across credit cards and bank accounts, identifies unused subscriptions, and finds better rates—automatically.
              </p>
            </div>

            {/* Right Side - 3 Column Feature Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              paddingLeft: '40px'
            }}>
              {[
                { 
                  icon: '🔍', 
                  title: 'Complete Audit', 
                  desc: 'Tracks every recurring payment across all accounts',
                  color: '#dc2626'
                },
                { 
                  icon: '📊', 
                  title: 'Usage Analysis', 
                  desc: 'Identifies underused or forgotten subscriptions',
                  color: '#ef4444'
                },
                { 
                  icon: '💰', 
                  title: 'Rate Monitoring', 
                  desc: 'Alerts when prices increase unexpectedly',
                  color: '#f87171'
                },
                { 
                  icon: '🎯', 
                  title: 'Optimization', 
                  desc: 'Finds better alternatives and negotiates rates',
                  color: '#dc2626'
                },
                { 
                  icon: '📅', 
                  title: 'Contract Tracking', 
                  desc: 'Monitors promotional periods and expirations',
                  color: '#ef4444'
                },
                { 
                  icon: '⚡', 
                  title: 'Auto-Cancellation', 
                  desc: 'Cancels unused subscriptions with your approval',
                  color: '#f87171'
                }
              ].map((feature, idx) => (
                <div 
                  key={idx}
                  onMouseEnter={() => setHoveredFeature(`subscription-${idx}`)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '16px',
                    border: hoveredFeature === `subscription-${idx}` ? `2px solid ${feature.color}` : '2px solid #fecaca',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    transform: hoveredFeature === `subscription-${idx}` ? 'translateY(-4px)' : 'translateY(0)',
                    boxShadow: hoveredFeature === `subscription-${idx}` 
                      ? `0 12px 24px ${feature.color}20` 
                      : '0 2px 8px rgba(0,0,0,0.04)'
                  }}
                >
                  <div style={{
                    fontSize: '32px',
                    flexShrink: 0
                  }}>
                    {feature.icon}
                  </div>
                  <div>
                    <div style={{
                      fontSize: '15px',
                      fontWeight: '600',
                      color: '#1d1d1f',
                      marginBottom: '6px'
                    }}>
                      {feature.title}
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: '#6b7280',
                      lineHeight: '1.5'
                    }}>
                      {feature.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Example Alert */}
          <div style={{
            marginTop: '32px',
            background: 'linear-gradient(135deg, #fef2f2 0%, #ffffff 100%)',
            borderRadius: '16px',
            padding: '24px 32px',
            border: '2px solid #fca5a5'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: '#dc2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: '20px'
              }}>
                💡
              </div>
              <p style={{
                fontSize: '14px',
                color: '#7f1d1d',
                lineHeight: '1.7',
                fontStyle: 'italic',
                margin: 0
              }}>
                "Found 6 optimization opportunities: Spotify unused 3 months ($120/year), Car insurance renewal available with 36% savings ($456/year), Internet promo expires next month—competitor offers better speed for less ($564/year). Total potential savings: $1,140/year."
              </p>
            </div>
          </div>
        </div>

        {/* Utility & Energy Intelligence */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
            borderRadius: '24px',
            padding: '48px',
            border: '2px solid #c4b5fd'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '32px'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(139, 92, 246, 0.3)'
              }}>
                <span style={{ fontSize: '28px' }}>⚡</span>
              </div>
              <div>
                <h3 style={{
                  fontSize: '28px',
                  fontWeight: '600',
                  color: '#1d1d1f',
                  margin: 0
                }}>
                  Utility & Energy Intelligence
                </h3>
                <p style={{
                  fontSize: '15px',
                  color: '#5b21b6',
                  margin: 0
                }}>
                  Monitor, analyze, and optimize all your household utilities
                </p>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px'
            }}>
              {[
                {
                  title: 'Pattern Recognition',
                  desc: 'Track electricity, gas, water consumption patterns',
                  icon: '📊',
                  color: '#8b5cf6'
                },
                {
                  title: 'Anomaly Detection',
                  desc: 'Alert on unusual usage or billing charges',
                  icon: '🚨',
                  color: '#a78bfa'
                },
                {
                  title: 'Provider Comparison',
                  desc: 'Regular analysis of utility/internet/phone plan optimization',
                  icon: '🔄',
                  color: '#c4b5fd'
                },
                {
                  title: 'Weather Integration',
                  desc: 'Proactive alerts for weather events affecting utilities',
                  icon: '🌤️',
                  color: '#8b5cf6'
                },
                {
                  title: 'Cost Optimization',
                  desc: 'Usage tips and provider recommendations to reduce bills',
                  icon: '💰',
                  color: '#a78bfa'
                },
                {
                  title: 'Contract Tracking',
                  desc: 'Monitor promotional periods and contract expirations',
                  icon: '📅',
                  color: '#c4b5fd'
                }
              ].map((feature, idx) => (
                <div 
                  key={idx}
                  onMouseEnter={() => setHoveredFeature(`utility-${idx}`)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  style={{
                    backgroundColor: 'white',
                    padding: '24px',
                    borderRadius: '16px',
                    border: hoveredFeature === `utility-${idx}` ? `2px solid ${feature.color}` : '2px solid #ddd6fe',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    transform: hoveredFeature === `utility-${idx}` ? 'scale(1.03)' : 'scale(1)',
                    boxShadow: hoveredFeature === `utility-${idx}` 
                      ? `0 12px 24px ${feature.color}30` 
                      : '0 2px 8px rgba(0,0,0,0.04)'
                  }}
                >
                  <div style={{
                    fontSize: '32px',
                    marginBottom: '12px'
                  }}>
                    {feature.icon}
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
                    fontSize: '13px',
                    color: '#6b7280',
                    lineHeight: '1.5'
                  }}>
                    {feature.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default HouseholdOperations;