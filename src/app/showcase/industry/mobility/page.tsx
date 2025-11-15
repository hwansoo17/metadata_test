import { ShowcaseDetailLayout } from '../../_components/ShowcaseDetailLayout';

export default function MobilityShowcasePage() {
  return (
    <ShowcaseDetailLayout
      categoryLabel="Industry · Mobility"
      title="모빌리티 산업 쇼케이스"
      description="이동 서비스, 모빌리티 플랫폼, 스마트 물류까지 연결된 경험을 만드는 방법을 소개합니다."
      highlights={[
        '실시간 차량 상태 데이터와 고객 알림 UX',
        '주문·배차·배송을 잇는 오퍼레이션 콘솔',
        '도시 파트너와 협력하기 위한 API·포털 전략',
      ]}
      currentHref="/showcase/industry/mobility"
      highlightTitle="주요 시나리오"
    />
  );
}
