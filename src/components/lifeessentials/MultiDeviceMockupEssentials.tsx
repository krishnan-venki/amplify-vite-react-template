import sagaaIcon from '../../assets/sagaa_48x48.png';

export const MultiDeviceMockupLife = () => {
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
              background: 'linear-gradient(135deg, #fef3c7 0%, #fef9ec 100%)',
              padding: '2px 8px',
              borderBottom: '1px solid #fbbf24',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div>
                <img src={sagaaIcon} alt="Sagaa icon" style={{ width: 14, height: 14, verticalAlign: 'middle' }} />
              </div>
              <div style={{ fontSize: '9px', fontWeight: 600, color: '#1e293b' }}>
                Sagaa Life
              </div>
            </div>
            <div style={{ padding: '12px', background: '#fafafa' }}>
              <div style={{
                background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '10px 10px 2px 10px',
                fontSize: '7px',
                marginBottom: '8px',
                marginLeft: 'auto',
                width: 'fit-content',
                maxWidth: '70%'
              }}>
                Is my home insurance adequate?
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '2px 10px 10px 10px',
                fontSize: '6.5px',
                maxWidth: '90%',
                lineHeight: 1.4
              }}>
                Your coverage has a $95K gap since your renovations...
                <div style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: '6px',
                  padding: '6px',
                  marginTop: '6px',
                  fontSize: '6px'
                }}>
                  <div style={{ marginBottom: '3px' }}>
                    <strong>Kitchen:</strong> +$45K
                  </div>
                  <div style={{ marginBottom: '3px' }}>
                    <strong>Roof:</strong> +$18K
                  </div>
                  <div>
                    <strong>Basement:</strong> +$32K
                  </div>
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
              background: 'linear-gradient(135deg, #fef3c7 0%, #fef9ec 100%)',
              padding: '0px 4px',
              borderBottom: '1px solid #fbbf24',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div>
                <img src={sagaaIcon} alt="Sagaa icon" style={{ width: 14, height: 14, verticalAlign: 'middle' }} />
              </div>
              <div style={{ fontSize: '9px', fontWeight: 600, color: '#1e293b' }}>
                Sagaa Life
              </div>
            </div>
            <div style={{ padding: '12px', background: '#fafafa' }}>
              <div style={{
                background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '10px 10px 2px 10px',
                fontSize: '7.5px',
                marginBottom: '8px',
                marginLeft: 'auto',
                width: 'fit-content',
                maxWidth: '70%'
              }}>
                What's everyone doing this weekend?
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '2px 10px 10px 10px',
                fontSize: '7.5px',
                maxWidth: '85%',
                lineHeight: 1.5
              }}>
                Tommy: Soccer 8AM (Bellevue)<br/>
                Sarah: Dentist 9AM ⚠️ CONFLICT<br/>
                Bella: Vet 10AM overdue
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
              background: 'linear-gradient(135deg, #fef3c7 0%, #fef9ec 100%)',
              padding: '0px 4px',
              borderBottom: '1px solid #fbbf24',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <div>
                <img src={sagaaIcon} alt="Sagaa icon" style={{ width: 14, height: 14, verticalAlign: 'middle' }} />
              </div>
              <div style={{ fontSize: '7px', fontWeight: 600, color: '#1e293b' }}>
                Sagaa Life
              </div>
            </div>
            <div style={{ padding: '10px', background: '#fafafa', height: 'calc(100% - 36px)' }}>
              <div style={{
                background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
                color: 'white',
                padding: '8px 10px',
                borderRadius: '10px 10px 2px 10px',
                fontSize: '7px',
                marginBottom: '8px',
                marginLeft: 'auto',
                width: 'fit-content',
                maxWidth: '70%'
              }}>
                Replace water heater?
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                color: 'white',
                padding: '8px 10px',
                borderRadius: '2px 10px 10px 10px',
                fontSize: '6.5px',
                maxWidth: '85%',
                lineHeight: 1.5
              }}>
                It's 11 years old - failure risk HIGH. Winter failures spike 40%...
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
          <div style={{ fontSize: '7px', color: '#d97706', fontWeight: 600, marginBottom: '5px' }}>
            "Alexa, ask Sagaa about my emergency kit"
          </div>
          <div style={{ 
            fontSize: '6.5px', 
            color: '#64748b',
            lineHeight: 1.4,
            marginTop: '6px'
          }}>
            "Storm forecast: 2ft snow Friday. Your batteries expired - ordering for tomorrow delivery."
          </div>
          {/* Speech bubble tail */}
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
          {/* Speaker Body */}
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
            
            {/* LED Ring - Orange (active) */}
            <div style={{
              position: 'absolute',
              top: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '6px',
              background: 'linear-gradient(90deg, #f59e0b 0%, #d97706 50%, #f59e0b 100%)',
              borderRadius: '10px',
              boxShadow: '0 0 12px #f59e0b',
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
        color: '#fcd34d',
        fontWeight: 500,
        textAlign: 'center',
        whiteSpace: 'nowrap'
      }}>
        ✨ Seamless across all your devices
      </div>
    </div>
  );
};

export default MultiDeviceMockupLife;