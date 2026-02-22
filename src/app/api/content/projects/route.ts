import { NextResponse } from 'next/server';
import { getProjects } from '@/lib/dataStore';
import { mockProjects } from '@/lib/mockData';

export async function GET() {
  // Serve from JSON store; fall back to mock data if store is empty
  const stored = getProjects();
  const data = stored.length > 0 ? stored : mockProjects;
  return NextResponse.json(data, {
    headers: {
      // Short cache — 60s stale, revalidate in background
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
}
