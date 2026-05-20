import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import esriLogo from '../assets/esri.png';
import awsLogo from '../assets/aws.svg';
import dukeLogo from '../assets/duke.png';
import goliathLogo from '../assets/goliath.jpg';

interface Experience {
  title: string;
  date: string;
  company: string;
  location: string;
  bulletPoints: string[];
  logo: string;
  tags: string[];
}

const experiences: Experience[] = [
  {
    title: 'Software Engineer Intern',
    date: 'May 2025 – Aug 2025',
    company: 'Amazon (AWS)',
    location: 'New York, NY',
    bulletPoints: [
      'Redesigned the Playwright-based integration test architecture for Federated Connections on the SageMaker Unified Studio team, reducing test flakiness and on-call workload by 93%.',
      'Built scalable infrastructure using AWS CDK to support additional connectors, deploying Amazon-hosted databases, test data, and a secret replicator for third-party credentials across regions.',
      'Expanded test coverage by 400% while reducing testing costs by 12%, enabling broader, more efficient testing.',
    ],
    logo: awsLogo,
    tags: ['TypeScript', 'AWS CDK', 'Playwright', 'Python'],
  },
  {
    title: 'Software Engineer Intern',
    date: 'May 2024 – Aug 2024',
    company: 'Esri',
    location: 'Redlands, CA',
    bulletPoints: [
      'Developed a Python-based solution to locate detected text in indoor buildings using OCR, trigonometric calculations, and projection across coordinate systems, saving an average of 5 hours of manual data entry per customer.',
      'Utilized an ensemble method combining Keras, Tesseract, and MMOCR with an algorithm to unwarp text in 360-degree photos, achieving a 38% increase in text extraction accuracy and a 27% increase in positioning accuracy.',
      'Trained a model using PointCNN to detect desks in LiDAR data, achieving 82% accuracy on validation datasets.',
    ],
    logo: esriLogo,
    tags: ['Python', 'Keras', 'OCR', 'LiDAR', 'Computer Vision'],
  },
  {
    title: 'Software Engineer',
    date: 'May 2024 – Present',
    company: 'Duke — Hickey Lab',
    location: 'Remote',
    bulletPoints: [
      'Implemented and optimized a suite of Python-based analysis tools on the Duke Compute Cluster, integrating methods for cell segmentation, data normalization, and cellular neighborhood analysis.',
      'Analyzed data from 1,000+ stained lung cancer samples treated with immunotherapy alongside Dr. John Hickey.',
      'Conducted multiplexed tissue imaging with CODEX, mapping cellular interactions using 54 unique protein markers.',
    ],
    logo: dukeLogo,
    tags: ['Python', 'Pandas', 'CODEX', 'HPC'],
  },
  {
    title: 'Software Engineer Intern',
    date: 'March 2024',
    company: 'Goliath Data AI',
    location: 'Remote',
    bulletPoints: [
      'Created a web-based tool for real estate rehab analysis, offering interactive calculations and CSV export functionality.',
      'Developed client-side functionality using TypeScript and React.js, enabling dynamic updates and reducing server load.',
      'Adopted Tailwind CSS for UI, reducing page load times by 7% and CSS codebase size by 44% for better performance.',
    ],
    logo: goliathLogo,
    tags: ['TypeScript', 'React', 'Tailwind'],
  },
];

