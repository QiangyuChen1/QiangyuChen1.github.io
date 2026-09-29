# Wadu Chen — Visual Identity & Design System

Target: `wadu999.github.io` (static export, GitHub Pages)
Status: Design specification only. No code. Nothing from the existing `QiangyuChen1.github.io` site (content, layout, components, styles) is reused.

---

## Executive Summary (for the implementing engineer)

**What this site is:** the homepage of a one-person embodied-AI research lab. It should feel closer to a research institute page than a resume. It is calm and precise: lots of white space, a few confident statements, evidence shown as clean cards. No template look, no student-portfolio tropes (skill bars, emoji, "Hi, I'm…", tech-logo walls).

**Identity:** Public name **Wadu Chen**, title **Embodied AI Researcher**. The resume uses the legal name **Qiangyu Chen / 陈锵宇**. Put "Qiangyu Chen" on publication entries (that is the authored name) and once in the About/Contact area (`Wadu Chen (Qiangyu Chen)`).

**Fonts (all SIL OFL, available via `next/font/google`, self-hosted at build, so they work with static export):**
- Headings/display: **Geist** (500, 600)
- Body/UI: **Inter** (400, 500)
- Labels/metadata/venues: **Geist Mono** (400, 500)

**Color:** light "paper" monochrome by default, with an optional dark theme. The only accent is a calibrated cobalt, **`#2B59C3`**. Use it for links, active states, venue highlights, and one line in the hero diagram. Nothing else is colored.

**Layout:** 12-column grid, 1280px max content width, 24px gutters. Sections get 160px of vertical padding on desktop, 112px on tablet, 80px on mobile. Cards use 1px borders, 16px radius, and no resting shadow.

**Motion:** subtle and one-shot. Section reveal is 700ms, `cubic-bezier(0.22, 1, 0.36, 1)`, 16px rise with a fade. Hover is 200ms. The hero diagram draws in once, over about 1.6s. Everything honors `prefers-reduced-motion`. **Forbidden:** particles, cyberpunk/neon, glitch effects, heavy or animated gradients, parallax stacks, cursor trails, 3D tilt cards, typing effects.

**Hero visual:** an original inline-SVG technical line drawing: a manipulator or dexterous-hand kinematic chain with coordinate frames and a trajectory. It is drawn twice. The dashed muted layer is "simulation" and the solid ink layer is "real". One accent-colored trajectory connects them. This expresses the sim-to-real story without stock imagery.

**Section order:** Navbar → Hero → Research Directions (5) → Selected Publications → Projects → Engineering (timeline) → Community (Lumina) → Contact → Footer.

**Content rule:** only facts from the resume (see §9). Venues, awards, and roles are real and can be shown prominently. Research directions without a publication behind them (RL, VLA) are written as focus areas, not as claimed results. Do not invent metrics, co-authors, links, or logos.

---

## 1. Visual Language

### Mood
- **A lab at night that's quiet but still working.** Precise, considered, unhurried.
- Reference *qualities*, not assets:
  - Google DeepMind research pages: editorial confidence, big typographic statements, generous negative space.
  - OpenAI Research: extreme restraint, a list-first publication index, typography carrying the hierarchy.
  - Apple product pages: one idea per viewport, slow and deliberate reveals, product-grade image framing.
  - Anthropic: warm off-white paper tone, a humane and calm voice, serious without being cold.
  - RoboDojo-style robotics lab pages: hardware and sim footage treated as evidence, with technical diagrams as ornament.
- No logos, wordmarks, illustrations, or proprietary imagery from any reference may be used or imitated.

### Materials
- **Paper:** warm off-white background, never pure `#FFF` for the page (pure white is reserved for elevated cards).
- **Ink:** near-black text, with hierarchy made through weight and size rather than color.
- **Hairlines:** 1px borders and rules do the structural work. There are almost no shadows.
- **Instrument blue:** the single accent, used the way a plot highlights one series.
- **Graph paper:** an optional very faint 8px/40px grid behind the hero diagram only, at ≤4% opacity. It is static. No dot fields, no particles.

