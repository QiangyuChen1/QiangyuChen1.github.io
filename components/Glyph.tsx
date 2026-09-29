import type { ReactNode } from "react";
import type { GlyphKind } from "@/content/types";
import { cn } from "@/lib/cn";

/** Line glyphs in the hero's schematic grammar: joints as circles, sim dashed, real solid. */
const paths: Record<GlyphKind, ReactNode> = {
  policy: (
    <>
      <path d="M17.6 8.2A6.5 6.5 0 1 0 18.5 12" />
      <path d="M18 4.5v4h-4" />
      <circle cx="12" cy="12" r="1.5" />
    </>
  ),
  vla: (
    <>
      <path d="M2.5 8.5c2.6-3.6 6.9-3.6 9.5 0-2.6 3.6-6.9 3.6-9.5 0Z" />
      <circle cx="7.25" cy="8.5" r="1.2" />
      <path d="M2.5 15.5h7M2.5 19h4.5" />
      <path d="M13.5 17h8M18.5 14l3 3-3 3" />
    </>
  ),
  hand: (
    <>
      <path d="M4.5 19.5h15" />
      <path d="M7.5 19.5v-5l-1.5-4.5" />
      <path d="M12 19.5v-6.5V6.5" />
      <path d="M16.5 19.5v-5l1.5-4.5" />
      <circle cx="7.5" cy="14.5" r="1" />
      <circle cx="12" cy="13" r="1" />
      <circle cx="16.5" cy="14.5" r="1" />
    </>
  ),
  rl: (
    <>
      <rect x="2.5" y="3.5" width="7" height="6" rx="1" />
      <rect x="14.5" y="14.5" width="7" height="6" rx="1" />
      <path d="M9.5 6.5h4a3 3 0 0 1 3 3v2.5" />
      <path d="M14.5 17.5h-4a3 3 0 0 1-3-3V12" />
      <path d="M15 5.5l1.5 1.5 3-3" />
    </>
  ),
  sim2real: (
    <>
      <rect x="2" y="8" width="7" height="7" rx="1" strokeDasharray="2 2" />
      <path d="M10.5 11.5h3.5M12.5 9.75l1.75 1.75-1.75 1.75" />
      <rect x="15.5" y="8" width="7" height="7" rx="1" />
    </>
  ),
  flow3d: (
    <>
      <path d="M3.5 9 9 6l5.5 3v6L9 18l-5.5-3Z" />
      <path d="M3.5 9 9 12l5.5-3M9 12v6" />
      <path d="M16 4.5c3.2 1.2 4.6 4.4 3.6 8" />
      <path d="M21.3 11.2l-1.7 1.6-1.6-1.8" />
    </>
  ),
  segment: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M5.5 17c3-1 4-8 7-8s3 6 6 4" />
    </>
  ),
};

export function Glyph({ kind, className, size = 20 }: { kind: GlyphKind; className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      {paths[kind]}
    </svg>
  );
}
