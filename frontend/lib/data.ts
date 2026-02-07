import fs from 'fs';
import path from 'path';

// Support both local dev (../data) and production (./data)
function getDataDir(): string {
  const prodPath = path.join(process.cwd(), 'data');
  const devPath = path.join(process.cwd(), '..', 'data');
  
  if (fs.existsSync(prodPath)) return prodPath;
  if (fs.existsSync(devPath)) return devPath;
  
  // Create prod path if neither exists
  fs.mkdirSync(prodPath, { recursive: true });
  return prodPath;
}

function getCacheDir(): string {
  const prodPath = path.join(process.cwd(), 'cache');
  const devPath = path.join(process.cwd(), '..', 'cache');
  
  if (fs.existsSync(prodPath)) return prodPath;
  if (fs.existsSync(devPath)) return devPath;
  
  // Create prod path if neither exists
  fs.mkdirSync(prodPath, { recursive: true });
  return prodPath;
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
  const filePath = path.join(getDataDir(), 'verified_agents.json');
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }
  return [];
}

// Save verified agents to JSON
export function saveVerifiedAgents(agents: Agent[]): void {
  ensureDirs();
  const filePath = path.join(getDataDir(), 'verified_agents.json');
  fs.writeFileSync(filePath, JSON.stringify(agents, null, 2));
}

// Load leaderboard from cache
export function loadLeaderboard(): LeaderboardEntry[] {
  const filePath = path.join(getCacheDir(), 'leaderboard.json');
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }
  return [];
}

// Load cached trades for an agent
export function loadCachedTrades(wallet: string): Trade[] {
  const filePath = path.join(getCacheDir(), 'agents', `${wallet}.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return data.trades || [];
  }
  return [];
}

// Get last update timestamp
export function getLastUpdate(): string {
  const filePath = path.join(getCacheDir(), 'last_update.json');
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return data.timestamp;
  }
  return 'never';
}

// Ensure directories exist
export function ensureDirs(): void {
  const dataDir = getDataDir();
  const cacheDir = getCacheDir();
  
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });
  if (!fs.existsSync(path.join(cacheDir, 'agents'))) {
    fs.mkdirSync(path.join(cacheDir, 'agents'), { recursive: true });
  }
}
