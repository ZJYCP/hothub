// types.ts
export interface HotTrendCardProps {
  avatarUrl: string; // 头像图片链接
  title: string; // 热搜标题
  tag?: string; // 标签（例如“热”）
  isOnList: boolean; // 是否在榜
  source: string; // 来源（例如“微博”）
  timestamp: string; // 时间戳，格式如“2025-05-07 09:16”
  metrics: {
    heat: number; // 最新热度
    speed: number; // 上升速度
    duration: string; // 在榜时长，例如“4.7 h”
    rank: number; // 当前排名
    host: string; // 主持人信息
  };
}
