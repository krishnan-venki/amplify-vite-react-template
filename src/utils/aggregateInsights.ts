import { Insight } from '../types/insight';
import { isForecast } from './insightUtils';

export interface VerticalAggregation {
  vertical: string;
  totalCount: number;
  
  // NEW: Type breakdown (insights vs forecasts)
  typeBreakdown: {
    insights: number;
    forecasts: number;
  };
  
  priorityBreakdown: {
    high: number;
    medium: number;
    low: number;
  };
  
  // NEW: Separate priority breakdown for insights and forecasts
  insightPriorityBreakdown: {
    high: number;
    medium: number;
    low: number;
  };
  
  forecastPriorityBreakdown: {
    high: number;
    medium: number;
    low: number;
  };
  
  newCount: number;
  viewedCount: number;
  insights: Insight[];
}

export interface AggregatedInsights {
  [key: string]: VerticalAggregation;
}

/**
 * Aggregates insights by vertical and calculates statistics
 * Now includes type breakdown (insights vs forecasts)
 */
export const aggregateInsightsByVertical = (insights: Insight[]): AggregatedInsights => {
  const aggregated: AggregatedInsights = {};

  insights.forEach((insight) => {
    const vertical = insight.vertical || 'sagaa_money'; // Default to money if not specified

    if (!aggregated[vertical]) {
      aggregated[vertical] = {
        vertical,
        totalCount: 0,
        typeBreakdown: {
          insights: 0,
          forecasts: 0,
        },
        priorityBreakdown: {
          high: 0,
          medium: 0,
          low: 0,
        },
        insightPriorityBreakdown: {
          high: 0,
          medium: 0,
          low: 0,
        },
        forecastPriorityBreakdown: {
          high: 0,
          medium: 0,
          low: 0,
        },
        newCount: 0,
        viewedCount: 0,
        insights: [],
      };
    }

    // Increment total count
    aggregated[vertical].totalCount += 1;

    // Determine if this is a forecast or insight
    const isInsightForecast = isForecast(insight);
    
    // Update type breakdown
    if (isInsightForecast) {
      aggregated[vertical].typeBreakdown.forecasts += 1;
    } else {
      aggregated[vertical].typeBreakdown.insights += 1;
    }

    // Update priority breakdown (overall)
    const priority = insight.priority || 'medium';
    if (priority in aggregated[vertical].priorityBreakdown) {
      aggregated[vertical].priorityBreakdown[priority as keyof typeof aggregated[typeof vertical]['priorityBreakdown']] += 1;
    }
    
    // Update separate priority breakdowns for insights vs forecasts
    if (isInsightForecast) {
      if (priority in aggregated[vertical].forecastPriorityBreakdown) {
        aggregated[vertical].forecastPriorityBreakdown[priority as keyof typeof aggregated[typeof vertical]['forecastPriorityBreakdown']] += 1;
      }
    } else {
      if (priority in aggregated[vertical].insightPriorityBreakdown) {
        aggregated[vertical].insightPriorityBreakdown[priority as keyof typeof aggregated[typeof vertical]['insightPriorityBreakdown']] += 1;
      }
    }

    // Update new/viewed count
    if (!insight.viewed) {
      aggregated[vertical].newCount += 1;
    } else {
      aggregated[vertical].viewedCount += 1;
    }

    // Add insight to the list
    aggregated[vertical].insights.push(insight);
  });

  return aggregated;
};

/**
 * Gets aggregation data for a specific vertical
 */
export const getVerticalAggregation = (
  insights: Insight[],
  vertical: string
): VerticalAggregation | null => {
  const aggregated = aggregateInsightsByVertical(insights);
  return aggregated[vertical] || null;
};

/**
 * Gets the percentage for each priority level
 */
export const getPriorityPercentages = (priorityBreakdown: VerticalAggregation['priorityBreakdown']) => {
  const total = priorityBreakdown.high + priorityBreakdown.medium + priorityBreakdown.low;
  
  if (total === 0) {
    return { high: 0, medium: 0, low: 0 };
  }

  return {
    high: Math.round((priorityBreakdown.high / total) * 100),
    medium: Math.round((priorityBreakdown.medium / total) * 100),
    low: Math.round((priorityBreakdown.low / total) * 100),
  };
};
