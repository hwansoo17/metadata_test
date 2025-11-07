import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const rawBody = await request.json();

  console.log('Ghost webhook payload:', rawBody.post.url);

  return NextResponse.json({ ok: true });
}
