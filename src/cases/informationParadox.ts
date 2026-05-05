import { QuantumCase } from './types';

export const informationParadox: QuantumCase = {
  id: 'information-paradox',
  title: 'Information Paradox',
  subtitle: 'The missing diary of an evaporating black hole.',
  classification: 'Black hole quantum information',
  context:
    'A black hole evaporates through radiation that appears nearly thermal. Quantum mechanics expects information to be preserved, but the visible trace seems to forget the details.',
  setup: [
    'Start with a conceptual black hole containing encoded matter.',
    'Emit radiation over a simplified evaporation timeline.',
    'Plot a Page-curve-inspired entropy monitor.',
    'Compare early thermal ambiguity with late information recovery.',
  ],
  measurements: [
    { label: 'Early radiation entropy', value: 'rising', detail: 'Radiation initially looks increasingly mixed.' },
    { label: 'Page-time marker', value: 'mid-evaporation', detail: 'The conceptual curve peaks before late recovery.' },
    { label: 'Late information signal', value: 'contested', detail: 'The case visualizes the tension, not a final solution.' },
  ],
  detectorLogs: [
    { timestamp: '04:06', signal: 'quiet', message: 'Early radiation carries weak accessible structure.' },
    { timestamp: '04:24', signal: 'anomaly', message: 'Entropy curve reaches a suspicious turning point.' },
    { timestamp: '04:46', signal: 'critical', message: 'Unitary accounting conflicts with purely thermal evaporation.' },
  ],
  probabilities: [
    { label: 'Information preserved', probability: 0.42 },
    { label: 'Information hidden in correlations', probability: 0.46 },
    { label: 'Information lost', probability: 0.12 },
  ],
  explanation:
    'The information paradox case is explicitly conceptual. It uses a Page-curve-inspired visualization to explain the problem: black hole evaporation appears thermal, while quantum theory pushes us toward unitary information preservation.',
  notes: [
    'The module does not claim to solve quantum gravity.',
    'The Page curve is used as an explanatory diagnostic.',
    'The intellectual tension is the case file itself.',
  ],
  equations: [
    'S_rad(t) = min(S_Hawking(t), S_BH(t) + epsilon) - recovery(t)',
    'S_BH(t) ~ M(t)^2',
    'Page time = argmin |S_rad(t) - S_BH(t)|',
  ],
  visualModel: 'paradox',
};
