# Architecture

Quantum Noir is organized around a case-file investigation loop.

## Layers

- `src/cases`: narrative and scientific definitions for each case.
- `src/quantum`: numerical model layer.
- `src/components`: reusable UI panels.
- `src/visualizations`: Canvas and SVG renderers.
- `src/pages`: application composition.
- `tests`: Vitest coverage for numerical behavior.

## Data Flow

1. The user selects a case.
2. Case defaults initialize experiment settings.
3. `evaluateCase` computes observables from the settings.
4. UI panels render probabilities, metrics, equations, and verdicts.
5. Canvas visualizations use computed observables, not independent animation.
6. `Run measurement` records a new evidence line.
7. The investigator notebook can export a Markdown report.

## Design Constraint

Animations must remain tied to computed observables. The visual layer should never drift into unrelated decorative motion.
