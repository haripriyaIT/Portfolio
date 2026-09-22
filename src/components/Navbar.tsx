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
  { name: 'Internships', to: 'internships' },
  { name: 'Focus', to: 'focus' },
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
          ? 'bg-[#EAF2D7]/85 backdrop-blur-xl border-b border-[#9C6BA8]/20 shadow-[0_4px_25px_rgba(110,56,123,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-1 ml-auto">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              smooth={true}
              duration={500}
              spy={true}
              activeClass="active-nav-link text-[#4A2055] font-semibold"
              className="relative px-4 py-2 text-sm text-[#6F5179] hover:text-[#3D1A47] font-medium transition-all cursor-pointer group"
            >
              {link.name}
              {/* Hover underline */}
              <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-[#9C6BA8] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full" />
            </Link>
          ))}
          <a
            href="/Haripriya_Resume.pdf"
            download="Haripriya_Resume.pdf"
            className="ml-4 px-4 py-2 rounded-md bg-[#855092] hover:bg-[#6E387B] text-white transition-all flex items-center space-x-2 text-sm font-medium shadow-[0_2px_15px_rgba(133,80,146,0.3)] hover:shadow-[0_4px_20px_rgba(110,56,123,0.4)] cursor-pointer"
          >
            <FiDownload />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center ml-auto">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isOpen}
            className="text-[#6F5179] hover:text-[#3D1A47] transition-colors p-2"
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
            className="md:hidden bg-[#F4F8EC]/95 backdrop-blur-xl border-b border-[#9C6BA8]/20 shadow-lg"
          >
            <div className="px-4 py-4 space-y-2 flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  smooth={true}
                  duration={500}
                  spy={true}
                  activeClass="text-[#4A2055] bg-[#9C6BA8]/15 font-semibold"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 rounded-md text-base font-medium text-[#6F5179] hover:text-[#3D1A47] hover:bg-[#9C6BA8]/10 transition-colors cursor-pointer"
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="/Haripriya_Resume.pdf"
                download="Haripriya_Resume.pdf"
                className="mt-4 px-4 py-3 rounded-md bg-[#855092] hover:bg-[#6E387B] text-white text-center font-medium flex items-center justify-center space-x-2 shadow-md"
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
