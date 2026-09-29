import type { NavItem, SectionCopy } from "./types.ts";

/** Order matches the page. `contact` is dropped at render time while no channel is approved. */
export const navItems: NavItem[] = [
  { id: "research", label: "Research" },
  { id: "writing", label: "Papers" },
  { id: "projects", label: "Projects" },
  { id: "engineering", label: "Systems" },
  { id: "community", label: "Lumina" },
  { id: "contact", label: "Contact" },
];

export const sections = {
  research: {
    eyebrow: "Research",
    title: "Research directions",
    intro:
      "My work sits where learning meets hardware: how robots acquire manipulation skills from data, how simulation can generate that data at scale, and how those skills survive the jump to the real world.",
  },
  projects: {
    eyebrow: "Projects",
    title: "Selected work",
    intro: "Selected work across simulation, dexterous hardware, and perception.",
  },
  engineering: {
    eyebrow: "Engineering",
    title: "Hardware & systems",
    intro:
      "Research on robots is only as good as the systems underneath it. This is the hardware, simulation, and teaching infrastructure I’ve built or run.",
  },
  writing: {
    eyebrow: "Writing",
    title: "Papers & recognition",
  },
  community: {
    eyebrow: "Community",
    title: "Lumina Embodied AI Community",
  },
  contact: {
    eyebrow: "Contact",
    title: "Open to research collaboration.",
  },
} satisfies Record<string, SectionCopy>;

export const footer = {
  place: "Hong Kong / Shenzhen",
  updated: "2026-09",
};
