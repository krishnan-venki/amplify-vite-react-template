import { useQuery } from '@tanstack/react-query';
import { fetchAuthSession } from 'aws-amplify/auth';
import API_ENDPOINTS from '../config/api';
import type { SankeyDataResponse, MonthFormat } from '../types/finance';

interface UseSankeyDataOptions {
  enabled?: boolean;
}

interface UseSankeyDataResult {
  data: SankeyDataResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook to fetch Sankey diagram data showing income → expense flows
 * 
 * @param month - Month in YYYY-MM format (e.g., "2025-01")
 * @param options - Optional configuration
 * @returns Sankey data with nodes, links, and summary
 * 
 * @example
 * ```tsx
 * const { data, isLoading, error } = useSankeyData('2025-01');
 * 
 * if (isLoading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 * if (!data) return <div>No data</div>;
 * 
 * return <SankeyDiagram nodes={data.nodes} links={data.links} />;
 * ```
 */
export function useSankeyData(
  month: MonthFormat,
  options: UseSankeyDataOptions = {}
): UseSankeyDataResult {
  const { enabled = true } = options;

  const fetchSankeyData = async (): Promise<SankeyDataResponse> => {
    try {
      // Get authentication token
      const session = await fetchAuthSession();
      const token = session.tokens?.idToken?.toString();

      if (!token) {
        throw new Error('No authentication token available');
      }

      // Construct URL with query parameters
      const url = new URL(API_ENDPOINTS.FINANCE_SANKEY);
      url.searchParams.append('month', month);

      console.log('🔵 Fetching Sankey data for:', month);

      // Make API request
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      // Handle HTTP errors
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`No financial data found for ${month}`);
        }
        if (response.status === 400) {
          throw new Error('Invalid month format. Use YYYY-MM (e.g., "2025-01")');
        }
        if (response.status === 401) {
          throw new Error('Unauthorized - please sign in again');
        }
        throw new Error(`Failed to fetch Sankey data: ${response.statusText}`);
      }

      // Parse response
      const data: SankeyDataResponse = await response.json();
      console.log('🔵 Sankey data received:', {
        month: data.month,
        nodeCount: data.nodes?.length || 0,
        linkCount: data.links?.length || 0,
        totalIncome: data.summary?.total_income,
        totalExpenses: data.summary?.total_expenses,
      });

      return data;
    } catch (err) {
      console.error('❌ Error fetching Sankey data:', err);
      throw err instanceof Error ? err : new Error('Failed to fetch Sankey data');
    }
  };

  // Use React Query for data fetching with caching
  const query = useQuery({
    queryKey: ['finance', 'sankey', month],
    queryFn: fetchSankeyData,
    enabled: enabled && !!month,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    placeholderData: (previousData) => previousData, // Keep previous data while fetching to prevent scroll jumps
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: async () => {
      await query.refetch();
    },
  };
}

/**
 * Helper function to validate month format
 * @param month - Month string to validate
 * @returns true if valid YYYY-MM format
 */
export function isValidMonthFormat(month: string): boolean {
  const regex = /^\d{4}-(0[1-9]|1[0-2])$/;
  return regex.test(month);
}

/**
 * Helper function to check if Sankey data has valid nodes and links
 * @param data - Sankey data response
 * @returns true if data is valid for rendering
 */
export function hasValidSankeyData(data: SankeyDataResponse | undefined): boolean {
  if (!data) return false;
  if (!data.nodes || data.nodes.length === 0) return false;
  if (!data.links || data.links.length === 0) return false;
  return true;
}
