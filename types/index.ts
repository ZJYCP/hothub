import { SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface HotTrendsResponse {
  hotList: TrendItem[];
  cachedAt: string;
}
export enum PlatformEnum {
  Weibo = '微博',
  Bilibili = '哔哩哔哩',
  Zhihu = '知乎',
  Juejin = '掘金',
  Douyin = '抖音',
  Github = 'Github',
  Twitter = 'Twitter',
  Reddit = 'Reddit',
  Youtube = 'Youtube',
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
