# 🚀 Quick Start Guide - Visual Insights

## Testing the Implementation

### Option 1: Use Mock Data (Immediate Testing)

1. **Import mock data** in `src/hooks/useInsights.ts`:

```typescript
import { mockInsights } from '../assets/mockInsightData';

// In your useInsights hook, temporarily return mock data:
export function useInsights() {
  return {
    data: mockInsights,
    isLoading: false,
    isError: false,
    refetch: () => {}
  };
}
```

2. **Navigate to `/insights`** in your app

3. **Test all interactions**:
   - ✅ Click "Show Details" to expand cards
   - ✅ Hover over charts to see tooltips
   - ✅ Notice highlighted data points (amber)
   - ✅ Scroll through different chart types
   - ✅ Test vertical filtering (Money tab)
   - ✅ Test type filtering (Insights vs Forecasts)

### Option 2: Update Backend Lambda

Update your Lambda to return insights with the new structure. See examples in `src/assets/mockInsightData.ts`.

**Key fields to add:**
```python
{
    # Existing fields...
    "title": "...",
    "summary": "...",
    "actions": [...],
    "impact": "...",
    
    # NEW: Add these
    "visualization": {
        "chart_type": "bar_with_trend",  # or "bar", "line", "donut", "comparison_bars"
        "data": [
            {"label": "Jan", "value": 12000},
            {"label": "Dec", "value": 19000, "highlight": True}
        ],
        "annotation": "Optional subtitle text"
    },
    
    "key_metric": {
        "primary_value": "$19,000+",
        "primary_label": "December Expenses",
        "secondary": "+$4,500 vs average",
        "icon": "alert"  # or "trend-up", "trend-down", "info", "warning"
    }
}
```

---

## Chart Type Decision Tree

**Choose chart type based on your data:**

```
Do you have categories to compare?
├─ YES → Are they time-based?
│         ├─ YES → Want to show trend?
│         │        ├─ YES → "bar_with_trend"
│         │        └─ NO → "line"
│         └─ NO → Want to show percentages?
│                  ├─ YES → "donut"
│                  └─ NO → "comparison_bars"
└─ NO → Just showing one metric?
         └─ Use key_metric only (no chart)
```

**Examples:**
- **Monthly spending over time** → `line` or `bar_with_trend`
- **Category breakdown** → `donut`
- **Budget vs Actual** → `comparison_bars`
- **Simple trend** → `bar`
- **Single big number** → Just `key_metric`, no visualization

---

## Icon Selection Guide

For `key_metric.icon`:

| Icon | When to Use | Visual |
|------|-------------|--------|
| `alert` | High-priority warnings, urgent issues | ⚠️ |
| `warning` | Medium-priority cautions, watch items | ⚡ |
| `trend-up` | Positive growth, increasing savings | 📈 |
| `trend-down` | Decreasing spending, improving efficiency | 📉 |
| `info` | Informational, neutral opportunities | ℹ️ |

---

## Data Highlighting

Set `highlight: true` on important data points:

```python
"data": [
    {"label": "Jan", "value": 12000},
    {"label": "Feb", "value": 12500},
    {"label": "Dec", "value": 19000, "highlight": True}  # ← This will be amber!
]
```

**When to highlight:**
- ✅ The problem month (highest spending)
- ✅ Current period (today's bar)
- ✅ Over-budget categories
- ✅ Outliers that need attention
- ❌ Don't highlight more than 1-2 points

---

## Testing Checklist

Run through these scenarios:

### Visual Testing
- [ ] All 5 chart types render correctly
- [ ] Charts display in compact mode when collapsed
- [ ] Charts expand to full size when card expanded
- [ ] Tooltips show on hover
- [ ] Highlighted data points are amber
- [ ] Trend lines display (for bar_with_trend)
- [ ] Annotations appear below charts

### Data Testing
- [ ] Missing visualization → Shows gracefully
- [ ] Missing key_metric → Card still works
- [ ] Legacy text-only insight → Falls back correctly
- [ ] Empty data array → Shows "No data" message
- [ ] Invalid chart_type → Shows error message

### Interaction Testing
- [ ] Expand/collapse smooth animation
- [ ] Cards have hover lift effect
- [ ] Vertical filtering works
- [ ] Type filtering (Insights/Forecasts) works
- [ ] Priority badges display correctly
- [ ] Confidence badges show for forecasts

### Content Testing
- [ ] Title displays (60-80 chars)
- [ ] Summary displays (150 chars max)
- [ ] Actions show as pills (1-3 items)
- [ ] Impact statement in gold box
- [ ] Full content expands correctly
- [ ] Time stamp shows relative time

---

## Common Issues & Fixes

### Issue: Charts not appearing
**Fix:** Check that `visualization.data` has at least 1 item with `label` and `value`

### Issue: Chart type not rendering
**Fix:** Verify `chart_type` matches exactly: `"bar"`, `"line"`, `"donut"`, `"comparison_bars"`, or `"bar_with_trend"`

### Issue: Trend line not showing
**Fix:** Ensure you're using `chart_type: "bar_with_trend"` AND providing `trend_line` array

### Issue: Highlight not working
**Fix:** Set `highlight: true` (not `highlight: 1` or `highlight: "true"`)

### Issue: Key metric not displaying
**Fix:** Ensure `key_metric` object has all required fields: `primary_value`, `primary_label`, `secondary`, `icon`

### Issue: Legacy insights breaking
**Fix:** Component handles this automatically - no action needed

---

## Performance Tips

1. **Limit data points**: 5-12 points per chart for best readability
2. **Use compact mode**: Automatically used in collapsed state
3. **Keep actions short**: 3 max, 100 chars each
4. **Optimize images**: No images in current implementation
5. **Cache insights**: Already handled by React Query

---

## Customization

### Change Chart Colors

Edit in respective chart components:

```typescript
// src/components/charts/InsightBarChart.tsx
const primaryColor = '#10b981';  // ← Change this
const highlightColor = '#f59e0b';  // ← And this
```

### Change Card Layout

Edit `InsightCardVisual.tsx`:

```typescript
// Around line 160 - Chart + Metrics grid
gridTemplateColumns: hasVisualization ? '1fr 1fr' : '1fr',
// Change to '2fr 1fr' for wider chart, or '1fr 2fr' for wider metrics
```

### Adjust Compact Chart Size

Edit chart components:

```typescript
const height = compact ? 180 : 300;  // ← Change 180 for collapsed height
```

---

## Next Steps

1. ✅ **Test with mock data** (see Option 1 above)
2. ✅ **Update your Lambda** to return new fields (see Option 2)
3. ✅ **Deploy and monitor** user engagement
4. 📱 **Plan mobile optimizations** (future enhancement)
5. 🎤 **Add narration feature** (future enhancement)

---

## Support Resources

- **Full Documentation**: `VISUAL_INSIGHTS_IMPLEMENTATION.md`
- **Summary**: `VISUAL_INSIGHTS_SUMMARY.md`
- **Mock Data**: `src/assets/mockInsightData.ts`
- **TypeScript Types**: `src/types/insight.ts`

---

## Quick Commands

```bash
# Check for errors
npm run build

# Start dev server
npm run dev

# Type check
npm run type-check  # (if available)
```

---

**Happy Testing! 🎉**

If you see charts rendering with your mock data, you're all set! 
The implementation is complete and ready for production use.
