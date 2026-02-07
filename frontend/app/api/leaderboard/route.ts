import { NextRequest, NextResponse } from 'next/server';
import { loadLeaderboard, getLastUpdate } from '@/lib/data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const period = searchParams.get('period') || '24h';
  
  let leaderboard = loadLeaderboard();
  
  // Sort by requested period
  if (period === '7d') {
    leaderboard.sort((a, b) => b.pnl_7d - a.pnl_7d);
  } else if (period === 'all') {
    leaderboard.sort((a, b) => b.pnl_all - a.pnl_all);
  } else {
    leaderboard.sort((a, b) => b.pnl_24h - a.pnl_24h);
  }
  
  return NextResponse.json({
    period,
    updated: getLastUpdate(),
    leaderboard: leaderboard.map((entry, i) => ({
      rank: i + 1,
      wallet: entry.wallet,
      name: entry.name,
      twitter: entry.twitter,
      pnl: period === '7d' ? entry.pnl_7d : period === 'all' ? entry.pnl_all : entry.pnl_24h,
      win_rate: entry.win_rate,
      total_trades: entry.total_trades,
    })),
  });
}
