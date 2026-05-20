import React, { useRef } from 'react';

interface SpotlightProps {
  children: React.ReactNode;
  className?: string;
  size?: number;
  color?: string;
}

/**
 * Renders children with a soft mouse-following spotlight overlay.
 * Tracks cursor via CSS custom properties for performant updates.
 */
const Spotlight: React.FC<SpotlightProps> = ({
  children,
  className = '',
  size = 500,
  color = 'rgba(138, 92, 255, 0.18)',
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    ref.current.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden ${className}`}
      style={{
        // CSS variables consumed by ::before pseudo via inline style
        ['--spotlight-size' as string]: `${size}px`,
        ['--spotlight-color' as string]: color,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(var(--spotlight-size) circle at var(--mx, 50%) var(--my, 50%), var(--spotlight-color), transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
};

export default Spotlight;
