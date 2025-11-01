# Epic OAuth Error 4 - Comprehensive Troubleshooting

## Current Status
- ✅ App marked as "Production Ready" 
- ❌ Still getting `error=4` even with minimal scopes (`openid + fhirUser`)
- ❌ Error occurs BEFORE login screen (Epic rejects the authorization request immediately)

## What Error=4 Means
Epic's `error=4` typically indicates:
- **Unauthorized client** - The client_id is not recognized or not authorized
- **Invalid app configuration** - The app exists but isn't properly configured
- **App not activated** - Even "Production Ready" apps may need additional activation

---

## ✅ Checklist: What to Verify in Epic Developer Portal

### 1. **App Status**
- [ ] Status shows "Production Ready" or "Active"
- [ ] NOT showing "Draft" anymore

### 2. **Basic App Information**
- [ ] **App Name** is filled in
- [ ] **Application Type** is set to **"Public Client"** (not "Confidential")
- [ ] **Organization** field is filled

### 3. **Redirect URIs**
- [ ] `http://localhost:5173/auth/epic/callback` is listed
- [ ] URI is saved correctly (check for typos)
- [ ] Check if Epic requires **exact** URI match (no trailing slashes)

### 4. **OAuth Settings**
Look for a section called "OAuth Settings" or "API Settings":
- [ ] **Grant Types** - Make sure "Authorization Code" is checked
- [ ] **PKCE** - Should be "Required" or "Enabled"
- [ ] **Refresh Token** - Optional but recommended

### 5. **Scopes/Permissions**
Even for minimal OAuth, verify:
- [ ] `openid` scope is enabled
- [ ] `fhirUser` scope is enabled
- [ ] If there's a "Request Scopes" section, these must be checked

### 6. **Data Use Questionnaire**
- [ ] All required questions answered
- [ ] No warning messages about incomplete questionnaire
- [ ] All sections marked as complete

### 7. **Environment Settings**
- [ ] Make sure you're using the **Sandbox/Non-Production** environment
- [ ] NOT trying to use production FHIR endpoints with a sandbox app

---

## 🔧 Potential Solutions

### **Solution 1: Wait for Propagation**
Epic systems may need time to propagate the "Production Ready" status:
- **Wait:** 15-30 minutes after marking as Production Ready
- **Clear Epic's cache:** Try in an incognito/private browser window
- **Try again:** Sometimes takes a few tries

### **Solution 2: Create a Brand New App**
Your current app might be in a bad state. Create a fresh app:

1. **Go to Epic Developer Portal:** https://fhir.epic.com/Developer/Apps
2. **Click "Create New App"**
3. **Fill in ALL required fields from the start:**
   - App Name: "Sagaa Health Integration Test"
   - Application Type: **Public Client**
   - Redirect URIs: `http://localhost:5173/auth/epic/callback`
   - Scopes: Check `openid`, `fhirUser`
4. **Complete Data Use Questionnaire** immediately
5. **Mark as "Production Ready"** immediately
6. **Use the NEW client ID** in your code

### **Solution 3: Use Epic's Official Public Client**
Epic provides a public test client for developers:

**Public Client ID:** `f0201f63-c39b-4f48-8f67-85723e3e3a5e`

**But you need to verify:**
- What redirect URIs are allowed for this client
- Whether it supports `http://localhost:5173`

To check: Look at Epic's documentation or contact Epic support.

### **Solution 4: Check Epic Sandbox Status**
Sometimes the Epic Sandbox itself has issues:
- **Check:** https://fhir.epic.com/Documentation?docId=sandbox
- **Try:** Epic's sandbox status page for known issues
- **Alternative:** Try a different FHIR test server (SMART Health IT)

---

## 🎯 Recommended Next Steps

### **FIRST: Double-Check Your App Settings**

Go to your Epic app and take screenshots or note down:
1. What is the **exact status** shown? (Draft, Production Ready, Active, etc.)
2. What **Application Type** is selected?
3. What **Redirect URIs** are registered?
4. What **Scopes** are enabled?
5. Are there any **warning messages** or **missing required fields**?

### **SECOND: Try Creating a New App**

Since your current app has been toggled between Draft and Production multiple times, it might be in an inconsistent state. A fresh app might work immediately.

### **THIRD: Contact Epic Support**

If nothing works, Epic may need to manually activate your app:
- **Email:** fhir@epic.com
- **Include:**
  - Your Client ID: `fca52c91-c927-4a4e-a048-66a825d7259f`
  - Error message: `error=4`
  - What you've tried
  - Request help activating your sandbox app

---

## 🔍 Alternative: Use SMART Health IT Test Server

If Epic continues to have issues, consider using the SMART Health IT test server instead:

**Advantages:**
- ✅ No app registration required
- ✅ Works immediately
- ✅ Full SMART on FHIR support
- ✅ Test patients available

**SMART Health IT Configuration:**
```typescript
{
  clientId: 'your-app-id', // Can be any string
  fhirBaseUrl: 'https://launch.smarthealthit.org/v/r4/fhir',
  authorizationUrl: 'https://launch.smarthealthit.org/v/r4/auth/authorize',
  tokenUrl: 'https://launch.smarthealthit.org/v/r4/auth/token',
  scopes: ['openid', 'fhirUser', 'patient/*.read']
}
```

**To switch:**
1. Update `src/config/epic-config.ts` with SMART Health IT endpoints
2. No app registration needed
3. Works immediately for testing

---

## 📧 What to Report to Epic Support

If you contact Epic, include:

```
Subject: Sandbox App Not Working - Error 4

Hello Epic Support,

I have a sandbox application that is showing as "Production Ready" but 
continues to return error=4 when attempting OAuth authorization.

App Details:
- Client ID: fca52c91-c927-4a4e-a048-66a825d7259f
- Environment: Sandbox (Non-Production)
- Application Type: Public Client
- PKCE: Enabled
- Redirect URI: http://localhost:5173/auth/epic/callback
- Scopes Requested: openid, fhirUser
- Status: Production Ready

Error:
When redirecting to the authorization URL, Epic immediately returns 
error=4 without showing the login page.

Authorization URL:
https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize?response_type=code&client_id=fca52c91-c927-4a4e-a048-66a825d7259f&redirect_uri=http://localhost:5173/auth/epic/callback&scope=openid+fhirUser&state=...&code_challenge=...&code_challenge_method=S256

Error URL:
https://fhir.epic.com/mychart-fhir/Authentication/OAuth/Start?error=4&client_id=fca52c91-c927-4a4e-a048-66a825d7259f&redirect_uri=http://localhost:5173/auth/epic/callback&...

I have:
- Completed the Data Use Questionnaire
- Marked the app as "Production Ready"
- Verified all required fields are filled
- Waited 30+ minutes for propagation
- Tested with minimal scopes (openid + fhirUser only)

Could you please help activate this sandbox app or advise what 
additional configuration is needed?

Thank you!
```

---

## 🤔 My Recommendation

**I recommend creating a brand new Epic app from scratch.** Your current app has been modified multiple times and may be in an inconsistent state. A fresh app with all fields filled correctly from the start is most likely to work.

Would you like me to:
1. **Guide you through creating a new Epic app step-by-step?**
2. **Switch to SMART Health IT test server** for immediate testing?
3. **Help you draft an email to Epic support?**

Let me know which path you'd like to take!
