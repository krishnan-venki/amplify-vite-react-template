# Life Essentials Dashboard - Quick Test Guide

## 🧪 How to Test the New Feature

### **Step 1: Access the Dashboard**

1. **Start the app**: The app should already be running
2. **Log in** to your account
3. **Click "Life Essentials"** in the left sidebar
4. You should be navigated to `/life/dashboard`

---

### **Step 2: Test Empty State (No Assets)**

If you don't have any assets yet, you should see:
- 🏠 Large house icon in orange background
- "Start Tracking Your Assets" headline
- Description text
- **"+ Add Your First Asset"** button (orange)
- 4 quick-add buttons (Water Heater, Vehicle, HVAC, Refrigerator)

**Action**: Click any button to open the Add Asset modal

---

### **Step 3: Test Add Asset Modal**

When the modal opens, you should see:
- "Add New Asset" header
- Form fields:
  - ✅ **Asset Type** (dropdown) - Required
  - ✅ **Asset Name** (text) - Required
  - ✅ **Category** (dropdown) - Required
  - Manufacturer (text)
  - Model (text)
  - ✅ **Purchase Date** (date picker) - Required
  - Purchase Price (number)
  - Expected Lifespan (number) - Auto-populated based on type

**Test Cases**:
1. Try submitting without filling required fields → Should prevent submission
2. Change asset type → Expected lifespan should auto-update
3. Fill all fields and click "Add Asset →"

⚠️ **Note**: In MVP, this won't actually save to backend yet. It's a placeholder for Phase 2.

---

### **Step 4: Test Assets View (If You Have Data)**

If the backend returns assets, you should see:

**Overview Cards** (top section):
- 📊 Total Assets: Shows count
- ⚠️ High Risk: Red highlight if >0
- 🔧 Due Soon: Yellow highlight if >0
- 💰 Est. Replacement: Shows total cost

**Filters** (below cards):
- Dropdown: All Types / Appliance / Vehicle / etc.
- Dropdown: All Risk Levels / High Risk Only / Due for Maintenance
- Dropdown: All Conditions / Excellent / Good / Fair / Poor / Critical

**Assets Table** (desktop, >1024px):
- Columns: Asset Name, Type, Age/Lifespan, Condition, Risk, Next Action, Est. Cost
- Click column header → Should sort
- Each row shows risk badge (🔴 🟡 🟢)
- Click row → Opens detail panel

**Assets Cards** (mobile, <1024px):
- Card grid layout
- Each card shows: Name, Type, Age, Condition, Risk, Next Action, Cost
- Tap card → Opens detail panel

---

### **Step 5: Test Asset Detail Panel**

Click any asset row/card. A panel should slide in from the right showing:

**Header**:
- ← Back button
- Asset name as title
- Risk score banner (colored based on risk level)

**4 Tabs**:

**1. Overview Tab** (default):
- 📋 Basic Info (manufacturer, model, purchase date, price, lifespan, warranty)
- 📊 Lifecycle Status (progress bar showing % of life used)
- 💡 AI Recommendation (if evaluation exists)

**2. Maintenance Tab**:
- 📅 Maintenance History (list of past services)
- ⏰ Next Maintenance Due (if scheduled)
- Shows "No maintenance records yet" if empty

**3. Evaluation Tab** (if AI evaluation exists):
- 🤖 Latest AI Evaluation
- 📊 Condition Assessment (current condition, key factors)
- 🎯 Recommendations (prioritized action items)

**4. Insights Tab**:
- Shows "Coming Soon" placeholder for now

**Actions**:
- Click "← Back" → Panel should close
- Click different tabs → Content should change
- Click outside panel → Panel should close

---

### **Step 6: Test Capability Tabs**

At the top of the dashboard, you should see 4 tabs:
1. **🏡 Property & Assets** - Active (orange background)
2. **🛒 Household Ops** - Disabled (gray, says "SOON")
3. **👨‍👩‍👧‍👦 Family & Life** - Disabled (gray, says "SOON")
4. **🔒 Docs & Prep** - Disabled (gray, says "SOON")

**Actions**:
- Click active tab → Nothing happens (already active)
- Hover over active tab → Should not change (already selected)
- Hover over inactive tabs → No interaction (not yet implemented)
- Clicking inactive tabs shows "Coming Soon" modal (if implemented)

