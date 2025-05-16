import React from 'react';

import HotSearchCard from '@/components/TrendAnalyse/BasicInfo';
import { platformsInfo } from '@/config/platforms';
import { HotTrendCardProps } from '@/types/analyse';
import AiSummaryCom from '@/components/TrendAnalyse/AiSummary';
import prisma from '@/lib/prisma';
import TypicalViewCom from '@/components/TrendAnalyse/TypicalView';
import { ZhisouService } from '../api/hot/weibo/zhisou.service';
import WordCloudCom from '@/components/TrendAnalyse/WordCloud';
import EmotionAnalyse from '@/components/TrendAnalyse/EmotionAnalyse';
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
    url: '',
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
  const result = await prisma.hotTrend.findFirst({
    where: {
      title: mockData.title,
    },
  });
  mockData.url = result?.url;

  const zhisouData = platform === 'weibo' ? await ZhisouService(name) : ({} as any);
  return (
    <div>
      <HotSearchCard {...mockData} />
      <div className="flex ">
        <AiSummaryCom content={result?.analyse}></AiSummaryCom>
        {platform === 'weibo' && (
          <div className="flex flex-col ml-3 my-3 p-4 border flex-shrink">
            <EmotionAnalyse data={zhisouData.emotion_analysis}></EmotionAnalyse>
            <WordCloudCom data={zhisouData.word_cloud}></WordCloudCom>
            {/* <TypicalViewCom data={zhisouData.typical_viewpoint}></TypicalViewCom> */}
          </div>
        )}
      </div>
    </div>
  );
}
