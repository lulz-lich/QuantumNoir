import { Activity, CircleAlert, CircleCheck, RadioTower } from 'lucide-react';
import { QuantumCase } from '../cases';

type MeasurementsPanelProps = {
  caseFile: QuantumCase;
};

const logIcon = {
  quiet: CircleCheck,
  anomaly: Activity,
  critical: CircleAlert,
};

export function MeasurementsPanel({ caseFile }: MeasurementsPanelProps) {
  return (
    <aside className="analysis-rail" aria-label="Measurements and detector logs">
      <section className="panel">
        <div className="panel-title">
          <span>Measurements</span>
          <RadioTower size={17} />
        </div>
        <div className="measurement-list">
          {caseFile.measurements.map((measurement) => (
            <article className="measurement-card" key={measurement.label}>
              <span>{measurement.label}</span>
              <strong>{measurement.value}</strong>
              <p>{measurement.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel-title">
          <span>Detector Logs</span>
          <Activity size={17} />
        </div>
        <ol className="log-list">
          {caseFile.detectorLogs.map((log) => {
            const Icon = logIcon[log.signal];
            return (
              <li className={`log-entry ${log.signal}`} key={`${log.timestamp}-${log.message}`}>
                <Icon size={16} />
                <span>{log.timestamp}</span>
                <p>{log.message}</p>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="panel explanation-panel">
        <div className="panel-title">
          <span>Explanation</span>
        </div>
        <p>{caseFile.explanation}</p>
      </section>
    </aside>
  );
}
