import Image from "next/image";
import type { MediaRef } from "@/content/types";
import { cn } from "@/lib/cn";

interface MarkProps {
  media: MediaRef;
  /** Set height here; width follows the logo's aspect ratio. */
  className?: string;
  /** Use when the organization name is already written next to the mark. */
  decorative?: boolean;
}

export function Mark({ media, className, decorative = false }: MarkProps) {
  return (
    <Image
      src={media.src}
      alt={decorative ? "" : media.alt}
      width={media.width}
      height={media.height}
      className={cn(
        "w-auto object-contain",
        media.monochrome && "dark:invert",
        media.darkPlate && "dark:rounded-[5px] dark:bg-white dark:p-0.5",
        className,
      )}
    />
  );
}
