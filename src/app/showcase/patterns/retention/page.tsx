import { ShowcaseDetailLayout } from '../../_components/ShowcaseDetailLayout';

export default function PatternsRetentionShowcasePage() {
  return (
    <ShowcaseDetailLayout
      categoryLabel='Patterns · Retention Loop'
      title='리텐션 루프 쇼케이스'
      description='재방문과 반복 사용을 끌어낸 커뮤니케이션 루프와 리워드 패턴을 모았습니다.'
      highlights={[
        '사용 패턴 기반 맞춤 리마인더 및 푸시 메시지',
        '포인트·배지 등 누적 보상 UX 흐름',
        'NPS·피드백 루프로 제품 개선 신호 수집',
      ]}
      currentHref='/showcase/patterns/retention'
    />
  );
}
