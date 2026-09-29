import type { ReactNode } from "react";
import Link from "next/link";
import type { LinkRef } from "@/content/types";
import { cn } from "@/lib/cn";

const isExternal = (href: string) => /^https?:\/\//.test(href);

/** In-page link chip, e.g. to a project card. */
export function AnchorChip({ href, children }: { href: `#${string}`; children: ReactNode }) {
  return (
    <a
      href={href}
      className="text-body-sm inline-flex min-h-8 items-center gap-1.5 rounded-full border border-line px-3 text-secondary transition-colors duration-150 hover:border-line-strong hover:text-ink"
    >
      {children}
      <span aria-hidden="true" className="text-muted">
        →
      </span>
    </a>
  );
}

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "text";
  className?: string;
}

export function ButtonLink({ href, children, variant = "primary", className }: ButtonLinkProps) {
  const external = isExternal(href);
  const classes = cn(
    "inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium",
    variant === "primary" && "rounded-full bg-ink px-5 text-bg transition-opacity duration-200 hover:opacity-85",
    variant === "text" && "link-underline px-1 text-ink",
    className,
  );
  const content = (
    <>
      {children}
      <span aria-hidden="true">{external ? "↗" : "→"}</span>
    </>
  );
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={classes}>
      {content}
    </a>
  );
}

/** Horizontal list of real links. Returns null when empty: no disabled placeholders. */
export function LinkRow({ links, className }: { links: LinkRef[]; className?: string }) {
  if (links.length === 0) return null;
  return (
    <ul className={cn("flex flex-wrap gap-x-5 gap-y-2", className)}>
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            {...(isExternal(link.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="link-underline text-sm font-medium text-ink hover:text-accent"
          >
            {link.label} <span aria-hidden="true">{isExternal(link.href) ? "↗" : "→"}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
