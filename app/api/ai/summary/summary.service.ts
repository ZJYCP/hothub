import { createOpenAI } from '@ai-sdk/openai';
import { experimental_createMCPClient, generateText, streamText } from 'ai';
import { generateSummaryPrompt } from './prompt';
import { createXai } from '@ai-sdk/xai';
import { createDeepSeek } from '@ai-sdk/deepseek';
import prisma from '@/lib/prisma';
import { PlatformEnum } from '@/types';
import { createAIClient, createMCPClients } from '@/lib/aiConfig';
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
  try {
    // 使用配置创建AI客户端
    const { client, model } = await createAIClient();

    // 创建MCP客户端
    const { tavily_client, bing_client, close: close_mcp_handler } = await createMCPClients();

    const tavily_mcp_tool = await tavily_client.tools();
    const bing_mcp_tool = await bing_client.tools();

    const tools = {
      // ...tavily_mcp_tool,
      ...bing_mcp_tool,
    };

    const { text } = await generateText({
      model: client(model),
      prompt: generateSummaryPrompt(platform, prompt),
      maxSteps: 10,
      tools,
    });
    await close_mcp_handler();
    return text;
  } catch (error) {
    console.log(error);
  }
}
