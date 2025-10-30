import { useQuery } from '@tanstack/react-query';
import { fetchAuthSession } from 'aws-amplify/auth';
import API_ENDPOINTS from '../config/api';
import type { TransactionsResponse, TransactionQueryParams } from '../types/finance';

interface UseTransactionsOptions {
  enabled?: boolean;
}

interface UseTransactionsResult {
  data: TransactionsResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  hasMore: boolean;
}

/**
 * Custom hook to fetch transactions with optional filtering and pagination
 * 
 * @param params - Query parameters for filtering and pagination
 * @param options - Optional configuration
 * @returns Transactions data with filters, summary, and pagination info
 * 
 * @example
 * ```tsx
 * // All transactions for a month
 * const { data, isLoading } = useTransactions({ month: '2025-01' });
 * 
 * // Transactions for a specific category
 * const { data } = useTransactions({
 *   month: '2025-01',
 *   category_id: 'cat_groceries'
 * });
 * 
 * // With pagination
 * const { data, hasMore } = useTransactions({
 *   month: '2025-01',
 *   limit: 20,
 *   last_key: previousResponse.pagination.last_key
 * });
 * ```
 */
export function useTransactions(
  params: TransactionQueryParams = {},
  options: UseTransactionsOptions = {}
): UseTransactionsResult {
  const { enabled = true } = options;

  const fetchTransactions = async (): Promise<TransactionsResponse> => {
    try {
      // Get authentication token
      const session = await fetchAuthSession();
      const token = session.tokens?.idToken?.toString();

      if (!token) {
        throw new Error('No authentication token available');
      }

      // Construct URL with query parameters
      const url = new URL(API_ENDPOINTS.FINANCE_TRANSACTIONS);
      
      if (params.month) {
        url.searchParams.append('month', params.month);
      }
      if (params.category_id) {
        url.searchParams.append('category_id', params.category_id);
      }
      if (params.limit) {
        url.searchParams.append('limit', params.limit.toString());
      }
      if (params.last_key) {
        url.searchParams.append('last_key', params.last_key);
      }

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
          throw new Error('No transactions found for the specified filters');
        }
        if (response.status === 401) {
          throw new Error('Unauthorized - please sign in again');
        }
        throw new Error(`Failed to fetch transactions: ${response.statusText}`);
      }

      // Parse response
      const data: TransactionsResponse = await response.json();

      return data;
    } catch (err) {
      console.error('❌ Error fetching transactions:', err);
      throw err instanceof Error ? err : new Error('Failed to fetch transactions');
    }
  };

  // Create query key from params
  const queryKey = [
    'finance',
    'transactions',
    params.month || 'all',
    params.category_id || 'all',
    params.limit || 50,
    params.last_key || 'first',
  ];

  // Use React Query for data fetching with caching
  const query = useQuery({
    queryKey,
    queryFn: fetchTransactions,
    enabled: enabled,
    staleTime: 3 * 60 * 1000, // 3 minutes (shorter than other queries since transactions change more frequently)
    gcTime: 10 * 60 * 1000, // 10 minutes
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
    hasMore: query.data?.summary.has_more || false,
  };
}

/**
 * Helper function to check if transactions data is valid
 * @param data - Transactions response
 * @returns true if data is valid for rendering
 */
export function hasValidTransactionData(data: TransactionsResponse | undefined): boolean {
  if (!data) return false;
  if (!Array.isArray(data.transactions)) return false;
  return true;
}

/**
 * Helper function to group transactions by date
 * @param data - Transactions response
 * @returns Map of date to transactions
 */
export function groupTransactionsByDate(data: TransactionsResponse): Map<string, TransactionsResponse['transactions']> {
  const grouped = new Map<string, TransactionsResponse['transactions']>();
  
  data.transactions.forEach(transaction => {
    const date = transaction.transaction_date;
    if (!grouped.has(date)) {
      grouped.set(date, []);
    }
    grouped.get(date)!.push(transaction);
  });
  
  return grouped;
}

/**
 * Helper function to calculate total by transaction type
 * @param data - Transactions response
 * @returns Object with income and expenses totals
 */
export function calculateTotalsByType(data: TransactionsResponse) {
  const income = data.transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
  
  const expenses = data.transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  
  return { income, expenses };
}

/**
 * Helper function to get unique categories from transactions
 * @param data - Transactions response
 * @returns Array of unique category objects
 */
export function getUniqueCategories(data: TransactionsResponse) {
  const categoriesMap = new Map<string, {
    id: string;
    name: string;
    icon: string;
  }>();
  
  data.transactions.forEach(transaction => {
    if (!categoriesMap.has(transaction.category_id)) {
      categoriesMap.set(transaction.category_id, {
        id: transaction.category_id,
        name: transaction.category_name,
        icon: transaction.category_icon,
      });
    }
  });
  
  return Array.from(categoriesMap.values());
}

/**
 * Helper function to filter transactions by search term (searches merchant name and description)
 * @param data - Transactions response
 * @param searchTerm - Search term
 * @returns Filtered transactions
 */
export function searchTransactions(data: TransactionsResponse, searchTerm: string) {
  const term = searchTerm.toLowerCase().trim();
  if (!term) return data.transactions;
  
  return data.transactions.filter(transaction => 
    transaction.merchant_name.toLowerCase().includes(term) ||
    transaction.merchant_normalized.toLowerCase().includes(term) ||
    transaction.description.toLowerCase().includes(term)
  );
}

/**
 * Helper function to get recurring transactions
 * @param data - Transactions response
 * @returns Array of recurring transactions
 */
export function getRecurringTransactions(data: TransactionsResponse) {
  return data.transactions.filter(t => t.is_recurring);
}
