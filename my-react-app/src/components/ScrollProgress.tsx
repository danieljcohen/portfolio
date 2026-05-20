import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Slim animated progress bar that tracks page scroll, fixed to the top.
 */
const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.4,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-gradient-to-r from-accent-600 via-accent-400 to-cyan-400"
    />
  );
};

export default ScrollProgress;
