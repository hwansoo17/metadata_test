import { ShowcaseDetailLayout } from '../../_components/ShowcaseDetailLayout';

export default function PlaybooksConversionShowcasePage() {
  return (
    <ShowcaseDetailLayout
      categoryLabel='Playbooks · Conversion Engine'
      title='컨버전 엔진 플레이북'
      description='전환율 개선을 위한 퍼널 진단, 실험 설계, 분석 루틴을 안내합니다.'
      highlights={[
        '핵심 퍼널 단계별 드롭률 진단 템플릿',
        'AB 테스트 우선순위 매트릭스',
        '실험 회고 및 인사이트 저장 방식',
      ]}
      currentHref='/showcase/playbooks/conversion'
    />
  );
}
