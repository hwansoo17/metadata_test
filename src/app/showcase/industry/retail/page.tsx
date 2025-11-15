import { ShowcaseDetailLayout } from '../../_components/ShowcaseDetailLayout';

export default function RetailShowcasePage() {
  return (
    <ShowcaseDetailLayout
      categoryLabel="Industry · Retail"
      title="리테일 산업 쇼케이스"
      description="커머스 브랜드가 온·오프라인을 연결하고 고객 맞춤형 경험을 설계한 사례를 모았습니다."
      highlights={[
        'POS·멤버십 데이터 기반 개인화 마케팅 흐름',
        '스토어 픽업, 퀵커머스 등 옴니채널 이행 사례',
        'CRM 자동화와 고객 케어에 활용한 워크플로',
      ]}
      currentHref="/showcase/industry/retail"
      highlightTitle="하이라이트"
    />
  );
}
