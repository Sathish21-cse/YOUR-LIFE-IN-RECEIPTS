import React, { useState } from 'react';
import { Receipt, ReceiptType } from '../data/dataTypes';
import { X, Plus, Music, CreditCard, Home, Sparkles, MapPin, Clock } from 'lucide-react';

interface AddReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddReceipt: (receipt: Receipt) => void;
  categories: string[];
}

export const AddReceiptModal: React.FC<AddReceiptModalProps> = ({
  isOpen,
  onClose,
  onAddReceipt,
  categories
}) => {
  const [type, setType] = useState<ReceiptType>('music');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState(categories[0] || 'Music');
  const [amount, setAmount] = useState<string>('');
  const [durationMins, setDurationMins] = useState<string>('3');
  const [durationSecs, setDurationSecs] = useState<string>('30');
  const [location, setLocation] = useState('Mumbai, MH');
  const [mode, setMode] = useState('Credit Card');
  const [note, setNote] = useState('');
  const [tagsStr, setTagsStr] = useState('UserLogged, LiveTrace');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const hour = now.getHours();

    const parsedAmount = type !== 'music' && amount ? parseFloat(amount) : null;
    const durMs = type === 'music' ? ((parseInt(durationMins) || 0) * 60 + (parseInt(durationSecs) || 0)) * 1000 : null;
    const formattedDuration = type === 'music' ? `${durationMins}m ${durationSecs}s` : null;

    const tags = tagsStr.split(',').map(t => t.trim()).filter(Boolean);
    if (!tags.includes('UserLogged')) tags.push('UserLogged');

    const newReceipt: Receipt = {
      id: `rcpt_user_${Date.now().toString().slice(-5)}`,
      type,
      title: title.trim(),
      subtitle: subtitle.trim() || (type === 'music' ? 'Custom Stream' : mode),
      category,
      timestamp: now.toISOString(),
      date: now.toISOString().split('T')[0],
      formattedDate,
      time,
      hour,
      dayOfWeek: now.toLocaleDateString('en-US', { weekday: 'long' }),
      amount: parsedAmount,
      formattedAmount: parsedAmount !== null ? `₹${parsedAmount.toLocaleString()}` : null,
      durationMs: durMs,
      formattedDuration,
      location: location.trim() || 'Local Trace',
      merchant: type !== 'music' ? title.trim() : undefined,
      artist: type === 'music' ? subtitle.trim() : undefined,
      platform: type === 'music' ? 'Spotify Web' : undefined,
      mode: type !== 'music' ? mode : 'Digital Audio',
      note: note.trim() || `User logged moment trace for ${category}`,
      tags
    };

    onAddReceipt(newReceipt);
    onClose();

    // Reset form
    setTitle('');
    setSubtitle('');
    setAmount('');
    setNote('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      <div 
        className="relative w-full max-w-xl bg-[#0F121A] border border-sky-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 bg-surface-border/30 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">LOG A NEW MOMENT TRACE</h3>
              <p className="text-xs text-slate-400">Add a custom digital receipt to recalculate live stories & connections.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs font-mono">
          
          {/* Type Selector */}
          <div className="space-y-1.5">
            <label className="text-slate-400 font-bold uppercase tracking-wider block">1. MOMENT TYPE</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => { setType('music'); setCategory('Music'); }}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                  type === 'music'
                    ? 'bg-sky-500/20 border-sky-500/50 text-sky-300 shadow-glow-cyan'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <Music className="w-4 h-4" />
                <span>🎵 Music</span>
              </button>

              <button
                type="button"
                onClick={() => { setType('transaction'); setCategory('Food & Dining'); }}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                  type === 'transaction'
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-glow-amber'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>💳 Purchase</span>
              </button>

              <button
                type="button"
                onClick={() => { setType('household'); setCategory('Transportation'); }}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                  type === 'household'
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-emerald-500/20'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>🏠 Household</span>
              </button>
            </div>
          </div>

          {/* Title & Subtitle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-slate-400 block font-bold">
                {type === 'music' ? 'TRACK TITLE *' : 'MERCHANT / ITEM *'}
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={type === 'music' ? 'e.g. Midnight City' : 'e.g. Blue Tokai Coffee'}
                className="w-full px-3 py-2.5 rounded-xl bg-surface border border-white/10 text-white placeholder-slate-500 font-sans focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 block font-bold">
                {type === 'music' ? 'ARTIST NAME' : 'PAYMENT MODE / SUBCATEGORY'}
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder={type === 'music' ? 'e.g. M83' : 'e.g. Credit Card · Espresso'}
                className="w-full px-3 py-2.5 rounded-xl bg-surface border border-white/10 text-white placeholder-slate-500 font-sans focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Category Dropdown & Amount/Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-slate-400 block font-bold">CATEGORY</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-surface border border-white/10 text-white font-sans focus:outline-none focus:border-sky-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {type !== 'music' ? (
              <div className="space-y-1">
                <label className="text-slate-400 block font-bold">AMOUNT (₹)</label>
                <input
                  type="number"
                  step="any"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 240"
                  className="w-full px-3 py-2.5 rounded-xl bg-surface border border-white/10 text-amber-300 font-bold placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            ) : (
              <div className="space-y-1">
                <label className="text-slate-400 block font-bold">DURATION (MINS / SECS)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={durationMins}
                    onChange={(e) => setDurationMins(e.target.value)}
                    placeholder="Mins"
                    className="w-1/2 px-3 py-2.5 rounded-xl bg-surface border border-white/10 text-sky-300 font-bold focus:outline-none focus:border-sky-500"
                  />
                  <input
                    type="number"
                    value={durationSecs}
                    onChange={(e) => setDurationSecs(e.target.value)}
                    placeholder="Secs"
                    className="w-1/2 px-3 py-2.5 rounded-xl bg-surface border border-white/10 text-sky-300 font-bold focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Location & Payment Mode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-slate-400 block font-bold">LOCATION / CITY</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Bandra, Mumbai"
                className="w-full px-3 py-2.5 rounded-xl bg-surface border border-white/10 text-white placeholder-slate-500 font-sans focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 block font-bold">PAYMENT / STREAM MODE</label>
              <input
                type="text"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                placeholder={type === 'music' ? 'Spotify Web' : 'UPI / Card'}
                className="w-full px-3 py-2.5 rounded-xl bg-surface border border-white/10 text-white placeholder-slate-500 font-sans focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <label className="text-slate-400 block font-bold">NOTES & DETAILS</label>
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Late night coffee study session before commute"
              className="w-full px-3 py-2 rounded-xl bg-surface border border-white/10 text-white placeholder-slate-500 font-sans focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold shadow-glow-cyan hover:scale-[1.02] transition-all"
            >
              + LOG RECEIPT TRACE
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};
