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
  label: string;             // "September" | "Baseline" | "Dining" | "Current Pace"
  value: number;             // Decimal in DB, comes as number in JSON
  highlight?: boolean;       // Optional, highlights this datapoint
  type?: string;             // Optional: "goal" | "warning" | "success" | "source" | "target" for special rendering
  unit?: string;             // Optional: "months" | "dollars" | "$" | "%" for goal charts
  timestamp?: number;        // Optional: Unix timestamp for timeline charts
}

export interface Visualization {
  chart_type: 
    // Original chart types
    | "comparison_bars" 
    | "donut" 
    | "bar" 
    | "line" 
    | "bar_with_trend"
    // New goal-centric chart types
    | "goal_progress_timeline"   // Timeline bars showing current vs accelerated completion
    | "reallocation_flow"        // Money flow from categories to goals
    | "goal_velocity";           // Pace gauge showing current vs required pace
  data: VisualizationData[];
  annotation?: string;       // Optional, brief chart note (max 50 chars)
  trend_line?: number[];     // Optional, for bar_with_trend type
}

// NEW: Key metric structure
export interface KeyMetric {
  primary_value: string;       // "$15,234" | "93%" | "$2,845"
  primary_label: string;       // "September Total" | "Discretionary"
  secondary: string;           // "+$2,845 vs baseline" | "vs 65% baseline"
  icon: "alert" | "trend-up" | "trend-down" | "info" | "warning" | "target" | "clock";  // Added goal-related icons
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

// NEW: Reallocation category for goal insights
export interface ReallocationCategory {
  category: string;            // "Dining" | "Entertainment" | "Shopping"
  current: number;             // Current monthly spending (e.g., 450)
  target: number;              // Target monthly spending (e.g., 300)
  reduction: number;           // Amount to reduce (e.g., 150)
}

export interface Insight {
  // === IDENTIFICATION ===
  PK: string;                    // "USER#{user_id}"
  SK: string;                    // "INSIGHT#{timestamp}#{type}"
  insight_id: string;            // UUID
  insight_type: 
    // Original insight types
    | "spending_pattern"
    | "budget_alert"
    | "savings_opportunity"
    | "discretionary_spending"
    | "lifestyle_inflation"
    | "seasonal_surge"
    | "cash_flow_warning"
    | "income_change"
    | "spending_trend"
    | "budget_risk"
    | "seasonal_forecast"
    | "cash_flow_forecast"
    | "trend_projection"
    | "risk_warning"
    | "opportunity_forecast"
    // New goal-centric types
    | "goal_accelerator"      // Opportunity to speed up goal
    | "goal_blocker"          // Spending delaying goal
    | "goal_at_risk"          // Goal falling behind pace
    | "goal_milestone"        // Progress celebration or warning
    | "goal_reallocation"     // Specific fund movement plan
    | "goal_suggestion";      // Suggested new goal creation
  
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
  
  // === GOAL-SPECIFIC FIELDS (Optional) ===
  goal_context?: {
    goal_id: string;             // Links to specific goal
    goal_name: string;           // "Emergency Fund" | "Reduce Dining"
    goal_type: "savings_target" | "spending_reduction" | "debt_payoff";
    current_status: string;      // "Behind pace by $200/month" | "60% complete"
  };
  
  reallocation_plan?: {
    from_categories: ReallocationCategory[];
    to_goal: string;             // Goal name
    total_monthly_impact: number; // Total amount being reallocated
    timeline_acceleration: string; // "3 months faster" | "Back on track"
  };
  
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
