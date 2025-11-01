# Project Analysis - Epic OAuth Integration

## 📊 Complete Project Analysis

I've analyzed your entire project structure and can now answer all the open questions from the Phase 1 approach discussion.

---

## ✅ Answers to Open Questions

### **1. Routing for Callback Page**

**Answer:** ✅ **Add to existing React Router in `main.tsx`**

**Your Current Setup:**
- Using `createBrowserRouter` from `react-router-dom`
- All routes defined in `src/main.tsx`
- Pattern: `{ path: 'route', element: <Component /> }`

**What to Add:**
```typescript
// In main.tsx, add to the router children array:
{ path: 'auth/epic/callback', element: <EpicOAuthCallback /> }
```

**Note:** No need for ProtectedRoute wrapper since this is the OAuth callback handler

---

### **2. User Authentication Integration**

**Answer:** ✅ **Extract from Cognito JWT using `fetchAuthSession()`**

**Your Current Pattern:**
You're already using this extensively across your project:

```typescript
// From src/hooks/useFinanceDashboard.ts (your existing code)
import { fetchAuthSession } from 'aws-amplify/auth';

const session = await fetchAuthSession();
const token = session.tokens?.idToken?.toString();
```

**For Lambda:**
The Lambda will extract user ID from the JWT token's `sub` claim automatically when you include the Authorization header.

**Backend Implementation:**
```typescript
// In Lambda, the user ID is available in the event context
// Amplify Gen 2 automatically validates Cognito JWT
const userId = event.requestContext.authorizer.claims.sub;
```

---

### **3. API Gateway Endpoint**

**Answer:** ✅ **Use `/api/epic/callback`** (matches your finance pattern)

**Your Current API Structure:**
From `src/config/api.ts`:
```typescript
const API_BASE_URL = 'https://63z70erbsb.execute-api.us-west-2.amazonaws.com/dev';

export const API_ENDPOINTS = {
  PROMPT: `${API_BASE_URL}/prompt`,
  CHAT: `${API_BASE_URL}/chat`,
  INSIGHTS: `${API_BASE_URL}/insights`,
  GOALS: `${API_BASE_URL}/goals`,
  FINANCE_DASHBOARD: `${API_BASE_URL}/finance/dashboard`,
  FINANCE_SANKEY: `${API_BASE_URL}/finance/sankey`,
  // ... more
}
```

**Add for Epic:**
```typescript
// In src/config/api.ts
export const API_ENDPOINTS = {
  // ... existing endpoints
  EPIC_CALLBACK: `${API_BASE_URL}/epic/callback`,
  EPIC_PATIENT: `${API_BASE_URL}/epic/patient`,
  EPIC_REFRESH_TOKEN: `${API_BASE_URL}/epic/refresh-token`,
}
```

---

### **4. Error Handling UI**

**Answer:** ✅ **Full-page error display with auto-redirect** (as in implementation plan)

**Reason:** Consistent with your authentication flow patterns
- Your SignIn/SignUp pages use full-page layouts
- OAuth is a critical auth flow, deserves full attention
- Clear error messaging without distractions

**Already designed in `EpicOAuthCallback.tsx` component**

---

### **5. Success Redirect**

**Answer:** ✅ **Redirect to `/healthcare/dashboard`**

**Your Current Healthcare Routes:**
```typescript
// From main.tsx
{ path: 'healthcare', element: <SagaaHealthCarePage /> },
{ path: 'sagaa-healthcare', element: <SagaaHealthCarePage /> },
{ path: 'healthcare/dashboard', element: <SagaaHealthCarePage /> },
```

**Recommendation:** Use `/healthcare/dashboard` 
- It's already defined in your router
- Consistent with other verticals (`/money/dashboard`, `/life/dashboard`)
- Currently points to `SagaaHealthCarePage` (we can update later if you build a dedicated dashboard)

**Alternative:** If you want to build a new health dashboard component first, we can create `HealthDashboard.tsx` similar to your `FinanceDashboard.tsx`

---

### **6. Staging/Production Redirect URI**

**Answer:** ✅ **Will configure when deploying**

**Your Current API Base:**
`https://63z70erbsb.execute-api.us-west-2.amazonaws.com/dev`

**Expected Amplify URL Pattern:**
`https://main.d[APPID].amplifyapp.com/auth/epic/callback`

