# Deploy Epic Status Lambda - Quick Guide

## Step 1: Create Lambda Function

1. **Go to AWS Lambda Console**
   - Navigate to: https://us-west-2.console.aws.amazon.com/lambda/home?region=us-west-2

2. **Click "Create function"**

3. **Configure:**
   - **Function name:** `epic-status-handler`
   - **Runtime:** Python 3.13 (or 3.11/3.12)
   - **Architecture:** x86_64
   - **Permissions:** Create new role with basic Lambda permissions (we'll add DynamoDB later)

4. **Click "Create function"**

---

## Step 2: Upload Code

1. **In the Lambda function page:**
   - Click **"Upload from"** → **".zip file"**
   - Select: `c:\Work\Projects\amplify-vite-react-template\lambda\epic-status\epic-status.zip`
   - Click **"Save"**

---

## Step 3: Set Environment Variables

1. **Click "Configuration" tab** → **"Environment variables"**

2. **Click "Edit"** → **"Add environment variable"**

3. **Add these variables:**
   ```
   Key: EPIC_TOKENS_TABLE
   Value: epic_tokens
   
   Key: HEALTH_PATIENTS_TABLE  
   Value: health_patients
   ```
   
   *Note: AWS_REGION is automatically detected by boto3 from the Lambda environment*

4. **Click "Save"**

---

## Step 4: Add DynamoDB Permissions

1. **Go to "Configuration" tab** → **"Permissions"**

2. **Click on the Role name** (opens IAM in new tab)

3. **Click "Add permissions"** → **"Create inline policy"**

4. **Switch to JSON tab** and paste:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": [
           "dynamodb:GetItem",
           "dynamodb:Query"
         ],
         "Resource": [
           "arn:aws:dynamodb:us-west-2:891572012971:table/epic_tokens",
           "arn:aws:dynamodb:us-west-2:891572012971:table/health_patients"
         ]
       }
     ]
   }
   ```

5. **Click "Review policy"**
   - Name: `EpicDynamoDBReadAccess`
   
6. **Click "Create policy"**

---

## Step 5: Test Lambda Directly

1. **Go back to Lambda function** → **"Test" tab**

2. **Click "Create new test event"**
   - Event name: `TestConnectionStatus`
   - Template: `apigateway-aws-proxy`

3. **Replace the JSON with:**
   ```json
   {
     "resource": "/epic/status",
     "path": "/epic/status",
     "httpMethod": "GET",
     "headers": {},
     "requestContext": {
       "authorizer": {
         "claims": {
           "sub": "8871f320-0051-7075-5db0-cb07b0b60821"
         }
       }
     }
   }
   ```

4. **Click "Test"**

5. **Expected Result:**
   ```json
   {
     "statusCode": 200,
     "body": "{\"connected\": true, \"patientData\": {...}}"
   }
   ```

---

## Step 6: Add API Gateway Route

1. **Go to API Gateway Console**
   - Navigate to your API: `63z70erbsb` (or find it in API Gateway console)

2. **Create Resource:**
   - Click **"Actions"** → **"Create Resource"**
   - Resource Name: `status`
   - Resource Path: `/status`
   - Parent: `/epic`
   - Click **"Create Resource"**

3. **Create Method:**
   - Select `/epic/status` resource
   - Click **"Actions"** → **"Create Method"**
   - Choose **GET** from dropdown
   - Click checkmark ✓

4. **Configure GET Method:**
   - Integration type: **Lambda Function**
   - Use Lambda Proxy integration: **✓ (checked)**
   - Lambda Region: **us-west-2**
   - Lambda Function: **epic-status-handler**
   - Click **"Save"**
   - Click **"OK"** to give API Gateway permission

5. **Add Authorizer:**
   - Click **"Method Request"**
   - Authorization: Select your **Cognito User Pool Authorizer**
   - Click checkmark ✓

6. **Enable CORS:**
   - Select `/epic/status` resource
   - Click **"Actions"** → **"Enable CORS"**
   - Keep defaults
   - Click **"Enable CORS and replace existing CORS headers"**
   - Click **"Yes, replace existing values"**

7. **Deploy API:**
   - Click **"Actions"** → **"Deploy API"**
   - Deployment stage: **dev**
   - Click **"Deploy"**

---

## Step 7: Test in Your App

1. **Go to:** http://localhost:5173/healthcare/dashboard

2. **Expected Behavior:**
   - If you're connected to Epic: See Derrick Lin's patient information
   - If not connected: See "Connect to Epic MyChart" button

3. **If you see patient data:**
   - ✅ Name: Derrick Lin
   - ✅ Date of Birth
   - ✅ MRN: 203711
   - ✅ Gender
   - ✅ Last sync timestamp

---

## 🎉 Success Checklist

- [ ] Lambda created: `epic-status-handler`
- [ ] Environment variables set
- [ ] DynamoDB permissions added
- [ ] Lambda test passes
- [ ] API Gateway route created: `GET /epic/status`
- [ ] Cognito authorizer attached
- [ ] CORS enabled
- [ ] API deployed to `dev` stage
- [ ] Patient data displays on dashboard

---

## 🐛 Troubleshooting

### Lambda Test Fails with AccessDeniedException:
- Check DynamoDB permissions in IAM role
- Verify ARNs match your account ID

### 403 Forbidden in Browser:
- Check Cognito authorizer is attached to GET method
- Verify you're logged in

### 500 Internal Server Error:
- Check CloudWatch logs for Lambda
- Verify environment variables are set

### Patient Data Not Showing:
- Check browser console for errors
- Verify `/epic/status` endpoint returns data
- Check DynamoDB tables have data for your user

---

**Ready to deploy? Follow the steps above!** 🚀
