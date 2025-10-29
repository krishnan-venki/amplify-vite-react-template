# Sagaa Finance API - Contract for Frontend

## 🔐 Authentication

All endpoints require Cognito JWT token in Authorization header:
```
Authorization: Bearer <cognito-jwt-token>
```

User ID is automatically extracted from token - **do not pass as parameter**.

---

## 📡 Base URL

```
https://{api-id}.execute-api.{region}.amazonaws.com/prod
```

Replace with your actual API Gateway URL.

---

## 🎯 Endpoints

### 1. GET /finance/dashboard

**Purpose:** Get financial overview and health metrics for a specific month.

**Query Parameters:**
- `month` (optional) - Format: `YYYY-MM` (defaults to current month)

**Request Example:**
```bash
GET /finance/dashboard?month=2025-01
Authorization: Bearer eyJraWQ...
```

**Response: 200 OK**
```json
{
  "user_id": "8871f320-0051-7075-5db0-cb07b0b60821",
  "month": "2025-01",
  "financial_health_score": 72,
  "total_income": 15861.83,
  "total_expenses": 8290.37,
  "net_cash_flow": 7571.46,
  "net_cash_flow_change": 1250.00,
  "savings_rate": 47.7,
  "transaction_count": 227,
  "top_spending_categories": [
    {
      "category_id": "cat_groceries",
      "category_name": "Groceries",
      "category_icon": "🍎",
      "amount": 1698.14,
      "count": 45
    },
    {
      "category_id": "cat_dining",
      "category_name": "Dining & Restaurants",
      "category_icon": "🍔",
      "amount": 862.20,
      "count": 28
    }
  ],
  "budget_health": {
    "status": "good",
    "percentage_used": 52.3
  }
}
```

**Error Responses:**
```json
// 401 Unauthorized
{
  "error": "Unauthorized - missing authentication"
}

// 404 Not Found
{
  "error": "No data found for 2025-01"
}

// 500 Internal Server Error
{
  "error": "Error message"
}
```

---

### 2. GET /finance/sankey

**Purpose:** Get Sankey diagram data showing income → expense flow.

**Query Parameters:**
- `month` (required) - Format: `YYYY-MM`

**Request Example:**
```bash
GET /finance/sankey?month=2025-01
Authorization: Bearer eyJraWQ...
```

**Response: 200 OK**
```json
{
  "user_id": "8871f320-0051-7075-5db0-cb07b0b60821",
  "month": "2025-01",
  "nodes": [
    {
      "id": "income",
      "name": "Income",
      "color": "#10B981"
    },
    {
      "id": "cat_groceries",
      "name": "🍎 Groceries",
      "color": "#22C55E"
    },
    {
      "id": "cat_dining",
      "name": "🍔 Dining & Restaurants",
      "color": "#F59E0B"
    },
    {
      "id": "cat_housing",
      "name": "🏠 Housing",
      "color": "#3B82F6"
    },
    {
      "id": "savings",
      "name": "💰 Savings",
      "color": "#059669"
    }
  ],
  "links": [
    {
      "source": "income",
      "target": "cat_housing",
      "value": 2567.84
    },
    {
      "source": "income",
      "target": "cat_groceries",
      "value": 1698.14
    },
    {
      "source": "income",
      "target": "cat_dining",
      "value": 862.20
    },
    {
      "source": "income",
      "target": "savings",
      "value": 7571.46
    }
  ],
  "summary": {
    "total_income": 15861.83,
    "total_expenses": 8290.37,
    "net_cash_flow": 7571.46,
    "savings_rate": 47.7
  }
}
```

**Error Responses:**
```json
// 400 Bad Request
{
  "error": "month required (YYYY-MM format)"
}

// 404 Not Found
{
  "error": "No data found for 2025-01"
}
```

---

### 3. GET /finance/transactions

**Purpose:** Get list of transactions with optional filters.

**Query Parameters:**
- `month` (optional) - Format: `YYYY-MM`
- `category_id` (optional) - Example: `cat_groceries`
- `limit` (optional) - Default: 50, Max: 100
- `last_key` (optional) - For pagination

