// 华尔街见闻
import { HotService } from '../base.service';

import { PlatformEnum, TrendItem } from '@/types';
interface Res {
  data: {
    title: string;
    hot: string;
    url: string;
    mobil_url: string;
  }[];
}
class HupuService extends HotService {
  protected apiUrl: string = `https://api.vvhan.com/api/hotlist/huPu`;

  protected platform: PlatformEnum = PlatformEnum.Hupu;

  protected async transformData(data: Res): Promise<TrendItem[]> {
    const result = data.data.map(
      (item, index) =>
        ({
          id: 'hupu' + index.toString(),
          title: item.title,
          source: PlatformEnum.Hupu,
          heat: -1,
          url: item.url,
          rank: index,
        }) as TrendItem,
    );

    return result;
  }
}

export const hupuServiceInstance = HupuService.getInstance<HupuService>();
