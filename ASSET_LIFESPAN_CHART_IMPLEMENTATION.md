# Asset Lifespan Chart Implementation

## Overview
Created a dedicated chart component for visualizing asset age against expected lifespan and potential lifespan with maintenance. This chart is specifically designed for Life Essentials insights related to appliances, vehicles, HVAC systems, and other household assets.

## Problem Solved
Previously, the `goal_progress_timeline` chart was being used for asset lifespan data, which caused issues because:
- It was designed for financial goal tracking, not asset age tracking
- It incorrectly formatted time values (years) as currency
- The "ahead/behind schedule" semantics didn't apply to asset age
- Timestamp-based logic was incompatible with simple age values

## New Chart Type: `asset_lifespan`

### Component
**File:** `src/components/charts/AssetLifespanChart.tsx`

### Data Format
```typescript
[
  { 
    label: "Current Age", 
    value: 9.5,           // Years
    type: "current"       // Identifies as current age
  },
  { 
    label: "Expected Lifespan", 
    value: 15,            // Years
    type: "baseline"      // Identifies as baseline/expected
  },
  { 
    label: "With Maintenance", 
    value: 18,            // Years
    type: "target",       // Identifies as target with maintenance
    unit: "years"         // Optional unit label
  }
]
```

### Visual Design

#### Three Horizontal Bars:
1. **Current Age Bar** (Primary indicator)
   - Color coded based on lifecycle stage:
     - 🔴 **Red gradient** - Nearing end of life (>80% of expected)
     - 🟡 **Yellow gradient** - Past halfway point (>50% of expected)
     - 🔵 **Blue gradient** - Early/mid lifecycle (<50% of expected)
   - Shows current age with emoji indicator (⚠️, ⏰, or ✓)
   - Value displayed on the right

2. **Expected Lifespan Bar** (Baseline reference)
   - Gray gradient
   - 🎯 Target emoji indicator
   - Represents manufacturer/industry standard lifespan

3. **With Maintenance Bar** (Potential with care)
   - Green gradient
   - ✨ Maintenance benefit indicator
   - Shows extended lifespan achievable with proper maintenance

#### Status Indicator Box:
- Color-coded background matching current status
- Emoji + descriptive text
- Calculates and displays time remaining
- Examples:
  - "⚠️ Nearing end of life • 5.5 years remaining"
  - "⏰ Past halfway point • 8.2 years remaining"
  - "📊 6.5 years remaining at current pace"

#### Maintenance Benefit Callout (conditional):
- Only shown when `With Maintenance` > `Expected Lifespan`
- Green gradient background with border
- Format: "💡 Proper maintenance extends lifespan by X years"

### Lifecycle Stage Logic

```typescript
const ageRatio = currentAge / expectedLifespan;

if (ageRatio > 0.8) {
  // CRITICAL: Nearing end of life
  status = "red" with ⚠️
  message = "Nearing end of life"
}
else if (ageRatio > 0.5) {
  // WARNING: Past halfway
  status = "yellow" with ⏰
  message = "Past halfway point"
}
else {
  // OK: Early/mid lifecycle
  status = "blue" with 📊
  message = "X remaining at current pace"
}
```

### Integration

#### 1. Type Definition (`src/types/insight.ts`)
Added `"asset_lifespan"` to the `Visualization.chart_type` union:
```typescript
export interface Visualization {
  chart_type: 
    | "comparison_bars" 
    | "bar"
    | "line"
    | "donut"
    | "bar_with_trend"
    | "goal_progress_timeline"
    | "reallocation_flow"
    | "goal_velocity"
    | "asset_lifespan";  // NEW
  data: VisualizationData[];
  annotation?: string;
  trend_line?: number[];
}
```

#### 2. Chart Renderer (`src/components/InsightChartRenderer.tsx`)
Added routing case:
```typescript
case 'asset_lifespan':
  return <AssetLifespanChart data={data} gradient={gradient} compact={compact} />;
```

#### 3. Backend Lambda Update Required
Update Life Essentials insight generation to use the new chart type:

