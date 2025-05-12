import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Image } from '@heroui/react';

import TrendRow from './TrendRow';

import { PlatformEnum, TrendItem } from '@/types';
import { transformPlatformToLabel } from '@/lib/utils';
import { platformsInfo } from '@/config/platforms';

interface TrendCardProps {
  platform?: PlatformEnum;
  data: TrendItem[];
  cachedAt: string;
}
export default function TrendCard(props: TrendCardProps) {
  const { platform, data, cachedAt } = props;

  const platformInfo = platformsInfo.find((item) => item.id === platform);

  return (
    <Card className="flex-1">
      <CardHeader className="flex gap-3">
        <Image alt="logo" height={40} radius="sm" src={platformInfo?.icon} width={40} />
        <div className="flex ">
          <p className="text-md">{transformPlatformToLabel(platform)}</p>
          {cachedAt && (
            <span className="ml-2">
              更新时间：
              {new Date(cachedAt).toLocaleString('zh-CN', {
                month: 'numeric',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </span>
          )}
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="max-h-[1200px]">
        {data.map((item, index) => {
          return <TrendRow key={item.id} data={item} />;
        })}
      </CardBody>
      <Divider />
      <CardFooter>
        <span />
      </CardFooter>
    </Card>
  );
}
