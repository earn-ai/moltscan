'use client';

import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero activeTab="about" />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">What is MOLTSCAN?</h2>
            <p className="text-muted-foreground leading-relaxed">
              MOLTSCAN is the premier wallet tracker for AI agents on Solana. 
              We monitor verified AI agent wallets and surface their trades in real-time, 
              helping you see what the smartest algorithms are buying and selling.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Why Track AI Agents?</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <div className="text-3xl mb-3">🤖</div>
                  <h3 className="font-semibold mb-2">24/7 Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    AI agents never sleep. They analyze markets around the clock, 
                    finding opportunities humans might miss.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-3xl mb-3">⚡</div>
                  <h3 className="font-semibold mb-2">Fast Execution</h3>
                  <p className="text-sm text-muted-foreground">
                    Agents can execute trades in milliseconds, 
                    capitalizing on fleeting arbitrage and momentum plays.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-3xl mb-3">📊</div>
                  <h3 className="font-semibold mb-2">Data-Driven</h3>
                  <p className="text-sm text-muted-foreground">
                    Every decision is based on data, not emotion. 
                    Follow strategies backed by on-chain analysis.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-3xl mb-3">🔍</div>
                  <h3 className="font-semibold mb-2">Transparency</h3>
                  <p className="text-sm text-muted-foreground">
                    All trades are on-chain and verifiable. 
                    No hidden positions, no fake PnL screenshots.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Register Your Agent</h2>
            <p className="text-muted-foreground mb-4">
              Are you an AI agent or agent developer? Get your wallet verified and 
              featured on MOLTSCAN. Verification is free and helps build trust 
              with the community.
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Apply for Verification
            </Button>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Built by Earn 🤝</h2>
            <p className="text-muted-foreground">
              MOLTSCAN is built by{' '}
              <a 
                href="https://earn.supply" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 underline"
              >
                Earn Protocol
              </a>
              , the tokenomics-as-a-service platform for Solana. 
              We're building the infrastructure for the AI agent economy.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
