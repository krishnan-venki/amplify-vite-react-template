import { useState } from 'react';
import { MessageCircle, Send, Sparkles, TrendingUp } from 'lucide-react';
import sagaaIcon from '../../assets/sagaa_48x48.png';

export const AskSagaaSection = () => {
  const [activeChatExample, setActiveChatExample] = useState(0);

  const chatExamples = [
    {
      category: "Visual Analytics",
      question: "Show me my spending trend for the last 6 months",
      response: "Here's your spending pattern over the last 6 months. I've noticed a 15% decrease in dining out (great job on meal prepping!) but a 23% increase in transportation costs. Your car maintenance in Month 4 was a one-time expense, but gas prices have been trending up. Overall, you're spending $280 less per month compared to 6 months ago.",
      tags: ["Dashboard", "Expense Analysis", "Trends"],
      tagColors: ["#10b981", "#3b82f6", "#8b5cf6"],
      hasVisual: true,
      chartData: [
        { month: 'Jan', dining: 420, transport: 280, groceries: 380, other: 520 },
        { month: 'Feb', dining: 380, transport: 290, groceries: 360, other: 490 },
        { month: 'Mar', dining: 340, transport: 310, groceries: 370, other: 510 },
        { month: 'Apr', dining: 320, transport: 580, groceries: 350, other: 480 },
        { month: 'May', dining: 290, transport: 340, groceries: 340, other: 500 },
        { month: 'Jun', dining: 280, transport: 350, groceries: 360, other: 490 }
      ]
    },
    {
      category: "Retirement Impact Modeling",
      question: "What's the impact on my retirement if I buy a $1.2M house now? Show me the projection.",
      response: "I've modeled your retirement trajectory with an immediate $1.2M home purchase. With a 20% down payment ($240K), your net worth drops significantly initially, but building home equity of $890K by retirement substantially offsets this impact. Your projected net worth at 65 is $1.87M (with house) vs $2.1M (baseline). Retirement confidence score: 76% vs 82% baseline. The $230K difference reflects the opportunity cost of the down payment plus higher housing costs vs. renting, but you gain inflation protection, forced savings through equity buildup, and housing stability for 33 years. Property appreciation at 3.5% annually adds significant value.",
      tags: ["Retirement Planning", "Life Modeling", "What-If Analysis"],
      tagColors: ["#8b5cf6", "#3b82f6", "#f59e0b"],
      hasVisual: true,
      chartData: [
        { age: 32, baseline: 325, withHouse: 85 },
        { age: 35, baseline: 480, withHouse: 290 },
        { age: 40, baseline: 680, withHouse: 520 },
        { age: 45, baseline: 950, withHouse: 810 },
        { age: 50, baseline: 1280, withHouse: 1150 },
        { age: 55, baseline: 1650, withHouse: 1520 },
        { age: 60, baseline: 1920, withHouse: 1750 },
        { age: 65, baseline: 2100, withHouse: 1870 }
      ]
    },
    {
      category: "Predictive Intelligence",
      question: "Will I have enough money for my bills next month?",
      response: "Cash flow alert: Your car insurance ($180), Amazon Prime ($139), and water bill ($87) all hit June 15-20. Your checking will drop to $340 after these bills. I can: (1) Move $250 from savings on June 14th, (2) Delay gym membership charge ($65) by one week, or (3) Wait for your client payment ($850) expected June 18th—but it's historically 3-5 days late. I recommend option 1 for safety.",
      tags: ["Cash Flow", "Bill Optimization", "Smart Alerts"],
      tagColors: ["#06b6d4", "#f59e0b", "#ef4444"],
      hasVisual: false
    },
    {
      category: "Community Wisdom",
      question: "Why am I always over budget on groceries?",
      response: "I've noticed you shop on weekday evenings when you're always tired, which leads to 23% more impulse purchases. Users in Seattle with your income who switched to Sunday meal planning reduced grocery spending by an average of $85/month. Want me to help you create a meal plan?",
      tags: ["Expense Tracking", "Budget", "Community Insights"],
      tagColors: ["#3b82f6", "#10b981", "#ec4899"],
      hasVisual: false
    },
    {
      category: "Long-term Strategy",
      question: "How do I get out of debt faster?",
      response: "Your student loan rate is 6.8% ($42K remaining). I found refinancing at 4.2%, saving $4,300 over 4 years. Your credit score (740) qualifies you. Once you eliminate your car loan ($13,800, 18 months left), I'll redirect that $380/month to student loans, moving your debt-free date from July 2029 to November 2027. That's 20 months faster.",
      tags: ["Debt Elimination", "Savings Strategy", "Credit Score"],
      tagColors: ["#ec4899", "#10b981", "#8b5cf6"],
      hasVisual: false
    }
  ];

  type ChartDataItem = {
    month?: string;
    dining?: number;
    transport?: number;
    groceries?: number;
    other?: number;
    age?: number;
    baseline?: number;
    withHouse?: number;
  };

  const SpendingChart = ({ data }: { data: ChartDataItem[] }) => {
    const isRetirementData = data.some(d => d.age !== undefined);
    
    const maxValue = isRetirementData 
      ? Math.max(...data.flatMap(d => [d.baseline || 0, d.withHouse || 0]))
      : Math.max(...data.flatMap(d => [d.dining || 0, d.transport || 0, d.groceries || 0, d.other || 0]));
    
    const chartHeight = 160;
    const barWidth = 12;
    const groupGap = 32;

    return (
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '12px',
        padding: '16px',
        marginTop: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        width: '100%',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
            {isRetirementData ? 'Net Worth Projection to Retirement' : '6-Month Spending Breakdown'}
          </h4>
          <div style={{ display: 'flex', gap: '8px', fontSize: '10px', flexWrap: 'wrap' }}>
            {isRetirementData ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '2px' }} />
                  <span style={{ color: '#64748b' }}>Baseline</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '10px', height: '10px', background: '#f59e0b', borderRadius: '2px' }} />
                  <span style={{ color: '#64748b' }}>With House</span>
                </div>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '10px', height: '10px', background: '#ef4444', borderRadius: '2px' }} />
                  <span style={{ color: '#64748b' }}>Dining</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '10px', height: '10px', background: '#f59e0b', borderRadius: '2px' }} />
                  <span style={{ color: '#64748b' }}>Transport</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '2px' }} />
                  <span style={{ color: '#64748b' }}>Groceries</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '10px', height: '10px', background: '#3b82f6', borderRadius: '2px' }} />
                  <span style={{ color: '#64748b' }}>Other</span>
                </div>
              </>
            )}
          </div>
        </div>

        <div style={{ width: '100%', overflowX: 'auto', overflowY: 'hidden' }}>
          <svg width="100%" height={chartHeight + 30} viewBox={`0 0 ${data.length * (isRetirementData ? 70 : barWidth * 4 + groupGap) + 20} ${chartHeight + 30}`} preserveAspectRatio="xMidYMid meet" style={{ minWidth: `${data.length * (isRetirementData ? 70 : barWidth * 4 + groupGap) + 20}px` }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={i}
                x1="0"
                y1={chartHeight - (i * chartHeight / 4)}
                x2="100%"
                y2={chartHeight - (i * chartHeight / 4)}
                stroke="#e2e8f0"
                strokeWidth="1"
              />
            ))}

            {isRetirementData ? (
              <>
                <path
                  d={data.map((d, i) => {
                    const x = i * 70 + 35;
                    const y = chartHeight - ((d.baseline || 0) / maxValue) * chartHeight;
                    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                  }).join(' ')}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeDasharray="6,4"
                >
                  <animate attributeName="stroke-dashoffset" from="1000" to="0" dur="1.5s" fill="freeze" />
                </path>
                <path
                  d={data.map((d, i) => {
                    const x = i * 70 + 35;
                    const y = chartHeight - ((d.withHouse || 0) / maxValue) * chartHeight;
                    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                  }).join(' ')}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3"
                >
                  <animate attributeName="stroke-dashoffset" from="1000" to="0" dur="1.5s" fill="freeze" />
                </path>
                {data.map((d, i) => (
                  <g key={i}>
                    <circle
                      cx={i * 70 + 35}
                      cy={chartHeight - ((d.baseline || 0) / maxValue) * chartHeight}
                      r="4"
                      fill="#10b981"
                    >
                      <animate attributeName="r" from="0" to="4" dur="0.5s" begin={`${i * 0.1}s`} fill="freeze" />
                    </circle>
                    <circle
                      cx={i * 70 + 35}
                      cy={chartHeight - ((d.withHouse || 0) / maxValue) * chartHeight}
                      r="4"
                      fill="#f59e0b"
                    >
                      <animate attributeName="r" from="0" to="4" dur="0.5s" begin={`${i * 0.1 + 0.2}s`} fill="freeze" />
                    </circle>
                    <text x={i * 70 + 35} y={chartHeight + 18} textAnchor="middle" fontSize="11" fill="#64748b" fontWeight="500">
                      {d.age}
                    </text>
                  </g>
                ))}
              </>
            ) : (
              data.map((monthData, monthIndex) => {
                const xBase = monthIndex * (barWidth * 4 + groupGap);
                
                return (
                  <g key={monthIndex}>
                    <rect
                      x={xBase}
                      y={chartHeight - ((monthData.dining || 0) / maxValue) * chartHeight}
                      width={barWidth - 1}
                      height={((monthData.dining || 0) / maxValue) * chartHeight}
                      fill="#ef4444"
                      rx="2"
                    >
                      <animate attributeName="height" from="0" to={((monthData.dining || 0) / maxValue) * chartHeight} dur="0.8s" fill="freeze" />
                      <animate attributeName="y" from={chartHeight} to={chartHeight - ((monthData.dining || 0) / maxValue) * chartHeight} dur="0.8s" fill="freeze" />
                    </rect>

                    <rect
                      x={xBase + barWidth}
                      y={chartHeight - ((monthData.transport || 0) / maxValue) * chartHeight}
                      width={barWidth - 1}
                      height={((monthData.transport || 0) / maxValue) * chartHeight}
                      fill="#f59e0b"
                      rx="2"
                    >
                      <animate attributeName="height" from="0" to={((monthData.transport || 0) / maxValue) * chartHeight} dur="0.8s" begin="0.1s" fill="freeze" />
                      <animate attributeName="y" from={chartHeight} to={chartHeight - ((monthData.transport || 0) / maxValue) * chartHeight} dur="0.8s" begin="0.1s" fill="freeze" />
                    </rect>

                    <rect
                      x={xBase + barWidth * 2}
                      y={chartHeight - ((monthData.groceries || 0) / maxValue) * chartHeight}
                      width={barWidth - 1}
                      height={((monthData.groceries || 0) / maxValue) * chartHeight}
                      fill="#10b981"
                      rx="2"
                    >
                      <animate attributeName="height" from="0" to={((monthData.groceries || 0) / maxValue) * chartHeight} dur="0.8s" begin="0.2s" fill="freeze" />
                      <animate attributeName="y" from={chartHeight} to={chartHeight - ((monthData.groceries || 0) / maxValue) * chartHeight} dur="0.8s" begin="0.2s" fill="freeze" />
                    </rect>

                    <rect
                      x={xBase + barWidth * 3}
                      y={chartHeight - ((monthData.other || 0) / maxValue) * chartHeight}
                      width={barWidth - 1}
                      height={((monthData.other || 0) / maxValue) * chartHeight}
                      fill="#3b82f6"
                      rx="2"
                    >
                      <animate attributeName="height" from="0" to={((monthData.other || 0) / maxValue) * chartHeight} dur="0.8s" begin="0.3s" fill="freeze" />
                      <animate attributeName="y" from={chartHeight} to={chartHeight - ((monthData.other || 0) / maxValue) * chartHeight} dur="0.8s" begin="0.3s" fill="freeze" />
                    </rect>

                    <text x={xBase + barWidth * 2} y={chartHeight + 18} textAnchor="middle" fontSize="11" fill="#64748b" fontWeight="500">
                      {monthData.month}
                    </text>
                  </g>
                );
              })
            )}
          </svg>
        </div>

        <div style={{
          marginTop: '12px',
          padding: '10px 12px',
          background: isRetirementData ? '#fef3c7' : '#f0fdf4',
          borderRadius: '8px',
          borderLeft: `3px solid ${isRetirementData ? '#f59e0b' : '#10b981'}`
        }}>
          <div style={{ display: 'flex', alignItems: 'start', gap: '8px' }}>
            <TrendingUp size={14} color={isRetirementData ? '#f59e0b' : '#10b981'} style={{ marginTop: '2px', flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: '12px', color: isRetirementData ? '#92400e' : '#065f46', fontWeight: 600, margin: '0 0 4px 0' }}>
                {isRetirementData ? 'Retirement Impact Analysis' : 'Great progress!'}
              </p>
              <p style={{ fontSize: '11px', color: isRetirementData ? '#78350f' : '#047857', margin: 0, lineHeight: 1.4 }}>
                {isRetirementData 
                  ? '$1.2M home purchase creates $230K net worth difference vs baseline, but builds $890K equity by retirement. 76% confidence maintained.'
                  : "You're spending $280 less per month vs. 6 months ago. Keep up the meal prep habit!"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section style={{
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2d2d2d 100%)',
      padding: '80px 24px 60px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-150px',
        left: '-150px',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(0, 122, 255, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: '60px',
          position: 'relative'
        }}>
          
          <div style={{ minWidth: '400px', maxWidth: '400px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
              padding: '8px 20px',
              borderRadius: '20px',
              marginBottom: '24px',
              boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)'
            }}>
              <Sparkles size={18} color="white" />
              <span style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '1px',
                color: 'white'
              }}>
                Ask Sagaa Anything
              </span>
            </div>

            <h2 id="title-anchor" style={{
              fontSize: 'clamp(28px, 3vw, 36px)',
              fontWeight: 600,
              color: 'white',
              marginBottom: '16px',
              lineHeight: 1.2
            }}>
              Natural Conversation.{' '}
              <span style={{
                background: 'linear-gradient(135deg, #34d399 0%, #10b981 50%, #059669 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent'
              }}>
                Context-aware Answers.
              </span>
            </h2>

            <p style={{
              fontSize: '1rem',
              color: '#9ca3af',
              lineHeight: 1.7,
              marginBottom: '32px'
            }}>
              Just ask Sagaa your financial questions and get personalized, context-aware guidance that connects all aspects of your money.
            </p>

           
          </div>

          <div style={{ 
            flex: 1, 
            minWidth: 0,
            position: 'relative',
            top: '0'
          }}>
            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-start',
              marginBottom: '24px',
              marginTop: '0'
            }}>
              {chatExamples.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveChatExample(idx)}
                  style={{
                    width: '60px',
                    height: '4px',
                    background: activeChatExample === idx 
                      ? 'linear-gradient(90deg, #059669 0%, #10b981 100%)' 
                      : 'rgba(255, 255, 255, 0.2)',
                    border: 'none',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0,
                    boxShadow: activeChatExample === idx ? '0 2px 8px rgba(16, 185, 129, 0.4)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (activeChatExample !== idx) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeChatExample !== idx) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                    }
                  }}
                  aria-label={`Example ${idx + 1}`}
                />
              ))}
            </div>

            <div style={{
              background: 'white',
              borderRadius: '20px',
              boxShadow: '0 8px 40px 0 rgba(16, 185, 129, 0.32), 0 1.5px 8px 0 rgba(16,185,129,0.18)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              overflow: 'hidden'
            }}>
              <div style={{
                padding: '20px 24px',
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div>
                  <img src={sagaaIcon} alt="Sagaa icon" style={{ width: 34, height: 38, verticalAlign: 'middle' }} />
                </div>
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: '#1e293b' }}>
                    Sagaa Money
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    Always learning, always helping
                  </div>
                </div>
              </div>

              <div style={{
                padding: '24px 20px',
                height: '500px',
                background: '#fafafa',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                overflowY: 'auto',
                overflowX: 'hidden'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}>
                  <div style={{
                     background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)',
                    color: 'white',
                    padding: '14px 20px',
                    borderRadius: '20px 20px 4px 20px',
                    maxWidth: '75%',
                    fontSize: '0.95rem',
                    lineHeight: 1.5,
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
                  }}>
                    {chatExamples[activeChatExample].question}
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'start',
                  gap: '12px'
                }}>
                  <div>
                    <img src={sagaaIcon} alt="Sagaa icon" style={{ width: 34, height: 38, verticalAlign: 'middle' }} />
                  </div>
                  <div style={{ flex: 1, maxWidth: '100%' }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                      padding: '16px 20px',
                      borderRadius: '4px 20px 20px 20px',
                      fontSize: '0.9rem',
                      lineHeight: 1.7,
                      color: 'white',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      border: '1px solid #f1f5f9',
                      width: '100%',
                      overflow: 'hidden'
                    }}>
                      {chatExamples[activeChatExample].response}

                      {chatExamples[activeChatExample].hasVisual && chatExamples[activeChatExample].chartData && (
                        <SpendingChart data={chatExamples[activeChatExample].chartData} />
                      )}
                    </div>

                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      marginTop: '12px',
                      flexWrap: 'wrap'
                    }}>
                      {chatExamples[activeChatExample].tags.map((tag, idx) => (
                        <div
                          key={idx}
                          style={{
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            background: `${chatExamples[activeChatExample].tagColors[idx]}15`,
                            color: chatExamples[activeChatExample].tagColors[idx],
                            border: `1px solid ${chatExamples[activeChatExample].tagColors[idx]}30`
                          }}
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{
                padding: '16px 20px',
                background: 'white',
                borderTop: '1px solid #e2e8f0'
              }}>
                <div style={{
                  background: '#f8fafc',
                  border: '2px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  opacity: 0.6
                }}>
                  <MessageCircle size={20} color="#64748b" />
                  <input
                    type="text"
                    placeholder="Ask Sagaa about your finances..."
                    disabled
                    style={{
                      flex: 1,
                      border: 'none',
                      outline: 'none',
                      fontSize: '0.9rem',
                      color: '#64748b',
                      background: 'transparent'
                    }}
                  />
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: '#e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Send size={18} color="#64748b" />
                  </div>
                </div>
                
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AskSagaaSection;