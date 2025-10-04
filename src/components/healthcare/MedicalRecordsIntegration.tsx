
import { Activity, TrendingUp, Users, Zap, Check } from 'lucide-react';
import { useEffect } from 'react';
import SagaaIcon from '../../assets/sagaa_48x48.png';


export const MedicalRecordsIntegration = () => {
  // Fade-in animation for cards
    // Fade-in animation for cards
    useEffect(() => {
      const cards = document.querySelectorAll('.fade-in-card');
      cards.forEach((card, idx) => {
        (card as HTMLElement).classList.add('fade-in');
        (card as HTMLElement).style.animationDelay = `${idx * 0.15}s`;
      });
    }, []);
  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #dbeafe 0%, #f1f5f9 100%)',
        padding: '80px 24px',
        margin: '0',
        minHeight: '100vh'
      }}
    >
      <style>{`
        .fade-in {
          opacity: 0;
          animation: fadeInUp 0.8s forwards;
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        <div style={{ maxWidth: '1152px', margin: '0 auto' }}>
  
  {/* First Row: Main Content Left, Complete Health Profile Right */}
  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: '48px', marginBottom: '24px' }}>
    
    {/* Main Content - Left */}
    <div style={{ flex: '1 1 500px', minWidth: '320px' }}>
      <h2 style={{
              fontWeight: '100',
              color: '#6d28d9',
              marginBottom: '24px',
              lineHeight: '1.3',
              fontSize: 'clamp(36px, 4vw, 56px)',
              paddingBottom: '0.1em',
            }}>
              <span style={{ 
                 color: '#1d1d1f',
                 backgroundColor: 'transparent'
             }}>Your Health records.</span>{' '}
            <span style={{
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #f87171 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent'
            }}>One Profile.</span>
            </h2>
      
      <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#0369a1', marginBottom: '20px' }}>
        Your Health Intelligence Hub
      </h3>
      
      <p style={{ fontSize: '1.1rem', color: '#1e293b', marginBottom: '24px', lineHeight: '1.7' }}>
        Sagaa transforms static health records into dynamic health intelligence. Through secure integration with major EHR systems, Sagaa does not just store your medical history—it actively analyzes, predicts, and acts on your behalf.
      </p>

      {/* Key Features Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {[
          { icon: Activity, text: 'Active care gap detection' },
          { icon: TrendingUp, text: 'Lab trend analysis' },
          { icon: Users, text: 'Family health coordination' },
          { icon: Zap, text: 'Predictive health insights' }
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="fade-in-card" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 12px rgba(59,130,246,0.07)', transition: 'box-shadow 0.2s', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 24px rgba(59,130,246,0.18)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 12px rgba(59,130,246,0.07)'}>
              <div style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)', borderRadius: '8px', padding: '6px' }}>
                <Icon size={20} color="#3b82f6" />
              </div>
              <span style={{ fontSize: '1rem', color: '#334155', fontWeight: 500 }}>{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>

          {/* Complete Health Profile - Right */}
          <div style={{ flex: '1 1 400px', minWidth: '320px', marginTop: '220px' }}>
            <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#0c4a6e', marginBottom: '16px' }}>
                Complete Health Profile
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  'Medical history with active condition monitoring',
                  'Lab results with trend analysis and predictions',
                  'Medications with effectiveness tracking',
                  'Visit summaries with action item follow-up',
                  'Family health history with risk assessment',
                  'Immunization records with recommendations'
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <Check size={18} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.5' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
                    <style>{`
                      .fade-in {
                        opacity: 0;
                        animation: fadeInUp 0.8s forwards;
                      }
                      @keyframes fadeInUp {
                        0% { opacity: 0; transform: translateY(24px); }
                        100% { opacity: 1; transform: translateY(0); }
                      }
                    `}</style>

        {/* Second Row: Both Examples Side by Side */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: '48px' }}>
          
          {/* A1C Example - Left */}
          <div style={{ flex: '1 1 500px', minWidth: '320px' }}>
            <div style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', borderRadius: '16px', padding: '28px', border: '2px solid #bae6fd', boxShadow: '0 4px 24px rgba(59, 130, 246, 0.12)' }}>
                <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom: '1px solid #f3f4f6',
              }}>
                <img 
                  src={SagaaIcon}
                  alt="Sagaa"
                  style={{ width: '28px', height: '28px' }}
                />
                <div style={{ fontSize: '18px', fontWeight: '600', color: '#6b7280' }}>Sagaa Insight</div>
                <div style={{
                  marginLeft: 'auto',
                  fontSize: '11px',
                  color: '#34C759',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: '#34C75910',
                  padding: '4px 10px',
                  borderRadius: '12px',
                }}>
                </div>
              </div>

              <div style={{ background: 'white', borderRadius: '12px', padding: '20px', fontSize: '0.95rem', color: '#1e293b', lineHeight: '1.7', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <p style={{ marginBottom: '16px', fontWeight: 500, color: '#0c4a6e' }}>I noticed something important:</p>
                <p style={{ marginBottom: '16px' }}>Your last A1C was <strong>5.9</strong> eight months ago—in the prediabetic range. Dr. Chen recommended a follow-up at 6 months, but you are now <strong>2 months overdue</strong>.</p>
                <p style={{ marginBottom: '16px', color: '#059669', fontWeight: 500 }}>The good news:</p>
                <p style={{ marginBottom: '16px' }}>Your Apple Watch shows you have increased exercise by <strong>35%</strong> since then, with daily steps up from 6,200 to 8,500.</p>
                <p style={{ marginBottom: '12px', fontWeight: 500, color: '#0c4a6e' }}>I have already:</p>
                <div style={{ marginLeft: '20px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {["Found 3 lab times that work with your calendar", "Confirmed insurance covers A1C at 100%", "Prepared exercise summary for Dr. Chen"].map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Check size={18} color="#10b981" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '0.95rem', color: '#475569' }}>{item}</span>
                    </div>
                  ))}
                </div>
                <p style={{ marginBottom: '8px' }}>Based on your activity data, I predict your A1C has likely improved to <strong>5.6-5.7 range</strong>.</p>
                <p style={{ fontWeight: 500, color: '#0369a1' }}>Should I book the Tuesday 9 AM slot?</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { emoji: '🏥', label: 'EHR Data', value: 'Historical A1C trends' },
                  { emoji: '⌚', label: 'Device Data', value: 'Real-time activity tracking' },
                  { emoji: '📅', label: 'Scheduling', value: 'Calendar integration' },
                  { emoji: '💰', label: 'Insurance', value: 'Coverage verification' }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: 'white', borderRadius: '8px', fontSize: '0.85rem' }}>
                    <span style={{ fontSize: '1.2rem' }}>{item.emoji}</span>
                    <span style={{ fontWeight: 600, color: '#0369a1', minWidth: '90px' }}>{item.label}:</span>
                    <span style={{ color: '#475569' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hiking Example - Right */}
          <div style={{ flex: '1 1 500px', minWidth: '320px' }}>
            <div style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', borderRadius: '16px', padding: '28px', border: '2px solid #fcd34d', boxShadow: '0 4px 24px rgba(245, 158, 11, 0.12)' }}>
               <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom: '1px solid #f3f4f6',
              }}>
                <img 
                  src={SagaaIcon}
                  alt="Sagaa"
                  style={{ width: '28px', height: '28px' }}
                />
                <div style={{ fontSize: '18px', fontWeight: '600', color: '#6b7280' }}>Sagaa Insight</div>
                <div style={{
                  marginLeft: 'auto',
                  fontSize: '11px',
                  color: '#34C759',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: '#34C75910',
                  padding: '4px 10px',
                  borderRadius: '12px',
                }}>
                </div>
              </div>

              <div style={{ background: 'white', borderRadius: '12px', padding: '20px', fontSize: '0.95rem', color: '#1e293b', lineHeight: '1.7', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <p style={{ marginBottom: '12px', fontWeight: 500, color: '#78350f', fontStyle: 'italic' }}>User: "Hey Sagaa, suggest some hiking trails for this weekend."</p>
                <p style={{ marginBottom: '16px', fontWeight: 500, color: '#0369a1' }}>Sagaa Response:</p>
                <p style={{ marginBottom: '16px' }}>I see you are eager to get back on the trails! Given your recent ankle sprain from last week (Grade 1 sprain per urgent care visit), I would recommend these <strong>ankle-friendly trails</strong>:</p>
                <div style={{ marginBottom: '16px', paddingLeft: '16px', borderLeft: '3px solid #f59e0b' }}>
                  <p style={{ marginBottom: '8px' }}><strong>1. Discovery Park Loop Trail</strong> (2.8 miles)</p>
                  <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '12px' }}>Flat, well-maintained paths. Perfect for recovery phase hiking.</p>
                  <p style={{ marginBottom: '8px' }}><strong>2. Green Lake Trail</strong> (2.8 miles)</p>
                  <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '12px' }}>Paved, level surface with no elevation gain.</p>
                </div>
                <div style={{ background: '#fee2e2', borderRadius: '10px', padding: '14px 16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.2rem' }}>⚠️</span>
                  <span style={{ color: 'black', fontWeight: 500, fontSize: '0.98rem' }}>
                    I would recommend avoiding your usual favorites (Rattlesnake Ledge, Tiger Mountain) for another 2-3 weeks—they involve significant elevation gain and uneven terrain that could re-injure your ankle.
                  </span>
                </div>
                <p style={{ marginBottom: '12px' }}>Your physical therapist recommended gradual return to activity. These trails align with that guidance while letting you enjoy the outdoors.</p>
                <p style={{ fontWeight: 500, color: '#0369a1' }}>Want me to add an ankle mobility routine to your calendar for post-hike recovery?</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { emoji: '🏥', label: 'EHR Data', value: 'Urgent care visit notes' },
                  { emoji: '📍', label: 'Preferences', value: 'Hiking activity history' },
                  { emoji: '🗓️', label: 'Timeline', value: 'PT recovery guidelines' },
                  { emoji: '🌲', label: 'Local Data', value: 'Trail difficulty ratings' }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: 'white', borderRadius: '8px', fontSize: '0.85rem' }}>
                    <span style={{ fontSize: '1.2rem' }}>{item.emoji}</span>
                    <span style={{ fontWeight: 600, color: '#d97706', minWidth: '90px' }}>{item.label}:</span>
                    <span style={{ color: '#475569' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MedicalRecordsIntegration;