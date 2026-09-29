import type { SectionCopy, WorkDirection } from "@/content/types";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { DirectionCard } from "@/components/blocks/DirectionCard";

interface WorkSectionProps {
  copy: SectionCopy;
  directions: WorkDirection[];
  titlesById: Record<string, string>;
}

export function WorkSection({ copy, directions, titlesById }: WorkSectionProps) {
  const sorted = [...directions].sort((a, b) => a.order - b.order);

  return (
    <Section id="work">
      <SectionHeader id="work" {...copy} />
      <ul className="grid gap-6 lg:grid-cols-3">
        {sorted.map((d, i) => (
          <Reveal as="li" key={d.id} index={i}>
            <DirectionCard direction={d} index={i} titlesById={titlesById} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
