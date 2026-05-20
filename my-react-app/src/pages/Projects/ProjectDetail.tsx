import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaGithub, FaGlobe, FaPlay } from 'react-icons/fa';
import huffman from '../../assets/huffman.png';
import cpu from '../../assets/cpu.png';
import linear from '../../assets/linear.png';
import arcGIS from '../../assets/arcGIS.png';
import pathPetal from '../../assets/pathPetal.png';
import psychaide from '../../assets/psychaide.png';
import beattorrent from '../../assets/beattorrent.png';
import smartMirror from '../../assets/smartMirror.png';

interface ProjectDetails {
  title: string;
  date: string;
  imgPath: string;
  description: string;
  challenge: string;
  solution: string;
  features: string[];
  technologies: string[];
  outcome: string;
  githubUrl?: string;
  devpostUrl?: string;
  websiteUrl?: string;
  demoUrl?: string;
}

const projectDetails: Record<string, ProjectDetails> = {
  'smart-mirror': {
    title: 'Smart Mirror',
    date: 'Mar – May 2026',
    imgPath: smartMirror,
    description:
      'A Raspberry Pi smart mirror that combines computer-vision face recognition, hand-gesture and voice control, and a fully configurable widget layout to display personalized weather, transit, news, fitness data, and an AI chat assistant behind a two-way mirror.',
    challenge:
      'Off-the-shelf smart mirrors are static, single-user, and hard-coded to a small set of widgets. Building one that identifies individual household members, swaps layouts on the fly, stays usable hands-free, and still runs on a low-power Raspberry Pi required stitching together camera, ML, real-time, and serverless infrastructure into a single device that boots straight into a kiosk.',
    solution:
      'Built a three-tier system: a Flask backend on the Pi running face recognition, MediaPipe gestures, Vosk speech, and third-party API proxies; a Vite/React mirror UI that renders per-user widget layouts; and a separate Vite/React layout editor for drag-and-drop customization. Heavy face-encoding work is offloaded to a Modal serverless function so the Pi only handles real-time inference.',
    features: [
      'Per-user face recognition with Picamera2 + dlib/face_recognition, with encodings cached in Supabase and hot-reloaded across the running backend',
      'Modal serverless face registration endpoint so CPU-heavy encoding never runs on the Pi',
      'Drag-and-drop widget layout editor that saves per-user layouts to Supabase and a global default layout for guests',
      '10+ pluggable widgets including clock, weather, hourly forecast, news, transit directions, live sports scores, YouTube reels, greeting, Whoop health stats, and Jarvis chat',
      'Hands-free gesture control via MediaPipe for swiping through the reels widget',
      '"Jarvis" voice assistant powered by xAI Grok with a take_picture tool that grabs a camera frame for vision-based questions like "how do I look?"',
      'Wake-word detection with openWakeWord, on-device speech recognition with Vosk, and Deepgram Aura streaming TTS for replies',
      'Backend API proxies for Google Routes, Nominatim geocoding, YouTube Shorts, ESPN scoreboards, BBC/Reuters/FT/WSJ RSS, and the Whoop API, with caching to stay inside free-tier quotas',
      'Chromium kiosk auto-start on Pi OS Bookworm (labwc/Wayland) with a deploy script that pulls latest, rebuilds the frontend on change, and relaunches cleanly',
    ],
    technologies: [
      'Python',
      'Flask',
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'OpenCV',
      'dlib + face_recognition',
      'MediaPipe',
      'Vosk + openWakeWord',
      'Deepgram Aura (TTS)',
      'xAI Grok',
      'Modal (serverless face encoding)',
      'Supabase (Postgres)',
      'Raspberry Pi + Picamera2',
      'Vercel + Fly.io',
    ],
    outcome:
      'Shipped a fully working smart mirror running on a Raspberry Pi that boots straight into a kiosk display, recognizes each household member by face, swaps in their personalized widget layout, and accepts hands-free gesture and "Hey Jarvis" voice commands — built end-to-end with two teammates.',
    githubUrl: 'https://github.com/danieljcohen/smart_mirror',
    websiteUrl: 'https://smart-mirror-nyc.vercel.app/',
    demoUrl: 'https://www.youtube.com/watch?v=0xkcym0IX30',
  },
  beattorrent: {
    title: 'BeatTorrent',
    date: 'Nov 2025',
    imgPath: beattorrent,
    description:
      'A distributed peer-to-peer music streaming system where peers collaboratively stream audio chunks from one another using WebRTC, minimizing server bandwidth while enabling distributed content delivery.',
    challenge:
      'Traditional music streaming relies on centralized servers, creating high bandwidth costs and single points of failure. Additionally, keeping multiple listeners synchronized during collaborative playback is challenging.',
    solution:
      'Built a BitTorrent-inspired P2P streaming system using WebRTC DataChannels for direct peer-to-peer chunk transfer, with a WebSocket signaling server handling only control signals and peer discovery.',
    features: [
      'WebRTC DataChannels for direct peer-to-peer audio chunk transfer',
      'BitTorrent-inspired chunk distribution with bitmap-based piece availability and rarity-weighted selection',
      'Multi-phase scheduling (startup, stable, endgame) for optimal download performance',
      'Browser-based playback using Media Source Extensions (MSE) with automatic rebuffering',
      'Playback synchronization across peers with drift correction (±100ms accuracy)',
      'TURN server fallback for NAT traversal on restrictive networks',
      'Real-time D3.js network visualization of P2P mesh topology',
    ],
    technologies: [
      'Python',
      'FastAPI',
      'WebSockets',
      'JavaScript (ES6 Modules)',
      'WebRTC',
      'Media Source Extensions (MSE)',
      'D3.js',
      'Docker',
      'Fly.io',
    ],
    outcome:
      'Deployed a fully functional P2P streaming platform that reduces server bandwidth by enabling direct peer-to-peer content delivery while maintaining synchronized playback across all connected viewers.',
    githubUrl: 'https://github.com/danieljcohen/beat-torrent',
    websiteUrl: 'https://beat-torrent.fly.dev/',
  },
  psychaide: {
    title: 'PsychAIde',
    date: 'Jan – May 2025',
    imgPath: psychaide,
    description:
      'Worked as a product manager and developer to build a comprehensive HIPAA-compliant web application for forensic psychologists and mental health professionals who conduct court-ordered evaluations.',
    challenge:
      'Forensic psychologists face significant administrative burdens managing court-ordered evaluations, including document preparation, time tracking, and maintaining HIPAA compliance while handling sensitive case information.',
    solution:
      'PsychAIde provides an all-in-one platform that streamlines case management, automates document generation, simplifies time tracking, and ensures secure file storage in a HIPAA-compliant environment.',
    features: [
      'Case management system for tracking evaluations from referral to completion',
      'Automated invoice generation',
      'Time tracking and categorization of evaluation activities',
      'Invoice management with billing status tracking',
      'HIPAA-compliant secure file storage for case documents',
      'Dashboard analytics for visual tracking of case progress and workload',
    ],
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'PostgreSQL',
      'NextAuth.js with Azure AD',
      'jsPDF for document generation',
      'Natural language processing libraries',
    ],
    outcome:
      'Developed a secure, efficient platform that reduces administrative overhead for mental health professionals, enabling them to focus more on evaluation quality while maintaining proper documentation and billing practices, used by 30+ professionals.',
    websiteUrl: 'https://psychaide.vercel.app/',
    demoUrl: 'https://youtu.be/7mu6JrY0n7I',
  },
  'petal-path': {
    title: 'Petal & Path',
    date: 'Feb 2025',
    imgPath: pathPetal,
    description:
      'An environmental conservation platform that enables hikers to identify and track invasive plant species, contributing to ecosystem preservation through crowdsourced data collection.',
    challenge:
      'Invasive plant species are causing significant damage to local ecosystems, with studies showing a 25-40% reduction in native plant diversity in affected areas. Hikers often encounter these plants but lack the knowledge to identify them or a way to report sightings.',
    solution:
      'We created a web platform that uses AI-powered image recognition to help users identify potentially invasive plants. When confirmed invasive, plants are marked on an interactive map, creating a crowdsourced database accessible to hikers and environmental organizations.',
    features: [
      'Camera-based plant identification using Plant.ID API',
      'Interactive map showing reported invasive species locations',
      'User-friendly interface for reporting and tracking invasive plants',
      'Data dashboard for environmental organizations',
      'Removal verification system to update the map when plants are removed',
    ],
    technologies: [
      'React.js',
      'Firebase',
      'Flask',
      'Google Maps API',
      'Plant.ID API',
      'OpenAI integration',
      'Google Cloud',
    ],
    outcome:
      'Placed second in HackDuke 2025. Successfully created a platform that enables identification and tracking of invasive plant species, demonstrating the potential of crowdsourced environmental data collection.',
    githubUrl: 'https://github.com/Kethan-p/PathAndPetal',
    devpostUrl: 'https://devpost.com/software/petal-path',
  },
  'arcgis-care': {
    title: 'ArcGIS Care',
    date: 'July 2024',
    imgPath: arcGIS,
    description:
      'Developed an app to track medical equipment via cameras, presented to 500+ attendees in the hackathon finalist round.',
    challenge:
      'Hospitals often struggle with tracking critical medical equipment like gurneys and crash carts, leading to inefficiencies and delayed patient care.',
    solution:
      'Created a computer vision system using YOLOv8 to track gurneys and crash carts in real-time, integrated with geospatial visualization.',
    features: [
      'Real-time tracking of medical equipment via camera feeds',
      'Equipment location visualization on hospital floor plans',
      'Alerts for equipment shortages in critical areas',
    ],
    technologies: [
      'Python',
      'JavaScript',
      'YOLOv3 Tiny API',
      'FastAPI websocket',
      'React.js',
      'Vector Tile Feature Service',
      'ArcGIS JS APIs',
      'ArcGIS Maps SDK for JavaScript',
    ],
    outcome:
      'Achieved 91% accuracy in identifying and tracking medical equipment within a 15-foot range, significantly improving hospital resource management.',
    githubUrl: 'https://github.com/danieljcohen/EsriHackathon',
    devpostUrl: 'https://devpost.com/software/asset-tracker-system',
  },
  'ocr-calculator': {
    title: 'OCR Linear Algebra Calculator',
    date: 'May 2024',
    imgPath: linear,
    description:
      'Created a command-line based Python tool to solve matrix problems from images without external math libraries.',
    challenge:
      'While taking a linear algebra course, I wanted to practice solving problems by hand while sharpening my coding skills.',
    solution:
      'I coded all the operations from scratch to reinforce my understanding of the concepts. Manually entering matrices was a pain, so I implemented OCR to convert images directly to matrices.',
    features: [
      'Image-to-matrix conversion using OCR',
      'Support for addition, subtraction, multiplication, and inversion operations',
      'Determinant and eigenvalue calculations',
    ],
    technologies: [
      'Python',
      'Custom OCR implementation',
      'Linear algebra algorithms',
      'Image processing techniques',
    ],
    outcome:
      'Achieved 97% accuracy in character recognition within matrices, while practicing linear algebra concepts.',
    githubUrl: 'https://github.com/danieljcohen/Linear-Coding',
  },
  'logisim-cpu': {
    title: 'Logisim CPU',
    date: 'December 2023',
    imgPath: cpu,
    description:
      'Designed and implemented a 16-bit CPU with 9 functional units, including ALU, control unit, and registers.',
    challenge:
      'Creating a fully functional CPU architecture that balances complexity and educational value for understanding computer architecture fundamentals.',
    solution:
      'Designed a custom instruction set architecture and implemented it in Logisim with a complete datapath and control logic.',
    features: [
      '16-bit architecture with 9 functional units',
      'Custom instruction set with 16 operations',
      'Register file with general-purpose registers',
      'Support for arithmetic, logical, and control flow operations',
    ],
    technologies: [
      'Logisim',
      'Digital logic design',
      'Computer architecture principles',
      'Instruction set architecture design',
    ],
    outcome:
      'Successfully integrated a set of 16 instructions into the CPU, enabling complex arithmetic and logical operations with efficient execution.',
  },
  'huffman-compression': {
    title: 'Huffman Compression Program',
    date: 'March 2023',
    imgPath: huffman,
    description:
      'Implemented Huffman Compression in Java, achieving data compression for files ranging up to 12 GB in size.',
    challenge:
      'Efficient compression of large files without significant loss of data integrity or excessive processing time.',
    solution:
      'Developed a Huffman coding implementation with optimized binary tree traversal for encoding and decoding.',
    features: [
      'Variable-length prefix coding for efficient compression',
      'Support for files up to 12 GB in size',
      'Lossless compression and decompression',
      'Detailed compression statistics reporting',
    ],
    technologies: [
      'Java',
      'Binary trees',
      'Huffman coding algorithm',
      'File I/O operations',
      'Data structure optimization',
    ],
    outcome:
      'Achieved 43% faster compression and decompression compared to traditional methods, with optimal space efficiency.',
    githubUrl: 'https://gitfront.io/r/user-4257705/ntyjaLzjW2Ff/huffman-compression/',
  },
};

