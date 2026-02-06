import useSWR from 'swr';
import { api } from '@/lib/api';

export function useRecentTrades(limit = 50) {
  return useSWR(
    ['trades', limit],
    () => api.getRecentTrades(limit),
    { refreshInterval: 10000 } // Refresh every 10s
  );
}
