import { Music, CreditCard, Home, ShoppingBag, Truck, Tv, Sparkles, HeartPulse, Zap } from 'lucide-react';
import React from 'react';

export const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case 'music':
      return {
        bg: 'bg-sky-500/10',
        text: 'text-sky-400',
        border: 'border-sky-500/30',
        badge: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
        gradient: 'from-sky-500 to-blue-600',
        glow: 'shadow-glow-cyan'
      };
    case 'food & dining':
      return {
        bg: 'bg-amber-500/10',
        text: 'text-amber-400',
        border: 'border-amber-500/30',
        badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        gradient: 'from-amber-500 to-orange-600',
        glow: 'shadow-glow-amber'
      };
    case 'transportation':
      return {
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-400',
        border: 'border-emerald-500/30',
        badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        gradient: 'from-emerald-500 to-teal-600',
        glow: 'shadow-emerald-500/20'
      };
    case 'entertainment':
      return {
        bg: 'bg-purple-500/10',
        text: 'text-purple-400',
        border: 'border-purple-500/30',
        badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
        gradient: 'from-purple-500 to-indigo-600',
        glow: 'shadow-glow-purple'
      };
    case 'subscriptions':
      return {
        bg: 'bg-indigo-500/10',
        text: 'text-indigo-400',
        border: 'border-indigo-500/30',
        badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
        gradient: 'from-indigo-500 to-purple-600',
        glow: 'shadow-indigo-500/20'
      };
    case 'festivals & culture':
      return {
        bg: 'bg-rose-500/10',
        text: 'text-rose-400',
        border: 'border-rose-500/30',
        badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
        gradient: 'from-rose-500 to-pink-600',
        glow: 'shadow-rose-500/20'
      };
    default:
      return {
        bg: 'bg-slate-500/10',
        text: 'text-slate-400',
        border: 'border-slate-500/30',
        badge: 'bg-slate-500/20 text-slate-300 border-slate-500/40',
        gradient: 'from-slate-500 to-gray-600',
        glow: 'shadow-slate-500/20'
      };
  }
};

export const getCategoryIcon = (category: string, className = "w-4 h-4") => {
  switch (category.toLowerCase()) {
    case 'music':
      return React.createElement(Music, { className });
    case 'food & dining':
      return React.createElement(ShoppingBag, { className });
    case 'transportation':
      return React.createElement(Truck, { className });
    case 'entertainment':
      return React.createElement(Tv, { className });
    case 'subscriptions':
      return React.createElement(Zap, { className });
    case 'festivals & culture':
      return React.createElement(Sparkles, { className });
    case 'health & fitness':
      return React.createElement(HeartPulse, { className });
    case 'household & living':
      return React.createElement(Home, { className });
    default:
      return React.createElement(CreditCard, { className });
  }
};

export const formatCurrency = (val: number | null) => {
  if (val === null || val === undefined) return null;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
};

export const formatTimeSpan = (startDateStr: string, endDateStr: string) => {
  try {
    const d1 = new Date(startDateStr);
    const d2 = new Date(endDateStr);
    const diffMs = Math.abs(d2.getTime() - d1.getTime());
    const diffMins = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  } catch (e) {
    return '1h 30m';
  }
};
