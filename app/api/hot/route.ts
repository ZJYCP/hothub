import { HotTrendsResponse, PlatformEnum } from '@/types';
import { weiboService } from './weibo/weibo.service';
import { zhihuService } from './zhihu/zhihu.service';

export async function fetch_hot_data(platform: PlatformEnum): Promise<HotTrendsResponse> {
  switch (platform) {
    case PlatformEnum.Weibo: {
      return await weiboService();
    }
    case PlatformEnum.Zhihu: {
      return await zhihuService();
    }
    default: {
      throw new Error(`Unsupported platform: ${platform}`);
    }
  }
}
