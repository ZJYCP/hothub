import { verifyJwt } from '@/lib/jwt';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const res = verifyJwt(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjIzZGI3ZmQyLTA1NWMtNDRkMC1hNWJkLWZiNmNhNzkxMjIzYyIsImlhdCI6MTc0Njk2NzE0NH0.E_giolrUE83ejdqKnkb6Q2_OVfKmAp73owwLNKpZJXQ',
  );
  return NextResponse.json({ message: res });
}
