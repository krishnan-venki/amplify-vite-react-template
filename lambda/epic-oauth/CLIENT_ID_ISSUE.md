# Epic Non-Production vs Production Client IDs

## Issue Discovered
Your app has TWO client IDs:
- **Production Client ID**: `3d32cf4c-b896-4772-bf32-2dff285ce5cc`
- **Non-Production Client ID**: `8da73e32-fe02-45da-a666-5bc96bdf2de2` ← You're using this

## Critical Question
**Does the Non-Production Client ID use a different FHIR endpoint?**

Epic often has separate endpoints for:
- Production apps
- Non-production/sandbox apps

## Tests to Run

### Test 1: Verify Redirect URI Format
Your redirect URIs in Epic should be:
```
http://localhost:5173/auth/epic/callback
https://staging.sasasa.sh/auth/epic/callback  
https://app.sasaa.sh/auth/epic/callback
```

**NOT:**
```
localhost:5173/auth/epic/callback  ← Missing http://
```

### Test 2: Try Production Client ID Instead
Maybe the Non-Production Client ID doesn't have FHIR API access enabled.

**Update Lambda environment variable:**
```
EPIC_CLIENT_ID = 3d32cf4c-b896-4772-bf32-2dff285ce5cc
```

**Update frontend (`epic-config.ts`):**
```typescript
clientId: '3d32cf4c-b896-4772-bf32-2dff285ce5cc'
```

Then test OAuth flow again.

### Test 3: Check Epic App Status
In the screenshot, I see the app is in "Ready" state (not "Testing" or "Draft").

**Verify:**
1. App status is "Ready" or "Production Ready"
2. There's no warning about "Pending review" or "Limited access"
3. The app is approved for sandbox use

## What to Check Next

1. **Scroll down** in your Epic app page and screenshot:
   - Complete redirect URI list
   - SMART on FHIR version settings
   - Any sandbox/testing toggles
   - Patient access permissions

2. **Try switching to Production Client ID** in both Lambda and frontend

3. **Check if redirect URIs have `http://` protocol** - if not, add them in Epic

## Most Likely Issues

1. **Non-Production Client ID** might be limited or not have full API access
2. **Redirect URIs** missing protocol (`http://` or `https://`)
3. **App not fully approved** for sandbox FHIR API access

Let's try the Production Client ID - that might be the one that's actually configured for FHIR API access!
