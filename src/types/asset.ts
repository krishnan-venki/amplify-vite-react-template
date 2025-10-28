/**
 * Asset types matching backend contract from asset_table_contract.ts
 */

export type AssetType = 
  | "appliance"
  | "vehicle"
  | "home_system"
  | "electronics"
  | "property"
  | "outdoor_equipment";

export type AssetCategory =
  | "hvac_plumbing"
  | "appliance"
  | "vehicle"
  | "electronics"
  | "outdoor"
  | "structural";

export type Condition = "excellent" | "good" | "fair" | "poor" | "critical";
export type ReplacementUrgency = "low" | "medium" | "high" | "critical";
export type OptimalReplacementTimeframe = "proactive_now" | "within_6_months" | "within_year" | "monitor";
export type WarrantyStatus = "active" | "expired" | "none";
export type MaintenanceStatus = "current" | "due_soon" | "overdue";
export type RiskLevel = "low" | "medium" | "high" | "critical";

export interface MaintenanceRecord {
  date: string;                      // ISO date
  type: string;                      // "Oil change", "Filter replacement"
  cost: number;
  provider: string;
  notes: string;
}

export interface Recommendation {
  action: string;
  reasoning: string;
  priority: number;                  // 1-5 (1 = highest)
  estimated_cost: number;
  timeframe: "immediate" | "this_month" | "next_3_months" | "next_6_months" | "next_year";
}

export interface AssetEvaluation {
  lastEvaluatedAt: string;           // ISO timestamp
  risk_score: number;                // 0-100
  replacement_urgency: ReplacementUrgency;
  lifespan_remaining: string;        // "6-18 months"
  estimated_replacement_cost: number;
  condition_assessment: {
    current_condition: Condition;
    key_factors: string[];
    failure_indicators: string[];
  };
  insights: string[];
  recommendations: Recommendation[];
  replacement_planning: {
    recommend_replacement: boolean;
    optimal_replacement_timeframe: OptimalReplacementTimeframe;
    consequences_of_delay: string;
    seasonal_considerations: string;
  };
}

export interface Asset {
  // Identification
  userId: string;
  assetId: string;
  
  // Basic info
  assetType: AssetType;
  assetName: string;
  category: AssetCategory;
  
  // Acquisition
  purchaseDate: string;              // ISO date
  purchasePrice: number;
  currentValue?: number;
  
  // Manufacturer
  manufacturer: string;
  model: string;
  serialNumber?: string;
  
  // Lifecycle
  expectedLifespan: number;          // years
  warrantyExpiration?: string;       // ISO date
  
  // Maintenance
  lastMaintenanceDate?: string;
  nextMaintenanceDue?: string;
  maintenanceInterval?: number;      // days
  maintenanceHistory: MaintenanceRecord[];
  
  // LLM Evaluation
  llmEvaluation?: AssetEvaluation;
  
  // Status
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AssetDisplayData {
  // Computed fields for display
  ageYears: number;
  ageMonths: number;
  lifespanPercentage: number;        // 0-100
  warrantyStatus: WarrantyStatus;
  maintenanceStatus: MaintenanceStatus;
  daysUntilMaintenance?: number;
  riskLevel: RiskLevel;
  needsAttention: boolean;
  totalMaintenanceCost: number;
  replacementBudgetGap?: number;
}

export interface AssetsSummary {
  total_assets: number;
  high_risk_count: number;
  due_for_maintenance: number;
  total_replacement_cost_estimate: number;
}

export interface GetAssetsResponse {
  assets: Asset[];
  summary: AssetsSummary;
}

export interface GetAssetDetailResponse {
  asset: Asset;
  displayData: AssetDisplayData;
  relatedInsights: string[];         // Insight IDs
}

// Form data for adding new asset
export interface AssetFormData {
  assetType: AssetType;
  assetName: string;
  category: AssetCategory;
  manufacturer: string;
  model: string;
  serialNumber?: string;
  purchaseDate: string;
  purchasePrice: number;
  expectedLifespan: number;
  warrantyExpiration?: string;
}
