export type EvidenceId =
  | "EDU-SZU"
  | "EDU-SZU-AWD"
  | "EDU-CITYU"
  | "EDU-CITYU-AWD"
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
  src: string;
  alt: string;
  width: number;
  height: number;
  credit?: string;
}

export type SchematicKind = "sim2real" | "dexhand" | "mmhand" | "flow3d" | "policy" | "segment";

export type GlyphKind = "policy" | "vla" | "hand" | "rl" | "sim2real" | "flow3d" | "segment";

export interface ContactChannels {
  intro: string;
  /** Public address. A personal Gmail is published only when allowPersonalEmail is set. */
  email?: string;
  allowPersonalEmail?: boolean;
  github?: LinkRef;
  scholar?: LinkRef;
  linkedin?: LinkRef;
  x?: LinkRef;
  emptyFallback: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  dates: DateRange;
  highlights?: string[];
  awards?: string[];
  evidence: EvidenceId[];
}

export interface Profile {
  publicName: "Qiangyu Chen";
  legalName: "Qiangyu Chen";
  legalNameNative: "陈锵宇";
  role: "Embodied AI Researcher";
  eyebrow: string;
  statement: string;
  affiliationLine?: string;
  /** Hero proof list: the work in one weight, its venue or honor in another. Max 3. */
  signals: Array<{ work: string; detail: string; href: `#${string}`; evidence: EvidenceId[] }>;
  interests: string[];
  education: EducationItem[];
  contact: ContactChannels;
  seo: { title: string; description: string; canonical: "https://qiangyuchen1.github.io/" };
}

export type ResearchTopicId = "robot-learning" | "vla" | "dexterous-manipulation" | "rl" | "sim2real";

export interface ResearchTopic {
  id: ResearchTopicId;
  title: string;
  status: Status;
  summary: string;
  /** Max 2, shown as chips. */
  relatedProjects: string[];
  /** Required when status is "direction" and relatedProjects is non-empty. */
  relationNote?: string;
  foundation?: string;
  /** Short venue/outcome strings shown at the row's right edge (max 2). Evidenced topics only. */
  signals?: string[];
  glyph: GlyphKind;
  visualRole: "anchor" | "hardware" | "diagram" | "text";
  evidence: EvidenceId[];
  order: number;
}

export interface Project {
  id: string;
  title: string;
  context: string;
  category: string;
  dates: DateRange;
  status: Status;
  /** Shown on the featured card only. */
  researchQuestion: string;
  /** One sentence. */
  summary: string;
  /** One line that adds information beyond the venue in `context`. Forbidden for directions. */
  outcome?: string;
  /** Badge next to the outcome. Omit when an individual role is stated. */
  resultScope?: "team" | "product";
  /** Accent tag. Reserved for Best Paper and Champion. */
  highlight?: string;
  tools: ToolTag[];
  role?: string;
  /** false: the role line is hidden in production builds. */
  roleConfirmed: boolean;
  topics: ResearchTopicId[];
  links: LinkRef[];
  media?: MediaRef;
  glyph: GlyphKind;
  schematic: SchematicKind;
  featured?: boolean;
  size: "feature" | "standard" | "compact";
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
  evidence: EvidenceId[];
}

export type WritingKind = "paper" | "recognition" | "note";

export interface WritingItem {
  id: string;
  kind: WritingKind;
  title: string;
  shortTitle?: string;
  venue?: string;
  format?: "poster" | "workshop" | "conference";
  domain?: "Robotics" | "Vision";
  year: number;
  honors?: string[];
  /** The one honor promoted to the accent tag. */
  highlight?: string;
  authorNote?: string;
  publishedAs: "Qiangyu Chen";
  statusNote?: string;
  links: LinkRef[];
  relatedProject?: string;
  slug?: string;
  date?: string;
  summary?: string;
  evidence: EvidenceId[];
}

export interface WritingContent {
  papers: WritingItem[];
  recognition: WritingItem[];
  notes: WritingItem[];
  notesEmptyCopy: { title: string; body: string };
}

export interface Community {
  name: "Lumina Embodied AI Community";
  shortName: "Lumina";
  role: "Founder & lead organizer";
  intro: string;
  focusAreas: string[];
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
