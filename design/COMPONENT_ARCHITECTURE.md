# Component Architecture: Wadu Chen Research Site

Status: Phase 1 spec. **No code is created in this phase.** Interfaces below are described as TypeScript shapes in markdown only.
Content and copy: see `INFORMATION_ARCHITECTURE.md`. Colors, type, spacing, motion: see `VISUAL_IDENTITY.md`. Stack: see `TECHNOLOGY.md`.

---

## 1. Principles

1. **Content is data, components are dumb.** All copy lives in typed content modules under `content/`. Components never hard-code facts.
2. **Evidence travels with data.** Every factual record has `evidence: EvidenceId[]` and a `status`. Components read `status` to decide badges and which fields to show.
3. **Server Components by default.** Only interactive or animated leaves are Client Components (`"use client"`): Navbar scroll state, motion wrappers. Sections stay static HTML at export.
4. **Empty means hidden.** No disabled buttons, no placeholder cards. Empty optional fields do not render. Explicit honest-empty copy lives in content, not in components.
5. **One page, anchored sections.** Each section component owns its `id` anchor and heading.

---

## 2. Content schema

### 2.1 Shared primitives

```ts
type EvidenceId =
  | "EDU-SZU" | "EDU-SZU-AWD" | "EDU-CITYU" | "EDU-CITYU-AWD"
  | "EXP-XJGN" | "EXP-MMHAND" | "EXP-PARAMI" | "EXP-AGILEX"
  | "PUB-ROBOTWIN2" | "PUB-G3FLOW" | "PUB-CAPRO" | "PUB-AICL"
  | "CHL-MARS" | "RES-MERA" | "COM-LUMINA";

type Status = "evidenced" | "direction";
// evidenced: evidence.length >= 1 required; may show results/tools
// direction: evidence may reference foundations (e.g. coursework) but no results/tools render

type ToolTag =
  | "Dexterous Hands" | "Embedded Control" | "Mechanical Design" | "State Machines"
  | "Simulation" | "Domain Randomization" | "Synthetic Data" | "Bimanual Manipulation"
  | "Multimodal LLMs" | "3D Vision" | "Computer Vision" | "Segmentation"
  | "Foundation Models (SAM)" | "ROS2" | "LeRobot" | "Policy Evaluation"
  | "RL" | "VLA";          // allowed in vocabulary; no evidenced item uses them today

type YearMonth = `${number}.${string}`;          // "2024.09"
interface DateRange { start: YearMonth; end?: YearMonth | "present"; inProgress?: boolean }

interface LinkRef {
  kind: "paper" | "project" | "code" | "video" | "site" | "github" | "scholar" | "email" | "other";
  label: string;
  href: string;                                   // must be a real, supplied URL; never guessed
}

interface MediaRef {
  src: string;                                    // path under /public/media, imported statically
  alt: string;                                    // required
  width: number; height: number;
  credit?: string;                                // required if not self-made (e.g. paper figure)
}
```

### 2.2 `Profile`

```ts
interface Profile {
  publicName: "Wadu Chen";
  legalName: "Qiangyu Chen";
  legalNameNative: "陈锵宇";
  role: "Embodied AI Researcher";
  eyebrow: string;                   // "Embodied AI · Robot Learning · Manipulation"
  statement: string;                 // hero sentence(s), ≤ 2 sentences
  affiliationLine?: string;          // "M.Sc. Data Science, City University of Hong Kong"
  signals: Array<{ label: string; href: `#${string}`; evidence: EvidenceId[] }>; // max 3
  interests: string[];               // brief's interest list, for metadata only
  education: EducationItem[];
  contact: ContactChannels;
  seo: { title: string; description: string; canonical: "https://wadu999.github.io/" };
}

interface EducationItem {
  id: string;
  institution: string;
  degree: string;                    // "M.Sc., Data Science"
  dates: DateRange;
  highlights?: string[];             // selected courses relevant to identity (RL, Embodied AI, CV, Robotics)
  awards?: string[];
  evidence: EvidenceId[];
}

