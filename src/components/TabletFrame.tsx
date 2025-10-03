import { ReactNode } from 'react';

interface TabletFrameProps {
  children: ReactNode;
}

export function TabletFrame({ children }: TabletFrameProps) {
  return (
    <div
      style={{
        width: '820px',
        height: '640px',
        position: 'relative',
        backgroundColor: '#2C2C2E',
        borderRadius: '24px',
        padding: '6px',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Apple Pencil - Magnetically Attached */}
      <div
        style={{
          position: 'absolute',
          top: '-18px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '432px',
          height: '16px',
          zIndex: 15
        }}
      >
        {/* Pencil Body - Main Cylinder */}
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 30%, #FFFFFF 70%, #F0F0F0 100%)',
            borderRadius: '8px',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 3px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
          }}
        >
          {/* Pencil Tip - Corn Shape */}
          <div
            style={{
              position: 'absolute',
              left: '-12px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '24px',
              height: '16px',
              background: 'linear-gradient(90deg, #E8E8E8 0%, #F0F0F0 40%, #F8F9FA 100%)',
              clipPath: 'polygon(0 30%, 0 70%, 60% 100%, 100% 50%, 60% 0%)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
            }}
          />


          
          {/* Charging Band */}
          <div
            style={{
              position: 'absolute',
              right: '60px',
              top: '3px',
              width: '25px',
              height: '10px',
              background: 'linear-gradient(180deg, #E0E0E0 0%, #C8C8C8 100%)',
              borderRadius: '1px',
              border: '1px solid rgba(0, 0, 0, 0.1)'
            }}
          />
          
          {/* End Cap - Removable */}
          <div
            style={{
              position: 'absolute',
              right: '-1px',
              top: '2px',
              width: '16px',
              height: '12px',
              background: 'linear-gradient(180deg, #F0F0F0 0%, #E0E0E0 100%)',
              borderRadius: '0 6px 6px 0',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.5)'
            }}
          />

          {/* Magnetic Connection Indicators */}
          <div
            style={{
              position: 'absolute',
              bottom: '-6px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '120px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(72, 138, 255, 0.4) 25%, rgba(72, 138, 255, 0.8) 50%, rgba(72, 138, 255, 0.4) 75%, transparent 100%)',
              borderRadius: '0.5px'
            }}
          />
          
          {/* Secondary magnetic indicator */}
          <div
            style={{
              position: 'absolute',
              bottom: '-4px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(72, 138, 255, 0.3) 30%, rgba(72, 138, 255, 0.6) 50%, rgba(72, 138, 255, 0.3) 70%, transparent 100%)',
              borderRadius: '0.5px'
            }}
          />
        </div>
      </div>
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
            top: '50%',
            left: '12px',
            transform: 'translateY(-50%)',
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
            padding: '0 50px 0 30px',
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

     
    </div>
  );
}