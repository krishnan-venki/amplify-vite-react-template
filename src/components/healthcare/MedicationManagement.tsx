import Medication_Image from '../../assets/Medication_Management.jpg';
export const MedicationManagement = () => {
  return (
    <>
      {/* Intelligent Medication Section */}
      <section id="intelligent-medication" style={{
        padding: '80px 0',
        background: 'linear-gradient(135deg, #fce7f3 0%, #f8fafc 100%)',
        color: '#1d1d1f',
      }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 24px' }}>
          {/* Section Header with Image */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '48px', 
            alignItems: 'center',
            marginBottom: '64px' 
          }}>
            {/* Text Column - Left */}
            <div>
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
               }}>Your Medication.</span>{' '}
              <span style={{
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #f87171 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent'
              }}>True Partnership</span>
              </h2>
              <p style={{ 
                fontSize: '20px', 
                color: '#6e6e73', 
                lineHeight: '1.6',
                margin: 0
              }}>
                Sagaa doesn't just remind you to take pills. It learns your routine, tracks medication effectiveness using device data, alerts you to potential interactions, optimizes costs, and manages your entire medication lifecycle.
              </p>
            </div>
            
            {/* Image Column - Right */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <img 
                src={Medication_Image} 
                alt="Intelligent Medication Management"
                style={{
                  width: '100%',
                  maxWidth: '450px',
                  height: 'auto',
                  borderRadius: '24px',
                  boxShadow: '0 8px 32px rgba(3,105,161,0.15)'
                }}
              />
            </div>
          </div>

          {/* Main Example */}
          <div style={{ background: 'white', borderRadius: '24px', padding: '40px', marginBottom: '48px', boxShadow: '0 8px 32px rgba(219,39,119,0.12)' }}>
            <div style={{ display: 'flex', alignItems: 'start', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #db2777 0%, #f472b6 100%)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>💊</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', color: '#6e6e73', marginBottom: '8px' }}>7:15 AM • Context-Aware Reminder</div>
                <p style={{ fontSize: '18px', color: '#1d1d1f', lineHeight: '1.6', margin: 0, fontStyle: 'italic' }}>
                  "Good morning! Take your levothyroxine now—you have a 7:30 AM meeting so this ensures the 30-minute food gap. Your coffee is ready (I see your smart coffee maker just finished)."
                </p>
              </div>
            </div>
            <div style={{ paddingLeft: '64px', borderLeft: '2px solid #fce7f3' }}>
              <div style={{ fontSize: '14px', color: '#6e6e73', marginBottom: '12px', fontWeight: 600 }}>Context Used:</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['📅 Calendar', '⏰ Timing Requirements', '🏠 Smart Home Devices', '💊 Medication Rules'].map(tag => (
                  <span key={tag} style={{ background: '#fce7f3', color: '#db2777', padding: '6px 12px', borderRadius: '8px', fontSize: '13px' }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Core Capabilities Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
            {[
              {
                icon: '🔗',
                title: 'Cross-Health Integration',
                description: 'Links medications to complete health picture. "Your new BP med may affect your diabetes control. I\'ll monitor your glucose closely."',
                gradient: 'linear-gradient(135deg, #ec4899 0%, #fbcfe8 100%)'
              },
              {
                icon: '📊',
                title: 'Effectiveness Tracking',
                description: 'Connects medication to device data. "Your BP averaged 118/76 this week (down from 128/82). Your Lisinopril is working well!"',
                gradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)'
              },
              {
                icon: '⚠️',
                title: 'Interaction Monitoring',
                description: 'Checks medications, supplements, and OTC drugs against clinical databases. Alerts to potential interactions with severity levels and timing recommendations. Always consult your healthcare provider.',
                gradient: 'linear-gradient(135deg, #f472b6 0%, #fbcfe8 100%)'
              },
              {
                icon: '💰',
                title: 'Cost Optimization',
                description: 'Finds savings automatically. "Generic atorvastatin at Costco: $12. Brand Lipitor at CVS: $187. Switch to save $2,100/year?"',
                gradient: 'linear-gradient(135deg, #db2777 0%, #ec4899 100%)'
              },
              {
                icon: '👥',
                title: 'Community Wisdom',
                description: 'Real experiences from similar users. "87% found taking metformin with dinner reduced stomach upset. Want meal timing suggestions?"',
                gradient: 'linear-gradient(135deg, #f472b6 0%, #fce7f3 100%)'
              }
            ].map((capability, idx) => (
              <div key={idx} style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 16px rgba(219,39,119,0.08)', transition: 'all 0.3s ease', cursor: 'pointer' }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(219,39,119,0.15)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(219,39,119,0.08)';
                }}>
                <div style={{ width: '56px', height: '56px', background: capability.gradient, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', marginBottom: '16px' }}>
                  {capability.icon}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px', color: '#1d1d1f' }}>{capability.title}</h3>
                <p style={{ fontSize: '15px', color: '#6e6e73', lineHeight: '1.6', margin: 0 }}>{capability.description}</p>
              </div>
            ))}
          </div>

          {/* Detailed Scenario: Medication Effectiveness */}
          <div style={{ background: 'white', borderRadius: '24px', padding: '40px', marginBottom: '24px', boxShadow: '0 8px 32px rgba(219,39,119,0.12)' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px', color: '#0369a1' }}>Example: Blood Pressure Medication Tracking</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
              <div style={{ padding: '20px', background: '#f9fafb', borderRadius: '12px' }}>
                <div style={{ fontSize: '13px', color: '#6e6e73', marginBottom: '8px', fontWeight: 600 }}>WEEK 1 (Pre-Medication)</div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#dc2626', marginBottom: '4px' }}>142/88</div>
                <div style={{ fontSize: '14px', color: '#6e6e73' }}>Average BP</div>
              </div>
              <div style={{ padding: '20px', background: '#f9fafb', borderRadius: '12px' }}>
                <div style={{ fontSize: '13px', color: '#6e6e73', marginBottom: '8px', fontWeight: 600 }}>WEEK 2-3 (Adjustment)</div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#f59e0b', marginBottom: '4px' }}>135/82</div>
                <div style={{ fontSize: '14px', color: '#6e6e73' }}>Improving</div>
              </div>
              <div style={{ padding: '20px', background: '#f9fafb', borderRadius: '12px' }}>
                <div style={{ fontSize: '13px', color: '#6e6e73', marginBottom: '8px', fontWeight: 600 }}>WEEK 4 (Current)</div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#059669', marginBottom: '4px' }}>122/76</div>
                <div style={{ fontSize: '14px', color: '#6e6e73' }}>Target achieved!</div>
              </div>
            </div>
            <div style={{ marginTop: '24px', padding: '20px', background: '#f0fdf4', borderLeft: '4px solid #059669', borderRadius: '8px' }}>
              <p style={{ fontSize: '16px', color: '#1d1d1f', lineHeight: '1.6', margin: 0 }}>
                <strong>Sagaa Insight:</strong> "Your home BP readings show great progress. Your medication is working well—you've achieved target BP (&lt;130/80). For your follow-up with Dr. Chen next month, I've prepared a summary showing 95% of readings in target range."
              </p>
            </div>
          </div>

          {/* Community Insights */}
          <div style={{ background: 'linear-gradient(135deg, #fce7f3 0%, #f8fafc 100%)', borderRadius: '24px', padding: '40px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px', color: '#0369a1', textAlign: 'center' }}>Community Medication Wisdom</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              {[
                { strategy: 'Take with largest meal', success: '87%', users: '342 users' },
                { strategy: 'Morning timing works best', success: '73%', users: '287 users' },
                { strategy: 'Stick with it—side effects resolve', success: '64%', users: '421 users' }
              ].map((insight, idx) => (
                <div key={idx} style={{ background: 'white', borderRadius: '16px', padding: '24px' }}>
                  <div style={{ fontSize: '32px', fontWeight: 700, color: '#0369a1', marginBottom: '8px' }}>{insight.success}</div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: '#1d1d1f', marginBottom: '8px' }}>{insight.strategy}</div>
                  <div style={{ fontSize: '14px', color: '#6e6e73' }}>{insight.users} found helpful</div>
                </div>
              ))}
            </div>
          </div>

          {/* Medical Disclaimer */}
          <div style={{
            background: '#fff7ed',
            border: '2px solid #fb923c',
            borderRadius: '12px',
            padding: '20px 24px',
            display: 'flex',
            gap: '16px',
            alignItems: 'start'
          }}>
            <div style={{ fontSize: '24px', flexShrink: 0 }}>⚕️</div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#ea580c', marginBottom: '8px' }}>
                MEDICAL DISCLAIMER
              </div>
              <p style={{ fontSize: '14px', color: '#6e6e73', lineHeight: '1.6', margin: 0 }}>
                Sagaa is a medication management tool, not a substitute for professional medical advice. Always consult your doctor or pharmacist about medication decisions, interactions, and dosing. Sagaa provides informational alerts based on clinical databases but cannot guarantee complete accuracy or replace healthcare professionals.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MedicationManagement;