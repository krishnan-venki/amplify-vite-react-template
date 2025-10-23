// TypeScript types for Insights API

export interface RawInsight {
  expected_impact: string;
  full_content: string;
  why_matters: string;
  what_happening: string;
  type: string;
  priority: 'low' | 'medium' | 'high';
  title: string;
  actions: string[];
}

// NEW: Visualization data structure
export interface VisualizationData {
  label: string;             // "September" | "Baseline" | "Dining"
  value: number;             // Decimal in DB, comes as number in JSON
  highlight?: boolean;       // Optional, highlights this datapoint
}

export interface Visualization {
  chart_type: "comparison_bars" | "donut" | "bar" | "line" | "bar_with_trend";
  data: VisualizationData[];
  annotation?: string;       // Optional, brief chart note (max 50 chars)
  trend_line?: number[];     // Optional, for bar_with_trend type
}

// NEW: Key metric structure
export interface KeyMetric {
  primary_value: string;       // "$15,234" | "93%" | "$2,845"
  primary_label: string;       // "September Total" | "Discretionary"
  secondary: string;           // "+$2,845 vs baseline" | "vs 65% baseline"
  icon: "alert" | "trend-up" | "trend-down" | "info" | "warning";
}

// NEW: Full content structure
export interface FullContent {
  what_happening: string;      // 2-3 paragraphs
  why_matters: string;         // 2-3 paragraphs
  detailed_actions: Array<{
    action: string;
    rationale: string;
  }>;
  expected_impact: string;     // Detailed outcome explanation
  community_context?: string;  // Optional peer insights
}

export interface Insight {
  // === IDENTIFICATION ===
  PK: string;                    // "USER#{user_id}"
  SK: string;                    // "INSIGHT#{timestamp}#{type}"
  insight_id: string;            // UUID
  insight_type: string;          // "spending_pattern" | "budget_alert" | "savings_opportunity" | "discretionary_spending" | "lifestyle_inflation" | "seasonal_forecast" | "cash_flow_forecast" | "trend_projection" | "risk_warning" | "opportunity_forecast"
  
  // === DISPLAY PRIORITY ===
  priority: "HIGH" | "MEDIUM" | "LOW";
  status: "active" | "dismissed" | "archived";
  
  // === CARD CONTENT (Primary Display) ===
  title: string;                 // 60-80 chars, headline
  summary: string;               // Max 150 chars, one sentence
  actions: string[];             // 1-3 items, each max 100 chars
  impact: string;                // Max 100 chars, quantified outcome
  
  // === VISUALIZATION DATA (NEW) ===
  visualization?: Visualization;
  
  // === KEY METRIC (Big Number Display) (NEW) ===
  key_metric?: KeyMetric;
  
  // === METADATA ===
  timeframe?: "immediate" | "this_week" | "this_month" | "next_month" | "next_3_months";
  target_month?: string;         // "2024-09" (for monthly reviews)
  confidence_level?: "high" | "medium" | "low";  // For forecasts only
  vertical?: string;             // sagaa_money, sagaa_healthcare, sagaa_education, sagaa_lifeessentials
  
  // === FULL CONTENT (Expandable) (NEW) ===
  full_content: string | FullContent;
  
  // === LIFECYCLE ===
  generated_at: string;          // ISO timestamp
  expires_at: string;            // ISO timestamp
  viewed: boolean;
  viewed_at: string | null;
  dismissed: boolean;
  dismissed_at: string | null;
  
  // === RAW (For debugging) (LEGACY COMPATIBILITY) ===
  raw_insight?: RawInsight;      // Complete original JSON (legacy)
  
  // === LEGACY FIELDS (for backward compatibility) ===
  forecast_horizon?: string;     // e.g., "next_30_days", "next_quarter", "next_6_months"
}

export interface InsightsApiResponse {
  statusCode: number;
  headers: {
    'Content-Type': string;
    'Access-Control-Allow-Origin': string;
  };
  body: {
    insights: Insight[];
    count: number;
  };
}

// Config for mapping insight types to UI elements
export interface InsightTypeConfig {
  vertical: 'money' | 'healthcare' | 'education' | 'life';
  icon: any;
  gradient: string;
  bgGradient: string;
}