**Before:**
```python
"visualization": {
    "chart_type": "goal_progress_timeline",  # WRONG
    "data": [
        {"label": "Current Age", "value": 9.5},
        {"label": "Expected Lifespan", "value": 15},
        {"label": "With Maintenance", "value": 18}
    ]
}
```

**After:**
```python
"visualization": {
    "chart_type": "asset_lifespan",  # CORRECT
    "data": [
        {"label": "Current Age", "value": 9.5, "type": "current"},
        {"label": "Expected Lifespan", "value": 15, "type": "baseline"},
        {"label": "With Maintenance", "value": 18, "type": "target", "unit": "years"}
    ]
}
```

## Features

### Responsive Design
- Adapts to `compact` mode for smaller displays
- Font sizes and padding scale appropriately
- Maintains readability in all sizes

### Visual Indicators
- **Color Coding**: Immediate visual status (red/yellow/blue)
- **Emoji Icons**: Quick recognition of status and meaning
- **Progress Bars**: Clear proportion visualization
- **Numeric Values**: Precise age and lifespan data

### Smart Calculations
- Automatically determines lifecycle stage
- Converts remaining time to appropriate unit (years vs. months)
- Highlights maintenance benefits when present
- Adapts messaging based on urgency

### Accessibility
- High contrast colors
- Clear labels for all data points
- Status messages in plain language
- Visual + text indicators for all states

## Use Cases

### 1. Appliance Replacement Planning
```
Current Age: 9.5 years
Expected Lifespan: 15 years
With Maintenance: 18 years

Status: ⏰ Past halfway point • 5.5 years remaining
Benefit: 💡 Proper maintenance extends lifespan by 3 years
```

### 2. Critical Asset Near End of Life
```
Current Age: 14.2 years
Expected Lifespan: 15 years
With Maintenance: 18 years

Status: ⚠️ Nearing end of life • 0.8 years remaining (10 months)
Benefit: 💡 Proper maintenance extends lifespan by 3 years
```

### 3. New Asset Early in Lifecycle
```
Current Age: 3.5 years
Expected Lifespan: 15 years
With Maintenance: 18 years

Status: 📊 11.5 years remaining at current pace
Benefit: 💡 Proper maintenance extends lifespan by 3 years
```

## Example Insight Using This Chart

**Title:** "Water Heater Nearing End of Expected Lifespan"

**Visualization:**
- Chart Type: `asset_lifespan`
- Shows: 9.5 years (current) vs. 15 years (expected) vs. 18 years (with maintenance)
- Status: "⏰ Past halfway point • 5.5 years remaining"

**Context:**
- Helps users plan for replacement before emergency failure
- Shows value of maintenance (3 extra years)
- Provides timeline for budgeting replacement costs

## Testing Checklist

- [x] Renders three bars with correct proportions
- [x] Colors match lifecycle stage correctly
- [x] Status message updates based on age ratio
- [x] Maintenance benefit shown only when applicable
- [x] Time remaining converts to months when < 1 year
- [x] Compact mode renders properly
- [x] Emoji indicators display correctly
- [x] Type checking passes for new chart type
- [x] Chart renderer routes correctly

## Future Enhancements (Optional)

1. **Repair History Overlay**: Show repair incidents on timeline
2. **Cost Projection**: Display replacement vs. repair costs
3. **Urgency Indicator**: Countdown timer for critical assets
4. **Comparison Mode**: Compare multiple assets side-by-side
5. **Animation**: Smooth entry animations for bars

## Files Modified

1. ✅ `src/components/charts/AssetLifespanChart.tsx` (NEW)
2. ✅ `src/types/insight.ts` (added chart type)
3. ✅ `src/components/InsightChartRenderer.tsx` (added routing)

## Backend Action Required

Update the Life Essentials insight lambda to use:
- Chart type: `"asset_lifespan"` instead of `"goal_progress_timeline"`
- Include `type` field in data points: `"current"`, `"baseline"`, `"target"`

## Date Implemented
October 27, 2025
