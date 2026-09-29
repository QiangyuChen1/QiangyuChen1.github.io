import type { ReactNode } from "react";

export function Field({ label, aside, children }: { label: string; aside?: ReactNode; children: ReactNode }) {
  return (
    <div className="border-t border-line pt-4">
      <dt className="flex items-center gap-3">
        <span className="text-xs font-medium text-muted">{label}</span>
        {aside}
      </dt>
      <dd className="text-body-sm mt-1.5 text-secondary">{children}</dd>
    </div>
  );
}
