/**
 * 更新各平台热搜数据
 */
import { NextResponse } from 'next/server';
import { syncHotTrends } from './hotTrends.service';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const apiKey = req.headers.get('x-api-key');
  const globalApiKey = process.env.GLOBAL_API_KEY;
  if (apiKey !== globalApiKey) {
    return NextResponse.json({ error: 'Unauthorized with ' + apiKey }, { status: 401 });
  }

  try {
    const res = await syncHotTrends();
    // 检查syncTaskRecord中taskName为hotTrends的记录是否存在，如果存在，就更新，如果不存在，就创建
    const taskName = 'hotTrends';
    const taskRecord = await prisma.syncTaskRecord.findUnique({
      where: {
        taskName,
      },
    });
    if (taskRecord) {
      await prisma.syncTaskRecord.update({
        where: {
          taskName,
        },
        data: {
          lastSyncAt: new Date(),
        },
      });
    } else {
      await prisma.syncTaskRecord.create({
        data: {
          taskName,
          lastSyncAt: new Date(),
        },
      });
    }
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
