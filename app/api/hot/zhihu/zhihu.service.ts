'use server';
import { PlatformEnum, ZhihuTrendItem } from '@/types';
import { HotService } from '../base.service';

interface ZhihuHotItem {
  title: string;
  hot: string;
  url: string;
  index: number;
}

class ZhihuService extends HotService {
  protected apiUrl: string = 'https://api.vvhan.com/api/hotlist/zhihuHot';

  protected async transformData(data: any): Promise<ZhihuTrendItem[]> {
    return data.data.map(
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
  }
}

export async function zhihuService() {
  const zhihuService = ZhihuService.getInstance<ZhihuService>();
  return await zhihuService.fetchHotList();
}
