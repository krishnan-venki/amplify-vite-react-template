# Dashboard Insights - Cross-Vertical Support

## Overview
Updated the Dashboard Insights section to display insights for all four verticals (Money, Healthcare, Life Essentials, and Education) and added support for cross-vertical insights.

## Changes Made

### 1. Dashboard.tsx
**File:** `src/pages/Dashboard.tsx`

Added two new insight cards to the "Your Insights" section:
- **Life Essentials** insight card (vertical: `sagaa_lifeessentials`)
- **Education** insight card (vertical: `sagaa_education`)

The insight cards are now displayed in a 2x2 grid layout:
```
┌─────────────────┬─────────────────┐
│     Money       │   Healthcare    │
├─────────────────┼─────────────────┤
│ Life Essentials │   Education     │
└─────────────────┴─────────────────┘
```

### 2. aggregateInsights.ts
**File:** `src/utils/aggregateInsights.ts`

Enhanced the `aggregateInsightsByVertical` function to support **cross-vertical insights**:

#### Key Features:
1. **Cross-Vertical Detection**: Checks if an insight has `vertical_scope === 'cross_vertical'`
2. **Multiple Vertical Assignment**: When an insight is cross-vertical, it gets added to all verticals listed in `verticals_involved` array
3. **Backend-to-Frontend Mapping**: Automatically maps backend vertical names to frontend IDs:
   - `finance` → `sagaa_money`
   - `health` → `sagaa_healthcare`
   - `education` → `sagaa_education`
   - `life_essentials` → `sagaa_lifeessentials`
4. **Duplicate Prevention**: Ensures the same insight isn't added multiple times to a vertical's insight list

#### Example:
If an insight has:
```json
{
  "vertical_scope": "cross_vertical",
  "verticals_involved": ["finance", "life_essentials"],
  ...
}
```

This insight will appear in both:
- Money (sagaa_money) insight card
- Life Essentials (sagaa_lifeessentials) insight card

### 3. Insight Type Definition
**File:** `src/types/insight.ts` (already existed)

The Insight type already includes the necessary fields:
- `vertical_scope?: string` - Identifies cross-vertical insights
- `verticals_involved?: string[]` - Lists all verticals involved in a cross-vertical insight

## How It Works

### Single-Vertical Insight
```json
{
  "insight_id": "123",
  "vertical": "sagaa_lifeessentials",
  "insight_type": "maintenance_reminder",
  ...
}
```
→ Appears only in **Life Essentials** card

### Cross-Vertical Insight
```json
{
  "insight_id": "456",
  "vertical_scope": "cross_vertical",
  "verticals_involved": ["finance", "life_essentials"],
  "insight_type": "asset_depreciation_impact",
  ...
}
```
→ Appears in both **Money** and **Life Essentials** cards

## Benefits

1. **Complete Coverage**: All four verticals now have insight cards
2. **Cross-Vertical Support**: Insights that span multiple domains are properly displayed in all relevant verticals
3. **Consistent Behavior**: Dashboard now uses the same cross-vertical logic as the Insights page
4. **Better User Experience**: Users see all relevant insights in each vertical, including those that involve multiple life domains

## Technical Notes

- The aggregation logic iterates through insights once and adds each insight to all relevant verticals
- Statistics (counts, priority breakdowns, etc.) are calculated per vertical
- Cross-vertical insights increment counters in all relevant verticals
- The insight list in each vertical avoids duplicates using insight_id comparison

## Testing Recommendations

1. Test with insights that have `vertical: "sagaa_lifeessentials"`
2. Test with cross-vertical insights that include life_essentials in `verticals_involved`
3. Verify counts are correct when the same cross-vertical insight appears in multiple cards
4. Verify clicking on a card navigates to the Insights page with proper filtering

## Related Files

- `src/pages/Dashboard.tsx` - Dashboard with insight cards
- `src/utils/aggregateInsights.ts` - Aggregation logic
- `src/utils/insightUtils.ts` - Helper function `insightBelongsToVertical()`
- `src/components/VerticalInsightCard.tsx` - Individual insight card component
- `src/config/insightConfig.ts` - Vertical configuration (colors, icons)
- `src/types/insight.ts` - Insight type definition
