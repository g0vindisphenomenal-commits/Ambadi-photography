import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CLIENT_LOGOS = [
  {
    name: 'KIN®',
    url: 'https://cdn.prod.website-files.com/6a95fdd95c5b60864b18a35d/6aa18157a9b5cae175697b31_logoipsum-custom-logo%20(3).svg',
  },
  {
    name: 'SABLE®',
    url: 'https://cdn.prod.website-files.com/6a95fdd95c5b60864b18a35d/6aa181581ad75b6721bf32d9_logoipsum-custom-logo.svg',
  },
  {
    name: 'FOLD+',
    url: 'https://cdn.prod.website-files.com/6a95fdd95c5b60864b18a35d/6aa18157cd3c7108469183dd_logoipsum-custom-logo%20(4).svg',
  },
  {
    name: 'MERIDIAN+',
    url: 'https://cdn.prod.website-files.com/6a95fdd95c5b60864b18a35d/6aa18158212e71ef03ed7b78_logoipsum-custom-logo%20(2).svg',
  },
  {
    name: 'HALCYON®',
    url: 'https://cdn.prod.website-files.com/6a95fdd95c5b60864b18a35d/6aa181571304f79ba8c88237_logoipsum-custom-logo%20(1).svg',
  },
];

const WORK_CARDS = [
  {
    id: 'fold',
    client: 'FOLD+',
    year: '2026',
    category: 'Digital product',
    img: 'https://cdn.prod.website-files.com/6aaa9f69ae02a14272d12023/6aafa9e3f661aa2fdfb9acbf_magnific_square-fashion-studio-pho_p8HdOYtehw%20(1).avif',
    summary:
      'High-fashion motion-blur studio series and interactive lookbook experience engineered for Fold+ Autumn/Winter 2026.',
  },
  {
    id: 'halcyon',
    client: 'HALCYON®',
    year: '2026',
    category: 'Brand identity',
    img: 'https://cdn.prod.website-files.com/6aaa9f69ae02a14272d12023/6aafaa3443939bb3b5adb343_magnific_longexposure-colour-photo_ks9kJul16B%20(1).avif',
    summary:
      'Analog 35mm cinema archive and complete visual identity system for Halcyon Films across London and Lisbon.',
  },
  {
    id: 'meridian',
    client: 'MERIDIAN+',
    year: '2025',
    category: 'Film & campaign',
    img: 'https://cdn.prod.website-files.com/6aaa9f69ae02a14272d12023/6aafa9ac146a330691f76c54_magnific_square-photograph-inside-_8a1tPRDIrU%20(1).avif',
    summary:
      'Exhibition cinematography and long-exposure gallery campaign capturing movement and stillness in contemporary art spaces.',
  },
  {
    id: 'sable',
    client: 'SABLE®',
    year: '2025',
    category: 'Packaging',
    img: 'https://cdn.prod.website-files.com/6aaa9f69ae02a14272d12023/6aafa9c85129ce16ce1637e2_magnific_square-studio-photograph-_tCxhLwumZJ%20(1).avif',
    summary:
      'Tactile studio portraiture and monochrome botanical packaging architecture for luxury skincare house Sable.',
  },
];

const LIVE_PROJECTS = [
  {
    client: 'Halcyon',
    discipline: 'Brand system',
    week: 'Week 7 of 11',
    seniors: '2 of 4 seniors',
    progress: 30,
    ships: 'Ships Apr 2027',
  },
  {
    client: 'Aurel',
    discipline: 'Interface build',
    week: 'Week 8 of 12',
    seniors: '3 of 4 seniors',
    progress: 60,
    ships: 'Ships Q4 2026',
  },
  {
    client: 'Norrland Coffee',
    discipline: 'Production',
    week: 'Week 5 of 6',
    seniors: '2 of 3 seniors',
    progress: 90,
    ships: 'Ships Q4 2026',
  },
];

const SERVICES_LIST = [
  {
    num: '( 001 )',
    icon: 'https://cdn.prod.website-files.com/6a95fdd95c5b60864b18a35d/6aa420e4d784f308e605b4ff_6904ca7a4abbe56dfff89559_service-icon-01%20(1).svg',
    label: 'Brand systems',
    text: 'Naming, identity, and the rules that keep it holding together.',
  },
  {
    num: '( 002 )',
    icon: 'https://cdn.prod.website-files.com/6a95fdd95c5b60864b18a35d/6aa420e494f87dc8cb2efbc0_6904ca7a4abbe56dfff89556_service-icon-02%20(1).svg',
    label: 'Positioning',
    text: 'Research and strategy that settle what the brand is for.',
  },
  {
    num: '( 003 )',
    icon: 'https://cdn.prod.website-files.com/6a95fdd95c5b60864b18a35d/6aa420e4007e354523963499_6904ca7a4abbe56dfff89558_service-icon-03%20(1).svg',
    label: 'Digital product',
    text: 'Interfaces designed and built with the team who ships them.',
  },
  {
    num: '( 004 )',
    icon: 'https://cdn.prod.website-files.com/6a95fdd95c5b60864b18a35d/6aa420e494f87dc8cb2efbc0_6904ca7a4abbe56dfff89556_service-icon-02%20(1).svg',
    label: 'Film & campaign',
    text: 'Editorial photography, 35mm motion reels, and global launch campaigns.',
  },
];

