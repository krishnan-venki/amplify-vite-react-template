import React, { useState } from 'react';
import { Target, TrendingUp, Zap } from 'lucide-react';

export const DynamicBudgetSection: React.FC = () => {
  const [selectedBudgetView, setSelectedBudgetView] = useState('current');

  const budgetCategories = [
    { 
      category: 'Groceries', 
      icon: '🛒',
      allocated: 700, 
      spent: 420, 
      projected: 680,
      trend: 'on-track',
      color: '#10b981',
      insight: 'Meal prepping keeping you on track'
    },
    { 
      category: 'Dining Out', 
      icon: '🍽️',
      allocated: 250, 
      spent: 120, 
      projected: 230,
      trend: 'under',
      color: '#3b82f6',
      insight: 'Under budget - reallocate $50?'
    },
    { 
      category: 'Transportation', 
      icon: '🚗',
      allocated: 350, 
      spent: 280, 
      projected: 365,
      trend: 'over',
      color: '#f59e0b',
      insight: 'Gas prices up 8% this month'
    },
    { 
      category: 'Entertainment', 
      icon: '🎬',
      allocated: 150, 
      spent: 95, 
      projected: 140,
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

          {/* Feature Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginTop: '32px' }}>
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

        {/* Main Budget Tracking Section */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 400px',
            gap: '32px',
            alignItems: 'start'
          }}>
            
            {/* Left Side - Budget Categories Grid */}
            <div>
              {/* View Selector */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                <button
                  onClick={() => setSelectedBudgetView('current')}
                  style={{
                    flex: 1,
                    background: selectedBudgetView === 'current' ? 'linear-gradient(135deg, #059669 0%, #10b981 100%)' : 'white',
                    color: selectedBudgetView === 'current' ? 'white' : '#6b7280',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                  }}
                >
                  Current Month
                </button>
                <button
                  onClick={() => setSelectedBudgetView('projected')}
                  style={{
                    flex: 1,
                    background: selectedBudgetView === 'projected' ? 'linear-gradient(135deg, #059669 0%, #10b981 100%)' : 'white',
                    color: selectedBudgetView === 'projected' ? 'white' : '#6b7280',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                  }}
                >
                  Projected
                </button>
              </div>

              {/* Budget Categories */}
              <div style={{ 
                display: 'grid',
                gap: '16px'
              }}>
                {budgetCategories.map((cat, idx) => {
                  const percentage = selectedBudgetView === 'current' 
                    ? (cat.spent / cat.allocated) * 100 
                    : (cat.projected / cat.allocated) * 100;
                  const amount = selectedBudgetView === 'current' ? cat.spent : cat.projected;
                  
                  return (
                    <div key={idx} style={{
                      background: 'white',
                      borderRadius: '12px',
                      padding: '16px',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                      border: `2px solid ${cat.color}20`,
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = `0 4px 16px ${cat.color}30`;
                      e.currentTarget.style.borderColor = cat.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
                      e.currentTarget.style.borderColor = `${cat.color}20`;
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            background: `${cat.color}15`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '20px'
                          }}>
                            {cat.icon}
                          </div>
                          <div>
                            <div style={{ fontSize: '1rem', fontWeight: 600, color: '#1e293b' }}>
                              {cat.category}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                              {cat.insight}
                            </div>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: cat.color }}>
                            ${amount}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                            of ${cat.allocated}
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div style={{
                        width: '100%',
                        height: '8px',
                        background: '#e2e8f0',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        marginBottom: '10px'
                      }}>
                        <div style={{
                          width: `${Math.min(percentage, 100)}%`,
                          height: '100%',
                          background: percentage > 100 ? '#ef4444' : percentage > 90 ? '#f59e0b' : cat.color,
                          borderRadius: '4px',
                          transition: 'width 0.5s ease'
                        }} />
                      </div>

                      {/* Status Badge */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: percentage > 100 ? '#ef4444' : percentage > 90 ? '#f59e0b' : cat.color,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          {Math.round(percentage)}% {selectedBudgetView === 'current' ? 'Spent' : 'Projected'}
                        </span>
                        {cat.trend === 'under' && (
                          <span style={{
                            fontSize: '0.7rem',
                            padding: '3px 10px',
                            borderRadius: '10px',
                            background: '#dcfce7',
                            color: '#166534',
                            fontWeight: 600
                          }}>
                            Under Budget
                          </span>
                        )}
                        {cat.trend === 'over' && (
                          <span style={{
                            fontSize: '0.7rem',
                            padding: '3px 10px',
                            borderRadius: '10px',
                            background: '#fee2e2',
                            color: '#991b1b',
                            fontWeight: 600
                          }}>
                            Over Budget
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Side - Title, Description, and Age of Money Card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
                  ADAPTIVE INTELLIGENCE
                </div>
                
                <p style={{
                  fontSize: '1.05rem',
                  color: '#6b7280',
                  lineHeight: '1.7',
                  margin: 0
                }}>
                  AI-powered budgets that adapt to life changes, learn from your patterns, and proactively suggest optimizations. Multiple methodologies supported with real-time monitoring and predictive adjustments.
                </p>
              </div>

              {/* Age of Money Card */}
              <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                border: '2px solid #10b981'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <Target size={20} color="#10b981" />
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 600, margin: 0, color: '#374151' }}>
                    Age of Money
                  </h4>
                </div>

                <div style={{
                  background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                  borderRadius: '10px',
                  padding: '16px',
                  marginBottom: '14px',
                  border: '1px solid #10b981'
                }}>
                  <div style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '6px' }}>
                    CURRENT STATUS
                  </div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#065f46', marginBottom: '4px', lineHeight: '1' }}>
                    23
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#059669', fontWeight: 600 }}>
                    days
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'start',
                  gap: '10px',
                  background: '#fef3c7',
                  padding: '12px',
                  borderRadius: '8px',
                  borderLeft: '3px solid #f59e0b'
                }}>
                  <TrendingUp size={16} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#92400e', marginBottom: '4px' }}>
                      Great Progress!
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#78350f', lineHeight: 1.5 }}>
                      Up from 12 days three months ago. You're living less paycheck-to-paycheck.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Budget Methodologies Section */}
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
                YOUR WAY, YOUR METHOD
              </div>
              
              <p style={{
                fontSize: '1.05rem',
                color: '#6b7280',
                lineHeight: '1.7',
                margin: 0,
                marginBottom: '16px'
              }}>
                Choose the budgeting methodology that fits your psychology. Zero-based, envelope, 50/30/20, or pay yourself first—Sagaa supports what works for you and adapts as your life changes.
              </p>

              <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '16px',
                border: '2px solid #10b98120',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '20px' }}>✨</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#059669' }}>
                    AI-Powered Recommendation
                  </span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                  Not sure which method suits you? Sagaa analyzes your spending patterns, financial goals, and behavioral psychology to recommend the approach most likely to succeed for your situation.
                </p>
              </div>
            </div>

            {/* Right Side - Method Cards */}
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px'
            }}>
              {budgetingMethods.map((method, idx) => (
                <div key={idx} style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '18px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  border: `2px solid ${method.color}20`,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = `0 6px 20px ${method.color}30`;
                  e.currentTarget.style.borderColor = method.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
                  e.currentTarget.style.borderColor = `${method.color}20`;
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: `${method.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    marginBottom: '12px'
                  }}>
                    {method.icon}
                  </div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                    {method.method}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.4, marginBottom: '10px' }}>
                    {method.desc}
                  </p>
                  <div style={{ fontSize: '0.75rem', color: method.color, fontWeight: 600 }}>
                    {method.users}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Adaptive Intelligence Section */}
        <div>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 400px',
            gap: '32px',
            alignItems: 'start'
          }}>
            
            {/* Left Side - Adaptive Insights Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {adaptiveInsights.map((insight, idx) => (
                <div key={idx} style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '18px',
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
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: `${insight.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      flexShrink: 0
                    }}>
                      {insight.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '0.5px',
                        color: insight.color,
                        marginBottom: '6px',
                        textTransform: 'uppercase'
                      }}>
                        {insight.trigger}
                      </div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1e293b', marginBottom: '4px' }}>
                        {insight.change}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '10px' }}>
                        {insight.action}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{
                          fontSize: '1.1rem',
                          fontWeight: 700,
                          color: insight.color
                        }}>
                          {insight.adjustment}
                        </span>
                        <button style={{
                          background: insight.color,
                          color: 'white',
                          border: 'none',
                          padding: '6px 16px',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
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
                          Apply Adjustment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side - Title and Description */}
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
                LIFE-AWARE BUDGETING
              </div>
              
              <p style={{
                fontSize: '1.05rem',
                color: '#6b7280',
                lineHeight: '1.7',
                margin: 0,
                marginBottom: '24px'
              }}>
                Sagaa continuously monitors your life context and automatically suggests budget adjustments when patterns change. New baby? Job change? Moving? Your budget adapts proactively.
              </p>

              {/* Smart Reallocation Example Card */}
              <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '18px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                border: '2px solid #10b98120'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <Zap size={20} color="#10b981" />
                  <h4 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, color: '#374151' }}>
                    Smart Reallocation
                  </h4>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.5, fontStyle: 'italic', margin: 0 }}>
                  "Your grocery spending ($420) is 30% over budget, but dining out is $120 under. I see you've been meal prepping (detected via Sunday grocery trips + reduced weekday restaurant visits). Should I reallocate $50/month from dining to groceries to reflect your new healthy habit?"
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default DynamicBudgetSection;