import React from 'react';
import { Activity, MessageSquare, Zap, ArrowRight, Cpu, Database, Network, LineChart, Bot, GitBranch, Flame, Coins } from 'lucide-react';

const DataFlowDiagram: React.FC = () => {
  return (
    <div className="relative py-20">
      {/* Neural Network Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255, 107, 53, 0.15) 0%, transparent 50%)`,
        }}></div>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-primary/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Data Sources Layer */}
        <div className="flex justify-center mb-16">
          <div className="glass-card cyber-border rounded-2xl p-6 hover-glow">
            <div className="flex items-center space-x-3">
              <Network className="w-6 h-6 text-primary" />
              <span className="font-display text-lg">DATA SOURCES</span>
            </div>
          </div>
        </div>

        {/* Input Processing Layer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <LineChart />,
              title: "MARKET DATA",
              desc: "Real-time price feeds",
              color: "from-[#FF6B35] to-[#FF8B55]"
            },
            {
              icon: <MessageSquare />,
              title: "SOCIAL SIGNALS",
              desc: "Sentiment analysis",
              color: "from-[#FF6B35] to-[#FF9B65]"
            },
            {
              icon: <Activity />,
              title: "ON-CHAIN",
              desc: "Blockchain metrics",
              color: "from-[#FF6B35] to-[#FFA575]"
            }
          ].map((item, i) => (
            <div key={i} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative glass-card rounded-2xl p-8 hover:bg-black/50 transition-all duration-500">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-primary/5 rounded-2xl"></div>
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-transparent p-2.5 mb-6">
                    <div className="text-primary">{item.icon}</div>
                  </div>
                  <h3 className="font-display text-lg mb-3">{item.title}</h3>
                  <p className="font-mono text-sm text-gray-400">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Core Layer */}
        <div className="relative mb-16">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-2xl blur opacity-50"></div>
          <div className="relative glass-card rounded-2xl p-10 border border-primary/20">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent p-4 mb-6">
                <Bot className="w-full h-full text-primary" />
              </div>
              <h2 className="font-display text-2xl mb-2">AI NEURAL CORE</h2>
              <div className="w-32 h-px mx-auto bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Cpu />,
                  title: "Pattern Recognition",
                  desc: "Neural network analysis"
                },
                {
                  icon: <Database />,
                  title: "Predictive Analysis",
                  desc: "Market forecasting"
                },
                {
                  icon: <GitBranch />,
                  title: "Decision Engine",
                  desc: "Strategy execution"
                }
              ].map((item, i) => (
                <div key={i} className="group">
                  <div className="glass-card rounded-xl p-6 hover:bg-black/50 transition-all duration-500">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-transparent p-2 mb-4 group-hover:scale-110 transition-transform duration-500">
                      <div className="text-primary">{item.icon}</div>
                    </div>
                    <h3 className="font-display text-base mb-2">{item.title}</h3>
                    <p className="font-mono text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Output Layer */}
        <div className="flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-2xl blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative glass-card rounded-2xl p-8 hover:bg-black/50 transition-all duration-500 border border-primary/20">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent p-3 mb-6">
                  <Zap className="w-full h-full text-primary animate-pulse" />
                </div>
                <h3 className="font-display text-2xl mb-4 gradient-text">AUTOMATED ACTIONS</h3>
                
                {/* Token Launch Info */}
                <div className="glass-card rounded-xl p-6 w-full max-w-md mb-6 border border-primary/30 hover-glow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Flame className="w-6 h-6 text-primary animate-pulse" />
                      <span className="font-display text-lg">PUMP FUN TOKEN</span>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30">
                      <span className="font-mono text-sm">LAUNCH</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm text-gray-400">Dev Allocation:</span>
                      <span className="font-mono text-sm text-primary">10% FYRE</span>
                    </div>
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Coins className="w-4 h-4 text-primary" />
                        <span className="font-mono text-sm text-gray-400">Profit Strategy:</span>
                      </div>
                      <span className="font-mono text-sm text-primary">Buy & Burn $FYRE</span>
                    </div>
                  </div>
                </div>

                {/* Smart Contract Info */}
                <p className="font-mono text-sm text-gray-400 text-center mb-4">
                  Smart contract execution & market operations
                </p>
                
                {/* Status Indicator */}
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="font-mono text-sm text-primary">System Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Connecting Lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="h-full w-full" style={{
            background: `
              linear-gradient(to bottom, transparent 20%, rgba(255, 107, 53, 0.1) 50%, transparent 80%)
            `
          }}></div>
        </div>
      </div>
    </div>
  );
};

export default DataFlowDiagram;