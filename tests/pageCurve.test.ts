import { describe, expect, it } from 'vitest';
import { conceptualPageCurve, pageTime } from '../src/quantum/pageCurve';

describe('page curve utilities', () => {
  it('creates a bounded conceptual Page curve', () => {
    const curve = conceptualPageCurve(40, 0.8);
    expect(curve).toHaveLength(40);
    curve.forEach((point) => {
      expect(point.entropy).toBeGreaterThanOrEqual(0);
      expect(point.entropy).toBeLessThanOrEqual(1);
      expect(point.information).toBeGreaterThanOrEqual(0);
      expect(point.information).toBeLessThanOrEqual(1);
    });
  });

  it('finds the Page time peak', () => {
    const curve = conceptualPageCurve(64, 0.8);
    const peak = pageTime(curve);
    expect(peak.entropy).toBeGreaterThan(curve[0].entropy);
    expect(peak.time).toBeGreaterThan(0.2);
    expect(peak.time).toBeLessThan(0.9);
  });
});
