"use client";

import { useEffect, useRef } from "react";

/**
 * The collage stays off the first load. It starts only after the page load
 * event, so the font, portrait, and script are not competing with it.
 */
export function AlbumField() {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const arm = () => {
      const source = img.parentElement?.querySelector("source");
      if (source?.dataset.srcset) source.srcset = source.dataset.srcset;
      const show = () => img.classList.add("is-in");
      img.addEventListener("load", show, { once: true });
      img.src = "/background/albums.webp";
      if (img.complete && img.naturalWidth > 0) show();
    };

    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });
    return () => window.removeEventListener("load", arm);
  }, []);

  return (
    <div className="album-field" aria-hidden="true">
      <picture>
        <source media="(max-width: 1023px)" data-srcset="/background/albums-narrow.webp" />
        <img ref={imgRef} alt="" width={1920} height={1200} decoding="async" />
      </picture>
      <noscript>
        <img src="/background/albums.webp" alt="" width={1920} height={1200} />
      </noscript>
    </div>
  );
}
