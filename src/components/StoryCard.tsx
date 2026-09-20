import React from 'react';
import { StoryCluster } from '../data/dataTypes';
import { BookOpen, ArrowRight, Sparkles, Clock, MapPin, Layers } from 'lucide-react';

interface StoryCardProps {
  story: StoryCluster;
  onExploreStory: (story: StoryCluster) => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story, onExploreStory }) => {
  return (
    <div
      onClick={() => onExploreStory(story)}
      className="group relative rounded-2xl bg-surface/80 border border-white/10 hover:border-purple-500/50 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-purple cursor-pointer flex flex-col justify-between overflow-hidden"
    >
      {/* Decorative Corner Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-500/20 transition-all" />

      <div>
        {/* Top Header Badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300">
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="text-xs font-mono font-bold tracking-wider text-purple-300 uppercase">
              {story.timeframe}
            </span>
          </div>

          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
            {story.stats.eventsCount} Records Clustered
          </span>
        </div>

        {/* Story Title & Subtitle */}
        <h3 className="text-xl font-extrabold text-white group-hover:text-purple-300 transition-colors mb-2">
          "{story.title}"
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed mb-4">
          {story.description}
        </p>

        {/* Categories Involved Badges */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {story.categories.map((cat, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-800/90 text-slate-300 border border-slate-700/60"
            >
              • {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Story Stats & CTA Button */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>{story.stats.timeSpan}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            <span>{story.stats.primaryLocation}</span>
          </div>
        </div>

        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40 font-mono text-xs font-bold group-hover:bg-purple-500/30 group-hover:scale-105 transition-all">
          <span>EXPLORE STORY</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
