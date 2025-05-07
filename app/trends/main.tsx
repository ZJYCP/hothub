'use client';
import React from 'react';

import { fetch_hot_data } from '../api/hot/hot.service';

import PlatformSelector from './selector';

import { HotTrendsResponse, PlatformEnum } from '@/types';
import TrendCard from '@/components/TrendCard';

export default function TrendsCom() {
  const [currentPlatform, setCurrentPlatform] = React.useState<PlatformEnum>(PlatformEnum.Weibo);

  const [hotData, setHotData] = React.useState<HotTrendsResponse>({
    hotList: [],
    cachedAt: '',
  });

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetch_hot_data(currentPlatform);

      setHotData(data);
    };

    fetchData();
  }, [currentPlatform]);

  return (
    <div className="flex w-full gap-5">
      <PlatformSelector value={currentPlatform} onChange={(val) => setCurrentPlatform(val)} />

      <TrendCard cachedAt={hotData.cachedAt} data={hotData.hotList} platform={currentPlatform} />
    </div>
  );
}
