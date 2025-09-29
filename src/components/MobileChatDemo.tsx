import { useState, useEffect } from 'react';
import { MobileFrame } from './MobileFrame';
import { ChatInterface } from './ChatInterface';

interface Message {
  id: number;
  message: string;
  isUser: boolean;
  timestamp: string;
  messageType?: 'reminder' | 'insight';
}

const conversationScript = [
  { message: "Your annual health checkup is not booked yet. Its due next month. Shall I go ahead and book?", isUser: false, messageType: 'reminder' as const },
  { message: "Yes, Please. Look for a Friday availability.", isUser: true },
  { message: "Sure. Checking for Dr.Deramo's availability....", isUser: false },
  { message: "Dr.Deramo is available at 10:30 AM on the 28th of this month , which is a Friday. Shall I go ahead and schedule?", isUser: false },
  { message: "Yes, go ahead", isUser: true },
  { message: "I have booked your annual checkup on the 28th at 10:30 AM with Dr.Deramo.", isUser: false},
  { message: "Thank you", isUser: true },
  { message: "You are welcome!.", isUser: false},
  { message: "Over 50 Sagaa users have successfully stabilized their blood sugar and reversed prediabetes using Ayurvedic supplements—specifically Bitter Melon, Fenugreek, and Gymnema Sylvestre. These natural supplements are clinically recognized for their blood sugar-lowering properties and work effectively alongside lifestyle changes. Consult your healthcare provider before adding these to your routine", isUser: false, messageType: 'insight' as const }
];

export function MobileChatDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [isTypingAnimation, setIsTypingAnimation] = useState(false);
  const [isSendingAnimation, setIsSendingAnimation] = useState(false);

  const animateUserTyping = (message: string) => {
    return new Promise<void>((resolve) => {
      setIsTypingAnimation(true);
      setTypingText('');
      
      let currentChar = 0;
      const typingInterval = setInterval(() => {
        if (currentChar < message.length) {
          setTypingText(message.substring(0, currentChar + 1));
          currentChar++;
        } else {
          clearInterval(typingInterval);
          
          // Animate send button click
          setIsSendingAnimation(true);
          setTimeout(() => {
            setIsSendingAnimation(false);
            setIsTypingAnimation(false);
            setTypingText('');
            resolve();
          }, 200);
        }
      }, 60); // Typing speed: 60ms per character
    });
  };

  useEffect(() => {
    if (currentIndex >= conversationScript.length) {
      // Reset conversation after completion
      const resetTimer = setTimeout(() => {
        setMessages([]);
        setCurrentIndex(0);
        setShowTyping(false);
        setTypingText('');
        setIsTypingAnimation(false);
        setIsSendingAnimation(false);
      }, 9000);
      return () => clearTimeout(resetTimer);
    }

    const timer = setTimeout(async () => {
      const currentMessage = conversationScript[currentIndex];
      
      if (!currentMessage.isUser) {
        // Show typing indicator before bot messages
        setShowTyping(true);
        
        setTimeout(() => {
          setShowTyping(false);
          const newMessage: Message = {
            id: currentIndex,
            message: currentMessage.message,
            isUser: currentMessage.isUser,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            messageType: 'messageType' in currentMessage ? currentMessage.messageType : undefined
          };
          
          setMessages(prev => [...prev, newMessage]);
          setCurrentIndex(prev => prev + 1);
        }, 1500); // Typing delay
      } else {
        // Animate user typing
        await animateUserTyping(currentMessage.message);
        
        // Add user message after typing animation
        const newMessage: Message = {
          id: currentIndex,
          message: currentMessage.message,
          isUser: currentMessage.isUser,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          messageType: 'messageType' in currentMessage ? currentMessage.messageType : undefined
        };
        
        setMessages(prev => [...prev, newMessage]);
        setCurrentIndex(prev => prev + 1);
      }
    }, currentIndex === 0 ? 1000 : 2000); // Initial delay, then 2s between messages

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div
      style={{
        padding: '60px 20px',
        backgroundColor: 'var(--muted)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '40px'
      }}
    >
      {/* Mobile Demo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '60px' }}>
        <div style={{ position: 'relative' }}>
          {/* Glow effect behind mobile frame */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '500px',
              height: '900px',
              background: 'linear-gradient(135deg, #030213 0%, #488aff 50%, #007AFF 100%)',
              borderRadius: '60px',
              opacity: 0.15,
              filter: 'blur(40px)',
              zIndex: 0
            }}
          />
          {/* Additional inner glow for more intensity */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '420px',
              height: '820px',
              background: 'linear-gradient(135deg, #488aff 0%, #007AFF 100%)',
              borderRadius: '50px',
              opacity: 0.08,
              filter: 'blur(20px)',
              zIndex: 1
            }}
          />
          {/* Mobile frame on top */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <MobileFrame>
              <ChatInterface 
                messages={messages} 
                showTyping={showTyping}
                typingText={typingText}
                isTypingAnimation={isTypingAnimation}
                isSendingAnimation={isSendingAnimation}
              />
            </MobileFrame>
          </div>
        </div>
      </div>
    </div>
  );
}