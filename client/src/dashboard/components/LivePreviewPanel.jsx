import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Monitor,
  Smartphone,
  Lock,
  RefreshCw,
  Eye,
  Sparkles
} from 'lucide-react';
import { useLivePreview } from '../../context/LivePreviewContext.jsx';
import { getTemplateComponent } from '../../templates/templateMap.js';

export const LivePreviewPanel = () => {
  const {
    previewState,
    previewDevice,
    setPreviewDevice
  } = useLivePreview();

  const [isUpdating, setIsUpdating] = useState(false);

  // Trigger subtle update pulse when previewState values change (without hard re-render flash)
  useEffect(() => {
    setIsUpdating(true);
    const timer = setTimeout(() => setIsUpdating(false), 400);
    return () => clearTimeout(timer);
  }, [
    previewState.user?.name,
    previewState.user?.title,
    previewState.user?.bio,
    previewState.user?.templateId,
    previewState.user?.avatarUrl,
    previewState.projects?.length,
    previewState.skills?.length
  ]);

  const templateId = previewState.user?.templateId || 'minimalist';
  const TemplateComponent = getTemplateComponent(templateId);
  const username = previewState.user?.username || 'alexrivera';

  return (
    <div className="h-full flex flex-col bg-slate-950 border-l border-slate-800">
      {/* Top Preview Controls Bar */}
      <div className="h-14 px-4 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs font-bold text-slate-300 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            LIVE_PREVIEW
          </span>

          {/* Sync indicator pulse badge */}
          <AnimatePresence>
            {isUpdating && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1 font-mono"
              >
                <Sparkles className="w-2.5 h-2.5 animate-spin" />
                syncing
              </motion.span>
            )}
          </AnimatePresence>

          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono border border-slate-700">
            {templateId}
          </span>
        </div>

        {/* Device Switcher */}
        <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg border border-slate-700/80">
          <button
            onClick={() => setPreviewDevice('desktop')}
            className={`p-1.5 rounded-md transition-colors cursor-pointer ${
              previewDevice === 'desktop'
                ? 'bg-slate-700 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Desktop Viewport Mockup"
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setPreviewDevice('mobile')}
            className={`p-1.5 rounded-md transition-colors cursor-pointer ${
              previewDevice === 'mobile'
                ? 'bg-slate-700 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Mobile Viewport Mockup"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Public link */}
        {username && (
          <a
            href={`/${username}`}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-mono transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Public</span>
          </a>
        )}
      </div>

      {/* Realistic Mockup Canvas */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 flex items-start justify-center bg-slate-950/70">
        {previewDevice === 'desktop' ? (
          /* Realistic Desktop Browser Mockup Frame */
          <div className="w-full max-w-5xl rounded-2xl border border-slate-800 shadow-2xl overflow-hidden bg-neutral-950 flex flex-col my-2">
            {/* macOS Style Chrome Bar */}
            <div className="h-10 bg-slate-900 border-b border-slate-800 px-4 flex items-center gap-3 shrink-0">
              {/* Traffic Light Dots */}
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block border border-rose-600/40"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block border border-amber-600/40"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block border border-emerald-600/40"></span>
              </div>

              {/* URL Address Bar */}
              <div className="flex-1 max-w-md mx-auto h-6 bg-slate-950 border border-slate-800 rounded-md flex items-center px-2.5 text-[11px] font-mono text-slate-400 gap-1.5 shadow-inner">
                <Lock className="w-2.5 h-2.5 text-emerald-400" />
                <span className="text-slate-300">codefolio.dev</span>
                <span className="text-slate-500">/{username}</span>
              </div>
            </div>

            {/* Template Container */}
            <div className="flex-1 overflow-y-auto max-h-[calc(100vh-14rem)]">
              <TemplateComponent data={previewState} isPreview={true} />
            </div>
          </div>
        ) : (
          /* Realistic Mobile Phone Mockup Frame */
          <div className="w-[380px] rounded-[48px] border-[10px] border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden bg-neutral-950 flex flex-col my-4 relative">
            {/* Dynamic Island / Speaker Notch */}
            <div className="h-8 bg-neutral-950 flex items-center justify-center relative shrink-0">
              <div className="w-24 h-4 bg-slate-900 rounded-full border border-slate-800 flex items-center justify-end px-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500/60"></div>
              </div>
            </div>

            {/* Mobile Scrollable Viewport */}
            <div className="flex-1 overflow-y-auto max-h-[640px]">
              <TemplateComponent data={previewState} isPreview={true} />
            </div>

            {/* Mobile Home Bar */}
            <div className="h-5 bg-neutral-950 flex items-center justify-center shrink-0">
              <div className="w-32 h-1 bg-slate-700 rounded-full"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LivePreviewPanel;
