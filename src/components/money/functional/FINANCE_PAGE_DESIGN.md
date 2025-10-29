# Sagaa Finance Page - Design Specifications

## 🎯 Overview

The Finance page provides users with a comprehensive view of their financial health through interactive visualizations, detailed transaction lists, and actionable insights.

---

## 📐 Page Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  Header: "Finance" + Month Selector                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────┐    │
│  │  Section 1: Financial Health Dashboard               │    │
│  │  (Metrics Cards)                                      │    │
│  └───────────────────────────────────────────────────────┘    │
│                                                                 │
│  ┌───────────────────────────────────────────────────────┐    │
│  │  Section 2: Money Flow (Sankey Diagram)              │    │
│  │  (Interactive Visualization)                          │    │
│  └───────────────────────────────────────────────────────┘    │
│                                                                 │
│  ┌───────────────────────────────────────────────────────┐    │
│  │  Section 3: Spending by Category                     │    │
│  │  (Budget Status Cards)                                │    │
│  └───────────────────────────────────────────────────────┘    │
│                                                                 │
│  ┌───────────────────────────────────────────────────────┐    │
│  │  Section 4: Recent Transactions                       │    │
│  │  (Filterable Table)                                   │    │
│  └───────────────────────────────────────────────────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Section 1: Financial Health Dashboard

### Layout
4 metric cards in a responsive grid (4 columns on desktop, 2 on tablet, 1 on mobile)

### Card 1: Financial Health Score
```
┌────────────────────────────┐
│ Financial Health           │
│                            │
│        72                  │
│       ═══                  │
│      / 100                 │
│                            │
│ ↑ 5 points from last month │
└────────────────────────────┘
```

**Data Source:** `/finance/dashboard` → `financial_health_score`

**Visual:**
- Large number (72) in center
- Circular progress ring around it
- Color based on score:
  - 🟢 Green: 70-100 (Good)
  - 🟡 Yellow: 50-69 (Warning)
  - 🔴 Red: 0-49 (Critical)
- Small trend indicator below

### Card 2: Net Cash Flow
```
┌────────────────────────────┐
│ Net Cash Flow              │
│                            │
│     $7,571.46              │
│                            │
│ ↑ $1,250 from last month   │
│ Savings Rate: 47.7%        │
└────────────────────────────┘
```

**Data Source:** `/finance/dashboard` → `net_cash_flow`, `net_cash_flow_change`, `savings_rate`

**Visual:**
- Large currency amount
- Green if positive, red if negative
- Trend arrow with change amount
- Savings rate as secondary metric

### Card 3: Income vs Expenses
```
┌────────────────────────────┐
│ Income vs Expenses         │
│                            │
│ Income    $15,861.83       │
│ Expenses  $8,290.37        │
│ ─────────────────          │
│ Net       $7,571.46        │
└────────────────────────────┘
```

**Data Source:** `/finance/dashboard` → `total_income`, `total_expenses`

**Visual:**
- Clean table format
- Income in green
- Expenses in red
- Net in bold

### Card 4: Budget Health
```
┌────────────────────────────┐
│ Budget Status              │
│                            │
│   [██████████░░░░] 55.3%   │
│                            │
│ Status: Good               │
│ 0 categories over budget   │
└────────────────────────────┘
```

**Data Source:** `/finance/budget-status` → `overall`

**Visual:**
- Progress bar showing percentage used
- Color based on status:
  - 🟢 Green: good
  - 🟡 Yellow: warning
  - 🔴 Red: critical
- Count of over-budget categories

---

## 💸 Section 2: Money Flow (Sankey Diagram)

### Layout
Full-width section with interactive Sankey diagram

### Component Structure
```
┌─────────────────────────────────────────────────────────────┐
│ Money Flow                                    [Filter ▼]    │
│                                                             │
│  Income ──────┬──→ 🏠 Housing ($2,567.84)                  │
│  $15,861.83   ├──→ 🍎 Groceries ($1,698.14)                │
│               ├──→ 🍔 Dining ($862.20)                     │
│               ├──→ 🎬 Entertainment ($520.00)              │
│               └──→ 💰 Savings ($7,571.46)                  │
│                                                             │
│ Hover for details | Click to filter transactions           │
└─────────────────────────────────────────────────────────────┘
```

