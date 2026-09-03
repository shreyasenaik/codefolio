import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Code2,
  Terminal,
  Copy,
  Check,
  CheckCircle2,
  ExternalLink,
  Layers,
  Sparkles,
  Github,
  Globe
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

export const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const [copiedCli, setCopiedCli] = useState(false);
  const [activePreviewTemplate, setActivePreviewTemplate] = useState('minimalist'); // 'minimalist' | 'cyberpunk'

  const copyCliCommand = () => {
    navigator.clipboard.writeText('npx codefolio@latest claim alexrivera');
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0F141C] text-[#F8FAFC] font-sans selection:bg-[#00E599] selection:text-[#0F141C]">
      {/* Top Technical Navigation */}
      <header className="border-b border-[#26354A] bg-[#0F141C]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5 font-bold text-base tracking-tight text-white">
              <div className="w-7 h-7 rounded bg-[#161F2E] border border-[#26354A] flex items-center justify-center text-[#00E599] font-mono text-sm font-bold shadow-sm">
                &gt;_
              </div>
              <span className="font-mono">codefolio</span>
            </Link>

            <div className="hidden md:flex items-center gap-1 font-mono text-xs text-[#94A3B8]">
              <span className="text-[#26354A]">/</span>
              <span>v2.0.0</span>
              <span className="text-[#26354A]">/</span>
              <span className="text-[#00E599]">status: 200 OK</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/demo1"
              className="text-xs font-mono text-[#94A3B8] hover:text-white transition-colors hidden sm:inline"
            >
              /demo1 (Minimalist)
            </Link>
            <Link
              to="/demo2"
              className="text-xs font-mono text-[#94A3B8] hover:text-[#00E599] transition-colors hidden sm:inline"
            >
              /demo2 (Cyberpunk)
            </Link>

            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="px-4 py-2 rounded-lg bg-[#00E599] hover:bg-[#00E599]/90 text-[#0F141C] text-xs font-bold font-mono transition-colors shadow-sm"
              >
                Dashboard
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#94A3B8] hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg bg-[#00E599] hover:bg-[#00E599]/90 text-[#0F141C] text-xs font-bold font-mono transition-colors shadow-sm"
                >
                  Create portfolio
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section: Asymmetric Split Layout */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (55% / 7 cols): Technical Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Functional CLI Command Bar */}
            <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[#161F2E] border border-[#26354A] font-mono text-xs text-[#94A3B8] shadow-inner">
              <Terminal className="w-3.5 h-3.5 text-[#00E599]" />
              <span>$ npx codefolio claim</span>
              <span className="text-[#38BDF8]">alexrivera</span>
              <button
                onClick={copyCliCommand}
                className="ml-2 text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
                title="Copy terminal command"
              >
                {copiedCli ? <Check className="w-3.5 h-3.5 text-[#00E599]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Direct Technical Headline */}
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              A portfolio CMS engineered for developers, not marketers.
            </h1>

            {/* Technical Subtext */}
            <p className="text-[#94A3B8] text-base leading-relaxed max-w-xl font-normal">
              Manage your engineering profile, project repositories, and technical skill matrices from a single source of truth. Your data dynamically compiles into swappable portfolio templates at <code className="text-[#38BDF8] font-mono text-sm bg-[#161F2E] px-1.5 py-0.5 rounded border border-[#26354A]">codefolio.dev/username</code>.
            </p>

            {/* Action Buttons (Direct, without decorative arrows) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/register"
                className="px-5 py-3 rounded-lg bg-[#00E599] hover:bg-[#00E599]/90 text-[#0F141C] font-mono font-bold text-xs transition-colors shadow-md"
              >
                Create your portfolio
              </Link>
              <Link
                to="/demo1"
                className="px-4 py-3 rounded-lg bg-[#161F2E] hover:bg-[#26354A] text-[#F8FAFC] border border-[#26354A] text-xs font-mono transition-colors"
              >
                Explore Minimalist demo
              </Link>
              <Link
                to="/demo2"
                className="px-4 py-3 rounded-lg bg-[#161F2E] hover:bg-[#26354A] text-[#38BDF8] border border-[#26354A] text-xs font-mono transition-colors"
              >
                Explore Cyberpunk demo
              </Link>
            </div>

            {/* Technical Highlights Bar */}
            <div className="pt-6 border-t border-[#26354A] grid grid-cols-3 gap-4 text-xs font-mono text-[#94A3B8]">
              <div>
                <span className="text-[#F8FAFC] font-bold block">&lt;templateMap /&gt;</span>
                <span>Declarative engine</span>
              </div>
              <div>
                <span className="text-[#00E599] font-bold block">REST + JWT</span>
                <span>Clean decoupled API</span>
              </div>
              <div>
                <span className="text-[#38BDF8] font-bold block">1-RTT Sync</span>
                <span>Parallel aggregation</span>
              </div>
            </div>
          </div>

          {/* Right Column (45% / 5 cols): Real "Code-to-Render" Dual View */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-[#26354A] bg-[#161F2E] shadow-2xl overflow-hidden">
              
              {/* Window Title Bar */}
              <div className="h-10 bg-[#0F141C] border-b border-[#26354A] px-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#26354A]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#26354A]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#26354A]"></span>
                  <span className="text-[11px] font-mono text-[#94A3B8] ml-2">codefolio.config.ts</span>
                </div>

                {/* Template Switcher Toggle */}
                <div className="flex items-center gap-1 bg-[#161F2E] p-1 rounded-md border border-[#26354A]">
                  <button
                    onClick={() => setActivePreviewTemplate('minimalist')}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                      activePreviewTemplate === 'minimalist'
                        ? 'bg-[#26354A] text-white font-bold'
                        : 'text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    Minimalist
                  </button>
                  <button
                    onClick={() => setActivePreviewTemplate('cyberpunk')}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                      activePreviewTemplate === 'cyberpunk'
                        ? 'bg-[#00E599] text-[#0F141C] font-bold'
                        : 'text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    Cyberpunk
                  </button>
                </div>
              </div>

              {/* Source Code Config Block */}
              <div className="p-4 bg-[#0D1117] border-b border-[#26354A] font-mono text-[11px] leading-relaxed text-[#94A3B8] overflow-x-auto">
                <span className="text-[#38BDF8]">export default</span> <span className="text-[#00E599]">definePortfolio</span>({'{'}
                <div className="pl-4">
                  <div><span className="text-[#94A3B8]">username:</span> <span className="text-[#F8FAFC]">"alexrivera"</span>,</div>
                  <div><span className="text-[#94A3B8]">template:</span> <span className="text-[#00E599]">"{activePreviewTemplate}"</span>,</div>
                  <div><span className="text-[#94A3B8]">role:</span> <span className="text-[#F8FAFC]">"Distributed Systems Architect"</span>,</div>
                  <div><span className="text-[#94A3B8]">featuredProject:</span> <span className="text-[#38BDF8]">"HyperQueue"</span></div>
                </div>
                {'}'});
              </div>

              {/* Live Rendered Mini Card */}
              <div className="p-5">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#94A3B8] mb-3 flex items-center justify-between">
                  <span>// OUTPUT PREVIEW &bull; GET /:username</span>
                  <span className="text-[#00E599] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E599] animate-pulse"></span>
                    Live Render
                  </span>
                </div>

                {activePreviewTemplate === 'minimalist' ? (
                  /* Minimalist Card Output */
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3 font-sans">
                    <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
                      <div>
                        <div className="text-sm font-bold text-white">Alex Rivera</div>
                        <div className="text-xs text-neutral-400">Systems & Backend Engineer</div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800">
                        PRO
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800/80">
                      <div className="text-xs font-bold text-white">HyperQueue - Distributed Task Engine</div>
                      <p className="text-[11px] text-neutral-400 mt-1">Fault-tolerant distributed job queue processing 100k jobs/sec.</p>
                      <div className="flex gap-1.5 mt-2">
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800">Node.js</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800">Redis</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800">Docker</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Cyberpunk Card Output */
                  <div className="p-4 rounded-xl bg-black border border-cyber-neon/40 space-y-3 font-mono shadow-[0_0_20px_rgba(0,240,255,0.15)]">
                    <div className="flex items-center justify-between border-b border-cyber-neon/20 pb-3">
                      <div>
                        <div className="text-sm font-bold text-cyber-neon font-cyber">NODE::VEX_THORNE</div>
                        <div className="text-xs text-cyber-yellow">// PROTOCOL_ARCHITECT</div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-cyber-pink/20 text-cyber-pink border border-cyber-pink/40 font-bold">
                        PRIORITY_1
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-black/80 border border-slate-800">
                      <div className="text-xs font-bold text-white">ShadowMesh - Encrypted P2P Tunnel</div>
                      <p className="text-[11px] text-slate-400 mt-1">Zero-knowledge packet hopping protocol.</p>
                      <div className="flex gap-1.5 mt-2">
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 text-cyber-neon border border-cyber-neon/20">#Rust</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 text-cyber-neon border border-cyber-neon/20">#Wasm</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 text-cyber-neon border border-cyber-neon/20">#P2P</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Capabilities Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-[#26354A]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-[#161F2E] border border-[#26354A] space-y-2.5">
            <div className="text-xs font-mono text-[#00E599] uppercase tracking-wider font-bold">01 / Template Map</div>
            <h3 className="text-base font-bold text-white">Declarative Registry Pattern</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Swappable templates execute through an open-closed <code className="text-[#38BDF8] font-mono">templateMap[id]</code> lookup table, avoiding fragile branching chains.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#161F2E] border border-[#26354A] space-y-2.5">
            <div className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider font-bold">02 / Vanity Aggregation</div>
            <h3 className="text-base font-bold text-white">Single-Roundtrip Public API</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              <code className="text-[#38BDF8] font-mono">GET /api/users/:username</code> aggregates profile, project repositories, and skills via parallel database queries without leaking private credentials.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#161F2E] border border-[#26354A] space-y-2.5">
            <div className="text-xs font-mono text-[#F8FAFC] uppercase tracking-wider font-bold">03 / Mail Gateway</div>
            <h3 className="text-base font-bold text-white">Zero-Exposure Contact Proxy</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Visitor messages are forwarded server-side via Nodemailer without ever exposing developer email addresses in client bundles or public APIs.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-8 border-t border-[#26354A] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#94A3B8]">
        <div>codefolio &bull; full stack mern portfolio builder</div>
        <div className="text-[#00E599]">system: healthy</div>
      </footer>
    </div>
  );
};

export default LandingPage;
