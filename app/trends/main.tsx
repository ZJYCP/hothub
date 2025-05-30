'use client';
import React from 'react';

import { HotTrendsResponse, PlatformEnum } from '@/types';
import TrendCard from '@/components/TrendCard';
import { useRequest } from '@/lib/useRequest';
import CardCom from './Card';
import { platformsInfo } from '@/config/platforms';

interface TrendsComProps {
  hotData: HotTrendsResponse;
}
export default function TrendsCom(props: TrendsComProps) {
  const { hotData } = props;

  return (
    <div className="flex w-full gap-5">
      {/* <PlatformSelector value={currentPlatform} onChange={(val) => setCurrentPlatform(val)} /> */}
      <div
        className="w-full grid gap-12 sm:grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))]
  lg:grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))]"
      >
        {platformsInfo
          .filter((item) => item.enabled)
          .map((item) => {
            if (Array.isArray(hotData)) {
              const data = hotData.find((hot) => hot.id === item.id)!;
              return (
                <CardCom
                  key={item.id}
                  platform={item.id}
                  lastSyncTime={new Date(data.cachedAt)}
                  data={data?.hotList}
                ></CardCom>
              );
            } else {
              return null;
            }
          })}
      </div>
    </div>
  );
}
