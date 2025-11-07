import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { post } = await request.json();

  const url = post.current.url.toString();

  console.log('Ghost webhook payload:', url);

  return NextResponse.json({ ok: true });
}
