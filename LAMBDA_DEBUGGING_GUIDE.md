# Lambda Debugging Guide - Goals Endpoint

## Current Issue
Lambda returning 500 error: `{"error": "'requestContext'", "message": "Failed to fetch goals"}`

## Root Cause Analysis
The error `'requestContext'` suggests that `event['requestContext']` doesn't exist. This happens when:

1. **API Gateway Integration Issue**: Event structure differs between integration types
2. **Authorizer Not Attached**: Cognito authorizer not linked to GET /goals route
3. **Testing Environment**: Direct Lambda invocation (not through API Gateway)

---

## Enhanced Lambda Code with Debugging

Replace your Lambda with this version to identify the exact issue:

```python
"""
API Lambda to fetch user goals for frontend
GET /goals - Enhanced with debugging
"""

import json
import boto3
import os
from decimal import Decimal

REGION = os.environ.get('AWS_REGION', 'us-west-2')
GOALS_TABLE = os.environ.get('GOALS_TABLE', 'sagaa_user_goals')

dynamodb = boto3.resource('dynamodb', region_name=REGION)

def decimal_to_float(obj):
    """Convert Decimal to float for JSON serialization"""
    if isinstance(obj, dict):
        return {k: decimal_to_float(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [decimal_to_float(item) for item in obj]
    elif isinstance(obj, Decimal):
        return float(obj)
    else:
        return obj

def lambda_handler(event, context):
    """
    Fetch goals for authenticated user
    Query params: ?status=active (optional)
    """
    
    try:
        # 🔍 DEBUG: Log full event structure
        print(f"[DEBUG] Full event: {json.dumps(event, default=str)}")
        print(f"[DEBUG] Event keys: {list(event.keys())}")
        
        # Handle CORS preflight
        if event.get('httpMethod') == 'OPTIONS':
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,GET'
                },
                'body': json.dumps('OK')
            }
        
        # 🔍 DEBUG: Check for requestContext
        if 'requestContext' not in event:
            print("[ERROR] ❌ requestContext not found in event!")
            print("[ERROR] Available keys:", list(event.keys()))
            
            # Check alternative locations
            if 'authorizer' in event:
                print("[DEBUG] ✅ Found authorizer at root level")
                print(f"[DEBUG] authorizer: {json.dumps(event['authorizer'], default=str)}")
            
            raise KeyError("requestContext not found in event - check API Gateway integration")
        
        print("[DEBUG] ✅ requestContext exists")
        print(f"[DEBUG] requestContext keys: {list(event['requestContext'].keys())}")
        
        # 🔍 DEBUG: Check for authorizer
        if 'authorizer' not in event['requestContext']:
            print("[ERROR] ❌ authorizer not found in requestContext!")
            raise KeyError("authorizer not found - check Cognito authorizer is attached to route")
        
        print("[DEBUG] ✅ authorizer exists")
        print(f"[DEBUG] authorizer keys: {list(event['requestContext']['authorizer'].keys())}")
        
        # 🔍 DEBUG: Check for claims
        if 'claims' not in event['requestContext']['authorizer']:
            print("[ERROR] ❌ claims not found in authorizer!")
            print(f"[DEBUG] authorizer content: {json.dumps(event['requestContext']['authorizer'], default=str)}")
            raise KeyError("claims not found - authorizer may not be Cognito type")
        
        print("[DEBUG] ✅ claims exists")
        print(f"[DEBUG] claims keys: {list(event['requestContext']['authorizer']['claims'].keys())}")
        
        # Get user ID from authorizer
        user_id = event['requestContext']['authorizer']['claims']['sub']
        print(f"[INFO] ✅ Successfully extracted user_id: {user_id}")
        
        # Optional status filter from query params
        query_params = event.get('queryStringParameters') or {}
        status_filter = query_params.get('status')  # 'active', 'completed', etc.
        
        if status_filter:
            print(f"[INFO] Filtering by status: {status_filter}")
        
        # Query DynamoDB
        table = dynamodb.Table(GOALS_TABLE)
        
        print(f"[INFO] Querying table: {GOALS_TABLE}")
        response = table.query(
            KeyConditionExpression='user_id = :uid',
            ExpressionAttributeValues={':uid': user_id}
        )
        
        goals = response.get('Items', [])
        print(f"[INFO] Found {len(goals)} total goals")
        
        # Apply status filter if provided
        if status_filter:
            goals = [g for g in goals if g.get('status') == status_filter]
            print(f"[INFO] {len(goals)} goals after status filter")
        
        # Sort by priority (high > medium > low) and created_at
        priority_order = {'high': 0, 'medium': 1, 'low': 2}
        goals.sort(key=lambda g: (
            priority_order.get(g.get('priority', 'low'), 3),
            g.get('created_at', '')
        ))
        
        # Convert Decimals to floats
        goals = decimal_to_float(goals)
        
        print(f"[SUCCESS] ✅ Returning {len(goals)} goals")
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'goals': goals,
                'count': len(goals)
            }, default=str)  # Handle datetime serialization
        }
        
    except KeyError as e:
        print(f"[ERROR] ❌ KeyError: {e}")
        import traceback
        traceback.print_exc()
        
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': str(e),
                'message': 'Authentication context missing - check API Gateway authorizer configuration',
                'hint': 'Ensure Cognito User Pool authorizer is attached to GET /goals route'
            })
        }
        
    except Exception as e:
        print(f"[ERROR] ❌ Unexpected error: {e}")
        import traceback
        traceback.print_exc()
        
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': str(e),
                'message': 'Failed to fetch goals'
            })
        }
```

