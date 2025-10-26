import React from 'react';

interface GoalVerticalFilterProps {
  verticals: Array<{
    id: string;
    name: string;
    count: number;
    gradient: string;
  }>;
  selectedVertical: string;
  onSelectVertical: (verticalId: string) => void;
}

// Emoji mapping for each vertical
const VERTICAL_EMOJI: Record<string, string> = {
  'all': '📊',
  'sagaa_money': '💰',
  'sagaa_healthcare': '❤️',
  'sagaa_education': '🎓',
  'sagaa_lifeessentials': '🏠',
};

// Extract primary color from gradient
const getPrimaryColor = (gradient: string): string => {
  const match = gradient.match(/#[0-9a-f]{6}/i);
  return match ? match[0] : '#3b82f6';
};

const GoalVerticalFilter: React.FC<GoalVerticalFilterProps> = ({
  verticals,
  selectedVertical,
  onSelectVertical,
}) => {
  return (
    <div
      style={{
        width: '60px',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e5e7eb',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        paddingTop: '16px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          padding: '0',
        }}
      >
        {verticals.map((vertical, index) => {
          const isActive = selectedVertical === vertical.id;
          const isDisabled = vertical.count === 0;
          const primaryColor = vertical.id === 'all' ? '#6366f1' : getPrimaryColor(vertical.gradient);

          return (
            <div key={vertical.id} style={{ position: 'relative' }}>
              <button
                onClick={() => !isDisabled && onSelectVertical(vertical.id)}
                disabled={isDisabled}
                title={isDisabled ? `No ${vertical.name} goals yet` : vertical.name}
                style={{
                  width: '100%',
                  height: '56px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  background: isActive
                    ? `linear-gradient(135deg, ${primaryColor}15, ${primaryColor}25)`
                    : 'transparent',
                  borderLeft: isActive ? `3px solid ${primaryColor}` : '3px solid transparent',
                  borderRadius: '0 8px 8px 0',
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  opacity: isDisabled ? 0.3 : 1,
                  transition: 'all 0.2s ease',
                  padding: '8px',
                  position: 'relative',
                  transform: isActive ? 'scale(1.02)' : 'scale(1)',
                }}
                onMouseEnter={(e) => {
                  if (!isDisabled && !isActive) {
                    e.currentTarget.style.background = `${primaryColor}08`;
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isDisabled && !isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.transform = 'scale(1)';
                  }
                }}
              >
                <div
                  style={{
                    fontSize: '28px',
                    lineHeight: 1,
                    filter: isDisabled ? 'grayscale(100%)' : 'none',
                  }}
                >
                  {VERTICAL_EMOJI[vertical.id] || '📊'}
                </div>
                
                {/* Count badge */}
                {vertical.count > 0 && (
                  <div
                    style={{
                      fontSize: '9px',
                      fontWeight: '700',
                      color: isActive ? primaryColor : '#6b7280',
                      marginTop: '2px',
                      backgroundColor: isActive ? 'white' : '#f3f4f6',
                      padding: '1px 5px',
                      borderRadius: '8px',
                      minWidth: '18px',
                      textAlign: 'center',
                    }}
                  >
                    {vertical.count}
                  </div>
                )}
              </button>
              
              {/* Separator line */}
              {index !== verticals.length - 1 && (
                <div
                  style={{
                    width: '40px',
                    height: '1px',
                    background: '#e5e7eb',
                    margin: '4px auto',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GoalVerticalFilter;
