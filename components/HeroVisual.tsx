"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/cn";

type Pt = readonly [number, number];

const JOINTS: readonly Pt[] = [
  [140, 390],
  [140, 300],
  [232, 226],
  [334, 238],
  [392, 280],
  [408, 314],
];
const RADII = [7, 7, 6, 6, 5, 4];
/** Placed below-left of each real joint; the sim layer is offset up-right. */
const LABEL_POS: Pt[] = [
  [112, 384],
  [110, 298],
  [206, 222],
  [326, 260],
  [364, 292],
  [384, 322],
];

/** Side-view hand at J6: palm plate, a two-segment finger, and an opposing thumb, open toward the cube. */
const PALM = "M402 320L416 313L425 331L411 338Z";
const FINGER = "M424 331L435 344L432 358";
const THUMB = "M411 338L404 352L410 364";
const HAND_JOINTS: Pt[] = [
  [435, 344],
  [404, 352],
];

const CUBE = "M452 394h26v26h-26zM452 394l8-8h26l-8 8M478 420l8-8v-26";
const TRAJECTORY = "M421 368C425 392 446 398 466 389";
const PRE_GRASP: Pt = [421, 368];
const TARGET: Pt = [466, 389];

const DRAW_TOTAL_MS = 2200;
const LOOP_MS = 9000;

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Link segment trimmed to the edges of the two joint circles. */
function link(a: Pt, b: Pt, ra: number, rb: number): string {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const f = (n: number) => n.toFixed(1);
  return `M${f(a[0] + ux * ra)} ${f(a[1] + uy * ra)}L${f(b[0] - ux * rb)} ${f(b[1] - uy * rb)}`;
}

function Arm({ layer }: { layer: "sim" | "real" }) {
  const real = layer === "real";
  const stroke = (ms: number) => (real ? { pathLength: 1, className: "draw", style: d(ms) } : {});

  return (
    <g
      strokeWidth={real ? 1.25 : 1}
      strokeDasharray={real ? undefined : "4 4"}
      className={real ? "stroke-ink" : "draw-fade stroke-faint"}
      style={real ? undefined : d(300)}
      transform={real ? undefined : "translate(14 -10) rotate(-2 140 420)"}
    >
      <rect x="112" y="398" width="56" height="22" rx="2" {...stroke(100)} />
      {JOINTS.slice(1).map((j, i) => (
        <path key={`l${i}`} d={link(JOINTS[i], j, RADII[i], RADII[i + 1])} {...stroke(150 + i * 70)} />
      ))}
      {JOINTS.map(([cx, cy], i) => (
        <circle key={`j${i}`} cx={cx} cy={cy} r={RADII[i]} {...stroke(100 + i * 60)} />
      ))}
      <path d={PALM} {...stroke(420)} />
      <path d={FINGER} {...stroke(480)} />
      <path d={THUMB} {...stroke(500)} />
      {real && HAND_JOINTS.map(([cx, cy]) => <circle key={`h${cx}`} cx={cx} cy={cy} r="2" {...stroke(560)} />)}
    </g>
  );
}

interface TriadProps {
  o: Pt;
  x: Pt;
  y: Pt;
  z: Pt;
  label: string;
  lx: number;
  ly: number;
  delay: number;
}

function Triad({ o, x, y, z, label, lx, ly, delay }: TriadProps) {
  return (
    <g>
      <g className="stroke-muted" strokeWidth="1">
        {[x, y, z].map((p, i) => (
          <path
            key={i}
            d={`M${o[0]} ${o[1]}L${p[0]} ${p[1]}`}
            pathLength={1}
            className="draw"
            style={d(delay + i * 60)}
          />
        ))}
      </g>
      <text x={lx} y={ly} className="draw-fade" style={d(delay + 300)}>
        {label}
      </text>
    </g>
  );
}

/** Mono labels: ~10px on desktop, larger below sm so they survive the SVG's downscale on phones. */
const LABEL = "fill-muted font-mono text-[15px] sm:text-[10px]";
/** Secondary annotations are hidden on phones rather than shrunk to illegibility. */
const ANNOTATION = "fill-faint font-mono text-[10px] max-sm:hidden";

