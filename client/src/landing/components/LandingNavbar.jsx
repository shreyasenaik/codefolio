import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Code2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

export const LandingNavbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="bg-[#0B0F17]/95 border-b border-[#223046] sticky top-0 z-50 backdrop-blur-md px-4 sm:px-8 py-3 w-full">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link to="/" className="flex items-center gap-2.5 font-mono font-bold text-white text-base tracking-tight hover:opacity-90 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-[#131B2A] border border-[#223046] flex items-center justify-center text-[#00E599] shadow-inner">
              <Terminal className="w-4 h-4" />
            </div>
            <span className="font-sans text-lg font-extrabold text-white">CodeFolio</span>
          </Link>

          {/* System Status Pip */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[#070A10] border border-[#223046] rounded-full font-mono text-[11px] text-[#94A3B8]">
            <span className="w-2 h-2 rounded-full bg-[#00E599] animate-pulse"></span>
            <span>v2.0.0 / status: 200 OK</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden md:flex items-center gap-4 font-mono text-xs text-[#94A3B8]">
            <Link to="/demo1" className="hover:text-white transition-colors">
              /demo1 (Minimalist)
            </Link>
            <Link to="/demo2" className="hover:text-[#00E599] transition-colors">
              /demo2 (Cyberpunk)
            </Link>
          </div>

          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="bg-[#00E599] hover:bg-[#00E599]/90 text-[#0B0F17] px-4 py-2 rounded-lg font-mono font-bold text-xs transition-colors shadow-sm"
            >
              Dashboard
            </Link>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                to="/login"
                className="text-[#94A3B8] hover:text-white font-medium text-xs px-3 py-2 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-[#00E599] hover:bg-[#00E599]/90 text-[#0B0F17] px-4 py-2 rounded-lg font-mono font-bold text-xs transition-colors shadow-sm"
              >
                Create portfolio
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
