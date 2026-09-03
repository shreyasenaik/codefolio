import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { X, Plus, FolderPlus, Save, Sparkles } from 'lucide-react';

export const ProjectFormModal = ({ isOpen, onClose, onSave, project, isSaving }) => {
  const [techTags, setTechTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      repoLink: '',
      liveLink: '',
      screenshotUrl: '',
      featured: false
    }
  });

  useEffect(() => {
    if (project) {
      reset({
        title: project.title || '',
        description: project.description || '',
        repoLink: project.repoLink || '',
        liveLink: project.liveLink || '',
        screenshotUrl: project.screenshotUrl || '',
        featured: Boolean(project.featured)
      });
      setTechTags(Array.isArray(project.techStack) ? project.techStack : []);
    } else {
      reset({
        title: '',
        description: '',
        repoLink: '',
        liveLink: '',
        screenshotUrl: '',
        featured: false
      });
      setTechTags([]);
    }
  }, [project, reset, isOpen]);

  const handleAddTag = (e) => {
    e?.preventDefault();
    const trimmed = tagInput.trim();
    if (trimmed && !techTags.includes(trimmed)) {
      setTechTags([...techTags, trimmed]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTechTags(techTags.filter((t) => t !== tagToRemove));
  };

  const onSubmit = (formData) => {
    onSave({
      ...formData,
      techStack: techTags
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] relative z-10"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                  <FolderPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {project ? 'Edit Project' : 'Add New Project'}
                  </h3>
                  <p className="text-xs text-slate-400">Showcase your technical work, repositories, and live demos.</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 overflow-y-auto space-y-5 flex-1">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Project Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Distributed Task Engine"
                  {...register('title', { required: 'Project title is required' })}
                  className={`w-full px-4 py-2.5 rounded-xl bg-slate-800 border ${
                    errors.title ? 'border-rose-500' : 'border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                  } text-white placeholder-slate-500 focus:outline-none text-sm transition-all`}
                />
                {errors.title && <p className="text-xs text-rose-400 mt-1">{errors.title.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Description *
                </label>
                <textarea
                  rows={3}
                  placeholder="Explain the problem solved, architectural approach, and key metrics..."
                  {...register('description', { required: 'Description is required' })}
                  className={`w-full px-4 py-2.5 rounded-xl bg-slate-800 border ${
                    errors.description ? 'border-rose-500' : 'border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                  } text-white placeholder-slate-500 focus:outline-none text-sm leading-relaxed transition-all`}
                />
                {errors.description && <p className="text-xs text-rose-400 mt-1">{errors.description.message}</p>}
              </div>

              {/* Tech Stack Tag Manager */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Tech Stack Technologies
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    placeholder="Type tag (e.g. React, Docker, Redis) and press Enter"
                    className="flex-1 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium border border-slate-700 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </motion.button>
                </div>

                {techTags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                    {techTags.map((tag) => (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-indigo-950/50 border border-indigo-500/30 text-indigo-300"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-rose-400 cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </motion.span>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    GitHub Repository URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/user/repo"
                    {...register('repoLink')}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://myproject.com"
                    {...register('liveLink')}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Screenshot Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  {...register('screenshotUrl')}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 cursor-pointer hover:border-slate-600 transition-colors">
                  <input
                    type="checkbox"
                    {...register('featured')}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-600 bg-slate-700 cursor-pointer"
                  />
                  <div>
                    <span className="text-sm font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      Feature this project
                    </span>
                    <p className="text-xs text-slate-400">Highlights this project prominently on your portfolio.</p>
                  </div>
                </label>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSaving ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      {project ? 'Update Project' : 'Create Project'}
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectFormModal;
