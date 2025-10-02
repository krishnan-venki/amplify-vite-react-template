import { useState, useEffect, useRef } from 'react';
import { TabletFrame } from './TabletFrame';
import { ChatInterface } from './TabletChatInterface';

interface Message {
  id: number;
  message: string;
  isUser: boolean;
  timestamp: string;
  messageType?: 'reminder' | 'insight' | 'personalized_knowledge';
}

const conversationScript = [
  { message: "I'm not sure what classes I should take next year.", isUser: true },
  { message: "I've checked your transcript and pathway data from the school system. You've completed Geometry and Biology and are currently in Algebra II.", isUser: false, messageType: 'personalized_knowledge' as const },
  { message: "Based on district requirements and your Computer Science major pathway, the next core courses are Pre-Calc and Physics.", isUser: false, messageType: 'insight' as const },
  { message: "Will this also cover my graduation requirements?", isUser: true },
  { message: "Yes. Here are three schedules that fit graduation requirements, your CS pathway, and balance your workload:\n\n• Stretch: AP CS, Pre-Calc, Honors English, Physics (≈15 hrs/week)\n\n• Balanced: AP CS, Pre-Calc, English 10, Physics (≈12 hrs/week)\n\n• Time-Managed: AP CS, Algebra II, English 10, Environmental Science (≈9 hrs/week)", isUser: false, messageType: 'insight' as const },
  { message: "This is great, thank you!", isUser: true }
];

export function StudentChatDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showTyping, setShowTyping] = useState(false);

  const [userTypingText, setUserTypingText] = useState('');
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [isSendingAnimation, setIsSendingAnimation] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const addMessage = (text: string, isUser: boolean, messageType?: 'reminder' | 'insight' | 'personalized_knowledge') => {
    const newMessage: Message = {
      id: Date.now() + Math.random(),
      message: text,
      isUser,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      messageType
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const typeMessage = async (text: string, speed: number = 50): Promise<void> => {
    return new Promise((resolve) => {
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          i++;
        } else {
          clearInterval(timer);
          resolve();
        }
      }, speed);
    });
  };

  const typeUserMessage = async (text: string, speed: number = 80): Promise<void> => {
    setUserTypingText('');
    setIsUserTyping(true);
    
    return new Promise((resolve) => {
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          setUserTypingText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
          // Show send button animation
          setIsSendingAnimation(true);
          setTimeout(() => {
            setIsSendingAnimation(false);
            setIsUserTyping(false);
            setUserTypingText('');
            resolve();
          }, 300);
        }
      }, speed);
    });
  };

  const runConversation = async () => {
    setMessages([]);
    
    for (let i = 0; i < conversationScript.length; i++) {
      const script = conversationScript[i];
      
      if (script.isUser) {
        // User messages show typing in input field first
        await new Promise(resolve => setTimeout(resolve, 800));
        await typeUserMessage(script.message, 60);
        addMessage(script.message, true);
      } else {
        // Bot messages show typing indicator first
        setShowTyping(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Type the message while keeping typing indicator visible
        await typeMessage(script.message, 30);
        setShowTyping(false);
        addMessage(script.message, false, script.messageType);
      }
      
      await new Promise(resolve => setTimeout(resolve, 1200));
    }
  };

  // Intersection Observer for auto-restart
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Small delay to ensure smooth restart
          const timer = setTimeout(() => {
            runConversation();
          }, 500);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      style={{ 
        padding: '80px 20px', 
        backgroundColor: 'var(--muted)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '40px'
      }}
    > <div style={{ display: 'flex', alignItems: 'center', gap: '120px' }}>
        {/* Feature List on the Left */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', height: '600px' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', flex: 1 }}>
            {/* Feature phrases */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              paddingLeft: '46px',
              position: 'relative'
            }}>
              

              {/* Feature list */}
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '60px',
                position: 'relative'
              }}>
                {/* Vertical line through dots */}
                <div
                  style={{
                    position: 'absolute',
                    left: '4px', // Center of 16px dot (8px - 0.5px for 1px line)
                    top: '5px', // Center of first dot (16px/2 = 8px)
                    bottom: '5px', // Center of last dot
                    width: '2px',
                    background: 'linear-gradient(135deg, #488aff 0%, #007AFF 100%)',
                    borderRadius: '1px',
                    zIndex: 1 // Lower than dots so dots appear on top
                  }}
                />
            {[
              '🧠 Aware of your goals and preferences',
              '↔️ Pulls context from Source of Truth',
              '✨ Determines your academic progress',
              '✨ Proposes personalized plans'
            ].map((phrase, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                {/* Bullet point */}
                <div
                  style={{
                    width: '10px',
                    height: '10px',
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
            </div>
            </div>
             


        {/* Device with Glow Effect */}
        <div style={{ 
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {/* Glow Effect */}
            <div
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px',
                height: '780px',
                background: 'radial-gradient(ellipse at center, rgba(72, 138, 255, 0.15) 0%, rgba(0, 122, 255, 0.05) 50%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(20px)',
                zIndex: 0,
                pointerEvents: 'none'
            }}
            />
            
            {/* Tablet Frame */}
            <div style={{ position: 'relative', zIndex: 2 }}>
            <TabletFrame>
                <ChatInterface 
                messages={messages} 
                showTyping={showTyping}
                userTypingText={userTypingText}
                isUserTyping={isUserTyping}
                isSendingAnimation={isSendingAnimation}
                />
            </TabletFrame>
            </div>
        </div>
    </div>
    </section>
  );
}