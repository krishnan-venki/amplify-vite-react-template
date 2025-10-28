# Sagaa Life Essentials - Page Design Proposal

## Page Structure Overview

The Life Essentials page focuses on the **4 core capabilities** with emphasis on **Property & Asset Intelligence** as the MVP starting point.

---

## 1. PAGE HEADER

```
┌─────────────────────────────────────────────────────────────┐
│ 🏠 Life Essentials                                          │
│ Everything maintained, nothing forgotten                    │
│                                                             │
│ [Property & Assets] [Household Ops] [Family] [Documents]   │
│     (active tab)      (coming soon)  (coming soon) (...)   │
└─────────────────────────────────────────────────────────────┘
```

**Elements:**
- Page title with icon
- Tagline
- Tab navigation for 4 capabilities (only "Property & Assets" active for MVP)

---

## 2. ASSETS OVERVIEW DASHBOARD (Top Section)

```
┌─────────────────────────────────────────────────────────────┐
│ Assets Overview                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📊 5 Assets      ⚠️ 2 High Risk     🔧 1 Due Soon        │
│                                                             │
│  💰 Est. Replacement Needs: $7,200 (next 18 months)       │
│                                                             │
│  [+ Add New Asset]                                         │
└─────────────────────────────────────────────────────────────┘
```

**Metrics Cards:**
- Total assets count
- High-risk asset count (risk_score >75)
- Assets needing maintenance soon (<30 days)
- Estimated replacement costs (aggregated from evaluations)
- CTA to add new asset

---

## 3. ASSETS TABLE (Main Content)

### Table Columns:

| Asset Name | Type | Age/Lifespan | Condition | Risk | Next Action | Cost |
|------------|------|--------------|-----------|------|-------------|------|
| Water Heater | HVAC | 11y / 12y (92%) | ⚠️ Fair | 🔴 85 | Replace in 3-6mo | $1,200 |
| 2018 Honda Civic | Vehicle | 6.4y / 15y (43%) | ✅ Good | 🟢 25 | Maintenance due Nov 20 | $89 |
| HVAC System | HVAC | 9y / 15y (60%) | ✅ Good | 🟡 45 | Filter change | $35 |
| Refrigerator | Appliance | 6y / 13y (46%) | ✅ Good | 🟢 20 | Monitor | - |
| Washing Machine | Appliance | 8y / 11y (73%) | 🟡 Fair | 🟡 55 | Inspection due | - |

### Table Features:

**1. Risk Color Coding:**
- 🔴 Red: Critical/High (score >75)
- 🟡 Yellow: Medium (score 50-75)
- 🟢 Green: Low (score <50)

**2. Sortable Columns:**
- By risk score (highest first by default)
- By age/lifespan percentage
- By next action date
- By estimated cost

**3. Filters:**
- Asset type dropdown (All, Appliance, Vehicle, HVAC, etc.)
- Risk level (All, High Risk Only, Due for Maintenance)
- Condition (All, Fair/Poor, Good, Excellent)

**4. Row Actions:**
- Click row → Opens asset detail panel
- Quick actions menu: "Add Maintenance", "Mark Replaced", "View History"

---

## 4. ASSET DETAIL PANEL (Slide-in from right)

