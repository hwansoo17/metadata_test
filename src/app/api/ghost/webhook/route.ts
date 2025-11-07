import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { post } = await request.json();

  const url = post.current.url.toString();

  console.log('Ghost webhook payload:', url);

  const response = await fetch(
    `https://api.indexnow.org/indexnow?url=${encodeURIComponent(
      url,
    )}&key=8989f99c2c124870ab46e7d8ca054bcf`,
  );
  console.log('IndexNow response status:', response.status);

  return NextResponse.json({ ok: true });
}
