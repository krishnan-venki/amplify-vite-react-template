# Phase 1: Epic OAuth Integration - Approach Discussion

## 📌 Overview

This document summarizes our approach for Phase 1 before we start coding. Please review and confirm before we proceed.

---

## ✅ What You've Confirmed

1. **Epic Credentials:** Non-Production Client ID `fca52c91-c927-4a4e-a048-66a825d7259f`
2. **Redirect URI:** `http://localhost:3000/auth/epic/callback` (local testing)
3. **AWS Environment:** Use existing Amplify Gen 2 setup
4. **KMS Encryption:** Not yet configured (we'll use DynamoDB encryption for now)
5. **Demo User:** You have 1 demo user (we'll map to Epic's Derrick Lin test patient)
6. **Deployment:** Start local, then push to Amplify (will need staging redirect URI)
7. **Scope:** Phase 1 only - OAuth flow + Patient resource

---

## 🏗️ Architecture Approach

### **Frontend (React + TypeScript)**
```
User clicks button → Generate PKCE → Redirect to Epic → Handle callback
```

**Components we'll create:**
1. `ConnectEpicButton.tsx` - Initiates OAuth
2. `EpicOAuthCallback.tsx` - Handles Epic redirect
3. `pkce-helpers.ts` - Security utilities
4. `epic-config.ts` - Configuration

**Key decisions:**
- ✅ Use sessionStorage (temporary, cleared after OAuth)
- ✅ No tokens stored in frontend (security best practice)
- ✅ PKCE with SHA-256 (S256 method)
- ✅ State parameter for CSRF protection

### **Backend (AWS Lambda + DynamoDB)**
```
API Gateway → Lambda → Epic Token API → DynamoDB
                    → Epic FHIR API → DynamoDB
```

**Components we'll create:**
1. `epic-oauth` Lambda function
2. `epic_tokens` DynamoDB table
3. `health_patients` DynamoDB table

**Key decisions:**
- ✅ Tokens stored in DynamoDB backend only
- ✅ Use existing DynamoDB encryption (no KMS yet)
- ✅ Lambda exchanges code for token (backend-to-backend)
- ✅ Immediately fetch Patient resource after OAuth

---

## 🔐 Security Measures

### **1. PKCE (Authorization Code Interception Protection)**
```
code_verifier → SHA-256 → code_challenge → Epic
                                         ↓
                           code + verifier → Token
```

- Generated client-side with crypto API
- Prevents authorization code theft
- Industry standard for public clients

### **2. State Parameter (CSRF Protection)**
```
Generate random state → Store in sessionStorage
                     → Send to Epic
                     → Validate on return
```

- 32+ character random string
- Prevents cross-site request forgery
- Must match exactly on callback

### **3. Token Security**
- ✅ Never exposed to frontend
- ✅ Stored in DynamoDB backend
- ✅ Encrypted at rest (DynamoDB default encryption)
- 🔜 Future: Add KMS encryption layer

---

## 📊 Data Flow

### **Happy Path:**
```
1. User clicks "Connect Epic MyChart"
   ├─ Generate code_verifier (random 32 bytes)
   ├─ Generate code_challenge (SHA-256 of verifier)
   ├─ Generate state (random 32 bytes)
   ├─ Store verifier + state in sessionStorage
   └─ Redirect to Epic with parameters

2. Epic Authorization Page
   ├─ User logs in with test credentials
   ├─ User approves data sharing
   └─ Redirect back with code + state

3. Callback Handler (/auth/epic/callback)
   ├─ Extract code + state from URL
   ├─ Retrieve verifier + state from sessionStorage
   ├─ Validate state matches
   ├─ Call Lambda with code + verifier
   └─ Wait for response

4. Lambda (handleEpicCallback)
   ├─ Exchange code + verifier for token
   ├─ Store tokens in epic_tokens table
   ├─ Fetch Patient resource from Epic
   ├─ Store patient data in health_patients table
   └─ Return success to frontend

5. Success Screen
   ├─ Show "Successfully connected!"
   ├─ Clear sessionStorage
   └─ Redirect to health dashboard
```

### **Error Scenarios:**
- User denies permission → Show message, redirect back
- State mismatch → Security error, clear session
- Token exchange fails → Show error, log details
- Network timeout → Retry option
- Epic API error → Display friendly message

---

## 🗄️ Database Schema

### **Table 1: epic_tokens**
```
Primary Key: userId (Cognito user ID)

Fields:
- userId: string
- epicPatientId: string
- accessToken: string (encrypted at rest)
- refreshToken: string (encrypted at rest)
- tokenType: string ("Bearer")
- expiresAt: number (Unix timestamp)
- scope: string
- lastSync: number (Unix timestamp)
- createdAt: number
- updatedAt: number
```

### **Table 2: health_patients**
```
Primary Key: userId

Fields:
- userId: string
- epicPatientId: string
- fhirData: object (complete FHIR JSON)
- normalizedData: object (simplified fields)
- createdAt: number
- updatedAt: number
```

**Why normalized data?**
- FHIR JSON is complex and nested
- Normalized data is easier for AI agents to read
- Example: `normalizedData.firstName` vs. `fhirData.name[0].given[0]`

---

## 🧪 Testing Strategy

### **Manual Testing Steps:**
1. Start local dev server (`npm run dev`)
2. Start Amplify sandbox (`npx ampx sandbox`)
3. Navigate to healthcare page
4. Click "Connect Epic MyChart"
5. Use Epic test credentials to log in
6. Approve permissions
7. Verify redirect to callback
8. Check DynamoDB for stored data
9. Verify success message

### **What to Verify:**
- [ ] PKCE codes generated correctly
- [ ] Redirect URL has all parameters
- [ ] Epic login page appears
- [ ] Callback receives code
- [ ] State validation passes
- [ ] Token exchange succeeds
- [ ] Data stored in DynamoDB
- [ ] Success screen shows

### **Epic Test Credentials:**
You'll receive test credentials from Epic sandbox (or use their public test accounts)

---

## 📝 Open Questions / Decisions Needed

### **1. Routing for Callback Page**
**Question:** How should we add the `/auth/epic/callback` route?

**Options:**
- A) Add to existing router (recommended)
- B) Create new route group
- C) Use existing page structure