---

### **Step 7: Test Responsive Design**

**Desktop (>1024px)**:
- ✅ Full table view
- ✅ Detail panel slides in from right (max 600px width)
- ✅ All filters visible

**Tablet/Mobile (<1024px)**:
- ✅ Card list replaces table
- ✅ Detail panel becomes full-screen
- ✅ Tabs scroll horizontally
- ✅ Smaller padding/font sizes

**Test**: Resize browser window to see layout changes

---

### **Step 8: Test Error States**

**If API fails**:
- Should show error icon ⚠️
- Error message: "Error Loading Assets"
- "Try Again" button
- Clicking button should retry API call

**If loading**:
- Should show spinner 🔄
- "Loading assets..." message

---

### **Step 9: Test Filters & Sorting**

**Filters**:
1. Change "Asset Type" → Only matching assets show
2. Change "Risk Level" to "High Risk Only" → Only high-risk assets show
3. Change "Condition" → Only matching condition shows
4. If no matches → "No assets found matching the selected filters"

**Sorting**:
1. Click "Asset Name" column → Sorts alphabetically
2. Click "Risk" column → Sorts by risk score (highest first by default)
3. Click "Age/Lifespan" column → Sorts by age percentage
4. Click "Est. Cost" column → Sorts by replacement cost
5. Click same column again → Reverses sort direction (↑ ↓)

---

### **Step 10: Test Marketing Page**

**When NOT logged in**:
1. Navigate to `/life-essentials` or `/sagaa-life-essentials`
2. Should see marketing page with:
   - Hero section
   - 4 capability descriptions
   - "Ask Sagaa" section
   - Detailed features

**When logged in**:
- Side nav "Life Essentials" → Goes to `/life/dashboard` (functional page)
- Direct URL `/life-essentials` → Still shows marketing page

---

## 🐛 Known Issues to Watch For

1. **Add Asset doesn't persist** - This is expected in MVP (no POST endpoint yet)
2. **Insights tab is empty** - Placeholder for Phase 2
3. **Quick actions are placeholders** - "Get Quotes", "Schedule Service" don't do anything yet
4. **No asset images** - Not supported in MVP
5. **Can't edit/delete assets** - Not implemented yet

---

## ✅ Success Criteria

The implementation is working correctly if:
- ✅ Navigation from sidebar works
- ✅ Empty state shows when no assets
- ✅ Assets load from API
- ✅ Summary cards display correct counts
- ✅ Table/cards show assets with correct data
- ✅ Filters and sorting work
- ✅ Detail panel opens with all tabs functional
- ✅ Add Asset modal opens and validates
- ✅ Responsive design works on mobile
- ✅ No console errors
- ✅ Marketing page still accessible

---

## 🆘 Troubleshooting

**Problem**: Dashboard shows "Error Loading Assets"  
**Solution**: Check that `/assets` API endpoint is configured and returns correct data structure

**Problem**: Empty state shows but I have assets  
**Solution**: Check browser console for API errors. Verify authentication token is valid.

**Problem**: Detail panel doesn't open  
**Solution**: Check browser console for errors. Verify `onClick` handler is attached to rows/cards.

**Problem**: Filters don't work  
**Solution**: Check that assets have the expected fields (assetType, llmEvaluation, etc.)

**Problem**: Mobile view not showing  
**Solution**: Resize browser to <1024px width. Check responsive CSS.

---

## 📊 What to Look For

### **Visual Quality**
- ✅ Consistent spacing and alignment
- ✅ Color-coded risk badges (red, yellow, green)
- ✅ Smooth animations (panel slide-in, hover effects)
- ✅ Readable typography at all sizes
- ✅ Icons render correctly

### **Functionality**
- ✅ All buttons are clickable
- ✅ Forms validate inputs
- ✅ Data displays correctly
- ✅ Sorting changes order
- ✅ Filters reduce results

### **Performance**
- ✅ Page loads quickly
- ✅ No lag when filtering/sorting
- ✅ Smooth scrolling
- ✅ Panel animations are smooth

---

## 📞 Report Issues

If you find bugs or unexpected behavior:
1. Note the exact steps to reproduce
2. Check browser console for errors
3. Take screenshots if applicable
4. Note your screen size / device
5. Share browser/OS information

---

**Happy Testing! 🚀**
