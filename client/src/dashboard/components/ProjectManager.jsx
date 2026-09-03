import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  FolderGit2,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Github,
  Sparkles,
  GripVertical
} from 'lucide-react';
import ProjectFormModal from './ProjectFormModal.jsx';
import { createProject, updateProject, deleteProject } from '../../api/projectsApi.js';
import { useLivePreview } from '../../context/LivePreviewContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

// Sortable Project Item Component
const SortableProjectCard = ({ project, onEdit, onDelete }) => {
  const id = project._id || project.id;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 20 : 1,
    opacity: isDragging ? 0.7 : 1
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-slate-900/70 border ${
        isDragging ? 'border-indigo-500 shadow-2xl bg-indigo-950/20' : 'border-slate-800 hover:border-slate-700'
      } rounded-2xl p-4 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group`}
    >
      <div className="flex items-start gap-3 flex-1">
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          type="button"
          className="cursor-grab active:cursor-grabbing p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors mt-1 sm:mt-0"
          title="Drag to reorder"
        >
          <GripVertical className="w-4 h-4" />
        </button>

        {project.screenshotUrl ? (
          <img
            src={project.screenshotUrl}
            alt={project.title}
            className="w-16 h-16 rounded-xl object-cover border border-slate-800 shrink-0 bg-slate-950"
          />
        ) : (
          <div className="w-16 h-16 rounded-xl bg-slate-800 border border-slate-700/60 flex items-center justify-center text-slate-500 shrink-0">
            <FolderGit2 className="w-6 h-6 opacity-40" />
          </div>
        )}

        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-bold text-sm text-white">{project.title}</h4>
            {project.featured && (
              <span className="inline-flex items-center gap-1 text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                <Sparkles className="w-2.5 h-2.5" />
                Featured
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 line-clamp-1 max-w-lg">{project.description}</p>
          {project.techStack && project.techStack.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {project.techStack.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700/50"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 self-end sm:self-center">
        {project.repoLink && (
          <a
            href={project.repoLink}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="View GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
        )}
        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="View Live"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onEdit(project)}
          className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          title="Edit Project"
        >
          <Edit2 className="w-4 h-4" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onDelete(id)}
          className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
          title="Delete Project"
        >
          <Trash2 className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
};

export const ProjectManager = ({ projects = [], onRefresh }) => {
  const { updatePreviewProjects } = useLivePreview();
  const toast = useToast();
  const [items, setItems] = useState(projects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  React.useEffect(() => {
    setItems(projects);
  }, [projects]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => (item._id || item.id) === active.id);
      const newIndex = items.findIndex((item) => (item._id || item.id) === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);
      updatePreviewProjects(newItems);

      // Persist new orders to backend
      try {
        await Promise.all(
          newItems.map((p, idx) =>
            updateProject(p._id || p.id, { order: idx + 1 })
          )
        );
        toast.success('Project order updated');
      } catch (err) {
        console.warn('Could not save reordered list to backend:', err);
      }
    }
  };

  const handleOpenAdd = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleSave = async (projectData) => {
    try {
      setIsSaving(true);
      if (editingProject) {
        await updateProject(editingProject._id || editingProject.id, projectData);
        toast.success('Project updated successfully');
      } else {
        await createProject(projectData);
        toast.success('New project added successfully');
      }

      setIsModalOpen(false);
      setEditingProject(null);
      if (onRefresh) await onRefresh();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to save project.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteProject(id);
      toast.success('Project deleted');
      if (onRefresh) await onRefresh();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to delete project.');
    }
  };

  const itemIds = items.map((i) => i._id || i.id);

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between sticky top-0 bg-slate-900/90 backdrop-blur-md py-4 z-10 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-indigo-400" />
            Projects ({items.length})
          </h2>
          <p className="text-xs text-slate-400">Drag items by handle to reorder, or edit showcase details.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm flex items-center gap-1.5 shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </motion.button>
      </div>

      {/* Empty State */}
      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center"
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto mb-3">
            <FolderGit2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">No Projects Yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mb-5">
            Add your first software project, web application, or repository to showcase on your portfolio.
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer"
          >
            + Create First Project
          </motion.button>
        </motion.div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {items.map((p) => (
                <SortableProjectCard
                  key={p._id || p.id}
                  project={p}
                  onEdit={handleOpenEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {/* Project Form Modal */}
      <ProjectFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        project={editingProject}
        isSaving={isSaving}
      />
    </div>
  );
};

export default ProjectManager;
