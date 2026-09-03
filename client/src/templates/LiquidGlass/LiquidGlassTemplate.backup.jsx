import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Linkedin,
  Twitter,
  Globe,
  ExternalLink,
  Mail,
  FileText,
  Sparkles,
  Layers,
  FolderGit2,
  Zap,
  Briefcase,
  GraduationCap,
  BookOpen,
  Trophy,
  Calendar,
  MapPin,
  Clock,
  Award as AwardIcon
} from 'lucide-react';
import LazyImage from '../../portfolio/components/LazyImage.jsx';
import ProBadge from '../../portfolio/components/ProBadge.jsx';
import ContactModal from '../../portfolio/components/ContactModal.jsx';

export const LiquidGlassTemplate = ({ data, isPreview = false }) => {
  const {
    user,
    projects = [],
    skills = [],
    experiences = [],
    educations = [],
    articles = [],
    awards = []
  } = data || {};

  const [activeCategory, setActiveCategory] = useState('All');
  const [isContactOpen, setIsContactOpen] = useState(false);

  const sectionConfig = user?.sectionConfig || {
    projects: true,
    skills: true,
    experience: true,
    education: true,
    articles: true,
    awards: true
  };

  const sectionTitles = user?.sectionTitles || {
    projects: 'Featured Projects',
    skills: 'Technical Skills',
    experience: 'Work Experience',
    education: 'Education & Certifications',
    articles: 'Articles & Publications',
    awards: 'Honors & Awards'
  };

  // Group skills by category
  const skillCategories = ['Frontend', 'Backend', 'DevOps', 'Other'];
  const categorizedSkills = skillCategories.reduce((acc, cat) => {
    const list = skills.filter((s) => s.category === cat);
    if (list.length > 0) acc[cat] = list;
    return acc;
  }, {});

  // Project categories
  const projectCategories = ['All', ...new Set(projects.flatMap((p) => p.techStack || []))].slice(0, 6);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.techStack?.includes(activeCategory));

  const getProficiencyPercentage = (level) => {
    switch (level?.toLowerCase()) {
      case 'expert': return 100;
      case 'advanced': return 80;
      case 'intermediate': return 60;
      default: return 40;
    }
  };

  return (
    <div className="min-h-screen bg-[#050A14] text-slate-100 font-sans relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Dynamic Ambient Fluid Light Mesh Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Sky Cyan Fluid Orb */}
        <motion.div
          animate={{
            x: [0, 60, -30, 0],
            y: [0, -50, 40, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-20 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-cyan-500/25 via-sky-400/20 to-transparent blur-[120px]"
        />

        {/* Mint / Seafoam Green Fluid Orb */}
        <motion.div
          animate={{
            x: [0, -70, 40, 0],
            y: [0, 60, -30, 0],
            scale: [1, 0.9, 1.2, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 -right-20 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-emerald-400/20 via-teal-300/15 to-transparent blur-[130px]"
        />

        {/* Aqua Marine Deep Orb */}
        <motion.div
          animate={{
            x: [0, 40, -40, 0],
            y: [0, -30, 50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-t from-teal-500/20 via-cyan-600/15 to-transparent blur-[140px]"
        />

        {/* Subtle Liquid Glass Grid Texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #38bdf8 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* Floating Frosted Glass Navigation Bar */}
      <header className="sticky top-4 z-40 max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-slate-900/60 backdrop-blur-2xl border border-white/20 rounded-2xl px-5 py-3.5 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] flex items-center justify-between"
        >
          {/* Identity Pill */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-emerald-400 p-[1px] shadow-lg shadow-cyan-500/30">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center font-black text-cyan-300 text-xs">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'C'}
              </div>
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
                {user?.name || 'Developer'}
                {user?.isPro && <ProBadge />}
              </span>
              <span className="text-[11px] font-mono text-cyan-300 font-semibold block">
                @{user?.username || 'user'}
              </span>
            </div>
          </div>

          {/* Nav Quick Links */}
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto scrollbar-none">
            {sectionConfig.projects !== false && (
              <a
                href="#projects"
                className="text-xs font-semibold text-slate-200 hover:text-cyan-300 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-white/10"
              >
                Projects
              </a>
            )}
            {sectionConfig.skills !== false && (
              <a
                href="#skills"
                className="text-xs font-semibold text-slate-200 hover:text-emerald-300 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-white/10 hidden sm:inline"
              >
                Skills
              </a>
            )}
            {sectionConfig.experience !== false && experiences.length > 0 && (
              <a
                href="#experience"
                className="text-xs font-semibold text-slate-200 hover:text-cyan-300 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-white/10 hidden md:inline"
              >
                Experience
              </a>
            )}
            {sectionConfig.education !== false && educations.length > 0 && (
              <a
                href="#education"
                className="text-xs font-semibold text-slate-200 hover:text-amber-300 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-white/10 hidden md:inline"
              >
                Education
              </a>
            )}
            {sectionConfig.articles !== false && articles.length > 0 && (
              <a
                href="#articles"
                className="text-xs font-semibold text-slate-200 hover:text-rose-300 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-white/10 hidden lg:inline"
              >
                Articles
              </a>
            )}
            {sectionConfig.awards !== false && awards.length > 0 && (
              <a
                href="#awards"
                className="text-xs font-semibold text-slate-200 hover:text-yellow-300 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-white/10 hidden lg:inline"
              >
                Awards
              </a>
            )}

            {/* Liquid Glow Contact Trigger */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsContactOpen(true)}
              className="bg-gradient-to-r from-cyan-500/30 via-teal-500/30 to-emerald-500/30 border border-cyan-400/60 hover:border-cyan-300 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_25px_rgba(52,211,153,0.4)] transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-300" />
              <span>Contact</span>
            </motion.button>
          </div>
        </motion.div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-24 relative z-10 space-y-16">
        
        {/* ========================================================= */}
        {/* HERO SECTION WITH LIQUID GLASS HALO */}
        {/* ========================================================= */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-white/20 p-6 sm:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] overflow-hidden">
            {/* Top Specular Highlight Line */}
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent"></div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
              {/* Avatar with Animated Liquid Halo */}
              <div className="relative shrink-0">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 opacity-70 blur-md animate-pulse"></div>
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-950 border-2 border-white/30 overflow-hidden shadow-2xl">
                  {user?.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user?.name || 'Developer Avatar'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-cyan-900 to-slate-950 flex items-center justify-center font-black text-3xl sm:text-4xl text-cyan-200">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                </div>
              </div>

              {/* Bio & Headlines */}
              <div className="space-y-3 flex-1">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/50 text-xs font-mono text-cyan-200 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="font-semibold">Available for Engineering Roles</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-[0_2px_15px_rgba(56,189,248,0.4)] leading-tight">
                  {user?.name || 'Developer Portfolio'}
                </h1>

                <p className="text-base sm:text-lg font-bold text-cyan-300 drop-shadow-[0_1px_8px_rgba(56,189,248,0.3)]">
                  {user?.title || 'Full Stack Engineer & Cloud Architect'}
                </p>

                {user?.bio && (
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl pt-1 font-normal">
                    {user.bio}
                  </p>
                )}

                {/* Social & Resume CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  {user?.resumeUrl && (
                    <motion.a
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      href={user.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-slate-950" />
                      <span>View Resume</span>
                    </motion.a>
                  )}

                  <div className="flex items-center gap-2">
                    {user?.socialLinks?.github && (
                      <motion.a
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        href={user.socialLinks.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-cyan-950/80 border border-white/20 hover:border-cyan-400/60 text-slate-200 hover:text-cyan-200 transition-all shadow-md"
                        title="GitHub Profile"
                      >
                        <Github className="w-4 h-4" />
                      </motion.a>
                    )}

                    {user?.socialLinks?.linkedin && (
                      <motion.a
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        href={user.socialLinks.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-cyan-950/80 border border-white/20 hover:border-cyan-400/60 text-slate-200 hover:text-cyan-200 transition-all shadow-md"
                        title="LinkedIn Profile"
                      >
                        <Linkedin className="w-4 h-4" />
                      </motion.a>
                    )}

                    {user?.socialLinks?.twitter && (
                      <motion.a
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        href={user.socialLinks.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-cyan-950/80 border border-white/20 hover:border-cyan-400/60 text-slate-200 hover:text-cyan-200 transition-all shadow-md"
                        title="Twitter / X Profile"
                      >
                        <Twitter className="w-4 h-4" />
                      </motion.a>
                    )}

                    {user?.socialLinks?.website && (
                      <motion.a
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        href={user.socialLinks.website}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-cyan-950/80 border border-white/20 hover:border-cyan-400/60 text-slate-200 hover:text-cyan-200 transition-all shadow-md"
                        title="Personal Website"
                      >
                        <Globe className="w-4 h-4" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ========================================================= */}
        {/* 1. FEATURED PROJECTS (FROSTED GLASS CARDS) */}
        {/* ========================================================= */}
        {sectionConfig.projects !== false && (
          <section id="projects" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                    <FolderGit2 className="w-4 h-4" />
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {sectionTitles.projects || 'Featured Projects'}
                  </h2>
                </div>
                <p className="text-xs text-slate-300 font-mono">
                  // Production systems, open source repositories, and web applications
                </p>
              </div>

              {projectCategories.length > 1 && (
                <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-900/70 border border-white/20 backdrop-blur-xl">
                  {projectCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                        activeCategory === cat
                          ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-bold shadow-md shadow-cyan-500/30'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => {
                  const id = project._id || project.id || index;
                  return (
                    <motion.div
                      key={id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, delay: index * 0.05 }}
                      whileHover={{ y: -4 }}
                      className="group relative rounded-2xl bg-slate-900/60 backdrop-blur-2xl border border-white/20 hover:border-cyan-400/60 p-6 flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(56,189,248,0.25)] transition-all overflow-hidden"
                    >
                      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/0 group-hover:via-cyan-400/80 to-transparent transition-all duration-500"></div>

                      <div className="space-y-4">
                        {project.screenshotUrl && (
                          <div className="rounded-xl overflow-hidden border border-white/20 aspect-video relative group-hover:border-cyan-400/40 transition-colors">
                            <LazyImage
                              src={project.screenshotUrl}
                              alt={project.title}
                              aspectRatio="aspect-video"
                            />
                          </div>
                        )}

                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-200 transition-colors">
                              {project.title}
                            </h3>
                            {project.featured && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 font-bold">
                                <Sparkles className="w-3 h-3 text-cyan-300" />
                                Featured
                              </span>
                            )}
                          </div>

                          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed line-clamp-3">
                            {project.description}
                          </p>
                        </div>

                        {project.techStack && project.techStack.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {project.techStack.map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold bg-cyan-950/70 border border-cyan-400/40 text-cyan-200"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/10">
                        <div className="flex items-center gap-2">
                          {project.repoLink && (
                            <a
                              href={project.repoLink}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 rounded-lg bg-slate-800/80 hover:bg-cyan-950/80 text-slate-200 hover:text-cyan-200 border border-white/10 hover:border-cyan-400/40 transition-all text-xs flex items-center gap-1 font-semibold"
                            >
                              <Github className="w-3.5 h-3.5" />
                              <span className="text-[11px] font-mono">Code</span>
                            </a>
                          )}
                          {project.liveLink && (
                            <a
                              href={project.liveLink}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 rounded-lg bg-slate-800/80 hover:bg-emerald-950/80 text-slate-200 hover:text-emerald-200 border border-white/10 hover:border-emerald-400/40 transition-all text-xs flex items-center gap-1 font-semibold"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span className="text-[11px] font-mono">Live Demo</span>
                            </a>
                          )}
                        </div>

                        <span className="text-[10px] font-mono text-cyan-400/80 font-bold">
                          #{index + 1 < 10 ? `0${index + 1}` : index + 1}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {projects.length === 0 && (
              <div className="rounded-2xl bg-slate-900/60 border border-white/15 p-12 text-center text-slate-300 font-mono text-xs">
                No projects added to this portfolio yet.
              </div>
            )}
          </section>
        )}

        {/* ========================================================= */}
        {/* 2. TECHNICAL SKILLS (LIQUID PROGRESS METERS) */}
        {/* ========================================================= */}
        {sectionConfig.skills !== false && (
          <section id="skills" className="space-y-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <Layers className="w-4 h-4" />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {sectionTitles.skills || 'Technical Skills'}
                </h2>
                <p className="text-xs text-slate-300 font-mono">
                  // Core languages, frameworks, and architecture specializations
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(categorizedSkills).map(([category, categorySkills], catIdx) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: catIdx * 0.1 }}
                  className="rounded-2xl bg-slate-900/60 backdrop-blur-2xl border border-white/20 p-6 space-y-4 shadow-[0_8px_30px_rgb(0,0,0,0.3)]"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-emerald-400" />
                      {category}
                    </span>
                    <span className="text-[11px] font-mono text-slate-300 font-semibold">
                      {categorySkills.length} {categorySkills.length === 1 ? 'skill' : 'skills'}
                    </span>
                  </div>

                  <div className="space-y-3 pt-1">
                    {categorySkills.map((skill) => {
                      const percentage = getProficiencyPercentage(skill.proficiency);
                      return (
                        <div key={skill._id || skill.name} className="space-y-1.5">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-white">{skill.name}</span>
                            <span className="text-[11px] font-mono text-cyan-300">
                              {skill.proficiency}
                            </span>
                          </div>

                          <div className="h-2 rounded-full bg-slate-950 border border-white/10 overflow-hidden p-[1px]">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${percentage}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, ease: 'easeOut' }}
                              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 shadow-[0_0_12px_rgba(56,189,248,0.6)]"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>

            {skills.length === 0 && (
              <div className="rounded-2xl bg-slate-900/60 border border-white/15 p-12 text-center text-slate-300 font-mono text-xs">
                No skills added yet.
              </div>
            )}
          </section>
        )}

        {/* ========================================================= */}
        {/* 3. WORK EXPERIENCE (FROSTED CAREER TIMELINE) */}
        {/* ========================================================= */}
        {sectionConfig.experience !== false && experiences.length > 0 && (
          <section id="experience" className="space-y-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                <Briefcase className="w-4 h-4" />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {sectionTitles.experience || 'Work Experience'}
                </h2>
                <p className="text-xs text-slate-300 font-mono">
                  // Career history, engineering leadership, and systems delivered
                </p>
              </div>
            </div>

            <div className="relative border-l-2 border-cyan-500/30 ml-4 pl-6 sm:pl-8 space-y-8">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={exp._id || exp.id || idx}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="relative group"
                >
                  {/* Glowing Node Dot on Timeline */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 shadow-[0_0_12px_rgba(56,189,248,0.8)] group-hover:scale-125 transition-transform" />

                  {/* Frosted Glass Experience Card */}
                  <div className="rounded-2xl bg-slate-900/60 backdrop-blur-2xl border border-white/20 hover:border-cyan-400/50 p-6 space-y-3 shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                            {exp.role}
                            <span className="text-cyan-300 font-semibold">@ {exp.company}</span>
                          </h3>
                          {exp.verified && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#0A66C2]/25 text-[#38BDF8] border border-[#0A66C2]/60 font-bold shadow-[0_0_10px_rgba(56,189,248,0.2)]">
                              <ShieldCheck className="w-3 h-3 text-[#38BDF8]" />
                              LinkedIn Verified
                            </span>
                          )}
                        </div>
                        {exp.location && (
                          <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3" />
                            {exp.location}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-950/70 border border-cyan-400/40 text-cyan-200 font-semibold flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-cyan-400" />
                          {exp.startDate} &ndash; {exp.current ? 'Present' : exp.endDate || 'Present'}
                        </span>
                      </div>
                    </div>

                    {exp.description && (
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        {exp.description}
                      </p>
                    )}

                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="space-y-1.5 pt-2 border-t border-white/10">
                        {exp.highlights.map((h, hIdx) => (
                          <li key={hIdx} className="text-xs text-slate-300 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* 4. EDUCATION & CERTIFICATIONS */}
        {/* ========================================================= */}
        {sectionConfig.education !== false && educations.length > 0 && (
          <section id="education" className="space-y-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-400/30">
                <GraduationCap className="w-4 h-4" />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {sectionTitles.education || 'Education & Certifications'}
                </h2>
                <p className="text-xs text-slate-300 font-mono">
                  // Academic degrees, verified certificates, and foundational knowledge
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {educations.map((edu, idx) => (
                <motion.div
                  key={edu._id || edu.id || idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="rounded-2xl bg-slate-900/60 backdrop-blur-2xl border border-white/20 hover:border-amber-400/40 p-6 space-y-3 shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-white">{edu.degree}</h3>
                        {edu.verified && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#0A66C2]/25 text-[#38BDF8] border border-[#0A66C2]/60 font-bold">
                            <ShieldCheck className="w-3 h-3 text-[#38BDF8]" />
                            Verified
                          </span>
                        )}
                      </div>
                      {edu.fieldOfStudy && (
                        <p className="text-xs text-amber-300 font-semibold">{edu.fieldOfStudy}</p>
                      )}
                      <p className="text-xs text-slate-300 font-medium mt-0.5">{edu.institution}</p>
                    </div>

                    {edu.grade && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-amber-500/20 text-amber-200 border border-amber-400/40 font-bold shrink-0">
                        {edu.grade}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono pt-2 border-t border-white/10">
                    {(edu.startDate || edu.endDate) && (
                      <span>{edu.startDate} {edu.endDate ? `– ${edu.endDate}` : ''}</span>
                    )}
                    {edu.credentialUrl && (
                      <a
                        href={edu.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-300 hover:text-cyan-200 flex items-center gap-1 font-semibold"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Credential
                      </a>
                    )}
                  </div>

                  {edu.description && (
                    <p className="text-xs text-slate-300 leading-relaxed">{edu.description}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* 5. ARTICLES & PUBLICATIONS */}
        {/* ========================================================= */}
        {sectionConfig.articles !== false && articles.length > 0 && (
          <section id="articles" className="space-y-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-400/30">
                <BookOpen className="w-4 h-4" />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {sectionTitles.articles || 'Articles & Publications'}
                </h2>
                <p className="text-xs text-slate-300 font-mono">
                  // Technical deep-dives, blog posts, architecture breakdowns, and guides
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((art, idx) => (
                <motion.a
                  key={art._id || art.id || idx}
                  href={art.url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group rounded-2xl bg-slate-900/60 backdrop-blur-2xl border border-white/20 hover:border-rose-400/50 p-6 flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-all cursor-pointer"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-rose-500/20 text-rose-200 border border-rose-400/40 font-bold">
                        {art.platform || 'Article'}
                      </span>
                      {art.readTime && (
                        <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {art.readTime}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-rose-200 transition-colors leading-snug">
                      {art.title}
                    </h3>

                    {art.summary && (
                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                        {art.summary}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/10 text-xs font-mono text-slate-400">
                    <span>{art.publishDate || 'Published'}</span>
                    <span className="text-rose-300 font-semibold group-hover:underline flex items-center gap-1">
                      Read Article &rarr;
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* 6. HONORS & AWARDS */}
        {/* ========================================================= */}
        {sectionConfig.awards !== false && awards.length > 0 && (
          <section id="awards" className="space-y-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-yellow-500/20 text-yellow-300 border border-yellow-400/30">
                <Trophy className="w-4 h-4" />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {sectionTitles.awards || 'Honors & Awards'}
                </h2>
                <p className="text-xs text-slate-300 font-mono">
                  // Competitive hackathon recognitions, engineering trophies, and grants
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {awards.map((award, idx) => (
                <motion.div
                  key={award._id || award.id || idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="rounded-2xl bg-slate-900/60 backdrop-blur-2xl border border-white/20 hover:border-yellow-400/40 p-6 space-y-3 shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-yellow-500/20 border border-yellow-400/40 text-yellow-300 shrink-0 mt-0.5">
                        <AwardIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white leading-snug">{award.title}</h3>
                        <p className="text-xs text-yellow-300 font-semibold mt-0.5">&bull; {award.issuer}</p>
                      </div>
                    </div>

                    {award.date && (
                      <span className="text-[11px] font-mono text-slate-400 shrink-0">
                        {award.date}
                      </span>
                    )}
                  </div>

                  {award.description && (
                    <p className="text-xs text-slate-300 leading-relaxed pt-1">
                      {award.description}
                    </p>
                  )}

                  {award.link && (
                    <div className="pt-2 border-t border-white/10 flex justify-end">
                      <a
                        href={award.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-mono text-cyan-300 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Verification Proof
                      </a>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* FOOTER */}
        {/* ========================================================= */}
        <footer className="pt-10 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-300">
          <div>
            &copy; {new Date().getFullYear()} {user?.name || 'Developer'}. Built with CodeFolio.
          </div>
          <div className="flex items-center gap-3">
            <span className="text-cyan-300 font-bold">Liquid Glass Engine</span>
            <span className="text-slate-500">&bull;</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Back to top ↑
            </button>
          </div>
        </footer>
      </main>

      {/* Interactive Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        developerName={user?.name || 'Developer'}
        username={user?.username}
      />
    </div>
  );
};

export default LiquidGlassTemplate;
