import { ShowcaseDetailLayout } from '../../_components/ShowcaseDetailLayout';

export default function PatternsOnboardingShowcasePage() {
  return (
    <ShowcaseDetailLayout
      categoryLabel='Patterns · Onboarding Flow'
      title='온보딩 플로우 쇼케이스'
      description='가입 직후 이탈을 막고 핵심 가치를 빠르게 전달한 온보딩 구성 사례입니다.'
      highlights={[
        '소셜 로그인, 이메일 확인 등 인증 단계를 부드럽게 연결',
        '체크리스트 기반 첫 기능 체험 흐름',
        '온보딩 중 사용자 세그먼트 태깅과 맞춤 메시지',
      ]}
      currentHref='/showcase/patterns/onboarding'
    />
  );
}
