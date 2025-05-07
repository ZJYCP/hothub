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
  Douyin = 'douyin',
  Github = 'github',
  Twitter = 'twitter',
  Reddit = 'reddit',
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
