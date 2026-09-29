# Visual Critique — Wadu Chen research homepage

Reviewer stance: a Google DeepMind researcher looking at a junior colleague's homepage.
Scope: critique only. No code was changed.

**How it was reviewed.** `next dev` on port 3000 (Next.js 16.3.6). Full-page captures at 1440 px wide in light and dark (headless Chrome, `preferredColorScheme` forced), zoomed 3× crops of the hero diagram, and 390 px mobile in the Cursor browser with device emulation (menu, anchors, overflow checked through the DOM). Hover states were checked only in code, not interactively. Measured page height: **11,562 px at 1440** and **16,401 px at 390**.

---

## Verdict

The visual system is right. The editorial layer is not there yet. Typography, palette, spacing and restraint match `VISUAL_IDENTITY.md` closely. The hero diagram is original and on-brand, and the honesty machinery ("Direction" badges, "Related work, not a VLA model", "Product outcome") is better than most senior researchers' pages. In the first viewport it already reads as *robotics*, not as a generic developer template. But below the hero it turns into a **structured résumé rendered in a lab typeface**. The same five pieces of work come back five to nine times across Research chips, Project cards, Engineering capability cards, the Timeline and Papers. Every project card is a form (Question / Approach / Results / badge / five uppercase tags / role). Papers, the strongest evidence, don't start until about 72% of the way down the page. And the page ends on "Open to research collaboration." followed by "Contact details coming soon." with **zero outbound links anywhere on the site**. A DeepMind reader would come away with "careful, but I can't tell what the one thing is, and I can't reach them." Fix the structure and the dead end, and the existing visual quality will carry the rest.

---

## What already works

- **Type system implemented as specified.** Geist 500 display (88 px desktop), Inter body, Geist Mono labels; the h2 at 44 px with a mono eyebrow gives every section a confident, consistent opening. Measures are respected (intros sit in the left 7 columns).
- **Palette and accent restraint.** Warm paper `#FAFAF8`, hairline cards, no resting shadows. The cobalt shows up only in the hero trajectory, the nav underline, a few venue tags and the current timeline node. Nothing forbidden: no particles, gradients, glow or tilt.
- **Hero diagram is original and on-concept.** Dashed sim layer, solid real layer, one accent trajectory, coordinate triads, faint graph paper. Together with "Wadu Chen / Embodied AI Researcher" it makes "robotics person" obvious within a second.
- **RoboTwin 2.0 feature schematic** (simulation → randomization stack → real) is the best graphic on the page. It explains the paper in one glance, in the same line grammar as the hero.
- **Honest states are visible, not hidden in data.** VLA and RL rows carry a `DIRECTION` badge and no evidence tags, the VLA row says "Related work, not a VLA model", and startup awards are labelled `PRODUCT OUTCOME`. No metrics, no phone, no Gmail.
- **Papers list is the right format.** OpenAI-style index with a venue/year column, bold short titles, author-position notes, All/Robotics/Vision filters, and "published as Qiangyu Chen".
- **Timeline is well made.** Right-aligned tabular dates, hollow nodes with an accent current node, en-dash bullets, and a clean mobile collapse.
- **Dark mode is faithful.** Arguably the hero looks even better on `#0A0A0B`. Cards, bands and the network motif all hold.
- **Mechanics are sound.** Every in-page anchor resolves (0 broken). The mobile "Menu" sheet moves focus to Close, and tapping "Papers" lands the section 16 px under the sticky nav. Skip link and reduced-motion handling are present.

---

## P0: must fix before this feels like a lab homepage

