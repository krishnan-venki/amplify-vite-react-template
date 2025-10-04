
export const Smartdeviceintegration = () => {
    return (
      // Smart Device Integration Section
      <section id="smart-device-integration" style={{
        background: 'linear-gradient(135deg, #f3e8ff 0%, #e0f2fe 100%)',
        color: '#1d1d1f',
        padding: '64px 0',
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: '80px',
            alignItems: 'center',
          }}>
            <div>
              <h2 style={{
                fontWeight: '100',
                color: '#6d28d9',
                marginBottom: '32px',
                lineHeight: '1.2',
                fontSize: 'clamp(36px, 4vw, 56px)',
                paddingTop: '0.5em',
              }}>
                <span style={{
                  background: 'linear-gradient(135deg, #a78bfa 0%, #34C759 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                  display: 'inline-block',
                  verticalAlign: 'baseline',
                  lineHeight: 'inherit',
                  paddingBottom: '0.18em',
                }}>
                  Smart Device Integration
                </span>
              </h2>
              <p style={{
                fontSize: 'clamp(18px, 2vw, 24px)',
                fontWeight: '300',
                marginBottom: '32px',
                color: '#374151',
                maxWidth: '900px',
                lineHeight: '1.6',
              }}>
                Connect your Apple Watch, Fitbit, Dexcom CGM, Omron blood pressure monitor, Oura Ring, and other devices. Sagaa continuously monitors your health data, identifies patterns, and provides actionable insights—not just numbers.
              </p>
              <div style={{
                background: 'white',
                borderRadius: '18px',
                boxShadow: '0 4px 24px rgba(160, 160, 255, 0.08)',
                padding: '32px',
                marginBottom: '16px',
                maxWidth: '700px',
              }}>
                <h3 style={{ fontWeight: '500', fontSize: '22px', color: '#6d28d9', marginBottom: '12px' }}>
                  Real-Time Health Intelligence
                </h3>
                <p style={{ fontSize: '18px', color: '#374151', marginBottom: '12px' }}>
                  "Your home BP readings show great progress: Week 1 average was 142/88, now you're at 122/76. Your Lisinopril is working well. For your follow-up with Dr. Chen, I've prepared a summary showing 95% of readings in target range."
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span style={{
                fontSize: '80px',
                background: '#f3e8ff',
                borderRadius: '24px',
                padding: '32px',
                boxShadow: '0 4px 24px rgba(160, 160, 255, 0.08)',
                display: 'inline-block',
              }}>⌚</span>
            </div>
          </div>
        </div>
      </section>
    );
  };
