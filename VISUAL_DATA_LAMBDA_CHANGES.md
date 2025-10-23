# Lambda Visual Data Enhancement - Summary

## Overview
All three insight generation Lambda functions have been updated to include structured visual data for chart rendering on the frontend.

## Changes Made

### 1. **proactive_insights_lambda.py**
**Location:** `src/utils/proactive_insights_lambda.py`

**New Functions Added:**
- `generate_visual_data()` - Main dispatcher function
- `generate_spending_pattern_visual()` - Donut chart for discretionary vs essential
- `generate_trend_visual()` - Line chart for spending trends (6 months)
- `generate_optimization_visual()` - Horizontal bar chart for savings opportunities
- `generate_risk_visual()` - Gauge chart for risk scoring
- `generate_seasonal_visual()` - Line chart for seasonal patterns
- `generate_metric_card()` - Fallback simple metric display

**Chart Types Generated:**
- `spending_pattern` → **donut** (discretionary % breakdown)
- `trend_projection` / `lifestyle_creep` → **line** (6-month trend)
- `optimization` → **bar_horizontal** (top 5 savings opportunities)
- `risk` → **gauge** (risk score 0-100)
- `seasonal` → **line** (monthly spending patterns)
- Fallback → **metric_card**

**Modified Functions:**
- `store_insights()` - Now accepts `context` parameter and includes `visual_data` field
- Lambda handler - Updated call to `store_insights(user_id, insights, context)`

---

### 2. **monthly_review_insights_lambda.py**
**Location:** `src/utils/monthly_review_insights_lambda.py`

**New Functions Added:**
- `generate_visual_data_for_monthly_review()` - Comparison visualization generator

**Chart Types Generated:**
- `monthly_review` → **bar_comparison** (target month vs baseline)
  - Includes top 5 category changes
  - Shows percentage deviation
  - Color-coded (red for over, green for under)

**Visual Data Structure:**
```python
{
  'chart_type': 'bar_comparison',
  'primary_metric': { value, label, unit },
  'chart_data': [baseline_bar, current_month_bar],
  'category_changes': [top 5 categories with diff/pct_change],
  'comparison': { baseline, current, diff, pct_change },
  'secondary_metrics': [target, baseline, difference]
}
```

**Modified Functions:**
- `store_insights()` - Now accepts `context` parameter and generates visual data
- Lambda handler - Updated call to `store_insights(user_id, insights, context)`

---

### 3. **foresights_lambda.py**
**Location:** `src/utils/foresights_lambda.py`

**New Functions Added:**
- `generate_visual_data_for_foresight()` - Main dispatcher
- `generate_cashflow_forecast_visual()` - Line chart with forecast projection
- `generate_seasonal_forecast_visual()` - 12-month seasonal pattern
- `generate_trend_projection_visual()` - Category trend bars
- `generate_risk_warning_visual()` - Gauge for financial risk
- `generate_opportunity_forecast_visual()` - Savings opportunity bars
- `generate_foresight_metric_card()` - Fallback

**Chart Types Generated:**
- `cash_flow_forecast` → **line_forecast** (6 months historical + 3 months projected)
- `seasonal_forecast` → **line_seasonal** (12-month historical pattern)
- `trend_projection` → **bar_horizontal** (top 5 trending categories)
- `risk_warning` → **gauge** (financial risk score)
- `opportunity_forecast` → **bar_horizontal** (savings opportunities)
- Fallback → **metric_card**

**Modified Functions:**
- `store_foresights()` - Now accepts `context` parameter and includes `visual_data`
- Lambda handler - Updated call to `store_foresights(user_id, foresights, context)`
- Added `forecast_horizon` and `confidence_level` fields to DynamoDB items

---

## Visual Data Structure (Common Format)

All visual data follows this TypeScript-compatible structure:

