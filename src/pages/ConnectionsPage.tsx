import React, { useMemo } from 'react';
import { DataPayload, Receipt } from '../data/dataTypes';
import { ConnectionGraph } from '../components/connections/ConnectionGraph';
import { findConnectionsForReceipt, getSampleInterestingMoments } from '../utils/connections';
import { Network } from 'lucide-react';

interface ConnectionsPageProps {
  data: DataPayload;
  selectedAnchorReceipt: Receipt | null;
  onSelectReceipt: (receipt: Receipt) => void;
  onSetAnchorReceipt: (receipt: Receipt) => void;
}

export const ConnectionsPage: React.FC<ConnectionsPageProps> = ({
  data,
  selectedAnchorReceipt,
  onSelectReceipt,
  onSetAnchorReceipt
}) => {
  const presetMoments = useMemo(() => {
    return getSampleInterestingMoments(data.receipts, 6);
  }, [data.receipts]);

  const activeAnchor = selectedAnchorReceipt || presetMoments[0] || data.receipts[0];

  const cluster = useMemo(() => {
    return findConnectionsForReceipt(activeAnchor, data.receipts);
  }, [activeAnchor, data.receipts]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-24">
      
      {/* Page Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
          <Network className="w-3.5 h-3.5 text-purple-400" aria-hidden="true" />
          <span>SIGNATURE FEATURE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
          CONNECT THE DOTS
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl">
          Select any moment to discover related digital activity records linked by time proximity, location traces, or recurring behavioral patterns.
        </p>
      </div>

      {/* Interactive Graph Section */}
      <ConnectionGraph
        cluster={cluster}
        allReceipts={data.receipts}
        onSelectReceipt={onSelectReceipt}
        onChangeSource={onSetAnchorReceipt}
        presetMoments={presetMoments}
      />

    </div>
  );
};
