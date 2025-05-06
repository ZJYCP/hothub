'use client';
import React, { useMemo } from 'react';
import PlatformSelector from './selector';
import { HotTrendsResponse, PlatformEnum } from '@/types';
import TrendCard from '@/components/TrendCard';
import { fetch_hot_data } from '../api/hot/route';

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
      <PlatformSelector
        value={currentPlatform}
        onChange={(val) => setCurrentPlatform(val)}
      ></PlatformSelector>

      <TrendCard
        cachedAt={hotData.cachedAt}
        platform={currentPlatform}
        data={hotData.hotList}
      ></TrendCard>
    </div>
  );
}
