import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '메타데이터 테스트 | About',
  description: '메타데이터 테스트 사이트의 소개 페이지입니다.',
  alternates: {
    canonical: 'https://b-cube.store/about',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function AboutPage() {
  return (
    <main>
      <h1>About Us</h1>
      <p>Learn more about us on this page.</p>
    </main>
  );
}
