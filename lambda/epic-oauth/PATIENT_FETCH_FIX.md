# Epic Patient Fetch 401 Error - FIX

## Issue Identified
The Lambda was getting a **401 Unauthorized** error when trying to fetch patient data from Epic FHIR API.

**Root Cause:** Missing `Epic-Client-ID` header in FHIR API requests. Epic requires this header for all FHIR resource requests.

## CloudWatch Logs Analysis
```
Successfully exchanged code for token. Patient ID: eq081-VQEgP8drUUqCWzHfw3
Fetching patient resource for patient ID: eq081-VQEgP8drUUqCWzHfw3
Failed to fetch patient resource: 401 - ""
```

The OAuth token exchange works ✅, but the FHIR API call fails with 401.

## Fix Applied
Updated `fetch_patient_resource()` function to include required `Epic-Client-ID` header:

```python
headers = {
    'Authorization': f'Bearer {access_token}',
    'Accept': 'application/fhir+json',
    'Epic-Client-ID': EPIC_CLIENT_ID  # ← REQUIRED by Epic
}
```

## Deployment Steps

### 1. Upload Updated Lambda Code
1. Go to AWS Lambda console
2. Navigate to `epic-oauth-handler` function
3. Click **Upload from** → **.zip file**
4. Select: `c:\Work\Projects\amplify-vite-react-template\lambda\epic-oauth\epic-oauth-updated.zip`
5. Click **Save**

### 2. Verify Environment Variables
Make sure these are still set (they should be):
- `EPIC_CLIENT_ID` = `8da73e32-fe02-45da-a666-5bc96bdf2de2`
- `EPIC_TOKEN_URL` = `https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token`
- `EPIC_FHIR_BASE_URL` = `https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4`
- `EPIC_REDIRECT_URI` = `http://localhost:5173/auth/epic/callback`
- `EPIC_TOKENS_TABLE` = `epic_tokens`
- `HEALTH_PATIENTS_TABLE` = `health_patients`

### 3. Test OAuth Flow
1. Go to http://localhost:5173/health
2. Click **Connect Epic MyChart** button
3. Log in with Epic sandbox credentials: `fhirderrick` / `epicepic1`
4. You should now see:
   - ✅ "Token exchange successful" 
   - ✅ Patient data displayed: Derrick Lin, DOB, MRN 203711, etc.
   - ✅ Green "Connected to Epic MyChart" card

### 4. Check CloudWatch Logs
After testing, verify the logs show:
```
Fetching patient resource for patient ID: eq081-VQEgP8drUUqCWzHfw3
Making FHIR API request to: https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Patient/eq081-VQEgP8drUUqCWzHfw3
Using client ID: 8da73e32-fe02-45da-a666-5bc96bdf2de2
Successfully fetched patient resource for: eq081-VQEgP8drUUqCWzHfw3
```

## Expected Behavior After Fix
1. OAuth authorization → ✅ Success
2. Token exchange → ✅ Success  
3. **Patient fetch → ✅ Success** (previously failing with 401)
4. Patient data stored in DynamoDB → ✅ Success
5. Dashboard displays patient info → ✅ Success

## What Changed
- **Before:** Only `Authorization` and `Accept` headers sent to Epic FHIR API
- **After:** Added `Epic-Client-ID` header (required by Epic for FHIR resource access)
- **Added:** Debug logging to show exact URL and client ID being used

## Next Steps After Successful Deployment
1. ✅ Verify patient data displays on Health Dashboard
2. Test "Re-sync Data" button functionality  
3. Implement Disconnect feature (Phase 2 completion)
4. Fetch additional FHIR resources (Observations, Conditions, Medications, etc.)
