import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import type { Goal } from '../../types/goal';
import { useInsights } from '../../hooks/useInsights';
import GoalProgressBar from './GoalProgressBar';
import GoalStatusBadge from './GoalStatusBadge';
import GoalEvaluationCard from './GoalEvaluationCard';
import InsightChartRenderer from '../InsightChartRenderer';

interface GoalDetailViewProps {
  goal: Goal;
}

export default function GoalDetailView({ goal }: GoalDetailViewProps) {
  const navigate = useNavigate();
  
  // Fetch all insights and filter for this goal
  const { data: allInsights = [] } = useInsights();
  
  // Filter insights that have goal_context matching this goal
  // Check both goal_context.goal_id and direct goal_id field
  const insights = allInsights.filter(insight => {
    const goalId = insight.goal_context?.goal_id || (insight as any).goal_id;
    return goalId === goal.goal_id;
  });

  useEffect(() => {
    console.log('🎯 All insights:', allInsights.length);
    console.log('🎯 Filtering for goal:', goal.goal_id);
    console.log('🎯 Filtered insights:', insights.length, insights);
    console.log('🎯 Insight details:', insights.map(i => ({
      id: i.insight_id,
      insight_type: i.insight_type,
      title: i.title,
      has_reallocation_plan: !!(i as any).reallocation_plan,
      goal_id: i.goal_context?.goal_id || (i as any).goal_id
    })));
  }, [allInsights, goal.goal_id, insights]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getGoalTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      savings_target: 'Savings Goal',
      spending_reduction: 'Spending Reduction',
      debt_payoff: 'Debt Payoff',
    };
    return labels[type] || type;
  };

  const getGoalIcon = (type: string) => {
    const icons: Record<string, string> = {
      savings_target: '💰',
      spending_reduction: '📉',
      debt_payoff: '💳',
    };
    return icons[type] || '🎯';
  };

  const daysUntilTarget = Math.ceil(
    (new Date(goal.target.target_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  console.log('🎯 Rendering GoalDetailView:', {
    goal_id: goal.goal_id,
    goal_name: goal.goal_name,
    goal_type: goal.goal_type,
    status: goal.status,
    progress: goal.progress.percentage_complete
  });

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
          <div style={{ fontSize: '4rem' }}>{getGoalIcon(goal.goal_type)}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <h1 style={{ 
                fontSize: '2.25rem', 
                fontWeight: '400', 
                color: '#111827',
                margin: 0,
                lineHeight: 1.2
              }}>
                {goal.goal_name || 'Unnamed Goal'}
              </h1>
              <GoalStatusBadge status={goal.status} size="lg" />
              
              {/* Ask Sagaa Button */}
              <button
                onClick={() => {
                  // Find the first insight related to this goal to pass as context
                  const goalInsight = insights.length > 0 ? insights[0] : null;
                  
                  navigate('/chat', {
                    state: {
                      context: {
                        type: 'insight',
                        vertical: 'sagaa_money',
                        insight_id: goalInsight?.insight_id || `goal_${goal.goal_id}`,
                        title: goalInsight?.title || `Ask about ${goal.goal_name}`,
                        summary: goalInsight?.summary || goal.intent || `Discuss your ${goal.goal_name} goal`,
                        priority: goalInsight?.priority || 'medium',
                        gradient: 'linear-gradient(135deg, #10b981 0%, #0d9488 100%)',
                        visualization: goalInsight?.visualization,
                        goal_context: {
                          goal_id: goal.goal_id,
                          goal_name: goal.goal_name,
                          goal_type: goal.goal_type,
                          current_amount: goal.progress.current_amount,
                          target_amount: goal.target.target_value,
                          progress_percentage: goal.progress.percentage_complete
                        },
                        reallocation_plan: goalInsight ? (goalInsight as any).reallocation_plan : undefined,
                        actions: goalInsight?.actions,
                        what_happening: typeof goalInsight?.full_content === 'object'
                          ? goalInsight.full_content?.what_happening
                          : undefined,
                        why_matters: typeof goalInsight?.full_content === 'object'
                          ? goalInsight.full_content?.why_matters
                          : undefined
                      }
                    }
                  });
                }}
                style={{
                  marginLeft: 'auto',
                  border: '1px solid #d1d5db',
                  background: 'white',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  padding: '10px 18px',
                  transition: 'all 0.2s ease',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: '#7c3aed',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f5f3ff';
                  e.currentTarget.style.borderColor = '#7c3aed';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.borderColor = '#d1d5db';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                }}
                title="Ask Sagaa about this goal"
              >
                <MessageCircle size={18} strokeWidth={2.5} />
                <span>Ask Sagaa</span>
              </button>
            </div>
            <div style={{ 
              fontSize: '1rem', 
              color: '#6b7280',
              fontWeight: '500'
            }}>
              {getGoalTypeLabel(goal.goal_type)}
            </div>
          </div>
        </div>

        {/* Intent with Progress Bar */}
        {(goal.intent || goal.context?.intent) && (
          <div style={{ 
            backgroundColor: '#eff6ff', 
            borderLeft: '4px solid #3b82f6', 
            padding: '16px', 
            borderRadius: '0 8px 8px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '24px'
          }}>
            {/* Left: Intent Text and Target Date */}
            <div style={{ flex: 0.8, minWidth: 0 }}>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1e3a8a', marginBottom: '4px' }}>
                Your Goal
              </div>
              <div style={{ color: '#1e40af', lineHeight: 1.6, marginBottom: '12px' }}>
                {goal.intent || goal.context?.intent}
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                fontSize: '0.875rem',
                color: '#1e40af'
              }}>
                <span style={{ fontWeight: '600' }}>Target Date:</span>
                <span style={{ fontWeight: '700', fontSize: '1rem' }}>
                  {formatDate(goal.target.target_date)}
                </span>
                <span style={{ 
                  marginLeft: '4px',
                  color: daysUntilTarget < 30 ? '#ea580c' : '#1e40af',
                  fontWeight: '500'
                }}>
                  ({daysUntilTarget > 0 ? `${daysUntilTarget} days remaining` : 'Overdue'})
                </span>
              </div>
            </div>
            
            {/* Right: Progress Bar */}
            <div style={{ flex: 1.2, minWidth: '350px' }}>
              <GoalProgressBar goal={goal} />
            </div>
          </div>
        )}
      </div>

      {/* Latest Evaluation */}
      {goal.latest_evaluation && (
        <div style={{ marginBottom: '32px' }}>
          <GoalEvaluationCard evaluation={goal.latest_evaluation} />
        </div>
      )}

      {/* Goal Insights Section - Simplified for Goals Page */}
      {insights.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          {insights.map(insight => {
            const hasReallocationPlan = !!(insight as any).reallocation_plan;
            
            return (
              <div key={insight.insight_id} style={{
                background: hasReallocationPlan 
                  ? 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)'
                  : 'white',
                borderRadius: '12px',
                padding: '24px',
                border: hasReallocationPlan ? '1px solid #0369a1' : '1px solid #e5e7eb',
                boxShadow: hasReallocationPlan ? '0 4px 6px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.05)',
                marginBottom: '16px'
              }}>
                {/* Title */}
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: hasReallocationPlan ? '#ffffff' : '#111827',
                  marginBottom: '12px',
                  lineHeight: '1.4'
                }}>
                  {hasReallocationPlan ? 'Fund reallocation possibilities' : insight.title}
                </h3>

                {/* Summary */}
                <p style={{
                  fontSize: '0.95rem',
                  color: hasReallocationPlan ? '#e0f2fe' : '#6b7280',
                  lineHeight: '1.6',
                  marginBottom: hasReallocationPlan ? '24px' : '0'
                }}>
                  {hasReallocationPlan ? (
                    <>
                      <span style={{ fontWeight: '500', color: '#ffffff' }}>Analysis of your expenses indicates that </span>
                      {insight.summary.charAt(0).toLowerCase() + insight.summary.slice(1)}
                    </>
                  ) : (
                    insight.summary
                  )}
                </p>

                {/* Reallocation Chart if available */}
                {hasReallocationPlan && (
                  <div>
                    <InsightChartRenderer 
                      visualization={{
                        chart_type: 'reallocation_flow',
                        data: [
                          ...((insight as any).reallocation_plan.from_categories || []).map((cat: any) => ({
                            label: cat.category,
                            value: -cat.reduction,
                            type: 'source'
                          })),
                          {
                            label: (insight as any).reallocation_plan.to_goal || 'Goal',
                            value: (insight as any).reallocation_plan.total_monthly_impact || 0,
                            type: 'target'
                          }
                        ]
                      }}
                      gradient="transparent"
                      compact={false}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Monthly Progress Section (if applicable) */}
      {goal.progress.current_period_spending !== undefined && (
        <div style={{ 
          backgroundColor: 'white', 
          padding: '24px', 
          borderRadius: '8px', 
          border: '1px solid #e5e7eb', 
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)' 
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
            This Month's Activity
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '4px' }}>Current Period</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827' }}>
                {formatCurrency(goal.progress.current_period_spending)}
              </div>
            </div>
            {goal.latest_evaluation?.monthly_required && (
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '4px' }}>Required Monthly</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827' }}>
                  {formatCurrency(goal.latest_evaluation.monthly_required)}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
