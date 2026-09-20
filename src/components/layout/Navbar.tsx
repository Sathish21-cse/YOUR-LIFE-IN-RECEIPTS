import React, { useState } from 'react';
import { Search, Sparkles, Receipt as ReceiptIcon, Network, BookOpen, Menu, X, Layers, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  activeTab: 'overview' | 'explore' | 'connections' | 'stories';
  setActiveTab: (tab: 'overview' | 'explore' | 'connections' | 'stories') => void;
  onOpenSearch: () => void;
  onOpenAddReceipt: () => void;
  totalCount: number;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenAddReceipt,
  totalCount,
  theme,
  onToggleTheme
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Layers },
    { id: 'explore', label: 'Explore', icon: ReceiptIcon },
    { id: 'connections', label: 'Connections', icon: Network },
    { id: 'stories', label: 'Stories', icon: BookOpen },
  ] as const;

  const handleNavClick = (tabId: 'overview' | 'explore' | 'connections' | 'stories') => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#090A0F]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Tagline */}
        <button
          type="button"
          onClick={() => handleNavClick('overview')}
          aria-label="RECEIPT home dashboard"
          className="flex items-center gap-3 cursor-pointer group text-left focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none rounded-xl p-1"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 p-0.5 flex items-center justify-center shadow-glow-cyan transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-[#090A0F] rounded-[10px] flex items-center justify-center">
              <ReceiptIcon className="w-5 h-5 text-sky-400 group-hover:rotate-6 transition-transform" aria-hidden="true" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-lg font-bold tracking-widest text-white">RECEIPT</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block tracking-wide">Every moment leaves a trace.</p>
          </div>
        </button>

        {/* Desktop Nav Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-surface-border/40 p-1 rounded-xl border border-white/5" aria-label="Main Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={isActive}
                aria-label={`Navigate to ${item.label}`}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  isActive
                    ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            className="p-1.5 sm:p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-sky-400 transition-all focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" aria-hidden="true" /> : <Moon className="w-4 h-4 text-indigo-500" aria-hidden="true" />}
          </button>

          {/* Add Moment Button */}
          <button
            type="button"
            onClick={onOpenAddReceipt}
            aria-label="Log a new receipt moment"
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-[11px] sm:text-xs font-mono font-bold text-white shadow-glow-cyan transition-all hover:scale-105 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <span className="text-sm" aria-hidden="true">+</span>
            <span className="hidden xs:inline">LOG MOMENT</span>
            <span className="xs:hidden">LOG</span>
          </button>

          {/* Quick Search Button */}
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Open search dialog"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 transition-all hover:border-sky-500/30 focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <Search className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
            <span className="hidden md:inline">Search traces...</span>
            <span className="hidden lg:inline bg-[#090A0F] px-1.5 py-0.5 rounded text-[10px] text-slate-400 border border-white/10 font-mono">⌘K</span>
          </button>

          {/* Record Count Badge */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-950/40 border border-sky-500/20 text-xs font-mono text-sky-300">
            <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" aria-hidden="true" />
            <span>{totalCount.toLocaleString()} Traces</span>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle mobile menu"
            className="md:hidden p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#090A0F] px-4 pt-2 pb-4 space-y-2 animate-in slide-in-from-top-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
