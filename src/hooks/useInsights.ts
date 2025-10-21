import { useQuery } from '@tanstack/react-query';
import { fetchAuthSession } from 'aws-amplify/auth';
import API_ENDPOINTS from '../config/api';
import type { Insight } from '../types/insight';

/**
 * Fetch insights from the API
 */
async function fetchInsights(): Promise<Insight[]> {
  try {
    // Get auth session and token
    const session = await fetchAuthSession();
    const token = session.tokens?.idToken?.toString();

    if (!token) {
      throw new Error('No authentication token available');
    }

    // Fetch insights from API
    const response = await fetch(API_ENDPOINTS.INSIGHTS, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch insights: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    console.log('API Response:', data); // Debug log
    
    // Handle different response structures
    // Option 1: Direct response with body.insights
    if (data.body && data.body.insights) {
      return data.body.insights;
    }
    
    // Option 2: Direct insights array
    if (data.insights) {
      return data.insights;
    }
    
    // Option 3: Response is already the insights array
    if (Array.isArray(data)) {
      return data;
    }
    
    console.error('Unexpected response structure:', data);
    return [];
  } catch (error) {
    console.error('Error fetching insights:', error);
    throw error;
  }
}

/**
 * Hook to fetch and cache insights
 * - Fetches once on first mount
 * - Caches indefinitely
 * - Can be manually refetched
 */
export function useInsights() {
  return useQuery({
    queryKey: ['insights'],
    queryFn: fetchInsights,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
