import {
  CANDIDATES,
  CHARGER,
  DENOISE_STEPS,
  GRIPPER,
  PHONE,
  PLUG,
  PORT,
  SOCKET,
  STAGES,
  STAND,
  TABLE_HALF,
  sampleFrame,
  toolPath,
  type ArmId,
  type Frame,
} from "./choreography.ts";
import { add, lerp, polar, scale as mul, vec, type ArmState, type Vec2 } from "./kinematics.ts";

interface Palette {
  bg: string;
  ink: string;
  muted: string;
  faint: string;
  line: string;
  accent: string;
  accentMuted: string;
  mono: string;
}

interface Layout {
  width: number;
  height: number;
  dpr: number;
  scale: number;
  origin: Vec2;
  compact: boolean;
}

const WORLD = { left: -0.78, right: 0.78, bottom: -0.08, top: 0.7 };
const HUD_TOP = 44;
const HUD_BOTTOM = 34;
const TRAIL_SAMPLES = 28;
const TRAIL_DT = 1 / 30;
const ARM_ORDER: ArmId[] = ["left", "right"];

function readPalette(): Palette {
  const css = getComputedStyle(document.documentElement);
  const v = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback;
  const mono = [css.getPropertyValue("--font-outfit").trim(), '"Helvetica Neue"', "Arial", "sans-serif"];
  return {
    bg: v("--bg", "#fafaf8"),
    ink: v("--text", "#0b0b0c"),
    muted: v("--text-muted", "#6e6e73"),
    faint: v("--text-faint", "#a1a1a6"),
    line: v("--border-strong", "#cfcfca"),
    accent: v("--accent", "#2b59c3"),
    accentMuted: v("--accent-muted", "#e9eef9"),
    mono: mono.filter(Boolean).join(", "),
  };
}

function computeLayout(width: number, height: number, dpr: number): Layout {
  const compact = width < 560;
  const hudTop = compact ? 30 : HUD_TOP;
  const hudBottom = compact ? 8 : HUD_BOTTOM;
  const worldW = WORLD.right - WORLD.left;
  const worldH = WORLD.top - WORLD.bottom;
  const scale = Math.max(40, Math.min((width * 0.94) / worldW, (height - hudTop - hudBottom - 24) / worldH));
  const block = worldH * scale + hudTop + hudBottom;
  // Wide layouts sit beside the hero text; keep the scene below the name row.
  const center = compact ? height / 2 : height * 0.58;
  const top = Math.min(Math.max(0, center - block / 2), Math.max(0, height - block));
  return {
    width,
    height,
    dpr,
    scale,
    compact,
    origin: vec(width / 2 - ((WORLD.left + WORLD.right) / 2) * scale, top + hudTop + WORLD.top * scale),
  };
}

