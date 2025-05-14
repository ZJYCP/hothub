'use server';
import { HotTrendsResponse, PlatformEnum } from '@/types';
import { weiboService, weiboServiceInstance } from './weibo/weibo.service';
import { fetch_zhihu_instane, zhihuService, zhihuServiceInstance } from './zhihu/zhihu.service';
import { toutiaoService, toutiaoServiceInstance } from './toutiao/houtiao.service';
import { douyinService, douyinServiceInstance } from './douyin/douyin.service';
import { baiduService, baiduServiceInstance } from './baidu/baidu.service';
import { ke36Service, ke36ServiceInstance } from './ke36/ke36.service';
import prisma from '@/lib/prisma';
import { thePaperServiceInstance } from './thepaper/thepaper.service';
import { HotService } from './base.service';

const hot_source_instanceMap: Record<PlatformEnum, HotService> = {
  [PlatformEnum.Weibo]: weiboServiceInstance,
  [PlatformEnum.Zhihu]: zhihuServiceInstance,
  [PlatformEnum.Thepaper]: thePaperServiceInstance,
  [PlatformEnum.Toutiao]: toutiaoServiceInstance,
  [PlatformEnum.Douyin]: douyinServiceInstance,
  [PlatformEnum.Baidu]: baiduServiceInstance,
  [PlatformEnum.Ke36]: ke36ServiceInstance,
};

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
  if (platform && hot_source_instanceMap[platform]) {
    const hot_service = hot_source_instanceMap[platform];
    return await hot_service.fetchHotList();
  } else {
    throw new Error(`Unsupported platform: ${platform}`);
  }
}

export async function sync_hot_trends(platform?: PlatformEnum) {
  try {
    if (platform && hot_source_instanceMap[platform]) {
      const hot_service = hot_source_instanceMap[platform];
      return await hot_service.syncHotTrends();
    } else {
      const promises = Object.values(hot_source_instanceMap).map((service) =>
        service.syncHotTrends(),
      );
      return await Promise.all(promises);
    }
  } catch (error) {
    console.error(error);
  }
}
