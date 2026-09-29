# qiangyuchen1.github.io

Research homepage for Qiangyu Chen, Embodied AI Researcher. Next.js (App Router) static export for GitHub Pages at [qiangyuchen1.github.io](https://qiangyuchen1.github.io/).

## Run

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # content check → static export in out/
npm run start          # serve out/ locally
npm run lint && npm run typecheck
```

Pushing to `main` deploys through `../.github/workflows/deploy.yml`, which builds this directory.

## Where things live

```
app/                  layout (fonts, metadata, JSON-LD), page composition, 404, robots, sitemap, globals.css (tokens + type scale)
content/              every fact and line of copy, typed in content/types.ts
  evidence.ts         source ledger; every record cites IDs from here
  figures.ts          all images and logos (MediaRef), files in public/figures/
components/
  layout/             Navbar, Footer
  sections/           one component per page section, in page order
  blocks/             DirectionCard, ProjectCard, Timeline: composites built from ui/
  visuals/            HeroScene (canvas) and its pure modules in hero-scene/
  ui/                 primitives: Card, Container, Section, SectionHeader, Eyebrow, Tag/TagList,
                      ScopeBadge, ButtonLink/LinkRow/AnchorChip, DateRangeText,
                      MediaFrame, Mark, Reveal, MotionProvider, SkipLink
lib/                  cn, date formatting and sorting, contact rules, hooks
scripts/              check-content.mts (runs before every build)
design/               Phase 1 specs; COMPONENT_ARCHITECTURE.md is kept current
sources/              supplied originals (gitignored). Copy published files into public/ first.
```

## Conventions

- **Content only in `content/`.** Only `app/` imports from `content/`; components get everything through props.
- **No invented facts.** New records need an evidence ID; links must be real `https://` URLs. `npm run check:content` fails the build on unknown IDs, missing image files, malformed dates, or accent highlights that aren't Best Paper, Best Poster, or Champion.
- **Images.** Add the file to `public/figures/`, register it in `content/figures.ts` with its real pixel size and credit, then reference it. Project teasers render in a fixed 16:10 `MediaFrame` and work-direction figures in a 4:3 one, so cards line up; logos use `presentation: "logo"`. Black-on-transparent marks set `monochrome: true` to invert in dark mode; colored marks with dark ink set `darkPlate: true`.
- **Certificates.** `Project.awards` holds one `MediaRef` per certificate. Each becomes its own chip that opens its own original (`href`, e.g. a PDF) or, without one, its image. Chips use a small thumbnail so the page does not download the full scan.
- **Supplied originals** live in `sources/` (gitignored): the résumé, portrait, and certificate files. Copy anything that should appear on the site into `public/` first. The résumé lists a phone number and is never published.
- **Timeline order is derived** from dates (`byRecency` in `lib/format.ts`): newest first, ongoing entries marked with the accent dot.
- **Motion** respects `prefers-reduced-motion`: reveals drop their transform, and the hero canvas draws one still frame.

## Hero scene

`components/visuals/HeroScene.tsx` draws a 6-axis arm bracing a phone and a 7-axis arm inserting a USB-C plug whose cable runs to a charger on the table, sampling candidate trajectories before the approach and the alignment. The canvas bundle loads after first paint. The logic is plain TypeScript and can be checked without a browser:

- `hero-scene/kinematics.ts`: vector helpers, analytic IK, the extra roll joints of a 6- and 7-axis arm, Bézier, seeded PRNG
- `hero-scene/choreography.ts`: the insertion script and `sampleFrame(t)`, a pure function of time
- `hero-scene/render.ts`: canvas drawing, colors read from the CSS tokens

```bash
node -e 'import("./components/visuals/hero-scene/choreography.ts").then(m => console.log(m.sampleFrame(5.4).plug))'
```

The public contact address is set in `content/profile.ts`.
