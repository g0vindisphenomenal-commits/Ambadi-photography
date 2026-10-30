import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

// Exact 12 SVG Brush-Stroke Paths that form the 3 Hamburger Lines AND morph into the Striped Heart
const BARS = [
  {
    row: 0,
    side: 'l',
    box: [38.4, 11.5, 117.7, 28.7],
    d: 'M 74.5 11.6 c -11.0 0.8 -25.2 2.6 -29.5 3.6 -8.5 2.0 -11.2 7.1 -6.6 12.4 2.3 2.8 2.3 2.8 11.8 1.1 13.7 -2.5 37.4 -3.9 52.0 -3.1 12.6 0.6 12.6 0.6 15.2 -1.9 3.2 -3.2 3.3 -5.8 0.3 -9.2 -2.2 -2.7 -2.2 -2.7 -20.2 -3.0 -9.9 -0.1 -20.2 -0.1 -23.0 0.1 z',
  },
  {
    row: 0,
    side: 'r',
    box: [179.2, 11, 265.1, 25.9],
    d: 'M 192.3 11.0 c -11.0 0.8 -13.6 2.3 -13.1 7.8 0.6 6.5 3.2 7.3 18.3 6.1 12.8 -1.1 40.9 -0.5 55.0 1.0 8.1 0.9 11.1 0.1 12.6 -3.3 1.8 -3.8 0.3 -7.5 -3.5 -9.1 -7.1 -3.0 -44.9 -4.3 -69.3 -2.5 z',
  },
  {
    row: 1,
    side: 'l',
    box: [19, 36, 144, 53],
    d: 'M 61.0 36.5 c -35.0 2.2 -42.0 3.9 -42.0 10.6 0.0 6.3 4.1 7.8 17.0 5.9 12.6 -1.8 39.9 -3.3 72.4 -3.9 32.9 -0.6 32.9 -0.6 34.9 -3.3 1.8 -2.4 1.8 -3.0 0.7 -5.8 -0.7 -1.7 -2.1 -3.5 -3.1 -4.0 -2.5 -1.4 -54.8 -1.0 -79.9 0.5 z',
  },
  {
    row: 1,
    side: 'r',
    box: [163.9, 34.4, 280.2, 48.3],
    d: 'M 170.0 34.7 c -3.2 0.6 -5.0 2.1 -6.1 5.0 -1.0 2.7 0.6 7.0 3.0 7.8 2.8 0.8 70.5 1.5 91.5 0.8 17.5 -0.5 20.1 -0.8 21.8 -2.5 2.3 -2.3 2.3 -6.0 -0.1 -8.9 -1.9 -2.4 -1.9 -2.4 -54.7 -2.5 -29.1 -0.1 -54.0 0.1 -55.4 0.3 z',
  },
  {
    row: 2,
    side: 'l',
    box: [11.4, 61.1, 148.1, 80],
    d: 'M 91.5 61.1 c -33.4 0.7 -50.4 1.8 -67.4 4.4 -12.3 1.8 -15.9 5.1 -12.7 11.4 1.9 3.6 5.3 4.5 12.4 3.1 9.7 -1.8 39.5 -3.9 64.7 -4.5 51.1 -1.1 57.5 -1.5 59.6 -3.6 2.5 -2.5 2.4 -7.4 -0.1 -9.9 -2.3 -2.3 1.3 -2.2 -56.5 -0.9 z',
  },
  {
    row: 2,
    side: 'r',
    box: [159.2, 61.6, 288.1, 76.5],
    d: 'M 159.2 62.8 c -2.8 2.8 -2.8 6.7 0.1 9.6 2.3 2.3 2.3 2.3 47.7 3.2 25.0 0.5 52.9 0.9 61.8 0.9 16.4 0.0 16.4 0.0 18.8 -2.8 2.9 -3.4 3.0 -5.7 0.5 -8.8 -1.8 -2.3 -2.5 -2.4 -14.3 -2.4 -6.8 -0.1 -34.8 -0.5 -62.4 -0.9 -50.1 -0.9 -50.1 -0.9 -52.2 1.2 z',
  },
  {
    row: 3,
    side: 'c',
    box: [16.7, 87, 285, 104.6],
    d: 'M 124.5 87.0 c -43.4 1.1 -89.1 2.9 -97.8 3.9 -7.7 0.8 -10.0 2.5 -10.0 7.2 0.0 5.8 3.1 7.3 14.3 6.5 47.9 -3.3 170.6 -4.5 210.5 -2.1 40.9 2.5 43.5 2.1 43.5 -5.5 0.0 -4.9 -3.3 -7.0 -10.9 -7.0 -3.6 0.0 -16.3 -0.7 -28.1 -1.5 -28.3 -1.9 -79.3 -2.6 -121.5 -1.5 z',
  },
  {
    row: 4,
    side: 'c',
    box: [29.1, 112.3, 271.1, 127.8],
    d: 'M 144.0 112.7 c -85.7 1.3 -110.6 2.0 -113.2 3.2 -4.5 2.3 -5.5 8.8 -1.7 11.7 1.0 0.8 18.8 0.8 59.4 0.2 31.9 -0.4 85.6 -0.7 119.3 -0.6 61.4 0.3 61.4 0.3 63.3 -2.1 2.3 -2.8 1.9 -6.5 -1.0 -9.5 -1.7 -1.7 -5.1 -1.9 -48.2 -2.7 -25.5 -0.4 -48.9 -0.7 -51.9 -0.6 -3.0 0.1 -14.7 0.3 -26.0 0.4 z',
  },
  {
    row: 5,
    side: 'c',
    box: [49.7, 139.2, 252.5, 156.5],
    d: 'M 127.0 140.1 c -60.9 1.7 -75.1 2.5 -77.3 4.8 -2.9 2.8 -2.7 7.9 0.3 10.3 2.2 1.8 3.5 1.9 12.5 1.3 27.7 -1.7 162.5 -4.3 185.7 -3.6 2.7 0.1 5.1 -4.3 4.3 -8.0 -1.3 -5.8 -2.4 -5.9 -51.7 -5.7 -24.4 0.0 -57.6 0.5 -73.8 0.9 z',
  },
  {
    row: 6,
    side: 'c',
    box: [73, 166.2, 234.9, 180.4],
    d: 'M 100.7 167.0 c -23.6 0.5 -23.9 0.5 -25.8 2.9 -1.0 1.3 -1.9 2.9 -1.9 3.7 0.0 2.2 2.2 6.3 3.7 6.8 0.8 0.3 36.2 0.3 78.6 -0.1 77.1 -0.6 77.1 -0.6 79.4 -2.9 2.8 -2.9 2.9 -5.4 0.2 -8.8 -2.0 -2.6 -2.0 -2.6 -56.2 -2.4 -29.8 0.1 -64.9 0.5 -78.0 0.8 z',
  },
  {
    row: 7,
    side: 'c',
    box: [109.5, 191, 197.1, 203.6],
    d: 'M 109.7 191.1 c -4.0 2.3 -4.2 10.7 -0.2 12.2 2.0 0.8 85.8 1.0 87.6 0.3 5.3 -2.3 4.0 -10.9 -1.9 -12.6 -5.1 -1.4 -83.1 -1.3 -85.5 0.1 z',
  },
  {
    row: 8,
    side: 'c',
    box: [134.7, 213.2, 165.8, 227.4],
    d: 'M 146.4 213.7 c -9.2 0.4 -11.7 2.0 -11.7 7.4 0.0 5.6 1.9 6.4 16.0 6.3 12.5 -0.1 12.7 -0.1 15.1 -2.9 4.5 -5.2 0.4 -11.7 -7.2 -11.3 -2.2 0.1 -7.8 0.4 -12.2 0.5 z',
  },
];

