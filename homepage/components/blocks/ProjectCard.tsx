import Image from "next/image";
import type { MediaRef, Project } from "@/content/types";
import { Card } from "@/components/ui/Card";
import { Tag, TagList } from "@/components/ui/Tag";
import { ScopeBadge } from "@/components/ui/Badges";
import { LinkRow } from "@/components/ui/Links";
import { DateRangeText } from "@/components/ui/DateRangeText";
import { MediaFrame } from "@/components/ui/MediaFrame";

interface ProjectCardProps {
  project: Project;
  headingLevel?: 3 | 4;
}

/** Anatomy: fixed-ratio teaser | meta, title, context, one-sentence summary, outcome, ≤3 tags, links, award chips. */
export function ProjectCard({ project, headingLevel = 3 }: ProjectCardProps) {
  const Heading = headingLevel === 3 ? "h3" : "h4";
  const evidenced = project.status === "evidenced";
  const hasOutcome = evidenced && (project.highlight || project.outcome);
  const hasDate = Boolean(project.dates.start || project.dates.end || project.dates.inProgress);
  const awards = project.awards ?? [];

  return (
    <Card as="article" id={project.id} className="grid gap-6 md:grid-cols-12 md:items-center md:gap-8">
      {project.media && (
        <div className="md:col-span-5">
          <MediaFrame media={project.media} />
        </div>
      )}
      <div className={project.media ? "md:col-span-7" : "md:col-span-12"}>
        <p className="text-label flex flex-wrap gap-x-3 gap-y-1 text-muted">
          {hasDate && <DateRangeText range={project.dates} />}
          {hasDate && <span aria-hidden="true">·</span>}
          <span>{project.category}</span>
        </p>

        <Heading className="text-h4 mt-4 text-balance text-ink">{project.title}</Heading>
        <p className="text-mono-sm mt-2 text-muted">{project.context}</p>

        <p className="text-body-sm mt-5 max-w-[60ch] text-secondary">{project.summary}</p>

        {hasOutcome && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {project.highlight && <Tag tone="accent">{project.highlight}</Tag>}
            {project.outcome && <span className="text-body-sm font-medium text-ink">{project.outcome}</span>}
            <ScopeBadge scope={project.resultScope} />
          </div>
        )}

        <div className="pt-6">
          <TagList items={evidenced ? project.tools : []} label="Tools" />
          {(project.links.length > 0 || awards.length > 0) && (
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
              <LinkRow links={project.links} />
              {awards.length > 0 && (
                <ul className="flex flex-wrap gap-2" aria-label="Award certificates">
                  {awards.map((award) => (
                    <li key={award.src}>
                      <AwardLink award={award} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

/** Certificate as a thumbnail chip, same height as the link row, opening its own original (`href`) or full image. */
function AwardLink({ award }: { award: MediaRef }) {
  const href = award.href ?? award.src;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2.5 rounded-lg border border-line py-1 pr-3 pl-1 text-sm font-medium text-ink transition-colors duration-150 hover:border-line-strong hover:text-accent"
    >
      <Image src={award.src} alt={award.alt} width={award.width} height={award.height} className="h-8 w-auto rounded-[5px]" />
      {award.credit ?? "Certificate"}
      <span aria-hidden="true">↗</span>
    </a>
  );
}
