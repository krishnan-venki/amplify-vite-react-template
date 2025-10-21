// Utility functions for insights

/**
 * Format a date string to relative time (e.g., "2 hours ago", "3 days ago")
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffSeconds < 60) {
    return 'just now';
  } else if (diffMinutes < 60) {
    return `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  } else if (diffWeeks < 4) {
    return `${diffWeeks} ${diffWeeks === 1 ? 'week' : 'weeks'} ago`;
  } else {
    return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'} ago`;
  }
}

/**
 * Sort insights by priority (high > medium > low) and then by date (newest first)
 */
export function sortInsightsByPriority<T extends { priority: string; generated_at: string }>(
  insights: T[]
): T[] {
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  
  return [...insights].sort((a, b) => {
    // First sort by priority
    const priorityA = priorityOrder[a.priority as keyof typeof priorityOrder] || 0;
    const priorityB = priorityOrder[b.priority as keyof typeof priorityOrder] || 0;
    
    if (priorityA !== priorityB) {
      return priorityB - priorityA; // Higher priority first
    }
    
    // If same priority, sort by date (newest first)
    const dateA = new Date(a.generated_at).getTime();
    const dateB = new Date(b.generated_at).getTime();
    return dateB - dateA;
  });
}

/**
 * Get priority badge color
 */
export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'high':
      return '#ef4444';
    case 'medium':
      return '#f59e0b';
    case 'low':
      return '#6b7280';
    default:
      return '#6b7280';
  }
}
