

import UpcomingEvents from "../components/UpcomingEvents";
import FutureEvents from "../components/FutureEvents";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useState, useEffect } from 'react';
import { fetchUserAttributes } from 'aws-amplify/auth';
import InsightsShowcase from '../components/InsightsShowcase';



export default function Home() {
  const { user } = useAuthenticator((context) => [context.user]);
  

  
  const [activeSection, setActiveSection] = useState('Events');
  const sections = ['Events', 'Insights', 'Health', 'Finance', 'News'];
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    async function getName() {
      if (user) {
        try {
          const attrs = await fetchUserAttributes();
          const first = attrs.given_name || '';
          const last = attrs.family_name || '';
          const name = [first, last].filter(Boolean).join(' ');
          setFullName(name || user.username || '');
        } catch {
          setFullName(user.username || '');
        }
      }
    }
    getName();
  }, [user]);

  if (!user) {
    return (
      <main className="response-panel">
        <section className="response-card">
          <div className="coming-soon">
            <div className="cs-badge">Under Construction</div>
            <h1 className="cs-title">Something exciting is on the way</h1>
            <p className="cs-subtitle">We're polishing this page. It will be online soon.</p>
            <div className="cs-progress" aria-label="Page readiness">
              <div className="bar"><span className="fill" /></div>
              <span className="hint">Preparing components…</span>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="response-panel">
      <section className="response-card">
        <div className="home-section-headings">
          {sections.map(section => (
            <button
              key={section}
              className={`home-section-btn${activeSection === section ? ' active' : ''}`}
              onClick={() => setActiveSection(section)}
            >
              {section}
            </button>
          ))}
        </div>
        {activeSection === 'Events' && (
          <>
            <div className="hero-section">
              <h1 className="hero-title">Events for {fullName}</h1>
              <p className="hero-desc">Your personalized events and updates. Additionally, recommendations are suggested based on Sagaa's understanding of you.</p>
            </div>
            <UpcomingEvents />
            <FutureEvents />
          </>
        )}
        {activeSection === 'Insights' && (
          <>
            <div className="hero-section">
              <h1 className="hero-title">Insights for {fullName}</h1>
              <p className="hero-desc">Sagaa Insights - Sagaa understands you and suggests what worked for other Sagaa members having similar health / preference / likings. This is the true power of Sagaa. Members share their life experiences anonymously through Sagaa and take other members along.</p>
            </div>
            <InsightsShowcase />
          </>
        )}
      </section>
    </main>
  );
}
