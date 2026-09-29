"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { STILL_TIME } from "./hero-scene/choreography";
import { createRenderer } from "./hero-scene/render";

/**
 * Decorative canvas: a 6-axis arm braces a phone while a 7-axis arm inserts a charging
 * plug, sampling candidate trajectories before each move. Pauses offscreen; draws one
 * still frame under reduced motion.
 */
export function HeroScene({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const renderer = createRenderer(canvas);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dark = window.matchMedia("(prefers-color-scheme: dark)");
    let raf = 0;
    let visible = true;
    let last = 0;
    let t = 0;

    const paint = () => renderer.draw(reduce.matches ? STILL_TIME : t);
    const loop = (now: number) => {
      t += Math.min(0.05, (now - last) / 1000);
      last = now;
      paint();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const start = () => {
      if (raf || reduce.matches || !visible) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const fit = () => {
      renderer.resize(host.clientWidth, host.clientHeight, Math.min(window.devicePixelRatio || 1, 2));
      paint();
    };
    const onTheme = () => {
      renderer.refreshPalette();
      paint();
    };
    const onMotion = () => {
      stop();
      paint();
      start();
    };

    renderer.refreshPalette();
    fit();
    host.dataset.ready = "";
    start();
    document.fonts?.ready.then(paint);

    const resizeObserver = new ResizeObserver(fit);
    resizeObserver.observe(host);
    const viewObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    viewObserver.observe(host);
    dark.addEventListener("change", onTheme);
    reduce.addEventListener("change", onMotion);

    return () => {
      stop();
      resizeObserver.disconnect();
      viewObserver.disconnect();
      dark.removeEventListener("change", onTheme);
      reduce.removeEventListener("change", onMotion);
    };
  }, []);

  return (
    <div ref={hostRef} aria-hidden="true" className={cn("hero-scene", className)}>
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
    </div>
  );
}
