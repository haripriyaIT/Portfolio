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
        backgroundColor: '#EAF2D7',
      }}
      aria-hidden="true"
    >
      {/* ── Subdued Frost Mint & Lavender Ambient Glows ── */}
      <div
        className="absolute top-[-10%] left-[-5%] w-[60vw] h-[60vh] rounded-full blur-[160px] pointer-events-none opacity-45 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(184, 137, 198, 0.22) 0%, rgba(219, 232, 192, 0.15) 50%, transparent 70%)',
          animationDuration: '10s',
        }}
      />
      <div
        className="absolute top-[30%] right-[-10%] w-[55vw] h-[55vh] rounded-full blur-[170px] pointer-events-none opacity-40 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(156, 107, 168, 0.20) 0%, rgba(175, 201, 131, 0.12) 50%, transparent 70%)',
          animationDuration: '12s',
          animationDelay: '4s',
        }}
      />
      <div
        className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vh] rounded-full blur-[180px] pointer-events-none opacity-35 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(230, 210, 236, 0.25) 0%, transparent 60%)',
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