const ProjectDetail: React.FC = () => {
  const { projectName } = useParams<{ projectName: string }>();
  const navigate = useNavigate();
  const project = projectName ? projectDetails[projectName] : null;

  const heroRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  if (!project) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-6">
        <div className="rounded-3xl border border-white/10 bg-ink-900/60 p-10 text-center backdrop-blur">
          <p className="font-display text-2xl text-white">Project not found</p>
          <p className="mt-2 text-sm text-white/60">"{projectName}" isn't here yet.</p>
          <button
            onClick={() => navigate('/projects')}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white"
          >
            <FaArrowLeft /> Back to projects
          </button>
        </div>
      </div>
    );
  }

  const projectKeys = Object.keys(projectDetails);
  const currentIndex = projectKeys.indexOf(projectName!);
  const nextProject = projectKeys[(currentIndex + 1) % projectKeys.length];

  return (
    <div className="relative">
      {/* HERO */}
      <div ref={heroRef} className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <motion.div
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0"
        >
          <img
            src={project.imgPath}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        </motion.div>
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/30"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(138,92,255,0.3),transparent_60%)]" />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-12">
          <button
            onClick={() => navigate(-1)}
            className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-sm text-white/80 backdrop-blur transition-colors hover:border-accent-400/40 hover:text-white"
          >
            <FaArrowLeft size={12} /> Back
          </button>

          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/55"
          >
            {project.date}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 text-balance text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl"
          >
            {project.title}
          </motion.h1>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {project.websiteUrl && (
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-xs text-white/85 backdrop-blur transition-colors hover:border-emerald-400/40 hover:text-white"
              >
                <FaGlobe size={12} /> Live site
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-xs text-white/85 backdrop-blur transition-colors hover:border-rose-400/40 hover:text-white"
              >
                <FaPlay size={10} /> Watch demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-xs text-white/85 backdrop-blur transition-colors hover:border-accent-400/40 hover:text-white"
              >
                <FaGithub size={12} /> Source
              </a>
            )}
            {project.devpostUrl && (
              <a
                href={project.devpostUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-xs text-white/85 backdrop-blur transition-colors hover:border-blue-400/40 hover:text-white"
              >
                Devpost
              </a>
            )}
          </motion.div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Sticky TOC */}
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-32">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                Contents
              </div>
              <nav className="mt-4 space-y-2 text-sm text-white/60">
                <a href="#overview" className="block transition-colors hover:text-white">
                  Overview
                </a>
                <a href="#challenge" className="block transition-colors hover:text-white">
                  Challenge
                </a>
                <a href="#solution" className="block transition-colors hover:text-white">
                  Solution
                </a>
                <a href="#features" className="block transition-colors hover:text-white">
                  Features
                </a>
                <a href="#stack" className="block transition-colors hover:text-white">
                  Stack
                </a>
                <a href="#outcome" className="block transition-colors hover:text-white">
                  Outcome
                </a>
              </nav>
            </div>
          </aside>

          <div className="lg:col-span-9">
            <Section id="overview" title="Overview">
              <p>{project.description}</p>
            </Section>

            <div className="mt-16 grid gap-10 md:grid-cols-2">
              <Section id="challenge" title="Challenge">
                <p>{project.challenge}</p>
              </Section>
              <Section id="solution" title="Solution">
                <p>{project.solution}</p>
              </Section>
            </div>

            <Section id="features" title="Features">
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {project.features.map((f, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.45, delay: i * 0.04 }}
                    className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-4 text-sm text-white/75"
                  >
                    <span className="mt-0.5 font-mono text-[10px] text-white/35">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{f}</span>
                  </motion.li>
                ))}
              </ul>
            </Section>

            <Section id="stack" title="Stack">
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Section>

            <Section id="outcome" title="Outcome">
              <p>{project.outcome}</p>
            </Section>
          </div>
        </div>

        {/* Footer nav */}
        <div className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
          <button
            onClick={() => navigate('/projects')}
            className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
          >
            <FaArrowLeft size={12} /> All projects
          </button>
          <Link
            to={`/projects/${nextProject}`}
            className="group inline-flex items-center gap-2 text-sm font-medium text-white"
          >
            Next: {projectDetails[nextProject].title}
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const Section: React.FC<{
  id: string;
  title: string;
  children: React.ReactNode;
}> = ({ id, title, children }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className="mt-14 first:mt-0"
  >
    <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
      {title}
    </h2>
    <div className="mt-4 max-w-3xl text-pretty leading-relaxed text-white/65">
      {children}
    </div>
  </motion.section>
);

export default ProjectDetail;
