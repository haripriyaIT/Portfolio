import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#9C6BA8] via-[#855092] to-[#6E387B] origin-left z-[10000] shadow-[0_0_10px_rgba(156,107,168,0.4)]"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;