```
┌─────────────────────────────────────────────────────────────┐
│ ← Back                          Water Heater           [⋮] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ┌─────────────────────────────────────────────────────┐   │
│ │  🎯 RISK SCORE: 85/100 (HIGH)                       │   │
│ │  Condition: Fair | 11 years old (92% of lifespan)  │   │
│ └─────────────────────────────────────────────────────┘   │
│                                                             │
│ [Overview] [Maintenance] [Evaluation] [Insights]           │
│ ───────────────────────────────────────────────────────   │
│                                                             │
│ OVERVIEW TAB:                                              │
│                                                             │
│ 📋 Basic Info                                              │
│ • Manufacturer: Rheem                                      │
│ • Model: Professional Classic Plus                         │
│ • Purchase Date: March 15, 2014                           │
│ • Purchase Price: $1,200                                  │
│ • Expected Lifespan: 12 years                             │
│ • Warranty: Expired                                        │
│                                                             │
│ 📊 Lifecycle Status                                        │
│ ▓▓▓▓▓▓▓▓▓▓▓░ 92% of expected life used                   │
│                                                             │
│ ⚠️ Key Factors                                             │
│ • Age approaching end of expected lifespan                 │
│ • Winter season increases failure risk 40%                 │
│ • Limited maintenance history                              │
│                                                             │
│ 💡 AI Recommendation                                       │
│ Replace within 3-6 months. Proactive replacement costs    │
│ $1,200 vs. emergency repair averaging $2,400.             │
│                                                             │
│ [Schedule Replacement]  [Get Quotes]                      │
└─────────────────────────────────────────────────────────────┘
```

### Detail Panel Tabs:

**1. Overview Tab** (shown above)
- Basic asset info
- Lifecycle progress bar
- Key risk factors
- AI recommendations with CTAs

**2. Maintenance Tab**
```
┌─────────────────────────────────────────────────────────────┐
│ 📅 Maintenance History                                      │
│                                                             │
│ ✓ June 10, 2023 - Annual flush and inspection              │
│   Provider: Seattle Plumbing Co                            │
│   Cost: $150                                               │
│   Notes: Some sediment buildup noted                       │
│                                                             │
│ [No earlier records]                                       │
│                                                             │
│ ⏰ Next Maintenance Due: June 10, 2024 (overdue)          │
│                                                             │
│ [+ Add Maintenance Record]                                │
└─────────────────────────────────────────────────────────────┘
```

**3. Evaluation Tab**
```
┌─────────────────────────────────────────────────────────────┐
│ 🤖 Latest AI Evaluation                                     │
│ Generated: October 27, 2025                                │
│                                                             │
│ Risk Score: 85/100 (HIGH)                                  │
│ Condition: Fair                                            │
│ Replacement Urgency: High                                  │
│ Est. Replacement Cost: $1,200                              │
│                                                             │
│ 📊 Condition Assessment                                    │
│ Current: Fair                                              │
│                                                             │
│ Key Factors:                                               │
│ • 11 years old (91.7% of expected 12-year lifespan)       │
│ • Winter season failure rate 40% higher                    │
│ • Maintenance interval exceeded                            │
│                                                             │
│ Failure Indicators:                                        │
│ • Age-based degradation expected                           │
│                                                             │
│ 🎯 Recommendations                                         │
│ 1. Schedule replacement quotes (Priority 1)               │
│    Why: Proactive replacement vs emergency repair          │
│    Cost: $1,200 | Timeframe: Next 3 months                │
│                                                             │
│ 2. Budget for replacement (Priority 2)                    │
│    Why: Avoid financial stress of emergency expense        │
│                                                             │
│ ⏱️ Optimal Replacement: Within 6 months                   │
│ ⚠️ Delay Consequence: 40% higher emergency repair costs   │
│ 🌡️ Seasonal: Avoid winter peak pricing                    │
└─────────────────────────────────────────────────────────────┘
```

