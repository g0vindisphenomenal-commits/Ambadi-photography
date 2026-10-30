import React, { useEffect, useState, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import HeroAndBody from './components/HeroAndBody';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [preloaderKey, setPreloaderKey] = useState(0);

  // Initialize Lenis smooth scrolling & sync with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Update --vp-scale custom property on resize
    const updateVpScale = () => {
      const scale = Math.min(1.5, Math.max(1, 0.4 + (0.6 * window.innerWidth) / 1440));
      document.documentElement.style.setProperty('--vp-scale', scale.toFixed(4));
    };
    updateVpScale();
    window.addEventListener('resize', updateVpScale);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      window.removeEventListener('resize', updateVpScale);
    };
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, []);

  const handleReplayPreloader = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setPreloaderKey((k) => k + 1);
    setShowPreloader(true);
  }, []);

  return (
    <>
      {showPreloader && (
        <Preloader key={preloaderKey} onComplete={handlePreloaderComplete} />
      )}
      <Navbar
        onReplayPreloader={handleReplayPreloader}
        preloaderDone={!showPreloader}
      />
      <HeroAndBody preloaderDone={!showPreloader} />
    </>
  );
}