### Photography & media direction (for later)
- Use only **original or clearly licensed** media: your own photos of hardware (the dexterous hand prototypes, MM-Hand 1.0, LeRobot single/dual-arm setups, the ROS2 driverless car), and figures or renders from the papers you co-authored (check each venue's figure license before reuse).
- Style: neutral or dark seamless backgrounds, soft single-source light, shallow depth of field on mechanisms, no busy lab clutter. Grade slightly desaturated (about −10% saturation), with neutral white balance.
- Aspect ratios: **16:9** for sim/video stills, **4:3** for project cards, **4:5** for hardware portraits. Never mix ratios within one row.
- Video: muted, looping, ≤8s, with a poster frame. Autoplay only when in view, and never with reduced motion.
- No stock "robot hand touching human hand" or glowing-brain imagery. No AI-generated humanoids.

### What the hero should feel like
A **research lab homepage**. The first viewport states *who* (Wadu Chen), *what* (Embodied AI Researcher), and *how* (robot learning, simulation, perception, control), next to a precise technical diagram. It should read like the opening plate of a paper, not a resume header. It has no photo of the person and no "Download CV" as the primary action.

---

## 2. Typography

### Families
| Role | Family | Weights loaded | Source |
|---|---|---|---|
| Display & headings | **Geist** | 500, 600 | Google Fonts / `next/font/google` (OFL) |
| Body & UI | **Inter** (variable, with `opsz`) | 400, 500 | Google Fonts / `next/font/google` (OFL) |
| Mono labels, venues, dates, code | **Geist Mono** | 400, 500 | Google Fonts / `next/font/google` (OFL) |
| CJK fallback (only if Chinese appears) | **Noto Sans SC** | 400, 500 | Google Fonts (OFL), subset/lazy |

Fallback stacks:
- Display: `Geist, "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`
- Body: `Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`
- Mono: `"Geist Mono", ui-monospace, "SF Mono", Menlo, monospace`

Rationale: Geist's geometric precision holds up at large display sizes, and Inter is the most legible option at 14–17px. Geist Mono gives venue tags and dates an "instrument readout" feel. Use `font-display: swap`. Enable Inter features `"cv11", "ss01"` (single-storey a off; straight-sided digits) and `tnum` for dates and numbers.

### Type scale
Fluid between 375px and 1440px viewports (use `clamp()`). Values are mobile → desktop.

| Token | Family | Size (px) | Weight | Line-height | Letter-spacing | Use |
|---|---|---|---|---|---|---|
| `display` | Geist | 48 → 88 | 500 | 1.02 → 0.98 | −0.035em | Hero name only |
| `h1` | Geist | 40 → 64 | 500 | 1.05 | −0.03em | Page titles (subpages) |
| `h2` | Geist | 32 → 44 | 500 | 1.10 | −0.025em | Section titles |
| `h3` | Geist | 22 → 28 | 500 | 1.20 | −0.015em | Card titles (large), research topic names |
| `h4` | Geist | 18 → 20 | 600 | 1.30 | −0.01em | Card titles (compact), timeline roles |
| `lead` | Inter | 18 → 21 | 400 | 1.50 | −0.005em | Hero subtitle, section intros |
| `body` | Inter | 16 → 17 | 400 | 1.65 | 0 | Paragraphs |
| `body-sm` | Inter | 14 → 15 | 400 | 1.55 | 0 | Card descriptions |
| `caption` | Inter | 13 | 400 | 1.45 | 0.005em | Figure captions, footnotes |
| `label` | Geist Mono | 12 | 500 | 1.40 | 0.08em, UPPERCASE | Section eyebrows, venue tags, dates |
| `mono-sm` | Geist Mono | 13 | 400 | 1.50 | 0 | Author lists, metadata rows |

Rules:
- Maximum measure: **68ch** for body, **22ch** for display, **32ch** for h2.
- Hierarchy is created by size and weight. Don't use more than two weights on one card.
- No all-caps outside `label`. No italics except publication titles in citation lines (optional).
- Numbers in dates and timelines use tabular figures.
- The eyebrow pattern: `label` in `--text-muted`, then `h2` 16px below.

---

## 3. Color

### Light theme (default)
| Token | Hex | Use |
|---|---|---|
| `--bg` | `#FAFAF8` | Page background (warm paper) |
| `--bg-elevated` | `#FFFFFF` | Cards, navbar when scrolled |
| `--bg-subtle` | `#F2F2EF` | Alternate section band, tag fills, image placeholders |
| `--text` | `#0B0B0C` | Headings, primary text |
| `--text-secondary` | `#3A3A3D` | Body paragraphs |
| `--text-muted` | `#6E6E73` | Metadata, captions, eyebrows (≈4.9:1 on bg) |
| `--text-faint` | `#A1A1A6` | Disabled, diagram annotations only (not for body copy) |
| `--border` | `#E4E4E0` | Card borders, rules |
| `--border-strong` | `#CFCFCA` | Hover borders, active dividers |
| `--accent` | `#2B59C3` | Links, active nav, highlighted venue, hero accent path (≈6:1 on bg) |
| `--accent-hover` | `#1F46A0` | Link hover/pressed |
| `--accent-muted` | `#E9EEF9` | Accent tag background, focus halo fill |
| `--focus-ring` | `#2B59C3` | 2px outline, 2px offset |

### Dark theme (optional, via `prefers-color-scheme` plus a manual toggle)
| Token | Hex |
|---|---|
| `--bg` | `#0A0A0B` |
| `--bg-elevated` | `#111113` |
| `--bg-subtle` | `#161618` |
| `--text` | `#F5F5F4` |
| `--text-secondary` | `#C7C7CC` |
| `--text-muted` | `#8E8E93` |
| `--text-faint` | `#5A5A5F` |
| `--border` | `#232326` |
| `--border-strong` | `#34343A` |
| `--accent` | `#7C9CF0` |
| `--accent-hover` | `#A3BBF5` |
| `--accent-muted` | `#16203A` |

### Color rules
- The accent should cover **≤5% of any viewport**. It is never a background fill for a whole section and never a gradient.
- Gradients are allowed only as a functional, near-invisible image scrim (e.g. `--bg` at 0% to 60% over a photo bottom edge for caption legibility). No decorative or animated gradients. No glows, neon, or colored shadows.
- Status colors are not needed. If one is ever required (e.g. a "Best Paper" badge), use `--text` on `--bg-subtle` with a mono label, not gold or green.

---

## 4. Spacing, Grid & Surfaces

### Spacing scale (4px base)
`4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160` → tokens `space-1 … space-11`.

### Grid
| Breakpoint | Viewport | Columns | Gutter | Outer margin | Max content |
|---|---|---|---|---|---|
| Mobile | < 640 | 4 | 16 | 20 | fluid |
| Tablet | 640–1023 | 8 | 20 | 40 | fluid |
| Desktop | 1024–1439 | 12 | 24 | 64 | 1280 |
| Wide | ≥ 1440 | 12 | 24 | auto (centered) | 1280 |

- Text-heavy blocks (intros, the About paragraph) sit in **columns 1–7**. Leave the right side empty on purpose.
- Full-bleed is allowed only for the hero diagram canvas and future media bands.

### Section rhythm
- Vertical padding: **160 desktop / 112 tablet / 80 mobile** (top and bottom).
- Eyebrow → title: 16. Title → intro: 24. Intro → content: 64 (desktop), 48 (mobile).
- Sections are separated by space, optionally with a 1px `--border` rule spanning the content width. Alternate bands (`--bg-subtle`) are used at most twice on the page (suggested: Engineering, Community).

### Card style (base)
- Background `--bg-elevated`, 1px `--border`, radius **16px** (large), **12px** (compact), **999px** (pills/tags).
- Padding: 32 desktop / 24 mobile (large); 20 (compact).
- Resting shadow: none.
- Hover (pointer devices only): border goes to `--border-strong`, `translateY(-2px)`, and shadow becomes `0 1px 2px rgba(11,11,12,0.04), 0 8px 24px rgba(11,11,12,0.06)`. Dark theme uses no shadow, only a border change.
- Media inside a card is inset with radius 12, or flush-top with the top corners matching the card radius.
- Tags: `label` style, 24px tall, padding 0 10px, `--bg-subtle` fill, `--text-muted` text. The accent tag (`--accent-muted` / `--accent`) is reserved for the single most important venue or award per card.

---

## 5. Animation Principles (not implementation)

**Feeling:** like instrument panels settling. Things arrive once and then stay still. Motion confirms structure; it never decorates.

### Tokens
| Token | Value | Use |
|---|---|---|
| `dur-micro` | 150ms | Color/opacity changes on links, icons |
| `dur-hover` | 200ms | Card lift, border change, image zoom start |
| `dur-base` | 400ms | Nav background change, menu open |
| `dur-reveal` | 700ms | Section and card entrance |
| `dur-media` | 900ms | Image/video crossfade, image zoom |
| `dur-draw` | 1600ms | Hero diagram line draw (one-time) |
| `ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Default for entrances and hovers |
| `ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Crossfades, menu, diagram draw |
| `stagger` | 60–80ms | Between sibling cards / hero lines (max 6 items staggered) |

### What moves
- **Page load (hero only):** eyebrow → name → title → pillars line → CTAs fade and rise 12px, staggered at 80ms and starting at 100ms. The diagram draws its strokes (`dur-draw`, `ease-in-out`), then the accent trajectory draws last (+300ms). Total time until settled: ≤2.2s. Content must be readable immediately. Animation must never block text.
- **Section reveal:** opacity 0→1, translateY 16px→0, `dur-reveal`, triggered once when about 15% is in view. It does not replay on scroll-up.
- **Hover:** cards lift 2px. Image inside a card scales 1.00→1.02 over `dur-media`. Link underline grows from left, 1px, `dur-hover`.
- **Image transition:** crossfade only (no slides or wipes), `dur-media`.
- **Navbar:** transparent → `--bg-elevated` at 85% opacity with a 12px backdrop blur and bottom hairline after 24px of scroll, `dur-base`.
- **Ambient (optional, single instance):** one small accent dot travels the hero trajectory path in a 12s loop at low speed. Pause it when the hero is off-screen, and remove it entirely under reduced motion.

### Reduced motion
Under `prefers-reduced-motion: reduce`, there are no transforms and no draw-in. Content appears instantly, or with a ≤150ms opacity fade. Videos don't autoplay.

### Explicitly forbidden
Particles or particle fields, starfields, neural-net node animations, cyberpunk/neon/glitch/scanline aesthetics, heavy or animated gradients and mesh blobs, glassmorphism stacks, parallax layering, scroll-jacking, 3D tilt on hover, cursor followers/trails, typewriter text, counters that "tick up" fake metrics, bouncy/spring overshoot easings, marquee logo walls.

---

## 6. Component Visual Specs

### 6.1 Navbar
- Height 64 desktop, 56 mobile. Sticky. Transparent at the top, then elevated per §5.
- Left: wordmark **"Wadu Chen"** in Geist 500, 16px, −0.01em, `--text`. No logo mark and no monogram.
- Right (desktop): `Research · Publications · Projects · Engineering · Community · Contact` in Inter 500, 14px, `--text-muted`, with 32px gaps. Hover goes to `--text`. The active section shows `--text` with a 1px accent underline offset 6px.
- Far right: optional theme toggle (16px line icon) and an outline "Email" pill (32px tall).
- Mobile: a "Menu" text button (not a hamburger glyph). It opens a full-screen `--bg` sheet with the links in `h3` size, stacked with 24px gaps, and fades in over `dur-base`.

### 6.2 Hero
- Height: `min(100svh, 920px)`. Content is vertically centered, slightly above the optical center.
- Layout desktop: text in **columns 1–6**, diagram in **columns 7–12**. Tablet/mobile: text first, diagram below at 4:3.
- Content:
  - Eyebrow (`label`, `--text-muted`): `EMBODIED AI · ROBOTICS`
  - Name (`display`): **Wadu Chen**
  - Title (`h3`, `--text-secondary`, 16px below): **Embodied AI Researcher**
  - Statement (`lead`, max 34ch, 24px below): "Building intelligent robotic systems through robot learning, simulation, perception, and control."
  - Pillars row (32px below): four `label` items separated by thin 16px vertical rules: `ROBOT LEARNING | SIMULATION | PERCEPTION | CONTROL`.
  - Actions (40px below): primary text link "View research →" (accent), secondary "Publications", and a tertiary email icon link. The primary is not a filled colored button; if a button is used, it's a solid `--text` fill with `--bg` text, 44px tall, 999 radius.
  - Proof line (bottom of the hero, `mono-sm`, `--text-muted`): `CVPR 2025 · AAAI 2025 · AAAI 2026 · ICML 2026 · IROS 2025 Workshop Best Paper · NeurIPS 2025 MARS Challenge Champion`. This is a quiet evidence strip, not badges.
- **Hero visual art direction (original inline SVG):**
  - Subject: a side-elevation schematic of a **multi-joint arm ending in a simplified dexterous hand**, drawn as engineering line art: circles for revolute joints, thin links, and small RGB-less **coordinate triads** (x/y/z as short strokes, labeled in `Geist Mono` 10px `--text-faint`: `q₁ … q₆`, `{base}`, `{ee}`).
  - Two superimposed renderings, offset by about 12px and slightly rotated (≈2°):
    - **Simulation layer:** 1px dashed strokes (4/4 dash) in `--text-faint`, labeled `sim`.
    - **Real layer:** 1.25px solid strokes in `--text`, labeled `real`.
  - A single **accent-colored trajectory** (1.5px `--accent`, smooth Bézier) runs from an object marker (a small cube outline) to the end-effector. This is the only color in the hero.
  - Optional: faint camera frustum lines (perception) pointing at the object, plus a tiny annotation block in mono: `π(a | o)` / `domain randomization`.
  - Background: a static 40px graph-paper grid at 3–4% opacity, fading out at the edges via an alpha mask (the one allowed functional gradient).
  - Stroke caps round, no fills except `--bg` knockouts behind labels. No 3D, no glow, no shading.
  - Later upgrade path: replace or augment with a clearly licensed hardware photograph or a still from own RoboTwin-style simulation footage, keeping the same right-column framing.

### 6.3 Research Topic Block (5 directions)
- Section title: eyebrow `RESEARCH` + `h2` "Research directions" + a one-sentence `lead` intro.
- Layout desktop: **list-style rows**, not a card grid. Each row spans 12 columns and is separated by 1px `--border` rules (top and bottom). This is the DeepMind/OpenAI editorial feel.
  - Col 1–1: index in `label` (`01`–`05`), `--text-muted`.
  - Col 2–5: topic name in `h3`.
  - Col 6–10: 2–3 line description in `body-sm`, `--text-secondary`.
  - Col 11–12: right-aligned "evidence" tags (max 2), e.g. `ICML 2026`. If there's no evidence, show nothing. Don't fabricate.
  - Row padding 32 vertical. Hover: the row background goes to `--bg-subtle`, and the index turns `--accent`.
- Each row may carry a **16×16 line glyph** (1px stroke, `--text-muted`) drawn in the same schematic language as the hero:
  - Robot Learning: a policy loop (circle with an arrow).
  - Vision-Language-Action Models: an eye plus a text-line plus an arrow triad.
  - Dexterous Manipulation: a three-finger joint chain.
  - Reinforcement Learning: an agent/environment loop with a reward tick.
  - Sim2Real Transfer: a dashed box → solid box.
- Mobile: stacked rows with the index and name on one line, description below, tags below that.
- Suggested copy anchors (factual):
  | Direction | Evidence to reference | Framing |
  |---|---|---|
  | Robot Learning | RoboTwin 2.0 (ICML 2026), G3Flow (CVPR 2025), NeurIPS 2025 MARS champion | Established |
  | Vision-Language-Action Models | MARS 2025 SpaVLE track (spatial vision-language embodied), RoboTwin 2.0 uses multimodal LLMs for data generation | **Focus area**: no VLA paper yet |
  | Dexterous Manipulation | Dexterous hand control framework and algorithms (industry internship); MM-Hand 1.0 (HKU MMLab collaboration) | Established (engineering) |
  | Reinforcement Learning | MSc coursework (Dynamic Programming & RL) | **Focus area**: no RL publication; keep high-level |
  | Sim2Real Transfer | RoboTwin 2.0 domain randomization and sim-to-real; sim data collection for MARS | Established |

### 6.4 Project Card
- Grid: 2 columns desktop (6+6), 1 column mobile. The first card may be featured and span 12 columns, with media on the left 7 columns and text on the right 5.
- Structure (top → bottom):
  - Media (4:3, radius 12, `--bg-subtle` placeholder showing a small centered schematic glyph until real media exists).
  - Meta row: `label` for date range `2025.04 – 2025.07` and category `SIMULATION · BIMANUAL`.
  - Title `h3` (large card) / `h4` (compact).
  - Description `body-sm`, max 3 lines.
  - Outcome row: up to 2 tags, where the most important one is accent (e.g. `IROS 2025 WS · BEST PAPER`).
  - Links row (only if URLs exist): `Paper ↗ · Code ↗ · Project ↗` in Inter 500 14px, `--text`, with an accent underline on hover.
- Card behavior per §4 hover. The whole card is clickable only if it has a single destination; otherwise only the links are.
- Candidate projects (factual): RoboTwin 2.0, G3Flow, NeurIPS 2025 MARS SpaVLE Track 2 (Champion), MM-Hand 1.0, dexterous hand R&D (industry), LeRobot single/dual-arm course (HKAGE), ROS2 driverless car (1st of 8 teams).

### 6.5 Engineering / Timeline
- Section on a `--bg-subtle` band. Eyebrow `ENGINEERING` + `h2` "Hardware & systems".
- Layout desktop: a vertical timeline. The **left rail (col 1–3)** holds dates in `label` with tabular figures, e.g. `2025.08 — 2026.05`. The **right (col 4–10)** holds entries. A 1px `--border-strong` vertical line connects 8px hollow circular nodes (1px `--text` stroke, `--bg-subtle` fill). The current/most recent node is filled `--accent`.
- Entry: organization in `h4`, role in `body-sm` `--text-muted`, 2–3 compact bullets in `body-sm` (use 12px en-dash markers, not dots), and an optional outcome line in `mono-sm` (e.g. `→ MM-Hand 1.0`).
- Mobile: the rail collapses. The date sits above each entry and the line runs on the left edge, 20px inset.
- Reveal: entries stagger 80ms. The line does **not** animate-draw (keep it calm).

### 6.6 Writing / Publication Card
- Primary format is an **index list** (OpenAI Research style), not image cards.
- Row (desktop, 12 columns, 1px rules between):
  - Col 1–2: venue in `label`, `--text`, with year beneath in `label` `--text-muted` (e.g. `CVPR` / `2025`).
  - Col 3–9: title in `h4` (Geist 600, 20px). Below it, authors in `mono-sm` `--text-muted` with **Qiangyu Chen** set in `--text` weight 500. Contribution note, if known, in `caption`: `Co-first author` / `Second author`.
  - Col 10–12: right-aligned tags (e.g. accent `BEST PAPER`) and links `PDF ↗ · Code ↗` (only when real URLs exist).
- Hover: title turns `--accent`, row background `--bg-subtle`.
- Filters (optional, top): pills `All · Robotics · Vision` in `label` style. The active pill is `--text` fill with `--bg` text.
- "Writing" (future notes/essays) reuses the same row with venue replaced by date and category. Don't show an empty Writing section. Hide it until posts exist.
- Author lists are **not in the resume**. Implement a placeholder rule: show authors only once they're verified from the paper; otherwise show just the contribution note.

### 6.7 Community — Lumina Embodied AI Community
- Tone: **an open research community**, documented like a lab reading group, not marketed like a product. No "Join now!" banners, member counters, or testimonials.
- Section on a `--bg-subtle` band (or plain `--bg` if Engineering already used the band directly above; don't place two bands adjacent).
- Layout: col 1–6 text, col 8–12 a quiet "community card".
  - Eyebrow `COMMUNITY`, `h2` "Lumina Embodied AI Community".
  - `lead`: one or two sentences on the community's purpose (open exchange on embodied AI, robotics, and robot learning). Keep it generic until the user supplies specifics.
  - Role line in `mono-sm`: `Founder & organizer — Wadu Chen` (resume: 主理人).
  - Community card (bg-elevated, radius 16, padding 32): three short rows with 1px dividers, each a `label` heading plus a `body-sm` line. Suggested row headings: `FORMAT`, `TOPICS`, `PARTICIPATE`. Their content stays **TBD/user-supplied**; don't invent event counts, members, or partners.
  - One text link: "Get involved →" to a real URL (hide it if none).
- Visual motif: a small SVG network of 5–7 nodes with thin, static, unanimated edges, in the same schematic stroke as the hero. It's allowed because it's static and diagrammatic. Never animate it into a "neural network" effect.

### 6.8 Contact
- Minimal, centered in col 1–8 (left-aligned, not centered text).
- Eyebrow `CONTACT`, then `h2` "Open to research collaboration."
- `lead` line: "For research, collaboration, or community inquiries:"
- The email **qiangyuchen516@gmail.com** is set large in `h3` Geist, as a link with an accent underline on hover and a small "Copy" mono button beside it (feedback: the label changes to `COPIED` for 1.5s, with no toast).
- Secondary links row in `mono-sm`: `GitHub ↗` (only if the user confirms the account), `Google Scholar ↗`, `LinkedIn ↗`. Show only the ones that are provided. **Do not publish the phone number** from the resume.
- Affiliation line in `caption`: "MSc Data Science, City University of Hong Kong".

### 6.9 Footer
- Height about 120, top 1px `--border`, `--bg`.
- Left: `© 2026 Wadu Chen` in `caption` `--text-muted`.
- Center/right: a repeat of the nav links in `caption`, plus the theme toggle.
- Far right: `Built with care · Hong Kong / Shenzhen` in `mono-sm` `--text-faint` (optional).
- No social icon row, no "made with Next.js" badge, no back-to-top rocket. A plain "Top ↑" text link is fine.

---

## 7. Iconography & Diagrams
- Line icons only, 1–1.25px stroke at 16/20px, round caps, `currentColor`. Draw custom icons in the hero's schematic language. A generic set (e.g. Lucide, ISC license) is acceptable for utility icons (arrow, copy, external, sun/moon).
- Arrows: `→` for internal navigation, `↗` for external links.
- Diagrams share one grammar: joints as circles, links as lines, frames as triads, sim as dashed, real as solid, accent as one path.

## 8. Accessibility & Quality Bar
- WCAG AA contrast for all text. `--text-faint` is never used for meaningful text.
- Focus: 2px `--focus-ring` outline, 2px offset, on every interactive element. Never remove it.
- Minimum hit target 44×44 on touch.
- Hero SVG gets `role="img"` and an `aria-label` describing it as a schematic of a robot arm in simulation and reality. Decorative glyphs are `aria-hidden`.
- Performance: no hero video on first load, fonts subset to Latin (plus CJK lazily if needed), LCP element is the hero name (text), total JS for motion kept minimal.
- Static-export friendly: no server features, images pre-sized, `basePath` not needed for a `<user>.github.io` root repo.

---

## 9. Content Source of Truth (from `QiangyuChen.pdf`)

**Name mapping:** Resume name 陈锵宇 / **Qiangyu Chen** → public display name **Wadu Chen**. Publications use "Qiangyu Chen".

### Education
- **City University of Hong Kong**: MSc Data Science (in progress). Coursework: Dynamic Programming & Reinforcement Learning, Embodied AI & Applications, Time Series & Neural Networks, Machine Learning.
  - *Outstanding Research Project Award 2026*: "Data-Dependent Thresholds and Structured Non-Monotonicity in Low-Rank MERA Image Fitting".
- **Shenzhen University**: B.Eng. Computer Science and Technology, 2021.09 – 2025.06. Coursework includes Algorithms, Data Structures, Computer Systems, Microprocessors & Robotics, Computer Vision.
  - Awards: Silver Award, preliminary round of the National Algorithm Elite Competition (China Computer Application Technology Competition); Top Talent Innovation Award; Outstanding Student Cadre.

### Experience (for the Engineering timeline)
- **Design Consultant**, Shenzhen Hetao Institute × HKU MMLab (English institute name to confirm), 2025.08 – 2026.05. Mechanical design concepts (highly adopted), embedded software debugging, control algorithm and state-machine design. Outcome: **MM-Hand 1.0**.
- **Development Intern & Teaching Assistant**, Parami AI (HK), 2025.09 – 2026.04. Technical lead for the **LeRobot single- and dual-arm HKAGE course**.
- **R&D Intern**, 深圳星际光年科技有限公司 (Shenzhen dexterous-hand startup; confirm English name), 2024.09 – 2025.01. Worked on early-generation dexterous hands, built the embedded hardware/software control framework, designed control algorithms and demo algorithms. Company outcomes: product selected for Hong Kong DeepTech100 and the Google Cloud startup program; first prize in the XbotMan-2024 Lianghu Hard-Tech Startup Competition. *(These are company/product achievements; phrase them as "the product…", not personal awards.)*
- **Assistant Development Engineer, R&D**, 松灵机器人 (AgileX Robotics; confirm), 2024.08 – 2024.09. ROS2-based driverless car development (**ranked 1st of 8 teams**), assisted with parts of RoboTwin 1.0, maintained the asset-display front-end.

### Publications & research
| Work | Venue / outcome | Role stated in resume | Dates |
|---|---|---|---|
| RoboTwin 2.0: A Scalable Data Generator and Benchmark with Strong Domain Randomization for Robust Bimanual Robotic Manipulation | **ICML 2026**; **IROS 2025 RoDGE Workshop Best Paper**; China Spatial Intelligence Conference Outstanding Poster | not stated | 2025.04 – 2025.07 |
| G3Flow: Generative 3D Semantic Flow for Pose-aware and Generalizable Object Manipulation | **CVPR 2025** (accepted) | not stated | 2024.08 – 2024.11 |
| CaPro: Curvilinear-aware Prompt Learning with Single Unlabeled Image for Cost-effective Curvilinear Structure Segmentation | **AAAI 2026** (poster) | **Co-first author** | 2024.07 – 2025.03 |
| Attack-inspired Calibration Loss for Calibrating Crack Recognition (AICL) | **AAAI 2025** (poster) | **Second author** | 2024.03 – 2024.07 |
| MARS 2025 Challenge on SpaVLE @ NeurIPS 2025, Track 2 | **Champion** | Collected sim data, validation experiments, policy configuration tuning | 2025.09 – 2025.11 |

### Community
- **Founder/organizer (主理人), Lumina Embodied AI Community.** No further details in the resume.

### Links present in the resume
- Email only: `qiangyuchen516@gmail.com`. (A phone number is also listed; **do not publish it**.)
- No GitHub, Scholar, LinkedIn, paper, or project URLs are in the PDF. The user mentioned the GitHub handle `QiangyuChen1` (repo `QiangyuChen1.github.io`), so confirm before linking.

### What is real vs. what must stay high-level
- **Real and safe to feature prominently:** the four venue papers and their venues, the RoboTwin 2.0 Best Paper (workshop) and poster award, the NeurIPS 2025 MARS champion result, the co-first/second author roles on CaPro/AICL, MM-Hand 1.0, the dexterous hand engineering work, the LeRobot course lead role, CityU MSc and SZU BEng, the MERA research award, Lumina founder.
- **Keep high-level / flag as focus areas:** *Vision-Language-Action Models* and *Reinforcement Learning* have no dedicated publication. Present them as current research directions supported by coursework and the challenge/data-generation work. Do not imply first-authored VLA or RL papers.
- **Unknown, so do not invent:** author lists and author order for RoboTwin 2.0 and G3Flow; quantitative results (success rates, benchmarks); paper, code, and project links; Lumina details (members, events, partners); English names of some Chinese organizations; any images of the hardware.
- **Research breadth note:** CaPro and AICL are vision/segmentation/calibration papers, not robotics. Show them under a "Vision" filter in Publications, not as embodied-AI evidence in the Research section.
- **Title "Embodied AI Researcher":** acceptable as a positioning statement (MSc student with robotics publications). Avoid titles like "Scientist", "Lead", or "PhD".
- **Company awards** (DeepTech100, Google Cloud program, XbotMan first prize) belong to the startup/product. Attribute them accordingly, in a secondary text style.
