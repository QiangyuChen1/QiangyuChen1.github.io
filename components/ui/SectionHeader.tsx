import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

interface SectionHeaderProps {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}

export function SectionHeader({ id, eyebrow, title, intro, children }: SectionHeaderProps) {
  return (
    <Reveal className="mb-12 max-w-[68ch] lg:mb-16">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={`${id}-title`} className="text-h2 mt-4 max-w-[32ch] text-balance text-ink">
        {title}
      </h2>
      {intro && <p className="text-lead mt-6 text-secondary">{intro}</p>}
      {children}
    </Reveal>
  );
}
