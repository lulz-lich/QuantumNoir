import { describe, expect, it } from 'vitest';
import { entropy, gaussianInterferencePattern, interferenceVisibility, normalizeDistribution } from '../src/quantum/probability';

describe('probability utilities', () => {
  it('normalizes positive distributions', () => {
    const distribution = normalizeDistribution([2, 2, 4]);
    expect(distribution.reduce((sum, value) => sum + value, 0)).toBeCloseTo(1);
    expect(distribution).toEqual([0.25, 0.25, 0.5]);
  });

  it('computes binary entropy for a fair distribution', () => {
    expect(entropy([0.5, 0.5])).toBeCloseTo(1);
  });

  it('computes interference visibility', () => {
    expect(interferenceVisibility(9, 1)).toBeCloseTo(0.8);
  });

  it('creates normalized conceptual interference samples', () => {
    const pattern = gaussianInterferencePattern(32, 0.8);
    expect(pattern).toHaveLength(32);
    expect(pattern.reduce((sum, value) => sum + value, 0)).toBeCloseTo(1);
  });
});
