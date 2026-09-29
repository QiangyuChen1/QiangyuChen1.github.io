import type { ReactNode } from "react";
import type { SchematicKind } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Original line drawings in the hero diagram's vocabulary: 1.25px ink for the subject,
 * dashed faint for context/sim, one accent stroke for the thing the project is about.
 * viewBox 0 0 240 180 (4:3).
 */
const DRAWINGS: Record<Exclude<SchematicKind, "sim2real">, { label: string; body: ReactNode }> = {
  dexhand: {
    label: "Line drawing of a dexterous hand with jointed fingers above a mounting plate.",
    body: (
      <>
        <g className="stroke-ink" strokeWidth="1.25">
          <path d="M84 150h72M96 150v-14h48v14" />
          <path d="M100 136l-4-48h48l-4 48" />
          {[
            [104, 88, 100, 58, 102, 36],
            [118, 88, 118, 52, 118, 26],
            [132, 88, 136, 56, 138, 32],
          ].map(([x0, y0, x1, y1, x2, y2]) => (
            <g key={x0}>
              <path d={`M${x0} ${y0 - 4}L${x1} ${y1 + 4}M${x1} ${y1 - 4}L${x2} ${y2 + 3}`} />
              <circle cx={x1} cy={y1} r="4" />
              <circle cx={x2} cy={y2} r="3" />
            </g>
          ))}
          <path d="M96 112L78 98L70 78" />
          <circle cx="78" cy="98" r="3.5" />
          <circle cx="70" cy="76" r="3" />
        </g>
        <path d="M150 104c14 0 24-10 24-24" className="stroke-accent" strokeWidth="1.5" />
        <path d="M170 84l4-4 4 4" className="stroke-accent" strokeWidth="1.5" />
        <g className="stroke-faint" strokeDasharray="3 4">
          <path d="M40 150h160" />
        </g>
      </>
    ),
  },
  mmhand: {
    label: "Line drawing of a two-finger gripper closing on a cylinder, with actuator and sensor callouts.",
    body: (
      <>
        <g className="stroke-ink" strokeWidth="1.25">
          <rect x="92" y="30" width="56" height="30" rx="3" />
          <path d="M104 60v20M136 60v20M100 80h40" />
          <path d="M104 80l-10 40 6 20M136 80l10 40-6 20" />
          <circle cx="94" cy="120" r="3" />
          <circle cx="146" cy="120" r="3" />
          <path d="M108 124h24v30h-24z" />
          <path d="M108 124c0-3 24-3 24 0" />
        </g>
        <path d="M100 140c6 2 12 3 20 3M140 140c-6 2-12 3-20 3" className="stroke-accent" strokeWidth="1.5" />
        <g className="stroke-faint" strokeDasharray="3 4">
          <path d="M148 45h36M150 120h34" />
          <circle cx="190" cy="45" r="4" />
          <circle cx="190" cy="120" r="4" />
        </g>
        <path d="M40 154h160" className="stroke-faint" />
      </>
    ),
  },
  flow3d: {
    label: "Line drawing of a camera frustum observing an object, with a 3D flow arrow toward its goal pose.",
    body: (
      <>
        <g className="stroke-faint" strokeDasharray="3 4">
          <path d="M52 44L112 104M52 44L132 76M52 44L96 124" />
          <path d="M150 96h28v28h-28zM150 96l8-8h28l-8 8M178 124l8-8v-28" />
        </g>
        <g className="stroke-ink" strokeWidth="1.25">
          <rect x="34" y="34" width="22" height="14" rx="2" transform="rotate(35 45 41)" />
          <path d="M96 104h28v28h-28zM96 104l8-8h28l-8 8M124 132l8-8v-28" />
        </g>
        <g className="fill-muted">
          {[
            [104, 112],
            [116, 120],
            [110, 100],
            [126, 108],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.5" />
          ))}
        </g>
        <path d="M130 100C140 86 150 84 160 92" className="stroke-accent" strokeWidth="1.5" />
        <path d="M154 90l6 2-1 6" className="stroke-accent" strokeWidth="1.5" />
        <path d="M40 150h160" className="stroke-faint" />
      </>
    ),
  },
  policy: {
    label: "Line drawing of a simulated scene feeding observations to a policy, which returns actions in a loop.",
    body: (
      <>
        <g className="stroke-ink" strokeWidth="1.25">
          <rect x="30" y="56" width="76" height="68" rx="4" />
          <rect x="146" y="72" width="64" height="36" rx="18" />
          <path d="M44 110h48M56 110V92h12v18M76 98h10v12" />
        </g>
        <g className="stroke-faint" strokeDasharray="3 4">
          <path d="M30 70h76" />
        </g>
        <path d="M106 80h40M140 76l6 4-6 4" className="stroke-muted" />
        <path d="M146 100h-40M112 96l-6 4 6 4" className="stroke-accent" strokeWidth="1.5" />
        <g className="fill-muted font-mono text-[9px]">
          <text x="116" y="72">o</text>
          <text x="116" y="116">a</text>
        </g>
        <path d="M167 83q2-2 5-2h15M173 81c0 6-1 11-3 15M182 81v11q0 4 4 3" className="stroke-ink" strokeWidth="1.5" />
      </>
    ),
  },
  segment: {
    label: "Line drawing of an image tile with a thin curvilinear structure traced by a segmentation mask.",
    body: (
      <>
        <rect x="50" y="30" width="140" height="120" rx="4" className="stroke-ink" strokeWidth="1.25" />
        <g className="stroke-faint" strokeDasharray="2 5">
          <path d="M50 70h140M50 110h140M96 30v120M144 30v120" />
        </g>
        <path
          d="M58 132C80 120 84 96 104 90S132 70 138 52s24-14 44-18"
          className="stroke-muted"
          strokeWidth="5"
          strokeOpacity="0.35"
        />
        <path d="M58 132C80 120 84 96 104 90S132 70 138 52s24-14 44-18" className="stroke-accent" strokeWidth="1.5" />
        <path d="M104 90c4 10 2 22 10 34" className="stroke-ink" strokeWidth="1.25" />
      </>
    ),
  },
};

export function ProjectSchematic({ kind, className }: { kind: SchematicKind; className?: string }) {
  if (kind === "sim2real") return null;
  const drawing = DRAWINGS[kind];
  return (
    <div className={cn("overflow-hidden rounded-xl bg-subtle", className ?? "aspect-[16/9]")}>
      <svg
        viewBox="0 0 240 180"
        role="img"
        aria-label={drawing.label}
        className="h-full w-full"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {drawing.body}
      </svg>
    </div>
  );
}
