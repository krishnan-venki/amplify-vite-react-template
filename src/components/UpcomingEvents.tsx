import React, { useEffect, useState } from "react";

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
}

const UpcomingEvents: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelTop, setPanelTop] = useState(110); // default offset
    // Dynamically measure user dropdown position
  useEffect(() => {
    const menu = document.querySelector('.main-user');
    if (menu) {
      const rect = (menu as HTMLElement).getBoundingClientRect();
      setPanelTop(rect.bottom);
    }
  }, [panelOpen]);

  useEffect(() => {
    fetch("/src/assets/events.json")
      .then((res) => res.json())
      .then((data: Event[]) => {
        const now = new Date();
        const sevenDaysLater = new Date();
        sevenDaysLater.setDate(now.getDate() + 7);
        const filtered = data.filter((event) => {
          const eventDate = new Date(event.date);
          return eventDate >= now && eventDate <= sevenDaysLater;
        });
        setEvents(filtered);
      });
  }, []);

  if (events.length === 0) {
    return (
      <section className="events-section">
        <div className="events-header">Upcoming Events (Next 7 Days)</div>
        <div style={{ color: '#6f7b78', fontSize: '1.08rem', padding: '18px 0' }}>
          No upcoming events in the next 7 days.
        </div>
      </section>
    );
  }

  // Simple icon selection based on event type
  const getIcon = (title: string) => {
    if (title.toLowerCase().includes('yoga')) return '🧘';
    if (title.toLowerCase().includes('book')) return '📚';
    if (title.toLowerCase().includes('health')) return '🩺';
    if (title.toLowerCase().includes('gardening')) return '🌱';
    if (title.toLowerCase().includes('movie')) return '🎬';
    if (title.toLowerCase().includes('cooking')) return '🍳';
    if (title.toLowerCase().includes('art')) return '🎨';
    return '📅';
  };

  return (
    <section className="events-section">
      <div className="events-header" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span>Upcoming Events (Next 7 Days)</span>
        <button
          onClick={() => setCollapsed((c) => !c)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.2rem',
            color: '#0ea5b7',
            marginLeft: '4px'
          }}
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? '▶' : '▼'}
        </button>
      </div>
      {!collapsed && (
        <div className="events-grid">
          {events.map((event) => (
            <div className="event-card" key={event.id}>
              <div className="event-icon">{getIcon(event.title)}</div>
              <div className="event-details">
                <div className="event-title">{event.title}</div>
                <div className="event-date">{new Date(event.date).toLocaleString()}</div>
                <div className="event-location">{event.location}</div>
                <div className="event-description">{event.description}</div>
              </div>
              <button
                className="event-info-btn"
                title="More info"
                onClick={() => {
                  if (panelOpen && selectedEvent?.id === event.id) {
                    setPanelOpen(false); // collapse if same event
                  } else {
                    setSelectedEvent(event);
                    setPanelOpen(true);
                  }
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  marginLeft: '8px',
                  fontSize: '1.3rem',
                  color: '#0ea5b7',
                  alignSelf: 'flex-start'
                }}
              >
                ℹ️
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Collapsible Side Panel */}
      {panelOpen && selectedEvent && (
        <div
          className="event-side-panel"
          style={{
            position: 'fixed',
            top: panelTop,
            right: 0,
            width: 340,
            height: `calc(100vh - ${panelTop}px)`,
            background: '#fff',
            boxShadow: '-2px 0 16px rgba(16,24,40,0.10)',
            zIndex: 900,
            borderTopLeftRadius: 18,
            borderBottomLeftRadius: 18,
            animation: 'slideInPanel 0.25s cubic-bezier(.4,2,.6,1) forwards'
          }}
        >
          <button
            className="close-panel-btn"
            onClick={() => setPanelOpen(false)}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 48,
              height: 48,
              background: 'none',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              fontSize: '2rem',
              color: '#3b2f6b'
            }}
            title="Close"
          >
            ×
          </button>
          <div style={{ padding: '32px 24px 24px 24px' }}>
            <h2 style={{ color: '#0ea5b7', marginBottom: '12px' }}>{selectedEvent.title}</h2>
            <div style={{ marginBottom: '8px', color: '#3b2f6b' }}>
              <strong>Date:</strong> {new Date(selectedEvent.date).toLocaleString()}
            </div>
            <div style={{ marginBottom: '8px', color: '#3b2f6b' }}>
              <strong>Location:</strong> {selectedEvent.location}
            </div>
            <div style={{ color: '#172b23' }}>
              <strong>Description:</strong> {selectedEvent.description}
            </div>
            <hr style={{ margin: '18px 0 0 0', border: 'none', borderTop: '1px solid #e5e7eb', opacity: 0.6 }} />
          </div>
        </div>
      )}
    </section>
  );
};

export default UpcomingEvents;
