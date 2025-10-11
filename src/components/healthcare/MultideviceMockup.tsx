
import sagaaIcon from '../../assets/sagaa_48x48.png';

export const MultiDeviceMockup = () => {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '380px',
      height: '260px',
      marginTop: '32px',
      marginLeft: 'auto',
      marginRight: 'auto'
    }}>
      {/* Laptop - Back (largest) */}
      <div style={{
        position: 'absolute',
        left: '0',
        top: '0',
        width: '260px',
        zIndex: 1
      }}>
        {/* Laptop Screen */}
        <div style={{
          background: '#1e293b',
          borderRadius: '10px 10px 0 0',
          padding: '4px',
          border: '2px solid #334155',
          boxShadow: '0 10px 30px rgba(0,0,0,0.25)'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '6px',
            height: '150px',
            overflow: 'hidden'
          }}>
            {/* Mini Chat Interface */}
            <div style={{
              background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
              padding: '2px 8px',
              borderBottom: '1px solid #fecaca',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                  // Removed green background circle and related styles
                }}>
                  <img src={sagaaIcon} alt="Sagaa icon" style={{ width: 14, height: 14, verticalAlign: 'middle' }} />
                </div>
              <div style={{ fontSize: '9px', fontWeight: 600, color: '#1e293b' }}>
                Sagaa Healthcare
              </div>
            </div>
            <div style={{ padding: '12px', background: '#fafafa' }}>
              <div style={{
                background: '#0c4a6e',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '10px 10px 2px 10px',
                fontSize: '7px',
                marginBottom: '8px',
                marginLeft: 'auto',
                width: 'fit-content',
                maxWidth: '70%'
              }}>
                Show my blood pressure trends
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #fca5a5 0%, #f87171 100%)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '2px 10px 10px 10px',
                fontSize: '6.5px',
                maxWidth: '90%',
                lineHeight: 1.4
              }}>
                Here's your BP pattern over 3 months. Great news: decreased from 142/88 to 128/82!
                <div style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '6px',
                  padding: '6px',
                  marginTop: '6px'
                }}>
                  <svg width="100%" height="60" viewBox="0 0 200 60" preserveAspectRatio="xMidYMid meet">
                    {/* Grid lines */}
                    <line x1="0" y1="15" x2="200" y2="15" stroke="#e2e8f0" strokeWidth="0.5" />
                    <line x1="0" y1="30" x2="200" y2="30" stroke="#e2e8f0" strokeWidth="0.5" />
                    <line x1="0" y1="45" x2="200" y2="45" stroke="#e2e8f0" strokeWidth="0.5" />
                    
                    {/* Target line */}
                    <line x1="0" y1="25" x2="200" y2="25" stroke="#10b981" strokeWidth="1" strokeDasharray="2,2" />
                    
                    {/* Systolic line (red) */}
                    <polyline
                      points="20,8 50,12 80,18 110,22 140,25 170,28"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="1.5"
                    />
                    
                    {/* Diastolic line (blue) */}
                    <polyline
                      points="20,48 50,46 80,44 110,42 140,40 170,40"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="1.5"
                    />
                    
                    {/* Data points */}
                    <circle cx="20" cy="8" r="2" fill="#ef4444" />
                    <circle cx="50" cy="12" r="2" fill="#ef4444" />
                    <circle cx="80" cy="18" r="2" fill="#ef4444" />
                    <circle cx="110" cy="22" r="2" fill="#ef4444" />
                    <circle cx="140" cy="25" r="2" fill="#ef4444" />
                    <circle cx="170" cy="28" r="2" fill="#ef4444" />
                    
                    <circle cx="20" cy="48" r="2" fill="#3b82f6" />
                    <circle cx="50" cy="46" r="2" fill="#3b82f6" />
                    <circle cx="80" cy="44" r="2" fill="#3b82f6" />
                    <circle cx="110" cy="42" r="2" fill="#3b82f6" />
                    <circle cx="140" cy="40" r="2" fill="#3b82f6" />
                    <circle cx="170" cy="40" r="2" fill="#3b82f6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Laptop Base */}
        <div style={{
          background: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)',
          height: '10px',
          borderRadius: '0 0 14px 14px',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            bottom: '-8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '70px',
            height: '8px',
            background: '#1e293b',
            borderRadius: '0 0 10px 10px'
          }} />
        </div>
      </div>

      {/* iPad - Middle (medium) */}
      <div style={{
        position: 'absolute',
        left: '110px',
        top: '25px',
        width: '160px',
        zIndex: 2
      }}>
        {/* iPad Frame */}
        <div style={{
          background: '#1e293b',
          borderRadius: '14px',
          padding: '4px',
          boxShadow: '0 15px 40px rgba(0,0,0,0.3)'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '8px',
            height: '200px',
            overflow: 'hidden'
          }}>
            {/* Mini Chat Interface */}
            <div style={{
              background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
              padding: '0px 4px',
              borderBottom: '1px solid #fecaca',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                  // Removed green background circle and related styles
                }}>
                  <img src={sagaaIcon} alt="Sagaa icon" style={{ width: 14, height: 14, verticalAlign: 'middle' }} />
                </div>
              <div style={{ fontSize: '9px', fontWeight: 600, color: '#1e293b' }}>
                Sagaa Healthcare
              </div>
            </div>
            <div style={{ padding: '12px', background: '#fafafa' }}>
              <div style={{
                background: '#0c4a6e',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '10px 10px 2px 10px',
                fontSize: '7.5px',
                marginBottom: '8px',
                marginLeft: 'auto',
                width: 'fit-content',
                maxWidth: '70%'
              }}>
                What hikes can I do?
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #fca5a5 0%, #f87171 100%)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '2px 10px 10px 10px',
                fontSize: '7.5px',
                maxWidth: '85%',
                lineHeight: 1.5
              }}>
                Your ankle is healing well! Here are 3 flat trails perfect for recovery...
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* iPhone - Front (smallest) */}
      <div style={{
        position: 'absolute',
        left: '80px',
        bottom: '0',
        width: '100px',
        zIndex: 3
      }}>
        {/* iPhone Frame */}
        <div style={{
          background: '#1e293b',
          borderRadius: '24px',
          padding: '4px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.4)'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            height: '180px',
            overflow: 'hidden'
          }}>
            {/* Mini Chat Interface */}
            <div style={{
              background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
              padding: '0px 4px',
              borderBottom: '1px solid #fecaca',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <div style={{
                  // Removed green background circle and related styles
                }}>
                  <img src={sagaaIcon} alt="Sagaa icon" style={{ width: 14, height: 14, verticalAlign: 'middle' }} />
                </div>
              <div style={{ fontSize: '7px', fontWeight: 600, color: '#1e293b' }}>
                Sagaa Healthcare
              </div>
            </div>
            <div style={{ padding: '10px', background: '#fafafa', height: 'calc(100% - 36px)' }}>
              <div style={{
                background: '#0c4a6e',
                color: 'white',
                padding: '8px 10px',
                borderRadius: '10px 10px 2px 10px',
                fontSize: '7px',
                marginBottom: '8px',
                marginLeft: 'auto',
                width: 'fit-content',
                maxWidth: '70%'
              }}>
                Blood pressure?
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #fca5a5 0%, #f87171 100%)',
                color: 'white',
                padding: '8px 10px',
                borderRadius: '2px 10px 10px 10px',
                fontSize: '6.5px',
                maxWidth: '85%',
                lineHeight: 1.5
              }}>
                Great progress! Your BP decreased from 142/88 to 128/82...
              </div>
            </div>
          </div>
        </div>
      </div>

       {/* Smart Speaker (Alexa-style) - Bottom Right */}
      <div style={{
        position: 'absolute',
        right: '20px',
        bottom: '10px',
        width: '80px',
        zIndex: 2
      }}>
        {/* Conversation Bubble */}
        <div style={{
          position: 'absolute',
          bottom: '95px',
          right: '-70px',
          background: 'white',
          borderRadius: '16px',
          padding: '10px 12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          width: '125px',
          border: '2px dashed #cbd5e1',

        }}>
          <div style={{ fontSize: '7px', color: '#0c4a6e', fontWeight: 600, marginBottom: '5px' }}>
            "Alexa, ask Sagaa about my medication"
          </div>
          <div style={{ 
            fontSize: '6.5px', 
            color: '#64748b',
            lineHeight: 1.4,
            marginTop: '6px'
          }}>
            "Your Lisinopril refill is due in 3 days. Should I request it now?"
          </div>
          {/* Speech bubble tail - pointing down to speaker */}
          <div style={{
            position: 'absolute',
            bottom: '-12px',
            right: '80px',
            width: '0',
            height: '0',
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderTop: '12px solid white',
            filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.1))'
          }} />
        </div>

        {/* Smart Speaker Device */}
        <div style={{
          position: 'relative',
          width: '80px',
          height: '80px'
        }}>
          {/* Speaker Body - Cylinder */}
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
            borderRadius: '50%',
            position: 'relative',
            boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
            border: '2px solid #1e293b'
          }}>
            {/* Top rim highlight */}
            <div style={{
              position: 'absolute',
              top: '0',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '70px',
              height: '8px',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
              borderRadius: '50% 50% 0 0'
            }} />
            
            {/* LED Ring - Cyan (Alexa active) */}
            <div style={{
              position: 'absolute',
              top: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '6px',
              background: 'linear-gradient(90deg, #06b6d4 0%, #0891b2 50%, #06b6d4 100%)',
              borderRadius: '10px',
              boxShadow: '0 0 12px #06b6d4',
              animation: 'pulse 2s ease-in-out infinite'
            }} />
            
            {/* Speaker grill holes */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '6px',
              opacity: 0.4
            }}>
              {[...Array(9)].map((_, i) => (
                <div key={i} style={{
                  width: '4px',
                  height: '4px',
                  background: '#000',
                  borderRadius: '50%'
                }} />
              ))}
            </div>
            
            {/* Bottom shadow */}
            <div style={{
              position: 'absolute',
              bottom: '-4px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '70px',
              height: '8px',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '50%',
              filter: 'blur(4px)'
            }} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>

      {/* Label */}
      <div style={{
        position: 'absolute',
        bottom: '-30px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '12px',
        color: '#bae6fd',
        fontWeight: 500,
        textAlign: 'center',
        whiteSpace: 'nowrap'
      }}>
        ✨ Seamless across all your devices
      </div>
    </div>
  );
};

export default MultiDeviceMockup;