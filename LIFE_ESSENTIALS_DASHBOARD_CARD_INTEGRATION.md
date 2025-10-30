# Life Essentials Dashboard Card Integration

## Overview
Populated the Life Essentials card on the Dashboard page with real data from the Property & Assets section, similar to how the Money and Healthcare cards display detailed metrics.

## Changes Made

### 1. Added Assets Hook
- **File**: `src/pages/Dashboard.tsx`
- **Import**: Added `useAssets` hook from `../hooks/useAssets`
- **Usage**: Fetches asset summary data to populate the Life Essentials card

```typescript
// Fetch assets for Life Essentials
const { summary: assetsSummary, loading: assetsLoading } = useAssets();
```

### 2. Updated Life Essentials Vertical Configuration

**Before:**
```typescript
{
  id: 'life',
  icon: HomeIcon,
  name: 'Life Essentials',
  gradient: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
  bgGradient: 'linear-gradient(135deg, #fffbeb 0%, #fff7ed 100%)',
  route: '/life/dashboard',
  metrics: {
    label: 'Coming Soon',
    value: 'Q1 2026',
    change: ''
  },
  alerts: 0
}
```

**After:**
```typescript
{
  id: 'life',
  icon: HomeIcon,
  name: 'Life Essentials',
  gradient: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
  bgGradient: 'linear-gradient(135deg, #fffbeb 0%, #fff7ed 100%)',
  route: '/life/dashboard',
  metrics: {
    label: 'Property & Assets',
    value: assetsLoading ? '...' : `${assetsSummary.total_assets}`,
    change: assetsLoading ? '' : (assetsSummary.high_risk_count > 0 ? `${assetsSummary.high_risk_count} at risk` : 'All good')
  },
  alerts: assetsLoading ? 0 : (assetsSummary.high_risk_count + assetsSummary.due_for_maintenance),
  detailedMetrics: [...]
}
```

### 3. Added Detailed Metrics (4 Inner Cards)

The Life Essentials card now displays 4 mini metric cards (2x2 grid):

#### 1. Total Assets
- **Icon**: 🎯 (Target)
- **Label**: "Total Assets"
- **Value**: Total number of tracked assets
- **Trend**: "Tracked"
- **Color**: Orange (#f59e0b)

#### 2. High Risk
- **Icon**: 🔔 (Bell)
- **Label**: "High Risk"
- **Value**: Number of assets at high risk
- **Trend**: "Assets"
- **Color**: Red (#ef4444) if any at risk, Green (#10b981) if none
- **Dynamic Color**: Changes based on risk count

#### 3. Maintenance Due
- **Icon**: 📊 (Activity)
- **Label**: "Maintenance Due"
- **Value**: Number of assets needing maintenance soon
- **Trend**: "Soon"
- **Color**: Orange (#f59e0b) if any due, Green (#10b981) if none
- **Dynamic Color**: Changes based on maintenance count

#### 4. Est. Cost
- **Icon**: 💰 (DollarSign)
- **Label**: "Est. Cost"
- **Value**: Formatted currency amount for estimated replacement costs
- **Trend**: "18 months"
- **Color**: Orange (#f59e0b)
- **Format**: Currency with no decimals (e.g., "$12,500")

## Data Source

### Assets Summary
Data comes from the `useAssets()` hook which fetches from the Life Essentials API:

```typescript
interface AssetsSummary {
  total_assets: number;
  high_risk_count: number;
  due_for_maintenance: number;
  total_replacement_cost_estimate: number;
}
```

### API Endpoint
- **Endpoint**: Defined in `API_ENDPOINTS.ASSETS`
- **Method**: GET
- **Authentication**: Bearer token from AWS Amplify auth session

## Visual Design

### Card Layout
- The Life Essentials card matches the Money and Healthcare card design
- Uses a 2x2 grid for the 4 mini metric cards
- Each mini metric has:
  - Icon with colored background
  - Label text
  - Large value display
  - Small trend indicator
  - Optional progress bar (not used for assets)

### Interaction
- Card is now **clickable** (no longer "Coming Soon")
- Navigates to `/life/dashboard` when clicked
- Shows alerts badge (combined high risk + due for maintenance)
- Hover effects apply (lift and shadow)

### Loading State
- Shows "..." while loading
- Metrics are conditionally rendered when data is available
- No detailed metrics shown during loading

## Color Scheme
Consistent with Life Essentials branding:
- **Primary**: Orange (#f59e0b)
- **Gradient**: `linear-gradient(135deg, #f59e0b 0%, #f97316 100%)`
- **Background**: `linear-gradient(135deg, #fffbeb 0%, #fff7ed 100%)`
- **Dynamic Colors**: Red for alerts, Green for success, Orange for warnings

## Future Enhancements

### Planned (Other 3 Tabs)
When the other 3 Life Essentials tabs are implemented, additional metrics can be added:

1. **Household Ops** (Coming Soon)
   - Shopping list items
   - Recurring purchases
   - Active subscriptions
   - Upcoming deliveries

2. **Family & Life** (Coming Soon)
   - Calendar events this week
   - Pending chores
   - Pet care tasks
   - Child activities

3. **Docs & Prep** (Coming Soon)
   - Documents stored
   - Expiring documents
   - Insurance policies
   - Emergency contacts

### Implementation Options
1. **Expand to 6 or 8 cards** in a 3-column or 4-column grid
2. **Add tabs to the card** to switch between Property, Household, Family, Docs
3. **Show top priority item** from each category in the 4-card grid
4. **Cycle through categories** with a carousel/slider

## Technical Notes

### Type Safety
- All metrics include `progress: undefined` to match the `MiniMetricProps` interface
- Dynamic colors are calculated conditionally based on data values
- Currency formatting uses `Intl.NumberFormat` for consistent display

### Performance
- Data is fetched once using the `useAssets` hook
- Loading states prevent UI flash during data fetch
- Shared hook instance if used elsewhere in the dashboard

### Consistency
- Matches the design pattern of Money and Healthcare cards
- Reuses the `MiniMetric` component for consistency
- Follows the same grid layout and styling conventions

## Testing Checklist
- [ ] Verify asset data loads correctly
- [ ] Check loading state displays
- [ ] Confirm navigation to Life Essentials dashboard works
- [ ] Test alert badge shows correct count
- [ ] Verify color changes based on risk/maintenance status
- [ ] Check currency formatting displays correctly
- [ ] Test responsive behavior on mobile
- [ ] Verify hover effects work properly
- [ ] Check that "Ask Sagaa" button appears
- [ ] Test with empty state (0 assets)

## Related Files
- `src/pages/Dashboard.tsx` - Main dashboard with updated Life Essentials card
- `src/hooks/useAssets.ts` - Hook for fetching asset data
- `src/components/lifeessentials/AssetOverviewCards.tsx` - Reference for metrics structure
- `src/components/lifeessentials/LifeEssentialsDashboard.tsx` - Full Life Essentials page
- `src/types/asset.ts` - Asset and summary type definitions

## Summary
The Life Essentials card is now fully populated with real Property & Assets data, displaying 4 key metrics in a visually consistent format. The card is interactive and provides quick insights into asset health, maintenance needs, and estimated costs, encouraging users to explore the full Life Essentials dashboard for more details.
