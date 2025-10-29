# Finance Sankey - Component Architecture

## 📐 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Finance Page (Future)                        │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │ FinanceHeader (month selector)                             │    │
│  └────────────────────────────────────────────────────────────┘    │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │ Section 1: Dashboard Metrics (TODO)                        │    │
│  │   - Health Score Card                                      │    │
│  │   - Cash Flow Card                                         │    │
│  │   - Income/Expense Card                                    │    │
│  │   - Budget Health Card                                     │    │
│  └────────────────────────────────────────────────────────────┘    │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │ Section 2: Money Flow (Sankey) ✅ IMPLEMENTED              │    │
│  │                                                             │    │
│  │  ┌────────────────────────────────────────────────────┐   │    │
│  │  │ useSankeyData(month)                               │   │    │
│  │  │   ↓                                                │   │    │
│  │  │ React Query Cache                                  │   │    │
│  │  │   ↓                                                │   │    │
│  │  │ GET /finance/sankey?month=YYYY-MM                 │   │    │
│  │  │   ↓                                                │   │    │
│  │  │ SankeyDataResponse                                 │   │    │
│  │  └────────────────────────────────────────────────────┘   │    │
│  │                     ↓                                      │    │
│  │  ┌────────────────────────────────────────────────────┐   │    │
│  │  │ FinanceSankeyDiagram                               │   │    │
│  │  │   - D3-Sankey Rendering                            │   │    │
│  │  │   - Interactive Tooltips                           │   │    │
│  │  │   - Click Handlers                                 │   │    │
│  │  │   - Responsive Layout                              │   │    │
│  │  └────────────────────────────────────────────────────┘   │    │
│  │                                                             │    │
│  └────────────────────────────────────────────────────────────┘    │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │ Section 3: Budget Status (TODO)                            │    │
│  │   - Category Budget Cards                                  │    │
│  │   - Progress Bars                                          │    │
│  └────────────────────────────────────────────────────────────┘    │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │ Section 4: Transactions (TODO)                             │    │
│  │   - Transaction Table                                      │    │
│  │   - Filters                                                │    │
│  │   - Pagination                                             │    │
│  └────────────────────────────────────────────────────────────┘    │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow (Sankey Section)

```
User Action
    ↓
Component State (month = "2025-10")
    ↓
useSankeyData Hook
    ↓
React Query checks cache
    │
    ├─→ Cache Hit (fresh data) ─→ Return cached data
    │
    └─→ Cache Miss or Stale
            ↓
        fetchAuthSession()
            ↓
        GET /finance/sankey?month=2025-10
        Headers: { Authorization: Bearer <token> }
            ↓
        Backend Lambda
            ↓
        DynamoDB Query
            ↓
        Response: SankeyDataResponse
            ↓
        React Query caches result
            ↓
        Component receives data
            ↓
        FinanceSankeyDiagram renders D3 visualization
            ↓
        User sees interactive diagram
            ↓
        User hovers/clicks
            ↓
        Event handlers fire
            ↓
        onCategoryClick callback
            ↓
        Parent component updates filter state
            ↓
        Transaction section filters by category
```

---

## 📁 File Dependencies

```
FinanceSankeyDiagram.tsx
├── Imports
│   ├── react
│   ├── d3-sankey
│   ├── types/finance.ts
│   │   ├── SankeyDataResponse
│   │   ├── SankeyNode
│   │   ├── SankeyLink
│   │   └── formatCurrency()
│   └── useState, useEffect, useRef
│
└── Props
    ├── data: SankeyDataResponse (required)
    ├── onCategoryClick?: (id, name) => void (optional)
    └── compact?: boolean (optional)

useSankeyData.ts
├── Imports
│   ├── @tanstack/react-query
│   ├── aws-amplify/auth
│   ├── config/api.ts
│   │   └── API_ENDPOINTS.FINANCE_SANKEY
│   └── types/finance.ts
│       ├── SankeyDataResponse
│       └── MonthFormat
│
└── Parameters
    ├── month: MonthFormat (required)
    └── options?: { enabled?: boolean } (optional)

types/finance.ts
├── Type Definitions
│   ├── SankeyDataResponse
│   ├── SankeyNode
│   ├── SankeyLink
│   ├── SankeySummary
│   ├── MonthFormat
│   └── CategoryConfig
│
└── Utility Functions
    ├── formatCurrency()
    ├── getCurrentMonth()
    ├── getNextMonth()
    ├── getPreviousMonth()
    └── formatMonth()

config/api.ts
└── API_ENDPOINTS
    ├── FINANCE_DASHBOARD
    ├── FINANCE_SANKEY ✅ (used by hook)
    ├── FINANCE_TRANSACTIONS
    └── FINANCE_BUDGET_STATUS
```

