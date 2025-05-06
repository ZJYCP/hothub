import { HotTrendsResponse, PlatformEnum } from '@/types';
import { fetch_weibo } from './weibo/weibo.service';
import { fetch_zhihu } from './zhihu/zhihu.service';

export async function fetch_hot_data(platform: PlatformEnum): Promise<HotTrendsResponse> {
  switch (platform) {
    case PlatformEnum.Weibo: {
      return await fetch_weibo();
    }
    case PlatformEnum.Zhihu: {
      return await fetch_zhihu();
    }
    default: {
      throw new Error(`Unsupported platform: ${platform}`);
    }
  }
}
