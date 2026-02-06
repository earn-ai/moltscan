import { LeaderboardEntry, Trade, AgentStats, Agent } from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

export const api = {
  // Get leaderboard
  async getLeaderboard(period: '24h' | '7d' | 'all' = '24h'): Promise<{ period: string; leaderboard: LeaderboardEntry[] }> {
    const res = await fetch(`${API_BASE}/api/leaderboard?period=${period}`);
    if (!res.ok) throw new Error('Failed to fetch leaderboard');
    return res.json();
  },

  // Get recent trades
  async getRecentTrades(limit = 50): Promise<{ trades: Trade[] }> {
    const res = await fetch(`${API_BASE}/api/trades/recent?limit=${limit}`);
    if (!res.ok) throw new Error('Failed to fetch trades');
    return res.json();
  },

  // Get agent profile
  async getAgent(wallet: string): Promise<AgentStats> {
    const res = await fetch(`${API_BASE}/api/agents/${wallet}`);
    if (!res.ok) throw new Error('Failed to fetch agent');
    return res.json();
  },

  // Get agent trades
  async getAgentTrades(wallet: string, limit = 100): Promise<{ trades: Trade[] }> {
    const res = await fetch(`${API_BASE}/api/agents/${wallet}/trades?limit=${limit}`);
    if (!res.ok) throw new Error('Failed to fetch agent trades');
    return res.json();
  },

  // Search agents
  async searchAgents(query: string): Promise<Agent[]> {
    const res = await fetch(`${API_BASE}/api/agents/search?q=${query}`);
    if (!res.ok) throw new Error('Failed to search agents');
    return res.json();
  },
};