const LINE_Y = [64, 119, 174];
const LINE_GROUP = [0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2];

const BURGER_TRANSFORMS = BARS.map(({ box: [x0, y0, x1, y1] }, idx) => {
  const scaleX = 240 / (x1 - x0);
  const scaleY = 16 / (y1 - y0);
  return {
    x: 30 - x0 * scaleX,
    y: LINE_Y[LINE_GROUP[idx]] - 8 - y0 * scaleY,
    scaleX,
    scaleY,
  };
});

const formatMatrix = ({ scaleX, scaleY, x, y }) =>
  `matrix(${scaleX} 0 0 ${scaleY} ${x} ${y})`;

const INITIAL_MATRICES = BURGER_TRANSFORMS.map(formatMatrix);

const MENU_ITEMS = [
  { label: 'HOME', href: '#top', page: 'home', edgeClass: 'edge-flat' },
  { label: 'ALBUM', href: '#album', page: 'album', edgeClass: 'edge-sharp' },
  { label: 'ABOUT', href: '#culture', page: 'home', edgeClass: 'edge-sharp' },
  { label: 'B-ROLL', href: '#services', page: 'home', edgeClass: 'edge-flat' },
  { label: 'PLAYGROUND', href: '#journal', page: 'home', edgeClass: 'edge-flat' },
];

