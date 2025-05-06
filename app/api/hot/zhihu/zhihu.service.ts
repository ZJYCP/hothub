'use server';
import { PlatformEnum, ZhihuTrendItem } from '@/types';

let cachedAt: string | null = null;
interface ZhihuHotItem {
  target: {
    titleArea: {
      text: string;
    };
    metricsArea: {
      text: string;
    };
    link: {
      url: string;
    };
  };
}
export async function fetch_zhihu() {
  const response = await fetch('https://www.zhihu.com/billboard', {
    credentials: 'include',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
      Cookie:
        '__zse_ck=004_Kv70Fyw3qunbHo6YkkA7jx0j4BXOo/QtZgqh5SlOl6ZeDsvGrxH6C0MuqgOqE/IvVIC7k8sWvRjQ6psv9jnDj7B/KUf41RJldphbPQgZY2I/=DFRUhwNrKvGgnb01UOr-3H4xJdfmVe+d9cgSfKbSplZP7yjzaDK3H6QZwP/PcSD39odBDrh5h+YCn36qXcSLrIL70AJJhyQNGAR4/JjLkpanQn9qaYDzsv/0qtGBKliXowOOc06TSGKWBvwyD7Ff',
    },
  });

  const html = await response.text();
  cachedAt = new Date().toISOString(); // 记录缓存生成时间

  // 由于 's' 标志仅在面向 “es2018” 或更高版本时可用，这里使用 [\s\S] 替代 's' 标志的功能
  const regex = /<script id="js-initialData" type="text\/json">([\s\S]*?)<\/script>/;
  const match = html.match(regex);

  if (!match) throw new Error('Failed to parse Zhihu hot data');

  const jsonData = JSON.parse(match[1]);
  const hotList = jsonData.initialState.topstory.hotList.map(
    (item: ZhihuHotItem, index: number) =>
      ({
        id: 'zhihu_' + index.toString(),
        title: item.target.titleArea.text,
        source: PlatformEnum.Zhihu,
        heat: parseInt(item.target.metricsArea.text.replace(/[^0-9]/g, '')) * 10000,
        url: item.target.link.url,
        rank: index,
      }) as ZhihuTrendItem,
  );
  return { hotList, cachedAt };
}
