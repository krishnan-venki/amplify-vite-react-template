import React from 'react';
import { TrendingUp, Tag, Zap } from 'lucide-react';

const SmartExpenseTrackingSection: React.FC = () => {

  const spendingData = [
    { month: 'Jan', amount: 2280, stress: 'low' },
    { month: 'Feb', amount: 2520, stress: 'medium' },
    { month: 'Mar', amount: 2840, stress: 'high' },
    { month: 'Apr', amount: 2390, stress: 'low' }
  ];

  const categoryBreakdown = [
    { category: 'Dining', amount: 340, budget: 280, trend: 'up', icon: '🍽️' },
    { category: 'Office Supplies', amount: 127, budget: 150, trend: 'down', icon: '📎', taxDeductible: true },
    { category: 'Transportation', amount: 180, budget: 200, trend: 'down', icon: '🚗' },
    { category: 'Entertainment', amount: 95, budget: 100, trend: 'stable', icon: '🎬' }
  ];

  const advancedFeatures = [
    { title: 'Custom Rules Engine', desc: 'If-then rules for auto-categorization', icon: '⚙️', color: '#3b82f6' },
    { title: 'Merchant Cleanup', desc: 'Standardizes messy transaction names', icon: '✨', color: '#8b5cf6' },
    { title: 'Split Transactions', desc: 'Divides multi-category purchases', icon: '✂️', color: '#10b981' },
    { title: 'Tax Category Tagging', desc: 'Auto-identifies deductible expenses', icon: '📋', color: '#f59e0b' },
    { title: 'Receipt Scanning', desc: 'OCR extracts data from photos', icon: '📸', color: '#ec4899' },
    { title: 'Subscription Detection', desc: 'Tracks all recurring payments', icon: '🔄', color: '#06b6d4' }
  ];

  return (
    <section style={{ 
      background: '#ffffff',
      padding: '80px 24px',
      margin: '0',
      minHeight: '100vh'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{
            fontWeight: '100',
            marginBottom: '24px',
            lineHeight: '1.2',
            fontSize: 'clamp(36px, 4vw, 56px)',
          }}>
            <span style={{ color: '#1d1d1f' }}>Expense Tracking.</span>{' '}
            <span style={{
              background: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}>Beyond Transactions.</span>
          </h2>
        </div>

        {/* Main Dashboard Section - Redesigned with Overlapping Cards */}
        <div style={{ marginBottom: '140px' }}>
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
                EXPENSE INTELLIGENCE
              </div>
              
              <p style={{
                fontSize: '1.05rem',
                color: '#6b7280',
                lineHeight: '1.7',
                margin: 0
              }}>
                Automatic transaction categorization, behavioral pattern recognition, spending trigger identification, location-based insights, and anomaly detection. AI that understands not just what you spend, but why.
              </p>
            </div>

            {/* Right Side - Overlapping Cards */}
            <div style={{ 
              position: 'relative',
              minHeight: '550px',
              paddingLeft: '40px'
            }}>
              
              {/* Spending Patterns Card - Behind, positioned to the left */}
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '400px',
                background: 'white',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                border: '1px solid #e5e7eb',
                zIndex: 1
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <TrendingUp size={22} color="#f59e0b" />
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0, color: '#374151' }}>
                    Monthly Spending Trends
                  </h4>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  {spendingData.map((data, idx) => (
                    <div key={idx} style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>{data.month}</span>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1f2937' }}>${data.amount.toLocaleString()}</span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '8px',
                        background: '#e2e8f0',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${(data.amount / 3000) * 100}%`,
                          height: '100%',
                          background: data.stress === 'high' ? '#ef4444' : data.stress === 'medium' ? '#f59e0b' : '#10b981',
                          borderRadius: '4px',
                          transition: 'width 0.5s ease'
                        }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  background: '#fef3c7',
                  borderLeft: '4px solid #f59e0b',
                  padding: '16px',
                  borderRadius: '8px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                    <Zap size={18} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong style={{ color: '#92400e', display: 'block', marginBottom: '6px', fontSize: '0.9rem' }}>
                        Pattern Detected
                      </strong>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#78350f', lineHeight: 1.6 }}>
                        March spending increased 13% due to dining overspending on high-stress workdays near your office
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category Breakdown Card - In Front, overlapping slightly */}
              <div style={{
                position: 'absolute',
                top: '120px',
                left: '380px',
                width: '400px',
                background: 'white',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                border: '1px solid #e5e7eb',
                zIndex: 2
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <Tag size={22} color="#8b5cf6" />
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0, color: '#374151' }}>
                    Category Breakdown - March
                  </h4>
                </div>

                {categoryBreakdown.map((cat, idx) => (
                  <div key={idx} style={{
                    marginBottom: '18px',
                    paddingBottom: '18px',
                    borderBottom: idx < categoryBreakdown.length - 1 ? '1px solid #e2e8f0' : 'none'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '24px' }}>{cat.icon}</span>
                        <div>
                          <div style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.95rem' }}>
                            {cat.category}
                            {cat.taxDeductible && (
                              <span style={{
                                marginLeft: '8px',
                                fontSize: '0.7rem',
                                background: '#dcfce7',
                                color: '#166534',
                                padding: '3px 8px',
                                borderRadius: '12px',
                                fontWeight: 600
                              }}>
                                Tax Deductible
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                            ${cat.amount} of ${cat.budget}
                          </div>
                        </div>
                      </div>
                      <div style={{
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: cat.trend === 'up' ? '#ef4444' : cat.trend === 'down' ? '#10b981' : '#64748b'
                      }}>
                        {cat.trend === 'up' ? '↗' : cat.trend === 'down' ? '↘' : '→'} 
                        {Math.round((cat.amount / cat.budget) * 100)}%
                      </div>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '6px',
                      background: '#e2e8f0',
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${Math.min((cat.amount / cat.budget) * 100, 100)}%`,
                        height: '100%',
                        background: cat.amount > cat.budget ? '#ef4444' : '#10b981',
                        borderRadius: '3px',
                        transition: 'width 0.5s ease'
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Features Section - New Layout */}
        <div style={{ marginBottom: '64px' }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 400px',
            gap: '32px',
            alignItems: 'start'
          }}>
            
            {/* Left Side - Feature Cards Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px'
            }}>
              {advancedFeatures.map((feature, idx) => (
                <div key={idx} style={{
                  padding: '20px',
                  borderRadius: '12px',
                  background: 'white',
                  border: `2px solid ${feature.color}20`,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 6px 20px ${feature.color}25`;
                  e.currentTarget.style.borderColor = feature.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)';
                  e.currentTarget.style.borderColor = `${feature.color}20`;
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '28px' }}>{feature.icon}</span>
                    <h4 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, color: '#1e293b', flex: 1 }}>
                      {feature.title}
                    </h4>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                    {feature.desc}
                  </p>
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
                Advance Features
              </div>
              <p style={{
                fontSize: '1.05rem',
                color: '#6b7280',
                lineHeight: '1.7',
                margin: 0
              }}>
                Powerful automation and intelligence working behind the scenes. Custom rules, merchant cleanup, smart splitting, and tax categorization—all handled automatically.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartExpenseTrackingSection;