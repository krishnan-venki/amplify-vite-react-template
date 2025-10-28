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
  // Add more endpoints as needed
} as const;

export default API_ENDPOINTS;
