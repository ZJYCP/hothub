import { NextResponse } from 'next/server';

import { zhihuService } from './zhihu.service';

export async function GET() {
  try {
    const hotList = await zhihuService();

    return NextResponse.json(hotList);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch Zhihu hot list' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
