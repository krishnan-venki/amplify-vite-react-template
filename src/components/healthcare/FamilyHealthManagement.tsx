import React, { useState } from 'react';


const FamilyHealthManagement: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<'without' | 'with'>('without');

  const sectionStyle: React.CSSProperties = {
    padding: '64px 0',
    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)'
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px'
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '48px'
  };

  const badgeStyle: React.CSSProperties = {
    display: 'inline-block',
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '0.875rem',
    fontWeight: 600,
    marginBottom: '16px'
  };

  const toggleContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    marginBottom: '32px'
  };

  const getButtonStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '12px 24px',
    borderRadius: '8px',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    backgroundColor: isActive ? (activeScenario === 'without' ? '#ef4444' : '#10b981') : '#ffffff',
    color: isActive ? '#ffffff' : '#4b5563',
    boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.15)' : '0 2px 4px rgba(0,0,0,0.1)'
  });

  const scenarioBoxStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    marginBottom: '48px'
  };

  const featureGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    marginBottom: '48px'
  };

  const featureCardStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    border: '1px solid #e0f2fe'
  };

  const ctaBoxStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
    color: '#ffffff',
    borderRadius: '12px',
    padding: '32px',
    textAlign: 'center'
  };

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div style={badgeStyle}>FAMILY HEALTH MANAGEMENT</div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>
            One Platform for Your Entire Family's Health
          </h2>
          <p style={{ fontSize: '1.25rem', color: '#4b5563', maxWidth: '800px', margin: '0 auto' }}>
            Managing your prediabetes, your kids' appointments, and your aging parent's medications shouldn't require 10 different apps.
          </p>
        </div>

        {/* Toggle */}
        <div style={toggleContainerStyle}>
          <button onClick={() => setActiveScenario('without')} style={getButtonStyle(activeScenario === 'without')}>
            Without Sagaa
          </button>
          <button onClick={() => setActiveScenario('with')} style={getButtonStyle(activeScenario === 'with')}>
            With Sagaa
          </button>
        </div>

        {/* Scenario Content */}
        <div style={scenarioBoxStyle}>
          {activeScenario === 'without' ? (
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>
                The Chaos of Multiple Apps
              </h3>
              <p style={{ color: '#374151', marginBottom: '16px', fontSize: '1.1rem' }}>
                Meet Sarah, 34, managing her own prediabetes while caring for two kids and helping with her elderly father's health:
              </p>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '24px' }}>
                <li style={{ color: '#4b5563', marginBottom: '12px', display: 'flex', gap: '12px' }}>
                  <span style={{ color: '#ef4444', fontWeight: 'bold' }}>✗</span>
                  <span><strong>MySugr</strong> for dad's diabetes tracking</span>
                </li>
                <li style={{ color: '#4b5563', marginBottom: '12px', display: 'flex', gap: '12px' }}>
                  <span style={{ color: '#ef4444', fontWeight: 'bold' }}>✗</span>
                  <span><strong>Medisafe</strong> for dad's 7 medications + her own meds</span>
                </li>
                <li style={{ color: '#4b5563', marginBottom: '12px', display: 'flex', gap: '12px' }}>
                  <span style={{ color: '#ef4444', fontWeight: 'bold' }}>✗</span>
                  <span><strong>Separate vaccine tracker</strong> for 6-year-old son and 3-year-old daughter</span>
                </li>
                <li style={{ color: '#4b5563', marginBottom: '12px', display: 'flex', gap: '12px' }}>
                  <span style={{ color: '#ef4444', fontWeight: 'bold' }}>✗</span>
                  <span><strong>Paper calendar</strong> trying to coordinate everyone's appointments</span>
                </li>
                <li style={{ color: '#4b5563', marginBottom: '12px', display: 'flex', gap: '12px' }}>
                  <span style={{ color: '#ef4444', fontWeight: 'bold' }}>✗</span>
                  <span><strong>Spreadsheet</strong> tracking insurance for 4 people</span>
                </li>
              </ul>
              <p style={{ fontStyle: 'italic', color: '#6b7280' }}>
                <strong>Result:</strong> Sarah spends 5+ hours per week managing family health, things fall through cracks, and she's constantly stressed.
              </p>
            </div>
          ) : (
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>
                Sagaa: Your Family Health Command Center
              </h3>
              <div style={{ 
                backgroundColor: '#dbeafe', 
                borderLeft: '4px solid #2563eb', 
                padding: '16px', 
                borderRadius: '6px',
                marginBottom: '24px' 
              }}>
                <p style={{ fontWeight: 600, color: '#1e3a8a', marginBottom: '8px' }}>Monday Morning Alert:</p>
                <p style={{ color: '#1e40af', lineHeight: 1.6 }}>
                  "Sarah, here's your family health snapshot: Tommy's inhaler expires next week (ordering now), Dad's BP meds need refill (pharmacy notified), Emma is due for 3-year vaccines, and your A1C recheck is in 2 weeks. I can book Tommy's allergy follow-up and Emma's vaccines together at same clinic, Saturday 10 AM. Approve?"
                </p>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '24px' }}>
                <li style={{ color: '#374151', marginBottom: '12px', display: 'flex', gap: '12px' }}>
                  <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span>
                  <span><strong>4 health profiles</strong> in one platform - Sarah, kids, dad</span>
                </li>
                <li style={{ color: '#374151', marginBottom: '12px', display: 'flex', gap: '12px' }}>
                  <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span>
                  <span><strong>Coordinated appointments</strong> - books multiple family members efficiently</span>
                </li>
                <li style={{ color: '#374151', marginBottom: '12px', display: 'flex', gap: '12px' }}>
                  <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span>
                  <span><strong>Unified medication tracking</strong> - all prescriptions, refills, reminders</span>
                </li>
                <li style={{ color: '#374151', marginBottom: '12px', display: 'flex', gap: '12px' }}>
                  <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span>
                  <span><strong>Proactive alerts</strong> - catches what you'd forget</span>
                </li>
              </ul>
              <p style={{ fontStyle: 'italic', color: '#6b7280' }}>
                <strong>Result:</strong> Sarah saves 4+ hours per week, nothing falls through cracks, and she has peace of mind.
              </p>
            </div>
          )}
        </div>

        {/* Feature Grid */}
        <div style={featureGridStyle}>
          <div style={featureCardStyle}>
            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>👶</div>
            <h3 style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: '8px' }}>Pediatric Care</h3>
            <ul style={{ fontSize: '0.875rem', color: '#4b5563', listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '6px' }}>• Vaccine schedule tracking</li>
              <li style={{ marginBottom: '6px' }}>• Growth milestone monitoring</li>
              <li style={{ marginBottom: '6px' }}>• School health requirements</li>
              <li>• Pediatrician coordination</li>
            </ul>
          </div>

          <div style={featureCardStyle}>
            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>❤️</div>
            <h3 style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: '8px' }}>Elder Care</h3>
            <ul style={{ fontSize: '0.875rem', color: '#4b5563', listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '6px' }}>• Caregiver access sharing</li>
              <li style={{ marginBottom: '6px' }}>• Complex medication management</li>
              <li style={{ marginBottom: '6px' }}>• Provider communication</li>
              <li>• Emergency information ready</li>
            </ul>
          </div>

          <div style={featureCardStyle}>
            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>📅</div>
            <h3 style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: '8px' }}>Smart Scheduling</h3>
            <ul style={{ fontSize: '0.875rem', color: '#4b5563', listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '6px' }}>• Multi-person appointment booking</li>
              <li style={{ marginBottom: '6px' }}>• Same-day coordination</li>
              <li style={{ marginBottom: '6px' }}>• Insurance-aware scheduling</li>
              <li>• Family reminder management</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div style={ctaBoxStyle}>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '16px' }}>
            Replace 5+ Apps with One Family Platform
          </h3>
          <p style={{ fontSize: '1.125rem', marginBottom: '24px', opacity: 0.9 }}>
            Sagaa Family Tier: $49.99/month for up to 6 family members
          </p>
          <p style={{ opacity: 0.85 }}>
            Parents are already saving 5+ hours per week and have peace of mind that nothing falls through the cracks.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FamilyHealthManagement;