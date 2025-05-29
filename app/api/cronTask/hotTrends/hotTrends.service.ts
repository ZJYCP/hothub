import { PlatformEnum, WeiboTrendItem } from '@/types';
import prisma from '@/lib/prisma';
import { summaryHotbyWord } from '../../ai/summary/summary.service';

/**
 * 批量处理热门趋势数据
 * @param hotTrends 热门趋势数组
 * @param batchSize 批次大小
 */
async function processBatch(hotTrends: any[], batchSize: number) {
  for (let i = 0; i < hotTrends.length; i += batchSize) {
    const batch = hotTrends.slice(i, i + batchSize);
    console.log(`处理批次 ${i / batchSize + 1}，包含 ${batch.length} 条数据`);

    await Promise.all(
      batch.map(async (hotTrend) => {
        try {
          const res = await summaryHotbyWord({
            platform: hotTrend.source as PlatformEnum,
            prompt: hotTrend.title,
          });

          await prisma.hotTrend.update({
            where: {
              title_source: {
                title: hotTrend.title,
                source: hotTrend.source,
              },
            },
            data: {
              analyse: res,
            },
          });
          console.log(`成功处理热门趋势: ${hotTrend.title}`);
        } catch (error) {
          console.error(`处理热门趋势失败: ${hotTrend.title}`, error);
          // 单个任务失败不影响其他任务继续执行
        }
      }),
    );
  }
}

/**
 * 汇总热门趋势数据
 * @param batchSize 批次大小，控制并发数量，默认为 5
 */
export async function summaryHotTrends(batchSize = 5) {
  try {
    console.log('开始处理热门趋势数据');
    const hotTrends = await prisma.hotTrend.findMany({
      where: {
        source: PlatformEnum.Weibo,
      },
      orderBy: {
        rank: 'asc',
      },
    });

    console.log(`共找到 ${hotTrends.length} 条热门趋势数据`);

    if (hotTrends.length === 0) {
      console.log('没有找到热门趋势数据，处理结束');
      return;
    }

    // 使用批处理函数处理数据
    await processBatch(hotTrends, batchSize);

    console.log('所有热门趋势处理完成');
  } catch (error) {
    console.error('处理热门趋势时发生错误:', error);
  }
}
