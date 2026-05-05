import { QuantumCase } from './types';

export const entangledWitnesses: QuantumCase = {
  id: 'entangled-witnesses',
  title: 'Entangled Witnesses',
  subtitle: 'Two witnesses, one impossible alibi.',
  classification: 'Entanglement and correlations',
  context:
    'Two distant detectors keep agreeing more often than an ordinary shared script should allow. The case file treats entanglement as a correlation structure rather than a message channel.',
  setup: [
    'Prepare paired systems in a Bell-like state.',
    'Separate the witnesses into left and right measurement rooms.',
    'Randomize basis settings in the simplified model.',
    'Compare same-basis correlations with background coincidences.',
  ],
  measurements: [
    { label: 'Same-basis agreement', value: '92%', detail: 'Aligned measurements strongly agree in the synthetic run.' },
    { label: 'Cross-basis drift', value: '18%', detail: 'Correlations weaken when the interrogation basis changes.' },
    { label: 'Signal delay', value: 'none', detail: 'No communication channel is implied by the visualization.' },
  ],
  detectorLogs: [
    { timestamp: '01:04', signal: 'quiet', message: 'Left and right stations report clean local measurements.' },
    { timestamp: '01:09', signal: 'anomaly', message: 'Coincidence matrix shows nonclassical-looking structure.' },
    { timestamp: '01:15', signal: 'critical', message: 'Correlation survives distance in the conceptual pair model.' },
  ],
  probabilities: [
    { label: '00', probability: 0.47 },
    { label: '11', probability: 0.47 },
    { label: '01', probability: 0.03 },
    { label: '10', probability: 0.03 },
  ],
  explanation:
    'Entanglement is shown as a joint state with strong correlations. The interface avoids suggesting faster-than-light signaling; it focuses on measurement statistics and the shape of the shared state.',
  notes: [
    'Entanglement produces correlations across separated measurements.',
    'The model is statistical, not a communication device.',
    'The witnesses disagree only when the basis context changes.',
  ],
  equations: [
    '|psi> = cos(theta)|00> + exp(i phi)sin(theta)|11>',
    'rho_A = Tr_B(|psi><psi|)',
    'S_CHSH = |E(a,b) + E(a,b_prime) + E(a_prime,b) - E(a_prime,b_prime)|',
  ],
  visualModel: 'entanglement',
};
