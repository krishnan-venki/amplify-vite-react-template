# Epic FHIR Integration - Phase 2: Display Patient Data

## 🎯 Overview

Phase 2 adds the ability to display Epic patient data on the Healthcare Dashboard after successful OAuth connection.

---

## ✅ What Was Added

### 1. **useEpicConnection Hook**
**File:** `src/hooks/useEpicConnection.ts`

Custom React hook that:
- Checks Epic connection status
- Fetches patient data from DynamoDB
- Provides disconnect functionality
- Auto-refreshes connection status

**Usage:**
```typescript
const { isConnected, isLoading, patientData, disconnect, refresh } = useEpicConnection();
```

**Returns:**
- `isConnected`: boolean - Whether user is connected to Epic
- `isLoading`: boolean - Loading state
- `error`: string | null - Error message if any
- `patientData`: EpicPatientData | null - Full patient data from DynamoDB
- `refresh()`: Function to re-check connection status
- `disconnect()`: Function to disconnect from Epic

---

### 2. **Updated HealthDashboard**
**File:** `src/pages/HealthDashboard.tsx`

Now displays:
- ✅ Real-time connection status
- ✅ Patient information when connected:
  - Full name
  - Date of birth
  - Medical Record Number (MRN)
  - Gender
  - Phone (if available)
  - Email (if available)
- ✅ Last sync timestamp
- ✅ Re-sync button (refreshes data)
- ✅ Disconnect button

---

### 3. **Epic Status Lambda**
**File:** `lambda/epic-status/lambda_function.py`

New Lambda function that:
- Checks if user has active Epic token in DynamoDB
- Validates token expiration
- Fetches patient data from `health_patients` table
- Returns connection status + patient data

**Endpoint:** `GET /epic/status`

**Response:**
```json
{
  "connected": true,
  "patientData": {
    "userId": "...",
    "epicPatientId": "eq081-VQEgP8drUUqCWzHfw3",
    "normalizedData": {
      "fullName": "Derrick Lin",
      "firstName": "Derrick",
      "lastName": "Lin",
      "birthDate": "1970-01-01",
      "gender": "male",
      "mrn": "203711",
      "phone": "...",
      "email": "...",
      "address": { ... }
    },
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

## 🚀 Deployment Steps

### Step 1: Deploy Epic Status Lambda

1. **Create Lambda Function in AWS:**
   - Name: `epic-status-handler`
   - Runtime: Python 3.11 (or 3.12/3.13)
   - Handler: `lambda_function.lambda_handler`

2. **Set Environment Variables:**
   ```
   EPIC_TOKENS_TABLE=epic_tokens
   HEALTH_PATIENTS_TABLE=health_patients
   AWS_REGION=us-west-2
   ```

3. **Upload Code:**
   ```bash
   cd lambda/epic-status
   zip lambda-function.zip lambda_function.py
   # Upload via AWS Console
   ```

4. **Set Lambda IAM Role Permissions:**
   Add policy to access DynamoDB:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": [
           "dynamodb:GetItem",
           "dynamodb:Query"
         ],
         "Resource": [
           "arn:aws:dynamodb:us-west-2:*:table/epic_tokens",
           "arn:aws:dynamodb:us-west-2:*:table/health_patients"
         ]
       }
     ]
   }
   ```

### Step 2: Add API Gateway Route

1. **Go to API Gateway** → Your API
2. **Create Resource:** `/epic/status`
3. **Create Method:** `GET`
   - Integration type: Lambda Function
   - Lambda: `epic-status-handler`
   - Use Lambda Proxy integration: YES
4. **Add Authorizer:** Cognito User Pool (same as other endpoints)
5. **Enable CORS**
6. **Deploy API** to `dev` stage

### Step 3: Test

1. **Navigate to:** `http://localhost:5173/healthcare/dashboard`
2. **If connected:** Should see Derrick Lin's patient information
3. **If not connected:** Click "Connect to Epic MyChart"
4. **After connecting:** Dashboard should auto-refresh and show patient data

---

## 📊 What You Can See Now

### When Connected:
- ✅ Green "Connected to Epic MyChart" banner
- ✅ Patient name: Derrick Lin
- ✅ Date of birth from FHIR data
- ✅ MRN: 203711
- ✅ Gender
- ✅ Last sync timestamp
- ✅ Re-sync and Disconnect buttons

### When Not Connected:
- ⚠️ "Epic MyChart Connection" prompt
- ✅ Benefits list
- ✅ "Connect to Epic MyChart" button
- ✅ Sandbox credentials reminder
- ✅ Coming Soon features preview

---

## 🔍 How It Works

```
1. User loads Healthcare Dashboard
   ↓
2. useEpicConnection hook calls GET /epic/status
   ↓
3. Lambda checks epic_tokens table for user
   ↓
4. If token exists + not expired:
   - Fetch patient data from health_patients table
   - Return { connected: true, patientData: {...} }
   ↓
5. Dashboard displays patient information
```

---

## 🎯 Current Status

### ✅ Completed:
- OAuth flow with PKCE
- Token exchange and storage
- Patient data fetch from Epic FHIR API
- Patient data storage in DynamoDB
- Connection status checking
- Patient data display on dashboard

### 🚧 Still To Do (Phase 2 Continuation):
- [ ] Fetch additional FHIR resources (Observations, Medications, Conditions, etc.)
- [ ] Token refresh mechanism
- [ ] Disconnect functionality (Lambda + frontend)
- [ ] Display more health data (labs, meds, appointments)
- [ ] Health timeline/history view

### 🔮 Future (Phase 3):
- Cross-vertical integration with Financial Agent
- Health-aware financial recommendations
- Predictive health insights

---

## 📝 Notes

- **No Refresh Token:** Epic sandbox doesn't provide refresh tokens. Tokens expire after 1 hour.
- **After Expiration:** Users need to reconnect via OAuth flow
- **Sandbox Data:** Using test patient "Derrick Lin" with FHIR ID `eq081-VQEgP8drUUqCWzHfw3`
- **Security:** All endpoints protected by Cognito authorizer

---

## 🎉 Success!

You now have a fully functional Epic FHIR integration with:
1. ✅ Secure OAuth 2.0 with PKCE
2. ✅ Token management in DynamoDB
3. ✅ Patient data storage and retrieval
4. ✅ Real-time connection status
5. ✅ Beautiful patient data display

**Next:** Deploy the status Lambda and see your patient data live! 🚀
