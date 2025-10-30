import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGoals } from '../hooks/useGoals';
import GoalsSidebar from '../components/goals/GoalsSidebar';
import GoalDetailView from '../components/goals/GoalDetailView';
import GoalVerticalFilter from '../components/goals/GoalVerticalFilter';
import type { Goal } from '../types/goal';
import heroImage from '../assets/Goals_Hero_Image.png';

export default function Goals() {
  const { goalId } = useParams<{ goalId?: string }>();
  const navigate = useNavigate();
  const { goals, activeGoals, completedGoals, archivedGoals, loading, error } = useGoals();
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [selectedVertical, setSelectedVertical] = useState<string>('all');

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

  // Handle vertical filter change
  const handleVerticalSelect = (verticalId: string) => {
    setSelectedVertical(verticalId);
    
    // Auto-select first goal in the filtered list
    const filtered = filterGoalsByVertical(activeGoals);
    if (filtered.length > 0) {
      const firstGoal = filtered[0];
      setSelectedGoal(firstGoal);
      navigate(`/goals/${firstGoal.goal_id}`);
    } else {
      // Check completed and archived if no active goals
      const completedFiltered = filterGoalsByVertical(completedGoals);
      if (completedFiltered.length > 0) {
        const firstGoal = completedFiltered[0];
        setSelectedGoal(firstGoal);
        navigate(`/goals/${firstGoal.goal_id}`);
      } else {
        const archivedFiltered = filterGoalsByVertical(archivedGoals);
        if (archivedFiltered.length > 0) {
          const firstGoal = archivedFiltered[0];
          setSelectedGoal(firstGoal);
          navigate(`/goals/${firstGoal.goal_id}`);
        }
      }
    }
    
    // Helper function for filtering (defined inline to use new verticalId)
    function filterGoalsByVertical(goalsList: Goal[]) {
      if (verticalId === 'all') return goalsList;
      return goalsList.filter(goal => goal.vertical === verticalId);
    }
  };

  // Filter goals by vertical
  const filterGoalsByVertical = (goalsList: Goal[]) => {
    if (selectedVertical === 'all') return goalsList;
    return goalsList.filter(goal => goal.vertical === selectedVertical);
  };

  const filteredActiveGoals = filterGoalsByVertical(activeGoals);
  const filteredCompletedGoals = filterGoalsByVertical(completedGoals);
  const filteredArchivedGoals = filterGoalsByVertical(archivedGoals);

  // Calculate vertical counts
  const verticalCounts = goals.reduce((acc, goal) => {
    const vertical = goal.vertical || 'sagaa_money'; // default to money if not set
    acc[vertical] = (acc[vertical] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const verticals = [
    {
      id: 'all',
      name: 'All Goals',
      count: goals.length,
      gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    },
    {
      id: 'sagaa_money',
      name: 'Money',
      count: verticalCounts['sagaa_money'] || 0,
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    },
    {
      id: 'sagaa_healthcare',
      name: 'Healthcare',
      count: verticalCounts['sagaa_healthcare'] || 0,
      gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    },
    {
      id: 'sagaa_education',
      name: 'Education',
      count: verticalCounts['sagaa_education'] || 0,
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    },
    {
      id: 'sagaa_lifeessentials',
      name: 'Life Essentials',
      count: verticalCounts['sagaa_lifeessentials'] || 0,
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    },
  ];

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
        overflow: 'visible',
        flexShrink: 0
      }}>
        <div style={{ 
          position: 'relative', 
          zIndex: 1, 
          maxWidth: '1400px', 
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '32px'
        }}>
          {/* Hero Image - Left side */}
          <div style={{ flexShrink: 0 }}>
            <img 
              src={heroImage} 
              alt="Sagaa Goals" 
              style={{ 
                width: '240px',
                height: 'auto',
                objectFit: 'contain',
                display: 'block'
              }} 
            />
          </div>

          {/* Title Section */}
          <div style={{ flex: 1 }}>
            <h1 style={{
              fontSize: '36px',
              fontWeight: '100',
              marginBottom: '8px',
              lineHeight: '1.4',
              color: 'white'
            }}>
              <span style={{
                background: 'linear-gradient(135deg, #007AFF 0%, #00D2FF 50%, #34C759 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
                display: 'inline-block',
                paddingBottom: '0.18em'
              }}>
                Your Goals
              </span>
            </h1>
            <p style={{
              fontSize: '16px',
              color: '#d1d5db',
              marginBottom: '0'
            }}>
              Stay updated with the progress made on your goals, with auto-evaluations and insights to help you make better decisions.
            </p>
          </div>
        </div>
        
        {/* Decorative Background Elements */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '-30px',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0
        }} />
      </div>

      {/* Main Content Area */}
      <div style={{ 
        display: 'flex', 
        flex: 1,
        minHeight: 0,
        overflow: 'hidden'
      }}>
        {/* Vertical Filter */}
        <GoalVerticalFilter
          verticals={verticals}
          selectedVertical={selectedVertical}
          onSelectVertical={handleVerticalSelect}
        />
        
        {/* Sidebar */}
        <GoalsSidebar
          activeGoals={filteredActiveGoals}
          completedGoals={filteredCompletedGoals}
          archivedGoals={filteredArchivedGoals}
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
