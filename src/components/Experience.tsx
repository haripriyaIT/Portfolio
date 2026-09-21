import React from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiTerminal, FiBriefcase, FiActivity, FiLayers, FiTarget } from 'react-icons/fi';

const timeline = [
  {
    title: 'HSC (+2) & SSLC | Reliance Matric Higher Secondary School',
    date: '2022 & 2024',
    description: 'Completed HSC (+2) with 84.67% (2024) and SSLC with 91.2% (2022) under the Tamil Nadu State Board.',
    icon: <FiCode size={18} />,
  },
  {
    title: 'Started Learning Python',
    date: 'Self-Learning',
    description: 'Began self-learning Python programming — exploring fundamentals, data structures, and scripting. This sparked a deep interest in software development and AI, laying the foundation for future projects.',
    icon: <FiTerminal size={18} />,
  },
  {
    title: 'B.Tech Information Technology | K.S.R. College of Engineering',
    date: 'Current • 8.38 CGPA',
    description: 'Pursuing undergraduate degree in IT (Autonomous) with 8.38 CGPA.',
    icon: <FiLayers size={18} />,
  },
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
    icon: <FiTarget size={18} />,
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden" style={{ background: 'rgba(234, 242, 215, 0.4)' }}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(156,107,168,0.06)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#3D1A47] mb-4">
            My{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3D1A47] via-[#6E387B] to-[#9C6BA8]">
              Journey
            </span>
          </h2>
          <div className="h-1 w-20 bg-[#855092] rounded-full mx-auto" />
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Connecting Line */}
          <div className="absolute left-[20px] md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-[#855092]/60 via-[#9C6BA8]/30 to-transparent md:-translate-x-1/2 z-0" />

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
                <div className="absolute left-[20px] md:left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-white border-2 border-[#855092] flex items-center justify-center text-[#855092] z-10 shadow-[0_0_15px_rgba(156,107,168,0.25)]">
                  {item.icon}
                </div>

                {/* Content Card */}
                <div className="w-full pl-16 md:pl-0 md:w-5/12">
                  <div
                    className={`p-6 bg-white/80 border border-[#9C6BA8]/20 rounded-2xl hover:border-[#855092]/40 hover:shadow-[0_4px_20px_rgba(156,107,168,0.12)] backdrop-blur-md transition-all group relative ${
                      isEven ? 'md:text-right' : 'md:text-left'
                    }`}
                  >
                    <div className="relative z-10">
                      <span className="inline-block py-1 px-3 rounded-full bg-[#9C6BA8]/15 border border-[#9C6BA8]/25 text-[#6E387B] text-xs font-mono font-bold mb-4 tracking-wider uppercase">
                        {item.date}
                      </span>
                      <h3 className="text-xl font-heading font-bold text-[#3D1A47] mb-3">
                        {item.title}
                      </h3>
                      <p className="text-[#6F5179] leading-relaxed text-sm md:text-base">
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
