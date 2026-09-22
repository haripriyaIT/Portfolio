/**
 * Internships — Frost & Bouquet Theme
 * Standalone section showcasing internship experience with expandable cards.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiBriefcase,
  FiActivity,
  FiZap,
  FiChevronDown,
  FiCalendar,
  FiClock,
  FiMapPin,
} from 'react-icons/fi';

/* ─── Data ─────────────────────────────────────────────────────────────────── */

interface Internship {
  id: string;
  role: string;
  company: string;
  location: string;
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
    location: 'India',
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
    location: 'India',
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

/* ─── Card ─────────────────────────────────────────────────────────────────── */

const InternshipCard: React.FC<{ intern: Internship; index: number }> = ({ intern, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.15 }}
    >
      <div
        className="group rounded-2xl border bg-white/85 backdrop-blur-md overflow-hidden transition-all duration-300 hover:shadow-[0_10px_44px_rgba(156,107,168,0.16)] hover:border-[#855092]/45 cursor-pointer"
        style={{ borderColor: 'rgba(156,107,168,0.22)' }}
        onClick={() => setOpen((p) => !p)}
      >
        {/* Top accent line */}
        <div
          className="h-1 w-full"
          style={{ background: 'linear-gradient(90deg, #6E387B, #9C6BA8, #B889C6)' }}
        />

        {/* Card Body */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            {/* Icon + Titles */}
            <div className="flex items-start gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-lg"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #C49DD4 0%, #9C6BA8 55%, #6E387B 100%)',
                  boxShadow: '0 6px 20px rgba(156,107,168,0.32)',
                }}
              >
                {intern.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span
                    className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full text-white"
                    style={{ background: intern.badgeColor }}
                  >
                    ✓ {intern.badge}
                  </span>
                  <span className="text-[11px] font-mono text-[#855092] bg-[#9C6BA8]/10 px-2.5 py-0.5 rounded-full border border-[#9C6BA8]/20">
                    {intern.type}
                  </span>
                </div>
                <h3 className="text-xl font-heading font-bold text-[#3D1A47] leading-tight mb-0.5">
                  {intern.role}
                </h3>
                <p className="text-[#6E387B] font-semibold text-sm">{intern.company}</p>
                <div className="flex items-center gap-3 mt-1.5 text-[#8B6B9A] text-xs font-mono">
                  <span className="flex items-center gap-1">
                    <FiCalendar size={11} /> {intern.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiMapPin size={11} /> {intern.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Expand toggle */}
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="text-[#9C6BA8] mt-1 flex-shrink-0"
            >
              <FiChevronDown size={20} />
            </motion.div>
          </div>

          {/* Summary */}
          <p className="mt-5 text-sm text-[#6F5179] leading-relaxed border-l-2 border-[#9C6BA8]/30 pl-4">
            {intern.summary}
          </p>

          {/* Skill tags */}
          <div className="flex flex-wrap gap-2 mt-5">
            {intern.skills.map((s) => (
              <span
                key={s}
                className="px-3 py-1 rounded-lg text-[11px] font-semibold text-[#4A2055] bg-[#9C6BA8]/10 border border-[#9C6BA8]/20 hover:bg-[#9C6BA8]/20 transition-colors"
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
              transition={{ duration: 0.32, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="mx-6 mb-6 p-4 rounded-xl bg-[#9C6BA8]/06 border border-[#9C6BA8]/15">
                <p className="text-[11px] font-mono font-bold text-[#855092] uppercase tracking-widest mb-3">
                  ✦ Key Highlights
                </p>
                <ul className="space-y-2.5">
                  {intern.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#4A2055]">
                      <span
                        className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #9C6BA8, #6E387B)' }}
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom hint */}
        <div className="px-6 pb-3 flex items-center justify-end">
          <span className="text-[10px] font-mono text-[#9C6BA8]/70">
            {open ? 'Click to collapse ↑' : 'Click to expand highlights ↓'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Section ──────────────────────────────────────────────────────────────── */

const Internships: React.FC = () => (
  <section
    id="internships"
    className="py-24 relative overflow-hidden"
    style={{ background: 'rgba(234, 242, 215, 0.5)' }}
  >
    {/* Background decorations */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(156,107,168,0.10)_0%,transparent_60%)] pointer-events-none" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(123,152,73,0.08)_0%,transparent_55%)] pointer-events-none" />

    <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="mb-14 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#9C6BA8]/12 border border-[#9C6BA8]/25 mb-5">
          <FiBriefcase size={13} className="text-[#855092]" />
          <span className="text-xs font-mono font-bold text-[#855092] uppercase tracking-widest">
            Industry Experience
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#3D1A47] mb-4">
          My{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6E387B] via-[#855092] to-[#9C6BA8]">
            Internships
          </span>
        </h2>
        <p className="text-[#6F5179] text-sm md:text-base max-w-lg mx-auto font-mono mt-2">
          Hands-on industry exposure in Generative AI &amp; Machine Learning.
        </p>
        <div className="h-1 w-20 bg-gradient-to-r from-[#855092] to-[#9C6BA8] rounded-full mx-auto mt-5" />
      </motion.div>

      {/* Cards */}
      <div className="space-y-6 max-w-3xl mx-auto">
        {INTERNSHIPS.map((intern, i) => (
          <InternshipCard key={intern.id} intern={intern} index={i} />
        ))}
      </div>

      {/* Footer summary */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white/70 border border-[#9C6BA8]/20"
      >
        <div className="flex items-center gap-3">
          <FiClock className="text-[#855092] flex-shrink-0" size={16} />
          <p className="text-xs text-[#6F5179] font-mono">
            <span className="font-bold text-[#3D1A47]">2 internships · 30+ days</span> of
            industry exposure across Generative AI &amp; ML domains.
          </p>
        </div>
        <span className="text-[11px] font-mono text-[#855092] font-semibold whitespace-nowrap">
          Open to new opportunities ✦
        </span>
      </motion.div>
    </div>
  </section>
);

export default Internships;
