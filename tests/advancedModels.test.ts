import { describe, expect, it } from 'vitest';
import {
  applyPhaseDamping,
  bellChshValue,
  densityCoherence,
  densityMatrixFromPureQubit,
  distinguishability,
  normalizedHawkingTemperature,
  radiationFlux,
} from '../src/quantum/advancedModels';

describe('advanced conceptual physics models', () => {
  it('phase damping reduces off-diagonal coherence', () => {
    const pure = densityMatrixFromPureQubit(0.5);
    const damped = applyPhaseDamping(pure, 0.8);
    expect(densityCoherence(damped)).toBeLessThan(densityCoherence(pure));
  });

  it('path distinguishability grows with detector strength', () => {
    expect(distinguishability(0.9, 0.2)).toBeGreaterThan(distinguishability(0.1, 0.2));
  });

  it('Bell CHSH value approaches the quantum violation limit with stronger entanglement', () => {
    expect(bellChshValue(1, 0)).toBeCloseTo(2 * Math.SQRT2);
    expect(bellChshValue(0, 0)).toBeCloseTo(2);
  });

  it('Hawking temperature and flux increase with curvature', () => {
    expect(normalizedHawkingTemperature(0.9)).toBeGreaterThan(normalizedHawkingTemperature(0.2));
    expect(radiationFlux(0.9, 0.5)).toBeGreaterThan(radiationFlux(0.2, 0.5));
  });
});
