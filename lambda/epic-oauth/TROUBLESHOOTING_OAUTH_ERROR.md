# Epic OAuth "The Request is Invalid" - Troubleshooting Guide

## Common Causes & Solutions

### 1. **Redirect URI Mismatch** (Most Common)

**Problem:** The redirect_uri in your request doesn't match what's registered in Epic sandbox.

**Check:**
1. Open browser console before clicking "Connect Epic MyChart"
2. Click the button
3. Look for the log message showing the redirect_uri
4. It should be: `http://localhost:3000/auth/epic/callback`

**Solution:**
Go to Epic's Sandbox App Management:
- URL: https://fhir.epic.com/Developer/Apps
- Login with your Epic credentials
- Find your app (Client ID: `fca52c91-c927-4a4e-a048-66a825d7259f`)
- Verify redirect URI is **exactly**: `http://localhost:3000/auth/epic/callback`
- NO trailing slash, NO extra characters

### 2. **Invalid Client ID**

**Problem:** Client ID doesn't exist or is inactive in Epic sandbox.

**Check Console Logs:**
```javascript
client_id: 'fca52c91-c927-4a4e-a048-66a825d7259f'
```

**Solution:**
- Verify your Client ID is active in Epic sandbox
- If you created a new app, update `src/config/epic-config.ts` with the correct Client ID

### 3. **Invalid Scopes**

**Problem:** Requesting scopes not allowed for your app.

**Current Scopes:**
```
patient/Patient.read
patient/Observation.read
patient/Condition.read
patient/MedicationRequest.read
patient/Immunization.read
patient/AllergyIntolerance.read
patient/Appointment.read
openid
fhirUser
```

**Solution:**
If you're testing with a different app, you might need to reduce scopes. Try minimal scopes first:

Update `src/config/epic-config.ts`:
```typescript
scopes: [
  'patient/Patient.read',
  'openid',
  'fhirUser'
]
```

### 4. **Missing or Invalid `aud` Parameter**

**Problem:** Epic requires the `aud` (audience) parameter to match their FHIR base URL.

**Check Console Logs:**
```javascript
aud: 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4'
```

**Current Config:** ✅ Should be correct

### 5. **Invalid Code Challenge Method**

**Problem:** Epic might not support S256 for your app (unlikely but possible).

**Check Console Logs:**
```javascript
code_challenge_method: 'S256'
```

**Current Config:** ✅ S256 is standard

---

## Step-by-Step Debugging

### **Step 1: Check Console Output**

When you click "Connect Epic MyChart", you should see:

```
🔐 PKCE codes generated: {
  verifierLength: 43,
  challengeLength: 43,
  stateLength: 32
}

🚀 Redirecting to Epic authorization: https://fhir.epic.com/...

🔍 Authorization URL parameters: {
  authUrl: '...',
  redirectUri: 'http://localhost:3000/auth/epic/callback',
  clientId: 'fca52c91-c927-4a4e-a048-66a825d7259f',
  scopes: 'patient/Patient.read ...',
  aud: 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4',
  codeChallengeMethod: 'S256'
}
```

**Copy the full authorization URL and inspect it.**

### **Step 2: Manually Inspect the URL**

The URL should look like:
```
https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize?
  response_type=code&
  client_id=fca52c91-c927-4a4e-a048-66a825d7259f&
  redirect_uri=http://localhost:3000/auth/epic/callback&
  scope=patient/Patient.read%20openid%20fhirUser&
  state=<random-string>&
  aud=https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4&
  code_challenge=<base64-string>&
  code_challenge_method=S256
```

**Verify each parameter is present and correct.**

### **Step 3: Test with Minimal Scopes**

If still failing, try reducing to absolute minimum scopes:

**Update `src/config/epic-config.ts`:**
```typescript
scopes: [
  'openid',
  'fhirUser'
]
```

This tests if the issue is scope-related.

### **Step 4: Verify Epic Sandbox App Configuration**

1. Go to: https://fhir.epic.com/Developer/Apps
2. Find your app with Client ID: `fca52c91-c927-4a4e-a048-66a825d7259f`
3. Check:
   - ✅ App is **Active**
   - ✅ App Type: **Confidential Client** or **Public Client**
   - ✅ Redirect URIs includes: `http://localhost:3000/auth/epic/callback`
   - ✅ Required scopes are enabled for the app
   - ✅ PKCE is enabled (should be default)

### **Step 5: Check if You're Already Logged Into Epic**

**Epic Issue:** If you're already logged into Epic MyChart sandbox in the same browser, Epic might get confused.

**Solution:**
1. Open an **Incognito/Private window**
2. Navigate to your app: `http://localhost:3000/healthcare/dashboard`
3. Try connecting again

OR

1. Go to: https://fhir.epic.com/
2. Click "Log out" in the top right
3. Clear browser cookies for `fhir.epic.com`
4. Try again

---

## Quick Fix: Try Different Redirect URI

If nothing else works, Epic might have issues with localhost. Try using `127.0.0.1`:

**Update `src/config/epic-config.ts`:**

```typescript
const getRedirectUri = (): string => {
  if (typeof window !== 'undefined') {
    const { protocol, hostname, port } = window.location;
    // If localhost, use 127.0.0.1 instead (some OAuth providers prefer IP)
    const host = hostname === 'localhost' ? '127.0.0.1' : hostname;
    return `${protocol}//${host}${port ? `:${port}` : ''}/auth/epic/callback`;
  }
  return 'http://127.0.0.1:3000/auth/epic/callback';
};
```

**Then update Epic sandbox app to use:** `http://127.0.0.1:3000/auth/epic/callback`

---

## Epic Sandbox Known Issues

### **Issue: "Please log out"**

This specific message usually means:
1. You're already logged into Epic MyChart in another tab
2. Session conflict between different apps
3. Epic's session is stale

**Solution:**
1. Close ALL Epic/FHIR tabs
2. Clear cookies for `fhir.epic.com` and `fhir-myrecord.cerner.com`
3. Open fresh incognito window
4. Try OAuth flow again

---

## What to Share for Further Help

If still stuck, please share:

1. **Full console output** (especially the authorization URL parameters log)
2. **Exact error message** from Epic
3. **Screenshot** of Epic error page
4. **App configuration** from Epic Developer portal (redact sensitive info)
5. **Browser** you're using (Chrome, Firefox, etc.)

---

## Temporary Workaround: Test with Epic's Demo App

To verify Epic sandbox is working:

1. Go to: https://apporchard.epic.com/MyApps
2. Try connecting one of Epic's official demo apps
3. If those work, the issue is with your app configuration
4. If those fail, Epic sandbox might be having issues

---

## Most Likely Solution

Based on "The request is invalid" error, **90% chance** it's one of these:

1. ❌ Redirect URI not registered or mismatched
2. ❌ Client ID incorrect or app is inactive
3. ❌ You're already logged in (session conflict)

**Try these in order:**
1. Log out of all Epic sessions
2. Use incognito window
3. Verify redirect URI matches exactly: `http://localhost:3000/auth/epic/callback`
4. Check app is active in Epic Developer portal
