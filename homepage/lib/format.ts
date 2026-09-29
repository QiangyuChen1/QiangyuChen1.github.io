import type { DateRange } from "@/content/types";

export function formatDateRange(range: DateRange): string {
  if (!range.start) return range.inProgress ? "In progress" : "";
  if (range.inProgress || range.end === "present") return `${range.start} – present`;
  if (!range.end || range.end === range.start) return range.start;
  return `${range.start} – ${range.end}`;
}

export const isOngoing = (range: DateRange) => Boolean(range.inProgress || range.end === "present");

/** Newest first: ongoing entries lead, then by end date, then by start date. YearMonth strings sort lexically. */
export function byRecency(a: DateRange, b: DateRange): number {
  const key = (r: DateRange) => [isOngoing(r) ? "9999.99" : (r.end ?? r.start ?? ""), r.start ?? ""];
  const [ae, as] = key(a);
  const [be, bs] = key(b);
  return be.localeCompare(ae) || bs.localeCompare(as);
}

/** Machine-readable value for <time dateTime>, e.g. "2024.09" → "2024-09". */
export function toDateTime(ym?: string): string | undefined {
  return ym?.replace(".", "-");
}
