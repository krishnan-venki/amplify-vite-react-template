import { useQuery, useQueryClient } from '@tanstack/react-query';
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
    
    // Enhanced debug logging
    console.group('🔍 Insights API Debug');
    console.log('Raw Response:', data);
    console.log('Response Type:', typeof data);
    console.log('Is Array?', Array.isArray(data));
    console.log('Has body?', !!data.body);
    console.log('Has body.insights?', !!(data.body && data.body.insights));
    console.log('Has insights?', !!data.insights);
    
    // Log first insight to see the actual structure
    if (data.body?.insights?.[0]) {
      console.log('First Insight (from body.insights):', data.body.insights[0]);
      console.log('  - title:', data.body.insights[0].title);
      console.log('  - summary:', data.body.insights[0].summary);
      console.log('  - generated_at:', data.body.insights[0].generated_at);
    } else if (data.insights?.[0]) {
      console.log('First Insight (from insights):', data.insights[0]);
      console.log('  - title:', data.insights[0].title);
      console.log('  - summary:', data.insights[0].summary);
      console.log('  - generated_at:', data.insights[0].generated_at);
    } else if (Array.isArray(data) && data[0]) {
      console.log('First Insight (from array):', data[0]);
      console.log('  - title:', data[0].title);
      console.log('  - summary:', data[0].summary);
      console.log('  - generated_at:', data[0].generated_at);
    }
    console.groupEnd();
    
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
  const queryClient = useQueryClient();
  
  const query = useQuery({
    queryKey: ['insights'],
    queryFn: fetchInsights,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  
  // Add a helper to clear the cache
  const clearCache = () => {
    queryClient.invalidateQueries({ queryKey: ['insights'] });
    queryClient.removeQueries({ queryKey: ['insights'] });
    console.log('✅ React Query cache cleared for insights');
  };
  
  return {
    ...query,
    clearCache
  };
}
