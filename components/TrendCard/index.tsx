import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Image } from '@heroui/react';

import TrendRow from './TrendRow';

import { PlatformEnum, TrendItem } from '@/types';
import { transformPlatformToLabel } from '@/lib/utils';

interface TrendCardProps {
  platform?: PlatformEnum;
  data: TrendItem[];
  cachedAt: string;
}
export default function TrendCard(props: TrendCardProps) {
  const { platform, data, cachedAt } = props;

  return (
    <Card className="flex-1">
      <CardHeader className="flex gap-3">
        <Image
          alt="heroui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
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
