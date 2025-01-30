import React, { useEffect } from 'react';
import { X, Network, ArrowRight, Shield, Bot } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with animated grid */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-xl tech-grid"
        onClick={onClose}
        style={{
          animation: 'grid-fade 8s linear infinite',
          backgroundSize: '30px 30px',
        }}
      >
        {/* Animated particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              background: `rgba(255, 107, 53, ${Math.random() * 0.5})`,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      
      {/* Modal Content */}
      <div className="relative w-full max-w-lg animate-slide-up">
        {/* Glow effects */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-xl blur opacity-30 animate-pulse"></div>
        
        <div className="glass-card cyber-border rounded-xl relative backdrop-blur-2xl">
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 glass-card hover-glow rounded-lg p-2 group z-10"
          >
            <X className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
          </button>

          {/* Content */}
          <div className="p-8">
            <div className="text-center space-y-6">
              {/* Icon */}
              <div className="inline-block glass-card cyber-border rounded-xl p-4 mb-2 animate-float">
                <Network className="w-8 h-8 text-primary" />
              </div>

              {/* Title */}
              <div>
                <h3 className="font-display text-2xl gradient-text mb-2">COMING SOON</h3>
                <div className="cyber-line w-24 mx-auto mb-4"></div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <p className="text-gray-300 font-mono text-sm leading-relaxed">
                  The FYRE platform is currently workin. Join our community to stay updated on our progress.
                </p>
                
                {/* Progress Info */}
                <div className="glass-card rounded-lg p-4 space-y-3 hover-glow">
                  <div className="flex items-center justify-between text-sm font-mono">
                    <span className="text-gray-300">Testing Stage</span>
                    <span className="text-primary">50%</span>
                  </div>
                  <div className="h-1.5 bg-gray-800/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full w-[45%] bg-gradient-to-r from-primary to-primary/80 rounded-full relative"
                    >
                      <div className="absolute top-0 right-0 h-full w-8 animate-pulse bg-gradient-to-r from-transparent to-white/20"></div>
                    </div>
                  </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: <Shield className="w-4 h-4" />, label: "Secure Trading" },
                    { icon: <Bot className="w-4 h-4" />, label: "AI Analysis" },
                  ].map((item, i) => (
                    <div key={i} className="glass-card hover-glow rounded-lg p-3 flex items-center space-x-2">
                      <div className="text-primary">{item.icon}</div>
                      <span className="text-xs font-mono text-gray-300">{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* Launch Date */}
                <div className="glass-card hover-glow rounded-lg p-4">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                    <span className="font-mono text-sm text-gray-300">BETA: FEBRUARY 3, 2025</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <a 
                  href="https://t.me/fyre_dot_run" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="tech-button block group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm gradient-text">JOIN TELEGRAM</span>
                    <ArrowRight className="w-5 h-5 text-primary transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;