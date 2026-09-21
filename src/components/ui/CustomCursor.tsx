import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 450, mass: 0.2 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('a, button, [role="button"], input, select, textarea, .cursor-pointer')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <>
      {/* Outer subtle magnetic ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
          width: isHovered ? 38 : 22,
          height: isHovered ? 38 : 22,
          border: isHovered
            ? '1.5px solid rgba(110, 56, 123, 0.85)'
            : '1.2px solid rgba(156, 107, 168, 0.55)',
          background: isHovered
            ? 'radial-gradient(circle, rgba(156, 107, 168, 0.14) 0%, rgba(219, 232, 192, 0.1) 70%, transparent 100%)'
            : 'transparent',
          boxShadow: isHovered
            ? '0 0 14px rgba(156, 107, 168, 0.3)'
            : '0 0 6px rgba(156, 107, 168, 0.15)',
          transition: 'width 0.22s ease-out, height 0.22s ease-out, border-color 0.22s ease-out, box-shadow 0.22s ease-out',
        }}
      />

      {/* Inner sharp pinpoint */}
      <motion.div
        className="fixed top-0 left-0 w-[5px] h-[5px] rounded-full pointer-events-none z-[10000]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
          background: '#6E387B',
          boxShadow: '0 0 6px rgba(156, 107, 168, 0.8)',
          scale: isHovered ? 1.4 : 1,
          transition: 'transform 0.15s ease-out',
        }}
      />
    </>
  );
};

export default CustomCursor;
