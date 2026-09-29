import type { SectionCopy, WritingContent } from "@/content/types";
import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";
import { Reveal } from "./ui/Reveal";
import { Eyebrow } from "./ui/Eyebrow";
import { EmptyState } from "./ui/EmptyState";
import { PublicationCard } from "./PublicationCard";
import { PublicationList } from "./PublicationList";

interface WritingSectionProps {
  copy: SectionCopy;
  writing: WritingContent;
  /** Shown only when the byline differs from the public name. */
  publishedAs?: string;
}

export function WritingSection({ copy, writing, publishedAs }: WritingSectionProps) {
  const domains = Array.from(new Set(writing.papers.map((p) => p.domain).filter((d) => d !== undefined)));

  return (
    <Section id="writing">
      <SectionHeader id="writing" {...copy}>
        {publishedAs && <p className="text-caption mt-6 text-muted">Papers are published as {publishedAs}.</p>}
      </SectionHeader>

      <Reveal>
        <h3 className="sr-only">Papers</h3>
        <PublicationList
          filters={domains}
          items={writing.papers.map((p) => ({ id: p.id, group: p.domain, node: <PublicationCard item={p} /> }))}
        />
      </Reveal>

      {writing.recognition.length > 0 && (
        <Reveal className="mt-20">
          <Eyebrow>Research recognition</Eyebrow>
          <h3 className="sr-only">Research recognition</h3>
          <ul className="mt-6 border-b border-line">
            {writing.recognition.map((r) => (
              <li key={r.id} className="border-t border-line">
                <PublicationCard item={r} />
              </li>
            ))}
          </ul>
        </Reveal>
      )}

      <Reveal className="mt-20">
        <Eyebrow>Notes</Eyebrow>
        <h3 className="sr-only">Research notes</h3>
        {writing.notes.length === 0 && (
          <EmptyState title={writing.notesEmptyCopy.title} className="mt-6 max-w-[68ch]">
            {writing.notesEmptyCopy.body}
          </EmptyState>
        )}
      </Reveal>
    </Section>
  );
}
