// app/seo/metadata-factory.ts (서버 전용)
import type { Metadata } from 'next';

export async function buildMetadata(ctx: {
  pathname: string;
}): Promise<Metadata> {
  return {
    title: `My Site | ${ctx.pathname}`,
    description: `About ${ctx.pathname}`,
    // 공통 OG/JSON-LD도 여기서 생성
  };
}
