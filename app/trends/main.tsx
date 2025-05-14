'use client';
import React from 'react';

import { fetch_hot_data } from '../api/hot/hot.service';

import PlatformSelector from './selector';

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
  const [currentPlatform, setCurrentPlatform] = React.useState<PlatformEnum>(PlatformEnum.Weibo);

  // const [hotData, setHotData] = React.useState<HotTrendsResponse>({
  //   hotList: [],
  //   cachedAt: '',
  // });

  // const { loading } = useRequest(
  //   async () => {
  //     const data = await fetch_hot_data();
  //     return data;
  //   },
  //   {
  //     onSuccess: (data) => {
  //       setHotData(data);
  //     },
  //   },
  // );

  // React.useEffect(() => {
  //   const fetchData = async () => {};

  //   fetchData();
  // }, [currentPlatform]);

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
            return (
              <CardCom
                key={item.id}
                platform={item.id}
                lastSyncTime={new Date(hotData.cachedAt)}
                data={hotData.hotList
                  .filter((hot) => hot.source === item.id)
                  .sort((a, b) => a.rank - b.rank)}
              ></CardCom>
            );
          })}
      </div>
    </div>
  );
}
