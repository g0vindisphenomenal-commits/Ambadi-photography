import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ALBUM_ITEMS = [
  {
    id: 'album-1',
    title: 'Saudi Lime Green',
    date: '2014 - Design',
    hoverLabel: 'Branding',
    image: 'https://html.kodesolution.com/2026/rebort-html/images/resource/project1-1.jpg',
  },
  {
    id: 'album-2',
    title: 'Saudi Lime Green',
    date: '2014 - Design',
    hoverLabel: 'Branding',
    image: 'https://html.kodesolution.com/2026/rebort-html/images/resource/project1-2.jpg',
  },
  {
    id: 'album-3',
    title: 'Saudi Lime Green',
    date: '2014 - Design',
    hoverLabel: 'Branding',
    image: 'https://html.kodesolution.com/2026/rebort-html/images/resource/project1-3.jpg',
  },
  {
    id: 'album-4',
    title: 'Saudi Lime Green',
    date: '2014 - Design',
    hoverLabel: 'Branding',
    image: 'https://html.kodesolution.com/2026/rebort-html/images/resource/project1-4.jpg',
  },
  {
    id: 'album-5',
    title: 'Saudi Lime Green',
    date: '2014 - Design',
    hoverLabel: 'Branding',
    image: 'https://html.kodesolution.com/2026/rebort-html/images/resource/project1-5.jpg',
  },
  {
    id: 'album-6',
    title: 'Saudi Lime Green',
    date: '2014 - Design',
    hoverLabel: 'Branding',
    image: 'https://html.kodesolution.com/2026/rebort-html/images/resource/project1-6.jpg',
  },
];

function AlbumCard({ item, isLast, onOpenLightbox }) {
  const imageBoxRef = useRef(null);
  const hoverBoxRef = useRef(null);

  useEffect(() => {
    const card = imageBoxRef.current;
    const viewAll = hoverBoxRef.current;
    if (!card || !viewAll) return;

    let mouseX = card.clientWidth / 2;
    let mouseY = card.clientHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let rafId = null;
    let isInside = false;

    const tick = () => {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      viewAll.style.left = `${currentX}px`;
      viewAll.style.top = `${currentY}px`;
      if (isInside) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    };

    const handleMouseEnter = (e) => {
      const rect = card.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      currentX = mouseX;
      currentY = mouseY;
      viewAll.style.left = `${currentX}px`;
      viewAll.style.top = `${currentY}px`;
      viewAll.style.opacity = '1';
      viewAll.style.transform = 'translate(-50%, -50%) scale(1)';
      isInside = true;
      if (!rafId) rafId = requestAnimationFrame(tick);
    };

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      if (!rafId && isInside) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const handleMouseLeave = () => {
      isInside = false;
      viewAll.style.opacity = '0';
      viewAll.style.transform = 'translate(-50%, -50%) scale(0)';
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="album-col-6">
      <div className="album-project-block">
        <div className={`album-inner-block ${isLast ? 'mb-0' : ''}`}>
          <div
            ref={imageBoxRef}
            className="album-image-box"
            onClick={() => onOpenLightbox(item)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenLightbox(item);
              }
            }}
          >
            <div className="album-image">
              <img src={item.image} alt={item.title} loading="lazy" />
            </div>
            <div ref={hoverBoxRef} className="album-hover-box">
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onOpenLightbox(item);
                }}
              >
                <img src={item.image} alt={item.title} />
                <div className="album-hover-text">{item.hoverLabel}</div>
              </a>
            </div>
          </div>

          <div className="album-content">
            <div className="album-title">
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onOpenLightbox(item);
                }}
              >
                {item.title}
              </a>
            </div>
            <div className="album-date">{item.date}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AlbumPage({ onNavigateHome }) {
  const pageRef = useRef(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    const ctx = gsap.context(() => {
      const blocks = gsap.utils.toArray('.album-project-block');
      blocks.forEach((block, idx) => {
        gsap.fromTo(
          block,
          { opacity: 0, y: 42 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            delay: (idx % 2) * 0.1,
            scrollTrigger: {
              trigger: block,
              start: 'top 88%',
              once: true,
            },
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main id="album" ref={pageRef} className="album-page-wrapper">
      {/* SECTION 1: Page Title Hero Banner (`section.page-title`) */}
      <section className="album-page-title">
        <div className="album-bg-video">
          <video autoPlay muted loop playsInline>
            <source
              src="https://html.kodesolution.com/2026/rebort-html/images/background/bg-video1.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        <div className="album-container">
          <div className="album-title-outer">
            <h1 className="album-hero-heading">Album</h1>
            <ul className="album-breadcrumb" aria-label="Breadcrumb">
              <li>
                <a
                  href="#top"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigateHome) onNavigateHome();
                  }}
                >
                  Home
                </a>
              </li>
              <li>Album</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 2: White-Themed 2-Column Album Showcase Grid (`section.projects-section.pb-40`) */}
      <section className="album-projects-section">
        <div className="album-container">
          <div className="album-row">
            {ALBUM_ITEMS.map((item, idx) => (
              <AlbumCard
                key={item.id}
                item={item}
                isLast={idx === ALBUM_ITEMS.length - 1}
                onOpenLightbox={setSelectedAlbum}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal when clicking an Album item */}
      {selectedAlbum && (
        <div
          className="vt-modal-backdrop"
          onClick={() => setSelectedAlbum(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="vt-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="vt-modal-close"
              onClick={() => setSelectedAlbum(null)}
              aria-label="Close album preview"
            >
              ✕
            </button>
            <div className="vt-modal-img-wrap">
              <img src={selectedAlbum.image} alt={selectedAlbum.title} />
            </div>
            <div className="vt-modal-info">
              <div className="vt-modal-tags">
                <span className="vt-work-tag">{selectedAlbum.hoverLabel}</span>
                <span className="vt-work-tag">{selectedAlbum.date}</span>
              </div>
              <h3>{selectedAlbum.title}</h3>
              <p>Ambadi Photography — Curated Visual Album Showcase.</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
