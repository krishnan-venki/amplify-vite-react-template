# Sankey Diagram: 3-Column Layout Backend Requirements

## Overview
Currently showing: `Income → [Categories + Savings]` (2 columns)
**New requirement**: `Income → [Expenses + Savings] → [Categories]` (3 columns)

---

## Visual Structure

```
┌─────────┐
│ Income  │──────────────┐
│$26,824  │              │
└─────────┘              │
                         ▼
              ┌──────────────┐
              │   Expenses   │─────┐
              │   $21,346    │     │
              └──────────────┘     │
                                   ▼
                         ┌────────────────┐
                         │   Groceries    │
                         │    $1,052      │
                         └────────────────┘
                         ┌────────────────┐
                         │     Travel     │
                         │    $3,222      │
                         └────────────────┘
                         ┌────────────────┐
                         │      ...       │
                         └────────────────┘
              ┌──────────────┐
              │   Savings    │
              │    $5,478    │
              └──────────────┘
```

---

## Backend Changes Required

### **File:** Lambda function for `/finance/sankey` endpoint

### **Current Logic:**
```python
# Pseudocode
nodes = [
    {"id": "income", "name": "Income", "color": "#10b981"}
]
links = []

for category in categories:
    nodes.append({
        "id": category.id,
        "name": category.name,
        "color": category.color
    })
    links.append({
        "source": "income",
        "target": category.id,
        "value": category.total
    })

# Add savings
nodes.append({"id": "savings", "name": "Savings", "color": "#10b981"})
links.append({
    "source": "income",
    "target": "savings",
    "value": savings_amount
})
```

### **New Logic:**
```python
# Step 1: Create Income node (Column 1)
nodes = [
    {"id": "income", "name": "Income", "color": "#10b981"}
]
links = []

# Step 2: Calculate total expenses from all categories
total_expenses = sum(category.total for category in categories)

# Step 3: Add Expenses aggregation node (Column 2)
nodes.append({
    "id": "expenses",
    "name": "Expenses",
    "color": "#ef4444"  # Red color for expenses
})

# Step 4: Add Savings node (Column 2)
nodes.append({
    "id": "savings",
    "name": "Savings",
    "color": "#10b981"  # Green color for savings
})

# Step 5: Create Layer 1 links (Income → Expenses + Savings)
links.append({
    "source": "income",
    "target": "expenses",
    "value": total_expenses
})
links.append({
    "source": "income",
    "target": "savings",
    "value": savings_amount
})

# Step 6: Create category nodes (Column 3)
for category in categories:
    nodes.append({
        "id": category.id,
        "name": category.name,
        "color": category.color,
        "icon": category.icon
    })
    
    # Step 7: Create Layer 2 links (Expenses → Categories)
    links.append({
        "source": "expenses",
        "target": category.id,
        "value": category.total
    })

# Result: 3-column layout
# Column 1: Income
# Column 2: Expenses + Savings
# Column 3: Individual categories
```

---

## Data Structure Changes

### **Response Schema (Updated):**
```typescript
interface SankeyDataResponse {
  user_id: string;
  month: string;
  nodes: Array<{
    id: string;           // "income" | "expenses" | "savings" | "cat_*"
    name: string;         // Display name
    color: string;        // Hex color
    icon?: string;        // Optional emoji icon
    node_type: "source" | "aggregate" | "category";  // NEW field
  }>;
  links: Array<{
    source: string;       // Node ID
    target: string;       // Node ID
    value: number;        // Dollar amount
    layer: 1 | 2;         // NEW field: Which layer of the flow
  }>;
  summary: {
    total_income: number;
    total_expenses: number;  // Sum of all categories
    net_cash_flow: number;
    savings_rate: number;
  };
}
```

