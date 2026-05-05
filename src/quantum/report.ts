import { QuantumCase } from '../cases';
import { ExperimentOutcome, ExperimentSettings } from './experiment';

export function buildCaseReport(
  caseFile: QuantumCase,
  settings: ExperimentSettings,
  outcome: ExperimentOutcome,
  evidenceLog: string[],
): string {
  return [
    `# Quantum Noir Case Report: ${caseFile.title}`,
    '',
    `Classification: ${caseFile.classification}`,
    `Subtitle: ${caseFile.subtitle}`,
    '',
    '## Context',
    '',
    caseFile.context,
    '',
    '## Experiment Settings',
    '',
    `- Detector strength: ${formatPercent(settings.detectorStrength)}`,
    `- Coherence: ${formatPercent(settings.coherence)}`,
    `- Entanglement: ${formatPercent(settings.entanglement)}`,
    `- Horizon curvature: ${formatPercent(settings.horizonCurvature)}`,
    `- Delayed-choice ending: ${settings.lateChoice}`,
    `- Working hypothesis: ${settings.hypothesis}`,
    '',
    '## Observables',
    '',
    `- Visibility: ${outcome.visibility.toFixed(3)}`,
    `- Path distinguishability: ${outcome.pathDistinguishability.toFixed(3)}`,
    `- Detector confidence: ${outcome.confidence.toFixed(3)}`,
    `- Entropy: ${outcome.entropy.toFixed(3)}`,
    `- Information retention: ${outcome.informationRetention.toFixed(3)}`,
    `- Entanglement entropy: ${outcome.entanglementEntropy.toFixed(3)}`,
    `- CHSH: ${outcome.chsh.toFixed(3)}`,
    `- Hawking temperature: ${outcome.hawkingTemperature.toFixed(3)}`,
    `- Radiation flux: ${outcome.radiationFlux.toFixed(3)}`,
    `- Scrambling: ${outcome.scrambling.toFixed(3)}`,
    `- Page turnover: ${outcome.pageTurnover.toFixed(3)}`,
    `- Remaining mass fraction: ${outcome.evaporationMass.toFixed(3)}`,
    '',
    '## Verdict',
    '',
    outcome.verdict,
    '',
    '## Evidence Log',
    '',
    ...(evidenceLog.length > 0 ? evidenceLog.map((entry) => `- ${entry}`) : ['- No manual measurement run recorded.']),
    '',
    '## Scientific Boundary',
    '',
    'This report uses compact educational models. It does not claim to solve quantum gravity or model a real astrophysical black hole.',
    '',
  ].join('\n');
}

function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}
