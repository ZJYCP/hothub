import { HotService } from '../base.service';

import { PlatformEnum, DouyinTrendItem } from '@/types';

interface DouyinHotItem {
  title: string;
  hot: string;
  url: string;
  index: number;
}

class DouyinService extends HotService {
  protected apiUrl: string = 'https://api.vvhan.com/api/hotlist/douyinHot';

  protected platform: PlatformEnum = PlatformEnum.Douyin;

  protected async transformData(data: any): Promise<DouyinTrendItem[]> {
    const result = data.data.map(
      (item: DouyinHotItem, index: number) =>
        ({
          id: 'douyin_' + index.toString(),
          title: item.title,
          source: PlatformEnum.Douyin,
          heat: parseInt(item.hot.split('万')[0]) * 10000,
          url: item.url,
          rank: index,
        }) as DouyinTrendItem,
    );

    return result;
  }
}
export const douyinServiceInstance = DouyinService.getInstance<DouyinService>();

export async function douyinService(operation: 'fetch' | 'sync' = 'fetch') {
  const douyinService = DouyinService.getInstance<DouyinService>();
  if (operation === 'sync') {
    return await douyinService.syncHotTrends();
  } else {
    return await douyinService.fetchHotList();
  }
}
