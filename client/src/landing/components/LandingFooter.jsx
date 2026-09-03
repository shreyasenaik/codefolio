import React from 'react';
import { Terminal } from 'lucide-react';

export const LandingFooter = () => {
  return (
    <footer className="bg-[#070A10] border-t border-[#223046] px-4 sm:px-8 py-6 w-full mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-[#94A3B8]">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#00E599]" />
          <span>&copy; {new Date().getFullYear()} CODEFOLIO ARCHITECTURE [UPTIME: 99.99%]</span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#architecture" className="hover:text-white transition-colors">
            SYSTEM_SPECS
          </a>
          <a href="/demo1" className="hover:text-[#38BDF8] transition-colors">
            MINIMALIST_THEME
          </a>
          <a href="/demo2" className="hover:text-[#00E599] transition-colors">
            CYBERPUNK_THEME
          </a>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
