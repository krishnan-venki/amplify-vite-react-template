// Finance Type Definitions

// ========================================
// COMMON TYPES
// ========================================

export type MonthFormat = string; // YYYY-MM format (e.g., "2025-01")

export type BudgetStatus = 'good' | 'warning' | 'over' | 'critical';

export interface CategoryInfo {
  category_id: string;
  category_name: string;
  category_icon: string;
}

// ========================================
// DASHBOARD ENDPOINT TYPES
// ========================================

export interface TopSpendingCategory extends CategoryInfo {
  amount: number;
  count: number;
}

export interface BudgetHealth {
  status: BudgetStatus;
  percentage_used: number;
}

export interface FinanceDashboardResponse {
  user_id: string;
  month: MonthFormat;
  financial_health_score: number;
  total_income: number;
  total_expenses: number;
  net_cash_flow: number;
  net_cash_flow_change: number;
  savings_rate: number;
  transaction_count: number;
  top_spending_categories: TopSpendingCategory[];
  budget_health: BudgetHealth;
}

// ========================================
// SANKEY ENDPOINT TYPES
// ========================================

export interface SankeyNode {
  id: string;
  name: string;
  color: string;
  layer?: number; // Layer position: 0 = Income, 1 = Savings/Expenses, 2 = Categories
}

export interface SankeyLink {
  source: string; // Node ID
  target: string; // Node ID
  value: number;
}

export interface SankeySummary {
  total_income: number;
  total_expenses: number;
  net_cash_flow: number;
  savings_rate: number;
}

export interface SankeyDataResponse {
  user_id: string;
  month: MonthFormat;
  nodes: SankeyNode[];
  links: SankeyLink[];
  summary: SankeySummary;
}

// ========================================
// TRANSACTIONS ENDPOINT TYPES
// ========================================

export interface Transaction {
  transaction_id: string;
  transaction_date: string; // ISO date string
  merchant_name: string;
  merchant_normalized: string;
  description: string;
  amount: number; // Negative for expenses, positive for income
  category_id: string;
  category_name: string;
  category_icon: string;
  subcategory?: string;
  account_type: string;
  is_recurring: boolean;
  month: MonthFormat;
}

export interface TransactionFilters {
  month?: MonthFormat;
  category_id?: string;
}

export interface TransactionSummary {
  count: number;
  total_amount: number;
  has_more: boolean;
}

export interface TransactionPagination {
  limit: number;
  last_key: string | null;
}

export interface TransactionsResponse {
  user_id: string;
  filters: TransactionFilters;
  transactions: Transaction[];
  summary: TransactionSummary;
  pagination: TransactionPagination;
}

export interface TransactionQueryParams {
  month?: MonthFormat;
  category_id?: string;
  limit?: number;
  last_key?: string;
}

// ========================================
// BUDGET STATUS ENDPOINT TYPES
// ========================================

export interface CategoryBudget extends CategoryInfo {
  budget_amount: number;
  spent_amount: number;
  remaining_amount: number;
  percentage_used: number;
  status: BudgetStatus;
  is_custom_budget: boolean;
}

export interface BudgetOverall {
  total_budget: number;
  total_spent: number;
  total_remaining: number;
  percentage_used: number;
  status: BudgetStatus;
  categories_over_budget: number;
}

export interface BudgetStatusResponse {
  user_id: string;
  month: MonthFormat;
  overall: BudgetOverall;
  categories: CategoryBudget[];
  note?: string;
}

// ========================================
// ERROR TYPES
// ========================================

export interface FinanceErrorResponse {
  error: string;
  message?: string;
}

// ========================================
// CATEGORY CONFIGURATION
// ========================================

export interface CategoryConfig {
  name: string;
  icon: string;
  color: string;
}

