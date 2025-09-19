import React, { useEffect, useState } from "react";

interface FutureEvent {
  id: number;
  Type: string;
  title: string;
  date: string;
  location: string;
  description: string;
  details: string;
  bookable?: boolean;
}

const FutureEvents: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [events, setEvents] = useState<FutureEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<FutureEvent | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    fetch("/src/assets/futureevents.json")
      .then((res) => res.json())
      .then((data: FutureEvent[]) => setEvents(data));
  }, []);

  // Simple icon selection based on event type
  const getIcon = (type: string) => {
    if (type.toLowerCase().includes("suggestion")) return "💡";
    if (type.toLowerCase().includes("reminder")) return "⏰";
    return "📅";
  };

  return (
    <section className="future-events-section">
      <div className="future-events-header" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span>Events that might be of your interest</span>
        <button
          onClick={() => setCollapsed((c) => !c)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.2rem',
            color: '#e67e22',
            marginLeft: '4px'
          }}
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? '▶' : '▼'}
        </button>
      </div>
      {!collapsed && (
        <div className="future-events-grid">
          {events.map((event) => (
            <div className="future-event-card" key={event.id}>
              <div className="future-event-icon">{getIcon(event.Type)}</div>
              <div className="future-event-details">
                <div className="future-event-title">{event.title}</div>
                <div className="future-event-date">{new Date(event.date).toLocaleString()}</div>
                <div className="future-event-location">{event.location}</div>
                <div className="future-event-description">{event.description}</div>
              </div>
              <button
                className="future-event-info-btn"
                title="More info"
                onClick={() => {
                  if (panelOpen && selectedEvent?.id === event.id) {
                    setPanelOpen(false);
                  } else {
                    setSelectedEvent(event);
                    setPanelOpen(true);
                  }
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  marginLeft: "8px",
                  fontSize: "1.3rem",
                  color: "#e67e22",
                  alignSelf: "flex-start"
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
          className="future-event-side-panel"
          style={{
            position: "fixed",
            top: 110,
            right: 0,
            width: 340,
            height: "calc(100vh - 110px)",
            background: "#f9f6f2",
            boxShadow: "-2px 0 16px rgba(230,126,34,0.10)",
            zIndex: 900,
            borderTopLeftRadius: 18,
            borderBottomLeftRadius: 18,
            animation: "slideInPanel 0.25s cubic-bezier(.4,2,.6,1) forwards"
          }}
        >
          <button
            className="close-panel-btn"
            onClick={() => setPanelOpen(false)}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 48,
              height: 48,
              background: "none",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 10,
              fontSize: "2rem",
              color: "#e67e22"
            }}
            title="Close"
          >
            ×
          </button>
          <div style={{ padding: "32px 24px 24px 24px" }}>
            <h2 style={{ color: "#e67e22", marginBottom: "12px" }}>{selectedEvent.title}</h2>
            <div style={{ marginBottom: "8px", color: "#3b2f6b" }}>
              <strong>Date:</strong> {new Date(selectedEvent.date).toLocaleString()}
            </div>
            <div style={{ marginBottom: "8px", color: "#3b2f6b" }}>
              <strong>Location:</strong> {selectedEvent.location}
            </div>
            <div style={{ color: "#172b23" }}>
              <strong>Description:</strong> {selectedEvent.description}
            </div>
            <hr style={{ margin: "18px 0 0 0", border: "none", borderTop: "1px solid #e67e22", opacity: 0.6 }} />
            <div style={{ color: "#172b23", marginTop: "12px" }}>
              <strong>Details:</strong> {selectedEvent.details}
            </div>
            {selectedEvent.bookable ? (
              <>
                <div style={{ marginTop: '18px', display: 'flex', justifyContent: 'center' }}>
                  <button style={{
                    padding: '10px 28px',
                    background: 'linear-gradient(90deg, #e67e22 60%, #f9d29d 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '24px',
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '1.08rem',
                    boxShadow: '0 2px 8px rgba(230,126,34,0.12)',
                    letterSpacing: '0.04em',
                    transition: 'background 0.18s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    Book for me
                  </button>
                </div>
                <hr style={{ margin: "18px 0 0 0", border: "none", borderTop: "1px solid #e67e22", opacity: 0.4 }} />
              </>
            ) : (
              <hr style={{ margin: "18px 0 0 0", border: "none", borderTop: "1px solid #e67e22", opacity: 0.4 }} />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default FutureEvents;
