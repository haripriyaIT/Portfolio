import React, { useState } from 'react';
import { motion } from 'framer-motion';

/* ─── Orbit configuration ─────────────────────────────────────────────────── */

interface OrbitItem {
  id: string;
  label: string;
  type: string;
  color: string;
  svg: React.ReactNode;
}

interface OrbitConfig {
  id: string;
  name: string;
  radiusPx: number;
  speed: number;
  ringColor: string;
  glowColor: string;
  items: OrbitItem[];
}

const DEFAULT_ORBITS: OrbitConfig[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    radiusPx: 175,
    speed: 20,
    ringColor: 'rgba(6, 182, 212, 0.35)',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    items: [
      {
        id: 'react',
        label: 'React.js',
        type: 'Frontend',
        color: '#61DAFB',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#61DAFB">
            <circle cx="12" cy="12" r="2.5" />
            <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.5" />
            <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 12 12)" />
          </svg>
        ),
      },
      {
        id: 'javascript',
        label: 'JavaScript',
        type: 'Language',
        color: '#F7DF1E',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <rect width="24" height="24" rx="3" fill="#F7DF1E" />
            <path
              d="M5.8 18.2l1.7-1c.3.5.6.9 1.3.9.6 0 .9-.2.9-.7 0-.5-.3-.7-1-.9l-.4-.2c-1.2-.5-2-1.1-2-2.4 0-1.2.9-2.1 2.4-2.1 1.1 0 1.9.4 2.4 1.4l-1.6 1c-.3-.5-.5-.7-.9-.7-.4 0-.7.3-.7.6 0 .4.3.6 1 .9l.4.2c1.4.6 2.1 1.2 2.1 2.5 0 1.4-1.1 2.2-2.6 2.2-1.4 0-2.4-.7-3-1.7z"
              fill="#000"
            />
          </svg>
        ),
      },
      {
        id: 'tailwind',
        label: 'Tailwind CSS',
        type: 'Styling',
        color: '#38BDF8',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <path
              fill="#38BDF8"
              d="M12 6c-4 0-6 2-7 6 1.5-2 3.25-2.75 5.25-2.25C11.4 10 12.2 11 13 12c1.3 1.7 2.5 2.5 5 2.5 4 0 6-2 7-6-1.5 2-3.25 2.75-5.25 2.25C18.6 10 17.8 9 17 8c-1.3-1.7-2.5-2-5-2z"
            />
          </svg>
        ),
      },
    ],
  },
  {
    id: 'programming',
    name: 'Programming',
    radiusPx: 285,
    speed: 30,
    ringColor: 'rgba(139, 92, 246, 0.35)',
    glowColor: 'rgba(139, 92, 246, 0.4)',
    items: [
      {
        id: 'python',
        label: 'Python',
        type: 'Programming',
        color: '#FFD43B',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <path fill="#3776AB" d="M12 2C8 2 8.5 4 8.5 4v4h7v1H6.5S4 8.7 4 12s2.7 3 2.7 3H8v-2.5S7.8 10 12 10s4 2.5 4 2.5v4.7S16.3 19 15 19h-3c-1.3 0-4 .5-4 3v1h8.5s3.5.2 3.5-3.5V15s.5-3-4-3h-3.5" />
            <path fill="#FFD43B" d="M12 22c4 0 3.5-2 3.5-2v-4h-7v-1h9S20 15.3 20 12s-2.7-3-2.7-3H16v2.5S16.2 14 12 14s-4-2.5-4-2.5V6.8S7.7 5 9 5h3c1.3 0 4-.5 4-3V1H7.5S4 .8 4 4.5V9s-.5 3 4 3h3.5" />
            <circle cx="9.5" cy="5.5" r="1" fill="#fff" />
            <circle cx="14.5" cy="18.5" r="1" fill="#fff" />
          </svg>
        ),
      },
      {
        id: 'java',
        label: 'Java',
        type: 'Programming',
        color: '#F89820',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <path
              fill="#F89820"
              d="M12 2c2 3-2 4-1 6 1 1.5 3 1 3 3 0 1.5-1.5 2.5-3.5 2.5S7 12.5 7 10c0-2 2-3 3-4 1-1 1-2.5 2-4z"
            />
            <path
              fill="#ED8B00"
              d="M6 16c1 1 3 1.5 6 1.5s5-.5 6-1.5c-.3 2-2.3 3-6 3s-5.7-1-6-3z"
            />
          </svg>
        ),
      },
      {
        id: 'c',
        label: 'C',
        type: 'Programming',
        color: '#A8B9CC',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <circle cx="12" cy="12" r="10" fill="#A8B9CC" />
            <text
              x="12"
              y="16"
              textAnchor="middle"
              fontSize="11"
              fontWeight="bold"
              fill="#fff"
            >
              C
            </text>
          </svg>
        ),
      },
      {
        id: 'sql',
        label: 'SQL',
        type: 'Database',
        color: '#4479A1',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <ellipse cx="12" cy="6" rx="8" ry="3" fill="#4479A1" />
            <path
              d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6"
              fill="none"
              stroke="#4479A1"
              strokeWidth="2"
            />
            <path
              d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"
              fill="none"
              stroke="#4479A1"
              strokeWidth="2"
            />
          </svg>
        ),
      },
    ],
  },
  {
    id: 'aiml',
    name: 'AI / ML',
    radiusPx: 395,
    speed: 42,
    ringColor: 'rgba(236, 72, 153, 0.35)',
    glowColor: 'rgba(236, 72, 153, 0.4)',
    items: [
      {
        id: 'tensorflow',
        label: 'TensorFlow',
        type: 'Deep Learning',
        color: '#FF6F00',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <path
              fill="#FF6F00"
              d="M12 2L3 7v4l5-2.8V20l4 2V6l-4 2.2V6L12 4l4 2v2.2L12 6v16l4-2V8.2L21 11V7l-9-5z"
            />
          </svg>
        ),
      },
      {
        id: 'pytorch',
        label: 'PyTorch',
        type: 'Deep Learning',
        color: '#EE4C2C',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <circle
              cx="12"
              cy="12"
              r="7"
              fill="none"
              stroke="#EE4C2C"
              strokeWidth="2"
            />
            <circle cx="17.5" cy="6.5" r="2" fill="#EE4C2C" />
          </svg>
        ),
      },
      {
        id: 'scikit',
        label: 'Scikit-learn',
        type: 'Machine Learning',
        color: '#F7931E',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <circle
              cx="12"
              cy="12"
              r="8"
              fill="none"
              stroke="#F7931E"
              strokeWidth="2"
            />
            <path
              d="M8 15c2 2 5 2 8-1"
              fill="none"
              stroke="#F7931E"
              strokeWidth="2"
            />
          </svg>
        ),
      },
      {
        id: 'numpy',
        label: 'NumPy',
        type: 'Data Science',
        color: '#4D77CF',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <path
              d="M5 5h4l6 10V5h4v14h-4L9 9v10H5z"
              fill="#4D77CF"
            />
          </svg>
        ),
      },
    ],
  },
];

