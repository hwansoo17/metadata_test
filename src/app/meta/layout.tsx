import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '메타데이터 테스트 | meta',
  description: '메타페이지 원본 메타데이터',
  alternates: {
    canonical: 'https://b-cube.store/meta',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MetaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
