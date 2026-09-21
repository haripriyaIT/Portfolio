/**
 * CurrentFocus — Frost & Bouquet Theme
 * Two sub-sections: Internships + Current Focus (what I'm learning now)
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiBriefcase,
  FiActivity,
  FiZap,
  FiCpu,
  FiCode,
  FiBookOpen,
  FiAward,
  FiChevronDown,
  FiExternalLink,
  FiCalendar,
  FiClock,
} from 'react-icons/fi';

/* ─── Internship Data ──────────────────────────────────────────────────────── */

interface Internship {
  id: string;
  role: string;
  company: string;
  duration: string;
  type: string;
  badge: string;
  badgeColor: string;
  icon: React.ReactNode;
  summary: string;
  highlights: string[];
  skills: string[];
}

const INTERNSHIPS: Internship[] = [
  {
    id: 'gateway',
    role: 'Generative AI Intern',
    company: 'Gateway Software Solutions',
    duration: '15-Day Intensive',
    type: 'Industry Internship',
    badge: 'Completed',
    badgeColor: '#7B9849',
    icon: <FiZap size={22} />,
    summary:
      'Immersed in the cutting edge of Generative AI — covering LLM fundamentals, prompt engineering, and Python-based AI workflows to solve real-world problems.',
    highlights: [
      'Studied LLM architectures and transformer fundamentals',
      'Engineered prompts for improved AI output quality',
      'Built Python-based GenAI pipelines end-to-end',
      'Explored real-world applications of Generative AI',
    ],
    skills: ['Python', 'LLMs', 'Prompt Engineering', 'GenAI', 'Transformers'],
  },
  {
    id: 'litz',
    role: 'AI & Machine Learning Intern',
    company: 'Litz Tech',
    duration: '15-Day Intensive',
    type: 'Industry Internship',
    badge: 'Completed',
    badgeColor: '#7B9849',
    icon: <FiActivity size={22} />,
    summary:
      'Deep-dived into AI/ML algorithms and deep learning. Built a complete deep learning project covering data preprocessing, model development, training, and evaluation.',
    highlights: [
      'Implemented classical ML algorithms from scratch',
      'Trained and evaluated CNN-based deep learning models',
      'Performed data preprocessing and feature engineering',
      'Applied Python ecosystem: NumPy, Pandas, TensorFlow',
    ],
    skills: ['Python', 'TensorFlow', 'Deep Learning', 'CNN', 'Scikit-learn', 'NumPy'],
  },
];

/* ─── Current Focus Data ───────────────────────────────────────────────────── */

interface FocusArea {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  progress: number;
  progressLabel: string;
  tags: string[];
  color: string;
}

const FOCUS_AREAS: FocusArea[] = [
  {
    id: 'fullstack',
    title: 'Full-Stack Development',
    icon: <FiCode size={20} />,
    description:
      'Building production-ready web apps with React, TypeScript, and modern backend patterns. Focused on performance, accessibility, and delightful UI/UX.',
    progress: 72,
    progressLabel: 'Actively building projects',
    tags: ['React', 'TypeScript', 'Node.js', 'REST APIs', 'Vite'],
    color: '#9C6BA8',
  },
  {
    id: 'ml-dl',
    title: 'Machine Learning & Deep Learning',
    icon: <FiCpu size={20} />,
    description:
      'Deepening expertise in neural network architectures, model optimization, and applying AI to impactful real-world challenges.',
    progress: 65,
    progressLabel: 'Learning advanced architectures',
    tags: ['PyTorch', 'CNNs', 'Transformers', 'Model Tuning', 'LLMs'],
    color: '#855092',
  },
  {
    id: 'dsa',
    title: 'DSA & Problem Solving',
    icon: <FiBookOpen size={20} />,
    description:
      'Sharpening algorithmic thinking with consistent practice on LeetCode and competitive programming — targeting strong placement preparation.',
    progress: 58,
    progressLabel: 'Daily practice on LeetCode',
    tags: ['Graphs', 'DP', 'Trees', 'Sorting', 'LeetCode'],
    color: '#6E387B',
  },
  {
    id: 'career',
    title: 'Career & Certifications',
    icon: <FiAward size={20} />,
    description:
      'Earning industry-recognized certifications in AI/ML and cloud while building a strong GitHub portfolio for an impactful placement.',
    progress: 50,
    progressLabel: 'Certifications in progress',
    tags: ['Google AI', 'AWS Cloud', 'Portfolio', 'Open Source'],
    color: '#572962',
  },
];

