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
  Bilibili = 'bilibili',
  Zhihu = 'zhihu',
  Juejin = 'juejin',
  Toutiao = 'toutiao',
  Douyin = 'douyin',
  Baidu = 'baidu',
  Twitter = 'twitter',
  Ke36 = 'ke36',
  Youtube = 'youtube',
}
export interface TrendItem {
  id: string;
  title: string;
  url: string;
  heat: number;
  rank: number;
  source: PlatformEnum;
}

export interface WeiboTrendItem extends TrendItem {}

export interface ZhihuTrendItem extends TrendItem {}

export interface ToutiaoTrendItem extends TrendItem {}

export interface DouyinTrendItem extends TrendItem {}
export interface BaiduTrendItem extends TrendItem {}
export interface Ke36TrendItem extends TrendItem {}
