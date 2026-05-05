import {
  complex,
  expectation,
  expi,
  identity,
  matrixMultiply,
  Matrix,
  normalizeVector,
  observableAtAngle,
  outerProduct,
  partialTraceSecondQubit,
  scale,
  tensorMatrix,
  tensorVector,
  Vector,
  vonNeumannEntropyQubit,
} from './linearAlgebra';

const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));

export type DoubleSlitResult = {
  positions: number[];
  intensities: number[];
  visibility: number;
};

export type EntanglementResult = {
  state: Vector;
  reducedDensity: Matrix;
  entanglementEntropy: number;
  chsh: number;
};

export type HawkingResult = {
  mass: number;
  temperature: number;
  luminosity: number;
  remainingMassFraction: number;
};

export type PageCurveResult = {
  points: { time: number; radiationEntropy: number; blackHoleEntropy: number; information: number }[];
  pageTime: number;
};

export function doubleSlitAmplitudePattern(
  samples: number,
  slitSeparation: number,
  wavelength: number,
  screenDistance: number,
  decoherenceGamma: number,
): DoubleSlitResult {
  const positions = Array.from({ length: samples }, (_, index) => -1 + (2 * index) / (samples - 1));
  const coherenceFactor = Math.exp(-clamp(decoherenceGamma, 0, 6));
  const intensities = positions.map((x) => {
    const pathPhase = (Math.PI * slitSeparation * x) / Math.max(0.001, wavelength * screenDistance);
    const envelope = Math.exp(-2.2 * x * x);
    const left = expi(pathPhase);
    const right = expi(-pathPhase);
    const coherent = left.re * right.re + left.im * right.im;
    return envelope * (1 + coherenceFactor * coherent);
  });
  const max = Math.max(...intensities);
  const min = Math.min(...intensities);
  return {
    positions,
    intensities: intensities.map((value) => value / intensities.reduce((sum, item) => sum + item, 0)),
    visibility: max + min === 0 ? 0 : (max - min) / (max + min),
  };
}

export function partiallyEntangledPair(theta: number, phase: number, dephasing: number): EntanglementResult {
  const clean = normalizeVector([complex(Math.cos(theta)), complex(0), complex(0), scale(expi(phase), Math.sin(theta))]);
  const density = outerProduct(clean);
  const damping = Math.exp(-clamp(dephasing, 0, 6));
  const dampedDensity = density.map((row, rowIndex) =>
    row.map((value, columnIndex) => (rowIndex === columnIndex ? value : scale(value, damping))),
  );
  const reducedDensity = partialTraceSecondQubit(dampedDensity);
  return {
    state: clean,
    reducedDensity,
    entanglementEntropy: vonNeumannEntropyQubit(reducedDensity),
    chsh: chshForState(clean, dephasing),
  };
}

export function chshForState(state: Vector, dephasing: number): number {
  const damping = Math.exp(-clamp(dephasing, 0, 6));
  const a = observableAtAngle(0);
  const aPrime = observableAtAngle(Math.PI / 2);
  const b = observableAtAngle(Math.PI / 4);
  const bPrime = observableAtAngle(-Math.PI / 4);
  const e = (left: Matrix, right: Matrix) => expectation(state, tensorMatrix(left, right)) * damping;
  return Math.abs(e(a, b) + e(a, bPrime) + e(aPrime, b) - e(aPrime, bPrime));
}

export function delayedChoiceMachZehnder(phase: number, secondBeamSplitterInserted: boolean, decoherence: number): [number, number] {
  const damping = Math.exp(-clamp(decoherence, 0, 6));
  if (!secondBeamSplitterInserted) {
    return [0.5, 0.5];
  }
  const p0 = 0.5 * (1 + damping * Math.cos(phase));
  return [clamp(p0), clamp(1 - p0)];
}

export function hawkingEvaporationStep(initialMass: number, curvature: number, timeFraction: number): HawkingResult {
  const normalizedMass = Math.max(0.08, initialMass * (1 - 0.72 * clamp(timeFraction) * clamp(curvature)));
  const temperature = 1 / normalizedMass;
  const luminosity = 1 / normalizedMass ** 2;
  return {
    mass: normalizedMass,
    temperature: clamp(temperature / 12),
    luminosity: clamp(luminosity / 120),
    remainingMassFraction: clamp(normalizedMass / initialMass),
  };
}

export function pageCurveFromEvaporation(samples: number, initialEntropy: number, recoveryStrength: number): PageCurveResult {
  const recovery = clamp(recoveryStrength);
  const points = Array.from({ length: samples }, (_, index) => {
    const time = samples === 1 ? 0 : index / (samples - 1);
    const blackHoleEntropy = initialEntropy * Math.max(0.02, (1 - time) ** 1.55);
    const hawkingEntropy = initialEntropy * (1 - Math.exp(-4.2 * time));
    const islandRecovery = initialEntropy * recovery * Math.max(0, time - 0.45) ** 1.2;
    const radiationEntropy = Math.max(0, Math.min(hawkingEntropy, blackHoleEntropy + initialEntropy * 0.08) - islandRecovery * 0.45);
    const information = clamp(recovery * Math.max(0, time - 0.5) * 2);
    return { time, radiationEntropy, blackHoleEntropy, information };
  });
  const pagePoint = points.reduce((best, point) =>
    Math.abs(point.radiationEntropy - point.blackHoleEntropy) < Math.abs(best.radiationEntropy - best.blackHoleEntropy) ? point : best,
  );
  return { points, pageTime: pagePoint.time };
}

export function tensorBellState(theta: number): Vector {
  return tensorVector([complex(Math.cos(theta)), complex(Math.sin(theta))], [complex(1), complex(0)]);
}

export function identityTraceCheck(size: number): number {
  return matrixMultiply(identity(size), identity(size))[0][0].re;
}
