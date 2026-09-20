import React, { useState, useMemo } from 'react';
import { DataPayload, Receipt } from '../data/dataTypes';
import { SearchBar } from '../components/controls/SearchBar';
import { FilterBar } from '../components/controls/FilterBar';
import { ReceiptCard } from '../components/receipts/ReceiptCard';
import { filterReceipts, FilterOptions } from '../utils/analytics';
import { Compass, AlertCircle } from 'lucide-react';

interface ExplorePageProps {
  data: DataPayload;
  onSelectReceipt: (receipt: Receipt) => void;
  onFindConnections: (receipt: Receipt) => void;
  onOpenAddReceipt?: () => void;
  initialQuery?: string;
}

const ITEMS_PER_PAGE = 24;

export const ExplorePage: React.FC<ExplorePageProps> = ({
  data,
  onSelectReceipt,
  onFindConnections,
  onOpenAddReceipt,
  initialQuery = ''
}) => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    searchQuery: initialQuery,
    category: 'All',
    dateRange: 'all',
    receiptType: 'all',
    sortBy: 'newest'
  });

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filteredReceipts = useMemo(() => {
    return filterReceipts(data.receipts, filterOptions);
  }, [data.receipts, filterOptions]);

  const handleFilterChange = (opts: FilterOptions) => {
    setFilterOptions(opts);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleResetFilters = () => {
    setFilterOptions({
      searchQuery: '',
      category: 'All',
      dateRange: 'all',
      receiptType: 'all',
      sortBy: 'newest'
    });
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const visibleReceipts = filteredReceipts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredReceipts.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-24">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-mono">
            <Compass className="w-3.5 h-3.5" aria-hidden="true" />
            <span>DIGITAL RECEIPT EXPLORER</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            RECEIPT TRACES
          </h1>
          <p className="text-sm text-slate-400">
            Search, filter, and inspect thermal digital receipt records from music history, household purchases, and card transactions.
          </p>
        </div>

        {onOpenAddReceipt && (
          <button
            type="button"
            onClick={onOpenAddReceipt}
            aria-label="Add a new custom receipt moment"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-mono text-xs font-bold shadow-glow-cyan hover:scale-[1.02] transition-all flex-shrink-0 focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <span>+ ADD NEW RECEIPT</span>
          </button>
        )}
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-4">
        <SearchBar
          value={filterOptions.searchQuery}
          onChange={(val) => handleFilterChange({ ...filterOptions, searchQuery: val })}
          resultCount={filteredReceipts.length}
          totalCount={data.receipts.length}
        />

        <FilterBar
          categories={data.categories}
          options={filterOptions}
          onChange={handleFilterChange}
          onReset={handleResetFilters}
        />
      </div>

      {/* Receipts Grid */}
      {visibleReceipts.length > 0 ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleReceipts.map((receipt) => (
              <ReceiptCard
                key={receipt.id}
                receipt={receipt}
                onSelect={onSelectReceipt}
                onFindConnections={(r, e) => {
                  e.stopPropagation();
                  onFindConnections(r);
                }}
              />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="text-center pt-8">
              <button
                type="button"
                onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
                aria-label={`Load ${filteredReceipts.length - visibleCount} more trace receipts`}
                className="px-8 py-3.5 rounded-xl bg-surface/80 hover:bg-white/10 text-sky-300 font-mono text-sm border border-sky-500/30 shadow-glow-cyan hover:scale-[1.02] transition-all focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                Load More Traces ({filteredReceipts.length - visibleCount} Remaining)
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center rounded-3xl bg-surface/60 border border-white/10 backdrop-blur-xl space-y-4 my-12">
          <div className="inline-flex p-4 rounded-full bg-slate-800/80 text-slate-400 mb-2">
            <AlertCircle className="w-8 h-8 text-amber-400" aria-hidden="true" />
          </div>
          <h3 className="text-xl font-bold text-white">No traces found.</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Try searching for an artist, place, merchant or category, or reset active filters.
          </p>
          <div>
            <button
              type="button"
              onClick={handleResetFilters}
              aria-label="Clear active search and filter options"
              className="px-5 py-2.5 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-500/40 font-mono text-xs font-bold hover:bg-sky-500/30 transition-all focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              Clear Search & Reset Filters
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
