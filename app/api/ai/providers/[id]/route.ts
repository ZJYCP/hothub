import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// 获取单个AI提供商
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const provider = await prisma.aIProvider.findUnique({
      where: { id: params.id },
    });

    if (!provider) {
      return NextResponse.json({ error: '未找到该AI提供商' }, { status: 404 });
    }

    return NextResponse.json(provider);
  } catch (error) {
    console.error('获取AI提供商详情失败:', error);
    return NextResponse.json({ error: '获取AI提供商详情失败' }, { status: 500 });
  }
}

// 更新AI提供商
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { name, apiKey, baseUrl, isActive } = await req.json();

    // 检查是否存在
    const provider = await prisma.aIProvider.findUnique({
      where: { id: params.id },
    });

    if (!provider) {
      return NextResponse.json({ error: '未找到该AI提供商' }, { status: 404 });
    }

    // 如果设置为激活状态，先将其他提供商设为非激活
    if (isActive) {
      await prisma.aIProvider.updateMany({
        where: { isActive: true },
        data: { isActive: false },
      });
    }

    // 更新提供商
    const updatedProvider = await prisma.aIProvider.update({
      where: { id: params.id },
      data: {
        name,
        apiKey,
        baseUrl,
        isActive: isActive ?? provider.isActive,
      },
    });

    return NextResponse.json(updatedProvider);
  } catch (error) {
    console.error('更新AI提供商失败:', error);
    return NextResponse.json({ error: '更新AI提供商失败' }, { status: 500 });
  }
}

// 删除AI提供商
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    // 检查是否存在
    const provider = await prisma.aIProvider.findUnique({
      where: { id: params.id },
    });

    if (!provider) {
      return NextResponse.json({ error: '未找到该AI提供商' }, { status: 404 });
    }

    // 不允许删除当前激活的提供商
    if (provider.isActive) {
      return NextResponse.json({ error: '无法删除当前激活的AI提供商' }, { status: 400 });
    }

    // 删除提供商
    await prisma.aIProvider.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('删除AI提供商失败:', error);
    return NextResponse.json({ error: '删除AI提供商失败' }, { status: 500 });
  }
}
