import { Receipt, ReceiptType } from '../../data/dataTypes';

/**
 * Normalizes raw dataset inputs into predictable, standardized Receipt records.
 * Ensures safety, fallback defaults, and type compliance across all components.
 */
export function normalizeReceiptRecord(raw: Partial<Receipt>): Receipt {
  const now = new Date();
  const rawTs = raw.timestamp || now.toISOString();
  const dateObj = new Date(rawTs);
  const isValidDate = !isNaN(dateObj.getTime());

  const ts = isValidDate ? dateObj.toISOString() : now.toISOString();
  const dateStr = isValidDate ? dateObj.toISOString().split('T')[0] : now.toISOString().split('T')[0];
  const formattedDate = isValidDate
    ? dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : 'Unknown Date';
  const timeStr = isValidDate
    ? dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    : '12:00 PM';
  const hourVal = isValidDate ? dateObj.getHours() : 12;
  const dayOfWeekStr = isValidDate
    ? dateObj.toLocaleDateString('en-US', { weekday: 'long' })
    : 'Monday';

  const typeVal: ReceiptType = (raw.type === 'music' || raw.type === 'transaction' || raw.type === 'household')
    ? raw.type
    : 'transaction';

  return {
    id: raw.id || `rcpt_norm_${Math.random().toString(36).substring(2, 9)}`,
    type: typeVal,
    title: raw.title?.trim() || (typeVal === 'music' ? 'Untitled Stream' : 'Transaction Item'),
    subtitle: raw.subtitle?.trim() || (typeVal === 'music' ? 'Unknown Artist' : 'Card Expense'),
    category: raw.category?.trim() || 'General',
    timestamp: ts,
    date: dateStr,
    formattedDate,
    time: timeStr,
    hour: hourVal,
    dayOfWeek: dayOfWeekStr,
    amount: typeof raw.amount === 'number' ? raw.amount : null,
    formattedAmount: raw.formattedAmount || (typeof raw.amount === 'number' ? `₹${raw.amount.toLocaleString()}` : null),
    durationMs: typeof raw.durationMs === 'number' ? raw.durationMs : null,
    formattedDuration: raw.formattedDuration || null,
    location: raw.location?.trim() || 'Digital Trace',
    merchant: raw.merchant?.trim() || undefined,
    artist: raw.artist?.trim() || undefined,
    album: raw.album?.trim() || undefined,
    platform: raw.platform?.trim() || undefined,
    mode: raw.mode?.trim() || 'Digital',
    note: raw.note?.trim() || `${raw.category || 'General'} activity trace`,
    tags: Array.isArray(raw.tags) && raw.tags.length > 0 ? raw.tags : ['NormalizedTrace']
  };
}

export function normalizeDatasetBatch(rawRecords: Partial<Receipt>[]): Receipt[] {
  return rawRecords.map(normalizeReceiptRecord);
}
