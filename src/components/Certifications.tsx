import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiExternalLink, FiCalendar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import cert1 from '../assets/cert1.png';
import cert2 from '../assets/cert2.png';
import cert3 from '../assets/cert3.jpg';
import cert4 from '../assets/cert4.jpg';

const certifications = [
  {
    title: 'Paper Presentation – SUSTAINBiZ 2025',
    organization: 'INTI International University & University of Hyderabad',
    date: 'November 17, 2025',
    image: cert1,
    url: '/sustainbiz_2025_certificate.jpg',
    accent: 'from-emerald-900/80 to-emerald-950/90',
    border: 'border-emerald-500/40',
    glow: 'rgba(0,200,150,0.25)',
  },
  {
    title: 'UI/UX Designing Value-Added Course',
    organization: 'Inzovate Technologies & KSR College of Engineering',
    date: 'August 1, 2025',
    image: cert4,
    url: '/inzovate_uiux_certificate.jpg',
    accent: 'from-sky-900/80 to-indigo-950/90',
    border: 'border-sky-500/40',
    glow: 'rgba(56,189,248,0.25)',
  },
  {
    title: 'TCS iON Career Edge – Young Professional',
    organization: 'Tata Consultancy Services (TCS)',
    date: 'June 1, 2025',
    image: cert2,
    url: '/tcs_ion_certificate.jpg',
    accent: 'from-cyan-900/80 to-cyan-950/90',
    border: 'border-cyan-500/40',
    glow: 'rgba(0,229,255,0.25)',
  },
  {
    title: 'Silver Certificate – Ignite Bootcamp Full',
    organization: 'Wadhwani Foundation',
    date: 'August 11, 2026',
    image: cert3,
    url: '/wadhwani_certificate.pdf',
    accent: 'from-violet-900/80 to-violet-950/90',
    border: 'border-violet-500/40',
    glow: 'rgba(139,92,246,0.25)',
  },
];

const n = certifications.length;

const Certifications = () => {
  const [current, setCurrent] = useState(0);

  const paginate = (dir: number) => {
    setCurrent((c) => (c + dir + n) % n);
  };

  const getOffset = (index: number) => {
    let diff = (index - current) % n;
    if (diff > n / 2) diff -= n;
    if (diff < -n / 2) diff += n;
    return diff;
  };

  return (
    <section id="certifications" className="py-24 relative overflow-hidden" style={{ background: 'rgba(3,7,18,0.82)' }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,229,255,0.07)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-4">
            Licenses &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Certifications
            </span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full mx-auto" />
        </motion.div>

        {/* 3-card coverflow */}
        <div className="relative flex items-center justify-center" style={{ perspective: '1200px' }}>
          {/* Card stage */}
          <div className="relative w-full" style={{ height: '480px' }}>
            {certifications.map((cert, index) => {
              const offset = getOffset(index);
              const isCenter = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;
              const isVisible = isCenter || isLeft || isRight;

              return (
                <motion.div
                  key={cert.title}
                  initial={false}
                  animate={{
                    scale: isCenter ? 1 : isVisible ? 0.82 : 0.6,
                    opacity: isCenter ? 1 : isVisible ? 0.7 : 0,
                    x: isLeft ? '-118%' : isRight ? '18%' : '-50%',
                    rotateY: isLeft ? 26 : isRight ? -26 : 0,
                    zIndex: isCenter ? 30 : isVisible ? 10 : 0,
                    pointerEvents: isVisible ? 'auto' : 'none',
                  }}
                  transition={{ type: 'spring', stiffness: 240, damping: 25, mass: 0.8 }}
                  onClick={() => {
                    if (isLeft) paginate(-1);
                    if (isRight) paginate(1);
                  }}
                  className={`
                    absolute top-0 w-[290px] sm:w-[350px] md:w-[410px] h-[460px] rounded-2xl overflow-hidden flex flex-col
                    bg-gradient-to-b ${cert.accent} border ${cert.border} backdrop-blur-md select-none
                    ${!isCenter ? 'cursor-pointer hover:opacity-90 hover:brightness-110 transition-all' : ''}
                  `}
                  style={{
                    boxShadow: isCenter
                      ? `0 0 50px ${cert.glow}, 0 25px 50px -12px rgba(0,0,0,0.7)`
                      : '0 15px 35px -5px rgba(0,0,0,0.5)',
                    transformStyle: 'preserve-3d',
                    left: '50%',
                  }}
                >
                  {/* Certificate image */}
                  <div className="relative h-48 sm:h-52 overflow-hidden shrink-0 bg-black/30">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6 flex flex-col flex-grow">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2.5 bg-white/10 rounded-xl border border-white/20 text-white/80 shrink-0">
                        <FiAward size={20} />
                      </div>
                      <div>
                        <h3 className="text-base font-heading font-bold text-white leading-snug mb-0.5">
                          {cert.title}
                        </h3>
                        <p className="text-white/60 text-xs font-medium">{cert.organization}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-white/50 text-xs mb-4">
                      <FiCalendar size={12} />
                      <span>Issued {cert.date}</span>
                    </div>

                    <div className="mt-auto">
                      {isCenter ? (
                        <a
                          href={cert.url !== '#' ? cert.url : cert.image}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full py-2.5 px-4 bg-white/10 border border-white/20 hover:bg-white/20 rounded-lg text-white text-sm transition-all flex items-center justify-center gap-2 font-medium shadow-sm"
                        >
                          <span>View Certificate</span>
                          <FiExternalLink size={14} />
                        </a>
                      ) : (
                        <div className="w-full py-2 px-3 bg-white/5 border border-white/10 rounded-lg text-white/60 text-xs text-center font-medium">
                          Click to preview
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={() => paginate(-1)}
            className="w-11 h-11 flex items-center justify-center rounded-full glass-strong border border-emerald-500/30 text-emerald-400 hover:border-emerald-400/60 hover:shadow-[0_0_16px_rgba(0,200,150,0.3)] transition-all"
            aria-label="Previous"
          >
            <FiChevronLeft size={20} />
          </button>

          {/* Dots */}
          <div className="flex gap-2.5">
            {certifications.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-7 bg-emerald-400 shadow-[0_0_8px_rgba(0,200,150,0.7)]'
                    : 'w-2 bg-emerald-400/30 hover:bg-emerald-400/55'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => paginate(1)}
            className="w-11 h-11 flex items-center justify-center rounded-full glass-strong border border-emerald-500/30 text-emerald-400 hover:border-emerald-400/60 hover:shadow-[0_0_16px_rgba(0,200,150,0.3)] transition-all"
            aria-label="Next"
          >
            <FiChevronRight size={20} />
          </button>
        </div>

        <p className="text-center text-xs font-mono text-muted mt-3">
          {current + 1} / {n}
        </p>
      </div>
    </section>
  );
};

export default Certifications;

