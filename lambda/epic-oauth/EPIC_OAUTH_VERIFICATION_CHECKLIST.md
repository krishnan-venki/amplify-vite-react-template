# Epic OAuth Verification Checklist

## 🔍 Current Configuration

### **Client ID**
```
fca52c91-c927-4a4e-a048-66a825d7259f
```

### **Authorization URL Parameters**
Your authorization request now includes:

1. ✅ `response_type=code`
2. ✅ `client_id=fca52c91-c927-4a4e-a048-66a825d7259f`
3. ✅ `redirect_uri=http://localhost:5173/auth/epic/callback`
4. ✅ `scope=openid fhirUser patient/Patient.read patient/Observation.read patient/Condition.read patient/MedicationRequest.read patient/AllergyIntolerance.read patient/Immunization.read patient/Procedure.read patient/Appointment.read`
5. ✅ `state=<random 43-char string>`
6. ✅ `aud=https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4`
7. ✅ `launch=patient-standalone` **(NEW - just added)**
8. ✅ `code_challenge=<43-char PKCE challenge>`
9. ✅ `code_challenge_method=S256`

---

## ✅ Verification Steps

### **Step 1: Verify Client ID in Epic Portal**

Go to: https://fhir.epic.com/Developer/Apps

1. [ ] Find your app with Client ID: `fca52c91-c927-4a4e-a048-66a825d7259f`
2. [ ] Confirm the **exact Client ID** matches (copy/paste to compare)
3. [ ] Check the app status - should show **"Production Ready"** or **"Active"**
4. [ ] Verify it's in the **"Non-Production"** environment (sandbox)

---

### **Step 2: Verify Redirect URI**

In your Epic app configuration:

1. [ ] Check that `http://localhost:5173/auth/epic/callback` is listed
2. [ ] Verify there are NO trailing slashes
3. [ ] Confirm the port is `5173` (not `3000`)
4. [ ] Make sure HTTP (not HTTPS) is allowed for localhost

---

### **Step 3: Verify App Type**

1. [ ] Application Type should be: **"Public Client"**
2. [ ] PKCE should be: **"Required"** or **"Enabled"**
3. [ ] Grant Type should include: **"Authorization Code"**

---

### **Step 4: Verify Scopes in Epic App**

In your Epic app's scope/API configuration, verify these are **enabled**:

1. [ ] `openid`
2. [ ] `fhirUser`
3. [ ] `patient/Patient.read`
4. [ ] `patient/Observation.read`
5. [ ] `patient/Condition.read`
6. [ ] `patient/MedicationRequest.read`
7. [ ] `patient/AllergyIntolerance.read`
8. [ ] `patient/Immunization.read`
9. [ ] `patient/Procedure.read`
10. [ ] `patient/Appointment.read`

**Note:** If your Epic app doesn't have all these scopes enabled, Epic will return `error=4`.

---

### **Step 5: Check Data Use Questionnaire**

1. [ ] All required questions answered
2. [ ] No warning messages about incomplete sections
3. [ ] Questionnaire is marked as complete

---

### **Step 6: Test the OAuth Flow**

1. [ ] Hard refresh browser (`Ctrl + Shift + R`)
2. [ ] Clear sessionStorage (F12 → Application → Session Storage → Clear)
3. [ ] Navigate to `http://localhost:5173/healthcare/dashboard`
4. [ ] Click "Connect Epic MyChart"
5. [ ] Check browser console for authorization URL
6. [ ] Verify URL contains all parameters listed above (especially `launch=patient-standalone`)

---

## 🚨 What to Check When Testing

### **In Browser Console:**
Look for the log:
```
🚀 Redirecting to Epic authorization: https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize?...
```

Verify the URL includes:
- `launch=patient-standalone` (NEW)
- All 8 patient scopes listed
- `aud=https%3A%2F%2Ffhir.epic.com%2Finterconnect-fhir-oauth%2Fapi%2FFHIR%2FR4`

### **After Redirect:**
- If you see `error=4` again → Client ID or scope mismatch in Epic portal
- If you see Epic login page → SUCCESS! 🎉
- If you see a different error → Note the exact error message and parameters

---

## 📝 Common Causes of Error=4

1. **Client ID Mismatch**
   - The Client ID in your code doesn't match Epic portal
   - You're using the Production Client ID instead of Non-Production

2. **Scopes Not Enabled**
   - Your Epic app doesn't have all the requested scopes enabled
   - You need to edit the app and check the scope boxes

3. **App Not Activated**
   - App is still in "Draft" status
   - Need to mark as "Production Ready"

4. **Redirect URI Mismatch**
   - Typo in redirect URI (extra slash, wrong port, etc.)
   - Epic is very strict about exact matches

5. **Missing Required Parameter**
   - Missing `aud` parameter (we added this)
   - Missing `launch` parameter (just added this)
   - Invalid PKCE code_challenge

---

## 🎯 Next Steps After This Test

### **If you still get error=4:**

Please share:
1. The **exact error URL** Epic redirects to (the full URL with all parameters)
2. A screenshot of your Epic app's **"Overview"** page showing:
   - Client ID
   - App status
   - Redirect URIs
3. A screenshot of your Epic app's **"Scopes"** or **"API"** section showing which scopes are enabled

### **If you get to the Epic login page:**
1. Login with: `fhirderrick` / `epicepic1`
2. You should be redirected back to your callback page
3. The callback will validate state and call your Lambda
4. Check for any errors in the callback process

---

## 🔧 Alternative: Minimal Test

If you continue to get error=4, try this **ultra-minimal** configuration:

**Minimal Scopes (just to test if OAuth works at all):**
```typescript
scopes: [
  'openid',
  'fhirUser'
]
```

If even this minimal configuration fails, it confirms the issue is:
- Client ID mismatch
- App not activated
- Redirect URI problem

NOT a scope issue.

---

## 📧 What to Report to Epic Support (if needed)

```
Subject: Error 4 with Production Ready App

App Details:
- Client ID: fca52c91-c927-4a4e-a048-66a825d7259f
- Status: Production Ready
- Environment: Non-Production Sandbox
- App Type: Public Client
- PKCE: Enabled

Issue:
Receiving error=4 when attempting OAuth authorization despite:
- App marked as Production Ready
- All required parameters included (response_type, client_id, redirect_uri, scope, state, aud, launch, code_challenge, code_challenge_method)
- Redirect URI matches exactly: http://localhost:5173/auth/epic/callback
- Tested with both full scope list and minimal scopes (openid + fhirUser only)

Authorization URL:
[paste your full authorization URL here]

Error URL:
[paste the full error URL Epic redirects to]

Request: Please help identify why this app is returning error=4.
```

---

**Current Status:** Added `launch=patient-standalone` parameter. Ready for testing! 🚀
