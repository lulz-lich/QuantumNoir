import { Clipboard, ClipboardList, Download, Gauge } from 'lucide-react';
import { QuantumCase } from '../cases';
import { ExperimentOutcome, ExperimentSettings } from '../quantum/experiment';
import { buildCaseReport } from '../quantum/report';

type InvestigationNotebookProps = {
  caseFile: QuantumCase;
  settings: ExperimentSettings;
  outcome: ExperimentOutcome;
  evidenceLog: string[];
};

export function InvestigationNotebook({ caseFile, settings, outcome, evidenceLog }: InvestigationNotebookProps) {
  const report = buildCaseReport(caseFile, settings, outcome, evidenceLog);
  const copyReport = async () => {
    await navigator.clipboard.writeText(report);
  };
  const downloadReport = () => {
    const blob = new Blob([report], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${caseFile.id}-report.md`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="panel notebook-panel">
      <div className="panel-title">
        <span>Investigator Notebook</span>
        <ClipboardList size={17} />
      </div>

      <div className="verdict-card">
        <span>Current verdict</span>
        <strong>{outcome.verdict}</strong>
        <div className="score-meter">
          <Gauge size={16} />
          <span style={{ width: `${Math.round(outcome.coherenceScore * 100)}%` }} />
          <b>{Math.round(outcome.coherenceScore * 100)}%</b>
        </div>
      </div>

      <ol className="evidence-stack">
        {evidenceLog.map((entry) => (
          <li key={entry}>{entry}</li>
        ))}
      </ol>

      <div className="report-actions">
        <button onClick={copyReport} type="button">
          <Clipboard size={16} />
          Copy report
        </button>
        <button onClick={downloadReport} type="button">
          <Download size={16} />
          Download MD
        </button>
      </div>
    </section>
  );
}
