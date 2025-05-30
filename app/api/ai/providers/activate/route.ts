import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// 激活指定的AI提供商
export async function POST(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: '缺少必要参数' }, { status: 400 });
    }

    // 检查提供商是否存在
    const provider = await prisma.aIProvider.findUnique({
      where: { id },
    });

    if (!provider) {
      return NextResponse.json({ error: '未找到AI提供商' }, { status: 404 });
    }

    // 先将所有提供商设为非活跃
    await prisma.aIProvider.updateMany({
      where: { isActive: true },
      data: { isActive: false },
    });

    // 将指定的提供商设为活跃
    const activatedProvider = await prisma.aIProvider.update({
      where: { id },
      data: { isActive: true },
    });

    return NextResponse.json(activatedProvider);
  } catch (error) {
    console.error('激活AI提供商失败:', error);
    return NextResponse.json({ error: '激活AI提供商失败' }, { status: 500 });
  }
}
