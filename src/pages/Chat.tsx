import { FormEvent, useRef, useState, useEffect } from 'react';
import sagaaIconUrl from '../assets/sagaa_favicon.svg';
import sagaa48 from '../assets/sagaa_48x48.png';
import { fetchAuthSession, fetchUserAttributes } from 'aws-amplify/auth';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate, useLocation } from 'react-router-dom';
import ContextualSidePanel from '../components/ContextualSidePanel';

// Context-specific quick prompts
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

export default function Chat() {
  const { user } = useAuthenticator(context => [context.user]);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversation, setConversation] = useState<Array<{ role: 'user' | 'sagaa'; text: string }>>([]);
  const responseBoxRef = useRef<HTMLDivElement>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get context from navigation state
  const chatContext = location.state?.context as { id: string; name: string; gradient: string } | undefined;

  // Redirect if unauthenticated and fetch a friendly display name once.
  useEffect(() => {
    if (!user) {
      const from = encodeURIComponent(location.pathname + location.search);
      navigate(`/login?from=${from}`, { replace: true });
      return;
    }
    (async () => {
      try {
        const attrs = await fetchUserAttributes();
        const full = [attrs.given_name, attrs.family_name].filter(Boolean).join(' ') || attrs.name || '';
        setDisplayName(full || null);
      } catch {
        // Keep as null so we don't render name until loaded.
      }
    })();
  }, [user, navigate, location]);

  // Initialize conversation with context if provided
  useEffect(() => {
    if (chatContext && conversation.length === 0) {
      setConversation([{
        role: 'sagaa',
        text: `Hi! I'm here to help you with your ${chatContext.name} questions. What would you like to know?`
      }]);
    }
  }, [chatContext]); // Only run when chatContext is available

  // Clear conversation when navigating to chat without context (fresh chat)
  useEffect(() => {
    if (!chatContext && location.state === null && conversation.length > 0) {
      // User navigated to fresh chat, clear conversation
      setConversation([]);
      setError(null);
    }
  }, [location.state, chatContext]);

  // Keep the latest message in view when conversation or loading state changes.
  useEffect(() => {
    const el = responseBoxRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [conversation, loading]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const messageRaw = formData.get('Prompt') as string;
    const message = (messageRaw ?? '').trim();
    if (!message) { setLoading(false); return; }
    setConversation(prev => [...prev, { role: 'user', text: message }]);
    event.currentTarget.reset();

    try {
      const apiUrl = 'https://63z70erbsb.execute-api.us-west-2.amazonaws.com/dev/prompt';
      const { tokens } = await fetchAuthSession();
      const idToken = tokens?.idToken?.toString();
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(idToken ? { Authorization: idToken } : {}),
        },
        body: JSON.stringify({ 
          message,
          ...(chatContext && { 
            context: chatContext.id,
            verticalName: chatContext.name 
          })
        }),
      });

      if (!res.ok) {
        throw new Error('API request failed');
      }

      const data = await res.json();
      const text = typeof data.response === 'string' ? data.response : JSON.stringify(data);
      const normalize = (s: string) => s
        .replace(/\r\n/g, '\n')
        .replace(/[ \t]+\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
      const normalized = normalize(text);
      setConversation(prev => [...prev, { role: 'sagaa', text: normalized }]);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    if (inputRef.current) {
      inputRef.current.value = prompt;
      inputRef.current.focus();
    }
  };

  const quickPrompts = chatContext ? CONTEXT_PROMPTS[chatContext.id] || [] : [];

  return (
    <>
      <div style={{ display: 'flex', height: '100%', position: 'relative' }}>
        <main className="response-panel" style={{ flex: 1, minWidth: 0 }}>
          {/* Show conversation or initial state */}
          <section className="response-card">
            {conversation.length > 0 ? (
              <div className="response-box" role="status" aria-live="polite" ref={responseBoxRef}>
                {conversation.map((m, i) => (
                  m.role === 'user' ? (
                    <p className="question-text" key={i}><strong>{displayName ?? 'You'}</strong>: {m.text}</p>
                  ) : (
                    <p className="response-text message-with-icon" key={i}>
                      <img src={sagaaIconUrl} alt="Sagaa" className="message-icon" />
                      {m.text}
                    </p>
                  )
                ))}
                {loading && <p className="muted">Sagaa is getting you the response...</p>}
                {error && !loading && <p className="error-text">{error}</p>}

                {/* Quick Prompts - Show only when conversation has just started with context */}
                {chatContext && conversation.length === 1 && quickPrompts.length > 0 && (
                  <div style={{ 
                    marginTop: '20px', 
                    padding: '16px', 
                    background: `linear-gradient(135deg, ${chatContext.gradient.match(/linear-gradient\(135deg, ([^,]+)/)?.[1] || '#10b981'}15, ${chatContext.gradient.match(/100%, ([^)]+)/)?.[1] || '#0d9488'}08)`,
                    borderRadius: '12px',
                    border: `1px solid ${chatContext.gradient.match(/linear-gradient\(135deg, ([^,]+)/)?.[1] || '#10b981'}30`
                  }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>💡</span>
                      <span>Quick questions about {chatContext.name}:</span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {quickPrompts.map((prompt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickPrompt(prompt)}
                          type="button"
                          style={{
                            padding: '8px 14px',
                            background: chatContext.gradient,
                            border: 'none',
                            borderRadius: '20px',
                            fontSize: '13px',
                            color: 'white',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            fontWeight: '500'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                            e.currentTarget.style.opacity = '0.9';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.opacity = '1';
                          }}
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="center-input">
                <form onSubmit={onSubmit} className="prompt-form" aria-busy={loading}>
                  <div className="brand">
                    <h1 className="title"><img src={sagaa48} alt="" aria-hidden="true" className="brand-icon" />
                      {`Hello${displayName ? `, ${displayName}` : ''}.`}
                    </h1>
                  </div>
                  <div className="input-row">
                    <label htmlFor="Prompt" className="sr-only">Ask Sagaa</label>
                    <div className="input-wrap">
                      <input
                        type="text"
                        className="prompt-input"
                        id="Prompt"
                        name="Prompt"
                        placeholder="How can Sagaa help you today?"
                        autoComplete="on"
                      />
                      <button type="submit" className="submit-btn inside" disabled={loading}>
                        <span className="arrow">→</span>
                      </button>
                    </div>
                  </div>
                  {error && <p className="error-text">{error}</p>}
                </form>
              </div>
            )}
          </section>
        </main>

        {/* Contextual Side Panel */}
        {chatContext && (
          <ContextualSidePanel
            context={chatContext}
            onNavigateToDashboard={() => navigate('/dashboard')}
          />
        )}
      </div>

      {(conversation.length > 0 || loading || !!error) && (
        <div className="input-dock" role="group" aria-label="Ask Sagaa">
          <form onSubmit={onSubmit} className="prompt-form" aria-busy={loading}>
            <div className="input-row">
              <label htmlFor="Prompt" className="sr-only">Ask Sagaa</label>
              <div className="input-wrap">
                <input
                  ref={inputRef}
                  type="text"
                  className="prompt-input"
                  id="Prompt"
                  name="Prompt"
                  placeholder={chatContext ? `Ask about ${chatContext.name}...` : "Continue your conversation with Sagaa"}
                  autoComplete="on"
                />
                <button type="submit" className="submit-btn inside" disabled={loading}>
                  <span className="arrow">→</span>
                </button>
              </div>
            </div>
            {error && <p className="error-text">{error}</p>}
          </form>
        </div>
      )}
    </>
  );
}