**Action:** We'll update the Epic config when you deploy to Amplify hosting

---

## 🏗️ Your Current Architecture (Analyzed)

### **Frontend Stack:**
- ✅ React 18 with TypeScript
- ✅ React Router v6 (`createBrowserRouter`)
- ✅ AWS Amplify UI React (`useAuthenticator`)
- ✅ TanStack Query (React Query) for data fetching
- ✅ Vite build system

### **Authentication:**
- ✅ AWS Cognito via Amplify
- ✅ Pattern: `useAuthenticator()` hook for user context
- ✅ Pattern: `fetchAuthSession()` for tokens
- ✅ `ProtectedRoute` wrapper for authenticated routes

### **API Communication:**
- ✅ Centralized config in `src/config/api.ts`
- ✅ Base URL from environment variable or default
- ✅ Pattern: `fetch()` with Authorization header
- ✅ JWT token from Cognito in Bearer format

### **State Management:**
- ✅ React Query for server state (hooks in `src/hooks/`)
- ✅ Local state with `useState`
- ✅ Query caching with `staleTime` and `gcTime`

### **AWS Backend:**
- ✅ Amplify Gen 2 setup
- ✅ API Gateway: `https://63z70erbsb.execute-api.us-west-2.amazonaws.com/dev`
- ✅ Lambda functions (inferred from API endpoints)
- ✅ DynamoDB (used for finance, goals, insights)
- ✅ Cognito User Pool for auth

### **Existing Hooks Pattern:**
```typescript
// Your standard hook pattern (from useFinanceDashboard.ts)
export function useFinanceDashboard(options = {}) {
  const fetchData = async () => {
    const session = await fetchAuthSession();
    const token = session.tokens?.idToken?.toString();
    
    const response = await fetch(API_ENDPOINTS.FINANCE_DASHBOARD, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return await response.json();
  };
  
  return useQuery({
    queryKey: ['finance', 'dashboard'],
    queryFn: fetchData,
    enabled: options.enabled,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}
```

---

## 🔄 Integration Strategy for Epic OAuth

### **Follow Your Existing Patterns:**

1. **API Endpoint Configuration**
   - Add Epic endpoints to `src/config/api.ts`
   - Use same base URL structure

2. **Authentication**
   - Use `fetchAuthSession()` for Cognito tokens
   - Pass JWT in Authorization header
   - Lambda validates automatically

3. **Data Fetching Hooks**
   - Create `src/hooks/useEpicPatient.ts`
   - Follow same pattern as `useFinanceDashboard.ts`
   - Use React Query for caching

4. **React Router**
   - Add callback route to `main.tsx`
   - Use same structure as other routes

5. **Protected Routes**
   - Epic-related pages should use `<ProtectedRoute>`
   - Callback page doesn't need protection (public OAuth endpoint)

---

## 📁 File Organization (Following Your Structure)

### **New Files to Create:**

```
src/
├── config/
│   └── epic-config.ts              ✨ NEW - Epic credentials and URLs
├── utils/
│   └── pkce-helpers.ts             ✨ NEW - PKCE generation utilities
├── hooks/
│   ├── useEpicPatient.ts           ✨ NEW - Fetch patient data
│   └── useEpicConnection.ts        ✨ NEW - Check connection status
├── components/
│   └── healthcare/
│       ├── ConnectEpicButton.tsx   ✨ NEW - OAuth initiation
│       └── EpicOAuthCallback.tsx   ✨ NEW - OAuth callback handler
└── types/
    └── epic.ts                      ✨ NEW - Epic/FHIR type definitions

amplify/
├── functions/
│   └── epic-oauth/                 ✨ NEW FOLDER
│       ├── handler.ts              ✨ NEW - Lambda handler
│       ├── types.ts                ✨ NEW - Lambda types
│       └── package.json            ✨ NEW - Lambda dependencies
└── data/
    └── resource.ts                 ✅ UPDATE - Add Epic tables
```

---

## 💡 Recommended Implementation Approach

### **Phase 1A: Frontend Setup (Days 1-2)**
1. ✅ Create `src/config/epic-config.ts`
2. ✅ Update `src/config/api.ts` with Epic endpoints
3. ✅ Create PKCE utilities
4. ✅ Create ConnectEpicButton component
5. ✅ Create EpicOAuthCallback component
6. ✅ Add route to `main.tsx`

