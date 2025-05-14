import { SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface HotTrendsResponse {
  hotList: TrendItem[];
  cachedAt: string;
}
export enum PlatformEnum {
  Weibo = 'weibo',
  Zhihu = 'zhihu',
  Toutiao = 'toutiao',
  Douyin = 'douyin',
  Baidu = 'baidu',
  Ke36 = 'ke36',
  Thepaper = 'thepaper',
  Wallstreetcn = 'wallstreetcn',
  Hupu = 'hupu',
  Hackernews = 'hackernews',
}
export interface TrendItem {
  id: string;
  title: string;
  url: string;
  heat: number;
  rank: number;
  source: PlatformEnum;
  imageUrl?: string | null;
}

export interface WeiboTrendItem extends TrendItem {}

export interface ZhihuTrendItem extends TrendItem {}

export interface ToutiaoTrendItem extends TrendItem {}

export interface DouyinTrendItem extends TrendItem {}
export interface BaiduTrendItem extends TrendItem {}
export interface Ke36TrendItem extends TrendItem {}
