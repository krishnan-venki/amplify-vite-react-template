import type { GoalStatus } from '../../types/goal';

interface GoalStatusBadgeProps {
  status: GoalStatus;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig: Record<GoalStatus, { label: string; bg: string; text: string; border: string; icon: string }> = {
  active: {
    label: 'Active',
    bg: '#dbeafe',
    text: '#1e40af',
    border: '#bfdbfe',
    icon: '🎯',
  },
  completed: {
    label: 'Completed',
    bg: '#d1fae5',
    text: '#065f46',
    border: '#a7f3d0',
    icon: '✅',
  },
  paused: {
    label: 'Paused',
    bg: '#fef3c7',
    text: '#92400e',
    border: '#fde68a',
    icon: '⏸',
  },
  archived: {
    label: 'Archived',
    bg: '#f3f4f6',
    text: '#1f2937',
    border: '#e5e7eb',
    icon: '📦',
  },
  failed: {
    label: 'Failed',
    bg: '#fee2e2',
    text: '#991b1b',
    border: '#fecaca',
    icon: '❌',
  },
};

export default function GoalStatusBadge({ status, size = 'md' }: GoalStatusBadgeProps) {
  const config = statusConfig[status];
  
  const sizeStyles = {
    sm: { fontSize: '0.75rem', padding: '2px 8px' },
    md: { fontSize: '0.875rem', padding: '4px 12px' },
    lg: { fontSize: '1rem', padding: '6px 16px' },
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        borderRadius: '9999px',
        fontWeight: '500',
        border: `1px solid ${config.border}`,
        backgroundColor: config.bg,
        color: config.text,
        ...sizeStyles[size]
      }}
    >
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </span>
  );
}
