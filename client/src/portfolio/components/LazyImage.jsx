import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

export const LazyImage = ({
  src,
  alt = 'Project Screenshot',
  className = '',
  aspectRatio = 'aspect-video',
  fallbackText
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className={`w-full ${aspectRatio} bg-slate-800/80 border border-slate-700/50 flex flex-col items-center justify-center text-slate-500 rounded-lg p-4 text-center ${className}`}>
        <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
        <span className="text-xs font-mono">{fallbackText || alt}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-slate-900 ${aspectRatio} rounded-lg ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-slate-800 animate-pulse flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover transition-all duration-500 ${
          loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
      />
    </div>
  );
};

export default LazyImage;
