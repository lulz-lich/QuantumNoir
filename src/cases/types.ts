export type DetectorLog = {
  timestamp: string;
  message: string;
  signal: 'quiet' | 'anomaly' | 'critical';
};

export type Measurement = {
  label: string;
  value: string;
  detail: string;
};

export type ProbabilityBar = {
  label: string;
  probability: number;
};

export type QuantumCase = {
  id: string;
  title: string;
  subtitle: string;
  classification: string;
  context: string;
  setup: string[];
  measurements: Measurement[];
  detectorLogs: DetectorLog[];
  probabilities: ProbabilityBar[];
  explanation: string;
  notes: string[];
  equations: string[];
  visualModel: 'interference' | 'entanglement' | 'delayed-choice' | 'hawking' | 'paradox';
};