const TESTIMONIALS_LIST = [
  {
    variant: 'top-to-bottom',
    name: 'James Carter',
    role: 'Wilson & Co',
    avatar:
      'https://cdn.prod.website-files.com/6a95fdd95c5b60864b18a35d/6aaedc136694a15782f1cae6_magnific_square-editorial-portrait_WDaVjdJcXe.avif',
    quote:
      'Incredible team. They delivered exactly what we needed, on time and beyond expectations.',
  },
  {
    variant: 'bottom-to-top',
    name: 'Emily Davis',
    role: 'StartUp Hub',
    avatar:
      'https://cdn.prod.website-files.com/6a95fdd95c5b60864b18a35d/6aaedc1322070b673d71df76_magnific_square-editorial-portrait_Ifrv9FHtvE.avif',
    quote:
      'A smooth process from start to finish, and a highly professional team throughout.',
  },
  {
    variant: 'top-to-bottom',
    name: 'Anna Martinez',
    role: 'Marketing director',
    avatar:
      'https://cdn.prod.website-files.com/6a95fdd95c5b60864b18a35d/6aaedc13fe1af8b313c652a0_magnific_square-editorial-portrait_VXuegmGMMU.avif',
    quote:
      'Our new branding is exactly what we envisioned - clean, modern, and unmistakably ours.',
  },
  {
    variant: 'bottom-to-top',
    name: 'Marcus Vance',
    role: 'Halcyon Films',
    avatar:
      'https://cdn.prod.website-files.com/6a95fdd95c5b60864b18a35d/6aaedc13188600ff4a9145e1_magnific_square-editorial-portrait_s72UXA8l8e.avif',
    quote:
      'Rarely do you find a studio where the photographers, directors, and engineers sit at the same table.',
  },
];

const SCORE_FACES = [
  'https://cdn.prod.website-files.com/6a95fdd95c5b60864b18a35d/6aaedc13188600ff4a9145e1_magnific_square-editorial-portrait_s72UXA8l8e.avif',
  'https://cdn.prod.website-files.com/6a95fdd95c5b60864b18a35d/6aaedc1322070b673d71df76_magnific_square-editorial-portrait_Ifrv9FHtvE.avif',
  'https://cdn.prod.website-files.com/6a95fdd95c5b60864b18a35d/6aaedc1360ae4e81d9a0479f_magnific_square-editorial-portrait_tCxaNr0mZJ.avif',
  'https://cdn.prod.website-files.com/6a95fdd95c5b60864b18a35d/6aaedc13fe1af8b313c652a0_magnific_square-editorial-portrait_VXuegmGMMU.avif',
];

const FAQ_ITEMS = [
  {
    q: 'How do projects usually start?',
    a: 'A two-week positioning sprint. It sets the scope for everything that follows and ends with a written brief both sides sign off on.',
  },
  {
    q: 'Who does the work?',
    a: 'The four seniors you meet on the first call. Vantra takes on three projects at a time so nothing gets handed down.',
  },
  {
    q: 'What does a full engagement cost?',
    a: 'Brand systems start at 45,000 EUR. Product and campaign work is quoted per phase after the positioning sprint.',
  },
  {
    q: 'How long until launch?',
    a: 'Six weeks for a campaign, eleven for a brand system, sixteen when product build is included.',
  },
  {
    q: 'What happens after handover?',
    a: 'Every project ships with a documented system and two review sessions in the first year.',
  },
];

const JOURNAL_FEATURED = [
  {
    tag: 'Brand systems',
    date: 'June 12, 2026',
    title: 'What a brand system owes its engineers.',
    img: 'https://cdn.prod.website-files.com/6aaa9f69ae02a14272d12023/6aafb0cb0bcf7b01e8596983_magnific_ultrawide-studio-photogra_MBQtA1HDCm.avif',
  },
  {
    tag: 'Practice',
    date: 'March 2, 2026',
    title: 'Why we price in outcomes, not hours.',
    img: 'https://cdn.prod.website-files.com/6aaa9f69ae02a14272d12023/6aafb08a62d0fc7da00a9846_magnific_ultrawide-studio-photogra_cpfB3RH0eP.avif',
  },
];

const JOURNAL_INDEX = [
  {
    category: 'Brand systems',
    title: 'What a brand system owes its engineers.',
    date: 'June 12, 2026',
    img: 'https://cdn.prod.website-files.com/6aaa9f69ae02a14272d12023/6aafb0cb0bcf7b01e8596983_magnific_ultrawide-studio-photogra_MBQtA1HDCm.avif',
  },
  {
    category: 'Interface',
    title: 'Designing in the browser',
    date: 'May 5, 2026',
    img: 'https://cdn.prod.website-files.com/6aaa9f69ae02a14272d12023/6ab12a438411a28d1a0431e9_magnific_ultrawide-studio-photogra_4RMmhkQ9Aa.avif',
  },
  {
    category: 'Studio',
    title: 'Inside a Vantra studio week',
    date: 'April 21, 2026',
    img: 'https://cdn.prod.website-files.com/6aaa9f69ae02a14272d12023/6aafb0a8b4f217bb1f231456_magnific_ultrawide-studio-photogra_VXuI2ZQMMU.avif',
  },
  {
    category: 'Practice',
    title: 'Why we price in outcomes, not hours.',
    date: 'March 2, 2026',
    img: 'https://cdn.prod.website-files.com/6aaa9f69ae02a14272d12023/6aafb08a62d0fc7da00a9846_magnific_ultrawide-studio-photogra_cpfB3RH0eP.avif',
  },
];