### **Example Response:**
```json
{
  "user_id": "user123",
  "month": "2025-10",
  "nodes": [
    {
      "id": "income",
      "name": "Income",
      "color": "#10b981",
      "node_type": "source"
    },
    {
      "id": "expenses",
      "name": "Expenses",
      "color": "#ef4444",
      "node_type": "aggregate"
    },
    {
      "id": "savings",
      "name": "Savings",
      "color": "#10b981",
      "node_type": "aggregate"
    },
    {
      "id": "cat_groceries",
      "name": "Groceries",
      "color": "#f87171",
      "icon": "🍔",
      "node_type": "category"
    },
    {
      "id": "cat_travel",
      "name": "Travel",
      "color": "#60a5fa",
      "icon": "✈️",
      "node_type": "category"
    }
    // ... more categories
  ],
  "links": [
    // Layer 1: Income → Expenses + Savings
    {
      "source": "income",
      "target": "expenses",
      "value": 21346.36,
      "layer": 1
    },
    {
      "source": "income",
      "target": "savings",
      "value": 5478.43,
      "layer": 1
    },
    // Layer 2: Expenses → Categories
    {
      "source": "expenses",
      "target": "cat_groceries",
      "value": 1051.94,
      "layer": 2
    },
    {
      "source": "expenses",
      "target": "cat_travel",
      "value": 3222.37,
      "layer": 2
    }
    // ... more category links
  ],
  "summary": {
    "total_income": 26824.79,
    "total_expenses": 21346.36,
    "net_cash_flow": 5478.43,
    "savings_rate": 20.4
  }
}
```

---

## Frontend Changes (Minimal)

The existing `FinanceSankeyDiagram.tsx` component already supports multiple layers! The D3 Sankey library automatically handles:
- ✅ Column positioning (detects 3 columns from link structure)
- ✅ Node alignment
- ✅ Flow path calculation

### **Only Frontend Change Needed:**

Update label positioning logic to handle the middle "Expenses" node:

```typescript
// In FinanceSankeyDiagram.tsx, update label positioning
const isSourceNode = node.id === 'income';
const isAggregateNode = node.id === 'expenses' || node.id === 'savings';
const isCategoryNode = node.id.startsWith('cat_');

let xPos: number;
if (isSourceNode) {
  xPos = (node.x0 || 0) - 8;  // Left of node
} else if (isAggregateNode) {
  xPos = (node.x1 || 0) + 8;  // Right of node (middle column)
} else {
  xPos = (node.x1 || 0) + 8;  // Right of node (right column)
}

const textAnchor = isSourceNode ? 'end' : 'start';
```

---

## Benefits of 3-Column Layout

1. **Clearer Financial Story:**
   - See total expenses vs. savings split at a glance
   - Understand savings rate visually (thickness of savings flow)

2. **Better Category Context:**
   - Categories grouped under "Expenses" makes logical sense
   - Savings stands alone as a separate decision

3. **Improved Visual Balance:**
   - Less cramping on right side (categories spread out)
   - Middle column provides visual breathing room

4. **Scalability:**
   - Works with any number of categories
   - Can add subcategories later (4-column layout)

---

## Implementation Steps

### **Backend Team:**
1. ✅ Update Lambda function query logic
2. ✅ Calculate total_expenses from transactions
3. ✅ Add "expenses" aggregate node
4. ✅ Create two-layer link structure
5. ✅ Add optional `node_type` and `layer` fields
6. ✅ Update API documentation
7. ✅ Test with multiple months of data

### **Frontend Team (Optional):**
1. Update TypeScript types with new fields
2. Adjust label positioning for 3-column layout
3. Update click handler for "Expenses" node
4. Test with new backend response

---

## Testing Checklist

- [ ] Works with 1 category
- [ ] Works with 13+ categories (your current case)
- [ ] Savings flow renders correctly
- [ ] Total expenses = sum of all category links
- [ ] Income = Expenses + Savings (conservation of money)
- [ ] Click on "Expenses" node (should it filter all expenses?)
- [ ] Responsive on mobile
- [ ] Hover tooltips work on all layers

---

## Alternative: Frontend-Only Solution (Not Recommended)

You *could* transform the data on the frontend, but this is **not recommended** because:
- ❌ Violates separation of concerns
- ❌ Duplicates business logic
- ❌ Makes debugging harder
- ❌ Inconsistent with other endpoints
- ✅ Backend should own data structure and aggregations

---

## Color Recommendations

```typescript
const SANKEY_COLORS = {
  income: '#10b981',      // Green (money in)
  expenses: '#ef4444',    // Red (money out)
  savings: '#10b981',     // Green (money saved)
  // Categories use their existing CATEGORY_CONFIG colors
};
```

---

## Summary

**Yes, this should come from the backend.** The backend needs to:
1. Add an "expenses" aggregate node
2. Create two layers of links instead of one
3. Return a 3-column structure

The frontend D3 Sankey library will automatically render the 3-column layout with minimal changes needed!

**Estimated Backend Work:** 1-2 hours
**Estimated Frontend Work:** 30 minutes (mostly type updates)
