import { fetch_hot_data } from '@/app/api/hot/hot.service';
import { PlatformEnum } from '@/types';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { platform: string } }) {
  const { platform } = await params;

  //   判断platform 是否是PlatformEnum中的值
  if (!Object.values(PlatformEnum).includes(platform as PlatformEnum)) {
    return NextResponse.json({ error: 'Invalid platform' }, { status: 400 });
  } else {
    const data = await fetch_hot_data(platform as PlatformEnum);
    return NextResponse.json({ data });
  }
}
