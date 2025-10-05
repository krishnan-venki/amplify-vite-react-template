export const PreventativeCare = () => {
  // Preventative Care Section
  return (
    <>
      <section id="preventative-care" style={{ padding: '60px 0', background: '#f0f9ff', marginTop: '32px' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '24px', color: '#0369a1' }}>
            Preventive Care Intelligence
          </h2>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '32px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ background: '#bfdbfe', borderRadius: '16px', padding: '32px', flex: 1, minWidth: '320px', boxShadow: '0 2px 12px rgba(3, 105, 161, 0.07)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🛡️</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '12px', color: '#0369a1' }}>Catch Problems Before They Start</h3>
              <p style={{ fontSize: '1.1rem', color: '#1e293b', marginBottom: '18px' }}>
                Age-appropriate screenings, risk assessment from family history and device data, early warning detection from health patterns. Sagaa helps you stay ahead of health issues with proactive, personalized preventive care reminders and guidance.
              </p>
              <div style={{ background: '#e0f2fe', borderRadius: '8px', padding: '16px', fontStyle: 'italic', color: '#0369a1', fontSize: '1rem' }}>
                "You're turning 40 next month. With your family history of breast cancer (maternal aunt at 44), guidelines recommend starting mammograms now rather than waiting. Your insurance covers screening at 100%. Should I help you schedule?"
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};