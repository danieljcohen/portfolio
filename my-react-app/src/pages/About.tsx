import React, { useEffect, useRef, useState } from 'react';
import createGlobe, { type COBEOptions } from 'cobe';
import {
  FaGithub,
  FaLinkedin,
  FaArrowRight,
} from 'react-icons/fa';
import { HiArrowUpRight } from 'react-icons/hi2';
import { HiOutlineDownload } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import psychaide from '../assets/psychaide.png';
import beattorrent from '../assets/beattorrent.png';
import smartMirror from '../assets/smartMirror.png';
import Spotlight from '../components/Spotlight';
import MagneticButton from '../components/MagneticButton';

type CityMarker = {
  name: string;
  role: string;
  location: [number, number];
  size: number;
};

// Locations I'm from / have worked / studied. `size` is in cobe units
// (sphere radius = 1). NYC is slightly larger because it represents two
// employers (AWS + Google).
const CITIES: CityMarker[] = [
  {
    name: 'Fort Lauderdale, FL',
    role: 'Hometown',
    location: [26.1224, -80.1373],
    size: 0.05,
  },
  {
    name: 'Durham, NC',
    role: 'Duke · May 2022 – 2026',
    location: [35.994, -78.8986],
    size: 0.05,
  },
  {
    name: 'Edinburgh, UK',
    role: 'Univ. of Edinburgh · Study abroad',
    location: [55.9533, -3.1883],
    size: 0.05,
  },
  {
    name: 'Redlands, CA',
    role: 'Esri · Summer 2024',
    location: [34.0556, -117.1825],
    size: 0.05,
  },
  {
    name: 'New York, NY',
    role: 'AWS · Google',
    location: [40.7128, -74.006],
    size: 0.07,
  },
];

// Limits for camera tilt and zoom.
const THETA_LIMIT = Math.PI / 2 - 0.1; // just shy of looking straight down
const SCALE_MIN = 0.6;
const SCALE_MAX = 2.5;

// Project a [lat, lng] marker to canvas-local CSS pixels using cobe's own
// rotation math (extracted from cobe v2.0.1's `O(t)` projection function).
// Returns `visible: false` when the marker is on the back hemisphere.
const projectMarker = (
  location: [number, number],
  phi: number,
  theta: number,
  scale: number,
  cssSize: number,
) => {
  const latR = (location[0] * Math.PI) / 180;
  const lngR = (location[1] * Math.PI) / 180 - Math.PI;
  const cLat = Math.cos(latR);
  const v: [number, number, number] = [
    -cLat * Math.cos(lngR),
    Math.sin(latR),
    cLat * Math.sin(lngR),
  ];
  const cT = Math.cos(theta);
  const sT = Math.sin(theta);
  const cP = Math.cos(phi);
  const sP = Math.sin(phi);
  const x = cP * v[0] + sP * v[2];
  const y = sP * sT * v[0] + cT * v[1] - cP * sT * v[2];
  const z = -sP * cT * v[0] + sT * v[1] + cP * cT * v[2];
  return {
    x: ((x * scale + 1) / 2) * cssSize,
    y: ((-y * scale + 1) / 2) * cssSize,
    visible: z >= 0,
  };
};

