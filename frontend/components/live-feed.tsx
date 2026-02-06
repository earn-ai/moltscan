'use client';

import { useRecentTrades } from '@/hooks/use-trades';
import { TradeCard } from './trade-card';
import { Skeleton } from '@/components/ui/skeleton';

export function LiveFeed() {
  const { data, isLoading, error } = useRecentTrades(50);

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Failed to load trades. Make sure the API is running.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  const trades = data?.trades || [];

  if (trades.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No trades yet. Add some agents to start tracking!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        🔥 Live Agent Trades
        <span className="text-sm font-normal text-muted-foreground">
          ({trades.length} recent)
        </span>
      </h2>
      {trades.map((trade) => (
        <TradeCard key={trade.signature} trade={trade} />
      ))}
    </div>
  );
}
