import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

const LivePreviewContext = createContext(null);

export const LivePreviewProvider = ({ children }) => {
  const [previewState, setPreviewState] = useState({
    user: {
      name: '',
      username: '',
      title: '',
      bio: '',
      avatarUrl: '',
      resumeUrl: '',
      socialLinks: { github: '', linkedin: '', twitter: '', website: '' },
      templateId: 'minimalist',
      isPro: false,
      customDomain: ''
    },
    projects: [],
    skills: []
  });

  const [previewDevice, setPreviewDevice] = useState('desktop'); // 'desktop' | 'mobile'
  const [isPreviewOpen, setIsPreviewOpen] = useState(true);

  const updatePreviewUser = useCallback((fields) => {
    setPreviewState((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        ...fields,
        socialLinks: {
          ...prev.user?.socialLinks,
          ...(fields.socialLinks || {})
        }
      }
    }));
  }, []);

  const updatePreviewProjects = useCallback((projects) => {
    setPreviewState((prev) => ({
      ...prev,
      projects
    }));
  }, []);

  const updatePreviewSkills = useCallback((skills) => {
    setPreviewState((prev) => ({
      ...prev,
      skills
    }));
  }, []);

  const setFullPreviewData = useCallback((data) => {
    if (!data) return;
    setPreviewState({
      user: data.user || {},
      projects: data.projects || [],
      skills: data.skills || []
    });
  }, []);

  const contextValue = useMemo(() => ({
    previewState,
    previewDevice,
    setPreviewDevice,
    isPreviewOpen,
    setIsPreviewOpen,
    updatePreviewUser,
    updatePreviewProjects,
    updatePreviewSkills,
    setFullPreviewData
  }), [
    previewState,
    previewDevice,
    isPreviewOpen,
    updatePreviewUser,
    updatePreviewProjects,
    updatePreviewSkills,
    setFullPreviewData
  ]);

  return (
    <LivePreviewContext.Provider value={contextValue}>
      {children}
    </LivePreviewContext.Provider>
  );
};

export const useLivePreview = () => {
  const context = useContext(LivePreviewContext);
  if (!context) {
    throw new Error('useLivePreview must be used within a LivePreviewProvider');
  }
  return context;
};

export default LivePreviewContext;
