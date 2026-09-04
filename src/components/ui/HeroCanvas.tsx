import React, { useEffect, useRef, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Line {
  x: number;
  y: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
  maxOpacity: number;
  phase: 'in' | 'hold' | 'out';
  phaseTimer: number;
  width: number;
  colorT: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const BLUE = { r: 59,  g: 130, b: 246 };
const CYAN = { r: 6,   g: 182, b: 212 };

const LINE_COUNT_DESKTOP = 90;
const LINE_COUNT_TABLET  = 50;
const LINE_COUNT_MOBILE  = 30;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function lerpColor(t: number) {
  return {
    r: Math.round(BLUE.r + (CYAN.r - BLUE.r) * t),
    g: Math.round(BLUE.g + (CYAN.g - BLUE.g) * t),
    b: Math.round(BLUE.b + (CYAN.b - BLUE.b) * t),
  };
}

function rgba(r: number, g: number, b: number, a: number) {
  return `rgba(${r},${g},${b},${Math.max(0, a).toFixed(3)})`;
}

function makeLine(W: number, H: number, seeded = false): Line {
  const angle = Math.random() * 0.35 - 0.175; // ±10° from horizontal
  const length = Math.random() * 55 + 15;      // 15–70px
  return {
    x: seeded ? Math.random() * W : W + 10,
    y: Math.random() * H,
    length,
    angle,
    speed: Math.random() * 0.4 + 0.15,
    opacity: seeded ? Math.random() * 0.18 : 0,
    maxOpacity: Math.random() * 0.18 + 0.04,
    phase: seeded ? 'hold' : 'in',
    phaseTimer: seeded ? Math.random() * 180 : 0,
    width: Math.random() < 0.7 ? 0.6 : 1.0,
    colorT: Math.random(),
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const linesRef  = useRef<Line[]>([]);
  const mouseRef  = useRef({ x: -500, y: -500 });
  const isMobile  = useRef(false);
  const reduced   = useRef(false);

  const initLines = useCallback((W: number, H: number) => {
    const count = W < 640 ? LINE_COUNT_MOBILE : W < 1024 ? LINE_COUNT_TABLET : LINE_COUNT_DESKTOP;
    linesRef.current = Array.from({ length: count }, () => makeLine(W, H, true));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    isMobile.current = window.matchMedia('(pointer: coarse)').matches;
    reduced.current  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Resize
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      initLines(canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(document.documentElement);

    // Mouse (for proximity effect on lines only)
    const onMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    if (!isMobile.current) window.addEventListener('mousemove', onMove, { passive: true });

    // Pause when tab hidden
    let paused = false;
    const onVis = () => { paused = document.hidden; };
    document.addEventListener('visibilitychange', onVis);

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);
      if (paused) return;

      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const speedMult = reduced.current ? 0.2 : 1;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const line of linesRef.current) {
        // Move right-to-left with slight diagonal
        line.x -= Math.cos(line.angle) * line.speed * speedMult;
        line.y += Math.sin(line.angle) * line.speed * speedMult;

        // Phase: fade in → hold → fade out
        line.phaseTimer++;
        if (line.phase === 'in') {
          line.opacity = Math.min(line.opacity + 0.008, line.maxOpacity);
          if (line.opacity >= line.maxOpacity) { line.phase = 'hold'; line.phaseTimer = 0; }
        } else if (line.phase === 'hold') {
          if (line.phaseTimer > 160 + Math.random() * 200) line.phase = 'out';
        } else {
          line.opacity = Math.max(line.opacity - 0.006, 0);
        }

        // Reset when off-screen or fully faded
        if (line.x + line.length < 0 || line.y < -20 || line.y > H + 20 ||
            (line.phase === 'out' && line.opacity <= 0)) {
          Object.assign(line, makeLine(W, H, false));
          continue;
        }

        // Subtle mouse proximity boost
        if (!isMobile.current) {
          const dist = Math.hypot(line.x - mx, line.y - my);
          if (dist < 120) {
            line.opacity = Math.min(line.opacity + (1 - dist / 120) * 0.1, line.maxOpacity * 1.8);
            line.angle  += (Math.random() - 0.5) * 0.002;
          }
        }

        if (line.opacity < 0.005) continue;

        const { r, g, b } = lerpColor(line.colorT);
        const ex = line.x + Math.cos(line.angle) * line.length;
        const ey = line.y + Math.sin(line.angle) * line.length;

        // Main line with fade-in/out gradient
        const grad = ctx.createLinearGradient(line.x, line.y, ex, ey);
        grad.addColorStop(0,   rgba(r, g, b, 0));
        grad.addColorStop(0.3, rgba(r, g, b, line.opacity));
        grad.addColorStop(0.7, rgba(r, g, b, line.opacity));
        grad.addColorStop(1,   rgba(r, g, b, 0));

        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = grad;
        ctx.lineWidth   = line.width;
        ctx.lineCap     = 'round';
        ctx.stroke();

        // Glow pass for brighter lines
        if (line.opacity > 0.1) {
          ctx.beginPath();
          ctx.moveTo(line.x, line.y);
          ctx.lineTo(ex, ey);
          ctx.strokeStyle = rgba(r, g, b, line.opacity * 0.22);
          ctx.lineWidth   = line.width + 1.5;
          ctx.filter      = 'blur(1px)';
          ctx.stroke();
          ctx.filter      = 'none';
        }
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [initLines]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
};

export default HeroCanvas;
