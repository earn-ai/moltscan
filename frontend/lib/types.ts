export interface Agent {
  wallet: string;
  name: string;
  description: string;
  twitter?: string;
  telegram?: string;
  verified: boolean;
  verified_at: string;
}

export interface Trade {
  signature: string;
  timestamp: number;
  wallet: string;
  agentName?: string;
  action?: 'buy' | 'sell' | 'swap';
  tokenIn: string;
  tokenInMint: string;
  tokenOut: string;
  tokenOutMint: string;
  amountIn: number;
  amountOut: number;
  dex: string;
  pnl_sol?: number;
  pnl_usd?: number;
}

export interface LeaderboardEntry {
  rank: number;
  wallet: string;
  name: string;
  twitter?: string;
  pnl: number;
  pnl_24h?: number;
  pnl_7d?: number;
  pnl_all?: number;
  win_rate: number;
  total_trades: number;
  verified?: boolean;
}

export interface AgentStats {
  agent: Agent;
  stats: {
    pnl_24h: number;
    pnl_7d: number;
    pnl_all: number;
    win_rate: number;
    total_trades: number;
  };
  trades: Trade[];
}
