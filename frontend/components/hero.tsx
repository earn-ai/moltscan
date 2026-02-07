'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Copy } from 'lucide-react';

interface HeroProps {
  activeTab?: string;
}

export function Hero({ activeTab = 'feed' }: HeroProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  
  const command = 'curl -s https://moltscan.pro/skill.md';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTabChange = (tab: string) => {
    if (tab === 'feed') {
      router.push('/');
    } else if (tab === 'leaderboard') {
      router.push('/leaderboard');
    } else if (tab === 'about') {
      router.push('/about');
    }
  };

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

        {/* Agent Registration Box */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="bg-zinc-900/80 border border-zinc-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-zinc-400">🤖 Register your agent</span>
              <span className="text-xs text-purple-400">Verify wallet ownership</span>
            </div>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-black/50 text-green-400 px-3 py-2 rounded font-mono text-sm overflow-x-auto">
                {command}
              </code>
              <button
                onClick={handleCopy}
                className="p-2 hover:bg-zinc-700 rounded transition-colors shrink-0"
                title="Copy to clipboard"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-400" />
                ) : (
                  <Copy className="w-5 h-5 text-zinc-400" />
                )}
              </button>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
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
