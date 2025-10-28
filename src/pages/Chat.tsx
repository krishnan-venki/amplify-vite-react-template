import { FormEvent, useRef, useState, useEffect } from 'react';
import sagaaIconUrl from '../assets/sagaa_favicon.svg';
import sagaa48 from '../assets/sagaa_48x48.png';
import { fetchAuthSession, fetchUserAttributes } from 'aws-amplify/auth';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate, useLocation } from 'react-router-dom';
import ContextualSidePanel from '../components/ContextualSidePanel';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ChartVisualization from '../components/ChartVisualization';
import { ConversationMessage, SagaaResponse } from '../types/chat';
import API_ENDPOINTS from '../config/api';

// Context-specific quick prompts for verticals
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

// Asset-specific quick prompts (generated dynamically based on asset state)
const getAssetQuickPrompts = (assetName: string, riskScore: number, _condition: string, recommendReplacement: boolean): string[] => {
  const basePrompts = [
    `What's the current condition of my ${assetName}?`,
    `How can I extend the lifespan of this asset?`
  ];

  if (riskScore >= 75 || recommendReplacement) {
    return [
      `When should I replace my ${assetName}?`,
      `What are the risks of delaying replacement?`,
      `How much will a replacement cost?`,
      `What's the best replacement option?`
    ];
  } else if (riskScore >= 50) {
    return [
      `What maintenance is needed for my ${assetName}?`,
      `How can I prevent future issues?`,
      `When should I schedule the next service?`,
      `What are early warning signs of failure?`
    ];
  } else {
    return [
      ...basePrompts,
      `What's the optimal maintenance schedule?`,
      `How does this compare to similar assets?`
    ];
  }
};

// Insight-type specific quick prompts
const INSIGHT_PROMPTS: Record<string, string[]> = {
  spending_pattern: [
    "Why did this happen?",
    "What should I do about it?",
    "Show me the trend over time",
    "How does this compare to my baseline?"
  ],
  budget_alert: [
    "How can I get back on track?",
    "Where should I cut spending?",
    "What caused this overage?",
    "Create a recovery plan"
  ],
  savings_opportunity: [
    "How much can I save?",
    "What's the best approach?",
    "Show me similar successes",
    "Create an action plan"
  ],
  discretionary_spending: [
    "Where am I overspending?",
    "How can I reduce this?",
    "Show me alternatives",
    "Compare to recommended levels"
  ],
  lifestyle_inflation: [
    "How did this happen?",
    "What's the long-term impact?",
    "How can I reverse this trend?",
    "Show me healthier spending patterns"
  ],
  seasonal_surge: [
    "How can I prepare for this?",
    "What happened last year?",
    "Set aside funds automatically",
    "Compare to historical patterns"
  ],
  cash_flow_warning: [
    "What's my current cash runway?",
    "Show me upcoming expenses",
    "How can I avoid this?",
    "What-if scenarios"
  ],
  seasonal_forecast: [
    "How confident is this prediction?",
    "What happened in past years?",
    "How can I prepare?",
    "Show me budget adjustments"
  ],
  trend_projection: [
    "Is this trend sustainable?",
    "What factors influence this?",
    "Show me different scenarios",
    "How can I optimize this?"
  ],
  risk_warning: [
    "How serious is this risk?",
    "What should I do immediately?",
    "Show me the worst-case scenario",
    "Create a prevention plan"
  ],
  opportunity_forecast: [
    "How can I take advantage?",
    "What's the best timing?",
    "Show me similar opportunities",
    "Create an action plan"
  ],
  // Goal-specific insight prompts
  goal_accelerator: [
    "How can I speed up my goal?",
    "What's the maximum acceleration possible?",
    "Show me the impact timeline",
    "Create an accelerated plan"
  ],
  goal_blocker: [
    "What's blocking my progress?",
    "How can I overcome this?",
    "Show alternative approaches",
    "What if I adjust my goal?"
  ],
  goal_at_risk: [
    "How do I get back on track?",
    "What went wrong?",
    "Show me recovery options",
    "Can I still meet my deadline?"
  ],
  goal_milestone: [
    "What's next for this goal?",
    "How should I celebrate?",
    "Show my overall progress",
    "What goals should I set next?"
  ],
  goal_reallocation: [
    "Tell me more about this reallocation",
    "How will this affect my lifestyle?",
    "Show alternative allocation options",
    "Is this the optimal approach?"
  ],
  goal_suggestion: [
    "Should I adjust my goal?",
    "Is this realistic for me?",
    "Show similar successful goals",
    "Help me refine my target"
  ]
};

