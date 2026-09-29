"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import type { LinkRef, NavItem } from "@/content/types";
import { useActiveSection } from "@/lib/hooks/useActiveSection";
import { cn } from "@/lib/cn";

interface NavbarProps {
  brand: string;
  items: NavItem[];
  external?: LinkRef[];
}

const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

function BrandMark({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image
        src="/portrait.jpg"
        alt=""
        width={480}
        height={563}
        className="size-8 rounded-full object-cover ring-1 ring-line"
      />
      <span className="font-display text-sm font-medium tracking-[-0.01em] text-ink sm:text-base">{name}</span>
    </span>
  );
}

export function Navbar({ brand, items, external = [] }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(items.map((i) => i.id));
  const menuButton = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) menuButton.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    sheet.current?.querySelector<HTMLElement>("a, button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !sheet.current) return;
      const focusable = sheet.current.querySelectorAll<HTMLElement>("a, button");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-[var(--nav-offset)] border-b pt-[var(--safe-top)] transition-[background-color,border-color,backdrop-filter] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled ? "border-line bg-elevated/85 backdrop-blur-md" : "border-transparent bg-bg/70 backdrop-blur-md",
        )}
      >
        <nav aria-label="Primary" className="mx-auto flex h-full max-w-[1408px] items-center justify-between px-5 sm:px-10 lg:px-16">
          <Link
            href="/#top"
            className="-ml-1 inline-flex min-h-11 items-center px-1"
          >
            <BrandMark name={brand} />
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {items.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <Link
                    href={`/#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative inline-flex min-h-11 items-center text-sm font-medium transition-colors duration-150",
                      isActive ? "text-ink" : "text-muted hover:text-ink",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-0 bottom-[7px] h-px origin-left bg-accent transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        isActive ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
            {external.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-8 items-center rounded-full border border-line-strong px-3.5 text-sm font-medium text-ink transition-colors duration-150 hover:border-ink"
                >
                  {link.label} <span aria-hidden="true">&nbsp;↗</span>
                </a>
              </li>
            ))}
          </ul>

          <button
            ref={menuButton}
            type="button"
            className="-mr-2 inline-flex min-h-11 items-center px-2 text-sm font-medium text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(true)}
          >
            Menu
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            ref={sheet}
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-0 z-[60] flex flex-col bg-bg lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_IN_OUT }}
          >
            <div className="flex h-[var(--nav-offset)] items-center justify-between px-5 pt-[var(--safe-top)] sm:px-10">
              <BrandMark name={brand} />
              <button
                type="button"
                className="-mr-2 inline-flex min-h-11 items-center px-2 text-sm font-medium text-ink"
                onClick={() => close()}
              >
                Close
              </button>
            </div>
            <ul className="flex flex-col gap-6 px-5 pt-10 sm:px-10">
              {items.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/#${item.id}`}
                    className={cn("text-h3 inline-flex min-h-11 items-center", active === item.id ? "text-ink" : "text-secondary")}
                    onClick={() => close(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {external.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-h3 inline-flex min-h-11 items-center text-secondary">
                    {link.label} <span aria-hidden="true">&nbsp;↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
