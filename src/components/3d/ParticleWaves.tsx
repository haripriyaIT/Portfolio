import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleWavesProps {
  scrollProgress: number;
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
}

// ─── Custom GLSL Shaders for Particle Waves ─────────────────────────────────

const waveVertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uMouseSpeed;
  uniform float uScrollProgress;
  uniform float uPixelRatio;

  attribute float aSize;
  attribute float aSide; // 0.0 = cyan (left/lower), 1.0 = magenta (right/upper)
  attribute float aSeed;
  attribute float aDepth;
  attribute vec3 aInitialPos;

  varying vec3 vColor;
  varying float vAlpha;
  varying float vDepth;

  // Pseudo 3D Simplex-like Noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  // Curl noise for fluid swirling
  vec3 curlNoise(vec3 p) {
    const float e = 0.1;
    float n1 = snoise(vec3(p.x, p.y + e, p.z));
    float n2 = snoise(vec3(p.x, p.y - e, p.z));
    float n3 = snoise(vec3(p.x, p.y, p.z + e));
    float n4 = snoise(vec3(p.x, p.y, p.z - e));
    float n5 = snoise(vec3(p.x + e, p.y, p.z));
    float n6 = snoise(vec3(p.x - e, p.y, p.z));

    float x = (n1 - n2) - (n3 - n4);
    float y = (n3 - n4) - (n5 - n6);
    float z = (n5 - n6) - (n1 - n2);
    return normalize(vec3(x, y, z));
  }

  void main() {
    vDepth = aDepth;
    vec3 pos = aInitialPos;

    // Organic continuous horizontal fluid flow
    float flowSpeed = aSide < 0.5 ? 0.35 : -0.28;
    pos.x += sin(uTime * 0.25 * flowSpeed + aSeed * 10.0) * 1.8;
    pos.y += cos(uTime * 0.35 + pos.x * 0.2 + aSeed * 6.28) * 0.85;

    // Multi-octave wave displacement (liquid + smoke behavior)
    vec3 noiseCoord = pos * 0.18 + vec3(uTime * 0.08, uTime * 0.06, aSeed);
    vec3 curl = curlNoise(noiseCoord);
    pos += curl * (1.2 + sin(uTime * 0.4 + aSeed * 3.14) * 0.5);

    // Scroll depth parallax
    pos.z += uScrollProgress * (aDepth - 0.5) * 4.0;
    pos.y -= uScrollProgress * 1.5;

    // ── Mouse Cursor Disturbance (Liquid Repel + Swirl Wake) ──
    // Convert normalized mouse to scene coordinates approx
    vec2 mouseWorld = uMouse * vec2(10.0, 6.0);
    float distToMouse = length(pos.xy - mouseWorld);
    float repelRadius = 1.8 + uMouseSpeed * 1.4;

    if (distToMouse < repelRadius) {
      float factor = 1.0 - (distToMouse / repelRadius);
      factor = smoothstep(0.0, 1.0, factor);

      // Repel outwards gently
      vec2 repelDir = normalize(pos.xy - mouseWorld);
      pos.xy += repelDir * factor * (1.0 + uMouseSpeed * 1.0);

      // Swirl around cursor
      vec2 swirlDir = vec2(-repelDir.y, repelDir.x);
      pos.xy += swirlDir * factor * (0.8 + uMouseSpeed * 1.2);

      // Disturbance lift in Z
      pos.z += factor * 0.5;
    }

    // Parallax mouse tilt across depth layers
    pos.xy += uMouse * (aDepth * 0.55);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Particle size attenuation by depth
    float dist = -mvPosition.z;
    gl_PointSize = (aSize * uPixelRatio * (20.0 / dist));
    gl_PointSize = clamp(gl_PointSize, 0.8, 16.0);

    // ── Color Palettes: Aurora Green × Electric Cyan ──
    vec3 emerald   = vec3(0.0, 0.784, 0.588);   // #00C896
    vec3 mint      = vec3(0.373, 1.0, 0.878);   // #5FFFE0
    vec3 cyan      = vec3(0.0, 0.898, 1.0);     // #00E5FF
    vec3 deepCyan  = vec3(0.0, 0.520, 0.600);   // Deep teal-cyan
    vec3 softWhite = vec3(0.850, 0.98, 0.96);   // Soft white

    float colorMix = sin(aSeed * 6.28 + uTime * 0.2) * 0.5 + 0.5;

    if (aSide < 0.25) {
      vColor = mix(emerald, mint, colorMix);
      if (distToMouse < repelRadius) {
        vColor = mix(vColor, softWhite, (1.0 - distToMouse / repelRadius) * 0.5);
      }
    } else if (aSide > 0.75) {
      vColor = mix(cyan, mix(deepCyan, mint, colorMix), colorMix);
      if (distToMouse < repelRadius) {
        vColor = mix(vColor, mix(cyan, softWhite, 0.5), (1.0 - distToMouse / repelRadius) * 0.5);
      }
    } else {
      vColor = mix(mint, mix(cyan, emerald, colorMix), 0.5);
      if (distToMouse < repelRadius) {
        vColor = mix(vColor, softWhite, (1.0 - distToMouse / repelRadius) * 0.6);
      }
    }

    // Base opacity with subtle, delicate density fade
    float alphaBase = mix(0.12, 0.38, aSeed);
    // Slight brightness near center
    float centerDist = length(pos.xy);
    float centerBoost = smoothstep(12.0, 2.0, centerDist) * 0.15;
    vAlpha = (alphaBase + centerBoost) * smoothstep(18.0, 8.0, dist);
  }
