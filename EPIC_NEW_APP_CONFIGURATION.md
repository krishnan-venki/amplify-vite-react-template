# Epic New App Configuration Guide

## New App Details
- **Client ID**: `5791a93f-7f54-41b9-828a-0f3581d4f6cb`
- **Type**: Non-Production (Sandbox)
- **Created**: October 31, 2025

## ✅ Configuration Updated In Code
- [x] Frontend (`src/config/epic-config.ts`)
- [x] Lambda (`epic-oauth-handler` environment variables)
- [x] Test scripts (all 3 Python test files)

## 📋 Epic Developer Portal Configuration Required

### 1. Basic App Settings
- **App Name**: Your choice (e.g., "SAGAA Health Dashboard")
- **Redirect URI**: `http://localhost:5173/auth/epic/callback`
- **Application Type**: Confidential Client (browser-based)

### 2. Incoming APIs - MUST SELECT ALL OF THESE:

#### ✅ Core Patient Data (Required)
- [x] **Patient.Read (Demographics) (R4)**

#### ✅ Observations (Select ALL variants for comprehensive data)
- [x] **Observation.Read (Labs) (R4)** ← Laboratory results
- [x] **Observation.Read (Vitals) (R4)** ← Vital signs (BP, temp, etc.)
- [x] **Observation.Read (Social History) (R4)** ← Smoking, alcohol, etc. (Optional)
- [x] **Observation.Read (Assessments) (R4)** ← Surveys/questionnaires (Optional)

> **Important**: Select at minimum Labs and Vitals. The old app only had Assessments, which caused 403 errors.

#### ✅ Health Conditions
- [x] **Condition.Read (Problem List) (R4)** ← Active/chronic conditions
- OR
- [x] **Condition.Read (Care Plan Problem) (R4)** ← Care plan problems

> **Recommendation**: Select BOTH if available for comprehensive condition data

#### ✅ Medications
- [x] **MedicationRequest.Read (Medications) (R4)** ← Active medications
- OR  
- [x] **MedicationRequest.Read (Order Template Medication) (R4)** ← Medication orders

> **Recommendation**: Select the broader "Medications" variant if available

#### ✅ Allergies
- [x] **AllergyIntolerance.Read (Patient Chart) (R4)**

#### ✅ Immunizations
- [x] **Immunization.Read (Patient Chart) (R4)**

#### ✅ Appointments
- [x] **Appointment.Read (Appointments) (R4)**

### 3. OAuth 2.0 Settings
- **Grant Type**: Authorization Code
- **PKCE**: Required (SHA-256)
- **Scopes**: All scopes will be automatically available once you select the Incoming APIs above

### 4. SMART on FHIR Settings
- **Launch Context**: Standalone Launch (Patient Portal)
- **Patient Selection**: Patient-level access

## 🔄 Testing Steps After Configuration

### Step 1: Delete Old Token
```bash
aws dynamodb delete-item --table-name epic_tokens --key '{"userId":{"S":"8871f320-0051-7075-5db0-cb07b0b60821"}}' --region us-west-2
```

### Step 2: Clear Browser Cache
- Clear localStorage for `http://localhost:5173`
- Or open in Incognito/Private window

### Step 3: Connect with New App
1. Start your dev server: `npm run dev`
2. Go to Healthcare Dashboard
3. Click "Connect to Epic MyChart"
4. Login with test patient: `fhirderrick` / `epicepic1`
5. Authorize the app

### Step 4: Test FHIR API Access
```bash
cd lambda\epic-oauth
python test-all-resources-detailed.py
```

**Expected Results:**
- ✅ Patient: 200 OK
- ✅ Observation: 200 OK (should find labs and/or vitals)
- ✅ Condition: 200 OK
- ✅ MedicationRequest: 200 OK
- ✅ AllergyIntolerance: 200 OK
- ✅ Immunization: 200 OK
- ✅ Appointment: 200 OK

### Step 5: Check CloudWatch Logs
```bash
aws logs tail /aws/lambda/epic-oauth-handler --follow --region us-west-2
```

Look for:
- ✅ "Successfully fetched X Observation resources"
- ✅ "Successfully fetched X Condition resources"
- ✅ "Successfully fetched X MedicationRequest resources"
- etc.

## 🎯 Key Differences from Old App

| Resource | Old App (8da73e32...) | New App (5791a93f...) |
|----------|----------------------|----------------------|
| Observation | ❌ Only Assessments | ✅ Labs + Vitals |
| Condition | ❌ Care Plan Problem only | ✅ Broader variant |
| MedicationRequest | ❌ Order Template only | ✅ Medications |
| Others | ✅ Had basic access | ✅ Same/better |

## 🐛 Troubleshooting

### If you still get 403 errors:
1. **Verify all Incoming APIs are selected** in Epic Developer Portal
2. **Save changes** in the portal (click Save button)
3. **Wait 30 seconds** for Epic's cache to update
4. **Delete token** and reconnect
5. **Check granted scopes** in the token - should NOT have category restrictions

### If OAuth fails:
1. Verify Redirect URI is exactly: `http://localhost:5173/auth/epic/callback`
2. Check Client ID matches: `5791a93f-7f54-41b9-828a-0f3581d4f6cb`
3. Ensure PKCE is enabled in Epic app settings

## 📊 Test Patient Info
- **Name**: Derrick Lin
- **Username**: `fhirderrick`
- **Password**: `epicepic1`
- **FHIR ID**: `eq081-VQEgP8drUUqCWzHfw3`
- **MRN**: `203711`

## 🎉 Success Criteria
After proper configuration, you should see:
- ✅ Zero 403 errors in test scripts
- ✅ Data in all 6 DynamoDB tables
- ✅ CloudWatch logs showing successful resource fetches
- ✅ Scopes granted WITHOUT category restrictions (no `?category=survey`)
