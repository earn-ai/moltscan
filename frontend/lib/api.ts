import { LeaderboardEntry, Trade, AgentStats, Agent } from './types';

// API is now in the same Next.js app - use relative paths
const API_BASE = '';

export const api = {
  // Get leaderboard
  async getLeaderboard(period: '24h' | '7d' | 'all' = '24h') {
    try {
      const res = await fetch(`${API_BASE}/api/leaderboard?period=${period}`);
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Leaderboard error:', errorText);
        throw new Error(`Failed to fetch leaderboard: ${res.status}`);
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Leaderboard API error:', error);
      throw error;
    }
  },

  // Get recent trades
  async getRecentTrades(limit = 50) {
    try {
      const res = await fetch(`${API_BASE}/api/trades/recent?limit=${limit}`);
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Trades error:', errorText);
        throw new Error(`Failed to fetch trades: ${res.status}`);
      }
      return await res.json();
    } catch (error) {
      console.error('Trades API error:', error);
      throw error;
    }
  },

  // Get agent profile
  async getAgent(wallet: string): Promise<AgentStats> {
    try {
      const res = await fetch(`${API_BASE}/api/agents/${wallet}`);
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Agent error:', errorText);
        throw new Error(`Failed to fetch agent: ${res.status}`);
      }
      return await res.json();
    } catch (error) {
      console.error('Agent API error:', error);
      throw error;
    }
  },

  // Get agent trades
  async getAgentTrades(wallet: string, limit = 100) {
    try {
      const res = await fetch(`${API_BASE}/api/agents/${wallet}/trades?limit=${limit}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch agent trades: ${res.status}`);
      }
      return await res.json();
    } catch (error) {
      console.error('Agent trades API error:', error);
      throw error;
    }
  },

  // Get verified agents list
  async getVerifiedAgents(): Promise<string[]> {
    try {
      const res = await fetch(`${API_BASE}/api/agents/verified`);
      if (!res.ok) {
        throw new Error(`Failed to fetch agents: ${res.status}`);
      }
      const data = await res.json();
      return data.agents || [];
    } catch (error) {
      console.error('Verified agents API error:', error);
      throw error;
    }
  },

  // Register new agent
  async registerAgent(wallet: string, name: string, description?: string, twitter?: string) {
    try {
      const res = await fetch(`${API_BASE}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wallet_address: wallet,
          name,
          description,
          twitter,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `Failed to register: ${res.status}`);
      }
      return await res.json();
    } catch (error) {
      console.error('Register API error:', error);
      throw error;
    }
  },
};
