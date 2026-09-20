import React from 'react';
import { DataPayload, StoryCluster } from '../data/dataTypes';
import { StoryCard } from '../components/StoryCard';
import { BookOpen, Sparkles } from 'lucide-react';

interface StoriesPageProps {
  data: DataPayload;
  onOpenStory: (story: StoryCluster) => void;
}

export const StoriesPage: React.FC<StoriesPageProps> = ({
  data,
  onOpenStory
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-24">
      
      {/* Page Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
          <BookOpen className="w-3.5 h-3.5 text-purple-400" />
          <span>SIGNATURE FEATURE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
          DISCOVERED STORIES
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl">
          Multi-record activity clusters automatically synthesized into narrative story sequences. Step through real dataset evidence line by line.
        </p>
      </div>

      {/* Stories Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.stories.map((story) => (
          <StoryCard
            key={story.id}
            story={story}
            onExploreStory={onOpenStory}
          />
        ))}
      </div>

    </div>
  );
};
