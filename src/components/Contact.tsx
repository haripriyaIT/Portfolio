import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLinkedin, FiGithub, FiMapPin, FiDownload, FiArrowRight, FiPhone } from 'react-icons/fi';

const contactMethods = [
  {
    title: 'Email',
    value: 'haripriya030609@gmail.com',
    icon: <FiMail size={24} />,
    url: 'mailto:haripriya030609@gmail.com',
    borderHover: 'hover:border-emerald-400/60',
    iconGlow: 'group-hover:text-emerald-400',
    bg: 'group-hover:bg-emerald-500/10',
  },
  {
    title: 'Phone',
    value: '+91 8072402147',
    icon: <FiPhone size={24} />,
    url: 'tel:+918072402147',
    borderHover: 'hover:border-cyan-400/60',
    iconGlow: 'group-hover:text-cyan-400',
    bg: 'group-hover:bg-cyan-500/10',
  },
  {
    title: 'LinkedIn',
    value: 'in/haripriya2703',
    icon: <FiLinkedin size={24} />,
    url: 'https://linkedin.com/in/haripriya2703',
    borderHover: 'hover:border-teal-400/60',
    iconGlow: 'group-hover:text-teal-400',
    bg: 'group-hover:bg-teal-500/10',
  },
  {
    title: 'GitHub',
    value: 'github.com/haripriyaIT',
    icon: <FiGithub size={24} />,
    url: 'https://github.com/haripriyaIT',
    borderHover: 'hover:border-emerald-400/60',
    iconGlow: 'group-hover:text-emerald-400',
    bg: 'group-hover:bg-emerald-500/10',
  },
  {
    title: 'Location',
    value: 'Namakkal, Tamil Nadu, India',
    icon: <FiMapPin size={24} />,
    url: 'https://maps.google.com/?q=Komarapalayam,Namakkal,Tamil+Nadu',
    borderHover: 'hover:border-cyan-300/60',
    iconGlow: 'group-hover:text-cyan-300',
    bg: 'group-hover:bg-cyan-300/10',
  },
  {
    title: 'Resume',
    value: 'Download Haripriya_Resume.pdf',
    icon: <FiDownload size={24} />,
    url: '/Haripriya_Resume.pdf',
    download: 'Haripriya_Resume.pdf',
    borderHover: 'hover:border-emerald-300/60',
    iconGlow: 'group-hover:text-emerald-300',
    bg: 'group-hover:bg-emerald-300/10',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
} as const;

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden" style={{ background: 'rgba(5,11,24,0.75)' }}>
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/5 rounded-[100%] blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 tracking-tight">
            Let&rsquo;s Build Something{' '}
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-teal-400">
              Meaningful Together.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto font-light">
            I&rsquo;m currently seeking AI &amp; ML or Software Developer internship opportunities.
            Whether you have a question, a project idea, or just want to connect, my inbox is always open!
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center"
        >
          {contactMethods.map((method, index) => (
            <motion.a
              key={index}
              variants={itemVariants}
              href={method.url}
              download={method.download ? method.download : undefined}
              target={method.download ? undefined : "_blank"}
              rel="noreferrer"
              className={`group flex flex-col items-center justify-center p-8 glass neon-border-violet rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(0,200,150,0.15)] ${method.borderHover}`}
            >
              <div className={`p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-muted mb-4 transition-all duration-300 ${method.bg} ${method.iconGlow}`}>
                {method.icon}
              </div>
              <h3 className="text-xl font-semibold text-text mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-cyan-400 transition-all duration-300">
                {method.title}
              </h3>
              <p className="text-muted text-sm font-medium flex items-center gap-2 group-hover:text-text transition-colors">
                {method.value}{' '}
                <FiArrowRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
