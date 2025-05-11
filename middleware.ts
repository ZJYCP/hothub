import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';
import { verifyJwt } from '@/lib/jwt';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/openapi/v1')) {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      return NextResponse.json({ error: 'Missing token' }, { status: 401 });
    }

    const payload = verifyJwt(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }
    return NextResponse.next();

    // 可选：把 payload 注入 req，比如 via cookie、header 等
    // req.headers.set('x-app-id', payload.appId) // Next 中不支持修改请求头
  }
  // return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    '/api/openapi/v1/:path*',
  ],
};
