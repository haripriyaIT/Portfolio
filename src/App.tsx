import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import CustomCursor from './components/ui/CustomCursor';
import ScrollProgress from './components/ui/ScrollProgress';
import CometCursor from './components/ui/CometCursor';
import QuantumCanvas from './components/ui/QuantumCanvas';
import { MouseProvider } from './context/MouseContext';

const Home = lazy(() => import('./pages/Home'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));

const LoadingFallback = () => (
  <div className="min-h-screen bg-[#EAF2D7] flex flex-col items-center justify-center">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 rounded-full border-2 border-[#9C6BA8]/30 border-t-[#855092] animate-spin" />
      <div className="absolute inset-2 rounded-full border-2 border-[#9C6BA8]/20 border-t-[#6E387B] animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
    </div>
    <p className="mt-6 font-mono text-xs text-[#855092] tracking-[0.3em] uppercase animate-pulse">
      Initialising Interface...
    </p>
  </div>
);

// Scroll tracker — only active on home route
const ScrollTracker: React.FC<{ onScroll: (p: number) => void }> = ({ onScroll }) => {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== '/') return;
    const handle = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      onScroll(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener('scroll', handle, { passive: true });
    handle();
    return () => window.removeEventListener('scroll', handle);
  }, [location.pathname, onScroll]);
  return null;
};

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  return (
    <MouseProvider>
      <Router>
        <ScrollTracker onScroll={setScrollProgress} />
        {/* Global fixed background — only show on home */}
        <QuantumCanvas scrollProgress={scrollProgress} />
        <CustomCursor />
        <CometCursor />
        <ScrollProgress />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
          </Routes>
        </Suspense>
      </Router>
    </MouseProvider>
  );
}

export default App;
