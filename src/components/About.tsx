import React from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiTarget, FiBriefcase, FiBookOpen, FiCpu, FiLayers, FiEye, FiDatabase } from 'react-icons/fi';
import { SiTensorflow } from 'react-icons/si';

const aboutCards = [
  {
    title: 'Who I Am',
    icon: <FiUser className="text-violet-400" size={24} />,
    description: 'A passionate Information Technology student specializing in AI & Machine Learning, dedicated to building intelligent, data-driven solutions.',
  },
  {
    title: 'Current Focus',
    icon: <FiTarget className="text-cyan-400" size={24} />,
    description: 'Developing robust machine learning models, exploring neural architectures, and creating scalable software applications.',
  },
  {
    title: 'Career Goal',
    icon: <FiBriefcase className="text-purple-400" size={24} />,
    description: 'To work as an AI/ML Engineer at a top-tier tech company, solving complex real-world challenges through intelligent software.',
  },
  {
    title: 'Education',
    icon: <FiBookOpen className="text-cyan-300" size={24} />,
    description: 'Currently pursuing my B.Tech in Information Technology (Third Year). Building a strong foundation in computer science and mathematics.',
  },
];

const learningItems = [
  { name: 'Machine Learning', icon: <FiCpu size={20} /> },
  { name: 'Deep Learning', icon: <FiLayers size={20} /> },
  { name: 'Computer Vision', icon: <FiEye size={20} /> },
  { name: 'TensorFlow', icon: <SiTensorflow size={20} /> },
  { name: 'Data Structures', icon: <FiDatabase size={20} /> },
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
    <section id="about" className="py-24 relative overflow-hidden" style={{ background: 'rgba(5,11,24,0.75)' }}>
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.08)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute top-40 right-0 w-96 h-96 bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              Me
            </span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full" />
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
              className="glass neon-border-violet rounded-2xl p-6 hover:border-violet-400/50 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
                {card.icon}
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-violet-500/10 rounded-lg border border-violet-500/30">
                  {card.icon}
                </div>
                <h3 className="text-xl font-semibold text-text">{card.title}</h3>
              </div>
              <p className="text-muted leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Current Learning Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-heading font-semibold text-text mb-8 text-center md:text-left">
            Current Learning Focus
          </h3>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {learningItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="flex items-center space-x-2 bg-violet-500/10 border border-violet-500/30 px-5 py-3 rounded-full text-violet-300 hover:text-violet-200 hover:border-violet-400/60 hover:bg-violet-500/20 transition-all cursor-default shadow-sm"
              >
                <span className="text-current">{item.icon}</span>
                <span className="font-medium text-sm">{item.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
