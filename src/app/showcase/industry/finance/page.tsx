import { ShowcaseDetailLayout } from '../../_components/ShowcaseDetailLayout';

export default function FinanceShowcasePage() {
  return (
    <ShowcaseDetailLayout
      categoryLabel="Industry · Finance"
      title="금융 산업 쇼케이스"
      description="디지털 뱅킹, 결제, 자산 관리 기업들이 고객 경험을 어떻게 설계했는지 한눈에 볼 수 있는 공간입니다."
      highlights={[
        '모바일 뱅킹 앱의 개인화 대시보드 설계 사례',
        '오프라인 점포와 연동되는 하이브리드 온보딩 여정',
        '금융 규제 대응을 위한 보안/인증 UX 베스트 프랙티스',
      ]}
      currentHref="/showcase/industry/finance"
      highlightTitle="이 페이지에서 확인할 수 있는 것들"
    />
  );
}