interface ContactChannels {
  intro: string;
  email?: string;                    // professional only; personal Gmail from PDF is NOT allowed here by default
  github?: LinkRef;
  scholar?: LinkRef;
  linkedin?: LinkRef;
  x?: LinkRef;
  emptyFallback: string;             // "Contact details coming soon."
}
```

### 2.3 `ResearchTopic`

```ts
interface ResearchTopic {
  id: "robot-learning" | "vla" | "dexterous-manipulation" | "rl" | "sim2real";
  title: string;
  status: Status;
  summary: string;                   // 1–2 sentences, IA §5.2
  relatedProjects: string[];         // Project.id[]
  relatedEngineering?: string[];     // EngineeringItem.id[]
  relationNote?: string;             // required when status = "direction" and relatedProjects non-empty,
                                     // e.g. "Related work, not a VLA model"
  foundation?: string;               // e.g. "M.Sc. coursework: Dynamic Programming & RL"
  visualRole: "anchor" | "hardware" | "diagram" | "text";
  evidence: EvidenceId[];
  order: number;
}
```

### 2.4 `Project`

```ts
interface Project {
  id: string;                        // "proj-robotwin2"
  title: string;
  context: string;                   // "ICML 2026 · Best Paper, RoDGE Workshop @ IROS 2025"
  dates: DateRange;
  status: Status;                    // all current projects: "evidenced"
  researchQuestion: string;
  approach: string;
  keyResults?: string[];             // FORBIDDEN when status = "direction"; qualitative unless PDF has numbers
  resultScope?: "individual" | "team" | "product";   // drives phrasing badge ("Team result", "Product outcome")
  tools: ToolTag[];                  // each justified by evidence
  role?: string;                     // "Co-first author", "R&D Intern: control framework"
  roleConfirmed: boolean;            // false → UI appends "(role pending)" in dev builds only; prod hides role
  topics: ResearchTopic["id"][];
  links: LinkRef[];                  // empty until supplied
  media?: MediaRef;
  featured?: boolean;
  size: "feature" | "standard" | "compact";
  evidence: EvidenceId[];
  order: number;
}
```

### 2.5 `EngineeringItem`

```ts
type EngineeringArea =
  | "hardware-integration" | "robot-deployment" | "simulation"
  | "data-collection" | "model-deployment";

interface EngineeringItem {
  id: string;                        // "eng-lerobot"
  area: EngineeringArea;
  title: string;                     // "LeRobot single- & dual-arm course: technical lead"
  org?: string;                      // "Parami AI (HK) · HKAGE"
  dates?: DateRange;
  description: string;
  outcome?: string;                  // "Ranked 1st of 8 teams"
  tools: ToolTag[];
  status: Status;
  display: boolean;                  // false for true-but-off-identity items (AgileX asset front-end)
  evidence: EvidenceId[];
}

interface EngineeringAreaMeta {
  area: EngineeringArea;
  title: string;
  status: Status;
  directionCopy?: string;            // shown when no displayed items, e.g. model-deployment
  caveat?: string;                   // e.g. "Simulation data only"
}

interface TimelineEntry {
  id: string;
  kind: "role" | "education";
  org: string;
  title: string;
  dates: DateRange;
  oneLiner: string;
  evidence: EvidenceId[];
}
```

### 2.6 `WritingItem`

```ts
type WritingKind = "paper" | "recognition" | "note";

interface WritingItem {
  id: string;
  kind: WritingKind;
  title: string;
  shortTitle?: string;               // "RoboTwin 2.0"
  venue?: string;                    // exact PDF venue, normalized format: "AAAI 2026"
  format?: "poster" | "workshop" | "conference";   // only if stated
  year: number;
  honors?: string[];                 // "Best Paper, RoDGE Workshop @ IROS 2025"
  authorNote?: string;               // only if stated: "Co-first author", "Second author"
  publishedAs: "Qiangyu Chen";
  statusNote?: string;               // e.g. RoboTwin 2.0 ICML status once confirmed
  links: LinkRef[];
  relatedProject?: string;           // Project.id
  // notes only (deferred /notes route):
  slug?: string; date?: string; summary?: string;
  evidence: EvidenceId[];            // notes may have [] (self-authored), papers must not
}

