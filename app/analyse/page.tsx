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
import { weiboServiceInstance } from '../api/hot/weibo/weibo.service';
import { TrendItem } from '@/types';

interface AnalysePageProps {
  searchParams: any;
}

export default async function AnalysePage(props: AnalysePageProps) {
  const { searchParams } = props;
  const { name, platform } = await searchParams;

  let cardData: HotTrendCardProps;

  if (platform === 'weibo') {
    // 获取微博实时数据
    const weiboData = await weiboServiceInstance.fetchHotList();
    const trendItem = weiboData.hotList.find((item: TrendItem) => item.title === name);

    if (trendItem) {
      cardData = {
        avatarUrl: '',
        title: trendItem.title,
        tag: '热',
        url: trendItem.url,
        isOnList: true,
        source: platformsInfo.find((item) => item.id === platform)?.name || '未知平台',
        timestamp: new Date().toLocaleString(),
        metrics: {
          heat: trendItem.heat,
          speed: 0,
          duration: 'N/A',
          rank: trendItem.rank + 1,
          host: '',
        },
      };
    } else {
      // 如果在实时数据中找不到，尝试从数据库获取
      const result = await prisma.hotTrend.findFirst({
        where: {
          title: name,
          source: platform
        },
      });

      cardData = {
        avatarUrl: '',
        title: name,
        tag: '热',
        url: result?.url || '',
        isOnList: false,
        source: platformsInfo.find((item) => item.id === platform)?.name || '未知平台',
        timestamp: result?.createdAt?.toLocaleString() || new Date().toLocaleString(),
        metrics: {
          heat: result?.heat || 0,
          speed: 0,
          duration: 'N/A',
          rank: result?.rank || 0,
          host: '',
        },
      };
    }
  } else {
    // 非微博平台使用数据库数据
    const result = await prisma.hotTrend.findFirst({
      where: {
        title: name,
        source: platform
      },
    });

    cardData = {
      avatarUrl: '',
      title: name,
      tag: '热',
      url: result?.url || '',
      isOnList: true,
      source: platformsInfo.find((item) => item.id === platform)?.name || '未知平台',
      timestamp: result?.createdAt?.toLocaleString() || new Date().toLocaleString(),
      metrics: {
        heat: result?.heat || 0,
        speed: 0,
        duration: 'N/A',
        rank: result?.rank || 0,
        host: '',
      },
    };
  }

  const zhisouData = platform === 'weibo' ? await ZhisouService(name) : ({} as any);

  const dbResult = await prisma.hotTrend.findFirst({
    where: {
      title: name,
      source: platform
    },
    select: {
      analyse: true
    }
  });

  return (
    <div>
      <HotSearchCard {...cardData} />
      <div className="flex">
        <AiSummaryCom content={dbResult?.analyse || ''}></AiSummaryCom>
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
