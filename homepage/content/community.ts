import type { Community } from "./types.ts";
import { luminaMark } from "./figures.ts";

export const community: Community = {
  name: "Lumina Embodied AI Community",
  shortName: "Lumina",
  role: "Lead organizer",
  intro:
    "Lumina is an open community for people working on embodied AI: robot learning, manipulation, simulation, and the hardware that makes them real. It’s a place to share papers, compare notes on real-robot setups, and help newcomers find their way into the field.",
  focusAreas: ["Robot learning", "Manipulation", "Simulation", "Robot hardware"],
  mark: luminaMark,
  channels: [{ kind: "github", label: "GitHub", href: "https://github.com/Lumina-EAI" }],
  relatedTeaching: {
    text: "I also teach: technical lead for the LeRobot single- and dual-arm course at HKAGE (Parami AI).",
    evidence: ["EXP-PARAMI"],
  },
  evidence: ["COM-LUMINA"],
};
