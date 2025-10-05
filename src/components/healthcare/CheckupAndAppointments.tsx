import Title_Image from '../../assets/AppointmentsAndCare.jpg';

export const AppointmentsAndCareTeamManagement = () => {
  return (
    <>
{/* Appointments & Care Team Management Section */}
      <section id="appointments-care-team" style={{
        padding: '80px 0',
        background: 'linear-gradient(135deg, #dcfce7 0%, #f8fafc 100%)',
        color: '#1d1d1f',
      }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 24px' }}>
          {/* Hero with Image */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center', marginBottom: '64px' }}>
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
             }}>Your Care Teams & Doctors.</span>{' '}
            <span style={{
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #f87171 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent'
            }}>One Network</span>
            </h2>
              <p style={{ fontSize: '20px', color: '#6e6e73', lineHeight: '1.6' }}>
                Never miss a follow-up, lose track of referrals, or show up unprepared. Sagaa orchestrates your entire care team, ensuring seamless coordination and comprehensive visit preparation.
              </p>
            </div>
            <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
              <img 
                src={Title_Image}
                alt="Healthcare coordination network with connected medical interfaces, appointments, and health data"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>

          {/* Key Capabilities Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
            {[
              {
                icon: '📅',
                title: 'Smart Scheduling',
                description: 'AI-powered appointment booking that knows your availability, insurance coverage, and preferred providers.',
                gradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)'
              },
              {
                icon: '🔗',
                title: 'Referral Tracking',
                description: 'Automatic monitoring of specialist referrals from PCP to completion, ensuring nothing falls through the cracks.',
                gradient: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)'
              },
              {
                icon: '📋',
                title: 'Visit Preparation',
                description: 'Personalized prep reports with your health trends, questions to ask, and relevant test results for every appointment.',
                gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)'
              },
              {
                icon: '👥',
                title: 'Provider Directory',
                description: 'Complete care team management with contact info, specialties, last visit dates, and next appointment due dates.',
                gradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)'
              }
            ].map((capability, idx) => (
              <div key={idx} style={{
                background: 'white',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  background: capability.gradient,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  marginBottom: '16px'
                }}>{capability.icon}</div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px', color: '#1d1d1f' }}>{capability.title}</h3>
                <p style={{ fontSize: '15px', color: '#6e6e73', lineHeight: '1.6', margin: 0 }}>{capability.description}</p>
              </div>
            ))}
          </div>

          {/* Detailed Example: Care Coordination */}
          <div style={{ background: 'white', borderRadius: '24px', padding: '48px', marginBottom: '32px', boxShadow: '0 8px 32px rgba(34,197,94,0.12)' }}>
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '14px', color: '#059669', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Real-World Scenario</div>
              <h3 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '16px', color: '#1d1d1f' }}>Proactive Care Team Coordination</h3>
            </div>

            <div style={{ display: 'flex', alignItems: 'start', gap: '20px', marginBottom: '32px', padding: '24px', background: '#f0fdf4', borderRadius: '16px', borderLeft: '4px solid #059669' }}>
              <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>💬</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', color: '#059669', marginBottom: '8px', fontWeight: '600' }}>Sagaa Proactive Alert</div>
                <p style={{ fontSize: '17px', color: '#1d1d1f', lineHeight: '1.7', margin: 0, fontStyle: 'italic' }}>
                  "Dr. Martinez's visit notes from last week mention she's concerned about your vitamin D levels (18 ng/mL, target is 30-50). She recommended 2000 IU daily supplementation and recheck in 3 months. I see you haven't picked up the prescription yet. Would you like me to order OTC vitamin D or remind CVS about the prescription?"
                </p>
              </div>
            </div>

            <div style={{ paddingLeft: '32px', borderLeft: '2px solid #e5e7eb', marginBottom: '32px' }}>
              <div style={{ fontSize: '14px', color: '#6e6e73', marginBottom: '16px', fontWeight: '600' }}>Intelligence Layers Used:</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                {[
                  { icon: '🩺', label: 'Provider Visit Notes' },
                  { icon: '🔬', label: 'Lab Result Analysis' },
                  { icon: '💊', label: 'Prescription Tracking' },
                  { icon: '📅', label: 'Follow-up Scheduling' },
                  { icon: '🏪', label: 'Pharmacy Integration' },
                  { icon: '📊', label: 'Health Goal Monitoring' }
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: '#dcfce7', borderRadius: '8px' }}>
                    <span style={{ fontSize: '18px' }}>{item.icon}</span>
                    <span style={{ fontSize: '13px', color: '#059669', fontWeight: '500' }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#f9fafb', padding: '24px', borderRadius: '12px' }}>
              <div style={{ fontSize: '14px', color: '#6e6e73', marginBottom: '16px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>What Sagaa Does Behind the Scenes:</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {[
                  { step: '1', icon: '📄', action: 'Parsed clinical notes from endocrinology visit', color: '#3b82f6' },
                  { step: '2', icon: '🎯', action: 'Identified vitamin D supplementation need', color: '#8b5cf6' },
                  { step: '3', icon: '💊', action: 'Checked prescription status at CVS', color: '#ec4899' },
                  { step: '4', icon: '💰', action: 'Compared OTC vs. prescription coverage', color: '#f59e0b' },
                  { step: '5', icon: '⏰', action: 'Set 3-month follow-up reminder', color: '#10b981' },
                  { step: '6', icon: '📋', action: 'Added to next appointment prep', color: '#059669' }
                ].map((item) => (
                  <div key={item.step} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px',
                    padding: '12px',
                    background: 'white',
                    borderRadius: '8px',
                    borderLeft: `3px solid ${item.color}`,
                  }}>
                    <div style={{
                      minWidth: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: `${item.color}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '11px',
                      fontWeight: '700',
                      flexShrink: 0
                    }}>{item.step}</div>
                    <div style={{ fontSize: '18px', flexShrink: 0 }}>{item.icon}</div>
                    <div style={{ fontSize: '13px', fontWeight: '500', color: '#374151', lineHeight: '1.4' }}>{item.action}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Capabilities */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {[
              {
                title: 'Referral Management',
                scenario: 'PCP to Specialist Flow',
                example: 'Dr. Chen referred you to a cardiologist for elevated blood pressure. I found 3 in-network cardiologists with availability this month, reviewed their credentials and patient ratings, and can book with Dr. Kumar (4.8 stars, 15 years experience) for next Tuesday at 2 PM.',
                features: ['Referral tracking', 'Insurance verification', 'Provider research', 'Appointment booking']
              },
              {
                title: 'Visit Preparation Reports',
                scenario: 'Quarterly Diabetes Check-In',
                example: 'Your appointment with Dr. Martinez is tomorrow. I\'ve prepared: (1) Your A1C trend (5.9 → 5.7 → 5.5, great progress!), (2) CGM data showing improved glucose control, (3) Medication adherence (98% for Metformin), (4) Questions to ask about possibly reducing medication dose given your improvements.',
                features: ['Health trend analysis', 'Medication review', 'Questions generation', 'Goal progress']
              },
              {
                title: 'Multi-Provider Coordination',
                scenario: 'Complex Condition Management',
                example: 'Your endocrinologist adjusted your thyroid medication. I\'ve notified Dr. Chen (PCP) and scheduled follow-up TSH test in 6 weeks. I also flagged this for your cardiologist since thyroid function affects heart rate - your next cardiology appointment is in 2 months.',
                features: ['Care team updates', 'Lab scheduling', 'Drug interaction checks', 'Cross-specialty coordination']
              }
            ].map((item, idx) => (
              <div key={idx} style={{
                background: 'white',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              }}>
                <h4 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px', color: '#1d1d1f' }}>{item.title}</h4>
                <div style={{ fontSize: '13px', color: '#059669', fontWeight: '600', marginBottom: '16px', textTransform: 'uppercase' }}>{item.scenario}</div>
                <p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.7', marginBottom: '20px', fontStyle: 'italic', background: '#f9fafb', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #10b981' }}>
                  "{item.example}"
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {item.features.map(feature => (
                    <span key={feature} style={{
                      fontSize: '12px',
                      padding: '6px 12px',
                      background: '#f0fdf4',
                      color: '#059669',
                      borderRadius: '6px',
                      fontWeight: '500'
                    }}>✓ {feature}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>    </>
  );
};