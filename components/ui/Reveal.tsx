"use client";

import type { ReactNode } from "react";
import { m } from "framer-motion";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Position among siblings; stagger is 70ms, capped at 6 items. */
  index?: number;
  as?: "div" | "li";
}

/**
 * One-shot fade + 16px rise when ~15% is in view.
 * `initial` never depends on client-only state, so server and first client render match.
 * Reduced motion drops the transform via CSS ([data-reveal] in globals.css).
 */
export function Reveal({ children, className, index = 0, as = "div" }: RevealProps) {
  const Component = as === "li" ? m.li : m.div;
  return (
    <Component
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay: Math.min(index, 5) * 0.07 }}
    >
      {children}
    </Component>
  );
}
