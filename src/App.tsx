import { FormEvent, useState} from "react"
import "./App.css";
import { fetchAuthSession } from 'aws-amplify/auth'; 
import { useAuthenticator } from '@aws-amplify/ui-react';


function App() {
  const { user, signOut } = useAuthenticator();
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);
      setError(null);
      setResponse(null);

      const formData = new FormData(event.currentTarget);
      const message = formData.get("Prompt") as string;
      
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
          setResponse(normalize(text));
      } catch (err: any) {
          setError(err.message || "Something went wrong");
      } finally 
      {
        setLoading(false);
      }
  };

  return (
    <div className="app-shell">
      {/* Full-width header */}
      <header className="header">
        <div className="header-inner">
          <div className="brand">
              <h1 className="title">Sagaa</h1>
              <p className="subtitle">The personal AI companion</p>
          </div>
          <div className="user-actions">
              {user?.username && <span className="username">{user.username}</span>}
              <button className="link-btn" onClick={signOut}>log out</button>
          </div>
        </div>
      </header>

      {/* Nav box below the header */}
      <div className="nav-box">
        <nav className="nav">
            <a href="#" aria-current="page">home</a>
            <span className="divider">/</span>
            <a href="#about">about</a>
            <span className="divider">/</span>
            <a href="#contact">contact</a>
        </nav>
      </div>

      {/* Content split wrapped in a bottom panel card */}
      <div className="bottom-panel">
      <main className="content">
          <section className="panel left-panel">
            <form onSubmit={onSubmit} className="prompt-form" aria-busy={loading}
              aria-describedby="prompt-help">
              
              <div className="prompt-row">
                <label htmlFor="Prompt" className="sr-only">Ask Sagaa</label>
                <input
                  type="text"
                  className="prompt-input"
                  id="Prompt"
                  name="Prompt"
                  placeholder="Sagaa is ready for your query...."
                  autoComplete="off"
                />
                <button type="submit" className="submit-btn" disabled={loading}>
                  <span className="arrow">→</span>
                </button>
              </div>
              <p id="prompt-help" className="muted" aria-live="polite">Press Enter to send.</p>
              {error && <p className="error-text">{error}</p>}
            </form>
          </section>

          <section className="panel right-panel">
            <div className="response-box" role="status" aria-live="polite">
              {loading && <p className="muted">Sagaa is getting you the response...</p>}
              {!loading && !response && !error && (
                <p className="muted">Your response will appear here.</p>
              )}
              {response && <div className="response-text">{response}</div>}
            </div>
          </section>
  </main>
  </div>
    </div>
  );
}

export default App;
