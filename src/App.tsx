import { useEffect, useRef, useState } from "react";
import "./App.css";
import { fetchUserAttributes } from 'aws-amplify/auth';
import { useAuthenticator } from '@aws-amplify/ui-react';
import sagaa48 from './assets/sagaa_48x48.png';
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const { user, signOut } = useAuthenticator();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [nameLoaded, setNameLoaded] = useState(false);
  const [hasNotifs] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const onLogout = async () => {
    setMenuOpen(false);
    navigate('/home', { replace: true });
    try {
      await signOut();
    } catch {
      // ignore
    }
  };

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

  useEffect(() => {
    let active = true;
    async function loadName() {
      try {
        if (!user) { if (active) { setDisplayName(null); setNameLoaded(false); } return; }
        const attrs = await fetchUserAttributes();
        const full = [attrs.given_name, attrs.family_name].filter(Boolean).join(' ') || attrs.name || '';
        if (active) { setDisplayName(full || null); setNameLoaded(true); }
      } catch {
        if (active) { setDisplayName(null); setNameLoaded(true); }
      }
    }
    loadName();
    return () => { active = false; };
  }, [user]);

  // Ensure menu is collapsed on auth or route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [user, location.pathname]);

  const onNewChat = () => {
    navigate('/chat');
  };

  return (
    <div className="app-shell">
      <ScrollToTop />
      <div className="layout">
        <aside className="side-panel">
          <div className="side-inner">
            <div className="brand">
              <h1 className="title"><img src={sagaa48} alt="" aria-hidden="true" className="brand-icon" />Sagaa</h1>
              <p className="subtitle">Your AI companion</p>
            </div>
            <nav className="side-nav" aria-label="Main">
              <NavLink to="/home" end>
                <svg className="nav-icon home-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M3 10.5l9-7.5 9 7.5V20a2 2 0 01-2 2h-5v-6h-4v6H5a2 2 0 01-2-2v-9.5z" />
                </svg>
                <span>Home</span>
              </NavLink>
              <button type="button" className="side-nav-btn new-chat-btn" onClick={onNewChat}>
                <svg className="nc-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span>New Chat</span>
              </button>
              <Link to="#">
                <svg className="nav-icon chat-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M4 5h16a2 2 0 012 2v7a2 2 0 01-2 2H9l-4 3v-3H4a2 2 0 01-2-2V7a2 2 0 012-2zm3 4a1 1 0 100 2h10a1 1 0 100-2H7zm0 4a1 1 0 100 2h6a1 1 0 100-2H7z" />
                </svg>
                <span>Chats</span>
              </Link>
              <button
                type="button"
                className={`side-nav-btn notif-btn ${hasNotifs ? 'has-notifs' : ''}`}
                title="Notifications"
              >
                <span className="icon-wrap">
                  <svg className="bell" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M12 2a6 6 0 00-6 6v2.1c0 .8-.32 1.57-.88 2.13l-.73.73A1.75 1.75 0 005 16.75h14a1.75 1.75 0 001.6-2.45l-.73-.73A3 3 0 0118 10.1V8a6 6 0 00-6-6zm0 20a3 3 0 01-2.995-2.824L9 19h6a3 3 0 01-2.824 2.995L12 22z"/>
                  </svg>
                  {hasNotifs && <span className="dot" aria-hidden="true" />}
                </span>
                <span>Notifications</span>
              </button>
            </nav>
            {!user && (
              <div className="side-bottom">
                <button type="button" className="side-nav-btn login-btn" onClick={() => navigate('/login')}>
                  <svg className="nav-icon login-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="10" cy="8" r="3" fill="currentColor" />
                    <path fill="currentColor" d="M2 19a8 8 0 0116 0v1H2v-1z" />
                    <path d="M17 8v4M15 10h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span>Sign In</span>
                </button>
              </div>
            )}
          </div>
        </aside>

        <div className="main-column">
          <div className="main-user">
            {user && nameLoaded && displayName && (
              <div className="user-menu" ref={menuRef}>
                <button
                  type="button"
                  className="user-menu-btn"
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen(o => !o)}
                >
                  {displayName}
                  <svg className="caret" viewBox="0 0 20 20" focusable="false" aria-hidden="true">
                    <path fill="currentColor" fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
                {menuOpen && (
                  <div className="user-menu-list" role="menu" aria-label="User menu">
                      <button className="user-menu-item" role="menuitem" onClick={() => setMenuOpen(false)}>
                        <svg className="menu-icon knowme-icon" viewBox="0 0 24 24" aria-hidden="true">
                          <path fill="currentColor" d="M4 5h7a2 2 0 012 2v11a3 3 0 00-3-3H4V5zm16 0h-7a2 2 0 00-2 2v11a3 3 0 013-3h6V5z" />
                          <path d="M14.5 9.5l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          <path fill="currentColor" d="M13 14l1.2-3.2 2.5 2.5L13 14z" />
                        </svg>
                        <span>About me</span>
                      </button>
                      <button className="user-menu-item" role="menuitem" onClick={() => setMenuOpen(false)}>
                        <svg className="menu-icon pref-icon" viewBox="0 0 24 24" aria-hidden="true">
                          <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
                          <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
                          <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5 5l2.1 2.1M19 19l-2.1-2.1M5 19l2.1-2.1M19 5l-2.1 2.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span>Configure Chat</span>
                      </button>
                    <button className="user-menu-item" role="menuitem" onClick={onLogout}>
                      <svg className="menu-icon logout-icon" viewBox="0 0 24 24" aria-hidden="true">
                        <path fill="currentColor" d="M10 7l-1.41 1.41L11.17 11H3v2h8.17l-2.58 2.59L10 17l5-5-5-5z" />
                        <path fill="currentColor" d="M4 5h6v2H6v10h4v2H4a2 2 0 01-2-2V7a2 2 0 012-2z" />
                      </svg>
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
