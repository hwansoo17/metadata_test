import { ShowcaseDetailLayout } from '../../_components/ShowcaseDetailLayout';

export default function PublicSectorShowcasePage() {
  return (
    <ShowcaseDetailLayout
      categoryLabel="Industry · Public Sector"
      title="퍼블릭 섹터 쇼케이스"
      description="정부, 지자체, 교육 기관의 디지털 전환과 시민 서비스 혁신 사례를 모았습니다."
      highlights={[
        '민원·허가 업무를 온라인화한 서비스 여정',
        '공공 데이터 개방과 파트너 포털 구축 사례',
        '시민 참여 커뮤니티 및 접근성 체크리스트',
      ]}
      currentHref="/showcase/industry/public-sector"
      highlightTitle="주요 콘텐츠"
    />
  );
}
