import { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { BottomNavMenu } from './BottomNavMenu';
import sagaaIcon from '../assets/sagaa_48x48.png';

interface Message {
  id: number;
  message: string;
  isUser: boolean;
  timestamp: string;
  messageType?: 'reminder_Health' | 'insight' | 'reminder_Service';
}

interface ChatInterfaceProps {
  messages: Message[];
  showTyping: boolean;
  typingText?: string;
  isTypingAnimation?: boolean;
  isSendingAnimation?: boolean;
}

export function ChatInterface({ messages, showTyping, typingText = '', isTypingAnimation = false, isSendingAnimation = false }: ChatInterfaceProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showTyping]);

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF'
      }}
    >
      {/* Chat Header with Category Icons */}
      <div
        style={{
          padding: '8px 16px',
          borderBottom: '1px solid #E5E5EA',
          backgroundColor: '#F8F9FA',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}
      >
        {/* Left side: Sagaa branding */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <img 
            src={sagaaIcon} 
            alt="Sagaa" 
            style={{
              width: '44px',
              height: '48px',
              objectFit: 'contain'
            }}
          />
          <div>
            <div 
              style={{ 
                fontWeight: '700', 
                fontSize: '22px',
                background: 'linear-gradient(135deg, #030213 0%, #488aff 50%, #007AFF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.5px'
              }}
            >
              Sagaa
            </div>
          </div>
        </div>

        {/* Right side: Category Icons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          {/* Finance Icon */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              cursor: 'pointer'
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#E8F5E8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                    <span style={{
                      color: '#22c55e',
                      fontSize: '18px'
                    }}>💰</span>
            </div>
            <span style={{ fontSize: '10px', color: '#666', fontWeight: '500' }}>Finance</span>
          </div>

          {/* Health Icon */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              cursor: 'pointer'
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#FEE2E2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                    <span style={{
                      color: '#ef4444',
                      fontSize: '18px'
                    }}>❤️</span>
            </div>
            <span style={{ fontSize: '10px', color: '#666', fontWeight: '500' }}>Health</span>
          </div>

          {/* Education Icon */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              cursor: 'pointer'
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#EFF6FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3ZM5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" fill="#3B82F6"/>
              </svg>
            </div>
            <span style={{ fontSize: '10px', color: '#666', fontWeight: '500' }}>Education</span>
          </div>

          {/* Family Icon */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              cursor: 'pointer'
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#FDF4FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M16 4C18.2 4 20 5.8 20 8C20 10.2 18.2 12 16 12C13.8 12 12 10.2 12 8C12 5.8 13.8 4 16 4ZM8 6C9.66 6 11 7.34 11 9C11 10.66 9.66 12 8 12C6.34 12 5 10.66 5 9C5 7.34 6.34 6 8 6ZM8 13C10.67 13 16 14.34 16 17V20H0V17C0 14.34 5.33 13 8 13ZM16 13C16.7 13 17.58 13.16 18.61 13.42C17.61 14.06 17 15.03 17 16.2V20H24V17C24 14.34 21.33 13 16 13Z" fill="#A855F7"/>
              </svg>
            </div>
            <span style={{ fontSize: '10px', color: '#666', fontWeight: '500' }}>Family</span>
          </div>

          {/* More/Menu Icon */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              cursor: 'pointer'
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#F3F4F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="5" r="2" fill="#6B7280"/>
                <circle cx="12" cy="12" r="2" fill="#6B7280"/>
                <circle cx="12" cy="19" r="2" fill="#6B7280"/>
              </svg>
            </div>
            <span style={{ fontSize: '10px', color: '#666', fontWeight: '500' }}>More</span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div
        ref={messagesContainerRef}
        style={{
          flex: 1,
          padding: '8px 16px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg.message}
            isUser={msg.isUser}
            timestamp={msg.timestamp}
            messageType={msg.messageType}
          />
        ))}
        {showTyping && <TypingIndicator />}
      </div>

      {/* Input Area */}
      <div
        style={{
          padding: '8px 16px',
          borderTop: '1px solid #E5E5EA',
          backgroundColor: '#F8F9FA',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <div
          style={{
            flex: 1,
            padding: '12px 16px',
            backgroundColor: 'white',
            borderRadius: '20px',
            border: isTypingAnimation ? '2px solid #007AFF' : '1px solid #E5E5EA',
            fontSize: '16px',
            color: typingText ? '#000' : '#8E8E93',
            transition: 'border-color 0.2s ease',
            position: 'relative'
          }}
        >
          {typingText || 'Ask Anything...'}
          {isTypingAnimation && typingText && (
            <span
              style={{
                opacity: 1,
                animation: 'blink 1s infinite',
                marginLeft: '1px'
              }}
            >
              |
            </span>
          )}
        </div>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: isSendingAnimation ? '#0056CC' : '#007AFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '18px',
            cursor: 'pointer',
            transform: isSendingAnimation ? 'scale(0.9)' : 'scale(1)',
            transition: 'all 0.1s ease'
          }}
        >
          ➤
        </div>
      </div>

      <style>
        {`
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
        `}
      </style>

      {/* Bottom Navigation Menu */}
      <BottomNavMenu />
    </div>
  );
}