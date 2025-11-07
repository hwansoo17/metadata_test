import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const rawBody = await request.text();

  console.log('Ghost webhook payload:', rawBody);

  return NextResponse.json({ ok: true });
}
