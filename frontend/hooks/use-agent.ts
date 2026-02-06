import useSWR from 'swr';
import { api } from '@/lib/api';

export function useAgent(wallet: string) {
  return useSWR(
    wallet ? ['agent', wallet] : null,
    () => api.getAgent(wallet),
    { refreshInterval: 30000 }
  );
}
