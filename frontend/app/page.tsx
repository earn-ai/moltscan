'use client';

import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { LiveFeed } from '@/components/live-feed';
import { Footer } from '@/components/footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero activeTab="feed" />
      <main className="flex-1 container mx-auto px-4 py-8">
        <LiveFeed />
      </main>
      <Footer />
    </div>
  );
}