---

## 🎯 Component Hierarchy

```
FinancePage (Future Main Component)
│
├─ FinanceHeader
│  └─ MonthSelector
│
├─ DashboardMetrics (TODO)
│  ├─ HealthScoreCard
│  ├─ CashFlowCard
│  ├─ IncomeExpenseCard
│  └─ BudgetHealthCard
│
├─ SankeySection ✅ (Implemented)
│  │
│  ├─ useSankeyData(month) [Hook]
│  │
│  └─ FinanceSankeyDiagram [Component]
│     ├─ D3 SVG Rendering
│     ├─ Nodes (Income, Categories, Savings)
│     ├─ Links (Flows)
│     ├─ Tooltips
│     └─ Event Handlers
│
├─ BudgetSection (TODO)
│  ├─ useBudgetStatus(month)
│  └─ CategoryBudgetGrid
│     └─ CategoryBudgetCard[]
│
└─ TransactionsSection (TODO)
   ├─ useTransactions(filters)
   ├─ TransactionFilters
   └─ TransactionTable
      └─ TransactionRow[]
```

---

## 🔌 API Integration Pattern

```typescript
// 1. Define Types
// types/finance.ts
export interface SankeyDataResponse {
  user_id: string;
  month: MonthFormat;
  nodes: SankeyNode[];
  links: SankeyLink[];
  summary: SankeySummary;
}

// 2. Configure Endpoint
// config/api.ts
export const API_ENDPOINTS = {
  FINANCE_SANKEY: `${API_BASE_URL}/finance/sankey`
};

// 3. Create Hook
// hooks/useSankeyData.ts
export function useSankeyData(month: MonthFormat) {
  return useQuery({
    queryKey: ['finance', 'sankey', month],
    queryFn: async () => {
      const token = await getAuthToken();
      const response = await fetch(
        `${API_ENDPOINTS.FINANCE_SANKEY}?month=${month}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.json();
    }
  });
}

// 4. Use in Component
// components/.../FinanceSankeyExample.tsx
const { data, isLoading } = useSankeyData('2025-10');
return <FinanceSankeyDiagram data={data} />;
```

---

## 🧩 State Management

```
Global State (React Query Cache)
├─ ['finance', 'sankey', '2025-01']
│  ├─ data: SankeyDataResponse
│  ├─ status: 'success' | 'loading' | 'error'
│  ├─ fetchStatus: 'idle' | 'fetching'
│  └─ timestamp: Date
│
├─ ['finance', 'sankey', '2025-02']
│  └─ ... (separate cache entry per month)
│
└─ ['finance', 'dashboard', '2025-01'] (TODO)
    └─ ... (future implementation)

Component State (Example)
├─ selectedMonth: string
├─ hoveredLink: string | null
├─ isMobile: boolean
└─ filterCategory: string | null
```

---

## 🔄 Cache Strategy

```
React Query Cache Behavior:

Initial Load:
  User requests month → Cache MISS → Fetch from API → Cache result

Navigation:
  User clicks "Next Month" → New month → Cache MISS → Fetch
  User clicks "Previous Month" → Back to cached month → Cache HIT → Instant

Stale Time (5 minutes):
  After 5 min → Data marked stale → Next render refetches in background
  User still sees old data immediately (no loading spinner)

