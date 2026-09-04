import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraRigProps {
  scrollProgress: number;
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
}

export const CameraRig: React.FC<CameraRigProps> = ({ scrollProgress, mousePos }) => {
  const { camera, viewport } = useThree();

  // Target positions to smoothly interpolate towards
  const targetPos = useRef(new THREE.Vector3(0, 0, 9));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // 1. Slow organic floating camera drift
    const floatX = Math.sin(t * 0.4) * 0.15;
    const floatY = Math.cos(t * 0.5) * 0.12;

    // 2. Parallax tilt responding to mouse (-1 to 1)
    const mx = (mousePos.current.x - 0.5) * 2;
    const my = (mousePos.current.y - 0.5) * 2;
    const mouseCamX = mx * 0.45;
    const mouseCamY = -my * 0.35;

    // 3. Scroll-based camera journey across sections:
    // 0.00 - 0.20: HOME (wide cinematic view, Z: 9)
    // 0.20 - 0.45: ABOUT & SKILLS (glide closer and slightly down, Z: 7.8, Y: -1.0)
    // 0.45 - 0.75: PROJECTS & AI DASHBOARD (shift outward to reveal depth, Z: 8.8, X: -0.8)
    // 0.75 - 1.00: EXPERIENCE & CONTACT (closer, calm centered view, Z: 8.0, Y: -2.0)
    let sectionZ = 9.0;
    let sectionX = 0.0;
    let sectionY = 0.0;
    let lookAtY = 0.0;
    let lookAtX = 0.0;

    if (scrollProgress < 0.25) {
      // Home
      const p = scrollProgress / 0.25;
      sectionZ = THREE.MathUtils.lerp(9.0, 8.2, p);
      sectionX = THREE.MathUtils.lerp(0.0, 0.4, p);
      sectionY = THREE.MathUtils.lerp(0.0, -0.6, p);
    } else if (scrollProgress < 0.55) {
      // About & Skills
      const p = (scrollProgress - 0.25) / 0.3;
      sectionZ = THREE.MathUtils.lerp(8.2, 8.8, p);
      sectionX = THREE.MathUtils.lerp(0.4, -0.6, p);
      sectionY = THREE.MathUtils.lerp(-0.6, -1.4, p);
      lookAtX = THREE.MathUtils.lerp(0.0, -0.3, p);
    } else if (scrollProgress < 0.8) {
      // Projects & AI Showcase
      const p = (scrollProgress - 0.55) / 0.25;
      sectionZ = THREE.MathUtils.lerp(8.8, 8.4, p);
      sectionX = THREE.MathUtils.lerp(-0.6, 0.3, p);
      sectionY = THREE.MathUtils.lerp(-1.4, -2.2, p);
    } else {
      // Contact & Footer
      const p = (scrollProgress - 0.8) / 0.2;
      sectionZ = THREE.MathUtils.lerp(8.4, 7.8, p);
      sectionX = THREE.MathUtils.lerp(0.3, 0.0, p);
      sectionY = THREE.MathUtils.lerp(-2.2, -2.8, p);
      lookAtY = THREE.MathUtils.lerp(0.0, -0.8, p);
    }

    // Adapt camera distance for mobile screens
    if (viewport.width < 6) {
      sectionZ += 2.2;
    }

    targetPos.current.set(
      sectionX + mouseCamX + floatX,
      sectionY + mouseCamY + floatY,
      sectionZ
    );

    targetLookAt.current.set(
      lookAtX + mouseCamX * 0.2,
      lookAtY + mouseCamY * 0.2,
      0
    );

    // Butter-smooth lerp interpolation
    camera.position.lerp(targetPos.current, delta * 2.5);
    currentLookAt.current.lerp(targetLookAt.current, delta * 2.5);
    camera.lookAt(currentLookAt.current);
  });

  return null;
};
