# Debugging Insights Data Mismatch

## Problem
The insights displayed on the frontend don't match the data you see in your backend/database.

## Quick Diagnosis Steps

### Step 1: Check What the Frontend is Receiving

1. Open the Insights page in your browser
2. Open Developer Console (F12)
3. Look for the console log: `"API Response:"` (added in useInsights.ts line 32)
4. Expand the logged object and check:
   - What is the structure? (`body.insights`, `insights`, or direct array?)
   - Look at the first insight object
   - Check the `title` and `summary` fields
   - Check the `generated_at` timestamp - is this recent?

### Step 2: Check the Backend API Directly

Run this command in your terminal to see the raw API response:

```bash
# Replace YOUR_TOKEN with your actual ID token
curl -H "Authorization: Bearer YOUR_TOKEN" https://63z70erbsb.execute-api.us-west-2.amazonaws.com/dev/insights
```

Or use this JavaScript code in the browser console while logged in:

```javascript
// Run this in the browser console on your app
import { fetchAuthSession } from 'aws-amplify/auth';

const session = await fetchAuthSession();
const token = session.tokens?.idToken?.toString();

const response = await fetch('https://63z70erbsb.execute-api.us-west-2.amazonaws.com/dev/insights', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
});

const data = await response.json();
console.log('Raw API Response:', JSON.stringify(data, null, 2));
```

### Step 3: Check Your Lambda Function

1. Go to AWS Lambda Console
2. Find your insights Lambda function (likely named something like `InsightsFunction` or `ProactiveInsightsFunction`)
3. Check:
   - **Last Modified Date** - Is this recent? Did your latest changes deploy?
   - **Environment Variables** - Does it point to the correct DynamoDB table?
   - **CloudWatch Logs** - Check recent executions for errors or debug logs

### Step 4: Check DynamoDB Table

1. Go to AWS DynamoDB Console
2. Find your insights table (check Lambda environment variables for the exact name)
3. Go to "Explore items"
4. Filter by your user's PK: `USER#your-user-id`
5. Look at the SK that starts with `INSIGHT#`
6. Check the `title` and `summary` attributes - do they match what you expect?

## Common Issues and Solutions

### Issue 1: Old Cached Data in DynamoDB
**Symptom**: Insights show old titles/summaries even though you updated the Lambda

**Solution**:
1. Delete the old insight items from DynamoDB manually
2. Wait for the Lambda to generate new insights (or trigger it manually)
3. Hard refresh the frontend (Ctrl+Shift+R)

### Issue 2: React Query Cache
**Symptom**: The API returns correct data but the UI shows old data

**Solution**:
```javascript
// In browser console, clear the React Query cache:
localStorage.clear();
// Then refresh the page
```

### Issue 3: Wrong Lambda Version Deployed
**Symptom**: You updated your Lambda code but changes aren't reflected

**Solution**:
1. Check if you're using Lambda versions/aliases
2. Make sure your API Gateway points to the correct version ($LATEST or specific alias)
3. Redeploy your Lambda function

### Issue 4: Lambda Reading from Wrong Table
**Symptom**: Lambda is working but reading old data

**Solution**:
1. Check Lambda environment variables - verify the DynamoDB table name
2. Check if there are multiple tables (dev, staging, prod)
3. Verify your Lambda has the correct IAM permissions for the table

### Issue 5: Data Transformation in Lambda
**Symptom**: DynamoDB has correct data, but API returns different data

**Solution**:
1. Review your Lambda code for any data transformation logic
2. Check if there's any fallback/default data being used
3. Look for any aggregation or filtering logic that might modify the data

## Detailed Debugging: Add Logging to Frontend

Add this temporary logging to `src/hooks/useInsights.ts`:

```typescript
const data = await response.json();

// ADD THESE DETAILED LOGS:
console.group('🔍 Insights API Debug');
console.log('Raw Response:', data);
console.log('Response Type:', typeof data);
console.log('Is Array?', Array.isArray(data));
console.log('Has body?', !!data.body);
console.log('Has insights?', !!data.insights);

if (data.body?.insights) {
  console.log('First Insight from body.insights:', data.body.insights[0]);
} else if (data.insights) {
  console.log('First Insight from insights:', data.insights[0]);
} else if (Array.isArray(data)) {
  console.log('First Insight from array:', data[0]);
}
console.groupEnd();
```

## Expected Data Structure

Your insights should have this structure:

```typescript
{
  insight_id: "uuid-here",
  title: "Your Insight Title",           // 60-80 chars
  summary: "Your insight summary here",  // Max 150 chars
  priority: "HIGH" | "MEDIUM" | "LOW",
  vertical: "sagaa_money",
  actions: ["Action 1", "Action 2"],
  impact: "Expected impact statement",
  // ... other fields
}
```

## Quick Test: Force Refresh Insights

To bypass all caching and force fresh data:

1. Delete items from DynamoDB (or update them)
2. Clear browser storage:
   ```javascript
   localStorage.clear();
   sessionStorage.clear();
   ```
3. Hard refresh (Ctrl+Shift+R)
4. Check the console logs for the API response

## Still Not Working?

If you've gone through all these steps and still see mismatched data:

1. Share the console log output from Step 1
2. Share the raw API response from Step 2
3. Share a sample insight item from DynamoDB
4. I'll help you trace exactly where the transformation is happening
