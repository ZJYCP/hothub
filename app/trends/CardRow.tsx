'use client';
import useRouter from '@/lib/useRouter';
import { PlatformEnum, TrendItem } from '@/types';
import React, { useMemo } from 'react';

interface CardRowProps {
  data: TrendItem;
  platform?: PlatformEnum;
}
export default function CardRow(props: CardRowProps) {
  const { data, platform } = props;
  const router = useRouter();
  const heatFormatted = useMemo(() => {
    if (typeof data.heat === 'number') {
      if (data.heat > 10000) {
        return (data.heat / 10000).toFixed(1) + '万';
      }
    }
    return data.heat;
  }, [data.heat]);
  return (
    <div
      className="flex cursor-pointer hover:bg-gray-50/30 items-stretch my-2 rounded-sm text-default-700"
      onClick={() => {
        if (platform === PlatformEnum.Weibo) {
          router.push(
            `/analyse?name=${encodeURIComponent(data.title)}&platform=${encodeURIComponent(data.source)}`,
          );
        } else {
          window.open(data.url, '_blank');
        }
      }}
    >
      <div className="w-7 bg-slate-300/30 flex-shrink-0 mr-2 text-default-600 rounded-sm flex items-center justify-center">
        {data.rank + 1}
      </div>
      <div className="flex-grow min-w-0 break-words mr-[4px]">{data.title}</div>
      {!(typeof heatFormatted === 'number' && heatFormatted < 0) && (
        <div className="text-sm flex-shrink-0 ml-auto">热度:{heatFormatted}</div>
      )}
    </div>
  );
}
