import type { ContactChannels, SectionCopy } from "@/content/types";
import { approvedChannels } from "@/lib/contact";
import { Section } from "./ui/Section";
import { Eyebrow } from "./ui/Eyebrow";
import { Reveal } from "./ui/Reveal";
import { LinkRow } from "./ui/Links";

interface ContactSectionProps {
  copy: SectionCopy;
  contact: ContactChannels;
}

/** Rendered only when at least one approved channel exists (see app/page.tsx). */
export function ContactSection({ copy, contact }: ContactSectionProps) {
  const { email, links } = approvedChannels(contact);

  return (
    <Section id="contact">
      <Reveal className="max-w-[68ch]">
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        <h2 id="contact-title" className="text-h2 mt-4 max-w-[32ch] text-balance text-ink">
          {copy.title}
        </h2>
        <p className="text-lead mt-6 text-secondary">{contact.intro}</p>

        {email && (
          <a href={`mailto:${email}`} className="text-h3 link-underline mt-10 inline-block text-ink hover:text-accent">
            {email}
          </a>
        )}
        <LinkRow links={links} className="mt-8" />
      </Reveal>
    </Section>
  );
}