**Recommendation:** Add to your existing React Router setup

---

### **2. User Authentication Integration**
**Question:** How do we get the current Cognito user ID?

**Context:** Lambda needs `userId` to store tokens

**Options:**
- A) Extract from Cognito JWT token (recommended)
- B) Pass from frontend
- C) Use Amplify Auth utilities

**Recommendation:** Use Amplify's `getCurrentUser()` in Lambda

---

### **3. API Gateway Endpoint**
**Question:** What path should we use for the Lambda?

**Options:**
- A) `/api/epic/callback` (matches finance pattern)
- B) `/api/health/epic/callback` (more specific)
- C) Custom preference

**Recommendation:** `/api/epic/callback` for simplicity

---

### **4. Error Handling UI**
**Question:** Where should errors be displayed?

**Options:**
- A) Toast notifications (non-intrusive)
- B) Error page (clear but blocks)
- C) Modal dialog (middle ground)

**Recommendation:** Error page with auto-redirect (like in the plan)

---

### **5. Success Redirect**
**Question:** Where should we redirect after successful connection?

**Options:**
- A) `/healthcare` (main healthcare page)
- B) `/health-dashboard` (dedicated dashboard)
- C) Back to previous page

**Current plan:** `/health-dashboard` (you may not have this yet)

**Alternative:** Redirect to `/healthcare` and show success message

---

### **6. Staging/Production Redirect URI**
**Question:** What will be your Amplify staging URL?

**Context:** Needed when you deploy to Amplify

**Format:** `https://main.XXXXX.amplifyapp.com/auth/epic/callback`

