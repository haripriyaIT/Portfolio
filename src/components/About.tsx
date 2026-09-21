import React from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiTarget, FiBriefcase, FiBookOpen } from 'react-icons/fi';

const aboutCards = [
  {
    title: 'Who I Am',
    icon: <FiUser className="text-[#855092]" size={24} />,
    description: 'Enthusiastic Information Technology student (B.Tech IT, 8.38 CGPA) with expertise in Python, Java, SQL, and Machine Learning. Experienced in developing real-world software and ML systems.',
  },
  {
    title: 'Current Focus',
    icon: <FiTarget className="text-[#6E387B]" size={24} />,
    description: 'Developing Deep Learning & CNN models, exploring Agentic AI & LLMs, and engineering full-stack web platforms.',
  },
  {
    title: 'Career Goal',
    icon: <FiBriefcase className="text-[#9C6BA8]" size={24} />,
    description: 'Seeking opportunities as an AI & ML Engineer or Software Developer to build transformative intelligent applications and solve complex challenges.',
  },
  {
    title: 'Education & Qualifications',
    icon: <FiBookOpen className="text-[#855092]" size={24} />,
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
    <section id="about" className="py-24 relative overflow-hidden" style={{ background: 'rgba(234,242,215,0.70)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-[#3D1A47]">
            About{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6E387B] via-[#855092] to-[#9C6BA8]">
              Me
            </span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#855092] to-[#9C6BA8] rounded-full" />
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
              className="glass rounded-2xl p-6 hover:border-[#855092]/50 hover:shadow-lg transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500 text-[#855092]">
                {card.icon}
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-[#9C6BA8]/12 rounded-lg border border-[#9C6BA8]/25">
                  {card.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#3D1A47]">{card.title}</h3>
              </div>
              <p className="text-[#6F5179] leading-relaxed font-normal">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default About;
