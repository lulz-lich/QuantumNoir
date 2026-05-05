import { Fingerprint, Radar } from 'lucide-react';
import { QuantumCase } from '../cases';

type CaseFileNavProps = {
  cases: QuantumCase[];
  activeCaseId: string;
  onSelect: (caseId: string) => void;
};

export function CaseFileNav({ cases, activeCaseId, onSelect }: CaseFileNavProps) {
  return (
    <nav className="case-nav" aria-label="Quantum case files">
      {cases.map((caseFile, index) => (
        <button
          className={caseFile.id === activeCaseId ? 'case-card active' : 'case-card'}
          key={caseFile.id}
          onClick={() => onSelect(caseFile.id)}
          type="button"
        >
          <span className="case-index">{String(index + 1).padStart(2, '0')}</span>
          <span>
            <strong>{caseFile.title}</strong>
            <small>{caseFile.classification}</small>
          </span>
          {caseFile.id === activeCaseId ? <Radar size={18} /> : <Fingerprint size={18} />}
        </button>
      ))}
    </nav>
  );
}
