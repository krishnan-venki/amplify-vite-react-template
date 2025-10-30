# Sankey Diagram Layer Fix

## Problem
The Sankey diagram was not respecting the backend's `layer` property for nodes. The backend sends 3 layers:
- **Layer 0**: Income
- **Layer 1**: Savings + Expenses  
- **Layer 2**: Individual spending categories

However, D3 Sankey's automatic layout was repositioning nodes based on their connections, causing Savings to appear in Layer 2 instead of Layer 1 alongside Expenses.

## Root Cause
1. The TypeScript interface `SankeyNode` was missing the `layer` property
2. D3 Sankey's auto-layout algorithm calculates node positions (depth/column) based on the graph structure, ignoring any layer hints
3. The component wasn't manually positioning nodes based on the backend's layer values

## Solution Implemented

### 1. Updated TypeScript Interface
**File**: `src/types/finance.ts`

Added `layer` property to `SankeyNode`:
```typescript
export interface SankeyNode {
  id: string;
  name: string;
  color: string;
  layer?: number; // Layer position: 0 = Income, 1 = Savings/Expenses, 2 = Categories
}
```

### 2. Updated Flow Interface
**File**: `src/components/money/functional/FinanceSankeyDiagram.tsx`

Added `layer` to internal `FlowNode` interface:
```typescript
interface FlowNode {
  id: string;
  name: string;
  color: string;
  layer?: number; // Backend-provided layer position
}
```

### 3. Pass Layer Through Node Mapping
Pass the backend's layer value through to D3:
```typescript
const nodes: FlowNode[] = data.nodes.map(node => ({
  id: node.id,
  name: node.name,
  color: node.color,
  layer: node.layer, // Pass through backend layer
}));
```

### 4. Manual Node Positioning
After D3 calculates the initial layout, manually override node X positions based on backend layer:
```typescript
if (data.nodes.some(n => n.layer !== undefined)) {
  const layerWidth = (width - margin.left - margin.right - nodeWidth) / 2;
  
  graph.nodes.forEach((node: D3SankeyNode<FlowNode, FlowLink>) => {
    const backendLayer = node.layer;
    if (backendLayer !== undefined) {
      const x0 = margin.left + (layerWidth * backendLayer);
      const x1 = x0 + nodeWidth;
      
      node.x0 = x0;
      node.x1 = x1;
    }
  });
  
  // Recalculate link paths after repositioning
  sankeyGenerator.update(graph);
}
```

### 5. Added Debug Logging
```typescript
console.log(`📊 Node layers:`, data.nodes.map(n => `${n.name}(layer ${n.layer})`).join(', '));
console.log(`📍 Positioned ${node.name} at layer ${backendLayer}: x0=${x0}, x1=${x1}`);
```

## Expected Result
Now the Sankey diagram will show:
- **Column 1 (Layer 0)**: Income
- **Column 2 (Layer 1)**: Savings + Expenses (both at same horizontal position)
- **Column 3 (Layer 2)**: All spending categories (Groceries, Travel, Education, etc.)

## Testing
1. Navigate to Finance Dashboard `/money/dashboard`
2. View the Sankey diagram
3. Verify that Savings and Expenses both appear in the middle column
4. Check browser console for layer positioning logs
5. Confirm all flows render correctly from Income → Savings/Expenses → Categories

## Backend Contract
The backend must send the `layer` property for each node:
```json
{
  "nodes": [
    { "id": "income", "name": "Income", "color": "#10b981", "layer": 0 },
    { "id": "savings", "name": "💰 Savings", "color": "#0ea5e9", "layer": 1 },
    { "id": "expenses", "name": "💸 Expenses", "color": "#ef4444", "layer": 1 },
    { "id": "cat_groceries", "name": "🛒 Groceries", "color": "#22c55e", "layer": 2 }
  ]
}
```

## Files Modified
1. `src/types/finance.ts` - Added `layer` to SankeyNode interface
2. `src/components/money/functional/FinanceSankeyDiagram.tsx` - Manual positioning based on layer property
