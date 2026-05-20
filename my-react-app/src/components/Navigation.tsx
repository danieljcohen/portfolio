import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface NavItem {
  to: string;
  label: string;
}

const items: NavItem[] = [
  { to: '/', label: 'About' },
  { to: '/work', label: 'Work' },
  { to: '/projects', label: 'Projects' },
  { to: '/resume', label: 'Resume' },
];

const Navigation: React.FC = () => {
  const location = useLocation();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  const activeIndex = items.findIndex((item) =>
    item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to),
  );

  // Recompute the active pill bounding box when route changes or layout shifts.
  useEffect(() => {
    const target = hoverIndex ?? activeIndex;
    const el = itemRefs.current[target];
    if (!el || !containerRef.current) {
      setIndicator((p) => ({ ...p, opacity: 0 }));
      return;
    }
    const cRect = containerRef.current.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();
    setIndicator({
      left: eRect.left - cRect.left,
      width: eRect.width,
      opacity: 1,
    });
  }, [hoverIndex, activeIndex, location.pathname]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-5">
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/10 bg-ink-900/70 p-1.5 shadow-xl shadow-black/30 backdrop-blur-xl"
      >
        {/* Brand mark */}
        <NavLink
          to="/"
          className="ml-2 mr-1 hidden items-center pr-1 sm:flex"
          aria-label="Daniel Cohen home"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-[12px] font-semibold text-white">
            D
          </span>
        </NavLink>

        <div
          ref={containerRef}
          onMouseLeave={() => setHoverIndex(null)}
          className="relative flex items-center"
        >
          {/* Sliding pill indicator */}
          <motion.span
            aria-hidden
            animate={{
              left: indicator.left,
              width: indicator.width,
              opacity: indicator.opacity,
            }}
            transition={{ type: 'spring', stiffness: 320, damping: 32, mass: 0.6 }}
            className="absolute top-1/2 h-9 -translate-y-1/2 rounded-full bg-white/10"
            style={{ width: 0 }}
          />

          {items.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              onMouseEnter={() => setHoverIndex(i)}
              className={({ isActive }) =>
                [
                  'relative z-10 px-4 py-2 text-sm font-medium tracking-tight transition-colors duration-200',
                  isActive ? 'text-white' : 'text-white/55 hover:text-white',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </motion.nav>
    </div>
  );
};

export default Navigation;
