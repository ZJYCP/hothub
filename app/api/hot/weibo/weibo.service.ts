import { HotService } from '../base.service';

import { PlatformEnum, WeiboTrendItem } from '@/types';

interface WeiboHotItem {
  note: string;
  num: string;
  rank: number;
  word_scheme: string;
  is_ad?: number;
}

class WeiboService extends HotService {
  protected apiUrl: string = 'https://weibo.com/ajax/side/hotSearch';
  protected platform: PlatformEnum = PlatformEnum.Weibo;

  protected async transformData(data: any): Promise<WeiboTrendItem[]> {
    return (data.data.realtime as WeiboHotItem[])
      .filter((item) => item.is_ad !== 1)
      .map(
        (item, index) =>
          ({
            id: 'weibo_' + index.toString(),
            title: item.note,
            source: PlatformEnum.Weibo,
            heat: parseInt(item.num),
            rank: item.rank,
            url: `https://s.weibo.com/weibo?q=${encodeURIComponent(item.word_scheme)}`,
          }) as WeiboTrendItem,
      );
  }
}

export const weiboServiceInstance = WeiboService.getInstance<WeiboService>();

export async function weiboService(operation: 'fetch' | 'sync' = 'fetch') {
  const weiboService = WeiboService.getInstance<WeiboService>();

  if (operation === 'fetch') {
    return await weiboService.fetchHotList();
  } else {
    return await weiboService.syncHotTrends();
  }
}
