/**
 * 更新各平台热搜数据
 */
import { NextResponse } from 'next/server';
import { summaryHotTrends } from './hotTrends.service';
import prisma from '@/lib/prisma';
import { sync_hot_trends } from '../../hot/hot.service';
import { PlatformEnum } from '@/types';

export async function GET(req: Request) {
  const apiKey = req.headers.get('x-api-key');
  const globalApiKey = process.env.GLOBAL_API_KEY;
  if (apiKey !== globalApiKey) {
    return NextResponse.json({ error: 'Unauthorized with ' + apiKey }, { status: 401 });
  }

  try {
    const res = await sync_hot_trends();
    // 检查syncTaskRecord中taskName为hotTrends的记录是否存在，如果存在，就更新，如果不存在，就创建
    const taskName = 'hotTrends';
    await prisma.syncTaskRecord.upsert({
      where: {
        taskName,
      },
      update: {
        lastSyncAt: new Date(),
      },
      create: {
        taskName,
        lastSyncAt: new Date(),
      },
    });

    await summaryHotTrends();

    return NextResponse.json({ message: res });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
