import { QuantumCase } from './types';

export const hawkingTrace: QuantumCase = {
  id: 'hawking-trace',
  title: 'Hawking Trace',
  subtitle: 'Thermal fingerprints at the edge of a locked horizon.',
  classification: 'Hawking radiation',
  context:
    'The investigator follows faint radiation from a black hole horizon. The case treats Hawking radiation as a conceptual trace of quantum fields near curved spacetime.',
  setup: [
    'Represent the horizon as a boundary between accessible and inaccessible regions.',
    'Generate simplified paired excitations near the boundary.',
    'Let one member of some pairs escape as radiation.',
    'Track apparent thermality and correlation hints in the emitted trace.',
  ],
  measurements: [
    { label: 'Radiation profile', value: 'thermal-like', detail: 'Escaping quanta resemble noisy thermal evidence.' },
    { label: 'Pair split rate', value: 'high near horizon', detail: 'The visualization emphasizes boundary-local pair creation.' },
    { label: 'Information clarity', value: 'low', detail: 'The emitted trace is intentionally ambiguous in this case.' },
  ],
  detectorLogs: [
    { timestamp: '03:12', signal: 'quiet', message: 'Horizon boundary stable. Interior records unavailable.' },
    { timestamp: '03:20', signal: 'anomaly', message: 'Escaping radiation appears without a classical source.' },
    { timestamp: '03:31', signal: 'critical', message: 'Trace looks thermal while pair correlations remain suspect.' },
  ],
  probabilities: [
    { label: 'Escape', probability: 0.38 },
    { label: 'Interior partner', probability: 0.38 },
    { label: 'Unresolved field noise', probability: 0.24 },
  ],
  explanation:
    'This module is a visual and conceptual exploration of Hawking radiation. It is not a quantum gravity solver. It shows why radiation that looks thermal creates pressure on information accounting.',
  notes: [
    'The horizon separates visible radiation from inaccessible partners.',
    'Thermal-looking traces make information recovery difficult to see.',
    'The case prepares the ground for the Page curve and paradox modules.',
  ],
  equations: [
    'T_H ~ 1 / M',
    'L ~ 1 / M^2',
    'S_pair = -Tr(rho log2 rho)',
  ],
  visualModel: 'hawking',
};