**Data Source:** `/finance/sankey`

**Library:** Use D3.js Sankey or Recharts Sankey

**Interactions:**
1. **Hover** - Show exact amounts and percentages
2. **Click on flow** - Filter transactions by category
3. **Responsive** - Stack vertically on mobile

**Visual Requirements:**
- Use `color` from API for each category
- Income node on left, categories on right
- Flow thickness proportional to amount
- Smooth curved flows
- Category icons in labels

### Implementation Example
```typescript
interface SankeyData {
  nodes: Array<{
    id: string;
    name: string;
    color: string;
  }>;
  links: Array<{
    source: string;
    target: string;
    value: number;
  }>;
}

const SankeyDiagram: React.FC<{ data: SankeyData }> = ({ data }) => {
  // Use recharts or d3-sankey
  return (
    <ResponsiveContainer width="100%" height={400}>
      <Sankey
        data={data}
        nodeWidth={10}
        nodePadding={20}
        linkOpacity={0.6}
        linkColor="gradient"
        onClick={handleCategoryClick}
      />
    </ResponsiveContainer>
  );
};
```

---

## 📊 Section 3: Spending by Category

### Layout
Grid of category cards (3 columns on desktop, 2 on tablet, 1 on mobile)

### Category Card Design
```
┌────────────────────────────────────┐
│ 🍎 Groceries                       │
│                                    │
│ $1,698.14 / $1,500.00              │
│ [████████████░░░░░] 113.2%         │
│                                    │
│ ⚠️ $198.14 over budget             │
│ 45 transactions                    │
└────────────────────────────────────┘
```

**Data Source:** `/finance/budget-status` → `categories`

**Visual Elements:**
1. **Category Icon & Name** (from API)
2. **Spent / Budget amounts**
3. **Progress bar** (color based on status):
   - 🟢 Green: good (under 90%)
   - 🟡 Yellow: warning (90-100%)
   - 🔴 Red: over (100%+)
4. **Status message** (dynamic based on percentage)
5. **Transaction count**

**Sort Order:** By percentage_used (highest first)

**Click Behavior:** Navigate to transactions filtered by that category

---

## 📝 Section 4: Recent Transactions

### Layout
Full-width table with filters

### Header
```
┌─────────────────────────────────────────────────────────────┐
│ Transactions                                                │
│                                                             │
│ [Month: Jan 2025 ▼] [Category: All ▼] [Search: _______]   │
└─────────────────────────────────────────────────────────────┘
```

### Table Structure
```
┌────────┬─────────────────┬──────────┬──────────────┬─────────┐
│ Date   │ Merchant        │ Category │ Amount       │ Actions │
├────────┼─────────────────┼──────────┼──────────────┼─────────┤
│ Jan 05 │ PCC Natural     │ 🍎 Groc. │    -$31.67   │ [...]   │
│ Jan 08 │ SAFEWAY         │ 🍎 Groc. │   -$125.43   │ [...]   │
│ Jan 12 │ Starbucks       │ 🍔 Dining│    -$8.50    │ [...]   │
│ Jan 15 │ Shell Gas       │ ⛽ Trans.│    -$45.00   │ [...]   │
│ Jan 20 │ Amazon          │ 📦 Shop. │    -$89.99   │ [...]   │
└────────┴─────────────────┴──────────┴──────────────┴─────────┘

[Load More] or [← Prev] [Next →]
```

**Data Source:** `/finance/transactions`

**Columns:**
1. **Date** - `transaction_date` (formatted as "Jan 05")
2. **Merchant** - `merchant_normalized` (fallback to `merchant_name`)
3. **Category** - `category_icon` + truncated `category_name`
4. **Amount** - `amount` (negative in red, positive in green)
5. **Actions** - Dropdown menu [View Details | Split | Recategorize]

