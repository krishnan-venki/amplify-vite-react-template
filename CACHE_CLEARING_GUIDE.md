# Cache Clearing Guide

## Overview
When debugging insights data mismatches, clearing caches is often the first step to ensure you're seeing fresh data from the backend.

**Note:** The UI buttons have been removed to keep the interface clean, but powerful debugging utilities remain available via the browser console.

## What Gets Cached?

1. **React Query Cache** - Insights data cached in memory by React Query
2. **localStorage** - Persistent browser storage (survives page reloads)
3. **sessionStorage** - Session-based browser storage (cleared on browser close)
4. **Service Worker Cache** - If your app uses service workers

## Methods to Clear Cache

### Method 1: Browser Console (Recommended for Debugging)

Open the browser console (F12) and run:

```javascript
// Clear everything and reload
clearAllCaches();
window.location.reload();
```

This function is available globally in development mode and will:
- Clear localStorage
- Clear sessionStorage
- Clear service worker caches
- Log what was cleared

### Method 2: Manual Browser Cache Clear

**Chrome:**
1. Press `Ctrl + Shift + Delete` (Windows) or `Cmd + Shift + Delete` (Mac)
2. Select "Cached images and files"
3. Click "Clear data"
4. Or just do a hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)

**Firefox:**
1. Press `Ctrl + Shift + Delete` (Windows) or `Cmd + Shift + Delete` (Mac)
2. Select "Cache"
3. Click "Clear Now"

### Method 3: Browser DevTools

**Using Application Tab (Chrome):**
1. Open DevTools (F12)
2. Go to "Application" tab
3. In the left sidebar:
   - Click "Local Storage" → Select your domain → Click "Clear All"
   - Click "Session Storage" → Select your domain → Click "Clear All"
   - Click "Cache Storage" → Right-click each cache → "Delete"

## When to Clear Cache

Clear the cache when:

- ✅ Insights show old titles/descriptions that don't match your backend
- ✅ You've updated your Lambda function but changes aren't reflected
- ✅ You've manually updated DynamoDB items
- ✅ API returns correct data in the console but UI shows old data
- ✅ After making backend schema changes
- ✅ When testing new features

## What Happens After Clearing?

1. All cached insights data is removed
2. Page reloads automatically
3. Fresh API call is made to fetch latest insights
4. New data is displayed on the page
5. React Query caches the new data for subsequent visits

## Debugging After Cache Clear

After clearing the cache, check the browser console for:

```
🔍 Insights API Debug
  Raw Response: {...}
  First Insight (from body.insights): {...}
    - title: "..."
    - summary: "..."
    - generated_at: "..."
```

This will show you:
- The actual data structure from your API
- The title and summary values
- When the insights were generated

## Still Seeing Old Data?

If you still see old data after clearing the cache, the issue is in your backend:

1. **Check DynamoDB** - Verify the data in your table is actually updated
2. **Check Lambda** - Ensure the correct version is deployed
3. **Check API Gateway** - Verify it's pointing to the right Lambda version
4. **Check Lambda Environment Variables** - Ensure it's reading from the right table

See `DEBUG_INSIGHTS.md` for detailed backend debugging steps.

## Production vs Development

**Development:**
- Cache clearing button is visible in the UI
- `clearAllCaches()` is available on the window object
- Enhanced debug logging is active

**Production:**
- Cache clearing button is hidden
- Users can still clear cache via browser settings
- Debug logging is minimal

## Technical Details

### React Query Cache Configuration

The insights query uses these cache settings:

```typescript
staleTime: Infinity,      // Data never becomes stale
gcTime: Infinity,         // Data never garbage collected
refetchOnWindowFocus: false,
refetchOnMount: false,
refetchOnReconnect: false
```

This means insights are cached indefinitely until manually cleared or the app is restarted.

### Cache Key

Insights are cached under the key: `['insights']`

To manually invalidate in code:
```typescript
queryClient.invalidateQueries({ queryKey: ['insights'] });
queryClient.removeQueries({ queryKey: ['insights'] });
```

## Files Modified

- `src/utils/clearCache.ts` - Utility function to clear all caches
- `src/hooks/useInsights.ts` - Added `clearCache()` method to the hook
- `src/pages/Insights.tsx` - Added "Clear Cache" buttons to UI
