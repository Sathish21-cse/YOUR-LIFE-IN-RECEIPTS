import React from 'react';
import { ConnectionCluster, Receipt } from '../data/dataTypes';
import { getCategoryColor, getCategoryIcon } from '../utils/formatting';
import { Network, Sparkles, Clock, ArrowDown, MapPin, CheckCircle2 } from 'lucide-react';

interface ConnectionGraphProps {
  cluster: ConnectionCluster;
  allReceipts: Receipt[];
  onSelectReceipt: (receipt: Receipt) => void;
  onChangeSource: (receipt: Receipt) => void;
  presetMoments: Receipt[];
}

export const ConnectionGraph: React.FC<ConnectionGraphProps> = ({
  cluster,
  onSelectReceipt,
  onChangeSource,
  presetMoments
}) => {
  const { sourceReceipt, connections, narrative } = cluster;

  const sourceCatStyles = getCategoryColor(sourceReceipt.category);
  const SourceIcon = getCategoryIcon(sourceReceipt.category);

  return (
    <div className="space-y-8">
      
      {/* Preset Moments Starter Bar */}
      <div className="p-4 rounded-2xl bg-surface/60 border border-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider">
            PICK A STARTING TRACE MOMENT
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {presetMoments.map((r) => {
            const isSelected = r.id === sourceReceipt.id;
            return (
              <button
                key={r.id}
                onClick={() => onChangeSource(r)}
                className={`p-2.5 rounded-xl text-left border text-xs transition-all duration-200 ${
                  isSelected
                    ? 'bg-sky-500/20 border-sky-500/50 text-white shadow-glow-cyan'
                    : 'bg-white/[0.03] border-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
                }`}
              >
                <div className="font-mono text-[10px] text-sky-400 truncate mb-0.5">{r.category}</div>
                <div className="font-bold truncate text-slate-200">{r.title}</div>
                <div className="text-[10px] text-slate-500">{r.time}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Connection Canvas & Cluster Visualization */}
      <div className="relative p-6 sm:p-10 rounded-3xl bg-surface/90 border border-white/15 backdrop-blur-2xl shadow-receipt">
        
        {/* Graph Banner Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono mb-2">
              <Network className="w-3.5 h-3.5" />
              <span>RAW DATA → ACTIVITY CLUSTER</span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              CONNECT THE DOTS
            </h3>
          </div>

          {/* Narrative Explanation Pill */}
          <div className="p-3.5 rounded-xl bg-sky-950/40 border border-sky-500/30 text-xs text-sky-200 max-w-md">
            <div className="flex items-center gap-1.5 font-mono font-bold text-sky-400 mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>CLUSTER ANALYSIS</span>
            </div>
            <p className="leading-relaxed font-sans">{narrative}</p>
          </div>
        </div>

        {/* Visual Node Flow Sequence */}
        <div className="py-8 space-y-6">
          
          {/* Anchor Node (Source Receipt) */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-mono text-sky-400 tracking-widest uppercase mb-2">
              PRIMARY ANCHOR MOMENT
            </span>

            <div
              onClick={() => onSelectReceipt(sourceReceipt)}
              className={`w-full max-w-md receipt-paper rounded-2xl p-5 border ${sourceCatStyles.border} shadow-glow-cyan hover:scale-[1.02] transition-all cursor-pointer`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-xl ${sourceCatStyles.bg} ${sourceCatStyles.text}`}>
                    {SourceIcon}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-300 uppercase block">
                      {sourceReceipt.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">{sourceReceipt.time} · {sourceReceipt.formattedDate}</span>
                  </div>
                </div>
                <span className="text-xs font-mono px-2 py-1 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40">
                  ANCHOR NODE
                </span>
              </div>

              <h4 className="text-lg font-extrabold text-white mb-1">{sourceReceipt.title}</h4>
              <p className="text-xs text-slate-400 mb-3">{sourceReceipt.subtitle}</p>

              <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-3 border-t border-dashed border-white/10">
                <span>{sourceReceipt.location || 'Digital Trace'}</span>
                {sourceReceipt.formattedAmount && (
                  <span className="font-bold text-amber-300">{sourceReceipt.formattedAmount}</span>
                )}
              </div>
            </div>
          </div>

          {/* Animated Flow Connecting Nodes */}
          {connections.length > 0 ? (
            <div className="space-y-6">
              {connections.map((node, index) => {
                const connReceipt = node.receipt;
                const connCatStyles = getCategoryColor(connReceipt.category);
                const ConnIcon = getCategoryIcon(connReceipt.category);

                return (
                  <div key={connReceipt.id} className="flex flex-col items-center animate-in fade-in slide-in-from-top-4 duration-300">
                    
                    {/* Flow Arrow & Metric Badge */}
                    <div className="flex flex-col items-center my-2">
                      <div className="w-0.5 h-6 bg-gradient-to-b from-sky-500 to-indigo-500 animate-pulse" />
                      <div className="px-3 py-1 rounded-full bg-surface-border text-[10px] font-mono text-slate-300 border border-white/10 shadow-sm my-1 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-sky-400" />
                        <span>{node.description}</span>
                      </div>
                      <ArrowDown className="w-4 h-4 text-sky-400 animate-bounce" />
                    </div>

                    {/* Connected Node Card */}
                    <div
                      onClick={() => onSelectReceipt(connReceipt)}
                      className="w-full max-w-md receipt-paper rounded-2xl p-5 border border-white/10 hover:border-sky-500/40 hover:scale-[1.02] transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded-lg ${connCatStyles.bg} ${connCatStyles.text}`}>
                            {ConnIcon}
                          </div>
                          <span className="text-xs font-mono font-bold text-slate-300 uppercase">
                            {connReceipt.category}
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onChangeSource(connReceipt);
                          }}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-sky-300 border border-white/10"
                        >
                          Set as Anchor
                        </button>
                      </div>

                      <h4 className="text-base font-bold text-white mb-1">{connReceipt.title}</h4>
                      <p className="text-xs text-slate-400 mb-3">{connReceipt.subtitle}</p>

                      <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-dashed border-white/10">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span>{connReceipt.location || 'Local Trace'}</span>
                        </div>
                        <span className="text-sky-400 font-semibold">{connReceipt.time}</span>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-10 text-slate-400 text-sm font-mono">
              <p>Nothing close enough to connect yet.</p>
              <p className="text-xs text-slate-500 mt-1">Try selecting a different starting moment above.</p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
