import Image from "next/image";
import type { ContactChannels, SectionCopy } from "@/content/types";
import { approvedChannels } from "@/lib/contact";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { LinkRow } from "@/components/ui/Links";

interface ContactSectionProps {
  copy: SectionCopy;
  contact: ContactChannels;
}

const qrIcon: Record<string, string> = {
  WeChat: "/icons/wechat.svg",
  Rednote: "/icons/xiaohongshu.svg",
};

/** Rendered only when at least one approved channel exists (see app/page.tsx). */
export function ContactSection({ copy, contact }: ContactSectionProps) {
  const { email, links, qr } = approvedChannels(contact);

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
        {qr.length > 0 && (
          <ul className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
            {qr.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1.5 text-[13px] font-medium text-secondary transition-colors duration-150 hover:text-ink"
                >
                  {qrIcon[item.label] && (
                    <Image src={qrIcon[item.label]} alt="" width={18} height={18} className="size-[18px] shrink-0" />
                  )}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        )}
        <LinkRow links={links} className="mt-8" />
      </Reveal>
    </Section>
  );
}
