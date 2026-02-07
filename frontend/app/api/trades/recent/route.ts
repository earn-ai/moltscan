import { NextRequest, NextResponse } from 'next/server';
import { loadVerifiedAgents, loadCachedTrades } from '@/lib/data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '20');
  
  const agents = loadVerifiedAgents();
  let allTrades: any[] = [];
  
  for (const agent of agents) {
    const trades = loadCachedTrades(agent.wallet);
    allTrades = allTrades.concat(trades.map(t => ({
      ...t,
      agentName: agent.name,
    })));
  }
  
  // Sort by timestamp descending
  allTrades.sort((a, b) => b.timestamp - a.timestamp);
  
  return NextResponse.json({ trades: allTrades.slice(0, limit) });
}
