import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ParticleWaves } from '../3d/ParticleWaves';
import { BackgroundEnvironment } from '../3d/BackgroundEnvironment';
import { CameraRig } from '../3d/CameraRig';
import { useMouse } from '../../context/MouseContext';

interface QuantumCanvasProps {
  scrollProgress?: number;
}

const QuantumCanvas: React.FC<QuantumCanvasProps> = ({ scrollProgress = 0 }) => {
  const mouseRef = useMouse();
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDpr(Math.min(window.devicePixelRatio || 1, 2));
    }
  }, []);

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{
        zIndex: 0,
        backgroundColor: '#030712',
      }}
      aria-hidden="true"
    >
      {/* ── Subdued Aurora Borealis Ambient Glow ── */}
      <div
        className="absolute top-[-15%] left-[-5%] w-[55vw] h-[55vh] rounded-full blur-[180px] pointer-events-none opacity-25 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(0, 200, 150, 0.14) 0%, rgba(95, 255, 224, 0.04) 50%, transparent 70%)',
          animationDuration: '10s',
        }}
      />
      <div
        className="absolute top-[25%] right-[-10%] w-[50vw] h-[50vh] rounded-full blur-[190px] pointer-events-none opacity-20 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.12) 0%, rgba(0, 184, 130, 0.03) 50%, transparent 70%)',
          animationDuration: '12s',
          animationDelay: '4s',
        }}
      />
      <div
        className="absolute bottom-[-10%] left-[25%] w-[45vw] h-[45vh] rounded-full blur-[200px] pointer-events-none opacity-15 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(95, 255, 224, 0.10) 0%, transparent 60%)',
          animationDuration: '14s',
          animationDelay: '7s',
        }}
      />
      <Canvas
        camera={{ position: [0, 0, 9], fov: 45, near: 0.1, far: 80 }}
        dpr={dpr}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <Suspense fallback={null}>
          <CameraRig scrollProgress={scrollProgress} mousePos={mouseRef} />
          <BackgroundEnvironment mousePos={mouseRef} />
          <ParticleWaves scrollProgress={scrollProgress} mousePos={mouseRef} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default QuantumCanvas;
