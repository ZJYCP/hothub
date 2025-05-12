import { baiduService } from '../../hot/baidu/baidu.service';
import { douyinService } from '../../hot/douyin/douyin.service';
import { ke36Service } from '../../hot/ke36/ke36.service';
import { toutiaoService } from '../../hot/toutiao/houtiao.service';
import { weiboService } from '../../hot/weibo/weibo.service';
import { zhihuService } from '../../hot/zhihu/zhihu.service';

export async function syncHotTrends() {
  // 实现同步热门趋势的逻辑
  try {
    const result = await Promise.all([
      zhihuService('sync'),
      weiboService('sync'),
      toutiaoService('sync'),
      douyinService('sync'),
      baiduService('sync'),
      ke36Service('sync'),
    ]);
    return result;
  } catch (err) {
    console.log(err);
  }
}
