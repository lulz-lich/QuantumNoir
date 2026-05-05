import { RotateCcw, ScanLine, SlidersHorizontal } from 'lucide-react';
import { ExperimentSettings, Hypothesis } from '../quantum/experiment';

type ExperimentControlsProps = {
  settings: ExperimentSettings;
  onSettingsChange: (settings: ExperimentSettings) => void;
  onRunMeasurement: () => void;
  onReset: () => void;
};

const hypotheses: { value: Hypothesis; label: string }[] = [
  { value: 'wave', label: 'Wave-like' },
  { value: 'particle', label: 'Path record' },
  { value: 'correlation', label: 'Correlation' },
  { value: 'horizon', label: 'Horizon trace' },
  { value: 'unitarity', label: 'Unitary account' },
];

export function ExperimentControls({ settings, onSettingsChange, onRunMeasurement, onReset }: ExperimentControlsProps) {
  const update = <Key extends keyof ExperimentSettings>(key: Key, value: ExperimentSettings[Key]) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <section className="panel experiment-panel">
      <div className="panel-title">
        <span>Experiment Controls</span>
        <SlidersHorizontal size={17} />
      </div>

      <div className="control-stack">
        <RangeControl
          label="Detector strength"
          value={settings.detectorStrength}
          onChange={(value) => update('detectorStrength', value)}
        />
        <RangeControl label="Coherence" value={settings.coherence} onChange={(value) => update('coherence', value)} />
        <RangeControl
          label="Entanglement"
          value={settings.entanglement}
          onChange={(value) => update('entanglement', value)}
        />
        <RangeControl
          label="Horizon curvature"
          value={settings.horizonCurvature}
          onChange={(value) => update('horizonCurvature', value)}
        />

        <label className="select-row">
          <span>Delayed-choice ending</span>
          <select value={settings.lateChoice} onChange={(event) => update('lateChoice', event.target.value as ExperimentSettings['lateChoice'])}>
            <option value="which-path">Which-path detector</option>
            <option value="interference">Interference recombiner</option>
          </select>
        </label>

        <div className="hypothesis-grid" aria-label="Hypothesis selection">
          {hypotheses.map((hypothesis) => (
            <button
              className={settings.hypothesis === hypothesis.value ? 'hypothesis-button active' : 'hypothesis-button'}
              key={hypothesis.value}
              onClick={() => update('hypothesis', hypothesis.value)}
              type="button"
            >
              {hypothesis.label}
            </button>
          ))}
        </div>

        <div className="action-row">
          <button className="primary-action" onClick={onRunMeasurement} type="button">
            <ScanLine size={17} />
            Run measurement
          </button>
          <button className="secondary-action" onClick={onReset} type="button">
            <RotateCcw size={17} />
            Reset case
          </button>
        </div>
      </div>
    </section>
  );
}

type RangeControlProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
};

function RangeControl({ label, value, onChange }: RangeControlProps) {
  return (
    <label className="range-row">
      <span>
        {label}
        <strong>{Math.round(value * 100)}%</strong>
      </span>
      <input min="0" max="100" type="range" value={Math.round(value * 100)} onChange={(event) => onChange(Number(event.target.value) / 100)} />
    </label>
  );
}
