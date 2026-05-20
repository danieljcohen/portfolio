import React from 'react';

/**
 * Minimal fixed backdrop: a soft top vignette and a subtle dotted grid.
 * No floating blobs — those felt busy.
 */
const AmbientBackground: React.FC = () => {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950"
    >
      <div className="absolute inset-0 bg-dot-grid opacity-40" />
      <div className="absolute -top-32 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-accent-600/10 blur-[120px]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-950 to-transparent" />
    </div>
  );
};

export default AmbientBackground;
