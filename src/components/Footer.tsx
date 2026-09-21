import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FiArrowUp, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

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
    { icon: <FiGithub size={20} />, url: 'https://github.com/haripriyaIT', label: 'GitHub' },
    { icon: <FiLinkedin size={20} />, url: 'https://linkedin.com/in/haripriya2703', label: 'LinkedIn' },
    { icon: <FiMail size={20} />, url: 'mailto:haripriya030609@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="relative bg-[#EAF2D7] pt-16 pb-8 border-t border-[#9C6BA8]/20 overflow-hidden">
      {/* Animated Divider */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#855092]/50 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-12">

          {/* Brand & Tagline */}
          <div className="md:col-span-5 lg:col-span-4">
            <Link
              to="home"
              smooth={true}
              duration={500}
              className="text-2xl font-heading font-bold cursor-pointer bg-gradient-to-r from-[#3D1A47] via-[#6E387B] to-[#9C6BA8] bg-clip-text text-transparent transition-all inline-block mb-4"
            >
              Haripriya M.
            </Link>
            <p className="text-[#6F5179] leading-relaxed max-w-sm">
              AI &amp; ML Engineer &amp; Software Developer building intelligent software and machine learning solutions.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-4 lg:col-span-4 flex flex-col md:items-center">
            <div>
              <h4 className="text-[#3D1A47] font-semibold mb-4 uppercase tracking-wider text-sm font-mono">Quick Links</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.to}
                      smooth={true}
                      duration={500}
                      className="text-[#6F5179] hover:text-[#3D1A47] transition-colors cursor-pointer text-sm font-medium"
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
              <h4 className="text-[#3D1A47] font-semibold mb-4 uppercase tracking-wider text-sm font-mono md:text-right">Connect</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="p-2.5 bg-white/80 border border-[#9C6BA8]/25 rounded-lg text-[#6E387B] hover:text-white hover:border-[#855092] hover:bg-[#855092] transition-all cursor-pointer shadow-sm"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#9C6BA8]/20 gap-4">
          <p className="text-[#6F5179] text-sm font-medium text-center md:text-left">
            &copy; {currentYear} Haripriya Manickam. All rights reserved.
          </p>

          <Link
            to="home"
            smooth={true}
            duration={800}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 border border-[#9C6BA8]/30 rounded-full text-[#6E387B] hover:text-[#3D1A47] hover:border-[#855092] hover:bg-white transition-all cursor-pointer text-sm font-medium group shadow-sm"
          >
            <span>Back to Top</span>
            <div className="p-1 bg-[#9C6BA8]/15 rounded-full group-hover:bg-[#855092] group-hover:text-white transition-colors">
              <FiArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
