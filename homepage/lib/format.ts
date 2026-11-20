import type { DateRange } from "@/content/types";

export function formatDateRange(range: DateRange): string {
  if (!range.start) {
    if (range.inProgress) return "In progress";
    return range.end && range.end !== "present" ? range.end : "";
  }
  if (range.inProgress || range.end === "present") return `${range.start} – present`;
  if (!range.end || range.end === range.start) return range.start;
  return `${range.start} – ${range.end}`;
}

export const isOngoing = (range: DateRange) => Boolean(range.inProgress || range.end === "present");

/**
 * Newest first. Ongoing entries lead, then a completed entry with no month,
 * then by end date. YearMonth strings sort lexically.
 */
export function byRecency(a: DateRange, b: DateRange): number {
  const key = (r: DateRange) => {
    const undated = !r.start && !r.end && !r.inProgress;
    return [isOngoing(r) ? "2" : undated ? "1" : "0", isOngoing(r) ? "9999.99" : (r.end ?? r.start ?? ""), r.start ?? ""];
  };
  const [ar, ae, as] = key(a);
  const [br, be, bs] = key(b);
  return br.localeCompare(ar) || be.localeCompare(ae) || bs.localeCompare(as);
}

/** Machine-readable value for <time dateTime>, e.g. "2024.09" → "2024-09". */
export function toDateTime(ym?: string): string | undefined {
  return ym?.replace(".", "-");
}
