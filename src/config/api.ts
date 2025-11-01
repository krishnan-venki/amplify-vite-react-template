// API Configuration
// Centralized place to manage all API endpoints

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://63z70erbsb.execute-api.us-west-2.amazonaws.com/dev';

export const API_ENDPOINTS = {
  PROMPT: `${API_BASE_URL}/prompt`,
  CHAT: `${API_BASE_URL}/chat`,
  ANALYTICS: `${API_BASE_URL}/analytics`,
  USER_PROFILE: `${API_BASE_URL}/user/profile`,
  INSIGHTS: `${API_BASE_URL}/insights`,
  GOALS: `${API_BASE_URL}/goals`,
  ASSETS: `${API_BASE_URL}/assets`,
  // Finance endpoints
  FINANCE_DASHBOARD: `${API_BASE_URL}/finance/dashboard`,
  FINANCE_SANKEY: `${API_BASE_URL}/finance/sankey`,
  FINANCE_TRANSACTIONS: `${API_BASE_URL}/finance/transactions`,
  FINANCE_BUDGET_STATUS: `${API_BASE_URL}/finance/budget-status`,
  // Epic Healthcare endpoints
  EPIC_CALLBACK: `${API_BASE_URL}/epic/callback`,
  EPIC_PATIENT: `${API_BASE_URL}/epic/patient`,
  EPIC_CONNECTION_STATUS: `${API_BASE_URL}/epic/status`,
  EPIC_REFRESH_TOKEN: `${API_BASE_URL}/epic/refresh-token`,
  // Add more endpoints as needed
} as const;

export default API_ENDPOINTS;
