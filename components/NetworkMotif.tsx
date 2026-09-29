const NODES = [
  [40, 70],
  [110, 30],
  [120, 110],
  [190, 60],
  [250, 120],
  [270, 40],
] as const;

const EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [3, 4],
  [3, 5],
  [2, 4],
];

/** Static, unanimated community motif. Decorative. */
export function NetworkMotif() {
  return (
    <svg viewBox="0 0 310 150" aria-hidden="true" className="h-auto w-full" fill="none">
      <g className="stroke-line-strong" strokeWidth="1">
        {EDGES.map(([a, b]) => (
          <path key={`${a}-${b}`} d={`M${NODES[a][0]} ${NODES[a][1]}L${NODES[b][0]} ${NODES[b][1]}`} />
        ))}
      </g>
      {NODES.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i === 3 ? 6 : 4.5}
          className={i === 3 ? "fill-elevated stroke-ink" : "fill-elevated stroke-muted"}
          strokeWidth={i === 3 ? 1.25 : 1}
        />
      ))}
    </svg>
  );
}
