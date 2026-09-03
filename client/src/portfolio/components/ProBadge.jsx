import React from 'react';
import { Sparkles } from 'lucide-react';

export const ProBadge = ({ variant = 'default', size = 'sm' }) => {
  if (variant === 'cyber') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-cyber-pink to-cyber-purple text-white shadow-[0_0_12px_rgba(255,0,127,0.5)] border border-cyber-neon/30">
        <Sparkles className="w-3 h-3 text-cyber-neon animate-pulse" />
        PRO ARCHITECT
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500 to-indigo-600 text-white shadow-sm">
      <Sparkles className="w-3 h-3 text-amber-200" />
      PRO
    </span>
  );
};

export default ProBadge;
