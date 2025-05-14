// 澎湃新闻
import { HotService } from '../base.service';

import { PlatformEnum, TrendItem } from '@/types';

interface Res {
  data: {
    hotNews: {
      contId: string;
      name: string;
      pubTimeLong: string;
    }[];
  };
}
class ThePaperService extends HotService {
  protected apiUrl: string = 'https://cache.thepaper.cn/contentapi/wwwIndex/rightSidebar';

  protected platform: PlatformEnum = PlatformEnum.Thepaper;

  protected async transformData(data: Res): Promise<TrendItem[]> {
    const result = data.data.hotNews.map(
      (item, index: number) =>
        ({
          id: 'thepaper_' + index.toString(),
          title: item.name,
          source: PlatformEnum.Thepaper,
          heat: -1,
          url: `https://www.thepaper.cn/newsDetail_forward_${item.contId}`,
          rank: index,
        }) as TrendItem,
    );

    return result;
  }
}

export const thePaperServiceInstance = ThePaperService.getInstance<ThePaperService>();
