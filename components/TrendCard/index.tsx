import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from '@heroui/react';
import { TrendItem } from '@/types';
import TrendRow from './TrendRow';

interface TrendCardProps {
  platform?: string;
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
          <p className="text-md">{platform}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="max-h-[1200px]">
        {data.map((item, index) => {
          return <TrendRow data={item} key={item.id}></TrendRow>;
        })}
      </CardBody>
      <Divider />
      <CardFooter>
        <span>
          更新时间：
          {new Date(cachedAt).toLocaleString('zh-CN', {
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </CardFooter>
    </Card>
  );
}
