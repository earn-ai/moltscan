import { NextRequest, NextResponse } from 'next/server';
import { loadVerifiedAgents } from '@/lib/data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format') || 'json';
  const group = searchParams.get('group');
  
  let agents = loadVerifiedAgents();
  
  // Filter by group if specified
  if (group && group !== 'all') {
    agents = agents.filter((a: any) => a.groups?.includes(group));
  }
  
  // Limit to 10000
  agents = agents.slice(0, 10000);
  
  if (format === 'simple') {
    // Simple format: address:name
    const text = agents
      .map((a: any) => `${a.wallet}:${a.name}`)
      .join('\n');
    
    return new NextResponse(text, {
      headers: {
        'Content-Type': 'text/plain',
        'Content-Disposition': 'attachment; filename="wallets.txt"',
      },
    });
  }
  
  // JSON format
  const exportData = agents.map((a: any) => ({
    address: a.wallet,
    name: a.name,
    emoji: a.emoji || '🤖',
    groups: a.groups || ['default'],
  }));
  
  return NextResponse.json(exportData, {
    headers: {
      'Content-Disposition': 'attachment; filename="wallets.json"',
    },
  });
}
