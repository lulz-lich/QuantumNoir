import { probabilitiesFromState, ProbabilityPoint } from './probability';
import { QuantumState } from './state';

export type MeasurementResult = {
  outcome: string;
  probability: number;
  distribution: ProbabilityPoint[];
};

export function measureMostLikely(state: QuantumState): MeasurementResult {
  const distribution = probabilitiesFromState(state);
  const outcome = distribution.reduce((best, point) => (point.probability > best.probability ? point : best));
  return {
    outcome: outcome.label,
    probability: outcome.probability,
    distribution,
  };
}

export function applyDecoherence(probabilities: number[], decoherence: number): number[] {
  const uniform = 1 / probabilities.length;
  return probabilities.map((probability) => probability * (1 - decoherence) + uniform * decoherence);
}

export function detectorConfidence(signal: number, noise: number): number {
  const denominator = signal + noise;
  if (denominator <= 0) {
    return 0;
  }
  return Math.max(0, Math.min(1, signal / denominator));
}
