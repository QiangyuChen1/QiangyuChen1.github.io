import type { ContactChannels, LinkRef } from "@/content/types";

/** Approved public channels only. The personal Gmail is excluded unless explicitly allowed. */
export function approvedChannels(contact: ContactChannels): { email?: string; links: LinkRef[]; qr: LinkRef[] } {
  const personal = contact.email !== undefined && /gmail\.com$/i.test(contact.email);
  const email = contact.email && (!personal || contact.allowPersonalEmail) ? contact.email : undefined;
  const links = [contact.github, contact.scholar, contact.linkedin, contact.x].filter(
    (l): l is LinkRef => l !== undefined,
  );
  const qr = [contact.wechat, contact.rednote].filter((l): l is LinkRef => l !== undefined);
  return { email, links, qr };
}

export function hasContactChannels(contact: ContactChannels): boolean {
  const { email, links, qr } = approvedChannels(contact);
  return email !== undefined || links.length > 0 || qr.length > 0;
}
