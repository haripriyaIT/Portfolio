import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-scroll';
import { FiArrowRight, FiDownload, FiMail } from 'react-icons/fi';
import profilePhoto from '../assets/haripriya-profile.jpg';
import Magnetic from './ui/Magnetic';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Subtle 3D depth scroll — content moves up more slowly than scroll
  const contentY   = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const illustY    = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const panelScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.97]);
  const panelBlur  = useTransform(scrollYProgress, [0, 0.8], [0, 4]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      style={{ background: 'transparent' }} // QuantumCanvas is the background
    >
      {/* Extra neon orbs layered on top of the canvas for depth */}
      <div className="absolute top-[-15%] left-[-8%] w-[420px] h-[420px] rounded-full bg-violet-600/8 blur-[140px] pointer-events-none z-[2]" />
      <div className="absolute bottom-[-10%] left-[25%] w-[300px] h-[300px] rounded-full bg-purple-600/6 blur-[120px] pointer-events-none z-[2]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative" style={{ zIndex: 10 }}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Left Content — glass panel ── */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            style={{ y: contentY, scale: panelScale }}
          >
            <div className="glass-strong rounded-3xl p-8 md:p-10 space-y-6 relative overflow-hidden">
              {/* Subtle inner reflection */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />

              {/* Title badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <span className="inline-flex items-center gap-2 font-mono text-xs px-4 py-1.5 rounded-full border border-violet-500/40 bg-violet-500/10 text-violet-300 tracking-widest uppercase glow-text-violet">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  AI &amp; Machine Learning Portfolio
                </span>
              </motion.div>

              <div className="space-y-2">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
                  className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight"
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-200 to-cyan-300">
                    Building Intelligent Software with
                  </span>{' '}
                  <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 glow-text-violet">
                    AI &amp; Machine Learning.
                  </span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.45 }}
                  className="pt-4 pb-2"
                >
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-400">
                    ML Engineer &amp; Full-Stack AI Developer
                  </h2>
                  <h3 className="text-base text-violet-300/90 font-mono font-medium mt-1 tracking-wide">
                    B.Tech IT &bull; K.S.R. College of Engineering (8.38 CGPA)
                  </h3>
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-base md:text-lg text-muted max-w-xl leading-relaxed"
              >
                Enthusiastic Information Technology student with skills in Python, Java, SQL, and Machine Learning. Experienced in building software and ML projects, with hands-on exposure through a Generative AI internship.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <Magnetic>
                  <Link
                    to="projects"
                    smooth={true}
                    duration={500}
                    className="group px-6 py-3 rounded-lg bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-500 hover:to-purple-600 text-white font-medium cursor-pointer flex items-center space-x-2 shadow-[0_0_25px_rgba(139,92,246,0.4)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] transition-all duration-300"
                  >
                    <span>View Projects</span>
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Magnetic>
                <Magnetic>
                  <a
                    href="/Haripriya_Resume.pdf"
                    download="Haripriya_Resume.pdf"
                    className="px-6 py-3 rounded-lg glass border border-violet-500/40 text-text font-medium hover:border-violet-400/70 hover:bg-violet-500/10 transition-all flex items-center space-x-2"
                  >
                    <FiDownload />
                    <span>Download Resume</span>
                  </a>
                </Magnetic>
                <Magnetic>
                  <Link
                    to="contact"
                    smooth={true}
                    duration={500}
                    className="px-6 py-3 rounded-lg bg-transparent border border-transparent text-muted font-medium hover:text-text transition-colors cursor-pointer flex items-center space-x-2 hover:bg-violet-500/5"
                  >
                    <FiMail />
                    <span>Contact Me</span>
                  </Link>
                </Magnetic>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Right Content — Profile Photo with 3D glass card & parallax ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.35, ease: 'easeOut' }}
            style={{ y: illustY }}
            className="relative flex flex-col items-center justify-center"
          >
            {/* Ambient neon aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/30 via-cyan-500/20 to-purple-600/25 rounded-3xl blur-[80px] -z-10" />
            <div className="absolute -inset-4 bg-gradient-to-bl from-magenta/15 to-transparent rounded-3xl blur-[50px] -z-10" />

            {/* Name label above picture */}
            <div className="w-full max-w-sm md:max-w-md px-2 mb-3 flex flex-col items-center text-center">
              <div className="relative flex items-center justify-center space-x-3 mb-2 py-2">
                {/* Sparkle particles */}
                <span className="sparkle-dot bg-cyan-300"    style={{ top: '-4px',  left: '8%',  animationDelay: '0s',    animationDuration: '1.8s' }} />
                <span className="sparkle-dot bg-violet-300"  style={{ top: '-6px',  left: '30%', animationDelay: '0.3s',  animationDuration: '2.1s' }} />
                <span className="sparkle-dot bg-white"       style={{ top: '-2px',  left: '55%', animationDelay: '0.7s',  animationDuration: '1.6s' }} />
                <span className="sparkle-dot bg-pink-300"    style={{ top: '-5px',  left: '78%', animationDelay: '1.1s',  animationDuration: '2.3s' }} />
                <span className="sparkle-dot bg-cyan-200"    style={{ bottom: '-4px', left: '18%', animationDelay: '0.5s', animationDuration: '1.9s' }} />
                <span className="sparkle-dot bg-fuchsia-300" style={{ bottom: '-3px', left: '45%', animationDelay: '0.9s', animationDuration: '2.0s' }} />
                <span className="sparkle-dot bg-sky-300"     style={{ bottom: '-5px', left: '70%', animationDelay: '1.4s', animationDuration: '1.7s' }} />
                <span className="sparkle-dot bg-purple-200"  style={{ bottom: '-2px', left: '90%', animationDelay: '0.2s', animationDuration: '2.2s' }} />

                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#06b6d4] flex-shrink-0" />
                <h3 className="glitter-text font-heading font-black text-4xl md:text-6xl uppercase tracking-widest leading-tight select-none">
                  Haripriya
                </h3>
                <span className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-pulse shadow-[0_0_10px_#a78bfa] flex-shrink-0" />
              </div>
            </div>

            {/* Futuristic Glass Portrait Frame */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full max-w-sm md:max-w-md rounded-3xl p-3 glass-strong border border-violet-500/40 shadow-[0_0_50px_rgba(139,92,246,0.3)] glass-panel-3d group"
            >
              {/* Corner HUD accents */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg pointer-events-none" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-violet-400 rounded-tr-lg pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-violet-400 rounded-bl-lg pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400 rounded-br-lg pointer-events-none" />

              <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-surface/50">
                <img
                  src={profilePhoto}
                  alt="Haripriya Manickam - AI & Machine Learning Software Engineer"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: 'brightness(1.02) contrast(1.03)' }}
                />

                {/* Subtle gradient vignette for seamless integration */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />

                {/* Status chip */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl glass-strong border border-violet-400/30 flex items-center justify-between backdrop-blur-md">
                  <div className="flex items-center space-x-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="font-mono text-xs text-text font-semibold tracking-wider">Available for Roles</span>
                  </div>
                  <span className="text-[11px] font-mono font-medium text-cyan-300 border border-cyan-500/40 px-2.5 py-0.5 rounded-full bg-cyan-500/10 glow-text-cyan">
                    AI &amp; ML
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
        style={{ zIndex: 10 }}
      >
        <span className="text-xs font-mono tracking-widest uppercase text-violet-400/60">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-violet-500/30 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-violet-400/60" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
