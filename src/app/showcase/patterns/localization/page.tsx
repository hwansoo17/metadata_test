import { ShowcaseDetailLayout } from '../../_components/ShowcaseDetailLayout';

export default function PatternsLocalizationShowcasePage() {
  return (
    <ShowcaseDetailLayout
      categoryLabel='Patterns · Localization System'
      title='로컬라이제이션 시스템 패턴'
      description='다국어·지역별 콘텐츠를 운영하며 품질을 지킨 UI 패턴을 정리했습니다.'
      highlights={[
        '언어 스위처와 기본 언어 자동 감지',
        '지역별 법규/가격 정보를 조건부로 노출',
        '현지 운영팀과 협업하는 승인 워크플로',
      ]}
      currentHref='/showcase/patterns/localization'
    />
  );
}
