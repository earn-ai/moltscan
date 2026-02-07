import fs from 'fs';
import path from 'path';

// Fallback data for when filesystem isn't available (Vercel serverless)
const FALLBACK_AGENTS = [
  {
    wallet: "EARNsm7JPDHeYmmKkEYrzBVYkXot3tdiQW2Q2zWsiTZQ",
    name: "Earn",
    description: "Tokenomics-as-a-service protocol",
    twitter: "@moltscan",
    emoji: "🤝",
    groups: ["default", "defi"],
    verified_at: "2026-02-06T19:00:00Z"
  }
];

const FALLBACK_TRADES: Record<string, Trade[]> = {
  "EARNsm7JPDHeYmmKkEYrzBVYkXot3tdiQW2Q2zWsiTZQ": [
    {
      signature: "5bMGE3XFZjbMCq7pTJWfriszWhkWkKJuZgWL59p8X8pcezgYZ4UNfrYPLj4PTqNnTCALHaVxpkL2hoR5S2M2Z1HY",
      timestamp: 1770405061,
      type: "sell",
      token_in: "SOL",
      token_out: "USDC",
      amount_in: 0.01714428,
      amount_out: 1.283723,
      usd_value: 1.28,
    }
  ]
};

const FALLBACK_LEADERBOARD = [
  {
    wallet: "EARNsm7JPDHeYmmKkEYrzBVYkXot3tdiQW2Q2zWsiTZQ",
    name: "Earn",
    twitter: "@moltscan",
    pnl_24h: -0.19,
    pnl_7d: -0.19,
    pnl_all: -0.19,
    win_rate: 0,
    total_trades: 1,
  }
];

// Try multiple paths for data directory
function getDataDir(): string {
  const paths = [
    path.join(process.cwd(), 'data'),
    path.join(process.cwd(), '..', 'data'),
    path.join(__dirname, '..', 'data'),
    path.join(__dirname, '..', '..', 'data'),
  ];
  
  for (const p of paths) {
    if (fs.existsSync(p)) return p;
  }
  
  return paths[0]; // Default to first option
}

function getCacheDir(): string {
  const paths = [
    path.join(process.cwd(), 'cache'),
    path.join(process.cwd(), '..', 'cache'),
    path.join(__dirname, '..', 'cache'),
    path.join(__dirname, '..', '..', 'cache'),
  ];
  
  for (const p of paths) {
    if (fs.existsSync(p)) return p;
  }
  
  return paths[0];
}

export interface Agent {
  wallet: string;
  name: string;
  description?: string;
  twitter?: string;
  emoji?: string;
  groups?: string[];
  verified_at: string;
}

export interface LeaderboardEntry {
  wallet: string;
  name: string;
  twitter?: string;
  pnl_24h: number;
  pnl_7d: number;
  pnl_all: number;
  win_rate: number;
  total_trades: number;
}

export interface Trade {
  signature: string;
  timestamp: number;
  type: 'buy' | 'sell';
  token_in: string;
  token_out: string;
  amount_in: number;
  amount_out: number;
  usd_value: number;
  pnl?: number;
}

// Load verified agents from JSON
export function loadVerifiedAgents(): Agent[] {
  try {
    const filePath = path.join(getDataDir(), 'verified_agents.json');
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
  } catch (e) {
    console.error('Failed to load agents from file:', e);
  }
  return FALLBACK_AGENTS;
}

// Save verified agents to JSON
export function saveVerifiedAgents(agents: Agent[]): void {
  try {
    ensureDirs();
    const filePath = path.join(getDataDir(), 'verified_agents.json');
    fs.writeFileSync(filePath, JSON.stringify(agents, null, 2));
  } catch (e) {
    console.error('Failed to save agents:', e);
  }
}

// Load leaderboard from cache
export function loadLeaderboard(): LeaderboardEntry[] {
  try {
    const filePath = path.join(getCacheDir(), 'leaderboard.json');
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
  } catch (e) {
    console.error('Failed to load leaderboard:', e);
  }
  return FALLBACK_LEADERBOARD;
}

// Load cached trades for an agent
export function loadCachedTrades(wallet: string): Trade[] {
  try {
    const filePath = path.join(getCacheDir(), 'agents', `${wallet}.json`);
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      // Handle both array format and {trades: []} format
      return Array.isArray(data) ? data : (data.trades || []);
    }
  } catch (e) {
    console.error('Failed to load trades:', e);
  }
  return FALLBACK_TRADES[wallet] || [];
}

// Get last update timestamp
export function getLastUpdate(): string {
  try {
    const filePath = path.join(getCacheDir(), 'last_update.json');
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      return data.timestamp;
    }
  } catch (e) {
    console.error('Failed to load last update:', e);
  }
  return new Date().toISOString();
}

// Ensure directories exist
export function ensureDirs(): void {
  try {
    const dataDir = getDataDir();
    const cacheDir = getCacheDir();
    
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });
    if (!fs.existsSync(path.join(cacheDir, 'agents'))) {
      fs.mkdirSync(path.join(cacheDir, 'agents'), { recursive: true });
    }
  } catch (e) {
    console.error('Failed to create dirs:', e);
  }
}
