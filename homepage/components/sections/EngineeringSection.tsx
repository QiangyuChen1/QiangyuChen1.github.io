import type { SectionCopy, TimelineEntry } from "@/content/types";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EducationList, ExperienceList } from "@/components/blocks/Timeline";

interface ExperienceSectionProps {
  copy: SectionCopy;
  next: string;
  entries: TimelineEntry[];
}

export function ExperienceSection({ copy, next, entries }: ExperienceSectionProps) {
  return (
    <Section id="experience" band>
      <SectionHeader id="experience" {...copy}>
        <p className="text-body-sm mt-4 max-w-[60ch] text-muted">{next}</p>
      </SectionHeader>
      <ExperienceList entries={entries} />
    </Section>
  );
}

export function EducationSection({ copy, entries }: { copy: SectionCopy; entries: TimelineEntry[] }) {
  return (
    <Section id="education">
      <SectionHeader id="education" {...copy} />
      <EducationList entries={entries} />
    </Section>
  );
}
