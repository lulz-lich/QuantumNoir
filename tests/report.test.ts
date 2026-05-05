import { describe, expect, it } from 'vitest';
import { quantumCases } from '../src/cases';
import { defaultSettingsForCase, evaluateCase } from '../src/quantum/experiment';
import { buildCaseReport } from '../src/quantum/report';

describe('case report export', () => {
  it('renders a complete markdown report', () => {
    const caseFile = quantumCases[0];
    const settings = defaultSettingsForCase(caseFile);
    const outcome = evaluateCase(caseFile, settings, 0);
    const report = buildCaseReport(caseFile, settings, outcome, [outcome.evidence]);

    expect(report).toContain(`# Quantum Noir Case Report: ${caseFile.title}`);
    expect(report).toContain('## Observables');
    expect(report).toContain('## Scientific Boundary');
    expect(report).toContain(outcome.verdict);
  });
});
