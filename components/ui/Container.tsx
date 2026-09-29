import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1408px] px-5 sm:px-10 lg:px-16", className)}>{children}</div>;
}

/** 4 / 8 / 12 column grid with the spec's gutters. */
export function Grid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("grid grid-cols-4 gap-x-4 sm:grid-cols-8 sm:gap-x-5 lg:grid-cols-12 lg:gap-x-6", className)}>
      {children}
    </div>
  );
}
