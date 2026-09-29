import type { Project } from "@/content/types";
import { Card } from "./ui/Card";
import { Tag, TagList } from "./ui/Tag";
import { ScopeBadge } from "./ui/Badges";
import { LinkRow } from "./ui/Links";
import { DateRangeText } from "./ui/DateRangeText";
import { MediaFigure } from "./ui/MediaFigure";
import { SimToRealDiagram } from "./SimToRealDiagram";
import { ProjectSchematic } from "./ProjectSchematic";
import { cn } from "@/lib/cn";

interface ProjectCardProps {
  project: Project;
  headingLevel?: 3 | 4;
}

/** Anatomy: drawing, meta, title, context, (question on feature), one-sentence summary, one outcome line, ≤3 tags. */
export function ProjectCard({ project, headingLevel = 3 }: ProjectCardProps) {
  const feature = project.size === "feature";
  const compact = project.size === "compact";
  const Heading = headingLevel === 3 ? "h3" : "h4";
  const evidenced = project.status === "evidenced";
  const hasOutcome = evidenced && (project.highlight || project.outcome);

  const body = (
    <div className="flex h-full flex-col">
      <p className="text-label flex flex-wrap gap-x-3 gap-y-1 text-muted">
        <DateRangeText range={project.dates} />
        <span aria-hidden="true">·</span>
        <span>{project.category}</span>
      </p>

      <Heading className={cn("mt-4 text-balance text-ink", compact ? "text-h4" : "text-h3")}>{project.title}</Heading>
      <p className="text-mono-sm mt-2 text-muted">{project.context}</p>

      {feature && (
        <p className="mt-6 border-l border-line-strong pl-4 text-secondary">
          <span className="text-xs font-medium text-muted">Question</span>
          <span className="text-body-sm mt-1 block">{project.researchQuestion}</span>
        </p>
      )}

      <p className="text-body-sm mt-5 max-w-[60ch] text-secondary">{project.summary}</p>

      {hasOutcome && (
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {project.highlight && <Tag tone="accent">{project.highlight}</Tag>}
          {project.outcome && <span className="text-body-sm font-medium text-ink">{project.outcome}</span>}
          <ScopeBadge scope={project.resultScope} />
        </div>
      )}

      <div className="mt-auto pt-6">
        <TagList items={evidenced ? project.tools : []} label="Tools" />
        <LinkRow links={project.links} className="mt-4" />
      </div>
    </div>
  );

  if (feature) {
    return (
      <Card as="article" id={project.id} className="grid gap-8 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-7">
          {project.media ? (
            <MediaFigure media={project.media} />
          ) : (
            <div className="aspect-[4/3] overflow-hidden rounded-xl bg-subtle p-4 sm:p-8">
              <SimToRealDiagram />
            </div>
          )}
        </div>
        <div className="lg:col-span-5 lg:pl-4">{body}</div>
      </Card>
    );
  }

  if (compact) {
    return (
      <Card as="article" id={project.id} className="grid gap-6 md:grid-cols-12 md:items-center">
        <ProjectSchematic kind={project.schematic} className="aspect-[16/9] md:col-span-4 md:aspect-[4/3]" />
        <div className="md:col-span-8 md:pl-2">{body}</div>
      </Card>
    );
  }

  return (
    <Card as="article" id={project.id} className="flex h-full flex-col gap-6">
      <ProjectSchematic kind={project.schematic} />
      <div className="flex-1">{body}</div>
    </Card>
  );
}
