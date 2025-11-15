import { ShowcaseDetailLayout } from '../../_components/ShowcaseDetailLayout';

export default function PlaybooksScaleShowcasePage() {
  return (
    <ShowcaseDetailLayout
      categoryLabel='Playbooks · Scale Readiness'
      title='스케일 레디니스 플레이북'
      description='팀 확장 단계에서 필요한 운영 체계와 커뮤니케이션 원칙을 담았습니다.'
      highlights={[
        '핵심 지표·알림을 정리한 운영 대시보드',
        '사일로를 막는 주간 리듬과 회의 포맷',
        '팀 온보딩·핸드오프 체크리스트',
      ]}
      currentHref='/showcase/playbooks/scale'
    />
  );
}
