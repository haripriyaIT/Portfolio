import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiDownload } from 'react-icons/fi';

const navLinks = [
  { name: 'Home', to: 'home' },
  { name: 'About', to: 'about' },
  { name: 'Skills', to: 'skills' },
  { name: 'Projects', to: 'projects' },
  { name: 'Experience', to: 'experience' },
  { name: 'GitHub', to: 'github' },
  { name: 'Certifications', to: 'certifications' },
  { name: 'Contact', to: 'contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const lastScrollY = React.useRef(0);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = lastScrollY.current;
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    lastScrollY.current = latest;
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050B18]/80 backdrop-blur-xl border-b border-violet-500/20 shadow-[0_4px_30px_rgba(139,92,246,0.08)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="home"
          smooth={true}
          duration={500}
          className="text-2xl font-heading font-bold cursor-pointer bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent hover:from-violet-300 hover:to-cyan-300 transition-all"
        >
          HM.
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              smooth={true}
              duration={500}
              spy={true}
              activeClass="active-nav-link"
              className="relative px-4 py-2 text-sm text-muted hover:text-text transition-all cursor-pointer group"
            >
              {link.name}
              {/* Hover underline */}
              <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-gradient-to-r from-violet-500 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full" />
            </Link>
          ))}
          <a
            href="/resume.pdf"
            download
            className="ml-4 px-4 py-2 rounded-md bg-gradient-to-r from-violet-600 to-purple-600 text-white border-0 hover:from-violet-500 hover:to-purple-500 transition-all flex items-center space-x-2 text-sm font-medium shadow-[0_0_20px_rgba(139,92,246,0.35)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
          >
            <FiDownload />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isOpen}
            className="text-muted hover:text-violet-400 transition-colors p-2"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A1628]/95 backdrop-blur-xl border-b border-violet-500/20"
          >
            <div className="px-4 py-4 space-y-2 flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  smooth={true}
                  duration={500}
                  spy={true}
                  activeClass="text-violet-400 bg-violet-500/10"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 rounded-md text-base font-medium text-muted hover:text-text hover:bg-violet-500/10 transition-colors cursor-pointer"
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="/resume.pdf"
                download
                className="mt-4 px-4 py-3 rounded-md bg-gradient-to-r from-violet-600 to-purple-600 text-white text-center font-medium flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(139,92,246,0.35)]"
              >
                <FiDownload />
                <span>Download Resume</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
