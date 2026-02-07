import { NextRequest, NextResponse } from 'next/server';
import { loadCachedTrades } from '@/lib/data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ wallet: string }> }
) {
  const { wallet } = await params;
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '50');
  
  const trades = loadCachedTrades(wallet);
  return NextResponse.json({ wallet, trades: trades.slice(0, limit) });
}
