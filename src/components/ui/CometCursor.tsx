/**
 * CometCursor — Frost & Bouquet Theme
 * Palette: Bouquet Lavender (#9C6BA8), Deep Plum (#6E387B), Soft Lilac (#B889C6), Sage (#7B9849)
 */
import React, { useEffect, useRef } from 'react';

const BOUQUET_LAVENDER = { r: 156, g: 107, b: 168 }; // #9C6BA8
const DEEP_PLUM        = { r: 110, g: 56,  b: 123 }; // #6E387B
const SOFT_LILAC       = { r: 184, g: 137, b: 198 }; // #B889C6
const SAGE_MINT        = { r: 123, g: 152, b: 73  }; // #7B9849

const TRAIL_LENGTH = 34;
const LERP = 0.24;

interface TrailPoint {
  x: number;
  y: number;
  opacity: number;
  size: number;
  angle: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: { r: number; g: number; b: number };
  decay: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

function lerpRGB(a: { r: number; g: number; b: number }, b: { r: number; g: number; b: number }, t: number) {
  return {
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t),
  };
}

function cssRgba(c: { r: number; g: number; b: number }, a: number) {
  return `rgba(${c.r},${c.g},${c.b},${Math.max(0, Math.min(1, a)).toFixed(3)})`;
}

const CometCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  const mouse   = useRef({ x: -500, y: -500 });
  const comet   = useRef({ x: -500, y: -500 });
  const trail   = useRef<TrailPoint[]>([]);
  const sparks  = useRef<Spark[]>([]);
  const ripples = useRef<Ripple[]>([]);
  const active  = useRef(false);
  const idleT   = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    let lastX = -500;
    let lastY = -500;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      active.current = true;
      if (idleT.current) clearTimeout(idleT.current);
      idleT.current = setTimeout(() => { active.current = false; }, 180);

      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (dist > 14 && lastX > 0) {
        const count = Math.min(Math.floor(dist / 16), 2);
        for (let k = 0; k < count; k++) {
          const t = Math.random();
          const px = lastX + (e.clientX - lastX) * t + (Math.random() - 0.5) * 6;
          const py = lastY + (e.clientY - lastY) * t + (Math.random() - 0.5) * 6;
          const pCol = Math.random() < 0.5 ? BOUQUET_LAVENDER : Math.random() < 0.8 ? SOFT_LILAC : SAGE_MINT;

          sparks.current.push({
            x: px,
            y: py,
            vx: (Math.random() - 0.5) * 1.4,
            vy: (Math.random() - 0.5) * 1.4 - 0.3,
            size: Math.random() * 2.2 + 0.8,
            alpha: Math.random() * 0.7 + 0.3,
            color: pCol,
            decay: Math.random() * 0.025 + 0.02,
          });
        }
        if (sparks.current.length > 40) {
          sparks.current.splice(0, sparks.current.length - 40);
        }
      }
      lastX = e.clientX;
      lastY = e.clientY;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const onClick = (e: MouseEvent) => {
      ripples.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 4,
        maxRadius: 36,
        alpha: 0.7,
      });

      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 + Math.random() * 0.4;
        const spd = Math.random() * 2.2 + 1.0;
        sparks.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          size: Math.random() * 2.2 + 1.0,
          alpha: 0.9,
          color: i % 2 === 0 ? BOUQUET_LAVENDER : SAGE_MINT,
          decay: 0.035,
        });
      }
    };
    window.addEventListener('click', onClick, { passive: true });

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const prevX = comet.current.x;
      const prevY = comet.current.y;
      comet.current.x += (mouse.current.x - comet.current.x) * LERP;
      comet.current.y += (mouse.current.y - comet.current.y) * LERP;

      const lag = Math.hypot(
        mouse.current.x - comet.current.x,
        mouse.current.y - comet.current.y,
      );
      const angle = Math.atan2(comet.current.y - prevY, comet.current.x - prevX);

      if (active.current || lag > 0.6) {
        trail.current.unshift({
          x: comet.current.x,
          y: comet.current.y,
          opacity: 1,
          size: Math.min(2.0 + lag * 0.06, 4.2),
          angle,
        });
        if (trail.current.length > TRAIL_LENGTH) {
          trail.current.length = TRAIL_LENGTH;
        }
      }

      for (const pt of trail.current) {
        pt.opacity *= 0.90;
      }

      // 1. Draw Ripples
      for (let r = ripples.current.length - 1; r >= 0; r--) {
        const rp = ripples.current[r];
        rp.radius += 1.6;
        rp.alpha *= 0.92;

        if (rp.alpha < 0.02 || rp.radius > rp.maxRadius) {
          ripples.current.splice(r, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(156, 107, 168, ${rp.alpha * 0.7})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      }

      // 2. Draw Sparks
      for (let s = sparks.current.length - 1; s >= 0; s--) {
        const sp = sparks.current[s];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vx *= 0.96;
        sp.vy *= 0.96;
        sp.alpha -= sp.decay;

        if (sp.alpha <= 0.01) {
          sparks.current.splice(s, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size * sp.alpha, 0, Math.PI * 2);
        ctx.fillStyle = cssRgba(sp.color, sp.alpha * 0.85);
        ctx.fill();
      }

      // 3. Draw Ribbon Trail
      const pts = trail.current;
      const count = pts.length;

      if (count > 2) {
        for (let i = count - 2; i >= 0; i--) {
          const p1 = pts[i];
          const p2 = pts[i + 1];
          if (p1.opacity < 0.02) continue;

          const t = i / (count - 1);
          const col = t < 0.4
            ? lerpRGB(DEEP_PLUM, BOUQUET_LAVENDER, t / 0.4)
            : lerpRGB(BOUQUET_LAVENDER, SOFT_LILAC, (t - 0.4) / 0.6);

          const lineWidth = Math.max(0.8, p1.size * (1 - t * 0.75) * 1.3);
          const lineAlpha = p1.opacity * (1 - t * 0.75) * 0.75;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = cssRgba(col, lineAlpha);
          ctx.lineWidth = lineWidth;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(p1.x, p1.y, lineWidth * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = cssRgba(col, lineAlpha * 0.85);
          ctx.fill();
        }
      }

      // 4. Glowing Head
      if (pts.length > 0 && pts[0].opacity > 0.2) {
        const h = pts[0];
        ctx.beginPath();
        ctx.arc(h.x, h.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = cssRgba(DEEP_PLUM, 0.95 * h.opacity);
        ctx.fill();
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', onClick);
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
