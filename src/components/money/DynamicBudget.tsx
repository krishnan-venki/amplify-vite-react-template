
import {  TrendingUp, Zap  } from 'lucide-react';

export const DynamicBudgetSection = () => {
  const budgetCategories = [
    { 
      category: 'Groceries', 
      icon: '🛒',
      allocated: 700, 
      spent: 420, 
      percentage: 60,
      trend: 'on-track',
      color: '#10b981',
      insight: 'Meal prepping keeping you on track'
    },
    { 
      category: 'Dining Out', 
      icon: '🍽️',
      allocated: 250, 
      spent: 120, 
      percentage: 48,
      trend: 'under',
      color: '#3b82f6',
      insight: 'Under budget - reallocate $50?'
    },
    { 
      category: 'Transportation', 
      icon: '🚗',
      allocated: 350, 
      spent: 280, 
      percentage: 80,
      trend: 'watch',
      color: '#f59e0b',
      insight: 'Gas prices up 8% this month'
    },
    { 
      category: 'Entertainment', 
      icon: '🎬',
      allocated: 150, 
      spent: 95, 
      percentage: 63,
      trend: 'on-track',
      color: '#8b5cf6',
      insight: 'Consistent with your habits'
    }
  ];

  const budgetingMethods = [
    { 
      method: 'Zero-Based', 
      icon: '🎯', 
      desc: 'Assign every dollar to a purpose',
      color: '#10b981',
      users: '2.4M users'
    },
    { 
      method: 'Envelope', 
      icon: '✉️', 
      desc: 'Digital envelopes for categories',
      color: '#3b82f6',
      users: '1.8M users'
    },
    { 
      method: '50/30/20 Rule', 
      icon: '📊', 
      desc: 'Needs, wants, and savings split',
      color: '#8b5cf6',
      users: '3.1M users'
    },
    { 
      method: 'Pay Yourself First', 
      icon: '💰', 
      desc: 'Automate savings, spend the rest',
      color: '#f59e0b',
      users: '2.9M users'
    }
  ];

  const adaptiveInsights = [
    {
      trigger: 'Life Change Detected',
      icon: '👶',
      change: 'New baby expenses starting',
      action: 'Increase childcare budget by $400/month',
      adjustment: '+$400',
      color: '#ec4899'
    },
    {
      trigger: 'Seasonal Pattern',
      icon: '❄️',
      change: 'Winter heating costs rising',
      action: 'Adjust utilities budget from $120 to $180',
      adjustment: '+$60',
      color: '#06b6d4'
    },
    {
      trigger: 'Goal Progress',
      icon: '🎯',
      change: 'Emergency fund complete',
      action: 'Redirect $400 to investment account',
      adjustment: '$400',
      color: '#10b981'
    }
  ];

  return (
    <section style={{ 
      background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #e9d5ff 100%)',
      padding: '80px 24px',
      margin: '0',
      minHeight: '100vh'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{
            fontWeight: '100',
            marginBottom: '24px',
            lineHeight: '1.2',
            fontSize: 'clamp(36px, 4vw, 56px)',
          }}>
            <span style={{ color: '#1d1d1f' }}>Budgets.</span>{' '}
            <span style={{
              background: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}>Breathe With Life.</span>
          </h2>

          <p style={{
            fontSize: '1.15rem',
            color: '#6b7280',
            lineHeight: '1.7',
            maxWidth: '800px',
            margin: '0 auto 32px'
          }}>
            AI-powered budgets that adapt to life changes, learn from your patterns, and proactively suggest optimizations. Multiple methodologies supported with real-time monitoring and predictive adjustments.
          </p>

          {/* Feature Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {[
              'AI-Powered Adjustments',
              'Multiple Methodologies',
              'Real-Time Monitoring',
              'Smart Reallocation',
              'Household Sharing',
              'Predictive Analytics'
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

        {/* Budget Categories Overview */}
        <div style={{ marginBottom: '80px' }}>
          <h3 style={{
            fontSize: '1.8rem',
            fontWeight: 600,
            color: '#1e293b',
            marginBottom: '32px',
            textAlign: 'center'
          }}>
            Real-Time Budget Tracking
          </h3>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {budgetCategories.map((cat, idx) => (
              <div key={idx} style={{
                background: 'white',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                border: `2px solid ${cat.color}20`,
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 8px 24px ${cat.color}30`;
                e.currentTarget.style.borderColor = cat.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
                e.currentTarget.style.borderColor = `${cat.color}20`;
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: `${cat.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px'
                  }}>
                    {cat.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b' }}>
                      {cat.category}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                      ${cat.spent} of ${cat.allocated}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div style={{
                  width: '100%',
                  height: '10px',
                  background: '#e2e8f0',
                  borderRadius: '5px',
                  overflow: 'hidden',
                  marginBottom: '12px'
                }}>
                  <div style={{
                    width: `${Math.min(cat.percentage, 100)}%`,
                    height: '100%',
                    background: cat.percentage > 90 ? '#ef4444' : cat.color,
                    borderRadius: '5px',
                    transition: 'width 0.5s ease'
                  }} />
                </div>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <span style={{
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: cat.color
                  }}>
                    {cat.percentage}% Used
                  </span>
                  {cat.trend === 'under' && (
                    <span style={{
                      fontSize: '0.75rem',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      background: '#dcfce7',
                      color: '#166534',
                      fontWeight: 600
                    }}>
                      Under Budget
                    </span>
                  )}
                  {cat.trend === 'watch' && (
                    <span style={{
                      fontSize: '0.75rem',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      background: '#fef3c7',
                      color: '#92400e',
                      fontWeight: 600
                    }}>
                      Monitor
                    </span>
                  )}
                </div>

                <div style={{
                  fontSize: '0.85rem',
                  color: '#64748b',
                  fontStyle: 'italic',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <TrendingUp size={14} color={cat.color} />
                  {cat.insight}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Methodologies Section */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: 600,
              color: '#1e293b',
              marginBottom: '16px'
            }}>
              Choose Your Budgeting Philosophy
            </h3>
            <p style={{
              fontSize: '1.05rem',
              color: '#6b7280',
              lineHeight: '1.7',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Zero-based, envelope, 50/30/20, or pay yourself first—Sagaa supports what works for you and adapts as your life changes.
            </p>
          </div>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px'
          }}>
            {budgetingMethods.map((method, idx) => (
              <div key={idx} style={{
                background: 'white',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                border: `2px solid ${method.color}20`,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = `0 8px 24px ${method.color}30`;
                e.currentTarget.style.borderColor = method.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
                e.currentTarget.style.borderColor = `${method.color}20`;
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: `${method.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  margin: '0 auto 16px'
                }}>
                  {method.icon}
                </div>
                <h4 style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: 600, 
                  color: '#1e293b', 
                  marginBottom: '8px' 
                }}>
                  {method.method}
                </h4>
                <p style={{ 
                  fontSize: '0.9rem', 
                  color: '#64748b', 
                  lineHeight: 1.5, 
                  marginBottom: '12px' 
                }}>
                  {method.desc}
                </p>
                <div style={{ 
                  fontSize: '0.8rem', 
                  color: method.color, 
                  fontWeight: 600 
                }}>
                  {method.users}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Adaptive Intelligence Section */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: 600,
              color: '#1e293b',
              marginBottom: '16px'
            }}>
              Life-Aware Budget Adjustments
            </h3>
            <p style={{
              fontSize: '1.05rem',
              color: '#6b7280',
              lineHeight: '1.7',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              Sagaa continuously monitors your life context and automatically suggests budget adjustments when patterns change. New baby? Job change? Moving? Your budget adapts proactively.
            </p>
          </div>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px'
          }}>
            {adaptiveInsights.map((insight, idx) => (
              <div key={idx} style={{
                background: 'white',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                border: `2px solid ${insight.color}20`,
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(4px)';
                e.currentTarget.style.boxShadow = `0 4px 16px ${insight.color}30`;
                e.currentTarget.style.borderColor = insight.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
                e.currentTarget.style.borderColor = `${insight.color}20`;
              }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '14px',
                    background: `${insight.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    flexShrink: 0
                  }}>
                    {insight.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.5px',
                      color: insight.color,
                      marginBottom: '8px',
                      textTransform: 'uppercase'
                    }}>
                      {insight.trigger}
                    </div>
                    <div style={{ 
                      fontSize: '1.05rem', 
                      fontWeight: 600, 
                      color: '#1e293b', 
                      marginBottom: '6px' 
                    }}>
                      {insight.change}
                    </div>
                    <div style={{ 
                      fontSize: '0.9rem', 
                      color: '#64748b', 
                      marginBottom: '14px',
                      lineHeight: 1.5
                    }}>
                      {insight.action}
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center' 
                    }}>
                      <span style={{
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        color: insight.color
                      }}>
                        {insight.adjustment}
                      </span>
                      <button style={{
                        background: insight.color,
                        color: 'white',
                        border: 'none',
                        padding: '8px 18px',
                        borderRadius: '10px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}>
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Smart Reallocation Example */}
          <div style={{
            marginTop: '40px',
            background: 'white',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            border: '2px solid #10b98120'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              marginBottom: '16px' 
            }}>
              <Zap size={24} color="#10b981" />
              <h4 style={{ 
                fontSize: '1.2rem', 
                fontWeight: 600, 
                margin: 0, 
                color: '#374151' 
              }}>
                Smart Reallocation in Action
              </h4>
            </div>
            <p style={{ 
              fontSize: '1rem', 
              color: '#64748b', 
              lineHeight: 1.6, 
              fontStyle: 'italic', 
              margin: 0,
              padding: '16px',
              background: '#f0fdf4',
              borderRadius: '12px',
              borderLeft: '4px solid #10b981'
            }}>
              "Your grocery spending ($420) is 30% over budget, but dining out is $120 under. I see you've been meal prepping (detected via Sunday grocery trips + reduced weekday restaurant visits). Should I reallocate $50/month from dining to groceries to reflect your new healthy habit?"
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default DynamicBudgetSection;