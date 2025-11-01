# Epic Sandbox Test Patients

## Current Test Patient (Not Ideal)
**Derrick Lin**
- Username: `fhirderrick`
- Password: `epicepic1`
- FHIR ID: `eq081-VQEgP8drUUqCWzHfw3`
- **Has**: CarePlan, Condition, Goal, Medication, MedicationRequest, Observation (Smoking History ONLY), Patient
- **Missing**: Observation (Labs), Observation (Vitals), AllergyIntolerance, Immunization, Appointment
- Status: ❌ Not suitable for comprehensive testing - lacks Labs/Vitals data

## Recommended Test Patients

### 1. Camila Lopez (BEST FOR LABS) ⭐
- Username: `fhircamila`
- Password: `epicepic1`
- FHIR ID: `erXuFYUfucBZaryVksYEcMg3`
- MRN: 203713
- **Has**: DiagnosticReport, Goal, Medication, MedicationRequest, **Observation (Labs)** ✅, Patient, Procedure
- **Missing**: AllergyIntolerance, Immunization, Observation (Vitals)
- **Use for**: Testing lab results fetching

### 2. Desiree Powell (BEST FOR VITALS)
- Username: `fhirdesiree`
- Password: `epicepic1`
- FHIR ID: `eAB3mDIBBcyUKviyzrxsnAw3`
- MRN: 203714
- **Has**: Immunization ✅, **Observation (Vitals)** ✅, Patient
- **Use for**: Testing vitals and immunizations

### 3. Warren McGinnis (MOST COMPREHENSIVE - But no MyChart login)
- ❌ No MyChart credentials (Provider-facing only)
- FHIR ID: `e0w0LEDCYtfckT6N.CkJKCw3`
- **Has**: AllergyIntolerance, Condition, DiagnosticReport, **Observation (Labs)**, **Observation (Vitals)**, Patient, Procedure
- **Note**: Cannot be used for patient-facing OAuth testing

### 4. Elijah Davis (Has Allergies)
- ❌ No MyChart credentials listed
- FHIR ID: `egqBHVfQlt4Bw3XGXoxVxHg3`
- **Has**: **AllergyIntolerance** ✅, Condition, Medication, MedicationRequest, Observation (Smoking History), Patient

### 5. Linda Ross (Has Vitals)
- ❌ No MyChart credentials listed
- FHIR ID: `eIXesllypH3M9tAA5WdJftQ3`
- **Has**: Condition, Medication, MedicationRequest, **Observation (Vitals)** ✅, Patient

## Issue
Despite having all scopes granted (Observation, Condition, MedicationRequest, AllergyIntolerance, Immunization, Appointment), all resources return 403 "insufficient_scope".

## Potential Causes
1. **API permissions haven't synced** - Epic says 30 minutes, but may take longer
2. **Derrick Lin has no data** - Test patient might not have records for these resource types
3. **Epic app configuration** - API selections might still be wrong

## Next Steps to Try

### Option 1: Try Different Test Patient
Epic provides multiple test patients. Some common ones:
- **Camila Lopez** - Often has comprehensive data
- **Jason Argonaut** - Standard FHIR test patient
- **Others** - Check Epic's test patient list

To switch test patients:
1. Log out from Epic MyChart
2. Log in with different credentials
3. Reconnect from Healthcare Dashboard
4. Check if resources fetch successfully

### Option 2: Verify Epic App Configuration
Double-check in Epic Developer Portal:
1. **Incoming APIs** section
2. Verify these are selected with correct variants:
   - ✅ Observation.Read (Labs) (R4)
   - ✅ Observation.Read (Vital Signs) (R4)
   - ✅ Condition.Read (Problems) (R4)
   - ✅ MedicationRequest.Read (Signed Medication Order) (R4)
   - ✅ AllergyIntolerance.Read (Patient Chart) (R4)
   - ✅ Immunization.Read (Patient Chart) (R4)
   - ✅ Appointment.Read (Appointments) (R4)

### Option 3: Check Epic's Test Data Documentation
Epic should have documentation showing which test patients have which types of data. This would tell us if Derrick Lin is expected to have Observations, Conditions, etc.

### Option 4: Contact Epic Support
If 30+ minutes have passed and proper API selections are configured, this might be an Epic sandbox issue requiring support.

## Current Status
- ⏰ Waited 30+ minutes for sync
- ✅ Scopes are granted correctly in token
- ✅ URLs are constructed correctly
- ✅ Patient resource works (proves token valid)
- ❌ All 6 new resources return 403
- 🤔 **Trying different test patient next**