GC Time (10 minutes):
  After 10 min of no usage → Cache entry removed
  Next request = full refetch

Manual Invalidation:
  After transaction added → queryClient.invalidateQueries(['finance', 'sankey'])
  Forces refetch on next render
```

---

## 🎨 Rendering Pipeline

```
React Component Tree
        ↓
    useEffect Hook
        ↓
    Check if data & SVG ref exist
        ↓
    Parse API data into D3 format
        ↓
    Create Sankey Generator
        ↓
    Generate Layout (nodes positions, link paths)
        ↓
    Render to SVG DOM
        │
        ├─→ Draw Links (paths)
        │   ├─ Apply colors
        │   ├─ Add tooltips
        │   └─ Attach event listeners
        │
        └─→ Draw Nodes (rectangles)
            ├─ Position nodes
            ├─ Add labels
            ├─ Add value text
            └─ Attach click handlers
```

---

## 💾 Memory Management

```
Component Lifecycle:

Mount:
  ├─ Create SVG ref
  ├─ Subscribe to React Query
  ├─ Fetch data (if not cached)
  └─ Render D3 visualization

Update (when month changes):
  ├─ Clear previous SVG content
  ├─ Fetch new month data
  ├─ Re-render D3 with new data
  └─ Reattach event listeners

Unmount:
  ├─ Remove event listeners (auto via DOM clear)
  ├─ Unsubscribe from React Query (auto)
  └─ Cache remains for future use

React Query:
  ├─ Keeps data for gcTime (10 min)
  ├─ Cleans up stale entries automatically
  └─ No manual cleanup needed
```

---

## 🔒 Security Flow

```
User Authentication:
    ↓
AWS Cognito User Pool
    ↓
Sign In → JWT Token (idToken)
    ↓
Store in Amplify Session
    ↓
fetchAuthSession() in hook
    ↓
Extract token: session.tokens?.idToken
    ↓
Add to request headers: Authorization: Bearer <token>
    ↓
API Gateway Cognito Authorizer
    ↓
Validates token
    │
    ├─→ Valid → Extract user_id from claims → Call Lambda
    │
    └─→ Invalid → Return 401 Unauthorized
            ↓
        Hook catches error
            ↓
        isError = true, error = "Unauthorized"
            ↓
        Component shows error state
```

---

## 📊 Performance Characteristics

```
Initial Load:
├─ API Request: ~200-500ms (network + backend)
├─ React Query Cache: ~1ms (after first fetch)
├─ D3 Rendering: ~50-100ms (for typical dataset)
└─ Total: ~250-600ms (first time)
    └─ ~50-100ms (cached)

Re-renders:
├─ Month change: Full fetch + render
├─ Hover: Only tooltip update (~1ms)
├─ Click: Only callback execution (~1ms)
└─ Resize: Re-render D3 (~50ms)

Memory:
├─ Component: ~50KB (React + D3)
├─ Cached data: ~5-10KB per month
├─ SVG DOM: ~10-20KB (depends on categories)
└─ Total: ~70-80KB per month cached

Network:
├─ First request: Full payload (~5-10KB)
├─ Subsequent: From cache (0 bytes)
└─ Stale refresh: Background fetch (invisible to user)
```

---

## 🎯 Event Flow

```
User Hovers Over Flow:
    ↓
mouseenter event fires
    ↓
setHoveredLink(linkId)
    ↓
Component re-renders
    ↓
SVG opacity updates via state
    ↓
Tooltip positioned and shown
    ↓
User sees: "🍎 Groceries: $1,698.14 (10.7%)"

User Clicks Category:
    ↓
click event fires
    ↓
onCategoryClick(categoryId, categoryName) called
    ↓
Parent component receives callback
    ↓
Parent updates filter state
    ↓
Transactions component re-renders with filter
    ↓
User sees filtered transaction list
```

---

This architecture provides a solid foundation for building the complete Finance page while maintaining consistency with your existing Life Essentials implementation! 🏗️
