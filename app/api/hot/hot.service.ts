import { HotTrendsResponse, PlatformEnum } from '@/types';
import { weiboService } from './weibo/weibo.service';
import { zhihuService } from './zhihu/zhihu.service';
import { toutiaoService } from './toutiao/houtiao.service';
import { douyinService } from './douyin/douyin.service';
import { baiduService } from './baidu/baidu.service';
import { ke36Service } from './ke36/ke36.service';

import prisma from '@/lib/prisma';
async function fetch_data_from_db(platform?: PlatformEnum) {
  return await prisma.hotTrend.findMany({
    select: {
      id: true,
      title: true,
      source: true,
      url: true,
      rank: true,
      heat: true,
    },
    where: {
      source: platform,
    },
  });
}

export async function fetch_hot_data(platform?: PlatformEnum): Promise<HotTrendsResponse> {
  if (!platform) {
    try {
      const syncTaskRecord = await prisma.syncTaskRecord.findUnique({
        where: {
          taskName: 'hotTrends',
        },
      });
      const hotList = (await fetch_data_from_db()).map((item) => {
        return {
          ...item,
          id: item.source + '_' + item.id,
          source: item.source as PlatformEnum,
        };
      });
      const result = {
        hotList,
        cachedAt: syncTaskRecord?.lastSyncAt?.toISOString() || new Date().toISOString(),
      };
      return result;
    } catch (error) {
      console.error(error);
    }
  }
  switch (platform) {
    case PlatformEnum.Weibo: {
      return await weiboService();
    }
    case PlatformEnum.Zhihu: {
      return await zhihuService();
    }
    case PlatformEnum.Toutiao: {
      return await toutiaoService();
    }
    case PlatformEnum.Douyin: {
      return await douyinService();
    }
    case PlatformEnum.Baidu: {
      return await baiduService();
    }
    case PlatformEnum.Ke36: {
      return await ke36Service();
    }
    default: {
      throw new Error(`Unsupported platform: ${platform}`);
    }
  }
}
