import { NextRequest, NextResponse } from 'next/server';
import { loadVerifiedAgents } from '@/lib/data';
import { createChallenge, getChallengeMessage } from '@/lib/challenge';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { wallet, name, description, twitter } = body;

    // Validate required fields
    if (!wallet || !name) {
      return NextResponse.json(
        { error: 'wallet and name are required' },
        { status: 400 }
      );
    }

    // Validate wallet format (base58, 32-44 chars)
    if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(wallet)) {
      return NextResponse.json(
        { error: 'Invalid wallet address format' },
        { status: 400 }
      );
    }

    // Validate name length
    if (name.length < 2 || name.length > 32) {
      return NextResponse.json(
        { error: 'Name must be 2-32 characters' },
        { status: 400 }
      );
    }

    // Check if already registered
    const agents = loadVerifiedAgents();
    if (agents.find(a => a.wallet === wallet)) {
      return NextResponse.json(
        { error: 'Wallet already registered' },
        { status: 409 }
      );
    }

    // Generate signed challenge token
    const token = createChallenge({
      wallet,
      name,
      description: description?.slice(0, 280) || '',
      twitter: twitter?.replace('@', '') || undefined,
    });

    // Message that agent needs to sign
    const message = getChallengeMessage(token);

    return NextResponse.json({
      token,
      message,
      expires: 300, // seconds
      instructions: `Sign the 'message' field with your wallet, then POST to /api/register/verify with {token, signature}`,
    });
  } catch (error: any) {
    console.error('Register request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
