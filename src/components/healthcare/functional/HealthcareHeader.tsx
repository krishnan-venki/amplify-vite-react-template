import React from 'react';
import heroImage from '../../../assets/Healthcare_Hero_Image.png';

interface HealthcareHeaderProps {
  isMobile?: boolean;
}

/**
 * Healthcare Header Component
 * Hero header for the Healthcare Dashboard with gradient background and hero image
 */
export const HealthcareHeader: React.FC<HealthcareHeaderProps> = ({ isMobile = false }) => {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)',
        padding: isMobile ? '24px 16px' : '32px 48px',
        color: 'white',
        position: 'relative',
        overflow: 'visible'
      }}
    >
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '32px'
        }}
      >
        {/* Hero Image - Hidden on mobile, appears first (left side) */}
        {!isMobile && (
          <div style={{ flexShrink: 0 }}>
            <img 
              src={heroImage} 
              alt="Sagaa Healthcare" 
              style={{ 
                width: '240px',
                height: 'auto',
                objectFit: 'contain',
                display: 'block'
              }} 
            />
          </div>
        )}

        {/* Title Section */}
        <div style={{ flex: 1 }}>
          <h1
            style={{
              fontSize: isMobile ? '28px' : '36px',
              fontWeight: '100',
              marginBottom: '8px',
              lineHeight: '1.4',
              color: 'white'
            }}
          >
            <span style={{
              background: 'linear-gradient(135deg, #007AFF 0%, #00D2FF 50%, #34C759 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
              display: 'inline-block',
              paddingBottom: '0.18em'
            }}>
              Sagaa Healthcare
            </span>
          </h1>
          <p
            style={{
              fontSize: isMobile ? '14px' : '16px',
              color: '#d1d5db',
              marginBottom: '0'
            }}
          >
            Your connected health ecosystem
          </p>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div
        style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-30px',
          left: '-30px',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
    </div>
  );
};
