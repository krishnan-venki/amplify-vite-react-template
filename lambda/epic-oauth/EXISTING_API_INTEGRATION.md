# API Gateway Integration for Existing Setup

## Your Current Setup ✅

- **API Gateway Base URL:** `https://63z70erbsb.execute-api.us-west-2.amazonaws.com/dev`
- **Frontend Config:** Already updated in `src/config/api.ts`
- **Epic Callback Endpoint:** `${API_BASE_URL}/epic/callback`

---

## Add Epic Endpoint to Existing API Gateway

### **Step 1: Add Resource**

1. Go to [API Gateway Console](https://console.aws.amazon.com/apigateway)
2. Find your API: `63z70erbsb` 
3. Click on **Resources**
4. Click **Actions** → **Create Resource**
   - **Resource Name:** `epic`
   - **Resource Path:** `/epic`
   - **Enable CORS:** ✅ (check the box)
5. Click **Create Resource**

### **Step 2: Add Callback Method**

1. Select the `/epic` resource you just created
2. Click **Actions** → **Create Resource** (to create nested resource)
   - **Resource Name:** `callback`
   - **Resource Path:** `/callback`
   - **Enable CORS:** ✅
3. Click **Create Resource**
4. Now select `/epic/callback` resource
5. Click **Actions** → **Create Method** → Select **POST** → ✓ (checkmark)
6. **Integration Settings:**
   - **Integration type:** Lambda Function
   - **Use Lambda Proxy integration:** ✅ Check this box
   - **Lambda Region:** us-west-2
   - **Lambda Function:** `epic-oauth-handler`
7. Click **Save**
8. Click **OK** to give API Gateway permission to invoke Lambda

### **Step 3: Add Cognito Authorizer**

1. Click on the **POST** method under `/epic/callback`
2. Click **Method Request**
3. Under **Authorization**, click the pencil icon
4. Select your existing **Cognito User Pool Authorizer** (same one used for other endpoints)
5. Click the checkmark to save

### **Step 4: Enable CORS (if needed)**

If CORS wasn't auto-configured:

1. Select `/epic/callback` resource
2. Click **Actions** → **Enable CORS**
3. Ensure these are checked:
   - **Access-Control-Allow-Methods:** POST, OPTIONS
   - **Access-Control-Allow-Headers:** Content-Type, Authorization, X-Amz-Date, X-Api-Key, X-Amz-Security-Token
   - **Access-Control-Allow-Origin:** `*` (or your specific domain)
4. Click **Enable CORS and replace existing CORS headers**

### **Step 5: Deploy API**

1. Click **Actions** → **Deploy API**
2. **Deployment stage:** Select your existing stage (e.g., `dev`)
3. Click **Deploy**

**That's it!** Your endpoint is now live at:
```
https://63z70erbsb.execute-api.us-west-2.amazonaws.com/dev/epic/callback
```

---

## Verify Setup

### **Test in API Gateway Console**

1. Select **POST /epic/callback** method
2. Click **TEST** (lightning bolt icon)
3. **Request Body:**
   ```json
   {
     "code": "test-code",
     "codeVerifier": "test-verifier"
   }
   ```
4. Click **Test**
5. Should see Lambda execution (will fail at Epic API, but validates integration)

### **Test from Frontend**

Your frontend is already configured correctly in `src/config/api.ts`:

```typescript
EPIC_CALLBACK: `${API_BASE_URL}/epic/callback`, // ✅ Already pointing to correct URL
```

Just run your app and test the flow:
```cmd
npm run dev
```

Navigate to `http://localhost:3000/healthcare/dashboard` and click "Connect Epic MyChart"!

---

## Your Complete Epic Setup

### **Backend (Already Done):**
- ✅ Lambda function: `epic-oauth-handler` (Python)
- ✅ DynamoDB tables: `epic_tokens`, `health_patients`
- ✅ API Gateway resource: `/epic/callback` (just added)
- ✅ Cognito authorizer attached

### **Frontend (Already Done):**
- ✅ Epic config: `src/config/epic-config.ts`
- ✅ API endpoints: `src/config/api.ts`
- ✅ PKCE helpers: `src/utils/pkce-helpers.ts`
- ✅ HealthDashboard page
- ✅ ConnectEpicButton component
- ✅ EpicOAuthCallback component
- ✅ Routes configured

### **Ready to Test! 🚀**

1. Start dev server: `npm run dev`
2. Navigate to `/healthcare/dashboard`
3. Click "Connect Epic MyChart"
4. Login with: `fhirderrick` / `epicepic1`
5. Should redirect back and exchange token successfully!

---

## Additional Epic Endpoints (Phase 2)

When you're ready to add more Epic features, you can create these additional endpoints using the same pattern:

- **GET** `/epic/patient` - Fetch stored patient data for logged-in user
- **GET** `/epic/status` - Check if user has active Epic connection
- **POST** `/epic/refresh-token` - Refresh expired Epic tokens
- **POST** `/epic/disconnect` - Remove Epic connection

All these are already defined in `src/config/api.ts`, just need backend Lambda implementations.

---

**Your setup is almost complete!** Just add the API Gateway resource and you're ready to test! 🎉