export const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  cat_income: { name: "Income", icon: "💰", color: "#10B981" },
  cat_housing: { name: "Housing", icon: "🏠", color: "#3B82F6" },
  cat_groceries: { name: "Groceries", icon: "🍎", color: "#22C55E" },
  cat_dining: { name: "Dining & Restaurants", icon: "🍔", color: "#F59E0B" },
  cat_transportation: { name: "Transportation", icon: "⛽", color: "#8B5CF6" },
  cat_shopping: { name: "Shopping & Retail", icon: "📦", color: "#EC4899" },
  cat_entertainment: { name: "Entertainment", icon: "🎬", color: "#F43F5E" },
  cat_subscriptions: { name: "Subscriptions & Utilities", icon: "💳", color: "#6366F1" },
  cat_healthcare: { name: "Healthcare & Medical", icon: "🏥", color: "#EF4444" },
  cat_fitness: { name: "Fitness & Wellness", icon: "💪", color: "#14B8A6" },
  cat_education: { name: "Education", icon: "📚", color: "#06B6D4" },
  cat_travel: { name: "Travel", icon: "✈️", color: "#0EA5E9" },
  cat_petcare: { name: "Pet Care", icon: "🐾", color: "#A855F7" },
  cat_insurance: { name: "Insurance", icon: "🛡️", color: "#64748B" },
  cat_taxes: { name: "Taxes & Fees", icon: "📋", color: "#78716C" },
  cat_transfers: { name: "Transfers & Savings", icon: "🔄", color: "#94A3B8" },
  cat_miscellaneous: { name: "Miscellaneous", icon: "📌", color: "#9CA3AF" },
  cat_uncategorized: { name: "Uncategorized", icon: "❓", color: "#D1D5DB" },
  savings: { name: "Savings", icon: "💰", color: "#059669" },
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Format currency consistently across the application
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format currency without decimals for large amounts
 */
export const formatCurrencyCompact = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format month string to readable format
 * "2025-01" -> "January 2025"
 */
export const formatMonth = (month: MonthFormat): string => {
  const [year, monthNum] = month.split('-');
  const date = new Date(parseInt(year), parseInt(monthNum) - 1, 1);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

/**
 * Get current month in YYYY-MM format
 */
export const getCurrentMonth = (): MonthFormat => {
  return new Date().toISOString().slice(0, 7);
};

/**
 * Navigate to next/previous month
 */
export const getNextMonth = (month: MonthFormat): MonthFormat => {
  const [year, monthNum] = month.split('-').map(Number);
  const date = new Date(year, monthNum, 1); // Month is 0-indexed, so this gets next month
  return date.toISOString().slice(0, 7);
};

export const getPreviousMonth = (month: MonthFormat): MonthFormat => {
  const [year, monthNum] = month.split('-').map(Number);
  const date = new Date(year, monthNum - 2, 1); // Go back 2 to account for 0-indexing
  return date.toISOString().slice(0, 7);
};

/**
 * Format transaction date
 * "2025-01-05" -> "Jan 05"
 */
export const formatTransactionDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
};

/**
 * Get color for budget status
 */
export const getBudgetStatusColor = (status: BudgetStatus): string => {
  const colors: Record<BudgetStatus, string> = {
    good: '#10B981',      // Green
    warning: '#F59E0B',   // Yellow
    over: '#EF4444',      // Red
    critical: '#DC2626',  // Dark Red
  };
  return colors[status];
};

/**
 * Get risk level text for budget status
 */
export const getBudgetStatusText = (status: BudgetStatus): string => {
  if (status === 'good') return 'On track';
  if (status === 'warning') return 'Approaching limit';
  if (status === 'over') return 'Over budget';
  return 'Critical';
};

/**
 * Get color for financial health score (0-100)
 */
export const getFinancialHealthColor = (score: number): string => {
  if (score >= 80) return '#10B981';  // Green - Excellent
  if (score >= 60) return '#3B82F6';  // Blue - Good
  if (score >= 40) return '#F59E0B';  // Yellow - Fair
  return '#EF4444';                    // Red - Poor
};

/**
 * Get status text for financial health score (0-100)
 */
export const getFinancialHealthStatus = (score: number): string => {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  return 'Needs Attention';
};
