import React from 'react';
import { GitCommit, GitPullRequest, CheckCircle2 } from 'lucide-react';

export const GitDiffShowcaseSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 border-t border-[#223046]">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#131B2A] border border-[#223046] font-mono text-[11px] text-[#00E599] mb-3">
            <GitCommit className="w-3.5 h-3.5" />
            <span>git commit -m "feat(portfolio): update template to cyberpunk"</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Manage Content Like Code
          </h2>
          <p className="text-xs font-mono text-[#94A3B8] mt-1">
            // Versioned state updates with zero friction and instant compilation
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-[#94A3B8]">
          <span className="w-2 h-2 rounded-full bg-[#00E599]"></span>
          <span>1-click deploy to vanity slug</span>
        </div>
      </div>

      {/* Visual Git Diff Terminal Box */}
      <div className="rounded-xl border border-[#223046] bg-[#0B0F17] overflow-hidden shadow-2xl">
        {/* Terminal Header */}
        <div className="bg-[#131B2A] border-b border-[#223046] px-4 py-2 flex items-center justify-between text-xs font-mono text-[#94A3B8]">
          <div className="flex items-center gap-2">
            <GitPullRequest className="w-4 h-4 text-[#38BDF8]" />
            <span>diff --git a/codefolio.json b/codefolio.json</span>
          </div>
          <span className="text-[11px] text-[#94A3B8]">@@ -14,6 +14,8 @@</span>
        </div>

        {/* Diff Content */}
        <div className="p-4 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto space-y-1">
          <div className="text-[#64748B]">  "username": "your-username",</div>
          <div className="text-[#64748B]">  "title": "Senior Systems Engineer",</div>
          <div className="bg-[#FF5A78]/10 text-[#FF5A78] px-2 py-0.5 rounded flex items-center gap-2">
            <span>-</span>
            <span>"template": "minimalist",</span>
          </div>
          <div className="bg-[#00E599]/10 text-[#00E599] px-2 py-0.5 rounded flex items-center gap-2 font-bold">
            <span>+</span>
            <span>"template": "cyberpunk",</span>
          </div>
          <div className="bg-[#00E599]/10 text-[#00E599] px-2 py-0.5 rounded flex items-center gap-2 font-bold">
            <span>+</span>
            <span>"featuredProject": "Distributed Consensus Engine",</span>
          </div>
          <div className="text-[#64748B]">  "skills": ["Rust", "TypeScript", "Distributed Systems"]</div>
        </div>

        {/* Status bar */}
        <div className="bg-[#070A10] border-t border-[#223046] px-4 py-2.5 flex items-center justify-between font-mono text-[11px] text-[#94A3B8]">
          <span className="text-[#00E599] flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            2 additions, 1 deletion &bull; Published at codefolio.dev/your-username
          </span>
          <span className="hidden sm:inline text-[#64748B]">SHA: 8f4b219</span>
        </div>
      </div>
    </section>
  );
};

export default GitDiffShowcaseSection;
