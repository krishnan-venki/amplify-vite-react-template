# Epic Integration - Final Configuration Summary

## ✅ Confirmed Information

### **Epic Sandbox Credentials**
- **Client ID:** `fca52c91-c927-4a4e-a048-66a825d7259f`
- **Redirect URI:** `http://localhost:3000/auth/epic/callback` ✅ REGISTERED
- **FHIR Base URL:** `https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4`

### **Test Patient Information**
- **FHIR ID:** `eq081-VQEgP8drUUqCWzHfw3`
- **External ID:** `Z6127`
- **MRN:** `203711`
- **MyChart Username:** `fhirderrick`
- **MyChart Password:** `epicepic1`

### **Backend Architecture**
- Lambdas deployed **separately** (not via Amplify Gen 2)
- Continue using standalone Lambda deployment
- Lambda URL will be added to `API_ENDPOINTS` in frontend

### **Frontend Architecture Decision**
- `SagaaHealthCarePage.tsx` = Marketing page (public)
- Need to create **NEW** `HealthDashboard.tsx` for logged-in users
- Pattern: Similar to `FinanceDashboard.tsx` (already exists)

---

## 🎯 Updated Implementation Plan

### **Page Structure:**

```
/healthcare                    → SagaaHealthCarePage (marketing, public)
/healthcare/dashboard          → HealthDashboard (logged-in users) ✨ NEW
/auth/epic/callback           → EpicOAuthCallback (OAuth handler) ✨ NEW
```

### **Component Hierarchy:**

```
HealthDashboard (NEW PAGE)
├── Connection Status Section
│   └── ConnectEpicButton (if not connected)
│   └── Connection Info (if connected)
├── Patient Information Section
│   └── Display FHIR patient data
└── Health Records Preview Section
    └── Quick view of available records
```

---

## 📋 Updated Task List

### **Day 1-2: Configuration & New Dashboard Page**

1. ✅ Create `src/config/epic-config.ts`
2. ✅ Update `src/config/api.ts` (add Epic endpoints)
3. ✅ Create `src/utils/pkce-helpers.ts`
4. ✅ Create **`src/pages/HealthDashboard.tsx`** ⭐ NEW
5. ✅ Update `main.tsx` router with:
   - `/healthcare/dashboard` → ProtectedRoute with HealthDashboard
   - `/auth/epic/callback` → EpicOAuthCallback
6. ✅ Update `App.tsx` sidebar - ensure Healthcare nav points to `/healthcare/dashboard`

### **Day 3-4: OAuth Components**

1. ✅ Create `ConnectEpicButton.tsx`
2. ✅ Create `EpicOAuthCallback.tsx`
3. ✅ Integrate ConnectEpicButton into HealthDashboard
4. ✅ Test PKCE generation locally

### **Day 5-7: Backend Lambda & Integration**

1. ✅ Create Lambda function (separate deployment)
2. ✅ Deploy Lambda to AWS
3. ✅ Get Lambda function URL / API Gateway endpoint
4. ✅ Update `src/config/api.ts` with Lambda endpoint
5. ✅ Test end-to-end OAuth flow
6. ✅ Create data fetching hooks (`useEpicPatient.ts`)

---

## 🚀 Ready to Start - Confirm Final Details

### **Quick Confirmation:**

**For the new HealthDashboard page:**

1. **Should it be accessible from:**
   - ✅ Sidebar "Healthcare" link (update from marketing page)?
   - ✅ Dashboard card click?
   - ✅ Direct navigation to `/healthcare/dashboard`?

2. **Initial state (before Epic connection):**
   - Show "Connect Epic MyChart" button prominently?
   - Show placeholder content?
   - Show benefits of connecting?

3. **After Epic connection:**
   - Display patient demographics (name, DOB, MRN)?
   - Show "Connected" status badge?
   - Option to disconnect/re-sync?

### **Sidebar Navigation:**

Currently in `App.tsx`:
```typescript
<NavLink to="/healthcare/dashboard" title={navCollapsed ? 'Healthcare' : ''}>
  <svg className="nav-icon healthcare-icon" ...>
  {!navCollapsed && <span>Healthcare</span>}
</NavLink>
```

**This will now point to the NEW HealthDashboard (protected route).** ✅ Is this correct?

---

## 💡 My Recommendation

### **HealthDashboard Initial Design:**

```
┌─────────────────────────────────────────────────────────────┐
│  Healthcare Dashboard                                        │
│  ─────────────────────────────────────────────────────────  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  📱 Epic MyChart Connection                           │  │
│  │                                                        │  │
│  │  [ Not Connected ]                                    │  │
│  │                                                        │  │
│  │  Connect your Epic MyChart to:                        │  │
│  │  ✓ View your medical records                          │  │
│  │  ✓ Track medications and appointments                 │  │
│  │  ✓ Get health-aware financial insights                │  │
│  │                                                        │  │
│  │  [Connect Epic MyChart]  ← Big prominent button       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Coming Soon                                          │  │
│  │  • Medication reminders                               │  │
│  │  • Appointment scheduling                             │  │
│  │  • Lab result tracking                                │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**After Connection:**
```
┌─────────────────────────────────────────────────────────────┐
│  Healthcare Dashboard                                        │
│  ─────────────────────────────────────────────────────────  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  ✅ Connected to Epic MyChart                         │  │
│  │  Last synced: 2 minutes ago                           │  │
│  │  [Re-sync] [Disconnect]                               │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  👤 Patient Information                               │  │
│  │  Name: Derrick Lin                                    │  │
│  │  DOB: [from FHIR]                                     │  │
│  │  MRN: 203711                                          │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  [More sections as we add FHIR resources in Phase 2]       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## ❓ Final Questions Before Starting

1. **HealthDashboard Design:**
   - Does the layout above look good?
   - Any specific design preferences?
   - Should match your Finance Dashboard style?

2. **Lambda Deployment:**
   - Once I provide Lambda code, you'll deploy it separately
   - Then give me the endpoint URL to add to `API_ENDPOINTS`
   - Correct process? ✅

3. **Epic Test Login:**
   - Username: `fhirderrick`
   - Password: `epicepic1`
   - These work in Epic sandbox? ✅

4. **Demo User Mapping:**
   - Frontend shows your demo user's name
   - Backend uses `eq081-VQEgP8drUUqCWzHfw3` for FHIR calls
   - We'll handle this mapping in Lambda ✅

---

## 🎯 What I'll Create First (Day 1)

Once you give the go-ahead:

1. **`src/pages/HealthDashboard.tsx`** - New dashboard page
2. **`src/config/epic-config.ts`** - Epic credentials
3. **Update `src/config/api.ts`** - Add Epic endpoints (placeholder URLs)
4. **`src/utils/pkce-helpers.ts`** - PKCE utilities
5. **Update `main.tsx`** - Add routes

**Sound good? Ready to start?** 🚀

---

**Please confirm:**
- [ ] HealthDashboard design approach is good
- [ ] Sidebar "Healthcare" should go to `/healthcare/dashboard`
- [ ] Lambda deployment process is clear
- [ ] Epic test credentials are correct
- [ ] Ready for me to create the first files

**Just say "Let's start" and I'll begin with Day 1 tasks!** 💪
