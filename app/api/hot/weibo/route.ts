import { NextResponse } from 'next/server';
import { fetch_weibo } from './weibo.service';

export async function GET() {
  try {
    const hotList = await fetch_weibo();

    return NextResponse.json(hotList);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch Weibo hot search' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
