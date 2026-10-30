import React, { useEffect, useState, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import HeroAndBody from './components/HeroAndBody';
import AlbumPage from './components/AlbumPage';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [preloaderKey, setPreloaderKey] = useState(0);
  const [currentPage, setCurrentPage] = useState(() =>
    window.location.hash === '#album' ? 'album' : 'home'
  );

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

  const handleNavigate = useCallback((targetPage, href) => {
    if (targetPage === 'album') {
      setCurrentPage('album');
      window.history.pushState(null, '', '#album');
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTimeout(() => ScrollTrigger.refresh(), 100);
      return;
    }

    setCurrentPage('home');
    window.history.pushState(null, '', href || '#top');
    setTimeout(() => {
      ScrollTrigger.refresh();
      if (href && href !== '#top') {
        const targetSection = document.querySelector(href);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 80);
  }, []);

  useEffect(() => {
    const onPopState = () => {
      if (window.location.hash === '#album') {
        setCurrentPage('album');
      } else {
        setCurrentPage('home');
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  return (
    <>
      {showPreloader && (
        <Preloader key={preloaderKey} onComplete={handlePreloaderComplete} />
      )}
      <Navbar
        onReplayPreloader={handleReplayPreloader}
        preloaderDone={!showPreloader}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />
      {currentPage === 'album' ? (
        <AlbumPage onNavigateHome={() => handleNavigate('home', '#top')} />
      ) : (
        <HeroAndBody
          preloaderDone={!showPreloader}
          onOpenAlbum={() => handleNavigate('album', '#album')}
        />
      )}
    </>
  );
}

