import { useMemo, useState } from 'react';
import { Atom, BookMarked, FlaskConical, Orbit, Telescope } from 'lucide-react';
import { quantumCases } from '../cases';
import { CaseDossier } from '../components/CaseDossier';
import { CaseFileNav } from '../components/CaseFileNav';
import { MeasurementsPanel } from '../components/MeasurementsPanel';
import { ProbabilityPanel } from '../components/ProbabilityPanel';
import { ExperimentControls } from '../components/ExperimentControls';
import { InvestigationNotebook } from '../components/InvestigationNotebook';
import { EquationPanel } from '../components/EquationPanel';
import { CaseCanvas } from '../visualizations/CaseCanvas';
import { ProbabilityBars } from '../visualizations/ProbabilityBars';
import { defaultSettingsForCase, evaluateCase, ExperimentSettings } from '../quantum/experiment';

export function App() {
  const [activeCaseId, setActiveCaseId] = useState(quantumCases[0].id);
  const [runIndex, setRunIndex] = useState(0);
  const [settingsByCase, setSettingsByCase] = useState<Record<string, ExperimentSettings>>(() =>
    Object.fromEntries(quantumCases.map((caseFile) => [caseFile.id, defaultSettingsForCase(caseFile)])),
  );
  const [evidenceByCase, setEvidenceByCase] = useState<Record<string, string[]>>({});
  const activeCase = useMemo(
    () => quantumCases.find((caseFile) => caseFile.id === activeCaseId) ?? quantumCases[0],
    [activeCaseId],
  );
  const activeSettings = settingsByCase[activeCase.id] ?? defaultSettingsForCase(activeCase);
  const outcome = useMemo(() => evaluateCase(activeCase, activeSettings, runIndex), [activeCase, activeSettings, runIndex]);
  const evidenceLog = evidenceByCase[activeCase.id] ?? [outcome.evidence];

  const updateSettings = (settings: ExperimentSettings) => {
    setSettingsByCase((current) => ({ ...current, [activeCase.id]: settings }));
  };

  const runMeasurement = () => {
    const nextRun = runIndex + 1;
    const nextOutcome = evaluateCase(activeCase, activeSettings, nextRun);
    setRunIndex(nextRun);
    setEvidenceByCase((current) => ({
      ...current,
      [activeCase.id]: [nextOutcome.evidence, ...(current[activeCase.id] ?? [])].slice(0, 8),
    }));
  };

  const resetCase = () => {
    const defaults = defaultSettingsForCase(activeCase);
    setSettingsByCase((current) => ({ ...current, [activeCase.id]: defaults }));
    setEvidenceByCase((current) => ({ ...current, [activeCase.id]: [] }));
    setRunIndex((current) => current + 1);
  };

  const selectCase = (caseId: string) => {
    setActiveCaseId(caseId);
    setRunIndex((current) => current + 1);
  };

  return (
    <main className="app-shell">
      <aside className="left-rail">
        <header className="brand">
          <span className="brand-mark" aria-hidden="true">
            <Orbit size={24} />
          </span>
          <div>
            <p>Quantum Noir</p>
            <h1>Visual Investigation Engine</h1>
          </div>
        </header>

        <section className="panel mission-panel">
          <div className="panel-title">
            <span>Case Archive</span>
            <BookMarked size={17} />
          </div>
          <CaseFileNav cases={quantumCases} activeCaseId={activeCase.id} onSelect={selectCase} />
        </section>

        <ExperimentControls
          settings={activeSettings}
          onSettingsChange={updateSettings}
          onRunMeasurement={runMeasurement}
          onReset={resetCase}
        />
      </aside>

      <section className="stage">
        <header className="stage-header">
          <div>
            <p className="eyebrow">{activeCase.classification}</p>
            <h2>{activeCase.title}</h2>
            <span>{activeCase.subtitle}</span>
          </div>
          <div className="stage-tools" aria-label="Project scope">
            <span>
              <Atom size={16} />
              simplified models
            </span>
            <span>
              <Telescope size={16} />
              conceptual gravity
            </span>
            <span>
              <FlaskConical size={16} />
              case-driven
            </span>
          </div>
        </header>

        <section className="visual-stage">
          <CaseCanvas caseFile={activeCase} settings={activeSettings} outcome={outcome} runIndex={runIndex} />
          <div className="visual-caption">
            <p className="eyebrow">Active visualization</p>
            <strong>{activeCase.visualModel.replace('-', ' ')}</strong>
          </div>
          <div className="live-readout">
            <article>
              <span>Visibility</span>
              <strong>{outcome.visibility.toFixed(2)}</strong>
            </article>
            <article>
              <span>Detector</span>
              <strong>{outcome.confidence.toFixed(2)}</strong>
            </article>
            <article>
              <span>Entropy</span>
              <strong>{outcome.entropy.toFixed(2)}</strong>
            </article>
            <article>
              <span>Information</span>
              <strong>{outcome.informationRetention.toFixed(2)}</strong>
            </article>
          </div>
          <div className="advanced-readout">
            <article>
              <span>Path D</span>
              <strong>{outcome.pathDistinguishability.toFixed(2)}</strong>
            </article>
            <article>
              <span>CHSH</span>
              <strong>{outcome.chsh.toFixed(2)}</strong>
            </article>
            <article>
              <span>Hawking T</span>
              <strong>{outcome.hawkingTemperature.toFixed(2)}</strong>
            </article>
            <article>
              <span>Flux</span>
              <strong>{outcome.radiationFlux.toFixed(2)}</strong>
            </article>
            <article>
              <span>Scramble</span>
              <strong>{outcome.scrambling.toFixed(2)}</strong>
            </article>
            <article>
              <span>Page turn</span>
              <strong>{outcome.pageTurnover.toFixed(2)}</strong>
            </article>
            <article>
              <span>Ent S</span>
              <strong>{outcome.entanglementEntropy.toFixed(2)}</strong>
            </article>
            <article>
              <span>Mass</span>
              <strong>{outcome.evaporationMass.toFixed(2)}</strong>
            </article>
          </div>
        </section>

        <section className="lower-grid">
          <article className="panel probability-card">
            <div className="panel-title">
              <span>Probability Visualization</span>
            </div>
            <ProbabilityBars probabilities={outcome.probabilities} />
            <ProbabilityPanel probabilities={outcome.probabilities} />
          </article>
          <CaseDossier caseFile={activeCase} />
          <EquationPanel caseFile={activeCase} />
          <InvestigationNotebook caseFile={activeCase} settings={activeSettings} outcome={outcome} evidenceLog={evidenceLog} />
        </section>
      </section>

      <MeasurementsPanel caseFile={activeCase} />
    </main>
  );
}