export function HeroVisual() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const [ambient, setAmbient] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const t = window.setTimeout(() => setAmbient(true), DRAW_TOTAL_MS);
    const onChange = () => {
      if (media.matches) setAmbient(false);
    };
    media.addEventListener("change", onChange);
    return () => {
      window.clearTimeout(t);
      media.removeEventListener("change", onChange);
    };
  }, []);

  useEffect(() => {
    if (!ambient) return;
    const svg = svgRef.current;
    const path = pathRef.current;
    const dot = dotRef.current;
    if (!svg || !path || !dot) return;

    const total = path.getTotalLength();
    let raf = 0;
    let running = false;
    let elapsed = 0;
    let last = 0;

    const frame = (now: number) => {
      elapsed += now - last;
      last = now;
      const t = (elapsed % LOOP_MS) / LOOP_MS;
      const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
      const p = path.getPointAtLength(eased * total);
      dot.setAttribute("cx", p.x.toFixed(2));
      dot.setAttribute("cy", p.y.toFixed(2));
      raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(svg);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [ambient]);

  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-[640px] overflow-hidden">
      <div aria-hidden="true" className="graph-paper absolute inset-0" />
      <svg
        ref={svgRef}
        viewBox="40 40 500 400"
        role="img"
        aria-label="Schematic of a robot arm whose hand reaches toward a cube, drawn twice: a dashed simulation layer and a solid real-world layer, with one highlighted trajectory from the hand to the cube."
        className="relative h-full w-full"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Legend */}
        <g className="draw-fade max-sm:hidden" style={d(900)}>
          <path d="M60 68H84" className="stroke-faint" strokeDasharray="4 4" />
          <path d="M60 86H84" className="stroke-ink" strokeWidth="1.25" />
          <path d="M60 104H84" className="stroke-accent" strokeWidth="1.5" />
          <g className={ANNOTATION}>
            <text x="92" y="71">sim</text>
            <text x="92" y="89">real</text>
            <text x="92" y="107">trajectory</text>
          </g>
        </g>

        {/* Policy annotation. π is drawn as a path: the Latin mono subset has no Greek glyph. */}
        <g className="draw-fade max-sm:hidden" style={d(1100)}>
          <path d="M400 64h8M402.5 64v7M406 64v5.5q0 1.5 1.5 1.5" className="stroke-faint" strokeWidth="1" />
          <g className={ANNOTATION}>
            <text x="410" y="71">(a | o)</text>
            <text x="400" y="89">domain randomization</text>
          </g>
        </g>

        {/* Joint labels q1..q6 with mono subscripts (no fallback subscript glyphs). */}
        <g className={cn(LABEL, "draw-fade")} style={d(1000)}>
          {LABEL_POS.map(([x, y], i) => (
            <text key={i} x={x} y={y}>
              q
              <tspan dy="3" className="text-[11px] sm:text-[7px]">
                {i + 1}
              </tspan>
            </text>
          ))}
        </g>

        {/* Ground */}
        <path d="M60 420H520" className="draw stroke-muted" strokeWidth="1" pathLength={1} style={d(0)} />
        <g className="draw-fade stroke-line-strong" strokeWidth="1" style={d(600)}>
          {Array.from({ length: 12 }, (_, i) => 76 + i * 38).map((x) => (
            <path key={x} d={`M${x} 420l-7 8`} />
          ))}
        </g>

        {/* Camera frustum (perception), looking at the cube */}
        <g className="draw-fade stroke-faint" strokeWidth="1" style={d(700)}>
          <rect x="488" y="140" width="26" height="16" rx="2" />
          <path d="M488 146h-6v4h6" />
          <path d="M482 148L446 392M482 148L482 424" strokeDasharray="2 4" />
        </g>
        <text x="486" y="132" className={cn(ANNOTATION, "draw-fade")} style={d(900)}>
          cam
        </text>

        {/* Object */}
        <path d={CUBE} className="draw stroke-ink" strokeWidth="1.25" pathLength={1} style={d(250)} />

        <Arm layer="sim" />
        <Arm layer="real" />

        <g className={LABEL}>
          <Triad o={[82, 384]} x={[104, 384]} z={[82, 362]} y={[71, 395]} label="{base}" lx={58} ly={354} delay={500} />
          <Triad o={[446, 300]} x={[466, 300]} z={[446, 320]} y={[438, 292]} label="{ee}" lx={452} ly={286} delay={600} />
        </g>

        {/* The single accent element: approach from the pre-grasp pose to the cube */}
        <path
          ref={pathRef}
          d={TRAJECTORY}
          className="draw stroke-accent"
          strokeWidth="1.5"
          pathLength={1}
          style={d(500)}
        />
        <circle cx={PRE_GRASP[0]} cy={PRE_GRASP[1]} r="2.5" className="draw-fade fill-accent" style={d(500)} />
        <circle cx={TARGET[0]} cy={TARGET[1]} r="4" className="draw-fade stroke-accent" strokeWidth="1" style={d(1900)} />
        {ambient && <circle ref={dotRef} cx={PRE_GRASP[0]} cy={PRE_GRASP[1]} r="3" className="fill-accent" />}
      </svg>
    </div>
  );
}
