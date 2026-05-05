import { useEffect, useRef } from 'react';
import { QuantumCase } from '../cases';
import { ExperimentOutcome, ExperimentSettings } from '../quantum/experiment';

type CaseCanvasProps = {
  caseFile: QuantumCase;
  settings: ExperimentSettings;
  outcome: ExperimentOutcome;
  runIndex: number;
};

type Particle = {
  angle: number;
  orbit: number;
  speed: number;
  size: number;
  pair: number;
};

function buildParticles(): Particle[] {
  return Array.from({ length: 120 }, (_, index) => ({
    angle: Math.random() * Math.PI * 2,
    orbit: 0.14 + Math.random() * 0.72,
    speed: 0.14 + Math.random() * 0.74,
    size: 1.4 + Math.random() * 3.2,
    pair: index % 2 === 0 ? 1 : -1,
  }));
}

export function CaseCanvas({ caseFile, settings, outcome, runIndex }: CaseCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>(buildParticles());

  useEffect(() => {
    particlesRef.current = buildParticles();
  }, [caseFile.id]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }
    const context = canvas.getContext('2d');
    if (!context) {
      return undefined;
    }

    let frame = 0;
    let animation = 0;
    const palette = ['#55f0d2', '#f0b85a', '#ff647c', '#8ba8ff'];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(900, Math.floor(rect.width * scale));
      canvas.height = Math.max(560, Math.floor(rect.height * scale));
    };

    const drawBackground = (width: number, height: number) => {
      const gradient = context.createRadialGradient(width * 0.52, height * 0.45, 0, width * 0.52, height * 0.45, width * 0.72);
      gradient.addColorStop(0, 'rgba(85, 240, 210, 0.13)');
      gradient.addColorStop(0.42, 'rgba(13, 18, 24, 0.92)');
      gradient.addColorStop(1, 'rgba(5, 6, 8, 1)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      for (let i = 0; i < 26; i += 1) {
        const y = (height / 25) * i;
        context.strokeStyle = `rgba(210, 231, 232, ${0.025 + Math.sin(frame * 0.01 + i) * 0.008})`;
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(0, y);
        context.bezierCurveTo(width * 0.3, y - 22, width * 0.64, y + 28, width, y + Math.sin(frame * 0.018 + i) * 18);
        context.stroke();
      }
    };

    const drawInterference = (width: number, height: number) => {
      const phasePulse = Math.sin(frame * 0.025) * 0.08;
      const pattern = outcome.interferencePattern.map((value, index) => {
        const wave = 1 + phasePulse * Math.cos(index * 0.7);
        return value * wave;
      });
      const barWidth = width / pattern.length;
      pattern.forEach((value, index) => {
        const barHeight = value * height * (7 + outcome.visibility * 16);
        const washout = outcome.pathDistinguishability * 0.5;
        context.fillStyle = `rgba(85, 240, 210, ${0.04 + value * (4 + outcome.visibility * 9) - washout * 0.04})`;
        context.fillRect(index * barWidth, height * 0.6 - barHeight / 2, Math.max(2, barWidth - 1), barHeight);
      });

      const detectorX = width * (0.18 + outcome.pathDistinguishability * 0.62);
      context.fillStyle = `rgba(255, 100, 124, ${0.03 + outcome.pathDistinguishability * 0.18})`;
      context.fillRect(detectorX, 0, 5 + outcome.pathDistinguishability * 22, height);
    };

    const drawEntanglement = (width: number, height: number) => {
      const cx = width * 0.5;
      const cy = height * 0.48;
      const scale = Math.min(width, height);
      particlesRef.current.forEach((particle, index) => {
        const angle = particle.angle + frame * 0.006 * particle.speed;
        const x = cx + Math.cos(angle) * scale * particle.orbit * 0.32 + particle.pair * scale * 0.16;
        const y = cy + Math.sin(angle) * scale * particle.orbit * 0.18;
        context.fillStyle = palette[index % palette.length];
        context.globalAlpha = 0.18 + Math.max(0, outcome.chsh - 2) * 0.42;
        context.beginPath();
        context.arc(x, y, particle.size, 0, Math.PI * 2);
        context.fill();
        context.globalAlpha = 1;

        if (index % 2 === 0) {
          const other = particlesRef.current[index + 1];
          if (other) {
            const otherAngle = other.angle + frame * 0.006 * other.speed;
            const ox = cx + Math.cos(otherAngle) * scale * other.orbit * 0.32 - scale * 0.16;
            const oy = cy + Math.sin(otherAngle) * scale * other.orbit * 0.18;
            context.strokeStyle = `rgba(85, 240, 210, ${0.03 + Math.max(0, outcome.chsh - 2) * 0.22})`;
            context.lineWidth = 0.6 + Math.max(0, outcome.chsh - 2) * 1.2;
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(ox, oy);
            context.stroke();
          }
        }
      });
    };

    const drawHorizon = (width: number, height: number) => {
      const cx = width * 0.53;
      const cy = height * 0.46;
      const radius = Math.min(width, height) * (0.13 + outcome.hawkingTemperature * 0.13);
      const glow = context.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius * 1.8);
      glow.addColorStop(0, 'rgba(0, 0, 0, 0.98)');
      glow.addColorStop(0.5, 'rgba(0, 0, 0, 0.95)');
      glow.addColorStop(0.53, `rgba(240, 184, 90, ${0.32 + outcome.hawkingTemperature * 0.46})`);
      glow.addColorStop(0.68, `rgba(255, 100, 124, ${0.08 + outcome.radiationFlux * 0.34})`);
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      context.fillStyle = glow;
      context.beginPath();
      context.arc(cx, cy, radius * 1.8, 0, Math.PI * 2);
      context.fill();

      context.strokeStyle = 'rgba(240, 184, 90, 0.7)';
      context.lineWidth = 3;
      context.beginPath();
      context.arc(cx, cy, radius, 0, Math.PI * 2);
      context.stroke();

      particlesRef.current.slice(0, Math.round(24 + outcome.radiationFlux * 96)).forEach((particle, index) => {
        const angle = particle.angle + frame * 0.01 * particle.speed;
        const x = cx + Math.cos(angle) * radius * (1.05 + particle.orbit);
        const y = cy + Math.sin(angle) * radius * (0.82 + particle.orbit * 0.3);
        context.fillStyle = palette[index % palette.length];
        context.globalAlpha = 0.2 + outcome.radiationFlux * 0.58;
        context.beginPath();
        context.arc(x, y, particle.size, 0, Math.PI * 2);
        context.fill();
        context.globalAlpha = 1;
      });
    };

    const drawPageCurve = (width: number, height: number) => {
      context.strokeStyle = caseFile.visualModel === 'paradox' ? '#ff647c' : '#8bdc88';
      context.lineWidth = 4;
      context.beginPath();
      outcome.pageCurve.forEach((point, index) => {
        const x = width * 0.13 + point.time * width * 0.72;
        const bend = point.time > outcome.pageTurnover ? outcome.informationRetention * 0.18 : 0;
        const y = height * 0.78 - (point.radiationEntropy - bend) * height * 0.45;
        if (index === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      });
      context.stroke();
    };

    const draw = () => {
      frame += 1;
      const width = canvas.width;
      const height = canvas.height;
      drawBackground(width, height);

      if (caseFile.visualModel === 'interference' || caseFile.visualModel === 'delayed-choice') {
        drawInterference(width, height);
      }
      if (caseFile.visualModel === 'entanglement' || caseFile.visualModel === 'delayed-choice') {
        drawEntanglement(width, height);
      }
      if (caseFile.visualModel === 'hawking' || caseFile.visualModel === 'paradox') {
        drawHorizon(width, height);
      }
      if (caseFile.visualModel === 'paradox') {
        drawPageCurve(width, height);
      }

      animation = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener('resize', resize);
    };
  }, [caseFile, settings, outcome, runIndex]);

  return <canvas ref={canvasRef} className="case-canvas" aria-label={`${caseFile.title} visualization`} />;
}
