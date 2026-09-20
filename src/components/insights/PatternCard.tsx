import React from 'react';
import { PatternInsight } from '../../data/dataTypes';
import { Sparkles, ArrowRight } from 'lucide-react';

interface PatternCardProps {
  pattern: PatternInsight;
  onExplore: (pattern: PatternInsight) => void;
}

export const PatternCard: React.FC<PatternCardProps> = ({ pattern, onExplore }) => {
  const accentStyles = {
    purple: {
      border: 'border-purple-500/30 hover:border-purple-500/60',
      badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      glow: 'hover:shadow-glow-purple'
    },
    amber: {
      border: 'border-amber-500/30 hover:border-amber-500/60',
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      glow: 'hover:shadow-glow-amber'
    },
    cyan: {
      border: 'border-sky-500/30 hover:border-sky-500/60',
      badge: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
      glow: 'hover:shadow-glow-cyan'
    },
    emerald: {
      border: 'border-emerald-500/30 hover:border-emerald-500/60',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      glow: 'hover:shadow-emerald-500/20'
    },
  }[pattern.accentColor || 'cyan'];

  return (
    <button
      type="button"
      onClick={() => onExplore(pattern)}
      aria-label={`Explore pattern: ${pattern.title}. ${pattern.headline}`}
      className={`group relative text-left w-full p-6 rounded-2xl bg-surface/80 border ${accentStyles.border} backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer ${accentStyles.glow} flex flex-col justify-between focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none`}
    >
      <div>
        {/* Top Eyebrow Badges */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="font-mono text-xs font-bold text-white tracking-wider uppercase">{pattern.title}</span>
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${accentStyles.badge}`}>
            {pattern.badge}
          </span>
        </div>

        {/* Headline */}
        <h4 className="text-lg font-semibold text-slate-100 mb-2 leading-snug group-hover:text-sky-300 transition-colors">
          "{pattern.headline}"
        </h4>

        {/* Story Description */}
        <p className="text-xs text-slate-400 leading-relaxed mb-4">
          {pattern.description}
        </p>
      </div>

      {/* Supporting Data Metric & Action */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
          <span>{pattern.metric}</span>
        </div>

        <div className="flex items-center gap-1 text-xs font-mono text-sky-400 group-hover:translate-x-1 transition-transform">
          <span>Trace Pattern</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </div>
      </div>
    </button>
  );
};
