import { useState, useEffect } from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';
import API_ENDPOINTS from '../config/api';
import type { Goal } from '../types/goal';

interface UseGoalsResult {
  goals: Goal[];
  activeGoals: Goal[];
  completedGoals: Goal[];
  archivedGoals: Goal[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useGoals(): UseGoalsResult {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      setError(null);

      const session = await fetchAuthSession();
      const token = session.tokens?.idToken?.toString();

      if (!token) {
        throw new Error('No authentication token available');
      }

      const response = await fetch(API_ENDPOINTS.GOALS, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch goals: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('🎯 Goals API Response:', data);
      console.log('🎯 Goals array:', data.goals);
      
      // Process goals to extract latest_evaluation from evaluation_history
      const goalsData = (data.goals || []).map((goal: Goal) => {
        // If evaluation_history exists and has items, extract the latest one
        if (goal.evaluation_history && goal.evaluation_history.length > 0) {
          const latestEval = goal.evaluation_history[goal.evaluation_history.length - 1];
          return {
            ...goal,
            latest_evaluation: {
              evaluated_at: latestEval.date || latestEval.evaluated_at,
              status: latestEval.status,
              pace: latestEval.pace || 'adequate', // Default if not present
              insights: latestEval.insights || [],
              recommendations: latestEval.recommendations || [],
              projected_completion: latestEval.projected_completion,
              monthly_required: latestEval.monthly_required
            }
          };
        }
        return goal;
      });
      
      console.log('🎯 Processed goals with evaluations:', goalsData);
      console.log('🎯 Goals count:', goalsData.length);
      
      setGoals(goalsData);
    } catch (err) {
      console.error('Error fetching goals:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch goals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  // Separate goals by status
  const activeGoals = goals.filter(g => g.status === 'active');
  const completedGoals = goals.filter(g => g.status === 'completed');
  const archivedGoals = goals.filter(g => g.status === 'archived');

  return {
    goals,
    activeGoals,
    completedGoals,
    archivedGoals,
    loading,
    error,
    refetch: fetchGoals,
  };
}
