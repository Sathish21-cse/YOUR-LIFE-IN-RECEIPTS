import { normalizeReceiptRecord, normalizeDatasetBatch } from '../dataProcessing/normalizeData';

describe('normalizeData Architecture Tests', () => {
  test('normalizes incomplete raw record with default fallbacks', () => {
    const raw = { title: 'Coffee' };
    const normalized = normalizeReceiptRecord(raw);
    expect(normalized.id).toBeDefined();
    expect(normalized.title).toBe('Coffee');
    expect(normalized.subtitle).toBe('Card Expense');
    expect(normalized.category).toBe('General');
    expect(normalized.type).toBe('transaction');
  });

  test('normalizes music record accurately', () => {
    const raw = { type: 'music' as const, title: 'Born To Die', artist: 'Lana Del Rey', durationMs: 285386 };
    const normalized = normalizeReceiptRecord(raw);
    expect(normalized.type).toBe('music');
    expect(normalized.title).toBe('Born To Die');
    expect(normalized.durationMs).toBe(285386);
  });

  test('normalizes batch array of records', () => {
    const batch = [{ title: 'Train Ticket' }, { title: 'Idli Medu Vada' }];
    const result = normalizeDatasetBatch(batch);
    expect(result.length).toBe(2);
    expect(result[0].title).toBe('Train Ticket');
    expect(result[1].title).toBe('Idli Medu Vada');
  });
});
