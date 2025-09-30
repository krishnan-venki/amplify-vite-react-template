import { useState, useEffect, useRef } from 'react';
import { MobileFrame } from './MobileFrame';
import { ChatInterface } from './ChatInterface';

interface Message {
  id: number;
  message: string;
  isUser: boolean;
  timestamp: string;
  messageType?: 'reminder_Health' | 'insight' | 'reminder_Service';
}

const conversationScript = [
  { message: "Hi! Your NordicTrack treadmill warranty expires in 3 weeks (Nov 15th). I recommend scheduling maintenance now - 94% of users who serviced before expiration avoided costly repairs later.", isUser: false, messageType: 'reminder_Service' as const },
  { message: "How much would that cost?", isUser: true },
  { message: "Checking for pricing...", isUser: false },
  { message: "I found 3 trusted technicians from our community in your area: (1) Mike - $140 (0.8 miles, 5⭐, serviced 23 NordicTrack units) (2) Sarah - $160 (2.1 miles, former NordicTrack tech, includes belt check) (3) Tom - $135 (1.5 miles, weekend availability).  All three are available during your work-from-home week. Tuesday morning at 9 AM works with your schedule.", isUser: false,messageType: 'insight' as const  },
  { message: "Book Mike for Tuesday", isUser: true },
  { message: "Done! Mike is scheduled for Tuesday, Nov 7th at 9 AM.", isUser: false},
  { message: "I've added it to your calendar and allocated $140 from your home maintenance budget. You'll get a reminder the day before.", isUser: false},
  { message: "Thank you", isUser: true },
  { message: "You are welcome!.", isUser: false},
  { message: "By servicing your treadmill before the warranty expires, you reduce the risk of unexpected repair costs by 85%. Regular maintenance also extends the lifespan of your equipment, ensuring optimal performance and safety during workouts.", isUser: false, messageType: 'insight' as const }
];

export function ProactivePartner_ServiceWarranty_Example() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [isTypingAnimation, setIsTypingAnimation] = useState(false);
  const [isSendingAnimation, setIsSendingAnimation] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

  const resetAnimation = () => {
    setMessages([]);
    setCurrentIndex(0);
    setShowTyping(false);
    setTypingText('');
    setIsTypingAnimation(false);
    setIsSendingAnimation(false);
  };

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

  // Intersection Observer to detect visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isNowVisible = entry.isIntersecting;
        
        // If coming into view and animation is complete, restart
        if (isNowVisible && !isVisible && currentIndex >= conversationScript.length) {
          setTimeout(() => {
            resetAnimation();
          }, 500); // Small delay before restart
        }
        
        setIsVisible(isNowVisible);
      },
      {
        threshold: 0.3, // Trigger when 30% of component is visible
        rootMargin: '-50px' // Add some margin to avoid triggering too early
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [isVisible, currentIndex]);

  useEffect(() => {
    if (currentIndex >= conversationScript.length) {
      // Stop the conversation once all messages are displayed
      return;
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
    <div ref={containerRef}
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '120px' }}>
        {/* Feature List on the Left */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', height: '600px' }}>
          {/* Vertical connecting line */}
          <div
            style={{
              position: 'absolute',
              left: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '2px',
              height: '320px',
              background: 'linear-gradient(135deg, #488aff 0%, #007AFF 100%)',
              borderRadius: '1px',
              zIndex: 1
            }}
          />
          
          {/* Feature phrases */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '60px', paddingLeft: '30px' }}>
            {[
              'Tracks warranty deadlines',
              'Prevents costly repairs',
              'Finds trusted technicians',
              'Matches to your budget', 
              'Takes action when you approve'
            ].map((phrase, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                {/* Bullet point */}
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #488aff 0%, #007AFF 100%)',
                    position: 'relative',
                    zIndex: 2,
                    boxShadow: '0 2px 8px rgba(72, 138, 255, 0.3)',
                    border: '2px solid var(--background)'
                  }}
                />
                {/* Phrase text */}
                <span
                  style={{
                    color: 'var(--foreground)',
                    fontWeight: '500',
                    fontSize: '16px',
                    lineHeight: '1.4',
                    maxWidth: '220px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {phrase}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div style={{ position: 'relative' }}>
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