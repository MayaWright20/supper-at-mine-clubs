/**
 * Format a time to a short readable string.
 * Example: "14:30"
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit"
  });
}