**Features:**
- **Filtering:**
  - By month (dropdown)
  - By category (dropdown)
  - By search term (merchant name)
- **Sorting:**
  - By date (default: newest first)
  - By amount
  - By merchant
- **Pagination:**
  - 50 transactions per page
  - "Load More" button or pagination controls
  - Use `last_key` from API for pagination

**Mobile View:**
Collapse to card format:
```
┌────────────────────────────────┐
│ Jan 05 | PCC Natural Markets   │
│ 🍎 Groceries                   │
│              -$31.67           │
└────────────────────────────────┘
```

---

## 🎨 Design System

### Colors

**Primary Palette:**
```css
--income-green: #10B981;
--expense-red: #EF4444;
--savings-teal: #059669;
--warning-yellow: #F59E0B;
--neutral-gray: #6B7280;
```

**Category Colors:** (Use from API response)

**Status Colors:**
```css
--status-good: #10B981;
--status-warning: #F59E0B;
--status-critical: #EF4444;
--status-over: #DC2626;
```

### Typography

**Headers:**
```css
h1: 32px, font-weight: 700 (Page title)
h2: 24px, font-weight: 600 (Section titles)
h3: 18px, font-weight: 600 (Card titles)
```

**Body:**
```css
body: 16px, font-weight: 400
small: 14px, font-weight: 400
caption: 12px, font-weight: 400
```

**Numbers:**
```css
large-number: 48px, font-weight: 700 (Health score)
medium-number: 32px, font-weight: 600 (Amounts)
small-number: 18px, font-weight: 500 (Secondary amounts)
```

### Spacing

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-2xl: 48px;
```

### Border Radius

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
```

### Cards

```css
.card {
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s;
}
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 640px) {
  - Stack all cards vertically
  - Single column layout
  - Collapse table to cards
  - Simplify Sankey diagram
}

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) {
  - 2 columns for metric cards
  - 2 columns for category cards
  - Full-width Sankey
  - Table with horizontal scroll
}

/* Desktop */
@media (min-width: 1025px) {
  - 4 columns for metric cards
  - 3 columns for category cards
  - Full-width Sankey
  - Full table
}
```

---

## 🔄 Loading States

### Skeleton Screens
Show skeleton loaders while data loads:

```
┌────────────────────────────┐
│ ████████                   │
│                            │
│ ████████████               │
│ ████                       │
└────────────────────────────┘
```

### Empty States

**No Data for Month:**
```
┌─────────────────────────────────────┐
│                                     │
│           📊                        │
│                                     │
│   No transactions for this month    │
│                                     │
│   [← Previous Month] [Next Month →] │
│                                     │
└─────────────────────────────────────┘
```

**No Transactions in Category:**
```
No transactions in this category
Try selecting a different month or category
```

---

## ⚡ Performance Considerations

1. **Lazy Load:** Load Sankey diagram only when section is visible
2. **Virtual Scrolling:** For transaction table with 100+ items
3. **Debounce:** Search input (300ms delay)
4. **Cache:** Store dashboard data in React Query with 5min stale time
5. **Optimize:** Use React.memo for category cards

---

## 🧪 Component Architecture

```
FinancePage/
├── components/
│   ├── FinanceHeader.tsx          (Month selector)
│   ├── DashboardMetrics/
│   │   ├── HealthScoreCard.tsx
│   │   ├── CashFlowCard.tsx
│   │   ├── IncomeExpenseCard.tsx
│   │   └── BudgetHealthCard.tsx
│   ├── SankeyDiagram/
│   │   ├── SankeyChart.tsx
│   │   └── SankeyLegend.tsx
│   ├── CategoryGrid/
│   │   ├── CategoryCard.tsx
│   │   └── ProgressBar.tsx
│   └── TransactionList/
│       ├── TransactionTable.tsx
│       ├── TransactionRow.tsx
│       ├── TransactionFilters.tsx
│       └── TransactionMobileCard.tsx
├── hooks/
│   ├── useFinanceDashboard.ts     (API: /dashboard)
│   ├── useSankeyData.ts           (API: /sankey)
│   ├── useBudgetStatus.ts         (API: /budget-status)
│   └── useTransactions.ts         (API: /transactions)
└── utils/
    ├── formatCurrency.ts
    ├── formatDate.ts
    └── categoryHelpers.ts
```

