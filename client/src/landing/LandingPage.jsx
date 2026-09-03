import React from 'react';
import LandingNavbar from './components/LandingNavbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import PlatformArchitectureSection from './components/PlatformArchitectureSection.jsx';
import GitDiffShowcaseSection from './components/GitDiffShowcaseSection.jsx';
import LandingFooter from './components/LandingFooter.jsx';

export const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-[#F8FAFC] font-sans selection:bg-[#00E599] selection:text-[#0B0F17]">
      {/* Background Subtle Grid Texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30 z-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(34, 48, 70, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(34, 48, 70, 0.4) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        <LandingNavbar />
        <main className="flex-grow">
          <HeroSection />
          <PlatformArchitectureSection />
          <GitDiffShowcaseSection />
        </main>
        <LandingFooter />
      </div>
    </div>
  );
};

export default LandingPage;
