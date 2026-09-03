import React, { useState, useEffect, useCallback } from 'react';
import { getProfile, updateProfile } from '../../api/profileApi.js';
import { getProjects } from '../../api/projectsApi.js';
import { getSkills } from '../../api/skillsApi.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useLivePreview } from '../../context/LivePreviewContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import DashboardLayout from '../components/DashboardLayout.jsx';
import ProfileForm from '../components/ProfileForm.jsx';
import ProjectManager from '../components/ProjectManager.jsx';
import SkillManager from '../components/SkillManager.jsx';
import SettingsForm from '../components/SettingsForm.jsx';
import LivePreviewPanel from '../components/LivePreviewPanel.jsx';

export const DashboardPage = () => {
  const { updateUserLocal } = useAuth();
  const { setFullPreviewData } = useLivePreview();
  const toast = useToast();

  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch all CMS data
  const loadDashboardData = useCallback(async () => {
    try {
      const [profileRes, projectsRes, skillsRes] = await Promise.all([
        getProfile(),
        getProjects().catch(() => ({ projects: [] })),
        getSkills().catch(() => ({ skills: [] }))
      ]);

      const userProfile = profileRes.profile;
      const userProjects = projectsRes.projects || [];
      const userSkills = skillsRes.skills || [];

      setProfile(userProfile);
      setProjects(userProjects);
      setSkills(userSkills);

      // Sync to live preview state
      setFullPreviewData({
        user: userProfile,
        projects: userProjects,
        skills: userSkills
      });
    } catch (err) {
      console.error('[Dashboard] Error loading dashboard data:', err);
      toast.error('Failed to load portfolio dashboard data.');
    } finally {
      setLoading(false);
    }
  }, [setFullPreviewData, toast]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  // Handle saving profile changes
  const handleSaveProfile = async (formData) => {
    try {
      setIsSaving(true);
      const res = await updateProfile(formData);
      if (res.success && res.profile) {
        setProfile(res.profile);
        updateUserLocal(res.profile);
      }
    } catch (err) {
      console.error('[Dashboard] Failed to update profile:', err);
      toast.error(err.response?.data?.message || 'Failed to save changes.');
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400 p-6 space-y-4 animate-pulse">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="font-mono text-xs tracking-wider uppercase text-slate-500">
          Initializing CodeFolio CMS & Live Sync...
        </p>
      </div>
    );
  }

  return (
    <DashboardLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      previewPanel={<LivePreviewPanel />}
    >
      {activeTab === 'profile' && (
        <ProfileForm
          profile={profile}
          onSave={handleSaveProfile}
          isSaving={isSaving}
        />
      )}

      {activeTab === 'projects' && (
        <ProjectManager
          projects={projects}
          onRefresh={loadDashboardData}
        />
      )}

      {activeTab === 'skills' && (
        <SkillManager
          skills={skills}
          onRefresh={loadDashboardData}
        />
      )}

      {activeTab === 'settings' && (
        <SettingsForm
          profile={profile}
          onSave={handleSaveProfile}
          isSaving={isSaving}
        />
      )}
    </DashboardLayout>
  );
};

export default DashboardPage;
