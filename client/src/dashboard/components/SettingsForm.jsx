import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  Settings,
  Sparkles,
  Globe2,
  Info,
  Save,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { useLivePreview } from '../../context/LivePreviewContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import ProBadge from '../../portfolio/components/ProBadge.jsx';

export const SettingsForm = ({ profile, onSave, isSaving }) => {
  const { updatePreviewUser } = useLivePreview();
  const toast = useToast();
  const [copied, setCopied] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch
  } = useForm({
    defaultValues: {
      isPro: Boolean(profile?.isPro),
      customDomain: profile?.customDomain || ''
    }
  });

  const isProWatch = watch('isPro');
  const customDomainWatch = watch('customDomain');

  React.useEffect(() => {
    updatePreviewUser({ isPro: isProWatch, customDomain: customDomainWatch });
  }, [isProWatch, customDomainWatch]);

  const onSubmit = async (data) => {
    try {
      await onSave(data);
      toast.success('Settings and domain updated successfully!');
    } catch (err) {
      toast.error('Failed to save settings.');
    }
  };

  const copyPublicUrl = () => {
    const url = `${window.location.origin}/${profile?.username}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.info('Copied public portfolio URL to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between sticky top-0 bg-slate-900/90 backdrop-blur-md py-4 z-10 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-indigo-400" />
            Portfolio Settings & Domain
          </h2>
          <p className="text-xs text-slate-400">Configure Pro features and simulated custom domain mapping.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={isSaving}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all disabled:opacity-50 cursor-pointer"
        >
          {isSaving ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Settings
            </>
          )}
        </motion.button>
      </div>

      {/* Vanity URL Card */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 shadow-lg shadow-black/10">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
          Public Vanity URL
        </h3>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-300 flex items-center justify-between shadow-inner">
            <span>{window.location.origin}/{profile?.username || 'username'}</span>
            <span className="text-[10px] text-emerald-400 font-sans font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Active & Live
            </span>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={copyPublicUrl}
              className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy URL'}
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={`/${profile?.username}`}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow-md shadow-indigo-600/20 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open Live
            </motion.a>
          </div>
        </div>
      </div>

      {/* Pro Membership Toggle */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg shadow-black/10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-bold text-white">CodeFolio Pro Tier</h3>
              <ProBadge />
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Unlocks glowing Pro Architect badges across templates, custom styling accents, and enhanced visibility.
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              {...register('isPro')}
              className="sr-only peer"
            />
            <div className="w-12 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
          </label>
        </div>
      </div>

      {/* Custom Domain Settings (Simulated) */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg shadow-black/10">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-indigo-400" />
            Custom Domain Mapping
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Map your personal domain (e.g., <code className="text-indigo-300">portfolio.yourname.dev</code>) directly to your CodeFolio page.
          </p>
        </div>

        {/* Informative Note Flagging Architecture Simulation */}
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-amber-200">System Architecture Note (Simulated Feature):</p>
            <p className="text-amber-300/90 leading-relaxed">
              This field simulates DNS/CNAME domain association for portfolio data. In a full production setup with Cloudflare for SaaS or AWS Route53, CNAME records would be verified via automated SSL handshake.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
            Custom Domain Name
          </label>
          <input
            type="text"
            placeholder="e.g. portfolio.alexrivera.dev"
            {...register('customDomain')}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm font-mono transition-all"
          />
        </div>
      </div>
    </form>
  );
};

export default SettingsForm;
