import React from 'react';

interface MarqueeProps {
  items: React.ReactNode[];
  reverse?: boolean;
  className?: string;
  speed?: number;
}

/**
 * Infinite horizontal marquee with edge fade mask.
 * Duplicates items so the loop is seamless.
 */
const Marquee: React.FC<MarqueeProps> = ({
  items,
  reverse = false,
  className = '',
  speed = 40,
}) => {
  return (
    <div className={`marquee-mask overflow-hidden ${className}`}>
      <div
        className={`flex shrink-0 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {[...items, ...items].map((node, i) => (
          <div key={i} className="shrink-0">
            {node}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
