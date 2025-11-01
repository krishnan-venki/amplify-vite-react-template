# Epic OAuth Working But FHIR API Returns Invalid Token

## Issue
- ✅ OAuth authorization works
- ✅ Token exchange succeeds  
- ✅ Token is stored
- ❌ FHIR API call returns 401 "invalid_token"

## Root Cause Investigation

### Theory 1: Epic App Not Configured for FHIR API Access
**Check your Epic app configuration:**

1. Go to https://fhir.epic.com/Developer/Apps
2. Find app: `8da73e32-fe02-45da-a666-5bc96bdf2de2`
3. Verify these settings:

   **Application Audience:**
   - [ ] Patients only ✓ (should be checked)
   
   **FHIR Specification:**
   - [ ] R4 ✓ (should be selected)
   
   **Application Type:**
   - [ ] Public Client (SMART on FHIR) ✓
   
   **Sandbox:**
   - [ ] Interconnect ✓ (not "Open")
   
   **APIs:**
   - [ ] Patient.read ✓ (should be enabled)
   - [ ] Check if there's a separate "Enable FHIR API Access" toggle
   
   **Status:**
   - [ ] Production Ready ✓

### Theory 2: Need to Use Launch Context
Epic's launch/patient scope might require a different flow:

**From your token scopes:**
```
patient/Patient.r fhirUser launch/patient openid
```

The `launch/patient` scope suggests this might be an **EHR launch** context, not a standalone launch.

**Try removing `launch/patient` scope:**
- In `epic-config.ts`, remove `launch/patient` from scopes
- Only use: `openid`, `fhirUser`, `patient/Patient.read`, etc.

### Theory 3: Need Bearer Token from id_token Instead
Epic returns both `access_token` and `id_token`. Maybe we need to use `id_token` for FHIR API calls?

**Test this:**
Add this to Lambda right after token exchange:
```python
# Try using id_token instead of access_token
access_token = token_response.get('id_token', token_response['access_token'])
print(f"Using id_token for FHIR API: {access_token[:50]}...")
```

### Theory 4: Sandbox Limitation
Epic's sandbox might not actually support FHIR API calls via OAuth tokens in standalone mode.

**Check Epic documentation:**
1. Go to https://fhir.epic.com/Documentation
2. Look for "Standalone FHIR App" vs "EHR Launch App" differences
3. See if there are sandbox limitations for patient data access

### Theory 5: Missing Accept Header Format
Some FHIR servers are picky about Accept headers.

**Try these variations:**
```python
# Current
'Accept': 'application/fhir+json'

# Try:
'Accept': 'application/json+fhir'
# Or:
'Accept': 'application/json'
```

## Quick Tests to Run

### Test A: Check Epic App Settings
Screenshot your Epic app configuration page and verify all settings match above.

### Test B: Try Without launch/patient Scope
1. Edit `src/config/epic-config.ts`
2. Remove `launch/patient` from `EPIC_SCOPES` array
3. Redeploy frontend
4. Try OAuth flow again

### Test C: Use id_token Instead of access_token
1. Update Lambda to use `id_token`
2. Redeploy
3. Try OAuth flow again

### Test D: Try Epic's Test Patient Tool
1. Go to https://fhir.epic.com/Sandbox
2. Use their "Try it" button for Patient.read
3. See if that works with your app's credentials

## What to Report Back

Please share:
1. **Screenshot of Epic app configuration** (blur sensitive data)
2. **Current scopes in epic-config.ts** - what exactly are you requesting?
3. **Full CloudWatch log** showing the complete token_response structure
4. **Do you see `id_token` in the token response?** If yes, what does it look like (first 50 chars)?

## Most Likely Issue
Based on Epic documentation, I suspect:
1. **App not configured for standalone launch** - might need to change app type
2. **Missing FHIR API permission** - app might only have OAuth enabled, not FHIR API access
3. **Wrong sandbox** - using "Open" sandbox instead of "Interconnect"

The fact that OAuth works but FHIR API doesn't suggests **the app permissions are incomplete**.
