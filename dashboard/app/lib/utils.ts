export function formatTimestamp(timestamp: number | string): string {
  const ts =
    typeof timestamp === "string" ? parseInt(timestamp, 10) : timestamp;
  const date = new Date(ts);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  return `${day}${suffix} ${month}, ${year}`;
}

export function shortenTxnHash(hash: string): string {
  if (!hash) return "";
  if (hash.length <= 10) return hash; // If it's already short enough
  return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
}
