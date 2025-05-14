import { PlatformEnum } from '../types';
export interface IPlatformInfo {
  id: PlatformEnum;
  name: string;
  enabled: boolean;
  icon: string;
  color: string;
  // 排序字段名
  heatLabel?: string;
}

export const platformsInfo: IPlatformInfo[] = [
  {
    id: PlatformEnum.Weibo,
    name: '微博',
    enabled: true,
    icon: '/images/weibo.svg',
    color: 'red',
  },
  {
    id: PlatformEnum.Zhihu,
    name: '知乎',
    enabled: true,
    icon: '/images/zhihu.svg',
    color: 'blue',
  },
  {
    id: PlatformEnum.Toutiao,
    name: '今日头条',
    enabled: true,
    icon: '/images/toutiao.svg',
    color: 'slate',
  },
  {
    id: PlatformEnum.Douyin,
    name: '抖音',
    enabled: true,
    icon: '/images/douyin.svg',
    color: 'emerald',
  },
  {
    id: PlatformEnum.Baidu,
    name: '百度热点',
    enabled: true,
    icon: '/images/baidu.svg',
    color: 'purple',
  },
  {
    id: PlatformEnum.Ke36,
    name: '36氪',
    enabled: true,
    icon: '/images/ke36.svg',
    color: 'yellow',
  },
  {
    id: PlatformEnum.Thepaper,
    name: '澎湃热点',
    enabled: true,
    icon: '/images/thepaper.svg',
    color: 'violet',
  },
  {
    id: PlatformEnum.Wallstreetcn,
    name: '华尔街见闻',
    enabled: true,
    icon: '/images/wallstreetcn.svg',
    color: 'orange',
  },
  {
    id: PlatformEnum.Hupu,
    name: '虎扑',
    enabled: true,
    icon: '/images/hupu.svg',
    color: 'green',
  },
  {
    id: PlatformEnum.Hackernews,
    name: 'Hacker News',
    enabled: true,
    icon: '/images/hackernews.svg',
    color: 'red',
    heatLabel: 'points',
  },
];
