# How to Publish Your Epic Sandbox App

## Problem: App in "Draft" Status

Epic apps in "Draft" status **cannot be used for OAuth** until they are published/activated.

---

## Solution: Publish the App

### **Step 1: Go to Epic Developer Portal**
https://fhir.epic.com/Developer/Apps

### **Step 2: Find Your App**
- Client ID: `fca52c91-c927-4a4e-a048-66a825d7259f`
- Should show status as **"Draft"**

### **Step 3: Complete Required Fields**

Epic requires certain fields before publishing:

1. **App Name** - Give it a name (e.g., "Sagaa Healthcare Integration")
2. **Redirect URIs** - Add:
   - `http://localhost:5173/auth/epic/callback`
   - `http://localhost:3000/auth/epic/callback` (if you want flexibility)
3. **App Type** - Should be **"Public Client"** (for PKCE without client secret)
4. **Scopes** - Select:
   - `openid`
   - `fhirUser`
   - `patient/Patient.read`
5. **Logo** (optional but may be required)
6. **Description** (brief description of your app)

### **Step 4: Publish/Activate**

Look for a button that says:
- **"Publish"** or
- **"Activate"** or  
- **"Submit for Review"** or
- **"Make Active"**

Click it and follow any prompts.

### **Step 5: Verify App is Active**

After publishing, the app status should change from **"Draft"** to **"Active"** or **"Published"**.

---

## Alternative: Use Epic's Public Test App

If you can't publish your app or want to test immediately, you can use **Epic's public non-production test app**:

### **Epic Public Test App Credentials:**
- **Client ID:** `f0201f63-c39b-4f48-8f67-85723e3e3a5e`
- **Allowed Redirect URIs:** (You'll need to check Epic's documentation for valid URIs)

**Update your `src/config/epic-config.ts`:**
```typescript
clientId: 'f0201f63-c39b-4f48-8f67-85723e3e3a5e',
```

**BUT** this public app may have **pre-registered redirect URIs** that don't include your localhost. Check Epic's documentation for the allowed redirect URIs.

---

## Recommended Approach

**Publish your own app** - This gives you full control over:
- Redirect URIs (you can use localhost)
- Scopes (you can request the ones you need)
- Configuration (customized for your use case)

Once your app is **Active**, the OAuth flow will work! 🎉

---

## After Publishing

1. **Verify app status** is "Active"
2. **Restart your dev server** (to clear any caching)
3. **Hard refresh** your browser (`Ctrl + Shift + R`)
4. **Try the OAuth flow again**
5. You should now get to the Epic login page successfully!

---

## Test Credentials (Same as before)
- **Username:** `fhirderrick`
- **Password:** `epicepic1`
- **Test Patient FHIR ID:** `eq081-VQEgP8drUUqCWzHfw3`

---

**Once published, you're ready to test!** 🚀
