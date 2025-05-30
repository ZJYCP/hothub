import { createOpenAI } from '@ai-sdk/openai';
import { experimental_createMCPClient, streamText } from 'ai';
import { generateSummaryPrompt } from './prompt';
import prisma from '@/lib/prisma';
import { createAIClient, createMCPClients } from '@/lib/aiConfig';

export const maxDuration = 300;

export async function POST(req: Request) {
  const { prompt, platform } = await req.json();

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

    const result = streamText({
      model: client(model),
      prompt: generateSummaryPrompt(platform, prompt),
      maxSteps: 10,
      tools,
      onFinish: async (res) => {
        await close_mcp_handler();
        try {
          await prisma.hotTrend.update({
            where: {
              title_source: {
                title: prompt,
                source: platform,
              },
            },
            data: {
              analyse: res.text,
            },
          });
        } catch (error) {
          console.log(error);
        }
      },
      onError: async (error) => {
        console.log(error);
        await close_mcp_handler();
      },
    });
    return result.toDataStreamResponse();
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
