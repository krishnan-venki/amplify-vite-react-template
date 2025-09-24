import React from "react";
import insights from '../assets/insights.json';

const icons = {
  "Health": "🩺",
  "Education": "🎓",
  "Finance": "💸",
  "Stress": "🧘",
  "Sleep": "😴",
  "Diabetes": "🍈",
  "Mindfulness": "🧘‍♂️",
  "Ayurvedic": "🌿"
};

function getIcon(context: string) {
  if (context.includes("Health")) return icons["Health"];
  if (context.includes("Education")) return icons["Education"];
  if (context.includes("Finance")) return icons["Finance"];
  if (context.includes("stress")) return icons["Stress"];
  if (context.includes("sleep")) return icons["Sleep"];
  if (context.includes("diabetes")) return icons["Diabetes"];
  if (context.includes("mindfulness")) return icons["Mindfulness"];
  if (context.includes("Ayurvedic")) return icons["Ayurvedic"];
  return "💡";
}

const InsightsShowcase: React.FC = () => {
  return (
    <div className="insights-showcase">
      {insights.map((item: any) => (
        <div className="insight-card" key={item.id}>
          <div className="insight-card-actions">
            <span className="card-action-icon" title="Follow up">🔔</span>
            <span className="card-action-icon" title="Dismiss">❌</span>
          </div>
          <div className="insight-icon-row">
            <div className="insight-icon">{getIcon(item.Context)}</div>
            <div className="insight-members">
              <span className="members-count">{item["member count"]}</span>
              <span className="members-label">members</span>
            </div>
          </div>
          <div className="insight-context">{item.Context}</div>
          <div className="insight-main">{item.Insights}</div>
          <div className="insight-action">{item["Recommended Action"]}</div>
        </div>
      ))}
    </div>
  );
};

export default InsightsShowcase;
