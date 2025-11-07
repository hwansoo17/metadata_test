import { NextResponse } from 'next/server';
const KEY = '8989f99c2c124870ab46e7d8ca054bcf'; // 당신의 IndexNow 키

export async function POST(request: Request) {
  try {
    const { post } = await request.json();
    const url = post?.current?.url?.toString();

    if (!url) {
      console.error('URL이 없음:', post);
      return NextResponse.json({ ok: false, error: 'No URL' }, { status: 400 });
    }

    const host = new URL(url).host; // URL의 실제 호스트로 맞춤
    const keyLocation = `https://${host}/${KEY}.txt`;

    console.log('📫 새 게시글 URL:', url);

    // IndexNow에 단일 URL 제출
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        host: host,
        key: KEY,
        keyLocation: keyLocation,
        urlList: [url],
      }),
    });

    if (res.status === 200) {
      console.log('✅ IndexNow 제출 성공:', res.status);
    } else if (res.status === 202) {
      console.log('⏳ IndexNow 제출 대기 중:', res.status);
    } else {
      const errText = await res.text();
      console.error('⚠️ IndexNow 실패:', res.status, errText);
    }

    return NextResponse.json({ ok: true, url });
  } catch (err) {
    console.error('🔥 Webhook 처리 중 오류:', err);
    return NextResponse.json(
      { ok: false, error: 'Internal Error' },
      { status: 500 },
    );
  }
}
