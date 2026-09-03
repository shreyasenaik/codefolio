import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  User,
  AtSign,
  Briefcase,
  AlignLeft,
  Image,
  FileText,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Save,
  Check,
  Layout,
  Sparkles
} from 'lucide-react';
import { useLivePreview } from '../../context/LivePreviewContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { TEMPLATES } from '../../shared/constants.js';

export const ProfileForm = ({ profile, onSave, isSaving }) => {
  const { updatePreviewUser } = useLivePreview();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: profile?.name || '',
      username: profile?.username || '',
      title: profile?.title || '',
      bio: profile?.bio || '',
      avatarUrl: profile?.avatarUrl || '',
      resumeUrl: profile?.resumeUrl || '',
      templateId: profile?.templateId || 'minimalist',
      socialLinks: {
        github: profile?.socialLinks?.github || '',
        linkedin: profile?.socialLinks?.linkedin || '',
        twitter: profile?.socialLinks?.twitter || '',
        website: profile?.socialLinks?.website || ''
      }
    }
  });

  // Keep form updated when profile props load
  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name || '',
        username: profile.username || '',
        title: profile.title || '',
        bio: profile.bio || '',
        avatarUrl: profile.avatarUrl || '',
        resumeUrl: profile.resumeUrl || '',
        templateId: profile.templateId || 'minimalist',
        socialLinks: {
          github: profile.socialLinks?.github || '',
          linkedin: profile.socialLinks?.linkedin || '',
          twitter: profile.socialLinks?.twitter || '',
          website: profile.socialLinks?.website || ''
        }
      });
      updatePreviewUser(profile);
    }
  }, [profile, reset]);

  // Watch form fields to live-update split screen preview in real-time
  const watchedValues = watch();
  useEffect(() => {
    updatePreviewUser(watchedValues);
  }, [
    watchedValues.name,
    watchedValues.username,
    watchedValues.title,
    watchedValues.bio,
    watchedValues.avatarUrl,
    watchedValues.resumeUrl,
    watchedValues.templateId,
    watchedValues.socialLinks?.github,
    watchedValues.socialLinks?.linkedin,
    watchedValues.socialLinks?.twitter,
    watchedValues.socialLinks?.website
  ]);

  const onSubmit = async (data) => {
    try {
      await onSave(data);
      toast.success('Profile and vanity URL saved successfully!');
    } catch (err) {
      toast.error('Failed to save profile changes.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-10">
      {/* Header Actions */}
      <div className="flex items-center justify-between sticky top-0 bg-slate-900/90 backdrop-blur-md py-4 z-10 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <User className="w-5 h-5 text-indigo-400" />
            Profile & Bio
          </h2>
          <p className="text-xs text-slate-400">Configure your public developer presence and vanity details.</p>
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
              Save Changes
            </>
          )}
        </motion.button>
      </div>

      {/* Template Picker with Cards */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-200 flex items-center gap-2">
          <Layout className="w-4 h-4 text-indigo-400" />
          Select Portfolio Template
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TEMPLATES.map((tmpl) => {
            const isSelected = watch('templateId') === tmpl.id;
            return (
              <motion.label
                key={tmpl.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex flex-col p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-950/30 shadow-[0_0_20px_rgba(99,102,241,0.25)]'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <input
                  type="radio"
                  value={tmpl.id}
                  {...register('templateId')}
                  className="sr-only"
                />
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{tmpl.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                      {tmpl.badge}
                    </span>
                  </div>
                  {isSelected && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/50"
                    >
                      <Check className="w-3 h-3 stroke-[3]" />
                    </motion.span>
                  )}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">{tmpl.description}</p>
                <div className={`h-12 rounded-xl bg-gradient-to-r ${tmpl.color} border border-slate-800/80 flex items-center justify-center text-[10px] font-mono text-slate-300 shadow-inner`}>
                  {tmpl.id === 'cyberpunk'
                    ? '> NEON_TERMINAL_HUD'
                    : 'minimal_typography'}
                </div>
              </motion.label>
            );
          })}
        </div>
      </div>

      {/* Core Identity */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-5">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Basic Identity</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              Full Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Alex Rivera"
              {...register('name', { required: 'Name is required' })}
              className={`w-full px-4 py-2.5 rounded-xl bg-slate-800 border ${
                errors.name ? 'border-rose-500' : 'border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
              } text-white placeholder-slate-500 focus:outline-none text-sm transition-all`}
            />
            {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
              <AtSign className="w-3.5 h-3.5 text-slate-400" />
              Vanity Username (URL Slug) *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-500 text-sm font-mono">/</span>
              <input
                type="text"
                placeholder="alexrivera"
                {...register('username', {
                  required: 'Username is required',
                  pattern: {
                    value: /^[a-zA-Z0-9_-]+$/,
                    message: 'Alphanumeric, underscores and dashes only'
                  }
                })}
                className={`w-full pl-7 pr-4 py-2.5 rounded-xl bg-slate-800 border ${
                  errors.username ? 'border-rose-500' : 'border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                } text-white placeholder-slate-500 focus:outline-none text-sm font-mono transition-all`}
              />
            </div>
            {errors.username && <p className="text-xs text-rose-400 mt-1">{errors.username.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-slate-400" />
            Headline / Professional Title
          </label>
          <input
            type="text"
            placeholder="e.g. Senior Full Stack Engineer & Cloud Architect"
            {...register('title')}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
            <AlignLeft className="w-3.5 h-3.5 text-slate-400" />
            Bio / Elevator Pitch
          </label>
          <textarea
            rows={4}
            placeholder="Brief story, tech passions, and career focus..."
            {...register('bio')}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm leading-relaxed transition-all"
          />
        </div>
      </div>

      {/* Assets & Media */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-5">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Avatar & Resume</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
              <Image className="w-3.5 h-3.5 text-slate-400" />
              Avatar Image URL
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              {...register('avatarUrl')}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              Resume Link (PDF URL / Google Drive)
            </label>
            <input
              type="url"
              placeholder="https://example.com/resume.pdf"
              {...register('resumeUrl')}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm transition-all"
            />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-5">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Social Links</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5 text-slate-400" />
              GitHub URL
            </label>
            <input
              type="url"
              placeholder="https://github.com/username"
              {...register('socialLinks.github')}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm font-mono transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5 text-slate-400" />
              LinkedIn URL
            </label>
            <input
              type="url"
              placeholder="https://linkedin.com/in/username"
              {...register('socialLinks.linkedin')}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm font-mono transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
              <Twitter className="w-3.5 h-3.5 text-slate-400" />
              Twitter / X URL
            </label>
            <input
              type="url"
              placeholder="https://twitter.com/username"
              {...register('socialLinks.twitter')}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm font-mono transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              Personal Website / Blog
            </label>
            <input
              type="url"
              placeholder="https://myblog.dev"
              {...register('socialLinks.website')}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm font-mono transition-all"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
