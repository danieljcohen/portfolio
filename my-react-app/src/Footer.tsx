import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 mt-24 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-14">
        {/* Email line */}
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
          <a
            href="mailto:danieljcohen0@gmail.com"
            className="block text-3xl font-semibold tracking-tight text-white transition-colors hover:text-white/70 sm:text-5xl md:text-6xl"
          >
            danieljcohen0@gmail.com
          </a>

          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-white/60 transition-colors hover:border-white/25 hover:text-white"
            aria-label="Back to top"
          >
            <FaArrowUp
              size={10}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
            Top
          </button>
        </div>

        {/* Links row */}
        <div className="mt-12 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-3">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">
              Sitemap
            </div>
            <ul className="mt-4 grid grid-cols-2 gap-y-2 text-sm md:grid-cols-1">
              <li>
                <Link to="/" className="text-white/65 transition-colors hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/work" className="text-white/65 transition-colors hover:text-white">
                  Work
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-white/65 transition-colors hover:text-white">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/resume" className="text-white/65 transition-colors hover:text-white">
                  Resume
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">
              Elsewhere
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/danieljcohen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/65 transition-colors hover:text-white"
                >
                  <FaGithub size={13} /> GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/daniel-cohen-0854b21ab/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/65 transition-colors hover:text-white"
                >
                  <FaLinkedin size={13} /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:danieljcohen0@gmail.com"
                  className="inline-flex items-center gap-2 text-white/65 transition-colors hover:text-white"
                >
                  <FaEnvelope size={13} /> Email
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">
              Currently
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              <span className="text-white">SWE @ Google</span>
              <span className="mx-2 text-white/30">|</span>
              Duke alum
            </p>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center">
          <div>
            © {year} Daniel Cohen
          </div>
          <div className="font-mono uppercase tracking-[0.25em]">
            NYC
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
