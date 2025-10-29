# Finance Sankey Implementation

## 📊 Overview

This implementation provides a **Money Flow Sankey Diagram** for the Finance Dashboard, showing how income flows to different spending categories and savings. Built with **D3-Sankey** and **React Query** for optimal performance and caching.

---

## 🎯 What's Been Implemented

### 1. **Type Definitions** (`src/types/finance.ts`)
Complete TypeScript interfaces for all finance endpoints:
- ✅ `SankeyDataResponse` - API response structure
- ✅ `SankeyNode` - Individual nodes (Income, Categories, Savings)
- ✅ `SankeyLink` - Flow connections between nodes
- ✅ `SankeySummary` - Financial summary (income, expenses, savings rate)
- ✅ Utility functions (currency formatting, date handling, etc.)
- ✅ Category configuration with colors and icons

### 2. **API Configuration** (`src/config/api.ts`)
Added finance endpoints:
```typescript
FINANCE_DASHBOARD: /finance/dashboard
FINANCE_SANKEY: /finance/sankey
FINANCE_TRANSACTIONS: /finance/transactions
FINANCE_BUDGET_STATUS: /finance/budget-status
```

### 3. **Custom Hook** (`src/hooks/useSankeyData.ts`)
React Query hook for data fetching:
- ✅ Automatic caching (5 min stale time)
- ✅ Error handling with specific error messages
- ✅ Authentication via Cognito JWT
- ✅ Query invalidation support
- ✅ Helper functions for validation

**Usage:**
```typescript
const { data, isLoading, isError, error } = useSankeyData('2025-01');
```

### 4. **Sankey Diagram Component** (`src/components/money/functional/FinanceSankeyDiagram.tsx`)
D3-based visualization component:
- ✅ Interactive flows (hover tooltips)
- ✅ Click handlers for filtering transactions
- ✅ Responsive design (desktop, tablet, mobile)
- ✅ Color-coded categories
- ✅ Summary statistics display
- ✅ Smooth animations and transitions

### 5. **Example Component** (`src/components/money/functional/FinanceSankeyExample.tsx`)
Standalone demo showing integration:
- ✅ Month selector (ready for navigation)
- ✅ Loading states
- ✅ Error states
- ✅ Empty states
- ✅ Debug info panel

---

## 📁 File Structure

```
src/
├── types/
│   └── finance.ts                      ← Type definitions for all finance data
├── hooks/
│   └── useSankeyData.ts               ← React Query hook for Sankey API
├── config/
│   └── api.ts                          ← API endpoint configuration
└── components/
    └── money/
        └── functional/
            ├── FinanceSankeyDiagram.tsx    ← D3 Sankey visualization
            └── FinanceSankeyExample.tsx     ← Example usage component
```

---

## 🚀 How to Use

### Basic Integration

```tsx
import { useSankeyData } from '@/hooks/useSankeyData';
import { FinanceSankeyDiagram } from '@/components/money/functional/FinanceSankeyDiagram';

function FinancePage() {
  const [month, setMonth] = useState('2025-01');
  const { data, isLoading, isError } = useSankeyData(month);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage />;
  if (!data) return <NoDataMessage />;

  return (
    <FinanceSankeyDiagram 
      data={data} 
      onCategoryClick={(categoryId, categoryName) => {
        // Navigate to transactions filtered by category
        navigate(`/finance/transactions?category=${categoryId}`);
      }}
    />
  );
}
```

### With Month Navigation

```tsx
import { getCurrentMonth, getNextMonth, getPreviousMonth } from '@/types/finance';

const [month, setMonth] = useState(getCurrentMonth());

// Navigate months
<button onClick={() => setMonth(getPreviousMonth(month))}>← Previous</button>
<button onClick={() => setMonth(getCurrentMonth())}>Today</button>
<button onClick={() => setMonth(getNextMonth(month))}>Next →</button>
```

### Compact Mode

```tsx
<FinanceSankeyDiagram 
  data={data} 
  compact={true}  // Smaller size for sidebars/modals
/>
```

---

## 🔌 API Contract

### Endpoint: `GET /finance/sankey`

**Query Parameters:**
- `month` (required) - Format: `YYYY-MM` (e.g., "2025-01")

**Response Example:**
```json
{
  "user_id": "8871f320-0051-7075-5db0-cb07b0b60821",
  "month": "2025-01",
  "nodes": [
    {
      "id": "income",
      "name": "Income",
      "color": "#10B981"
    },
    {
      "id": "cat_groceries",
      "name": "🍎 Groceries",
      "color": "#22C55E"
    },
    {
      "id": "savings",
      "name": "💰 Savings",
      "color": "#059669"
    }
  ],
  "links": [
    {
      "source": "income",
      "target": "cat_groceries",
      "value": 1698.14
    },
    {
      "source": "income",
      "target": "savings",
      "value": 7571.46
    }
  ],
  "summary": {
    "total_income": 15861.83,
    "total_expenses": 8290.37,
    "net_cash_flow": 7571.46,
    "savings_rate": 47.7
  }
}
```

**Error Responses:**
- `400` - Invalid month format
- `401` - Unauthorized
- `404` - No data for month
- `500` - Server error

---

## 🎨 Features

### 1. **Interactive Tooltips**
Hover over any flow to see:
- Category name
- Exact amount
- Percentage of total income

