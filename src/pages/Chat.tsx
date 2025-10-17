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
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Get context from navigation state
  const chatContext = location.state?.context as { id: string; name: string; gradient: string } | undefined;

  // Redirect if unauthenticated and fetch a friendly display name once.
  useEffect(() => {
    if (!user) {
      const from = encodeURIComponent(location.pathname + location.search);
      navigate(`/signin?from=${from}`, { replace: true });
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

  const handleCopyResponse = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      // Show checkmark for 5 seconds
      setCopiedIndex(index);
      setTimeout(() => {
        setCopiedIndex(null);
      }, 5000);
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  };

  const handleDeleteMessage = (index: number) => {
    // Delete both the user question (index-1) and the sagaa response (index)
    setConversation(prev => {
      const newConv = [...prev];
      // Find the corresponding user message before this response
      const userMsgIndex = index - 1;
      if (userMsgIndex >= 0 && newConv[userMsgIndex]?.role === 'user') {
        // Remove both user question and sagaa response
        newConv.splice(userMsgIndex, 2);
      } else {
        // Just remove the response if we can't find the question
        newConv.splice(index, 1);
      }
      return newConv;
    });
  };

  const handleExportResponse = (text: string, userQuestion: string, format: 'pdf' | 'markdown' | 'docx') => {
    if (format === 'markdown') {
      const blob = new Blob([`# Question\n\n${userQuestion}\n\n# Response\n\n${text}`], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sagaa-response-${Date.now()}.md`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'docx') {
      // For DOCX, we'll create a simple HTML version that can be opened in Word
      const htmlContent = `<html><body><h1>Question</h1><p>${userQuestion}</p><h1>Response</h1><p>${text.replace(/\n/g, '<br>')}</p></body></html>`;
      const blob = new Blob([htmlContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sagaa-response-${Date.now()}.docx`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'pdf') {
      // For PDF, open print dialog
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head><title>Sagaa Response</title></head>
            <body>
              <h1>Question</h1>
              <p>${userQuestion}</p>
              <h1>Response</h1>
              <p>${text.replace(/\n/g, '<br>')}</p>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
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
                    <div key={i}>
                      <p className="question-text" style={{ fontSize: '1.5rem', fontWeight: '500' }}>{m.text}</p>
                      
                      {/* Options below user prompt */}
                      <div 
                        style={{ 
                          display: 'flex', 
                          gap: '24px', 
                          marginTop: '12px',
                          marginBottom: '12px',
                          alignItems: 'center'
                        }}
                      >
                        {/* Answer - Show as selected if there's a response after this question */}
                        <span
                          onClick={() => {
                            // Scroll to the corresponding response
                            const responseIndex = i + 1;
                            if (responseIndex < conversation.length) {
                              responseBoxRef.current?.scrollTo({ 
                                top: responseBoxRef.current.scrollHeight, 
                                behavior: 'smooth' 
                              });
                            }
                          }}
                          onMouseEnter={(e) => {
                            const hasResponse = i + 1 < conversation.length && conversation[i + 1]?.role === 'sagaa';
                            if (!hasResponse) {
                              e.currentTarget.style.background = '#f3f4f6';
                            }
                          }}
                          onMouseLeave={(e) => {
                            const hasResponse = i + 1 < conversation.length && conversation[i + 1]?.role === 'sagaa';
                            if (!hasResponse) {
                              e.currentTarget.style.background = 'transparent';
                            }
                          }}
                          style={{
                            fontSize: '14px',
                            color: i + 1 < conversation.length && conversation[i + 1]?.role === 'sagaa' ? '#2563eb' : '#6b7280',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            userSelect: 'none',
                            padding: '6px 12px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: i + 1 < conversation.length && conversation[i + 1]?.role === 'sagaa' ? '#dbeafe' : 'transparent',
                            borderRadius: '8px',
                            fontWeight: i + 1 < conversation.length && conversation[i + 1]?.role === 'sagaa' ? '600' : 'normal'
                          }}
                        >
                          <img src={sagaaIconUrl} alt="" style={{ width: '16px', height: '16px' }} />
                          Answer
                        </span>

                        {/* Insights */}
                        <span
                          onClick={() => {
                            console.log('Insights clicked for question:', m.text);
                            // TODO: Implement insights functionality
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#f3f4f6';
                            e.currentTarget.style.borderRadius = '8px';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderRadius = '0';
                          }}
                          style={{
                            fontSize: '14px',
                            color: '#6b7280',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            userSelect: 'none',
                            padding: '6px 12px',
                            display: 'inline-block'
                          }}
                        >
                          💡 Insights
                        </span>

                        {/* Dashboard */}
                        <span
                          onClick={() => {
                            navigate('/dashboard');
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#f3f4f6';
                            e.currentTarget.style.borderRadius = '8px';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderRadius = '0';
                          }}
                          style={{
                            fontSize: '14px',
                            color: '#6b7280',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            userSelect: 'none',
                            padding: '6px 12px',
                            display: 'inline-block'
                          }}
                        >
                          📊 Dashboard
                        </span>

                        {/* Images */}
                        <span
                          onClick={() => {
                            console.log('Images clicked for question:', m.text);
                            // TODO: Implement images functionality
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#f3f4f6';
                            e.currentTarget.style.borderRadius = '8px';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderRadius = '0';
                          }}
                          style={{
                            fontSize: '14px',
                            color: '#6b7280',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            userSelect: 'none',
                            padding: '6px 12px',
                            display: 'inline-block'
                          }}
                        >
                          🖼️ Images
                        </span>

                        {/* Sources */}
                        <span
                          onClick={() => {
                            console.log('Sources clicked for question:', m.text);
                            // TODO: Implement sources functionality
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#f3f4f6';
                            e.currentTarget.style.borderRadius = '8px';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderRadius = '0';
                          }}
                          style={{
                            fontSize: '14px',
                            color: '#6b7280',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            userSelect: 'none',
                            padding: '6px 12px',
                            display: 'inline-block'
                          }}
                        >
                          📚 Sources
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div key={i}>
                      <p className="response-text">
                        {m.text}
                      </p>

                      {/* Quick Prompts - Show only for the first message (greeting) with context */}
                      {i === 0 && chatContext && quickPrompts.length > 0 && (
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
                                  background: 'white',
                                  border: '1px solid #e5e7eb',
                                  borderRadius: '20px',
                                  fontSize: '13px',
                                  color: '#374151',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s',
                                  fontWeight: '500'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform = 'translateY(-2px)';
                                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                                  e.currentTarget.style.background = '#f9fafb';
                                  e.currentTarget.style.borderColor = '#d1d5db';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = 'translateY(0)';
                                  e.currentTarget.style.boxShadow = 'none';
                                  e.currentTarget.style.background = 'white';
                                  e.currentTarget.style.borderColor = '#e5e7eb';
                                }}
                              >
                                {prompt}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                        
                        {/* Action buttons - only show if there's a user question before this response */}
                        {i > 0 && conversation[i-1]?.role === 'user' && (
                          <div 
                            style={{ 
                              display: 'flex', 
                              gap: '24px', 
                              marginTop: '12px',
                              marginBottom: '12px',
                              alignItems: 'center',
                              justifyContent: 'flex-end'
                            }}
                          >
                          {/* Export dropdown */}
                          <div style={{ position: 'relative', display: 'inline-block' }}>
                            <span
                              onClick={(e) => {
                                const menu = e.currentTarget.nextElementSibling as HTMLElement;
                                if (menu) {
                                  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
                                }
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#f3f4f6';
                                e.currentTarget.style.borderRadius = '8px';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.borderRadius = '0';
                              }}
                              style={{
                                fontSize: '11px',
                                color: '#6b7280',
                                cursor: 'pointer',
                                textDecoration: 'none',
                                userSelect: 'none',
                                padding: '6px 12px',
                                display: 'inline-block'
                              }}
                            >
                              📤 Export
                            </span>
                          <div 
                            style={{
                              display: 'none',
                              position: 'absolute',
                              top: '100%',
                              left: 0,
                              marginTop: '4px',
                              background: 'white',
                              border: '1px solid #d1d5db',
                              borderRadius: '6px',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                              zIndex: 1000,
                              minWidth: '140px'
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.display = 'none';
                            }}
                          >
                            <div
                              onClick={() => {
                                const userQuestion = i > 0 && conversation[i-1]?.role === 'user' ? conversation[i-1].text : 'N/A';
                                handleExportResponse(m.text, userQuestion, 'pdf');
                              }}
                              style={{
                                width: '100%',
                                padding: '8px 12px',
                                cursor: 'pointer',
                                fontSize: '11px',
                                color: '#374151',
                                borderBottom: '1px solid #f3f4f6'
                              }}
                            >
                              PDF
                            </div>
                            <div
                              onClick={() => {
                                const userQuestion = i > 0 && conversation[i-1]?.role === 'user' ? conversation[i-1].text : 'N/A';
                                handleExportResponse(m.text, userQuestion, 'markdown');
                              }}
                              style={{
                                width: '100%',
                                padding: '8px 12px',
                                cursor: 'pointer',
                                fontSize: '11px',
                                color: '#374151',
                                borderBottom: '1px solid #f3f4f6'
                              }}
                            >
                              Markdown
                            </div>
                            <div
                              onClick={() => {
                                const userQuestion = i > 0 && conversation[i-1]?.role === 'user' ? conversation[i-1].text : 'N/A';
                                handleExportResponse(m.text, userQuestion, 'docx');
                              }}
                              style={{
                                width: '100%',
                                padding: '8px 12px',
                                cursor: 'pointer',
                                fontSize: '11px',
                                color: '#374151'
                              }}
                            >
                              DOCX
                            </div>
                          </div>
                        </div>

                        {/* Copy button */}
                        <span
                          onClick={() => handleCopyResponse(m.text, i)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#f3f4f6';
                            e.currentTarget.style.borderRadius = '8px';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderRadius = '0';
                          }}
                          style={{
                            fontSize: '11px',
                            color: '#6b7280',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            userSelect: 'none',
                            padding: '6px 12px',
                            display: 'inline-block'
                          }}
                        >
                          {copiedIndex === i ? '✓ Copied' : '📋 Copy'}
                        </span>

                        {/* Delete button */}
                        <span
                          onClick={() => handleDeleteMessage(i)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#fee2e2';
                            e.currentTarget.style.borderRadius = '8px';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderRadius = '0';
                          }}
                          style={{
                            fontSize: '11px',
                            color: '#dc2626',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            userSelect: 'none',
                            padding: '6px 12px',
                            display: 'inline-block'
                          }}
                        >
                          🗑️ Delete
                        </span>
                      </div>
                        )}
                      
                      {i < conversation.length - 1 && (
                        <hr style={{ 
                          margin: '24px 0', 
                          border: 'none', 
                          borderTop: '2px solid #d1d5db',
                          width: '100%'
                        }} />
                      )}
                    </div>
                  )
                ))}
                {loading && <p className="muted">Sagaa is getting you the response...</p>}
                {error && !loading && <p className="error-text">{error}</p>}
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
                  placeholder={chatContext ? `Ask about your ${chatContext.name}...` : "Continue your conversation with Sagaa"}
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
