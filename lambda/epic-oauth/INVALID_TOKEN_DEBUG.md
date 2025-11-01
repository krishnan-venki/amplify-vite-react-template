# Epic Invalid Token Error - Debugging Guide

## Current Issue
Token exchange succeeds ✅ but Epic FHIR API returns:
```
WWW-Authenticate': 'Bearer error="invalid_token", error_description="The access token provided is not valid"
```

## Possible Causes

### 1. **Timing Issue** (Most Likely)
Epic might need a moment for the token to propagate to their FHIR servers. The Lambda is calling the FHIR API immediately after token exchange.

### 2. **Scope Issue**
The token might not have the correct scope for the specific resource we're requesting.

### 3. **Client ID Mismatch**
The Epic-Client-ID header might not match what Epic expects.

### 4. **Sandbox-Specific Behavior**
Epic's sandbox might have different requirements than production.

## Debugging Steps

### Step 1: Deploy Debug Version
1. Upload `epic-oauth-debug.zip` to `epic-oauth-handler` Lambda
2. This version logs:
   - All token response fields
   - Access token length and format
   - Exact headers being sent

### Step 2: Try OAuth Flow Again
1. **Important**: Clear your browser's sessionStorage first
   - Open DevTools (F12)
   - Application tab → Storage → Session Storage
   - Delete all `epic_*` keys
2. Refresh http://localhost:5173/health
3. Click "Connect Epic MyChart"
4. Log in: `fhirderrick` / `epicepic1`

### Step 3: Check CloudWatch Logs
Look for these new log entries:
```
Full token response (sensitive data masked):
  access_token: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9... (length: XXXX)
  token_type: Bearer
  ...
  fhirUser: ??? (check if this exists)
  __epic.dstu2.patient: ??? (check if this exists)
```

And:
```
Access token length: XXXX
Access token starts with: eyJhbGciOiJSUzI1NiIsInR...
Access token ends with: ...XXXXXXXXX
```

## Solutions to Try

### Solution A: Add Delay Before FHIR API Call
If it's a timing issue, we can add a small delay:

```python
# After token exchange, before fetching patient
import time
time.sleep(2)  # Wait 2 seconds for token propagation
```

### Solution B: Use Different Patient ID
Epic might return multiple patient identifiers:
- `patient`: eq081-VQEgP8drUUqCWzHfw3
- `__epic.dstu2.patient`: (might be different)
- `fhirUser`: (might contain the correct ID)

We may need to extract the patient ID from `fhirUser` instead.

### Solution C: Check Epic App Configuration
In your Epic sandbox app:
1. Go to https://fhir.epic.com/Developer/Apps
2. Open app: 8da73e32-fe02-45da-a666-5bc96bdf2de2
3. Verify:
   - Status: "Production Ready" ✅
   - Redirect URI: http://localhost:5173/auth/epic/callback
   - FHIR Version: R4
   - Sandbox: "Interconnect"

### Solution D: Try Testing in Epic's OAuth2 Tool
Epic provides a testing tool:
1. Go to https://fhir.epic.com/Oauth2/TestTool
2. Enter your Client ID: 8da73e32-fe02-45da-a666-5bc96bdf2de2
3. Test the OAuth flow there
4. See if patient fetch works in their tool

## What to Report Back
After trying the OAuth flow with the debug version:

1. **Full token response structure** from CloudWatch logs
2. **Access token length** (should be ~800-1500 chars for JWT)
3. **Any additional patient IDs** in the token response (fhirUser, __epic.dstu2.patient)
4. **Whether the token format looks correct** (starts with eyJ...)

## Next Steps Based on Results

### If token looks valid:
→ Try Solution A (add delay) or contact Epic support

### If token has unexpected format:
→ Something is corrupting the token during storage/retrieval

### If `fhirUser` has different patient ID:
→ Use that ID instead of the `patient` field

### If Epic app shows issues:
→ Recreate the app with correct settings
