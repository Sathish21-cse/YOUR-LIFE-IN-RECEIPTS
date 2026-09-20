import React, { useState } from 'react';
import { Clock, Sparkles, Filter } from 'lucide-react';

interface ActivityHeatmapProps {
  activityByHour: number[];
  activityByDay: Record<string, number>;
  onSelectHour: (hour: number) => void;
  selectedHour: number | null;
}

export const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({
  activityByHour,
  activityByDay,
  onSelectHour,
  selectedHour
}) => {
  const maxHourCount = Math.max(...activityByHour, 1);

  const getHeatmapColor = (count: number) => {
    const ratio = count / maxHourCount;
    if (ratio > 0.75) return 'bg-sky-400 text-black shadow-glow-cyan font-bold';
    if (ratio > 0.5) return 'bg-sky-500/60 text-white font-semibold';
    if (ratio > 0.25) return 'bg-sky-600/30 text-sky-200';
    if (ratio > 0) return 'bg-sky-950/40 text-sky-400 border border-sky-500/20';
    return 'bg-white/[0.02] text-slate-600 border border-white/5';
  };

  const formatHourLabel = (h: number) => {
    if (h === 0) return '12 AM';
    if (h === 12) return '12 PM';
    return h > 12 ? `${h - 12} PM` : `${h} AM`;
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-surface/80 border border-white/10 backdrop-blur-xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-mono mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>24-HOUR DIGITAL RHYTHM MATRIX</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            ACTIVITY DENSITY BY HOUR
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Click any hour cell to filter receipt records logged during that timeframe.
          </p>
        </div>

        {selectedHour !== null && (
          <button
            onClick={() => onSelectHour(-1)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/20 text-sky-300 text-xs font-mono border border-sky-500/40 hover:bg-sky-500/30"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Clear Hour Filter ({formatHourLabel(selectedHour)})</span>
          </button>
        )}
      </div>

      {/* 24-Hour Grid Heatmap */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-2">
        {activityByHour.map((count, hour) => {
          const isSelected = selectedHour === hour;
          return (
            <button
              key={hour}
              onClick={() => onSelectHour(hour)}
              className={`p-3 rounded-xl flex flex-col items-center justify-between transition-all duration-200 ${getHeatmapColor(count)} ${
                isSelected ? 'ring-2 ring-sky-300 scale-105 z-10' : 'hover:scale-105'
              }`}
            >
              <span className="text-[10px] font-mono tracking-tight opacity-80 mb-1">
                {formatHourLabel(hour)}
              </span>
              <span className="text-sm font-mono font-extrabold">{count}</span>
              <span className="text-[9px] font-mono opacity-60">traces</span>
            </button>
          );
        })}
      </div>

      {/* Day of Week Intensity Bar */}
      <div className="pt-4 border-t border-white/10 space-y-3">
        <span className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider block">
          WEEKLY VOLUME DISTRIBUTION
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
          {Object.entries(activityByDay).map(([day, count]) => (
            <div key={day} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-[11px] font-mono text-slate-400 block">{day.slice(0, 3)}</span>
              <span className="text-lg font-mono font-bold text-white block">{count}</span>
              <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                <div
                  className="bg-sky-400 h-full rounded-full"
                  style={{ width: `${Math.min(100, (count / 600) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