const TimelineItem: React.FC<{ exp: Experience; index: number }> = ({ exp, index }) => {
  const isEven = index % 2 === 0;
  const itemRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ['start 0.85', 'end 0.4'],
  });
  /*
   * Outer wrapper handles the position transform so Framer's animated
   * transform on the inner motion.div doesn't override the centering.
   */
  const dotScale = useTransform(scrollYProgress, [0, 0.4], [0.7, 1.05]);
  const dotOpacity = useTransform(scrollYProgress, [0, 0.4], [0.5, 1]);

  return (
    <div
      ref={itemRef}
      className={`relative mb-28 flex flex-col items-start md:flex-row md:items-center ${
        isEven ? 'md:flex-row-reverse' : ''
      }`}
    >
      {/* Logo node — vertically centered on the line on desktop */}
      <div className="absolute left-6 top-0 z-20 -translate-x-1/2 sm:left-8 md:left-1/2 md:top-1/2 md:-translate-y-1/2">
        <motion.div
          style={{ scale: dotScale, opacity: dotOpacity }}
          className="relative"
        >
          <div className="absolute inset-0 -m-2 rounded-full bg-accent-500/20 blur-md" />
          <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-white/40 bg-ink-900 ring-1 ring-black/40 sm:h-16 sm:w-16 md:h-20 md:w-20">
            <img
              src={exp.logo}
              alt={`${exp.company} logo`}
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`ml-20 w-[calc(100%-5rem)] sm:ml-28 sm:w-[calc(100%-7rem)] md:ml-0 md:w-5/12 ${
          isEven ? 'md:pr-16 md:text-right' : 'md:pl-16'
        }`}
      >
        <div className="group rounded-2xl border border-white/10 bg-white/[0.025] p-7 backdrop-blur-sm transition-colors hover:border-white/25 md:p-8">
          <div
            className={`flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40 ${
              isEven ? 'md:justify-end' : ''
            }`}
          >
            <span>{exp.date}</span>
            <span className="h-px w-6 bg-white/15" />
            <span>{exp.location}</span>
          </div>

          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-[1.75rem]">
            {exp.company}
          </h2>
          <h3 className="mt-1 text-sm font-medium text-white/55 md:text-base">
            {exp.title}
          </h3>

          <ul
            className={`mt-6 space-y-3 text-sm leading-relaxed text-white/70 md:text-[15px] ${
              isEven ? 'md:text-right' : ''
            }`}
          >
            {exp.bulletPoints.map((point, i) => (
              <li
                key={i}
                className={`relative pl-4 ${isEven ? 'md:pl-0 md:pr-4' : ''}`}
              >
                <span
                  className={`absolute top-2 h-1 w-1 rounded-full bg-white/40 ${
                    isEven ? 'left-0 md:left-auto md:right-0' : 'left-0'
                  }`}
                />
                {point}
              </li>
            ))}
          </ul>

          <div
            className={`mt-6 flex flex-wrap gap-1.5 ${
              isEven ? 'md:justify-end' : ''
            }`}
          >
            {exp.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-white/65"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

    </div>
  );
};

const WorkExperience: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.3', 'end 0.7'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="relative pt-12">
      {/* Heading */}
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl">
          Work
        </h1>
      </div>

      {/* Timeline — narrow on mobile, wide on desktop */}
      <div
        ref={timelineRef}
        className="relative mx-auto mt-20 w-full max-w-2xl px-6 pb-20 md:max-w-7xl md:px-10"
      >
        {/* Background line */}
        <div className="pointer-events-none absolute left-6 top-0 h-full w-px bg-white/10 sm:left-8 md:left-1/2 md:-translate-x-1/2" />

        {/* Animated progress line */}
        <motion.div
          style={{ height: lineHeight }}
          className="pointer-events-none absolute left-6 top-0 w-px bg-gradient-to-b from-accent-400 via-accent-300 to-cyan-300 sm:left-8 md:left-1/2 md:-translate-x-1/2"
        />

        {experiences.map((exp, index) => (
          <TimelineItem key={index} exp={exp} index={index} />
        ))}

        {/* End cap */}
        <div
          className="pointer-events-none absolute left-6 -translate-x-1/2 sm:left-8 md:left-1/2"
          style={{ bottom: '-4px' }}
        >
          <div className="relative">
            <div className="absolute inset-0 -m-1 animate-breathe rounded-full bg-accent-400/30 blur-md" />
            <div className="relative h-2 w-2 rounded-full bg-accent-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;