---

## What Changed

### 1. **Detailed Event Structure Logging**
```python
print(f"[DEBUG] Full event: {json.dumps(event, default=str)}")
print(f"[DEBUG] Event keys: {list(event.keys())}")
```
- Logs the complete event structure to CloudWatch
- Helps identify if requestContext exists and its location

### 2. **Step-by-Step Validation**
Checks each level of the nested structure:
- ✅ `requestContext` exists?
- ✅ `authorizer` exists in requestContext?
- ✅ `claims` exists in authorizer?
- ✅ `sub` (user_id) exists in claims?

### 3. **Alternative Location Check**
```python
if 'authorizer' in event:
    print("[DEBUG] ✅ Found authorizer at root level")
```
- Some API Gateway configurations put authorizer at root level
- Logs alternative locations if found

### 4. **Better Error Messages**
- Specific KeyError handling with hints
- Tells you exactly which step failed
- Suggests configuration fixes

---

## How to Use This

### Step 1: Deploy Enhanced Lambda
1. Replace your Lambda code with the version above
2. Deploy the function
3. Wait 10-15 seconds for deployment

### Step 2: Test from Frontend
1. Go to http://localhost:5173/goals in your browser
2. Open DevTools Console (F12)
3. Refresh the page

### Step 3: Check CloudWatch Logs
1. Go to AWS Console → CloudWatch → Log Groups
2. Find `/aws/lambda/your-goals-lambda-name`
3. Look at the latest log stream

### Step 4: Analyze the Output

#### ✅ **Success Case** (User ID extracted):
```
[DEBUG] Event keys: ['resource', 'path', 'httpMethod', 'requestContext', ...]
[DEBUG] ✅ requestContext exists
[DEBUG] requestContext keys: ['authorizer', 'requestId', 'accountId', ...]
[DEBUG] ✅ authorizer exists
[DEBUG] authorizer keys: ['claims']
[DEBUG] ✅ claims exists
[DEBUG] claims keys: ['sub', 'email', 'cognito:username', ...]
[INFO] ✅ Successfully extracted user_id: abc123-def456-...
[INFO] Querying table: sagaa_user_goals
[INFO] Found 3 total goals
[SUCCESS] ✅ Returning 3 goals
```

#### ❌ **Error Case 1** (requestContext missing):
```
[DEBUG] Event keys: ['body', 'headers', 'queryStringParameters']
[ERROR] ❌ requestContext not found in event!
[ERROR] Available keys: ['body', 'headers', 'queryStringParameters']
```
**Solution**: API Gateway integration is wrong. Should be "Lambda Proxy Integration"

#### ❌ **Error Case 2** (authorizer missing):
```
[DEBUG] ✅ requestContext exists
[DEBUG] requestContext keys: ['requestId', 'accountId', 'stage']
[ERROR] ❌ authorizer not found in requestContext!
```
**Solution**: Cognito authorizer not attached to GET /goals route

#### ❌ **Error Case 3** (claims missing):
```
[DEBUG] ✅ requestContext exists
[DEBUG] ✅ authorizer exists
[DEBUG] authorizer keys: ['principalId', 'integrationLatency']
[ERROR] ❌ claims not found in authorizer!
```
**Solution**: Authorizer is not a Cognito User Pool type (might be Lambda authorizer)

---

## Likely Issue: Authorizer Not Attached

Based on the error `'requestContext'`, the most likely issue is:

### **GET /goals route doesn't have Cognito authorizer attached**

#### To Fix in API Gateway Console:

1. Go to API Gateway Console
2. Select your API: `sagaa-backend-api`
3. Click **Resources** in left sidebar
4. Find the `/goals` resource
5. Click on the **GET** method
6. Click **Method Request** (top section)
7. Look at **Authorization** setting:
   - ❌ If it says "NONE" → **This is the problem!**
   - ✅ Should say your Cognito User Pool authorizer name

#### To Attach Authorizer:

1. Click the pencil icon next to "Authorization"
2. Select your Cognito User Pool authorizer from dropdown
3. Click the checkmark ✓ to save
4. Click **Actions** → **Deploy API**
5. Select deployment stage (probably `dev`)
6. Click **Deploy**

### Verify Authorizer Exists:

1. In API Gateway Console, click **Authorizers** in left sidebar
2. You should see a Cognito User Pool authorizer
3. If missing, create one:
   - Name: `CognitoAuthorizer`
   - Type: `Cognito`
   - Cognito User Pool: Select your pool
   - Token Source: `Authorization`

---

## Alternative: Check API Gateway Integration Type

The Lambda might be receiving a different event structure if integration is not "Lambda Proxy":

1. Go to API Gateway → Resources → `/goals` → GET
2. Click **Integration Request**
3. Check **Integration type**:
   - ✅ Should be: **Lambda Function Proxy**
   - ❌ If it's just "Lambda Function" → Change to Proxy

---

## Next Steps

1. **Deploy the enhanced Lambda** (with debugging)
2. **Test from frontend** (refresh /goals page)
3. **Check CloudWatch logs** (find the [DEBUG] output)
4. **Share the CloudWatch logs** with me - especially the [DEBUG] lines
5. Based on logs, we'll identify exact issue and fix it

---

## Expected Frontend Behavior

Once fixed, your frontend console should show:
```
🎯 Goals API Response: { goals: [...], count: 3 }
🎯 Goals array: [{ goal_id: '...', name: 'Buy House', ... }, ...]
🎯 Final goalsData: [...]
🎯 Goals count: 3
```

And the Goals page should display your goals from DynamoDB! 🎯