**Request Examples:**
```bash
# All transactions for January
GET /finance/transactions?month=2025-01&limit=50

# Grocery transactions only
GET /finance/transactions?category_id=cat_groceries&limit=20

# Grocery transactions in January
GET /finance/transactions?month=2025-01&category_id=cat_groceries
```

**Response: 200 OK**
```json
{
  "user_id": "8871f320-0051-7075-5db0-cb07b0b60821",
  "filters": {
    "month": "2025-01",
    "category_id": "cat_groceries"
  },
  "transactions": [
    {
      "transaction_id": "txn_20250105_abc123",
      "transaction_date": "2025-01-05",
      "merchant_name": "PCC - ISSAQUAH",
      "merchant_normalized": "PCC Natural Markets",
      "description": "PCC - ISSAQUAH ISSAQUAH WA",
      "amount": -31.67,
      "category_id": "cat_groceries",
      "category_name": "Groceries",
      "category_icon": "🍎",
      "subcategory": "Supermarket",
      "account_type": "credit_card",
      "is_recurring": false,
      "month": "2025-01"
    },
    {
      "transaction_id": "txn_20250108_def456",
      "transaction_date": "2025-01-08",
      "merchant_name": "SAFEWAY #3006",
      "merchant_normalized": "SAFEWAY",
      "description": "SAFEWAY #3006 ISSAQUAH WA",
      "amount": -125.43,
      "category_id": "cat_groceries",
      "category_name": "Groceries",
      "category_icon": "🍎",
      "subcategory": "Supermarket",
      "account_type": "credit_card",
      "is_recurring": false,
      "month": "2025-01"
    }
  ],
  "summary": {
    "count": 45,
    "total_amount": 1698.14,
    "has_more": false
  },
  "pagination": {
    "limit": 50,
    "last_key": null
  }
}
```

---

### 4. GET /finance/budget-status

**Purpose:** Get budget vs actual spending by category.

**Query Parameters:**
- `month` (required) - Format: `YYYY-MM`

**Request Example:**
```bash
GET /finance/budget-status?month=2025-01
Authorization: Bearer eyJraWQ...
```

**Response: 200 OK**
```json
{
  "user_id": "8871f320-0051-7075-5db0-cb07b0b60821",
  "month": "2025-01",
  "overall": {
    "total_budget": 15000.00,
    "total_spent": 8290.37,
    "total_remaining": 6709.63,
    "percentage_used": 55.3,
    "status": "good",
    "categories_over_budget": 0
  },
  "categories": [
    {
      "category_id": "cat_groceries",
      "category_name": "Groceries",
      "category_icon": "🍎",
      "budget_amount": 1500.00,
      "spent_amount": 1698.14,
      "remaining_amount": -198.14,
      "percentage_used": 113.2,
      "status": "over",
      "is_custom_budget": false
    },
    {
      "category_id": "cat_dining",
      "category_name": "Dining & Restaurants",
      "category_icon": "🍔",
      "budget_amount": 1200.00,
      "spent_amount": 862.20,
      "remaining_amount": 337.80,
      "percentage_used": 71.9,
      "status": "good",
      "is_custom_budget": false
    },
    {
      "category_id": "cat_housing",
      "category_name": "Housing",
      "category_icon": "🏠",
      "budget_amount": 4500.00,
      "spent_amount": 2567.84,
      "remaining_amount": 1932.16,
      "percentage_used": 57.1,
      "status": "good",
      "is_custom_budget": false
    }
  ],
  "note": "Using recommended budgets. Set custom budgets for personalized tracking."
}
```

**Budget Status Values:**
- `"good"` - Under 90% of budget
- `"warning"` - 90-100% of budget
- `"over"` - Over 100% of budget
- `"critical"` - Overall budget status when over 100%

---

## 📊 Data Models

