import type { DateRange } from "@/content/types";

export function formatDateRange(range: DateRange): string {
  if (!range.start) return range.inProgress ? "In progress" : "";
  if (range.inProgress || range.end === "present") return `${range.start} – present`;
  if (!range.end || range.end === range.start) return range.start;
  return `${range.start} – ${range.end}`;
}

/** Machine-readable value for <time dateTime>, e.g. "2024.09" → "2024-09". */
export function toDateTime(ym?: string): string | undefined {
  return ym?.replace(".", "-");
}
