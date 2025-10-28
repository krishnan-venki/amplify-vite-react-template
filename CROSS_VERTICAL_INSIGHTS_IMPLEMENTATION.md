# Cross-Vertical Insights Implementation

## Overview
Implemented support for cross-vertical insights that can appear in multiple vertical filters on the Insights page. When the backend identifies an insight that spans multiple verticals (e.g., Finance + Life Essentials), it now appears in all relevant vertical filters.

## Backend Contract

### New Fields in Insight Response
1. **`vertical_scope`** (string): Indicates the scope of the insight
   - For cross-vertical: `"cross_vertical"`
   - For single vertical: `"finance"`, `"health"`, `"education"`, or `"life_essentials"`
   - All insights (including old ones) now have this field populated

2. **`verticals_involved`** (string[]): List of verticals involved in the insight
   - Only present when `vertical_scope === "cross_vertical"`
   - Contains values like: `['finance', 'health', 'education', 'life_essentials']`
   - The insight will appear in ALL verticals listed in this array

## Implementation Changes

### 1. Type Definitions (`src/types/insight.ts`)
Added two new optional fields to the `Insight` interface:
```typescript
// === CROSS-VERTICAL SUPPORT ===
vertical_scope?: string;       // "cross_vertical" | "finance" | "health" | "education" | "life_essentials"
verticals_involved?: string[]; // ['finance', 'health', 'education', 'life_essentials'] - for cross-vertical insights
```

### 2. Utility Functions (`src/utils/insightUtils.ts`)
Added two new utility functions:

#### `mapBackendVerticalToFrontend(backendVertical: string): string`
Maps backend vertical names to frontend vertical IDs:
- `'finance'` → `'sagaa_money'`
- `'health'` → `'sagaa_healthcare'`
- `'education'` → `'sagaa_education'`
- `'life_essentials'` → `'sagaa_lifeessentials'`

#### `insightBelongsToVertical(insight: Insight, selectedVertical: string): boolean`
Determines if an insight belongs to a specific vertical:
- **Cross-vertical insights**: Checks if `selectedVertical` exists in `verticals_involved` array
- **Single-vertical insights**: Uses the existing `vertical` field (with `sagaa_money` as default for backward compatibility)

### 3. Insights Page (`src/pages/Insights.tsx`)
Updated filtering logic in three places:

#### A. Vertical Data Calculation (Sidebar Badge Counts)
```typescript
hasData: insights.some(insight => insightBelongsToVertical(insight, v.id))
```
Now correctly counts insights for each vertical, including cross-vertical ones.

#### B. Main Insights Filtering
```typescript
let filtered = insights.filter(insight => insightBelongsToVertical(insight, selectedVertical));
```
Filters insights to show all that belong to the selected vertical, regardless of whether they're single or cross-vertical.

#### C. Tab Count Calculations
```typescript
const insightsCount = insights.filter(i => 
  !isForecast(i) && !isGoalInsight(i) && insightBelongsToVertical(i, selectedVertical)
).length;
```
Correctly counts insights, forecasts, and goals for each vertical, including cross-vertical ones.

## Example Scenarios

### Scenario 1: Cross-Vertical Finance + Life Essentials Insight
**Backend Response:**
```json
{
  "insight_id": "abc123",
  "title": "Grocery spending affecting emergency fund",
  "vertical_scope": "cross_vertical",
  "verticals_involved": ["finance", "life_essentials"],
  ...
}
```

**Frontend Behavior:**
- ✅ Appears in "Money" filter (sagaa_money)
- ✅ Appears in "Life Essentials" filter (sagaa_lifeessentials)
- ❌ Does NOT appear in "Healthcare" or "Education" filters

### Scenario 2: Single Vertical Finance Insight
**Backend Response:**
```json
{
  "insight_id": "def456",
  "title": "High dining expenses this month",
  "vertical_scope": "finance",
  "vertical": "sagaa_money",
  ...
}
```

**Frontend Behavior:**
- ✅ Appears in "Money" filter only
- ❌ Does NOT appear in other filters

### Scenario 3: Legacy Insight (Backward Compatibility)
**Backend Response:**
```json
{
  "insight_id": "old789",
  "title": "Budget alert",
  "vertical": "sagaa_money"
  // No vertical_scope or verticals_involved fields
}
```

**Frontend Behavior:**
- ✅ Still works correctly using the `vertical` field
- ✅ Defaults to "Money" if no vertical specified

## Testing Checklist

- [ ] Cross-vertical insights appear in all involved verticals
- [ ] Single-vertical insights only appear in their designated vertical
- [ ] Legacy insights without new fields still work correctly
- [ ] Vertical sidebar badge counts are accurate (including cross-vertical)
- [ ] Filter tab counts (All, Insights, Forecasts, Goals) are accurate
- [ ] No duplicate insights appear in any vertical
- [ ] Backend vertical names are correctly mapped to frontend IDs

## Notes

- The implementation maintains full backward compatibility with old insights
- The mapping function handles the difference between backend naming (`finance`) and frontend naming (`sagaa_money`)
- Cross-vertical insights are counted once per vertical they belong to (intentional - shows in all relevant contexts)
- The `vertical` field is still used for single-vertical insights and as a fallback

## Date Implemented
October 27, 2025
