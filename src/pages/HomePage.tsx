import React from 'react';
import { DataPayload, PatternInsight, Receipt, StoryCluster } from '../data/dataTypes';
import { Hero } from '../components/Hero/Hero';
import { StatCard } from '../components/insights/StatCard';
import { PatternCard } from '../components/insights/PatternCard';
import { StoryCard } from '../components/stories/StoryCard';
import { ActivityHeatmap } from '../components/timeline/ActivityHeatmap';
import { Music, CreditCard, MapPin, Network, Sparkles, ArrowRight, BookOpen } from 'lucide-react';

interface HomePageProps {
  data: DataPayload;
  onNavigateTab: (tab: 'overview' | 'explore' | 'connections' | 'stories') => void;
  onSelectPattern: (pattern: PatternInsight) => void;
  onOpenStory: (story: StoryCluster) => void;
  onSelectReceipt: (receipt: Receipt) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  data,
  onNavigateTab,
  onSelectPattern,
  onOpenStory,
  onSelectReceipt
}) => {
  const { summary, patterns, stories, activityByHour, activityByDay } = data;

  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Section */}
      <Hero
        summary={summary}
        onDiscoverStory={() => onNavigateTab('stories')}
        onExploreReceipts={() => onNavigateTab('explore')}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* LIFE AT A GLANCE */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-mono mb-2">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                <span>EXECUTIVE DATA METRICS</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                LIFE AT A GLANCE
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Calculated summary metrics derived from your multi-facet digital life dataset.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigateTab('explore')}
              aria-label={`Explore all ${summary.totalReceipts.toLocaleString()} receipts`}
              className="flex items-center gap-2 text-xs font-mono text-sky-400 hover:text-sky-300 group focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <span>Explore All Receipts ({summary.totalReceipts.toLocaleString()})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="🎵 Music Listening"
              value={`${summary.listeningHours} hrs`}
              subtitle={`${summary.musicCount} tracks logged across ${summary.uniqueArtists} unique artists`}
              trend="Top Artist: Lana Del Rey"
              icon={Music}
              accentColor="cyan"
              onClick={() => onNavigateTab('explore')}
            />

            <StatCard
              title="💳 Financial Purchases"
              value={`₹${Math.round(summary.totalSpent).toLocaleString()}`}
              subtitle={`${summary.transactionCount} transactions across ${summary.uniqueMerchants} merchants`}
              trend="Peak Spree: Weekend Afternoons"
              icon={CreditCard}
              accentColor="amber"
              onClick={() => onNavigateTab('explore')}
            />

            <StatCard
              title="📍 Geographic Traces"
              value="34 Cities"
              subtitle="Multi-state transaction & location traces"
              trend="Top Hubs: Mumbai, Satara, Jalna"
              icon={MapPin}
              accentColor="emerald"
              onClick={() => onNavigateTab('explore')}
            />

            <StatCard
              title="⏱ Activity Clusters"
              value={`${summary.patternsDiscovered} Patterns`}
              subtitle="Calculated temporal & location clusters"
              trend="Night Owl Activity Detected"
              icon={Network}
              accentColor="purple"
              onClick={() => onNavigateTab('connections')}
            />
          </div>
        </section>

        {/* PATTERNS YOU MIGHT HAVE MISSED */}
        <section className="space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono mb-2">
              <Network className="w-3.5 h-3.5" aria-hidden="true" />
              <span>ALGORITHMIC DISCOVERY</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              PATTERNS YOU MIGHT HAVE MISSED
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Natural storytelling insights backed by actual dataset calculations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {patterns.map((pat) => (
              <PatternCard
                key={pat.id}
                pattern={pat}
                onExplore={(p) => {
                  onSelectPattern(p);
                  onNavigateTab('connections');
                }}
              />
            ))}
          </div>
        </section>

        {/* 24-HOUR RHYTHM MATRIX */}
        <ActivityHeatmap
          activityByHour={activityByHour}
          activityByDay={activityByDay}
          onSelectHour={() => onNavigateTab('explore')}
          selectedHour={null}
        />

        {/* DISCOVERED STORIES FEATURE TEASER */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono mb-2">
                <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                <span>SIGNATURE STORYTELLING</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                DISCOVERED STORIES
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Multi-record activity clusters presented as immersive narrative sequences.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigateTab('stories')}
              aria-label={`View all ${stories.length} discovered stories`}
              className="flex items-center gap-2 text-xs font-mono text-purple-400 hover:text-purple-300 group focus-visible:ring-2 focus-visible:ring-purple-400"
            >
              <span>View All Stories ({stories.length})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stories.slice(0, 2).map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                onExploreStory={onOpenStory}
              />
            ))}
          </div>
        </section>

        {/* FINAL CLOSING BRAND MESSAGE */}
        <section className="relative p-10 sm:p-16 rounded-3xl bg-gradient-to-br from-surface to-[#0B0D14] border border-white/15 text-center overflow-hidden shadow-receipt">
          <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
          
          <div className="relative max-w-2xl mx-auto space-y-6">
            <span className="font-mono text-xs font-bold text-sky-400 tracking-widest uppercase">
              FINAL BRAND TRACE
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight">
              ONE DATASET. <br />
              THOUSANDS OF MOMENTS. <br />
              <span className="bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent">
                INFINITE STORIES.
              </span>
            </h2>

            <p className="text-lg font-serif italic text-slate-300">
              "What story will you uncover?"
            </p>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => onNavigateTab('explore')}
                aria-label="Explore all trace receipts"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold shadow-glow-cyan hover:scale-[1.02] transition-all focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <span>EXPLORE ALL TRACES</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
