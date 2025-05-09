// components/HotSearchCard.tsx
import { Card, CardHeader, CardBody, Avatar, Badge, Button, Divider, Chip } from '@heroui/react';

import { HotTrendCardProps } from '@/types/analyse';
import OperationsCom from './Operations';

export default function HotSearchCard(props: HotTrendCardProps) {
  const { title, avatarUrl, tag, source, timestamp, metrics, isOnList, url } = props;

  return (
    <Card className="w-full mx-auto p-4">
      <CardHeader className="flex items-center space-x-4">
        {avatarUrl ? (
          <Avatar alt={title} radius="sm" size="lg" src={avatarUrl} />
        ) : (
          <div className="flex items-center justify-center w-12 h-12 rounded-md bg-blue-500 text-white text-3xl font-bold">
            {title.charAt(0)}
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-xl font-semibold">{title}</h1>
          <div className="flex items-center space-x-2 mt-1">
            {tag && <Badge color="warning">{tag}</Badge>}
            {isOnList && (
              <Chip color="warning" variant="bordered">
                在榜
              </Chip>
            )}
          </div>
        </div>
        {/* 操作区 */}
        <OperationsCom url={url}></OperationsCom>
        <div className="text-right text-sm text-gray-500">
          <div>来源：{source}</div>
          <div>{timestamp}</div>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="grid grid-cols-5 gap-4 text-center text-sm text-gray-700">
          <div>
            <p className="text-xl font-bold">{metrics.heat.toLocaleString()}</p>
            <p className="text-gray-500">最新热度</p>
          </div>
          <div>
            <p className="text-xl font-bold">{metrics.speed}</p>
            <p className="text-gray-500">上升速度</p>
          </div>
          <div>
            <p className="text-xl font-bold">{metrics.duration}</p>
            <p className="text-gray-500">在榜时长</p>
          </div>
          <div>
            <p className="text-xl font-bold">{metrics.rank}</p>
            <p className="text-gray-500">当前排名</p>
          </div>
          <div>
            <p className="text-xl font-bold truncate">{metrics.host}</p>
            <p className="text-gray-500">主持人</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
