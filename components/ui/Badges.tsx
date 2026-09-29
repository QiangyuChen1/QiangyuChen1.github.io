import type { Project, Status } from "@/content/types";
import { Tag } from "./Tag";

/** Visible "Direction" label. Renders nothing for evidenced items. */
export function StatusBadge({ status }: { status: Status }) {
  if (status !== "direction") return null;
  return <Tag tone="outline">Direction</Tag>;
}

export function ScopeBadge({ scope }: { scope?: Project["resultScope"] }) {
  if (!scope) return null;
  return <Tag tone="outline">{scope === "team" ? "Team result" : "Product outcome"}</Tag>;
}

export function VenueBadge({ venue, year }: { venue?: string; year: number }) {
  return (
    <p className="text-label flex gap-2 lg:flex-col lg:gap-1">
      {venue && <span className="text-ink">{venue}</span>}
      <span className="text-muted">{year}</span>
    </p>
  );
}
