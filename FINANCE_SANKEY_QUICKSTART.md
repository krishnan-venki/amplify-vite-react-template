# 🚀 Quick Start: Finance Sankey Integration

## 📦 What's Ready to Use

You now have a complete, production-ready Sankey diagram implementation for your Finance page!

---

## ⚡ Quick Integration (5 minutes)

### Step 1: Import the Hook and Component

```tsx
import { useSankeyData } from '../../../hooks/useSankeyData';
import { FinanceSankeyDiagram } from './FinanceSankeyDiagram';
import { getCurrentMonth } from '../../../types/finance';
```

### Step 2: Use in Your Component

```tsx
export const MyFinancePage: React.FC = () => {
  const month = getCurrentMonth(); // "2025-10"
  const { data, isLoading, isError, error } = useSankeyData(month);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;
  if (!data) return <div>No data</div>;

  return (
    <FinanceSankeyDiagram 
      data={data}
      onCategoryClick={(categoryId, categoryName) => {
        console.log('Filter by:', categoryId, categoryName);
        // TODO: Navigate to transactions with filter
      }}
    />
  );
};
```

### Step 3: Test It!

Start your dev server and check browser console:
```bash
npm run dev
```

Look for:
- `🔵 Fetching Sankey data for: 2025-10`
- `🔵 Sankey data received: { month, nodeCount, linkCount, ... }`

---

## 🎨 Styling Options

### Full Width (Default)
```tsx
<FinanceSankeyDiagram data={data} />
```

### Compact (For Sidebars/Modals)
```tsx
<FinanceSankeyDiagram data={data} compact={true} />
```

### With Click Handler
```tsx
<FinanceSankeyDiagram 
  data={data}
  onCategoryClick={(categoryId, categoryName) => {
    // Your logic here
    navigate(`/finance/transactions?category=${categoryId}`);
  }}
/>
```

---

## 🧪 Testing with Mock Data

Create a test file to verify rendering without backend:

```tsx
// mockSankeyData.ts
import type { SankeyDataResponse } from '../types/finance';

export const mockSankeyData: SankeyDataResponse = {
  user_id: 'test-user',
  month: '2025-10',
  nodes: [
    { id: 'income', name: 'Income', color: '#10B981' },
    { id: 'cat_groceries', name: '🍎 Groceries', color: '#22C55E' },
    { id: 'cat_dining', name: '🍔 Dining', color: '#F59E0B' },
    { id: 'savings', name: '💰 Savings', color: '#059669' },
  ],
  links: [
    { source: 'income', target: 'cat_groceries', value: 800 },
    { source: 'income', target: 'cat_dining', value: 300 },
    { source: 'income', target: 'savings', value: 3900 },
  ],
  summary: {
    total_income: 5000,
    total_expenses: 1100,
    net_cash_flow: 3900,
    savings_rate: 78.0,
  },
};

// In your test component:
<FinanceSankeyDiagram data={mockSankeyData} />
```

---

## 📱 Responsive Behavior

The component automatically adapts:

- **Mobile** (< 768px): Compact vertical layout
- **Tablet** (768px - 1024px): Medium layout
- **Desktop** (> 1024px): Full layout with all labels

No additional configuration needed!

---

## 🔧 Common Patterns

### Pattern 1: With Month Selector

```tsx
import { useState } from 'react';
import { getCurrentMonth, getPreviousMonth, getNextMonth } from '../../../types/finance';

const [month, setMonth] = useState(getCurrentMonth());
const { data } = useSankeyData(month);

return (
  <>
    <div className="month-nav">
      <button onClick={() => setMonth(getPreviousMonth(month))}>
        ← Previous
      </button>
      <span>{month}</span>
      <button onClick={() => setMonth(getNextMonth(month))}>
        Next →
      </button>
    </div>
    
    <FinanceSankeyDiagram data={data} />
  </>
);
```

### Pattern 2: With Loading State

```tsx
const { data, isLoading, isError } = useSankeyData(month);

return (
  <div className="sankey-container">
    {isLoading && (
      <div className="loading">
        <div className="spinner" />
        <p>Loading money flow...</p>
      </div>
    )}
    
    {isError && (
      <div className="error">
        <p>Failed to load data</p>
        <button onClick={() => refetch()}>Try Again</button>
      </div>
    )}
    
    {data && <FinanceSankeyDiagram data={data} />}
  </div>
);
```

### Pattern 3: With Category Filter State

```tsx
const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

<FinanceSankeyDiagram 
  data={data}
  onCategoryClick={(categoryId, categoryName) => {
    setSelectedCategory(categoryId);
    // Now use selectedCategory to filter transactions list below
  }}
/>

{selectedCategory && (
  <div className="filter-badge">
    Showing: {selectedCategory}
    <button onClick={() => setSelectedCategory(null)}>Clear</button>
  </div>
)}
```

---

## 🎯 Integration Checklist

Before going live, verify:

- [ ] API endpoint `/finance/sankey` is deployed
- [ ] Backend returns data in correct format
- [ ] User authentication works (Cognito token)
- [ ] Loading state displays during fetch
- [ ] Error state handles 404/401/500
- [ ] Click handler navigates correctly
- [ ] Tooltips show on hover
- [ ] Responsive on mobile/tablet/desktop
- [ ] Colors match your design system
- [ ] Currency formatting is correct

---

## 🐛 Quick Troubleshooting

### Issue: "No authentication token available"
```typescript
// Check if user is logged in
import { fetchAuthSession } from 'aws-amplify/auth';
const session = await fetchAuthSession();
console.log('Has token:', !!session.tokens?.idToken);
```

### Issue: Component not rendering
```typescript
// Check if data is valid
import { hasValidSankeyData } from '../../../hooks/useSankeyData';
console.log('Valid data:', hasValidSankeyData(data));
```

### Issue: API call failing
```typescript
// Check console for detailed error
// Look for: ❌ Error fetching Sankey data: [error message]
```

---

## 📚 Reference

### Hook API

```typescript
useSankeyData(month: string, options?: {
  enabled?: boolean;
})

Returns: {
  data: SankeyDataResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}
```

### Component Props

```typescript
FinanceSankeyDiagram({
  data: SankeyDataResponse;           // Required
  onCategoryClick?: (                 // Optional
    categoryId: string, 
    categoryName: string
  ) => void;
  compact?: boolean;                  // Optional, default: false
})
```

### Utility Functions

```typescript
// From types/finance.ts
getCurrentMonth() → "2025-10"
getNextMonth("2025-10") → "2025-11"
getPreviousMonth("2025-10") → "2025-09"
formatMonth("2025-10") → "October 2025"
formatCurrency(1234.56) → "$1,234.56"
```

---

## 🎉 You're All Set!

The Sankey implementation is complete and ready to use. Just import, configure your API endpoint, and integrate into your Finance page.

**Need help?** Check `SANKEY_IMPLEMENTATION_README.md` for detailed documentation.

---

**Happy coding! 🚀**
