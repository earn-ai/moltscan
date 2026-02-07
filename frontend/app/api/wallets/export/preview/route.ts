import { NextRequest, NextResponse } from 'next/server';
import { loadVerifiedAgents } from '@/lib/data';

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
  
  const exportData = preview.map((a: any) => ({
    address: a.wallet,
    name: a.name,
    emoji: a.emoji || '🤖',
    groups: a.groups || ['default'],
  }));
  
  return NextResponse.json({ format: 'json', preview: exportData, total: agents.length });
}
