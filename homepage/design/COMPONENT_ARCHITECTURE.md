# Component Architecture: qiangyuchen1.github.io

Status: **current**. This file describes the code as built and is updated with it. The other files in `design/` are the Phase 1 specs the site was designed from (they still use the working name "Wadu Chen"); colors, type, and motion tokens in `VISUAL_IDENTITY.md` remain the reference for `app/globals.css`.

---

## 1. Principles

1. **Content is data, components are dumb.** All copy and facts live in typed modules under `content/`. Only `app/` imports `content/`; components receive props.
2. **Evidence travels with data.** Every factual record has `evidence: EvidenceId[]` (ledger in `content/evidence.ts`) and, where relevant, a `status`. `scripts/check-content.mts` enforces the rules at build time.
3. **Server Components by default.** Client Components are leaves: `Navbar` (scroll state, mobile sheet), `Reveal` / `MotionProvider` (Framer Motion), `HeroScene` (canvas).
4. **Empty means hidden.** Optional fields that are empty don't render: no disabled buttons, no placeholder cards.
5. **One page, anchored sections.** Each section owns its `id` and its `h2`, labelled via `aria-labelledby`.
6. **Uniform cards.** Every project card uses the same anatomy and the same 16:10 media frame, and every work-direction card the same 4:3 frame, so each list reads as a set regardless of source image shapes.

## 2. Folders

| Folder | Holds | May import |
|---|---|---|
| `components/ui/` | Primitives with no page knowledge | `lib/`, `content/types` |
| `components/blocks/` | Composites of primitives (`DirectionCard`, `ProjectCard`, `Timeline`) | `ui/`, `lib/`, `content/types` |
| `components/sections/` | One per page section, in page order | `blocks/`, `ui/`, `visuals/` |
| `components/layout/` | `Navbar`, `Footer` | `ui/`, `lib/` |
| `components/visuals/` | Decorative client visuals (`HeroScene`) and their pure modules | `lib/` |

## 3. Page

`app/page.tsx`: `Hero` → `WorkSection` → `ProjectsSection` → `EngineeringSection` → `CommunitySection` → `ContactSection` (only when an approved channel exists) → `Footer`.
`app/layout.tsx`: fonts, metadata, Person JSON-LD, `MotionProvider` › `SkipLink`, `Navbar`, children.

## 4. Sections and blocks

| Component | Type | Props | Notes |
|---|---|---|---|
| `Hero` | S | `profile` (name, role, eyebrow, statement, affiliation, signals), `actions` | Portrait + name, signals list, actions. `HeroScene` sits on the right half at `lg`, below the text on smaller screens. |
| `WorkSection` | S | `copy`, `directions`, `titlesById` | "Work directions" (`#work`): three `DirectionCard`s, one column → three at `lg`. |
| `DirectionCard` | S | `direction`, `index`, `titlesById` | 4:3 `MediaFrame` with the figure's source linked underneath \| number · title · summary · ≤2 project chips · ≤2 signals pinned to the foot. Figure and text sit side by side from `sm` to `lg`. |
| `ProjectsSection` | S | `copy`, `projects` | Sorted by `order`; one `ProjectCard` per project, staggered `Reveal`. |
| `ProjectCard` | S | `project`, `headingLevel?` | `MediaFrame` (5/12) \| meta · title · context · summary · highlight/outcome/scope · tools · links · award chips. Each award is its own thumbnail chip opening its own document (`href`, else the image), never a full-size image. |
| `EngineeringSection` | S | `copy`, `next`, `timeline` | Section header + `Timeline`. |
| `Timeline` | S | `entries` | Groups roles then education, each sorted with `byRecency`; ongoing entries get the accent dot. Org `Mark` beside the name. |
| `CommunitySection` | S | `copy`, `community`, `organizer` | Intro, channels, activities (if any), teaching line; side card with the community `Mark` and topics. |
| `ContactSection` | S | `copy`, `contact` | Email (only when approved) and profile links. |
| `HeroScene` | C | `className?` | Canvas; see §6. |

