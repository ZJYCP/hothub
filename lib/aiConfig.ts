import prisma from './prisma';
import { createOpenAI } from '@ai-sdk/openai';
import { experimental_createMCPClient } from 'ai';

// 默认配置，当数据库中没有配置时使用
const DEFAULT_AI_CONFIG = {
  provider: 'openai',
  model: 'gpt-4.1-mini',
  apiKey: process.env.UNIVERSAL_API_KEY || '',
  baseURL: process.env.UNIVERSAL_API_BASE_URL || '',
};

// 系统设置键名
export const SYSTEM_SETTINGS = {
  AI_PROVIDER: 'ai_provider',
  SUMMARY_MODEL: 'summary_model',
};

/**
 * 获取当前活跃的AI提供商配置
 */
export async function getActiveAIProvider() {
  try {
    // 尝试从数据库获取活跃的提供商
    const activeProvider = await prisma.aIProvider.findFirst({
      where: { isActive: true },
    });

    // 如果没有活跃的提供商，使用默认配置
    if (!activeProvider) {
      return {
        provider: DEFAULT_AI_CONFIG.provider,
        apiKey: DEFAULT_AI_CONFIG.apiKey,
        baseURL: DEFAULT_AI_CONFIG.baseURL,
      };
    }

    return {
      provider: activeProvider.name,
      apiKey: activeProvider.apiKey,
      baseURL: activeProvider.baseUrl,
    };
  } catch (error) {
    console.error('获取AI提供商配置失败:', error);
    // 出错时返回默认配置
    return {
      provider: DEFAULT_AI_CONFIG.provider,
      apiKey: DEFAULT_AI_CONFIG.apiKey,
      baseURL: DEFAULT_AI_CONFIG.baseURL,
    };
  }
}

/**
 * 获取当前使用的AI模型
 */
export async function getActiveAIModel() {
  try {
    // 从系统设置中获取当前使用的模型
    const modelSetting = await prisma.systemSetting.findUnique({
      where: { key: SYSTEM_SETTINGS.SUMMARY_MODEL },
    });

    return modelSetting?.value || DEFAULT_AI_CONFIG.model;
  } catch (error) {
    console.error('获取AI模型配置失败:', error);
    return DEFAULT_AI_CONFIG.model;
  }
}

/**
 * 创建OpenAI客户端
 */
export async function createAIClient() {
  const { apiKey, baseURL } = await getActiveAIProvider();
  const model = await getActiveAIModel();

  return {
    client: createOpenAI({
      apiKey,
      baseURL,
    }),
    model,
  };
}

/**
 * 创建MCP客户端
 */
export async function createMCPClients() {
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

    return {
      tavily_client,
      bing_client,
      close: async () => {
        await bing_client.close();
      },
    };
  } catch (error) {
    console.error('创建MCP客户端失败:', error);
    throw error;
  }
}
