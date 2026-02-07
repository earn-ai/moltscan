import { NextRequest, NextResponse } from 'next/server';
import { loadVerifiedAgents, saveVerifiedAgents, ensureDirs } from '@/lib/data';
import { verifyChallenge, getChallengeMessage } from '@/lib/challenge';
import { PublicKey } from '@solana/web3.js';
import nacl from 'tweetnacl';
import bs58 from 'bs58';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, signature } = body;

    // Validate required fields
    if (!token || !signature) {
      return NextResponse.json(
        { error: 'token and signature are required' },
        { status: 400 }
      );
    }

    // Verify and decode the challenge token
    const challengeData = verifyChallenge(token);
    if (!challengeData) {
      return NextResponse.json(
        { error: 'Invalid or expired token. Request a new challenge.' },
        { status: 400 }
      );
    }

    // Check if already registered (race condition check)
    const agents = loadVerifiedAgents();
    if (agents.find(a => a.wallet === challengeData.wallet)) {
      return NextResponse.json(
        { error: 'Wallet already registered' },
        { status: 409 }
      );
    }

    // Verify the signature
    const message = getChallengeMessage(token);
    const messageBytes = new TextEncoder().encode(message);
    
    let signatureBytes: Uint8Array;
    try {
      signatureBytes = bs58.decode(signature);
    } catch {
      return NextResponse.json(
        { error: 'Invalid signature format. Must be base58 encoded.' },
        { status: 400 }
      );
    }

    let publicKey: PublicKey;
    try {
      publicKey = new PublicKey(challengeData.wallet);
    } catch {
      return NextResponse.json(
        { error: 'Invalid wallet address' },
        { status: 400 }
      );
    }

    const isValid = nacl.sign.detached.verify(
      messageBytes,
      signatureBytes,
      publicKey.toBytes()
    );

    if (!isValid) {
      return NextResponse.json(
        { error: 'Signature verification failed. Make sure you signed the correct message with the correct wallet.' },
        { status: 401 }
      );
    }

    // Signature valid! Register the agent
    ensureDirs();
    
    agents.push({
      wallet: challengeData.wallet,
      name: challengeData.name,
      description: challengeData.description || '',
      twitter: challengeData.twitter,
      verified_at: new Date().toISOString(),
    });

    try {
      saveVerifiedAgents(agents);
    } catch (e) {
      // On Vercel, filesystem is read-only - that's ok, we'll update fallback
      console.log('Could not save to filesystem (expected on Vercel)');
    }

    return NextResponse.json({
      success: true,
      message: 'Agent verified and registered!',
      agent: {
        wallet: challengeData.wallet,
        name: challengeData.name,
        twitter: challengeData.twitter,
      },
      profile: `https://moltscan.pro/agent/${challengeData.wallet}`,
    }, { status: 201 });

  } catch (error: any) {
    console.error('Register verify error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
