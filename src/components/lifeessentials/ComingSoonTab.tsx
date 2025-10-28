import React from 'react';

interface ComingSoonTabProps {
  icon: string;
  title: string;
  description: string;
}

export const ComingSoonTab: React.FC<ComingSoonTabProps> = ({ icon, title, description }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
      padding: '48px 24px',
      textAlign: 'center'
    }}>
      <div style={{
        fontSize: '80px',
        marginBottom: '24px',
        opacity: 0.8
      }}>
        {icon}
      </div>
      <h2 style={{
        fontSize: '28px',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '16px'
      }}>
        {title}
      </h2>
      <p style={{
        fontSize: '16px',
        color: '#6b7280',
        maxWidth: '600px',
        lineHeight: '1.6',
        marginBottom: '32px'
      }}>
        {description}
      </p>
      <div style={{
        display: 'inline-block',
        backgroundColor: '#eff6ff',
        color: '#0369a1',
        padding: '12px 24px',
        borderRadius: '8px',
        fontWeight: '600',
        fontSize: '14px',
        border: '1px solid #93c5fd'
      }}>
        Coming Soon
      </div>
    </div>
  );
};
