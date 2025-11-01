# Epic FHIR Resource Search URL Patterns

## Current Understanding

Based on Epic documentation review, Epic supports **both Read and Search** operations for all FHIR resources.

## Resource URL Patterns

### Patient (Working ✅)
```
GET /Patient/{id}
```

### Observation (Category-based)
```
# Laboratory results
GET /Observation?patient={id}&category=laboratory&_count=100

# Vital signs
GET /Observation?patient={id}&category=vital-signs&_count=100

# Both categories (if scope includes both)
GET /Observation?patient={id}&_count=100
```

### Condition (Problems/Diagnoses)
```
GET /Condition?patient={id}&_count=100
```

### MedicationRequest (Medication Orders)
```
GET /MedicationRequest?patient={id}&_count=100
```

### AllergyIntolerance
```
GET /AllergyIntolerance?patient={id}&_count=100
```

### Immunization
```
GET /Immunization?patient={id}&_count=100
```

### Appointment
**NEEDS INVESTIGATION** - Multiple possible patterns:

```
# Option 1: Simple patient search
GET /Appointment?patient={id}&_count=100

# Option 2: Patient compartment
GET /Patient/{id}/Appointment?_count=100

# Option 3: With date range (might be required)
GET /Appointment?patient={id}&date=ge{from_date}&date=le{to_date}&_count=100

# Option 4: With status filter
GET /Appointment?patient={id}&status=booked,pending,proposed&_count=100

# Option 5: Using actor instead of patient
GET /Appointment?actor={id}&_count=100
```

## Current Status

### Working Resources (Confirmed)
- ✅ Patient - Direct read works

### Pending Sync (Expecting 403 until API permissions propagate)
- ⏳ Observation - Scope granted with both laboratory and vital-signs
- ⏳ Condition - Scope granted
- ⏳ MedicationRequest - Scope granted  
- ⏳ AllergyIntolerance - Scope granted
- ⏳ Immunization - Scope granted
- ⏳ Appointment - Scope granted (but URL pattern TBD)

## Epic App Configuration Changes Made

1. **Condition.Read**: Changed from "Care Plan Problem" → "Problems"
2. **MedicationRequest.Read**: Changed from "Order Template Medication" → "Signed Medication Order"  
3. **Observation.Read**: Added both "Labs" and "Vital Signs" variants

## Next Steps

1. **Wait for 30-minute sync** from when app configuration was changed
2. **Check Epic documentation** for Appointment search requirements
3. **Delete token and reconnect** after sync period
4. **Test all resources** with correct URL patterns
5. **Update Lambda** with working patterns
6. **Deploy and verify** data is being fetched

## Epic Documentation References

- Testing Guide: https://fhir.epic.com/Documentation?docId=testingguide
  - Documents 30-minute sync delay for API configuration changes
- Appointment.Read: https://fhir.epic.com/Specifications?api=10468
  - Need to check search parameters in documentation

## Current Lambda Code Status

Location: `lambda/epic-oauth/lambda_function.py`

Current URL construction (lines ~255-265):
- Observation: Uses `category=laboratory` filter
- Appointment: Uses Patient compartment `/Patient/{id}/Appointment`
- Others: Standard patient search `/{ResourceType}?patient={id}`

**TODO**: Update Appointment URL pattern based on Epic documentation requirements.
