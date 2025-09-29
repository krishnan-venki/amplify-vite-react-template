import { ReactNode } from 'react';

interface MobileFrameProps {
  children: ReactNode;
}

export function MobileFrame({ children }: MobileFrameProps) {
  return (
    <div
      style={{
        width: '380px',
        height: '780px',
        position: 'relative',
        backgroundColor: '#2C2C2E',
        borderRadius: '32px',
        padding: '4px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Screen */}
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#FFFFFF',
          borderRadius: '28px',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Notch */}
        <div
          style={{
            position: 'absolute',
            top: '8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '130px',
            height: '26px',
            backgroundColor: '#1C1C1E',
            borderRadius: '13px',
            zIndex: 10
          }}
        />
        
        {/* Status Bar */}
        <div
          style={{
            height: '50px',
            backgroundColor: '#F8F9FA',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: '0 24px',
            fontSize: '16px',
            fontWeight: '600'
          }}
        >
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

      {/* Home Indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '120px',
          height: '4px',
          backgroundColor: '#FFFFFF',
          borderRadius: '2px',
          opacity: 0.8
        }}
      />
    </div>
  );
}