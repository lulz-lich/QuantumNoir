import { ProbabilityBar } from '../cases';

type ProbabilityBarsProps = {
  probabilities: ProbabilityBar[];
};

export function ProbabilityBars({ probabilities }: ProbabilityBarsProps) {
  return (
    <svg className="probability-svg" viewBox="0 0 520 220" role="img" aria-label="Probability distribution">
      <defs>
        <linearGradient id="probabilityGradient" x1="0" x2="1">
          <stop offset="0%" stopColor="#55f0d2" />
          <stop offset="100%" stopColor="#f0b85a" />
        </linearGradient>
      </defs>
      {probabilities.map((item, index) => {
        const width = item.probability * 360;
        const y = 22 + index * 42;
        return (
          <g key={item.label}>
            <text x="22" y={y + 18} fill="#c7d7d8" fontSize="14" fontFamily="IBM Plex Mono">
              {item.label}
            </text>
            <rect x="150" y={y} width="340" height="24" rx="5" fill="rgba(255,255,255,0.06)" />
            <rect x="150" y={y} width={width} height="24" rx="5" fill="url(#probabilityGradient)" />
            <text x="500" y={y + 18} textAnchor="end" fill="#eef7f2" fontSize="14" fontFamily="IBM Plex Mono">
              {Math.round(item.probability * 100)}%
            </text>
          </g>
        );
      })}
    </svg>
  );
}
