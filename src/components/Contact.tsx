import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLinkedin, FiGithub, FiMapPin, FiDownload, FiArrowRight, FiPhone } from 'react-icons/fi';

const contactMethods = [
  {
    title: 'Email',
    value: 'haripriya030609@gmail.com',
    icon: <FiMail size={24} />,
    url: 'mailto:haripriya030609@gmail.com',
  },
  {
    title: 'Phone',
    value: '+91 8072402147',
    icon: <FiPhone size={24} />,
    url: 'tel:+918072402147',
  },
  {
    title: 'LinkedIn',
    value: 'in/haripriya2703',
    icon: <FiLinkedin size={24} />,
    url: 'https://linkedin.com/in/haripriya2703',
  },
  {
    title: 'GitHub',
    value: 'github.com/haripriyaIT',
    icon: <FiGithub size={24} />,
    url: 'https://github.com/haripriyaIT',
  },
  {
    title: 'Location',
    value: 'Namakkal, Tamil Nadu, India',
    icon: <FiMapPin size={24} />,
    url: 'https://maps.google.com/?q=Komarapalayam,Namakkal,Tamil+Nadu',
  },
  {
    title: 'Resume',
    value: 'Download Haripriya_Resume.pdf',
    icon: <FiDownload size={24} />,
    url: '/Haripriya_Resume.pdf',
    download: 'Haripriya_Resume.pdf',
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
    <section id="contact" className="py-24 relative overflow-hidden" style={{ background: 'rgba(234, 242, 215, 0.4)' }}>
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#9C6BA8]/[0.08] rounded-[100%] blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 tracking-tight text-[#3D1A47]">
            Let&rsquo;s Build Something{' '}
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3D1A47] via-[#6E387B] to-[#9C6BA8]">
              Meaningful Together.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-[#6F5179] max-w-2xl mx-auto font-normal">
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
              className="group flex flex-col items-center justify-center p-8 bg-white/80 border border-[#9C6BA8]/20 rounded-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-[#855092]/40 hover:shadow-[0_8px_30px_rgba(156,107,168,0.15)] cursor-pointer"
            >
              <div className="p-4 rounded-full bg-[#9C6BA8]/10 border border-[#9C6BA8]/20 text-[#855092] mb-4 transition-all duration-300 group-hover:bg-[#855092] group-hover:text-white">
                {method.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#3D1A47] mb-2 group-hover:text-[#6E387B] transition-all duration-300">
                {method.title}
              </h3>
              <p className="text-[#6F5179] text-sm font-medium flex items-center gap-2 group-hover:text-[#3D1A47] transition-colors">
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
