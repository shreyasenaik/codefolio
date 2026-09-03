import React, { useState } from 'react';
import { FileCode, Sparkles, ExternalLink, User } from 'lucide-react';

export const CodeToRenderPreview = () => {
  const [activeTemplate, setActiveTemplate] = useState('minimalist'); // 'minimalist' | 'cyberpunk'

  return (
    <div className="rounded-xl border border-[#223046] bg-[#131B2A] shadow-2xl overflow-hidden flex flex-col h-full">
      {/* Window Title Bar */}
      <div className="bg-[#1C2636] border-b border-[#223046] px-4 py-2.5 flex items-center justify-between text-xs font-mono text-[#94A3B8] shrink-0">
        <div className="flex items-center gap-3">
          {/* macOS window control dots */}
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5A78]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#00E599]"></span>
          </div>
          <div className="flex items-center gap-1.5 pl-2 border-l border-[#223046]">
            <FileCode className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>codefolio.config.ts</span>
          </div>
        </div>

        {/* Live Template Hot-Swap Toggle */}
        <div className="flex items-center gap-1 bg-[#0B0F17] p-1 rounded border border-[#223046]">
          <button
            onClick={() => setActiveTemplate('minimalist')}
            className={`px-2.5 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
              activeTemplate === 'minimalist'
                ? 'bg-[#00E599] text-[#0B0F17] font-bold shadow-sm'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            Minimalist
          </button>
          <button
            onClick={() => setActiveTemplate('cyberpunk')}
            className={`px-2.5 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
              activeTemplate === 'cyberpunk'
                ? 'bg-[#38BDF8] text-[#0B0F17] font-bold shadow-sm'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            Cyberpunk
          </button>
        </div>
      </div>

      {/* Dual Pane Workspace */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#223046] flex-1">
        {/* Left Pane: Generic Syntax-Highlighted Configuration */}
        <div className="bg-[#0B0F17] p-4 font-mono text-[12px] leading-relaxed text-[#94A3B8] overflow-x-auto">
          <div className="text-[#64748B] text-[11px] pb-2">// 1. Define schema & content in CMS dashboard</div>
          <div><span className="text-[#c678dd]">import</span> {'{'} <span className="text-[#e5c07b]">definePortfolio</span> {'}'} <span className="text-[#c678dd]">from</span> <span className="text-[#98c379]">'@codefolio/core'</span>;</div>
          <br />
          <div><span className="text-[#c678dd]">export default</span> <span className="text-[#61afef]">definePortfolio</span>({'{'}</div>
          <div className="pl-4">
            <div><span className="text-[#d19a66]">username</span>: <span className="text-[#98c379]">"your-username"</span>,</div>
            <div><span className="text-[#d19a66]">template</span>: <span className="text-[#00E599]">"{activeTemplate}"</span>,</div>
            <div><span className="text-[#d19a66]">profile</span>: {'{'}</div>
            <div className="pl-4">
              <div><span className="text-[#d19a66]">name</span>: <span className="text-[#98c379]">"Jane Developer"</span>,</div>
              <div><span className="text-[#d19a66]">role</span>: <span className="text-[#98c379]">"Full Stack Engineer"</span>,</div>
              <div><span className="text-[#d19a66]">bio</span>: <span className="text-[#98c379]">"// your bio & elevator pitch here"</span></div>
            </div>
            <div>{'}'},</div>
            <div><span className="text-[#d19a66]">techStack</span>: [<span className="text-[#98c379]">"React"</span>, <span className="text-[#98c379]">"Node.js"</span>, <span className="text-[#98c379]">"TypeScript"</span>],</div>
            <div><span className="text-[#d19a66]">isPro</span>: <span className="text-[#56b6c2]">true</span></div>
          </div>
          <div>{'}'});</div>
        </div>

        {/* Right Pane: Live Rendered Portfolio Card Output */}
        <div className="bg-[#131B2A] p-5 flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#94A3B8] mb-3 flex items-center justify-between">
              <span>// OUTPUT PREVIEW: codefolio.dev/demo</span>
              <span className="text-[#00E599] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E599] animate-pulse"></span>
                Compiled
              </span>
            </div>

            {/* Template Card Render */}
            {activeTemplate === 'minimalist' ? (
              /* Minimalist Layout Mock */
              <div className="rounded-lg bg-[#070A10] border border-[#223046] p-4 space-y-3 font-sans">
                <div className="flex items-center justify-between border-b border-[#1C2636] pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#182234] border border-[#223046] flex items-center justify-center text-[#94A3B8]">
                      <User className="w-4 h-4 text-[#38BDF8]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white leading-tight">Jane Developer</div>
                      <div className="text-xs text-[#94A3B8]">Full Stack Engineer</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#131B2A] text-[#38BDF8] border border-[#223046]">
                    PRO ARCHITECT
                  </span>
                </div>

                <p className="text-xs text-[#94A3B8] leading-relaxed italic border-l-2 border-[#00E599] pl-2.5">
                  "Building high-performance web applications and backend systems."
                </p>

                <div className="p-3 rounded-lg bg-[#131B2A]/70 border border-[#223046]">
                  <div className="text-xs font-bold text-white">DevEngine &bull; Cloud Automation</div>
                  <p className="text-[11px] text-[#94A3B8] mt-0.5">Automated CI/CD orchestrator with zero-downtime rollouts.</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#070A10] text-[#94A3B8] border border-[#223046]">React</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#070A10] text-[#94A3B8] border border-[#223046]">Node.js</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#070A10] text-[#94A3B8] border border-[#223046]">TypeScript</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Cyberpunk Layout Mock */
              <div className="rounded-lg bg-black border border-[#00F0FF]/40 p-4 space-y-3 font-mono shadow-[0_0_20px_rgba(0,240,255,0.1)]">
                <div className="flex items-center justify-between border-b border-[#00F0FF]/20 pb-3">
                  <div>
                    <div className="text-xs font-bold text-[#00F0FF] tracking-wider">NODE::JANE_DEV</div>
                    <div className="text-[10px] text-[#FFE600]">// SYSTEMS_SPECIALIST</div>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#FF003C]/20 text-[#FF003C] border border-[#FF003C]/40 font-bold">
                    PRIORITY_1
                  </span>
                </div>

                <div className="p-2.5 rounded bg-black/80 border border-slate-800">
                  <div className="text-xs font-bold text-white">NeuralMesh &bull; P2P Protocol</div>
                  <p className="text-[10px] text-slate-400 mt-0.5">Low-latency packet routing engine.</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 text-[#00F0FF] border border-[#00F0FF]/30">#TypeScript</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 text-[#00F0FF] border border-[#00F0FF]/30">#Node.js</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 text-[#00F0FF] border border-[#00F0FF]/30">#Docker</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-[#223046] flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
            <span>Layout: <strong className="text-white capitalize">{activeTemplate}</strong></span>
            <span className="text-[#38BDF8]">HTTP 200 OK</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeToRenderPreview;
