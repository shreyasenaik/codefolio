import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getPublicPortfolio } from '../../api/publicApi.js';
import { getTemplateComponent } from '../../templates/templateMap.js';
import PortfolioSEO from '../components/PortfolioSEO.jsx';
import NotFoundPortfolio from './NotFoundPortfolio.jsx';
import { Loader2 } from 'lucide-react';

export const PublicPortfolioPage = ({ overrideUsername }) => {
  const { username: paramUsername } = useParams();
  const username = overrideUsername || paramUsername;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        setNotFound(false);
        setError(null);

        const response = await getPublicPortfolio(username);
        if (isMounted) {
          if (response.success && response.data) {
            setData(response.data);
          } else {
            setNotFound(true);
          }
        }
      } catch (err) {
        if (isMounted) {
          if (err.response && err.response.status === 404) {
            setNotFound(true);
          } else {
            setError(err.response?.data?.message || 'Failed to load portfolio.');
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (username) {
      fetchPortfolio();
    }

    return () => {
      isMounted = false;
    };
  }, [username]);

  // High-fidelity skeleton loader matching developer portfolio layouts
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6 md:p-12 max-w-5xl mx-auto space-y-12 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between border-b border-neutral-900 pb-4">
          <div className="w-24 h-5 bg-neutral-900 rounded-md"></div>
          <div className="flex gap-4">
            <div className="w-16 h-4 bg-neutral-900 rounded-md"></div>
            <div className="w-16 h-4 bg-neutral-900 rounded-md"></div>
            <div className="w-20 h-7 bg-neutral-900 rounded-full"></div>
          </div>
        </div>

        {/* Hero Profile Skeleton */}
        <div className="flex flex-col md:flex-row items-center gap-8 border-b border-neutral-900 pb-12">
          <div className="w-32 h-32 rounded-2xl bg-neutral-900 shrink-0"></div>
          <div className="flex-1 space-y-3 w-full">
            <div className="w-48 h-8 bg-neutral-900 rounded-lg"></div>
            <div className="w-64 h-5 bg-neutral-900 rounded-md"></div>
            <div className="w-full max-w-xl h-12 bg-neutral-900/60 rounded-md"></div>
            <div className="flex gap-3 pt-2">
              <div className="w-28 h-8 bg-neutral-900 rounded-lg"></div>
              <div className="w-8 h-8 bg-neutral-900 rounded-lg"></div>
              <div className="w-8 h-8 bg-neutral-900 rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* Projects Grid Skeleton */}
        <div className="space-y-4">
          <div className="w-40 h-6 bg-neutral-900 rounded-md"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64 rounded-2xl bg-neutral-900/40 border border-neutral-900 p-5 space-y-3">
              <div className="h-32 bg-neutral-900 rounded-xl"></div>
              <div className="w-3/4 h-5 bg-neutral-900 rounded"></div>
              <div className="w-full h-8 bg-neutral-900/50 rounded"></div>
            </div>
            <div className="h-64 rounded-2xl bg-neutral-900/40 border border-neutral-900 p-5 space-y-3">
              <div className="h-32 bg-neutral-900 rounded-xl"></div>
              <div className="w-3/4 h-5 bg-neutral-900 rounded"></div>
              <div className="w-full h-8 bg-neutral-900/50 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (notFound) {
    return <NotFoundPortfolio username={username} />;
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-xl font-bold text-white mb-2">Error Loading Portfolio</h2>
        <p className="text-sm text-slate-400 mb-6">{error || 'An unexpected error occurred.'}</p>
        <Link
          to="/"
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
        >
          Return Home
        </Link>
      </div>
    );
  }

  // Resolve template layout dynamically via Template Engine pattern
  const TemplateComponent = getTemplateComponent(data.user?.templateId);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <PortfolioSEO user={data.user} />
      <TemplateComponent data={data} isPreview={false} />
    </motion.div>
  );
};

export default PublicPortfolioPage;
