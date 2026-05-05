export type Complex = {
  re: number;
  im: number;
};

export type Vector = Complex[];
export type Matrix = Complex[][];

export const C = {
  zero: { re: 0, im: 0 },
  one: { re: 1, im: 0 },
  i: { re: 0, im: 1 },
};

export function complex(re: number, im = 0): Complex {
  return { re, im };
}

export function add(a: Complex, b: Complex): Complex {
  return { re: a.re + b.re, im: a.im + b.im };
}

export function sub(a: Complex, b: Complex): Complex {
  return { re: a.re - b.re, im: a.im - b.im };
}

export function mul(a: Complex, b: Complex): Complex {
  return { re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re };
}

export function scale(a: Complex, factor: number): Complex {
  return { re: a.re * factor, im: a.im * factor };
}

export function conj(a: Complex): Complex {
  return { re: a.re, im: -a.im };
}

export function abs2(a: Complex): number {
  return a.re * a.re + a.im * a.im;
}

export function expi(theta: number): Complex {
  return { re: Math.cos(theta), im: Math.sin(theta) };
}

export function normalizeVector(vector: Vector): Vector {
  const norm = Math.sqrt(vector.reduce((sum, item) => sum + abs2(item), 0));
  if (norm === 0) {
    throw new Error('Cannot normalize a zero vector.');
  }
  return vector.map((item) => scale(item, 1 / norm));
}

export function outerProduct(vector: Vector): Matrix {
  return vector.map((row) => vector.map((column) => mul(row, conj(column))));
}

export function dagger(matrix: Matrix): Matrix {
  return matrix[0].map((_, column) => matrix.map((row) => conj(row[column])));
}

export function matrixMultiply(a: Matrix, b: Matrix): Matrix {
  return a.map((row) =>
    b[0].map((_, column) =>
      row.reduce((sum, value, index) => add(sum, mul(value, b[index][column])), C.zero),
    ),
  );
}

export function matrixVectorMultiply(matrix: Matrix, vector: Vector): Vector {
  return matrix.map((row) => row.reduce((sum, value, index) => add(sum, mul(value, vector[index])), C.zero));
}

export function trace(matrix: Matrix): Complex {
  return matrix.reduce((sum, row, index) => add(sum, row[index]), C.zero);
}

export function tensorVector(a: Vector, b: Vector): Vector {
  return a.flatMap((left) => b.map((right) => mul(left, right)));
}

export function tensorMatrix(a: Matrix, b: Matrix): Matrix {
  return a.flatMap((aRow) =>
    b.map((bRow) =>
      aRow.flatMap((aValue) => bRow.map((bValue) => mul(aValue, bValue))),
    ),
  );
}

export function expectation(state: Vector, operator: Matrix): number {
  const operated = matrixVectorMultiply(operator, state);
  const value = state.reduce((sum, amplitude, index) => add(sum, mul(conj(amplitude), operated[index])), C.zero);
  return value.re;
}

export function identity(size: number): Matrix {
  return Array.from({ length: size }, (_, row) =>
    Array.from({ length: size }, (_, column) => complex(row === column ? 1 : 0)),
  );
}

export function pauliX(): Matrix {
  return [
    [complex(0), complex(1)],
    [complex(1), complex(0)],
  ];
}

export function pauliZ(): Matrix {
  return [
    [complex(1), complex(0)],
    [complex(0), complex(-1)],
  ];
}

export function observableAtAngle(theta: number): Matrix {
  const z = Math.cos(theta);
  const x = Math.sin(theta);
  return [
    [complex(z), complex(x)],
    [complex(x), complex(-z)],
  ];
}

export function partialTraceSecondQubit(twoQubitDensity: Matrix): Matrix {
  return [
    [add(twoQubitDensity[0][0], twoQubitDensity[1][1]), add(twoQubitDensity[0][2], twoQubitDensity[1][3])],
    [add(twoQubitDensity[2][0], twoQubitDensity[3][1]), add(twoQubitDensity[2][2], twoQubitDensity[3][3])],
  ];
}

export function eigenvaluesHermitian2(matrix: Matrix): [number, number] {
  const a = matrix[0][0].re;
  const d = matrix[1][1].re;
  const b2 = abs2(matrix[0][1]);
  const center = (a + d) / 2;
  const radius = Math.sqrt(((a - d) / 2) ** 2 + b2);
  return [center + radius, center - radius];
}

export function vonNeumannEntropyQubit(density: Matrix): number {
  return eigenvaluesHermitian2(density).reduce((sum, lambda) => {
    if (lambda <= 1e-12) {
      return sum;
    }
    return sum - lambda * Math.log2(lambda);
  }, 0);
}
