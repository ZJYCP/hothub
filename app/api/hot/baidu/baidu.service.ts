import { HotService } from '../base.service';

import { PlatformEnum, BaiduTrendItem } from '@/types';

interface BaiduHotItem {
  title: string;
  hot: string;
  url: string;
  index: number;
}

class BaiduService extends HotService {
  protected apiUrl: string = 'http://api.vvhan.com/api/hotlist/baiduRD';

  protected platform: PlatformEnum = PlatformEnum.Baidu;

  protected async transformData(data: any): Promise<BaiduTrendItem[]> {
    const result = data.data.map(
      (item: BaiduHotItem, index: number) =>
        ({
          id: 'baidu_' + index.toString(),
          title: item.title,
          source: PlatformEnum.Baidu,
          heat: parseInt(item.hot.split('万')[0]) * 10000,
          url: item.url,
          rank: index,
        }) as BaiduTrendItem,
    );

    return result;
  }
}
export const baiduServiceInstance = BaiduService.getInstance<BaiduService>();
export async function baiduService(operation: 'fetch' | 'sync' = 'fetch') {
  const baiduService = BaiduService.getInstance<BaiduService>();
  if (operation === 'sync') {
    return await baiduService.syncHotTrends();
  } else {
    return await baiduService.fetchHotList();
  }
}
