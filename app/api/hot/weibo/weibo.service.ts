'use server';
import { HotService } from '../base.service';

import { PlatformEnum, WeiboTrendItem } from '@/types';

interface WeiboHotItem {
  note: string;
  num: string;
  rank: number;
  word_scheme: string;
}

class WeiboService extends HotService {
  protected apiUrl: string = 'https://weibo.com/ajax/side/hotSearch';
  protected platform: PlatformEnum = PlatformEnum.Weibo;

  protected async transformData(data: any): Promise<WeiboTrendItem[]> {
    return data.data.realtime.map(
      (item: WeiboHotItem, index: number) =>
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

export async function weiboService(operation: 'fetch' | 'sync' = 'fetch') {
  const weiboService = WeiboService.getInstance<WeiboService>();

  if (operation === 'fetch') {
    return await weiboService.fetchHotList();
  } else if (operation === 'sync') {
    return await weiboService.syncHotTrends();
  }
}
