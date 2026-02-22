import { NextResponse } from 'next/server';
import { getTemplates } from '@/lib/dataStore';
import { mockTemplates } from '@/lib/mockData';

export async function GET() {
  const stored = getTemplates();
  const data = stored.length > 0 ? stored : mockTemplates;
  return NextResponse.json(data, {
    headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
  });
}
