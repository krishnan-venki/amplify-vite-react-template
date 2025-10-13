import { FormEvent, useRef, useState, useEffect } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
import sagaa48 from '../assets/sagaa_48x48.png';
import { fetchAuthSession } from 'aws-amplify/auth';

interface ContextualChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  verticalId: string;
  verticalName: string;
  verticalGradient: string;
}

interface Message {
  role: 'user' | 'sagaa';
  text: string;
}

const CONTEXT_PROMPTS: Record<string, string[]> = {
  money: [
    "Why is my net worth up 12.5%?",
    "How can I optimize my budget?",
    "What should I do with my liquid cash?",
    "Analyze my monthly expenses"
  ],
  healthcare: [
    "When is my next checkup?",
    "How are my health metrics trending?",
    "What should I focus on for better health?",
    "Explain my sleep score"
  ],
  education: [
    "What courses should I take?",
    "How can I improve my learning?",
    "Show my progress",
    "Recommend learning resources"
  ],
  life: [
    "What services need attention?",
    "Optimize my daily routine",
    "Show upcoming maintenance",
    "Help with home management"
  ]
};

export default function ContextualChatModal({
  isOpen,
  onClose,
  verticalId,
  verticalName,
  verticalGradient
}: ContextualChatModalProps) {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const prompts = CONTEXT_PROMPTS[verticalId] || [];

  // Add welcome message when modal opens
  useEffect(() => {
    if (isOpen && conversation.length === 0) {
      setConversation([{
        role: 'sagaa',
        text: `Hi! I'm here to help you with your ${verticalName} questions. What would you like to know?`
      }]);
    }
  }, [isOpen, verticalName, conversation.length]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation, loading]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const messageRaw = formData.get('message') as string;
    const message = (messageRaw ?? '').trim();
    
    if (!message) return;

    // Clear input
    event.currentTarget.reset();
    
    // Add user message
    const userMessage: Message = { role: 'user', text: message };
    setConversation(prev => [...prev, userMessage]);
    setLoading(true);
    setError(null);

    try {
      const session = await fetchAuthSession();
      const token = session.tokens?.idToken?.toString();

      const response = await fetch(
        'https://i5yqr7mdyc.execute-api.us-east-1.amazonaws.com/prod/chat',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: token }),
          },
          body: JSON.stringify({
            message,
            context: verticalId,
            verticalName
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to get response from Sagaa');
      }

      const data = await response.json();
      const sagaaMessage: Message = {
        role: 'sagaa',
        text: data.reply || data.message || 'I apologize, I could not process that request.',
      };

      setConversation(prev => [...prev, sagaaMessage]);
    } catch (err) {
      setError('Failed to connect to Sagaa. Please try again.');
      console.error('Chat error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePromptClick = (prompt: string) => {
    if (inputRef.current) {
      inputRef.current.value = prompt;
      inputRef.current.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '600px',
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            background: verticalGradient,
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: 'white'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src={sagaa48} alt="Sagaa" style={{ width: '32px', height: '32px' }} />
            <div>
              <div style={{ fontSize: '18px', fontWeight: '600' }}>Chat about {verticalName}</div>
              <div style={{ fontSize: '13px', opacity: 0.9 }}>Powered by Sagaa AI</div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '8px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            <X size={20} color="white" />
          </button>
        </div>

        {/* Quick Prompts */}
        {conversation.length <= 1 && (
          <div style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', marginBottom: '8px' }}>
              <Sparkles size={14} style={{ display: 'inline', marginRight: '4px' }} />
              Quick questions:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {prompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePromptClick(prompt)}
                  style={{
                    padding: '6px 12px',
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '16px',
                    fontSize: '13px',
                    color: '#374151',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#3b82f6';
                    e.currentTarget.style.color = '#3b82f6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.color = '#374151';
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          {conversation.map((msg, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <div
                style={{
                  maxWidth: '80%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  backgroundColor: msg.role === 'user' ? '#3b82f6' : '#f3f4f6',
                  color: msg.role === 'user' ? 'white' : '#111827',
                  fontSize: '14px',
                  lineHeight: '1.5'
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
          
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  backgroundColor: '#f3f4f6',
                  color: '#6b7280',
                  fontSize: '14px'
                }}
              >
                <span className="typing-dots">Sagaa is thinking</span>
                <style>{`
                  @keyframes typing {
                    0%, 20% { content: '.'; }
                    40% { content: '..'; }
                    60%, 100% { content: '...'; }
                  }
                  .typing-dots::after {
                    content: '...';
                    animation: typing 1.5s infinite;
                  }
                `}</style>
              </div>
            </div>
          )}
          
          {error && (
            <div
              style={{
                padding: '12px 16px',
                borderRadius: '12px',
                backgroundColor: '#fee2e2',
                color: '#dc2626',
                fontSize: '14px'
              }}
            >
              {error}
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            padding: '16px 24px',
            borderTop: '1px solid #e5e7eb',
            display: 'flex',
            gap: '12px'
          }}
        >
          <input
            ref={inputRef}
            type="text"
            name="message"
            placeholder={`Ask about your ${verticalName.toLowerCase()}...`}
            disabled={loading}
            style={{
              flex: 1,
              padding: '12px 16px',
              border: '1px solid #e5e7eb',
              borderRadius: '10px',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#3b82f6';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '12px 20px',
              background: verticalGradient,
              border: 'none',
              borderRadius: '10px',
              color: 'white',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'opacity 0.2s',
              opacity: loading ? 0.6 : 1
            }}
          >
            <Send size={16} />
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
