import { HotService } from '../base.service';

import { PlatformEnum, ZhihuTrendItem } from '@/types';

interface Res {
  data: {
    type: 'hot_list_feed';
    style_type: '1';
    feed_specific: {
      answer_count: 411;
    };
    target: {
      title_area: {
        text: string;
      };
      excerpt_area: {
        text: string;
      };
      image_area: {
        url: string;
      };
      metrics_area: {
        text: string;
        font_color: string;
        background: string;
        weight: string;
      };
      label_area: {
        type: 'trend';
        trend: number;
        night_color: string;
        normal_color: string;
      };
      link: {
        url: string;
      };
    };
  }[];
}
class ZhihuService extends HotService {
  protected apiUrl: string =
    'https://www.zhihu.com/api/v3/feed/topstory/hot-list-web?limit=20&desktop=true';

  protected platform: PlatformEnum = PlatformEnum.Zhihu;

  protected async transformData(data: Res): Promise<ZhihuTrendItem[]> {
    const result = data.data.map(
      (item, index: number) =>
        ({
          id: 'zhihu_' + index.toString(),
          title: item.target.title_area.text,
          source: PlatformEnum.Zhihu,
          heat: parseInt(item.target.metrics_area.text.split('万')[0]) * 10000,
          url: item.target.link.url,
          rank: index,
          imageUrl: item.target.image_area.url,
        }) as ZhihuTrendItem,
    );

    return result;
  }
}

export const zhihuServiceInstance = ZhihuService.getInstance<ZhihuService>(); // 导出实例，方便在其他地方使用，避免每次都需要创建一个新的实例

export async function fetch_zhihu_instane() {
  const zhihuService = ZhihuService.getInstance<ZhihuService>();
  return zhihuService;
}

export async function zhihuService(operation: 'fetch' | 'sync' = 'fetch') {
  const zhihuService = ZhihuService.getInstance<ZhihuService>();

  if (operation === 'sync') {
    return await zhihuService.syncHotTrends();
  } else {
    return await zhihuService.fetchHotList();
  }
}