/* ─── Main Skills component ──────────────────────────────────────────────────── */

const Skills = () => {
  const [hoveredOrbitId, setHoveredOrbitId] = useState<string | null>(null);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  return (
    <section id="skills" className="py-24 relative overflow-hidden" style={{ background: 'rgba(5,11,24,0.85)' }}>
      {/* Ambient background glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.06)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(236,72,153,0.04)_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-text mb-4">
            Technical{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-400 to-pink-400">
              Skills
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-violet-500 via-cyan-400 to-pink-500 rounded-full mx-auto" />
        </motion.div>

        {/* Orbit Showcase Layout */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">

          {/* Responsive Orbital Viewport Container */}
          <div className="w-full max-w-[840px] aspect-square flex items-center justify-center relative select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="relative flex-shrink-0 origin-center scale-[0.42] xs:scale-[0.52] sm:scale-[0.66] md:scale-[0.82] lg:scale-[0.95] xl:scale-100"
              style={{ width: 840, height: 840 }}
            >
              {/* Static Glowing Orbit Ring Tracks */}
              {DEFAULT_ORBITS.map((orbit) => {
                const isHovered = hoveredOrbitId === orbit.id;
                const diameter = orbit.radiusPx * 2;
                return (
                  <div
                    key={orbit.id + '-track'}
                    className="absolute rounded-full pointer-events-none transition-all duration-300"
                    style={{
                      width: diameter,
                      height: diameter,
                      top: '50%',
                      left: '50%',
                      marginTop: -orbit.radiusPx,
                      marginLeft: -orbit.radiusPx,
                      border: `1.5px dashed ${isHovered ? orbit.ringColor.replace('0.35', '0.9') : orbit.ringColor}`,
                      boxShadow: isHovered
                        ? `0 0 35px ${orbit.glowColor}, inset 0 0 25px ${orbit.glowColor}`
                        : `0 0 15px ${orbit.glowColor}`,
                    }}
                  />
                );
              })}

              {/* Central Glowing Quantum Core */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                <motion.div
                  animate={{ scale: [1, 1.08, 1], opacity: [0.9, 1, 0.9] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-24 h-24 rounded-full flex flex-col items-center justify-center"
                  style={{
                    background: 'radial-gradient(circle, rgba(139,92,246,0.95) 0%, rgba(6,182,212,0.7) 50%, rgba(5,11,24,0.9) 100%)',
                    boxShadow: '0 0 45px rgba(139,92,246,0.9), 0 0 90px rgba(6,182,212,0.4)',
                    border: '1.5px solid rgba(255,255,255,0.3)',
                  }}
                >
                  <span className="text-white text-xs font-mono font-black tracking-widest text-center leading-none">
                    AI
                  </span>
                  <span className="text-cyan-300 text-[10px] font-mono font-bold tracking-widest mt-0.5">
                    CORE
                  </span>
                </motion.div>
              </div>

              {/* Orbiting Revolving Rings */}
              {DEFAULT_ORBITS.map((orbit) => {
                const isOrbitPaused = hoveredOrbitId === orbit.id;
                const diameter = orbit.radiusPx * 2;

                return (
                  <div
                    key={orbit.id + '-revolving-layer'}
                    className="absolute"
                    style={{
                      width: diameter,
                      height: diameter,
                      top: '50%',
                      left: '50%',
                      marginTop: -orbit.radiusPx,
                      marginLeft: -orbit.radiusPx,
                      borderRadius: '50%',
                      animation: `orbit-revolve ${orbit.speed}s linear infinite`,
                      animationPlayState: isOrbitPaused ? 'paused' : 'running',
                      pointerEvents: 'none',
                    }}
                  >
                    {/* Items distributed evenly along the 360° circumference */}
                    {orbit.items.map((item, idx) => {
                      const totalItems = orbit.items.length;
                      const angleRad = (idx * 2 * Math.PI) / totalItems;
                      // Calculate position on the circle (radius R from center R, R)
                      const x = orbit.radiusPx + orbit.radiusPx * Math.cos(angleRad);
                      const y = orbit.radiusPx + orbit.radiusPx * Math.sin(angleRad);
                      const isItemHovered = hoveredItemId === item.id;

                      return (
                        <div
                          key={item.id}
                          className="absolute pointer-events-auto cursor-pointer"
                          style={{
                            left: `${x}px`,
                            top: `${y}px`,
                            transform: 'translate(-50%, -50%)',
                          }}
                          onMouseEnter={() => {
                            setHoveredOrbitId(orbit.id);
                            setHoveredItemId(item.id);
                          }}
                          onMouseLeave={() => {
                            setHoveredOrbitId(null);
                            setHoveredItemId(null);
                          }}
                        >
                          {/* Counter-rotation to keep the icon and badge upright across all 360 degrees */}
                          <div
                            style={{
                              animation: `orbit-revolve-counter ${orbit.speed}s linear infinite`,
                              animationPlayState: isOrbitPaused ? 'paused' : 'running',
                            }}
                          >
                            <motion.div
                              whileHover={{ scale: 1.25 }}
                              className="relative flex items-center justify-center w-12 h-12 rounded-full border-2 backdrop-blur-md transition-all duration-300"
                              style={{
                                background: `radial-gradient(circle at 35% 35%, ${item.color}33, rgba(10,22,40,0.95))`,
                                borderColor: isItemHovered ? item.color : `${item.color}88`,
                                boxShadow: isItemHovered
                                  ? `0 0 25px ${item.color}, 0 0 10px ${item.color}`
                                  : `0 0 12px ${item.color}44`,
                              }}
                            >
                              <div className="flex items-center justify-center pointer-events-none">
                                {item.svg}
                              </div>
                            </motion.div>

                            {/* Floating Tooltip displaying label & category */}
                            {isItemHovered && (
                              <motion.div
                                initial={{ opacity: 0, y: 6, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold text-white z-50 pointer-events-none"
                                style={{
                                  background: `linear-gradient(135deg, ${item.color}33, rgba(10,22,40,0.98))`,
                                  border: `1.5px solid ${item.color}`,
                                  boxShadow: `0 0 20px ${item.color}66`,
                                }}
                              >
                                <p className="font-heading font-bold text-white text-xs">{item.label}</p>
                                <p className="text-[10px] text-violet-200/80 font-mono tracking-wide uppercase">{item.type}</p>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Side Legend & Category Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-6 w-full max-w-sm"
          >
            {DEFAULT_ORBITS.map((orbit) => {
              const isSelected = hoveredOrbitId === orbit.id;
              return (
                <motion.div
                  key={orbit.id}
                  whileHover={{ x: 6 }}
                  onMouseEnter={() => setHoveredOrbitId(orbit.id)}
                  onMouseLeave={() => setHoveredOrbitId(null)}
                  className="glass rounded-2xl p-5 border cursor-pointer transition-all duration-300"
                  style={{
                    borderColor: isSelected ? orbit.ringColor.replace('0.35', '0.9') : 'rgba(139,92,246,0.2)',
                    boxShadow: isSelected ? `0 0 30px ${orbit.glowColor}` : 'none',
                    background: isSelected ? 'rgba(15,30,53,0.85)' : 'rgba(10,22,40,0.6)',
                  }}
                >
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-3 h-3 rounded-full flex-shrink-0 animate-pulse"
                        style={{
                          background: orbit.glowColor,
                          boxShadow: `0 0 10px ${orbit.glowColor}`,
                        }}
                      />
                      <h3 className="font-heading font-bold text-base uppercase tracking-wider text-text">
                        {orbit.name}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-violet-300/70">
                      {orbit.speed}s / rev
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {orbit.items.map((item) => (
                      <span
                        key={item.id}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-white/90 border transition-all duration-200"
                        style={{
                          background: hoveredItemId === item.id ? `${item.color}33` : `${item.color}15`,
                          borderColor: hoveredItemId === item.id ? item.color : `${item.color}44`,
                          boxShadow: hoveredItemId === item.id ? `0 0 12px ${item.color}66` : 'none',
                        }}
                      >
                        <span className="flex-shrink-0">{item.svg}</span>
                        {item.label}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}

            <div className="p-3 rounded-xl bg-violet-950/20 border border-violet-500/20 text-center">
              <p className="text-xs text-violet-300/70 font-mono">
                ✦ Hover any node or ring to pause revolution & inspect details
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Skills;
