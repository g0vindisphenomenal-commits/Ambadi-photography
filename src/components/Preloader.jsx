import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

// 31-Cut Accelerating Kinetic Strobe Timeline (exact millisecond cadence from reference preloader)
const WORDS_PHOTO = ['SHOOT', 'EVERY', 'FRAME', 'WITH', 'AMBADI'];
const VIDEO_SEEK_TIMES = [0.4, 4.2, 8.1, 10.0];

const CUT_SCHEDULE = [
  { start: 0, duration: 420, type: 'word', wordIdx: 0 },
  { start: 420, duration: 360, type: 'media', sceneIdx: 0 },
  { start: 780, duration: 310, type: 'word', wordIdx: 1 },
  { start: 1090, duration: 270, type: 'media', sceneIdx: 1 },
  { start: 1360, duration: 230, type: 'word', wordIdx: 2 },
  { start: 1590, duration: 200, type: 'media', sceneIdx: 2 },
  { start: 1790, duration: 170, type: 'word', wordIdx: 3 },
  { start: 1960, duration: 150, type: 'media', sceneIdx: 3 },
  { start: 2110, duration: 190, type: 'word', wordIdx: 4, full: true }, // Edge-to-edge 100% W/H
  { start: 2300, duration: 110, type: 'media', sceneIdx: 0 }, // Shutter bars start pinching at 2300ms
  { start: 2410, duration: 90, type: 'word', wordIdx: 0 },
  { start: 2500, duration: 80, type: 'media', sceneIdx: 1, flip: true },
  { start: 2580, duration: 70, type: 'word', wordIdx: 1 },
  { start: 2650, duration: 60, type: 'media', sceneIdx: 2 }, // 60ms machine-gun cadence begins
  { start: 2710, duration: 60, type: 'word', wordIdx: 2, invert: true },
  { start: 2770, duration: 60, type: 'media', sceneIdx: 3 },
  { start: 2830, duration: 60, type: 'word', wordIdx: 3 },
  { start: 2890, duration: 60, type: 'media', sceneIdx: 0, flip: true },
  { start: 2950, duration: 60, type: 'word', wordIdx: 4 },
  { start: 3010, duration: 60, type: 'media', sceneIdx: 1, invert: true },
  { start: 3070, duration: 60, type: 'word', wordIdx: 0, invert: true },
  { start: 3130, duration: 60, type: 'media', sceneIdx: 2 },
  { start: 3190, duration: 60, type: 'word', wordIdx: 1 },
  { start: 3250, duration: 60, type: 'media', sceneIdx: 3 },
  { start: 3310, duration: 60, type: 'word', wordIdx: 2 },
  { start: 3370, duration: 60, type: 'media', sceneIdx: 0, invert: true },
  { start: 3430, duration: 60, type: 'word', wordIdx: 3, invert: true },
  { start: 3490, duration: 60, type: 'media', sceneIdx: 1 },
  { start: 3550, duration: 60, type: 'word', wordIdx: 4 },
  { start: 3610, duration: 60, type: 'media', sceneIdx: 2 },
  { start: 3670, duration: 60, type: 'word', wordIdx: 0, invert: true },
];

const PINCH_START_MS = 2300;
const TOTAL_STROBE_MS = 3730;

// Synthesize mechanical camera shutter click using Web Audio API
function playShutterClick(audioCtx, intensity = 1) {
  if (!audioCtx || audioCtx.state !== 'running') return;
  try {
    const now = audioCtx.currentTime;
    const bufferSize = Math.floor(audioCtx.sampleRate * 0.045);
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (audioCtx.sampleRate * 0.008));
    }

    // Attack click (3800Hz bandpass)
    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3400, now);
    filter.Q.setValueAtTime(1.8, now);

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.28 * intensity, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);
    whiteNoise.start(now);

    // Secondary mechanical mirror return (28ms later, 1800Hz)
    const returnSource = audioCtx.createBufferSource();
    returnSource.buffer = noiseBuffer;
    const returnFilter = audioCtx.createBiquadFilter();
    returnFilter.type = 'bandpass';
    returnFilter.frequency.setValueAtTime(1800, now + 0.026);
    const returnGain = audioCtx.createGain();
    returnGain.gain.setValueAtTime(0.16 * intensity, now + 0.026);
    returnGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    returnSource.connect(returnFilter);
    returnFilter.connect(returnGain);
    returnGain.connect(audioCtx.destination);
    returnSource.start(now + 0.026);
  } catch {
    // Ignore audio context errors if blocked
  }
}

