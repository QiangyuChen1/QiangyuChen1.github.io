import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

interface SectionProps {
  id: string;
  children: ReactNode;
  band?: boolean;
  className?: string;
}

export function Section({ id, children, band = false, className }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("py-10 sm:py-12 lg:py-16", band && "bg-subtle", className)}
    >
      <Container>{children}</Container>
    </section>
  );
}