### P0-1. The page ends in a dead end, and there are no outbound links at all
- **Where:** `#contact` (`ContactSection`, `content/profile.ts → contact`), and site-wide.
- **What's wrong:** The h2 promises "Open to research collaboration." and the next line says "Contact details coming soon." No paper, code or profile link exists anywhere on the page either, so a visitor who is interested has literally nothing to click that leaves the site. This is the single most "unfinished" signal on the page.
- **Change (no invented data):**
  1. **Content blocker for Julie, not the engineer:** supply at least one approved channel (confirmed GitHub handle per IA §8.1, or a professional or CityU address per IA §8.2). Do not use the personal Gmail or the phone number.
  2. **Until a channel exists:** don't render a Contact section that promises and then fails. Either (a) remove `contact` from `navItems` and don't render `ContactSection` when `empty` is true, moving the affiliation line into the footer; or (b) change the heading to a neutral `Contact` and drop the collaboration pitch so the fallback line isn't a letdown. Option (a) is preferred.
  3. Add a prebuild warning in `scripts/check-content.ts` (or equivalent) when `contact` has no channels, so production doesn't ship like this by accident.

### P0-2. Evidence is repeated five to nine times, and papers arrive too late
- **Where:** Research rows → Projects → Engineering capability grid → Timeline → Papers.
- **What's wrong (counted on the rendered page):** RoboTwin appears in the hero strip, in 3 research rows (as chips, plus a *second* "RoboTwin 1.0 and RoboTwin 2.0" chip in the same Sim2Real row), as the featured project, in 2 engineering cards, in the timeline, and in Papers. MM-Hand and the dexterous-hand internship each appear 4–5 times. The desktop page is 11.6k px, and **Papers starts at y ≈ 8,300 (72%)**; on mobile it starts at y ≈ 12,400 of 16,400 (76%). A research visitor scrolls past four sections of the same facts before seeing venues in a list. `VISUAL_IDENTITY.md` put Publications second; the IA put it fifth. The rendered result shows the IA order is too costly.
- **Change:**
  1. Reorder `app/page.tsx` to **Hero → Research → Papers → Projects → Engineering → Lumina → Contact**, and update `navItems` to match.
  2. **Cut the Engineering capability grid** (five `CapabilityBlock` cards). Keep the section heading, a one-paragraph intro, and the `Timeline`. Fold the unique facts that exist only there into timeline one-liners, which already carry them: ROS2 car 1st of 8, LeRobot course lead. Drop the "Model deployment: Direction" card entirely (see P1-8).
  3. In Research rows, cap related chips at 2 and drop engineering-item chips (`relatedEngineering`). Specifically, remove the duplicate `eng-sim` "RoboTwin 1.0 and RoboTwin 2.0" chip from Sim2Real, and remove the "LeRobot single- and dual-arm course" chip from Robot Learning (teaching a course is not robot-learning evidence and dilutes the row).
  - Target: under ~8,000 px at 1440.

### P0-3. Project cards read as résumé forms, not research work
- **Where:** `ProjectCard` (all six cards), `content/projects.ts`.
- **What's wrong:** Every card has the same scaffold: meta row, title, mono context line, `QUESTION`, `APPROACH`, `RESULTS` plus a `TEAM RESULT` badge, an accent tag, 2–5 uppercase mono tool tags, and `Role:`. The eye sees labels, not ideas. The filler is obvious:
  - G3Flow "Results: Accepted at CVPR 2025." repeats the context line and the accent tag directly above it.
  - RoboTwin says "Best Paper, RoDGE Workshop @ IROS 2025" **three times**: in the context line, as a results bullet, and as an accent tag.
  - "ICML 2026." is listed as a *result*.
  - CaPro carries a `TEAM RESULT` badge right above "Role: Co-first author", which undersells the one paper with a stated lead role.
  - The "Question" framing on the two internship cards ("What control architecture lets an early-stage dexterous hand…") reads as a research question written after the fact for engineering work.
  - The five non-featured cards have no visual at all, only a 16 px glyph in the corner. The section looks like a wall of text next to the one good schematic.
