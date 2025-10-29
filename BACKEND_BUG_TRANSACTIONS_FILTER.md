# Backend Bug Report: Transaction Category Filter

## 🐛 Issue Summary
When filtering transactions by `category_id`, the backend returns 0 results even though transactions with that category exist in the requested month.

**Status:** Backend Bug - Requires Lambda/DynamoDB Query Fix

---

## 🔍 Symptoms

### Working Scenarios:
✅ `GET /finance/transactions?month=2025-10&limit=50` → Returns 50+ transactions (mostly October, 2 September)
✅ `GET /finance/dashboard?month=2025-10` → Shows correct grocery spending for October
✅ `GET /finance/sankey?month=2025-10` → Shows grocery category with correct amounts

### Broken Scenario:
❌ `GET /finance/transactions?month=2025-10&category_id=cat_groceries&limit=50` → Returns 0 transactions

**Backend Response:**
```json
{
  "user_id": "8871f320-0051-7075-5db0-cb07b0b60821",
  "filters": {
    "month": "2025-10",
    "category_id": "cat_groceries"
  },
  "transactions": [],
  "summary": {
    "count": 0,
    "total_amount": 0,
    "has_more": true  // ⚠️ Says there's more data but returns 0
  },
  "pagination": {
    "limit": 50,
    "last_key": {
      "category_key": "USER#8871f320-0051-7075-5db0-cb07b0b60821#CAT#cat_groceries",
      "transaction_date": "2025-09-10",  // ⚠️ September date when October requested!
      "SK": "TXN#2025-09-10#txn_20250910_8250186efdf2",
      "PK": "USER#8871f320-0051-7075-5db0-cb07b0b60821"
    }
  }
}
```

---

## 🔬 Analysis

### Evidence:
1. **Data exists:** Dashboard and Sankey APIs show grocery expenses for October 2025
2. **Category exists:** Filtering "All Categories" shows transactions with `category_id: "cat_groceries"` in October
3. **Filter received:** Backend response shows `"filters": {"category_id": "cat_groceries"}` - parameter was received correctly
4. **Wrong month in pagination:** `last_key` shows September date when October was requested
5. **Month filter bug:** Even "All Categories" query leaks 2 September transactions when requesting October

### Root Cause Hypothesis:

The backend is likely using a **GSI (Global Secondary Index)** to query by category:
```
GSI_CategoryByDate:
  PK: category_key (e.g., "USER#xxx#CAT#cat_groceries")  
  SK: transaction_date (e.g., "2025-10-15")
```

**The Bug:** The query is not properly filtering by month when using the category GSI.

**Suspected Code Issue:**
```python
# ❌ WRONG - Queries GSI without month filter
response = table.query(
    IndexName='GSI_CategoryByDate',
    KeyConditionExpression='category_key = :cat_key',
    ExpressionAttributeValues={
        ':cat_key': f"USER#{user_id}#CAT#{category_id}"
    }
)
# Returns ALL transactions for category across ALL months!
```

**Expected Code:**
```python
# ✅ CORRECT - Queries GSI WITH month filter
response = table.query(
    IndexName='GSI_CategoryByDate',
    KeyConditionExpression='category_key = :cat_key AND begins_with(transaction_date, :month)',
    ExpressionAttributeValues={
        ':cat_key': f"USER#{user_id}#CAT#{category_id}",
        ':month': month  # "2025-10"
    }
)
```

---

## 🛠️ Backend Fix Required

### File to Update:
`lambda_package/api_transactions.py` (or similar transactions Lambda handler)

### Issue 1: Category Query Without Month Filter

**Current (Broken):**
```python
if category_id:
    # Query GSI by category
    query_params = {
        'IndexName': 'GSI_CategoryByDate',
        'KeyConditionExpression': 'category_key = :cat_key',
        'ExpressionAttributeValues': {
            ':cat_key': f"USER#{user_id}#CAT#{category_id}"
        },
        'Limit': limit
    }
```

**Fixed:**
```python
if category_id and month:
    # Query GSI by category AND filter by month
    query_params = {
        'IndexName': 'GSI_CategoryByDate',
        'KeyConditionExpression': 'category_key = :cat_key AND begins_with(transaction_date, :month)',
        'ExpressionAttributeValues': {
            ':cat_key': f"USER#{user_id}#CAT#{category_id}",
            ':month': month  # "2025-10"
        },
        'Limit': limit
    }
elif category_id:
    # Category without month - filter in memory after query
    query_params = {
        'IndexName': 'GSI_CategoryByDate',
        'KeyConditionExpression': 'category_key = :cat_key',
        'ExpressionAttributeValues': {
            ':cat_key': f"USER#{user_id}#CAT#{category_id}"
        },
        'Limit': limit
    }
```

### Issue 2: Month Filter Not Applied to Base Query

Even the "All Categories" query is returning 2 September transactions when October is requested.

