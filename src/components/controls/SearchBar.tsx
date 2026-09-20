import React from 'react';
import { Search, X, Sparkles } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  resultCount: number;
  totalCount: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  resultCount,
  totalCount
}) => {
  return (
    <div className="relative w-full">
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-sky-400 pointer-events-none" aria-hidden="true" />
        
        <input
          id="global-trace-search-input"
          type="text"
          value={value}
          aria-label="Search traces by artist, song, merchant, location, or category"
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search traces by artist, song, merchant, location, category..."
          className="w-full pl-12 pr-28 py-3.5 rounded-2xl bg-surface/90 border border-white/10 text-white placeholder-slate-500 font-sans text-sm focus:outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20 backdrop-blur-xl transition-all shadow-receipt"
        />

        {value ? (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label="Clear search input text"
            className="absolute right-4 p-1 rounded-lg bg-white/10 text-slate-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        ) : (
          <div className="absolute right-4 hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
            <Sparkles className="w-3 h-3 text-sky-400" aria-hidden="true" />
            <span>{resultCount.toLocaleString()} / {totalCount.toLocaleString()}</span>
          </div>
        )}
      </div>
    </div>
  );
};
