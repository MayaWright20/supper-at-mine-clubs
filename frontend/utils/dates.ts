/**
 * Format a date to a short readable string.
 * Example: "Thu, 6 Mar 2026"
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

export function formatMemberSince(createdAt?: string, userId?: string) {
  const date = createdAt ? new Date(createdAt) : getDateFromObjectId(userId);

  if (!date || Number.isNaN(date.getTime())) {
    return "recently";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}

function getDateFromObjectId(userId?: string) {
  if (!userId || userId.length < 8) return null;

  const timestamp = parseInt(userId.substring(0, 8), 16) * 1000;
  return new Date(timestamp);
}
