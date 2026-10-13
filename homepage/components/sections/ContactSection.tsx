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

const channelEmoji: Record<string, string> = {
  Email: "📧",
  WeChat: "💬",
  Rednote: "📕",
};

/** Rendered only when at least one approved channel exists (see app/page.tsx). */
export function ContactSection({ copy, contact }: ContactSectionProps) {
  const { email, links, qr } = approvedChannels(contact);

  return (
    <Section id="contact">
      <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
        <Reveal>
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h2 id="contact-title" className="text-h2 mt-4 text-balance text-ink">
            {copy.title}
          </h2>
          <p className="text-lead mt-6 text-secondary">{contact.intro}</p>
          <LinkRow links={links} className="mt-8" />
        </Reveal>

        <Reveal index={1} className="min-w-0">
          <ul className="grid h-full gap-3 sm:grid-cols-2">
            {email && (
              <li className="sm:col-span-2">
                <a
                  href={`mailto:${email}`}
                  className="flex h-full min-h-24 items-center gap-3 rounded-2xl border border-line bg-elevated px-5 py-4 transition-colors duration-150 hover:border-line-strong"
                >
                  <span aria-hidden="true" className="text-[1.35rem] leading-none">
                    {channelEmoji.Email}
                  </span>
                  <span className="min-w-0">
                    <span className="text-label text-muted">Email</span>
                    <span className="mt-1 block text-[1.0625rem] font-medium break-all text-ink">{email}</span>
                  </span>
                </a>
              </li>
            )}
            {qr.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full min-h-24 items-center gap-3 rounded-2xl border border-line bg-elevated px-5 py-4 transition-colors duration-150 hover:border-line-strong"
                >
                  {qrIcon[item.label] && (
                    <Image src={qrIcon[item.label]} alt="" width={28} height={28} className="size-7 shrink-0" />
                  )}
                  <span className="min-w-0">
                    <span className="block font-medium text-ink">
                      <span aria-hidden="true" className="mr-1.5">
                        {channelEmoji[item.label]}
                      </span>
                      {item.label}
                    </span>
                    <span className="text-caption text-muted">QR code</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
