import { createOpenAI } from '@ai-sdk/openai';
import { experimental_createMCPClient, generateText, streamText } from 'ai';
import { generateSummaryPrompt } from './prompt';
import { createXai } from '@ai-sdk/xai';
import { createDeepSeek } from '@ai-sdk/deepseek';
import prisma from '@/lib/prisma';
import { PlatformEnum } from '@/types';
const openai = createOpenAI({
  apiKey: process.env.UNIVERSAL_API_KEY,
  baseURL: process.env.UNIVERSAL_API_BASE_URL,
});

const xai = createXai({
  apiKey: process.env.UNIVERSAL_API_KEY,
  baseURL: process.env.UNIVERSAL_API_BASE_URL,
});

const deepseek = createDeepSeek({
  apiKey: process.env.UNIVERSAL_API_KEY,
  baseURL: process.env.UNIVERSAL_API_BASE_URL,
});

interface SummaryHotbyWordProps {
  platform: PlatformEnum;
  prompt: string;
}
export async function summaryHotbyWord({ platform, prompt }: SummaryHotbyWordProps) {
  const tavily_client = await experimental_createMCPClient({
    transport: {
      type: 'sse',
      url: 'https://mcp.api-inference.modelscope.cn/sse/708d1609105141',
    },
  });
  const bing_client = await experimental_createMCPClient({
    transport: {
      type: 'sse',
      url: 'https://mcp.api-inference.modelscope.cn/sse/7457125319da45',
    },
  });

  const close_mcp_handler = async () => {
    // await tavily_client.close();
    await bing_client.close();
  };
  try {
    const tavily_mcp_tool = await tavily_client.tools();
    const bing_mcp_tool = await bing_client.tools();

    const tools = {
      // ...tavily_mcp_tool,
      ...bing_mcp_tool,
    };

    const { text } = await generateText({
      model: openai('gpt-4.1-mini'),
      prompt: generateSummaryPrompt(platform, prompt),
      maxSteps: 10,
      tools,
    });

    return text;
  } catch (error) {
    throw error;
  } finally {
    await close_mcp_handler();
  }
}
