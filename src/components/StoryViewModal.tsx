import React, { useState, useEffect } from 'react';
import { StoryCluster, Receipt } from '../data/dataTypes';
import { getCategoryColor, getCategoryIcon } from '../utils/formatting';
import { X, ChevronRight, ChevronLeft, Sparkles, Play, Pause, CheckCircle2, Clock, MapPin, Receipt as ReceiptIcon } from 'lucide-react';
import confetti from 'canvas-confetti';

interface StoryViewModalProps {
  story: StoryCluster | null;
  allReceipts: Receipt[];
  onClose: () => void;
  onSelectReceipt: (receipt: Receipt) => void;
}

export const StoryViewModal: React.FC<StoryViewModalProps> = ({
  story,
  allReceipts,
  onClose,
  onSelectReceipt
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Retrieve receipts matching story.receiptIds
  const storyReceipts = React.useMemo(() => {
    if (!story) return [];
    return story.receiptIds
      .map(id => allReceipts.find(r => r.id === id))
      .filter((r): r is Receipt => r !== undefined);
  }, [story, allReceipts]);

  // Reset step when story changes
  useEffect(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, [story]);

  // Auto-play step timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && storyReceipts.length > 0) {
      timer = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < storyReceipts.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            // Trigger celebratory confetti on story completion!
            confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
            return prev;
          }
        });
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, storyReceipts.length]);

  if (!story || storyReceipts.length === 0) return null;

  const activeReceipt = storyReceipts[currentStep];
  const catStyles = getCategoryColor(activeReceipt.category);
  const CatIcon = getCategoryIcon(activeReceipt.category);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
      
      {/* Immersive Story Player Container */}
      <div 
        className="relative w-full max-w-3xl bg-[#0B0D14] border border-purple-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Player Header */}
        <div className="p-6 bg-surface-border/30 border-b border-white/10 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-purple-400 uppercase tracking-widest">
                DISCOVERED STORY EXPERIENCE
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {story.timeframe}
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              "{story.title}"
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-slate-900 h-1.5 flex">
          {storyReceipts.map((_, idx) => (
            <div
              key={idx}
              className={`h-full transition-all duration-300 flex-1 border-r border-black/40 ${
                idx <= currentStep ? 'bg-gradient-to-r from-sky-400 to-purple-500' : 'bg-white/10'
              }`}
            />
          ))}
        </div>

        {/* Main Progressive Reveal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          
          {/* Step Counter Eyebrow */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>SEQUENCE STEP {currentStep + 1} OF {storyReceipts.length}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs hover:bg-purple-500/30 transition-all"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Pause Story' : 'Auto Play'}</span>
              </button>
            </div>
          </div>

          {/* Active Receipt Card Display */}
          <div className="relative receipt-paper rounded-2xl p-6 border border-white/15 shadow-receipt space-y-4 animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-xl ${catStyles.bg} ${catStyles.text}`}>
                  {CatIcon}
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-slate-300 uppercase block">
                    {activeReceipt.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">{activeReceipt.formattedDate} · {activeReceipt.time}</span>
                </div>
              </div>

              <span className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 text-slate-300 border border-white/10">
                {activeReceipt.id}
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-extrabold text-white">{activeReceipt.title}</h3>
              <p className="text-sm text-slate-300">{activeReceipt.subtitle}</p>
            </div>

            {/* Factual Narrative Commentary for this step */}
            <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-500/30 text-xs text-sky-200 space-y-1 font-sans">
              <div className="flex items-center gap-1.5 font-mono font-bold text-sky-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>DATA EVIDENCE TRACE</span>
              </div>
              <p className="leading-relaxed">
                {activeReceipt.type === 'music'
                  ? `Audio track playback logged via ${activeReceipt.platform || 'Spotify'}. Duration: ${activeReceipt.formattedDuration || 'Full Stream'}.`
                  : `Financial activity trace logged at ${activeReceipt.location || 'Merchant'}. Payment mode: ${activeReceipt.mode || 'Card'}.`}
              </p>
            </div>

            {/* Metadata Footer */}
            <div className="pt-3 border-t border-dashed border-white/15 flex items-center justify-between text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{activeReceipt.location || 'Digital Trace'}</span>
              </div>

              {activeReceipt.formattedAmount && (
                <span className="text-base font-bold text-amber-300">{activeReceipt.formattedAmount}</span>
              )}
            </div>

          </div>

          {/* Story Narrative Overview */}
          <div className="p-4 rounded-2xl bg-surface/70 border border-white/10 text-xs text-slate-300 leading-relaxed font-sans">
            <span className="font-mono text-sky-400 font-bold block mb-1">STORY NARRATIVE INSIGHT</span>
            <p>{story.description}</p>
          </div>

        </div>

        {/* Player Navigation Controls */}
        <div className="p-6 bg-surface-border/40 border-t border-white/10 flex items-center justify-between gap-4">
          <button
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:pointer-events-none text-slate-200 text-sm font-medium border border-white/10"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={() => onSelectReceipt(activeReceipt)}
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono border border-white/10"
          >
            <ReceiptIcon className="w-4 h-4 text-sky-400" />
            <span>Inspect Full Receipt</span>
          </button>

          <button
            onClick={() => {
              if (currentStep < storyReceipts.length - 1) {
                setCurrentStep(prev => prev + 1);
              } else {
                onClose();
              }
            }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm font-bold shadow-glow-purple hover:scale-[1.02] transition-all"
          >
            <span>{currentStep < storyReceipts.length - 1 ? 'Next Step' : 'Finish Story'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
