import React from 'react';
import { Sparkles, ArrowRight, Compass, Music, CreditCard, MapPin, Network } from 'lucide-react';
import { SummaryData } from '../../data/dataTypes';

interface HeroProps {
  summary: SummaryData;
  onDiscoverStory: () => void;
  onExploreReceipts: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  summary,
  onDiscoverStory,
  onExploreReceipts
}) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 bg-hero-glow">
      {/* Background Accent Mesh Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-mono mb-8 backdrop-blur-md shadow-glow-cyan animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
          <span>Interactive Digital Story & Data Journal</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 uppercase">
          <span className="block text-slate-100 font-mono tracking-widest">YOUR LIFE,</span>
          <span className="block bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent font-extrabold pb-2">
            IN RECEIPTS.
          </span>
        </h1>

        {/* Tagline & Description */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-300 font-light leading-relaxed mb-10">
          Thousands of tiny moments. <br className="hidden sm:block" />
          One story waiting to be discovered.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            type="button"
            onClick={onDiscoverStory}
            aria-label="Discover your story narrative"
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold shadow-glow-cyan hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all duration-200 group focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <span>DISCOVER YOUR STORY</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </button>
          
          <button
            type="button"
            onClick={onExploreReceipts}
            aria-label="Explore receipt records"
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-surface-border/60 hover:bg-white/10 text-slate-200 font-medium border border-white/10 hover:border-white/20 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <Compass className="w-5 h-5 text-sky-400" aria-hidden="true" />
            <span>EXPLORE RECEIPTS</span>
          </button>
        </div>

        {/* Summary Statistics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-5xl mx-auto p-4 rounded-2xl bg-surface/80 border border-white/10 backdrop-blur-xl shadow-receipt">
          
          {/* Stat 1: Receipts */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col items-center">
            <span className="text-xs font-mono text-slate-400 mb-1">TOTAL RECEIPTS</span>
            <span className="text-xl sm:text-2xl font-mono font-bold text-white">
              {summary.totalReceipts.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">Parsed Records</span>
          </div>

          {/* Stat 2: Music Hours */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col items-center">
            <div className="flex items-center gap-1 text-xs font-mono text-sky-400 mb-1">
              <Music className="w-3 h-3" aria-hidden="true" />
              <span>MUSIC ACTIVITY</span>
            </div>
            <span className="text-xl sm:text-2xl font-mono font-bold text-sky-300">
              {summary.listeningHours} hrs
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">{summary.uniqueArtists} Unique Artists</span>
          </div>

          {/* Stat 3: Transactions */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col items-center">
            <div className="flex items-center gap-1 text-xs font-mono text-amber-400 mb-1">
              <CreditCard className="w-3 h-3" aria-hidden="true" />
              <span>TRANSACTIONS</span>
            </div>
            <span className="text-xl sm:text-2xl font-mono font-bold text-amber-300">
              {summary.transactionCount.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">{summary.uniqueMerchants} Merchants</span>
          </div>

          {/* Stat 4: Locations */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col items-center">
            <div className="flex items-center gap-1 text-xs font-mono text-emerald-400 mb-1">
              <MapPin className="w-3 h-3" aria-hidden="true" />
              <span>LOCATIONS</span>
            </div>
            <span className="text-xl sm:text-2xl font-mono font-bold text-emerald-300">
              34 Cities
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">Geographic Traces</span>
          </div>

          {/* Stat 5: Patterns */}
          <div className="col-span-2 md:col-span-1 p-3 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col items-center">
            <div className="flex items-center gap-1 text-xs font-mono text-purple-400 mb-1">
              <Network className="w-3 h-3" aria-hidden="true" />
              <span>PATTERNS</span>
            </div>
            <span className="text-xl sm:text-2xl font-mono font-bold text-purple-300">
              {summary.patternsDiscovered} Found
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">Calculated Insights</span>
          </div>

        </div>

      </div>
    </section>
  );
};
