/**
 * 更新各平台热搜数据
 */
import { NextResponse } from 'next/server';
import { summaryHotTrends } from './hotTrends.service';
import prisma from '@/lib/prisma';
import { sync_hot_trends } from '../../hot/hot.service';
import { PlatformEnum } from '@/types';

// 定义分析间隔时间（毫秒）
const ANALYSIS_INTERVAL = 30 * 60 * 1000; // 30分钟

export async function GET(req: Request) {
  const apiKey = req.headers.get('x-api-key');
  const globalApiKey = process.env.GLOBAL_API_KEY;
  if (apiKey !== globalApiKey) {
    return NextResponse.json({ error: 'Unauthorized with ' + apiKey }, { status: 401 });
  }

  try {
    // 1. 同步各平台热搜数据
    const syncResult = await sync_hot_trends();

    // 2. 检查是否需要执行热点分析
    const taskName = PlatformEnum.Weibo;
    const lastSyncRecord = await prisma.syncTaskRecord.findUnique({
      where: { taskName },
    });

    // 3. 判断是否需要执行分析
    const shouldRunAnalysis =
      !lastSyncRecord ||
      !lastSyncRecord.lastAnalyseAt ||
      new Date().getTime() - new Date(lastSyncRecord.lastAnalyseAt).getTime() > ANALYSIS_INTERVAL;

    // 4. 如果需要执行分析，则执行
    if (shouldRunAnalysis) {
      console.log('开始执行热点分析，距离上次分析已超过1小时');
      await summaryHotTrends();
      // 5. 更新同步时间记录
      await prisma.syncTaskRecord.upsert({
        where: { taskName },
        update: { lastAnalyseAt: new Date() },
        create: { taskName, lastSyncAt: new Date(), lastAnalyseAt: new Date() },
      });
    } else {
      console.log('距离上次分析未超过1小时，跳过本次分析');
    }

    return NextResponse.json({
      message: '热搜数据同步完成',
      syncResult,
      analysisPerformed: shouldRunAnalysis,
    });
  } catch (error) {
    console.error('热搜数据同步或分析失败:', error);
    return NextResponse.json({ error: '处理失败', details: error }, { status: 500 });
  }
}
