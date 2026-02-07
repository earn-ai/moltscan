import crypto from 'crypto';

// Secret for signing challenges (in production, use env var)
const CHALLENGE_SECRET = process.env.CHALLENGE_SECRET || 'moltscan-challenge-secret-2026';

interface ChallengeData {
  wallet: string;
  name: string;
  description?: string;
  twitter?: string;
  timestamp: number;
  nonce: string;
}

// Create a signed challenge token
export function createChallenge(data: Omit<ChallengeData, 'timestamp' | 'nonce'>): string {
  const payload: ChallengeData = {
    ...data,
    timestamp: Math.floor(Date.now() / 1000),
    nonce: crypto.randomBytes(8).toString('hex'),
  };
  
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', CHALLENGE_SECRET)
    .update(payloadB64)
    .digest('base64url');
  
  return `${payloadB64}.${signature}`;
}

// Verify and decode a challenge token
export function verifyChallenge(token: string): ChallengeData | null {
  try {
    const [payloadB64, signature] = token.split('.');
    if (!payloadB64 || !signature) return null;
    
    // Verify signature
    const expectedSig = crypto
      .createHmac('sha256', CHALLENGE_SECRET)
      .update(payloadB64)
      .digest('base64url');
    
    if (signature !== expectedSig) return null;
    
    // Decode payload
    const payload: ChallengeData = JSON.parse(
      Buffer.from(payloadB64, 'base64url').toString()
    );
    
    // Check expiry (5 minutes)
    const now = Math.floor(Date.now() / 1000);
    if (now - payload.timestamp > 300) return null;
    
    return payload;
  } catch {
    return null;
  }
}

// Create the message that the agent needs to sign
export function getChallengeMessage(token: string): string {
  return `moltscan:verify:${token}`;
}
