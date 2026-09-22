import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';

import Experience from '../components/Experience';
import Internships from '../components/Internships';
import CurrentFocus from '../components/CurrentFocus';

import Certifications from '../components/Certifications';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

// Section wrapper — adds 3D depth layer and scroll-triggered entrance
const DepthSection: React.FC<{
  children: React.ReactNode;
  delay?: number;
  depthZ?: number;
}> = ({
  children,
  delay = 0,
  depthZ = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.98 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    className="relative"
    style={{
      transformStyle: 'preserve-3d',
      perspective: 1200,
      transform: depthZ ? `translateZ(${depthZ}px)` : undefined,
    }}
  >
    {children}
  </motion.div>
);

const Home = () => {
  return (
    // Transparent bg so QuantumCanvas 3D environment shows through seamlessly
    <div className="min-h-screen text-text relative" style={{ background: 'transparent' }}>
      <Navbar />
      <main className="relative z-10" style={{ transformStyle: 'preserve-3d' }}>
        <Hero />
        <DepthSection delay={0} depthZ={10}><About /></DepthSection>
        <DepthSection delay={0} depthZ={-5}><Skills /></DepthSection>
        <DepthSection delay={0} depthZ={15}><Projects /></DepthSection>

        <DepthSection delay={0} depthZ={-5}><Experience /></DepthSection>

        <DepthSection delay={0} depthZ={5}><Internships /></DepthSection>

        <DepthSection delay={0} depthZ={8}><CurrentFocus /></DepthSection>

        <DepthSection delay={0} depthZ={0}><Certifications /></DepthSection>
        <DepthSection delay={0} depthZ={12}><Contact /></DepthSection>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
