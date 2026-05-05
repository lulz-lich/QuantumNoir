import { QuantumCase } from './types';

export const vanishingInterference: QuantumCase = {
  id: 'vanishing-interference',
  title: 'Vanishing Interference',
  subtitle: 'The alley where waves become witnesses.',
  classification: 'Measurement and interference',
  context:
    'A double-slit apparatus keeps producing clean interference until a path detector is installed. The detective question is not where the particle went, but what the detector made knowable.',
  setup: [
    'Prepare a coherent source aimed at two narrow apertures.',
    'Record the screen pattern with the path detector disabled.',
    'Enable weak which-path detection and repeat the run.',
    'Compare fringe visibility against detector confidence.',
  ],
  measurements: [
    { label: 'Fringe visibility', value: '0.82 -> 0.29', detail: 'Visibility falls as path information becomes available.' },
    { label: 'Detector confidence', value: '71%', detail: 'The apparatus can infer a path often enough to disturb the interference pattern.' },
    { label: 'Noise floor', value: 'low', detail: 'Loss of fringes is not explained by ordinary sensor noise.' },
  ],
  detectorLogs: [
    { timestamp: '00:03', signal: 'quiet', message: 'Reference run shows alternating bright and dark bands.' },
    { timestamp: '00:11', signal: 'anomaly', message: 'Which-path probe engaged. Fringe contrast begins to collapse.' },
    { timestamp: '00:18', signal: 'critical', message: 'Particle-like distribution dominates after path record stabilizes.' },
  ],
  probabilities: [
    { label: 'Path A', probability: 0.48 },
    { label: 'Path B', probability: 0.46 },
    { label: 'Unresolved', probability: 0.06 },
  ],
  explanation:
    'This is a conceptual double-slit model. The more reliable the which-path record becomes, the less visible the interference pattern is. The module illustrates complementarity, not a full detector-environment simulation.',
  notes: [
    'Interference is strongest when path information is unavailable.',
    'Measurement is treated as an interaction that creates records.',
    'The vanishing pattern is the clue, not a malfunction.',
  ],
  equations: [
    'psi(x) = exp(i phi(x)) + exp(-i phi(x))',
    'I(x) = envelope(x) * [1 + exp(-gamma) cos(2 phi(x))]',
    'V^2 + D^2 <= 1',
  ],
  visualModel: 'interference',
};
