import { NextResponse } from 'next/server';
import { weiboService } from './weibo/weibo.service';
import { zhihuService } from './zhihu/zhihu.service';

import { HotTrendsResponse, PlatformEnum } from '@/types';

export async function GET() {
  return NextResponse.json({
    message: 'Hello World',
  });
}
