import React from 'react';

import HotSearchCard from '@/components/TrendAnalyse/BasicInfo';
import { platformsInfo } from '@/config/platforms';
import { HotTrendCardProps } from '@/types/analyse';
import AiSummaryCom from '@/components/TrendAnalyse/AiSummary';

interface AnalysePageProps {
  searchParams: any;
}

export default async function AnalysePage(props: AnalysePageProps) {
  const { searchParams } = props;
  const { name, platform } = await searchParams;

  const mockData: HotTrendCardProps = {
    avatarUrl: '',
    title: name || '',
    tag: '热',
    isOnList: true,
    source: platformsInfo.find((item) => item.id === platform)?.name || '未知平台',
    timestamp: '2025-05-07 09:16',
    metrics: {
      heat: 3471243,
      speed: 57.9,
      duration: '4.7 h',
      rank: 1,
      host: '新华社 | 501家媒体...',
    },
  };

  return (
    <div>
      <HotSearchCard {...mockData} />
      <AiSummaryCom></AiSummaryCom>
    </div>
  );
}
