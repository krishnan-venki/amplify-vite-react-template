import { FormEvent, useEffect, useRef, useState } from "react"
import "./App.css";
import { fetchAuthSession } from 'aws-amplify/auth'; 
import { useAuthenticator } from '@aws-amplify/ui-react';
import sagaaIconUrl from './assets/sagaa_favicon.svg';


function App() {
  const { user, signOut } = useAuthenticator();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversation, setConversation] = useState<Array<{ role: 'user' | 'sagaa'; text: string }>>([]);
  const responseBoxRef = useRef<HTMLDivElement>(null);

  // Keep the view scrolled to the latest message
  useEffect(() => {
    const el = responseBoxRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [conversation, loading]);

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
              <h1 className="title">Sagaa</h1>
              <p className="subtitle">The personal AI companion</p>
            </div>
            <div className="user-actions below-brand">
              {user?.username && <span className="username">{user.username}</span>}
              <button className="link-btn" onClick={signOut}>log out</button>
            </div>
          </div>
        </aside>

        {/* Main column */}
        <div className="main-column">
          {/* Panel 3: Response or centered input when empty */}
          <main className="response-panel">
            {conversation.length === 0 && !loading && !error ? (
              <section className="response-card">
                <div className="center-input">
                  <form onSubmit={onSubmit} className="prompt-form" aria-busy={loading}>
                    <div className="input-row">
                      <label htmlFor="Prompt" className="sr-only">Ask Sagaa</label>
                      <input
                        type="text"
                        className="prompt-input"
                        id="Prompt"
                        name="Prompt"
                        placeholder="Type your question..."
                        autoComplete="off"
                      />
                      <button type="submit" className="submit-btn" disabled={loading}>
                        <span className="arrow">→</span>
                      </button>
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
                  <input
                    type="text"
                    className="prompt-input"
                    id="Prompt"
                    name="Prompt"
                    placeholder="Type your question..."
                    autoComplete="off"
                  />
                  <button type="submit" className="submit-btn" disabled={loading}>
                    <span className="arrow">→</span>
                  </button>
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
