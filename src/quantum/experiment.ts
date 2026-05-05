import { QuantumCase, ProbabilityBar } from '../cases';
import { applyDecoherence, detectorConfidence } from './measurement';
import { normalizeDistribution } from './probability';
import {
  complementarityResidual,
  distinguishability,
  scramblingIndex,
} from './advancedModels';
import {
  delayedChoiceMachZehnder,
  doubleSlitAmplitudePattern,
  hawkingEvaporationStep,
  pageCurveFromEvaporation,
  partiallyEntangledPair,
} from './realPhysicsModels';

export type Hypothesis = 'wave' | 'particle' | 'correlation' | 'horizon' | 'unitarity';

export type ExperimentSettings = {
  detectorStrength: number;
  coherence: number;
  entanglement: number;
  horizonCurvature: number;
  lateChoice: 'which-path' | 'interference';
  hypothesis: Hypothesis;
};

export type ExperimentOutcome = {
  probabilities: ProbabilityBar[];
  interferencePattern: number[];
  pageCurve: { time: number; radiationEntropy: number; blackHoleEntropy: number; information: number }[];
  visibility: number;
  confidence: number;
  entropy: number;
  informationRetention: number;
  pathDistinguishability: number;
  complementarityGap: number;
  chsh: number;
  hawkingTemperature: number;
  radiationFlux: number;
  scrambling: number;
  pageTurnover: number;
  entanglementEntropy: number;
  evaporationMass: number;
  machZehnderD0: number;
  verdict: string;
  evidence: string;
  coherenceScore: number;
};

const clamp = (value: number) => Math.max(0, Math.min(1, value));

export function defaultSettingsForCase(caseFile: QuantumCase): ExperimentSettings {
  switch (caseFile.visualModel) {
    case 'interference':
      return {
        detectorStrength: 0.34,
        coherence: 0.86,
        entanglement: 0.2,
        horizonCurvature: 0.08,
        lateChoice: 'interference',
        hypothesis: 'wave',
      };
    case 'entanglement':
      return {
        detectorStrength: 0.28,
        coherence: 0.72,
        entanglement: 0.9,
        horizonCurvature: 0.12,
        lateChoice: 'interference',
        hypothesis: 'correlation',
      };
    case 'delayed-choice':
      return {
        detectorStrength: 0.48,
        coherence: 0.78,
        entanglement: 0.36,
        horizonCurvature: 0.1,
        lateChoice: 'which-path',
        hypothesis: 'particle',
      };
    case 'hawking':
      return {
        detectorStrength: 0.3,
        coherence: 0.42,
        entanglement: 0.68,
        horizonCurvature: 0.84,
        lateChoice: 'interference',
        hypothesis: 'horizon',
      };
    case 'paradox':
      return {
        detectorStrength: 0.46,
        coherence: 0.5,
        entanglement: 0.82,
        horizonCurvature: 0.88,
        lateChoice: 'interference',
        hypothesis: 'unitarity',
      };
  }
}

export function evaluateCase(caseFile: QuantumCase, settings: ExperimentSettings, runIndex: number): ExperimentOutcome {
  const decoherence = clamp(settings.detectorStrength * 0.58 + (1 - settings.coherence) * 0.62);
  const confidence = detectorConfidence(settings.detectorStrength, 1 - settings.coherence + 0.08);
  const slit = doubleSlitAmplitudePattern(
    96,
    1.2 + settings.detectorStrength * 0.4,
    0.42 + (1 - settings.coherence) * 0.18,
    1.6,
    decoherence * 3.2,
  );
  const pathDistinguishability = distinguishability(settings.detectorStrength, decoherence);
  const visibility = clamp(slit.visibility * Math.sqrt(Math.max(0, 1 - pathDistinguishability * pathDistinguishability)));
  const entangled = partiallyEntangledPair((Math.PI / 4) * settings.entanglement, 0, decoherence * 1.8);
  const chsh = entangled.chsh;
  const entanglementEntropy = entangled.entanglementEntropy;
  const hawking = hawkingEvaporationStep(1, settings.horizonCurvature, 0.22 + runIndex * 0.035);
  const hawkingTemperature = hawking.temperature;
  const flux = hawking.luminosity;
  const scrambling = scramblingIndex(settings.entanglement, settings.horizonCurvature, settings.detectorStrength);
  const machZehnder = delayedChoiceMachZehnder(
    Math.PI * (0.15 + settings.coherence * 1.6),
    settings.lateChoice === 'interference',
    decoherence * 2.2,
  );
  const informationRetention = clamp(
    entanglementEntropy * 0.42 +
      visibility * 0.2 +
      Math.max(0, chsh - 2) * 0.16 -
      flux * 0.18 +
      confidence * 0.08,
  );
  const entropy = clamp(decoherence * 0.34 + settings.horizonCurvature * 0.18 + flux * 0.34 + (1 - informationRetention) * 0.2);
  const complementarityGap = complementarityResidual(visibility, pathDistinguishability);
  const page = pageCurveFromEvaporation(80, 1, informationRetention);
  const pageTurnover = page.pageTime;
  const baseProbabilities = caseFile.probabilities.map((point) => point.probability);
  const adjusted = adjustDistribution(
    caseFile,
    baseProbabilities,
    settings,
    visibility,
    informationRetention,
    chsh,
    flux,
    slit.intensities,
    machZehnder,
  );
  const probabilities = caseFile.probabilities.map((point, index) => ({
    label: point.label,
    probability: adjusted[index] ?? 0,
  }));
  const expected = expectedHypothesis(caseFile, settings, visibility, informationRetention);
  const coherenceScore = hypothesisScore(settings.hypothesis, expected, visibility, informationRetention, entropy);

  return {
    probabilities,
    interferencePattern: slit.intensities,
    pageCurve: page.points,
    visibility,
    confidence,
    entropy,
    informationRetention,
    pathDistinguishability,
    complementarityGap,
    chsh,
    hawkingTemperature,
    radiationFlux: flux,
    scrambling,
    pageTurnover,
    entanglementEntropy,
    evaporationMass: hawking.remainingMassFraction,
    machZehnderD0: machZehnder[0],
    verdict: buildVerdict(caseFile, expected, coherenceScore),
    evidence: buildEvidence(caseFile, settings, runIndex, visibility, confidence, entropy, informationRetention, chsh, flux),
    coherenceScore,
  };
}

