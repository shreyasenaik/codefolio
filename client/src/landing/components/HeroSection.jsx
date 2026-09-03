import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Copy, Check } from 'lucide-react';
import CodeToRenderPreview from './CodeToRenderPreview.jsx';

export const HeroSection = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('npx codefolio claim yourname');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-12 sm:pt-16 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column (5 cols / Copy & Actions) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Interactive CLI Quick-Claim Bar */}
          <div
            onClick={handleCopy}
            className="inline-flex items-center gap-3 px-3.5 py-2 rounded-lg bg-[#131B2A] border border-[#223046] font-mono text-xs text-[#94A3B8] shadow-inner cursor-pointer hover:border-[#00E599] transition-colors group"
            title="Click to copy command"
          >
            <Terminal className="w-3.5 h-3.5 text-[#00E599] shrink-0" />
            <span className="text-[#F8FAFC]">
              $ npx codefolio claim [ <span className="text-[#38BDF8]">yourname</span> ]
            </span>
            <button
              type="button"
              className="ml-auto text-[#94A3B8] group-hover:text-white transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#00E599]" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
            Build and launch your developer portfolio in minutes
          </h1>

          {/* Subtext */}
          <p className="text-[#94A3B8] text-base leading-relaxed">
            Professional portfolios engineered for software developers. Manage projects, skills, and bio from a unified live dashboard, and deploy instantly to your personal vanity URL.
          </p>

          {/* Action CTAs (Direct, without decorative arrows) */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/register"
              className="bg-[#00E599] hover:bg-[#00E599]/90 text-[#0B0F17] font-mono font-bold text-xs px-6 py-3 rounded-lg border border-[#00E599] shadow-[0_0_20px_rgba(0,229,153,0.15)] hover:shadow-[0_0_30px_rgba(0,229,153,0.3)] transition-all"
            >
              Create your portfolio
            </Link>

            <Link
              to="/demo1"
              className="bg-transparent hover:bg-[#131B2A] text-[#F8FAFC] font-mono text-xs px-4 py-3 rounded-lg border border-[#223046] hover:border-[#38BDF8] hover:text-[#38BDF8] transition-colors"
            >
              Minimalist demo
            </Link>

            <Link
              to="/demo2"
              className="bg-transparent hover:bg-[#131B2A] text-[#F8FAFC] font-mono text-xs px-4 py-3 rounded-lg border border-[#223046] hover:border-[#00E599] hover:text-[#00E599] transition-colors"
            >
              Cyberpunk demo
            </Link>
          </div>
        </div>

        {/* Right Column (7 cols / Code-to-Render IDE Window) */}
        <div className="lg:col-span-7 h-full">
          <CodeToRenderPreview />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
