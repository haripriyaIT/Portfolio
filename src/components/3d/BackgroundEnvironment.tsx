import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BackgroundEnvironmentProps {
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
}

export const BackgroundEnvironment: React.FC<BackgroundEnvironmentProps> = ({ mousePos }) => {
  const starsRef = useRef<THREE.Points>(null);
  const count = 400;

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    const bouquetLavender = new THREE.Color('#9C6BA8');
    const deepMauve       = new THREE.Color('#6E387B');
    const sageMint        = new THREE.Color('#7B9849');
    const softLilac       = new THREE.Color('#B889C6');
    const temp            = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const r = 25 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = -5 - Math.random() * 25;

      const pick = Math.random();
      if (pick < 0.40) temp.copy(bouquetLavender);
      else if (pick < 0.70) temp.copy(softLilac);
      else if (pick < 0.90) temp.copy(sageMint);
      else temp.copy(deepMauve);

      col[i * 3] = temp.r;
      col[i * 3 + 1] = temp.g;
      col[i * 3 + 2] = temp.b;

      sz[i] = 0.4 + Math.random() * 0.8;
    }

    return { positions: pos, colors: col, sizes: sz };
  }, [count]);

  useFrame((state, delta) => {
    if (!starsRef.current) return;
    const t = state.clock.getElapsedTime();

    starsRef.current.rotation.y = t * 0.015;
    starsRef.current.rotation.x = Math.sin(t * 0.01) * 0.05;

    const mx = (mousePos.current.x - 0.5) * 0.4;
    const my = (mousePos.current.y - 0.5) * 0.4;
    starsRef.current.position.x = THREE.MathUtils.lerp(starsRef.current.position.x, mx, delta * 2);
    starsRef.current.position.y = THREE.MathUtils.lerp(starsRef.current.position.y, -my, delta * 2);
  });

  return (
    <>
      {/* ── Environment Lighting for bright theme ── */}
      <ambientLight intensity={0.8} color="#F4F8EC" />
      <directionalLight position={[10, 10, 5]} intensity={0.6} color="#9C6BA8" />
      <directionalLight position={[-10, -10, -5]} intensity={0.4} color="#7B9849" />

      {/* ── Subtle floating particles ── */}
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
          size={0.045}
          vertexColors
          transparent
          opacity={0.45}
          blending={THREE.NormalBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
};
