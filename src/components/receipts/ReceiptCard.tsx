import React from 'react';
import { Receipt } from '../../data/dataTypes';
import { getCategoryColor, getCategoryIcon } from '../../utils/formatting';
import { Clock, MapPin, ArrowRight } from 'lucide-react';

interface ReceiptCardProps {
  receipt: Receipt;
  onSelect: (receipt: Receipt) => void;
  onFindConnections?: (receipt: Receipt, e: React.MouseEvent) => void;
}

export const ReceiptCard: React.FC<ReceiptCardProps> = ({
  receipt,
  onSelect,
  onFindConnections
}) => {
  const catStyles = getCategoryColor(receipt.category);
  const CatIcon = getCategoryIcon(receipt.category);

  return (
    <div
      tabIndex={0}
      role="button"
      onClick={() => onSelect(receipt)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(receipt);
        }
      }}
      aria-label={`Receipt ${receipt.id}: ${receipt.title} (${receipt.category}). Date: ${receipt.formattedDate} at ${receipt.time}`}
      className="group relative text-left w-full receipt-paper rounded-xl p-5 border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/40 hover:shadow-receipt cursor-pointer flex flex-col justify-between focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none"
    >
      {/* Top Header: Category & Type Badge */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg ${catStyles.bg} ${catStyles.text}`}>
              {CatIcon}
            </div>
            <span className="font-mono text-xs font-bold tracking-wider text-slate-300 uppercase">
              {receipt.category}
            </span>
          </div>

          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
            {receipt.id}
          </span>
        </div>

        {/* Title & Subtitle */}
        <div className="mb-4">
          <h4 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-1">
            {receipt.title}
          </h4>
          <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
            {receipt.subtitle}
          </p>
        </div>

        {/* Dashed Line Divider */}
        <div className="receipt-divider my-3" />

        {/* Meta Grid: Timestamp, Location, Value */}
        <div className="space-y-1.5 text-xs text-slate-300 font-mono mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
              <span>{receipt.time} · {receipt.formattedDate}</span>
            </div>
            {receipt.formattedDuration && (
              <span className="text-sky-400 font-semibold">{receipt.formattedDuration}</span>
            )}
          </div>

          {(receipt.formattedAmount || receipt.location) && (
            <div className="flex items-center justify-between pt-1">
              {receipt.location ? (
                <div className="flex items-center gap-1 text-[11px] text-slate-400 line-clamp-1">
                  <MapPin className="w-3 h-3 text-slate-500 flex-shrink-0" aria-hidden="true" />
                  <span className="truncate">{receipt.location}</span>
                </div>
              ) : <div />}

              {receipt.formattedAmount && (
                <span className="text-sm font-bold text-amber-300 font-mono">
                  {receipt.formattedAmount}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {receipt.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-400 border border-slate-700/50"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer with Barcode Strip and Actions */}
      <div className="pt-3 border-t border-white/5 flex items-center justify-between">
        {/* Decorative Mini Barcode */}
        <div className="w-20 h-4 barcode-strip rounded" aria-hidden="true" />

        <div className="flex items-center gap-2">
          {onFindConnections && (
            <button
              type="button"
              onClick={(e) => onFindConnections(receipt, e)}
              aria-label={`Find connections for receipt ${receipt.id}`}
              className="text-[11px] font-mono px-2.5 py-1 rounded bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 transition-all focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              Connect
            </button>
          )}

          <div className="flex items-center gap-1 text-xs font-mono font-medium text-sky-400 group-hover:translate-x-0.5 transition-transform">
            <span>VIEW RECEIPT</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
};
