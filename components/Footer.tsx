import type { NavItem } from "@/content/types";
import Link from "next/link";
import { Container } from "./ui/Container";

interface FooterProps {
  name: string;
  updated: string;
  place: string;
  affiliation?: string;
  links: NavItem[];
}

export function Footer({ name, updated, place, affiliation, links }: FooterProps) {
  const parts = [affiliation, place].filter((p): p is string => Boolean(p));
  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col gap-6 py-10 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-caption flex flex-wrap gap-x-2 text-muted">
          <span className="whitespace-nowrap">© 2026 {name}</span>
          {parts.map((p) => (
            <span key={p}>
              <span aria-hidden="true" className="mr-2">
                ·
              </span>
              {p}
            </span>
          ))}
          <span className="whitespace-nowrap">
            <span aria-hidden="true" className="mr-2">
              ·
            </span>
            Updated <time dateTime={updated}>{updated}</time>
          </span>
        </p>
        <nav aria-label="Footer">
          <ul className="text-caption flex flex-wrap gap-x-6 gap-y-2 text-muted">
            {links.map((l) => (
              <li key={l.id}>
                <Link href={`/#${l.id}`} className="link-underline inline-flex min-h-11 items-center hover:text-ink lg:min-h-0">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#top" className="link-underline inline-flex min-h-11 items-center text-ink lg:min-h-0">
                Top ↑
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
