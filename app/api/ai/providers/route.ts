import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// 获取所有AI提供商
export async function GET() {
  try {
    const providers = await prisma.aIProvider.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(providers);
  } catch (error) {
    console.error('获取AI提供商失败:', error);
    return NextResponse.json({ error: '获取AI提供商失败' }, { status: 500 });
  }
}

// 创建新的AI提供商
export async function POST(req: Request) {
  try {
    const { name, apiKey, baseUrl } = await req.json();

    if (!name || !apiKey || !baseUrl) {
      return NextResponse.json({ error: '缺少必要参数' }, { status: 400 });
    }

    // 检查名称是否已存在
    const existingProvider = await prisma.aIProvider.findUnique({
      where: { name },
    });

    if (existingProvider) {
      return NextResponse.json({ error: '该名称已存在' }, { status: 400 });
    }

    const provider = await prisma.aIProvider.create({
      data: {
        name,
        apiKey,
        baseUrl,
        isActive: false, // 默认不激活
      },
    });

    return NextResponse.json(provider);
  } catch (error) {
    console.error('创建AI提供商失败:', error);
    return NextResponse.json({ error: '创建AI提供商失败' }, { status: 500 });
  }
}