### 2. **Click-to-Filter**
Click on:
- Any flow → Filter transactions by that category
- Any category node → Same as above
- Income node → No action (source node)

### 3. **Responsive Design**
Automatically adjusts for:
- **Desktop** (width: 700px) - Full layout with labels
- **Tablet** (width: 500px) - Compact layout
- **Mobile** (width: 320px) - Stacked vertical layout

### 4. **Color Coding**
- Categories use colors from `CATEGORY_CONFIG`
- Income: Green (`#10B981`)
- Savings: Dark Green (`#059669`)
- Expenses: Category-specific colors

### 5. **Summary Statistics**
Displays below diagram:
- Total Income (green)
- Total Expenses (red)
- Savings Rate (percentage)

---

## 🧪 Testing

### 1. **Test with Mock Data**

Create a mock response in your tests:

```typescript
const mockSankeyData: SankeyDataResponse = {
  user_id: 'test-user',
  month: '2025-01',
  nodes: [
    { id: 'income', name: 'Income', color: '#10B981' },
    { id: 'cat_groceries', name: '🍎 Groceries', color: '#22C55E' },
    { id: 'savings', name: '💰 Savings', color: '#059669' },
  ],
  links: [
    { source: 'income', target: 'cat_groceries', value: 1500 },
    { source: 'income', target: 'savings', value: 3500 },
  ],
  summary: {
    total_income: 5000,
    total_expenses: 1500,
    net_cash_flow: 3500,
    savings_rate: 70,
  },
};
```

### 2. **Run the Example Component**

To test the complete flow:

```bash
# Start dev server
npm run dev

# Navigate to the example component (add to routes first)
# Example: /finance/sankey-demo
```

### 3. **Verify API Connection**

Check browser console for:
- `🔵 Fetching Sankey data for: 2025-01`
- `🔵 Sankey data received: { month, nodeCount, linkCount, ... }`
- `❌ Error fetching Sankey data:` (if errors occur)

---

## 🔧 Configuration

### Change Cache Duration

In `useSankeyData.ts`:

```typescript
staleTime: 5 * 60 * 1000,    // 5 minutes (current)
gcTime: 10 * 60 * 1000,       // 10 minutes (current)
```

Adjust based on your needs:
- **Real-time updates**: 30 seconds
- **Normal usage**: 5 minutes (recommended)
- **Static reports**: 1 hour

### Customize Colors

In `finance.ts`, update `CATEGORY_CONFIG`:

```typescript
export const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  cat_groceries: { 
    name: "Groceries", 
    icon: "🍎", 
    color: "#22C55E"  // Change this
  },
  // ...
};
```

---

## 📊 Performance

### Optimization Features:
1. **React Query Caching** - Reduces API calls
2. **Conditional Rendering** - Only renders when data changes
3. **SVG Optimization** - Efficient D3 rendering
4. **Responsive Sizing** - Adapts to viewport
5. **Memoization** - Prevents unnecessary re-renders

### Bundle Size Impact:
- `d3-sankey`: ~15KB (already installed)
- `useSankeyData` hook: ~2KB
- `FinanceSankeyDiagram`: ~6KB
- **Total addition**: ~8KB (hook + component)

---

## 🐛 Troubleshooting

### Issue: "No authentication token available"
**Solution:** Ensure user is logged in via Cognito
```typescript
import { fetchAuthSession } from 'aws-amplify/auth';
const session = await fetchAuthSession();
console.log('Token:', session.tokens?.idToken);
```

### Issue: "No financial data found for [month]"
**Solution:** Backend has no transactions for that month
- Try current month: `getCurrentMonth()`
- Check if backend has seeded data

### Issue: Sankey diagram not rendering
**Solution:** Verify data structure
```typescript
import { hasValidSankeyData } from '@/hooks/useSankeyData';
if (!hasValidSankeyData(data)) {
  console.error('Invalid Sankey data:', data);
}
```

### Issue: Links not clickable
**Solution:** Check if `onCategoryClick` prop is passed
```tsx
<FinanceSankeyDiagram 
  data={data}
  onCategoryClick={(id, name) => console.log(id, name)}  // Add this
/>
```

---

## 📝 Next Steps

To complete the Finance page, implement:

1. ✅ **Sankey Hook & Component** (DONE)
2. ⏳ **Dashboard Metrics Hook** (`useFinanceDashboard`)
3. ⏳ **Budget Status Hook** (`useBudgetStatus`)
4. ⏳ **Transactions Hook** (`useTransactions`)
5. ⏳ **Main Finance Dashboard Page**
6. ⏳ **Month Navigation Component**
7. ⏳ **Category Filter Integration**

---

## 💡 Tips

- **Reuse existing patterns** from Life Essentials Dashboard
- **Keep components small** - one responsibility per component
- **Use TypeScript** - Leverage type safety from `finance.ts`
- **Test incrementally** - Build and test one section at a time
- **Follow D3 pattern** - Consistent with existing `ReallocationFlowChart`

---

## 🆘 Support

If you encounter issues:

1. Check browser console for errors
2. Verify API endpoint is responding
3. Check CloudWatch logs: `/aws/lambda/SagaaFinance*`
4. Ensure Cognito token is valid
5. Verify month format is `YYYY-MM`

---

**Status:** ✅ Phase 1 Complete - Sankey Hook & Component Ready for Integration

**Author:** AI Assistant  
**Date:** October 28, 2025  
**Version:** 1.0.0