// Default prompts for unknown insight types
const DEFAULT_INSIGHT_PROMPTS = [
  "Explain this in more detail",
  "What should I do about it?",
  "Show me related patterns",
  "How can I prevent this?"
];

export default function Chat() {
  const { user } = useAuthenticator(context => [context.user]);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const responseBoxRef = useRef<HTMLDivElement>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  // Track selected tab for each message: { messageIndex: 'answer' | 'insights' | 'dashboard' | 'images' | 'sources' }
  const [selectedTabs, setSelectedTabs] = useState<Record<number, 'answer' | 'insights' | 'dashboard' | 'images' | 'sources'>>({});

  // Define context types
  type VerticalContext = { type: 'vertical'; id: string; name: string; gradient: string };
  type InsightContext = { 
    type: 'insight' | 'forecast'; 
    vertical: string;
    insight_id: string;
    title: string;
    summary: string;
    priority: string;
    gradient: string;
    insight_type?: string;
    visualization?: any;
    key_metric?: any;
    actions?: string[];
    what_happening?: string;
    why_matters?: string;
  };
  type AssetContext = {
    type: 'asset';
    asset_id: string;
    assetName: string;
    assetType: string;
    location?: string;
    risk_score: number;
    condition: string;
    age_years: number;
    lifespan_years: number;
    replacement_cost: number;
    maintenance_status: string;
    gradient: string;
  };
  type ChatContext = VerticalContext | InsightContext | AssetContext;

  // Get context from navigation state
  const chatContext = location.state?.context as ChatContext | undefined;

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
      let greeting = '';
      if (chatContext.type === 'vertical') {
        greeting = `Hi! I'm here to help you with your ${chatContext.name} questions. What would you like to know?`;
      } else if (chatContext.type === 'asset') {
        greeting = `🏠 I can help you with your ${chatContext.assetName}. I have information about its condition, maintenance history, and replacement planning. What would you like to know?`;
      } else {
        // Insight or forecast context
        const emoji = chatContext.type === 'forecast' ? '🔮' : '💡';
        greeting = `${emoji} I can help you understand this ${chatContext.type === 'forecast' ? 'forecast' : 'insight'}. What would you like to know?`;
      }
      
      setConversation([{
        role: 'sagaa',
        text: greeting
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

  // Auto-resize textarea
  const autoResizeTextarea = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
  };

  // Handle textarea input
  const handleTextareaInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    autoResizeTextarea(event.target);
  };

  // Handle Enter key - submit on Enter, new line on Shift+Enter
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      const form = event.currentTarget.form;
      if (form) {
        form.requestSubmit();
      }
    }
  };

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
    
    // Reset textarea height after submission
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }

    try {
      // Use the centralized API config
      const apiUrl = API_ENDPOINTS.PROMPT;
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
          ...(chatContext && chatContext.type === 'vertical' && { 
            context: chatContext.id,
            verticalName: chatContext.name 
          })
        }),
      });

      if (!res.ok) {
        throw new Error('API request failed');
      }

      const data: SagaaResponse = await res.json();
      const text = typeof data.response === 'string' ? data.response : JSON.stringify(data);
      const normalize = (s: string) => s
        .replace(/\r\n/g, '\n')
        .replace(/[ \t]+\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
      const normalized = normalize(text);
      
      // Add response with all optional data if available
      setConversation(prev => [...prev, { 
        role: 'sagaa', 
        text: normalized,
        chartable: data.chartable,
        chartData: data.chartData,
        hasInsights: data.hasInsights,
        insightsData: data.insightsData,
        hasImages: data.hasImages,
        imagesData: data.imagesData,
        hasSources: data.hasSources,
        sourcesData: data.sourcesData
      }]);
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

  const quickPrompts = chatContext 
    ? chatContext.type === 'vertical' 
      ? CONTEXT_PROMPTS[chatContext.id] || []
      : chatContext.type === 'asset'
        ? getAssetQuickPrompts(
            chatContext.assetName, 
            chatContext.risk_score, 
            chatContext.condition,
            chatContext.maintenance_status.includes('Replacement')
          )
        : INSIGHT_PROMPTS[chatContext.insight_type || ''] || DEFAULT_INSIGHT_PROMPTS
    : [];

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
                      
                      {/* Options below user prompt - Only show if there are multiple options */}
                      {i + 1 < conversation.length && conversation[i + 1]?.role === 'sagaa' && (() => {
                        const nextMessage = conversation[i + 1];
                        const hasMultipleOptions = (nextMessage?.hasInsights || nextMessage?.chartable || nextMessage?.hasImages || nextMessage?.hasSources) ?? false;
                        
                        if (!hasMultipleOptions) {
                          return null; // Don't show tabs if only "Answer" is available
                        }
                        
                        return (
                          <div 
                            style={{ 
                              display: 'flex', 
                              gap: '24px', 
                              marginTop: '12px',
                              marginBottom: '12px',
                              alignItems: 'center'
                            }}
                          >
                            {/* Answer */}
                            <span
                              onClick={() => {
                                const responseIndex = i + 1;
                                setSelectedTabs(prev => ({ ...prev, [responseIndex]: 'answer' }));
                              }}
                              onMouseEnter={(e) => {
                                const isSelected = selectedTabs[i + 1] === 'answer' || !selectedTabs[i + 1];
                                if (!isSelected) {
                                  e.currentTarget.style.background = '#f3f4f6';
                                }
                              }}
                              onMouseLeave={(e) => {
                                const isSelected = selectedTabs[i + 1] === 'answer' || !selectedTabs[i + 1];
                                if (!isSelected) {
                                  e.currentTarget.style.background = 'transparent';
                                }
                              }}
                              style={{
                                fontSize: '14px',
                                color: (selectedTabs[i + 1] === 'answer' || !selectedTabs[i + 1]) ? '#2563eb' : '#6b7280',
                                cursor: 'pointer',
                                textDecoration: 'none',
                                userSelect: 'none',
                                padding: '6px 12px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                background: (selectedTabs[i + 1] === 'answer' || !selectedTabs[i + 1]) ? '#dbeafe' : 'transparent',
                                borderRadius: '8px',
                                fontWeight: (selectedTabs[i + 1] === 'answer' || !selectedTabs[i + 1]) ? '600' : 'normal'
                              }}
                            >
                              <img src={sagaaIconUrl} alt="" style={{ width: '16px', height: '16px' }} />
                              Answer
                            </span>

                        {/* Insights - Only show if next message has insights */}
                        {i + 1 < conversation.length && conversation[i + 1]?.hasInsights && (
                          <span
                            onClick={() => {
                              const responseIndex = i + 1;
                              setSelectedTabs(prev => ({ ...prev, [responseIndex]: 'insights' }));
                              console.log('Insights clicked for question:', m.text);
                              // TODO: Implement insights functionality
                            }}
                            onMouseEnter={(e) => {
                              if (selectedTabs[i + 1] !== 'insights') {
                                e.currentTarget.style.background = '#f3f4f6';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (selectedTabs[i + 1] !== 'insights') {
                                e.currentTarget.style.background = 'transparent';
                              }
                            }}
                            style={{
                              fontSize: '14px',
                              color: selectedTabs[i + 1] === 'insights' ? '#2563eb' : '#6b7280',
                              cursor: 'pointer',
                              textDecoration: 'none',
                              userSelect: 'none',
                              padding: '6px 12px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              background: selectedTabs[i + 1] === 'insights' ? '#dbeafe' : 'transparent',
                              borderRadius: '8px',
                              fontWeight: selectedTabs[i + 1] === 'insights' ? '600' : 'normal'
                            }}
                          >
                            💡 Insights
                          </span>
                        )}

                        {/* Dashboard - Only show if next message is chartable */}
                        {i + 1 < conversation.length && conversation[i + 1]?.chartable && (
                          <span
                            onClick={() => {
                              const responseIndex = i + 1;
                              setSelectedTabs(prev => ({ ...prev, [responseIndex]: 'dashboard' }));
                            }}
                            onMouseEnter={(e) => {
                              if (selectedTabs[i + 1] !== 'dashboard') {
                                e.currentTarget.style.background = '#f3f4f6';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (selectedTabs[i + 1] !== 'dashboard') {
                                e.currentTarget.style.background = 'transparent';
                              }
                            }}
                            style={{
                              fontSize: '14px',
                              color: selectedTabs[i + 1] === 'dashboard' ? '#2563eb' : '#6b7280',
                              cursor: 'pointer',
                              textDecoration: 'none',
                              userSelect: 'none',
                              padding: '6px 12px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              background: selectedTabs[i + 1] === 'dashboard' ? '#dbeafe' : 'transparent',
                              borderRadius: '8px',
                              fontWeight: selectedTabs[i + 1] === 'dashboard' ? '600' : 'normal'
                            }}
                          >
                            📊 Dashboard
                          </span>
                        )}

                        {/* Images - Only show if next message has images */}
                        {i + 1 < conversation.length && conversation[i + 1]?.hasImages && (
                          <span
                            onClick={() => {
                              const responseIndex = i + 1;
                              setSelectedTabs(prev => ({ ...prev, [responseIndex]: 'images' }));
                              console.log('Images clicked for question:', m.text);
                              // TODO: Implement images functionality
                            }}
                            onMouseEnter={(e) => {
                              if (selectedTabs[i + 1] !== 'images') {
                                e.currentTarget.style.background = '#f3f4f6';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (selectedTabs[i + 1] !== 'images') {
                                e.currentTarget.style.background = 'transparent';
                              }
                            }}
                            style={{
                              fontSize: '14px',
                              color: selectedTabs[i + 1] === 'images' ? '#2563eb' : '#6b7280',
                              cursor: 'pointer',
                              textDecoration: 'none',
                              userSelect: 'none',
                              padding: '6px 12px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              background: selectedTabs[i + 1] === 'images' ? '#dbeafe' : 'transparent',
                              borderRadius: '8px',
                              fontWeight: selectedTabs[i + 1] === 'images' ? '600' : 'normal'
                            }}
                          >
                            🖼️ Images
                          </span>
                        )}

                        {/* Sources - Only show if next message has sources */}
                        {i + 1 < conversation.length && conversation[i + 1]?.hasSources && (
                          <span
                            onClick={() => {
                              const responseIndex = i + 1;
                              setSelectedTabs(prev => ({ ...prev, [responseIndex]: 'sources' }));
                              console.log('Sources clicked for question:', m.text);
                              // TODO: Implement sources functionality
                            }}
                            onMouseEnter={(e) => {
                              if (selectedTabs[i + 1] !== 'sources') {
                                e.currentTarget.style.background = '#f3f4f6';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (selectedTabs[i + 1] !== 'sources') {
                                e.currentTarget.style.background = 'transparent';
                              }
                            }}
                            style={{
                              fontSize: '14px',
                              color: selectedTabs[i + 1] === 'sources' ? '#2563eb' : '#6b7280',
                              cursor: 'pointer',
                              textDecoration: 'none',
                              userSelect: 'none',
                              padding: '6px 12px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              background: selectedTabs[i + 1] === 'sources' ? '#dbeafe' : 'transparent',
                              borderRadius: '8px',
                              fontWeight: selectedTabs[i + 1] === 'sources' ? '600' : 'normal'
                            }}
                          >
                            📚 Sources
                          </span>
                        )}
                          </div>
                        );
                      })()}
                    </div>
                  ) : (
                    <div key={i}>
                      {/* Show chart if Dashboard tab is selected and chart data exists */}
                      {selectedTabs[i] === 'dashboard' && m.chartData ? (
                        <ChartVisualization 
                          chartData={m.chartData} 
                          contextGradient={chatContext?.gradient}
                        />
                      ) : (
                        /* Show text response by default */
                        <div className="response-text">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {m.text}
                          </ReactMarkdown>
                        </div>
                      )}

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
                            <span>Quick questions{chatContext.type === 'vertical' ? ` about ${chatContext.name}` : ''}:</span>
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
                <div style={{ width: 'min(600px, 100%)', margin: '0 auto' }}>
                  <form onSubmit={onSubmit} className="prompt-form" aria-busy={loading}>
                    <div className="brand">
                      <h1 className="title"><img src={sagaa48} alt="" aria-hidden="true" className="brand-icon" />
                        {`Hello${displayName ? `, ${displayName}` : ''}.`}
                      </h1>
                    </div>
                    <div className="input-row">
                      <label htmlFor="Prompt" className="sr-only">Ask Sagaa</label>
                      <div className="input-wrap" style={{ position: 'relative' }}>
                        <textarea
                          className="prompt-input"
                          id="Prompt"
                          name="Prompt"
                          placeholder="How can Sagaa help you today?"
                          autoComplete="on"
                          rows={1}
                          onInput={handleTextareaInput}
                          onKeyDown={handleKeyDown}
                          style={{ 
                            resize: 'none', 
                            overflow: 'hidden',
                            minHeight: '80px',
                            maxHeight: '200px',
                            lineHeight: '1.5',
                            paddingBottom: '48px',
                            paddingLeft: '12px'
                          }}
                        />
                        
                        {/* Action Icons - Bottom Left */}
                        <div style={{
                          position: 'absolute',
                          bottom: '12px',
                          left: '12px',
                          display: 'flex',
                          gap: '6px',
                          alignItems: 'center',
                          zIndex: 10
                        }}>
                          {/* Attach File Icon */}
                          <button
                            type="button"
                            onClick={() => {
                              console.log('Attach file clicked');
                              // TODO: Implement file attachment
                            }}
                            style={{
                              background: 'white',
                              border: '1px solid #d1d5db',
                              cursor: 'pointer',
                              padding: '6px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: '6px',
                              transition: 'all 0.2s',
                              width: '28px',
                              height: '28px'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = '#f9fafb';
                              e.currentTarget.style.borderColor = '#9ca3af';
                              e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'white';
                              e.currentTarget.style.borderColor = '#d1d5db';
                              e.currentTarget.style.transform = 'scale(1)';
                            }}
                            title="Attach file"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#6b7280' }}>
                              <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                            </svg>
                          </button>

                          {/* Voice Mode Icon */}
                          <button
                            type="button"
                            onClick={() => {
                              console.log('Voice mode clicked');
                              // TODO: Implement voice mode
                            }}
                            style={{
                              background: 'white',
                              border: '1px solid #d1d5db',
                              cursor: 'pointer',
                              padding: '6px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: '6px',
                              transition: 'all 0.2s',
                              width: '28px',
                              height: '28px'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = '#f9fafb';
                              e.currentTarget.style.borderColor = '#9ca3af';
                              e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'white';
                              e.currentTarget.style.borderColor = '#d1d5db';
                              e.currentTarget.style.transform = 'scale(1)';
                            }}
                            title="Voice mode"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#6b7280' }}>
                              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                              <line x1="12" x2="12" y1="19" y2="22" />
                            </svg>
                          </button>
                        </div>

                        <button type="submit" className="submit-btn inside" disabled={loading}>
                          <span className="arrow">→</span>
                        </button>
                      </div>
                    </div>
                    {error && <p className="error-text">{error}</p>}
                  </form>

                  {/* Vertical Cards */}
                  <div style={{
                    display: 'flex',
                    gap: '12px',
                    marginTop: '8px',
                    width: '100%'
                  }}>
                    {/* Sagaa Money Card */}
                  <div
                    onClick={() => {
                      navigate('/chat', {
                        state: {
                          context: {
                            id: 'money',
                            name: 'Money',
                            gradient: 'linear-gradient(135deg, #10b981 0%, #0d9488 100%)'
                          }
                        }
                      });
                    }}
                    style={{
                      flex: 1,
                      background: 'white',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      border: '2px solid #e5e7eb',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.15)';
                      e.currentTarget.style.borderColor = '#10b981';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                      e.currentTarget.style.borderColor = '#e5e7eb';
                    }}
                  >
                    <span style={{ fontSize: '18px' }}>💰</span>
                    <h3 style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      margin: 0,
                      color: '#6b7280'
                    }}>
                      Sagaa Money
                    </h3>
                  </div>

                  {/* Sagaa Health Card - ACTIVE */}
                  <div
                    onClick={() => {
                      navigate('/chat', {
                        state: {
                          context: {
                            id: 'healthcare',
                            name: 'Healthcare',
                            gradient: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)'
                          }
                        }
                      });
                    }}
                    style={{
                      flex: 1,
                      background: 'white',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      border: '2px solid #e5e7eb',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(244, 63, 94, 0.15)';
                      e.currentTarget.style.borderColor = '#f43f5e';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                      e.currentTarget.style.borderColor = '#e5e7eb';
                    }}
                  >
                    <span style={{ fontSize: '18px' }}>❤️</span>
                    <h3 style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      margin: 0,
                      color: '#6b7280'
                    }}>
                      Sagaa Health
                    </h3>
                  </div>

                  {/* Sagaa Education Card - DISABLED */}
                  <div
                    style={{
                      flex: 1,
                      background: 'white',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      cursor: 'not-allowed',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      border: '2px solid #f3f4f6',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                      opacity: 0.5
                    }}
                  >
                    <span style={{ fontSize: '18px', opacity: 0.6 }}>🎓</span>
                    <h3 style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      margin: 0,
                      color: '#9ca3af'
                    }}>
                      Sagaa Education
                    </h3>
                  </div>

                  {/* Sagaa Life Essentials Card - DISABLED */}
                  <div
                    style={{
                      flex: 1,
                      background: 'white',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      cursor: 'not-allowed',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      border: '2px solid #f3f4f6',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                      opacity: 0.5
                    }}
                  >
                    <span style={{ fontSize: '18px', opacity: 0.6 }}>🏠</span>
                    <h3 style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      margin: 0,
                      color: '#9ca3af'
                    }}>
                      Sagaa Life Essentials
                    </h3>
                  </div>
                </div>
                </div>
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
        <div className="input-dock" role="group" aria-label="Ask Sagaa" style={{ bottom: 0 }}>
          <form onSubmit={onSubmit} className="prompt-form" aria-busy={loading}>
            <div className="input-row">
              <label htmlFor="Prompt" className="sr-only">Ask Sagaa</label>
              <div className="input-wrap" style={{ position: 'relative' }}>
                <textarea
                  ref={inputRef}
                  className="prompt-input"
                  id="Prompt"
                  name="Prompt"
                  placeholder={chatContext 
                    ? chatContext.type === 'vertical' 
                      ? `Ask about your ${chatContext.name}...` 
                      : "Ask me anything about this..." 
                    : "Continue your conversation with Sagaa"}
                  autoComplete="on"
                  rows={1}
                  onInput={handleTextareaInput}
                  onKeyDown={handleKeyDown}
                  style={{ 
                    resize: 'none', 
                    overflow: 'hidden',
                    minHeight: '80px',
                    maxHeight: '200px',
                    lineHeight: '1.5',
                    paddingRight: '50px',
                    paddingBottom: '40px'
                  }}
                />
                
                {/* Action Icons - Bottom Left */}
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  display: 'flex',
                  gap: '6px',
                  alignItems: 'center',
                  zIndex: 10
                }}>
                  {/* Attach File Icon */}
                  <button
                    type="button"
                    onClick={() => {
                      console.log('Attach file clicked');
                      // TODO: Implement file attachment
                    }}
                    style={{
                      background: 'white',
                      border: '1px solid #d1d5db',
                      cursor: 'pointer',
                      padding: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '6px',
                      transition: 'all 0.2s',
                      width: '28px',
                      height: '28px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f9fafb';
                      e.currentTarget.style.borderColor = '#9ca3af';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.borderColor = '#d1d5db';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    title="Attach file"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#6b7280' }}>
                      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                    </svg>
                  </button>

                  {/* Voice Mode Icon */}
                  <button
                    type="button"
                    onClick={() => {
                      console.log('Voice mode clicked');
                      // TODO: Implement voice mode
                    }}
                    style={{
                      background: 'white',
                      border: '1px solid #d1d5db',
                      cursor: 'pointer',
                      padding: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '6px',
                      transition: 'all 0.2s',
                      width: '28px',
                      height: '28px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f9fafb';
                      e.currentTarget.style.borderColor = '#9ca3af';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.borderColor = '#d1d5db';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    title="Voice mode"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#6b7280' }}>
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" x2="12" y1="19" y2="22" />
                    </svg>
                  </button>
                </div>

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