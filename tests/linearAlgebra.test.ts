import { describe, expect, it } from 'vitest';
import {
  complex,
  expectation,
  normalizeVector,
  observableAtAngle,
  outerProduct,
  partialTraceSecondQubit,
  tensorMatrix,
  vonNeumannEntropyQubit,
} from '../src/quantum/linearAlgebra';

describe('complex linear algebra', () => {
  it('normalizes complex state vectors', () => {
    const vector = normalizeVector([complex(3), complex(4)]);
    const norm = vector.reduce((sum, item) => sum + item.re * item.re + item.im * item.im, 0);
    expect(norm).toBeCloseTo(1);
  });

  it('computes reduced density matrix entropy for Bell state', () => {
    const amplitude = 1 / Math.sqrt(2);
    const bell = [complex(amplitude), complex(0), complex(0), complex(amplitude)];
    const reduced = partialTraceSecondQubit(outerProduct(bell));
    expect(vonNeumannEntropyQubit(reduced)).toBeCloseTo(1);
  });

  it('computes expectation value for aligned observables', () => {
    const state = [complex(1), complex(0), complex(0), complex(0)];
    const zz = tensorMatrix(observableAtAngle(0), observableAtAngle(0));
    expect(expectation(state, zz)).toBeCloseTo(1);
  });
});
