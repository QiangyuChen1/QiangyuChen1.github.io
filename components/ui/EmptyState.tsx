import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function EmptyState({ title, children, className }: { title?: string; children?: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-xl border border-dashed border-line-strong px-5 py-6", className)}>
      {title && <p className="text-body-sm font-medium text-ink">{title}</p>}
      {children && <p className="text-body-sm mt-1 text-muted">{children}</p>}
    </div>
  );
}
