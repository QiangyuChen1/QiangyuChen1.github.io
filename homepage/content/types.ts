export type EvidenceId =
  | "EDU-SZU"
  | "EDU-SZU-AWD"
  | "EDU-CITYU"
  | "EDU-CITYU-AWD"
  | "EXP-XSPARK"
  | "EXP-XJGN"
  | "EXP-MMHAND"
  | "EXP-PARAMI"
  | "EXP-AGILEX"
  | "PUB-ROBOTWIN2"
  | "PUB-G3FLOW"
  | "PUB-CAPRO"
  | "PUB-AICL"
  | "CHL-MARS"
  | "RES-MERA"
  | "COM-LUMINA";

/** evidenced: needs at least one evidence ID. direction: never renders results or tools. */
export type Status = "evidenced" | "direction";

export type ToolTag =
  | "Dexterous Hands"
  | "Embedded Control"
  | "Mechanical Design"
  | "State Machines"
  | "Simulation"
  | "Domain Randomization"
  | "Synthetic Data"
  | "Bimanual Manipulation"
  | "Multimodal LLMs"
  | "3D Vision"
  | "Computer Vision"
  | "Segmentation"
  | "Foundation Models (SAM)"
  | "Calibration"
  | "ROS2"
  | "LeRobot"
  | "Policy Evaluation"
  // In the vocabulary, but no evidenced item may use them today.
  | "RL"
  | "VLA";

export type YearMonth = `${number}.${string}`;

export interface DateRange {
  start?: YearMonth;
  end?: YearMonth | "present";
  inProgress?: boolean;
}

export interface LinkRef {
  kind: "paper" | "project" | "code" | "video" | "site" | "github" | "scholar" | "email" | "other";
  label: string;
  /** Must be a real, supplied URL. Never guessed. */
  href: string;
}

export interface MediaRef {
  /** Path under public/. */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Where the image comes from. Shown under standalone figures. */
  credit?: string;
  /** Page the image was taken from, or the local original it previews (e.g. a certificate PDF). */
  href?: string;
  /** Logos sit centered and small; figures fill the frame. */
  presentation?: "figure" | "logo";
  /** Black-on-transparent marks that need inverting on dark backgrounds. */
  monochrome?: boolean;
  /** Colored marks with dark ink that can't be inverted; they sit on a white plate on dark backgrounds. */
  darkPlate?: boolean;
}

export interface ContactChannels {
  intro: string;
  /** Public address. A personal Gmail is published only when allowPersonalEmail is set. */
  email?: string;
  allowPersonalEmail?: boolean;
  github?: LinkRef;
  scholar?: LinkRef;
  linkedin?: LinkRef;
  x?: LinkRef;
}

export interface Profile {
  publicName: "Qiangyu Chen（陈锵宇）";
  legalName: "Qiangyu Chen";
  legalNameNative: "陈锵宇";
  role: "Embodied AI Researcher";
  eyebrow: string;
  statement: string;
  affiliationLine?: string;
  /** Current employer, for structured data. */
  worksFor?: { name: string; url?: string };
  /** Hero proof list: the work in one weight, its venue or honor in another. Max 3. */
  signals: Array<{ work: string; detail: string; href: `#${string}`; evidence: EvidenceId[] }>;
  interests: string[];
  contact: ContactChannels;
  seo: { title: string; description: string; canonical: "https://qiangyuchen1.github.io/" };
}

export type WorkDirectionId = "real-robot-infra" | "computer-vision" | "real-robot-deployment";

export interface WorkDirection {
  id: WorkDirectionId;
  title: string;
  summary: string;
  /** A figure from the work itself, shown at the top of the card. */
  media: MediaRef;
  /** Max 2, shown as chips. */
  relatedProjects: string[];
  /** Short venue, organization, or outcome strings at the foot of the card (max 2). */
  signals?: string[];
  evidence: EvidenceId[];
  order: number;
}

export interface Project {
  id: string;
  title: string;
  /** Venue, role, or organization line under the title. */
  context: string;
  category: string;
  dates: DateRange;
  status: Status;
  /** One sentence. */
  summary: string;
  /** One line that adds information beyond the venue in `context`. Forbidden for directions. */
  outcome?: string;
  /** Badge next to the outcome. Omit when an individual role is stated. */
  resultScope?: "team" | "product";
  /** Accent tag. Reserved for Best Paper, Best Poster, and Champion. */
  highlight?: string;
  tools: ToolTag[];
  links: LinkRef[];
  /** Teaser in the card's fixed-ratio frame. Every card should have one. */
  media?: MediaRef;
  /** Award documents, one thumbnail chip each, each opening its own file. */
  awards?: MediaRef[];
  evidence: EvidenceId[];
  order: number;
}

export interface TimelineEntry {
  id: string;
  kind: "role" | "education";
  org: string;
  title: string;
  dates: DateRange;
  oneLiner: string;
  outcome?: string;
  /** City, when it is already part of the institution name. */
  place?: string;
  /** Official mark for the organization, when a public logo exists. */
  mark?: MediaRef;
  evidence: EvidenceId[];
}

export interface Community {
  name: "Lumina Embodied AI Community";
  shortName: "Lumina";
  role: "Lead organizer";
  intro: string;
  focusAreas: string[];
  mark?: MediaRef;
  joinUrl?: string;
  channels?: LinkRef[];
  activities?: Array<{ title: string; date?: string; href?: string }>;
  relatedTeaching?: { text: string; evidence: EvidenceId[] };
  evidence: EvidenceId[];
}

export interface NavItem {
  id: string;
  label: string;
}

export interface SectionCopy {
  eyebrow: string;
  title: string;
  intro?: string;
}
