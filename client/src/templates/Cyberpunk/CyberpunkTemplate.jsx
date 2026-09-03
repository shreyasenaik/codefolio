import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal,
  Cpu,
  Shield,
  Zap,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Radio,
  FileCode,
  ArrowUpRight,
  ExternalLink,
  Code2,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
import LazyImage from '../../portfolio/components/LazyImage.jsx';
import ProBadge from '../../portfolio/components/ProBadge.jsx';
import ContactModal from '../../portfolio/components/ContactModal.jsx';

const cyberFadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
  }
};

const cyberStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

export const CyberpunkTemplate = ({ data, isPreview = false }) => {
  const { user, projects = [], skills = [] } = data || {};
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  // Derive unique skill categories
  const categories = ['All', ...new Set(skills.map((s) => s.category).filter(Boolean))];
  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  const social = user?.socialLinks || {};

  return (
    <div className="min-h-screen bg-[#07070F] text-[#F8FAFC] font-mono relative overflow-x-hidden pb-20 sm:pb-24 selection:bg-[#ff007f] selection:text-white">
      {/* Background Cyber Matrix Grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0, 240, 255, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 0, 127, 0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Ambient Neon Glow Orbs */}
      <div className="absolute top-10 -left-20 w-72 sm:w-96 h-72 sm:h-96 bg-[#00f0ff]/10 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/3 -right-20 w-72 sm:w-96 h-72 sm:h-96 bg-[#ff007f]/10 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-20 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-[#9d00ff]/10 rounded-full blur-[120px] sm:blur-[140px] pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* HUD Header Bar (Mobile Responsive) */}
        <motion.header
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="sticky top-0 z-30 bg-[#0B0C1A]/95 backdrop-blur-md border-b border-[#00f0ff]/30 shadow-[0_4px_25px_rgba(0,240,255,0.1)]"
        >
          <div className="max-w-6xl mx-auto px-3 sm:px-6 h-13 sm:h-14 flex items-center justify-between gap-2">
            {/* Terminal Node Identifier */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-[#00f0ff] bg-[#07070F] px-2 sm:px-3 py-1 rounded border border-[#00f0ff]/40 truncate">
                <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#00f0ff] animate-ping shrink-0" />
                <span className="font-bold tracking-widest text-[10px] sm:text-[11px] truncate">
                  NODE::{user?.username?.toUpperCase() || 'DEV'}
                </span>
              </div>
              {user?.isPro && <ProBadge />}
            </div>

            {/* HUD Nav Links & Transmit Action */}
            <nav className="flex items-center gap-2 sm:gap-6 text-xs text-[#94A3B8] shrink-0">
              <a href="#about" className="hover:text-[#00f0ff] transition-colors hidden md:inline">
                // PROFILE
              </a>
              <a href="#projects" className="hover:text-[#00f0ff] transition-colors text-[11px] sm:text-xs">
                // PROJECTS ({projects.length})
              </a>
              <a href="#skills" className="hover:text-[#ff007f] transition-colors text-[11px] sm:text-xs hidden xs:inline">
                // SKILLS ({skills.length})
              </a>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsContactOpen(true)}
                className="px-2.5 sm:px-3.5 py-1.5 rounded bg-gradient-to-r from-[#ff007f] to-[#9d00ff] hover:from-[#ff007f]/90 hover:to-[#9d00ff]/90 text-white font-bold text-[10px] sm:text-xs tracking-wider shadow-[0_0_15px_rgba(255,0,127,0.4)] border border-[#ff007f]/60 transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 shrink-0"
              >
                <Radio className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-pulse" />
                <span>TRANSMIT</span>
              </motion.button>
            </nav>
          </div>
        </motion.header>

        {/* Main Content Area (Mobile Responsive) */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-12 sm:pb-16 space-y-10 sm:space-y-16 w-full">
          {/* 1. Terminal Profile Hero Section */}
          <motion.section
            id="about"
            initial="hidden"
            animate="visible"
            variants={cyberStagger}
            className="relative rounded-2xl border border-[#00f0ff]/40 bg-[#0E1022]/80 backdrop-blur-xl p-4 sm:p-8 shadow-[0_0_35px_rgba(0,240,255,0.12)] overflow-hidden"
          >
            {/* Top Terminal Strip */}
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[#00f0ff]/20 text-[11px] sm:text-xs text-[#00f0ff]">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00f0ff]" />
                <span className="tracking-wider">SYSTEM_CORE // 0x{user?.username || 'DEV'}</span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-[#ff007f] tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff007f] animate-pulse" />
                LINK: SECURE
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 sm:gap-8 pt-5 sm:pt-6">
              {/* Avatar / Cyber Empty-State */}
              <div className="relative shrink-0">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#00f0ff] via-[#ff007f] to-[#faed26] opacity-75 blur-sm animate-pulse" />
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl bg-[#07070F] border-2 border-[#00f0ff] overflow-hidden flex items-center justify-center">
                  {user?.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name || 'User Avatar'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-[#07070F] text-[#00f0ff]">
                      <span className="text-2xl sm:text-4xl font-black tracking-widest">
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'CY'}
                      </span>
                      <span className="text-[8px] sm:text-[9px] text-[#ff007f] tracking-widest mt-1">[NODE]</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Details */}
              <div className="space-y-2.5 sm:space-y-3 flex-1 w-full">
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2.5 sm:gap-3 flex-wrap">
                    <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                      {user?.name || 'Developer Name'}
                    </h1>
                    {user?.isPro && <ProBadge />}
                  </div>

                  <p className="text-xs sm:text-base font-bold text-[#00f0ff] mt-1 flex items-center justify-center sm:justify-start gap-1.5">
                    <span className="text-[#ff007f]">&gt;&gt;</span>
                    <span>{user?.title || 'Protocol Engineer & Core Developer'}</span>
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-3xl font-sans mx-auto sm:mx-0">
                  {user?.bio || 'Architecting distributed systems, low-latency protocols, and cybernetic user interfaces.'}
                </p>

                {/* Dossier Link & Social Transmission Pins (Mobile Centered) */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 pt-1 sm:pt-2">
                  {user?.resumeUrl && (
                    <a
                      href={user.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded bg-[#00f0ff]/15 hover:bg-[#00f0ff]/25 text-[#00f0ff] border border-[#00f0ff]/60 text-[11px] sm:text-xs font-bold flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all min-h-[36px]"
                    >
                      <FileCode className="w-3.5 h-3.5" />
                      DOSSIER.PDF
                    </a>
                  )}

                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {social.github && (
                      <a
                        href={social.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded bg-[#07070F] border border-[#223046] text-[#94A3B8] hover:text-[#00f0ff] hover:border-[#00f0ff]/60 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
                        title="GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}

                    {social.linkedin && (
                      <a
                        href={social.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded bg-[#07070F] border border-[#223046] text-[#94A3B8] hover:text-[#00f0ff] hover:border-[#00f0ff]/60 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
                        title="LinkedIn"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}

                    {social.twitter && (
                      <a
                        href={social.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded bg-[#07070F] border border-[#223046] text-[#94A3B8] hover:text-[#ff007f] hover:border-[#ff007f]/60 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
                        title="Twitter / X"
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}

                    {social.website && (
                      <a
                        href={social.website}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded bg-[#07070F] border border-[#223046] text-[#94A3B8] hover:text-[#faed26] hover:border-[#faed26]/60 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
                        title="Personal Website"
                      >
                        <Globe className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* 2. Projects Section */}
          <section id="projects" className="space-y-4 sm:space-y-5">
            <div className="flex items-center justify-between border-b border-[#00f0ff]/30 pb-2.5 sm:pb-3">
              <h2 className="text-base sm:text-xl font-black text-[#00f0ff] tracking-wider flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                <span>// MISSION_REPOSITORIES</span>
              </h2>
              <span className="text-[10px] sm:text-xs text-[#94A3B8] font-mono font-bold">
                PAYLOAD: {projects.length}
              </span>
            </div>

            {projects.length === 0 ? (
              <div className="rounded-xl bg-[#0E1022] border border-[#223046] p-6 sm:p-8 text-center text-[#94A3B8] text-xs">
                // No mission repositories deployed.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {projects.map((project, idx) => (
                  <motion.div
                    key={project._id || project.id || idx}
                    whileHover={{ y: -3 }}
                    className="rounded-xl bg-[#0E1022]/90 border border-[#00f0ff]/30 hover:border-[#00f0ff] p-4 sm:p-5 space-y-3 sm:space-y-4 shadow-[0_0_20px_rgba(0,240,255,0.08)] flex flex-col justify-between transition-all group"
                  >
                    <div className="space-y-2.5 sm:space-y-3">
                      {project.screenshotUrl && (
                        <div className="rounded-lg overflow-hidden border border-[#00f0ff]/20 aspect-video">
                          <LazyImage src={project.screenshotUrl} alt={project.title} />
                        </div>
                      )}

                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm sm:text-base font-bold text-white tracking-wide group-hover:text-[#00f0ff] transition-colors leading-snug">
                          {project.title}
                        </h3>
                        {project.featured && (
                          <span className="text-[9px] px-2 py-0.5 rounded bg-[#ff007f]/20 text-[#ff007f] border border-[#ff007f]/50 font-bold tracking-wider shrink-0">
                            PRIORITY
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-[#94A3B8] leading-relaxed font-sans line-clamp-3">
                        {project.description}
                      </p>

                      {project.techStack && project.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-1">
                          {project.techStack.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded text-[9px] sm:text-[10px] bg-[#07070F] text-[#00f0ff] border border-[#00f0ff]/30 font-bold"
                            >
                              #{tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#223046] text-xs">
                      {project.repoLink ? (
                        <a
                          href={project.repoLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#94A3B8] hover:text-[#00f0ff] flex items-center gap-1.5 transition-colors py-1 min-h-[34px]"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>SOURCE</span>
                        </a>
                      ) : (
                        <span />
                      )}

                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#ff007f] hover:text-[#ff007f]/80 font-bold flex items-center gap-1 px-3 py-1 rounded bg-[#ff007f]/10 border border-[#ff007f]/40 ml-auto transition-all min-h-[34px]"
                        >
                          <span>EXECUTE</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          {/* 3. Skills Matrix Section */}
          <section id="skills" className="space-y-4 sm:space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 border-b border-[#ff007f]/30 pb-2.5 sm:pb-3">
              <h2 className="text-base sm:text-xl font-black text-[#ff007f] tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#ff007f]" />
                <span>// NEURAL_TECH_STACK</span>
              </h2>

              {/* Cyber Category Filter (Horizontal Scroll on Mobile) */}
              {categories.length > 1 && (
                <div className="flex items-center gap-1 bg-[#0E1022] p-1 rounded border border-[#223046] overflow-x-auto scrollbar-none max-w-full">
                  {categories.map((cat) => {
                    const isSelected = activeCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-2.5 py-1 rounded text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                          isSelected
                            ? 'bg-[#ff007f] text-white shadow-[0_0_10px_rgba(255,0,127,0.4)]'
                            : 'text-[#94A3B8] hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {filteredSkills.length === 0 ? (
              <div className="rounded-xl bg-[#0E1022] border border-[#223046] p-6 sm:p-8 text-center text-[#94A3B8] text-xs">
                // No neural protocols identified.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3.5">
                {filteredSkills.map((skill, idx) => (
                  <div
                    key={skill._id || skill.id || `${skill.name}-${idx}`}
                    className="p-3 sm:p-3.5 rounded-lg bg-[#0E1022]/80 border border-[#223046] hover:border-[#ff007f]/60 transition-all flex flex-col justify-between group min-h-[68px]"
                  >
                    <div className="text-xs font-bold text-white group-hover:text-[#00f0ff] transition-colors truncate">
                      {skill.name}
                    </div>
                    <div className="flex items-center justify-between mt-2 text-[9px] sm:text-[10px] text-[#ff007f]">
                      <span className="px-1.5 py-0.5 rounded bg-[#07070F] border border-[#223046] text-[#94A3B8]">
                        {skill.category}
                      </span>
                      {skill.proficiency && (
                        <span className="text-[#00f0ff] font-bold">{skill.proficiency}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Footer */}
          <footer className="pt-8 sm:pt-12 border-t border-[#223046] text-[11px] sm:text-xs text-[#94A3B8] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <span className="text-[10px] sm:text-[11px] text-[#00f0ff]">CYBERPUNK ENGINE // SYSTEM_STATUS: 200_OK</span>
            <span>&copy; {new Date().getFullYear()} {user?.name || 'DEV'}. CODEFOLIO PLATFORM.</span>
          </footer>
        </main>
      </div>

      {/* Contact Modal (Protected Email Proxy) */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        username={user?.username}
        developerName={user?.name}
      />
    </div>
  );
};

export default CyberpunkTemplate;
