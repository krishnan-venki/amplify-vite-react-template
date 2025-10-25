# Goals Backend Schema Alignment

## Issue
Frontend TypeScript interfaces didn't match backend DynamoDB schema, causing goal names to show as "Unnamed Goal".

## Backend Schema (from DynamoDB response)
```json
{
  "goal_id": "Goal_001",
  "goal_name": "Emergency Fund",        // ← Frontend expected "name"
  "goal_type": "savings_target",        // ← Frontend expected "type"
  "status": "active",
  "target": { ... },
  "progress": { ... },
  "baseline": { ... },                  // ← Not in original frontend type
  "context": {                          // ← Not in original frontend type
    "intent": "Build 6-month expense...",
    "user_priority": "high"
  },
  "evaluation_history": [ ... ],        // ← Not in original frontend type
  "created_at": "2025-10-01T00:00:00Z",
  "updated_at": "2025-10-24T08:15:16.722472"
}
```

## Changes Made

### 1. Updated TypeScript Interface (`src/types/goal.ts`)

**Goal Interface Changes:**
- `name` → `goal_name` ✅
- `type` → `goal_type` ✅
- `priority` → made optional (comes from `context.user_priority`)
- `intent` → made optional (comes from `context.intent`)
- Added `baseline` field
- Added `context` field
- Added `evaluation_history` array
- `latest_evaluation` computed from evaluation_history

**GoalEvaluation Interface Changes:**
- `evaluated_at` → made optional, backend uses `date`
- `date` → added as alternative field name
- `pace` → made optional
- `insights`, `recommendations` → made optional (arrays)
- Added additional backend fields: `current_amount`, `percentage_complete`, etc.

**GoalSummary Interface Changes:**
- `name` → `goal_name`
- `type` → `goal_type`

### 2. Updated Components

#### GoalsSidebar.tsx
```typescript
// Before
{goal.name}
const icon = goalTypeIcons[goal.type];

// After
{goal.goal_name || 'Unnamed Goal'}
const icon = goalTypeIcons[goal.goal_type];
```

#### GoalDetailView.tsx
```typescript
// Before
{goal.name}
getGoalIcon(goal.type)
{goal.intent}

// After
{goal.goal_name || 'Unnamed Goal'}
getGoalIcon(goal.goal_type)
{goal.intent || goal.context?.intent}
```

### 3. Updated Data Processing (`src/hooks/useGoals.ts`)

Added processing to extract `latest_evaluation` from `evaluation_history` array:

```typescript
const goalsData = (data.goals || []).map((goal: Goal) => {
  if (goal.evaluation_history && goal.evaluation_history.length > 0) {
    const latestEval = goal.evaluation_history[goal.evaluation_history.length - 1];
    return {
      ...goal,
      latest_evaluation: {
        evaluated_at: latestEval.date || latestEval.evaluated_at,
        status: latestEval.status,
        pace: latestEval.pace || 'adequate',
        insights: latestEval.insights || [],
        recommendations: latestEval.recommendations || [],
        projected_completion: latestEval.projected_completion,
        monthly_required: latestEval.monthly_required
      }
    };
  }
  return goal;
});
```

## Backend Data Structure

### Goal Types
- `savings_target` - Save X amount by Y date (e.g., Emergency Fund, Education Savings)
- `spending_reduction` - Reduce category spending (e.g., Reduce Eating Outside)
- `debt_payoff` - Pay off debt by date

### Baseline Tracking
```json
"baseline": {
  "snapshot_date": "2025-10-01",
  "amount": 500,                      // For savings_target
  "historical_average": 400,          // For spending_reduction
  "source": "user_reported",
  "calculation_period": "2024-01 to 2025-09"
}
```

### Context (User Preferences)
```json
"context": {
  "intent": "Build 6-month expense cushion for financial security",
  "user_priority": "high"
}
```

### Evaluation History
Array of historical evaluations, latest one extracted as `latest_evaluation`:
```json
"evaluation_history": [
  {
    "date": "2025-10-24T08:15:16.722375",
    "status": "on_track",
    "pace": "good",
    "insights": ["...", "..."],
    "recommendations": ["...", "..."],
    "current_amount": 8500,
    "percentage_complete": 53.12,
    "total_contributions": 8000,
    "projected_completion": "2025-10-15"
  }
]
```

## Result

✅ Goal names now display correctly ("Emergency Fund", "Education Savings", "Reduce Eating Outside")
✅ Goal types correctly mapped (savings_target, spending_reduction)
✅ Latest evaluation extracted from evaluation_history
✅ Context intent displayed when available
✅ All TypeScript types aligned with backend schema

## Testing Checklist

- [x] Goal names visible in sidebar
- [x] Goal names visible in detail view header  
- [x] Goal types correctly identified (icons and labels)
- [x] Goal intent displaying from context
- [x] Latest evaluation displaying (status, pace, insights)
- [x] Console logging shows correct field names
- [x] No TypeScript compilation errors
- [x] "Unnamed Goal" fallback works if name missing
