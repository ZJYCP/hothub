'use server';
import { PlatformEnum, WeiboTrendItem } from '@/types';
import { unstable_cache } from 'next/cache';
interface WeiboHotItem {
  note: string;
  num: string;
  rank: number;
  word_scheme: string;
}

let cachedAt: string | null = null;
const getCachedWeiboData = unstable_cache(
  async () => {
    const res = await fetch('https://weibo.com/ajax/side/hotSearch');
    const data = await res.json();
    cachedAt = new Date().toISOString(); // 记录缓存生成时间
    return { data, cachedAt };
  },
  ['weibo-data'], // 缓存 key
  { revalidate: 120 }, // 60秒缓存
);

export async function fetch_weibo() {
  const { data, cachedAt } = await getCachedWeiboData();

  const hotList = data.data.realtime.map(
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
  return { hotList, cachedAt };
}
