import type { CSSProperties } from "react";
import type { Profile } from "@/content/types";
import { Container } from "./ui/Container";
import { ButtonLink } from "./ui/Links";
import { HeroVisual } from "./HeroVisual";

interface HeroProps {
  profile: Pick<Profile, "publicName" | "role" | "eyebrow" | "statement" | "affiliationLine" | "signals">;
  actions: Array<{ label: string; href: string }>;
}

const step = (i: number) => ({ "--i": i }) as CSSProperties;

export function Hero({ profile, actions }: HeroProps) {
  const [primary, ...secondary] = actions;
  const eyebrowItems = profile.eyebrow.split(" · ");
  return (
    <section
      id="top"
      aria-labelledby="top-title"
      className="relative flex min-h-[min(100svh,920px)] flex-col pt-[var(--nav-h)]"
    >
      <Container className="flex flex-1 flex-col">
        <div className="grid flex-1 grid-cols-4 items-center gap-x-4 gap-y-12 py-12 sm:grid-cols-8 sm:gap-x-5 lg:grid-cols-12 lg:gap-x-6 lg:py-16">
          <div className="col-span-4 sm:col-span-8 lg:col-span-6">
            <p className="hero-in text-label flex flex-wrap gap-x-2 text-muted" style={step(0)}>
              {eyebrowItems.map((item, i) => (
                <span key={item} className="whitespace-nowrap">
                  {i > 0 && (
                    <span aria-hidden="true" className="mr-2">
                      ·
                    </span>
                  )}
                  {item}
                </span>
              ))}
            </p>
            <h1 id="top-title" className="hero-in text-display mt-6 max-w-[22ch] text-ink" style={step(1)}>
              {profile.publicName}
            </h1>
            <p className="hero-in text-h3 mt-4 text-secondary" style={step(2)}>
              {profile.role}
            </p>
            <p className="hero-in text-lead mt-6 max-w-[40ch] text-secondary" style={step(3)}>
              {profile.statement}
            </p>

            <div className="hero-in mt-8" style={step(4)}>
              <h2 className="sr-only">Selected results</h2>
              <ul className="space-y-2 border-l border-line-strong pl-4">
                {profile.signals.map((s) => (
                  <li key={s.href} className="text-body-sm">
                    <a href={s.href} className="link-underline text-secondary transition-colors duration-150 hover:text-ink">
                      {s.work}
                      <span aria-hidden="true" className="mx-2 text-faint">
                        —
                      </span>
                      <span className="sr-only">: </span>
                      <span className="font-medium text-ink">{s.detail}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hero-in mt-10 flex flex-wrap items-center gap-x-6 gap-y-3" style={step(5)}>
              {primary && <ButtonLink href={primary.href}>{primary.label}</ButtonLink>}
              {secondary.map((a) => (
                <ButtonLink key={a.href} href={a.href} variant="text">
                  {a.label}
                </ButtonLink>
              ))}
            </div>
            {profile.affiliationLine && (
              <p className="hero-in text-caption mt-8 text-muted" style={step(5)}>
                {profile.affiliationLine}
              </p>
            )}
          </div>
          <div className="col-span-4 sm:col-span-8 lg:col-span-6">
            <HeroVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}
