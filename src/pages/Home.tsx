// ...no imports needed

export default function Home() {
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
