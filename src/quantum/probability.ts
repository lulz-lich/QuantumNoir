import { magnitudeSquared, QuantumState } from './state';

export type ProbabilityPoint = {
  label: string;
  probability: number;
};

export function probabilitiesFromState(state: QuantumState): ProbabilityPoint[] {
  const raw = state.amplitudes.map((item) => ({
    label: item.basis,
    probability: magnitudeSquared(item.amplitude),
  }));
  const total = raw.reduce((sum, item) => sum + item.probability, 0);
  if (total === 0) {
    return raw;
  }
  return raw.map((item) => ({ ...item, probability: item.probability / total }));
}

export function entropy(probabilities: number[]): number {
  return probabilities.reduce((sum, probability) => {
    if (probability <= 0) {
      return sum;
    }
    return sum - probability * Math.log2(probability);
  }, 0);
}

export function interferenceVisibility(maxIntensity: number, minIntensity: number): number {
  const denominator = maxIntensity + minIntensity;
  if (denominator === 0) {
    return 0;
  }
  return Math.max(0, Math.min(1, (maxIntensity - minIntensity) / denominator));
}

export function normalizeDistribution(values: number[]): number[] {
  const total = values.reduce((sum, value) => sum + Math.max(0, value), 0);
  if (total === 0) {
    return values.map(() => 0);
  }
  return values.map((value) => Math.max(0, value) / total);
}

export function gaussianInterferencePattern(samples: number, coherence: number, phase = 0): number[] {
  const center = (samples - 1) / 2;
  const values = Array.from({ length: samples }, (_, index) => {
    const x = (index - center) / Math.max(1, center);
    const envelope = Math.exp(-2.8 * x * x);
    const fringes = 0.5 + 0.5 * Math.cos(18 * x + phase);
    return envelope * (1 - coherence * 0.35 + coherence * fringes);
  });
  return normalizeDistribution(values);
}
