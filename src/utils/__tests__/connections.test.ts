import { findConnectionsForReceipt } from '../connections';
import { Receipt } from '../../data/dataTypes';

describe('Connections Proximity Engine Tests', () => {
  const mockReceipt1: Receipt = {
    id: 'rcpt_001',
    type: 'music',
    title: 'Track A',
    subtitle: 'Artist A',
    category: 'Music',
    timestamp: '2023-08-14T20:00:00Z',
    date: '2023-08-14',
    formattedDate: '14 Aug 2023',
    time: '08:00 PM',
    hour: 20,
    dayOfWeek: 'Monday',
    amount: null,
    formattedAmount: null,
    location: 'Bandra, Mumbai',
    tags: ['Music']
  };

  const mockReceipt2: Receipt = {
    id: 'rcpt_002',
    type: 'transaction',
    title: 'Snacks Store',
    subtitle: 'Credit Card',
    category: 'Food & Dining',
    timestamp: '2023-08-14T20:15:00Z', // 15 mins later
    date: '2023-08-14',
    formattedDate: '14 Aug 2023',
    time: '08:15 PM',
    hour: 20,
    dayOfWeek: 'Monday',
    amount: 150,
    formattedAmount: '₹150',
    location: 'Bandra, Mumbai',
    tags: ['Food']
  };

  test('detects high temporal proximity cluster (15 mins apart)', () => {
    const cluster = findConnectionsForReceipt(mockReceipt1, [mockReceipt1, mockReceipt2]);
    expect(cluster.connections.length).toBe(1);
    expect(cluster.connections[0].receipt.id).toBe('rcpt_002');
    expect(cluster.connections[0].timeDiffMinutes).toBe(15);
  });
});
