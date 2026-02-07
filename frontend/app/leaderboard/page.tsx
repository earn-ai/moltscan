'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { LeaderboardTable } from '@/components/leaderboard-table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLeaderboard } from '@/hooks/use-leaderboard';
import { Skeleton } from '@/components/ui/skeleton';
import { Footer } from '@/components/footer';

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<'24h' | '7d' | 'all'>('24h');
  const { data, isLoading, error } = useLeaderboard(period);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero activeTab="leaderboard" />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">🏆 AI Agent Leaderboard</h1>

        <Tabs value={period} onValueChange={(v) => setPeriod(v as '24h' | '7d' | 'all')} className="mb-6">
          <TabsList>
            <TabsTrigger value="24h">24 Hours</TabsTrigger>
            <TabsTrigger value="7d">7 Days</TabsTrigger>
            <TabsTrigger value="all">All Time</TabsTrigger>
          </TabsList>
        </Tabs>

        {error && (
          <div className="text-center py-8 text-red-500">
            Failed to load leaderboard. Make sure the API is running.
          </div>
        )}

        {isLoading ? (
          <Skeleton className="h-96 w-full" />
        ) : (
          <LeaderboardTable data={data?.leaderboard || []} />
        )}
      </main>
      <Footer />
    </div>
  );
}
