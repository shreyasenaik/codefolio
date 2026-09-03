import React from 'react';
import { Link } from 'react-router-dom';
import { UserX, ArrowLeft, Plus } from 'lucide-react';

export const NotFoundPortfolio = ({ username }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-6 shadow-2xl">
        <UserX className="w-10 h-10 text-rose-400" />
      </div>

      <span className="text-xs uppercase font-mono font-bold tracking-widest text-rose-400 mb-2">
        404 &bull; USER_NOT_FOUND
      </span>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
        Portfolio Not Found
      </h1>

      <p className="text-slate-400 max-w-md text-sm leading-relaxed mb-8">
        The developer portfolio for <span className="text-indigo-400 font-mono">@{username || 'unknown'}</span> has not been claimed or created yet.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/register"
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all"
        >
          <Plus className="w-4 h-4" />
          Claim @{username || 'username'}
        </Link>
        <Link
          to="/"
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm flex items-center gap-2 transition-colors border border-slate-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to CodeFolio
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPortfolio;
