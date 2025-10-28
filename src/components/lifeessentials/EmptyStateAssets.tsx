import React from 'react';

interface EmptyStateAssetsProps {
  onAddAsset: () => void;
}

export const EmptyStateAssets: React.FC<EmptyStateAssetsProps> = ({ onAddAsset }) => {
  const quickAddOptions = [
    { icon: '💧', name: 'Water Heater', type: 'hvac_plumbing' },
    { icon: '🚗', name: 'Vehicle', type: 'vehicle' },
    { icon: '❄️', name: 'HVAC System', type: 'hvac_plumbing' },
    { icon: '🍽️', name: 'Refrigerator', type: 'appliance' },
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '500px',
      padding: '48px 24px',
      textAlign: 'center'
    }}>
      {/* Main Icon */}
      <div style={{
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '32px',
        border: '2px solid #93c5fd'
      }}>
        <span style={{ fontSize: '64px' }}>🏠</span>
      </div>

      {/* Title */}
      <h2 style={{
        fontSize: '32px',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '16px'
      }}>
        Start Tracking Your Assets
      </h2>

      {/* Description */}
      <p style={{
        fontSize: '16px',
        color: '#6b7280',
        maxWidth: '600px',
        lineHeight: '1.6',
        marginBottom: '40px'
      }}>
        Add your home appliances, vehicles, and equipment to get AI-powered maintenance alerts, 
        lifecycle management, and proactive replacement planning.
      </p>

      {/* Primary CTA */}
      <button
        onClick={onAddAsset}
        style={{
          background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          padding: '16px 32px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '48px',
          boxShadow: '0 4px 12px rgba(12, 74, 110, 0.3)',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #075985 0%, #0284c7 50%, #0ea5e9 100%)';
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(12, 74, 110, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(12, 74, 110, 0.3)';
        }}
      >
        <span style={{ fontSize: '20px' }}>+</span>
        Add Your First Asset
      </button>

      {/* Quick Add Options */}
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <p style={{
          fontSize: '14px',
          color: '#9ca3af',
          marginBottom: '16px',
          fontWeight: '500'
        }}>
          Or try these quick adds:
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '12px'
        }}>
          {quickAddOptions.map((option, index) => (
            <button
              key={index}
              onClick={onAddAsset}
              style={{
                backgroundColor: 'white',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                padding: '16px 12px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#0284c7';
                e.currentTarget.style.backgroundColor = '#eff6ff';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span style={{ fontSize: '32px' }}>{option.icon}</span>
              <span style={{ fontSize: '13px', fontWeight: '500', color: '#1f2937' }}>
                {option.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