export function createRenderer(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  let palette: Palette | null = null;
  let layout: Layout | null = null;
  let grid: HTMLCanvasElement | null = null;

  const S = (p: Vec2): Vec2 => {
    const l = layout!;
    return vec(l.origin.x + p.x * l.scale, l.origin.y - p.y * l.scale);
  };
  const px = (world: number) => world * layout!.scale;

  function buildGrid() {
    if (!layout || !palette) return;
    const { width, height, dpr, origin, scale } = layout;
    grid = document.createElement("canvas");
    grid.width = Math.round(width * dpr);
    grid.height = Math.round(height * dpr);
    const g = grid.getContext("2d");
    if (!g) return;
    g.scale(dpr, dpr);
    g.fillStyle = palette.ink;
    const step = 22;
    const cx = origin.x;
    const cy = origin.y - 0.3 * scale;
    const reach = Math.max(width, height) * 0.62;
    for (let x = ((cx % step) + step) % step; x < width; x += step) {
      for (let y = ((cy % step) + step) % step; y < height; y += step) {
        const d = Math.hypot(x - cx, (y - cy) * 1.35) / reach;
        const a = 0.2 * (1 - smoothstep(0.2, 1, d));
        if (a <= 0.005) continue;
        g.globalAlpha = a;
        g.beginPath();
        g.arc(x, y, 0.8, 0, Math.PI * 2);
        g.fill();
      }
    }
  }

  function resize(width: number, height: number, dpr: number) {
    if (width <= 0 || height <= 0) return;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    layout = computeLayout(width, height, dpr);
    buildGrid();
  }

  function refreshPalette() {
    palette = readPalette();
    buildGrid();
  }

  function draw(t: number) {
    if (!ctx || !layout || !palette) return;
    const frame = sampleFrame(t);
    const { dpr, width, height } = layout;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (grid) ctx.drawImage(grid, 0, 0, width, height);

    drawTable();
    drawPhone(frame.stage, frame.charging);
    drawCharger(frame.charging);
    for (const plan of frame.plans) drawCandidates(plan.candidates, plan.progress);
    for (const path of frame.paths) drawCommittedPath(path.path, path.progress);
    for (const arm of ARM_ORDER) drawTrail(toolPath(arm, t, TRAIL_SAMPLES, TRAIL_DT));
    drawCable(frame.plug.p, frame.plug.phi);
    for (const arm of ARM_ORDER) drawPedestal(frame.arms[arm].joints[0]);
    for (const arm of ARM_ORDER) drawLinks(frame.arms[arm]);
    drawPlug(frame.plug.p, frame.plug.phi, frame.stage < 3);
    for (const arm of ARM_ORDER) drawGripper(frame.arms[arm]);
    for (const arm of ARM_ORDER) drawJoints(frame.arms[arm]);
    drawHud(frame);
  }

  function stroke(color: string, width: number, alpha = 1) {
    ctx!.strokeStyle = color;
    ctx!.lineWidth = width;
    ctx!.globalAlpha = alpha;
  }

  function drawTable() {
    const c = ctx!;
    const p = palette!;
    const a = S(vec(-TABLE_HALF, 0));
    const b = S(vec(TABLE_HALF, 0));
    stroke(p.ink, 1.25, 0.8);
    c.beginPath();
    c.moveTo(a.x, a.y);
    c.lineTo(b.x, b.y);
    c.stroke();

    stroke(p.faint, 1, 0.7);
    c.beginPath();
    const hatch = 9;
    for (let x = a.x + 4; x < b.x - 4; x += hatch) {
      c.moveTo(x, a.y + 1);
      c.lineTo(x - 6, a.y + 7);
    }
    c.stroke();
  }

  function roundRect(x: number, y: number, w: number, h: number, r: number) {
    const c = ctx!;
    c.beginPath();
    c.moveTo(x + r, y);
    c.arcTo(x + w, y, x + w, y + h, r);
    c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r);
    c.arcTo(x, y, x + w, y, r);
    c.closePath();
  }

  /** Rounded box from world corner (x, y) with world size (w, h). */
  function box(x: number, y: number, w: number, h: number, r: number, fill: string, line: string, alpha = 0.9) {
    const c = ctx!;
    const tl = S(vec(x, y + h));
    roundRect(tl.x, tl.y, px(w), px(h), Math.min(px(r), px(w) / 4, px(h) / 4));
    c.fillStyle = fill;
    c.globalAlpha = 1;
    c.fill();
    stroke(line, 1.25, alpha);
    c.stroke();
  }

  function drawPhone(stage: number, charging: boolean) {
    const c = ctx!;
    const p = palette!;
    box(STAND.x, 0, STAND.w, STAND.h, 0.006, p.bg, p.ink, 0.8);
    box(PHONE.x, PHONE.y, PHONE.w, PHONE.h, 0.014, p.bg, p.ink, 0.95);
    const depth = PLUG.tip - PLUG.front;
    const bezel = depth + 0.01;
    box(PHONE.x + bezel, PHONE.y + 0.01, PHONE.w - bezel * 2, PHONE.h - 0.02, 0.006, p.bg, p.faint, 0.9);
    const cam = S(vec(PHONE.x + bezel / 2, PORT.y));
    c.beginPath();
    c.arc(cam.x, cam.y, Math.max(1.5, px(0.0035)), 0, Math.PI * 2);
    c.fillStyle = p.ink;
    c.globalAlpha = 0.7;
    c.fill();

    const inserting = STAGES[stage] === "insert" || charging;
    const port = S(PORT);
    const portW = px(depth);
    const portH = px(PLUG.tipThick + 0.006);
    c.fillStyle = inserting ? p.accent : p.ink;
    c.globalAlpha = inserting ? 0.35 : 0.85;
    c.fillRect(port.x - portW, port.y - portH / 2, portW, portH);

    if (!charging) return;
    const mid = vec(PHONE.x + PHONE.w / 2, PORT.y);
    const k = PHONE.h * 0.3;
    const bolt = [
      vec(0.12, 1), vec(-0.42, -0.08), vec(-0.02, -0.08), vec(-0.16, -1), vec(0.42, 0.14), vec(0.02, 0.14),
    ].map((b) => add(mid, mul(b, k)));
    polygon(bolt, p.accent, p.accent, 1);
  }

  function drawCharger(charging: boolean) {
    const c = ctx!;
    const p = palette!;
    box(CHARGER.x, 0, CHARGER.w, CHARGER.h, 0.01, p.bg, p.ink, 0.9);
    const socket = S(SOCKET);
    c.fillStyle = p.ink;
    c.globalAlpha = 0.85;
    c.fillRect(socket.x - px(0.009), socket.y - 1, px(0.018), px(0.006) + 1);
    const led = S(vec(CHARGER.x + CHARGER.w - 0.018, CHARGER.h / 2));
    c.beginPath();
    c.arc(led.x, led.y, 2.25, 0, Math.PI * 2);
    c.fillStyle = charging ? p.accent : p.faint;
    c.globalAlpha = 1;
    c.fill();
  }

  function polyline(points: Vec2[]) {
    const c = ctx!;
    c.beginPath();
    points.forEach((wp, i) => {
      const sp = S(wp);
      if (i === 0) c.moveTo(sp.x, sp.y);
      else c.lineTo(sp.x, sp.y);
    });
  }

  function drawCandidates(candidates: Vec2[][], progress: number) {
    const c = ctx!;
    const p = palette!;
    const alpha = lerp(0.22, 0.5, progress);
    for (const path of candidates) {
      stroke(p.accent, 1, alpha);
      polyline(path);
      c.stroke();
      const end = S(path[path.length - 1]);
      c.fillStyle = p.accent;
      c.beginPath();
      c.arc(end.x, end.y, 1.75, 0, Math.PI * 2);
      c.fill();
    }
    if (layout!.compact) return;
    const tip = S(candidates[0][candidates[0].length - 1]);
    const step = Math.min(DENOISE_STEPS, 1 + Math.floor(progress * DENOISE_STEPS));
    label(`k=${CANDIDATES} · denoise ${String(step).padStart(2, "0")}/${DENOISE_STEPS}`, tip.x + 12, tip.y - 12, p.accent, 0.9);
  }

  function drawCommittedPath(path: Vec2[], progress: number) {
    const c = ctx!;
    const p = palette!;
    const from = Math.floor(progress * (path.length - 1));
    stroke(p.accent, 1.25, 0.6);
    c.setLineDash([4, 5]);
    polyline(path.slice(from));
    c.stroke();
    c.setLineDash([]);
    const end = S(path[path.length - 1]);
    stroke(p.accent, 1, 0.8);
    c.beginPath();
    c.arc(end.x, end.y, 5, 0, Math.PI * 2);
    c.moveTo(end.x - 9, end.y);
    c.lineTo(end.x + 9, end.y);
    c.moveTo(end.x, end.y - 9);
    c.lineTo(end.x, end.y + 9);
    c.stroke();
  }

  function drawTrail(points: Vec2[]) {
    const c = ctx!;
    const p = palette!;
    for (let i = 1; i < points.length; i++) {
      const a = S(points[i - 1]);
      const b = S(points[i]);
      if (Math.hypot(a.x - b.x, a.y - b.y) < 0.2) continue;
      stroke(p.muted, 1.25, 0.55 * (1 - i / points.length));
      c.beginPath();
      c.moveTo(a.x, a.y);
      c.lineTo(b.x, b.y);
      c.stroke();
    }
  }

  function capsule(a: Vec2, b: Vec2, r: number) {
    const c = ctx!;
    const p = palette!;
    const sa = S(a);
    const sb = S(b);
    const ang = Math.atan2(sb.y - sa.y, sb.x - sa.x);
    c.beginPath();
    c.arc(sa.x, sa.y, r, ang + Math.PI / 2, ang + (3 * Math.PI) / 2);
    c.arc(sb.x, sb.y, r, ang - Math.PI / 2, ang + Math.PI / 2);
    c.closePath();
    c.fillStyle = p.bg;
    c.globalAlpha = 1;
    c.fill();
    stroke(p.ink, 1.25, 0.9);
    c.stroke();

    stroke(p.faint, 0.75, 0.9);
    c.setLineDash([7, 3, 1.5, 3]);
    c.beginPath();
    c.moveTo(sa.x, sa.y);
    c.lineTo(sb.x, sb.y);
    c.stroke();
    c.setLineDash([]);
  }

  function polygon(points: Vec2[], fill: string, line: string, alpha = 1) {
    const c = ctx!;
    c.beginPath();
    points.forEach((wp, i) => {
      const sp = S(wp);
      if (i === 0) c.moveTo(sp.x, sp.y);
      else c.lineTo(sp.x, sp.y);
    });
    c.closePath();
    c.fillStyle = fill;
    c.globalAlpha = 1;
    c.fill();
    stroke(line, 1.25, alpha);
    c.stroke();
  }

  function drawPedestal(base: Vec2) {
    const p = palette!;
    polygon(
      [vec(base.x - 0.07, 0), vec(base.x + 0.07, 0), vec(base.x + 0.038, base.y), vec(base.x - 0.038, base.y)],
      p.bg,
      p.ink,
      0.9,
    );
  }

  function drawLinks(arm: ArmState) {
    const n = arm.joints.length;
    for (let i = 0; i < n - 1; i++) {
      const t = i / (n - 1);
      capsule(arm.joints[i], arm.joints[i + 1], px(lerp(0.02, 0.011, t)));
    }
  }

  const rect = (center: Vec2, dir: number, along: number, across: number): Vec2[] => {
    const u = polar(1, dir);
    const n = polar(1, dir + Math.PI / 2);
    const hu = mul(u, along / 2);
    const hn = mul(n, across / 2);
    return [
      add(add(center, hu), hn),
      add(add(center, hu), mul(hn, -1)),
      add(add(center, mul(hu, -1)), mul(hn, -1)),
      add(add(center, mul(hu, -1)), hn),
    ];
  };

  /** A slack cable from the back of the boot down to the charger socket. */
  function drawCable(tool: Vec2, dir: number) {
    const c = ctx!;
    const start = S(add(tool, polar(-PLUG.boot, dir)));
    const exit = add(tool, polar(-PLUG.boot - 0.03, dir));
    const c1 = S(vec(exit.x, Math.max(0.012, exit.y - 0.1)));
    const c2 = S(vec(SOCKET.x, SOCKET.y + 0.09));
    const end = S(SOCKET);
    c.beginPath();
    c.moveTo(start.x, start.y);
    c.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, end.x, end.y);
    stroke(palette!.ink, 2, 0.8);
    c.stroke();
  }

  function drawPlug(tool: Vec2, dir: number, labelled: boolean) {
    const p = palette!;
    const span = (from: number, to: number, across: number) =>
      rect(add(tool, polar((from + to) / 2, dir)), dir, to - from, across);
    polygon(span(-PLUG.boot, -PLUG.back, PLUG.thick * 0.6), p.bg, p.ink, 0.95);
    polygon(span(-PLUG.back, PLUG.front, PLUG.thick), p.ink, p.ink, 1);
    polygon(span(PLUG.front, PLUG.tip, PLUG.tipThick), p.accent, p.accent, 1);
    if (!labelled || layout!.compact) return;
    const at = S(add(tool, polar(PLUG.tip, dir)));
    label("USB-C", at.x, at.y - px(PLUG.thick / 2) - 8, p.muted, 0.9, "left");
  }

  function drawGripper(arm: ArmState & { open: number }) {
    const p = palette!;
    const dir = arm.phi;
    const u = polar(1, dir);
    const n = polar(1, dir + Math.PI / 2);
    const flange = arm.joints[arm.joints.length - 1];
    const palm = add(arm.tool, mul(u, -GRIPPER.palm));
    capsule(flange, palm, px(0.01));
    const gap = lerp(GRIPPER.closed, GRIPPER.open, arm.open);
    const span = gap + GRIPPER.finger;
    polygon(rect(palm, dir, 0.012, span * 2 + 0.004), p.bg, p.ink, 0.9);
    const length = GRIPPER.palm + GRIPPER.tip;
    for (const side of [1, -1]) {
      const mid = add(add(palm, mul(u, length / 2 + 0.003)), mul(n, side * (gap + GRIPPER.finger / 2)));
      polygon(rect(mid, dir, length - 0.006, GRIPPER.finger), p.bg, p.ink, 0.9);
    }
  }

  function drawJoints(arm: ArmState) {
    const c = ctx!;
    const p = palette!;
    arm.joints.forEach((pt, i) => {
      const s = S(pt);
      const r = lerp(0.026, 0.014, i / (arm.joints.length - 1));
      c.beginPath();
      c.arc(s.x, s.y, px(r), 0, Math.PI * 2);
      c.fillStyle = p.bg;
      c.globalAlpha = 1;
      c.fill();
      stroke(p.ink, 1.25, 0.9);
      c.stroke();
      c.beginPath();
      c.arc(s.x, s.y, 1.6, 0, Math.PI * 2);
      c.fillStyle = p.ink;
      c.fill();
    });
  }

  function setFont() {
    const c = ctx!;
    c.font = `500 10px ${palette!.mono}`;
    if ("letterSpacing" in c) c.letterSpacing = "0.8px";
  }

  function label(text: string, x: number, y: number, color: string, alpha = 1, align: CanvasTextAlign = "left") {
    const c = ctx!;
    setFont();
    c.textAlign = align;
    c.textBaseline = "alphabetic";
    c.fillStyle = color;
    c.globalAlpha = alpha;
    c.fillText(text, x, y);
  }

  function drawHud(frame: Frame) {
    const c = ctx!;
    const p = palette!;
    const l = layout!;
    const left = S(vec(-TABLE_HALF, WORLD.top)).x;
    const right = S(vec(TABLE_HALF, WORLD.top)).x;
    const y = l.origin.y - WORLD.top * l.scale - (l.compact ? 14 : 22);

    setFont();
    const names = STAGES.map((s, i) => (l.compact ? s.toUpperCase() : `${String(i + 1).padStart(2, "0")} ${s.toUpperCase()}`));
    const widths = names.map((n) => c.measureText(n).width);
    const total = widths.reduce((a, b) => a + b, 0);
    const gap = Math.max(10, (right - left - total) / (names.length - 1));
    let x = left;
    names.forEach((name, i) => {
      const state = i < frame.stage ? p.muted : i === frame.stage ? p.ink : p.faint;
      label(name, x, y, state, i === frame.stage ? 1 : 0.9);
      if (i === frame.stage) {
        stroke(p.accent, 1.5, 1);
        c.beginPath();
        c.moveTo(x, y + 8);
        c.lineTo(x + widths[i], y + 8);
        c.stroke();
      }
      x += widths[i] + gap;
    });
    stroke(p.line, 1, 0.8);
    c.beginPath();
    c.moveTo(left, y + 8);
    c.lineTo(right, y + 8);
    c.stroke();

    if (l.compact) return;
    for (const id of ARM_ORDER) {
      const arm = frame.arms[id];
      const base = S(arm.joints[0]);
      const side = id === "left" ? -1 : 1;
      label(`${arm.axes}-DOF`, base.x + side * 42, base.y + 2, p.muted, 0.9, side < 0 ? "right" : "left");
    }
  }

  return { resize, refreshPalette, draw };
}

function smoothstep(a: number, b: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}
