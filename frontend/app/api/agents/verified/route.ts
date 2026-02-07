import { NextResponse } from 'next/server';
import { loadVerifiedAgents } from '@/lib/data';

export async function GET() {
  const agents = loadVerifiedAgents();
  return NextResponse.json({ agents: agents.map(a => a.wallet) });
}