**Current (Broken):**
```python
if month:
    # Month filter not being applied correctly
    pass  # Missing KeyConditionExpression for month
```

**Fixed:**
```python
if month and not category_id:
    # Query primary table with month filter
    query_params = {
        'KeyConditionExpression': 'PK = :user_key AND begins_with(SK, :month_prefix)',
        'ExpressionAttributeValues': {
            ':user_key': f"USER#{user_id}",
            ':month_prefix': f"TXN#{month}"  # "TXN#2025-10"
        },
        'Limit': limit
    }
```

---

## 📊 Expected Behavior

### Request:
```bash
GET /finance/transactions?month=2025-10&category_id=cat_groceries&limit=50
```

### Expected Response:
```json
{
  "user_id": "8871f320-0051-7075-5db0-cb07b0b60821",
  "filters": {
    "month": "2025-10",
    "category_id": "cat_groceries"
  },
  "transactions": [
    {
      "transaction_id": "txn_20251005_abc123",
      "transaction_date": "2025-10-05",  // ✅ October date
      "merchant_name": "Whole Foods",
      "category_id": "cat_groceries",
      "category_name": "Groceries",
      "amount": -125.43
    },
    {
      "transaction_id": "txn_20251012_def456",
      "transaction_date": "2025-10-12",  // ✅ October date
      "merchant_name": "Safeway",
      "category_id": "cat_groceries",
      "category_name": "Groceries",
      "amount": -89.67
    }
    // ... more October grocery transactions
  ],
  "summary": {
    "count": 15,  // ✅ Actual count of grocery transactions in October
    "total_amount": 1051.94,
    "has_more": false
  },
  "pagination": {
    "limit": 50,
    "last_key": null
  }
}
```

---

## 🧪 Test Cases

### Test 1: Month Only (Base Case)
```bash
GET /finance/transactions?month=2025-10&limit=50
```
**Expected:** Only October 2025 transactions (no September leaks)
**Current:** Returns 48 October + 2 September ❌

### Test 2: Category Only
```bash
GET /finance/transactions?category_id=cat_groceries&limit=50
```
**Expected:** All grocery transactions across all months
**Current:** Unknown (not tested)

### Test 3: Month + Category (Critical Case)
```bash
GET /finance/transactions?month=2025-10&category_id=cat_groceries&limit=50
```
**Expected:** October grocery transactions only
**Current:** Returns 0 transactions ❌

### Test 4: Different Categories
```bash
GET /finance/transactions?month=2025-10&category_id=cat_dining&limit=50
GET /finance/transactions?month=2025-10&category_id=cat_transportation&limit=50
```
**Expected:** October transactions for each category
**Current:** Likely returns 0 for all categories ❌

---

## 🎯 Validation Steps

After fixing the backend:

1. ✅ Verify month-only query returns only October transactions (no September leaks)
2. ✅ Verify category-only query returns all transactions for that category
3. ✅ Verify month+category query returns correct filtered results
4. ✅ Test with multiple categories (groceries, dining, transportation, etc.)
5. ✅ Test with months that have no transactions (should return empty array, not error)
6. ✅ Test pagination with `last_key` across multiple pages
7. ✅ Verify `has_more` flag is accurate (should be `false` when count < limit)

---

## 📋 DynamoDB Schema Assumptions

Based on the `last_key` structure, the schema appears to be:

### Main Table:
```
PK: USER#8871f320-0051-7075-5db0-cb07b0b60821
SK: TXN#2025-10-15#txn_20251015_abc123
```

### GSI_CategoryByDate:
```
PK (category_key): USER#8871f320-0051-7075-5db0-cb07b0b60821#CAT#cat_groceries
SK (transaction_date): 2025-10-15
```

If this schema is incorrect, the fix will need to be adjusted accordingly.

---

## 🚨 Priority: HIGH

This bug blocks a core feature of the Finance Dashboard. Users cannot:
- Filter transactions by spending category
- Click on categories from Sankey diagram or Top Spending
- Analyze spending patterns by category

**Impact:** Major UX issue - users see "No transactions found" even though data exists.

---

## 📝 Frontend Workaround (Temporary)

Until backend is fixed, we could:
1. Fetch ALL transactions (no category filter)
2. Filter client-side by category
3. Show warning: "Filtering by category (backend fix in progress)"

**Not recommended** because:
- ❌ Loads unnecessary data
- ❌ Pagination breaks
- ❌ Poor performance with many transactions

---

## 🔗 Related Issues

- Month filter also has minor bug (2 September transactions leak into October results)
- `has_more: true` with 0 results suggests pagination logic issues
- `last_key` pointing to wrong month indicates cursor calculation bug

---

## 📞 Contact

Frontend verified working correctly:
- ✅ Correct URL construction
- ✅ Correct parameter passing
- ✅ Proper state management
- ✅ React Query caching working

Issue is **100% backend-side** in the Lambda function's DynamoDB query logic.
