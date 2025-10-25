// ========== GOAL TYPES ==========
// Based on backend DynamoDB schema

export type GoalType = 
  | "savings_target"       // Save X amount by Y date
  | "spending_reduction"   // Reduce category spending to X/month
  | "debt_payoff";         // Pay off X debt by Y date

export type GoalStatus = 
  | "active"               // Currently being tracked
  | "completed"            // Goal achieved
  | "paused"               // Temporarily not tracking
  | "archived"             // No longer relevant
  | "failed";              // Deadline passed without completion

export type EvaluationStatus = 
  | "on_track"             // Meeting required pace
  | "ahead"                // Exceeding required pace
  | "behind"               // Below required pace
  | "at_risk"              // Significantly behind, may miss deadline
  | "achieved";            // Goal completed

export type PaceStatus = 
  | "excellent"            // >120% of required pace
  | "good"                 // 100-120% of required pace
  | "adequate"             // 80-100% of required pace
  | "slow"                 // 60-80% of required pace
  | "critical";            // <60% of required pace

// ========== INTERFACES ==========

export interface GoalTarget {
  target_value: number;        // Target amount (e.g., $10,000 or 160 lbs)
  target_date: string;         // ISO timestamp
  category?: string;           // For spending_reduction: "Dining"
}

export interface GoalProgress {
  // For savings_target type:
  current_amount?: number;     // Current saved amount
  percentage_complete?: number; // 0-100
  
  // For spending_reduction type:
  current_period_spending?: number;
  baseline_spending?: number;
  reduction_achieved?: number;
  
  // Common:
  last_updated: string;        // ISO timestamp
}

export interface GoalEvaluation {
  date?: string;               // Backend uses 'date' field
  evaluated_at?: string;       // Alternative field name (ISO timestamp)
  status: EvaluationStatus;
  pace?: PaceStatus;           // Optional - may not always be present
  insights?: string[];         // Key findings about goal progress
  recommendations?: string[];  // Specific actions to take
  projected_completion?: string; // ISO timestamp or description
  monthly_required?: number;   // Required monthly amount
  
  // Additional fields from backend evaluation_history
  current_amount?: number;
  percentage_complete?: number;
  reduction_percentage?: number;
  current_spending?: number;
  reduction_amount?: number;
  progress_percentage?: number;
  total_contributions?: number;
  detailed_analysis?: string;
}

export interface Goal {
  // ========== IDENTIFICATION ==========
  user_id: string;             // Partition key
  goal_id: string;             // Sort key, UUID
  
  // ========== GOAL DEFINITION ==========
  goal_name: string;           // "Emergency Fund" | "Reduce Dining Spending" (matches backend)
  goal_type: GoalType;         // Renamed from 'type' to match backend
  priority?: "high" | "medium" | "low"; // Optional since backend may not always include
  status: GoalStatus;
  intent?: string;             // User's reason for the goal (optional from context)
  
  // ========== TARGET ==========
  target: GoalTarget;
  
  // ========== PROGRESS ==========
  progress: GoalProgress;
  
  // ========== BASELINE (for tracking starting point) ==========
  baseline?: {
    snapshot_date: string;
    amount?: number;
    historical_average?: number;
    source?: string;
    calculation_period?: string;
  };
  
  // ========== CONTEXT (user preferences) ==========
  context?: {
    intent?: string;
    user_priority?: string;
  };
  
  // ========== EVALUATION HISTORY ==========
  evaluation_history?: GoalEvaluation[];
  latest_evaluation?: GoalEvaluation; // Computed from evaluation_history
  
  // ========== METADATA ==========
  created_at: string;          // ISO timestamp
  updated_at: string;          // ISO timestamp
  archived_at?: string;        // ISO timestamp, if archived
}

// ========== UTILITY TYPES ==========

export interface GoalSummary {
  goal_id: string;
  goal_name: string;          // Updated to match backend
  goal_type: GoalType;        // Updated to match backend
  status: GoalStatus;
  progress_percentage: number;
  evaluation_status?: EvaluationStatus;
}
