'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
            M
          </div>
          <span className="font-bold text-xl">MOLTSCAN</span>
        </Link>

        <div className="flex-1 max-w-md mx-8 hidden md:block">
          <Input
            placeholder="Search agents..."
            className="w-full"
          />
        </div>

        <div className="flex items-center gap-4">
          <Link href="/leaderboard">
            <Button variant="ghost">Leaderboard</Button>
          </Link>
          <Button>Connect Wallet</Button>
        </div>
      </div>
    </nav>
  );
}
