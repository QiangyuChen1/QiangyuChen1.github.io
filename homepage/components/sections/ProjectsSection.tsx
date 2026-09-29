import type { Project, SectionCopy } from "@/content/types";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/blocks/ProjectCard";

interface ProjectsSectionProps {
  copy: SectionCopy;
  projects: Project[];
}

export function ProjectsSection({ copy, projects }: ProjectsSectionProps) {
  const sorted = [...projects].sort((a, b) => a.order - b.order);

  return (
    <Section id="projects">
      <SectionHeader id="projects" {...copy} />
      <ul className="grid gap-6">
        {sorted.map((p, i) => (
          <Reveal as="li" key={p.id} index={i}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
