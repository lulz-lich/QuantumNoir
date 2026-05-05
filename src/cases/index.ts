import { delayedChoice } from './delayedChoice';
import { entangledWitnesses } from './entangledWitnesses';
import { hawkingTrace } from './hawkingTrace';
import { informationParadox } from './informationParadox';
import { vanishingInterference } from './vanishingInterference';
import { QuantumCase } from './types';

export const quantumCases: QuantumCase[] = [
  vanishingInterference,
  entangledWitnesses,
  delayedChoice,
  hawkingTrace,
  informationParadox,
];

export type { DetectorLog, Measurement, ProbabilityBar, QuantumCase } from './types';