interface WritingSection {
  papers: WritingItem[];             // kind = "paper"
  recognition: WritingItem[];        // kind = "recognition"
  notes: WritingItem[];              // kind = "note"; currently []
  notesEmptyCopy: string;            // "Research notes: forthcoming. ..."
}
```

### 2.7 `Community`

```ts
interface Community {
  name: "Lumina Embodied AI Community";
  shortName: "Lumina";
  role: "Founder & lead organizer";  // from 主理人
  intro: string;                     // purpose, not reported activity
  focusAreas: string[];              // ["Robot learning", "Manipulation", "Simulation", "Robot hardware"]
  joinUrl?: string;                  // hidden until real
  channels?: LinkRef[];              // hidden until real
  activities?: Array<{ title: string; date?: string; href?: string }>;  // hidden until real; never invented
  relatedTeaching?: { text: string; evidence: EvidenceId[] };           // LeRobot course line
  evidence: EvidenceId[];            // ["COM-LUMINA"]
}
```

### 2.8 Content integrity check (build-time)

A tiny script (`scripts/check-content.ts`, Phase 2) asserts:
- `status === "evidenced"` ⇒ `evidence.length > 0`
- `status === "direction"` ⇒ no `keyResults`, `tools.length === 0`
- `tools` never include `"RL"` or `"VLA"` on evidenced items unless an evidence ID is added that supports them
- `WritingItem.kind === "paper"` ⇒ `venue` and `evidence` present
- `ContactChannels.email` does not match `/gmail\.com$/` unless an explicit `allowPersonalEmail` flag is set
- all `relatedProjects` / `relatedEngineering` IDs resolve

Runs in `prebuild`, so a fabricated or broken entry fails the build.

---

## 3. Components

Notation: **S** = Server Component, **C** = Client Component.

### 3.1 Layout shell

| Component | Type | Responsibility | Props | Composition |
|---|---|---|---|---|
| `app/layout.tsx` | S | `<html>`, fonts, metadata, JSON-LD, skip link | — (reads `profile`) | `SkipLink`, `Navbar`, `{children}`, `Footer` |
| `app/page.tsx` | S | Orders sections | — | `Hero` → `ResearchSection` → `ProjectsSection` → `EngineeringSection` → `WritingSection` → `CommunitySection` → `ContactSection` |

### 3.2 Required components

#### `Navbar` (C)
- **Responsibility:** Sticky top bar; wordmark → `#top`; anchor links; active-section highlight via `IntersectionObserver`; compact mobile sheet. Becomes opaque/bordered after scroll.
- **Props:**
  ```ts
  interface NavbarProps {
    brand: string;                                 // "Wadu Chen"
    items: Array<{ id: string; label: string }>;   // from content/site.ts
    external?: LinkRef[];                          // GitHub if confirmed
  }
  ```
- **Composition:** `Container` › `Wordmark` + `NavLink[]` + `MobileNav` (disclosure). Uses `useActiveSection(ids)` hook.
- **A11y:** `<nav aria-label="Primary">`, `aria-current="true"` on active link, focus-trapped mobile sheet, `Esc` closes.

#### `Hero` (S shell + C motion leaf)
- **Responsibility:** First impression: eyebrow, H1 name, role, statement, affiliation, signal strip, actions, ambient visual.
- **Props:**
  ```ts
  interface HeroProps { profile: Pick<Profile, "publicName" | "role" | "eyebrow" | "statement" | "affiliationLine" | "signals">; actions: LinkRef[] | Array<{ label: string; href: `#${string}` }>; }
  ```
- **Composition:** `Section id="top"` › `Eyebrow`, `h1`, `Lead`, `SignalStrip` (list of `Signal`), `ButtonLink[]`, `HeroVisual` (C, decorative, `aria-hidden`, respects `prefers-reduced-motion`).

#### `ResearchSection` (S)
- **Responsibility:** Section intro + grid of research topics; cross-links to project cards.
- **Props:** `{ intro: string; topics: ResearchTopic[]; projectsById: Record<string, Pick<Project, "id" | "title">> }`
- **Composition:** `Section id="research"` › `SectionHeader` › `ResearchTopicCard[]`.
  - `ResearchTopicCard` (S): title, `StatusBadge` if direction, summary, `foundation` line, related chips (`AnchorChip` → `#proj-…`), `relationNote` under chips. Layout variant from `visualRole` (anchor spans 2 columns).

