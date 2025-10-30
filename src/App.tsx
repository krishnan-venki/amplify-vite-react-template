import { useEffect, useRef, useState } from "react";
import "./App.css";
import { fetchUserAttributes } from 'aws-amplify/auth';
import { useAuthenticator } from '@aws-amplify/ui-react';
import sagaa48 from './assets/sagaa_48x48.png';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import ScrollToTop from './components/homepage/ScrollToTop';
import { useInsights } from './hooks/useInsights';

function App() {
  const { user, signOut } = useAuthenticator();
  const [menuOpen, setMenuOpen] = useState(false);
  const [learnMoreOpen, setLearnMoreOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [initials, setInitials] = useState<string>('');
  const [nameLoaded, setNameLoaded] = useState(false);
  const [hasNotifs] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Navigation collapse state with localStorage persistence
  const [navCollapsed, setNavCollapsed] = useState(() => {
    const saved = localStorage.getItem('navCollapsed');
    return saved === 'true';
  });
  
  // Get insights count dynamically
  const { data: insights = [] } = useInsights();
  const insightsCount = insights.length;

  const handleLearnMoreClick = () => {
    setLearnMoreOpen(!learnMoreOpen);
  };

  const toggleNavCollapse = () => {
    const newState = !navCollapsed;
    setNavCollapsed(newState);
    localStorage.setItem('navCollapsed', String(newState));
  };

  const onLogout = async () => {
    setMenuOpen(false);
    setIsSigningOut(true);
    // Navigate immediately
    navigate('/home', { replace: true });
    try {
      await signOut();
    } catch {
      // ignore
    } finally {
      setIsSigningOut(false);
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
      if (e.key === 'Escape') {
        if (learnMoreOpen) {
          setLearnMoreOpen(false);
        } else {
          setMenuOpen(false);
        }
      }
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
        if (!user) { if (active) { setDisplayName(null); setEmail(null); setInitials(''); setNameLoaded(false); } return; }
        const attrs = await fetchUserAttributes();
        const full = [attrs.given_name, attrs.family_name].filter(Boolean).join(' ') || attrs.name || '';
        const userEmail = attrs.email || '';
        
        // Calculate initials
        let userInitials = '';
        if (attrs.given_name || attrs.family_name) {
          const first = attrs.given_name || '';
          const last = attrs.family_name || '';
          userInitials = (first.charAt(0) + last.charAt(0)).toUpperCase();
        } else if (full) {
          const names = full.trim().split(' ');
          if (names.length >= 2) {
            userInitials = (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
          } else {
            userInitials = names[0].charAt(0).toUpperCase();
          }
        } else if (user.username) {
          userInitials = user.username.substring(0, 2).toUpperCase();
        }
        
        if (active) { setDisplayName(full || null); setEmail(userEmail); setInitials(userInitials); setNameLoaded(true); }
      } catch {
        if (active) { setDisplayName(null); setEmail(null); setInitials(''); setNameLoaded(true); }
      }
    }
    loadName();
    return () => { active = false; };
  }, [user]);

  // Ensure menu is collapsed on auth or route changes
  useEffect(() => {
    setMenuOpen(false);
    setLearnMoreOpen(false);
  }, [user, location.pathname]);

  // Close submenu when main menu closes
  useEffect(() => {
    if (!menuOpen) {
      setLearnMoreOpen(false);
    }
  }, [menuOpen]);

  const onNewChat = () => {
    navigate('/chat');
  };

  // Check if current route is an auth page (should not show sidebar)
  const isAuthPage = location.pathname === '/signin' ||
                     location.pathname === '/signup' ||
                     location.pathname === '/login' ||
                     location.pathname === '/home' ||
                     location.pathname === '/';

  console.log('App.tsx - Current path:', location.pathname, 'isAuthPage:', isAuthPage, 'user:', !!user);

  // If it's an auth page, render without layout
  if (isAuthPage) {
    return (
      <>
        <ScrollToTop />
        <Outlet />
      </>
    );
  }

  return (
    <div className="app-shell">
      <ScrollToTop />
      <div className="layout" data-nav-collapsed={navCollapsed}>
        {!isSigningOut && (
          <aside className={`side-panel ${navCollapsed ? 'collapsed' : ''}`}>
            <div className="side-inner">
              {/* Toggle Button - Orange Arrow */}
              <button
                className="nav-toggle-btn orange-arrow"
                onClick={toggleNavCollapse}
                title={navCollapsed ? 'Expand navigation' : 'Collapse navigation'}
                aria-label={navCollapsed ? 'Expand navigation' : 'Collapse navigation'}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  {navCollapsed ? (
                    // Right arrow when collapsed (expand)
                    <path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                  ) : (
                    // Left arrow when expanded (collapse)
                    <path fill="currentColor" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
                  )}
                </svg>
              </button>

              <div className="brand" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }} title="Go to Sagaa Home">
                <h1 className="title">
                  <img src={sagaa48} alt="" aria-hidden="true" className="brand-icon" />
                  {!navCollapsed && <span className="brand-text">Sagaa</span>}
                </h1>
                {!navCollapsed && <p className="subtitle">Your AI Ecosystem</p>}
              </div>
            <nav className="side-nav" aria-label="Main">
              {/* Dashboard */}
              <NavLink to="/dashboard" end title={navCollapsed ? 'Dashboard' : ''}>
                <svg className="nav-icon dashboard-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <defs>
                    <linearGradient id="sagaa-gradient-dashboard" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#007AFF" />
                      <stop offset="50%" stopColor="#00D2FF" />
                      <stop offset="100%" stopColor="#34C759" />
                    </linearGradient>
                  </defs>
                  {/* Top-left square - blue */}
                  <path fill="#007AFF" d="M3 13h8V3H3v10z" />
                  {/* Bottom-left square - cyan */}
                  <path fill="#00D2FF" d="M3 21h8v-6H3v6z" />
                  {/* Bottom-right square - green */}
                  <path fill="#34C759" d="M13 21h8V11h-8v10z" />
                  {/* Top-right square - cyan/blue blend */}
                  <path fill="#00D2FF" d="M13 9h8V3h-8v6z" />
                </svg>
                {!navCollapsed && <span>Dashboard</span>}
              </NavLink>

              {/* Divider */}
              <div style={{ height: '1px', background: '#e5e7eb', margin: '12px 0' }} />

              {/* Money Vertical */}
              <NavLink to="/money/dashboard" title={navCollapsed ? 'Money' : ''}>
                <svg className="nav-icon money-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M12 6v12M9 9c0-1.1.9-2 2-2h2a2 2 0 110 4h-2a2 2 0 100 4h2c1.1 0 2-.9 2-2" />
                </svg>
                {!navCollapsed && <span>Money</span>}
              </NavLink>

              {/* Healthcare Vertical */}
              <NavLink to="/healthcare/dashboard" title={navCollapsed ? 'Healthcare' : ''}>
                <svg className="nav-icon healthcare-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                {!navCollapsed && <span>Healthcare</span>}
              </NavLink>

              {/* Education Vertical */}
              <NavLink to="/education/dashboard" title={navCollapsed ? 'Education' : ''} style={{ opacity: 0.5, pointerEvents: 'none' }}>
                <svg className="nav-icon education-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                </svg>
                {!navCollapsed && <span>Education</span>}
              </NavLink>

              {/* Life Essentials Vertical */}
              <NavLink to="/life/dashboard" title={navCollapsed ? 'Life Essentials' : ''}>
                <svg className="nav-icon life-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
                {!navCollapsed && <span>Life Essentials</span>}
              </NavLink>

              {/* Divider */}
              <div style={{ height: '1px', background: '#e5e7eb', margin: '12px 0' }} />

              {/* Chat */}
              <button type="button" className="side-nav-btn" onClick={onNewChat} title={navCollapsed ? 'Chat with Sagaa' : ''}>
                <svg className="nav-icon chat-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
                </svg>
                {!navCollapsed && <span>Chat with Sagaa</span>}
              </button>

              {/* Community */}
              <NavLink to="/community" title={navCollapsed ? 'Community' : ''}>
                <svg className="nav-icon community-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
                {!navCollapsed && <span>Community</span>}
              </NavLink>

              {/* Insights */}
              <NavLink to="/insights" title={navCollapsed ? 'Insights' : ''}>
                <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true" style={{ color: '#f59e0b' }}>
                  <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
                {!navCollapsed && (
                  <span style={{ position: 'relative' }}>
                    <span>Insights</span>
                    {insightsCount > 0 && (
                      <sup style={{
                        background: '#ef4444',
                        color: 'white',
                        borderRadius: '10px',
                        padding: '2px 6px',
                        fontSize: '10px',
                        fontWeight: '600',
                        marginLeft: '4px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        verticalAlign: 'super'
                      }}>
                        {insightsCount}
                      </sup>
                    )}
                  </span>
                )}
                {navCollapsed && insightsCount > 0 && (
                  <span className="nav-badge">{insightsCount}</span>
                )}
              </NavLink>

              {/* Goals */}
              <NavLink to="/goals" title={navCollapsed ? 'Goals' : ''}>
                <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true" style={{ color: '#10b981' }}>
                  <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                  <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path fill="currentColor" d="M12 8l2 2-2 2-2-2z" />
                </svg>
                {!navCollapsed && <span>Goals</span>}
              </NavLink>

              {/* Divider */}
              <div style={{ height: '1px', background: '#e5e7eb', margin: '12px 0' }} />

              {/* Notifications */}
              <button
                type="button"
                className={`side-nav-btn ${hasNotifs ? 'has-notifs' : ''}`}
                title={navCollapsed ? 'Notifications' : 'Notifications'}
              >
                <span className="icon-wrap">
                  <svg className="nav-icon notification-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
                  </svg>
                  {hasNotifs && <span className="dot" aria-hidden="true" />}
                </span>
                {!navCollapsed && <span>Notifications</span>}
              </button>
            </nav>
            {!user && (
              <div className="side-bottom">
                <button type="button" className="side-nav-btn login-btn" onClick={() => navigate('/signin')} title={navCollapsed ? 'Sign In' : ''}>
                  <svg className="nav-icon login-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="10" cy="8" r="3" fill="currentColor" />
                    <path fill="currentColor" d="M2 19a8 8 0 0116 0v1H2v-1z" />
                    <path d="M17 8v4M15 10h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  {!navCollapsed && <span>Sign In</span>}
                </button>
              </div>
            )}
            {user && nameLoaded && initials && (
              <div className="side-bottom">
                <div className="user-menu" ref={menuRef}>
                  <button
                    type="button"
                    className="user-menu-btn side-user-menu-btn"
                    aria-haspopup="menu"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen(o => !o)}
                    title={displayName || 'User menu'}
                  >
                    <span className="user-initials-avatar">{initials}</span>
                    <svg className="caret" viewBox="0 0 20 20" focusable="false" aria-hidden="true">
                      <path fill="currentColor" fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {menuOpen && (
                    <div className="user-menu-list side-user-menu-list" role="menu" aria-label="User menu">
                      <div className="user-menu-header">
                        <div className="user-menu-avatar-large">{initials}</div>
                        <div className="user-menu-info">
                          {displayName && <div className="user-menu-name">{displayName}</div>}
                          {email && <div className="user-menu-email">{email}</div>}
                        </div>
                      </div>
                      <div className="user-menu-separator"></div>
                      <button className="user-menu-item" role="menuitem" onClick={() => setMenuOpen(false)}>
                        <span>Settings </span>
                      </button>
                      <button className="user-menu-item" role="menuitem" onClick={() => setMenuOpen(false)}>
                        <span>Get Help</span>
                      </button>
                      <div className="user-menu-item-wrapper">
                        <button 
                          className="user-menu-item user-menu-item-expandable" 
                          role="menuitem" 
                          aria-expanded={learnMoreOpen}
                          onClick={handleLearnMoreClick}
                        >
                          <span>Learn more</span>
                          <svg className="submenu-arrow" viewBox="0 0 20 20" focusable="false" aria-hidden="true">
                            <path fill="currentColor" fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L10.94 10 7.23 6.29a.75.75 0 111.04-1.08l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                          </svg>
                        </button>
                        {learnMoreOpen && (
                          <div className="user-submenu-popup">
                            <button className="user-menu-item user-submenu-item" role="menuitem" onClick={() => { setMenuOpen(false); navigate('/home'); }}>
                              <span>About Sagaa</span>
                            </button>
                             <div className="user-menu-separator"></div>
                            <button className="user-menu-item user-submenu-item" role="menuitem" onClick={() => setMenuOpen(false)}>
                              <span>Usage policy</span>
                            </button>
                             <div className="user-menu-separator"></div>
                            <button className="user-menu-item user-submenu-item" role="menuitem" onClick={() => setMenuOpen(false)}>
                              <span>Privacy policy</span>
                            </button>
                            <button className="user-menu-item user-submenu-item" role="menuitem" onClick={() => setMenuOpen(false)}>
                              <span>Privacy Choices</span>
                            </button>
                             <div className="user-menu-separator"></div>
                            <button className="user-menu-item user-submenu-item" role="menuitem" onClick={() => setMenuOpen(false)}>
                              <span>Compliances</span>
                            </button>
                          </div>
                        )}
                      </div>
                      <button className="user-menu-item" role="menuitem" onClick={onLogout}>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </aside>
        )}

        <div className="main-column">
          {isSigningOut ? (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '100vh',
              color: '#6b7280' 
            }}>
              Signing out...
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