export default function HeroAndBody({ preloaderDone }) {
  const mainRef = useRef(null);
  const statementRef = useRef(null);
  const servicesTrackRef = useRef(null);
  const testimonialsTrackRef = useRef(null);
  const cultureVideoRef = useRef(null);
  const faqAnswerRefs = useRef([]);
  const faqTextRefs = useRef([]);
  const faqIconRefs = useRef([]);

  const [serviceIndex, setServiceIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [reelPlaying, setReelPlaying] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [hoveredJournalRow, setHoveredJournalRow] = useState(null);
  const [activeCaseModal, setActiveCaseModal] = useState(null);

  // Set up all GSAP ScrollTrigger animations across Hero & Body sections
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Headline Line-by-Line Entrance & Status Card
      gsap.fromTo(
        '.hero-line-inner',
        { opacity: 0, y: '0.3em' },
        {
          opacity: 1,
          y: '0em',
          duration: 0.65,
          delay: preloaderDone ? 0.1 : 0.4,
          stagger: 0.08,
          ease: 'power3.out',
        }
      );

      gsap.fromTo(
        '.hero_status-card',
        { opacity: 0, y: '0.6em' },
        {
          opacity: 1,
          y: '0em',
          duration: 0.55,
          delay: preloaderDone ? 0.35 : 0.65,
          ease: 'power2.out',
        }
      );

      // Subtle Hero Background Parallax on Scroll
      gsap.to('.hero_image .image-cover', {
        yPercent: 12,
        scale: 1.06,
        ease: 'none',
        scrollTrigger: {
          trigger: '.section_hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // 2. Statement Character-by-Character Scroll-Scrubbed Opacity Reveal (`t-82e18e62`)
      const stmtChars = gsap.utils.toArray('.stmt-char');
      if (stmtChars.length) {
        gsap.fromTo(
          stmtChars,
          { opacity: 0.15 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.statement_text',
              start: 'top 88%',
              end: 'bottom 32%',
              scrub: 0.8,
            },
          }
        );
      }

      // 3. Section Headings Split-Line Scroll Reveal (`[data-fade-action="heading"]`)
      gsap.utils.toArray('[data-fade-action="heading"]').forEach((heading) => {
        gsap.fromTo(
          heading,
          { opacity: 0, y: '0.28em' },
          {
            opacity: 1,
            y: '0em',
            duration: 0.55,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 88%',
            },
          }
        );
      });

      // 4. Selected Work Grid Cards Stagger Entrance (`t-34e1f784`)
      gsap.fromTo(
        '.work_card',
        { opacity: 0, y: '1.5em' },
        {
          opacity: 1,
          y: '0em',
          duration: 0.55,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.work_grid',
            start: 'top 85%',
          },
        }
      );

      // 5. Live Studio Rows & Progress Bars (`t-42cefe13`)
      gsap.fromTo(
        '.live_row',
        { opacity: 0, y: '1.2em' },
        {
          opacity: 1,
          y: '0em',
          duration: 0.5,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.live_list',
            start: 'top 85%',
          },
        }
      );

      gsap.utils.toArray('.live_bar').forEach((bar) => {
        const targetWidth = bar.getAttribute('data-progress') || '50%';
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: targetWidth,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 90%',
            },
          }
        );
      });

      // 6. Services Cards Stagger Entrance (`t-84bc0a2c`)
      gsap.fromTo(
        '.services_card',
        { opacity: 0, y: '1.5em' },
        {
          opacity: 1,
          y: '0em',
          duration: 0.5,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.services_slider',
            start: 'top 85%',
          },
        }
      );

      // 7. Culture / Studio Reel Frame Scale-In (`t-146231b5`)
      gsap.fromTo(
        '.culture_frame',
        { opacity: 0, scale: 0.95, y: '2em' },
        {
          opacity: 1,
          scale: 1,
          y: '0em',
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.culture_frame',
            start: 'top 85%',
          },
        }
      );

      // 8. Testimonials Cards Stagger Entrance (`t-ca7d59f2`)
      gsap.fromTo(
        '.testimonial_card',
        { opacity: 0, y: '1.5em' },
        {
          opacity: 1,
          y: '0em',
          duration: 0.5,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.testimonial_slider',
            start: 'top 85%',
          },
        }
      );

      // 9. FAQ Accordion Rows Stagger (`t-c9564d7d`)
      gsap.fromTo(
        '.faq_row',
        { opacity: 0, y: '1em' },
        {
          opacity: 1,
          y: '0em',
          duration: 0.45,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.faq_list',
            start: 'top 85%',
          },
        }
      );

      // 10. Journal Cards & Index Rows Stagger (`t-8500be7d` & `t-0e607c99`)
      gsap.fromTo(
        '.journal_card',
        { opacity: 0, y: '1.5em' },
        {
          opacity: 1,
          y: '0em',
          duration: 0.5,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.journal_grid',
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.journal-index_row',
        { opacity: 0, y: '1em' },
        {
          opacity: 1,
          y: '0em',
          duration: 0.45,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.journal-index_list',
            start: 'top 88%',
          },
        }
      );

      // 11. Careers CTA Banner Entrance (`t-6d29ab09` & `t-4d22da62`)
      gsap.fromTo(
        ['.careers_text', '.buttons_row .button'],
        { opacity: 0, y: '1em' },
        {
          opacity: 1,
          y: '0em',
          duration: 0.5,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.section_careers',
            start: 'top 75%',
          },
        }
      );
    }, mainRef);

    return () => ctx.revert();
  }, [preloaderDone]);

  // Slide Services Carousel
  const slideServices = (dir) => {
    const maxIdx = SERVICES_LIST.length - 1;
    const next = dir === 'next' ? (serviceIndex >= maxIdx ? 0 : serviceIndex + 1) : serviceIndex <= 0 ? maxIdx : serviceIndex - 1;
    setServiceIndex(next);
    if (servicesTrackRef.current) {
      gsap.to(servicesTrackRef.current, {
        x: `-${next * 29}em`,
        duration: 0.55,
        ease: 'power3.out',
      });
    }
  };

  // Slide Testimonials Carousel
  const slideTestimonials = (dir) => {
    const totalSlides = TESTIMONIALS_LIST.length; // plus score card
    const next =
      dir === 'next'
        ? testimonialIndex >= totalSlides - 1
          ? 0
          : testimonialIndex + 1
        : testimonialIndex <= 0
        ? totalSlides - 1
        : testimonialIndex - 1;
    setTestimonialIndex(next);
    if (testimonialsTrackRef.current) {
      gsap.to(testimonialsTrackRef.current, {
        x: `-${next * 24.9}em`,
        duration: 0.55,
        ease: 'power3.out',
      });
    }
  };

  // Toggle Culture Studio Reel Video Play/Pause
  const toggleCultureVideo = () => {
    const vid = cultureVideoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play().catch(() => {});
      setReelPlaying(true);
    } else {
      vid.pause();
      setReelPlaying(false);
    }
  };

  // Toggle FAQ Accordion Row (`t-8fb56211`)
  const toggleFaq = (idx) => {
    const isClosing = openFaq === idx;
    const prevIdx = openFaq;
    setOpenFaq(isClosing ? null : idx);

    if (prevIdx !== null && faqAnswerRefs.current[prevIdx]) {
      gsap.to(faqAnswerRefs.current[prevIdx], {
        height: 0,
        duration: 0.45,
        ease: 'power2.out',
      });
      gsap.to(faqTextRefs.current[prevIdx], {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(faqIconRefs.current[prevIdx], {
        rotation: 0,
        duration: 0.45,
        ease: 'power2.out',
      });
    }

    if (!isClosing && faqAnswerRefs.current[idx]) {
      gsap.to(faqAnswerRefs.current[idx], {
        height: 'auto',
        duration: 0.45,
        ease: 'power2.out',
      });
      gsap.to(faqTextRefs.current[idx], {
        opacity: 1,
        duration: 0.45,
        ease: 'power2.out',
      });
      gsap.to(faqIconRefs.current[idx], {
        rotation: 135,
        duration: 0.45,
        ease: 'power2.out',
      });
    }
  };

  // Render statement text split into character spans for ScrollTrigger scrub
  const statementLines = [
    'Vantra builds brand systems, digital',
    'products, and campaigns. All of it',
    'made to hold together.',
  ];

  return (
    <div ref={mainRef} className="page-wrapper">
      <main className="main-wrapper">
        {/* =================================================================
            SECTION 1: HERO SECTION (`section_hero`)
           ================================================================= */}
        <section id="top" data-surface="dark" className="section_hero">
          <div className="hero_image">
            <img
              src="https://cdn.prod.website-files.com/6a95fdd95c5b60864b18a35d/6aafd42ade3e5e56a91c5647_home.avif"
              alt="Long-exposure silhouette photography with warm amber and blue light trails"
              className="image-cover"
            />
          </div>

          <div className="hero_content">
            <div className="padding-global">
              <div className="container-max">
                <div className="hero_layout">
                  <div>
                    <h1 className="heading heading-style-h0 is-light">
                      <span className="hero-line-mask">
                        <span className="hero-line-inner">Make.</span>
                      </span>
                      <span className="hero-line-mask">
                        <span className="hero-line-inner">Every Idea.</span>
                      </span>
                      <span className="hero-line-mask">
                        <span className="hero-line-inner">Matter.</span>
                      </span>
                    </h1>
                  </div>

                  <a href="#careers" className="hero_status-card">
                    <div className="hero_status-body">
                      <div className="label-mono is-ghost">Studio status</div>
                      <div className="hero_status-value">Open for Q1 2027 projects.</div>
                    </div>
                    <div className="hero_thumb">
                      <img
                        src="https://cdn.prod.website-files.com/6a95fdd95c5b60864b18a35d/6aae655b76e3d9acadd7484f_magnific_longexposure-colour-photo_P3TyLud42C.avif"
                        alt="Studio status thumbnail"
                        className="hero_thumb-image"
                      />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            SECTION 2: STATEMENT & CLIENT MARQUEE (`section_statement`)
           ================================================================= */}
        <section className="section_statement">
          <div className="padding-global">
            <div className="container-max">
              <div className="statement_wrap">
                <p ref={statementRef} className="statement_text">
                  {statementLines.map((line, lIdx) => (
                    <React.Fragment key={lIdx}>
                      {line.split('').map((ch, cIdx) => (
                        <span key={`${lIdx}-${cIdx}`} className="stmt-char">
                          {ch}
                        </span>
                      ))}
                      {lIdx < statementLines.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>

                <div className="statement_marquee">
                  <div className="statement_track">
                    {[0, 1].map((setIdx) => (
                      <div
                        key={setIdx}
                        className="statement_set"
                        aria-hidden={setIdx === 1 ? 'true' : undefined}
                      >
                        {CLIENT_LOGOS.map((logo) => (
                          <a
                            key={`${setIdx}-${logo.name}`}
                            href="#work"
                            className="statement_client"
                          >
                            <img
                              src={logo.url}
                              alt={logo.name}
                              className="statement_client-logo"
                            />
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="statement_cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            SECTION 3: SELECTED WORK 2×2 GRID (`section_work`)
           ================================================================= */}
        <section id="work" className="section_work">
          <div className="padding-global padding-section is-work">
            <div className="container-max">
              <div className="section_content">
                <div className="section_header">
                  <div className="heading-container">
                    <h2 data-fade-action="heading" className="heading heading-style-h2">
                      Work
                      <br />
                      that lasts.
                    </h2>
                  </div>
                  <div className="section_meta">
                    <div className="section_meta-text">( Featured )</div>
                    <div className="section_meta-text">Brand, product, campaign</div>
                  </div>
                </div>

                <div className="work_grid">
                  {WORK_CARDS.map((card) => (
                    <div key={card.id} className="work_cell">
                      <a
                        href={`#work-${card.id}`}
                        className="work_card"
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveCaseModal(card);
                        }}
                      >
                        <img
                          src={card.img}
                          alt={card.client}
                          className="work_card-img"
                          loading="lazy"
                        />
                        <div className="work_panel">
                          <div className="work_panel-row">
                            <h3 className="work_client">{card.client}</h3>
                            <div className="work_meta-stack">
                              <div>{card.year}</div>
                              <div>{card.category}</div>
                            </div>
                          </div>
                          <div className="work_cta-wrap">
                            <div className="work_link">
                              <div className="work_link-text">Discover case</div>
                              <div className="work_link-icon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <line x1="7" y1="17" x2="17" y2="7" />
                                  <polyline points="7 7 17 7 17 17" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            SECTION 4: IN THE STUDIO RIGHT NOW (`section_live`)
           ================================================================= */}
        <section id="live" className="section_live">
          <div className="padding-global padding-section">
            <div className="container-max">
              <div className="section_content">
                <div className="section_header">
                  <div className="heading-container">
                    <h2 data-fade-action="heading" className="heading heading-style-h2">
                      In the studio
                      <br />
                      right now.
                    </h2>
                  </div>
                  <div className="section_meta">
                    <div className="section_meta-text">Live now - 03 / 05</div>
                    <div className="section_meta-text">Updated this week</div>
                  </div>
                </div>

                <div className="live_list">
                  {LIVE_PROJECTS.map((item) => (
                    <div key={item.client} className="live_row">
                      <div className="live_col is-left">
                        <h3 className="live_client">{item.client}</h3>
                      </div>
                      <div className="live_col is-right">
                        <div className="live_discipline">{item.discipline}</div>
                        <div className="live_progress-wrap">
                          <div className="live_progress">
                            <div className="live_progress-meta-wrap">
                              <div className="live_progress-meta">{item.week}</div>
                              <div className="live_progress-meta">{item.seniors}</div>
                            </div>
                            <div className="live_track">
                              <div
                                className="live_bar"
                                data-progress={`${item.progress}%`}
                                style={{ width: `${item.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="live_ships">{item.ships}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            SECTION 5: SERVICES HORIZONTAL SLIDER (`section_services`)
           ================================================================= */}
        <section id="services" className="section_services">
          <div className="padding-global padding-section">
            <div className="container-max">
              <div className="section_content">
                <div className="section_header">
                  <div className="heading-container">
                    <h2 data-fade-action="heading" className="heading heading-style-h2">
                      What we
                      <br />
                      actually do.
                    </h2>
                  </div>
                  <div className="section_meta">
                    <div className="section_meta-text">( Five practices )</div>
                    <div className="section_meta-text">One senior team</div>
                  </div>
                </div>

                <div className="services_slider">
                  <div ref={servicesTrackRef} className="services_slider-mask">
                    {SERVICES_LIST.map((srv, idx) => (
                      <div key={idx} className="services_slide">
                        <div className="services_card">
                          <div className="label-mono is-dark">{srv.num}</div>
                          <div className="services_glyph-wrap">
                            <img
                              src={srv.icon}
                              alt={srv.label}
                              className="services_glyph"
                              loading="lazy"
                            />
                          </div>
                          <div className="services_card-body">
                            <div className="services_card-label">{srv.label}</div>
                            <div className="services_card-text">{srv.text}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    aria-label="Previous service"
                    className="services_slider-arrow_left"
                    onClick={() => slideServices('prev')}
                  >
                    <div className="services_slider-arrow_icon">
                      <img
                        src="https://cdn.prod.website-files.com/6a95fdd95c5b60864b18a35d/6aa4243615fb349248a65314_arrow-left.svg"
                        alt=""
                        className="services_slider-arrow_image"
                      />
                    </div>
                  </button>

                  <button
                    type="button"
                    aria-label="Next service"
                    className="services_slider-arrow_right"
                    onClick={() => slideServices('next')}
                  >
                    <div className="services_slider-arrow_icon">
                      <img
                        src="https://cdn.prod.website-files.com/6a95fdd95c5b60864b18a35d/6aa423a8a16a44c50acc8573_arrow-right%20(1).svg"
                        alt=""
                        className="services_slider-arrow_image"
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            SECTION 6: CULTURE / THE STUDIO REEL (`section_culture`)
           ================================================================= */}
        <section id="culture" className="section_culture">
          <div className="padding-global padding-section">
            <div className="container-max">
              <div className="section_content is-culture">
                <div className="section_header is-center">
                  <div className="label-mono is-dark">The studio reel</div>
                  <h2
                    data-fade-action="heading"
                    className="heading heading-style-h1 is-center"
                  >
                    Nine years
                    <br />
                    of shipped work.
                  </h2>
                </div>

                <div className="culture_frame" onClick={toggleCultureVideo}>
                  <video
                    ref={cultureVideoRef}
                    loop
                    muted
                    playsInline
                    poster="https://cdn.prod.website-files.com/6a95fdd95c5b60864b18a35d%2F6ab2dd4dd5b87808bed2b761_magnific_create-a-premium-cinemati_eIbBC7YdqL_poster.0000000.jpg"
                    className="culture_video"
                  >
                    <source
                      src="https://cdn.prod.website-files.com/6a95fdd95c5b60864b18a35d%2F6ab2dd4dd5b87808bed2b761_magnific_create-a-premium-cinemati_eIbBC7YdqL_mp4.mp4"
                      type="video/mp4"
                    />
                    <source src="/videos/preloader-build.mp4" type="video/mp4" />
                  </video>

                  <div
                    className="culture_island"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCultureVideo();
                    }}
                  >
                    <div className={`culture_dot ${reelPlaying ? 'is-live' : ''}`} />
                    <div className="culture_island-items">
                      <div className="culture_island-label">Studio reel</div>
                      <div className="culture_island-time">01:24</div>
                      <div className="culture_island-sep" />
                      <button
                        type="button"
                        aria-label={reelPlaying ? 'Pause video' : 'Play video'}
                        className="culture_play"
                      >
                        {reelPlaying ? (
                          <img
                            src="https://cdn.prod.website-files.com/6a95fdd95c5b60864b18a35d/6a9ff1d722bf3af436daa1b0_pause.svg"
                            alt="Pause"
                          />
                        ) : (
                          <img
                            src="https://cdn.prod.website-files.com/6a95fdd95c5b60864b18a35d/6a9ff184b072bb55b76af828_play%20(1).svg"
                            alt="Play"
                          />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            SECTION 7: CLIENT TESTIMONIALS SLIDER (`section_testimonials`)
           ================================================================= */}
        <section id="testimonials" className="section_testimonials">
          <div className="padding-global padding-section">
            <div className="container-max">
              <div className="section_content">
                <div className="section_header">
                  <div className="heading-container">
                    <h2 data-fade-action="heading" className="heading heading-style-h2">
                      What clients
                      <br />
                      say back.
                    </h2>
                  </div>
                  <div className="section_meta">
                    <div className="section_meta-text">( 4.9 / 5 )</div>
                    <div className="section_meta-text">Across every project since 2017</div>
                  </div>
                </div>

                <div className="testimonial_slider">
                  <div ref={testimonialsTrackRef} className="testimonial_slider-mask">
                    {/* Slide 1: Dark Summary Score Card (`.is-score`) */}
                    <div className="testimonial_slide">
                      <div className="testimonial_card is-score">
                        <div className="testimonial_score-row">
                          <div className="testimonial_score">
                            <div>4.8</div>
                            <div className="testimonial_score-max">/5</div>
                          </div>
                          <div className="testimonial_score-text">
                            Across 120+ launches since 2017, rated by the teams we shipped with.
                          </div>
                        </div>

                        <div className="testimonial_faces">
                          <div className="testimonial_stack">
                            {SCORE_FACES.map((faceUrl, idx) => (
                              <img
                                key={idx}
                                src={faceUrl}
                                alt="Client portrait"
                                className={`testimonial_face ${idx > 0 ? 'is-stacked' : ''}`}
                                loading="lazy"
                              />
                            ))}
                          </div>
                          <div className="testimonial_faces-label">
                            Trusted by clients worldwide
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Slides 2–5: Alternating Top-to-Bottom & Bottom-to-Top Quote Cards */}
                    {TESTIMONIALS_LIST.map((item, idx) => (
                      <div key={idx} className="testimonial_slide">
                        <div
                          className={`testimonial_card ${
                            item.variant === 'bottom-to-top' ? 'is-reverse' : ''
                          }`}
                        >
                          <div className="testimonial_person">
                            <img
                              src={item.avatar}
                              alt={item.name}
                              className="testimonial_avatar"
                              loading="lazy"
                            />
                            <div className="testimonial_person-meta">
                              <div className="testimonial_name">{item.name}</div>
                              <div className="testimonial_role">{item.role}</div>
                            </div>
                          </div>
                          <div className="testimonial_quote">{item.quote}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    aria-label="Previous testimonial"
                    className="testimonial_slider-arrow_left"
                    onClick={() => slideTestimonials('prev')}
                  >
                    <div className="services_slider-arrow_icon">
                      <img
                        src="https://cdn.prod.website-files.com/6a95fdd95c5b60864b18a35d/6aa4243615fb349248a65314_arrow-left.svg"
                        alt=""
                        className="services_slider-arrow_image"
                      />
                    </div>
                  </button>

                  <button
                    type="button"
                    aria-label="Next testimonial"
                    className="testimonial_slider-arrow_right"
                    onClick={() => slideTestimonials('next')}
                  >
                    <div className="services_slider-arrow_icon">
                      <img
                        src="https://cdn.prod.website-files.com/6a95fdd95c5b60864b18a35d/6aa423a8a16a44c50acc8573_arrow-right%20(1).svg"
                        alt=""
                        className="services_slider-arrow_image"
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            SECTION 8: FAQ ACCORDION (`section_faq`)
           ================================================================= */}
        <section id="faq" className="section_faq">
          <div className="padding-global padding-section">
            <div className="container-max">
              <div className="faq_layout">
                <div className="faq_head">
                  <div className="heading-container">
                    <h2 data-fade-action="heading" className="heading heading-style-h2">
                      Before
                      <br />
                      you brief us.
                    </h2>
                  </div>
                </div>

                <div className="faq_list">
                  {FAQ_ITEMS.map((item, idx) => (
                    <div
                      key={idx}
                      className={`faq_row ${openFaq === idx ? 'is-open' : ''}`}
                      onClick={() => toggleFaq(idx)}
                    >
                      <div className="faq_row-head">
                        <div className="faq_question">{item.q}</div>
                        <div
                          ref={(el) => (faqIconRefs.current[idx] = el)}
                          className="faq_icon"
                        >
                          <div className="faq_icon-h" />
                          <div className="faq_icon-v" />
                        </div>
                      </div>
                      <div
                        ref={(el) => (faqAnswerRefs.current[idx] = el)}
                        className="faq_answer"
                      >
                        <p
                          ref={(el) => (faqTextRefs.current[idx] = el)}
                          className="faq_answer-text"
                        >
                          {item.a}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            SECTION 9: JOURNAL / NOTES FROM THE STUDIO (`section_more-journal`)
           ================================================================= */}
        <section id="journal" className="section_more-journal">
          <div className="padding-global padding-section">
            <div className="container-max">
              <div className="section_content">
                <div className="section_header">
                  <div className="heading-container">
                    <h2 data-fade-action="heading" className="heading heading-style-h2">
                      Notes from the
                      <br />
                      studio.
                    </h2>
                  </div>
                </div>

                <div className="journal_wrapper">
                  {/* Part A: Top 2-Column Featured Grid */}
                  <div className="journal_grid">
                    {JOURNAL_FEATURED.map((post, idx) => (
                      <div key={idx} className="journal_cell">
                        <a
                          href="#journal"
                          className="journal_card"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            src={post.img}
                            alt={post.title}
                            className="journal_card-img"
                            loading="lazy"
                          />
                          <div className="journal_card-scrim" />
                          <div className="journal_card-body">
                            <div className="journal_card-meta">
                              <div className="label-mono is-ghost">{post.tag}</div>
                              <div className="label-mono is-ghost">{post.date}</div>
                            </div>
                            <div className="journal_card-title-wrap">
                              <h3 className="journal_card-title">{post.title}</h3>
                            </div>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>

                  {/* Part B: Bottom 4-Row Interactive Index List with Floating Hover Image */}
                  <div className="journal_split">
                    <div className="journal-index_list">
                      {JOURNAL_INDEX.map((row, idx) => (
                        <a
                          key={idx}
                          href="#journal"
                          className={`journal-index_row ${
                            hoveredJournalRow === idx ? 'is-hovered' : ''
                          }`}
                          onPointerEnter={() => setHoveredJournalRow(idx)}
                          onPointerLeave={() => setHoveredJournalRow(null)}
                          onClick={(e) => e.preventDefault()}
                        >
                          <div className="journal-index_content">
                            <div className="journal-index_label">
                              <div className="label-mono is-dark">{row.category}</div>
                            </div>
                            <div className="journal-index_title-wrap">
                              <div className="journal-index_title">{row.title}</div>
                            </div>
                          </div>

                          <div className="journal-index_meta">
                            <div
                              className={`journal-index_image ${
                                hoveredJournalRow === idx ? 'is-visible' : ''
                              }`}
                            >
                              <img
                                src={row.img}
                                alt={row.title}
                                className="image-cover"
                                loading="lazy"
                              />
                            </div>
                            <div className="journal-index_meta-inner">
                              <div className="journal-index_date">{row.date}</div>
                              <div className="journal-index_arrow">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                  <polyline points="15 3 21 3 21 9" />
                                  <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =================================================================
          SECTION 10: PRE-FOOTER CAREERS / BOOKING CTA (`section_careers`)
         ================================================================= */}
      <section id="careers" className="section_careers">
        <div className="careers_media">
          <img
            src="https://cdn.prod.website-files.com/6a95fdd95c5b60864b18a35d/6ab12d6a3a405a6425c1afc0_magnific_ultrawide-longexposure-ph_4RMmsFn9Aa.avif"
            alt="Ultrawide long-exposure photography"
            className="image-cover"
            loading="lazy"
          />
        </div>
        <div className="padding-global">
          <div className="container-max">
            <div className="careers_content">
              <div className="careers_title-wrap">
                <h2 data-fade-action="heading" className="careers_title">
                  Build
                  <br />
                  what&apos;s next with us
                </h2>
              </div>
              <p className="careers_text">
                Wherever you sit at Vantra, there is room to shape real work and leave a
                lasting mark.
              </p>

              {/* Dual-Row Slot-Machine Hover Buttons */}
              <div className="buttons_row">
                <a href="mailto:hello@ambadiphotography.com" className="button is-light">
                  <div className="button_text-col">
                    <div className="button_text-row">
                      <div className="button_text">Start a project</div>
                    </div>
                    <div className="button_text-row">
                      <div className="button_text">Start a project</div>
                    </div>
                  </div>
                  <div className="button_chip is-light">
                    <div className="button_chip-row">
                      <div className="button_icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </div>
                    </div>
                    <div className="button_chip-row is-second">
                      <div className="button_icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>

                <a href="#culture" className="button is-dark">
                  <div className="button_text-col">
                    <div className="button_text-row">
                      <div className="button_text">Meet the studio</div>
                    </div>
                    <div className="button_text-row">
                      <div className="button_text">Meet the studio</div>
                    </div>
                  </div>
                  <div className="button_chip is-dark">
                    <div className="button_chip-row">
                      <div className="button_icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </div>
                    </div>
                    <div className="button_chip-row is-second">
                      <div className="button_icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          SECTION 11: OVERLAPPING ROUNDED FOOTER (`footer`)
         ================================================================= */}
      <footer className="footer">
        <div className="padding-global">
          <div className="container-max">
            <div className="footer_wrapper">
              <div className="footer_top">
                <div className="footer_brand">
                  <div className="footer_logo">
                    <img
                      src="https://cdn.prod.website-files.com/6a95fdd95c5b60864b18a35d/6a96cd3feb45c5d8ea661912_mark-soft-bone.svg"
                      alt="Studio mark"
                    />
                  </div>
                  <div className="footer_brand-content">
                    <p className="footer_paragraph">
                      Vantra is an independent studio working across brand, product, and
                      content. We partner with founders and in-house teams on positioning,
                      identity systems, and the digital products that carry them.
                    </p>
                  </div>
                </div>

                <div className="footer_nav">
                  <div className="footer_nav-list">
                    <a href="#top" className="footer_nav-link">
                      <div className="footer_nav-text">home</div>
                    </a>
                    <a href="#culture" className="footer_nav-link">
                      <div className="footer_nav-text">about</div>
                    </a>
                    <a href="#work" className="footer_nav-link">
                      <div className="footer_nav-text">works</div>
                    </a>
                    <a href="#journal" className="footer_nav-link">
                      <div className="footer_nav-text">Journal</div>
                    </a>
                    <a href="#careers" className="footer_nav-link">
                      <div className="footer_nav-text">contact</div>
                    </a>
                  </div>

                  <div className="footer_links-grid">
                    <a href="#top" className="footer_link">
                      Style Guide
                    </a>
                    <a href="#top" className="footer_link">
                      Custom 404
                    </a>
                    <a href="#top" className="footer_link">
                      Licenses
                    </a>
                    <a href="#top" className="footer_link">
                      Custom 401
                    </a>
                    <a href="#top" className="footer_link">
                      Change Log
                    </a>
                  </div>
                </div>
              </div>

              <div className="footer_bottom">
                <div>
                  © 2026{' '}
                  <a href="#top" className="link is-light">
                    Ambadi Photography
                  </a>
                  , powered by{' '}
                  <a href="https://gsap.com" target="_blank" rel="noreferrer" className="link is-light">
                    React &amp; GSAP
                  </a>
                </div>
                <div className="text-block">Amsterdam - Lisbon</div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Case Study Quick-View Modal when clicking a Work Card */}
      {activeCaseModal && (
        <div className="case-modal-backdrop" onClick={() => setActiveCaseModal(null)}>
          <div className="case-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="case-modal-close"
              onClick={() => setActiveCaseModal(null)}
            >
              ✕ CLOSE
            </button>
            <img
              src={activeCaseModal.img}
              alt={activeCaseModal.client}
              className="case-modal-img"
            />
            <div className="case-modal-body">
              <div className="label-mono is-ghost">
                {activeCaseModal.year} — {activeCaseModal.category}
              </div>
              <h3 className="case-modal-title">{activeCaseModal.client}</h3>
              <p className="case-modal-desc">{activeCaseModal.summary}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
