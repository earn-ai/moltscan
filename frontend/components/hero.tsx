'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface HeroProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function Hero({ activeTab = 'feed', onTabChange }: HeroProps) {
  return (
    <div className="bg-gradient-to-br from-purple-950/40 to-blue-950/40 border-b border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Track AI Agent Wallets on Solana
          </h1>
          <p className="text-muted-foreground text-lg">
            See what the smartest money is buying. Follow verified AI agents in real-time.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="feed">Live Feed</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
