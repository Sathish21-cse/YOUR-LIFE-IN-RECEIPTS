export type ReceiptType = 'music' | 'transaction' | 'household';

export interface Receipt {
  id: string;
  type: ReceiptType;
  title: string;
  subtitle: string;
  category: string;
  timestamp: string; // ISO string
  date: string; // YYYY-MM-DD
  formattedDate: string; // e.g. "14 Aug 2023"
  time: string; // e.g. "11:42 PM"
  hour: number; // 0..23
  dayOfWeek: string;
  amount: number | null;
  formattedAmount: string | null;
  durationMs?: number | null;
  formattedDuration?: string | null;
  location?: string;
  merchant?: string;
  artist?: string;
  album?: string;
  platform?: string;
  mode?: string;
  note?: string;
  lat?: number | null;
  long?: number | null;
  tags: string[];
}

export interface SummaryData {
  totalReceipts: number;
  musicCount: number;
  transactionCount: number;
  totalSpent: number;
  listeningHours: number;
  uniqueArtists: number;
  uniqueMerchants: number;
  patternsDiscovered: number;
}

export interface PatternInsight {
  id: string;
  title: string;
  type: string;
  badge: string;
  headline: string;
  description: string;
  metric: string;
  accentColor: 'purple' | 'amber' | 'cyan' | 'emerald';
}

export interface StoryCluster {
  id: string;
  title: string;
  subtitle: string;
  timeframe: string;
  categories: string[];
  description: string;
  stats: {
    timeSpan: string;
    eventsCount: number;
    primaryLocation: string;
  };
  receiptIds: string[];
}

export interface ConnectedNode {
  receipt: Receipt;
  relationType: 'time_proximity' | 'same_location' | 'category_match' | 'same_day';
  timeDiffMinutes?: number;
  description: string;
}

export interface ConnectionCluster {
  sourceReceipt: Receipt;
  connections: ConnectedNode[];
  narrative: string;
  clusterScore: number;
}

export interface DataPayload {
  summary: SummaryData;
  categories: string[];
  categoryCounts: Record<string, number>;
  activityByHour: number[];
  activityByDay: Record<string, number>;
  topArtists: Array<{ artist: string; count: number }>;
  topMerchants: Array<{ merchant: string; count: number }>;
  patterns: PatternInsight[];
  stories: StoryCluster[];
  receipts: Receipt[];
}
