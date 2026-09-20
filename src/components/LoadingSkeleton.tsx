import React from 'react';
import { Sparkles } from 'lucide-react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center space-y-4">
      <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 animate-pulse shadow-glow-cyan">
        <Sparkles className="w-6 h-6" />
      </div>
      <div className="space-y-1 font-mono">
        <h3 className="text-sm font-bold text-white tracking-widest uppercase">GATHERING YOUR TRACES...</h3>
        <p className="text-xs text-slate-500">Synthesizing digital footprints and activity clusters.</p>
      </div>
    </div>
  );
};
