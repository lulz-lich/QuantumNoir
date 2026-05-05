import { QuantumCase } from './types';

export const delayedChoice: QuantumCase = {
  id: 'delayed-choice',
  title: 'Delayed Choice',
  subtitle: 'The last question rewrites the readable past.',
  classification: 'Measurement context',
  context:
    'The apparatus is configured late, after the quantum system has entered the experiment. The case asks which kind of history the final measurement context permits us to reconstruct.',
  setup: [
    'Send a single-system wave packet through an interferometer-like route.',
    'Delay the final apparatus choice until the system is already in flight.',
    'Switch between path-readable and interference-readable endings.',
    'Compare what the final record lets the investigator infer.',
  ],
  measurements: [
    { label: 'Path record', value: 'contextual', detail: 'A path is legible only in the path-measurement ending.' },
    { label: 'Interference recovery', value: 'partial', detail: 'Wave-like evidence appears when paths are recombined.' },
    { label: 'Late switch interval', value: 'after entry', detail: 'The choice is visualized after the system crosses the first stage.' },
  ],
  detectorLogs: [
    { timestamp: '02:00', signal: 'quiet', message: 'Initial packet enters without final context selected.' },
    { timestamp: '02:08', signal: 'anomaly', message: 'Late apparatus switch changes available evidence.' },
    { timestamp: '02:13', signal: 'critical', message: 'Case history becomes path-like or wave-like depending on final readout.' },
  ],
  probabilities: [
    { label: 'Path-readable', probability: 0.5 },
    { label: 'Wave-readable', probability: 0.5 },
  ],
  explanation:
    'The delayed-choice module is conceptual. It does not mean the future mechanically changes the past. It shows that the final measurement arrangement determines which question has a well-defined experimental answer.',
  notes: [
    'The case is about inference, context, and records.',
    'Late choices alter what can be known from the final apparatus.',
    'No retrocausal claim is required for the visual model.',
  ],
  equations: [
    'P(D0) = 1/2 * [1 + exp(-gamma) cos(phi)]',
    'P(D1) = 1 - P(D0)',
    'open interferometer -> path-readable 50/50 output',
  ],
  visualModel: 'delayed-choice',
};
