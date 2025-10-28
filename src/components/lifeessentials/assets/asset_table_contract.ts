/**
 * Sagaa Life Essentials - Asset Management Data Contract
 * Frontend interface for displaying user assets, maintenance, and evaluations
 */

// ==================== MAIN ASSET INTERFACE ====================

interface Asset {
  // ========== IDENTIFICATION ==========
  userId: string;                    // User identifier
  assetId: string;                   // "ASSET#{uuid}"
  
  // ========== BASIC ASSET INFO ==========
  assetType: AssetType;              // Type category
  assetName: string;                 // User-friendly name
  category: AssetCategory;           // Specific category
  
  // ========== ACQUISITION ==========
  purchaseDate: string;              // ISO date "2018-06-15"
  purchasePrice: number;             // Original purchase price
  currentValue?: number;             // Current estimated value (optional)
  
  // ========== MANUFACTURER INFO ==========
  manufacturer: string;              // "Honda", "Samsung", "Rheem"
  model: string;                     // Model number/name
  serialNumber?: string;             // Optional serial number
  
  // ========== LIFECYCLE ==========
  expectedLifespan: number;          // Expected years of service
  warrantyExpiration?: string;       // ISO date (optional)
  
  // ========== MAINTENANCE TRACKING ==========
  lastMaintenanceDate?: string;      // ISO date of last service
  nextMaintenanceDue?: string;       // ISO date when next service due
  maintenanceInterval?: number;      // Days between maintenance
  maintenanceHistory: MaintenanceRecord[];
  
  // ========== LLM EVALUATION (Core Intelligence) ==========
  llmEvaluation?: AssetEvaluation;   // Most recent AI evaluation
  
  // ========== STATUS ==========
  isActive: boolean;                 // Is this asset still owned?
  createdAt: string;                 // ISO timestamp
  updatedAt: string;                 // ISO timestamp
}

// ==================== SUPPORTING TYPES ====================

type AssetType = 
  | "appliance"           // Kitchen, laundry appliances
  | "vehicle"             // Cars, motorcycles
  | "home_system"         // HVAC, plumbing, electrical
  | "electronics"         // Computers, TVs, etc.
  | "property"            // Real estate
  | "outdoor_equipment";  // Lawn mower, tools, etc.

type AssetCategory =
  | "hvac_plumbing"       // Heating, cooling, water systems
  | "appliance"           // General appliances
  | "vehicle"             // Automotive
  | "electronics"         // Consumer electronics
  | "outdoor"             // Outdoor equipment
  | "structural";         // Roof, foundation, etc.

// ==================== MAINTENANCE RECORD ====================

interface MaintenanceRecord {
  date: string;                      // ISO date "2025-08-20"
  type: string;                      // "Oil change", "Filter replacement"
  cost: number;                      // Cost of maintenance
  provider: string;                  // Who performed service
  notes: string;                     // Additional notes
}

// ==================== ASSET EVALUATION (LLM Generated) ====================

interface AssetEvaluation {
  // ========== EVALUATION METADATA ==========
  lastEvaluatedAt: string;           // ISO timestamp of evaluation
  
  // ========== RISK ASSESSMENT ==========
  risk_score: number;                // 0-100 (higher = more urgent)
  replacement_urgency: "low" | "medium" | "high" | "critical";
  lifespan_remaining: string;        // "6-18 months", "2-3 years"
  estimated_replacement_cost: number;
  
  // ========== CONDITION DETAILS ==========
  condition_assessment: {
    current_condition: "excellent" | "good" | "fair" | "poor" | "critical";
    key_factors: string[];           // Factors affecting condition
    failure_indicators: string[];    // Signs of impending failure
  };
  
  // ========== INSIGHTS & ACTIONS ==========
  insights: string[];                // 3-5 key observations
  recommendations: Recommendation[];
  
  // ========== REPLACEMENT PLANNING ==========
  replacement_planning: {
    recommend_replacement: boolean;
    optimal_replacement_timeframe: "proactive_now" | "within_6_months" | "within_year" | "monitor";
    consequences_of_delay: string;
    seasonal_considerations: string;
  };
}

interface Recommendation {
  action: string;                    // Specific action to take
  reasoning: string;                 // Why this matters
  priority: number;                  // 1-5 (1 = highest)
  estimated_cost: number;            // Cost to execute action
  timeframe: "immediate" | "this_month" | "next_3_months" | "next_6_months" | "next_year";
}

// ==================== DISPLAY HELPERS ====================

interface AssetDisplayData {
  // Computed fields for display
  ageYears: number;                  // Current age in years
  ageMonths: number;                 // Remaining months
  lifespanPercentage: number;        // 0-100% of expected life used
  warrantyStatus: "active" | "expired" | "none";
  maintenanceStatus: "current" | "due_soon" | "overdue";
  daysUntilMaintenance?: number;     // Days until next maintenance
  
  // Risk indicators
  riskLevel: "low" | "medium" | "high" | "critical";
  needsAttention: boolean;           // Quick flag for UI alerts
  
  // Financial
  totalMaintenanceCost: number;      // Sum of all maintenance costs
  replacementBudgetGap?: number;     // If emergency fund insufficient
}

// ==================== API RESPONSE TYPES ====================

interface GetAssetsResponse {
  assets: Asset[];
  summary: {
    total_assets: number;
    high_risk_count: number;
    due_for_maintenance: number;
    total_replacement_cost_estimate: number;
  };
}

interface GetAssetDetailResponse {
  asset: Asset;
  displayData: AssetDisplayData;
  relatedInsights: string[];         // Insight IDs from insights table
}

// ==================== EXPORT ====================

export type {
  Asset,
  AssetType,
  AssetCategory,
  MaintenanceRecord,
  AssetEvaluation,
  Recommendation,
  AssetDisplayData,
  GetAssetsResponse,
  GetAssetDetailResponse
};
