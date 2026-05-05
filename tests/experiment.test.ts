import { describe, expect, it } from 'vitest';
import { quantumCases } from '../src/cases';
import { defaultSettingsForCase, evaluateCase } from '../src/quantum/experiment';

describe('interactive experiment engine', () => {
  it('generates normalized probabilities for every case', () => {
    quantumCases.forEach((caseFile) => {
      const outcome = evaluateCase(caseFile, defaultSettingsForCase(caseFile), 0);
      const total = outcome.probabilities.reduce((sum, point) => sum + point.probability, 0);
      expect(total).toBeCloseTo(1);
    });
  });

  it('reduces interference visibility when detector strength increases', () => {
    const caseFile = quantumCases.find((item) => item.id === 'vanishing-interference');
    if (!caseFile) {
      throw new Error('Vanishing Interference case missing');
    }
    const settings = defaultSettingsForCase(caseFile);
    const weakDetector = evaluateCase(caseFile, { ...settings, detectorStrength: 0.05 }, 0);
    const strongDetector = evaluateCase(caseFile, { ...settings, detectorStrength: 0.95 }, 1);
    expect(strongDetector.visibility).toBeLessThan(weakDetector.visibility);
  });

  it('changes delayed-choice verdict when final context changes', () => {
    const caseFile = quantumCases.find((item) => item.id === 'delayed-choice');
    if (!caseFile) {
      throw new Error('Delayed Choice case missing');
    }
    const settings = defaultSettingsForCase(caseFile);
    const pathRun = evaluateCase(caseFile, { ...settings, lateChoice: 'which-path', hypothesis: 'particle' }, 0);
    const waveRun = evaluateCase(caseFile, { ...settings, lateChoice: 'interference', hypothesis: 'wave' }, 1);
    expect(pathRun.verdict).toContain('path record');
    expect(waveRun.verdict).toContain('wave-like evidence');
  });

  it('raises CHSH value when entanglement increases', () => {
    const caseFile = quantumCases.find((item) => item.id === 'entangled-witnesses');
    if (!caseFile) {
      throw new Error('Entangled Witnesses case missing');
    }
    const settings = defaultSettingsForCase(caseFile);
    const weak = evaluateCase(caseFile, { ...settings, entanglement: 0.15 }, 0);
    const strong = evaluateCase(caseFile, { ...settings, entanglement: 0.95 }, 1);
    expect(strong.chsh).toBeGreaterThan(weak.chsh);
  });

  it('raises Hawking flux when horizon curvature increases', () => {
    const caseFile = quantumCases.find((item) => item.id === 'hawking-trace');
    if (!caseFile) {
      throw new Error('Hawking Trace case missing');
    }
    const settings = defaultSettingsForCase(caseFile);
    const low = evaluateCase(caseFile, { ...settings, horizonCurvature: 0.12 }, 0);
    const high = evaluateCase(caseFile, { ...settings, horizonCurvature: 0.94 }, 1);
    expect(high.radiationFlux).toBeGreaterThan(low.radiationFlux);
    expect(high.hawkingTemperature).toBeGreaterThan(low.hawkingTemperature);
  });
});
