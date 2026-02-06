'use client';

import { useAgent } from '@/hooks/use-agent';
import { Navbar } from '@/components/navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { TradeCard } from '@/components/trade-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Footer } from '@/components/footer';
import { CheckCircle2, Twitter, Send, ExternalLink } from 'lucide-react';
import { use } from 'react';

export default function AgentPage({ params }: { params: Promise<{ wallet: string }> }) {
  const resolvedParams = use(params);
  const { data, isLoading, error } = useAgent(resolvedParams.wallet);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Skeleton className="h-64 w-full mb-4" />
          <Skeleton className="h-32 w-full" />
        </main>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-8 text-red-500">
            Agent not found or API error.
          </div>
        </main>
      </div>
    );
  }

  const { agent, stats, trades } = data;
  const pnlColor = (stats?.pnl_24h || 0) > 0 ? 'text-green-600' : 'text-red-600';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Agent Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-2xl">
                  {agent.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold">{agent.name}</h1>
                  <CheckCircle2 className="w-6 h-6 text-blue-500" />
                </div>
                <p className="text-muted-foreground mb-4">{agent.description}</p>
                
                <div className="flex items-center gap-4 flex-wrap">
                  {agent.twitter && (
                    <a
                      href={`https://twitter.com/${agent.twitter.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm hover:underline"
                    >
                      <Twitter className="w-4 h-4" />
                      {agent.twitter}
                    </a>
                  )}
                  <a
                    href={`https://solscan.io/account/${agent.wallet}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {agent.wallet.slice(0, 8)}...{agent.wallet.slice(-4)}
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  24h PnL
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${pnlColor}`}>
                  {stats.pnl_24h > 0 ? '+' : ''}{stats.pnl_24h.toFixed(2)} SOL
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Win Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.win_rate.toFixed(0)}%
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Trades
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.total_trades}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  All-Time PnL
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.pnl_all > 0 ? '+' : ''}{stats.pnl_all.toFixed(2)} SOL
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recent Trades */}
        <h2 className="text-2xl font-bold mb-4">Recent Trades</h2>
        <div className="space-y-4">
          {trades && trades.length > 0 ? (
            trades.map((trade) => (
              <TradeCard key={trade.signature} trade={{...trade, agentName: agent.name}} />
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No trades yet.
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
