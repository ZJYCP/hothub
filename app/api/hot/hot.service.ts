'use server';
import { HotTrendsResponse, PlatformEnum } from '@/types';
import { weiboServiceInstance } from './weibo/weibo.service';
import { zhihuServiceInstance } from './zhihu/zhihu.service';
import { toutiaoServiceInstance } from './toutiao/houtiao.service';
import { douyinServiceInstance } from './douyin/douyin.service';
import { baiduServiceInstance } from './baidu/baidu.service';
import { ke36ServiceInstance } from './ke36/ke36.service';
import prisma from '@/lib/prisma';
import { thePaperServiceInstance } from './thepaper/thepaper.service';
import { HotService } from './base.service';
import { wallstreetcnServiceInstance } from './wallstreetcn/wallstreetcn.service';
import { hupuServiceInstance } from './hupu/hupu.service';
import { hackernewsServiceInstance } from './hackernews/hackernews.service';

const hot_source_instanceMap: Record<PlatformEnum, HotService> = {
  [PlatformEnum.Weibo]: weiboServiceInstance,
  [PlatformEnum.Zhihu]: zhihuServiceInstance,
  [PlatformEnum.Thepaper]: thePaperServiceInstance,
  [PlatformEnum.Toutiao]: toutiaoServiceInstance,
  [PlatformEnum.Douyin]: douyinServiceInstance,
  [PlatformEnum.Baidu]: baiduServiceInstance,
  [PlatformEnum.Ke36]: ke36ServiceInstance,
  [PlatformEnum.Wallstreetcn]: wallstreetcnServiceInstance,
  [PlatformEnum.Hupu]: hupuServiceInstance,
  [PlatformEnum.Hackernews]: hackernewsServiceInstance,
};

async function fetch_data_from_db(platform?: PlatformEnum) {
  return await prisma.hotTrend.findMany({
    where: {
      source: platform,
    },
  });
}

export async function fetch_hot_data(platform?: PlatformEnum): Promise<HotTrendsResponse> {
  if (!platform) {
    try {
      const syncTaskRecord = await prisma.syncTaskRecord.findMany();

      const hotList = (await fetch_data_from_db()).map((item) => {
        return {
          ...item,
          id: item.source + '_' + item.id,
          source: item.source as PlatformEnum,
        };
      });
      const platform_set = new Set(hotList.map((item) => item.source));

      const result = Array.from(platform_set).map((platform) => {
        return {
          id: platform,
          cachedAt:
            syncTaskRecord.find((item) => item.taskName === platform)?.lastSyncAt?.toISOString() ||
            new Date().toISOString(),
          hotList: hotList.filter((item) => item.source === platform),
        };
      });
      return result;
    } catch (error) {
      console.error(error);
    }
  }
  if (platform && hot_source_instanceMap[platform]) {
    const hot_service = hot_source_instanceMap[platform];
    return await hot_service.fetchHotList();
  } else {
    return {
      hotList: [],
      cachedAt: new Date().toISOString(),
    };
  }
}

export async function sync_hot_trends(platform?: PlatformEnum) {
  try {
    if (platform && hot_source_instanceMap[platform]) {
      const hot_service = hot_source_instanceMap[platform];
      return await hot_service.syncHotTrends();
    } else {
      // const promises = Object.values(hot_source_instanceMap).map(
      //   async (service) => await service.syncHotTrends(),
      // );
      // return await Promise.all(promises);
      const result = [];
      for (const service of Object.values(hot_source_instanceMap)) {
        result.push(await service.syncHotTrends());
      }
      return result;
    }
  } catch (error) {
    console.error(error);
  }
}
