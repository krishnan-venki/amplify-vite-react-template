import { FormEvent, useRef, useState, useEffect } from 'react';
import sagaaIconUrl from '../assets/sagaa_favicon.svg';
import sagaa48 from '../assets/sagaa_48x48.png';
import { fetchAuthSession, fetchUserAttributes } from 'aws-amplify/auth';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Chat() {
  const { user } = useAuthenticator(context => [context.user]);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversation, setConversation] = useState<Array<{ role: 'user' | 'sagaa'; text: string }>>([]);
  const responseBoxRef = useRef<HTMLDivElement>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);

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
        body: JSON.stringify({ message }),
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

  return (
    <>
      <main className="response-panel">
        {conversation.length === 0 && !loading && !error ? (
          <section className="response-card">
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
          </section>
        ) : (
          <section className="response-card">
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
            </div>
          </section>
        )}
      </main>

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
    </>
  );
}