function adjustDistribution(
  caseFile: QuantumCase,
  values: number[],
  settings: ExperimentSettings,
  visibility: number,
  informationRetention: number,
  chsh: number,
  flux: number,
  slitIntensities: number[],
  machZehnder: [number, number],
): number[] {
  if (caseFile.visualModel === 'interference') {
    const left = slitIntensities.slice(0, Math.floor(slitIntensities.length / 2)).reduce((sum, value) => sum + value, 0);
    const right = slitIntensities.slice(Math.floor(slitIntensities.length / 2)).reduce((sum, value) => sum + value, 0);
    return normalizeDistribution(
      applyDecoherence([left, right, visibility], 1 - settings.coherence),
    );
  }
  if (caseFile.visualModel === 'entanglement') {
    const violation = clamp((chsh - 2) / (2 * Math.SQRT2 - 2));
    return normalizeDistribution([
      0.26 + violation * 0.36,
      0.26 + violation * 0.36,
      0.24 - violation * 0.18,
      0.24 - violation * 0.18,
    ]);
  }
  if (caseFile.visualModel === 'delayed-choice') {
    return settings.lateChoice === 'which-path'
      ? normalizeDistribution([0.72 + settings.detectorStrength * 0.22, 0.28 - settings.detectorStrength * 0.1])
      : normalizeDistribution(machZehnder);
  }
  if (caseFile.visualModel === 'hawking') {
    return normalizeDistribution([
      0.18 + flux * 0.52,
      0.46 - informationRetention * 0.14,
      0.36 - settings.coherence * 0.1,
    ]);
  }
  return normalizeDistribution([
    0.12 + informationRetention * 0.55,
    0.32 + settings.entanglement * 0.36,
    0.56 - informationRetention * 0.42,
  ]);
}

function expectedHypothesis(
  caseFile: QuantumCase,
  settings: ExperimentSettings,
  visibility: number,
  informationRetention: number,
): Hypothesis {
  if (caseFile.visualModel === 'interference') {
    return visibility > 0.45 ? 'wave' : 'particle';
  }
  if (caseFile.visualModel === 'entanglement') {
    return 'correlation';
  }
  if (caseFile.visualModel === 'delayed-choice') {
    return settings.lateChoice === 'which-path' ? 'particle' : 'wave';
  }
  if (caseFile.visualModel === 'hawking') {
    return 'horizon';
  }
  return informationRetention > 0.48 ? 'unitarity' : 'horizon';
}

function hypothesisScore(
  selected: Hypothesis,
  expected: Hypothesis,
  visibility: number,
  informationRetention: number,
  entropy: number,
): number {
  const match = selected === expected ? 0.62 : 0.24;
  return clamp(match + visibility * 0.14 + informationRetention * 0.16 - entropy * 0.08);
}

function buildVerdict(caseFile: QuantumCase, expected: Hypothesis, coherenceScore: number): string {
  const confidence = coherenceScore > 0.7 ? 'strong' : coherenceScore > 0.48 ? 'partial' : 'weak';
  const labels: Record<Hypothesis, string> = {
    wave: 'wave-like evidence',
    particle: 'path record',
    correlation: 'entangled correlation',
    horizon: 'horizon trace',
    unitarity: 'information-preserving account',
  };
  return `${caseFile.title}: ${confidence} support for ${labels[expected]}.`;
}

function buildEvidence(
  caseFile: QuantumCase,
  settings: ExperimentSettings,
  runIndex: number,
  visibility: number,
  confidence: number,
  entropy: number,
  informationRetention: number,
  chsh: number,
  flux: number,
): string {
  const timestamp = String(runIndex + 1).padStart(2, '0');
  const lateChoice = caseFile.visualModel === 'delayed-choice' ? `, late choice=${settings.lateChoice}` : '';
  return `RUN ${timestamp} / ${caseFile.title}: visibility=${Math.round(visibility * 100)}%, detector=${Math.round(
    confidence * 100,
  )}%, entropy=${Math.round(entropy * 100)}%, information=${Math.round(informationRetention * 100)}%, CHSH=${chsh.toFixed(
    2,
  )}, flux=${Math.round(flux * 100)}%${lateChoice}.`;
}
