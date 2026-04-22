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
