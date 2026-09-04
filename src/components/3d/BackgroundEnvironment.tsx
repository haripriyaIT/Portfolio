import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BackgroundEnvironmentProps {
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
}

export const BackgroundEnvironment: React.FC<BackgroundEnvironmentProps> = ({ mousePos }) => {
  const starsRef = useRef<THREE.Points>(null);
  const count = 1200;

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    const cyan = new THREE.Color('#38bdf8');
    const violet = new THREE.Color('#a855f7');
    const white = new THREE.Color('#e0e7ff');
    const temp = new THREE.Color();

    for (let i = 0; i < count; i++) {
      // Distant spherical shell
      const r = 25 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = -5 - Math.random() * 25; // Far behind

      const pick = Math.random();
      if (pick < 0.4) temp.copy(white);
      else if (pick < 0.7) temp.copy(cyan);
      else temp.copy(violet);

      col[i * 3] = temp.r;
      col[i * 3 + 1] = temp.g;
      col[i * 3 + 2] = temp.b;

      sz[i] = 0.5 + Math.random() * 1.5;
    }

    return { positions: pos, colors: col, sizes: sz };
  }, [count]);

  useFrame((state, delta) => {
    if (!starsRef.current) return;
    const t = state.clock.getElapsedTime();

    // Very slow cosmic drift
    starsRef.current.rotation.y = t * 0.015;
    starsRef.current.rotation.x = Math.sin(t * 0.01) * 0.05;

    // Subtle Layer 1 Parallax (very gentle response to mouse)
    const mx = (mousePos.current.x - 0.5) * 0.4;
    const my = (mousePos.current.y - 0.5) * 0.4;
    starsRef.current.position.x = THREE.MathUtils.lerp(starsRef.current.position.x, mx, delta * 2);
    starsRef.current.position.y = THREE.MathUtils.lerp(starsRef.current.position.y, -my, delta * 2);
  });

  return (
    <>
      {/* ── Environment Lighting ── */}
      <ambientLight intensity={0.45} color="#0d1b38" />
      <directionalLight position={[10, 10, 5]} intensity={0.6} color="#8b5cf6" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#06b6d4" />

      {/* ── Layer 1: Distant Stars ── */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
};
