import { useQuery } from '@tanstack/react-query';
import { fetchAuthSession } from 'aws-amplify/auth';
import API_ENDPOINTS from '../config/api';
import type { FinanceDashboardResponse, MonthFormat } from '../types/finance';

interface UseFinanceDashboardOptions {
  enabled?: boolean;
}

interface UseFinanceDashboardResult {
  data: FinanceDashboardResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook to fetch financial dashboard metrics for a specific month
 * 
 * @param month - Month in YYYY-MM format (e.g., "2025-01"). If not provided, defaults to current month on backend
 * @param options - Optional configuration
 * @returns Dashboard data with financial health score, income, expenses, and budget health
 * 
 * @example
 * ```tsx
 * const { data, isLoading, error } = useFinanceDashboard('2025-01');
 * 
 * if (isLoading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 * if (!data) return <div>No data</div>;
 * 
 * return (
 *   <div>
 *     <h2>Financial Health: {data.financial_health_score}/100</h2>
 *     <p>Net Cash Flow: ${data.net_cash_flow}</p>
 *   </div>
 * );
 * ```
 */
export function useFinanceDashboard(
  month?: MonthFormat,
  options: UseFinanceDashboardOptions = {}
): UseFinanceDashboardResult {
  const { enabled = true } = options;

  const fetchDashboard = async (): Promise<FinanceDashboardResponse> => {
    try {
      // Get authentication token
      const session = await fetchAuthSession();
      const token = session.tokens?.idToken?.toString();

      if (!token) {
        throw new Error('No authentication token available');
      }

      // Construct URL with optional query parameters
      const url = new URL(API_ENDPOINTS.FINANCE_DASHBOARD);
      if (month) {
        url.searchParams.append('month', month);
      }

      console.log('💰 Fetching financial dashboard for:', month || 'current month');

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
          throw new Error(`No financial data found for ${month || 'current month'}`);
        }
        if (response.status === 401) {
          throw new Error('Unauthorized - please sign in again');
        }
        throw new Error(`Failed to fetch dashboard: ${response.statusText}`);
      }

      // Parse response
      const data: FinanceDashboardResponse = await response.json();
      console.log('💰 Dashboard data received:', {
        month: data.month,
        healthScore: data.financial_health_score,
        income: data.total_income,
        expenses: data.total_expenses,
        netCashFlow: data.net_cash_flow,
        savingsRate: data.savings_rate,
      });

      return data;
    } catch (err) {
      console.error('❌ Error fetching dashboard:', err);
      throw err instanceof Error ? err : new Error('Failed to fetch dashboard');
    }
  };

  // Use React Query for data fetching with caching
  const query = useQuery({
    queryKey: ['finance', 'dashboard', month || 'current'],
    queryFn: fetchDashboard,
    enabled: enabled,
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
 * Helper function to determine financial health status from score
 * @param score - Financial health score (0-100)
 * @returns Status level
 */
export function getFinancialHealthStatus(score: number): 'excellent' | 'good' | 'fair' | 'poor' {
  if (score >= 80) return 'excellent';
  if (score >= 60) return 'good';
  if (score >= 40) return 'fair';
  return 'poor';
}

/**
 * Helper function to get color for financial health score
 * @param score - Financial health score (0-100)
 * @returns Color hex code
 */
export function getFinancialHealthColor(score: number): string {
  if (score >= 80) return '#10B981'; // Green
  if (score >= 60) return '#22C55E'; // Light Green
  if (score >= 40) return '#F59E0B'; // Yellow
  return '#EF4444'; // Red
}

/**
 * Helper function to check if dashboard data is valid
 * @param data - Dashboard response
 * @returns true if data is valid for rendering
 */
export function hasValidDashboardData(data: FinanceDashboardResponse | undefined): boolean {
  if (!data) return false;
  if (typeof data.financial_health_score !== 'number') return false;
  if (typeof data.total_income !== 'number') return false;
  if (typeof data.total_expenses !== 'number') return false;
  return true;
}
