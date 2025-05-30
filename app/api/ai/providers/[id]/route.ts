import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// 获取单个AI提供商
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    const provider = await prisma.aIProvider.findUnique({
      where: { id },
    });

    if (!provider) {
      return NextResponse.json({ error: '未找到AI提供商' }, { status: 404 });
    }

    return NextResponse.json(provider);
  } catch (error) {
    console.error('获取AI提供商失败:', error);
    return NextResponse.json({ error: '获取AI提供商失败' }, { status: 500 });
  }
}

// 更新AI提供商
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    const { name, apiKey, baseUrl } = await request.json();

    if (!name || !apiKey || !baseUrl) {
      return NextResponse.json({ error: '缺少必要参数' }, { status: 400 });
    }

    // 检查名称是否已存在（排除当前记录）
    const existingProvider = await prisma.aIProvider.findFirst({
      where: {
        name,
        id: { not: id },
      },
    });

    if (existingProvider) {
      return NextResponse.json({ error: '该名称已存在' }, { status: 400 });
    }

    const provider = await prisma.aIProvider.update({
      where: { id },
      data: {
        name,
        apiKey,
        baseUrl,
      },
    });

    return NextResponse.json(provider);
  } catch (error) {
    console.error('更新AI提供商失败:', error);
    return NextResponse.json({ error: '更新AI提供商失败' }, { status: 500 });
  }
}

// 删除AI提供商
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;

    // 检查是否为活跃的提供商
    const provider = await prisma.aIProvider.findUnique({
      where: { id },
    });

    if (!provider) {
      return NextResponse.json({ error: '未找到AI提供商' }, { status: 404 });
    }

    if (provider.isActive) {
      return NextResponse.json({ error: '无法删除活跃的AI提供商' }, { status: 400 });
    }

    await prisma.aIProvider.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('删除AI提供商失败:', error);
    return NextResponse.json({ error: '删除AI提供商失败' }, { status: 500 });
  }
}