- **Change:**
  1. New anatomy: meta row → title → one-sentence summary (use `approach`, not `researchQuestion`) → **one** outcome line → at most 3 tool tags → links. Keep `Question` only on the featured card.
  2. Suppress `keyResults` entries that equal the venue or honor already in `context`/`highlight`. Don't render `Results` when what's left only restates acceptance.
  3. Hide `ScopeBadge` when `role` states an individual contribution (co-first author, R&D intern: control framework). Show `TEAM RESULT` only on RoboTwin, G3Flow and MARS, where role is unconfirmed or team-level.
  4. Give every standard card the spec'd media slot (§6.4): a 4:3 `--bg-subtle` panel with an **original line schematic** in the hero's grammar. For example: a three-finger kinematic chain for MM-Hand and the dexterous-hand card, a camera frustum over an object with a flow arrow for G3Flow, a curved-structure trace for CaPro, and a sim box → policy loop for MARS. No photos or stock imagery. Replace them with Julie's own hardware photos when she supplies them.

### P0-4. Mobile scrolls sideways (the page is 402 px wide in a 390 px viewport)
- **Where:** `HeroVisual` → `<div class="graph-paper absolute -inset-8">`.
- **What's wrong:** Measured `scrollWidth 402` vs `clientWidth 390`. The graph-paper layer extends 32 px past the container, which drags the fixed header and every band 12 px wider. The page wobbles horizontally on touch, and the `--bg-subtle` band edge visibly stops short of the right side.
- **Change:** Add `overflow-hidden` to the `HeroVisual` wrapper (or `overflow-x: clip` on `#top`), or use `inset-0` below `lg`. Re-verify `document.documentElement.scrollWidth === innerWidth` at 360, 390 and 768.

---

## P1: should fix

1. **Hero says the same four words three times.** The eyebrow (`EMBODIED AI · ROBOT LEARNING · MANIPULATION`), the statement ("robot learning, simulation, perception, and control"), and the pillars row (`ROBOT LEARNING | SIMULATION | PERCEPTION | CONTROL`) all sit in one viewport. **Change:** remove the pillars row from `Hero.tsx`. The statement already carries it, and on mobile the row wraps with `CONTROL` orphaned and no separators.
2. **The hero's strongest evidence sits at the fold edge, in the faintest style.** The proof strip (ICML 2026 · IROS Best Paper, CVPR 2025, NeurIPS MARS Champion) is 13 px mono `--text-muted` at y ≈ 880 of a 900 px viewport. It falls below the fold on 800 px laptops, and on mobile it's about 1,000 px down, below the diagram. **Change:** move the signal list into the text column, directly under the statement (replacing the pillars), in `--text-secondary`, one item per line with the venue in `--text`. Keep it as plain text, not badges. Keep the bottom hairline strip only if it still has a job afterwards.
3. **The hero diagram reads as a "π" typo and a stick figure.**
   - `π(a | o)` renders as a capital **Π** (a product sign) because the Latin-only Geist Mono subset has no Greek, so it falls back. **Change:** give that `<text>` `font-family: var(--font-inter)` with Inter loaded with the `greek` subset, or use an italic serif fallback. Same for the `q₁…q₆` subscripts, which render from a fallback font at a mismatched size.
   - The palm is a trapezoid with four legs hanging straight down, and at hero scale it reads like a little figure in a skirt. The trajectory ends in the middle of the fingers, and the hand hovers over empty ground far from the cube, so no grasp is depicted. **Change:** redraw the end-effector as a side-view hand (palm plus 2–3 curled finger chains) oriented *toward* the cube, and run the accent trajectory from the end-effector's pre-grasp pose to the cube.
   - `q₁` collides with the dashed base box. Nudge `LABEL_POS[0]`.
   - Below 640 px the 10 px SVG labels scale to about 6–7 px and are unreadable. **Change:** hide the legend and annotation text under `sm`, or bump label size via a media query.
