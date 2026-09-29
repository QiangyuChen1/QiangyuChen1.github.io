import type { SectionCopy, TimelineEntry } from "@/content/types";
import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";
import { Timeline } from "./Timeline";

interface EngineeringSectionProps {
  copy: SectionCopy;
  next: string;
  timeline: TimelineEntry[];
}

export function EngineeringSection({ copy, next, timeline }: EngineeringSectionProps) {
  return (
    <Section id="engineering" band>
      <SectionHeader id="engineering" {...copy}>
        <p className="text-body-sm mt-4 max-w-[60ch] text-muted">{next}</p>
      </SectionHeader>
      <h3 className="sr-only">Roles and education</h3>
      <Timeline entries={timeline} />
    </Section>
  );
}
