import  { useState } from 'react';

type CategoryKey = 'finance' | 'health' | 'education';

export const CommunityWisdomSection = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('finance');
  
  const categories: Record<CategoryKey, {
    title: string;
    icon: string;
    color: string;
    insights: {
      challenge: string;
      strategy: string;
      result: string;
      users: string;
      successRate: string;
    }[];
  }> = {
    finance: {
      title: "Financial Success",
      icon: "💰",
      color: "#059669",
      insights: [
        {
          challenge: "Paying off $45K student loans",
          strategy: "Debt avalanche + side hustle income",
          result: "Paid off 2 years early, saved $8,400 in interest",
          users: "847 users tried this approach",
          successRate: "73% success rate"
        },
        {
          challenge: "Building emergency fund on tight budget",
          strategy: "Automatic $25 weekly transfers + cashback redirects",
          result: "Built 6-month fund in 18 months",
          users: "1,234 users followed this method",
          successRate: "89% reached their goal"
        },
        {
          challenge: "Reducing grocery spending without sacrifice",
          strategy: "Sunday meal planning + grocery pickup only",
          result: "Cut spending 22% while eating healthier",
          users: "2,156 users implemented this",
          successRate: "84% reduced spending 15%+"
        }
      ]
    },
    health: {
      title: "Health & Wellness",
      icon: "❤️",
      color: "#ef4444",
      insights: [
        {
          challenge: "Starting consistent exercise routine",
          strategy: "15-minute morning workouts + habit stacking",
          result: "92% still exercising after 6 months",
          users: "1,567 users started this way",
          successRate: "92% maintained routine"
        },
        {
          challenge: "Managing prediabetes naturally",
          strategy: "Low-carb meals + 10K steps + sleep tracking",
          result: "Reversed prediabetes in 8 months",
          users: "423 users with similar results",
          successRate: "78% improved A1C significantly"
        },
        {
          challenge: "Losing weight without extreme diets",
          strategy: "Protein-first meals + strength training 3x/week",
          result: "Lost 35 lbs in 14 months, kept it off 2+ years",
          users: "934 users achieved similar results",
          successRate: "71% lost 20+ lbs sustainably"
        }
      ]
    },
    education: {
      title: "Education & Learning",
      icon: "🎓",
      color: "#8b5cf6",
      insights: [
        {
          challenge: "Child struggling with reading comprehension",
          strategy: "Daily 15-minute reading sessions + discussion questions",
          result: "Reading level improved 2 grades in 6 months",
          users: "892 parents tried this approach",
          successRate: "81% saw significant improvement"
        },
        {
          challenge: "Preparing for SAT while managing school workload",
          strategy: "30-minute daily practice + focused weekends on weak areas",
          result: "Score improved 220 points in 3 months",
          users: "1,156 students followed this method",
          successRate: "76% achieved target scores"
        },
        {
          challenge: "Learning a new language as an adult",
          strategy: "Daily app practice + weekly conversation partner + immersion content",
          result: "Conversational fluency in 14 months",
          users: "634 learners used this combination",
          successRate: "68% reached conversational level"
        }
      ]
    }
  };

  return (
    <section style={{
      padding: '80px 0',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
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
          marginBottom: '64px'
        }}>
          <h2 style={{
            fontSize: 'clamp(48px, 5vw, 64px)',
            fontWeight: '100',
            color: '#1d1d1f',
            marginBottom: '32px',
            lineHeight: '1.1'
          }}>
            One Community,{' '}
            <span style={{
              background: 'linear-gradient(135deg, #007AFF 0%, #00D2FF 30%, #34C759 60%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Infinite Wisdom</span>
          </h2>
          <p style={{
            fontSize: '22px',
            color: '#374151',
            maxWidth: '900px',
            margin: '0 auto',
            lineHeight: '1.7'
          }}>
            Learn from people who've pursued similar goals. Real strategies, real results, real people — just like you..
          </p>
        </div>

        {/* Value proposition cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          marginBottom: '64px'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: '#dbeafe',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              fontSize: '24px'
            }}>✓</div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#1d1d1f',
              marginBottom: '12px'
            }}>Real Experience, Not Theory</h3>
            <p style={{
              fontSize: '15px',
              color: '#6b7280',
              lineHeight: '1.6',
              margin: 0
            }}>
              Not theory from blogs. Real experiences from people who succeeded. Skip years of trial-and-error.
            </p>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: '#dcfce7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              fontSize: '24px'
            }}>🔒</div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#1d1d1f',
              marginBottom: '12px'
            }}>Anonymous & Safe</h3>
            <p style={{
              fontSize: '15px',
              color: '#6b7280',
              lineHeight: '1.6',
              margin: 0
            }}>
              All insights completely anonymized. Share without judgment. Privacy-first community design ensures your personal information stays private.
            </p>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: '#fef3c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              fontSize: '24px'
            }}>🎯</div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#1d1d1f',
              marginBottom: '12px'
            }}>Similar to You</h3>
            <p style={{
              fontSize: '15px',
              color: '#6b7280',
              lineHeight: '1.6',
              margin: 0
            }}>
              Matched by demographics, situation, and goals. Not random advice—insights from your cohort. Context-aware recommendations that fit your life.
            </p>
          </div>
        </div>

        {/* Category tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '48px',
          gap: '8px',
          flexWrap: 'wrap'
        }}>
          {Object.entries(categories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key as CategoryKey)}
              style={{
                padding: '16px 24px',
                borderRadius: '50px',
                border: 'none',
                backgroundColor: activeCategory === key ? category.color : 'white',
                color: activeCategory === key ? 'white' : '#6b7280',
                fontWeight: activeCategory === key ? '600' : '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: activeCategory === key ? `0 4px 16px ${category.color}30` : '0 2px 8px rgba(0,0,0,0.05)'
              }}
            >
              <span style={{ fontSize: '18px' }}>{category.icon}</span>
              {category.title}
            </button>
          ))}
          {/* More Categories Indicator */}
          <div style={{
            position: 'relative',
            padding: '16px 32px',
            borderRadius: '50px',
            border: '2px dashed #cbd5e1',
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            color: '#64748b',
            fontWeight: 500,
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '24px' }}>✨</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 600, color: '#475569' }}>More Categories</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Life Essentials • Career • Family • Travel • - -</div>
            </div>
          </div>
        </div>
        
        {/* Active category insights */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '24px',
          padding: '48px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          position: 'relative',
          marginBottom: '64px'
        }}>
          {/* Category header */}
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '4px',
            background: categories[activeCategory].color,
            borderRadius: '24px 24px 0 0'
          }}></div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '40px',
            paddingTop: '8px'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              backgroundColor: `${categories[activeCategory].color}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px'
            }}>
              {categories[activeCategory].icon}
            </div>
            <h3 style={{
              fontSize: '32px',
              fontWeight: '600',
              color: '#1d1d1f',
              margin: 0
            }}>
              {categories[activeCategory].title} Wisdom
            </h3>
          </div>

          {/* Insights grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '32px'
          }}>
            {categories[activeCategory].insights.map((insight, index) => (
              <div
                key={index}
                style={{
                  padding: '32px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '16px',
                  border: `1px solid ${categories[activeCategory].color}20`,
                  position: 'relative'
                }}
              >
                {/* Challenge */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: categories[activeCategory].color,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '8px'
                  }}>
                    Goal
                  </div>
                  <h4 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1d1d1f',
                    margin: 0
                  }}>
                    {insight.challenge}
                  </h4>
                </div>

                {/* Strategy */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '8px'
                  }}>
                    What Worked
                  </div>
                  <p style={{
                    fontSize: '14px',
                    color: '#374151',
                    lineHeight: '1.5',
                    margin: 0
                  }}>
                    {insight.strategy}
                  </p>
                </div>

                {/* Result */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: categories[activeCategory].color,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '8px'
                  }}>
                    Result
                  </div>
                  <p style={{
                    fontSize: '14px',
                    color: '#1d1d1f',
                    fontWeight: '500',
                    margin: 0
                  }}>
                    {insight.result}
                  </p>
                </div>

                {/* Community validation */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '20px',
                  borderTop: '1px solid #e5e7eb'
                }}>
                  <div style={{
                    fontSize: '12px',
                    color: '#6b7280'
                  }}>
                    {insight.users}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: categories[activeCategory].color,
                    padding: '4px 12px',
                    backgroundColor: `${categories[activeCategory].color}15`,
                    borderRadius: '12px'
                  }}>
                    {insight.successRate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How Sagaa Uses Community Wisdom */}
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '48px',
          marginBottom: '48px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h3 style={{
              fontSize: '32px',
              fontWeight: 600,
              marginBottom: '16px',
              color: '#1e293b'
            }}>Sagaa Applies Community Wisdom to Your Life</h3>
            <p style={{
              fontSize: '18px',
              color: '#475569',
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: 1.7
            }}>
              Your AI companion doesn't just collect insights—it actively applies them to your specific situation, giving you proactive, personalized guidance in every interaction
            </p>
          </div>

          {/* Intelligence Examples */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
            marginBottom: '40px'
          }}>
            {/* Proactive Intelligence */}
            <div style={{
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              padding: '32px',
              borderRadius: '20px',
              border: '2px solid #3b82f6',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-16px',
                left: '24px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
              }}>
                🔮 PROACTIVE
              </div>
              <div style={{ marginTop: '20px' }}>
                <div style={{
                  fontSize: '14px',
                  color: '#1e40af',
                  fontWeight: 600,
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Sagaa notices patterns
                </div>
                <p style={{
                  fontSize: '15px',
                  color: '#1e293b',
                  lineHeight: 1.7,
                  marginBottom: '16px',
                  fontStyle: 'italic',
                  background: 'white',
                  padding: '16px',
                  borderRadius: '12px'
                }}>
                  "I see you're browsing gym memberships. Based on 847 users who succeeded with fitness goals like yours, those who joined gyms after getting a specific workout plan had 85% higher long-term success. Your fitness consultation is next Tuesday—should I schedule gym tours for Wednesday?"
                </p>
                <div style={{
                  fontSize: '13px',
                  color: '#3b82f6',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ fontSize: '16px' }}>💡</span>
                  Anticipates your needs before you ask
                </div>
              </div>
            </div>

            {/* Contextual Intelligence */}
            <div style={{
              background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
              padding: '32px',
              borderRadius: '20px',
              border: '2px solid #8b5cf6',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-16px',
                left: '24px',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
              }}>
                🧠 CONTEXTUAL
              </div>
              <div style={{ marginTop: '20px' }}>
                <div style={{
                  fontSize: '14px',
                  color: '#6b21a8',
                  fontWeight: 600,
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Sagaa connects the dots
                </div>
                <p style={{
                  fontSize: '15px',
                  color: '#1e293b',
                  lineHeight: 1.7,
                  marginBottom: '16px',
                  fontStyle: 'italic',
                  background: 'white',
                  padding: '16px',
                  borderRadius: '12px'
                }}>
                  "You asked about the $200 jacket. I notice you have a job interview Thursday and you're saving for an emergency fund. 73% of users in similar career transitions found that investing in interview attire led to 12% higher salary offers. Your clothing budget has room—want me to adjust?"
                </p>
                <div style={{
                  fontSize: '13px',
                  color: '#8b5cf6',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ fontSize: '16px' }}>🔗</span>
                  Understands your complete life context
                </div>
              </div>
            </div>

            {/* Personalized Intelligence */}
            <div style={{
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
              padding: '32px',
              borderRadius: '20px',
              border: '2px solid #10b981',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-16px',
                left: '24px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
              }}>
                ⚡ PERSONALIZED
              </div>
              <div style={{ marginTop: '20px' }}>
                <div style={{
                  fontSize: '14px',
                  color: '#065f46',
                  fontWeight: 600,
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Sagaa learns what works for YOU
                </div>
                <p style={{
                  fontSize: '15px',
                  color: '#1e293b',
                  lineHeight: 1.7,
                  marginBottom: '16px',
                  fontStyle: 'italic',
                  background: 'white',
                  padding: '16px',
                  borderRadius: '12px'
                }}>
                  "Based on your spending patterns, you tend to overspend on weekends after stressful weeks. You have a big presentation Friday. 1,234 users with similar stress-spending habits found that setting weekend budgets in advance reduced overspending by 40%. Should I set one for you?"
                </p>
                <div style={{
                  fontSize: '13px',
                  color: '#10b981',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ fontSize: '16px' }}>🎯</span>
                  Adapts to your unique patterns and preferences
                </div>
              </div>
            </div>
          </div>

        </div>


        {/* How It Works - Grid Layout with Dark Background */}
        <div style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          borderRadius: '24px',
          padding: '48px',
          color: 'white',
          boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
          marginBottom: '32px'
        }}>
          <h3 style={{
            fontSize: '32px',
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: '16px'
          }}>How Community Wisdom Works</h3>
          <p style={{
            textAlign: 'center',
            color: '#cbd5e1',
            marginBottom: '48px',
            maxWidth: '640px',
            marginLeft: 'auto',
            marginRight: 'auto',
            fontSize: '18px'
          }}>
            A simple three-step cycle that makes everyone Wiser
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            maxWidth: '1200px',
            margin: '0 auto 40px auto'
          }}>
            {/* Step 1 */}
            <div style={{
              position: 'relative',
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.04)',
              padding: '32px',
              border: '1px solid rgba(255,255,255,0.08)',
              minHeight: '340px',
              boxShadow: '0 2px 12px rgba(30,41,59,0.10)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(59,130,246,0.15)'
                }}>1</div>
                <h4 style={{ fontSize: '22px', fontWeight: '700', color: 'white', margin: 0 }}>You Learn</h4>
              </div>
              <p style={{ color: '#cbd5e1', marginBottom: '24px', fontSize: '16px', lineHeight: '1.6' }}>
                Sagaa applies community wisdom to guide you on what worked for people  — similar income, location, family size.
              </p>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.10)', paddingTop: '16px', marginTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', color: '#60a5fa', fontWeight: 500 }}>
                  <span style={{ fontSize: '18px' }}>👥</span>
                  <span>Matched from 2M+ experiences</span>
                </div>
              </div>
            </div>
            {/* Step 2 */}
            <div style={{
              position: 'relative',
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.04)',
              padding: '32px',
              border: '1px solid rgba(255,255,255,0.08)',
              minHeight: '340px',
              boxShadow: '0 2px 12px rgba(139,92,246,0.10)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(139,92,246,0.15)'
                }}>2</div>
                <h4 style={{ fontSize: '22px', fontWeight: '700', color: 'white', margin: 0 }}>You Apply</h4>
              </div>
              <p style={{ color: '#cbd5e1', marginBottom: '24px', fontSize: '16px', lineHeight: '1.6' }}>
                Try proven strategies with confidence. Track your progress. Skip years of trial-and-error with approaches that actually work.
              </p>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.10)', paddingTop: '16px', marginTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', color: '#a78bfa', fontWeight: 500 }}>
                  <span style={{ fontSize: '18px' }}>📈</span>
                  <span>Average 73% success rate</span>
                </div>
              </div>
            </div>
            {/* Step 3 */}
            <div style={{
              position: 'relative',
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.04)',
              padding: '32px',
              border: '1px solid rgba(255,255,255,0.08)',
              minHeight: '340px',
              boxShadow: '0 2px 12px rgba(16,185,129,0.10)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(16,185,129,0.15)'
                }}>3</div>
                <h4 style={{ fontSize: '22px', fontWeight: '700', color: 'white', margin: 0 }}>You Share</h4>
              </div>
              <p style={{ color: '#cbd5e1', marginBottom: '24px', fontSize: '16px', lineHeight: '1.6' }}>
                When you succeed, share what worked (completely anonymously). Your experience becomes wisdom that helps thousands of others.
              </p>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.10)', paddingTop: '16px', marginTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', color: '#10b981', fontWeight: 500 }}>
                  <span style={{ fontSize: '18px' }}>✨</span>
                  <span>Community gets wiser together</span>
                </div>
              </div>
            </div>
          </div>
          {/* Privacy Badge */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 32px',
              background: 'rgba(255,255,255,0.10)',
              borderRadius: '16px',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255,255,255,0.20)',
              fontSize: '18px',
              color: 'white',
              fontWeight: 500
            }}>
              <span style={{ fontSize: '24px' }}>🔒</span>
              <span>
                Every insight is <span style={{ fontWeight: '700' }}>completely anonymous</span>. Your personal story helps thousands without revealing who you are.
              </span>
            </div>
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default CommunityWisdomSection;