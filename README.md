# qiangyuchen1.github.io

Research homepage for Qiangyu Chen, Embodied AI Researcher. Next.js (App Router) static export for GitHub Pages at [qiangyuchen1.github.io](https://qiangyuchen1.github.io/).

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # content check → static export in out/
npm run start      # serve out/ locally
npm run lint && npm run typecheck
```

## Where things live

- `content/`: all copy and facts, typed. Every factual record carries `evidence` IDs from `content/evidence.ts`.
- `scripts/check-content.mts`: integrity rules (runs before every build).
- `components/`: section components; `components/ui/`: primitives.
- `design/`: Phase 1 specs (visual identity, IA, components, technology).

The public contact address is set in `content/profile.ts`. Paper and project links render only once real URLs are added to `content/`.