`;

const waveFragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vDepth;

  void main() {
    // Render soft glowing disc
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);

    if (dist > 0.5) discard;

    // Smooth radial falloff for digital fluid / luminous smoke feel
    float strength = 1.0 - smoothstep(0.0, 0.5, dist);
    strength = pow(strength, 1.8);

    // Inner bright core (very gentle)
    float core = 1.0 - smoothstep(0.0, 0.20, dist);

    vec3 finalColor = vColor + vec3(core * 0.20);
    float finalAlpha = vAlpha * strength;

    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`;

export const ParticleWaves: React.FC<ParticleWavesProps> = ({ scrollProgress, mousePos }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  const isMobile = viewport.width < 6;
  const particleCount = isMobile ? 1200 : 2600;

  // Track mouse velocity for force-field wake
  const lastMouse = useRef({ x: 0.5, y: 0.5 });
  const mouseSpeed = useRef(0);

  // Generate particle buffer attributes
  const { positions, sizes, sides, seeds, depths } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const sz = new Float32Array(particleCount);
    const sd = new Float32Array(particleCount);
    const se = new Float32Array(particleCount);
    const dp = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const streamIndex = i % 3;
      sd[i] = streamIndex === 0 ? 0.0 : streamIndex === 1 ? 1.0 : 0.5;
      se[i] = Math.random();
      dp[i] = Math.random(); // Depth layer 0 (back) to 1 (front)

      // Clustered fluid distribution across the screen in undulating aurora streams:
      let baseX: number;
      let baseY: number;

      if (streamIndex === 0) {
        // Stream 1: Emerald / Mint aurora stream (Lower-Left to Center)
        const angle = Math.random() * Math.PI * 0.9 + Math.PI * 0.75;
        const radius = Math.pow(Math.random(), 1.4) * 12.0;
        baseX = -6.0 + Math.cos(angle) * radius + (Math.random() - 0.5) * 4.0;
        baseY = -2.8 + Math.sin(angle) * (radius * 0.65) + (Math.random() - 0.5) * 3.5;
      } else if (streamIndex === 1) {
        // Stream 2: Electric Cyan aurora stream (Upper-Right to Center)
        const angle = Math.random() * Math.PI * 0.9 - Math.PI * 0.15;
        const radius = Math.pow(Math.random(), 1.4) * 12.0;
        baseX = 5.5 + Math.cos(angle) * radius + (Math.random() - 0.5) * 4.0;
        baseY = 2.5 + Math.sin(angle) * (radius * 0.65) + (Math.random() - 0.5) * 3.5;
      } else {
        // Stream 3: Central weaving Aurora curtain across whole viewport
        const spread = (Math.random() - 0.5) * 22.0;
        baseX = spread;
        baseY = Math.sin(spread * 0.25) * 2.5 + (Math.random() - 0.5) * 4.0;
      }

      // Random depth span: foreground to background
      const baseZ = (dp[i] - 0.5) * 9.0;

      pos[i * 3] = baseX;
      pos[i * 3 + 1] = baseY;
      pos[i * 3 + 2] = baseZ;

      // Variable sizes: subtle stardust to fine glowing points
      const sizeRandom = Math.random();
      sz[i] = sizeRandom < 0.8 ? 0.5 + sizeRandom * 0.7 : 1.2 + sizeRandom * 0.9;
    }

    return {
      positions: pos,
      sizes: sz,
      sides: sd,
      seeds: se,
      depths: dp,
    };
  }, [particleCount]);

  // Uniforms
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseSpeed: { value: 0 },
      uScrollProgress: { value: 0 },
      uPixelRatio: { value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1 },
    }),
    []
  );

  useFrame((state, delta) => {
    if (!materialRef.current) return;

    const t = state.clock.getElapsedTime();

    // Mouse velocity calculation
    const curX = mousePos.current.x;
    const curY = mousePos.current.y;
    const dx = curX - lastMouse.current.x;
    const dy = curY - lastMouse.current.y;
    const speed = Math.hypot(dx, dy) / (delta || 0.016);
    lastMouse.current = { x: curX, y: curY };

    // Damped speed for smooth wake decay
    mouseSpeed.current = THREE.MathUtils.lerp(mouseSpeed.current, Math.min(speed * 0.05, 1.5), delta * 5);

    // Normalized screen coordinates (-1 to 1)
    const normX = (curX - 0.5) * 2;
    const normY = -(curY - 0.5) * 2;

    materialRef.current.uniforms.uTime.value = t;
    materialRef.current.uniforms.uMouse.value.set(normX, normY);
    materialRef.current.uniforms.uMouseSpeed.value = mouseSpeed.current;
    materialRef.current.uniforms.uScrollProgress.value = scrollProgress;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aInitialPos"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aSize"
          args={[sizes, 1]}
        />
        <bufferAttribute
          attach="attributes-aSide"
          args={[sides, 1]}
        />
        <bufferAttribute
          attach="attributes-aSeed"
          args={[seeds, 1]}
        />
        <bufferAttribute
          attach="attributes-aDepth"
          args={[depths, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={waveVertexShader}
        fragmentShader={waveFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
