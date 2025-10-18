# Backend API Contract for Chat Response

## Overview
The chat API response now supports multiple optional features that conditionally show tabs in the UI. Each feature has a boolean flag and optional data payload.

## Response Interface

```typescript
interface SagaaResponse {
  // Required fields
  response: string;              // Markdown text response to display in Answer tab
  
  // Optional features - each has a flag and data
  chartable?: boolean;           // If true, shows Dashboard tab
  chartData?: ChartData;
  
  hasInsights?: boolean;         // If true, shows Insights tab
  insightsData?: any;            // Placeholder for future insights data structure
  
  hasImages?: boolean;           // If true, shows Images tab
  imagesData?: string[];         // Array of image URLs
  
  hasSources?: boolean;          // If true, shows Sources tab
  sourcesData?: Array<{
    title: string;
    url?: string;
    type?: string;
  }>;
}
```

## Chart Data Structure

```typescript
interface ChartData {
  type: 'bar';                   // Currently only 'bar' is supported
  title?: string;                // Chart title (optional)
  xAxis: {
    label?: string;              // X-axis label (optional)
    data: string[];              // Category names/labels
  };
  yAxis: {
    label?: string;              // Y-axis label (optional)
    data: number[];              // Numeric values
  };
}
```

## Example Responses

### 1. Simple Text Response (No Special Features)
```json
{
  "response": "Your account balance is $1,234.56. It has increased by 5% this month."
}
```
**Result:** Only "Answer" tab shown

---

### 2. Response with Chart
```json
{
  "response": "Here's your monthly expense breakdown:\n\n- Groceries: $450\n- Utilities: $200\n- Entertainment: $150\n- Transport: $300",
  "chartable": true,
  "chartData": {
    "type": "bar",
    "title": "Monthly Expenses Breakdown",
    "xAxis": {
      "label": "Category",
      "data": ["Groceries", "Utilities", "Entertainment", "Transport"]
    },
    "yAxis": {
      "label": "Amount ($)",
      "data": [450, 200, 150, 300]
    }
  }
}
```
**Result:** "Answer" and "Dashboard" tabs shown

---

### 3. Response with Multiple Features
```json
{
  "response": "Your health metrics show improvement over the last 30 days. Here's what I found:",
  "chartable": true,
  "chartData": {
    "type": "bar",
    "title": "Health Metrics - 30 Day Trend",
    "xAxis": {
      "label": "Metric",
      "data": ["Steps", "Sleep Hours", "Water Intake", "Exercise Minutes"]
    },
    "yAxis": {
      "label": "Daily Average",
      "data": [8500, 7.2, 64, 45]
    }
  },
  "hasInsights": true,
  "insightsData": {
    "summary": "Your step count increased by 15% compared to last month",
    "recommendations": [
      "Try to maintain 8 hours of sleep consistently",
      "Increase water intake to 8 glasses per day"
    ]
  },
  "hasSources": true,
  "sourcesData": [
    {
      "title": "WHO Sleep Guidelines",
      "url": "https://www.who.int/sleep-guidelines",
      "type": "reference"
    },
    {
      "title": "Your Fitbit Data",
      "type": "device"
    }
  ]
}
```
**Result:** "Answer", "Dashboard", "Insights", and "Sources" tabs shown

---

### 4. Response with Images
```json
{
  "response": "Here are some recipes that match your dietary preferences:",
  "hasImages": true,
  "imagesData": [
    "https://example.com/recipe1.jpg",
    "https://example.com/recipe2.jpg",
    "https://example.com/recipe3.jpg"
  ]
}
```
**Result:** "Answer" and "Images" tabs shown

---

## UI Behavior

### Tab Visibility Rules:
- **Answer Tab**: Always shown when there's a response
- **Insights Tab**: Only shown when `hasInsights: true`
- **Dashboard Tab**: Only shown when `chartable: true`
- **Images Tab**: Only shown when `hasImages: true`
- **Sources Tab**: Only shown when `hasSources: true`

### Tab Selection:
- Answer tab is selected by default
- User can click other tabs to switch views
- Each tab shows its respective content when selected
- Tab selection is maintained per conversation message

---

## Implementation Notes

### For Backend Team:
1. **Always include** the `response` field with markdown text
2. **Optionally add** feature flags (`chartable`, `hasInsights`, etc.) when applicable
3. **Include corresponding data** when flag is `true`
4. The frontend will handle:
   - Conditional tab rendering
   - Tab state management
   - Content visualization
   - Context-aware styling

### Chart Recommendations:
- Use charts for numeric comparisons (expenses, metrics, trends)
- Keep categories concise (3-10 items work best)
- Ensure xAxis.data and yAxis.data have the same length
- Provide meaningful labels and titles

### Data Structure Guidelines:
- **insightsData**: Can be any structure (to be defined when implemented)
- **imagesData**: Array of valid image URLs (https://)
- **sourcesData**: Array of objects with at least a `title` field

---

## Future Enhancements
- Support for multiple chart types (line, pie, scatter)
- Multi-series charts
- Interactive insights panels
- Image galleries with captions
- Source citation formatting

---

## Questions?
Contact the frontend team for any clarifications on the contract structure.
