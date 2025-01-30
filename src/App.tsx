import React, { useState, useEffect } from 'react';
import { Github, Twitter, Bot, Cpu, Database, Network, LineChart, Terminal, Shield, Zap, Code, Rocket, ArrowRight } from 'lucide-react';
import Logo from './components/Logo';
import DataFlowDiagram from './components/DataFlowDiagram';
import ProgressBar from './components/ProgressBar';
import TechBackground from './components/TechBackground';
import NewsTerminal from './components/NewsTerminal';
import Modal from './components/Modal';
import DocsModal from './components/DocsModal';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDocsModalOpen, setIsDocsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.pageYOffset;
      setScrollProgress((currentScroll / totalScroll) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLaunchClick = () => {
    setIsModalOpen(true);
  };

  const handleDocsClick = () => {
    setIsDocsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <TechBackground />
      
      {/* Modals */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <DocsModal isOpen={isDocsModalOpen} onClose={() => setIsDocsModalOpen(false)} />
      
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-0.5 bg-black/50 z-50">
        <div 
          className="h-full bg-[#FF6B35] transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-black/50 backdrop-blur-xl border-b border-[#FF6B35]/20 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="cyber-border glass-card rounded-xl px-6 py-3">
              <div className="flex items-center space-x-3">
                <img src="https://swsroot.xyz/assets/fyre.png" alt="FYRE" className="w-8 h-8" />
                <span className="font-display text-xl gradient-text tracking-wider">FYRE</span>
              </div>
            </div>
            
            <button 
              className="md:hidden glass-card rounded-xl p-3"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="space-y-1.5">
                <div className="w-6 h-0.5 bg-primary"></div>
                <div className="w-6 h-0.5 bg-primary"></div>
                <div className="w-6 h-0.5 bg-primary"></div>
              </div>
            </button>

            <div className="hidden md:flex items-center space-x-4">
              <a href="https://github.com/fyre-ai" target="_blank" rel="noopener noreferrer" 
                className="glass-card hover-glow rounded-xl px-5 py-3 flex items-center space-x-2">
                <Github size={18} className="text-primary" />
                <span className="font-display text-sm">GITHUB</span>
              </a>
              <a href="https://x.com/fyre_dot_run" target="_blank" rel="noopener noreferrer" 
                className="glass-card hover-glow rounded-xl px-5 py-3 flex items-center space-x-2">
                <Twitter size={18} className="text-primary" />
                <span className="font-display text-sm">TWITTER</span>
              </a>
              <button onClick={handleLaunchClick}
                className="cyber-border glass-card hover-glow rounded-xl px-8 py-3">
                <span className="font-display text-sm gradient-text">LAUNCH APP</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-4 space-y-2`}>
            <a href="https://github.com/fyre-ai" target="_blank" rel="noopener noreferrer" 
              className="glass-card hover-glow rounded-xl p-3 flex items-center space-x-2">
              <Github size={18} className="text-primary" />
              <span className="font-display text-sm">GITHUB</span>
            </a>
            <a href="https://x.com/fyre_dot_run" target="_blank" rel="noopener noreferrer" 
              className="glass-card hover-glow rounded-xl p-3 flex items-center space-x-2">
              <Twitter size={18} className="text-primary" />
              <span className="font-display text-sm">TWITTER</span>
            </a>
            <button onClick={handleLaunchClick}
              className="cyber-border glass-card hover-glow rounded-xl p-3 w-full">
              <span className="font-display text-sm gradient-text">LAUNCH APP</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-32">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8">
            <div className="inline-block glass-card rounded-xl p-3 mb-6">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="font-mono text-sm text-gray-400">SYSTEM ONLINE</span>
              </div>
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl gradient-text tracking-tight leading-tight">
              Real-time Financial Insights & Yield Aggregator
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-mono">
              FYRE is an AI-powered platform that gathers real-time news insights to generate tokens based on current events and market trends.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <button onClick={handleLaunchClick}
                className="cyber-border glass-card hover-glow rounded-xl px-8 py-4 w-full md:w-auto">
                <span className="font-display text-lg gradient-text">EXPLORE PLATFORM</span>
              </button>
              <button onClick={handleDocsClick}
                className="glass-card hover-glow rounded-xl px-8 py-4 w-full md:w-auto">
                <span className="font-display text-lg">VIEW DOCUMENTATION</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* News Terminal Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <NewsTerminal />
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl gradient-text mb-4">CORE FEATURES</h2>
            <div className="cyber-line w-24 mx-auto mb-6"></div>
            <p className="text-gray-300 font-mono max-w-2xl mx-auto">
              Powered by cutting-edge AI technology and blockchain integration
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: "NEURAL PROCESSING",
                desc: "Advanced pattern recognition and market prediction through multi-layered neural networks"
              },
              {
                icon: <Cpu className="w-8 h-8" />,
                title: "REAL-TIME ANALYSIS",
                desc: "Instant market data processing and trend detection using cutting-edge AI algorithms"
              },
              {
                icon: <Database className="w-8 h-8" />,
                title: "AUTOMATED TRADING",
                desc: "Smart contract-powered trading execution with risk management protocols"
              }
            ].map((feature, i) => (
              <div key={i} className="cyber-border glass-card rounded-xl p-6 hover-glow">
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="font-display text-lg mb-3">{feature.title}</h3>
                <p className="text-gray-300 font-mono">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Flow Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl gradient-text mb-4">SYSTEM ARCHITECTURE</h2>
            <div className="cyber-line w-24 mx-auto mb-6"></div>
            <p className="text-gray-300 font-mono max-w-2xl mx-auto">
              Multi-layered AI system processing real-time market data
            </p>
          </div>
          <DataFlowDiagram />
        </div>
      </section>

      {/* Progress Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl gradient-text mb-4">DEVELOPMENT STATUS</h2>
            <div className="cyber-line w-24 mx-auto mb-6"></div>
            <p className="text-gray-300 font-mono max-w-2xl mx-auto">
              Track our progress as we build the future of decentralized finance
            </p>
          </div>
          <ProgressBar />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-20 border-t border-primary/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="glass-card cyber-border rounded-xl p-8 h-full">
                <div className="flex items-center space-x-3 mb-6">
                  <img src="https://swsroot.xyz/assets/fyre.png" alt="FYRE" className="w-8 h-8" />
                  <span className="font-display text-xl gradient-text">FYRE</span>
                </div>
                <p className="font-mono text-gray-300 max-w-lg mb-6 leading-relaxed">
                  Revolutionizing financial markets through advanced AI technology and real-time data analysis. Join us in shaping the future of decentralized finance.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="glass-card rounded-lg px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      <span className="font-mono text-sm text-gray-400">Systems Online</span>
                    </div>
                  </div>
                  <div className="glass-card rounded-lg px-4 py-2">
                    <span className="font-mono text-sm text-primary">v0.4.5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div className="glass-card cyber-border rounded-xl p-8 h-full">
                <h3 className="font-display text-sm gradient-text mb-6">CONNECT WITH US</h3>
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-3">
                    <a href="https://github.com/fyre-ai" target="_blank" rel="noopener noreferrer" 
                      className="glass-card hover-glow rounded-lg p-3">
                      <Github className="w-5 h-5 text-primary" />
                    </a>
                    <a href="https://x.com/fyre_dot_run" target="_blank" rel="noopener noreferrer" 
                      className="glass-card hover-glow rounded-lg p-3">
                      <Twitter className="w-5 h-5 text-primary" />
                    </a>
                    <button onClick={handleLaunchClick}
                      className="glass-card hover-glow rounded-lg px-4 py-2">
                      <span className="font-mono text-sm gradient-text">LAUNCH APP</span>
                    </button>
                  </div>
                  <div className="space-y-3">
                    <button onClick={handleDocsClick} 
                      className="glass-card hover-glow rounded-lg px-4 py-2 w-full text-left">
                      <span className="font-mono text-sm text-gray-300">Documentation</span>
                    </button>
                    <div className="glass-card rounded-lg px-4 py-2">
                      <span className="font-mono text-sm text-gray-300">LAUNCH: FEBRUARY 3, 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-primary/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="glass-card cyber-border rounded-lg px-6 py-3">
                <span className="font-mono text-sm text-gray-300">© 2024 FYRE.RUN - All rights reserved.</span>
              </div>
              <div className="glass-card hover-glow rounded-lg px-6 py-3">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-sm text-gray-300">Built with</span>
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="font-mono text-sm text-gray-300">in Web3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;