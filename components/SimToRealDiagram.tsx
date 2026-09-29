/** Original schematic for the featured project: simulation → randomization → real. */
export function SimToRealDiagram() {
  return (
    <svg
      viewBox="0 0 480 360"
      role="img"
      aria-label="Diagram: a dashed simulated scene passes through a stack of domain-randomized variants and arrives at a solid real-world scene."
      className="card-media h-full w-full"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Simulation scene */}
      <g className="stroke-faint" strokeDasharray="4 4" strokeWidth="1">
        <rect x="28" y="120" width="112" height="112" rx="8" />
        <path d="M48 206h72" />
        <path d="M62 206v-26l18-20 22 10" />
        <circle cx="62" cy="180" r="3.5" />
        <circle cx="80" cy="160" r="3.5" />
        <rect x="100" y="192" width="14" height="14" />
      </g>

      {/* Randomized variants */}
      <g strokeWidth="1">
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            x={188 + i * 8}
            y={128 - i * 8}
            width="88"
            height="96"
            rx="8"
            className={i === 4 ? "fill-subtle stroke-muted" : "fill-subtle stroke-line-strong"}
          />
        ))}
        <g className="stroke-muted">
          <path d="M236 176h52M248 176v-18M264 168h14v8" />
          <circle cx="248" cy="152" r="3" />
        </g>
      </g>

      {/* Real scene */}
      <g className="stroke-ink" strokeWidth="1.25">
        <rect x="340" y="120" width="112" height="112" rx="8" />
        <path d="M360 206h72" />
        <path d="M374 206v-26l18-20 22 10" />
        <circle cx="374" cy="180" r="3.5" className="fill-subtle" />
        <circle cx="392" cy="160" r="3.5" className="fill-subtle" />
        <rect x="412" y="192" width="14" height="14" />
      </g>

      <path d="M148 176h32M174 171l6 5-6 5" className="stroke-muted" strokeWidth="1" />
      <path d="M300 176h32M326 171l6 5-6 5" className="stroke-accent" strokeWidth="1.5" />

      <g className="fill-muted font-mono text-[11px] tracking-[0.06em]">
        <text x="28" y="258">SIMULATION</text>
        <text x="188" y="258">RANDOMIZATION</text>
        <text x="340" y="258">REAL</text>
      </g>
      <g className="fill-faint font-mono text-[10px]">
        <text x="28" y="276">synthetic data</text>
        <text x="188" y="276">5 dimensions</text>
        <text x="340" y="276">small real set</text>
      </g>
    </svg>
  );
}
