import type { WorkDirection } from "@/content/types";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { AnchorChip } from "@/components/ui/Links";
import { MediaFrame } from "@/components/ui/MediaFrame";

interface DirectionCardProps {
  direction: WorkDirection;
  index: number;
  titlesById: Record<string, string>;
}

/** Anatomy: 4:3 figure + source | number, title, summary, ≤2 related project chips, ≤2 signals pinned to the foot. */
export function DirectionCard({ direction, index, titlesById }: DirectionCardProps) {
  const { media } = direction;
  const related = direction.relatedProjects.filter((id) => titlesById[id]).slice(0, 2);
  const signals = direction.signals?.slice(0, 2) ?? [];

  return (
    <Card
      as="article"
      id={`work-${direction.id}`}
      className="grid h-full gap-6 sm:grid-cols-2 sm:items-center lg:grid-cols-1 lg:grid-rows-[auto_1fr] lg:items-stretch"
    >
      <figure>
        <MediaFrame media={media} ratio="4 / 3" sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" />
        {media.credit && (
          <figcaption className="text-mono-sm mt-2.5 text-muted">
            {media.href ? (
              <a href={media.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
                {media.credit} <span aria-hidden="true">↗</span>
              </a>
            ) : (
              media.credit
            )}
          </figcaption>
        )}
      </figure>

      <div className="flex flex-col">
        <p className="text-label text-muted">{String(index + 1).padStart(2, "0")}</p>
        <h3 className="text-h4 mt-3 text-balance text-ink">{direction.title}</h3>
        <p className="text-body-sm mt-4 max-w-[60ch] text-secondary">{direction.summary}</p>

        {related.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Related work for ${direction.title}`}>
            {related.map((id) => (
              <li key={id}>
                <AnchorChip href={`#${id}`}>{titlesById[id]}</AnchorChip>
              </li>
            ))}
          </ul>
        )}

        {signals.length > 0 && (
          <ul className="mt-auto flex flex-wrap gap-2 pt-6" aria-label="Evidence">
            {signals.map((s) => (
              <li key={s}>
                <Tag mono tone="strong">
                  {s}
                </Tag>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}
