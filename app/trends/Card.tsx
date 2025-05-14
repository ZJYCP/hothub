'use client';
import { formatTimeSince } from '@/utils/date';
import { platformsInfo } from '@/config/platforms';
import { PlatformEnum, TrendItem } from '@/types';
import { Card, CardBody, CardHeader, Image, ScrollShadow } from '@heroui/react';
import clsx from 'clsx';
import CardRow from './CardRow';
import { useMemo } from 'react';

interface CardProps {
  platform: PlatformEnum;
  lastSyncTime: Date;
  data: TrendItem[];
}

export default function CardCom(props: CardProps) {
  const { platform, lastSyncTime, data } = props;
  const platformInfo = useMemo(() => {
    return platformsInfo.find((item) => item.id === platform)!;
  }, [platform]);

  return (
    <div className="">
      <Card
        isBlurred
        classNames={{
          base: `lg:w-[400px] sm:w-10/12 bg-opacity-40 bg-${platformInfo.color}-500 dark:bg-${platformInfo.color}`,
        }}
      >
        <CardHeader className="flex gap-3">
          <Image alt="heroui logo" height={40} radius="sm" src={platformInfo.icon} width={40} />
          <div className="flex flex-col">
            <p className="text-md">{platformInfo.name}</p>
            <p className="text-small text-default-500">{formatTimeSince(lastSyncTime)}更新</p>
          </div>
        </CardHeader>
        <CardBody>
          <ScrollShadow className="w-full h-[400px] p-2 rounded-md bg-white bg-opacity-30">
            {data.map((item, index) => {
              return <CardRow key={item.id} data={item}></CardRow>;
            })}
          </ScrollShadow>
        </CardBody>
      </Card>
    </div>
  );
}
