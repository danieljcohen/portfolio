import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  index?: string;
  title: React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

/**
 * Minimal section heading: a small monospace index, a thin rule, then a
 * straight typographic title. No pills, no italics, no decoration.
 */
const SectionHeading: React.FC<SectionHeadingProps> = ({
  index,
  title,
  description,
  align = 'left',
  className = '',
}) => {
  const alignClass =
    align === 'center' ? 'text-center mx-auto items-center' : 'text-left';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`flex max-w-3xl flex-col gap-6 ${alignClass} ${className}`}
    >
      {index && (
        <div
          className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-white/40 ${
            align === 'center' ? 'justify-center' : ''
          }`}
        >
          <span>{index}</span>
          <span className="h-px w-12 bg-white/15" />
        </div>
      )}
      <h2 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-[3.5rem]">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-pretty text-base leading-relaxed text-white/55 sm:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
