import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'node-generator 테스트',
  description:
    'node-generator가 새로운 페이지를 읽고 생성할 수 있는지 테스트하기 위한 페이지입니다.',
  alternates: {
    canonical: 'https://b-cube.store/node-test',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function NodeTestPage() {
  return (
    <main>
      <h1>Node Generator 테스트</h1>
      <p>
        이 페이지는 node-generator가 새로운 페이지를 읽고 생성할 수 있는지
        테스트하기 위한 페이지입니다.
      </p>
    </main>
  );
}
