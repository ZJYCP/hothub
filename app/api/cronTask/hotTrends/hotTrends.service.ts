import { toutiaoService } from '../../hot/toutiao/houtiao.service';
import { weiboService } from '../../hot/weibo/weibo.service';
import { zhihuService } from '../../hot/zhihu/zhihu.service';

export async function syncHotTrends() {
  // 实现同步热门趋势的逻辑

  const result = await Promise.all([
    zhihuService('sync'),
    weiboService('sync'),
    toutiaoService('sync'),
  ]);
  return result;
}
