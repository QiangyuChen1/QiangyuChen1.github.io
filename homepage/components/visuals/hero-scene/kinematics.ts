export interface Vec2 {
  x: number;
  y: number;
}

/** Tool-center point and approach angle (radians, world frame, y up). */
export interface Pose {
  p: Vec2;
  phi: number;
}

export interface ArmSpec {
  /** Shoulder joint. A short vertical column below it is the base axis. */
  shoulder: Vec2;
  l1: number;
  l2: number;
  /** Wrist joint to tool-center point. */
  l3: number;
  /** Sign of the elbow joint that keeps the elbow above the shoulder–wrist line. */
  elbow: 1 | -1;
  /** Drawn joint count. The 7-axis arm adds an upper-arm roll between shoulder and elbow. */
  axes: 6 | 7;
}

export interface ArmState {
  /** Base → flange, one point per axis. */
  joints: Vec2[];
  tool: Vec2;
  phi: number;
  /** Hinge angle at each joint, radians. */
  q: number[];
  axes: 6 | 7;
}

export const vec = (x: number, y: number): Vec2 => ({ x, y });
export const add = (a: Vec2, b: Vec2): Vec2 => ({ x: a.x + b.x, y: a.y + b.y });
export const sub = (a: Vec2, b: Vec2): Vec2 => ({ x: a.x - b.x, y: a.y - b.y });
export const scale = (a: Vec2, s: number): Vec2 => ({ x: a.x * s, y: a.y * s });
export const polar = (r: number, a: number): Vec2 => ({ x: r * Math.cos(a), y: r * Math.sin(a) });
export const rotate = (a: Vec2, t: number): Vec2 => ({
  x: a.x * Math.cos(t) - a.y * Math.sin(t),
  y: a.x * Math.sin(t) + a.y * Math.cos(t),
});

export const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const wrapAngle = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));
export const lerpAngle = (a: number, b: number, t: number) => a + wrapAngle(b - a) * t;
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/** Point partway along a–b, offset along the upward normal so a roll joint reads in profile. */
function kink(a: Vec2, b: Vec2, t: number, amp: number): Vec2 {
  const p = vec(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  let nx = -dy / len;
  let ny = dx / len;
  if (ny < 0) {
    nx = -nx;
    ny = -ny;
  }
  return vec(p.x + nx * amp, p.y + ny * amp);
}

function hinge(prev: Vec2, curr: Vec2, next: Vec2) {
  const incoming = Math.atan2(curr.y - prev.y, curr.x - prev.x);
  const outgoing = Math.atan2(next.y - curr.y, next.x - curr.x);
  return wrapAngle(outgoing - incoming);
}

/**
 * Planar inverse kinematics for the shoulder–elbow–wrist chain.
 * The extra axes of a 6- or 7-axis arm are roll housings placed along those links;
 * they move with the pose, and the tool stays on the requested point.
 */
export function solveIK(arm: ArmSpec, pose: Pose): ArmState {
  const { l1, l2, l3, shoulder } = arm;
  const target = sub(sub(pose.p, polar(l3, pose.phi)), shoulder);
  const reach = clamp(Math.hypot(target.x, target.y), Math.abs(l1 - l2) + 1e-4, l1 + l2 - 1e-4);
  const q2 = arm.elbow * Math.acos(clamp((reach * reach - l1 * l1 - l2 * l2) / (2 * l1 * l2), -1, 1));
  const q1 = Math.atan2(target.y, target.x) - Math.atan2(l2 * Math.sin(q2), l1 + l2 * Math.cos(q2));
  const elbow = add(shoulder, polar(l1, q1));
  const wrist = add(elbow, polar(l2, q1 + q2));
  const tool = add(wrist, polar(l3, pose.phi));

  const aim = Math.atan2(pose.p.y - shoulder.y, pose.p.x - shoulder.x);
  const lean = 0.015 * Math.sin(aim);
  const base = vec(shoulder.x + lean, 0.05);
  const flange = vec(wrist.x + (tool.x - wrist.x) * 0.62, wrist.y + (tool.y - wrist.y) * 0.62);

  const joints = [base, shoulder];
  if (arm.axes === 7) joints.push(kink(shoulder, elbow, 0.48, 0.018 + 0.016 * Math.sin(aim * 2)));
  joints.push(elbow);
  joints.push(kink(elbow, wrist, 0.6, 0.014 + 0.012 * Math.sin(aim * 2 + 0.8)));
  joints.push(wrist, flange);

  const reference = vec(base.x, base.y - 0.1);
  const pts = [reference, ...joints, tool];
  const q: number[] = [];
  for (let i = 1; i < pts.length - 1; i++) q.push(hinge(pts[i - 1], pts[i], pts[i + 1]));

  return { joints, tool, phi: pose.phi, q, axes: arm.axes };
}

export function cubicBezier(p0: Vec2, c1: Vec2, c2: Vec2, p1: Vec2, t: number): Vec2 {
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const c = 3 * u * t * t;
  const d = t * t * t;
  return { x: a * p0.x + b * c1.x + c * c2.x + d * p1.x, y: a * p0.y + b * c1.y + c * c2.y + d * p1.y };
}

/** Deterministic PRNG so every cycle samples the same-looking but distinct candidate paths. */
export function mulberry32(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
