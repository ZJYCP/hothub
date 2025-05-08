import { createOpenAI } from '@ai-sdk/openai';
import { experimental_createMCPClient, streamText } from 'ai';
import { generateSummaryPrompt } from './prompt';
import { createXai } from '@ai-sdk/xai';
import { createDeepSeek } from '@ai-sdk/deepseek';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_BASE_URL,
});

const xai = createXai({
  apiKey: process.env.XAI_API_KEY,
});

const deepseek = createDeepSeek({
  apiKey: process.env.UNIVERSAL_API_KEY,
  baseURL: process.env.UNIVERSAL_API_BASE_URL,
});
export const maxDuration = 300;

export async function POST(req: Request) {
  //   const { prompt }: { prompt: string } = await req.json();
  const { prompt, platform } = await req.json();

  try {
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

    const tavily_mcp_tool = await tavily_client.tools();
    const bing_mcp_tool = await bing_client.tools();

    const tools = {
      // ...tavily_mcp_tool,
      ...bing_mcp_tool,
    };
    const result = streamText({
      model: deepseek('gemini-2.5-flash-preview-04-17'),
      //   model: xai('grok-3-mini'),
      prompt: generateSummaryPrompt(platform, prompt),
      maxSteps: 10,
      tools,
      onFinish: async (res) => {
        await close_mcp_handler();
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
