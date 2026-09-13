import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface QuantumSphereProps {
  scrollProgress: number;
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
}

export const QuantumSphere: React.FC<QuantumSphereProps> = ({ scrollProgress, mousePos }) => {
  const groupRef = useRef<THREE.Group>(null);
  const latticeRef = useRef<THREE.Mesh>(null);
  const latticeInnerRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const tendrilsGroupRef = useRef<THREE.Group>(null);
  const orbitGroupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { viewport } = useThree();
  const isMobile = viewport.width < 6;

  // ─── 1. Neural Network Nodes & Connections ────────────────────────────────
  const nodeCount = isMobile ? 45 : 90;
  const sphereRadius = isMobile ? 1.6 : 2.2;

  const { nodePositions, baseVectors, maxConnections } = useMemo(() => {
    const positions = new Float32Array(nodeCount * 3);
    const baseVecs: THREE.Vector3[] = [];

    for (let i = 0; i < nodeCount; i++) {
      // Golden ratio spiral distribution on sphere with slight radius jitter
      const phi = Math.acos(1 - 2 * (i + 0.5) / nodeCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      const r = sphereRadius * (0.85 + Math.random() * 0.3);

      const v = new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
      baseVecs.push(v);
      positions[i * 3] = v.x;
      positions[i * 3 + 1] = v.y;
      positions[i * 3 + 2] = v.z;
    }

    // Allocate connection lines buffer
    const maxConn = nodeCount * 4;
    return { nodePositions: positions, baseVectors: baseVecs, maxConnections: maxConn };
  }, [nodeCount, sphereRadius]);

  const linePositions = useMemo(() => new Float32Array(maxConnections * 6), [maxConnections]);
  const lineColors = useMemo(() => new Float32Array(maxConnections * 6), [maxConnections]);

  // Node colors: Aurora Green to Electric Cyan
  const nodeColors = useMemo(() => {
    const colors = new Float32Array(nodeCount * 3);
    const emerald = new THREE.Color('#00C896');
    const mint    = new THREE.Color('#5FFFE0');
    const cyan    = new THREE.Color('#00E5FF');
    const temp    = new THREE.Color();

    for (let i = 0; i < nodeCount; i++) {
      const t = i / nodeCount;
      if (t < 0.5) {
        temp.copy(emerald).lerp(mint, t * 2);
      } else {
        temp.copy(mint).lerp(cyan, (t - 0.5) * 2);
      }
      colors[i * 3] = temp.r;
      colors[i * 3 + 1] = temp.g;
      colors[i * 3 + 2] = temp.b;
    }
    return colors;
  }, [nodeCount]);

  // ─── 2. Liquid Tendrils (Wrapping ribbons around sphere) ───────────────────
  const tendrilCount = isMobile ? 3 : 5;
  const tendrilMeshes = useMemo(() => {
    const items = [];
    const colors = ['#00C896', '#5FFFE0', '#00E5FF', '#00B882', '#E6FFFB'];

    for (let i = 0; i < tendrilCount; i++) {
      const points: THREE.Vector3[] = [];
      const numPoints = 64;
      const angleOffset = (i * Math.PI * 2) / tendrilCount;
      const inclination = (i - 2) * 0.45;
      const rBase = sphereRadius * (1.15 + i * 0.12);

      for (let j = 0; j <= numPoints; j++) {
        const theta = (j / numPoints) * Math.PI * 2;
        const x = rBase * Math.cos(theta + angleOffset);
        const y = rBase * Math.sin(theta + angleOffset) * Math.sin(inclination) + Math.sin(theta * 3) * 0.3;
        const z = rBase * Math.sin(theta + angleOffset) * Math.cos(inclination) + Math.cos(theta * 2) * 0.25;
        points.push(new THREE.Vector3(x, y, z));
      }

      const curve = new THREE.CatmullRomCurve3(points, true);
      const geometry = new THREE.TubeGeometry(curve, 64, 0.035, 8, true);
      items.push({
        geometry,
        color: colors[i % colors.length],
        speed: 0.25 + i * 0.1,
        dir: i % 2 === 0 ? 1 : -1,
        rotAxis: new THREE.Vector3(
          Math.sin(i * 1.3),
          Math.cos(i * 0.9),
          Math.sin(i * 0.5)
        ).normalize(),
      });
    }
    return items;
  }, [tendrilCount, sphereRadius]);

  // ─── 3. Orbiting Particles ────────────────────────────────────────────────
  const orbitCount = isMobile ? 6 : 12;
  const orbitData = useMemo(() => {
    return Array.from({ length: orbitCount }, (_, i) => ({
      radius: sphereRadius * (1.5 + Math.random() * 0.9),
      speed: (0.3 + Math.random() * 0.5) * (Math.random() > 0.5 ? 1 : -1),
      angle: (i * Math.PI * 2) / orbitCount,
      inclination: (Math.random() - 0.5) * Math.PI * 0.8,
      size: 0.06 + Math.random() * 0.08,
      color: Math.random() > 0.5 ? '#00C896' : '#00E5FF',
    }));
  }, [orbitCount, sphereRadius]);

  // Reference vectors for smooth mouse tilt
  const targetRotX = useRef(0);
  const targetRotY = useRef(0);

  // ─── Frame Animation Loop ─────────────────────────────────────────────────
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (!groupRef.current) return;

    // 1. Mouse interaction tilt with damping
    const mx = (mousePos.current.x - 0.5) * 2;
    const my = (mousePos.current.y - 0.5) * 2;
    targetRotY.current = THREE.MathUtils.lerp(targetRotY.current, mx * 0.35, delta * 3);
    targetRotX.current = THREE.MathUtils.lerp(targetRotX.current, -my * 0.25, delta * 3);

    // 2. Continuous organic floating movement
    const floatY = Math.sin(t * 0.8) * 0.18 + Math.cos(t * 1.3) * 0.08;
    const floatX = Math.cos(t * 0.6) * 0.12;

    // 3. Scroll-based transformation:
    // When scrollProgress increases, sphere shifts slightly backward and to the side
    const scrollZ = -scrollProgress * 3.5;
    const scrollX = scrollProgress * 1.2;
    const scrollY = -scrollProgress * 1.8;

    // Default placement: right-center of the screen
    const baseCX = viewport.width > 7 ? viewport.width * 0.22 : 0;
    const baseCY = viewport.width > 7 ? 0 : 0.8;

    groupRef.current.position.set(
      baseCX + floatX + scrollX,
      baseCY + floatY + scrollY,
      scrollZ
    );

    groupRef.current.rotation.x = targetRotX.current + Math.sin(t * 0.2) * 0.08;
    groupRef.current.rotation.y += delta * 0.12 + targetRotY.current * 0.02;

    // 4. Lattice morph & rotation
    if (latticeRef.current) {
      latticeRef.current.rotation.y -= delta * 0.18;
      latticeRef.current.rotation.z = Math.sin(t * 0.5) * 0.15;
      const s = 1 + Math.sin(t * 1.5) * 0.035;
      latticeRef.current.scale.set(s, s, s);
    }

    if (latticeInnerRef.current) {
      latticeInnerRef.current.rotation.x += delta * 0.22;
      latticeInnerRef.current.rotation.y += delta * 0.15;
      const sInner = 1 + Math.cos(t * 2.0) * 0.04;
      latticeInnerRef.current.scale.set(sInner, sInner, sInner);
    }

    // 5. Internal Core pulsing glow
    if (innerCoreRef.current) {
      const pulse = 1 + Math.sin(t * 2.5) * 0.08;
      innerCoreRef.current.scale.set(pulse, pulse, pulse);
    }

    // 6. Tendrils organic rotation and twist
    if (tendrilsGroupRef.current) {
      tendrilsGroupRef.current.children.forEach((child, i) => {
        const td = tendrilMeshes[i];
        if (td) {
          child.rotateOnAxis(td.rotAxis, delta * td.speed * td.dir);
          const deform = 1 + Math.sin(t * 2 + i) * 0.04;
          child.scale.set(deform, deform, deform);
        }
      });
    }

    // 7. Orbiting nodes update
    if (orbitGroupRef.current) {
      orbitGroupRef.current.children.forEach((child, idx) => {
        const item = orbitData[idx];
        if (!item) return;
        const currentAngle = item.angle + t * item.speed;
        const ox = Math.cos(currentAngle) * item.radius;
        const oy = Math.sin(currentAngle) * item.radius * Math.sin(item.inclination) + Math.sin(t * 2 + idx) * 0.15;
        const oz = Math.sin(currentAngle) * item.radius * Math.cos(item.inclination);
        child.position.set(ox, oy, oz);
      });
    }

    // 8. Dynamic Neural connections (appear & disappear organically)
    if (linesRef.current) {
      let lineIdx = 0;
      const threshold = sphereRadius * 0.72;
      const connTime = t * 1.2;

      for (let i = 0; i < nodeCount; i++) {
        const vi = baseVectors[i];
        // Jitter node position with noise
        const nxi = vi.x + Math.sin(t * 1.5 + i * 0.4) * 0.08;
        const nyi = vi.y + Math.cos(t * 1.2 + i * 0.3) * 0.08;
        const nzi = vi.z + Math.sin(t * 1.8 + i * 0.5) * 0.08;

        for (let j = i + 1; j < nodeCount; j++) {
          if (lineIdx >= maxConnections) break;

          const vj = baseVectors[j];
          const nxj = vj.x + Math.sin(t * 1.5 + j * 0.4) * 0.08;
          const nyj = vj.y + Math.cos(t * 1.2 + j * 0.3) * 0.08;
          const nzj = vj.z + Math.sin(t * 1.8 + j * 0.5) * 0.08;

          const dx = nxi - nxj;
          const dy = nyi - nyj;
          const dz = nzi - nzj;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < threshold * threshold) {
            // Pulse opacity to simulate firing synapses
            const pulse = Math.sin(connTime + i * 0.5 + j * 0.3) * 0.5 + 0.5;
            if (pulse > 0.25) {
              const ptr = lineIdx * 6;
              linePositions[ptr] = nxi;
              linePositions[ptr + 1] = nyi;
              linePositions[ptr + 2] = nzi;
              linePositions[ptr + 3] = nxj;
              linePositions[ptr + 4] = nyj;
              linePositions[ptr + 5] = nzj;

              const alpha = pulse * (1 - Math.sqrt(distSq) / threshold);
              lineColors[ptr] = 0.0 * alpha;     // R - emerald
              lineColors[ptr + 1] = 0.78 * alpha; // G
              lineColors[ptr + 2] = 0.59 * alpha; // B
              lineColors[ptr + 3] = 0.0 * alpha;  // R - cyan
              lineColors[ptr + 4] = 0.90 * alpha; // G
              lineColors[ptr + 5] = 1.0 * alpha;  // B

              lineIdx++;
            }
          }
        }
      }

      // Hide remaining lines
      for (let k = lineIdx * 6; k < maxConnections * 6; k++) {
        linePositions[k] = 0;
        lineColors[k] = 0;
      }

      const geom = linesRef.current.geometry;
      geom.attributes.position.needsUpdate = true;
      geom.attributes.color.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Quantum Point Light casting soft glow onto nearby space */}
      <pointLight color="#00E5FF" intensity={2.8} distance={10} decay={2} />
      <pointLight color="#00C896" intensity={2.0} distance={8} decay={2} position={[-1, 1, 1]} />
      <pointLight color="#5FFFE0" intensity={2.2} distance={8} decay={2} position={[1, -1, 1]} />

      {/* ── Inner Liquid Energy Core ── */}
      <mesh ref={innerCoreRef}>
        <sphereGeometry args={[sphereRadius * 0.42, 32, 32]} />
        <meshStandardMaterial
          color="#00C896"
          emissive="#00E5FF"
          emissiveIntensity={1.8}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* ── Inner Crystalline Facets ── */}
      <mesh ref={latticeInnerRef}>
        <dodecahedronGeometry args={[sphereRadius * 0.72, 1]} />
        <meshStandardMaterial
          color="#5FFFE0"
          emissive="#00C896"
          emissiveIntensity={0.9}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* ── Outer Geometric Lattice (Hollow Crystalline Sphere) ── */}
      <mesh ref={latticeRef}>
        <icosahedronGeometry args={[sphereRadius * 1.05, 2]} />
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#00C896"
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.28}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* ── Neural Network Nodes (Glowing points) ── */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[nodeColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.08 : 0.12}
          vertexColors
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* ── Dynamic Synapse Lines ── */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          linewidth={1}
        />
      </lineSegments>

      {/* ── Liquid Tendrils wrapping around sphere ── */}
      <group ref={tendrilsGroupRef}>
        {tendrilMeshes.map((td, idx) => (
          <mesh key={idx} geometry={td.geometry}>
            <meshStandardMaterial
              color={td.color}
              emissive={td.color}
              emissiveIntensity={1.2}
              roughness={0.15}
              metalness={0.8}
              transparent
              opacity={0.65}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
      </group>

      {/* ── Orbiting Nodes ── */}
      <group ref={orbitGroupRef}>
        {orbitData.map((item, idx) => (
          <mesh key={idx}>
            <sphereGeometry args={[item.size, 16, 16]} />
            <meshBasicMaterial
              color={item.color}
              transparent
              opacity={0.95}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};
