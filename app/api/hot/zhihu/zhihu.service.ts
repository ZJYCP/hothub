'use server';
import { HotService } from '../base.service';

import { PlatformEnum, ZhihuTrendItem } from '@/types';

interface ZhihuHotItem {
  title: string;
  hot: string;
  url: string;
  index: number;
}

class ZhihuService extends HotService {
  protected apiUrl: string = 'https://api.vvhan.com/api/hotlist/zhihuHot';

  protected platform: PlatformEnum = PlatformEnum.Zhihu;

  protected async transformData(data: any): Promise<ZhihuTrendItem[]> {
    const result = data.data.map(
      (item: ZhihuHotItem, index: number) =>
        ({
          id: 'zhihu_' + index.toString(),
          title: item.title,
          source: PlatformEnum.Zhihu,
          heat: parseInt(item.hot.split('万')[0]) * 10000,
          url: item.url,
          rank: index,
        }) as ZhihuTrendItem,
    );

    return result;
  }
}

export async function zhihuService(operation: 'fetch' | 'sync' = 'fetch') {
  const zhihuService = ZhihuService.getInstance<ZhihuService>();

  if (operation === 'sync') {
    return await zhihuService.syncHotTrends();
  } else if (operation === 'fetch') {
    return await zhihuService.fetchHotList();
  }
}
