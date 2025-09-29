import { useEffect, useState } from 'react';
import sagaaIcon from '../assets/sagaa_48x48.png';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
  messageType?: 'reminder' | 'insight';
}

export function ChatMessage({ message, isUser, timestamp, messageType }: ChatMessageProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);



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
            display: 'inline'
          }}
        >
          {/* Message type icon at beginning of message for bot messages */}
          {!isUser && messageType && (
            <span 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: messageType === 'reminder' ? '#F7DC6F' : '#45B7D1',
                marginRight: '8px',
                verticalAlign: 'middle'
              }}
            >
              {messageType === 'reminder' && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                    stroke="#666"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
                    stroke="#666"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              {messageType === 'insight' && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 20V3H21"
                    stroke="#666"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <rect
                    x="7"
                    y="12"
                    width="2"
                    height="8"
                    fill="#666"
                    rx="0.5"
                  />
                  <rect
                    x="11"
                    y="8"
                    width="2"
                    height="12"
                    fill="#666"
                    rx="0.5"
                  />
                  <rect
                    x="15"
                    y="10"
                    width="2"
                    height="10"
                    fill="#666"
                    rx="0.5"
                  />
                  <rect
                    x="19"
                    y="6"
                    width="2"
                    height="14"
                    fill="#666"
                    rx="0.5"
                  />
                </svg>
              )}
            </span>
          )}
          {message}
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