#### `ProjectCard` (S)
- **Responsibility:** One research showcase card.
- **Props:**
  ```ts
  interface ProjectCardProps { project: Project; headingLevel?: 3 | 4; }
  ```
- **Composition:** `Card as="article" id={project.id}` ›
  `CardMeta` (context · `DateRangeText`) → `h3 title` →
  `Field label="Question"` → `Field label="Approach"` →
  `Field label="Results"` (+ `ScopeBadge` if `resultScope !== "individual"`; omitted when `keyResults` empty) →
  `TagList tools` → `RoleLine` (only if `roleConfirmed`) → `LinkRow links` (omitted when empty) → optional `MediaFigure`.
  `size` controls density: `feature` shows media and full text; `compact` collapses Approach to one line.
- **Parent:** `ProjectsSection` (S): `SectionHeader` + featured card + grid of the rest, sorted by `order`.

#### `Timeline` (S)
- **Responsibility:** Compact chronological list of roles and education (secondary, inside Engineering).
- **Props:** `{ entries: TimelineEntry[]; groupBy?: "kind" }`
- **Composition:** `<ol>` › `TimelineItem` (date column `DateRangeText`, org, title, oneLiner). Education group separated by `Divider`. No logos.

#### `PublicationCard` (S)
- **Responsibility:** One paper or recognition entry.
- **Props:** `{ item: WritingItem; showPublishedAs?: boolean }`
- **Composition:** `article` › `VenueBadge` (venue + year) → title (bold `shortTitle` + rest) → `honors` as `HonorLine[]` → `authorNote` → `LinkRow` (omitted if empty) → optional `AnchorChip` to `relatedProject`.
- **Parent:** `WritingSection` (S): heading, "Published as Qiangyu Chen" note once at top, `PublicationCard[]` (papers), recognition list, then `EmptyState` from `notesEmptyCopy` when `notes.length === 0`.

#### `CommunitySection` (S)
- **Responsibility:** Lumina introduction as an open research community.
- **Props:** `{ community: Community }`
- **Composition:** `Section id="community"` › `SectionHeader` (name + role line) → `Prose intro` → `TagList focusAreas` (neutral style) → `LinkRow channels` / join `ButtonLink` (only if present) → `activities` list (only if present) → `relatedTeaching` line.

#### `Footer` (S)
- **Responsibility:** Closing line, copyright, last-updated date, back-to-top.
- **Props:** `{ name: string; updated: string; links?: LinkRef[] }`
- **Composition:** `Container` › small text + `AnchorLink href="#top"`.

### 3.3 Additional section components

| Component | Type | Props | Notes |
|---|---|---|---|
| `EngineeringSection` | S | `{ intro; areas: EngineeringAreaMeta[]; items: EngineeringItem[]; timeline: TimelineEntry[] }` | Renders one `CapabilityBlock` per area (items filtered by `display`), direction copy when empty, then `Timeline`. |
| `CapabilityBlock` | S | `{ meta: EngineeringAreaMeta; items: EngineeringItem[] }` | Title, `StatusBadge`, caveat, `EngineeringRow[]` (title, org, dates, description, outcome, tools). |
| `ContactSection` | S | `{ contact: ContactChannels }` | Renders only non-empty channels; `emptyFallback` if none. Email rendered as `mailto:` only if professional. |

### 3.4 Primitives (`components/ui/`)

