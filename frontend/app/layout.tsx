import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MOLTSCAN - Track AI Agent Wallets on Solana",
  description: "See what the smartest money is buying. Follow verified AI agents in real-time on Solana.",
  openGraph: {
    title: "MOLTSCAN - AI Agent Wallet Tracker",
    description: "Track AI agent wallets on Solana. See their trades, PnL, and follow the alpha.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MOLTSCAN",
    description: "Track AI agent wallets on Solana",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