const Globe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Drag state snapshot taken at pointer-down. Storing the rotation values
  // *at that moment* lets us compute the new rotation as
  //   newDragX = dragX0 + pixelDelta / sensitivity
  // which is unit-correct and won't drift between successive drags.
  const dragStartRef = useRef<{
    clientX: number;
    clientY: number;
    dragX0: number;
    dragY0: number;
  } | null>(null);
  // Accumulated drag offsets (radians). dragX adds to phi; dragY *is* theta.
  const dragXRef = useRef(0);
  const dragYRef = useRef(0);
  const scaleRef = useRef(1);

  // Track pointer-down position so we can distinguish a click from a drag.
  const pointerDownPos = useRef<{ x: number; y: number } | null>(null);
  // Shared between the rAF loop and pointer handlers / hit-tests.
  const phiRef = useRef(0);
  const sizeRef = useRef(0);
  const selectedRef = useRef<CityMarker | null>(null);
  const [selected, setSelected] = useState<CityMarker | null>(null);

  // Keep the ref in sync with state so the rAF loop can read it without
  // needing to be torn down/re-created.
  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    // The flex container with the p-6 padding owns the available space.
    const flexParent = wrapper?.parentElement;
    if (!canvas || !wrapper || !flexParent) return;

    let phi = 0;
    let size = 0;
    let rafId: number | null = null;
    let globeInstance: ReturnType<typeof createGlobe> | null = null;
    let cancelled = false;
    let initTimer: number | null = null;
    const dpr = window.devicePixelRatio || 2;

    const buildOptions = (): COBEOptions => ({
      devicePixelRatio: dpr,
      width: size * dpr,
      height: size * dpr,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      scale: 1,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [1, 0.5, 1],
      glowColor: [1, 1, 1],
      offset: [0, 0],
      markers: CITIES.map(({ location, size }) => ({ location, size })),
    });

    const applySize = (next: number) => {
      size = next;
      sizeRef.current = next;
      canvas.style.width = `${next}px`;
      canvas.style.height = `${next}px`;
      wrapper.style.width = `${next}px`;
      wrapper.style.height = `${next}px`;
    };

    const init = () => {
      if (cancelled || globeInstance || size <= 0) return;
      globeInstance = createGlobe(canvas, buildOptions());

      // cobe v2.0.1 has no internal render loop, so we drive frames ourselves.
      // Auto-rotation pauses while the user is dragging.
      const tick = () => {
        if (cancelled || !globeInstance) return;
        if (dragStartRef.current === null) {
          phi += 0.001; // ~one revolution per ~105s
        }
        const totalPhi = phi + dragXRef.current;
        const theta = dragYRef.current;
        const scale = scaleRef.current;
        phiRef.current = totalPhi;
        globeInstance.update({ phi: totalPhi, theta, scale });

        // Move the tooltip to follow the selected marker.
        const tip = tooltipRef.current;
        const sel = selectedRef.current;
        if (tip) {
          if (sel) {
            const proj = projectMarker(sel.location, totalPhi, theta, scale, size);
            if (proj.visible) {
              tip.style.transform = `translate(${proj.x}px, ${proj.y}px) translate(-50%, calc(-100% - 14px))`;
              tip.style.opacity = '1';
            } else {
              tip.style.opacity = '0';
            }
          } else {
            tip.style.opacity = '0';
          }
        }

        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    };

    const ro = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (!rect) return;
      // Largest square that fits the parent's content box.
      const next = Math.floor(Math.min(rect.width, rect.height));
      if (next <= 0 || next === size) return;
      applySize(next);
      if (globeInstance) {
        globeInstance.update({
          width: size * dpr,
          height: size * dpr,
        });
      } else if (initTimer === null) {
        // Defer one tick so StrictMode's first-mount cleanup finishes before
        // we create a new WebGL context on the same canvas.
        initTimer = window.setTimeout(() => {
          initTimer = null;
          init();
        }, 0);
      }
    });
    ro.observe(flexParent);

    // Wheel zoom. We attach via addEventListener with { passive: false } so
    // we can preventDefault — React's onWheel is passive and can't stop the
    // page from scrolling while the cursor is over the globe.
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.08 : 1 / 1.08;
      scaleRef.current = Math.min(
        SCALE_MAX,
        Math.max(SCALE_MIN, scaleRef.current * factor),
      );
    };
    canvas.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      cancelled = true;
      if (initTimer !== null) clearTimeout(initTimer);
      if (rafId !== null) cancelAnimationFrame(rafId);
      globeInstance?.destroy();
      ro.disconnect();
      canvas.removeEventListener('wheel', onWheel);
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    // Snapshot the current rotation so we can compute the new value as
    // (snapshot + pixelDelta / sensitivity). This avoids the radians/pixels
    // unit mismatch that made successive drags drift.
    dragStartRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      dragX0: dragXRef.current,
      dragY0: dragYRef.current,
    };
    pointerDownPos.current = { x: e.clientX, y: e.clientY };
    const c = canvasRef.current;
    if (c) {
      c.style.cursor = 'grabbing';
      c.setPointerCapture(e.pointerId);
    }
  };
  const endDrag = (e?: React.PointerEvent<HTMLCanvasElement>) => {
    dragStartRef.current = null;
    const c = canvasRef.current;
    if (c) {
      c.style.cursor = 'grab';
      if (e) {
        try {
          c.releasePointerCapture(e.pointerId);
        } catch {
          /* pointer was already released */
        }
      }
    }
  };
  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const start = dragStartRef.current;
    if (!start) return;
    // 200 px of drag ≈ 1 radian (~57°). Both axes use the same sign convention
    // so the surface follows the cursor: drag right → spins right, drag up →
    // tilts up (front-facing points move up on screen).
    dragXRef.current = start.dragX0 + (e.clientX - start.clientX) / 200;
    const rawTheta = start.dragY0 + (e.clientY - start.clientY) / 200;
    dragYRef.current = Math.max(-THETA_LIMIT, Math.min(THETA_LIMIT, rawTheta));
  };
  // On pointerup, if the pointer barely moved we treat it as a click and
  // hit-test against the markers; otherwise it was a drag and we just end it.
  const onPointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const down = pointerDownPos.current;
    pointerDownPos.current = null;
    const moved = down
      ? Math.hypot(e.clientX - down.x, e.clientY - down.y)
      : 0;
    endDrag(e);

    if (moved >= 5) return; // it was a drag, not a click

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const size = sizeRef.current;
    const totalPhi = phiRef.current;
    const theta = dragYRef.current;
    const scale = scaleRef.current;

    let best: CityMarker | null = null;
    // Hit radius grows with zoom so dots stay equally easy to tap.
    let bestDist = Math.max(22, size * 0.05) * scale;
    for (const c of CITIES) {
      const proj = projectMarker(c.location, totalPhi, theta, scale, size);
      if (!proj.visible) continue;
      const d = Math.hypot(proj.x - cx, proj.y - cy);
      if (d < bestDist) {
        bestDist = d;
        best = c;
      }
    }
    setSelected((prev) => (best && prev !== best ? best : null));
  };

  return (
    <div
      ref={wrapperRef}
      style={{ position: 'relative', margin: 'auto' }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          cursor: 'grab',
          touchAction: 'none',
        }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        onPointerMove={onPointerMove}
      />
      {/* Floating tooltip — positioned by the rAF loop via inline transform.
          Pointer-events:none so it never blocks dot clicks. */}
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: 0,
          pointerEvents: 'none',
          transition: 'opacity 180ms ease',
          willChange: 'transform, opacity',
        }}
      >
        {selected && (
          <div className="whitespace-nowrap rounded-lg border border-white/15 bg-ink-950/90 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/85 shadow-lg backdrop-blur">
            <div className="text-white">{selected.name}</div>
            <div className="text-white/55">{selected.role}</div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ==========================================================================
 * Side projects shown alongside featured one
 * ==========================================================================*/
const sideProjects = [
  {
    img: psychaide,
    title: 'PsychAIde',
    blurb: 'HIPAA-compliant platform for forensic psychologists.',
    date: 'Jan – May 2025',
    route: 'psychaide',
  },
  {
    img: smartMirror,
    title: 'Smart Mirror',
    blurb: 'Raspberry Pi mirror with face recognition, gesture and voice control.',
    date: 'Mar – May 2026',
    route: 'smart-mirror',
  },
];

/* ==========================================================================
 * About page
 * ==========================================================================*/
const About: React.FC = () => {
  const navigate = useNavigate();

  // Live clock for the hero status strip
  const [clock, setClock] = useState<string>('');
  useEffect(() => {
    const tick = () => {
      const fmt = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        hour: '2-digit',
        minute: '2-digit',
      });
      setClock(fmt.format(new Date()));
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative">
      {/* ==================== HERO ==================== */}
      <Spotlight className="relative" size={600}>
        <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-12 sm:pt-16 md:pb-28 lg:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-balance text-[clamp(2.75rem,8vw,6.5rem)] font-semibold leading-[0.95] tracking-tight text-white"
              >
                Daniel Cohen
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.22em] text-white/45 sm:text-[12px]"
              >
                <span className="text-white/75">Duke alum</span>
                <span className="h-3 w-px bg-white/15" />
                <span className="text-white/75">ex-AWS</span>
                <span className="h-3 w-px bg-white/15" />
                <span className="flex items-center gap-2 text-white/90">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  Currently at Google
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="mt-10 flex flex-wrap items-center gap-3"
              >
                <MagneticButton>
                  <button
                    onClick={() => navigate('/projects')}
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90"
                  >
                    See my work
                    <FaArrowRight
                      size={11}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </button>
                </MagneticButton>

                <MagneticButton strength={10}>
                  <a
                    href="/resume.pdf"
                    download="DanielCohen_Resume.pdf"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/85 transition-colors hover:border-white/30 hover:bg-white/5"
                  >
                    <HiOutlineDownload className="text-base" />
                    CV
                  </a>
                </MagneticButton>

                <div className="ml-1 flex items-center gap-1 text-white/55">
                  <a
                    href="https://github.com/danieljcohen"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="rounded-full p-2.5 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <FaGithub size={17} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/daniel-cohen-0854b21ab/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="rounded-full p-2.5 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <FaLinkedin size={17} />
                  </a>
                </div>
              </motion.div>

              {/* Location strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40"
              >
                <span>NYC</span>
                <span className="hidden h-3 w-px bg-white/15 sm:inline-block" />
                <span>{clock || '—'} ET</span>
              </motion.div>
            </div>

            {/* RIGHT: 3D scene */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-ink-900/40 lg:col-span-5"
            >
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <Globe />
              </div>

              {/* Title strip */}
              <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                Where I'm from · worked · studied
              </div>

              {/* Interaction hints */}
              <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                <span>Tap a pin</span>
                <span className="hidden sm:block">Drag · scroll to zoom</span>
              </div>
            </motion.div>
          </div>
        </section>
      </Spotlight>

      {/* ==================== WHO I AM ==================== */}
      <section className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Who I am
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="text-pretty text-2xl font-medium leading-snug text-white/85 sm:text-3xl">
              Current SWE @ Google, ex-AWS; with a track record of delivering
              full-stack applications to production and solving problems that
              directly impact users.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.22em] text-white/45 sm:text-[12px]">
              <span className="text-white/70">Duke alum</span>
              <span className="h-3 w-px bg-white/15" />
              <span className="text-white/70">CS · AI/ML concentration</span>
              <span className="h-3 w-px bg-white/15" />
              <span className="text-white/70">Stats minor</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURED + SIDE PREVIEWS ==================== */}
      <section className="relative mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-12 flex items-end justify-between gap-8">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Selected work
          </h2>
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            All projects
            <FaArrowRight
              size={11}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="grid gap-3 lg:grid-cols-3 lg:auto-rows-[280px]">
          {/* Featured tile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="group relative h-[420px] overflow-hidden rounded-2xl border border-white/10 bg-ink-900/40 transition-colors hover:border-white/25 sm:h-[480px] lg:col-span-2 lg:row-span-2 lg:h-auto"
          >
            <Link to="/projects/beattorrent" className="block h-full w-full">
              <img
                src={beattorrent}
                alt="BeatTorrent"
                className="absolute inset-0 h-full w-full object-cover opacity-60 transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent" />
              <div className="absolute inset-x-7 top-7 flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-white/55">
                <span>Nov 2025</span>
                <span>Featured</span>
              </div>
              <div className="absolute inset-x-7 bottom-7 flex flex-col gap-3">
                <h3 className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
                  BeatTorrent
                </h3>
                <p className="max-w-md text-sm text-white/65">
                  Distributed peer-to-peer music streaming with WebRTC. A
                  BitTorrent-inspired protocol with real-time D3.js mesh
                  visualization.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {['Python', 'FastAPI', 'WebRTC', 'D3.js'].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/15 bg-black/30 px-2 py-0.5 text-[11px] font-medium text-white/70 backdrop-blur"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="mt-1 inline-flex items-center gap-1.5 text-xs text-white/85">
                  Read case study
                  <HiArrowUpRight
                    size={12}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Side previews */}
          {sideProjects.map((p, i) => (
            <motion.div
              key={p.route}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.6,
                delay: 0.08 + i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative h-[280px] overflow-hidden rounded-2xl border border-white/10 bg-ink-900/40 transition-colors hover:border-white/25 sm:h-[320px] lg:h-auto"
            >
              <Link to={`/projects/${p.route}`} className="block h-full w-full">
                <img
                  src={p.img}
                  alt={p.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-50 transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-transparent" />
                <div className="absolute inset-x-5 top-5 flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-white/55">
                  <span>{p.date}</span>
                  <HiArrowUpRight
                    size={12}
                    className="text-white/70 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>
                <div className="absolute inset-x-5 bottom-5 flex flex-col gap-1.5">
                  <h3 className="text-2xl font-semibold leading-tight tracking-tight text-white">
                    {p.title}
                  </h3>
                  <p className="text-sm text-white/60">{p.blurb}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section
        id="contact"
        className="relative mx-auto max-w-7xl px-6 pb-32 pt-12"
      >
        <Spotlight size={600} className="rounded-2xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-20 text-center sm:px-12"
          >
            <h2 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
              Got an idea?
            </h2>
            <p className="mx-auto mt-5 max-w-md text-pretty text-white/55">
              Reach out if you want to collaborate on a project.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <MagneticButton>
                <a
                  href="mailto:danieljcohen0@gmail.com"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-white/90"
                >
                  danieljcohen0@gmail.com
                  <HiArrowUpRight size={13} />
                </a>
              </MagneticButton>
            </div>
          </motion.div>
        </Spotlight>
      </section>
    </div>
  );
};

export default About;
