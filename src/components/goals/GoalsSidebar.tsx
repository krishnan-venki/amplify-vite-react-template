import { useState } from 'react';
import type { Goal, GoalType } from '../../types/goal';

interface GoalsSidebarProps {
  activeGoals: Goal[];
  completedGoals: Goal[];
  archivedGoals: Goal[];
  selectedGoalId?: string;
  onGoalSelect: (goal: Goal) => void;
}

const goalTypeLabels: Record<GoalType, string> = {
  savings_target: 'Savings',
  spending_reduction: 'Spending',
  debt_payoff: 'Debt',
};

const goalTypeIcons: Record<GoalType, string> = {
  savings_target: '💰',
  spending_reduction: '📉',
  debt_payoff: '💳',
};

export default function GoalsSidebar({
  activeGoals,
  completedGoals,
  archivedGoals,
  selectedGoalId,
  onGoalSelect,
}: GoalsSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    active: true,
    completed: false,
    archived: false,
  });

  const toggleSection = (section: 'active' | 'completed' | 'archived') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const GoalItem = ({ goal }: { goal: Goal }) => {
    const isSelected = goal.goal_id === selectedGoalId;
    const progress = goal.progress.percentage_complete || 0;
    const icon = goalTypeIcons[goal.goal_type];
    const typeLabel = goalTypeLabels[goal.goal_type];

    console.log('🎯 Rendering goal item:', { 
      goal_id: goal.goal_id, 
      goal_name: goal.goal_name, 
      goal_type: goal.goal_type,
      progress 
    });

    return (
      <button
        onClick={() => onGoalSelect(goal)}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '12px',
          borderRadius: '8px',
          transition: 'all 0.2s',
          backgroundColor: isSelected ? '#eff6ff' : 'white',
          border: isSelected ? '2px solid #3b82f6' : '1px solid #e5e7eb',
          boxShadow: isSelected ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          if (!isSelected) {
            e.currentTarget.style.borderColor = '#d1d5db';
            e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isSelected) {
            e.currentTarget.style.borderColor = '#e5e7eb';
            e.currentTarget.style.boxShadow = 'none';
          }
        }}
      >
        {/* Goal Name Header */}
        <div style={{ marginBottom: '12px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            marginBottom: '4px'
          }}>
            <span style={{ fontSize: '1.5rem' }}>{icon}</span>
            <div style={{ 
              fontSize: '1rem', 
              fontWeight: '700', 
              color: '#111827',
              flex: 1
            }}>
              {goal.goal_name || 'Unnamed Goal'}
            </div>
          </div>
          <div style={{ 
            fontSize: '0.75rem', 
            color: '#6b7280',
            marginLeft: '32px'
          }}>
            {typeLabel}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            fontSize: '0.75rem', 
            color: '#4b5563', 
            marginBottom: '4px' 
          }}>
            <span>{progress}%</span>
            <span>{formatCurrency(goal.target.target_value)}</span>
          </div>
          <div style={{ 
            height: '8px', 
            backgroundColor: '#e5e7eb', 
            borderRadius: '9999px', 
            overflow: 'hidden' 
          }}>
            <div
              style={{
                height: '100%',
                transition: 'width 0.3s',
                width: `${Math.min(progress, 100)}%`,
                backgroundColor: 
                  progress >= 75 ? '#10b981' :
                  progress >= 50 ? '#3b82f6' :
                  progress >= 25 ? '#eab308' :
                  '#f97316'
              }}
            />
          </div>
        </div>

        {/* Status if recent evaluation exists */}
        {goal.latest_evaluation && (
          <div style={{ fontSize: '0.75rem' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '2px 8px',
              borderRadius: '4px',
              backgroundColor: 
                goal.latest_evaluation.status === 'on_track' ? '#d1fae5' :
                goal.latest_evaluation.status === 'ahead' ? '#dbeafe' :
                goal.latest_evaluation.status === 'behind' ? '#fed7aa' :
                goal.latest_evaluation.status === 'at_risk' ? '#fee2e2' :
                '#f3f4f6',
              color:
                goal.latest_evaluation.status === 'on_track' ? '#065f46' :
                goal.latest_evaluation.status === 'ahead' ? '#1e40af' :
                goal.latest_evaluation.status === 'behind' ? '#9a3412' :
                goal.latest_evaluation.status === 'at_risk' ? '#991b1b' :
                '#374151'
            }}>
              {goal.latest_evaluation.status === 'on_track' ? '✓ On Track' :
               goal.latest_evaluation.status === 'ahead' ? '↑ Ahead' :
               goal.latest_evaluation.status === 'behind' ? '↓ Behind' :
               goal.latest_evaluation.status === 'at_risk' ? '⚠ At Risk' :
               'Off Track'}
            </span>
          </div>
        )}
      </button>
    );
  };

  const SectionHeader = ({
    title,
    count,
    section,
    icon,
  }: {
    title: string;
    count: number;
    section: 'active' | 'completed' | 'archived';
    icon: string;
  }) => {
    const isExpanded = expandedSections[section];
    
    return (
      <button
        onClick={() => toggleSection(section)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px',
          borderRadius: '8px',
          transition: 'background-color 0.2s',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#f9fafb';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>{icon}</span>
          <span style={{ fontWeight: '600', color: '#111827', fontSize: '0.875rem' }}>
            {title}
          </span>
          <span style={{
            fontSize: '0.75rem',
            color: '#6b7280',
            backgroundColor: '#f3f4f6',
            padding: '2px 8px',
            borderRadius: '9999px'
          }}>
            {count}
          </span>
        </div>
        <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
          {isExpanded ? '▼' : '▶'}
        </span>
      </button>
    );
  };

  return (
    <div style={{
      width: '320px',
      backgroundColor: '#f9fafb',
      borderRight: '1px solid #e5e7eb',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      {/* Scrollable goal list */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {/* Active Goals */}
        {activeGoals.length > 0 && (
          <div>
            <SectionHeader
              title="Active Goals"
              count={activeGoals.length}
              section="active"
              icon="🎯"
            />
            {expandedSections.active && (
              <div style={{
                marginTop: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                {activeGoals.map(goal => (
                  <GoalItem key={goal.goal_id} goal={goal} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Completed Goals */}
        {completedGoals.length > 0 && (
          <div>
            <SectionHeader
              title="Completed Goals"
              count={completedGoals.length}
              section="completed"
              icon="✅"
            />
            {expandedSections.completed && (
              <div style={{
                marginTop: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                {completedGoals.map(goal => (
                  <GoalItem key={goal.goal_id} goal={goal} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Archived Goals */}
        {archivedGoals.length > 0 && (
          <div>
            <SectionHeader
              title="Archived Goals"
              count={archivedGoals.length}
              section="archived"
              icon="📦"
            />
            {expandedSections.archived && (
              <div style={{
                marginTop: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                {archivedGoals.map(goal => (
                  <GoalItem key={goal.goal_id} goal={goal} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer - Create Goal Button */}
      <div style={{
        padding: '16px',
        borderTop: '1px solid #e5e7eb',
        backgroundColor: 'white'
      }}>
        <button style={{
          width: '100%',
          padding: '10px 16px',
          backgroundColor: '#ff9900',
          color: '#111',
          borderRadius: '8px',
          fontWeight: '500',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transition: 'background-color 0.2s',
          boxShadow: '0 6px 16px rgba(255, 153, 0, 0.25)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#e68a00';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#ff9900';
        }}>
          <span style={{ fontSize: '1.125rem' }}>+</span>
          <span>Create New Goal</span>
        </button>
      </div>
    </div>
  );
}
