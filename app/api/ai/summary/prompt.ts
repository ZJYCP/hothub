import { transformPlatformToLabel } from '@/lib/utils';
import { PlatformEnum } from '@/types';

export function generateSummaryPrompt(platform: string, hotTrend: string) {
  const plat = transformPlatformToLabel(platform as PlatformEnum);
  const prompt = `现在是${new Date()}, 目前有一个热搜词是${hotTrend}, 来自${plat}, 请用在网络上搜索相关内容，并用中文总结这个热搜词相关内容,尽量包含信息的来源。
  总结要书面化，分点描述，必要的时候可以用时间轴分析，你的回答应该是一份报道的形式。你直接回复总结的内容即可，在搜索的过程中不用给我回复`;

  return prompt;
}
