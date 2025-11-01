# Epic App Configuration Sync & Testing Notes

## Important Discovery: 30-Minute Sync Delay

From Epic's official documentation:
> **Note: There is a rolling sync between the Build Apps page and the Sandbox. You may need to wait up to 30 minutes for newly added APIs to be recognized in the Sandbox environment. This is a common source of 403 errors.**

Source: https://fhir.epic.com/Documentation?docId=testingguide

## Timeline for Current App

**App Details:**
- **Client ID**: `5791a93f-7f54-41b9-828a-0f3581d4f6cb`
- **Status**: Draft (which is FINE per Epic documentation)
- **Type**: Non-Production

**Configuration Changes:**
1. ✅ Initial APIs added (AllergyIntolerance, Appointment, Condition, Immunization, MedicationRequest, Observation.Read (Labs), Patient)
2. ✅ Added Observation.Read (Vital Signs) - **WAIT 30 MINUTES FROM THIS TIME**
3. ⏰ Ready to test after: **[TIME + 30 minutes]**

## Why "Ready for Production" Seemed Required

**Previous Experience:**
- Old app: OAuth failed in Draft → Pushed to "Ready for Production" → OAuth worked

**Actual Reason (Now Understood):**
- The time taken to push to production ≈ Sync time completed
- It wasn't the status change that fixed it, it was the wait time!

## Correct Testing Process (Per Epic Documentation)

### Draft Apps CAN Test in Sandbox ✅

Epic explicitly states:
1. Use your **Non-Production Client ID**
2. Apps in **Draft status** can connect to sandbox
3. **Wait 30 minutes** after configuration changes
4. 403 errors are often due to sync delay, not app status

### When to Mark "Ready for Production"

Only when:
- ✅ You've finished development and testing
- ✅ You're ready for Epic customers to install your app
- ✅ You want to go through Epic's review process

**NOT required for sandbox testing!**

## Testing Checklist

Before attempting OAuth connection:

- [ ] 30 minutes have passed since last API configuration change
- [ ] Redirect URI is exact: `http://localhost:5173/auth/epic/callback`
- [ ] Non-Production Client ID is correct in code
- [ ] Dev server is running on correct port (5173)
- [ ] Old token has been deleted from DynamoDB

## Current Configuration

### Incoming APIs Selected (8 total):
1. ✅ AllergyIntolerance.Read (Patient Chart) (R4)
2. ✅ Appointment.Read (Appointments) (R4)
3. ✅ Condition.Read (Care Plan Problem) (R4)
4. ✅ Immunization.Read (Patient Chart) (R4)
5. ✅ MedicationRequest.Read (Order Template Medication) (R4)
6. ✅ Observation.Read (Labs) (R4)
7. ✅ Observation.Read (Vital Signs) (R4) ← **Most recent addition**
8. ✅ Patient.Read (Demographics) (R4)

### OAuth Scopes Requested in Code (9 total):
```typescript
scopes: [
  'openid',
  'fhirUser',
  'patient/Patient.read',
  'patient/Observation.read',
  'patient/Condition.read',
  'patient/MedicationRequest.read',
  'patient/AllergyIntolerance.read',
  'patient/Immunization.read',
  'patient/Appointment.read'
]
```

## Testing Plan After Sync Completes

### Step 1: Verify Sync Time
- Ensure 30 minutes have passed since adding Vital Signs API

### Step 2: Connect to Epic
1. Go to Healthcare Dashboard
2. Click "Connect to Epic MyChart"
3. Login: `fhirderrick` / `epicepic1`
4. Authorize app

### Step 3: Test Resource Access
```bash
cd lambda\epic-oauth
python test-all-resources-detailed.py
```

**Expected Results:**
- ✅ Patient: 200 OK
- ✅ Observation: 200 OK (Labs and Vital Signs)
- ✅ Condition: 200 OK
- ✅ MedicationRequest: 200 OK
- ✅ AllergyIntolerance: 200 OK
- ✅ Immunization: 200 OK
- ✅ Appointment: 200 OK

### Step 4: Check CloudWatch Logs
```bash
aws logs tail /aws/lambda/epic-oauth-handler --follow --region us-west-2
```

Look for:
- ✅ "Successfully fetched X Observation resources"
- ✅ "Successfully fetched X Condition resources"
- ✅ etc.

### Step 5: Verify DynamoDB Data
Check that all 6 tables have entries:
- health_observations
- health_conditions
- health_medications
- health_allergies
- health_immunizations
- health_appointments

## If OAuth Still Fails After 30 Minutes

Then consider marking as "Ready for Production" as a workaround, but Epic documentation suggests this shouldn't be necessary.

**Possible other issues to check:**
1. Redirect URI mismatch
2. Client ID typo
3. Browser cache (try incognito mode)
4. Epic sandbox maintenance window (Sundays 8 PM Central)

## References

- Epic Testing Guide: https://fhir.epic.com/Documentation?docId=testingguide
- Epic API Specs: https://fhir.epic.com/
- Test Patients: https://fhir.epic.com/Documentation?docId=testpatients