const SOCIAL_LINKS = [
  { label: 'LINKEDIN', href: 'https://www.linkedin.com' },
  { label: 'INSTAGRAM', href: 'https://www.instagram.com' },
  { label: 'TWITTER', href: 'https://x.com' },
  { label: 'MAIL', href: 'mailto:hello@ambadiphotography.com' },
];

export default function Navbar({
  onReplayPreloader,
  preloaderDone,
  currentPage = 'home',
  onNavigate,
}) {
  const [tickerOpen, setTickerOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [navAway, setNavAway] = useState(false);
  const [inBody, setInBody] = useState(false);

  const navRef = useRef(null);
  const logoRef = useRef(null);
  const burgerRef = useRef(null);
  const heartRef = useRef(null);
  const closeTypoRef = useRef(null);
  const halfLRef = useRef(null);
  const halfRRef = useRef(null);
  const leftPathsRef = useRef([]);
  const rightPathsRef = useRef([]);
  const takeoverRef = useRef(null);
  const linksWrapRef = useRef(null);
  const linkRefs = useRef([]);
  const dotRef = useRef(null);
  const photoRef = useRef(null);
  const socialRefs = useRef([]);
  const footerDivRefs = useRef([]);
  const heartbeatTlRef = useRef(null);
  const menuTlRef = useRef(null);
  const progressProxyRef = useRef({ p: 0 });
  const barProxiesRef = useRef(BURGER_TRANSFORMS.map((t) => ({ ...t })));
  const isHoveredRef = useRef(false);
  const menuOpenRef = useRef(false);

  const vpScale = useCallback(() => {
    return Math.min(1.5, Math.max(1, 0.4 + (0.6 * window.innerWidth) / 1440));
  }, []);

  const syncBarTransform = useCallback((idx) => {
    const mat = formatMatrix(barProxiesRef.current[idx]);
    const lEl = leftPathsRef.current[idx];
    const rEl = rightPathsRef.current[idx];
    if (lEl) {
      lEl.style.transform = '';
      lEl.setAttribute('transform', mat);
    }
    if (rEl) {
      rEl.style.transform = '';
      rEl.setAttribute('transform', mat);
    }
  }, []);

  // Initialize 12 path pairs into the 3 hamburger bars
  const applyBurgerRestState = useCallback(
    (immediate = false) => {
      if (immediate) {
        BARS.forEach((_, idx) => {
          gsap.killTweensOf(barProxiesRef.current[idx]);
          Object.assign(barProxiesRef.current[idx], BURGER_TRANSFORMS[idx]);
          syncBarTransform(idx);
        });
        return;
      }

      BARS.forEach((_, idx) => {
        const proxy = barProxiesRef.current[idx];
        gsap.to(proxy, {
          ...BURGER_TRANSFORMS[idx],
          duration: 0.55,
          ease: 'power4.out',
          delay: (6 - Math.abs(idx - 5.5)) * 0.03,
          overwrite: true,
          onUpdate: () => syncBarTransform(idx),
        });
      });
    },
    [syncBarTransform]
  );

  // Morph 3 hamburger lines -> Striped Heart
  const morphToHeart = useCallback(
    (fast = false) => {
      const dur = fast ? 0.35 : 0.7;
      const stag = fast ? 0.012 : 0.03;

      BARS.forEach((_, idx) => {
        const proxy = barProxiesRef.current[idx];
        gsap.to(proxy, {
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          duration: dur,
          ease: 'power4.out',
          delay: Math.abs(idx - 5.5) * stag,
          overwrite: true,
          onUpdate: () => syncBarTransform(idx),
          onComplete: () => {
            syncBarTransform(idx);
            if (
              idx === 6 &&
              !menuOpenRef.current &&
              isHoveredRef.current &&
              heartbeatTlRef.current
            ) {
              heartbeatTlRef.current.restart();
            }
          },
        });
      });
    },
    [syncBarTransform]
  );

  // Broken-Heart split & 3-stage hesitant circle clip-path formula
  const updateClipAndHeart = useCallback((e) => {
    const takeoverEl = takeoverRef.current;
    const burgerEl = burgerRef.current;
    const heartEl = heartRef.current;
    const halfL = halfLRef.current;
    const halfR = halfRRef.current;

    if (takeoverEl && burgerEl) {
      const rect = burgerEl.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const maxR = Math.hypot(
        Math.max(cx, window.innerWidth - cx),
        Math.max(cy, window.innerHeight - cy)
      );
      const l = 0.1 * maxR;
      const c = 0.065 * maxR;

      let radius = 0;
      if (e < 0.18) {
        radius = l * gsap.parseEase('power2.out')(e / 0.18);
      } else if (e < 0.3) {
        // Brief hesitation / contraction from 10% back to 6.5%
        radius = l - (l - c) * gsap.parseEase('power1.inOut')((e - 0.18) / 0.12);
      } else {
        radius = c + (1.02 * maxR - c) * gsap.parseEase('power3.inOut')((e - 0.3) / 0.7);
      }

      takeoverEl.style.clipPath = `circle(${radius.toFixed(1)}px at ${cx.toFixed(1)}px ${cy.toFixed(1)}px)`;
    }

    if (heartEl && halfL && halfR) {
      const peak = (center, halfWidth) => Math.max(0, 1 - Math.abs(e - center) / halfWidth);
      const pulse = e > 0 && e < 1 ? 0.28 * peak(0.09, 0.09) + 0.22 * peak(0.36, 0.1) : 0;
      gsap.set(heartEl, { scale: 1 + pulse, transformOrigin: '50% 55%' });

      const splitProgress =
        e > 0 ? gsap.parseEase('back.out(2.2)')(Math.max(0, Math.min(1, (e - 0.05) / 0.22))) : 0;
      const shiftX = 12 * splitProgress * ((heartEl.offsetWidth || 38) / 300);

      gsap.set(halfL, { rotation: -18 * splitProgress, x: -shiftX });
      gsap.set(halfR, { rotation: 18 * splitProgress, x: shiftX });
    }
  }, []);

  // Position red active dot beside current active link & sync photo height/baseline
  const syncMenuGeometry = useCallback(
    (targetIdx = activeIndex) => {
      const linkEl = linkRefs.current[targetIdx];
      const dotEl = dotRef.current;
      const linksWrap = linksWrapRef.current;
      const takeoverEl = takeoverRef.current;

      if (linkEl && dotEl) {
        const y = linkEl.offsetTop + linkEl.offsetHeight / 2 - dotEl.offsetHeight / 2;
        gsap.set(dotEl, { y, x: 0 });
      }

      if (linksWrap && takeoverEl) {
        const rect = linksWrap.getBoundingClientRect();
        const lastLink = linkRefs.current[linkRefs.current.length - 1];
        takeoverEl.style.setProperty('--nav-photo-h', `${rect.height}px`);
        if (lastLink) {
          const lastRect = lastLink.getBoundingClientRect();
          takeoverEl.style.setProperty('--nav-photo-base', `${lastRect.bottom}px`);
        }
      }
    },
    [activeIndex]
  );

  // Set up repeating heartbeat timeline & initial burger state
  useEffect(() => {
    applyBurgerRestState(true);

    if (heartRef.current) {
      heartbeatTlRef.current = gsap
        .timeline({ repeat: -1, paused: true })
        .to(heartRef.current, { scale: 1.2, duration: 0.1, ease: 'power2.out' })
        .to(heartRef.current, { scale: 1, duration: 0.16, ease: 'power2.in' })
        .to(heartRef.current, { scale: 1.11, duration: 0.09, ease: 'power2.out' })
        .to(heartRef.current, { scale: 1, duration: 0.22, ease: 'power2.in' })
        .to({}, { duration: 0.43 })
        .timeScale(1.6);
    }

    return () => {
      if (heartbeatTlRef.current) heartbeatTlRef.current.kill();
    };
  }, [applyBurgerRestState]);

  // Navbar initial entrance after preloader completes
  useEffect(() => {
    if (preloaderDone && burgerRef.current) {
      gsap.fromTo(
        burgerRef.current,
        { opacity: 0, y: -14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
        }
      );
    }
  }, [preloaderDone]);

  // Track whether user has scrolled past the dark Hero / Banner into the light body
  useEffect(() => {
    const checkScrollContext = () => {
      const darkTopBanner = document.querySelector('.section_hero, .vt-hero, .album-page-title');
      if (darkTopBanner) {
        const rect = darkTopBanner.getBoundingClientRect();
        setInBody(rect.bottom <= 68);
      } else {
        setInBody(window.scrollY > 360);
      }
    };
    checkScrollContext();
    window.addEventListener('scroll', checkScrollContext, { passive: true });
    window.addEventListener('resize', checkScrollContext, { passive: true });
    return () => {
      window.removeEventListener('scroll', checkScrollContext);
      window.removeEventListener('resize', checkScrollContext);
    };
  }, [currentPage]);

  // Close on Escape key
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpenRef.current) {
        toggleMenu(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  // Open / Close GSAP Timeline
  const toggleMenu = useCallback(
    (forceState) => {
      const nextState = typeof forceState === 'boolean' ? forceState : !menuOpenRef.current;
      menuOpenRef.current = nextState;
      setMenuOpen(nextState);

      if (heartbeatTlRef.current) heartbeatTlRef.current.pause();
      if (menuTlRef.current) menuTlRef.current.kill();

      const takeoverEl = takeoverRef.current;
      const closeTypoEl = closeTypoRef.current;
      const s = progressProxyRef.current;
      const g = 160 * vpScale();
      const navLinks = linkRefs.current.filter(Boolean);
      const socialItems = socialRefs.current.filter(Boolean);
      const footerDivs = footerDivRefs.current.filter(Boolean);
      const photoEl = photoRef.current;
      const dotEl = dotRef.current;

      if (nextState) {
        // Lock page scroll
        document.documentElement.style.overflow = 'hidden';
        setNavAway(false);

        if (takeoverEl) {
          takeoverEl.hidden = false;
          gsap.set(takeoverEl, { x: 0 });
          takeoverEl.style.clipPath = 'circle(0px at 0px 0px)';
        }

        // Wait a microtask for layout measurement
        requestAnimationFrame(() => {
          syncMenuGeometry(activeIndex);

          gsap.set([...navLinks, ...socialItems], { opacity: 0, x: g });
          if (closeTypoEl) {
            gsap.set(closeTypoEl, { opacity: 0, x: g * 0.4 });
            const closeChars = closeTypoEl.querySelectorAll('.ch');
            gsap.set(closeChars, { y: '0em' });
          }
          if (photoEl) gsap.set(photoEl, { opacity: 0, x: g, xPercent: -50, yPercent: -100 });
          gsap.set(footerDivs, { opacity: 0, y: g });
          if (dotEl) gsap.set(dotEl, { opacity: 0, x: g });

          const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
          menuTlRef.current = tl;

          tl.to(
            s,
            {
              p: 1,
              duration: 1.4 * (1 - s.p),
              ease: 'none',
              onUpdate: () => updateClipAndHeart(s.p),
              onComplete: () => {
                if (takeoverEl) takeoverEl.style.clipPath = '';
              },
            },
            0
          )
            .to(closeTypoEl, { opacity: 1, x: 0, duration: 0.85 }, 0.55)
            .to(navLinks, { opacity: 1, x: 0, duration: 1, stagger: 0.1 }, 0.8)
            .to(dotEl, { opacity: 1, x: 0, duration: 1 }, 0.8 + 0.1 * activeIndex)
            .to(photoEl, { opacity: 1, x: 0, duration: 1 }, 0.8)
            .to(socialItems, { opacity: 1, x: 0, duration: 1, stagger: 0.1 }, 1.05)
            .to(footerDivs, { opacity: 1, y: 0, duration: 1, stagger: 0.15 }, 1.05);
        });
      } else {
        // Unlock page scroll
        document.documentElement.style.overflow = '';

        const allAnimated = [
          closeTypoEl,
          ...navLinks,
          photoEl,
          dotEl,
          ...socialItems,
          ...footerDivs,
        ].filter(Boolean);

        const closeTl = gsap.timeline({
          defaults: { ease: 'power4.out' },
          onComplete: () => {
            if (takeoverEl) {
              takeoverEl.hidden = true;
              takeoverEl.style.clipPath = '';
            }
            gsap.set(allAnimated, { clearProps: 'opacity,transform' });
            syncMenuGeometry(activeIndex);
            if (isHoveredRef.current && heartbeatTlRef.current) {
              heartbeatTlRef.current.restart();
            } else {
              applyBurgerRestState(false);
            }
          },
        });
        menuTlRef.current = closeTl;

        closeTl
          .to(allAnimated, { opacity: 0, duration: 0.35 }, 0)
          .to(
            s,
            {
              p: 0,
              duration: Math.max(0.35, 0.9 * s.p),
              ease: 'none',
              onUpdate: () => updateClipAndHeart(s.p),
            },
            0.25
          );
      }
    },
    [activeIndex, applyBurgerRestState, syncMenuGeometry, updateClipAndHeart, vpScale]
  );

  // Hover handlers on Hamburger / Typographic CLOSE Button
  const handleBurgerEnter = () => {
    isHoveredRef.current = true;
    if (menuOpenRef.current) {
      if (closeTypoRef.current) {
        const chars = closeTypoRef.current.querySelectorAll('.ch');
        gsap.to(chars, {
          y: '-1.1em',
          duration: 1,
          ease: 'power4.out',
          stagger: { each: 0.05, from: 'random' },
          overwrite: true,
        });
      }
    } else {
      morphToHeart(false);
    }
  };

  const handleBurgerLeave = () => {
    isHoveredRef.current = false;
    if (menuOpenRef.current) {
      if (closeTypoRef.current) {
        const chars = closeTypoRef.current.querySelectorAll('.ch');
        gsap.to(chars, {
          y: '0em',
          duration: 1,
          ease: 'power4.out',
          stagger: { each: 0.05, from: 'random' },
          overwrite: true,
        });
      }
    } else {
      if (heartbeatTlRef.current) heartbeatTlRef.current.pause();
      if (heartRef.current) {
        gsap.to(heartRef.current, { scale: 1, duration: 0.25, ease: 'power2.out' });
      }
      applyBurgerRestState(false);
    }
  };

  // Hover handlers on Menu Links (random character stagger roll + cinnabar color)
  const handleLinkEnter = (idx) => {
    const linkEl = linkRefs.current[idx];
    if (!linkEl) return;
    const chars = linkEl.querySelectorAll('.ch');
    gsap.to(chars, {
      y: '-1.1em',
      duration: 1,
      ease: 'power4.out',
      stagger: { each: 0.05, from: 'random' },
      overwrite: true,
    });
  };

  const handleLinkLeave = (idx) => {
    const linkEl = linkRefs.current[idx];
    if (!linkEl) return;
    const chars = linkEl.querySelectorAll('.ch');
    gsap.to(chars, {
      y: '0em',
      duration: 1,
      ease: 'power4.out',
      stagger: { each: 0.05, from: 'random' },
      overwrite: true,
    });
  };

  // Keep active dot synced when currentPage changes externally
  useEffect(() => {
    if (currentPage === 'album') {
      setActiveIndex(1);
    } else if (activeIndex === 1 && currentPage === 'home') {
      setActiveIndex(0);
    }
  }, [currentPage]);

  // Click Menu Link: parabolic dot jump + page navigation / smooth scroll to target section
  const handleLinkClick = (e, idx, item) => {
    e.preventDefault();
    const dotEl = dotRef.current;
    const targetLink = linkRefs.current[idx];
    const { href, page } = item;

    setActiveIndex(idx);

    const navigateAfterClose = () => {
      if (onNavigate) {
        onNavigate(page, href);
      } else {
        const targetSection = document.querySelector(href);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        } else if (href === '#top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };

    if (dotEl && targetLink) {
      const targetY = targetLink.offsetTop + targetLink.offsetHeight / 2 - dotEl.offsetHeight / 2;
      gsap
        .timeline({
          onComplete: () => {
            toggleMenu(false);
            setTimeout(navigateAfterClose, 320);
          },
        })
        .to(dotEl, {
          y: targetY,
          duration: 0.42,
          ease: 'back.out(1.8)',
        })
        .to(
          dotEl,
          {
            scaleX: 1.35,
            scaleY: 0.72,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
          },
          '-=0.1'
        );
    } else {
      toggleMenu(false);
      setTimeout(navigateAfterClose, 320);
    }
  };

  // Spawn red dandelion/sparkle burst when clicking logo
  const handleLogoClick = (e) => {
    if (menuOpenRef.current) {
      toggleMenu(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    for (let i = 0; i < 14; i++) {
      const spark = document.createElement('span');
      spark.className = 'logo-spark';
      document.body.appendChild(spark);
      const angle = (Math.PI * 2 * i) / 14 + (Math.random() - 0.5) * 0.4;
      const dist = 45 + Math.random() * 85;
      gsap.set(spark, {
        position: 'fixed',
        left: originX,
        top: originY,
        width: 6,
        height: 6,
        borderRadius: '50%',
        backgroundColor: '#e33529',
        pointerEvents: 'none',
        zIndex: 9999,
      });
      gsap.to(spark, {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist - 20,
        opacity: 0,
        scale: 0.2,
        duration: 0.85 + Math.random() * 0.35,
        ease: 'power3.out',
        onComplete: () => spark.remove(),
      });
    }
  };

  return (
    <>
      {/* Main Header Bar (`header#site-nav`) */}
      <header
        id="site-nav"
        ref={navRef}
        className={`site-nav no-ticker ${menuOpen ? 'open' : ''} ${navAway ? 'away' : ''} ${
          inBody ? 'scrolled-body' : ''
        }`}
      >
        <nav className="nav-inner" aria-label="Main navigation">
          {/* Right Menu Trigger Button (`#nav-burger`) — 3 Lines ↔ Striped Heart ↔ Broken Heart */}
          <button
            id="nav-burger"
            ref={burgerRef}
            type="button"
            className="nav-burger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="nav-takeover"
            onPointerEnter={handleBurgerEnter}
            onPointerLeave={handleBurgerLeave}
            onClick={() => toggleMenu()}
          >
            <span ref={heartRef} className="nav-heart">
              <i ref={halfLRef} className="half-l">
                <svg viewBox="0 0 300 238" aria-hidden="true">
                  {BARS.map((bar, idx) => (
                    <path
                      key={`l-${idx}`}
                      ref={(el) => (leftPathsRef.current[idx] = el)}
                      d={bar.d}
                      transform={INITIAL_MATRICES[idx]}
                      fill="currentColor"
                    />
                  ))}
                </svg>
              </i>
              <i ref={halfRRef} className="half-r">
                <svg viewBox="0 0 300 238" aria-hidden="true">
                  {BARS.map((bar, idx) => (
                    <path
                      key={`r-${idx}`}
                      ref={(el) => (rightPathsRef.current[idx] = el)}
                      d={bar.d}
                      transform={INITIAL_MATRICES[idx]}
                      fill="currentColor"
                    />
                  ))}
                </svg>
              </i>
            </span>
            <span ref={closeTypoRef} className="nav-close-typo" aria-hidden="true">
              {'CLOSE'.split('').map((ch, idx) => (
                <span key={idx} className="ch">
                  {ch}
                </span>
              ))}
            </span>
          </button>
        </nav>

        {/* 3. Fullscreen Menu Overlay (`div#nav-takeover`) */}
        <div id="nav-takeover" ref={takeoverRef} className="nav-takeover" hidden>
          <div className="takeover-bg" />

          {/* 3B. Primary Navigation Links (`nav.takeover-links`) */}
          <div className="takeover-top">
            <nav ref={linksWrapRef} className="takeover-links" aria-label="Menu links">
              <i ref={dotRef} className="takeover-dot" aria-hidden="true" />
              {MENU_ITEMS.map((item, idx) => (
                <a
                  key={item.label}
                  ref={(el) => (linkRefs.current[idx] = el)}
                  href={item.href}
                  className={`display h3 ${item.edgeClass} ${
                    activeIndex === idx ? 'dot-home' : ''
                  }`}
                  aria-current={activeIndex === idx ? 'page' : undefined}
                  onPointerEnter={() => handleLinkEnter(idx)}
                  onPointerLeave={() => handleLinkLeave(idx)}
                  onClick={(e) => handleLinkClick(e, idx, item)}
                >
                  <span className="sr-only">{item.label}</span>
                  {item.label.split('').map((ch, cIdx) => (
                    <span key={cIdx} className="ch" aria-hidden="true">
                      {ch}
                    </span>
                  ))}
                  <span className="base" aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>

          {/* 3C. Right-Side Editorial Cutout Photo (`img.takeover-photo`) */}
          <img
            ref={photoRef}
            src="https://www.worksruthi.com/nav-photo.webp"
            alt="Editorial portrait with binoculars"
            className="takeover-photo"
          />

          {/* 3D. Footer Info Inside the Menu (`.takeover-footer`) */}
          <div className="takeover-footer">
            <div
              ref={(el) => (footerDivRefs.current[0] = el)}
              className="takeover-social-row"
            >
              <ul className="takeover-social">
                {SOCIAL_LINKS.map((soc, idx) => (
                  <li key={soc.label} ref={(el) => (socialRefs.current[idx] = el)}>
                    <a
                      href={soc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label"
                    >
                      {soc.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

