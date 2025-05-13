'use client';
import { formatTimeSince } from '@/utils/date';
import { platformsInfo } from '@/config/platforms';
import { PlatformEnum, TrendItem } from '@/types';
import { Card, CardBody, CardHeader, Image } from '@heroui/react';
import clsx from 'clsx';
import CardRow from './CardRow';

interface CardProps {
  platform: PlatformEnum;
  lastSyncTime: Date;
  data: TrendItem[];
}

export default function CardCom(props: CardProps) {
  const { platform, lastSyncTime, data } = props;
  const platformInfo = platformsInfo.find((item) => item.id === platform)!;
  //   根据lastSyncTime判断是刚刚更新还是n分钟/小时前更新,要和当前时间比较

  return (
    <div className="">
      <Card
        isBlurred
        className={clsx(
          'w-[400px]',
          `bg-${platformInfo.color}-500 dark:bg-${platformInfo.color}`,
          'bg-opacity-40',
        )}
      >
        <CardHeader className="flex gap-3">
          <Image alt="heroui logo" height={40} radius="sm" src={platformInfo.icon} width={40} />
          <div className="flex flex-col">
            <p className="text-md">{platformInfo.name}</p>
            <p className="text-small text-default-500">{formatTimeSince(lastSyncTime)}更新</p>
          </div>
        </CardHeader>
        <CardBody>
          <div
            className={clsx('max-h-[400px] overflow-auto p-2 rounded-md bg-white bg-opacity-30')}
          >
            {data.map((item, index) => {
              return <CardRow key={item.id} data={item}></CardRow>;
            })}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