### **Phase 1B: Backend Setup (Days 3-4)**
1. ✅ Update `amplify/data/resource.ts` with DynamoDB tables
2. ✅ Create Lambda function structure
3. ✅ Implement Lambda handler
4. ✅ Update `amplify/backend.ts`

### **Phase 1C: Integration (Days 5-7)**
1. ✅ Create data fetching hooks
2. ✅ Add ConnectEpicButton to healthcare page
3. ✅ Test OAuth flow end-to-end
4. ✅ Verify DynamoDB storage
5. ✅ Test error scenarios

---

## 🔐 Security Notes (Based on Your Setup)

### **Your Current Security:**
- ✅ JWT tokens managed by Amplify
- ✅ Tokens auto-refreshed
- ✅ Protected routes for authenticated content
- ✅ CORS configured on API Gateway

### **Epic Integration Security:**
- ✅ PKCE prevents code interception
- ✅ State parameter prevents CSRF
- ✅ Tokens stored backend-only (DynamoDB)
- ✅ sessionStorage used (cleared after OAuth)
- ✅ Epic credentials in backend environment vars

---

## 🚀 Deployment Process (Based on Your Setup)

### **Current Deployment:**
Your API base URL suggests you're using AWS API Gateway directly (not Amplify Hosting yet).

### **For Epic Integration:**

**Option 1: Local Testing First (Recommended)**
```bash
# Start Amplify sandbox (if using Gen 2)
npx ampx sandbox

# Or deploy backend only
amplify push
```

**Option 2: Full Deployment**
```bash
# Deploy to Amplify
git push origin main
# Amplify pipeline will auto-deploy
```

**Update Redirect URI:**
- After deploy, get production URL
- Update in Epic sandbox settings
- Update `EPIC_REDIRECT_URI` environment variable

---

## ✅ Pre-Implementation Checklist (Updated)

Based on project analysis:

- [x] React Router configured ✅ (using createBrowserRouter)
- [x] Can access Amplify backend ✅ (API Gateway working)
- [x] Authentication working ✅ (Cognito + useAuthenticator)
- [x] API patterns established ✅ (config/api.ts + hooks)
- [x] DynamoDB access ✅ (finance tables working)
- [x] Epic sandbox accessible ⏳ (you have Client ID)
- [x] Redirect URI registered ⏳ (confirm in Epic sandbox)

---

## 🎯 Key Decisions Made

1. **Routing:** Add to existing router in `main.tsx` ✅
2. **User Auth:** Extract from JWT using `fetchAuthSession()` ✅
3. **API Path:** `/api/epic/callback` (follows finance pattern) ✅
4. **Error UI:** Full-page with auto-redirect ✅
5. **Success Redirect:** `/healthcare/dashboard` ✅
6. **Staging URL:** Configure when deploying ⏳

---

## 📝 Next Steps

### **Ready to Start Coding When:**
1. ✅ Project structure analyzed
2. ✅ All questions answered
3. ✅ Integration patterns identified
4. ⏳ You confirm Epic sandbox is accessible
5. ⏳ You confirm redirect URI is registered

### **First Task (Day 1):**
Create configuration files following your existing patterns:
1. `src/config/epic-config.ts`
2. Update `src/config/api.ts`
3. Create DynamoDB table schemas

---

## 🤔 Questions for You

### **Before We Start:**

1. **Epic Sandbox Access:**
   - Can you log into https://fhir.epic.com/Developer right now?
   - Is the redirect URI `http://localhost:3000/auth/epic/callback` registered?
   - Do you have test patient credentials?

2. **Healthcare Page:**
   - Should we add ConnectEpicButton to existing `SagaaHealthCarePage.tsx`?
   - Or create a new dedicated connection page?

3. **Lambda Backend:**
   - Do you currently have any Amplify Gen 2 Lambda functions deployed?
   - Or are your lambdas deployed separately (e.g., SAM, manual)?

4. **Amplify Sandbox:**
   - Have you used `npx ampx sandbox` before?
   - Or do you prefer direct `amplify push` deployments?

---

## 💬 Your Confirmation Needed

Please confirm:
- [ ] All analysis above looks correct
- [ ] Routing approach makes sense
- [ ] API endpoint pattern works
- [ ] Ready to proceed with Day 1 tasks
- [ ] Any modifications needed to the plan

Once you confirm, I'll start creating the actual implementation files! 🚀
