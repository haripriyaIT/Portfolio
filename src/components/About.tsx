import React from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiTarget, FiBriefcase, FiBookOpen } from 'react-icons/fi';

const aboutCards = [
  {
    title: 'Who I Am',
    icon: <FiUser className="text-emerald-400" size={24} />,
    description: 'Enthusiastic Information Technology student (B.Tech IT, 8.38 CGPA) with expertise in Python, Java, SQL, and Machine Learning. Experienced in developing real-world software and ML systems.',
  },
  {
    title: 'Current Focus',
    icon: <FiTarget className="text-cyan-400" size={24} />,
    description: 'Developing Deep Learning & CNN models, exploring Agentic AI & LLMs, and engineering full-stack web platforms.',
  },
  {
    title: 'Career Goal',
    icon: <FiBriefcase className="text-teal-300" size={24} />,
    description: 'Seeking opportunities as an AI & ML Engineer or Software Developer to build transformative intelligent applications and solve complex challenges.',
  },
  {
    title: 'Education & Qualifications',
    icon: <FiBookOpen className="text-emerald-300" size={24} />,
    description: 'B.Tech IT at K.S.R. College of Engineering (Autonomous, Current, 8.38 CGPA). HSC +2 (84.67%) & SSLC (91.2%) from Reliance Matric Higher Secondary School.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
} as const;

const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden" style={{ background: 'rgba(3,7,18,0.78)' }}>
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,200,150,0.08)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute top-40 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            About{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Me
            </span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full" />
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-2 gap-6 mb-20"
        >
          {aboutCards.map((card, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass neon-border-violet rounded-2xl p-6 hover:border-emerald-400/50 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
                {card.icon}
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
                  {card.icon}
                </div>
                <h3 className="text-xl font-semibold text-text">{card.title}</h3>
              </div>
              <p className="text-muted leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default About;
