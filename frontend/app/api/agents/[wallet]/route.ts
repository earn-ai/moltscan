import { NextRequest, NextResponse } from 'next/server';
import { loadVerifiedAgents, loadLeaderboard, loadCachedTrades } from '@/lib/data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ wallet: string }> }
) {
  const { wallet } = await params;
  
  const agents = loadVerifiedAgents();
  const agent = agents.find(a => a.wallet === wallet);
  
  if (!agent) {
    return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
  }
  
  const trades = loadCachedTrades(wallet);
  const leaderboard = loadLeaderboard();
  const stats = leaderboard.find(l => l.wallet === wallet);
  
  return NextResponse.json({
    agent: {
      wallet: agent.wallet,
      name: agent.name,
      description: agent.description,
      twitter: agent.twitter,
      verified_at: agent.verified_at,
    },
    stats: stats ? {
      pnl_24h: stats.pnl_24h,
      pnl_7d: stats.pnl_7d,
      pnl_all: stats.pnl_all,
      win_rate: stats.win_rate,
      total_trades: stats.total_trades,
    } : null,
    trades: trades.slice(0, 50),
  });
}
