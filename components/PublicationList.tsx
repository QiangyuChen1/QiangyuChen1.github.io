"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface PublicationListProps<F extends string> {
  filters: readonly F[];
  items: Array<{ id: string; group?: F; node: ReactNode }>;
  allLabel?: string;
}

/** Filter pills over server-rendered rows. Without JS every row stays visible. */
export function PublicationList<F extends string>({ filters, items, allLabel = "All" }: PublicationListProps<F>) {
  const [active, setActive] = useState<F | null>(null);
  const visible = active ? items.filter((i) => i.group === active) : items;
  const options: Array<{ key: F | null; label: string }> = [
    { key: null, label: allLabel },
    ...filters.map((f) => ({ key: f, label: f })),
  ];

  return (
    <div>
      <div role="group" aria-label="Filter papers" className="mb-6 flex flex-wrap gap-2">
        {options.map((o) => {
          const pressed = active === o.key;
          return (
            <button
              key={o.label}
              type="button"
              aria-pressed={pressed}
              onClick={() => setActive(o.key)}
              className={cn(
                "text-label inline-flex h-8 items-center rounded-full border px-3.5 transition-colors duration-150",
                pressed ? "border-ink bg-ink text-bg" : "border-line-strong text-muted hover:text-ink",
              )}
            >
              {o.label}
            </button>
          );
        })}
      </div>
      <ul className="border-b border-line">
        {visible.map((i) => (
          <li key={i.id} className="border-t border-line">
            {i.node}
          </li>
        ))}
      </ul>
    </div>
  );
}
