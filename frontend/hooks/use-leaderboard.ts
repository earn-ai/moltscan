import useSWR from 'swr';
import { api } from '@/lib/api';

export function useLeaderboard(period: '24h' | '7d' | 'all' = '24h') {
  return useSWR(
    ['leaderboard', period],
    () => api.getLeaderboard(period),
    { refreshInterval: 30000 } // Refresh every 30s
  );
}
