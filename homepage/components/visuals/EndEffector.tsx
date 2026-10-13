"use client";

import { useEffect, useRef } from "react";

/** The pointer is the gripper. Wrist sits on the click point; no trailing animation. */
export function EndEffector() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    const root = document.documentElement;
    root.dataset.gripper = "";

    const place = (x: number, y: number) => {
      el.style.transform = `translate3d(${x - 16}px, ${y - 4.5}px, 0)`;
    };
    const onMove = (e: PointerEvent) => {
      el.dataset.on = "";
      place(e.clientX, e.clientY);
    };
    const onLeave = (e: PointerEvent) => {
      if (!e.relatedTarget) delete el.dataset.on;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onLeave);
    return () => {
      delete root.dataset.gripper;
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className="end-effector" aria-hidden="true">
      <svg width="32" height="36" viewBox="0 0 32 36" fill="none">
        <circle cx="16" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 6.5V14" stroke="currentColor" strokeWidth="1.5" />
        <rect x="8" y="14" width="16" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 18.5V28.5M21 18.5V28.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M11 28.5h4.2M16.8 28.5H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}
