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
      {/* Outer subtle aurora magnetic ring */}
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
            ? '1.5px solid rgba(0, 229, 255, 0.85)'
            : '1px solid rgba(0, 200, 150, 0.45)',
          background: isHovered
            ? 'radial-gradient(circle, rgba(0,229,255,0.12) 0%, rgba(0,200,150,0.04) 70%, transparent 100%)'
            : 'transparent',
          boxShadow: isHovered
            ? '0 0 16px rgba(0, 229, 255, 0.6), inset 0 0 8px rgba(95, 255, 224, 0.3)'
            : '0 0 8px rgba(0, 200, 150, 0.25)',
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
          background: '#E6FFFB',
          boxShadow: '0 0 6px #5FFFE0, 0 0 12px #00E5FF',
          scale: isHovered ? 1.4 : 1,
          transition: 'transform 0.15s ease-out',
        }}
      />
    </>
  );
};

export default CustomCursor;