### Category IDs (Standard)
```javascript
const CATEGORIES = {
  cat_income: { name: "Income", icon: "💰", color: "#10B981" },
  cat_housing: { name: "Housing", icon: "🏠", color: "#3B82F6" },
  cat_groceries: { name: "Groceries", icon: "🍎", color: "#22C55E" },
  cat_dining: { name: "Dining & Restaurants", icon: "🍔", color: "#F59E0B" },
  cat_transportation: { name: "Transportation", icon: "⛽", color: "#8B5CF6" },
  cat_shopping: { name: "Shopping & Retail", icon: "📦", color: "#EC4899" },
  cat_entertainment: { name: "Entertainment", icon: "🎬", color: "#F43F5E" },
  cat_subscriptions: { name: "Subscriptions & Utilities", icon: "💳", color: "#6366F1" },
  cat_healthcare: { name: "Healthcare & Medical", icon: "🏥", color: "#EF4444" },
  cat_fitness: { name: "Fitness & Wellness", icon: "💪", color: "#14B8A6" },
  cat_education: { name: "Education", icon: "📚", color: "#06B6D4" },
  cat_travel: { name: "Travel", icon: "✈️", color: "#0EA5E9" },
  cat_petcare: { name: "Pet Care", icon: "🐾", color: "#A855F7" },
  cat_insurance: { name: "Insurance", icon: "🛡️", color: "#64748B" },
  cat_taxes: { name: "Taxes & Fees", icon: "📋", color: "#78716C" },
  cat_transfers: { name: "Transfers & Savings", icon: "🔄", color: "#94A3B8" },
  cat_miscellaneous: { name: "Miscellaneous", icon: "📌", color: "#9CA3AF" },
  cat_uncategorized: { name: "Uncategorized", icon: "❓", color: "#D1D5DB" }
};
```

### Month Format
Always use `YYYY-MM` format:
- ✅ `2025-01`
- ✅ `2025-12`
- ❌ `01-2025`
- ❌ `2025-1` (needs leading zero)

---

## 🔄 Error Handling

All endpoints return consistent error format:

```typescript
interface ErrorResponse {
  error: string;
  message?: string; // Optional additional context
}
```

**HTTP Status Codes:**
- `200` - Success
- `400` - Bad Request (missing required params)
- `401` - Unauthorized (invalid/missing token)
- `404` - Not Found (no data for month)
- `500` - Internal Server Error

---

## 💡 Frontend Implementation Tips

### 1. Token Management
```javascript
// Add interceptor to automatically include token
axios.interceptors.request.use((config) => {
  const token = getCognitoToken(); // Your auth method
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

### 2. Month Navigation
```javascript
// Helper to format current month
const getCurrentMonth = () => {
  return new Date().toISOString().slice(0, 7); // "2025-01"
};

// Helper to navigate months
const getNextMonth = (month) => {
  const [year, monthNum] = month.split('-').map(Number);
  const date = new Date(year, monthNum, 1);
  return date.toISOString().slice(0, 7);
};
```

### 3. Currency Formatting
```javascript
// Format amounts consistently
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};
```

### 4. Category Display
```javascript
// Use icon + name for consistent display
const CategoryBadge = ({ category_id, category_name, category_icon }) => (
  <span className="category-badge">
    <span className="icon">{category_icon}</span>
    <span className="name">{category_name}</span>
  </span>
);
```

---

## 🧪 Testing

### Test Credentials
Use your Cognito user pool for authentication.

### Sample Test Flow
```javascript
// 1. Login and get token
const token = await loginToCognito(username, password);

// 2. Test dashboard
const dashboard = await fetch('/finance/dashboard?month=2025-01', {
  headers: { Authorization: `Bearer ${token}` }
});

// 3. Test sankey
const sankey = await fetch('/finance/sankey?month=2025-01', {
  headers: { Authorization: `Bearer ${token}` }
});

// 4. Test transactions
const transactions = await fetch('/finance/transactions?month=2025-01&limit=10', {
  headers: { Authorization: `Bearer ${token}` }
});
```

---

## 📞 Support

**Backend Issues:**
- Check CloudWatch logs: `/aws/lambda/SagaaFinance*`
- Verify Cognito token is valid
- Ensure API Gateway authorizer is configured

**Questions:**
Contact backend team with:
- Endpoint called
- Request parameters
- Error response
- Request ID from response headers
