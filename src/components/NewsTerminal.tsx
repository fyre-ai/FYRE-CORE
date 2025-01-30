import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const NewsTerminal: React.FC = () => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const news = [
    "FYRE AI detected emerging market patterns in DeFi protocols...",
    "Neural network predicting significant volatility in next 48h...",
    "Smart contract deployment successful: 300% efficiency increase...",
    "Real-time analysis: New trading opportunities identified...",
    "System update: Enhanced prediction accuracy by 27%..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(true);
      setCurrentNewsIndex((prev) => (prev + 1) % news.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isTyping) {
      const timeout = setTimeout(() => {
        setIsTyping(false);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [isTyping]);

  return (
    <div className="glass-card cyber-border rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Terminal className="w-6 h-6 text-[#FF6B35]" />
        <h3 className="font-display text-sm">SYSTEM FEED</h3>
      </div>
      <div className="font-mono space-y-4">
        <div className="flex items-start space-x-3">
          <span className="text-[#FF6B35] mt-1">▶</span>
          <div className="flex-1">
            <div className={`text-sm leading-relaxed ${isTyping ? 'animate-pulse' : ''}`}>
              {news[currentNewsIndex]}
            </div>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#FF6B35]/20 to-transparent mt-4"></div>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span>LIVE FEED</span>
        </div>
      </div>
    </div>
  );
};

export default NewsTerminal;