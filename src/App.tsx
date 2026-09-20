import React, { useState, useMemo } from 'react';
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
import { AddReceiptModal } from './components/AddReceiptModal';

const initialData = receiptsDataRaw as DataPayload;

export function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'explore' | 'connections' | 'stories'>('overview');
  
  // Dynamic receipts list state
  const [receiptsList, setReceiptsList] = useState<Receipt[]>(initialData.receipts);

  // Modals & Selected States
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);
  const [selectedAnchorReceipt, setSelectedAnchorReceipt] = useState<Receipt | null>(null);
  const [activeStory, setActiveStory] = useState<StoryCluster | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAddReceiptOpen, setIsAddReceiptOpen] = useState(false);
  const [exploreQuery, setExploreQuery] = useState('');

  // Dynamically recompute summary & payload when receiptsList updates
  const dynamicPayload: DataPayload = useMemo(() => {
    const musicCount = receiptsList.filter(r => r.type === 'music').length;
    const txCount = receiptsList.filter(r => r.type !== 'music').length;
    const totalSpent = receiptsList.reduce((acc, r) => acc + (r.amount || 0), 0);
    const totalMs = receiptsList.reduce((acc, r) => acc + (r.durationMs || 0), 0);
    const listeningHours = Math.round((totalMs / (1000 * 3600)) * 10) / 10;

    const uniqueArtists = new Set(receiptsList.map(r => r.artist).filter(Boolean)).size;
    const uniqueMerchants = new Set(receiptsList.map(r => r.merchant).filter(Boolean)).size;

    return {
      ...initialData,
      receipts: receiptsList,
      summary: {
        totalReceipts: receiptsList.length,
        musicCount,
        transactionCount: txCount,
        totalSpent,
        listeningHours,
        uniqueArtists,
        uniqueMerchants,
        patternsDiscovered: initialData.patterns.length
      }
    };
  }, [receiptsList]);

  const handleAddReceipt = (newReceipt: Receipt) => {
    setReceiptsList(prev => [newReceipt, ...prev]);
    setSelectedReceipt(newReceipt); // open details modal for newly created receipt
  };

  const handleOpenReceiptDetail = (receipt: Receipt) => {
    setSelectedReceipt(receipt);
  };

  const handleFindConnectionsForReceipt = (receipt: Receipt) => {
    setSelectedAnchorReceipt(receipt);
    setActiveTab('connections');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPattern = (_pattern: PatternInsight) => {
    const sampleAnchor = receiptsList.find(r => r.tags.includes('Late Night')) || receiptsList[0];
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
        onOpenAddReceipt={() => setIsAddReceiptOpen(true)}
        totalCount={dynamicPayload.summary.totalReceipts}
      />

      {/* Main Page View Router */}
      <main className="flex-1 pt-6">
        {activeTab === 'overview' && (
          <HomePage
            data={dynamicPayload}
            onNavigateTab={setActiveTab}
            onSelectPattern={handleSelectPattern}
            onOpenStory={(s) => setActiveStory(s)}
            onSelectReceipt={handleOpenReceiptDetail}
          />
        )}

        {activeTab === 'explore' && (
          <ExplorePage
            data={dynamicPayload}
            onSelectReceipt={handleOpenReceiptDetail}
            onFindConnections={handleFindConnectionsForReceipt}
            onOpenAddReceipt={() => setIsAddReceiptOpen(true)}
            initialQuery={exploreQuery}
          />
        )}

        {activeTab === 'connections' && (
          <ConnectionsPage
            data={dynamicPayload}
            selectedAnchorReceipt={selectedAnchorReceipt}
            onSelectReceipt={handleOpenReceiptDetail}
            onSetAnchorReceipt={(r) => setSelectedAnchorReceipt(r)}
          />
        )}

        {activeTab === 'stories' && (
          <StoriesPage
            data={dynamicPayload}
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
          Loaded {dynamicPayload.summary.totalReceipts.toLocaleString()} traces across Spotify Listening History & Multi-Facet Financial Transactions.
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
        allReceipts={dynamicPayload.receipts}
        onClose={() => setActiveStory(null)}
        onSelectReceipt={handleOpenReceiptDetail}
      />

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        data={dynamicPayload}
        onSelectReceipt={handleOpenReceiptDetail}
        onGoToExploreWithQuery={handleGoToExploreWithQuery}
      />

      {/* Add Receipt Modal */}
      <AddReceiptModal
        isOpen={isAddReceiptOpen}
        onClose={() => setIsAddReceiptOpen(false)}
        onAddReceipt={handleAddReceipt}
        categories={dynamicPayload.categories}
      />

    </div>
  );
}

export default App;
