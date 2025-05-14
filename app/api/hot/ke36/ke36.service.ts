import { HotService } from '../base.service';

import { PlatformEnum, Ke36TrendItem } from '@/types';

interface Ke36HotItem {
  title: string;
  hot: string;
  url: string;
  index: number;
}

class Ke36Service extends HotService {
  protected apiUrl: string = 'http://api.vvhan.com/api/hotlist/36Ke';

  protected platform: PlatformEnum = PlatformEnum.Ke36;

  protected async transformData(data: any): Promise<Ke36TrendItem[]> {
    const result = data.data.map(
      (item: Ke36HotItem, index: number) =>
        ({
          id: 'ke36_' + index.toString(),
          title: item.title,
          source: PlatformEnum.Ke36,
          heat: parseInt(item.hot.split('万')[0]) * 10000,
          url: item.url,
          rank: index,
        }) as Ke36TrendItem,
    );

    return result;
  }
}
export const ke36ServiceInstance = Ke36Service.getInstance<Ke36Service>();
export async function ke36Service(operation: 'fetch' | 'sync' = 'fetch') {
  const ke36Service = Ke36Service.getInstance<Ke36Service>();
  if (operation === 'sync') {
    return await ke36Service.syncHotTrends();
  } else {
    return await ke36Service.fetchHotList();
  }
}
