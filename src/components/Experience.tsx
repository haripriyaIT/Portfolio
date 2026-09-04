import React from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiTerminal, FiBriefcase, FiActivity, FiLayers, FiTarget } from 'react-icons/fi';

const timeline = [
  {
    title: 'Generative AI Intern | Gateway Software Solutions',
    date: '15-Day Internship',
    description: 'Covered fundamentals of Generative AI, Large Language Models (LLMs), and prompt engineering. Gained hands-on exposure to Python-based AI workflows and practical applications of Generative AI in solving real-world problems.',
    icon: <FiBriefcase size={18} />,
  },
  {
    title: 'AI & Machine Learning Intern | Litz Tech',
    date: '15-Day Internship',
    description: 'Gained practical knowledge of AI and ML algorithms and Deep Learning concepts. Worked on a deep learning project applying data preprocessing, model development, training, and evaluation using Python.',
    icon: <FiActivity size={18} />,
  },
  {
    title: 'Java Teaching Bootcamp | KSR Polytechnic College',
    date: 'Achievement & Leadership',
    description: 'Conducted a hands-on Java programming bootcamp for polytechnic students, covering core Java concepts and practical coding sessions to strengthen their programming fundamentals.',
    icon: <FiTerminal size={18} />,
  },
  {
    title: 'B.Tech Information Technology | K.S.R. College of Engineering',
    date: 'Current • 8.38 CGPA',
    description: 'Pursuing undergraduate degree in IT (Autonomous). Mastering Data Structures & Algorithms, OOPs, DBMS, Operating Systems, Computer Networks, and JDBC with hands-on development.',
    icon: <FiLayers size={18} />,
  },
  {
    title: 'HSC (+2) & SSLC | Reliance Matric Higher Secondary School',
    date: '2022 & 2024',
    description: 'Completed HSC (+2) with 84.67% (2024) and SSLC with 91.2% (2022) under the Tamil Nadu State Board.',
    icon: <FiCode size={18} />,
  },
];


const Experience = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden" style={{ background: 'rgba(5,11,24,0.78)' }}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(168,85,247,0.07)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-4">
            My{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              Journey
            </span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full mx-auto" />
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Connecting Line */}
          <div className="absolute left-[20px] md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-violet-500/50 via-purple-500/30 to-transparent md:-translate-x-1/2 z-0" />

          {timeline.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`relative flex items-center justify-between w-full mb-12 last:mb-0 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Empty space for desktop alternating layout */}
                <div className="hidden md:block w-5/12" />

                {/* Timeline Icon */}
                <div className="absolute left-[20px] md:left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-violet-500/10 border-2 border-violet-500 flex items-center justify-center text-violet-400 z-10 shadow-[0_0_15px_rgba(139,92,246,0.4)]">
                  {item.icon}
                </div>

                {/* Content Card */}
                <div className="w-full pl-16 md:pl-0 md:w-5/12">
                  <div
                    className={`p-6 glass neon-border-violet rounded-2xl hover:border-violet-400/60 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all group relative ${
                      isEven ? 'md:text-right' : 'md:text-left'
                    }`}
                  >
                    {/* Hover Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-violet-500/0 to-violet-500/0 group-hover:from-violet-500/5 group-hover:to-cyan-500/5 transition-colors rounded-2xl z-0 ${
                      isEven ? 'md:group-hover:bg-gradient-to-l' : ''
                    }`} />

                    <div className="relative z-10">
                      <span className="inline-block py-1 px-3 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-mono font-bold mb-4 tracking-wider uppercase">
                        {item.date}
                      </span>
                      <h3 className="text-xl font-heading font-bold text-text mb-3">
                        {item.title}
                      </h3>
                      <p className="text-muted leading-relaxed text-sm md:text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
