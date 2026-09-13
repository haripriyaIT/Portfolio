import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiExternalLink, FiGithub, FiChevronLeft, FiChevronRight, FiFolder, FiArrowRight } from 'react-icons/fi';
import { projects } from '../data/projects';

const n = projects.length;

const Projects = () => {
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
    <section id="projects" className="py-24 relative overflow-hidden" style={{ background: 'rgba(5,11,24,0.75)' }}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,200,150,0.06)_0%,transparent_70%)] pointer-events-none" />

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
            Featured{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Projects
            </span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full mx-auto" />
        </motion.div>

        {/* 3-card coverflow stage */}
        <div className="relative flex items-center justify-center" style={{ perspective: '1200px' }}>
          <div className="relative w-full" style={{ height: '510px' }}>
            {projects.map((project, index) => {
              const offset = getOffset(index);
              const isCenter = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;
              const isVisible = isCenter || isLeft || isRight;

              return (
                <motion.div
                  key={project.id}
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
                    absolute top-0 w-[290px] sm:w-[350px] md:w-[420px] h-[490px] rounded-2xl overflow-hidden flex flex-col
                    bg-gradient-to-b ${project.accent} border ${project.border} backdrop-blur-md select-none
                    ${!isCenter ? 'cursor-pointer hover:opacity-90 hover:brightness-110 transition-all' : ''}
                  `}
                  style={{
                    boxShadow: isCenter
                      ? `0 0 50px ${project.glow}, 0 25px 50px -12px rgba(0,0,0,0.7)`
                      : '0 15px 35px -5px rgba(0,0,0,0.5)',
                    transformStyle: 'preserve-3d',
                    left: '50%',
                  }}
                >
                  {/* Project Image Banner */}
                  <div className="relative h-44 sm:h-48 overflow-hidden shrink-0 bg-black/40">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6 flex flex-col flex-grow">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="p-2.5 bg-white/10 rounded-xl border border-white/20 text-white/80 shrink-0">
                        <FiFolder size={18} />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-heading font-bold text-white leading-snug mb-1">
                          {project.title}
                        </h3>
                        <p className="text-emerald-400 text-xs font-medium leading-relaxed">
                          {project.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 my-3">
                      {project.techStack.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 bg-white/10 border border-white/15 rounded-md text-[11px] font-mono text-white/80"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-[11px] font-mono text-white/50">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-auto pt-2">
                      {isCenter ? (
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/project/${project.id}`}
                            className="flex-1 py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-lg text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(0,200,150,0.3)]"
                          >
                            <span>Case Study</span>
                            <FiArrowRight size={14} />
                          </Link>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub Repository"
                            className="p-2.5 bg-white/10 border border-white/20 hover:bg-white/20 rounded-lg text-white transition-all flex items-center justify-center"
                          >
                            <FiGithub size={16} />
                          </a>
                          {project.live && (
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noreferrer"
                              aria-label="Live Demo"
                              className="p-2.5 bg-white/10 border border-white/20 hover:bg-white/20 rounded-lg text-white transition-all flex items-center justify-center"
                            >
                              <FiExternalLink size={16} />
                            </a>
                          )}
                        </div>
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
            aria-label="Previous project"
          >
            <FiChevronLeft size={20} />
          </button>

          {/* Dots */}
          <div className="flex gap-2.5">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to project ${i + 1}`}
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
            aria-label="Next project"
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

export default Projects;

