# Technology Plan: Phase 2

Status: Phase 1 decision record. No project is scaffolded in this phase.
Related: `INFORMATION_ARCHITECTURE.md` (content), `COMPONENT_ARCHITECTURE.md` (components), `VISUAL_IDENTITY.md` (colors, type, motion).

---

## 1. Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | **Next.js (App Router)**, current stable | File-based routing for a future `/notes/` route; React Server Components render almost everything to static HTML; first-class static export. |
| Language | **TypeScript** (strict) | The content schema *is* the integrity guardrail. Typed `EvidenceId`, `Status`, `ToolTag` unions make fabricated or mis-tagged entries a compile error. |
| Styling | **Tailwind CSS** | Utility styling from tokens defined in `VISUAL_IDENTITY.md` (mapped to CSS variables); no runtime CSS-in-JS, which suits static export. |
| Motion | **Framer Motion** (`motion`) | Section reveal and one ambient hero element. Imported only in small client leaves (`Reveal`, `HeroVisual`, `Navbar`). Respects `prefers-reduced-motion`. |
| Output | **`output: 'export'`** → `out/` | Pure static files; GitHub Pages has no server runtime. |
| Hosting | **GitHub Pages** via GitHub Actions | Free, matches the `*.github.io` domain target. |
| Content | TypeScript modules in `content/` | Four papers and six projects don't justify a CMS. MDX added only when notes exist. |

### What static export rules out (and why that's fine)
Not available with `output: 'export'`: API routes / Route Handlers with dynamic behavior, Server Actions, middleware, ISR/revalidation, cookies/headers, `next/image` default optimizer, dynamic routes without `generateStaticParams`. The site needs none of these. A contact form is **not** planned. If one is ever needed, use a third-party form endpoint and never expose the personal email.

### `next.config` (described, not written)
- `output: 'export'`
- `images: { unoptimized: true }`, because the default loader needs a server
- `trailingSlash: true`, so `/notes/` exports as `notes/index.html` and Pages serves it without extension issues
- `basePath`: **unset** and `assetPrefix`: **unset** for the user-site target (see §3)
- `reactStrictMode: true`

---

## 2. Image and font strategy

### Images
- **No stock robot photos.** Imagery is (a) self-made diagrams/line art (sim → randomization → real, hand schematic), (b) the ambient hero visual rendered in code (SVG/canvas), or (c) paper figures **with credit** and only for papers Julie co-authored.
- Pre-optimize at authoring time (e.g. `sharp` script or manual export): **AVIF/WebP** plus PNG/JPEG fallback, widths ~640/1280/1920. Store under `public/media/`.
- Use `next/image` with `unoptimized` for consistent `width`/`height` (no layout shift) and lazy loading; or a plain `<picture>` inside `MediaFigure` for AVIF/WebP `srcset`. `alt` is mandatory in the schema.
- Hero visual: SVG or `<canvas>` with a static SVG fallback; `aria-hidden`; paused under reduced motion. Target < 30 KB JS for it.
- OG image: one static `app/opengraph-image.png` (1200×630). Static export supports static metadata image files.
- Favicon: `public/favicon-32.png` and `public/favicon-16.png`, plus `public/apple-touch-icon.jpg`, all square crops of `sources/head.jpg`. `app/manifest.ts` points at the same files.

### Fonts
- **`next/font`** (Google or local). Fonts are downloaded at build time and self-hosted in `out/_next/static/media`, so no runtime request to Google, which also avoids blocked-CDN issues for visitors in mainland China.
- Families and weights: **see `VISUAL_IDENTITY.md`.** Constraint from this doc: at most 2 families (a text face + a mono/technical face for venues, dates, and tags), with `display: 'swap'`, subsetted to `latin`. If the site ever renders 陈锵宇 visibly, rely on the system CJK stack rather than shipping a CJK webfont.
- Expose via CSS variables (`--font-sans`, `--font-mono`) consumed by Tailwind.

---

## 3. GitHub Pages: domain and repository mismatch

### The rule
GitHub Pages **user/organization sites** are served at `https://<owner>.github.io/` **only** from a repository named exactly `<owner>.github.io` owned by that account. Any other repo is a **project site**, served at `https://<owner>.github.io/<repo>/`.

### What exists
| Item | Value | Resulting URL |
|---|---|---|
| Target domain | `wadu999.github.io` | requires owner **`wadu999`** + repo **`wadu999.github.io`** |
| Repo the user named | `github.com/QiangyuChen1/QiangyuChen1.github.io` | serves **`https://qiangyuchen1.github.io/`**, not `wadu999.github.io` |
| Local clone in workspace (`wadu999.github.io/`) | remote `github.com/QiangyuChen1/wadu999.github.io` | a **project site** at **`https://qiangyuchen1.github.io/wadu999.github.io/`** (needs `basePath: '/wadu999.github.io'`), still not `wadu999.github.io` |