## 5. Primitives (`components/ui/`)

| Primitive | Purpose |
|---|---|
| `Container` | Max width 1408px + responsive horizontal padding |
| `Section` | `<section id aria-labelledby>`, vertical rhythm, optional `band` background |
| `SectionHeader` | Eyebrow, `h2`, intro, optional children; revealed as one unit |
| `Eyebrow` | Mono uppercase label |
| `Card` | Bordered surface; `as` for `article`/`li`; `hover` lift on fine pointers |
| `Tag` / `TagList` | Chips: `neutral`, `strong`, `accent` (Best Paper, Best Poster, or Champion only), `outline` |
| `ScopeBadge` | "Team result" / "Product outcome" |
| `ButtonLink` / `LinkRow` / `AnchorChip` | Links; externals get `↗` and `rel="noopener noreferrer"`; `LinkRow` renders nothing when empty |
| `DateRangeText` | `DateRange` in `<time>` elements |
| `MediaFrame` | Fixed-ratio plate: figures letterboxed with `object-contain`, logos centered |
| `Mark` | Organization logo at a set height; `monochrome` marks invert in dark mode, `darkPlate` marks (colored, with dark ink) sit on a white plate |
| `Reveal` (C) | One-shot fade + rise on enter; transform dropped under reduced motion |
| `MotionProvider` (C) | `LazyMotion` with `domAnimation` |
| `SkipLink` | "Skip to content" |

Helpers: `lib/cn.ts` (class join), `lib/format.ts` (`formatDateRange`, `toDateTime`, `isOngoing`, `byRecency`), `lib/contact.ts` (approved channels), `lib/hooks/useActiveSection.ts`.

## 6. Hero scene

A fine insertion drawn on `<canvas>` in the site's line style: a 6-axis arm braces a phone in its stand while a 7-axis arm seats a USB-C plug, its cable slack to a charger on the table (the charger LED and a bolt on the phone light up while seated), with a stage strip (`PLAN · APPROACH · ALIGN · INSERT · SEAT · RESET`). Before the approach, and again before the short alignment, the arm samples 8 candidate paths that converge onto the executed Bézier path over 10 "denoise" steps; the executed path is then shown dashed ahead of the plug with a fading tool trail behind it. The plug withdraws at the end of the 12.4 s cycle so the motion loops. Roll joints are drawn along the links, so the tool stays on the path while all 6 or 7 axes read in profile.

- `kinematics.ts`: analytic shoulder–elbow IK plus a fixed wrist offset; roll housings sit along the links (one extra on the 7-axis arm). The elbow sign keeps both elbows up.
- `choreography.ts`: segments, gripper events, and grasp/release times for one half cycle; `sampleFrame(t)` is a pure function of time (trails re-sample the past, so there is no simulation state).
- `render.ts`: reads colors and the mono font from CSS variables, caches the dot grid offscreen, and redraws on resize and on color-scheme change.
- `HeroScene.tsx`: DPR-aware sizing (`ResizeObserver`), pauses offscreen (`IntersectionObserver`), draws `STILL_TIME` once under `prefers-reduced-motion`.

## 7. Content integrity (`npm run check:content`)

Fails the build when: an evidence ID is unknown; a work direction, evidenced project, or timeline entry has none; a link isn't absolute `https://`/`mailto:`; an image or local `href` is missing from `public/`; two award chips on one project open the same file; a date isn't `YYYY.MM` or ends before it starts; a `direction`-status project shows results or tools; `RL`/`VLA` tool tags are used; an accent highlight isn't Best Paper, Best Poster, or Champion; more than 3 tools, 2 related projects or signals per work direction, or 3 hero signals are set; a personal Gmail is published without `allowPersonalEmail`. It warns when a project has no teaser.