```python
{
    'chart_type': str,  # donut, line, bar_horizontal, bar_comparison, gauge, line_forecast, line_seasonal, metric_card
    'primary_metric': {
        'value': int,
        'label': str,
        'unit': str  # %, $, $/mo, /100, etc.
    },
    'chart_data': list,  # Chart-specific data array
    'trend': str,  # Optional: up, down, stable, seasonal
    'comparison': dict,  # Optional: comparison metrics
    'category_changes': list,  # Optional: for monthly reviews
    'thresholds': list,  # Optional: for gauge charts
    'secondary_metrics': list,  # Optional: additional metrics
    'colors': list,  # Optional: color palette
    'forecast_start_index': int  # Optional: for forecast charts
}
```

---

## Data Sources

All visual data is computed from **already-existing context dictionaries**:

### Proactive Insights Context
- `behavioral_summary` → discretionary_pct, essential_pct, totals
- `monthly_summary` → 12 months of spending data
- `category_summary` → category breakdown
- `merchant_summary` → top merchants

### Monthly Review Context
- `target_data` → current month metrics
- `baseline_monthly_avg` → 12-month averages
- `comparison` → diffs and % changes
- `category_changes` → significant category deviations

### Foresights Context
- `monthly_cashflow` → income/expense/net by month
- `seasonal_patterns` → year-over-year monthly averages
- `category_trends` → recent vs prior 6-month comparison
- `summary` → aggregate metrics

---

## Testing Instructions

### 1. Deploy Updated Lambdas
Upload all three Python files to your Lambda functions or deploy via your IaC tool.

### 2. Test Each Lambda
```python
# Test proactive insights
{
  "user_id": "user_001"
}

# Test monthly review
{
  "user_id": "user_001",
  "target_year": 2024,
  "target_month": 10
}

# Test foresights
{
  "user_id": "user_001"
}
```

### 3. Verify DynamoDB
Check that insights now have `visual_data` field:
```json
{
  "insight_id": "...",
  "insight_type": "spending_pattern",
  "visual_data": {
    "chart_type": "donut",
    "primary_metric": {
      "value": 93,
      "label": "Discretionary Spending",
      "unit": "%"
    },
    "chart_data": [...]
  }
}
```

### 4. CloudWatch Logs
Look for these success messages:
```
[INFO] Generating visual data for insight type: spending_pattern
[INFO] Generated donut visualization
[INFO] Stored insight: <title> with donut visualization
```

---

## Chart Type Summary

| Insight Type | Chart Type | Key Metrics | Data Points |
|--------------|------------|-------------|-------------|
| **spending_pattern** | donut | Discretionary % | 2 segments |
| **trend_projection** | line | % change over time | 6 months |
| **optimization** | bar_horizontal | Savings potential | Top 5 categories |
| **risk** | gauge | Risk score 0-100 | Thresholds |
| **seasonal** | line | Monthly spending | 12+ months |
| **monthly_review** | bar_comparison | % vs baseline | 2 bars + category deltas |
| **cash_flow_forecast** | line_forecast | Future cash flow | 6 historical + 3 forecast |
| **seasonal_forecast** | line_seasonal | Yearly pattern | 12 months |
| **opportunity_forecast** | bar_horizontal | Savings potential | Top 5 opportunities |

---

## Next Steps (Frontend)

1. Update TypeScript types (`src/types/insight.ts`)
2. Create `InsightChartRenderer` component
3. Update `Insights.tsx` to render charts
4. Implement chart components using Recharts
5. Add "Explain why this matters" button for narrative

---

## Rollback Plan

If needed, revert these changes:
1. Remove `visual_data` generation functions
2. Revert `store_insights()` / `store_foresights()` signatures to not require `context`
3. Remove `visual_data` field from DynamoDB item creation
4. Existing insights without `visual_data` will continue to work (frontend should handle gracefully)

---

## Notes

- Visual data generation is **deterministic** (no LLM randomness)
- Uses **already-computed metrics** (no additional processing overhead)
- **Backwards compatible** - old insights without visual_data still work
- **Fail-safe** - Falls back to metric_card if data is insufficient
- **Cost-effective** - No additional LLM calls required
