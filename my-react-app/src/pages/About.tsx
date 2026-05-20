import React, { useEffect, useMemo, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
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
import pathPetal from '../assets/pathPetal.png';
import Spotlight from '../components/Spotlight';
import MagneticButton from '../components/MagneticButton';

/* ==========================================================================
 * 3D Scene (preserved from previous version)
 * ==========================================================================*/
const Computer: React.FC = () => {
  const computerRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (computerRef.current) {
      computerRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.04;
      computerRef.current.rotation.y =
        Math.sin(state.clock.getElapsedTime() * 0.3) * 0.08;
    }
  });

  const codeTexture = useMemo(() => createCodeTexture(), []);

  return (
    <group ref={computerRef}>
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 1.3, 0.1]} />
        <meshStandardMaterial color="#0b0b14" metalness={0.85} roughness={0.18} />
        <mesh position={[0, 0, 0.06]} castShadow>
          <boxGeometry args={[1.85, 1.15, 0.01]} />
          <meshStandardMaterial color="#0a0a18" emissive="#1a0e3a" emissiveIntensity={0.5} />
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[1.78, 1.08]} />
            <meshBasicMaterial>
              <canvasTexture attach="map" image={codeTexture} needsUpdate />
            </meshBasicMaterial>
          </mesh>
        </mesh>
      </mesh>

      <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.4, 0.1]} />
        <meshStandardMaterial color="#0a0a14" metalness={0.7} roughness={0.3} />
      </mesh>

      <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 0.1, 0.4]} />
        <meshStandardMaterial color="#0a0a14" metalness={0.7} roughness={0.3} />
      </mesh>

      <mesh position={[0, -0.6, 0.6]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.05, 0.6]} />
        <meshStandardMaterial color="#16161e" metalness={0.55} roughness={0.5} />
        <group position={[0, 0.03, 0]}>
          {Array.from({ length: 6 }).map((_, row) =>
            Array.from({ length: 15 }).map((_, col) => (
              <mesh
                key={`${row}-${col}`}
                position={[(col - 7) * 0.1, 0, (row - 2.5) * 0.09]}
                scale={[0.08, 0.01, 0.07]}
              >
                <boxGeometry />
                <meshStandardMaterial color="#222" />
              </mesh>
            )),
          )}
        </group>
      </mesh>

      <mesh
        position={[1.2, -0.6, 0.6]}
        castShadow
        receiveShadow
        rotation={[0, 0, 0]}
      >
        <capsuleGeometry args={[0.08, 0.2, 4, 8]} />
        <meshStandardMaterial color="#16161e" metalness={0.55} roughness={0.5} />
      </mesh>

      <Float speed={1.2} floatIntensity={1.4} rotationIntensity={0.5}>
        <mesh position={[-1.6, 0.4, -0.6]} rotation={[0.5, 0.5, 0]}>
          <torusGeometry args={[0.25, 0.02, 16, 64]} />
          <meshStandardMaterial color="#a078ff" emissive="#5a2bff" emissiveIntensity={0.8} />
        </mesh>
      </Float>
      <Float speed={1.6} floatIntensity={1.2} rotationIntensity={0.6}>
        <mesh position={[1.7, 1, -0.4]} rotation={[0.3, 0.2, 0.4]}>
          <icosahedronGeometry args={[0.18, 0]} />
          <meshStandardMaterial color="#22d3ee" emissive="#0ea5e9" emissiveIntensity={0.5} wireframe />
        </mesh>
      </Float>
    </group>
  );
};

const createCodeTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#0a0a18';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const lines = [
    'import { build, ship } from "daniel";',
    '',
    'const Portfolio = async () => {',
    '  const [ideas, set] = useState([]);',
    '',
    '  useEffect(() => {',
    '    fetch("/now").then(r => r.json())',
    '      .then(set);',
    '  }, []);',
    '',
    '  return ideas.map(make => (',
    '    <Project key={make.id}>',
    '      {make.delight}',
    '    </Project>',
    '  ));',
    '};',
    '',
    'export default Portfolio;',
  ];

  ctx.font = '14px "JetBrains Mono", monospace';
  const colors = {
    keywords: '#c4a8ff',
    functions: '#7ee787',
    strings: '#f9d77a',
    constants: '#bd93f9',
    brackets: '#e6e6f0',
    default: '#79c0ff',
    jsx: '#ff9bb3',
    comments: '#6e7681',
  };

  lines.forEach((line, index) => {
    const y = 24 + index * 22;
    let x = 22;
    const parts = line.split(
      /(import|from|const|let|function|return|useEffect|useState|=>|{|}|\(|\)|<|>|\/\/.*$|".*?"|'.*?'|=|,|;|\.|className)/g,
    );
    parts.forEach((part) => {
      if (!part) return;
      if (/import|from|const|let|function|return|useEffect|useState|=>|async/.test(part)) {
        ctx.fillStyle = colors.keywords;
      } else if (/".*?"|'.*?'/.test(part)) {
        ctx.fillStyle = colors.strings;
      } else if (/\{|\}|\(|\)|<|>|=|,|;|\./.test(part)) {
        ctx.fillStyle = colors.brackets;
      } else if (/[A-Z][a-zA-Z]+/.test(part)) {
        ctx.fillStyle = colors.constants;
      } else if (/className/.test(part)) {
        ctx.fillStyle = colors.jsx;
      } else if (/\/\/.*$/.test(part)) {
        ctx.fillStyle = colors.comments;
      } else if (/\w+\(/.test(part)) {
        ctx.fillStyle = colors.functions;
      } else {
        ctx.fillStyle = colors.default;
      }
      ctx.fillText(part, x, y);
      x += ctx.measureText(part).width;
    });
  });

  return canvas;
};

/* ==========================================================================
 * Side projects shown alongside featured one
 * ==========================================================================*/
const sideProjects = [
  {
    img: beattorrent,
    title: 'BeatTorrent',
    blurb: 'P2P music streaming over WebRTC.',
    date: 'Nov 2025',
    route: 'beattorrent',
  },
  {
    img: pathPetal,
    title: 'Path & Petal',
    blurb: '2nd place, HackDuke 2025.',
    date: 'Feb 2025',
    route: 'petal-path',
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
                Daniel Cohen.
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
              <Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }}>
                <color attach="background" args={['#0b0b14']} />
                <fog attach="fog" args={['#0b0b14', 3, 10]} />
                <Suspense fallback={null}>
                  <ambientLight intensity={0.5} />
                  <spotLight
                    position={[5, 5, 5]}
                    intensity={0.9}
                    castShadow
                    penumbra={1}
                    color="#bba8ff"
                  />
                  <directionalLight position={[-5, 5, -5]} intensity={0.4} />
                  <Computer />
                  <Environment preset="city" />
                  <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.6}
                    maxPolarAngle={Math.PI / 2.1}
                    minPolarAngle={Math.PI / 3}
                  />
                </Suspense>
              </Canvas>
            </motion.div>
          </div>
        </section>
      </Spotlight>

      {/* ==================== WHO I AM ==================== */}
      <section className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Who I am.
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
            Selected work.
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
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900/40 transition-colors hover:border-white/25 lg:col-span-2 lg:row-span-2"
          >
            <Link to="/projects/psychaide" className="block h-full w-full">
              <img
                src={psychaide}
                alt="PsychAIde"
                className="absolute inset-0 h-full w-full object-cover opacity-60 transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent" />
              <div className="absolute inset-x-7 top-7 flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-white/55">
                <span>Jan – May 2025</span>
                <span>Featured</span>
              </div>
              <div className="absolute inset-x-7 bottom-7 flex flex-col gap-3">
                <h3 className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
                  PsychAIde
                </h3>
                <p className="max-w-md text-sm text-white/65">
                  HIPAA-compliant platform for forensic psychologists managing
                  court-ordered evaluations. Used by 30+ active practitioners.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {['Next.js', 'TypeScript', 'PostgreSQL'].map((t) => (
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
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900/40 transition-colors hover:border-white/25"
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
