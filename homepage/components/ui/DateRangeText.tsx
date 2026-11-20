import type { DateRange } from "@/content/types";
import { formatDateRange, toDateTime } from "@/lib/format";
import { cn } from "@/lib/cn";

export function DateRangeText({ range, className }: { range: DateRange; className?: string }) {
  const text = formatDateRange(range);
  if (!text) return null;
  return (
    <time dateTime={toDateTime(range.start ?? (range.end !== "present" ? range.end : undefined))} className={cn("tabular-nums", className)}>
      {text}
    </time>
  );
}
