import React, { useState } from 'react';
import { DataPayload, PatternInsight, Receipt, StoryCluster } from './data/dataTypes';
import receiptsDataRaw from './data/receiptsData.json';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { ConnectionsPage } from './pages/ConnectionsPage';
import { StoriesPage } from './pages/StoriesPage';
import { ReceiptDetailModal } from './components/ReceiptDetailModal';
import { StoryViewModal } from './components/StoryViewModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';

const data = receiptsDataRaw as DataPayload;

export function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'explore' | 'connections' | 'stories'>('overview');
  
  // Modals & Selected States
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);
  const [selectedAnchorReceipt, setSelectedAnchorReceipt] = useState<Receipt | null>(null);
  const [activeStory, setActiveStory] = useState<StoryCluster | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [exploreQuery, setExploreQuery] = useState('');

  const handleOpenReceiptDetail = (receipt: Receipt) => {
    setSelectedReceipt(receipt);
  };

  const handleFindConnectionsForReceipt = (receipt: Receipt) => {
    setSelectedAnchorReceipt(receipt);
    setActiveTab('connections');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPattern = (_pattern: PatternInsight) => {
    // Select an anchor receipt associated with pattern
    const sampleAnchor = data.receipts.find(r => r.tags.includes('Late Night')) || data.receipts[0];
    setSelectedAnchorReceipt(sampleAnchor);
    setActiveTab('connections');
  };

  const handleGoToExploreWithQuery = (query: string) => {
    setExploreQuery(query);
    setActiveTab('explore');
  };

  return (
    <div className="min-h-screen bg-[#090A0F] text-slate-100 flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-200">
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        totalCount={data.summary.totalReceipts}
      />

      {/* Main Page View Router */}
      <main className="flex-1 pt-6">
        {activeTab === 'overview' && (
          <HomePage
            data={data}
            onNavigateTab={setActiveTab}
            onSelectPattern={handleSelectPattern}
            onOpenStory={(s) => setActiveStory(s)}
            onSelectReceipt={handleOpenReceiptDetail}
          />
        )}

        {activeTab === 'explore' && (
          <ExplorePage
            data={data}
            onSelectReceipt={handleOpenReceiptDetail}
            onFindConnections={handleFindConnectionsForReceipt}
            initialQuery={exploreQuery}
          />
        )}

        {activeTab === 'connections' && (
          <ConnectionsPage
            data={data}
            selectedAnchorReceipt={selectedAnchorReceipt}
            onSelectReceipt={handleOpenReceiptDetail}
            onSetAnchorReceipt={(r) => setSelectedAnchorReceipt(r)}
          />
        )}

        {activeTab === 'stories' && (
          <StoriesPage
            data={data}
            onOpenStory={(s) => setActiveStory(s)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#06070B] py-8 text-center text-xs text-slate-500 font-mono space-y-2">
        <p className="text-slate-400 font-bold tracking-widest uppercase">
          RECEIPT — Every Moment Leaves a Trace.
        </p>
        <p>Built for WEBRUSH Hackathon · Frontend Data Storytelling Experience</p>
        <p className="text-[10px] text-slate-600">
          Loaded {data.summary.totalReceipts.toLocaleString()} traces across Spotify Listening History & Multi-Facet Financial Transactions.
        </p>
      </footer>

      {/* Receipt Detail Modal */}
      <ReceiptDetailModal
        receipt={selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
        onFindConnections={handleFindConnectionsForReceipt}
      />

      {/* Story View Player Modal */}
      <StoryViewModal
        story={activeStory}
        allReceipts={data.receipts}
        onClose={() => setActiveStory(null)}
        onSelectReceipt={handleOpenReceiptDetail}
      />

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        data={data}
        onSelectReceipt={handleOpenReceiptDetail}
        onGoToExploreWithQuery={handleGoToExploreWithQuery}
      />

    </div>
  );
}

export default App;
