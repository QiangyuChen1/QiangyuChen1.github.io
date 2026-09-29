import type { ReactNode } from "react";
import type { TimelineEntry } from "@/content/types";
import { DateRangeText } from "@/components/ui/DateRangeText";
import { Mark } from "@/components/ui/Mark";
import { Reveal } from "@/components/ui/Reveal";
import { byRecency } from "@/lib/format";

function byNewest(entries: TimelineEntry[]) {
  return entries.slice().sort((a, b) => byRecency(a.dates, b.dates));
}

/** Logo, text, and the date column. On a phone the date sits above the logo. */
function RecordRow({ logo, main, side }: { logo: ReactNode; main: ReactNode; side: ReactNode }) {
  return (
    <div className="grid grid-cols-1 items-center gap-y-2 border-b border-line py-4 lg:grid-cols-[12.5rem_minmax(0,1fr)_auto] lg:gap-x-7 lg:py-5">
      <div className="text-caption flex flex-wrap gap-x-3 text-muted lg:col-start-3 lg:row-start-1 lg:flex-col lg:items-end lg:gap-y-1 lg:text-right">
        {side}
      </div>
      <div className="flex h-12 items-center lg:col-start-1 lg:row-start-1 lg:h-16 lg:justify-center">{logo}</div>
      <div className="min-w-0 lg:col-start-2 lg:row-start-1">{main}</div>
    </div>
  );
}

function OrgMark({ entry }: { entry: TimelineEntry }) {
  if (!entry.mark) return null;
  return <Mark media={entry.mark} decorative className="h-10 max-w-[9.5rem] lg:h-12 lg:max-w-[11rem]" />;
}

/** Work history: mark, organization, role, and the date on the right. */
export function ExperienceList({ entries }: { entries: TimelineEntry[] }) {
  const items = byNewest(entries);
  return (
    <ol className="border-t border-line">
      {items.map((entry, index) => (
        <Reveal as="li" key={entry.id} index={index}>
          <RecordRow
            logo={<OrgMark entry={entry} />}
            side={<DateRangeText range={entry.dates} />}
            main={
              <>
                <h3 className="text-h4 text-ink">{entry.org}</h3>
                <p className="text-body-sm mt-1 text-secondary">{entry.title}</p>
                <p className="text-body-sm mt-2 max-w-[62ch] text-muted">{entry.oneLiner}</p>
                {entry.outcome && <p className="text-mono-sm mt-2 text-ink">→ {entry.outcome}</p>}
              </>
            }
          />
        </Reveal>
      ))}
    </ol>
  );
}

/** Education rows: mark, school, degree, then the years and city on the right. */
export function EducationList({ entries }: { entries: TimelineEntry[] }) {
  const items = byNewest(entries);
  return (
    <ol className="border-t border-line">
      {items.map((entry, index) => {
        const href = entry.mark?.href;
        return (
          <Reveal as="li" key={entry.id} index={index}>
            <RecordRow
              logo={<OrgMark entry={entry} />}
              side={
                <>
                  <DateRangeText range={entry.dates} />
                  {entry.place && <p>{entry.place}</p>}
                </>
              }
              main={
                <>
                  <h3 className="text-h4 text-ink">
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-accent">
                        {entry.org}
                      </a>
                    ) : (
                      entry.org
                    )}
                  </h3>
                  <p className="text-body-sm mt-1 text-secondary">{entry.title}</p>
                  <p className="text-body-sm mt-1 max-w-[62ch] text-muted">{entry.oneLiner}</p>
                  {entry.outcome && <p className="text-mono-sm mt-2 text-ink">→ {entry.outcome}</p>}
                </>
              }
            />
          </Reveal>
        );
      })}
    </ol>
  );
}
