import { BookOpen, Microscope, NotebookText } from 'lucide-react';
import { QuantumCase } from '../cases';

type CaseDossierProps = {
  caseFile: QuantumCase;
};

export function CaseDossier({ caseFile }: CaseDossierProps) {
  return (
    <section className="dossier">
      <article className="panel context-panel">
        <div className="panel-title">
          <span>Story Context</span>
          <BookOpen size={17} />
        </div>
        <p>{caseFile.context}</p>
      </article>

      <article className="panel">
        <div className="panel-title">
          <span>Experiment Setup</span>
          <Microscope size={17} />
        </div>
        <ol className="setup-list">
          {caseFile.setup.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </article>

      <article className="panel">
        <div className="panel-title">
          <span>Case Notes</span>
          <NotebookText size={17} />
        </div>
        <ul className="notes-list">
          {caseFile.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </article>
    </section>
  );
}
