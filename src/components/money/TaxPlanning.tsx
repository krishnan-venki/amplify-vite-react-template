import { useState } from 'react';
import { FileText, TrendingDown, Calendar, Lightbulb } from 'lucide-react';

export const TaxOptimizationSection = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);

  const taxStrategies = [
    {
      id: 'harvest',
      icon: '📉',
      title: 'Tax-Loss Harvesting',
      savings: '$720',
      deadline: 'Dec 31st',
      status: 'Ready',
      color: '#ef4444',
      description: 'Harvest $3,000 in capital losses to offset gains',
      details: 'I identified 3 positions in your brokerage account with unrealized losses totaling $3,200. Harvesting these losses saves $720 in taxes (24% bracket). I can reinvest in similar funds to maintain your portfolio allocation while capturing the tax benefit.'
    },
    {
      id: 'retirement',
      icon: '🏦',
      title: 'IRA Contribution',
      savings: '$480',
      deadline: 'Apr 15th',
      status: 'Action Needed',
      color: '#f59e0b',
      description: 'Max your IRA - add $2,000 more',
      details: 'You\'ve contributed $4,500 to your IRA this year. Adding the remaining $2,000 before the deadline saves $480 in taxes. Your cash flow analysis shows you can comfortably afford this from your December bonus.'
    },
    {
      id: 'deductions',
      icon: '🏠',
      title: 'Home Office Deduction',
      savings: '$242',
      deadline: 'Ongoing',
      status: 'Tracked',
      color: '#10b981',
      description: 'I\'ve tracked $8,400 in eligible expenses',
      details: 'Based on your 150 sq ft dedicated home office (15% of total), I\'ve automatically categorized $8,400 in deductible expenses: internet ($840), utilities ($1,260), insurance ($420), repairs ($380), depreciation ($5,500). Documentation ready for filing.'
    },
    {
      id: 'hsa',
      icon: '🏥',
      title: 'HSA Maximization',
      savings: '$325',
      deadline: 'Dec 31st',
      status: 'Opportunity',
      color: '#8b5cf6',
      description: 'Contribute $1,350 more to HSA',
      details: 'You\'re $1,350 short of the $4,150 family HSA max. This is triple tax-advantaged: deductible now ($325 savings), grows tax-free, and withdraws tax-free for medical. Your medical expenses average $2,100/year, so you\'ll use it.'
    }
  ];

  const quarterlyEstimates = [
    { quarter: 'Q1 2025', amount: '$4,200', status: 'Paid', date: 'Apr 15', color: '#10b981' },
    { quarter: 'Q2 2025', amount: '$4,500', status: 'Paid', date: 'Jun 15', color: '#10b981' },
    { quarter: 'Q3 2025', amount: '$4,800', status: 'Due Soon', date: 'Sep 15', color: '#f59e0b' },
    { quarter: 'Q4 2025', amount: '$5,100', status: 'Projected', date: 'Jan 15', color: '#6b7280' }
  ];

  const deductibleExpenses = [
    { category: 'Home Office', amount: '$8,400', confidence: 'High', tracked: 47, icon: '🏠' },
    { category: 'Business Mileage', amount: '$2,340', confidence: 'High', tracked: 23, icon: '🚗' },
    { category: 'Professional Development', amount: '$1,850', confidence: 'Medium', tracked: 8, icon: '📚' },
    { category: 'Equipment & Software', amount: '$3,200', confidence: 'High', tracked: 12, icon: '💻' }
  ];

  const yearEndMoves = [
    {
      title: 'Charitable Giving Strategy',
      description: 'Donate appreciated stock instead of cash to avoid capital gains',
      impact: '+$180 tax savings',
      deadline: 'Dec 31st'
    },
    {
      title: 'Roth Conversion Window',
      description: 'Low-income year opportunity for tax-efficient Roth conversion',
      impact: 'Long-term tax savings',
      deadline: 'Dec 31st'
    },
    {
      title: 'Prepay State Taxes',
      description: 'Prepay Q1 state taxes to maximize deductions this year',
      impact: '+$220 tax savings',
      deadline: 'Dec 31st'
    }
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
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{
            fontWeight: '100',
            marginBottom: '16px',
            lineHeight: '1.2',
            fontSize: 'clamp(36px, 4vw, 56px)',
          }}>
            <span style={{ color: '#1d1d1f' }}>Tax Intelligence.</span>{' '}
            <span style={{
              background: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}>Year-Round.</span>
          </h2>
        </div>

        {/* Tax Savings Opportunities Section */}
        <div style={{ marginBottom: '64px' }}>
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
                Optimization Opportunities
              </div>
              
              <p style={{
                fontSize: '1.05rem',
                color: '#6b7280',
                lineHeight: '1.7',
                margin: '0 0 20px 0'
              }}>
                Proactive strategies identified by analyzing your complete financial picture.
              </p>

              <div style={{
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                borderRadius: '12px',
                padding: '16px',
                border: '2px solid #10b981'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  marginBottom: '8px'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: '#10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px'
                  }}>
                    💰
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#047857', fontWeight: 600 }}>
                      Total Potential Savings
                    </div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#065f46', lineHeight: '1' }}>
                      $1,767
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#047857', lineHeight: 1.4 }}>
                  Before December 31st
                </div>
              </div>
            </div>

            {/* Right Side - Tax Strategies Cards */}
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px'
            }}>
              {taxStrategies.map((strategy) => (
                <div 
                  key={strategy.id}
                  onClick={() => setSelectedStrategy(selectedStrategy === strategy.id ? null : strategy.id)}
                  style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '16px',
                    border: `2px solid ${selectedStrategy === strategy.id ? strategy.color : `${strategy.color}20`}`,
                    boxShadow: selectedStrategy === strategy.id ? `0 8px 24px ${strategy.color}30` : '0 4px 12px rgba(0,0,0,0.08)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedStrategy !== strategy.id) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = `0 6px 20px ${strategy.color}25`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedStrategy !== strategy.id) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'start', gap: '12px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '28px' }}>{strategy.icon}</span>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 600, margin: '0 0 4px 0', color: '#1e293b' }}>
                        {strategy.title}
                      </h4>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{
                          fontSize: '0.75rem',
                          background: strategy.status === 'Ready' ? '#dcfce7' : strategy.status === 'Action Needed' ? '#fed7aa' : '#dbeafe',
                          color: strategy.status === 'Ready' ? '#166534' : strategy.status === 'Action Needed' ? '#9a3412' : '#1e40af',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontWeight: 600
                        }}>
                          {strategy.status}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                          Due: {strategy.deadline}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p style={{ 
                    fontSize: '0.85rem', 
                    color: '#475569', 
                    margin: '0 0 10px 0',
                    lineHeight: 1.4
                  }}>
                    {strategy.description}
                  </p>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '10px',
                    borderTop: '1px solid #e2e8f0'
                  }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 700, color: strategy.color }}>
                      {strategy.savings}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      {selectedStrategy === strategy.id ? 'Click to close ▼' : 'Click for details ▶'}
                    </span>
                  </div>

                  {selectedStrategy === strategy.id && (
                    <div style={{
                      marginTop: '16px',
                      paddingTop: '16px',
                      borderTop: '2px solid #e2e8f0',
                      background: '#f8fafc',
                      padding: '16px',
                      margin: '-16px -16px 0 -16px',
                      borderRadius: '0 0 10px 10px'
                    }}>
                      <p style={{
                        fontSize: '0.9rem',
                        color: '#334155',
                        lineHeight: 1.6,
                        margin: 0
                      }}>
                        {strategy.details}
                      </p>
                      <button style={{
                        marginTop: '12px',
                        width: '100%',
                        background: strategy.color,
                        color: 'white',
                        border: 'none',
                        padding: '10px',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}>
                        Implement Strategy
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quarterly Estimates & Deductible Expenses */}
        <div style={{ marginBottom: '64px' }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 400px',
            gap: '32px',
            alignItems: 'start'
          }}>
            
            {/* Left Side - Two Stacked Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Quarterly Tax Estimates */}
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                border: '2px solid #3b82f620'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Calendar size={24} color="#3b82f6" />
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 600, margin: 0, color: '#1e293b' }}>
                      Quarterly Tax Estimates
                    </h3>
                  </div>
                  <a href="#" style={{
                    fontSize: '0.85rem',
                    color: '#3b82f6',
                    textDecoration: 'none',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}>
                    See applicability →
                  </a>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                  {quarterlyEstimates.map((quarter, idx) => (
                    <div key={idx} style={{
                      background: quarter.status === 'Due Soon' ? '#fef3c7' : '#f8fafc',
                      borderRadius: '12px',
                      padding: '16px',
                      border: `2px solid ${quarter.color}40`
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                        <div>
                          <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
                            {quarter.quarter}
                          </div>
                          <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1e293b' }}>
                            {quarter.amount}
                          </div>
                        </div>
                        <span style={{
                          fontSize: '0.75rem',
                          background: quarter.status === 'Paid' ? '#dcfce7' : quarter.status === 'Due Soon' ? '#fed7aa' : '#f1f5f9',
                          color: quarter.status === 'Paid' ? '#166534' : quarter.status === 'Due Soon' ? '#9a3412' : '#475569',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontWeight: 600
                        }}>
                          {quarter.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        Due: {quarter.date}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  marginTop: '16px',
                  background: '#eff6ff',
                  borderRadius: '8px',
                  padding: '12px',
                  borderLeft: '3px solid #3b82f6'
                }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
                    <Lightbulb size={16} color="#3b82f6" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <p style={{ fontSize: '0.85rem', color: '#1e40af', margin: 0, lineHeight: 1.5 }}>
                      Q3 payment increased due to higher Q2 income. I've set aside funds in your tax savings account to cover it.
                    </p>
                  </div>
                </div>
              </div>

              {/* Deductible Expenses Tracking */}
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                border: '2px solid #10b98120'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <FileText size={24} color="#10b981" />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600, margin: 0, color: '#1e293b' }}>
                    Tracked Deductible Expenses
                  </h3>
                </div>

                {deductibleExpenses.map((expense, idx) => (
                  <div key={idx} style={{
                    marginBottom: idx < deductibleExpenses.length - 1 ? '16px' : 0,
                    paddingBottom: idx < deductibleExpenses.length - 1 ? '16px' : 0,
                    borderBottom: idx < deductibleExpenses.length - 1 ? '1px solid #e2e8f0' : 'none'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '24px' }}>{expense.icon}</span>
                        <div>
                          <div style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.95rem' }}>
                            {expense.category}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                            {expense.tracked} expenses tracked
                          </div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#10b981' }}>
                          {expense.amount}
                        </div>
                        <span style={{
                          fontSize: '0.7rem',
                          background: expense.confidence === 'High' ? '#dcfce7' : '#fef3c7',
                          color: expense.confidence === 'High' ? '#166534' : '#854d0e',
                          padding: '2px 6px',
                          borderRadius: '3px',
                          fontWeight: 600
                        }}>
                          {expense.confidence} Confidence
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                <div style={{
                  marginTop: '16px',
                  paddingTop: '16px',
                  borderTop: '2px solid #e2e8f0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#374151' }}>
                    Total Tracked YTD
                  </span>
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#10b981' }}>
                    $15,790
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side - Year-End Moves */}
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
                Year-End Tax Moves
              </div>
              
              <p style={{
                fontSize: '1.05rem',
                color: '#6b7280',
                lineHeight: '1.7',
                margin: '0 0 20px 0'
              }}>
                Strategic actions before December 31st.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {yearEndMoves.map((move, idx) => (
                  <div key={idx} style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '16px',
                    border: '2px solid #8b5cf620',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(4px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.15)';
                    e.currentTarget.style.borderColor = '#8b5cf6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)';
                    e.currentTarget.style.borderColor = '#8b5cf620';
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, color: '#1e293b', flex: 1 }}>
                        {move.title}
                      </h4>
                      <TrendingDown size={20} color="#8b5cf6" style={{ flexShrink: 0 }} />
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 10px 0', lineHeight: 1.4 }}>
                      {move.description}
                    </p>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: '10px',
                      borderTop: '1px solid #e2e8f0'
                    }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#8b5cf6' }}>
                        {move.impact}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        ⏰ {move.deadline}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: '20px',
                background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                borderRadius: '12px',
                padding: '16px',
                border: '2px solid #3b82f6'
              }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1e40af', margin: '0 0 6px 0' }}>
                  📅 Tax Season Prep
                </h4>
                <p style={{ fontSize: '0.8rem', color: '#1e40af', margin: 0, lineHeight: 1.4 }}>
                  All documents ready for export in January. Complete deduction report with receipts organized by category.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TaxOptimizationSection;