**Neither repo can publish to `wadu999.github.io`.** Only a GitHub account or organization named `wadu999` can.

### Recommendation
1. **Create or confirm the GitHub account (or organization) `wadu999`**, and create the repo **`wadu999/wadu999.github.io`**. This is the only path to the stated domain.
   - An **organization** named `wadu999`, owned by the `QiangyuChen1` account, lets Julie publish without managing a second login. The org's `wadu999.github.io` repo is an org site served at `https://wadu999.github.io/`.
   - First check the name is available: `https://github.com/wadu999`.
2. Build the new Next.js site in that repo. Replace the old content wholesale; do not migrate files from either existing repo.
3. **Base path `/`**: leave `basePath` and `assetPrefix` unset. All internal links are root-relative (`/`, `/#research`, `/notes/`).
4. Pages settings → *Build and deployment* → Source: **GitHub Actions**.
5. For the old repos (Julie's call, outside this phase):
   - `QiangyuChen1/QiangyuChen1.github.io`: optionally replace its `index.html` with a meta-refresh + `rel="canonical"` to `https://wadu999.github.io/`, so the legal-name URL forwards to the public identity.
   - `QiangyuChen1/wadu999.github.io`: archive or delete once the real one is live, to avoid a confusingly named duplicate project site.

**If `wadu999` is unavailable:** either (a) publish at `qiangyuchen1.github.io` (base path `/`, repo `QiangyuChen1.github.io`) and accept the legal-name domain, or (b) buy a custom domain (e.g. `wadu.ai`-style) and point it at any Pages repo via `public/CNAME` (base path stays `/`). Do **not** ship a project-site build under `/wadu999.github.io/`: the URL is awkward and it would need a non-root `basePath`.

**Fallback config if a project site is ever unavoidable:** set `basePath: '/<repo>'` and `assetPrefix: '/<repo>/'`, and route every hard-coded asset path through a `withBase()` helper. Designing links as root-relative plus `next/link` keeps that switch to a single config line.

---

## 4. Static export and deployment plan

### Build
```
npm ci
npm run check:content      # scripts/check-content.ts (integrity rules)
npm run lint && npm run typecheck
npm run build              # next build → out/  (output: 'export')
```
`prebuild` runs `check:content` so a local `npm run build` can't bypass it.

### Required static files in `out/`
- `index.html`, `404.html` (from `app/not-found.tsx`)
- `.nojekyll` (from `public/`). Without it, Jekyll processing hides `_next/`. The official Pages Actions artifact flow doesn't run Jekyll, but the file is kept as a safeguard.
- `robots.txt`, `sitemap.xml` (from `app/robots.ts`, `app/sitemap.ts`, exported statically; set `export const dynamic = 'force-static'` if required by the Next version)
- No `CNAME` for `wadu999.github.io` (only for a custom domain)

### GitHub Actions workflow (`.github/workflows/deploy.yml`, described)
- Trigger: push to `main`, plus `workflow_dispatch`
- Permissions: `contents: read`, `pages: write`, `id-token: write`
- Concurrency group `pages`, cancel-in-progress
- Job **build**: `actions/checkout` → `actions/setup-node` (LTS, npm cache) → `npm ci` → `npm run build` → `actions/upload-pages-artifact` with `path: out`
- Job **deploy**: `needs: build`, environment `github-pages`, `actions/deploy-pages`
- (`actions/configure-pages` with `static_site_generator: next` is **not** used. It injects a `basePath` for project sites, and here the base path is intentionally `/`.)

### Anchors and routing
- Section anchors are plain `id`s with `scroll-margin-top` equal to navbar height; smooth scroll is CSS (`scroll-behavior: smooth`) disabled under reduced motion.
- No client-side router dependence for the main page. It works with JS disabled, apart from motion and active-nav highlighting.

---

## 5. Quality budgets

| Metric | Target |
|---|---|
| Lighthouse (mobile) Performance / A11y / Best Practices / SEO | ≥ 95 / 100 / 100 / 100 |
| First-load JS (main page) | ≤ 120 KB gzip (Framer Motion is the main cost; import only `motion`/`m` + `LazyMotion` with `domAnimation`) |
| LCP | < 1.8 s on mid-tier mobile (hero is text-first) |
| CLS | ≈ 0 (fixed image dimensions, `next/font` fallback metrics) |
| Accessibility | Keyboard-navigable nav, visible focus, contrast per `VISUAL_IDENTITY.md` tokens (WCAG AA minimum), reduced-motion honored |

---

## 6. Explicitly out of scope
- Reusing any code, content, styles, or structure from `QiangyuChen1/QiangyuChen1.github.io` or the local `wadu999.github.io/` clone
- Server features (forms backend, analytics requiring a server, auth)
- CMS
- Blog/notes route until real notes exist
- Exposing phone or personal Gmail from the résumé
