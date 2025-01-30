import React from 'react';
import { Zap } from 'lucide-react';

const ProgressBar: React.FC = () => {
  const stages = ['RESEARCH', 'GITHUB', 'TESTING', 'BETA', 'V1'];
  const currentStage = 3; // 0-based index
  const progress = 50; // percentage

  return (
    <div className="glass-card cyber-border rounded-xl p-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Zap className="w-6 h-6 text-[#FF6B35]" />
          <h3 className="font-display text-sm">DEVELOPMENT PROGRESS</h3>
        </div>
        <div className="cyber-line w-24 mx-auto mb-4"></div>
        <p className="font-mono text-2xl gradient-text">{progress}%</p>
        <p className="font-mono text-sm text-gray-400 mt-2">BETA: FEBRUARY 3, 2025</p>
      </div>

      <div className="relative">
        {/* Progress Track */}
        <div className="h-1 bg-gray-800 rounded-full mb-8">
          <div 
            className="h-full bg-gradient-to-r from-[#FF6B35] to-[#FF8B55] rounded-full transition-all duration-500 relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute h-3 w-3 rounded-full bg-[#FF6B35] -right-1.5 -top-1 glow-effect"></div>
          </div>
        </div>

        {/* Stage Markers */}
        <div className="grid grid-cols-5 gap-4">
          {stages.map((stage, index) => {
            const isActive = index <= currentStage;
            const isCompleted = index < currentStage;

            return (
              <div key={stage} className="text-center">
                <div 
                  className={`w-4 h-4 mx-auto mb-2 rounded-full border-2 transition-all duration-300
                    ${isActive ? 'border-[#FF6B35] glow-effect' : 'border-gray-700'}
                    ${isCompleted ? 'bg-[#FF6B35]' : 'bg-black'}
                  `}
                >
                  {isCompleted && (
                    <div className="w-1.5 h-1.5 bg-white rounded-full m-auto mt-0.5"></div>
                  )}
                </div>
                <span className={`font-display text-xs tracking-wider
                  ${isActive ? 'text-[#FF6B35]' : 'text-gray-600'}
                `}>
                  {stage}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;