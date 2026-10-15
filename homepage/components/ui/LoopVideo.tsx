"use client";

import { useEffect, useRef } from "react";

interface LoopVideoProps {
  src: string;
  poster: string;
  alt: string;
  className?: string;
}

/** Muted loop, same idea as a paper page: a short file, no player chrome. It stays a still if motion is reduced, and it does not download until the card is near the screen. */
export function LoopVideo({ src, poster, alt, className }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          node.pause();
          return;
        }
        if (node.getAttribute("src") !== src) {
          node.src = src;
          node.load();
        }
        node.play().catch(() => {});
      },
      { rootMargin: "400px 0px", threshold: 0.01 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={alt}
      className={className}
    />
  );
}
