export type ShowcaseLeafRoute = {
  label: string;
  href: string;
  summary: string;
};

export type ShowcaseCategory = {
  slug: 'industry' | 'patterns' | 'playbooks';
  label: string;
  href: string;
  summary: string;
  description: string;
  children: ShowcaseLeafRoute[];
};

export type ShowcaseRoute = ShowcaseLeafRoute & {
  category: ShowcaseCategory['slug'];
};

const INDUSTRY_ROUTES: ShowcaseLeafRoute[] = [
  {
    label: 'Finance',
    href: '/showcase/industry/finance',
    summary: '디지털 뱅킹, 결제, 자산 관리 사례를 모아서 볼 수 있는 허브입니다.',
  },
  {
    label: 'Healthcare',
    href: '/showcase/industry/healthcare',
    summary: '병원·웰니스 기업의 환자 경험 혁신과 운영 자동화 사례 모음입니다.',
  },
  {
    label: 'Retail',
    href: '/showcase/industry/retail',
    summary: '커머스·리테일 브랜드의 옴니채널, 개인화 마케팅 사례입니다.',
  },
  {
    label: 'Mobility',
    href: '/showcase/industry/mobility',
    summary: '모빌리티, 물류, 스마트시티 기업의 연결 경험을 담았습니다.',
  },
  {
    label: 'Public Sector',
    href: '/showcase/industry/public-sector',
    summary: '공공·교육 분야의 디지털 전환과 시민 서비스 혁신 사례 모음입니다.',
  },
];

const PATTERN_ROUTES: ShowcaseLeafRoute[] = [
  {
    label: 'Onboarding Flow',
    href: '/showcase/patterns/onboarding',
    summary: '가입부터 첫 번째 가치 도달까지 여정을 단계별로 설계한 패턴 모음입니다.',
  },
  {
    label: 'Retention Loop',
    href: '/showcase/patterns/retention',
    summary: '리텐션 지표를 끌어올린 커뮤니케이션·리워드 루프 가이드입니다.',
  },
  {
    label: 'Support Hub',
    href: '/showcase/patterns/support',
    summary: '셀프서브 헬프센터와 상담 흐름을 통합한 고객 지원 경험입니다.',
  },
  {
    label: 'Automation Journey',
    href: '/showcase/patterns/automation',
    summary: '업무 자동화와 사용자 알림을 결합한 시나리오를 모았습니다.',
  },
  {
    label: 'Localization System',
    href: '/showcase/patterns/localization',
    summary: '다국어·지역별 콘텐츠를 운영하는 UI/UX 패턴입니다.',
  },
];

const PLAYBOOK_ROUTES: ShowcaseLeafRoute[] = [
  {
    label: 'Launch Accelerator',
    href: '/showcase/playbooks/launch',
    summary: '신제품 론칭과 초기 고객 확보를 위한 메시지·온보딩 플랜입니다.',
  },
  {
    label: 'Scale Readiness',
    href: '/showcase/playbooks/scale',
    summary: '팀 확장과 프로세스 정비에 활용할 운영·커뮤니케이션 세트입니다.',
  },
  {
    label: 'Conversion Engine',
    href: '/showcase/playbooks/conversion',
    summary: '전환율 상승을 위한 퍼널 진단과 실험 플레이북입니다.',
  },
  {
    label: 'Advocacy Program',
    href: '/showcase/playbooks/advocacy',
    summary: '고객 커뮤니티, 레퍼런스 확보 전략을 정리한 프로그램입니다.',
  },
  {
    label: 'Ops Modernization',
    href: '/showcase/playbooks/operations',
    summary: '운영 효율화를 위한 모니터링, 거버넌스, 태스크 관리 흐름입니다.',
  },
];

export const SHOWCASE_CATEGORIES: ShowcaseCategory[] = [
  {
    slug: 'industry',
    label: '산업별 쇼케이스',
    href: '/showcase/industry',
    summary: '산업군별 서비스 레퍼런스',
    description: '금융, 헬스케어, 공공 등 도메인별 고객 경험과 운영 사례를 모았습니다.',
    children: INDUSTRY_ROUTES,
  },
  {
    slug: 'patterns',
    label: '경험 패턴 라이브러리',
    href: '/showcase/patterns',
    summary: '여정별 UX 패턴',
    description: '온보딩, 리텐션, 고객지원 등 특정 여정을 해결한 반복 가능한 패턴입니다.',
    children: PATTERN_ROUTES,
  },
  {
    slug: 'playbooks',
    label: '플레이북 모음',
    href: '/showcase/playbooks',
    summary: '팀이 바로 실행할 수 있는 계획서',
    description: '제품 출시, 전환 최적화, 운영 체계화 등에 바로 적용 가능한 플레이북입니다.',
    children: PLAYBOOK_ROUTES,
  },
];

export const SHOWCASE_ROUTES: ShowcaseRoute[] = SHOWCASE_CATEGORIES.flatMap(
  (category) => category.children.map((child) => ({ ...child, category: category.slug })),
);

