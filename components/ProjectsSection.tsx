import type { Project, SectionCopy } from "@/content/types";
import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";
import { Reveal } from "./ui/Reveal";
import { ProjectCard } from "./ProjectCard";
import { cn } from "@/lib/cn";

interface ProjectsSectionProps {
  copy: SectionCopy;
  projects: Project[];
}

export function ProjectsSection({ copy, projects }: ProjectsSectionProps) {
  const sorted = [...projects].sort((a, b) => a.order - b.order);
  const featured = sorted.filter((p) => p.featured);
  const rest = sorted.filter((p) => !p.featured);

  return (
    <Section id="projects">
      <SectionHeader id="projects" {...copy} />
      <div className="grid gap-6">
        {featured.map((p) => (
          <Reveal key={p.id}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
        <ul className="grid gap-6 md:grid-cols-2">
          {rest.map((p, i) => (
            <Reveal as="li" key={p.id} index={i % 2} className={cn(p.size === "compact" && "md:col-span-2")}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
