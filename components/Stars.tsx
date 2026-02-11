
import React, { useMemo } from 'react';

export const Stars: React.FC<{ count?: number }> = ({ count = 15 }) => {
  const starsArray = useMemo(() => 
    [...Array(count)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      delay: `${Math.random() * 5}s`,
      opacity: Math.random() * 0.5 + 0.2
    })), [count]);

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {starsArray.map((star) => (
        <div 
          key={star.id} 
          className="absolute bg-white rounded-full animate-pulse" 
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
            opacity: star.opacity
          }}
        />
      ))}
    </div>
  );
};
