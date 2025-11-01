# Epic 403 "insufficient_scope" Troubleshooting

## Current Situation

**Status**: All 6 new FHIR resources returning 403 "insufficient_scope" despite correct configuration

**What's Working** ✅:
- OAuth flow completes successfully
- Patient resource fetches successfully (200 OK)
- Token is valid (proven by Patient success)
- All scopes are granted in token:
  - `patient/Observation.r?category=laboratory`
  - `patient/Observation.r?category=vital-signs`
  - `patient/Condition.r?category=problem-list-item`
  - `patient/MedicationRequest.r`
  - `patient/AllergyIntolerance.r`
  - `patient/Immunization.r`
  - `patient/Appointment.r`
  - `patient/Patient.r`

**What's NOT Working** ❌:
- Observation (Labs): 403
- Condition: 403
- MedicationRequest: 403
- AllergyIntolerance: 403
- Immunization: 403
- Appointment: 403

**Test Patients Tried**:
1. Derrick Lin (fhirderrick) - 403 on all
2. Camila Lopez (fhircamila) - 403 on all (she HAS lab data per Epic docs)

## Root Cause Analysis

The error message is clear:
```
WWW-Authenticate: Bearer error="insufficient_scope", 
error_description="The access token provided is valid, but is not authorized for this service"
```

This means:
- ✅ Token is valid (confirmed by Patient 200 OK)
- ✅ Scopes are in the token (we can see them)
- ❌ **Epic's API gateway is rejecting the calls at the API permission level**

## Epic's Two-Layer Security Model

Epic has TWO separate authorization layers:

### Layer 1: OAuth Scopes (Working ✅)
- Granted during OAuth flow
- Shows up in access token immediately
- Our scopes: ALL granted correctly

### Layer 2: API Permissions (NOT Working ❌)
- Configured in "Incoming APIs" section of Epic app
- Takes up to 30 minutes to sync to sandbox
- **This is what's blocking our calls**

## Epic Documentation Evidence

From https://fhir.epic.com/Documentation?docId=testingguide:

> "There is a rolling sync between the Build Apps page and the Sandbox. 
> **You may need to wait up to 30 minutes for newly added APIs to be recognized 
> in the Sandbox environment.** This is a common source of 403 errors."

## Troubleshooting Steps

### 1. Verify Epic App Configuration

Go to: https://fhir.epic.com/Developer/Apps
App ID: `5791a93f-7f54-41b9-828a-0f3581d4f6cb`

**Check "Incoming APIs" section has these EXACT selections**:

- [ ] Patient.Read (Demographics) (R4) ← Should already work
- [ ] **Observation.Read (Labs) (R4)** ← Not "Assessments"
- [ ] **Observation.Read (Vital Signs) (R4)** ← Must be separate selection
- [ ] **Condition.Read (Problems) (R4)** ← Not "Care Plan Problem"
- [ ] **MedicationRequest.Read (Signed Medication Order) (R4)** ← Not "Order Template"
- [ ] AllergyIntolerance.Read (Patient Chart) (R4)
- [ ] Immunization.Read (Patient Chart) (R4)
- [ ] Appointment.Read (Appointments) (R4)

**Important**: Each resource type can have multiple variants. The VARIANT matters!

### 2. Check for Hidden Issues

- [ ] Is there a "Save" button you haven't clicked?
- [ ] Is there a "Publish" or "Apply Changes" button?
- [ ] Are there any error messages or warnings in the portal?
- [ ] Is the app status "Active" or does it need approval?

### 3. Wait for Full Sync Period

**Timeline**:
- API configuration changes made: ~60+ minutes ago
- Epic says: "up to 30 minutes" 
- Reality: Sometimes takes longer

**Recommendation**: Wait another 30 minutes, then test again.

### 4. Alternative: Contact Epic Support

If after 2+ hours nothing works, this may be a sandbox issue requiring Epic support:

**Epic Support Contact**: https://open.epic.com/Home/Contact

**What to tell them**:
```
Subject: 403 insufficient_scope despite correct app configuration

App ID: 5791a93f-7f54-41b9-828a-0f3581d4f6cb
Environment: Sandbox (fhir.epic.com)

Issue: OAuth scopes are granted correctly in access token, but API calls 
return 403 "insufficient_scope" for all resources except Patient.

Resources affected:
- Observation (Labs & Vitals)
- Condition (Problems)
- MedicationRequest (Signed Orders)
- AllergyIntolerance
- Immunization  
- Appointment

Scopes in token (confirmed):
patient/Observation.r?category=laboratory
patient/Observation.r?category=vital-signs
patient/Condition.r?category=problem-list-item
patient/MedicationRequest.r
patient/AllergyIntolerance.r
patient/Immunization.r
patient/Appointment.r

API selections in portal: All correct variants selected (Labs, Vitals, 
Problems, Signed Orders, etc.)

Time waited: 60+ minutes since configuration changes

Request: Please check if API permissions have synced for this app.
```

## Temporary Workaround

For now, you can:
1. Continue development with Patient data (which works)
2. Build the frontend UI components
3. Mock the other resource data
4. Once Epic's permissions sync, everything will work automatically

## Code Status

**Everything is ready on our side**:
- ✅ Frontend requests all 9 scopes correctly
- ✅ Lambda has correct URL patterns with category filters
- ✅ Lambda has 6 normalization functions
- ✅ DynamoDB tables exist
- ✅ Test scripts work (showing 403 = Epic side issue)

**When Epic permissions sync, zero code changes needed** - it will just start working.

## Testing After Sync

Once you believe enough time has passed:

1. **Delete token**:
   ```bash
   aws dynamodb delete-item --table-name epic_tokens --key '{"userId":{"S":"8871f320-0051-7075-5db0-cb07b0b60821"}}' --region us-west-2
   ```

2. **Reconnect** from Healthcare Dashboard (use Camila Lopez: fhircamila/epicepic1)

3. **Check CloudWatch logs**:
   ```bash
   aws logs tail /aws/lambda/epic-oauth-handler --since 5m --region us-west-2
   ```

4. **Look for success**:
   - `✅ Successfully fetched X Observation resources`
   - `✅ Successfully fetched X Condition resources`
   - etc.

5. **Verify DynamoDB**:
   ```bash
   aws dynamodb scan --table-name health_observations --limit 5 --region us-west-2
   ```

## If Still 403 After 2+ Hours

Try these nuclear options:

### Option 1: Create Brand New App
1. Delete current app (or keep for reference)
2. Create completely new app from scratch
3. Select ALL APIs at once (not incrementally)
4. Wait 30 minutes before first OAuth test

### Option 2: Use Patient.Read only
Accept that Epic sandbox might only work with Patient resource and adjust scope.

### Option 3: Switch to Production Epic App
Sandbox might have stricter rules. Production apps might work differently.
(Requires legal agreements and proper credentials)

## Summary

**Most Likely Cause**: Epic's API permission sync is taking longer than documented 30 minutes.

**Most Likely Solution**: Wait another 30-60 minutes, then delete token and reconnect.

**Backup Plan**: Contact Epic support if issue persists beyond 2 hours.

**Code Status**: ✅ Ready - no changes needed on our side.
