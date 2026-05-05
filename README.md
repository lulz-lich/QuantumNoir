# Quantum Noir

Quantum Noir is a visual quantum investigation engine for exploring measurement, interference, entanglement, delayed choice, observer effects, Hawking radiation, horizon entanglement, the Page curve, and the black hole information paradox.

It is not a generic physics simulator. It is an interactive case-file experience: users investigate strange quantum dossiers, inspect detector logs, compare measurements, read case notes, and watch simplified probability models unfold.

## Interactive Investigation Loop

The app is designed around user action, not passive animation:

- choose a case file
- adjust detector strength, coherence, entanglement, and horizon curvature
- switch the delayed-choice ending between which-path and interference readout
- select a working hypothesis
- run measurements
- collect evidence in the investigator notebook
- watch probabilities, metrics, verdicts, and visualizations respond to the experiment state

## Physics Model Layer

The MVP now includes a stronger conceptual physics layer. It is still simplified, but the controls are tied to named models instead of decorative animation:

- **Density matrix decoherence**: phase damping reduces off-diagonal coherence.
- **Complementarity**: path distinguishability competes with interference visibility.
- **Bell/CHSH metric**: entanglement strength changes a conceptual CHSH value.
- **Delayed-choice context**: final readout changes whether the evidence supports path-like or wave-like inference.
- **Hawking trace model**: horizon curvature changes normalized Hawking temperature and radiation flux.
- **Information paradox model**: information retention and curvature shift the Page-curve turnover.

These are educational models for interaction and visualization. They are not full quantum field theory, numerical relativity, or quantum gravity.

## MVP Cases

1. **Vanishing Interference** - measurement and interference in a double-slit-inspired case.
2. **Entangled Witnesses** - entanglement and nonclassical-looking correlations.
3. **Delayed Choice** - how measurement context changes the evidence that can be read.
4. **Hawking Trace** - conceptual Hawking radiation near a horizon.
5. **Information Paradox** - a Page-curve-inspired black hole information case.

Each case includes:

- short story/context
- experiment setup
- measurements
- detector logs
- probability visualization
- explanation
- case notes summary

## User-Facing Functions

- **Run measurement**: records a new evidence entry and recalculates the case verdict.
- **Reset case**: restores the case to its default experimental configuration.
- **Hypothesis selection**: lets the user test whether the evidence favors wave-like behavior, particle/path records, correlations, horizon traces, or unitary information recovery.
- **Live controls**: sliders alter the conceptual model in real time.
- **Investigator notebook**: preserves the latest evidence trail for the active case.
- **Advanced metrics**: visibility, detector confidence, entropy, information retention, path distinguishability, CHSH, Hawking temperature, flux, scrambling, and Page turnover.
- **Report export**: copy or download a Markdown report for the active investigation.

## Scientific Scope

Quantum Noir uses simplified conceptual models. The black hole modules are visual explorations of information accounting, not full quantum gravity simulations. The project does not claim to solve Hawking radiation, the Page curve, or the black hole information paradox.

See [docs/SCIENTIFIC_SCOPE.md](docs/SCIENTIFIC_SCOPE.md).

The model equations and numerical assumptions are summarized in [docs/PHYSICS_MODELS.md](docs/PHYSICS_MODELS.md).

## Tech Stack

- React
- TypeScript
- Vite
- SVG and Canvas visualizations
- Local TypeScript case definitions
- Vitest for quantum math utilities

## Project Structure

```text
quantum-noir/
  src/
    quantum/
      linearAlgebra.ts
      realPhysicsModels.ts
      advancedModels.ts
      state.ts
      measurement.ts
      entanglement.ts
      probability.ts
      pageCurve.ts
    cases/
      vanishingInterference.ts
      entangledWitnesses.ts
      delayedChoice.ts
      hawkingTrace.ts
      informationParadox.ts
    components/
    visualizations/
    pages/
    styles/
  .github/
    workflows/
  docs/
    ARCHITECTURE.md
    PHYSICS_MODELS.md
    RELEASE.md
    SCIENTIFIC_SCOPE.md
  tests/
  CHANGELOG.md
  LICENSE
  RELEASE_NOTES.md
  README.md
  package.json
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run tests:

```bash
npm test
```

## Design Direction

Quantum Noir should feel like a strange scientific archive: dim rooms, glowing instruments, case files, detector noise, impossible witnesses, and beautiful probability ghosts. The interface favors investigation over explanation dumps.

## Roadmap

- Add Horizon Entanglement as a sixth case.
- Add Observer Effects as a dedicated case.
- Add adjustable experiment controls per case.
- Add per-case advanced equations panel.
- Add exportable case reports.
- Add richer Page curve annotations.
- Add keyboard-first navigation and accessibility refinements.
