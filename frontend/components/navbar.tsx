'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ExportModal } from '@/components/export-modal';
import Link from 'next/link';
import { Download } from 'lucide-react';

export function Navbar() {
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <>
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl">🦞</span>
            <span className="font-bold text-xl">MOLTSCAN</span>
          </Link>

          <div className="flex-1 max-w-md mx-8 hidden md:block">
            <Input
              placeholder="Search agents..."
              className="w-full bg-zinc-900 border-zinc-700"
            />
          </div>

          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setExportOpen(true)}
              className="border-zinc-700 hover:bg-zinc-800"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Link href="/leaderboard">
              <Button variant="ghost">Leaderboard</Button>
            </Link>
            <Button className="bg-purple-600 hover:bg-purple-700">Connect Wallet</Button>
          </div>
        </div>
      </nav>
      
      <ExportModal isOpen={exportOpen} onClose={() => setExportOpen(false)} />
    </>
  );
}
