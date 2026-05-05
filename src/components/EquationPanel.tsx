import { Sigma } from 'lucide-react';
import { QuantumCase } from '../cases';

type EquationPanelProps = {
  caseFile: QuantumCase;
};

export function EquationPanel({ caseFile }: EquationPanelProps) {
  return (
    <section className="panel equation-panel">
      <div className="panel-title">
        <span>Model Equations</span>
        <Sigma size={17} />
      </div>
      <div className="equation-list">
        {caseFile.equations.map((equation) => (
          <code key={equation}>{equation}</code>
        ))}
      </div>
    </section>
  );
}
