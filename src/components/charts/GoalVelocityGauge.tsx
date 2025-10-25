import React from 'react';
import { VisualizationData } from '../../types/insight';

interface GoalVelocityGaugeProps {
  data: VisualizationData[];
  gradient?: string;
  compact?: boolean;
}

/**
 * Speedometer-style gauge showing current pace vs required pace for a goal
 * Data format: [{ label: "Current", value: 85 }, { label: "Required", value: 100 }]
 */
const GoalVelocityGauge: React.FC<GoalVelocityGaugeProps> = ({ 
  data, 
  compact = false 
}) => {
  // Extract current and required pace
  const currentPace = data.find(d => d.label?.toLowerCase().includes('current'))?.value || 0;
  const requiredPace = data.find(d => d.label?.toLowerCase().includes('required'))?.value || 100;
  const unit = data[0]?.unit || '%';

  // Calculate percentage for gauge (0-200%, where 100% = on target)
  const percentage = (currentPace / requiredPace) * 100;
  
  // Determine color based on pace
  const getColor = () => {
    if (percentage >= 120) return '#10b981'; // green - excellent
    if (percentage >= 100) return '#3b82f6'; // blue - good
    if (percentage >= 80) return '#f59e0b';  // yellow - adequate
    if (percentage >= 60) return '#f97316';  // orange - slow
    return '#ef4444'; // red - critical
  };

  const getLabel = () => {
    if (percentage >= 120) return 'Excellent Pace';
    if (percentage >= 100) return 'On Track';
    if (percentage >= 80) return 'Adequate Pace';
    if (percentage >= 60) return 'Slow Pace';
    return 'Critical';
  };

  const color = getColor();
  const label = getLabel();

  // Gauge arc calculation (180-degree semicircle)
  const startAngle = 180;
  const endAngle = 360;
  const maxAngle = endAngle - startAngle;
  
  // Clamp percentage between 0-200 for display
  const displayPercentage = Math.min(Math.max(percentage, 0), 200);
  const currentAngle = startAngle + (displayPercentage / 200) * maxAngle;

  // Calculate needle position
  const needleLength = compact ? 60 : 80;
  const centerX = compact ? 100 : 120;
  const centerY = compact ? 100 : 120;
  const needleX = centerX + needleLength * Math.cos((currentAngle - 90) * Math.PI / 180);
  const needleY = centerY + needleLength * Math.sin((currentAngle - 90) * Math.PI / 180);

  // Create arc path for gauge background
  const radius = needleLength;
  const createArc = (start: number, end: number, r: number) => {
    const startRad = (start - 90) * Math.PI / 180;
    const endRad = (end - 90) * Math.PI / 180;
    const x1 = centerX + r * Math.cos(startRad);
    const y1 = centerY + r * Math.sin(startRad);
    const x2 = centerX + r * Math.cos(endRad);
    const y2 = centerY + r * Math.sin(endRad);
    const largeArc = end - start > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  const size = compact ? 200 : 240;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: compact ? '16px' : '24px',
    }}>
      <svg width={size} height={size * 0.65} viewBox={`0 0 ${size} ${size * 0.65}`}>
        {/* Background arc segments */}
        <path
          d={createArc(180, 234, radius)}
          fill="none"
          stroke="#ef4444"
          strokeWidth={compact ? 10 : 12}
          strokeLinecap="round"
          opacity={0.2}
        />
        <path
          d={createArc(234, 270, radius)}
          fill="none"
          stroke="#f97316"
          strokeWidth={compact ? 10 : 12}
          strokeLinecap="round"
          opacity={0.2}
        />
        <path
          d={createArc(270, 306, radius)}
          fill="none"
          stroke="#f59e0b"
          strokeWidth={compact ? 10 : 12}
          strokeLinecap="round"
          opacity={0.2}
        />
        <path
          d={createArc(306, 342, radius)}
          fill="none"
          stroke="#3b82f6"
          strokeWidth={compact ? 10 : 12}
          strokeLinecap="round"
          opacity={0.2}
        />
        <path
          d={createArc(342, 360, radius)}
          fill="none"
          stroke="#10b981"
          strokeWidth={compact ? 10 : 12}
          strokeLinecap="round"
          opacity={0.2}
        />

        {/* Active arc */}
        <path
          d={createArc(180, Math.min(currentAngle, 360), radius)}
          fill="none"
          stroke={color}
          strokeWidth={compact ? 10 : 12}
          strokeLinecap="round"
        />

        {/* Target marker at 270° (100% mark) */}
        <line
          x1={centerX + (radius - 8) * Math.cos((270 - 90) * Math.PI / 180)}
          y1={centerY + (radius - 8) * Math.sin((270 - 90) * Math.PI / 180)}
          x2={centerX + (radius + 8) * Math.cos((270 - 90) * Math.PI / 180)}
          y2={centerY + (radius + 8) * Math.sin((270 - 90) * Math.PI / 180)}
          stroke="#1f2937"
          strokeWidth={3}
          strokeLinecap="round"
        />

        {/* Needle */}
        <line
          x1={centerX}
          y1={centerY}
          x2={needleX}
          y2={needleY}
          stroke={color}
          strokeWidth={compact ? 3 : 4}
          strokeLinecap="round"
        />

        {/* Center dot */}
        <circle
          cx={centerX}
          cy={centerY}
          r={compact ? 6 : 8}
          fill={color}
        />

        {/* Labels */}
        <text
          x={centerX - radius + 10}
          y={centerY + 20}
          fontSize={compact ? 10 : 12}
          fill="#6b7280"
          fontWeight="500"
        >
          0%
        </text>
        <text
          x={centerX - 12}
          y={centerY - radius - 5}
          fontSize={compact ? 10 : 12}
          fill="#6b7280"
          fontWeight="500"
        >
          100%
        </text>
        <text
          x={centerX + radius - 25}
          y={centerY + 20}
          fontSize={compact ? 10 : 12}
          fill="#6b7280"
          fontWeight="500"
        >
          200%
        </text>
      </svg>

      {/* Current value display */}
      <div style={{
        marginTop: compact ? '8px' : '12px',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: compact ? '28px' : '36px',
          fontWeight: 700,
          color: color,
          lineHeight: 1,
        }}>
          {Math.round(currentPace)}{unit}
        </div>
        <div style={{
          fontSize: compact ? '13px' : '15px',
          fontWeight: 600,
          color: '#1f2937',
          marginTop: '8px',
        }}>
          {label}
        </div>
        <div style={{
          fontSize: compact ? '11px' : '12px',
          color: '#6b7280',
          marginTop: '4px',
        }}>
          Required: {Math.round(requiredPace)}{unit}
        </div>
      </div>
    </div>
  );
};

export default GoalVelocityGauge;
