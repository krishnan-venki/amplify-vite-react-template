# Cache Clearing Implementation - Summary

## What We Did

Added comprehensive cache clearing functionality to help debug and resolve data mismatch issues with insights.

## Files Created

1. **`src/utils/clearCache.ts`**
   - Utility function to clear all browser caches (localStorage, sessionStorage, service worker caches)
   - Exposes `clearAllCaches()` to window object in development mode
   - Provides detailed console logging of what was cleared

2. **`CACHE_CLEARING_GUIDE.md`**
   - Comprehensive guide on how to use cache clearing features
   - Explains when and why to clear cache
   - Multiple methods provided (UI button, console, browser tools)

3. **`DEBUG_INSIGHTS.md`** (created earlier)
   - Step-by-step debugging guide for insights data mismatch
   - Covers frontend, API, Lambda, and DynamoDB debugging

## Files Modified

### 1. `src/hooks/useInsights.ts`
**Changes:**
- Added enhanced debug logging to show API response structure
- Logs first insight's title, summary, and generated_at timestamp
- Added `clearCache()` function to the hook return value
- Uses `useQueryClient` to invalidate React Query cache

**New Debug Output:**
```
🔍 Insights API Debug
  Raw Response: {...}
  First Insight (from body.insights): {...}
    - title: "..."
    - summary: "..."
    - generated_at: "..."
```

### 2. `src/pages/Insights.tsx`
**Changes:**
- Imported `Trash2` icon and `clearAllCaches` utility
- Added `clearCache` from useInsights hook
- Created `handleClearCache()` function
- Added "Clear Cache & Reload" button in hero section (development mode only)
- Added "Clear Cache" button in error state

**UI Changes:**
- **Hero Section**: Red "Clear Cache & Reload" button (only visible in dev mode)
- **Error State**: White "Clear Cache" button next to "Retry" button

## How to Use

### Option 1: UI Button (Easiest)

1. Open your app in development mode
2. Navigate to the Insights page
3. Click the **"Clear Cache & Reload"** button in the hero section
4. Confirm the action
5. Page will reload with fresh data

### Option 2: Console Command

Open browser console (F12) and run:
```javascript
clearAllCaches();
window.location.reload();
```

### Option 3: When Error Occurs

If insights fail to load:
1. Click the **"Clear Cache"** button in the error message
2. Confirm the action
3. Page will reload and retry

## What Gets Cleared

When you click "Clear Cache & Reload":

1. ✅ React Query cache (in-memory)
2. ✅ localStorage
3. ✅ sessionStorage  
4. ✅ Service worker caches (if any)
5. ✅ Page reloads automatically

## Expected Behavior

**Before clearing cache:**
- Insights show old/cached data
- API might return new data but UI shows old data
- Console shows cached data

**After clearing cache:**
- All cached data removed
- Page reloads
- Fresh API call made to backend
- New data displayed
- Console shows fresh API response with timestamps

## Next Steps

1. **Clear the cache** using any of the methods above
2. **Check the console** for the "🔍 Insights API Debug" section
3. **Verify the data:**
   - Look at the `title` field - does it match your backend?
   - Look at the `summary` field - does it match your backend?
   - Check `generated_at` timestamp - is it recent?

4. **If data still doesn't match:**
   - The issue is in your backend (Lambda or DynamoDB)
   - Follow the `DEBUG_INSIGHTS.md` guide to debug backend

## Development vs Production

**Development Mode:**
- Cache clearing button is visible
- Enhanced debug logging active
- `clearAllCaches()` available on window

**Production Mode:**
- Cache clearing button hidden
- Users can still clear via browser settings
- Minimal logging

## Testing

To test the cache clearing functionality:

1. Load the Insights page
2. Note the current insights titles
3. Click "Clear Cache & Reload"
4. Verify:
   - Console shows "🧹 Clearing All Caches"
   - Console shows items cleared
   - Page reloads
   - Fresh API call made
   - Console shows "🔍 Insights API Debug" with fresh data

## Troubleshooting

**Button not visible:**
- Make sure you're running in development mode
- Check `import.meta.env.DEV` is true

**Data still old after clearing:**
- Issue is in backend, not frontend
- Check Lambda CloudWatch logs
- Verify DynamoDB has updated data
- See `DEBUG_INSIGHTS.md` for backend debugging

**Console not showing debug logs:**
- Make sure browser console is open
- Refresh the page to trigger new API call
- Check console filter settings (should show all log levels)

## Related Documentation

- `DEBUG_INSIGHTS.md` - Full debugging guide for data mismatches
- `CACHE_CLEARING_GUIDE.md` - User guide for cache clearing
- `src/utils/clearCache.ts` - Source code for cache clearing utility
- `src/hooks/useInsights.ts` - Source code with debug logging