**4. Insights Tab**
```
┌─────────────────────────────────────────────────────────────┐
│ 💡 Related Insights                                         │
│                                                             │
│ 2 cross-vertical insights reference this asset:           │
│                                                             │
│ ┌───────────────────────────────────────────────────┐     │
│ │ ⚠️ HIGH PRIORITY                                   │     │
│ │ Water Heater Replacement Planning                 │     │
│ │ Your emergency fund ($8,500) covers replacement  │     │
│ │ cost. Recommend proactive replacement this month.│     │
│ │                                                    │     │
│ │ [View Full Insight]                               │     │
│ └───────────────────────────────────────────────────┘     │
│                                                             │
│ ┌───────────────────────────────────────────────────┐     │
│ │ 💰 MEDIUM PRIORITY                                │     │
│ │ Multiple Assets Need Attention                    │     │
│ │ 3 appliances approaching end-of-life within       │     │
│ │ 18 months. Plan staged replacements.              │     │
│ │                                                    │     │
│ │ [View Full Insight]                               │     │
│ └───────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. ADD ASSET FLOW (Modal)

```
┌─────────────────────────────────────────────────────────────┐
│ Add New Asset                                          [×]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Asset Type *                                               │
│ [Dropdown: Appliance ▼]                                   │
│                                                             │
│ Asset Name *                                               │
│ [Text: Kitchen Refrigerator]                              │
│                                                             │
│ Category *                                                 │
│ [Dropdown: Appliance ▼]                                   │
│                                                             │
│ Manufacturer                                               │
│ [Text: Samsung]                                           │
│                                                             │
│ Model                                                      │
│ [Text: RF28R7351SR]                                       │
│                                                             │
│ Purchase Date *                                            │
│ [Date Picker: 08/01/2019]                                │
│                                                             │
│ Purchase Price                                             │
│ [Number: $1,800]                                          │
│                                                             │
│ Expected Lifespan (years)                                 │
│ [Number: 13] (auto-suggested based on type)              │
│                                                             │
│                              [Cancel]  [Add Asset →]      │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. EMPTY STATE (No Assets Yet)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    🏠                                       │
│                                                             │
│         Start Tracking Your Assets                         │
│                                                             │
│    Add your home appliances, vehicles, and equipment       │
│    to get AI-powered maintenance alerts and lifecycle      │
│    management.                                             │
│                                                             │
│              [+ Add Your First Asset]                      │
│                                                             │
│    Or try these quick adds:                                │
│    • Water Heater    • Vehicle    • HVAC System           │
└─────────────────────────────────────────────────────────────┘
```

---

## 7. MOBILE CONSIDERATIONS

**Responsive Adjustments:**
- Table becomes card list on mobile
- Each asset card shows: Name, Risk badge, Age percentage, Next action
- Tap card → Full-screen detail view
- Bottom nav for tabs instead of top tabs

---

## 8. KEY INTERACTIONS

**Primary Actions:**
1. **Add Asset** → Modal form
2. **View Asset** → Detail panel slides in
3. **Add Maintenance** → Quick form in maintenance tab
4. **View Insights** → Jump to Insights tab filtered by asset
5. **Get Quotes** → (Future) Connect to community marketplace

**Secondary Actions:**
- Export asset list (CSV/PDF)
- Archive replaced assets
- Bulk actions (mark multiple for maintenance)

---

## VISUAL DESIGN NOTES

**Color Scheme:**
- 🔴 Red (#EF4444): Critical/High risk
- 🟡 Yellow (#F59E0B): Medium risk  
- 🟢 Green (#10B981): Low risk
- 🔵 Blue (#3B82F6): Info/neutral

**Typography:**
- Asset names: 16px semibold
- Metrics: 14px regular
- Labels: 12px medium

**Spacing:**
- Card padding: 20px
- Table row height: 56px
- Section gaps: 24px

---

## IMPLEMENTATION PRIORITY

**Phase 1 (MVP):**
✅ Assets table with risk indicators
✅ Asset detail panel (Overview + Evaluation tabs)
✅ Add asset flow
✅ Basic filtering/sorting

**Phase 2:**
- Maintenance tab with history
- Insights tab with cross-vertical connections
- Quick actions (get quotes, schedule)

**Phase 3:**
- Advanced analytics dashboard
- Multi-asset replacement planning
- Integration with community marketplace

---

This design prioritizes **clarity and actionability** - users immediately see:
1. Which assets need attention (risk-based)
2. What to do about it (recommendations)
3. Financial impact (costs and emergency fund status)
4. Cross-vertical connections (related insights)
