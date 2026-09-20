import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  trend?: string;
  icon: LucideIcon;
  accentColor: 'cyan' | 'amber' | 'emerald' | 'purple';
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  icon: Icon,
  accentColor,
  onClick
}) => {
  const colorStyles = {
    cyan: {
      bg: 'bg-sky-500/10',
      border: 'border-sky-500/20 hover:border-sky-500/40',
      iconBg: 'bg-sky-500/20 text-sky-400',
      glow: 'group-hover:shadow-glow-cyan'
    },
    amber: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20 hover:border-amber-500/40',
      iconBg: 'bg-amber-500/20 text-amber-400',
      glow: 'group-hover:shadow-glow-amber'
    },
    emerald: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20 hover:border-emerald-500/40',
      iconBg: 'bg-emerald-500/20 text-emerald-400',
      glow: 'group-hover:shadow-emerald-500/20'
    },
    purple: {
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20 hover:border-purple-500/40',
      iconBg: 'bg-purple-500/20 text-purple-400',
      glow: 'group-hover:shadow-glow-purple'
    },
  }[accentColor];

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${title}: ${value}. ${subtitle}`}
      className={`group relative text-left w-full p-6 rounded-2xl bg-surface/70 border ${colorStyles.border} backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer ${colorStyles.glow} focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono tracking-wider text-slate-400 uppercase">{title}</span>
        <div className={`p-2.5 rounded-xl ${colorStyles.iconBg} transition-transform group-hover:scale-110`}>
          <Icon className="w-5 h-5" aria-hidden="true" />
        </div>
      </div>

      <div className="space-y-1 mb-2">
        <h3 className="text-3xl font-mono font-bold text-white tracking-tight">{value}</h3>
        <p className="text-xs text-slate-400 font-sans">{subtitle}</p>
      </div>

      {trend && (
        <div className="pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>{trend}</span>
        </div>
      )}
    </button>
  );
};
