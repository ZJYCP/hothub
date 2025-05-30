import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { SYSTEM_SETTINGS } from '@/lib/aiConfig';

// 获取所有系统设置
export async function GET() {
  try {
    const settings = await prisma.systemSetting.findMany();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('获取系统设置失败:', error);
    return NextResponse.json({ error: '获取系统设置失败' }, { status: 500 });
  }
}

// 更新系统设置
export async function POST(req: Request) {
  try {
    const { key, value, description } = await req.json();

    if (!key || !value) {
      return NextResponse.json({ error: '缺少必要参数' }, { status: 400 });
    }

    // 检查是否是有效的设置键
    const validKeys = Object.values(SYSTEM_SETTINGS);
    if (!validKeys.includes(key)) {
      return NextResponse.json({ error: '无效的设置键' }, { status: 400 });
    }

    // 使用 upsert 来创建或更新设置
    const setting = await prisma.systemSetting.upsert({
      where: { key },
      update: { value, description },
      create: { key, value, description: description || '' },
    });

    return NextResponse.json(setting);
  } catch (error) {
    console.error('更新系统设置失败:', error);
    return NextResponse.json({ error: '更新系统设置失败' }, { status: 500 });
  }
}

// 获取特定设置
// export async function GET_BY_KEY(key: string) {
//   try {
//     const setting = await prisma.systemSetting.findUnique({
//       where: { key },
//     });

//     if (!setting) {
//       return null;
//     }

//     return setting.value;
//   } catch (error) {
//     console.error(`获取设置 ${key} 失败:`, error);
//     return null;
//   }
// }
