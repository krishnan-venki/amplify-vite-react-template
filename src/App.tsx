import { FormEvent, useEffect, useRef, useState } from "react"
import "./App.css";
import { fetchAuthSession, fetchUserAttributes } from 'aws-amplify/auth'; 
import { useAuthenticator } from '@aws-amplify/ui-react';
import sagaaIconUrl from './assets/sagaa_favicon.svg';
import sagaa48 from './assets/sagaa_48x48.png';


function App() {
  const { user, signOut } = useAuthenticator();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversation, setConversation] = useState<Array<{ role: 'user' | 'sagaa'; text: string }>>([]);
  const responseBoxRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);

  // Keep the view scrolled to the latest message
  useEffect(() => {
    const el = responseBoxRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [conversation, loading]);

  // Close user menu on outside click or Escape
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!menuRef.current) return;
      if (menuOpen && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false);
    }
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  // Load full name (name or given/family) from Cognito attributes
  useEffect(() => {
    let active = true;
    async function loadName() {
      try {
        if (!user) { if (active) setDisplayName(null); return; }
        const attrs = await fetchUserAttributes();
        const full = attrs.name || [attrs.given_name, attrs.family_name].filter(Boolean).join(' ');
        if (active) setDisplayName(full || user.username);
      } catch {
        if (active) setDisplayName(user?.username ?? null);
      }
    }
    loadName();
    return () => { active = false; };
  }, [user]);

  const onNewChat = () => {
    setConversation([]);
    setError(null);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);
  setError(null);

  const formData = new FormData(event.currentTarget);
  const messageRaw = formData.get("Prompt") as string;
  const message = (messageRaw ?? "").trim();
  if (!message) { setLoading(false); return; }
  // Append the user's question to the conversation immediately
  setConversation(prev => [...prev, { role: 'user', text: message }]);
      // Clear the input after capturing the message
      event.currentTarget.reset();
      
      try 
      {
          const apiUrl = "https://63z70erbsb.execute-api.us-west-2.amazonaws.com/dev/prompt"; 
          const { tokens } = await fetchAuthSession();
          const idToken = tokens?.idToken?.toString();

          if (!idToken) {
              throw new Error("No ID token found. User may not be authenticated.");
          }
          
          const res = await fetch(apiUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": idToken,
              },
              body: JSON.stringify({ message }),
          });

          if (!res.ok) {
            throw new Error("API request failed");
          }

          const data = await res.json();
          const text = typeof data.response === 'string' ? data.response : JSON.stringify(data);
          const normalize = (s: string) =>
            s
              .replace(/\r\n/g, "\n")           // normalize line endings
              .replace(/[ \t]+\n/g, "\n")      // trim trailing spaces per line
              .replace(/\n{3,}/g, "\n\n")      // collapse 3+ newlines to a single blank line
              .trim();
          const normalized = normalize(text);
          // Append Sagaa's response after receiving it
          setConversation(prev => [...prev, { role: 'sagaa', text: normalized }]);
      } catch (err: any) {
          setError(err.message || "Something went wrong");
      } finally 
      {
        setLoading(false);
      }
  };

  return (
    <div className="app-shell">
      <div className="layout">
        {/* Side Panel (moved from top) */}
        <aside className="side-panel">
          <div className="side-inner">
            <div className="brand">
              <h1 className="title"><img src={sagaa48} alt="" aria-hidden="true" className="brand-icon" />Sagaa</h1>
              <p className="subtitle">Your AI companion</p>
            </div>
            <nav className="side-nav" aria-label="Main">
              <a href="#" aria-current="page">Home</a>
              <button type="button" className="side-nav-btn" onClick={onNewChat}>New Chat</button>
              <a href="#chats">Chats</a>
            </nav>
          </div>
        </aside>

        {/* Main column */}
        <div className="main-column">
          {/* Top-right username dropdown in main screen */}
          <div className="main-user">
            {user?.username && (
              <div className="user-menu" ref={menuRef}>
                <button
                  type="button"
                  className="user-menu-btn"
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen(o => !o)}
                >
                  {displayName ?? user.username}
                  <svg className="caret" viewBox="0 0 20 20" focusable="false" aria-hidden="true">
                    <path fill="currentColor" fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
                {menuOpen && (
                  <div className="user-menu-list" role="menu" aria-label="User menu">
                    <button className="user-menu-item" role="menuitem" onClick={() => setMenuOpen(false)}>Preference</button>
                    <button className="user-menu-item" role="menuitem" onClick={signOut}>Log out</button>
                  </div>
                )}
              </div>
            )}
          </div>
          {/* Panel 3: Response or centered input when empty */}
          <main className="response-panel">
            {conversation.length === 0 && !loading && !error ? (
              <section className="response-card">
                <div className="center-input">
                  <form onSubmit={onSubmit} className="prompt-form" aria-busy={loading}>
                    <div className="brand">
                      <h1 className="title"><img src={sagaa48} alt="" aria-hidden="true" className="brand-icon" />Sagaa - Your AI Companion</h1>
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
              </section>
            ) : (
              <section className="response-card">
                <div className="response-box" role="status" aria-live="polite" ref={responseBoxRef}>
                  {conversation.map((m, i) => (
                    m.role === 'user' ? (
                      <p className="question-text" key={i}><strong>User</strong>: {m.text}</p>
                    ) : (
                      <p className="response-text message-with-icon" key={i}>
                        <img src={sagaaIconUrl} alt="Sagaa" className="message-icon" />
                        {m.text}
                      </p>
                    )
                  ))}
                  {loading && <p className="muted">Sagaa is getting you the response...</p>}
                  {error && !loading && <p className="error-text">{error}</p>}
                </div>
              </section>
            )}
          </main>

          {/* Panel 4: Fixed bottom input dock (only after first message or when loading/error) */}
          {(conversation.length > 0 || loading || !!error) && (
            <div className="input-dock" role="group" aria-label="Ask Sagaa">
              <form onSubmit={onSubmit} className="prompt-form" aria-busy={loading}>
                <div className="input-row">
                  <label htmlFor="Prompt" className="sr-only">Ask Sagaa</label>
                  <div className="input-wrap">
                    <input
                      type="text"
                      className="prompt-input"
                      id="Prompt"
                      name="Prompt"
                      placeholder="Continue your conversation with Sagaa"
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
        </div>
      </div>
    </div>
  );
}

export default App;
