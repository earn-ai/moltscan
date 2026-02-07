import { NextRequest, NextResponse } from 'next/server';
import { loadVerifiedAgents, saveVerifiedAgents, ensureDirs } from '@/lib/data';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { wallet_address, name, description, twitter } = body;
  
  if (!wallet_address || !name) {
    return NextResponse.json(
      { error: 'wallet_address and name are required' },
      { status: 400 }
    );
  }
  
  ensureDirs();
  
  // Check if already registered
  const agents = loadVerifiedAgents();
  if (agents.find(a => a.wallet === wallet_address)) {
    return NextResponse.json(
      { error: 'Agent already registered' },
      { status: 409 }
    );
  }
  
  // For now, auto-approve
  agents.push({
    wallet: wallet_address,
    name,
    description: description || '',
    twitter: twitter || undefined,
    verified_at: new Date().toISOString(),
  });
  
  saveVerifiedAgents(agents);
  
  return NextResponse.json({
    success: true,
    message: 'Agent registered and verified',
    wallet: wallet_address,
  }, { status: 201 });
}