4. **An evidence tag overflows the grid.** In the Research Sim2Real row, `IROS 2025 WS BEST PAPER` spans x = 1167–1374, past the 1360 px content edge. **Change:** allow the tag to wrap, or widen the evidence column to `lg:col-span-3` and shrink the description to 4 columns; `whitespace-normal text-right` also works.
5. **Accent tag misuse.** The spec reserves the accent tag for the most important *venue or award* on a card. `MM-HAND 1.0` (a deliverable) and `CVPR 2025` (duplicating the context line) use it. **Change:** accent only for `Best Paper` and `Champion`. Other cards get a neutral tag or none.
6. **Too much uppercase mono.** On a single project card there are up to seven uppercase Geist Mono elements (date, category, three field labels, scope badge, tools). The spec limits `label` to eyebrows, venues and dates. **Change:** render tool tags as Inter 13 px sentence case (`body-sm`, `--text-muted`, pill), and field labels (if kept) as Inter 12 px medium. Keep mono only for dates, venues and eyebrows.
7. **Defensive meta-copy.** The Projects intro "Results are stated as published or awarded; team efforts are marked as such." reads like a legal disclaimer. **Change:** replace it with a one-line framing of the work, e.g. "Selected work across simulation, dexterous hardware, and perception," or remove it. The badges already do this job.
8. **The empty Direction card leaves a hole.** The dashed "Model deployment" card sits alone in a 3+2 grid, with an empty third slot to its right. If P0-2 keeps any of the grid, **change** it to one line in the Engineering intro ("Next: taking learned policies from simulation onto physical arms and hands end to end.") instead of a card.
9. **"Project →" pills in Papers look like paper links.** They're internal anchors styled like the external-link buttons that will eventually hold `Paper ↗ / Code ↗`. **Change:** render them as a quiet text link, "See project ↓", in `caption` `--text-muted`, and reserve the pill style for real external links.
10. **The Lumina card repeats the paragraph.** The card row `COMMUNITY: Lumina, open to people working on embodied AI.` says less than the lead beside it, and the section is 827 px tall for about 60 words. **Change:** drop that `dl` row, keep the network motif plus `TOPICS`, and reduce the section to standard padding without the band (bands currently sit on Engineering and Community; if Engineering shrinks, one band is enough).
11. **Hydration warning.** The Next dev overlay shows "1 Issue": *attributes of the server rendered HTML didn't match*, pointing at `components/Timeline.tsx:65` (`TimelineItem` inside `Reveal as="li"`). It's likely a Framer Motion `style` mismatch between server and client (`initial` vs reduced-motion branch in `useReducedMotionSafe`). **Change:** reproduce in a clean Chrome profile; if it persists, make `Reveal`'s initial state identical on server and first client render (read reduced motion only after mount).
12. **Mobile eyebrow breaks badly.** At 390 px, `EMBODIED AI · ROBOT LEARNING ·` wraps with the dot left dangling at the end of line 1. **Change:** render the eyebrow as separate `<span>`s with `whitespace-nowrap` per item and dots as separators, or shorten it to `EMBODIED AI · ROBOTICS` as `VISUAL_IDENTITY.md` §6.2 specifies.

---

## P2: polish

1. **Research glyphs are near-invisible.** At 16 px and 1 px stroke in `--text-muted`, they read as specks next to a 28 px h3. Either render them at 20 px in `--text-secondary`, or drop them.
2. **Research evidence tags are grey on grey.** `ICML 2026` and `CVPR 2025` on the Robot Learning row are the most important facts in the row but get the weakest styling. Use `--text` on `--bg-subtle`, or plain `mono-sm` right-aligned text without a pill.
3. **Mobile chips stack one per line.** Under Robot Learning, 4 chips plus 2 tags form a ~250 px column. P0-2's cap of 2 fixes most of it; also consider `text-caption` chips on mobile.
4. **The "Papers are published as Qiangyu Chen." line** is 13 px mono muted, easy to miss, and styled like metadata. Set it in `caption` Inter under the h2, or put "Qiangyu Chen" in bold once in a real author line when author lists are verified.
5. **Footer "Built as a static site"** is implementation trivia. Drop it or replace it with "Hong Kong / Shenzhen" (`VISUAL_IDENTITY.md` §6.9).
6. **Dev-only role text.** "Role: Co-author (role pending)" shows in dev builds by design. Confirm the production export hides it (`showUnconfirmedRoles` is keyed on `NODE_ENV`) before deploy.
7. **Research row hover** turns the whole row `--bg-subtle`, but rows aren't links. Either make the title link to the first related item, or remove the hover so it doesn't imply clickability.
8. **Hero CTA pair.** "View research →" (solid ink pill) plus "Papers →" is fine. Once Papers moves up (P0-2), consider making "Papers" the primary, since it's the evidence a researcher wants first.
9. **Dark mode:** the `--bg-subtle` bands are only about 5% lighter than the page. Acceptable, but the band/no-band rhythm almost disappears. Consider a 1 px `--border` top rule on banded sections in dark only.