/* ─── Internship Card ──────────────────────────────────────────────────────── */

const InternshipCard: React.FC<{ intern: Internship; index: number }> = ({ intern, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div
        className="group rounded-2xl border bg-white/85 backdrop-blur-md overflow-hidden transition-all duration-300 hover:shadow-[0_8px_40px_rgba(156,107,168,0.14)] hover:border-[#855092]/40 cursor-pointer"
        style={{ borderColor: 'rgba(156,107,168,0.22)' }}
        onClick={() => setOpen((p) => !p)}
      >
        {/* Card Header */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            {/* Icon + Title */}
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                style={{
                  background: 'radial-gradient(circle, #B889C6 0%, #9C6BA8 60%, #6E387B 100%)',
                  boxShadow: '0 4px 16px rgba(156,107,168,0.30)',
                }}
              >
                {intern.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span
                    className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full text-white"
                    style={{ background: intern.badgeColor }}
                  >
                    {intern.badge}
                  </span>
                  <span className="text-[11px] font-mono text-[#855092] bg-[#9C6BA8]/10 px-2.5 py-0.5 rounded-full border border-[#9C6BA8]/20">
                    {intern.type}
                  </span>
                </div>
                <h3 className="text-lg font-heading font-bold text-[#3D1A47] leading-tight">
                  {intern.role}
                </h3>
                <p className="text-[#6E387B] font-semibold text-sm">{intern.company}</p>
              </div>
            </div>

            {/* Duration + Expand toggle */}
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <div className="flex items-center gap-1.5 text-[#6F5179] text-xs font-mono">
                <FiCalendar size={12} />
                <span>{intern.duration}</span>
              </div>
              <motion.div
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="text-[#9C6BA8]"
              >
                <FiChevronDown size={18} />
              </motion.div>
            </div>
          </div>

          {/* Summary */}
          <p className="mt-4 text-sm text-[#6F5179] leading-relaxed">{intern.summary}</p>

          {/* Skill tags */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {intern.skills.map((s) => (
              <span
                key={s}
                className="px-2.5 py-0.5 rounded-md text-[11px] font-medium text-[#4A2055] bg-[#9C6BA8]/10 border border-[#9C6BA8]/20"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Expandable Highlights */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="highlights"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 border-t border-[#9C6BA8]/15 pt-4">
                <p className="text-xs font-mono font-bold text-[#855092] uppercase tracking-wider mb-3">
                  Key Highlights
                </p>
                <ul className="space-y-2">
                  {intern.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-[#4A2055]">
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: '#9C6BA8' }}
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover shimmer line */}
        <div
          className="h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
          style={{ background: 'linear-gradient(90deg, #6E387B, #9C6BA8, #B889C6)' }}
        />
      </div>
    </motion.div>
  );
};

/* ─── Focus Card ───────────────────────────────────────────────────────────── */

const FocusCard: React.FC<{ area: FocusArea; index: number }> = ({ area, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, delay: index * 0.12 }}
    className="group relative p-6 rounded-2xl bg-white/85 backdrop-blur-md border border-[#9C6BA8]/20 hover:border-[#855092]/40 hover:shadow-[0_8px_36px_rgba(156,107,168,0.13)] transition-all duration-300 overflow-hidden"
  >
    {/* Ambient glow */}
    <div
      className="absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-2xl"
      style={{ background: `${area.color}22` }}
    />

    {/* Icon */}
    <div
      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-white shadow-md"
      style={{ background: `linear-gradient(135deg, ${area.color}CC, ${area.color})` }}
    >
      {area.icon}
    </div>

    <h3 className="text-base font-heading font-bold text-[#3D1A47] mb-2">{area.title}</h3>
    <p className="text-xs text-[#6F5179] leading-relaxed mb-4">{area.description}</p>

    {/* Progress bar */}
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] font-mono text-[#855092] uppercase tracking-wider font-bold">
          Progress
        </span>
        <span className="text-[10px] font-mono text-[#6F5179]">{area.progress}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-[#9C6BA8]/12 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${area.progress}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: index * 0.12 + 0.3, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${area.color}99, ${area.color})` }}
        />
      </div>
      <p className="text-[10px] font-mono text-[#8B6B9A] mt-1">{area.progressLabel}</p>
    </div>

    {/* Tags */}
    <div className="flex flex-wrap gap-1.5 mt-3">
      {area.tags.map((tag) => (
        <span
          key={tag}
          className="px-2 py-0.5 rounded-md text-[10px] font-medium text-[#4A2055] border border-[#9C6BA8]/20 bg-white/90"
        >
          {tag}
        </span>
      ))}
    </div>
  </motion.div>
);

/* ─── Main Section ─────────────────────────────────────────────────────────── */

const CurrentFocus: React.FC = () => (
  <section
    id="focus"
    className="py-24 relative overflow-hidden"
    style={{ background: 'rgba(244, 248, 236, 0.7)' }}
  >
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(156,107,168,0.10)_0%,transparent_65%)] pointer-events-none" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(123,152,73,0.07)_0%,transparent_60%)] pointer-events-none" />

    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#3D1A47] mb-4">
          Internships &amp;{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6E387B] via-[#855092] to-[#9C6BA8]">
            Current Focus
          </span>
        </h2>
        <p className="text-[#6F5179] text-sm md:text-base max-w-xl mx-auto font-mono mt-3">
          Industry experience gained, and where I'm actively growing right now.
        </p>
        <div className="h-1 w-24 bg-gradient-to-r from-[#855092] to-[#9C6BA8] rounded-full mx-auto mt-5" />
      </motion.div>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-16 items-start">

        {/* LEFT: Internships */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#9C6BA8] to-[#6E387B] flex items-center justify-center text-white shadow-md">
              <FiBriefcase size={16} />
            </div>
            <div>
              <h3 className="text-xl font-heading font-bold text-[#3D1A47]">
                Internship Experience
              </h3>
              <p className="text-xs text-[#8B6B9A] font-mono mt-0.5">
                Click a card to expand highlights
              </p>
            </div>
          </motion.div>

          <div className="space-y-5">
            {INTERNSHIPS.map((intern, i) => (
              <InternshipCard key={intern.id} intern={intern} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-6 flex items-center gap-3 p-4 rounded-xl bg-white/70 border border-[#9C6BA8]/20"
          >
            <FiClock className="text-[#855092] flex-shrink-0" size={16} />
            <p className="text-xs text-[#6F5179] font-mono">
              <span className="font-bold text-[#3D1A47]">30+ days</span> of industry exposure across
              Generative AI &amp; Machine Learning domains.
            </p>
          </motion.div>
        </div>

        {/* RIGHT: Current Focus */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7B9849] to-[#5A7232] flex items-center justify-center text-white shadow-md">
              <FiZap size={16} />
            </div>
            <div>
              <h3 className="text-xl font-heading font-bold text-[#3D1A47]">
                Current Focus
              </h3>
              <p className="text-xs text-[#8B6B9A] font-mono mt-0.5">
                What I'm actively learning &amp; building
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FOCUS_AREAS.map((area, i) => (
              <FocusCard key={area.id} area={area} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-white/70 border border-[#9C6BA8]/20"
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
            <a
              href="#contact"
              className="text-[11px] font-mono font-semibold text-[#855092] hover:text-[#6E387B] flex items-center gap-1 transition-colors"
            >
              Get in touch <FiExternalLink size={11} />
            </a>
          </motion.div>
        </div>

      </div>
    </div>
  </section>
);

export default CurrentFocus;
