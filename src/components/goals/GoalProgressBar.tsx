import type { Goal } from '../../types/goal';

interface GoalProgressBarProps {
  goal: Goal;
}

export default function GoalProgressBar({ goal }: GoalProgressBarProps) {
  const progress = goal.progress.percentage_complete || 0;
  const current = goal.progress.current_amount || 0;
  const target = goal.target.target_value;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getProgressColor = () => {
    if (progress >= 75) return '#10b981'; // green-500
    if (progress >= 50) return '#3b82f6'; // blue-500
    if (progress >= 25) return '#eab308'; // yellow-500
    return '#f97316'; // orange-500
  };

  return (
    <div style={{
      backgroundColor: 'transparent',
      padding: '0',
      borderRadius: '0',
      border: 'none'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '12px'
      }}>
        <div>
          <div style={{
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#1e3a8a',
            marginBottom: '4px'
          }}>
            Progress
          </div>
          <div style={{
            fontSize: '1.875rem',
            fontWeight: '700',
            color: '#1e40af'
          }}>
            {progress}%
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.875rem', color: '#1e40af' }}>
            {formatCurrency(current)} of {formatCurrency(target)}
          </div>
          <div style={{
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#1e3a8a',
            marginTop: '4px'
          }}>
            {formatCurrency(target - current)} remaining
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ position: 'relative' }}>
        <div style={{
          height: '16px',
          backgroundColor: 'rgba(191, 219, 254, 0.5)',
          borderRadius: '9999px',
          overflow: 'hidden'
        }}>
          <div
            style={{
              height: '100%',
              backgroundColor: getProgressColor(),
              transition: 'width 0.5s ease-out',
              width: `${Math.min(progress, 100)}%`
            }}
          />
        </div>
        
        {/* Milestone markers (25%, 50%, 75%) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          justifyContent: 'space-between',
          paddingLeft: '4px',
          paddingRight: '4px'
        }}>
          {[25, 50, 75].map((milestone, idx) => (
            <div
              key={milestone}
              style={{
                position: 'relative',
                left: `${idx * 25}%`
              }}
            >
              {progress >= milestone && (
                <div style={{
                  position: 'absolute',
                  top: '-4px',
                  width: '2px',
                  height: '24px',
                  backgroundColor: 'rgba(255, 255, 255, 0.5)'
                }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Milestone labels */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '8px',
        paddingLeft: '4px',
        paddingRight: '4px'
      }}>
        {[0, 25, 50, 75, 100].map(milestone => (
          <div
            key={milestone}
            style={{
              fontSize: '0.75rem',
              color: progress >= milestone ? '#1e40af' : '#3b82f6',
              fontWeight: progress >= milestone ? '600' : '500'
            }}
          >
            {milestone}%
          </div>
        ))}
      </div>
    </div>
  );
}