---

## Things I could not verify

- Interactive hover and focus rings were reviewed in code (`:focus-visible` 2 px accent ring, card lift, underline growth), not exercised with a pointer.
- Mobile captures came from the embedded browser, which only captures the current viewport, so mobile was sampled at key sections rather than as a continuous full page. Overflow and anchor behaviour were measured via the DOM.
- Production (`next build` / static export) was not run. Findings reflect `next dev`.

---

## Resolution

Checked 2026-09-29 against the source: `npm run lint`, `npm run typecheck` and `npm run build` all pass. In `next dev` at 390 px, `scrollWidth` equals `clientWidth` (both 390) and the page is 12,649 px tall (was 16,401). Desktop height at 1440 px was not re-measured.

- **P0-1: fixed in code, content still open.** `ContactSection` and the Contact nav item render only when `hasContactChannels` is true. The affiliation line moves to the footer, and `check:content` warns at prebuild. The site still has no outbound links until Julie supplies an approved channel.
- **P0-2: fixed.** Order is Hero → Research → Papers → Projects → Engineering → Lumina → (Contact), and `navItems` matches. The capability grid is gone (Engineering is now intro, "Next" line and timeline), and Research chips are capped at 2 project links with no engineering chips.
- **P0-3: fixed.** Cards now show summary, one outcome line and at most 3 tags, with Question only on the featured card. There's no duplicate Results block, the scope badge is gone from CaPro, and every non-featured card has a `ProjectSchematic`.
- **P0-4: fixed.** `HeroVisual` is `overflow-hidden` with graph paper at `inset-0`. Measured 390 = 390.
- **P1-1: fixed.** The pillars row is removed.
- **P1-2: fixed.** Signals sit in the text column under the statement, `--text-secondary` with the detail in `--text`.
- **P1-3: fixed.** π is drawn as a path and subscripts are mono `tspan`s. The hand is redrawn open toward the cube, the trajectory runs from pre-grasp to the cube, and labels are enlarged or annotations hidden below `sm`. The fix was not re-screenshotted.
- **P1-4: fixed in code.** The evidence column is `lg:col-span-3` with `min-w-0` / `max-w-full` tags. Not re-measured at 1440.
- **P1-5: fixed.** Accent tags are used only for `highlight` (Best Paper, Champion).
- **P1-6: fixed.** Tool tags are Inter sentence case and the field label is Inter 12 px. Mono is kept for dates, venues and eyebrows.
- **P1-7: fixed.** The Projects intro now reads "Selected work across simulation, dexterous hardware, and perception."
- **P1-8: fixed.** The Direction card is replaced by the "Next: …" line in the Engineering intro.
- **P1-9: fixed.** Papers use a quiet "See project" text link.
- **P1-10: fixed.** The Community `dl` row is dropped (Topics only) and the Community band is removed.
- **P1-11: fixed.** `Reveal`'s `initial` no longer depends on client state. A clean reload shows no dev overlay issues. The only mismatch seen came from `data-cursor-ref` attributes injected by the inspection browser.
- **P1-12: fixed.** Eyebrow items are separate `whitespace-nowrap` spans.
