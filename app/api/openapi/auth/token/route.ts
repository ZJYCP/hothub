// app/api/openapi/auth/token/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // 你的 Prisma 实例
import { signJwt } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  try {
    const { appId, appSecret } = await req.json();

    if (!appId || !appSecret) {
      return NextResponse.json({ error: 'Missing appId or appSecret' }, { status: 400 });
    }

    const app = await prisma.openApiApp.findUnique({ where: { appId } });

    if (!app) {
      return NextResponse.json({ error: 'Invalid appId or appSecret' }, { status: 401 });
    }

    const validSecret = appSecret === app.appSecret;
    if (!validSecret) {
      return NextResponse.json({ error: 'Invalid appId or appSecret' }, { status: 401 });
    }

    const token = await signJwt(
      {
        appId: app.appId,
      },
      '1h',
    );
    return NextResponse.json({ accessToken: token });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
