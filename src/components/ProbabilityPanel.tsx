import { ProbabilityBar } from '../cases';

type ProbabilityPanelProps = {
  probabilities: ProbabilityBar[];
};

export function ProbabilityPanel({ probabilities }: ProbabilityPanelProps) {
  return (
    <section className="probability-panel" aria-label="Probability visualization">
      {probabilities.map((item) => (
        <div className="probability-row" key={item.label}>
          <div>
            <span>{item.label}</span>
            <strong>{Math.round(item.probability * 100)}%</strong>
          </div>
          <div className="bar-track">
            <span style={{ width: `${item.probability * 100}%` }} />
          </div>
        </div>
      ))}
    </section>
  );
}
