export type PageCurvePoint = {
  time: number;
  entropy: number;
  information: number;
};

export function conceptualPageCurve(samples = 64, informationRecovery = 0.72): PageCurvePoint[] {
  const recovery = Math.max(0, Math.min(1, informationRecovery));
  return Array.from({ length: samples }, (_, index) => {
    const time = samples === 1 ? 0 : index / (samples - 1);
    const earlyRise = Math.sin(Math.PI * time);
    const lateRecovery = Math.max(0, time - 0.5) * recovery * 1.45;
    const entropy = Math.max(0.05, Math.min(0.96, 0.14 + earlyRise * 0.74 - lateRecovery));
    const information = Math.max(0, Math.min(1, time * recovery));
    return { time, entropy, information };
  });
}

export function pageTime(points: PageCurvePoint[]): PageCurvePoint {
  if (points.length === 0) {
    throw new Error('Cannot compute Page time for an empty curve.');
  }
  return points.reduce((peak, point) => (point.entropy > peak.entropy ? point : peak));
}
