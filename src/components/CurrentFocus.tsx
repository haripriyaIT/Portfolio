/**
 * CurrentFocus — Frost & Bouquet Theme
 * Standalone section: what I'm actively learning right now.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { FiZap, FiCpu, FiCode, FiBookOpen } from 'react-icons/fi';

interface FocusArea {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  description: string;
  progress: number;
  progressLabel: string;
  tags: string[];
  color: string;
  glowColor: string;
}

const FOCUS_AREAS: FocusArea[] = [
  {
    id: 'javascript',
    title: 'JavaScript',
    subtitle: 'Advanced Concepts',
    icon: <FiCode size={24} />,
    description:
      'Mastering modern JavaScript — ES2024 features, async patterns, closures, event loop internals, and building interactive UI logic without frameworks.',
    progress: 68,
    progressLabel: 'Exploring ES2024 & async patterns',
    tags: ['ES2024', 'Async/Await', 'Closures', 'DOM API', 'Event Loop'],
    color: '#9C6BA8',
    glowColor: 'rgba(156,107,168,0.18)',
  },
  {
    id: 'ml-algorithms',
    title: 'ML Algorithms',
    subtitle: 'Core Theory & Implementation',
    icon: <FiCpu size={24} />,
    description:
      'Deep-diving into core ML algorithms — from regression and decision trees to SVMs and ensemble methods — understanding the math and building intuition.',
    progress: 62,
    progressLabel: 'Implementing algorithms from scratch',
    tags: ['Linear Regression', 'SVM', 'Random Forest', 'k-NN', 'Scikit-learn'],
    color: '#855092',
    glowColor: 'rgba(133,80,146,0.18)',
  },
  {
    id: 'os',
    title: 'Operating Systems',
    subtitle: 'CS Fundamentals',
    icon: <FiBookOpen size={24} />,
    description:
      'Studying OS fundamentals — process scheduling, memory management, deadlocks, file systems, and concurrency — essential for placements and system-level thinking.',
    progress: 55,
    progressLabel: 'Covering scheduling & memory mgmt',
    tags: ['Processes', 'Threads', 'Scheduling', 'Memory', 'Deadlocks'],
    color: '#6E387B',
    glowColor: 'rgba(110,56,123,0.18)',
  },
];

const FocusCard: React.FC<{ area: FocusArea; index: number }> = ({ area, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 35 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.65, delay: index * 0.15 }}
    className="group relative flex flex-col rounded-2xl bg-white/85 backdrop-blur-md border border-[#9C6BA8]/20 hover:border-[#855092]/45 hover:shadow-[0_12px_48px_rgba(156,107,168,0.16)] transition-all duration-300 overflow-hidden"
  >
    <div
      className="h-1.5 w-full flex-shrink-0"
      style={{ background: `linear-gradient(90deg, ${area.color}99, ${area.color})` }}
    />
    <div
      className="absolute -top-12 -right-12 w-36 h-36 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-3xl"
      style={{ background: area.glowColor }}
    />
    <div className="p-7 flex flex-col flex-1">
      <div className="flex items-start gap-4 mb-5">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
          style={{
            background: `linear-gradient(135deg, ${area.color}CC 0%, ${area.color} 100%)`,
            boxShadow: `0 6px 20px ${area.glowColor}`,
          }}
        >
          {area.icon}
        </div>
        <div>
          <h3 className="text-lg font-heading font-bold text-[#3D1A47] leading-tight">
            {area.title}
          </h3>
          <p className="text-xs font-mono text-[#8B6B9A] mt-0.5">{area.subtitle}</p>
        </div>
      </div>
      <p className="text-sm text-[#6F5179] leading-relaxed flex-1 mb-5">{area.description}</p>
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono font-bold text-[#855092] uppercase tracking-widest">
            Learning Progress
          </span>
          <span className="text-sm font-heading font-bold" style={{ color: area.color }}>
            {area.progress}%
          </span>
        </div>
        <div className="h-2 rounded-full bg-[#EAE0F0] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${area.progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, delay: index * 0.15 + 0.3, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${area.color}88, ${area.color})` }}
          />
        </div>
        <p className="text-[10px] font-mono text-[#8B6B9A] mt-1.5 italic">{area.progressLabel}</p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {area.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-0.5 rounded-md text-[11px] font-medium text-[#4A2055] border border-[#9C6BA8]/20 bg-white/90 hover:bg-[#9C6BA8]/10 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const CurrentFocus: React.FC = () => (
  <section
    id="focus"
    className="py-24 relative overflow-hidden"
    style={{ background: 'rgba(248, 244, 240, 0.65)' }}
  >
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(156,107,168,0.10)_0%,transparent_65%)] pointer-events-none" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(123,152,73,0.07)_0%,transparent_60%)] pointer-events-none" />
    <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="mb-14 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#9C6BA8]/12 border border-[#9C6BA8]/25 mb-5">
          <FiZap size={13} className="text-[#855092]" />
          <span className="text-xs font-mono font-bold text-[#855092] uppercase tracking-widest">
            Right Now
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#3D1A47] mb-4">
          Current{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6E387B] via-[#855092] to-[#9C6BA8]">
            Focus
          </span>
        </h2>
        <p className="text-[#6F5179] text-sm md:text-base max-w-lg mx-auto font-mono mt-2">
          Topics I'm actively studying and building skills in right now.
        </p>
        <div className="h-1 w-20 bg-gradient-to-r from-[#855092] to-[#9C6BA8] rounded-full mx-auto mt-5" />
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FOCUS_AREAS.map((area, i) => (
          <FocusCard key={area.id} area={area} index={i} />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-4 p-4 rounded-2xl bg-white/70 border border-[#9C6BA8]/20 max-w-xl mx-auto"
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7B9849] opacity-60" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#7B9849]" />
          </span>
          <span className="text-xs font-mono font-bold text-[#3D1A47]">
            Actively Learning — Open to Internship Opportunities
          </span>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CurrentFocus;
