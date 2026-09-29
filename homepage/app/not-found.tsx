import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { footer, navItems } from "@/content/site";
import { hasContactChannels } from "@/lib/contact";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Links";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: `Page not found · ${profile.publicName}`,
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <main id="main" className="flex min-h-[80svh] items-center pt-[var(--nav-offset)]">
        <Container>
          <p className="text-label text-muted">404</p>
          <h1 className="text-h1 mt-4 max-w-[22ch] text-ink">This page isn’t here.</h1>
          <p className="text-lead mt-6 max-w-[48ch] text-secondary">
            The address may have changed when the site was rebuilt. Everything lives on a single page now.
          </p>
          <div className="mt-10">
            <ButtonLink href="/">Back to the homepage</ButtonLink>
          </div>
        </Container>
      </main>
      <Footer
        name={profile.publicName}
        updated={footer.updated}
        place={footer.place}
        affiliation={profile.affiliationLine}
        links={navItems.filter((n) => n.id !== "contact" || hasContactChannels(profile.contact))}
      />
    </>
  );
}
