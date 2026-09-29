import type { ResearchTopic, SectionCopy } from "@/content/types";
import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";
import { Reveal } from "./ui/Reveal";
import { Tag } from "./ui/Tag";
import { StatusBadge } from "./ui/Badges";
import { AnchorChip } from "./ui/Links";
import { Glyph } from "./Glyph";
import { cn } from "@/lib/cn";

interface ResearchSectionProps {
  copy: SectionCopy;
  topics: ResearchTopic[];
  titlesById: Record<string, string>;
}

export function ResearchSection({ copy, topics, titlesById }: ResearchSectionProps) {
  const sorted = [...topics].sort((a, b) => a.order - b.order);
  return (
    <Section id="research">
      <SectionHeader id="research" {...copy} />
      <ol className="border-b border-line">
        {sorted.map((topic, i) => (
          <ResearchTopicRow key={topic.id} topic={topic} index={i} titlesById={titlesById} />
        ))}
      </ol>
    </Section>
  );
}

function ResearchTopicRow({
  topic,
  index,
  titlesById,
}: {
  topic: ResearchTopic;
  index: number;
  titlesById: Record<string, string>;
}) {
  const direction = topic.status === "direction";
  const related = topic.relatedProjects.filter((id) => titlesById[id]).slice(0, 2);

  return (
    <Reveal as="li" index={index} className="border-t border-line">
      <div
        id={`topic-${topic.id}`}
        className="grid grid-cols-4 gap-x-4 gap-y-4 py-8 sm:grid-cols-8 sm:gap-x-5 lg:grid-cols-12 lg:gap-x-6"
      >
        <p className="text-label col-span-1 pt-1.5 text-muted lg:col-span-1">{String(index + 1).padStart(2, "0")}</p>

        <div className="col-span-3 sm:col-span-7 lg:col-span-4">
          <div className="flex items-start gap-3">
            <Glyph kind={topic.glyph} className="mt-1 shrink-0 text-secondary" size={20} />
            <h3 className={cn("text-h3 text-balance", direction ? "text-secondary" : "text-ink")}>{topic.title}</h3>
          </div>
          {direction && (
            <div className="mt-3 pl-8">
              <StatusBadge status={topic.status} />
            </div>
          )}
        </div>

        <div className="col-span-4 sm:col-span-7 sm:col-start-2 lg:col-span-4 lg:col-start-auto">
          <p className="text-body-sm max-w-[60ch] text-secondary">{topic.summary}</p>
          {topic.foundation && <p className="text-mono-sm mt-3 text-muted">{topic.foundation}</p>}
          {related.length > 0 && (
            <div className="mt-4">
              {topic.relationNote && <p className="text-caption mb-2 text-muted">{topic.relationNote}:</p>}
              <ul className="flex flex-wrap gap-2" aria-label={`Related work for ${topic.title}`}>
                {related.map((id) => (
                  <li key={id}>
                    <AnchorChip href={`#${id}`}>{titlesById[id]}</AnchorChip>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {!direction && topic.signals && topic.signals.length > 0 && (
          <ul
            className="col-span-4 flex min-w-0 flex-wrap gap-2 sm:col-span-7 sm:col-start-2 lg:col-span-3 lg:col-start-auto lg:flex-col lg:items-end"
            aria-label="Evidence"
          >
            {topic.signals.slice(0, 2).map((s) => (
              <li key={s} className="max-w-full">
                <Tag mono tone="strong" className="max-w-full">
                  {s}
                </Tag>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Reveal>
  );
}
