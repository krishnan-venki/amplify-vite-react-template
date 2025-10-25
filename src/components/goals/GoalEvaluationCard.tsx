import type { GoalEvaluation } from '../../types/goal';

interface GoalEvaluationCardProps {
  evaluation: GoalEvaluation;
}

const statusConfig = {
  on_track: {
    label: 'On Track',
    bg: '#f0fdf4',
    border: '#bbf7d0',
    textColor: '#14532d',
    badgeBg: '#d1fae5',
    badgeText: '#065f46',
    icon: '✓',
  },
  ahead: {
    label: 'Ahead of Schedule',
    bg: '#eff6ff',
    border: '#bfdbfe',
    textColor: '#1e3a8a',
    badgeBg: '#dbeafe',
    badgeText: '#1e40af',
    icon: '↑',
  },
  behind: {
    label: 'Behind Schedule',
    bg: '#fff7ed',
    border: '#fed7aa',
    textColor: '#7c2d12',
    badgeBg: '#ffedd5',
    badgeText: '#9a3412',
    icon: '↓',
  },
  at_risk: {
    label: 'At Risk',
    bg: '#fef2f2',
    border: '#fecaca',
    textColor: '#7f1d1d',
    badgeBg: '#fee2e2',
    badgeText: '#991b1b',
    icon: '⚠',
  },
  achieved: {
    label: 'Achieved',
    bg: '#f0fdf4',
    border: '#bbf7d0',
    textColor: '#14532d',
    badgeBg: '#d1fae5',
    badgeText: '#065f46',
    icon: '✅',
  },
  off_track: {
    label: 'Off Track',
    bg: '#f9fafb',
    border: '#e5e7eb',
    textColor: '#111827',
    badgeBg: '#f3f4f6',
    badgeText: '#1f2937',
    icon: '○',
  },
};

export default function GoalEvaluationCard({ evaluation }: GoalEvaluationCardProps) {
  const statusStyle = statusConfig[evaluation.status] || statusConfig.off_track;

  const formatDate = (isoDate: string | undefined) => {
    if (!isoDate) return 'N/A';
    return new Date(isoDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

 
  return (
    <div style={{
      backgroundColor: statusStyle.bg,
      border: `1px solid ${statusStyle.border}`,
      borderRadius: '8px',
      padding: '24px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '16px'
      }}>
        <div>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            color: statusStyle.textColor,
            marginBottom: '4px'
          }}>
            Goal Status Evaluation Summary
          </h3>
          <div style={{ fontSize: '0.875rem', color: '#4b5563' }}>
            Auto-Evaluated on {formatDate(evaluation.date || evaluation.evaluated_at)}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 12px',
            borderRadius: '9999px',
            fontSize: '0.875rem',
            fontWeight: '500',
            backgroundColor: statusStyle.badgeBg,
            color: statusStyle.badgeText
          }}>
            <span>{statusStyle.icon}</span>
            <span>{statusStyle.label}</span>
          </span>
          
        </div>
      </div>

      {/* Two-column layout for Insights and Recommendations */}
      {((evaluation.insights && evaluation.insights.length > 0) || (evaluation.recommendations && evaluation.recommendations.length > 0)) && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px'
        }}>
          {/* Insights - Left Column */}
          {evaluation.insights && evaluation.insights.length > 0 && (
            <div>
              <div style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: statusStyle.textColor,
                marginBottom: '12px'
              }}>
                🧠 Key Insights
              </div>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '8px'
              }}>
                {evaluation.insights.map((insight, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    fontSize: '0.875rem',
                    color: '#374151',
                    lineHeight: '1.6'
                  }}>
                    <span style={{ 
                      color: '#9ca3af', 
                      marginTop: '2px',
                      flexShrink: 0
                    }}>•</span>
                    <span style={{ flex: 1 }}>{insight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations - Right Column */}
          {evaluation.recommendations && evaluation.recommendations.length > 0 && (
            <div>
              <div style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: statusStyle.textColor,
                marginBottom: '12px'
              }}>
                ✨Recommendations
              </div>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '8px'
              }}>
                {evaluation.recommendations.map((rec, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    fontSize: '0.875rem',
                    color: '#374151',
                    lineHeight: '1.6'
                  }}>
                    <span style={{ 
                      color: '#3b82f6', 
                      marginTop: '2px',
                      flexShrink: 0
                    }}>→</span>
                    <span style={{ flex: 1 }}>{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
