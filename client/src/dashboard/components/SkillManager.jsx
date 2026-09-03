import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Plus, Trash2, Zap } from 'lucide-react';
import { SKILL_CATEGORIES, PROFICIENCY_LEVELS } from '../../shared/constants.js';
import { createSkill, deleteSkill } from '../../api/skillsApi.js';
import { useLivePreview } from '../../context/LivePreviewContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

export const SkillManager = ({ skills = [], onRefresh }) => {
  const { updatePreviewSkills } = useLivePreview();
  const toast = useToast();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Frontend');
  const [proficiency, setProficiency] = useState('Advanced');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setIsSubmitting(true);
      await createSkill({
        name: name.trim(),
        category,
        proficiency
      });
      setName('');
      toast.success(`Added "${name.trim()}" to ${category}`);
      if (onRefresh) await onRefresh();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to add skill.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSkill = async (id, skillName) => {
    try {
      await deleteSkill(id);
      toast.success(`Removed "${skillName || 'skill'}"`);
      if (onRefresh) await onRefresh();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to delete skill.');
    }
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="sticky top-0 bg-slate-900/90 backdrop-blur-md py-4 z-10 border-b border-slate-800">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          Skills & Proficiencies ({skills.length})
        </h2>
        <p className="text-xs text-slate-400">Categorize your technical proficiencies across frontend, backend, and DevOps.</p>
      </div>

      {/* Quick Add Form */}
      <form
        onSubmit={handleAddSkill}
        className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg shadow-black/20"
      >
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-indigo-400" />
          Add New Skill
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-1">
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Skill Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. React / Next.js"
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm transition-all"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 text-sm transition-all"
            >
              {SKILL_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Proficiency</label>
            <div className="flex gap-2">
              <select
                value={proficiency}
                onChange={(e) => setProficiency(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 text-sm transition-all"
              >
                {PROFICIENCY_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={isSubmitting || !name.trim()}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 shrink-0 disabled:opacity-50 shadow-md shadow-indigo-600/20 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add
              </motion.button>
            </div>
          </div>
        </div>
      </form>

      {/* Skills Grouped by Category */}
      <div className="space-y-4">
        {SKILL_CATEGORIES.map((cat) => {
          const categorySkills = skills.filter((s) => s.category === cat);
          if (categorySkills.length === 0) return null;

          return (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              key={cat}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold font-mono uppercase text-indigo-400">
                  {cat} ({categorySkills.length})
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                <AnimatePresence mode="popLayout">
                  {categorySkills.map((skill) => {
                    const id = skill._id || skill.id;
                    return (
                      <motion.span
                        layout
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.2 }}
                        whileHover={{ y: -2 }}
                        key={id}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs bg-slate-800/90 border border-slate-700/70 text-slate-200 group hover:border-slate-600 transition-colors shadow-sm"
                      >
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">({skill.proficiency})</span>
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                          type="button"
                          onClick={() => handleDeleteSkill(id, skill.name)}
                          className="text-slate-500 hover:text-rose-400 transition-colors p-0.5 rounded cursor-pointer"
                          title="Delete skill"
                        >
                          <Trash2 className="w-3 h-3" />
                        </motion.button>
                      </motion.span>
                    );
                  })}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}

        {skills.length === 0 && (
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 text-center text-slate-500 text-xs font-mono">
            No skills added yet. Use the form above to add your technical proficiencies.
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillManager;
