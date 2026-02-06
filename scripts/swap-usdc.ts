import { Connection, Keypair, VersionedTransaction } from '@solana/web3.js';
import bs58 from 'bs58';
import fs from 'fs';

const SOL_MINT = 'So11111111111111111111111111111111111111112';
const USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
const JUPITER_API = 'https://public.jupiterapi.com';

interface JupiterQuote {
  inputMint: string;
  inAmount: string;
  outputMint: string;
  outAmount: string;
  error?: string;
}

interface SwapResponse {
  swapTransaction: string;
  error?: string;
}

interface WalletFile {
  public_address: string;
  private_key: string;
}

async function swapSolToUsdc() {
  // Load wallet (custom format with base58 private key)
  const walletPath = process.env.HOME + '/.config/solana/earn-wallet.json';
  const walletData = JSON.parse(fs.readFileSync(walletPath, 'utf-8')) as WalletFile;
  const secretKey = bs58.decode(walletData.private_key);
  const wallet = Keypair.fromSecretKey(secretKey);
  
  console.log('Wallet:', wallet.publicKey.toString());

  // Amount: 0.015 SOL = 15000000 lamports (~$1.28 USDC)
  const amount = 15000000;
  
  // Get quote
  console.log('Getting quote for 0.015 SOL -> USDC...');
  const quoteResponse = await fetch(
    `${JUPITER_API}/quote?inputMint=${SOL_MINT}&outputMint=${USDC_MINT}&amount=${amount}&slippageBps=100`
  );
  const quote = await quoteResponse.json() as JupiterQuote;
  
  if (quote.error) {
    console.error('Quote error:', quote.error);
    return;
  }
  
  console.log('Quote:', {
    inAmount: quote.inAmount,
    outAmount: quote.outAmount,
    outAmountUsd: (parseInt(quote.outAmount) / 1e6).toFixed(2) + ' USDC'
  });

  // Get swap transaction
  console.log('Building swap transaction...');
  const swapResponse = await fetch(`${JUPITER_API}/swap`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      quoteResponse: quote,
      userPublicKey: wallet.publicKey.toString(),
      wrapAndUnwrapSol: true,
    }),
  });
  const swapData = await swapResponse.json() as SwapResponse;
  
  if (swapData.error) {
    console.error('Swap error:', swapData.error);
    return;
  }

  // Deserialize and sign transaction
  const swapTxBuf = Buffer.from(swapData.swapTransaction, 'base64');
  const tx = VersionedTransaction.deserialize(swapTxBuf);
  tx.sign([wallet]);

  // Send transaction
  console.log('Sending transaction...');
  const connection = new Connection('https://api.mainnet-beta.solana.com');
  const signature = await connection.sendRawTransaction(tx.serialize(), {
    skipPreflight: true,
    maxRetries: 3,
  });
  
  console.log('Transaction sent:', signature);
  console.log('Solscan:', `https://solscan.io/tx/${signature}`);
  
  // Wait for confirmation
  console.log('Waiting for confirmation...');
  const confirmation = await connection.confirmTransaction(signature, 'confirmed');
  
  if (confirmation.value.err) {
    console.error('Transaction failed:', confirmation.value.err);
  } else {
    console.log('✅ Swap successful!');
    console.log('Now run: npx helius-cli signup --keypair ~/.config/solana/earn-wallet.json');
  }
}

swapSolToUsdc().catch(console.error);
