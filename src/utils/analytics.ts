import { Receipt } from '../data/dataTypes';

export interface FilterOptions {
  searchQuery: string;
  category: string;
  dateRange: 'all' | '7days' | '30days' | '2023' | '2024';
  receiptType: 'all' | 'music' | 'transaction' | 'household';
  sortBy: 'newest' | 'oldest' | 'highest_amount' | 'duration';
}

export function filterReceipts(receipts: Receipt[], options: FilterOptions): Receipt[] {
  let result = [...receipts];

  // 1. Search filter
  if (options.searchQuery.trim()) {
    const query = options.searchQuery.toLowerCase().trim();
    result = result.filter(r => {
      return (
        r.title.toLowerCase().includes(query) ||
        r.subtitle.toLowerCase().includes(query) ||
        r.category.toLowerCase().includes(query) ||
        (r.artist && r.artist.toLowerCase().includes(query)) ||
        (r.merchant && r.merchant.toLowerCase().includes(query)) ||
        (r.location && r.location.toLowerCase().includes(query)) ||
        (r.note && r.note.toLowerCase().includes(query)) ||
        r.tags.some(t => t.toLowerCase().includes(query))
      );
    });
  }

  // 2. Category filter
  if (options.category && options.category !== 'All') {
    result = result.filter(r => r.category.toLowerCase() === options.category.toLowerCase());
  }

  // 3. Receipt Type filter
  if (options.receiptType && options.receiptType !== 'all') {
    result = result.filter(r => r.type === options.receiptType);
  }

  // 4. Sorting
  result.sort((a, b) => {
    if (options.sortBy === 'newest') {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
    if (options.sortBy === 'oldest') {
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    }
    if (options.sortBy === 'highest_amount') {
      return (b.amount || 0) - (a.amount || 0);
    }
    if (options.sortBy === 'duration') {
      return (b.durationMs || 0) - (a.durationMs || 0);
    }
    return 0;
  });

  return result;
}
