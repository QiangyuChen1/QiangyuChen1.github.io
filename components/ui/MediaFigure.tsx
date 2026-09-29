import Image from "next/image";
import type { MediaRef } from "@/content/types";

export function MediaFigure({ media, caption }: { media: MediaRef; caption?: string }) {
  return (
    <figure>
      <div className="overflow-hidden rounded-xl bg-subtle">
        <Image
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          className="card-media h-auto w-full"
        />
      </div>
      {(caption || media.credit) && (
        <figcaption className="text-caption mt-3 text-muted">
          {caption}
          {media.credit && <span className="block">Credit: {media.credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}
