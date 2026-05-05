import { describe, expect, it } from 'vitest';
import {
  chshForState,
  delayedChoiceMachZehnder,
  doubleSlitAmplitudePattern,
  hawkingEvaporationStep,
  pageCurveFromEvaporation,
  partiallyEntangledPair,
} from '../src/quantum/realPhysicsModels';

describe('advanced physics models', () => {
  it('double-slit decoherence lowers visibility', () => {
    const coherent = doubleSlitAmplitudePattern(80, 1.2, 0.45, 1.6, 0.05);
    const decohered = doubleSlitAmplitudePattern(80, 1.2, 0.45, 1.6, 3.2);
    expect(coherent.visibility).toBeGreaterThan(decohered.visibility);
  });

  it('Bell state reaches CHSH violation in the ideal case', () => {
    const pair = partiallyEntangledPair(Math.PI / 4, 0, 0);
    expect(pair.entanglementEntropy).toBeCloseTo(1);
    expect(chshForState(pair.state, 0)).toBeCloseTo(2 * Math.SQRT2);
  });

  it('Mach-Zehnder output changes when final beam splitter is inserted', () => {
    const open = delayedChoiceMachZehnder(0, false, 0);
    const closed = delayedChoiceMachZehnder(0, true, 0);
    expect(open[0]).toBeCloseTo(0.5);
    expect(closed[0]).toBeCloseTo(1);
  });

  it('Hawking evaporation temperature rises as remaining mass falls', () => {
    const early = hawkingEvaporationStep(1, 0.9, 0.1);
    const late = hawkingEvaporationStep(1, 0.9, 0.9);
    expect(late.remainingMassFraction).toBeLessThan(early.remainingMassFraction);
    expect(late.temperature).toBeGreaterThan(early.temperature);
  });

  it('Page curve exposes a finite page time', () => {
    const curve = pageCurveFromEvaporation(100, 1, 0.8);
    expect(curve.pageTime).toBeGreaterThan(0.2);
    expect(curve.pageTime).toBeLessThan(0.9);
  });
});
