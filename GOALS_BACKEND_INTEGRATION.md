# Goals Backend Integration Guide

## ✅ Backend Setup Complete

Your `/goals` Lambda endpoint is now connected. Here's how to verify and test the integration.

---

## 🔍 Expected API Response Format

Your Lambda should return this structure:

```json
{
  "goals": [
    {
      "user_id": "USER#123",
      "goal_id": "GOAL#uuid-here",
      "name": "Emergency Fund",
      "type": "savings_target",
      "priority": "high",
      "status": "active",
      "intent": "Build a 6-month emergency fund for financial security",
      "target": {
        "target_value": 15000,
        "target_date": "2025-12-31T23:59:59Z",
        "category": "Emergency"
      },
      "progress": {
        "current_amount": 8500,
        "percentage_complete": 56.67,
        "last_updated": "2025-10-24T10:30:00Z"
      },
      "latest_evaluation": {
        "evaluated_at": "2025-10-24T10:30:00Z",
        "status": "on_track",
        "pace": "good",
        "insights": [
          "You're averaging $850/month in savings",
          "Current pace will complete goal 2 weeks early"
        ],
        "recommendations": [
          "Continue current savings rate",
          "Consider increasing by $150/month to finish 1 month early"
        ],
        "projected_completion": "2025-12-15T00:00:00Z",
        "monthly_required": 900
      },
      "created_at": "2025-01-01T00:00:00Z",
      "updated_at": "2025-10-24T10:30:00Z"
    }
  ]
}
```

---

## 🧪 Testing Steps

### 1. **Test the Goals Page**
   - Navigate to `http://localhost:5173/goals`
   - You should see:
     - ✅ Loading skeleton → Goals sidebar appears
     - ✅ First active goal auto-selected
     - ✅ Goal details displayed on the right
     - ✅ Progress bar showing percentage
     - ✅ Status badge (Active/Completed/etc.)
     - ✅ Evaluation card if `latest_evaluation` exists

### 2. **Test Empty State**
   - If no goals exist, you should see:
     - 🎯 Large goal icon
     - "No Goals Yet" message
     - "Create Your First Goal" button

### 3. **Test Loading State**
   - Refresh the page
   - You should briefly see:
     - Skeleton sidebar with animated placeholders
     - Skeleton detail view

### 4. **Test Error State**
   - If API fails, you should see:
     - Red error message
     - Description of the error

---

## 🐛 Common Issues & Fixes

### **Issue 1: CORS Error**
**Error:** `Access to fetch at 'https://...' from origin 'http://localhost:5173' has been blocked by CORS`

**Fix:** Add CORS headers to your Lambda response:
```python
# Python Lambda
return {
    'statusCode': 200,
    'headers': {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        'Access-Control-Allow-Methods': 'GET,OPTIONS'
    },
    'body': json.dumps({'goals': goals_data})
}
```

### **Issue 2: Authentication Token Not Sent**
**Error:** `No authentication token available`

**Fix:** Make sure you're signed in:
1. Navigate to `/signin`
2. Sign in with your account
3. Navigate back to `/goals`

### **Issue 3: 401 Unauthorized**
**Error:** `Failed to fetch goals: Unauthorized`

**Fix:** Verify Lambda has Cognito authorizer:
- Check API Gateway has Cognito authorizer attached
- Verify user pool ID matches `amplify_outputs.json`

### **Issue 4: Empty Goals Array**
**Symptom:** Page shows "No Goals Yet"

**Expected:** This is normal if no goals exist in DynamoDB yet

**To Add Test Data:**
```python
# Add a test goal to DynamoDB
import boto3
from datetime import datetime, timedelta

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Goals')

test_goal = {
    'user_id': 'USER#your-cognito-user-id',
    'goal_id': 'GOAL#test-001',
    'name': 'Emergency Fund',
    'type': 'savings_target',
    'priority': 'high',
    'status': 'active',
    'intent': 'Build a 6-month emergency fund',
    'target': {
        'target_value': 15000,
        'target_date': (datetime.now() + timedelta(days=60)).isoformat(),
        'category': 'Emergency'
    },
    'progress': {
        'current_amount': 8500,
        'percentage_complete': 56.67,
        'last_updated': datetime.now().isoformat()
    },
    'latest_evaluation': {
        'evaluated_at': datetime.now().isoformat(),
        'status': 'on_track',
        'pace': 'good',
        'insights': ['You are saving consistently'],
        'recommendations': ['Keep up the good work'],
        'projected_completion': (datetime.now() + timedelta(days=55)).isoformat(),
        'monthly_required': 900
    },
    'created_at': datetime.now().isoformat(),
    'updated_at': datetime.now().isoformat()
}

table.put_item(Item=test_goal)
```

