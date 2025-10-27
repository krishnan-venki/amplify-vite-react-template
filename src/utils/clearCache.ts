/**
 * Utility to clear all caches and force fresh data fetch
 * Use this when debugging data mismatch issues
 */

export function clearAllCaches() {
  console.group('🧹 Clearing All Caches');
  
  // Clear localStorage
  try {
    const itemCount = localStorage.length;
    localStorage.clear();
    console.log('✅ Cleared localStorage:', itemCount, 'items removed');
  } catch (error) {
    console.error('❌ Error clearing localStorage:', error);
  }
  
  // Clear sessionStorage
  try {
    const itemCount = sessionStorage.length;
    sessionStorage.clear();
    console.log('✅ Cleared sessionStorage:', itemCount, 'items removed');
  } catch (error) {
    console.error('❌ Error clearing sessionStorage:', error);
  }
  
  // Clear service worker cache (if any)
  if ('caches' in window) {
    caches.keys().then(names => {
      names.forEach(name => {
        caches.delete(name);
      });
      console.log('✅ Cleared service worker caches:', names.length, 'caches removed');
    });
  }
  
  console.log('✅ All caches cleared! Reload the page to fetch fresh data.');
  console.groupEnd();
  
  // Return true to indicate success
  return true;
}

// Add to window for easy console access
if (typeof window !== 'undefined') {
  (window as any).clearAllCaches = clearAllCaches;
}
