import type { ContactChannels, LinkRef } from "@/content/types";

/** Approved public channels only. The personal Gmail is excluded unless explicitly allowed. */
export function approvedChannels(contact: ContactChannels): { email?: string; links: LinkRef[] } {
  const personal = contact.email !== undefined && /gmail\.com$/i.test(contact.email);
  const email = contact.email && (!personal || contact.allowPersonalEmail) ? contact.email : undefined;
  const links = [contact.github, contact.scholar, contact.linkedin, contact.x].filter(
    (l): l is LinkRef => l !== undefined,
  );
  return { email, links };
}

export function hasContactChannels(contact: ContactChannels): boolean {
  const { email, links } = approvedChannels(contact);
  return email !== undefined || links.length > 0;
}
