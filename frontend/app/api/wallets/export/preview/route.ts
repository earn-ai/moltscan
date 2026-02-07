import { NextRequest, NextResponse } from 'next/server';
import { loadVerifiedAgents } from '@/lib/data';

// Convert emoji to Discord/Slack style code
function emojiToCode(emoji?: string): string {
  const emojiMap: Record<string, string> = {
    '🦞': ':lobster:',
    '🤝': ':handshake:',
    '🤖': ':robot:',
    '🔥': ':fire:',
    '💰': ':moneybag:',
    '🚀': ':rocket:',
  };
  return emojiMap[emoji || '🦞'] || ':lobster:';
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format') || 'json';
  const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50);
  
  const agents = loadVerifiedAgents();
  const preview = agents.slice(0, limit);
  
  if (format === 'simple') {
    const text = preview
      .map((a: any) => `${a.wallet}:${a.name}`)
      .join('\n');
    return NextResponse.json({ format: 'simple', preview: text, total: agents.length });
  }
  
  // JSON format - matching the requested structure
  const exportData = preview.map((a: any) => ({
    address: a.wallet,
    name: a.name,
    emoji: emojiToCode(a.emoji),
  }));
  
  return NextResponse.json({ format: 'json', preview: exportData, total: agents.length });
}
