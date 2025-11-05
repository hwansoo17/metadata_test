// app/seo/metadata-factory.ts (서버 전용)
import type { Metadata } from 'next';

export async function buildMetadata(ctx: {
  pathname: string;
}): Promise<Metadata> {
  return {
    title: `My Site | ${ctx.pathname}`,
    description: `About ${ctx.pathname}`,
    openGraph: {
      title: `My Site | ${ctx.pathname}`,
      description: `About ${ctx.pathname}`,
      url: `https://metadata-test-roan.vercel.app/${ctx.pathname}`,
      siteName: 'My Site',
      images: [
        {
          url: 'https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1200',
          width: 1200,
          height: 600,
        },
      ],
    },
    // 공통 OG/JSON-LD도 여기서 생성
  };
}
