import { useState } from 'react';
import { MessageCircle, Send, Sparkles, TrendingUp } from 'lucide-react';
import sagaaIcon from '../../assets/sagaa_48x48.png';
import MultiDeviceMockup from './MultideviceMockup';

export const AskSagaaHealthSection = () => {
  const [activeChatExample, setActiveChatExample] = useState(0);

  const chatExamples = [
    {
      category: "Visual Health Analytics",
      question: "Show me my blood pressure trends",
      response: "Here's your blood pressure pattern over the last 3 months. Great news: your average has decreased from 142/88 to 128/82 since starting Lisinopril. I've noticed your BP is consistently higher on days you skip morning meditation and drink >2 coffees. Your cardiologist's target is <130/80 - you're there 83% of the time now vs. 34% three months ago. Your medication is working well, and your lifestyle changes (daily walks, reduced sodium) are making a real difference.",
      tags: ["Health Analytics", "Medication Tracking", "Progress Monitoring"],
      tagColors: ["#10b981", "#3b82f6", "#8b5cf6"],
      hasVisual: true,
      chartData: [
        { week: 'Week 1', systolic: 142, diastolic: 88, target: 130 },
        { week: 'Week 2', systolic: 138, diastolic: 86, target: 130 },
        { week: 'Week 4', systolic: 135, diastolic: 84, target: 130 },
        { week: 'Week 6', systolic: 132, diastolic: 82, target: 130 },
        { week: 'Week 8', systolic: 130, diastolic: 81, target: 130 },
        { week: 'Week 10', systolic: 128, diastolic: 80, target: 130 },
        { week: 'Week 12', systolic: 128, diastolic: 82, target: 130 }
      ]
    },
    {
      category: "Cross-Capability Intelligence",
      question: "Should I schedule my annual physical now or wait?",
      response: "Based on your insurance (deductible met at 85% this year) and upcoming calendar (lighter schedule next week vs. busy project month ahead), I recommend scheduling for next Tuesday or Wednesday.\n\nYour last physical was 13 months ago, and your Apple Watch shows slightly elevated resting heart rate (+8 bpm over 3 months).\n\nDr. Martinez has openings Tuesday 9 AM or Wednesday 2 PM. The Wednesday slot works better with your gym schedule and gives you recovery time before your weekend hiking trip.",
      tags: ["Appointment Scheduling", "Insurance Optimization", "Calendar Integration"],
      tagColors: ["#ef4444", "#3b82f6", "#8b5cf6"],
      hasVisual: false
    },
    {
      category: "Predictive Health Intelligence",
      question: "Why am I always tired on Mondays?",
      response: "I've analyzed 12 weeks of your health data and found a pattern:\n\n• Your weekend sleep quality drops significantly (avg 68% vs. weekday 82%)\n• You're less active on Sundays (3,200 steps vs. 9,500 avg)\n• You consume more alcohol Friday-Saturday\n• Your HRV drops 15% on Sunday nights\n\n**Community insight:** 78% of users with similar patterns improved Monday energy by maintaining consistent sleep schedules on weekends and doing light activity Sunday afternoons.\n\nWant me to create a weekend routine optimization plan?",
      tags: ["Pattern Recognition", "Sleep Analysis", "Community Insights"],
      tagColors: ["#10b981", "#8b5cf6", "#ec4899"],
      hasVisual: false
    },
    {
      category: "Activity Recommendations",
      question: "What hikes can I do this weekend?",
      response: "I see you're eager to get back outdoors! However, your urgent care visit 5 days ago noted a Grade 1 ankle sprain (right lateral), and you're still in the 7-10 day initial recovery window.\n\nBased on your activity data, you're walking normally again, but I'd recommend waiting one more week for technical trails.\n\n**This weekend, 3 ankle-friendly options near you:**\n• **Discovery Park Loop** - 2.8 miles, flat, paved (perfect for testing your ankle)\n• **Green Lake Trail** - 2.8 miles, completely flat, soft surface\n• **Seward Park Loop** - 2.4 miles, gentle grades, wide paths\n\nNext weekend, if pain-free, you can return to your usual moderate trails. Your physical therapist recommended 2 more weeks before steep/uneven terrain.",
      tags: ["Injury Recovery", "Activity Planning", "Medical History"],
      tagColors: ["#ef4444", "#10b981", "#8b5cf6"],
      hasVisual: false
    },
    {
      category: "Community Wisdom",
      question: "How can I actually stick to my pre-diabetes diet?",
      response: "I understand this is challenging - your glucose has been creeping up (last A1C: 5.9). Here's what actually worked for 847 community members with pre-diabetes who successfully reversed it:\n\n**Most effective strategy (89% success):** Focus on meal timing, not restriction. Community members found eating protein-first breakfasts and avoiding carbs after 7 PM dropped A1C by avg 0.4 points in 3 months.\n\n**Second insight:** 73% succeeded by finding ONE sustainable swap instead of total diet overhaul.\n• Popular swaps: cauliflower rice (you already like stir-fry), Greek yogurt instead of regular, walking 15min after dinner\n\n**Your specific match:** Sarah in Redmond (similar age, work stress, food preferences) reduced her A1C from 6.1 to 5.4 in 5 months. Her approach: batch-cook Sunday proteins, keep emergency snacks in car, and joined a walking group for accountability.\n\nWant me to connect you two?",
      tags: ["Community Insights", "Chronic Condition", "Behavioral Change"],
      tagColors: ["#ec4899", "#f59e0b", "#8b5cf6"],
      hasVisual: false
    },
    {
      category: "Family Health Coordination",
      question: "What health tasks do I need to handle this week for my family?",
      response: "Family health dashboard for this week:\n\n**Dad (You):**\n• Refill Lisinopril (3 days left) - I can request refill now\n• A1C recheck due (6 months since last)\n\n**Emma (8yo):**\n• 3-year vaccines overdue by 2 months - Dr. Santos has Saturday 10 AM available\n• School requires updated immunization records by Oct 30\n\n**Sarah (Partner):**\n• Annual mammogram due (turned 40 last month) - her insurance covers 100%\n\n**Max (Dog):**\n• Rabies booster due next month\n\nI can book all appointments at once: Emma's vaccines + your A1C draw at LabCorp Saturday 9 AM, then Emma's checkup at 10 AM, and Sarah's mammogram for next week. Should I proceed?",
      tags: ["Family Management", "Preventive Care", "Appointment Coordination"],
      tagColors: ["#ec4899", "#10b981", "#3b82f6"],
      hasVisual: false
    }
  ];

  type ChartDataItem = {
    week: string;
    systolic: number;
    diastolic: number;
    target: number;
  };

  const BloodPressureChart = ({ data }: { data: ChartDataItem[] }) => {
    const maxValue = 150;
    const minValue = 70;
    const chartHeight = 180;


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
            Blood Pressure Progress (3 Months)
          </h4>
          <div style={{ display: 'flex', gap: '8px', fontSize: '10px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '10px', height: '10px', background: '#ef4444', borderRadius: '2px' }} />
              <span style={{ color: '#64748b' }}>Systolic</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '10px', height: '10px', background: '#3b82f6', borderRadius: '2px' }} />
              <span style={{ color: '#64748b' }}>Diastolic</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '10px', height: '2px', background: '#10b981', borderRadius: '1px' }} />
              <span style={{ color: '#64748b' }}>Target</span>
            </div>
          </div>
        </div>

        <div style={{ width: '100%', overflowX: 'auto', overflowY: 'hidden' }}>
          <svg width="100%" height={chartHeight + 40} viewBox={`0 0 ${data.length * 70 + 40} ${chartHeight + 40}`} preserveAspectRatio="xMidYMid meet" style={{ minWidth: '400px' }}>
            {/* Grid lines */}
            {[140, 130, 120, 110, 100, 90, 80].map((value) => {
              const y = chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight;
              return (
                <g key={value}>
                  <line
                    x1="30"
                    y1={y}
                    x2="100%"
                    y2={y}
                    stroke="#e2e8f0"
                    strokeWidth="1"
                  />
                  <text x="5" y={y + 4} fontSize="10" fill="#94a3b8">
                    {value}
                  </text>
                </g>
              );
            })}

            {/* Target line */}
            <line
              x1="30"
              y1={chartHeight - ((130 - minValue) / (maxValue - minValue)) * chartHeight}
              x2="100%"
              y2={chartHeight - ((130 - minValue) / (maxValue - minValue)) * chartHeight}
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="4"
            />

            {/* Systolic line */}
            <polyline
              points={data.map((d, i) => {
                const x = 50 + i * 70;
                const y = chartHeight - ((d.systolic - minValue) / (maxValue - minValue)) * chartHeight;
                return `${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke="#ef4444"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <animate attributeName="stroke-dasharray" from="0,1000" to="1000,0" dur="1.5s" fill="freeze" />
            </polyline>

            {/* Diastolic line */}
            <polyline
              points={data.map((d, i) => {
                const x = 50 + i * 70;
                const y = chartHeight - ((d.diastolic - minValue) / (maxValue - minValue)) * chartHeight;
                return `${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <animate attributeName="stroke-dasharray" from="0,1000" to="1000,0" dur="1.5s" fill="freeze" />
            </polyline>

            {/* Data points */}
            {data.map((d, i) => {
              const x = 50 + i * 70;
              const ySystolic = chartHeight - ((d.systolic - minValue) / (maxValue - minValue)) * chartHeight;
              const yDiastolic = chartHeight - ((d.diastolic - minValue) / (maxValue - minValue)) * chartHeight;
              
              return (
                <g key={i}>
                  <circle cx={x} cy={ySystolic} r="4" fill="#ef4444">
                    <animate attributeName="r" from="0" to="4" dur="0.3s" begin={`${i * 0.1}s`} fill="freeze" />
                  </circle>
                  <circle cx={x} cy={yDiastolic} r="4" fill="#3b82f6">
                    <animate attributeName="r" from="0" to="4" dur="0.3s" begin={`${i * 0.1}s`} fill="freeze" />
                  </circle>
                  <text x={x} y={chartHeight + 20} textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="500">
                    {d.week.replace('Week ', 'W')}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div style={{
          marginTop: '12px',
          padding: '10px 12px',
          background: '#f0fdf4',
          borderRadius: '8px',
          borderLeft: '3px solid #10b981'
        }}>
          <div style={{ display: 'flex', alignItems: 'start', gap: '8px' }}>
            <TrendingUp size={14} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: '12px', color: '#065f46', fontWeight: 600, margin: '0 0 4px 0' }}>
                Excellent progress!
              </p>
              <p style={{ fontSize: '11px', color: '#047857', margin: 0, lineHeight: 1.4 }}>
                Your BP decreased 14 points systolic and 6 points diastolic. You're now in target range 83% of the time!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section style={{
      background: 'linear-gradient(135deg, #0c4a6e 0%, #075985 50%, #0369a1 100%)',
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
        background: 'radial-gradient(circle, rgba(239, 68, 68, 0.08) 0%, transparent 70%)',
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

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: '60px',
          position: 'relative'
        }}>
          
          {/* Left: Title & Description */}
          <div style={{ minWidth: '400px', maxWidth: '400px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #fca5a5 0%, #fb923c 100%)',
              padding: '8px 20px',
              borderRadius: '20px',
              marginBottom: '24px',
              boxShadow: '0 4px 16px rgba(252, 165, 165, 0.3)'
            }}>
              <Sparkles size={18} color="white" />
              <span style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '1px',
                color: 'white',
              }}>
                Ask Sagaa Anything
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(28px, 3vw, 36px)',
              fontWeight: 600,
              color: 'white',
              marginBottom: '16px',
              lineHeight: 1.2
            }}>
              Natural Conversation.{' '}
              <span style={{
                background: 'linear-gradient(135deg, #fca5a5 0%, #f87171 50%, #ef4444 100%)',
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
              color: '#bae6fd',
              lineHeight: 1.7,
              marginBottom: '32px'
            }}>
              Just ask Sagaa your health questions and get personalized, context-aware guidance that connects all aspects of your wellbeing.
            </p>
            <MultiDeviceMockup />
          </div>

          {/* Right: Chat Interface */}
          <div style={{ 
            flex: 1, 
            minWidth: 0,
            position: 'relative',
            top: '0'
          }}>
            {/* Progress Bars */}
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
                      ? 'linear-gradient(90deg, #fca5a5 0%, #f87171 100%)' 
                      : 'rgba(255, 255, 255, 0.2)',
                    border: 'none',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0,
                    boxShadow: activeChatExample === idx ? '0 2px 8px rgba(252, 165, 165, 0.4)' : 'none'
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

            {/* Chat Window */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              boxShadow: '0 8px 40px 0 rgba(252, 165, 165, 0.25), 0 1.5px 8px 0 rgba(252, 165, 165, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              overflow: 'hidden'
            }}>
              {/* Chat Header */}
              <div style={{
                padding: '20px 24px',
                background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                borderBottom: '1px solid #fecaca',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  // Removed green background circle and related styles
                }}>
                  <img src={sagaaIcon} alt="Sagaa icon" style={{ width: 34, height: 38, verticalAlign: 'middle' }} />
                </div>
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: '#1e293b' }}>
                    Sagaa Healthcare
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    Your intelligent health companion
                  </div>
                </div>
              </div>

              {/* Chat Messages Area */}
              <div style={{
                padding: '24px 20px',
                minHeight: '400px',
                background: '#fafafa',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                {/* User Message */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #fca5a5 0%, #f87171 100%)',
                    color: 'white',
                    padding: '14px 20px',
                    borderRadius: '20px 20px 4px 20px',
                    maxWidth: '75%',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    boxShadow: '0 4px 12px rgba(12, 74, 110, 0.2)'
                  }}>
                    {chatExamples[activeChatExample].question}
                  </div>
                </div>

                {/* Sagaa Response */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'start',
                  gap: '12px'
                }}>
                  <div style={{
                    // Removed green background circle and related styles
                  }}>
                    <img src={sagaaIcon} alt="Sagaa icon" style={{ width: 34, height: 38, verticalAlign: 'middle' }} />
                  </div>
                  <div style={{ flex: 1, maxWidth: '100%' }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)',
                      padding: '16px 20px',
                      borderRadius: '4px 20px 20px 20px',
                      fontSize: '0.9rem',
                      lineHeight: 1.7,
                      color: 'white',
                      fontWeight: 500,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      border: '1px solid #fecaca',
                      width: '100%',
                      overflow: 'hidden',
                      whiteSpace: 'pre-line'
                    }}>
                      {chatExamples[activeChatExample].response.split('**').map((part, idx) => {
                        // Check if this part should be bold (odd indices after split)
                        if (idx % 2 === 1) {
                          return <strong key={idx}>{part}</strong>;
                        }
                        return part;
                      })}

                      {chatExamples[activeChatExample].hasVisual && chatExamples[activeChatExample].chartData && (
                        <BloodPressureChart data={chatExamples[activeChatExample].chartData} />
                      )}
                    </div>

                    {/* Capability Tags */}
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

              {/* Chat Input */}
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
                    placeholder="Ask Sagaa about your health..."
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

export default AskSagaaHealthSection;