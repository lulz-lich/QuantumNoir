import { entropy } from './probability';
import { QuantumState, normalizeState } from './state';

export function bellPair(label = 'Bell pair'): QuantumState {
  const amplitude = 1 / Math.sqrt(2);
  return normalizeState({
    label,
    amplitudes: [
      { basis: '|00>', amplitude: { re: amplitude, im: 0 } },
      { basis: '|11>', amplitude: { re: amplitude, im: 0 } },
    ],
  });
}

export function correlationCoefficient(sameBasisProbability: number, oppositeBasisProbability: number): number {
  const total = sameBasisProbability + oppositeBasisProbability;
  if (total === 0) {
    return 0;
  }
  return Math.max(-1, Math.min(1, (sameBasisProbability - oppositeBasisProbability) / total));
}

export function entanglementEntropy(pairProbability: number): number {
  const p = Math.max(0, Math.min(1, pairProbability));
  return entropy([p, 1 - p]);
}
