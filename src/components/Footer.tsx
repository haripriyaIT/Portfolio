import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FiArrowUp, FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: 'Home', to: 'home' },
    { name: 'About', to: 'about' },
    { name: 'Projects', to: 'projects' },
    { name: 'Experience', to: 'experience' },
    { name: 'GitHub', to: 'github' },
  ];

  const socialLinks = [
    { icon: <FiGithub size={20} />, url: 'https://github.com/haripriya', label: 'GitHub' },
    { icon: <FiLinkedin size={20} />, url: 'https://linkedin.com/in/haripriya-manickam', label: 'LinkedIn' },
    { icon: <FiTwitter size={20} />, url: 'https://twitter.com/haripriya', label: 'Twitter' },
    { icon: <FiMail size={20} />, url: 'mailto:haripriya@email.com', label: 'Email' },
  ];

  return (
    <footer className="relative bg-[#050B18]/90 pt-16 pb-8 border-t border-violet-500/20 overflow-hidden">
      {/* Animated Divider */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-violet-500/40 to-transparent"
      />

      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-violet-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-12">

          {/* Brand & Tagline */}
          <div className="md:col-span-5 lg:col-span-4">
            <Link
              to="home"
              smooth={true}
              duration={500}
              className="text-2xl font-heading font-bold cursor-pointer bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent hover:from-violet-300 hover:to-cyan-300 transition-all inline-block mb-4"
            >
              Haripriya Manickam.
            </Link>
            <p className="text-muted leading-relaxed max-w-sm">
              Building intelligent software and solving real-world problems through machine learning, deep learning, and engineering.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-4 lg:col-span-4 flex flex-col md:items-center">
            <div>
              <h4 className="text-text font-semibold mb-4 uppercase tracking-wider text-sm font-mono">Quick Links</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.to}
                      smooth={true}
                      duration={500}
                      className="text-muted hover:text-violet-400 transition-colors cursor-pointer text-sm font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Socials & Back to top */}
          <div className="md:col-span-3 lg:col-span-4 flex flex-col md:items-end justify-between">
            <div className="mb-8 md:mb-0">
              <h4 className="text-text font-semibold mb-4 uppercase tracking-wider text-sm font-mono md:text-right">Connect</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="p-2.5 bg-violet-500/10 border border-violet-500/20 rounded-lg text-muted hover:text-violet-400 hover:border-violet-400/50 hover:bg-violet-500/20 transition-all"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-violet-500/15 gap-4">
          <p className="text-muted text-sm font-medium text-center md:text-left">
            &copy; {currentYear} Haripriya Manickam. All rights reserved.
          </p>

          <Link
            to="home"
            smooth={true}
            duration={800}
            className="flex items-center gap-2 px-4 py-2 glass border border-violet-500/20 rounded-full text-muted hover:text-text hover:border-violet-400/40 transition-all cursor-pointer text-sm font-medium group"
          >
            <span>Back to Top</span>
            <div className="p-1 bg-violet-500/10 rounded-full group-hover:bg-violet-500/20 group-hover:text-violet-400 transition-colors">
              <FiArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
