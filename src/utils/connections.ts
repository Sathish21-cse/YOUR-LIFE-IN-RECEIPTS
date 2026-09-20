import { Receipt, ConnectedNode, ConnectionCluster } from '../data/dataTypes';

export function findConnectionsForReceipt(
  targetReceipt: Receipt,
  allReceipts: Receipt[],
  maxConnections: number = 4
): ConnectionCluster {
  const targetTime = new Date(targetReceipt.timestamp).getTime();
  const targetDate = targetReceipt.date;
  const candidates: ConnectedNode[] = [];

  for (const r of allReceipts) {
    if (r.id === targetReceipt.id) continue;

    const rTime = new Date(r.timestamp).getTime();
    const diffMs = Math.abs(rTime - targetTime);
    const diffMins = Math.floor(diffMs / 60000);

    // 1. Time Proximity (within 4 hours = 240 mins)
    if (diffMins <= 240) {
      let desc = `Occurred ${diffMins === 0 ? 'at the exact same time' : `${diffMins} minutes apart`}`;
      if (r.category !== targetReceipt.category) {
        desc += ` (${r.category} + ${targetReceipt.category})`;
      }
      candidates.push({
        receipt: r,
        relationType: 'time_proximity',
        timeDiffMinutes: diffMins,
        description: desc
      });
      continue;
    }

    // 2. Same Day Connection (if within 24 hours on same date)
    if (r.date === targetDate) {
      candidates.push({
        receipt: r,
        relationType: 'same_day',
        timeDiffMinutes: diffMins,
        description: `Same day trace (${r.time})`
      });
      continue;
    }

    // 3. Location Trace match
    if (targetReceipt.location && r.location && targetReceipt.location !== 'Audio Stream' && r.location !== 'Audio Stream') {
      if (targetReceipt.location.toLowerCase() === r.location.toLowerCase()) {
        candidates.push({
          receipt: r,
          relationType: 'same_location',
          timeDiffMinutes: diffMins,
          description: `Location match in ${r.location}`
        });
      }
    }
  }

  // Sort candidates by lowest time difference / strength
  candidates.sort((a, b) => (a.timeDiffMinutes || 999999) - (b.timeDiffMinutes || 999999));

  // Take top N unique candidates
  const selected = candidates.slice(0, maxConnections);

  // Generate factual storytelling narrative string
  let narrative = "Activity cluster detected based on temporal proximity.";
  if (selected.length > 0) {
    const minTime = selected[0].timeDiffMinutes || 0;
    if (minTime <= 30) {
      narrative = `High-density activity cluster: These records occurred within ${minTime === 0 ? 'moments' : `${minTime} minutes`} of each other.`;
    } else if (minTime <= 120) {
      narrative = `Sequential activity cluster: Activity traces recorded within ${Math.round(minTime / 60)} hour(s) in close sequence.`;
    } else {
      narrative = `Daily temporal trace: Multiple distinct interactions logged across the same timeframe.`;
    }
  } else {
    narrative = "Single isolated trace with no immediate nearby activity records within window.";
  }

  return {
    sourceReceipt: targetReceipt,
    connections: selected,
    narrative,
    clusterScore: selected.length
  };
}

export function getSampleInterestingMoments(receipts: Receipt[], count: number = 6): Receipt[] {
  // Select receipts that have rich metadata or fall into interesting categories
  const lateNight = receipts.filter(r => r.tags.includes('Late Night'));
  const highValue = receipts.filter(r => r.amount && r.amount > 500);
  const musicSpree = receipts.filter(r => r.type === 'music');
  const transit = receipts.filter(r => r.category === 'Transportation');

  const pool = [...lateNight, ...highValue, ...transit, ...musicSpree];
  
  // Pick distinct IDs
  const seen = new Set<string>();
  const result: Receipt[] = [];
  
  for (const item of pool) {
    if (!seen.has(item.id)) {
      seen.add(item.id);
      result.push(item);
    }
    if (result.length >= count) break;
  }

  return result.length > 0 ? result : receipts.slice(0, count);
}
