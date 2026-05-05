# Quantum Noir Physics Models

Quantum Noir uses compact numerical models that are small enough for a browser but still mathematically meaningful.

## Complex State Vectors

States are represented as complex vectors:

```text
|psi> = [a0, a1, ...]
```

The engine supports normalization, outer products, tensor products, Hermitian expectation values, and reduced density matrices.

## Density Matrices And Entanglement

For pure states:

```text
rho = |psi><psi|
```

For two-qubit states, the reduced density matrix is computed with a partial trace over the second qubit:

```text
rho_A = Tr_B(rho_AB)
```

The entanglement entropy is then:

```text
S(rho_A) = -Tr(rho_A log2 rho_A)
```

For a Bell state, this approaches `1` bit.

## Double-Slit Interference

The double-slit module computes complex phase amplitudes from two paths:

```text
psi(x) = exp(i phi(x)) + exp(-i phi(x))
I(x) = envelope(x) * |psi(x)|^2
```

Decoherence damps the cross-term:

```text
coherence = exp(-gamma)
```

This controls fringe visibility.

## Complementarity

The app tracks path distinguishability `D` and interference visibility `V` using the complementarity intuition:

```text
V^2 + D^2 <= 1
```

Strong path detection lowers visible interference.

## Bell/CHSH

Entangled Witnesses uses a two-qubit state:

```text
|psi> = cos(theta)|00> + exp(i phi)sin(theta)|11>
```

The CHSH value is computed from expectation values:

```text
S = |E(a,b) + E(a,b') + E(a',b) - E(a',b')|
```

For a maximally entangled state with ideal settings, the model approaches `2sqrt(2)`.

## Delayed Choice

The delayed-choice module uses a Mach-Zehnder-style output:

```text
P(D0) = 1/2 * (1 + exp(-gamma)cos(phi))
P(D1) = 1 - P(D0)
```

Removing the second beam splitter returns path-readable `50/50` outputs.

## Hawking Trace

The Hawking module uses a normalized evaporation toy model:

```text
T ~ 1 / M
L ~ 1 / M^2
```

It is intentionally normalized and not tied to SI units or real astrophysical masses.

## Page Curve

The information paradox module generates a Page-curve-inspired entropy track from black hole entropy, radiation entropy, and a recovery term:

```text
S_rad(t) = min(S_Hawking(t), S_BH(t) + epsilon) - recovery(t)
```

This is a conceptual model for visualizing the information accounting problem, not a quantum gravity solution.
