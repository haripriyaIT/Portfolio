import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface MouseState {
  x: number; // 0–1 normalised
  y: number;
  rawX: number;
  rawY: number;
}

const MouseContext = createContext<React.MutableRefObject<MouseState>>({
  current: { x: 0.5, y: 0.5, rawX: 0, rawY: 0 },
});

export const MouseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<MouseState>({ x: 0.5, y: 0.5, rawX: 0, rawY: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      ref.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
        rawX: e.clientX,
        rawY: e.clientY,
      };
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return <MouseContext.Provider value={ref}>{children}</MouseContext.Provider>;
};

export const useMouse = () => useContext(MouseContext);
