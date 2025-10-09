import { useEffect, useState } from 'react';
import sagaaIcon from '../../assets/sagaa_48x48.png';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
  messageType?: 'reminder_Health' | 'insight' | 'reminder_Service';
}

export function ChatMessage({ message, isUser, timestamp, messageType }: ChatMessageProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // Function to parse and render numbered lists
  const renderMessageContent = (text: string) => {
    // Check for specific technician message pattern
    if (text.includes('I found 3 trusted technicians')) {
      // Parse the technician message manually
      const intro = "I found 3 trusted technicians from our community in your area:";
      
      const items = [
        "Mike - $140 (0.8 miles, 5⭐, serviced 23 NordicTrack units)",
        "Sarah - $160 (2.1 miles, former NordicTrack tech, includes belt check)",
        "Tom - $135 (1.5 miles, weekend availability)"
      ];
      
      const trailing = "All three are available during your work-from-home week. Tuesday morning at 9 AM works with your schedule.";
      
      return (
        <div>
          {/* Intro text */}
          <div style={{ marginBottom: '12px' }}>
            {intro}
          </div>
          
          {/* Numbered list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
            {items.map((item, index) => (
              <div 
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px'
                }}
              >
                {/* Number badge */}
                <div
                  style={{
                    minWidth: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: isUser ? 'rgba(255, 255, 255, 0.2)' : '#007AFF',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: '600',
                    marginTop: '1px'
                  }}
                >
                  {index + 1}
                </div>
                
                {/* Content */}
                <div style={{ flex: 1, lineHeight: '1.4' }}>
                  {item}
                </div>
              </div>
            ))}
          </div>
          
          {/* Trailing text */}
          <div>
            {trailing}
          </div>
        </div>
      );
    }
    
    // Check for generic numbered list pattern (1), (2), (3)
    const hasNumberedList = /\(1\).*?\(2\).*?\(3\)/.test(text);
    if (hasNumberedList) {
      // Use a simpler approach for generic numbered lists
      const parts = text.split(/\s*\((\d+)\)\s*/);
      const intro = parts[0].trim();
      const items = [];
      
      for (let i = 1; i < parts.length; i += 2) {
        if (i + 1 < parts.length) {
          const number = parts[i];
          const content = parts[i + 1].trim();
          items.push({ number, content });
        }
      }
      
      if (items.length >= 2) {
        return (
          <div>
            {intro && (
              <div style={{ marginBottom: '12px' }}>
                {intro}
              </div>
            )}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {items.map((item, index) => (
                <div 
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px'
                  }}
                >
                  <div
                    style={{
                      minWidth: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: isUser ? 'rgba(255, 255, 255, 0.2)' : '#007AFF',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: '600',
                      marginTop: '1px'
                    }}
                  >
                    {item.number}
                  </div>
                  
                  <div style={{ flex: 1, lineHeight: '1.4' }}>
                    {item.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }
    }
    
    // Return normal text if no numbered list detected
    return text;
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '12px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
        position: 'relative'
      }}
    >
      {/* Message bubble */}
      <div
        style={{
          maxWidth: '80%',
          padding: '12px 16px',
          borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          backgroundColor: isUser ? '#007AFF' : '#E5E5EA',
          color: isUser ? 'white' : '#000',
          position: 'relative',
          marginLeft: !isUser ? '40px' : '0px'
        }}
      >
        <div 
          style={{ 
            fontSize: '16px', 
            lineHeight: '1.4',
            display: 'block'
          }}
        >
          {/* Message type icon at beginning of message for bot messages */}
          {!isUser && messageType && (
            <span 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '8px',
                verticalAlign: 'middle'
              }}
            >
              {messageType === 'reminder_Health' && (
                <div>
                    <span style={{ 
                      color: '#3b82f6',
                      fontSize: '18px'
                    }}>🔔</span>
                    <span style={{ 
                      color: '#3b82f6',
                      fontSize: '18px'
                    }}>❤️</span>
                </div>
              )}
              {messageType === 'reminder_Service' && (
                <div>
                    <span style={{ 
                      color: '#3b82f6',
                      fontSize: '18px'
                    }}>🔔</span>
                    <span style={{ 
                      color: '#3b82f6',
                      fontSize: '18px'
                    }}>🔧</span>
                </div>
              )}
              {messageType === 'insight' && (
                 <div>
                    <span style={{ 
                      color: '#f6863bff',
                      fontSize: '18px'
                    }}>🧑‍🤝‍🧑</span>
                 </div>
                 

              )}
            </span>
          )}
          {renderMessageContent(message)}
        </div>
        <div
          style={{
            fontSize: '12px',
            opacity: 0.7,
            marginTop: '4px',
            textAlign: isUser ? 'right' : 'left'
          }}
        >
          {timestamp}
        </div>
      </div>

      {/* Sagaa icon at bottom left for bot messages */}
      {!isUser && (
        <img 
          src={sagaaIcon} 
          alt="Sagaa" 
          style={{
            position: 'absolute',
            bottom: '0px',
            left: '0px',
            width: '32px',
            height: '32px',
            objectFit: 'contain'
          }}
        />
      )}
    </div>
  );
}