---

## 🔧 Browser Console Testing

Open browser console (F12) and check:

### **Network Tab:**
1. Look for request to `/goals`
2. Check Status Code (should be 200)
3. Check Response JSON structure
4. Verify `goals` array exists

### **Console Tab:**
Look for logs:
- ✅ `App.tsx - Current path: /goals` (navigation working)
- ❌ `Error fetching goals: ...` (API error)
- ❌ `No authentication token available` (auth error)

---

## 📊 Data Flow Verification

```
1. User navigates to /goals
   ↓
2. Goals.tsx renders
   ↓
3. useGoals() hook called
   ↓
4. Fetches auth token from Amplify
   ↓
5. Calls API_ENDPOINTS.GOALS with token
   ↓
6. Lambda executes with Cognito user context
   ↓
7. Queries DynamoDB Goals table
   ↓
8. Returns goals array
   ↓
9. Goals.tsx receives data
   ↓
10. Sidebar shows goals, first goal selected
   ↓
11. GoalDetailView displays goal data
```

---

## 🎯 Next Steps

### **If Goals Are Loading Successfully:**
1. ✅ Test clicking different goals in sidebar
2. ✅ Test goal status badges display correctly
3. ✅ Test progress bars show correct percentages
4. ✅ Test evaluation cards render properly
5. ✅ Navigate to `/insights` and verify goal badges appear on goal-related insights

### **If You Want Goal-Specific Insights:**
Your insights Lambda should support this query parameter:
```
GET /insights?goal_id=GOAL#uuid-here
```

This will filter insights to show only those linked to a specific goal.

Example insight with goal context:
```json
{
  "insight_id": "INSIGHT#123",
  "insight_type": "goal_accelerator",
  "title": "You can reach your goal 3 weeks faster",
  "goal_context": {
    "goal_id": "GOAL#uuid-here",
    "goal_name": "Emergency Fund",
    "goal_type": "savings_target",
    "current_status": "on_track"
  },
  "visualization": {
    "chart_type": "goal_progress_timeline",
    "data": [
      { "label": "Jan", "value": 2000, "timestamp": 1704067200 },
      { "label": "Mar", "value": 5500, "timestamp": 1709251200 },
      { "label": "May", "value": 9000, "timestamp": 1714521600 },
      { "label": "Target", "value": 15000, "timestamp": 1735689600 }
    ]
  }
}
```

---

## 🚨 Troubleshooting Checklist

- [ ] Backend Lambda deployed and accessible
- [ ] API Gateway endpoint configured
- [ ] Cognito authorizer attached to /goals endpoint
- [ ] CORS headers configured
- [ ] DynamoDB table exists and has proper permissions
- [ ] Lambda has read permissions to Goals table
- [ ] User is signed in to the application
- [ ] Auth token is being sent in request headers
- [ ] Goals table has at least one test goal
- [ ] Goal schema matches TypeScript interface

---

## 💡 Quick Test Script

Paste this in browser console while on the app (after signing in):

```javascript
// Test Goals API
(async () => {
  try {
    const session = await window.Amplify.Auth.fetchAuthSession();
    const token = session.tokens?.idToken?.toString();
    
    const response = await fetch('YOUR_API_URL/goals', {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    console.log('✅ Goals API Response:', data);
    console.log('📊 Number of goals:', data.goals?.length || 0);
    
    if (data.goals && data.goals.length > 0) {
      console.log('🎯 First goal:', data.goals[0]);
    }
  } catch (error) {
    console.error('❌ API Error:', error);
  }
})();
```

---

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Check Network tab for API responses
3. Verify Lambda CloudWatch logs
4. Confirm DynamoDB table has data
5. Test API endpoint directly with Postman/curl

---

**Status**: Backend Integration Ready ✅  
**Next**: Test with real data and verify all UI components
