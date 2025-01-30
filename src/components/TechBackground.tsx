import React from 'react';

const TechBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0">
      {/* Base Layer */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Hexagon Pattern */}
      <div className="absolute inset-0 hexagon-bg opacity-20"></div>
      
      {/* Tech Grid */}
      <div className="absolute inset-0 tech-grid"></div>
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-black to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent"></div>
      </div>
      
      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              background: `rgba(255, 107, 53, ${Math.random() * 0.5})`,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `pulse ${Math.random() * 3 + 2}s ease-in-out infinite ${Math.random() * -5}s`,
            }}
          />
        ))}
      </div>
      
      {/* Glowing Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute blur-3xl"
            style={{
              width: Math.random() * 300 + 200 + 'px',
              height: Math.random() * 300 + 200 + 'px',
              background: `radial-gradient(circle at center, rgba(255, 107, 53, 0.15), transparent 70%)`,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              transform: 'translate(-50%, -50%)',
              animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite ${Math.random() * -10}s`,
            }}
          />
        ))}
      </div>
      
      {/* Cyber Lines */}
      <div className="absolute inset-0">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="absolute cyber-line"
            style={{
              width: '100%',
              top: (i + 1) * 25 + '%',
              transform: 'translateY(-50%)',
              opacity: 0.3,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TechBackground;