"use client";

import dynamic from "next/dynamic";

/** The canvas bundle loads after first paint. The sized shell in `Hero` holds the layout. */
export const HeroCanvas = dynamic(() => import("./HeroScene").then((m) => m.HeroScene), { ssr: false });
