import {
  add,
  cubicBezier,
  easeInOut,
  lerpAngle,
  mulberry32,
  solveIK,
  sub,
  vec,
  type ArmSpec,
  type ArmState,
  type Pose,
  type Vec2,
} from "./kinematics.ts";

/**
 * One cycle of a fine insertion. The 6-axis arm braces a phone in its stand; the
 * 7-axis arm carries a USB-C plug, whose cable runs to a charger on the table, and
 * aligns and seats it in the phone's port. The plug is withdrawn so the motion loops.
 */

export type ArmId = "left" | "right";
type Role = "A" | "B";

export const STAGES = ["plan", "approach", "align", "insert", "seat", "reset"] as const;

export const TABLE_HALF = 0.74;
/** Phone in landscape, standing in a low stand; the port is on its right edge. */
export const STAND = { x: -0.21, w: 0.24, h: 0.028 };
export const PHONE = { x: -0.2, y: STAND.h, w: 0.21, h: 0.105 };
export const PORT = vec(PHONE.x + PHONE.w, PHONE.y + PHONE.h / 2);
/** Charger brick on the table; the cable leaves from its top-left socket. */
export const CHARGER = { x: 0.3, w: 0.085, h: 0.05 };
export const SOCKET = vec(CHARGER.x + 0.018, CHARGER.h);
/**
 * Plug geometry along the tool direction, measured from the tool point: the boot
 * starts at `-boot`, the body runs from `-back` to `front`, the metal tip to `tip`.
 */
export const PLUG = { boot: 0.036, back: 0.014, front: 0.064, tip: 0.09, thick: 0.034, tipThick: 0.014 };
export const GRIPPER = { palm: 0.046, tip: 0.01, open: 0.04, closed: PLUG.thick / 2, finger: 0.008 };
export const CANDIDATES = 8;
export const DENOISE_STEPS = 10;

const INTO = Math.PI;

export const ARMS: Record<ArmId, ArmSpec> = {
  left: { shoulder: vec(-0.56, 0.16), l1: 0.4, l2: 0.34, l3: 0.1, elbow: -1, axes: 6 },
  right: { shoulder: vec(0.56, 0.16), l1: 0.4, l2: 0.34, l3: 0.1, elbow: 1, axes: 7 },
};

const pose = (x: number, y: number, phi: number): Pose => ({ p: vec(x, y), phi });

/** Tool pose when the metal tip is `gap` short of the port (the tip is fully in at gap = −tip length). */
const plugAt = (gap: number, y: number) => pose(PORT.x + gap + PLUG.tip, y, INTO);
const TIP_LENGTH = PLUG.tip - PLUG.front;

const HOME: Record<Role, Pose> = {
  A: pose(PHONE.x - 0.034, PORT.y, 0),
  B: pose(0.26, 0.42, INTO),
};
const BRACE = pose(PHONE.x - 0.004, PORT.y, 0);
const STANDOFF = plugAt(0.055, PORT.y + 0.03);
const ALIGNED = plugAt(0.055, PORT.y);
const INSERTED = plugAt(-TIP_LENGTH, PORT.y);

interface Segment {
  role: Role;
  t0: number;
  t1: number;
  to: Pose;
  /** Upward bulge of the Bézier path. */
  arc?: number;
  /** Seconds of trajectory sampling shown before the move starts. */
  plan?: number;
  /** Lateral spread of the sampled candidates. Tight for the alignment move. */
  spread?: number;
}

const SEGMENTS: Segment[] = [
  { role: "B", t0: 1.2, t1: 3.15, to: STANDOFF, arc: 0.07, plan: 1.2, spread: 0.14 },
  { role: "B", t0: 3.45, t1: 4.2, to: ALIGNED, plan: 0.3, spread: 0.03 },
  { role: "B", t0: 4.4, t1: 6.3, to: INSERTED },
  { role: "A", t0: 4.4, t1: 5.15, to: BRACE },
  { role: "B", t0: 7.5, t1: 8.55, to: ALIGNED },
  { role: "A", t0: 7.5, t1: 8.4, to: HOME.A },
  { role: "B", t0: 8.9, t1: 10.7, to: HOME.B, arc: 0.06 },
];

const STAGE_STARTS = [0, 1.2, 3.15, 4.4, 6.3, 7.5];

export const HALF_CYCLE = 12.4;

/** A frame that reads well without motion: the 7-axis arm is still sampling its approach. */
export const STILL_TIME = 0.72;

interface CompiledSegment extends Segment {
  index: number;
  from: Pose;
  c1: Vec2;
  c2: Vec2;
}

const compiled: CompiledSegment[] = (() => {
  const last: Record<Role, Pose> = { ...HOME };
  return SEGMENTS.map((s, index) => {
    const from = last[s.role];
    last[s.role] = s.to;
    const lift = vec(0, s.arc ?? 0);
    const chord = sub(s.to.p, from.p);
    return {
      ...s,
      index,
      from,
      c1: add(add(from.p, lift), { x: chord.x * 0.25, y: chord.y * 0.25 }),
      c2: add(sub(s.to.p, { x: chord.x * 0.25, y: chord.y * 0.25 }), lift),
    };
  });
})();

