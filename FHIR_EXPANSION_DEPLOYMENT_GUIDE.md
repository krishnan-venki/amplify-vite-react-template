# FHIR Resources Expansion - Deployment Guide

## Overview
This guide covers deploying the expanded FHIR integration to fetch and store additional health resources:
- Observations (vitals, labs)
- Conditions (diagnoses)
- Medications (prescriptions)
- Allergies
- Immunizations
- Appointments

## Phase 1: Create DynamoDB Tables ✅

### Table 1: health_observations
```
Table name: health_observations
Partition key: userId (String)
Sort key: resourceId (String) - Format: {patientId}#Observation#{observationId}
```

### Table 2: health_conditions
```
Table name: health_conditions
Partition key: userId (String)
Sort key: resourceId (String) - Format: {patientId}#Condition#{conditionId}
```

### Table 3: health_medications
```
Table name: health_medications
Partition key: userId (String)
Sort key: resourceId (String) - Format: {patientId}#MedicationRequest#{medicationId}
```

### Table 4: health_allergies
```
Table name: health_allergies
Partition key: userId (String)
Sort key: resourceId (String) - Format: {patientId}#AllergyIntolerance#{allergyId}
```

### Table 5: health_immunizations
```
Table name: health_immunizations
Partition key: userId (String)
Sort key: resourceId (String) - Format: {patientId}#Immunization#{immunizationId}
```

### Table 6: health_appointments
```
Table name: health_appointments
Partition key: userId (String)
Sort key: resourceId (String) - Format: {patientId}#Appointment#{appointmentId}
```

### AWS Console Steps for Creating Tables:
1. Go to AWS Console → DynamoDB → Tables
2. Click "Create table"
3. Enter table name (e.g., `health_observations`)
4. Partition key: `userId` (String)
5. Sort key: `resourceId` (String)
6. Leave other settings as default
7. Click "Create table"
8. Repeat for all 6 tables

## Phase 2: Update Lambda Function ✅

The `epic-oauth-handler` Lambda has been updated with:
- ✅ New function `fetch_and_store_fhir_resources()` to fetch all resource types
- ✅ Search queries with appropriate filters for each resource type
- ✅ Normalization functions for each resource type
- ✅ DynamoDB storage with composite keys

### Deploy Lambda Update:

#### Option A: Via AWS Console (Recommended for Testing)
1. Go to AWS Lambda → Functions → `epic-oauth-handler`
2. Open the Code tab
3. Copy the updated `lambda_function.py` content
4. Click "Deploy"
5. Wait for deployment to complete

#### Option B: Via AWS CLI
```bash
cd lambda/epic-oauth
zip -r function.zip lambda_function.py
aws lambda update-function-code \
  --function-name epic-oauth-handler \
  --zip-file fileb://function.zip \
  --region us-west-2
```

### Grant Lambda Permissions for New Tables:

Go to Lambda → epic-oauth-handler → Configuration → Permissions → Role name (click) → Add permissions → Attach policies

Add inline policy:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:PutItem",
        "dynamodb:GetItem",
        "dynamodb:Query",
        "dynamodb:Scan",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem"
      ],
      "Resource": [
        "arn:aws:dynamodb:us-west-2:*:table/health_observations",
        "arn:aws:dynamodb:us-west-2:*:table/health_conditions",
        "arn:aws:dynamodb:us-west-2:*:table/health_medications",
        "arn:aws:dynamodb:us-west-2:*:table/health_allergies",
        "arn:aws:dynamodb:us-west-2:*:table/health_immunizations",
        "arn:aws:dynamodb:us-west-2:*:table/health_appointments"
      ]
    }
  ]
}
```

## Phase 3: Update Epic App Scopes ⚠️ **USER ACTION REQUIRED**

### Epic Developer Portal:
1. Go to https://fhir.epic.com/Developer/Apps
2. Log in with your Epic account
3. Find your app: **Client ID: 8da73e32-fe02-45da-a666-5bc96bdf2de2**
4. Click "Edit" or "Manage"
5. Find the "Scopes" or "Requested Scopes" section
6. **Add these new scopes:**
   - ✅ `patient/Observation.read` - For vitals and lab results
   - ✅ `patient/Condition.read` - For diagnoses
   - ✅ `patient/MedicationRequest.read` - For prescriptions
   - ✅ `patient/AllergyIntolerance.read` - For allergies
   - ✅ `patient/Immunization.read` - For vaccine history
   - ✅ `patient/Appointment.read` - For appointments
7. Save the changes
8. **Note**: You may need to re-authorize (disconnect and reconnect) for new scopes to take effect

### Frontend Config Updated ✅
The `src/config/epic-config.ts` has been updated with all new scopes.

## Phase 4: Testing

### Test with Derrick Lin Patient:
1. **Disconnect** from Epic MyChart (if already connected)
2. **Reconnect** to Epic MyChart (to authorize new scopes)
3. Use test credentials: `fhirderrick` / `epicepic1`
4. After successful OAuth, check Lambda logs (CloudWatch):
   ```
   Fetching additional FHIR resources...
   ✅ Successfully fetched 15 Observation resources
   ✅ Successfully fetched 3 Condition resources
   ✅ Successfully fetched 5 MedicationRequest resources
   ...
   ```
5. **Verify DynamoDB Tables** - Check each table has entries for your userId

### Check CloudWatch Logs:
```bash
aws logs tail /aws/lambda/epic-oauth-handler --follow
```

### Verify Data in DynamoDB:
```bash
# Check observations
aws dynamodb query \
  --table-name health_observations \
  --key-condition-expression "userId = :userId" \
  --expression-attribute-values '{":userId":{"S":"YOUR_COGNITO_USER_ID"}}'