| Primitive | Purpose |
|---|---|
| `Container` | Max-width + horizontal padding |
| `Section` | `<section id aria-labelledby>` + vertical rhythm + `scroll-margin-top` for sticky nav |
| `SectionHeader` | Index number (optional, e.g. `01`), H2, intro paragraph |
| `Eyebrow` | Small uppercase label |
| `Card` | Surface with border; `as` prop for `article` |
| `Field` | Labelled definition row (`dt`/`dd`) for card fields |
| `Tag` / `TagList` | Tool/focus chips (non-interactive) |
| `StatusBadge` | "Direction" badge; renders nothing for `evidenced` |
| `ScopeBadge` | "Team result" / "Product outcome" |
| `VenueBadge` | "CVPR 2025" etc. |
| `AnchorChip` | In-page link chip to `#id` |
| `ButtonLink` | Primary/secondary link styled as button; external gets `↗` + `rel="noopener"` |
| `LinkRow` | Horizontal list of `LinkRef`; returns `null` if empty |
| `DateRangeText` | Formats `DateRange` ("2024.09 – 2025.01", "in progress") in a `<time>` element |
| `EmptyState` | Quiet, honest placeholder text block |
| `MediaFigure` | `next/image` (unoptimized) + caption + credit |
| `Reveal` (C) | Framer Motion fade/translate on enter; no-op under reduced motion |
| `SkipLink` | "Skip to content" |
| `Divider` | Hairline separator |

Hooks (`lib/hooks/`): `useActiveSection(ids: string[])`, `useReducedMotionSafe()`.

---

## 4. Folder layout (Phase 2 target; do not create now)

```
wadu999.github.io/                 # fresh repo; replaces old site wholesale
├── app/
│   ├── layout.tsx                 # fonts, metadata, JSON-LD, Navbar, Footer
│   ├── page.tsx                   # section composition
│   ├── not-found.tsx              # exported as 404.html
│   ├── globals.css                # Tailwind layers + CSS variables (tokens per VISUAL_IDENTITY.md)
│   ├── icon.svg                   # favicon
│   ├── opengraph-image.png        # static OG image (1200×630)
│   ├── robots.ts                  # static robots.txt
│   └── sitemap.ts                 # static sitemap.xml
│   # deferred: app/notes/page.tsx, app/notes/[slug]/page.tsx (generateStaticParams)
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── HeroVisual.tsx             # client, decorative
│   ├── ResearchSection.tsx
│   ├── ResearchTopicCard.tsx
│   ├── ProjectsSection.tsx
│   ├── ProjectCard.tsx
│   ├── EngineeringSection.tsx
│   ├── CapabilityBlock.tsx
│   ├── Timeline.tsx
│   ├── WritingSection.tsx
│   ├── PublicationCard.tsx
│   ├── CommunitySection.tsx
│   ├── ContactSection.tsx
│   ├── Footer.tsx
│   └── ui/                        # primitives listed in §3.4
├── content/
│   ├── types.ts                   # interfaces from §2
│   ├── evidence.ts                # EvidenceId → human-readable source description
│   ├── profile.ts
│   ├── site.ts                    # nav items, section intros
│   ├── research.ts
│   ├── projects.ts
│   ├── engineering.ts             # items, area meta, timeline
│   ├── writing.ts
│   └── community.ts
│   # deferred: content/notes/*.mdx
├── lib/
│   ├── hooks/
│   ├── format.ts                  # DateRange formatting
│   └── cn.ts                      # className merge
├── public/
│   ├── media/                     # optimized images (webp/avif + png fallback), self-made or credited
│   ├── .nojekyll                  # keep _next/ from being ignored by Pages
│   └── CNAME                      # only if a custom domain is added later (not for wadu999.github.io)
├── scripts/
│   └── check-content.ts           # integrity rules §2.8
├── design/                        # these Phase 1 docs (optional to carry over)
├── .github/workflows/deploy.yml   # build + upload-pages-artifact + deploy-pages
├── next.config.ts                 # output: 'export', images.unoptimized, trailingSlash
├── tailwind.config.ts             # if Tailwind v3; v4 uses CSS-first config in globals.css
├── tsconfig.json
├── package.json
└── README.md
```

No `components/` imports content directly. Only `app/page.tsx` (and `layout.tsx`) import from `content/` and pass props down. That keeps components testable and prevents stray copy.
