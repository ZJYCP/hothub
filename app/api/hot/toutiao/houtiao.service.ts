'use server';
import { HotService } from '../base.service';

import { PlatformEnum, ToutiaoTrendItem } from '@/types';

interface ToutiaoHotItem {
  title: string;
  hot: string;
  url: string;
  index: number;
}

class ToutiaoService extends HotService {
  protected apiUrl: string = 'https://api.vvhan.com/api/hotlist/toutiao';

  protected platform: PlatformEnum = PlatformEnum.Toutiao;

  protected async transformData(data: any): Promise<ToutiaoTrendItem[]> {
    const result = data.data.map(
      (item: ToutiaoHotItem, index: number) =>
        ({
          id: 'toutiao_' + index.toString(),
          title: item.title,
          source: PlatformEnum.Toutiao,
          heat: parseInt(item.hot.split('万')[0]) * 10000,
          url: item.url,
          rank: index,
        }) as ToutiaoTrendItem,
    );

    return result;
  }
}

export async function toutiaoService(operation: 'fetch' | 'sync' = 'fetch') {
  const toutiaoService = ToutiaoService.getInstance<ToutiaoService>();
  if (operation === 'sync') {
    return await toutiaoService.syncHotTrends();
  } else {
    return await toutiaoService.fetchHotList();
  }
}
