import { HotTrendsResponse, PlatformEnum } from '@/types';
import { weiboService } from './weibo/weibo.service';
import { zhihuService } from './zhihu/zhihu.service';
import { toutiaoService } from './toutiao/houtiao.service';
import { douyinService } from './douyin/douyin.service';
import { baiduService } from './baidu/baidu.service';
import { ke36Service } from './ke36/ke36.service';

export async function fetch_hot_data(platform: PlatformEnum): Promise<HotTrendsResponse> {
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