# Check conditions
aws dynamodb query \
  --table-name health_conditions \
  --key-condition-expression "userId = :userId" \
  --expression-attribute-values '{":userId":{"S":"YOUR_COGNITO_USER_ID"}}'
```

## Phase 5: Frontend Display (Next Steps)

### Create API Endpoints:
- GET `/epic/observations` - Fetch observations
- GET `/epic/conditions` - Fetch conditions
- GET `/epic/medications` - Fetch medications
- GET `/epic/allergies` - Fetch allergies
- GET `/epic/immunizations` - Fetch immunizations
- GET `/epic/appointments` - Fetch appointments

### Create React Hooks:
- `useHealthObservations()` - Vitals and labs
- `useHealthConditions()` - Diagnoses
- `useHealthMedications()` - Prescriptions
- `useHealthAllergies()` - Allergies
- `useHealthImmunizations()` - Vaccines
- `useHealthAppointments()` - Appointments

### Create UI Components:
- `VitalsChart.tsx` - Line chart showing vitals over time
- `ConditionsList.tsx` - Cards showing active conditions
- `MedicationsList.tsx` - Table of current medications
- `AllergiesWarning.tsx` - Alert banner for allergies
- `ImmunizationHistory.tsx` - Timeline of vaccines
- `AppointmentsCalendar.tsx` - Calendar view of appointments

## Expected Data for Test Patient (Derrick Lin)

### Observations
- Blood pressure readings
- Weight measurements
- Temperature
- Heart rate
- Lab results (CBC, metabolic panel, etc.)

### Conditions
- Active diagnoses
- Resolved conditions
- Clinical statuses

### Medications
- Active prescriptions
- Completed medications
- Dosage instructions

### Allergies
- Drug allergies
- Food allergies
- Reaction descriptions

### Immunizations
- Flu shots
- COVID vaccines
- Childhood vaccines

### Appointments
- Upcoming appointments
- Past appointments
- Appointment types

## Rollback Plan

If issues occur:

1. **Revert Lambda Code:**
   ```bash
   # Deploy previous version
   aws lambda update-function-code \
     --function-name epic-oauth-handler \
     --s3-bucket YOUR_BACKUP_BUCKET \
     --s3-key lambda_backup_v1.zip
   ```

2. **Revert Frontend Scopes:**
   ```typescript
   // In epic-config.ts, remove new scopes
   scopes: [
     'openid',
     'fhirUser',
     'patient/Patient.read'
   ]
   ```

3. **Delete Tables (if needed):**
   ```bash
   aws dynamodb delete-table --table-name health_observations
   # Repeat for other tables
   ```

## Status Checklist

- [ ] 6 DynamoDB tables created
- [ ] Lambda function updated and deployed
- [ ] Lambda IAM permissions added for new tables
- [ ] Epic app scopes updated in Developer Portal
- [ ] Test disconnect and reconnect completed
- [ ] CloudWatch logs show successful resource fetching
- [ ] DynamoDB tables populated with test data
- [ ] Frontend scopes configuration updated (already done ✅)

## Troubleshooting

### "Access Denied" errors in Lambda logs:
- Check Lambda IAM role has permissions for all 6 new tables

### "401 Unauthorized" from Epic FHIR API:
- Epic app may not have new scopes approved
- Try disconnecting and reconnecting to re-authorize

### No data in tables after OAuth:
- Check CloudWatch logs for errors
- Verify Epic sandbox patient has data for these resource types
- Some resource types may be empty for test patients

### Lambda timeout:
- Increase Lambda timeout to 60 seconds (currently 30s may not be enough)
- Consider fetching resources in batches or async

## Next Steps After Deployment

1. ✅ Create Lambda functions to retrieve stored data
2. ✅ Add API Gateway endpoints for each resource type
3. ✅ Build React hooks for data fetching
4. ✅ Design and implement UI components
5. ✅ Add visualizations (charts, timelines, calendars)

## Notes

- All resource fetching happens **during OAuth callback** - data is available immediately after connection
- Epic sandbox test patients have limited data - production will have more
- Resource fetching is **non-blocking** - if one resource fails, others continue
- Consider adding background sync jobs for periodic updates
- MRN extraction is still pending (separate task)
