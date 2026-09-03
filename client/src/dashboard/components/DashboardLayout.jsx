import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  LogOut,
  ExternalLink,
  Eye,
  EyeOff,
  User,
  FolderGit2,
  Layers,
  Settings,
  Sun,
  Moon,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useLivePreview } from '../../context/LivePreviewContext.jsx';
import ProBadge from '../../portfolio/components/ProBadge.jsx';

export const DashboardLayout = ({
  children,
  activeTab,
  onTabChange,
  previewPanel
}) => {
  const { user, logout } = useAuth();
  const { isPreviewOpen, setIsPreviewOpen, previewState } = useLivePreview();
  const [themeMode, setThemeMode] = useState('dark');
  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navTabs = [
    { id: 'profile', label: 'Profile & Bio', icon: User },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'skills', label: 'Skills', icon: Layers },
    { id: 'settings', label: 'Settings & Domain', icon: Settings }
  ];

  const username = user?.username || previewState?.user?.username || 'user';

  return (
    <div className={`min-h-screen flex flex-col ${themeMode === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-900 text-slate-100'} transition-colors duration-200`}>
      {/* Top Navbar */}
      <header className="h-14 sm:h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40 px-3 sm:px-6 flex items-center justify-between shrink-0">
        {/* Brand */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link to="/dashboard" className="flex items-center gap-2 font-black text-base sm:text-lg text-white">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/30"
            >
              <Code2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.div>
            <span>CodeFolio</span>
          </Link>

          {/* Vanity URL preview pill */}
          <motion.a
            whileHover={{ scale: 1.02 }}
            href={`/${username}`}
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700/80 text-xs font-mono text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
          >
            <span>codefolio.dev/{username}</span>
            <ExternalLink className="w-3 h-3 text-indigo-400" />
          </motion.a>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {user?.isPro && <ProBadge />}

          {/* Theme Accent Mode Toggle */}
          <button
            onClick={() => setThemeMode(themeMode === 'dark' ? 'slate' : 'dark')}
            className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Toggle theme contrast"
          >
            {themeMode === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {/* Desktop Toggle Live Preview Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsPreviewOpen(!isPreviewOpen)}
            className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
              isPreviewOpen
                ? 'bg-slate-800 border-slate-700 text-slate-200'
                : 'bg-indigo-600/20 border-indigo-500/40 text-indigo-300'
            }`}
          >
            {isPreviewOpen ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{isPreviewOpen ? 'Hide Preview' : 'Live Preview'}</span>
          </motion.button>

          {/* Mobile Live Preview Button */}
          <button
            onClick={() => setIsMobilePreviewOpen(true)}
            className="flex lg:hidden items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 text-xs font-semibold cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={`/${username}`}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium items-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Public</span>
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </motion.button>
        </div>
      </header>

      {/* Main Split Screen Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left CMS Form Area */}
        <div className={`flex-1 flex flex-col h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] overflow-y-auto ${isPreviewOpen ? 'lg:max-w-[50%]' : 'max-w-4xl mx-auto w-full'}`}>
          {/* Navigation Tabs Bar with Sliding Pill (Mobile Horizontal Scroll) */}
          <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-2 shrink-0">
            <div className="flex gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto relative scrollbar-none">
              {navTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`relative flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer z-10 ${
                      isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeDashboardTab"
                        className="absolute inset-0 bg-indigo-600 rounded-xl shadow-md shadow-indigo-600/30"
                        transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5" />
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Content Area with Page Transition */}
          <div className="px-4 sm:px-6 py-4 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Live Preview Area (Desktop Split Screen) */}
        {isPreviewOpen && (
          <div className="hidden lg:block lg:flex-1 h-[calc(100vh-4rem)]">
            {previewPanel}
          </div>
        )}
      </div>

      {/* Mobile Live Preview Fullscreen Modal / Drawer */}
      <AnimatePresence>
        {isMobilePreviewOpen && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 bg-slate-950 flex flex-col lg:hidden"
          >
            <div className="h-14 px-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
              <span className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Mobile Live Preview
              </span>
              <button
                onClick={() => setIsMobilePreviewOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {previewPanel}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardLayout;
