import { useState } from 'react';
import { MessageCircle, Send, Sparkles } from 'lucide-react';
import sagaaIcon from '../../assets/sagaa_48x48.png';
import MultiDeviceMockupLife from './MultiDeviceMockupEssentials';

export const AskSagaaLifeSection = () => {
  const [activeChatExample, setActiveChatExample] = useState(0);

  const chatExamples = [
    {
      category: "Predictive Maintenance",
      question: "Is my home insurance adequate?",
      response: "I've analyzed your coverage and found a significant gap. Since you bought your home in 2019, you've completed:\n\n• Kitchen renovation (+$45K value)\n• New roof (+$18K)\n• Finished basement (+$32K)\n\n**Total unrecorded value: $95K**\n\nYour current policy covers $385K, but replacement cost is now ~$480K. This affects:\n• Your home equity calculation (Finance)\n• Refinancing options\n• Emergency fund adequacy\n\nI found 3 quotes with proper coverage: $2,680-$2,850/year (vs. current $2,400). The $280 increase fits your budget—I identified $140/month in savings from your recent utility optimization.\n\nShould I request detailed quotes?",
      tags: ["Insurance Management", "Cross-Vertical Intelligence", "Risk Assessment"],
      tagColors: ["#f59e0b", "#10b981", "#ef4444"],
      hasVisual: false
    },
    {
      category: "Smart Shopping Intelligence",
      question: "When should I replace my water heater?",
      response: "Your water heater situation needs attention:\n\n**Current status:**\n• Age: 11 years old (typical lifespan 10-12 years)\n• Type: Standard tank, installed Nov 2013\n• Risk level: HIGH - you're in the failure window\n\n**Why act now:**\n• It's winter - failure rate spikes 40% in cold months\n• Emergency replacement costs 30% more ($2,800 vs. $6,500)\n• Your emergency fund has $8,200 (adequate coverage)\n\n**Community data:** 82% of users who proactively replaced saved $1,200+ vs emergency replacements.\n\n**3 vetted plumbers in your community:**\n• Mike Chen - 34 water heater installs, avg $5,800, available next week\n• Sarah's Plumbing - 28 installs, avg $6,100, same-day quotes\n• Northwest Home Services - 45 installs, avg $5,650\n\nWant me to request quotes from all three?",
      tags: ["Predictive Maintenance", "Community Wisdom", "Emergency Prevention"],
      tagColors: ["#3b82f6", "#ec4899", "#ef4444"],
      hasVisual: false
    },
    {
      category: "Family Coordination",
      question: "What's everyone doing this weekend?",
      response: "Family calendar analysis for this weekend:\n\n**Saturday:**\n• Tommy: Soccer tournament 8 AM (Bellevue)\n• Sarah: Dentist appointment 9 AM (downtown) ⚠️ **CONFLICT**\n• You: Open schedule\n• Bella (dog): Vet appointment 10 AM ⚠️ **OVERDUE**\n\n**Conflict resolution options:**\n1. Reschedule Sarah's dentist to Thursday 2 PM (available)\n2. Arrange carpool with Jake's family (going to same tournament)\n\n**Sunday:**\n• Family: Free\n• Mom's medication refill due (pickup needed)\n\n**Optimized plan:**\n• Sarah reschedules dentist to Thursday\n• Saturday: You take Tommy to tournament, Sarah handles grocery run\n• Saturday 10 AM: Vet for Bella ($85 - adding to pet care budget)\n• Sunday afternoon: Pick up Mom's prescriptions + visit\n\nThis saves 45 minutes of driving and eliminates conflicts. Approve?",
      tags: ["Family Calendar", "Conflict Resolution", "Logistics Optimization"],
      tagColors: ["#f59e0b", "#ef4444", "#10b981"],
      hasVisual: false
    },
    {
      category: "Emergency Preparedness",
      question: "Am I ready for the winter storm forecast?",
      response: "Storm preparedness check for this weekend's forecast (2 feet of snow):\n\n**Your emergency kit status:**\n✓ Food supply: 3-day supply (adequate)\n✓ Water: 6 gallons (adequate for 3 people)\n✓ First aid kit: Complete, restocked 2 months ago\n⚠️ Batteries: D-cell expired, need replacement\n⚠️ Flashlight bulbs: Not tested recently\n\n**Critical systems:**\n• Your furnace: 8 years old (generally reliable)\n• Backup generator: Last tested 6 months ago ⚠️\n• Home insulation: Recently upgraded (good)\n\n**Action items:**\n1. Order D-cell batteries (arriving tomorrow via Amazon)\n2. Test generator Thursday (I'll remind you)\n3. Your community plow service (John) is fully booked—added you to his route\n\n**Winter failures spike in your area:**\nCommunity data shows 40% increase in pipe freezing and 30% increase in power outages during heavy snow events.\n\nI've prepared your emergency contact list and utility shut-off locations. All set?",
      tags: ["Emergency Prep", "Weather Intelligence", "Community Services"],
      tagColors: ["#ef4444", "#3b82f6", "#ec4899"],
      hasVisual: false
    }
  ];

  return (
    <section style={{
      background: 'linear-gradient(135deg, #0c4a6e 0%, #075985 50%, #0369a1 100%)',
      padding: '80px 24px 60px',
      position: 'relative',
      overflow: 'hidden'
    }}>
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
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              padding: '8px 20px',
              borderRadius: '20px',
              marginBottom: '24px',
              boxShadow: '0 4px 16px rgba(251, 191, 36, 0.3)'
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
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #f59e0b 100%)',
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
              Just ask Sagaa your Essentials questions and get personalized, context-aware guidance that connects all aspects of your household.
            </p>

            <MultiDeviceMockupLife />
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
                      ? 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)' 
                      : 'rgba(255, 255, 255, 0.2)',
                    border: 'none',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0,
                    boxShadow: activeChatExample === idx ? '0 2px 8px rgba(251, 191, 36, 0.4)' : 'none'
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
              boxShadow: '0 8px 40px 0 rgba(251, 191, 36, 0.25), 0 1.5px 8px 0 rgba(251, 191, 36, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              overflow: 'hidden'
            }}>
              {/* Chat Header */}
              <div style={{
                padding: '20px 24px',
                background: 'linear-gradient(135deg, #fef3c7 0%, #fef9ec 100%)',
                borderBottom: '1px solid #fbbf24',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div>
                  <img src={sagaaIcon} alt="Sagaa icon" style={{ width: 34, height: 38, verticalAlign: 'middle' }} />
                </div>
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: '#1e293b' }}>
                    Sagaa Life
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    Your intelligent life companion
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
                    background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
                    color: 'white',
                    padding: '14px 20px',
                    borderRadius: '20px 20px 4px 20px',
                    maxWidth: '75%',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    boxShadow: '0 4px 12px rgba(217, 119, 6, 0.2)'
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
                  <div>
                    <img src={sagaaIcon} alt="Sagaa icon" style={{ width: 34, height: 38, verticalAlign: 'middle' }} />
                  </div>
                  <div style={{ flex: 1, maxWidth: '100%' }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                      padding: '16px 20px',
                      borderRadius: '4px 20px 20px 20px',
                      fontSize: '0.9rem',
                      lineHeight: 1.7,
                      color: 'white',
                      fontWeight: 500,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      border: '1px solid #fcd34d',
                      width: '100%',
                      overflow: 'hidden',
                      whiteSpace: 'pre-line'
                    }}>
                      {chatExamples[activeChatExample].response.split('**').map((part, idx) => {
                        if (idx % 2 === 1) {
                          return <strong key={idx}>{part}</strong>;
                        }
                        return part;
                      })}
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
                    placeholder="Ask Sagaa about your life..."
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

export default AskSagaaLifeSection;