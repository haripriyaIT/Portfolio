import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiExternalLink, FiCalendar } from 'react-icons/fi';
import cert1 from '../assets/cert1.png';
import cert2 from '../assets/cert2.png';

const certifications = [
  {
    title: 'Paper Presentation at IEEE Conference',
    organization: 'University of Hyderabad',
    date: 'IEEE Conference',
    image: cert1,
    url: '#',
  },
  {
    title: 'TCS iON Career Edge – Young Professional',
    organization: 'Tata Consultancy Services (TCS)',
    date: 'Professional Program',
    image: cert2,
    url: '#',
  },
  {
    title: 'Silver Certificate – Ignite Bootcamp Full',
    organization: 'Wadhwani Foundation',
    date: 'Bootcamp Certification',
    image: cert1,
    url: '#',
  },
];

const Certifications = () => {
  return (
    <section id="certifications" className="py-24 relative overflow-hidden" style={{ background: 'rgba(5,11,24,0.8)' }}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.08)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-4">
            Licenses &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              Certifications
            </span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-strong neon-border-violet rounded-2xl overflow-hidden group hover:border-violet-400/60 hover:shadow-[0_0_40px_rgba(139,92,246,0.2)] transition-all flex flex-col h-full"
            >
              {/* Image Section */}
              <div className="relative h-56 overflow-hidden bg-[#050B18]">
                <div className="absolute inset-0 bg-violet-500/10 group-hover:bg-transparent transition-colors z-10" />
                <img
                  src={cert.image}
                  alt={cert.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
              </div>

              {/* Content Section */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-violet-500/10 rounded-xl border border-violet-500/30 text-violet-400 shrink-0">
                    <FiAward size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-text mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-cyan-400 transition-all">
                      {cert.title}
                    </h3>
                    <p className="text-muted font-medium text-sm">
                      {cert.organization}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-muted text-sm mb-8">
                  <FiCalendar className="text-violet-400" />
                  <span>Issued {cert.date}</span>
                </div>

                {/* Button pushed to the bottom */}
                <div className="mt-auto">
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 px-4 bg-violet-500/10 border border-violet-500/30 hover:bg-violet-500/20 hover:border-violet-400/60 hover:text-violet-300 rounded-lg text-text transition-all flex items-center justify-center gap-2 font-medium"
                  >
                    <span>View Certificate</span>
                    <FiExternalLink />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
