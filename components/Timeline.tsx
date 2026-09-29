import type { TimelineEntry } from "@/content/types";
import { DateRangeText } from "./ui/DateRangeText";
import { Reveal } from "./ui/Reveal";
import { cn } from "@/lib/cn";

interface TimelineProps {
  entries: TimelineEntry[];
  groupBy?: "kind";
}

const GROUP_LABEL: Record<TimelineEntry["kind"], string> = { role: "Roles", education: "Education" };

export function Timeline({ entries, groupBy = "kind" }: TimelineProps) {
  const ordered =
    groupBy === "kind"
      ? (["role", "education"] as const).flatMap((k) => entries.filter((e) => e.kind === k))
      : entries;
  const indexOf = new Map(ordered.map((e, i) => [e.id, i]));
  const groups =
    groupBy === "kind"
      ? (["role", "education"] as const).map((k) => ({ kind: k, items: ordered.filter((e) => e.kind === k) }))
      : [{ kind: "role" as const, items: ordered }];

  return (
    <ol className="relative">
      {groups.map((group) =>
        group.items.length === 0 ? null : (
          <li key={group.kind}>
            <div className="grid grid-cols-4 gap-x-4 sm:grid-cols-8 sm:gap-x-5 lg:grid-cols-12 lg:gap-x-6">
              <p className="text-label col-span-4 py-4 text-muted sm:col-span-8 lg:col-span-9 lg:col-start-4 lg:pl-8">
                {GROUP_LABEL[group.kind]}
              </p>
            </div>
            <ol>
              {group.items.map((entry) => {
                const i = indexOf.get(entry.id) ?? 0;
                return (
                  <Reveal as="li" key={entry.id} index={i}>
                    <TimelineItem entry={entry} current={i === 0} />
                  </Reveal>
                );
              })}
            </ol>
          </li>
        ),
      )}
    </ol>
  );
}

function TimelineItem({ entry, current }: { entry: TimelineEntry; current: boolean }) {
  return (
    <div className="grid grid-cols-4 gap-x-4 sm:grid-cols-8 sm:gap-x-5 lg:grid-cols-12 lg:gap-x-6">
      <p className="text-label hidden pt-1 text-muted lg:col-span-3 lg:block lg:text-right">
        <DateRangeText range={entry.dates} />
      </p>
      <div className="relative col-span-4 ml-5 border-l border-line-strong pb-10 pl-6 sm:col-span-8 lg:col-span-7 lg:ml-0 lg:pl-8">
        <span
          aria-hidden="true"
          className={cn(
            "absolute -left-[4.5px] top-1.5 size-2 rounded-full border",
            current ? "border-accent bg-accent" : "border-ink bg-subtle",
          )}
        />
        <p className="text-label mb-2 text-muted lg:hidden">
          <DateRangeText range={entry.dates} />
        </p>
        <h4 className="text-h4 text-ink">{entry.org}</h4>
        <p className="text-body-sm mt-1 text-muted">{entry.title}</p>
        <p className="text-body-sm mt-3 flex max-w-[60ch] gap-3 text-secondary">
          <span aria-hidden="true" className="w-3 shrink-0 text-muted">
            –
          </span>
          <span>{entry.oneLiner}</span>
        </p>
        {entry.outcome && <p className="text-mono-sm mt-2 text-ink">→ {entry.outcome}</p>}
      </div>
    </div>
  );
}
