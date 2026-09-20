import React from 'react';
import { FilterOptions } from '../utils/analytics';
import { RotateCcw, ArrowUpDown } from 'lucide-react';

interface FilterBarProps {
  categories: string[];
  options: FilterOptions;
  onChange: (options: FilterOptions) => void;
  onReset: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  options,
  onChange,
  onReset
}) => {
  const isFiltered = options.searchQuery || options.category !== 'All' || options.receiptType !== 'all' || options.sortBy !== 'newest';

  const allCategories = ['All', ...categories];

  return (
    <div className="space-y-4 p-4 rounded-2xl bg-surface/70 border border-white/10 backdrop-blur-xl">
      
      {/* Category Pills Slider */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-bold">
            CATEGORIES
          </span>
          {isFiltered && (
            <button
              type="button"
              onClick={onReset}
              aria-label="Reset all active search and filter parameters"
              className="flex items-center gap-1 text-[11px] font-mono text-sky-400 hover:text-sky-300 focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <RotateCcw className="w-3 h-3" aria-hidden="true" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none" role="group" aria-label="Filter by Category">
          {allCategories.map((cat) => {
            const isActive = options.category.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={isActive}
                aria-label={`Filter by category: ${cat}`}
                onClick={() => onChange({ ...options, category: cat })}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  isActive
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-glow-cyan'
                    : 'bg-white/[0.03] text-slate-400 border border-white/5 hover:bg-white/10 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Type & Sort Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs">
        
        {/* Receipt Type Pills */}
        <div className="flex items-center gap-1.5" role="group" aria-label="Filter by Receipt Type">
          <span className="font-mono text-slate-400 text-[11px] mr-1">TYPE:</span>
          {(['all', 'music', 'transaction', 'household'] as const).map((t) => {
            const isActive = options.receiptType === t;
            return (
              <button
                key={t}
                type="button"
                aria-pressed={isActive}
                aria-label={`Filter type: ${t}`}
                onClick={() => onChange({ ...options, receiptType: t })}
                className={`px-2.5 py-1 rounded-lg font-mono text-[11px] capitalize transition-all focus-visible:ring-2 focus-visible:ring-purple-400 ${
                  isActive
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : 'bg-white/5 text-slate-400 border border-white/5 hover:text-slate-200'
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort-receipts-select" className="flex items-center gap-1 font-mono text-slate-400 text-[11px]">
            <ArrowUpDown className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
            <span>SORT:</span>
          </label>
          <select
            id="sort-receipts-select"
            value={options.sortBy}
            aria-label="Sort receipts order"
            onChange={(e) => onChange({ ...options, sortBy: e.target.value as any })}
            className="bg-[#090A0F] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-slate-300 font-mono focus:outline-none focus:border-sky-500/50"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest_amount">Highest Amount</option>
            <option value="duration">Listening Duration</option>
          </select>
        </div>

      </div>

    </div>
  );
};
