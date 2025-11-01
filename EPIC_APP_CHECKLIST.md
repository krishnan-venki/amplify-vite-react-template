# Epic App Configuration Checklist

## Critical Finding from Epic Documentation

Epic requires **BOTH Read AND Search** APIs to be enabled for each resource type in your app configuration.

## What to Check in Epic Developer Portal

Go to your app → **Incoming APIs (FHIR)** → Verify these are ALL checked:

### ✅ Patient (Working)
- [ ] Patient.Read (R4)
- [ ] Patient.Search (R4)

### 🔧 Observation (Labs & Vitals)
- [ ] **Observation.Read (Labs) (R4)**
- [ ] **Observation.Search (Labs) (R4)**
- [ ] **Observation.Read (Vital Signs) (R4)**
- [ ] **Observation.Search (Vital Signs) (R4)**

### 🔧 Condition (Problems)
- [ ] **Condition.Read (Problems) (R4)**
- [ ] **Condition.Search (Problems) (R4)**

Optionally also:
- [ ] Condition.Read (Health Concern) (R4)
- [ ] Condition.Search (Health Concern) (R4)

### 🔧 MedicationRequest
- [ ] **MedicationRequest.Read (Signed Medication Order) (R4)**
- [ ] **MedicationRequest.Search (Signed Medication Order) (R4)**

### 🔧 AllergyIntolerance
- [ ] **AllergyIntolerance.Read (R4)**
- [ ] **AllergyIntolerance.Search (R4)**

### 🔧 Immunization
- [ ] **Immunization.Read (R4)**
- [ ] **Immunization.Search (R4)**

### 🔧 Appointment
- [ ] **Appointment.Read (R4)**
- [ ] **Appointment.Search (R4)**

## Why This Matters

From Epic documentation:
> "Many devs miss enabling both Read & Search entitlements in the app; adding both resolves 403s in practice."

Even if your OAuth token has the correct scopes (patient/Condition.read), if your app doesn't have BOTH Read and Search entitlements enabled in Epic's portal, you'll get:

```
403 Forbidden
Bearer error='insufficient_scope'
error_description='The access token provided is valid, but is not authorized for this service'
```

## What We Just Fixed

✅ **Lambda Code**: Added `category` parameter for Condition searches:
```
GET /Condition?patient={id}&category=http://terminology.hl7.org/CodeSystem/condition-category|problem-list-item&_count=100
```

✅ **Lambda Code**: Already had `category=laboratory` for Observation searches

## Next Steps

1. **Go to Epic Developer Portal** → Your App → Incoming APIs (FHIR)
2. **Enable BOTH Read AND Search** for all 6 resources listed above
3. **Save** the app configuration
4. **Wait 5-30 minutes** for Epic's rolling sync to complete
5. **Delete your token** from healthcare dashboard (disconnect)
6. **Reconnect** to get a fresh token with all permissions
7. **Check CloudWatch logs** - should see 200 OK instead of 403

## URLs Being Called (with category parameters)

```
✅ Patient: /Patient/{id}
✅ Observation: /Observation?patient={id}&category=laboratory&_count=100
✅ Condition: /Condition?patient={id}&category=http://terminology.hl7.org/CodeSystem/condition-category|problem-list-item&_count=100
🔧 MedicationRequest: /MedicationRequest?patient={id}&_count=100
🔧 AllergyIntolerance: /AllergyIntolerance?patient={id}&_count=100
🔧 Immunization: /Immunization?patient={id}&_count=100
🔧 Appointment: /Appointment?patient={id}&_count=100
```

## Token Scope Requirements

Your token MUST include (check the `scope` claim in the JWT):
```
openid
fhirUser
offline_access
patient/Patient.read
patient/Observation.read
patient/Condition.read
patient/MedicationRequest.read
patient/AllergyIntolerance.read
patient/Immunization.read
patient/Appointment.read
```

## Common Gotchas

1. ❌ **Only enabled Read, not Search** → 403 errors
2. ❌ **Missing category parameter** → 403 or empty results
3. ❌ **Didn't wait for Epic sync** → 403 errors for 30+ minutes
4. ❌ **Didn't re-authorize after changes** → Old token doesn't have new permissions
5. ✅ **Empty results (200 OK)** = No data available (this is good! Means permissions work)
6. ❌ **403 errors** = Config/permission issue, not data issue
