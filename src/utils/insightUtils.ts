// Utility functions for insights

/**
 * Format a date string to relative time (e.g., "2 hours ago", "3 days ago")
 */
import type { Insight } from '../types/insight';
import { TrendingUp, AlertTriangle, DollarSign, Target, Zap } from 'lucide-react';

/**
 * Forecast insight types
 */
export const FORECAST_TYPES = [
  // Original frontend types
  'seasonal_forecast',
  'cash_flow_forecast', 
  'trend_projection',
  'risk_warning',
  'opportunity_forecast',
  // Lambda-generated types
  'seasonal_surge',
  'cash_flow_warning',
  'income_change',
  'spending_trend',
  'budget_risk'
];

/**
 * Check if an insight is a forecast
 */
export function isForecast(insight: Insight): boolean {
  return FORECAST_TYPES.includes(insight.insight_type);
}

/**
 * Get icon for forecast type
 */
export function getForecastIcon(insightType: string) {
  const iconMap: Record<string, any> = {
    // Original types
    'seasonal_forecast': TrendingUp,
    'cash_flow_forecast': DollarSign,
    'trend_projection': TrendingUp,
    'risk_warning': AlertTriangle,
    'opportunity_forecast': Target,
    // Lambda-generated types
    'seasonal_surge': TrendingUp,
    'cash_flow_warning': AlertTriangle,
    'income_change': DollarSign,
    'spending_trend': TrendingUp,
    'budget_risk': AlertTriangle,
  };
  return iconMap[insightType] || Zap;
}

/**
 * Format forecast horizon to display text
 */
export function formatForecastHorizon(horizon?: string): string {
  if (!horizon) return 'Upcoming';
  
  const horizonMap: Record<string, string> = {
    'next_30_days': 'Next 30 days',
    'next_quarter': 'Next quarter',
    'next_6_months': 'Next 6 months',
    'next_year': 'Next year',
  };
  
  return horizonMap[horizon] || horizon.replace(/_/g, ' ');
}

/**
 * Format a timestamp to a relative time string (e.g., "2 hours ago")
 */
export function formatRelativeTime(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffSeconds < 60) {
    return 'just now';
  } else if (diffMinutes < 60) {
    return `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  } else if (diffWeeks < 4) {
    return `${diffWeeks} ${diffWeeks === 1 ? 'week' : 'weeks'} ago`;
  } else {
    return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'} ago`;
  }
}

/**
 * Sort insights by priority (high > medium > low) and then by date (newest first)
 */
export function sortInsightsByPriority<T extends { priority: string; generated_at: string }>(
  insights: T[]
): T[] {
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  
  return [...insights].sort((a, b) => {
    // First sort by priority
    const priorityA = priorityOrder[a.priority as keyof typeof priorityOrder] || 0;
    const priorityB = priorityOrder[b.priority as keyof typeof priorityOrder] || 0;
    
    if (priorityA !== priorityB) {
      return priorityB - priorityA; // Higher priority first
    }
    
    // If same priority, sort by date (newest first)
    const dateA = new Date(a.generated_at).getTime();
    const dateB = new Date(b.generated_at).getTime();
    return dateB - dateA;
  });
}

/**
 * Get priority badge color
 */
export function getPriorityColor(priority: string): string {
  const normalizedPriority = priority.toLowerCase();
  switch (normalizedPriority) {
    case 'high':
      return '#ef4444'; // Red
    case 'medium':
      return '#f59e0b'; // Amber
    case 'low':
      return '#10b981'; // Green
    default:
      return '#6b7280'; // Gray fallback
  }
}
