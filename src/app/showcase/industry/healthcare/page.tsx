import { ShowcaseDetailLayout } from '../../_components/ShowcaseDetailLayout';

export default function HealthcareShowcasePage() {
  return (
    <ShowcaseDetailLayout
      categoryLabel="Industry · Healthcare"
      title="헬스케어 산업 쇼케이스"
      description="병원, 디지털 헬스, 웰니스 서비스가 환자 경험을 개선하고 운영을 자동화한 사례를 모았습니다."
      highlights={[
        '원격 진료와 대기열 관리까지 포함된 통합 예약 여정',
        '의료진 협업을 위한 보안 메신저/포털 UX',
        '환자 교육 콘텐츠와 커뮤니티 빌딩 사례',
      ]}
      currentHref="/showcase/industry/healthcare"
    />
  );
}
