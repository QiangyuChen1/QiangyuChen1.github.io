import type { CSSProperties } from "react";
import Image from "next/image";
import type { Profile } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Links";
import { HeroCanvas } from "@/components/visuals/HeroCanvas";

interface HeroProps {
  profile: Pick<Profile, "publicName" | "role" | "eyebrow" | "statement" | "affiliationLine" | "signals">;
  actions: Array<{ label: string; href: string }>;
}

const step = (i: number) => ({ "--i": i }) as CSSProperties;

function NameLockup({ name }: { name: string }) {
  const split = name.indexOf("（");
  const latin = split === -1 ? name : name.slice(0, split);
  const native = split === -1 ? null : name.slice(split);
  return (
    <h1
      id="top-title"
      className="flex min-w-0 flex-wrap items-baseline gap-x-2 font-display text-[clamp(2rem,4.8vw,3.5rem)] leading-[1.05] font-normal tracking-[-0.035em] text-ink"
    >
      <span className="whitespace-nowrap">{latin}</span>
      {native && (
        <span className="whitespace-nowrap text-[0.55em] leading-none font-light tracking-[0.02em] text-muted">
          {native}
        </span>
      )}
    </h1>
  );
}

export function Hero({ profile, actions }: HeroProps) {
  const [primary, ...secondary] = actions;
  const eyebrowItems = profile.eyebrow.split(" · ");
  return (
    <section
      id="top"
      aria-labelledby="top-title"
      className="relative flex flex-col overflow-hidden pt-[var(--nav-offset)] lg:min-h-[36rem]"
    >
      <Container className="relative z-10 flex flex-1 flex-col">
        <div className="grid flex-1 grid-cols-4 items-center gap-x-4 gap-y-12 py-12 sm:grid-cols-8 sm:gap-x-5 lg:grid-cols-12 lg:gap-x-6 lg:py-16">
          <div className="col-span-4 sm:col-span-8 lg:col-span-7">
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
            <div className="hero-in mt-4 flex items-center gap-3 sm:gap-4" style={step(1)}>
              <Image
                src="/portrait.jpg"
                alt=""
                width={480}
                height={563}
                priority
                className="size-12 shrink-0 rounded-full object-cover ring-1 ring-line sm:size-14"
              />
              <NameLockup name={profile.publicName} />
            </div>
            <p className="hero-in mt-4 text-[14.5px] leading-[1.3] font-medium tracking-[-0.015em] text-ink" style={step(2)}>
              {profile.role}
            </p>
            <p className="hero-in mt-4 max-w-[66ch] text-[14px] leading-[1.65] text-secondary" style={step(3)}>
              {profile.statement}
            </p>

            <div className="hero-in mt-5" style={step(4)}>
              <h2 className="sr-only">Selected results</h2>
              <ul className="space-y-2 border-l border-line-strong pl-4">
                {profile.signals.map((s) => (
                  <li key={s.href} className="text-[13.5px] leading-[1.5]">
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

            <div className="hero-in mt-6 flex flex-wrap items-center gap-x-6 gap-y-3" style={step(5)}>
              {primary && <ButtonLink href={primary.href}>{primary.label}</ButtonLink>}
              {secondary.map((a) => (
                <ButtonLink key={a.href} href={a.href} variant="text">
                  {a.label}
                </ButtonLink>
              ))}
            </div>
            {profile.affiliationLine && (
              <p className="hero-in text-caption mt-5 text-muted" style={step(5)}>
                {profile.affiliationLine}
              </p>
            )}
          </div>
        </div>
      </Container>
      <div className="pointer-events-none relative h-72 w-full sm:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-1/2">
        <HeroCanvas className="absolute inset-0 size-full" />
      </div>
    </section>
  );
}
