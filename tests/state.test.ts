import { describe, expect, it } from 'vitest';
import { complex, createQubit, magnitudeSquared, normalizeState, phaseShift } from '../src/quantum/state';
import { probabilitiesFromState } from '../src/quantum/probability';

describe('quantum state utilities', () => {
  it('computes complex magnitude squared', () => {
    expect(magnitudeSquared(complex(3, 4))).toBe(25);
  });

  it('normalizes state amplitudes', () => {
    const state = normalizeState({
      label: 'test',
      amplitudes: [
        { basis: '|0>', amplitude: complex(2) },
        { basis: '|1>', amplitude: complex(0) },
      ],
    });

    expect(probabilitiesFromState(state)[0].probability).toBeCloseTo(1);
  });

  it('creates balanced qubit probabilities', () => {
    const qubit = createQubit('plus', complex(1), complex(1));
    const probabilities = probabilitiesFromState(qubit);
    expect(probabilities[0].probability).toBeCloseTo(0.5);
    expect(probabilities[1].probability).toBeCloseTo(0.5);
  });

  it('applies a phase shift while preserving probability', () => {
    const qubit = createQubit('phase', complex(1), complex(1));
    const shifted = phaseShift(qubit, '|1>', Math.PI);
    const probabilities = probabilitiesFromState(shifted);
    expect(probabilities[0].probability).toBeCloseTo(0.5);
    expect(probabilities[1].probability).toBeCloseTo(0.5);
  });
});
