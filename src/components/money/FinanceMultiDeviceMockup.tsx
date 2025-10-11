import sagaaIcon from '../../assets/sagaa_48x48.png';

export const FinanceMultiDeviceMockup = () => {
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
      {/* Laptop - Back (largest) - Budget Dashboard */}
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
            {/* Mini Chat Interface - Budget Analysis */}
            <div style={{
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
              padding: '2px 8px',
              borderBottom: '1px solid #bbf7d0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div>
                <img src={sagaaIcon} alt="Sagaa icon" style={{ width: 14, height: 14, verticalAlign: 'middle' }} />
              </div>
              <div style={{ fontSize: '9px', fontWeight: 600, color: '#1e293b' }}>
                Sagaa Money
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
                Show my spending this month
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '2px 10px 10px 10px',
                fontSize: '6.5px',
                maxWidth: '90%',
                lineHeight: 1.4
              }}>
                You're trending well! $2,340 spent of $2,800 budget with 8 days left.
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
                    
                    {/* Budget line (green dashed) */}
                    <line x1="0" y1="20" x2="200" y2="20" stroke="#10b981" strokeWidth="1" strokeDasharray="2,2" />
                    
                    {/* Spending bars */}
                    <rect x="10" y="25" width="12" height="30" fill="#3b82f6" rx="2" />
                    <rect x="30" y="22" width="12" height="33" fill="#3b82f6" rx="2" />
                    <rect x="50" y="28" width="12" height="27" fill="#3b82f6" rx="2" />
                    <rect x="70" y="18" width="12" height="37" fill="#f59e0b" rx="2" />
                    <rect x="90" y="30" width="12" height="25" fill="#3b82f6" rx="2" />
                    <rect x="110" y="26" width="12" height="29" fill="#3b82f6" rx="2" />
                    
                    {/* Category labels */}
                    <text x="16" y="58" fontSize="5" fill="#64748b" textAnchor="middle">Din</text>
                    <text x="36" y="58" fontSize="5" fill="#64748b" textAnchor="middle">Groc</text>
                    <text x="56" y="58" fontSize="5" fill="#64748b" textAnchor="middle">Gas</text>
                    <text x="76" y="58" fontSize="5" fill="#f59e0b" textAnchor="middle">Shop</text>
                    <text x="96" y="58" fontSize="5" fill="#64748b" textAnchor="middle">Util</text>
                    <text x="116" y="58" fontSize="5" fill="#64748b" textAnchor="middle">Ent</text>
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

      {/* iPad - Middle (medium) - Investment Tracking */}
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
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
              padding: '0px 4px',
              borderBottom: '1px solid #bbf7d0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div>
                <img src={sagaaIcon} alt="Sagaa icon" style={{ width: 14, height: 14, verticalAlign: 'middle' }} />
              </div>
              <div style={{ fontSize: '9px', fontWeight: 600, color: '#1e293b' }}>
                Sagaa Money
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
                How's my retirement fund?
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '2px 10px 10px 10px',
                fontSize: '7.5px',
                maxWidth: '85%',
                lineHeight: 1.5
              }}>
                On track! Your 401(k) is up 8.2% YTD. You're contributing $750/mo. At this rate, you'll hit your $2M goal by 62.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* iPhone - Front (smallest) - Quick Transaction */}
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
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
              padding: '0px 4px',
              borderBottom: '1px solid #bbf7d0',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <div>
                <img src={sagaaIcon} alt="Sagaa icon" style={{ width: 14, height: 14, verticalAlign: 'middle' }} />
              </div>
              <div style={{ fontSize: '7px', fontWeight: 600, color: '#1e293b' }}>
                Sagaa Money
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
                Can I afford lunch out?
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                color: 'white',
                padding: '8px 10px',
                borderRadius: '2px 10px 10px 10px',
                fontSize: '6.5px',
                maxWidth: '85%',
                lineHeight: 1.5
              }}>
                Yes! You have $85 left in dining budget. Chipotle nearby fits your meal prep goals too.
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
            "Alexa, ask Sagaa about my savings goal"
          </div>
          <div style={{ 
            fontSize: '6.5px', 
            color: '#64748b',
            lineHeight: 1.4,
            marginTop: '6px'
          }}>
            "You're 73% to your $10K emergency fund. Want to auto-transfer $200 on payday?"
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
            
            {/* LED Ring - Green (Sagaa active) */}
            <div style={{
              position: 'absolute',
              top: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '6px',
              background: 'linear-gradient(90deg, #10b981 0%, #059669 50%, #10b981 100%)',
              borderRadius: '10px',
              boxShadow: '0 0 12px #10b981',
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
        color: '#86efac',
        fontWeight: 500,
        textAlign: 'center',
        whiteSpace: 'nowrap'
      }}>
        ✨ Your money, managed everywhere
      </div>
    </div>
  );
};

export default FinanceMultiDeviceMockup;