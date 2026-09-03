import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Linkedin,
  Twitter,
  Globe,
  FileText,
  Mail,
  Briefcase,
  Layers,
  ArrowUpRight,
  ExternalLink,
  Code2,
  Terminal,
  Sparkles
} from 'lucide-react';
import LazyImage from '../../portfolio/components/LazyImage.jsx';
import ProBadge from '../../portfolio/components/ProBadge.jsx';
import ContactModal from '../../portfolio/components/ContactModal.jsx';
import tokens from '../sharedTokens.js';

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

export const MinimalistTemplate = ({ data, isPreview = false }) => {
  const { user, projects = [], skills = [] } = data || {};
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  // Derive unique categories for skills filter
  const categories = ['All', ...new Set(skills.map((s) => s.category).filter(Boolean))];
  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  const social = user?.socialLinks || {};

  return (
    <div className="min-h-screen bg-[#0B0F17] text-[#F8FAFC] font-sans selection:bg-[#00E599] selection:text-[#0B0F17] pb-20 sm:pb-24 relative overflow-x-hidden">
      {/* Background Subtle 48px Grid Texture (matching Landing Page) */}
      <div
        className="fixed inset-0 pointer-events-none opacity-25 z-0"
        style={tokens.gridBackground}
      />

      {/* Ambient Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-56 bg-gradient-to-b from-[#38BDF8]/5 via-[#00E599]/5 to-transparent pointer-events-none blur-3xl z-0" />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header Navigation (Mobile Optimized) */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="sticky top-0 z-30 bg-[#0B0F17]/95 backdrop-blur-md border-b border-[#223046]"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
            {/* Vanity Handle with Terminal Prompt */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[11px] sm:text-xs text-[#94A3B8] bg-[#131B2A] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-[#223046] truncate">
                <span className="w-2 h-2 rounded-full bg-[#00E599] animate-pulse shrink-0" />
                <span className="text-[#F8FAFC] font-bold truncate">
                  {user?.username ? `@${user.username}` : 'portfolio'}
                </span>
              </div>
              {user?.isPro && <ProBadge />}
            </div>

            {/* Navigation Links & Action */}
            <nav className="flex items-center gap-2.5 sm:gap-6 text-xs font-mono text-[#94A3B8] shrink-0">
              <a href="#about" className="hover:text-[#F8FAFC] transition-colors hidden md:inline">
                About
              </a>
              <a href="#projects" className="hover:text-[#38BDF8] transition-colors text-[11px] sm:text-xs">
                Projects ({projects.length})
              </a>
              <a href="#skills" className="hover:text-[#00E599] transition-colors text-[11px] sm:text-xs hidden xs:inline">
                Skills ({skills.length})
              </a>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsContactOpen(true)}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-xs font-mono font-bold bg-[#00E599] hover:bg-[#00E599]/90 text-[#0B0F17] transition-all shadow-[0_0_15px_rgba(0,229,153,0.15)] hover:shadow-[0_0_20px_rgba(0,229,153,0.3)] flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>Contact</span>
              </motion.button>
            </nav>
          </div>
        </motion.header>

        {/* 1. Hero / Profile Section (Mobile Responsive) */}
        <section id="about" className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-16 pb-8 sm:pb-12 w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 sm:gap-8 border-b border-[#223046] pb-10 sm:pb-16"
          >
            {/* Designed Avatar / Empty-State */}
            <motion.div variants={fadeInUp} className="shrink-0">
              {user?.avatarUrl ? (
                <motion.img
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  src={user.avatarUrl}
                  alt={user.name || 'Developer Avatar'}
                  className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl object-cover border-2 border-[#223046] shadow-2xl bg-[#131B2A] mx-auto md:mx-0"
                />
              ) : (
                <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl bg-gradient-to-br from-[#131B2A] to-[#1A2438] border-2 border-[#223046] flex flex-col items-center justify-center text-[#00E599] font-mono shadow-2xl relative overflow-hidden group mx-auto md:mx-0">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#00E599]">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'DEV'}
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-[#94A3B8] font-mono mt-0.5 sm:mt-1">// dev</span>
                </div>
              )}
            </motion.div>

            {/* Profile Info & Typographic Hierarchy */}
            <div className="flex-1 space-y-3 sm:space-y-4 w-full">
              <motion.div variants={fadeInUp}>
                <div className="flex items-center justify-center md:justify-start gap-2.5 sm:gap-3 flex-wrap">
                  <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F8FAFC] leading-tight">
                    {user?.name || 'Developer Name'}
                  </h1>
                  {user?.isPro && <ProBadge />}
                </div>

                <p className="text-sm sm:text-base md:text-lg font-mono text-[#38BDF8] font-medium mt-1 sm:mt-1.5 flex items-center justify-center md:justify-start gap-1.5">
                  <span className="text-[#00E599]">&gt;</span>
                  <span>{user?.title || 'Software Engineer & Systems Builder'}</span>
                </p>
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-[#94A3B8] leading-relaxed max-w-2xl text-xs sm:text-sm md:text-base font-sans mx-auto md:mx-0"
              >
                {user?.bio || 'Building scalable applications, high-performance backends, and modern developer tooling.'}
              </motion.p>

              {/* Action Buttons & Socials (Mobile Centered) */}
              <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 sm:gap-3 pt-1 sm:pt-2">
                {user?.resumeUrl && (
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={user.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-lg bg-[#131B2A] border border-[#223046] hover:border-[#38BDF8] text-[#F8FAFC] text-xs font-mono transition-colors shadow-sm min-h-[38px]"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>View Resume</span>
                  </motion.a>
                )}

                <div className="flex items-center gap-1.5 sm:gap-2">
                  {social.github && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={social.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-lg bg-[#131B2A] border border-[#223046] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#38BDF8] transition-colors min-w-[38px] min-h-[38px] flex items-center justify-center"
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </motion.a>
                  )}

                  {social.linkedin && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={social.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-lg bg-[#131B2A] border border-[#223046] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#38BDF8] transition-colors min-w-[38px] min-h-[38px] flex items-center justify-center"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </motion.a>
                  )}

                  {social.twitter && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={social.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-lg bg-[#131B2A] border border-[#223046] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#38BDF8] transition-colors min-w-[38px] min-h-[38px] flex items-center justify-center"
                      title="Twitter / X"
                    >
                      <Twitter className="w-4 h-4" />
                    </motion.a>
                  )}

                  {social.website && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={social.website}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-lg bg-[#131B2A] border border-[#223046] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#38BDF8] transition-colors min-w-[38px] min-h-[38px] flex items-center justify-center"
                      title="Personal Website"
                    >
                      <Globe className="w-4 h-4" />
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* 2. Featured Projects Section */}
        <section id="projects" className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={fadeInUp}
            className="flex items-center justify-between mb-6 sm:mb-8"
          >
            <div>
              <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-[#F8FAFC] flex items-center gap-2">
                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-[#38BDF8]" />
                Featured Projects
              </h2>
              <p className="text-[11px] sm:text-xs text-[#94A3B8] mt-1 font-mono">
                // Selected production repositories and applications
              </p>
            </div>
          </motion.div>

          {projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 sm:p-8 rounded-xl border border-[#223046] bg-[#131B2A]/40 text-center text-[#94A3B8] font-mono text-xs"
            >
              No projects added yet.
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-30px' }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
            >
              {projects.map((project, idx) => (
                <motion.div
                  key={project._id || project.id || idx}
                  variants={fadeInUp}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group rounded-2xl border border-[#223046] bg-[#131B2A]/60 hover:bg-[#131B2A] hover:border-[#38BDF8] transition-all p-4 sm:p-6 flex flex-col justify-between shadow-lg hover:shadow-[0_0_30px_rgba(56,189,248,0.1)]"
                >
                  <div className="space-y-3 sm:space-y-4">
                    {project.screenshotUrl && (
                      <div className="overflow-hidden rounded-xl border border-[#223046] aspect-video">
                        <LazyImage
                          src={project.screenshotUrl}
                          alt={project.title}
                          className="group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors leading-snug">
                          {project.title}
                        </h3>
                        {project.featured && (
                          <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#00E599]/10 text-[#00E599] border border-[#00E599]/30 shrink-0">
                            Featured
                          </span>
                        )}
                      </div>

                      <p className="text-[#94A3B8] text-xs sm:text-sm leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {project.techStack && project.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-1">
                        {project.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-[11px] font-mono bg-[#0E1522] border border-[#223046] text-[#94A3B8] group-hover:text-[#F8FAFC] group-hover:border-[#38BDF8]/40 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-[#223046] text-xs font-mono">
                    {project.repoLink ? (
                      <a
                        href={project.repoLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors min-h-[34px] py-1"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>
                    ) : (
                      <span />
                    )}

                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00E599]/10 hover:bg-[#00E599]/20 text-[#00E599] border border-[#00E599]/40 font-mono font-bold text-xs transition-all ml-auto min-h-[34px]"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>

        {/* 3. Skills Matrix Section (Mobile Responsive) */}
        <section id="skills" className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={fadeInUp}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8"
          >
            <div>
              <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-[#F8FAFC] flex items-center gap-2">
                <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-[#00E599]" />
                Technical Skills & Stack
              </h2>
              <p className="text-[11px] sm:text-xs text-[#94A3B8] mt-1 font-mono">
                // Categorized languages, frameworks, infrastructure, and tools
              </p>
            </div>

            {/* Category Filter Tabs with Horizontal Scroll on Mobile */}
            {categories.length > 1 && (
              <div className="flex items-center gap-1 bg-[#131B2A] p-1 rounded-xl border border-[#223046] overflow-x-auto scrollbar-none max-w-full">
                {categories.map((cat) => {
                  const isSelected = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`relative px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-mono transition-colors cursor-pointer whitespace-nowrap ${
                        isSelected
                          ? 'text-[#0B0F17] font-bold'
                          : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                      }`}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="activeMinimalistSkillCategory"
                          className="absolute inset-0 bg-[#00E599] rounded-lg shadow-sm"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{cat}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </motion.div>

          {filteredSkills.length === 0 ? (
            <div className="p-6 sm:p-8 rounded-xl border border-[#223046] bg-[#131B2A]/40 text-center text-[#94A3B8] font-mono text-xs">
              No skills listed.
            </div>
          ) : (
            <motion.div
              layout
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3.5"
            >
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill, idx) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    whileHover={{ y: -2, transition: { duration: 0.15 } }}
                    key={skill._id || skill.id || `${skill.name}-${idx}`}
                    className="p-3 sm:p-3.5 rounded-xl border border-[#223046] bg-[#131B2A]/60 hover:bg-[#131B2A] hover:border-[#38BDF8] transition-all flex flex-col justify-between min-h-[70px]"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-[#F8FAFC] truncate">
                      {skill.name}
                    </span>
                    <div className="flex items-center justify-between mt-2 text-[9px] sm:text-[10px] font-mono text-[#94A3B8]">
                      <span className="px-1.5 py-0.5 rounded bg-[#0B0F17] border border-[#223046]">
                        {skill.category}
                      </span>
                      {skill.proficiency && (
                        <span className="text-[#38BDF8] font-semibold">{skill.proficiency}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>

        {/* Footer (Mobile Responsive) */}
        <footer className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 mt-auto border-t border-[#223046] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left text-[11px] sm:text-xs text-[#94A3B8] font-mono w-full">
          <p>© {new Date().getFullYear()} {user?.name || 'Developer'}. All rights reserved.</p>
          <p className="flex items-center justify-center gap-1.5">
            <span>Powered by</span>
            <span className="text-[#00E599] font-bold">CodeFolio</span>
          </p>
        </footer>
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

export default MinimalistTemplate;