**Action:** You can provide this later when deploying

---

## 🚦 Implementation Order

### **Day 1-2: Foundation**
1. Create config file with Epic credentials
2. Create DynamoDB table schemas (in Amplify data/resource.ts)
3. Create Lambda function structure
4. Set up environment variables

**Deliverable:** Infrastructure ready for coding

---

### **Day 3-4: Frontend OAuth**
1. Create PKCE helper utilities
2. Build ConnectEpicButton component
3. Build EpicOAuthCallback component
4. Add routing for callback page
5. Test PKCE generation

**Deliverable:** Frontend can initiate OAuth and handle callback

---

### **Day 5-7: Backend + Integration**
1. Implement Lambda handler
2. Token exchange logic
3. Patient resource fetch
4. DynamoDB storage
5. End-to-end testing
6. Error handling refinement

**Deliverable:** Complete working OAuth flow

---

## ✅ Pre-Implementation Checklist

Before we start coding, confirm:

- [ ] You have access to Epic sandbox (can log in)
- [ ] Client ID is correct: `fca52c91-c927-4a4e-a048-66a825d7259f`
- [ ] Redirect URI registered: `http://localhost:3000/auth/epic/callback`
- [ ] Your Amplify environment is working (can deploy)
- [ ] You have React Router set up (for callback route)
- [ ] You have access to DynamoDB (through Amplify)
- [ ] You understand the OAuth flow (reviewed plan)

---

## 🎯 Success Criteria for Phase 1

We're done when:

1. ✅ User can click "Connect Epic MyChart"
2. ✅ User redirects to Epic login page
3. ✅ User logs in with test credentials
4. ✅ User approves data sharing
5. ✅ User redirects back to Sagaa
6. ✅ Tokens stored in DynamoDB `epic_tokens` table
7. ✅ Patient data stored in `health_patients` table
8. ✅ User sees success confirmation
9. ✅ No errors in browser console
10. ✅ No errors in CloudWatch logs

---

## 🔮 What's NOT in Phase 1

To keep scope manageable:

- ❌ Token refresh logic (Phase 2)
- ❌ Other FHIR resources (Appointments, Meds, Labs) (Phase 2)
- ❌ Health dashboard UI (Phase 2)
- ❌ Cross-vertical integration (Phase 3)
- ❌ Production Epic integration (Post-POC)
- ❌ KMS encryption (Future enhancement)
- ❌ Error retry mechanisms (Future enhancement)

---

## 💬 Discussion Topics

### **1. Do you want to review the security approach?**
- PKCE implementation
- State parameter validation
- Token storage strategy

### **2. Any concerns about the architecture?**
- Frontend components
- Backend Lambda structure
- DynamoDB schema

### **3. Questions about Epic sandbox?**
- How to get test credentials
- Understanding test patients
- Sandbox limitations

### **4. Integration with existing code?**
- Where to add ConnectEpicButton (which page?)
- How it fits with your current healthcare components
- Routing setup

### **5. Timeline realistic?**
- 7 days for Phase 1
- Can you commit focused time?
- Need to adjust timeline?

---

## 📞 Next Steps

### **If approach looks good:**
1. Confirm you've reviewed both documents (this + implementation plan)
2. Answer open questions above (especially routing, user auth, redirects)
3. Confirm you're ready to start coding
4. We'll begin with Day 1 tasks (infrastructure setup)

### **If you need changes:**
1. Point out concerns
2. Suggest modifications
3. We'll update the plan before coding

---

## 📚 Reference Documents

1. **Phase 1 Implementation Plan** - Detailed technical specs
2. **Epic Integration Guide** - Full POC overview
3. **Epic FHIR Docs** - https://fhir.epic.com/Documentation
4. **SMART on FHIR** - http://hl7.org/fhir/smart-app-launch/

---

**Ready to start?** Let me know if you have any questions or concerns about this approach! 🚀
