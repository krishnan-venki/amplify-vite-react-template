# Python Lambda Deployment Guide

## Quick Deploy - Python Version 🐍

Since you're already using Python, this will be familiar!

### **Step 1: Create Lambda Function**

1. Go to [AWS Lambda Console](https://console.aws.amazon.com/lambda)
2. Click **"Create function"**
3. Choose **"Author from scratch"**
4. Settings:
   - **Function name:** `epic-oauth-handler`
   - **Runtime:** **Python 3.11** (or 3.10, 3.9)
   - **Architecture:** x86_64
   - **Execution role:** Create new role with basic Lambda permissions
5. Click **"Create function"**

### **Step 2: Upload Code**

#### **Option A: Copy-Paste (If no dependencies)**
1. In Lambda console, go to **Code** tab
2. Delete the default `lambda_function.py` content
3. **Copy the entire content** from `lambda_function.py`
4. **Paste** into the Lambda editor
5. Click **"Deploy"**

#### **Option B: ZIP Upload (With dependencies - Recommended)**

Since we use `requests` library (not in default Lambda), you need to package dependencies:

**On your local machine:**
```cmd
cd lambda\epic-oauth

# Create a package directory
mkdir package
cd package

# Install dependencies to package directory
pip install -r ..\requirements.txt --target .

# Copy your Lambda function
copy ..\lambda_function.py .

# Create ZIP (using PowerShell)
powershell Compress-Archive -Path * -DestinationPath ..\epic-oauth.zip

# Or if you have 7-Zip or WinRAR, create ZIP of all files in package\
```

**Upload to Lambda:**
1. In Lambda console, go to **Code** tab
2. Click **"Upload from"** → **".zip file"**
3. Select `epic-oauth.zip`
4. Click **"Save"**

### **Step 3: Configure Settings**

#### **Environment Variables**
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

#### **Timeout & Memory**
1. Go to **Configuration** → **General configuration** → **Edit**
2. Change **Timeout** from 3 seconds → **30 seconds**
3. Change **Memory** to **256 MB**
4. Click **"Save"**

#### **IAM Permissions**
1. Go to **Configuration** → **Permissions**
2. Click on the **Execution role** (opens IAM)
3. Click **"Add permissions"** → **"Attach policies"**
4. Search for `AmazonDynamoDBFullAccess`
5. Click **"Attach policy"**

### **Step 4: Create DynamoDB Tables**

#### **Table 1: epic_tokens**
```bash
aws dynamodb create-table \
    --table-name epic_tokens \
    --attribute-definitions AttributeName=userId,AttributeType=S \
    --key-schema AttributeName=userId,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --region us-west-2
```

Or via console:
1. Go to [DynamoDB Console](https://console.aws.amazon.com/dynamodb)
2. Click **"Create table"**
3. **Table name:** `epic_tokens`
4. **Partition key:** `userId` (String)
5. **Table settings:** Default settings
6. Click **"Create table"**

#### **Table 2: health_patients**
```bash
aws dynamodb create-table \
    --table-name health_patients \
    --attribute-definitions AttributeName=userId,AttributeType=S \
    --key-schema AttributeName=userId,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --region us-west-2
```

Or via console (same as above, just change table name to `health_patients`).

### **Step 5: Create Function URL or API Gateway**

#### **Option A: Lambda Function URL (Simplest)**

1. In Lambda console, go to **Configuration** → **Function URL**
2. Click **"Create function URL"**
3. Settings:
   - **Auth type:** AWS_IAM
   - **CORS:**
     - ✅ Enable
     - **Allowed origins:** `http://localhost:3000` (add your production URL later)
     - **Allowed methods:** POST, OPTIONS
     - **Allowed headers:** `*`
     - **Max age:** 86400
4. Click **"Save"**
5. **Copy the Function URL** (e.g., `https://abc123.lambda-url.us-west-2.on.aws/`)

**Update your frontend:**
```typescript
// src/config/api.ts
const API_ENDPOINTS = {
  EPIC_CALLBACK: 'https://abc123.lambda-url.us-west-2.on.aws/', // ← Paste here
  // ... rest
}
```

#### **Option B: API Gateway with Cognito Auth**

If you want to use API Gateway (like your existing setup):

1. Go to [API Gateway Console](https://console.aws.amazon.com/apigateway)
2. Find your existing API or create new one
3. Create resource `/epic/callback`
4. Create **POST** method
5. Integration type: **Lambda Function**
6. Enable **Lambda Proxy Integration**
7. Select `epic-oauth-handler` function
8. Add **Cognito Authorizer** (if you want to validate Cognito tokens)
9. Deploy to stage (e.g., `dev`)
10. Copy invoke URL

---

## Test the Lambda

### **Test Event (in Lambda Console)**

Go to **Test** tab, create test event:

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

Click **"Test"** - should execute successfully (will fail at Epic API, but validates Lambda setup).

---

## Python Code Features

### **What the Lambda Does:**

1. **Extracts user ID** from Cognito JWT token
2. **Parses request body** for authorization code and PKCE verifier
3. **Exchanges code for token** with Epic OAuth endpoint
4. **Stores tokens** in `epic_tokens` DynamoDB table
5. **Fetches patient data** from Epic FHIR API
6. **Normalizes patient data** (name, DOB, MRN, etc.)
7. **Stores patient data** in `health_patients` DynamoDB table
8. **Returns success** with patient info

### **Error Handling:**
- HTTP request errors (network, timeout)
- Epic API errors (401, 400, etc.)
- Missing parameters
- DynamoDB errors
- All errors logged to CloudWatch

### **Key Functions:**

```python
lambda_handler()              # Main entry point
exchange_code_for_token()     # POST to Epic token endpoint
store_tokens()                # DynamoDB write (epic_tokens table)
fetch_patient_resource()      # GET from Epic FHIR API
store_patient_data()          # DynamoDB write (health_patients table)
normalize_patient_data()      # Extract name, DOB, MRN, etc.
convert_floats_to_decimal()   # DynamoDB Decimal compatibility
```

---

## Comparison: Node.js vs Python

| Feature | Node.js (`index.js`) | Python (`lambda_function.py`) |
|---------|---------------------|-------------------------------|
| **Runtime** | Node.js 18.x | Python 3.11 |
| **Handler** | `index.handler` | `lambda_function.lambda_handler` |
| **HTTP Client** | `node-fetch` | `requests` |
| **AWS SDK** | `@aws-sdk/client-dynamodb` | `boto3` |
| **JSON Parsing** | `JSON.parse(event.body)` | `json.loads(event['body'])` |
| **Dependencies** | `npm install` → node_modules | `pip install` → package folder |
| **Package** | ZIP with node_modules | ZIP with site-packages |
| **Decimal Type** | Not needed | `Decimal` for DynamoDB floats |

**Both do the exact same thing!** Use whichever you're comfortable with. 🐍

---

## Checklist

- [ ] Lambda function created (Python 3.11)
- [ ] `lambda_function.py` uploaded (via ZIP with dependencies)
- [ ] Environment variables configured (7 variables)
- [ ] Timeout set to 30 seconds
- [ ] Memory set to 256 MB
- [ ] IAM role has DynamoDB permissions
- [ ] `epic_tokens` DynamoDB table created
- [ ] `health_patients` DynamoDB table created
- [ ] Function URL or API Gateway configured
- [ ] CORS enabled for frontend origin
- [ ] Frontend `API_ENDPOINTS.EPIC_CALLBACK` updated

---

## Next Steps

Once deployed:

1. Update `src/config/api.ts` with Lambda URL
2. Start frontend: `npm run dev`
3. Navigate to: `http://localhost:3000/healthcare/dashboard`
4. Click **"Connect Epic MyChart"**
5. Login with: `fhirderrick` / `epicepic1`
6. Should redirect and show success! ✅

---

## Troubleshooting

### **"No module named 'requests'"**
- Package dependencies with Lambda: follow "Option B: ZIP Upload"
- Or use Lambda Layer with `requests` library

### **"Unable to import module 'lambda_function'"**
- Ensure handler is set to `lambda_function.lambda_handler`
- Ensure `lambda_function.py` is at root of ZIP

### **CloudWatch Logs**
Lambda Console → **Monitor** → **View CloudWatch logs**
- Look for error messages
- Check Epic API responses
- Verify DynamoDB writes

---

**Ready to deploy!** 🚀 This Python version does exactly what the Node.js version does.
