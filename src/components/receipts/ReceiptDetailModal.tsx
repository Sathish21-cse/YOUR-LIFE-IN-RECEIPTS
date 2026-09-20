import React, { useEffect } from 'react';
import { Receipt } from '../../data/dataTypes';
import { getCategoryColor, getCategoryIcon } from '../../utils/formatting';
import { X, Network, Share2, Check } from 'lucide-react';

interface ReceiptDetailModalProps {
  receipt: Receipt | null;
  onClose: () => void;
  onFindConnections: (receipt: Receipt) => void;
}

export const ReceiptDetailModal: React.FC<ReceiptDetailModalProps> = ({
  receipt,
  onClose,
  onFindConnections
}) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && receipt) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [receipt, onClose]);

  if (!receipt) return null;

  const catStyles = getCategoryColor(receipt.category);
  const CatIcon = getCategoryIcon(receipt.category);

  const handleCopyId = () => {
    navigator.clipboard.writeText(receipt.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="receipt-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-lg bg-[#0F121A] border border-white/15 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="p-4 bg-surface-border/30 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-sky-400 font-bold uppercase tracking-widest">
              DIGITAL RECEIPT TRACE
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
              {receipt.id}
            </span>
          </div>
          
          <button
            type="button"
            onClick={onClose}
            aria-label="Close receipt details modal"
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Header Store / Track Info */}
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400 mb-2">
              {CatIcon}
            </div>
            
            <h3 id="receipt-detail-title" className="text-2xl font-extrabold text-white tracking-tight">
              {receipt.title}
            </h3>
            <p className="text-sm text-slate-300 font-medium">
              {receipt.subtitle}
            </p>

            <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono border ${catStyles.badge} mt-2`}>
              {receipt.category}
            </span>
          </div>

          {/* Thermal Receipt Paper Box */}
          <div className="receipt-paper p-5 rounded-xl border border-white/10 space-y-4 font-mono text-xs text-slate-300">
            
            <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-white/10">
              <span>RECORD ID</span>
              <button 
                type="button" 
                className="flex items-center gap-1 cursor-pointer hover:text-white text-xs font-mono" 
                onClick={handleCopyId}
                aria-label="Copy receipt record ID"
              >
                <span>{receipt.id}</span>
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Share2 className="w-3 h-3" />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">TIMESTAMP</span>
              <span className="text-white font-semibold">{receipt.formattedDate} at {receipt.time}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">DAY OF WEEK</span>
              <span>{receipt.dayOfWeek}</span>
            </div>

            {receipt.formattedDuration && (
              <div className="flex items-center justify-between">
                <span className="text-slate-400">DURATION</span>
                <span className="text-sky-300 font-bold">{receipt.formattedDuration}</span>
              </div>
            )}

            {receipt.formattedAmount && (
              <div className="flex items-center justify-between text-sm py-2 border-y border-dashed border-white/15">
                <span className="font-bold text-white">TOTAL AMOUNT</span>
                <span className="font-extrabold text-amber-300 text-base">{receipt.formattedAmount}</span>
              </div>
            )}

            {receipt.location && (
              <div className="flex items-center justify-between">
                <span className="text-slate-400">LOCATION</span>
                <span className="text-emerald-300 font-medium">{receipt.location}</span>
              </div>
            )}

            {receipt.mode && (
              <div className="flex items-center justify-between">
                <span className="text-slate-400">MODE / PAYMENT</span>
                <span>{receipt.mode}</span>
              </div>
            )}

            {receipt.note && (
              <div className="pt-2 border-t border-white/10 text-slate-400">
                <span className="block text-[10px] text-slate-500 mb-1">NOTES & DETAILS</span>
                <p className="text-slate-300 leading-relaxed">{receipt.note}</p>
              </div>
            )}

            {/* Barcode Graphic */}
            <div className="pt-4 text-center space-y-1">
              <div className="h-8 barcode-strip rounded" aria-hidden="true" />
              <span className="text-[10px] text-slate-500 tracking-widest">{receipt.timestamp}</span>
            </div>

          </div>

          {/* Tags */}
          <div>
            <span className="block text-xs font-mono text-slate-400 mb-2">ASSOCIATED TRACE TAGS</span>
            <div className="flex flex-wrap gap-1.5">
              {receipt.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-surface/80 text-xs font-mono text-slate-300 border border-white/10"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Action Bar */}
        <div className="p-4 bg-surface-border/40 border-t border-white/10 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium border border-white/10"
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onFindConnections(receipt);
            }}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-sm font-bold shadow-glow-cyan hover:scale-[1.02] transition-all"
          >
            <Network className="w-4 h-4" />
            <span>CONNECT THE DOTS</span>
          </button>
        </div>

      </div>

    </div>
  );
};
