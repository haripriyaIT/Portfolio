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
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: 0,
        background: 'radial-gradient(ellipse at 50% 30%, #081126 0%, #050b18 60%, #020610 100%)',
      }}
      aria-hidden="true"
    >
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