---

## 🎯 User Interactions

### Click Behaviors

1. **Category in Sankey** → Filter transactions to that category
2. **Category Card** → Navigate to filtered transactions
3. **Transaction Row** → Expand details (inline or modal)
4. **Month Selector** → Reload all data for new month
5. **Health Score** → Show breakdown modal (future feature)

### Hover Behaviors

1. **Sankey Flows** → Show tooltip with exact amount and percentage
2. **Category Cards** → Subtle elevation
3. **Transaction Rows** → Highlight row
4. **Progress Bars** → Show exact percentage

---

## 📦 Component Examples

### React Hook for Dashboard Data

```typescript
import { useQuery } from '@tanstack/react-query';
import { getFinanceDashboard } from '@/api/finance';

export const useFinanceDashboard = (month: string) => {
  return useQuery({
    queryKey: ['finance', 'dashboard', month],
    queryFn: () => getFinanceDashboard(month),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

### Category Card Component

```tsx
interface CategoryCardProps {
  category_id: string;
  category_name: string;
  category_icon: string;
  budget_amount: number;
  spent_amount: number;
  percentage_used: number;
  status: 'good' | 'warning' | 'over';
  count: number;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category_icon,
  category_name,
  spent_amount,
  budget_amount,
  percentage_used,
  status,
  count,
  onClick
}) => {
  const statusColor = {
    good: 'text-green-600',
    warning: 'text-yellow-600',
    over: 'text-red-600'
  }[status];

  return (
    <div 
      className="card cursor-pointer hover:shadow-lg"
      onClick={onClick}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">{category_icon}</span>
        <h3 className="font-semibold">{category_name}</h3>
      </div>
      
      <div className="mb-2">
        <span className="text-xl font-bold">
          {formatCurrency(spent_amount)}
        </span>
        <span className="text-gray-500"> / {formatCurrency(budget_amount)}</span>
      </div>
      
      <ProgressBar 
        percentage={percentage_used} 
        status={status} 
      />
      
      <div className={`mt-2 ${statusColor}`}>
        {status === 'over' && `${formatCurrency(spent_amount - budget_amount)} over budget`}
        {status === 'warning' && 'Approaching limit'}
        {status === 'good' && `${formatCurrency(budget_amount - spent_amount)} remaining`}
      </div>
      
      <div className="text-sm text-gray-500 mt-2">
        {count} transactions
      </div>
    </div>
  );
};
```

---

## ✅ Acceptance Criteria

**Page is complete when:**

1. ✅ All 4 dashboard metrics display correctly
2. ✅ Sankey diagram renders with proper data
3. ✅ Sankey flows are interactive (click to filter)
4. ✅ Category cards show budget status accurately
5. ✅ Progress bars display correct percentages with colors
6. ✅ Transaction table loads and displays data
7. ✅ Filters work (month, category, search)
8. ✅ Pagination works for transactions
9. ✅ Month selector updates all sections
10. ✅ Loading states show during API calls
11. ✅ Empty states display when no data
12. ✅ Mobile responsive on all screen sizes
13. ✅ All currency formatted consistently
14. ✅ All dates formatted consistently
15. ✅ Error handling for API failures

---

## 🚀 Implementation Priority

**Phase 1 (MVP):**
1. Dashboard metrics cards
2. Basic transaction table
3. Month selector

**Phase 2:**
1. Sankey diagram
2. Category budget cards
3. Filters

**Phase 3:**
1. Advanced interactions
2. Polish and animations
3. Mobile optimization

**Estimated Timeline: 2-3 weeks for full implementation**
