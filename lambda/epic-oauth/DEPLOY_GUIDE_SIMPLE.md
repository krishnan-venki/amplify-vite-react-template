# Simple Lambda Deployment Guide

## For Python Developers Deploying Node.js Lambda 🐍→🟢

### **Method 1: AWS Console (No CLI needed)**

#### Step 1: Create Function
1. Go to [AWS Lambda Console](https://console.aws.amazon.com/lambda)
2. Click **"Create function"**
3. Choose **"Author from scratch"**
4. Settings:
   - **Function name:** `epic-oauth-handler`
   - **Runtime:** Node.js 18.x
   - **Architecture:** x86_64
   - **Execution role:** Create new role with basic Lambda permissions

#### Step 2: Add Code
Since we have dependencies (`node-fetch`, AWS SDK), we need to upload a ZIP:

**On your local machine:**
```cmd
cd lambda\epic-oauth
npm install
```

**Create ZIP file (Windows):**
```cmd
# PowerShell
Compress-Archive -Path index.js,node_modules,package.json -DestinationPath epic-oauth.zip

# OR use 7-Zip or WinRAR to create ZIP with:
# - index.js
# - node_modules/ (folder)
# - package.json
```

**Upload to Lambda:**
1. In Lambda console, go to **Code** tab
2. Click **"Upload from"** → **".zip file"**
3. Select `epic-oauth.zip`
4. Click **"Save"**

#### Step 3: Configure Environment Variables
Go to **Configuration** → **Environment variables** → **Edit** → **Add**:

```
EPIC_CLIENT_ID = fca52c91-c927-4a4e-a048-66a825d7259f
EPIC_TOKEN_URL = https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token
EPIC_FHIR_BASE_URL = https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4
EPIC_REDIRECT_URI = http://localhost:3000/auth/epic/callback
EPIC_TOKENS_TABLE = epic_tokens
HEALTH_PATIENTS_TABLE = health_patients
AWS_REGION = us-west-2
```

#### Step 4: Adjust Timeout
1. Go to **Configuration** → **General configuration** → **Edit**
2. Change **Timeout** from 3 seconds → **30 seconds**
3. Change **Memory** to **256 MB**

#### Step 5: Add DynamoDB Permissions
1. Go to **Configuration** → **Permissions**
2. Click on the **Execution role** (opens IAM)
3. Click **"Add permissions"** → **"Attach policies"**
4. Search for `AmazonDynamoDBFullAccess` (or create custom policy)
5. Click **"Attach policy"**

---

### **Method 2: AWS CLI (If you prefer command line)**

```cmd
cd lambda\epic-oauth

# Install dependencies
npm install

# Create deployment package
powershell Compress-Archive -Path index.js,node_modules,package.json -DestinationPath epic-oauth.zip

# Create Lambda function
aws lambda create-function ^
  --function-name epic-oauth-handler ^
  --runtime nodejs18.x ^
  --role arn:aws:iam::YOUR_ACCOUNT_ID:role/lambda-execution-role ^
  --handler index.handler ^
  --zip-file fileb://epic-oauth.zip ^
  --timeout 30 ^
  --memory-size 256 ^
  --environment Variables="{EPIC_CLIENT_ID=fca52c91-c927-4a4e-a048-66a825d7259f,EPIC_TOKEN_URL=https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token,EPIC_FHIR_BASE_URL=https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4,EPIC_REDIRECT_URI=http://localhost:3000/auth/epic/callback,EPIC_TOKENS_TABLE=epic_tokens,HEALTH_PATIENTS_TABLE=health_patients,AWS_REGION=us-west-2}"
```

---

## Create DynamoDB Tables

### **Table 1: epic_tokens**
1. Go to [DynamoDB Console](https://console.aws.amazon.com/dynamodb)
2. Click **"Create table"**
3. Settings:
   - **Table name:** `epic_tokens`
   - **Partition key:** `userId` (String)
   - Leave other settings default
4. Click **"Create table"**

### **Table 2: health_patients**
1. Click **"Create table"** again
2. Settings:
   - **Table name:** `health_patients`
   - **Partition key:** `userId` (String)
   - Leave other settings default
3. Click **"Create table"**

---

## Connect Lambda to API Gateway

### **Option A: Lambda Function URL (Simplest)**

1. In Lambda console, go to **Configuration** → **Function URL**
2. Click **"Create function URL"**
3. Settings:
   - **Auth type:** AWS_IAM (we'll handle Cognito in frontend)
   - **CORS:** Enable
   - **Allowed origins:** `http://localhost:3000` and your production URL
   - **Allowed methods:** POST
   - **Allowed headers:** `*`
4. Click **"Save"**
5. **Copy the Function URL** (looks like: `https://xyz123.lambda-url.us-west-2.on.aws/`)

**Update your frontend:**
```typescript
// src/config/api.ts
const API_ENDPOINTS = {
  EPIC_CALLBACK: 'https://xyz123.lambda-url.us-west-2.on.aws/', // ← Paste here
  // ... rest
}
```

### **Option B: API Gateway (If you want more control)**

1. Go to [API Gateway Console](https://console.aws.amazon.com/apigateway)
2. Click **"Create API"** → **REST API** → **Build**
3. Settings:
   - **Protocol:** REST
   - **New API**
   - **API name:** `SagaaHealthcareAPI`
   - **Endpoint Type:** Regional
4. Click **"Create API"**

5. **Create Resource:**
   - Click **"Actions"** → **"Create Resource"**
   - **Resource Name:** `epic`
   - **Resource Path:** `/epic`
   - Enable CORS: ✅
   - Click **"Create Resource"**

6. **Create Method:**
   - Select `/epic` resource
   - Click **"Actions"** → **"Create Method"** → **POST**
   - Settings:
     - **Integration type:** Lambda Function
     - **Lambda Proxy Integration:** ✅ Enable
     - **Lambda Function:** `epic-oauth-handler`
   - Click **"Save"**

7. **Add Cognito Authorizer:**
   - Click **"Authorizers"** → **"Create New Authorizer"**
   - **Name:** `CognitoAuthorizer`
   - **Type:** Cognito
   - **Cognito User Pool:** Select your pool
   - **Token Source:** `Authorization`
   - Click **"Create"**
   
8. **Attach Authorizer to Method:**
   - Go back to `/epic` → **POST**
   - Click **"Method Request"**
   - **Authorization:** Select `CognitoAuthorizer`

9. **Deploy API:**
   - Click **"Actions"** → **"Deploy API"**
   - **Deployment stage:** `dev` (or create new)
   - Click **"Deploy"**
   
10. **Copy Invoke URL** (looks like: `https://abc123.execute-api.us-west-2.amazonaws.com/dev`)

**Update your frontend:**
```typescript
// src/config/api.ts
const API_ENDPOINTS = {
  EPIC_CALLBACK: 'https://abc123.execute-api.us-west-2.amazonaws.com/dev/epic', // ← Paste here
  // ... rest
}
```

---

## Test the Lambda

### **Test Payload (for Lambda console testing)**

Go to **Test** tab in Lambda console, create test event:

```json
{
  "body": "{\"code\":\"test-auth-code\",\"codeVerifier\":\"test-verifier\"}",
  "requestContext": {
    "authorizer": {
      "claims": {
        "sub": "test-user-123"
      }
    }
  }
}
```

Click **"Test"** - you should see execution results (will fail at Epic API call, but validates Lambda setup).

---

## Quick Checklist

- [ ] Lambda function created with Node.js 18.x runtime
- [ ] `index.js` and `node_modules` uploaded (ZIP)
- [ ] Environment variables configured (7 variables)
- [ ] Timeout set to 30 seconds
- [ ] Memory set to 256 MB
- [ ] IAM role has DynamoDB permissions
- [ ] `epic_tokens` DynamoDB table created
- [ ] `health_patients` DynamoDB table created
- [ ] Function URL or API Gateway endpoint created
- [ ] CORS enabled for your frontend origin
- [ ] Frontend `API_ENDPOINTS.EPIC_CALLBACK` updated with URL

---

## Comparison: Python vs Node.js Lambda

| Aspect | Python Lambda | This Node.js Lambda |
|--------|---------------|---------------------|
| **Code file** | `lambda_function.py` | `index.js` |
| **Handler** | `lambda_function.lambda_handler` | `index.handler` |
| **Dependencies** | `requirements.txt` → Layer | `package.json` → ZIP with node_modules |
| **Event parsing** | `event['body']` | `JSON.parse(event.body)` |
| **HTTP client** | `requests.post()` | `fetch()` |
| **AWS SDK** | `boto3.client('dynamodb')` | `@aws-sdk/client-dynamodb` |
| **Response** | `return {'statusCode': 200, 'body': json.dumps()}` | `return {statusCode: 200, body: JSON.stringify()}` |

The **logic is the same**, just different syntax! 🐍🟢

---

## Next: Test the Full Flow

Once deployed:

1. Start your frontend: `npm run dev`
2. Navigate to: `http://localhost:3000/healthcare/dashboard`
3. Click **"Connect Epic MyChart"**
4. Login with: `fhirderrick` / `epicepic1`
5. Should redirect back and show success! ✅

---

**Need help?** Check CloudWatch Logs:
- Lambda Console → **Monitor** → **View CloudWatch logs**
- Look for errors in the log streams
