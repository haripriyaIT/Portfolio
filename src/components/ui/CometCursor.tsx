/**
 * CometCursor — page-wide fixed canvas comet trail
 * Uses violet/magenta palette to match Quantum Interface design
 */
import React, { useEffect, useRef } from 'react';

const VIOLET  = { r: 139, g: 92,  b: 246 };
const CYAN    = { r: 6,   g: 182, b: 212 };
const MAGENTA = { r: 236, g: 72,  b: 153 };

const TRAIL_LENGTH = 36;
const LERP = 0.15;

interface TrailPoint {
  x: number; y: number;
  opacity: number;
  size: number;
}

function lerpRGB(a: typeof VIOLET, b: typeof VIOLET, t: number) {
  return {
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t),
  };
}
function css(c: { r: number; g: number; b: number }, a: number) {
  return `rgba(${c.r},${c.g},${c.b},${Math.max(0, Math.min(1, a)).toFixed(3)})`;
}

const CometCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  const mouse  = useRef({ x: -500, y: -500 });
  const comet  = useRef({ x: -500, y: -500 });
  const trail  = useRef<TrailPoint[]>([]);
  const active = useRef(false);
  const idleT  = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || reduced) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      active.current = true;
      if (idleT.current) clearTimeout(idleT.current);
      idleT.current = setTimeout(() => { active.current = false; }, 160);
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Lerp comet toward real cursor
      comet.current.x += (mouse.current.x - comet.current.x) * LERP;
      comet.current.y += (mouse.current.y - comet.current.y) * LERP;

      const lag = Math.hypot(
        mouse.current.x - comet.current.x,
        mouse.current.y - comet.current.y,
      );

      // Push new trail point
      if (active.current || lag > 0.8) {
        trail.current.unshift({
          x: comet.current.x,
          y: comet.current.y,
          opacity: 1,
          size: Math.min(1.8 + lag * 0.045, 3.2),
        });
        if (trail.current.length > TRAIL_LENGTH) trail.current.length = TRAIL_LENGTH;
      }

      // Fade
      for (const pt of trail.current) pt.opacity *= 0.88;

      // Draw tail → head
      for (let i = trail.current.length - 1; i >= 0; i--) {
        const pt = trail.current[i];
        if (pt.opacity < 0.01) continue;

        const t = i / (trail.current.length - 1 || 1);
        // Head = violet, tail = cyan with magenta tinge
        const col = t < 0.5
          ? lerpRGB(VIOLET, CYAN, t * 2)
          : lerpRGB(CYAN, MAGENTA, (t - 0.5) * 2);

        const alpha = pt.opacity * (1 - t * 0.82);
        const size  = Math.max(0.3, pt.size * (1 - t * 0.78));

        // Segment line
        if (i < trail.current.length - 1) {
          const next = trail.current[i + 1];
          ctx.beginPath();
          ctx.moveTo(pt.x, pt.y);
          ctx.lineTo(next.x, next.y);
          ctx.strokeStyle = css(col, alpha * 0.35);
          ctx.lineWidth = size * 0.65;
          ctx.lineCap = 'round';
          ctx.stroke();
        }

        // Dot
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, size, 0, Math.PI * 2);
        ctx.fillStyle = css(col, alpha);
        ctx.fill();
      }

      // Head glow
      if (trail.current.length > 0 && trail.current[0].opacity > 0.3) {
        const h = trail.current[0];
        const g = ctx.createRadialGradient(h.x, h.y, 0, h.x, h.y, 14);
        g.addColorStop(0, css(VIOLET, 0.35 * h.opacity));
        g.addColorStop(0.5, css(CYAN,   0.12 * h.opacity));
        g.addColorStop(1, css(VIOLET, 0));
        ctx.beginPath();
        ctx.arc(h.x, h.y, 14, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
      if (idleT.current) clearTimeout(idleT.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 9998 }}
      aria-hidden="true"
    />
  );
};

export default CometCursor;
