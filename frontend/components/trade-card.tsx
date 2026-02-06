'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { Trade } from '@/lib/types';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface TradeCardProps {
  trade: Trade;
}

export function TradeCard({ trade }: TradeCardProps) {
  const action = trade.tokenIn === 'SOL' ? 'buy' : trade.tokenOut === 'SOL' ? 'sell' : 'swap';
  const actionColor = action === 'buy' ? 'bg-green-500' : action === 'sell' ? 'bg-red-500' : 'bg-blue-500';

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          {/* Left: Agent info */}
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                {(trade.agentName || trade.wallet.slice(0, 2)).slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">{trade.agentName || trade.wallet.slice(0, 8)}</div>
              <div className="text-sm text-muted-foreground">
                {formatDistanceToNow(trade.timestamp * 1000, { addSuffix: true })}
              </div>
            </div>
          </div>

          {/* Right: Action badge */}
          <Badge className={actionColor}>
            {action.toUpperCase()}
          </Badge>
        </div>

        {/* Trade details */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-mono">{trade.amountIn.toFixed(4)} {trade.tokenIn}</span>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <span className="font-mono">{trade.amountOut.toLocaleString()} {trade.tokenOut}</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {trade.dex}
          </Badge>
        </div>

        {/* Solscan link */}
        <a
          href={`https://solscan.io/tx/${trade.signature}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          View on Solscan
          <ExternalLink className="w-3 h-3" />
        </a>
      </CardContent>
    </Card>
  );
}
