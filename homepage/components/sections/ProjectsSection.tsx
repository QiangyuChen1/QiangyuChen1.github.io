import type { Project, SectionCopy } from "@/content/types";
import { projectGroups } from "@/content/projects";
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
      <div className="grid gap-16">
        {projectGroups.map((group) => {
          const items = sorted.filter((p) => p.group === group.id);
          if (items.length === 0) return null;
          return (
            <section key={group.id} aria-labelledby={`projects-${group.id}`}>
              <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-line pb-3">
                <h3 id={`projects-${group.id}`} className="text-h3 text-ink">
                  {group.title}
                </h3>
                {group.meta && <p className="text-label text-muted">{group.meta}</p>}
              </div>
              <ul className="grid gap-6">
                {items.map((p, i) => (
                  <Reveal as="li" key={p.id} index={i}>
                    <ProjectCard project={p} headingLevel={4} />
                  </Reveal>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </Section>
  );
}
