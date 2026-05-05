export type Complex = {
  re: number;
  im: number;
};

export type BasisAmplitude = {
  basis: string;
  amplitude: Complex;
};

export type QuantumState = {
  label: string;
  amplitudes: BasisAmplitude[];
};

export function complex(re: number, im = 0): Complex {
  return { re, im };
}

export function magnitudeSquared(value: Complex): number {
  return value.re * value.re + value.im * value.im;
}

export function normalizeState(state: QuantumState): QuantumState {
  const total = state.amplitudes.reduce((sum, item) => sum + magnitudeSquared(item.amplitude), 0);
  if (total === 0) {
    throw new Error('Cannot normalize a state with zero total amplitude.');
  }
  const scale = 1 / Math.sqrt(total);
  return {
    ...state,
    amplitudes: state.amplitudes.map((item) => ({
      ...item,
      amplitude: {
        re: item.amplitude.re * scale,
        im: item.amplitude.im * scale,
      },
    })),
  };
}

export function createQubit(label: string, alpha: Complex, beta: Complex): QuantumState {
  return normalizeState({
    label,
    amplitudes: [
      { basis: '|0>', amplitude: alpha },
      { basis: '|1>', amplitude: beta },
    ],
  });
}

export function phaseShift(state: QuantumState, basis: string, phaseRadians: number): QuantumState {
  return normalizeState({
    ...state,
    amplitudes: state.amplitudes.map((item) => {
      if (item.basis !== basis) {
        return item;
      }
      const cos = Math.cos(phaseRadians);
      const sin = Math.sin(phaseRadians);
      return {
        ...item,
        amplitude: {
          re: item.amplitude.re * cos - item.amplitude.im * sin,
          im: item.amplitude.re * sin + item.amplitude.im * cos,
        },
      };
    }),
  });
}
