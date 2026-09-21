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
    accent: 'from-white/95 to-[#F4F8EC]/90',
    border: 'border-[#9C6BA8]/25',
    glow: 'rgba(156,107,168,0.12)',
  },
  {
    title: 'UI/UX Designing Value-Added Course',
    organization: 'Inzovate Technologies & KSR College of Engineering',
    date: 'August 1, 2025',
    image: cert4,
    url: '/inzovate_uiux_certificate.jpg',
    accent: 'from-white/95 to-[#F4F8EC]/90',
    border: 'border-[#9C6BA8]/25',
    glow: 'rgba(156,107,168,0.12)',
  },
  {
    title: 'TCS iON Career Edge – Young Professional',
    organization: 'Tata Consultancy Services (TCS)',
    date: 'June 1, 2025',
    image: cert2,
    url: '/tcs_ion_certificate.jpg',
    accent: 'from-white/95 to-[#F4F8EC]/90',
    border: 'border-[#9C6BA8]/25',
    glow: 'rgba(156,107,168,0.12)',
  },
  {
    title: 'Silver Certificate – Ignite Bootcamp Full',
    organization: 'Wadhwani Foundation',
    date: 'August 11, 2026',
    image: cert3,
    url: '/wadhwani_certificate.pdf',
    accent: 'from-white/95 to-[#F4F8EC]/90',
    border: 'border-[#9C6BA8]/25',
    glow: 'rgba(156,107,168,0.12)',
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
    <section id="certifications" className="py-24 relative overflow-hidden" style={{ background: 'rgba(234, 242, 215, 0.5)' }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(156,107,168,0.06)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#3D1A47] mb-4">
            Licenses &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3D1A47] via-[#6E387B] to-[#9C6BA8]">
              Certifications
            </span>
          </h2>
          <div className="h-1 w-20 bg-[#855092] rounded-full mx-auto" />
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
                    opacity: isCenter ? 1 : isVisible ? 0.85 : 0,
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
                    ${!isCenter ? 'cursor-pointer hover:opacity-95 hover:brightness-105 transition-all' : ''}
                  `}
                  style={{
                    boxShadow: isCenter
                      ? `0 0 35px ${cert.glow}, 0 20px 40px -12px rgba(61,26,71,0.12)`
                      : '0 12px 28px -5px rgba(61,26,71,0.08)',
                    transformStyle: 'preserve-3d',
                    left: '50%',
                  }}
                >
                  {/* Certificate image */}
                  <div className="relative h-48 sm:h-52 overflow-hidden shrink-0 bg-[#EAF2D7]/50">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6 flex flex-col flex-grow bg-white/40">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2.5 bg-[#9C6BA8]/10 rounded-xl border border-[#9C6BA8]/20 text-[#855092] shrink-0">
                        <FiAward size={20} />
                      </div>
                      <div>
                        <h3 className="text-base font-heading font-bold text-[#3D1A47] leading-snug mb-0.5">
                          {cert.title}
                        </h3>
                        <p className="text-[#6F5179] text-xs font-medium">{cert.organization}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-[#6F5179] text-xs mb-4">
                      <FiCalendar size={12} />
                      <span>Issued {cert.date}</span>
                    </div>

                    <div className="mt-auto">
                      {isCenter ? (
                        <a
                          href={cert.url !== '#' ? cert.url : cert.image}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full py-2.5 px-4 bg-[#855092] hover:bg-[#6E387B] text-white rounded-lg text-sm transition-all flex items-center justify-center gap-2 font-medium shadow-[0_4px_16px_rgba(133,80,146,0.25)] cursor-pointer"
                        >
                          <span>View Certificate</span>
                          <FiExternalLink size={14} />
                        </a>
                      ) : (
                        <div className="w-full py-2 px-3 bg-white/60 border border-[#9C6BA8]/20 rounded-lg text-[#6E387B] text-xs text-center font-medium">
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
            className="w-11 h-11 flex items-center justify-center rounded-full bg-white/80 border border-[#9C6BA8]/30 text-[#6E387B] hover:border-[#855092] hover:bg-white hover:shadow-[0_0_16px_rgba(156,107,168,0.2)] transition-all cursor-pointer"
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
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === current
                    ? 'w-7 bg-[#855092] shadow-[0_0_8px_rgba(133,80,146,0.4)]'
                    : 'w-2 bg-[#9C6BA8]/30 hover:bg-[#9C6BA8]/50'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => paginate(1)}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-white/80 border border-[#9C6BA8]/30 text-[#6E387B] hover:border-[#855092] hover:bg-white hover:shadow-[0_0_16px_rgba(156,107,168,0.2)] transition-all cursor-pointer"
            aria-label="Next"
          >
            <FiChevronRight size={20} />
          </button>
        </div>

        <p className="text-center text-xs font-mono text-[#6F5179] mt-3">
          {current + 1} / {n}
        </p>
      </div>
    </section>
  );
};

export default Certifications;
