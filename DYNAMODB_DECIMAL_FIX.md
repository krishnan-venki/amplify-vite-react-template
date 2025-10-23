# DynamoDB Decimal Type Fix

## Issue
DynamoDB does not support Python `float` types. When storing numeric values, DynamoDB requires `Decimal` types instead.

**Error:**
```
TypeError: Float types are not supported. Use Decimal types instead.
```

## Solution
Added a helper function `convert_floats_to_decimal()` to recursively convert all float values to Decimal before storing in DynamoDB.

## Changes Made

### 1. Added Import
All three Lambda files now import `Decimal`:
```python
from decimal import Decimal
```

### 2. Added Helper Function
```python
def convert_floats_to_decimal(obj):
    """
    Recursively convert all float values to Decimal for DynamoDB compatibility
    """
    if isinstance(obj, list):
        return [convert_floats_to_decimal(item) for item in obj]
    elif isinstance(obj, dict):
        return {key: convert_floats_to_decimal(value) for key, value in obj.items()}
    elif isinstance(obj, float):
        # Convert float to Decimal, handle special cases
        if obj != obj:  # NaN check
            return Decimal('0')
        elif obj == float('inf'):
            return Decimal('999999999')
        elif obj == float('-inf'):
            return Decimal('-999999999')
        else:
            return Decimal(str(obj))
    else:
        return obj
```

### 3. Updated DynamoDB Item Creation
Changed from:
```python
'visual_data': visual_data,
```

To:
```python
'visual_data': convert_floats_to_decimal(visual_data),
```

## Files Updated
1. ✅ `proactive_insights_lambda.py`
2. ✅ `monthly_review_insights_lambda.py`
3. ✅ `foresights_lambda.py`

## What Gets Converted
The function handles:
- **Simple floats**: `93.5` → `Decimal('93.5')`
- **Nested dictionaries**: All float values in visual_data structure
- **Lists**: All float values in chart_data arrays
- **Special cases**:
  - `NaN` → `Decimal('0')`
  - `inf` → `Decimal('999999999')`
  - `-inf` → `Decimal('-999999999')`

## Example Conversion
**Before (Python):**
```python
visual_data = {
    'chart_type': 'donut',
    'primary_metric': {
        'value': 93,  # int - no change needed
        'label': 'Discretionary Spending',
        'unit': '%'
    },
    'chart_data': [
        {
            'name': 'Discretionary',
            'value': 93.5,  # float - will be converted
            'amount': 44820.75  # float - will be converted
        }
    ]
}
```

**After (DynamoDB):**
```python
visual_data = {
    'chart_type': 'donut',
    'primary_metric': {
        'value': 93,  # stays as int
        'label': 'Discretionary Spending',
        'unit': '%'
    },
    'chart_data': [
        {
            'name': 'Discretionary',
            'value': Decimal('93.5'),  # converted to Decimal
            'amount': Decimal('44820.75')  # converted to Decimal
        }
    ]
}
```

## Frontend Handling
When reading from DynamoDB in the frontend, Decimal values will be automatically converted back to JavaScript numbers by the AWS SDK, so no frontend changes are needed.

## Testing
After deploying the updated Lambda functions, test with:
```json
{
  "user_id": "user_001"
}
```

You should see:
```
[INFO] Generating visual data for insight type: spending_pattern
[INFO] Stored insight: <title> with donut visualization
[SUCCESS] Stored X insights in DynamoDB
```

No more float type errors! ✅
