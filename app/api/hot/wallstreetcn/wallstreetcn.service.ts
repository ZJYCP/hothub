// 华尔街见闻
import { HotService } from '../base.service';

import { PlatformEnum, TrendItem } from '@/types';
interface Item {
  uri: string;
  id: number;
  title?: string;
  content_text: string;
  content_short: string;
  display_time: number;
  type?: string;
}
interface HotRes {
  data: {
    day_items: Item[];
  };
}
class WallstreetcnService extends HotService {
  protected apiUrl: string = `https://api-one.wallstcn.com/apiv1/content/articles/hot?period=all`;

  protected platform: PlatformEnum = PlatformEnum.Wallstreetcn;

  protected async transformData(data: HotRes): Promise<TrendItem[]> {
    const result = data.data.day_items.map(
      (item, index: number) =>
        ({
          id: 'wallstreetcn' + index.toString(),
          title: item.title,
          source: PlatformEnum.Wallstreetcn,
          heat: -1,
          url: item.uri,
          rank: index,
        }) as TrendItem,
    );

    return result;
  }
}

export const wallstreetcnServiceInstance = WallstreetcnService.getInstance<WallstreetcnService>();
