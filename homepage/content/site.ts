import type { NavItem, SectionCopy } from "./types.ts";

/** Order matches app/page.tsx. `contact` is dropped at render time while no channel is approved. */
export const navItems: NavItem[] = [
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "community", label: "Lumina" },
  { id: "contact", label: "Contact" },
];

export const sections = {
  work: {
    eyebrow: "Work",
    title: "Work directions",
    intro:
      "Three strands run through my work: the infrastructure physical robots run on, the vision that lets them perceive, and getting learned systems running on real hardware.",
  },
  projects: {
    eyebrow: "Projects",
    title: "Selected work",
    intro: "Selected work across simulation, dexterous hardware, and perception.",
  },
  experience: {
    eyebrow: "Experience",
    title: "Work experience",
    intro:
      "Research on robots is only as good as the systems underneath it. This is the hardware, simulation, and teaching infrastructure I’ve built or run.",
  },
  education: {
    eyebrow: "Education",
    title: "Education",
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