const segmentPoint = (s: CompiledSegment, u: number) => cubicBezier(s.from.p, s.c1, s.c2, s.to.p, u);

function rolePose(role: Role, t: number): Pose {
  let current = HOME[role];
  for (const s of compiled) {
    if (s.role !== role || s.t0 > t) continue;
    if (t >= s.t1) {
      current = s.to;
      continue;
    }
    const u = easeInOut((t - s.t0) / (s.t1 - s.t0));
    return { p: segmentPoint(s, u), phi: lerpAngle(s.from.phi, s.to.phi, u) };
  }
  return current;
}

const ROLE_OF: Record<ArmId, Role> = { left: "A", right: "B" };
const ARM_OF: Record<Role, ArmId> = { A: "left", B: "right" };

function clock(t: number) {
  const n = Math.floor(Math.max(0, t) / HALF_CYCLE);
  return { n, local: Math.max(0, t) - n * HALF_CYCLE };
}

export function toolPath(arm: ArmId, t: number, samples: number, dt: number): Vec2[] {
  const out: Vec2[] = [];
  for (let i = 0; i < samples; i++) {
    const ti = t - i * dt;
    if (ti < 0) break;
    const c = clock(ti);
    out.push(rolePose(ROLE_OF[arm], c.local).p);
  }
  return out;
}

export interface PlanView {
  arm: ArmId;
  /** 0 → 1 across the sampling window. */
  progress: number;
  candidates: Vec2[][];
}

export interface PathView {
  arm: ArmId;
  path: Vec2[];
  progress: number;
}

export interface Frame {
  arms: Record<ArmId, ArmState & { open: number }>;
  /** The 7-axis tool pose; the plug is laid out along it by `PLUG`. */
  plug: Pose;
  stage: number;
  /** The tip is seated and the phone is charging. */
  charging: boolean;
  plans: PlanView[];
  paths: PathView[];
}

const PATH_SAMPLES = 40;

function candidatePaths(s: CompiledSegment, progress: number, seed: number): Vec2[][] {
  const rand = mulberry32(seed);
  const chord = sub(s.to.p, s.from.p);
  const len = Math.hypot(chord.x, chord.y) || 1;
  const normal = vec(-chord.y / len, chord.x / len);
  const amp = (s.spread ?? 0.14) * (1 - easeInOut(progress)) ** 1.4;
  return Array.from({ length: CANDIDATES }, () => {
    const waves = [1, 2, 3.3].map((f, j) => ({ f, a: (rand() * 2 - 1) / (j + 1), ph: rand() * Math.PI * 2 }));
    const along = (rand() * 2 - 1) * 0.5;
    return Array.from({ length: PATH_SAMPLES + 1 }, (_, i) => {
      const u = i / PATH_SAMPLES;
      const base = segmentPoint(s, u);
      const envelope = u * (1 - 0.55 * u);
      const n = waves.reduce((acc, w) => acc + w.a * Math.sin(2 * Math.PI * w.f * u + w.ph), 0);
      const off = amp * envelope;
      return vec(base.x + normal.x * n * off + chord.x * along * off, base.y + normal.y * n * off + chord.y * along * off);
    });
  });
}

export function sampleFrame(t: number): Frame {
  const c = clock(t);
  const armState = (arm: ArmId) => ({
    ...solveIK(ARMS[arm], rolePose(ROLE_OF[arm], c.local)),
    open: arm === "left" ? 0.3 : 0,
  });
  const arms = { left: armState("left"), right: armState("right") };

  const plans: PlanView[] = [];
  const paths: PathView[] = [];
  for (const s of compiled) {
    if (!s.plan) continue;
    const arm = ARM_OF[s.role];
    const start = s.t0 - s.plan;
    if (c.local >= start && c.local < s.t0) {
      plans.push({
        arm,
        progress: (c.local - start) / s.plan,
        candidates: candidatePaths(s, (c.local - start) / s.plan, c.n * 97 + s.index * 13 + 1),
      });
    } else if (c.local >= s.t0 && c.local < s.t1) {
      const path = Array.from({ length: PATH_SAMPLES + 1 }, (_, i) => segmentPoint(s, i / PATH_SAMPLES));
      paths.push({ arm, path, progress: easeInOut((c.local - s.t0) / (s.t1 - s.t0)) });
    }
  }

  let stage = 0;
  STAGE_STARTS.forEach((start, i) => {
    if (c.local >= start) stage = i;
  });

  return {
    arms,
    plug: { p: arms.right.tool, phi: arms.right.phi },
    stage,
    charging: STAGES[stage] === "seat",
    plans,
    paths,
  };
}
