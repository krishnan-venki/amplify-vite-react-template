import { useQuery } from '@tanstack/react-query';
import { fetchAuthSession } from 'aws-amplify/auth';
import API_ENDPOINTS from '../config/api';
import type { BudgetStatusResponse, MonthFormat } from '../types/finance';

interface UseBudgetStatusOptions {
  enabled?: boolean;
}

interface UseBudgetStatusResult {
  data: BudgetStatusResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook to fetch budget status showing budget vs actual spending by category
 * 
 * @param month - Month in YYYY-MM format (required, e.g., "2025-01")
 * @param options - Optional configuration
 * @returns Budget status with overall summary and per-category breakdown
 * 
 * @example
 * ```tsx
 * const { data, isLoading, error } = useBudgetStatus('2025-01');
 * 
 * if (isLoading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 * if (!data) return <div>No data</div>;
 * 
 * return (
 *   <div>
 *     <h2>Budget: {data.overall.percentage_used.toFixed(1)}% used</h2>
 *     {data.categories.map(cat => (
 *       <div key={cat.category_id}>
 *         {cat.category_icon} {cat.category_name}: {cat.percentage_used}%
 *       </div>
 *     ))}
 *   </div>
 * );
 * ```
 */
export function useBudgetStatus(
  month: MonthFormat,
  options: UseBudgetStatusOptions = {}
): UseBudgetStatusResult {
  const { enabled = true } = options;

  const fetchBudgetStatus = async (): Promise<BudgetStatusResponse> => {
    try {
      // Get authentication token
      const session = await fetchAuthSession();
      const token = session.tokens?.idToken?.toString();

      if (!token) {
        throw new Error('No authentication token available');
      }

      // Month is required for this endpoint
      if (!month) {
        throw new Error('Month parameter is required for budget status');
      }

      // Construct URL with query parameters
      const url = new URL(API_ENDPOINTS.FINANCE_BUDGET_STATUS);
      url.searchParams.append('month', month);

      console.log('📊 Fetching budget status for:', month);

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
        if (response.status === 400) {
          throw new Error('Invalid month format. Use YYYY-MM (e.g., "2025-01")');
        }
        if (response.status === 404) {
          throw new Error(`No budget data found for ${month}`);
        }
        if (response.status === 401) {
          throw new Error('Unauthorized - please sign in again');
        }
        throw new Error(`Failed to fetch budget status: ${response.statusText}`);
      }

      // Parse response
      const data: BudgetStatusResponse = await response.json();
      console.log('📊 Budget status received:', {
        month: data.month,
        overallStatus: data.overall.status,
        percentageUsed: data.overall.percentage_used,
        categoriesCount: data.categories.length,
        categoriesOverBudget: data.overall.categories_over_budget,
      });

      return data;
    } catch (err) {
      console.error('❌ Error fetching budget status:', err);
      throw err instanceof Error ? err : new Error('Failed to fetch budget status');
    }
  };

  // Use React Query for data fetching with caching
  const query = useQuery({
    queryKey: ['finance', 'budget-status', month],
    queryFn: fetchBudgetStatus,
    enabled: enabled && !!month,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
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
 * Helper function to check if budget status data is valid
 * @param data - Budget status response
 * @returns true if data is valid for rendering
 */
export function hasValidBudgetData(data: BudgetStatusResponse | undefined): boolean {
  if (!data) return false;
  if (!data.overall) return false;
  if (!Array.isArray(data.categories)) return false;
  return true;
}

/**
 * Helper function to get categories that are over budget
 * @param data - Budget status response
 * @returns Array of categories over budget
 */
export function getOverBudgetCategories(data: BudgetStatusResponse) {
  return data.categories.filter(cat => cat.status === 'over');
}

/**
 * Helper function to get categories approaching budget limit
 * @param data - Budget status response
 * @returns Array of categories with warning status
 */
export function getWarningCategories(data: BudgetStatusResponse) {
  return data.categories.filter(cat => cat.status === 'warning');
}

/**
 * Helper function to sort categories by percentage used (descending)
 * @param data - Budget status response
 * @returns Sorted array of categories
 */
export function sortCategoriesByUsage(data: BudgetStatusResponse) {
  return [...data.categories].sort((a, b) => b.percentage_used - a.percentage_used);
}
