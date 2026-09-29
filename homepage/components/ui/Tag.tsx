import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TagProps {
  children: ReactNode;
  tone?: "neutral" | "strong" | "accent" | "outline";
  /** Uppercase label style for venues and dates. */
  mono?: boolean;
  className?: string;
}

export function Tag({ children, tone = "neutral", mono = false, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-6 shrink-0 items-center rounded-full px-2.5",
        mono ? "text-label" : "text-[0.8125rem] leading-tight font-medium",
        tone === "neutral" && "bg-subtle text-muted",
        tone === "strong" && "bg-subtle text-ink",
        tone === "accent" && "bg-accent-muted text-accent",
        tone === "outline" && "border border-line-strong text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** "Domain Randomization" → "Domain randomization"; acronyms and "3D"-style tokens are kept. */
export function sentenceCase(label: string): string {
  return label
    .split(" ")
    .map((word, i) => (i > 0 && /^[A-Z][a-z]+$/.test(word) ? word.toLowerCase() : word))
    .join(" ");
}

export function TagList({ items, className, label }: { items: string[]; className?: string; label?: string }) {
  if (items.length === 0) return null;
  return (
    <ul className={cn("flex flex-wrap gap-2", className)} aria-label={label}>
      {items.map((item) => (
        <li key={item}>
          <Tag>{sentenceCase(item)}</Tag>
        </li>
      ))}
    </ul>
  );
}
