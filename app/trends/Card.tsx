'use client';
import { formatTimeSince } from '@/utils/date';
import { platformsInfo } from '@/config/platforms';
import { PlatformEnum, TrendItem } from '@/types';
import { Card, CardBody, CardHeader, Image, ScrollShadow } from '@heroui/react';
import { RotateCcw } from 'lucide-react';
import CardRow from './CardRow';
import { useMemo, useState } from 'react';
import { sync_hot_trends } from '../api/hot/hot.service';
import { useRequest } from '@/lib/useRequest';

interface CardProps {
  platform: PlatformEnum;
  lastSyncTime: Date;
  data: TrendItem[];
}
interface HotDataRes {
  hotList: TrendItem[];
  cachedAt: string;
}
export default function CardCom(props: CardProps) {
  const { platform, lastSyncTime, data } = props;
  const platformInfo = useMemo(() => {
    return platformsInfo.find((item) => item.id === platform)!;
  }, [platform]);

  const { run: updateDateHandler } = useRequest(
    async () => {
      const res = (await sync_hot_trends(platform)) as HotDataRes;
      setRefreshData(res);
    },
    {
      manual: true,
    },
  );

  const [refreshData, setRefreshData] = useState<HotDataRes | null>(null);

  const renderData = useMemo(() => {
    return refreshData && refreshData?.hotList?.length > 0 ? refreshData.hotList : data;
  }, [refreshData, data]);

  const syncTime = useMemo(() => {
    const time =
      refreshData && refreshData?.cachedAt ? new Date(refreshData.cachedAt) : lastSyncTime;
    return formatTimeSince(time);
  }, [refreshData, lastSyncTime]);

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
            <p className="text-small text-default-500">{syncTime}更新</p>
          </div>
          <div className="ml-auto cursor-pointer">
            <RotateCcw className="text-default-500 w-5 h-5" onClick={updateDateHandler}></RotateCcw>
          </div>
        </CardHeader>
        <CardBody>
          <ScrollShadow className="w-full h-[400px] p-2 rounded-md bg-white bg-opacity-30">
            {renderData.map((item, index) => {
              return <CardRow key={item.id} data={item}></CardRow>;
            })}
          </ScrollShadow>
        </CardBody>
      </Card>
    </div>
  );
}
