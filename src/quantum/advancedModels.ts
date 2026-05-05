export type DensityMatrix2 = [[number, number], [number, number]];

const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));

export function densityMatrixFromPureQubit(alphaProbability: number): DensityMatrix2 {
  const p0 = clamp(alphaProbability);
  const p1 = 1 - p0;
  const coherence = Math.sqrt(p0 * p1);
  return [
    [p0, coherence],
    [coherence, p1],
  ];
}

export function applyPhaseDamping(matrix: DensityMatrix2, gamma: number): DensityMatrix2 {
  const damping = Math.exp(-3.2 * clamp(gamma));
  return [
    [matrix[0][0], matrix[0][1] * damping],
    [matrix[1][0] * damping, matrix[1][1]],
  ];
}

export function densityCoherence(matrix: DensityMatrix2): number {
  return clamp(2 * Math.abs(matrix[0][1]));
}

export function distinguishability(detectorStrength: number, decoherence: number): number {
  return clamp(1 - Math.exp(-2.6 * clamp(detectorStrength) - 1.3 * clamp(decoherence)));
}

export function complementarityResidual(visibility: number, pathDistinguishability: number): number {
  return Math.max(0, 1 - visibility * visibility - pathDistinguishability * pathDistinguishability);
}

export function bellChshValue(entanglement: number, detectorNoise: number): number {
  const ideal = 2 * Math.SQRT2;
  const visibility = clamp(entanglement) * (1 - clamp(detectorNoise) * 0.42);
  return 2 + (ideal - 2) * visibility;
}

export function normalizedHawkingTemperature(curvature: number): number {
  return clamp(0.08 + Math.pow(clamp(curvature), 1.7) * 0.92);
}

export function radiationFlux(curvature: number, coherence: number): number {
  const temperature = normalizedHawkingTemperature(curvature);
  return clamp(Math.pow(temperature, 4) * (0.72 + (1 - clamp(coherence)) * 0.28));
}

export function scramblingIndex(entanglement: number, curvature: number, detectorStrength: number): number {
  return clamp(0.5 * clamp(entanglement) + 0.38 * clamp(curvature) + 0.12 * clamp(detectorStrength));
}

export function pageCurveTurnover(informationRetention: number, horizonCurvature: number): number {
  return clamp(0.66 - informationRetention * 0.28 + horizonCurvature * 0.12, 0.34, 0.82);
}
