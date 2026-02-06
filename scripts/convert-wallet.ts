import bs58 from 'bs58';
import fs from 'fs';

const walletPath = process.env.HOME + '/.config/solana/earn-wallet.json';
const walletData = JSON.parse(fs.readFileSync(walletPath, 'utf-8'));
const secretKey = bs58.decode(walletData.private_key);

// Write as standard Solana CLI format (JSON array of bytes)
const outputPath = process.env.HOME + '/.helius-cli/keypair.json';
fs.mkdirSync(process.env.HOME + '/.helius-cli', { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(Array.from(secretKey)));
console.log('Converted wallet saved to:', outputPath);
