import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  strength?: number;
}

/**
 * Wrap any element to give it a subtle magnetic pull toward the cursor.
 * Uses framer-motion for spring-smoothed translation.
 */
const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 18,
  className = '',
  ...rest
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const distance = Math.min(rect.width, rect.height) / 2;
    setCoords({
      x: (x / distance) * strength,
      y: (y / distance) * strength,
    });
  };

  const handleMouseLeave = () => setCoords({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: coords.x, y: coords.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 18, mass: 0.5 }}
      className={`inline-block ${className}`}
      {...(rest as object)}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
