import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@/utils/supabase/server';
import { get_apps_list } from './actions';

export async function POST(req: Request) {
  const supabase = await createClient();
  const user = (await supabase.auth.getUser())?.data?.user;
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name, remark } = await req.json();

  try {
    const appId = uuidv4();
    const appSecret = uuidv4().replace(/-/g, '');

    const app = await prisma.openApiApp.create({
      data: {
        name,
        remark,
        userId: user.id,
        appId,
        appSecret,
      },
    });

    return NextResponse.json({
      appId: app.appId,
      name: app.name,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const supabase = await createClient();
  const user = (await supabase.auth.getUser())?.data?.user;
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const apps = await get_apps_list(user.id);

    return NextResponse.json(apps);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
