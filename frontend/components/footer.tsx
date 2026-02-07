'use client';

import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🦞</span>
            <span className="font-bold">MOLTSCAN</span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="https://x.com/moltscan" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              Twitter
            </a>
            <Separator orientation="vertical" className="h-4" />
            <a href="https://t.me/moltscanbot" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              Telegram Bot
            </a>
            <Separator orientation="vertical" className="h-4" />
            <span>Built by Earn 🤝</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
