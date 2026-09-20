import React, { useState, useEffect } from 'react';
import { DataPayload, Receipt } from '../data/dataTypes';
import { filterReceipts } from '../utils/analytics';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';
import { getCategoryIcon } from '../utils/formatting';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: DataPayload;
  onSelectReceipt: (receipt: Receipt) => void;
  onGoToExploreWithQuery: (query: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  data,
  onSelectReceipt,
  onGoToExploreWithQuery
}) => {
  const [query, setQuery] = useState('');

  // Keybinding listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const searchResults = query.trim()
    ? filterReceipts(data.receipts, {
        searchQuery: query,
        category: 'All',
        dateRange: 'all',
        receiptType: 'all',
        sortBy: 'newest'
      }).slice(0, 8)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      <div 
        className="relative w-full max-w-2xl bg-[#0F121A] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Search Header */}
        <div className="p-4 bg-surface-border/30 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-sky-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search artists, tracks, merchants, locations, notes..."
            className="w-full bg-transparent text-white font-sans text-base placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Instant Results List */}
        <div className="p-4 overflow-y-auto space-y-2 flex-1">
          {query.trim() ? (
            searchResults.length > 0 ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-2">
                  <span>TOP TRACE MATCHES</span>
                  <span>{searchResults.length} Results</span>
                </div>

                {searchResults.map((r) => {
                  const CatIcon = getCategoryIcon(r.category);
                  return (
                    <div
                      key={r.id}
                      onClick={() => {
                        onClose();
                        onSelectReceipt(r);
                      }}
                      className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/10 border border-white/5 flex items-center justify-between gap-3 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 flex-shrink-0">
                          {CatIcon}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-white truncate">{r.title}</h4>
                          <p className="text-xs text-slate-400 truncate">{r.subtitle} · {r.time}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs font-mono text-slate-400">{r.formattedDate}</span>
                        <ArrowRight className="w-4 h-4 text-sky-400" />
                      </div>
                    </div>
                  );
                })}

                <button
                  onClick={() => {
                    onClose();
                    onGoToExploreWithQuery(query);
                  }}
                  className="w-full py-2.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 font-mono text-xs border border-sky-500/30 text-center transition-all mt-2"
                >
                  See all matching traces in Explorer →
                </button>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 space-y-2 font-mono text-sm">
                <p>No traces found for "{query}".</p>
                <p className="text-xs text-slate-500 font-sans">Try searching for an artist, place, merchant or category.</p>
              </div>
            )
          ) : (
            <div className="py-8 text-center text-slate-400 space-y-3">
              <Sparkles className="w-6 h-6 text-sky-400 mx-auto animate-pulse" />
              <p className="text-xs font-mono">Type anything to instantly search across 4,000+ digital life receipts.</p>
              <div className="flex flex-wrap justify-center gap-2 pt-2 text-[11px] font-mono text-slate-400">
                <button onClick={() => setQuery('Lana Del Rey')} className="px-2.5 py-1 rounded bg-white/5 border border-white/10 hover:text-white">Lana Del Rey</button>
                <button onClick={() => setQuery('Netflix')} className="px-2.5 py-1 rounded bg-white/5 border border-white/10 hover:text-white">Netflix</button>
                <button onClick={() => setQuery('Train')} className="px-2.5 py-1 rounded bg-white/5 border border-white/10 hover:text-white">Train</button>
                <button onClick={() => setQuery('Food')} className="px-2.5 py-1 rounded bg-white/5 border border-white/10 hover:text-white">Food</button>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