export default function Preloader({ onComplete }) {
  const preloaderRef = useRef(null);
  const frameRef = useRef(null);
  const wordRef = useRef(null);
  const probeRef = useRef(null);
  const videoRef = useRef(null);
  const topBarRef = useRef(null);
  const botBarRef = useRef(null);
  const audioCtxRef = useRef(null);

  const [activeCut, setActiveCut] = useState(CUT_SCHEDULE[0]);
  const [wordFontSize, setWordFontSize] = useState(180);
  const [grainOffset, setGrainOffset] = useState({ x: 0, y: 0 });
  const [showUnmute, setShowUnmute] = useState(true);
  const [isSplitting, setIsSplitting] = useState(false);

  // Measure exact Impact word width & cap-height to fit 90% W / 76% H (or 100% W/H when full: true)
  const computeWordSize = useCallback((wordText, isFull) => {
    const probe = probeRef.current;
    if (!probe) return 180;
    probe.textContent = wordText;
    const probeWidth = probe.getBoundingClientRect().width || 300;
    const W = window.innerWidth;
    const H = window.innerHeight;
    const capRatio = 0.78;

    if (isFull) {
      return Math.min((100 * W) / probeWidth, H / capRatio);
    }
    return Math.min((100 * (0.9 * W)) / probeWidth, (0.76 * H) / capRatio);
  }, []);

  // Unlock Web Audio on click/key interaction
  const handleUnlockAudio = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      playShutterClick(audioCtxRef.current, 1);
      setShowUnmute(false);
    } catch {
      setShowUnmute(false);
    }
  }, []);

  useEffect(() => {
    // Lock page scroll during preloader
    const html = document.documentElement;
    html.classList.add('pl-lock');

    const vid = videoRef.current;
    if (vid) {
      vid.play().catch(() => {});
    }

    // Set initial word size
    const firstWord = WORDS_PHOTO[CUT_SCHEDULE[0].wordIdx];
    setWordFontSize(computeWordSize(firstWord, false));

    const timeouts = [];
    const startTime = performance.now();

    // Schedule all 31 cuts
    CUT_SCHEDULE.forEach((cut, index) => {
      const t = setTimeout(() => {
        setActiveCut(cut);

        if (cut.type === 'word') {
          const text = WORDS_PHOTO[cut.wordIdx];
          setWordFontSize(computeWordSize(text, !!cut.full));
        } else if (cut.type === 'media') {
          setGrainOffset({
            x: Math.floor(Math.random() * 256),
            y: Math.floor(Math.random() * 256),
          });
          if (vid && vid.readyState >= 2) {
            const targetTime = VIDEO_SEEK_TIMES[cut.sceneIdx % VIDEO_SEEK_TIMES.length];
            try {
              vid.currentTime = targetTime + (index * 0.12) % 2.2;
            } catch {
              // ignore seek error
            }
          }
          playShutterClick(audioCtxRef.current, index > 12 ? 0.75 : 1);
        }
      }, cut.start);
      timeouts.push(t);
    });

    // Hide "click to unmute" automatically at 2750ms
    timeouts.push(
      setTimeout(() => {
        setShowUnmute(false);
      }, 2750)
    );

    // Phase 2: Letterbox shutter bars pinch from 2300ms to 3730ms
    const updateShutterPinch = () => {
      const elapsed = performance.now() - startTime;
      if (elapsed >= PINCH_START_MS && elapsed <= TOTAL_STROBE_MS) {
        const progress = Math.min(
          Math.max(0, (elapsed - PINCH_START_MS) / (TOTAL_STROBE_MS - PINCH_START_MS)),
          1
        );
        // Sine.inOut easing from 0 -> 1
        const scale = (1 - Math.cos(progress * Math.PI)) / 2;
        gsap.set([topBarRef.current, botBarRef.current], { scaleY: scale });
      }
    };
    gsap.ticker.add(updateShutterPinch);

    // Phase 3: At 3730ms, close shutter bars completely, hold 120ms, then split apart over 0.9s
    const finishTimer = setTimeout(() => {
      gsap.ticker.remove(updateShutterPinch);
      gsap.set([topBarRef.current, botBarRef.current], { scaleY: 1 });
      setIsSplitting(true);

      gsap
        .timeline({
          onComplete: () => {
            html.classList.remove('pl-lock');
            if (onComplete) onComplete();
          },
        })
        .to(
          topBarRef.current,
          {
            yPercent: -100,
            duration: 0.9,
            ease: 'power4.out',
          },
          0.12
        )
        .to(
          botBarRef.current,
          {
            yPercent: 100,
            duration: 0.9,
            ease: 'power4.out',
          },
          '<'
        );
    }, TOTAL_STROBE_MS);
    timeouts.push(finishTimer);

    const handleResize = () => {
      if (activeCut.type === 'word') {
        setWordFontSize(computeWordSize(WORDS_PHOTO[activeCut.wordIdx], !!activeCut.full));
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      timeouts.forEach(clearTimeout);
      gsap.ticker.remove(updateShutterPinch);
      window.removeEventListener('resize', handleResize);
      html.classList.remove('pl-lock');
    };
  }, [computeWordSize, onComplete]);

  const isWord = activeCut.type === 'word';
  const currentWord = isWord ? WORDS_PHOTO[activeCut.wordIdx] : '';

  return (
    <div
      id="preloader"
      ref={preloaderRef}
      className={`preloader on ${isSplitting ? 'is-splitting' : ''}`}
      onClick={handleUnlockAudio}
    >
      {/* Hidden measurement probe for dynamic viewport-fitting Impact typography */}
      <span ref={probeRef} className="pl-word pl-probe" aria-hidden="true">
        AMBADI
      </span>

      {/* Center Strobe Stage (removed once shutter bars close at 3730ms) */}
      {!isSplitting && (
        <div
          ref={frameRef}
          className={`pl-frame ${
            isWord
              ? activeCut.invert
                ? 'is-cinnabar'
                : 'is-black'
              : 'is-media'
          }`}
        >
          {/* Giant Impact Word Cut */}
          {isWord && (
            <span
              ref={wordRef}
              className={`pl-word ${activeCut.full ? 'is-full' : ''}`}
              style={{ fontSize: `${wordFontSize}px` }}
            >
              {currentWord}
            </span>
          )}

          {/* Provided Preloader Video Cut (`prealoder video for build.mp4`) */}
          <div
            className={`pl-cut ${!isWord ? 'is-visible' : ''} ${
              activeCut.flip ? 'is-flipped' : ''
            } ${activeCut.invert && !isWord ? 'is-inverted' : ''}`}
            style={{
              '--grain-x': `${grainOffset.x}px`,
              '--grain-y': `${grainOffset.y}px`,
            }}
          >
            <video
              ref={videoRef}
              src="/videos/preloader-build.mp4"
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
              className="pl-video"
            />
          </div>
        </div>
      )}

      {/* Top & Bottom Letterbox Shutter Bars */}
      <div ref={topBarRef} className="pl-bar pl-bar--t" />
      <div ref={botBarRef} className="pl-bar pl-bar--b" />

      {/* Bottom-Right Audio Prompt */}
      {showUnmute && !isSplitting && (
        <button
          type="button"
          className="pl-unmute"
          onClick={(e) => {
            e.stopPropagation();
            handleUnlockAudio();
          }}
        >
          click to unmute
        </button>
      )}
    </div>
  );
}

