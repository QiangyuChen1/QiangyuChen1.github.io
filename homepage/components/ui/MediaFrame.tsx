import Image from "next/image";
import type { MediaRef } from "@/content/types";
import { cn } from "@/lib/cn";
import { Mark } from "./Mark";

interface MediaFrameProps {
  media: MediaRef;
  /** CSS aspect-ratio of the frame. Every card uses the same one so the grid lines up. */
  ratio?: string;
  sizes?: string;
  className?: string;
}

/** Fixed-ratio plate: figures are letterboxed (never cropped), logos sit centered. */
export function MediaFrame({ media, ratio = "16 / 10", sizes = "(min-width: 768px) 40vw, 100vw", className }: MediaFrameProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-xl bg-subtle", className)} style={{ aspectRatio: ratio }}>
      {media.presentation === "logo" ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Mark media={media} className="h-20 max-w-[55%] lg:h-24" />
        </div>
      ) : (
        <Image src={media.src} alt={media.alt} fill sizes={sizes} className="card-media object-contain p-3 sm:p-4" />
      )}
    </div>
  );
}
