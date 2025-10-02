import { ReactNode } from 'react';

interface TabletFrameProps {
  children: ReactNode;
}

export function TabletFrame({ children }: TabletFrameProps) {
  return (
    <div
      style={{
        width: '540px',
        height: '720px',
        position: 'relative',
        backgroundColor: '#2C2C2E',
        borderRadius: '24px',
        padding: '6px',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Screen */}
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#FFFFFF',
          borderRadius: '18px',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* iPad Camera */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '8px',
            height: '8px',
            backgroundColor: '#1C1C1E',
            borderRadius: '50%',
            zIndex: 10
          }}
        />
        
        {/* Status Bar */}
        <div
          style={{
            height: '50px',
            backgroundColor: '#F8F9FA',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 30px',
            fontSize: '16px',
            fontWeight: '600'
          }}
        >
          {/* Left side - Time */}
          <div>9:41</div>
        </div>

        {/* Content */}
        <div
          style={{
            height: 'calc(100% - 50px)',
            overflow: 'hidden'
          }}
        >
          {children}
        </div>
      </div>

      {/* iPad Home Button */}
      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '50px',
          height: '50px',
          backgroundColor: 'transparent',
          border: '2px solid #FFFFFF',
          borderRadius: '50%',
          opacity: 0.8
        }}
      />
    </div>
  );
}