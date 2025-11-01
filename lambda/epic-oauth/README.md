# Epic OAuth Lambda Handler

This Lambda function handles the Epic FHIR OAuth 2.0 callback flow.

## Purpose
- Exchanges authorization code for access token
- Stores tokens securely in DynamoDB
- Fetches Patient resource from Epic FHIR API
- Stores patient data in DynamoDB

## Setup Instructions

### 1. Install Dependencies
```bash
cd lambda/epic-oauth
npm install
```

### 2. Environment Variables
Set these in AWS Lambda configuration:

```
EPIC_CLIENT_ID=fca52c91-c927-4a4e-a048-66a825d7259f
EPIC_TOKEN_URL=https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token
EPIC_FHIR_BASE_URL=https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4
EPIC_REDIRECT_URI=http://localhost:3000/auth/epic/callback
EPIC_TOKENS_TABLE=epic_tokens
HEALTH_PATIENTS_TABLE=health_patients
AWS_REGION=us-west-2
```

### 3. DynamoDB Tables

#### Table: epic_tokens
- Partition Key: `userId` (String)
- Attributes: accessToken, refreshToken, expiresAt, scope, epicPatientId, lastSync, createdAt, updatedAt

#### Table: health_patients
- Partition Key: `userId` (String)
- Attributes: epicPatientId, fhirData (Map), normalizedData (Map), createdAt, updatedAt

### 4. IAM Permissions

The Lambda execution role needs:
- DynamoDB: PutItem, GetItem, UpdateItem on both tables
- CloudWatch Logs: CreateLogGroup, CreateLogStream, PutLogEvents

### 5. Deploy

#### Option A: Manual Deployment
```bash
# Build
npm run build

# Package
zip -r epic-oauth.zip index.js node_modules package.json

# Upload to Lambda via AWS Console
```

#### Option B: AWS CLI
```bash
aws lambda create-function \
  --function-name epic-oauth-callback \
  --runtime nodejs18.x \
  --role arn:aws:iam::YOUR_ACCOUNT:role/lambda-execution-role \
  --handler index.handler \
  --zip-file fileb://epic-oauth.zip \
  --environment "Variables={EPIC_CLIENT_ID=...,EPIC_TOKENS_TABLE=epic_tokens,...}"
```

### 6. API Gateway Integration

Create an API Gateway REST API with:
- Path: `/epic/callback`
- Method: POST
- Authorization: Cognito User Pool
- Integration: Lambda Proxy

### 7. Test

```bash
# Test event payload
{
  "body": "{\"code\":\"test_code\",\"codeVerifier\":\"test_verifier\"}",
  "headers": {
    "Authorization": "Bearer COGNITO_JWT_TOKEN"
  },
  "requestContext": {
    "authorizer": {
      "claims": {
        "sub": "user-123-456"
      }
    }
  }
}
```

## Endpoints

### POST /epic/callback
**Request:**
```json
{
  "code": "authorization_code_from_epic",
  "codeVerifier": "pkce_code_verifier"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Successfully connected to Epic",
  "patientId": "eq081-VQEgP8drUUqCWzHfw3"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Error message",
  "message": "Failed to exchange authorization code"
}
```

## Logging

All operations are logged to CloudWatch Logs:
- Token exchange requests/responses
- FHIR API calls
- DynamoDB operations
- Errors with stack traces

## Security

- Access tokens encrypted at rest in DynamoDB
- Code verifier validated server-side
- Cognito JWT required for API access
- Epic credentials in environment variables (not code)
- HTTPS for all Epic API calls

## Troubleshooting

### "Token exchange failed"
- Check EPIC_CLIENT_ID is correct
- Verify redirect URI matches Epic sandbox configuration
- Ensure code_verifier matches original challenge

### "DynamoDB access denied"
- Verify Lambda execution role has DynamoDB permissions
- Check table names in environment variables

### "No user ID in request"
- Ensure API Gateway has Cognito authorizer attached
- Verify JWT token is valid
