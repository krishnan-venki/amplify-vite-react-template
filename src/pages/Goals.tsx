import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGoals } from '../hooks/useGoals';
import GoalsSidebar from '../components/goals/GoalsSidebar';
import GoalDetailView from '../components/goals/GoalDetailView';
import type { Goal } from '../types/goal';

export default function Goals() {
  const { goalId } = useParams<{ goalId?: string }>();
  const navigate = useNavigate();
  const { goals, activeGoals, completedGoals, archivedGoals, loading, error } = useGoals();
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  // Select first active goal by default if no goalId in URL
  useEffect(() => {
    if (!loading && goals.length > 0) {
      if (goalId) {
        const goal = goals.find(g => g.goal_id === goalId);
        if (goal) {
          setSelectedGoal(goal);
        } else {
          // Invalid goalId, redirect to first goal
          if (activeGoals.length > 0) {
            navigate(`/goals/${activeGoals[0].goal_id}`, { replace: true });
          }
        }
      } else {
        // No goalId in URL, select first active goal
        if (activeGoals.length > 0) {
          navigate(`/goals/${activeGoals[0].goal_id}`, { replace: true });
        }
      }
    }
  }, [goalId, goals, activeGoals, loading, navigate]);

  const handleGoalSelect = (goal: Goal) => {
    setSelectedGoal(goal);
    navigate(`/goals/${goal.goal_id}`);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        height: 'calc(100vh - 0px)',
        minHeight: '600px',
        backgroundColor: '#f9fafb'
      }}>
        {/* Sidebar skeleton */}
        <div style={{
          width: '320px',
          backgroundColor: 'white',
          borderRight: '1px solid #e5e7eb',
          flexShrink: 0
        }}>
          <div style={{ 
            padding: '24px', 
            borderBottom: '1px solid #e5e7eb'
          }}>
            <div style={{ 
              height: '32px', 
              backgroundColor: '#e5e7eb', 
              borderRadius: '8px'
            }} className="animate-pulse"></div>
          </div>
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ 
                height: '80px', 
                backgroundColor: '#f3f4f6', 
                borderRadius: '8px'
              }} className="animate-pulse"></div>
            ))}
          </div>
        </div>
        
        {/* Detail skeleton */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ 
              height: '48px', 
              backgroundColor: '#e5e7eb', 
              borderRadius: '8px',
              width: '33%'
            }} className="animate-pulse"></div>
            <div style={{ 
              height: '256px', 
              backgroundColor: '#f3f4f6', 
              borderRadius: '8px'
            }} className="animate-pulse"></div>
            <div style={{ 
              height: '192px', 
              backgroundColor: '#f3f4f6', 
              borderRadius: '8px'
            }} className="animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        height: 'calc(100vh - 0px)',
        minHeight: '600px',
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f9fafb'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            color: '#dc2626', 
            fontSize: '1.125rem', 
            fontWeight: '600', 
            marginBottom: '8px'
          }}>
            Error Loading Goals
          </div>
          <div style={{ color: '#6b7280' }}>{error}</div>
        </div>
      </div>
    );
  }

  if (goals.length === 0) {
    return (
      <div style={{ 
        display: 'flex', 
        height: 'calc(100vh - 0px)',
        minHeight: '600px',
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f9fafb'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '448px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎯</div>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '700', 
            color: '#111827', 
            marginBottom: '12px'
          }}>
            No Goals Yet
          </h2>
          <p style={{ 
            color: '#6b7280', 
            marginBottom: '24px',
            lineHeight: '1.6'
          }}>
            Create your first financial goal to start tracking your progress and get personalized insights.
          </p>
          <button style={{
            padding: '12px 24px',
            backgroundColor: '#2563eb',
            color: 'white',
            borderRadius: '8px',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}>
            Create Your First Goal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 0px)',
      minHeight: '600px',
      backgroundColor: '#f9fafb',
      position: 'relative'
    }}>
      {/* Hero Header - Full Width */}
      <div style={{
        background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)',
        padding: '32px 48px',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0
      }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1600px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            marginBottom: '8px',
            background: 'linear-gradient(135deg, #007AFF 0%, #00D2FF 50%, #34C759 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em'
          }}>
            Goals
          </h1>
          <p style={{
            fontSize: '1rem',
            color: '#e0f2fe',
            fontWeight: '400',
            margin: 0
          }}>
            Track your progress and achieve your dreams
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ 
        display: 'flex', 
        flex: 1,
        minHeight: 0,
        overflow: 'hidden'
      }}>
        {/* Sidebar */}
        <GoalsSidebar
          activeGoals={activeGoals}
          completedGoals={completedGoals}
          archivedGoals={archivedGoals}
          selectedGoalId={selectedGoal?.goal_id}
          onGoalSelect={handleGoalSelect}
        />
        
        {/* Detail View */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto',
          overflowX: 'hidden'
        }}>
          {selectedGoal ? (
            <GoalDetailView goal={selectedGoal} />
          ) : (
            <div style={{ 
              display: 'flex', 
              height: '100%', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#6b7280'
            }}>
              Select a goal to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
