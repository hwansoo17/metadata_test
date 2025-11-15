import { ShowcaseDetailLayout } from '../../_components/ShowcaseDetailLayout';

export default function PatternsAutomationShowcasePage() {
  return (
    <ShowcaseDetailLayout
      categoryLabel='Patterns · Automation Journey'
      title='자동화 여정 패턴'
      description='업무 자동화 이벤트와 사용자 알림을 적절히 조합한 시나리오를 살펴봅니다.'
      highlights={[
        '상태 변화 이벤트를 구독하는 알림 센터',
        '승인/거절 등 의사결정 포인트를 인앱으로 처리',
        '자동화 실패 시 복구 경로를 제시하는 UX',
      ]}
      currentHref='/showcase/patterns/automation'
    />
  );
}
