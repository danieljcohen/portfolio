import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { HiArrowUpRight } from 'react-icons/hi2';
import huffman from '../../assets/huffman.png';
import cpu from '../../assets/cpu.png';
import linear from '../../assets/linear.png';
import arcGIS from '../../assets/arcGIS.png';
import pathPetal from '../../assets/pathPetal.png';
import psychaide from '../../assets/psychaide.png';
import beattorrent from '../../assets/beattorrent.png';
import smartMirror from '../../assets/smartMirror.png';

interface Project {
  imgPath: string;
  title: string;
  description: string;
  route: string;
  date: string;
  technologies: string[];
  githubUrl?: string;
  span: string;
  category: 'Web' | 'AI/ML' | 'Systems' | 'Hackathon';
}

const projects: Project[] = [
  {
    imgPath: smartMirror,
    title: 'Smart Mirror',
    date: 'Mar – May 2026',
    description:
      'Raspberry Pi smart mirror with face recognition, gesture and voice control, and a fully configurable widget layout — powered by an AI chat assistant behind a two-way mirror.',
    route: 'smart-mirror',
    technologies: ['Python', 'React', 'Computer Vision', 'Raspberry Pi'],
    githubUrl: 'https://github.com/danieljcohen/smart_mirror',
    span: 'md:col-span-4 md:row-span-2',
    category: 'AI/ML',
  },
  {
    imgPath: psychaide,
    title: 'PsychAIde',
    date: 'Jan – May 2025',
    description:
      'HIPAA-compliant web app for forensic psychologists. 30+ active users.',
    route: 'psychaide',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Azure AD'],
    span: 'md:col-span-2 md:row-span-2',
    category: 'Web',
  },
  {
    imgPath: beattorrent,
    title: 'BeatTorrent',
    date: 'Nov 2025',
    description:
      'Distributed peer-to-peer music streaming with WebRTC. BitTorrent-inspired protocol with real-time D3.js mesh visualization.',
    route: 'beattorrent',
    technologies: ['Python', 'FastAPI', 'WebRTC', 'D3.js'],
    githubUrl: 'https://github.com/danieljcohen/beat-torrent',
    span: 'md:col-span-4 md:row-span-2',
    category: 'Systems',
  },
  {
    imgPath: pathPetal,
    title: 'Path & Petal',
    date: 'Feb 2025',
    description:
      'Placed 2nd at HackDuke 2025. Crowdsourced invasive plant ID with AI image recognition.',
    route: 'petal-path',
    technologies: ['React', 'Firebase', 'Flask'],
    githubUrl: 'https://github.com/Kethan-p/HackDuke2025',
    span: 'md:col-span-2 md:row-span-2',
    category: 'Hackathon',
  },
  {
    imgPath: arcGIS,
    title: 'ArcGIS Care',
    date: 'Jul 2024',
    description:
      'Computer vision medical equipment tracking with 91% accuracy. Hackathon finalist.',
    route: 'arcgis-care',
    technologies: ['YOLOv8', 'FastAPI', 'React'],
    githubUrl: 'https://github.com/danieljcohen/EsriHackathon',
    span: 'md:col-span-3',
    category: 'AI/ML',
  },
  {
    imgPath: linear,
    title: 'OCR Linear Algebra',
    date: 'May 2024',
    description:
      'CLI Python tool that solves matrix problems from images — 97% accuracy.',
    route: 'ocr-calculator',
    technologies: ['Python', 'OCR', 'CV'],
    githubUrl: 'https://github.com/danieljcohen/Linear-Coding',
    span: 'md:col-span-3',
    category: 'AI/ML',
  },
  {
    imgPath: cpu,
    title: 'Logisim CPU',
    date: 'Dec 2023',
    description:
      'Custom 16-bit CPU with 9 functional units and a 16-instruction ISA.',
    route: 'logisim-cpu',
    technologies: ['Logisim', 'Architecture'],
    span: 'md:col-span-3',
    category: 'Systems',
  },
  {
    imgPath: huffman,
    title: 'Huffman Compression',
    date: 'Mar 2023',
    description:
      'Java implementation of Huffman coding. Files up to 12 GB, 43% better efficiency.',
    route: 'huffman-compression',
    technologies: ['Java', 'Algorithms'],
    githubUrl: 'https://gitfront.io/r/user-4257705/ntyjaLzjW2Ff/huffman-compression/',
    span: 'md:col-span-3',
    category: 'Systems',
  },
];

const categories = ['All', 'Web', 'AI/ML', 'Systems', 'Hackathon'] as const;
type Category = (typeof categories)[number];

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<Category>('All');

  const visible = projects.filter(
    (p) => filter === 'All' || p.category === filter,
  );

  return (
    <div className="relative">
      {/* HEADER */}
      <section className="relative mx-auto max-w-7xl px-6 pt-12">
        <div className="text-center">
          <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl">
            Projects
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm text-white/50">
            Production systems, research tools, and hackathon experiments.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-1">
          {categories.map((c) => {
            const active = filter === c;
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`relative rounded-full px-4 py-1.5 text-sm transition-colors ${
                  active ? 'text-white' : 'text-white/45 hover:text-white/80'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 -z-10 rounded-full border border-white/15 bg-white/[0.06]"
                    transition={{ type: 'spring', stiffness: 280, damping: 30 }}
                  />
                )}
                {c}
              </button>
            );
          })}
        </div>
      </section>

      {/* BENTO GRID */}
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-14">
        <motion.div
          layout
          className="grid auto-rows-[260px] grid-cols-1 gap-3 md:grid-cols-6"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <ProjectTile key={p.route} project={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
};

const ProjectTile: React.FC<{ project: Project; index: number }> = ({
  project,
  index,
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        duration: 0.45,
        delay: index * 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900/40 transition-colors hover:border-white/25 ${project.span}`}
    >
      <Link to={`/projects/${project.route}`} className="block h-full w-full">
        <img
          src={project.imgPath}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover opacity-50 transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent" />

        {/* Top meta */}
        <div className="absolute inset-x-5 top-5 flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-white/55">
          <span>{project.date}</span>
          <span>{project.category}</span>
        </div>

        {/* Bottom content */}
        <div className="absolute inset-x-5 bottom-5 flex flex-col gap-3">
          <h3 className="text-2xl font-semibold leading-tight tracking-tight text-white md:text-3xl">
            {project.title}
          </h3>
          <p className="line-clamp-2 max-w-md text-sm text-white/60">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/15 bg-black/30 px-2 py-0.5 text-[11px] font-medium text-white/70 backdrop-blur"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-1 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs text-white/85">
              View
              <HiArrowUpRight
                size={12}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label="GitHub repository"
                className="rounded-full border border-white/15 bg-black/30 p-1.5 text-white/70 backdrop-blur transition-colors hover:border-white/30 hover:text-white"
              >
                <FaGithub size={12} />
              </a>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Projects;
